from django.shortcuts import render
from django.contrib.admin.views.decorators import staff_member_required
from django.http import HttpResponse, JsonResponse
import csv
from django.contrib import messages
from .models import Escola, Turma, Aluno, Disciplina, Questao, Resposta
from django.contrib.auth import authenticate, login
from django.shortcuts import redirect
from django.db.models import Count, Q
import json

# Create your views here.

def home(request):
    """Página inicial com estatísticas básicas"""
    context = {
        'total_escolas': Escola.objects.count(),
        'total_turmas': Turma.objects.count(),
        'total_alunos': Aluno.objects.count(),
        'total_disciplinas': Disciplina.objects.count(),
        'total_questoes': Questao.objects.count(),
        'total_respostas': Resposta.objects.count(),
    }
    return render(request, 'dashboard/home.html', context)

@staff_member_required
def dashboard(request):
    """Dashboard com estatísticas detalhadas"""
    # Estatísticas gerais
    stats = {
        'escolas': Escola.objects.count(),
        'turmas': Turma.objects.count(),
        'alunos': Aluno.objects.count(),
        'disciplinas': Disciplina.objects.count(),
        'questoes': Questao.objects.count(),
        'respostas': Resposta.objects.count(),
    }
    
    # Escolas com mais alunos
    escolas_top = Escola.objects.annotate(
        total_alunos=Count('turma__aluno')
    ).order_by('-total_alunos')[:5]
    
    # Disciplinas com mais questões
    disciplinas_top = Disciplina.objects.annotate(
        total_questoes=Count('questao')
    ).order_by('-total_questoes')[:5]
    
    # Dados para gráficos de desempenho
    turmas_com_dados = Turma.objects.filter(aluno__resposta__isnull=False).distinct()
    disciplinas_com_dados = Disciplina.objects.filter(questao__resposta__isnull=False).distinct()
    
    context = {
        'stats': stats,
        'escolas_top': escolas_top,
        'disciplinas_top': disciplinas_top,
        'turmas_com_dados': turmas_com_dados,
        'disciplinas_com_dados': disciplinas_com_dados,
    }
    return render(request, 'dashboard/dashboard.html', context)

def calcular_desempenho_questoes(turma, disciplina, gabarito=None):
    """
    Calcula o desempenho por questão para uma turma específica em uma disciplina.
    Retorna dados para gráfico.
    """
    questoes = Questao.objects.filter(disciplina=disciplina).order_by('numero')
    alunos_turma = Aluno.objects.filter(turma=turma)
    total_alunos = alunos_turma.count()
    
    if total_alunos == 0:
        return {'labels': [], 'data': [], 'total_alunos': 0}
    
    dados_questoes = []
    labels = []
    
    for questao in questoes:
        # Todas as respostas da questão pelos alunos da turma
        respostas_questao = Resposta.objects.filter(
            questao=questao,
            aluno__in=alunos_turma
        ).exclude(resposta='')  # Excluir respostas vazias
        
        total_respostas = respostas_questao.count()
        
        if total_respostas == 0:
            porcentagem_respostas = 0
        else:
            # Calcular a porcentagem de alunos que responderam esta questão
            porcentagem_respostas = (total_respostas / total_alunos) * 100
        
        labels.append(f'Q{questao.numero}')
        dados_questoes.append(round(porcentagem_respostas, 1))
    
    return {
        'labels': labels,
        'data': dados_questoes,
        'total_alunos': total_alunos,
        'total_questoes': len(dados_questoes)
    }

@staff_member_required
def grafico_desempenho(request):
    """
    Retorna dados JSON para gráficos de desempenho por questão
    """
    turma_id = request.GET.get('turma_id')
    disciplina_id = request.GET.get('disciplina_id')
    
    if not turma_id or not disciplina_id:
        return JsonResponse({'error': 'Parâmetros turma_id e disciplina_id são obrigatórios'})
    
    try:
        turma = Turma.objects.get(id=turma_id)
        disciplina = Disciplina.objects.get(id=disciplina_id)
        
        # Calcular desempenho
        dados = calcular_desempenho_questoes(turma, disciplina)
        
        # Adicionar informações extras
        dados.update({
            'turma_nome': f"{turma.nome} - {turma.escola.nome}",
            'disciplina_nome': disciplina.nome,
            'ano': turma.ano
        })
        
        return JsonResponse(dados)
    
    except (Turma.DoesNotExist, Disciplina.DoesNotExist):
        return JsonResponse({'error': 'Turma ou disciplina não encontrada'})

@staff_member_required
def relatorio_desempenho(request):
    """
    Página específica para relatórios de desempenho com gráficos
    """
    # Buscar turmas e disciplinas disponíveis
    turmas = Turma.objects.filter(aluno__resposta__isnull=False).distinct().order_by('escola__nome', 'nome')
    disciplinas = Disciplina.objects.filter(questao__resposta__isnull=False).distinct().order_by('nome')
    
    # Se foi selecionada uma turma e disciplina específica
    turma_selecionada = None
    disciplina_selecionada = None
    dados_grafico = None
    
    turma_id = request.GET.get('turma')
    disciplina_id = request.GET.get('disciplina')
    
    if turma_id and disciplina_id:
        try:
            turma_selecionada = Turma.objects.get(id=turma_id)
            disciplina_selecionada = Disciplina.objects.get(id=disciplina_id)
            dados_grafico = calcular_desempenho_questoes(turma_selecionada, disciplina_selecionada)
        except (Turma.DoesNotExist, Disciplina.DoesNotExist):
            messages.error(request, 'Turma ou disciplina não encontrada.')
    
    context = {
        'turmas': turmas,
        'disciplinas': disciplinas,
        'turma_selecionada': turma_selecionada,
        'disciplina_selecionada': disciplina_selecionada,
        'dados_grafico': json.dumps(dados_grafico) if dados_grafico else None,
    }
    
    return render(request, 'dashboard/relatorio_desempenho.html', context)

import re

def extrair_info_turma(nome_turma):
    """
    Extrai informações da turma baseado no padrão real dos CSVs.
    Exemplo: "1º ANO A - MOURÃO LIMA 2025/2026"
    Retorna: (serie, turma_letra, escola, ano_letivo)
    """
    # Remove espaços extras
    nome_turma = nome_turma.strip()
    
    # Padrão para extrair: SÉRIE TURMA - ESCOLA ANO/ANO
    match = re.match(r'(\d+º\s+ANO)\s*([A-Z]?)?\s*-\s*(.+?)\s+(\d{4}/\d{4})', nome_turma, re.IGNORECASE)
    
    if match:
        serie = match.group(1).strip()  # "1º ANO"
        turma_letra = match.group(2).strip() if match.group(2) else ""  # "A" ou vazio
        escola = match.group(3).strip()  # "MOURÃO LIMA"
        ano_letivo = match.group(4).strip()  # "2025/2026"
        
        # Se tem letra da turma, usa série + letra, senão só a série
        turma_nome = f"{serie} {turma_letra}".strip() if turma_letra else serie
        
        return serie, turma_nome, escola, ano_letivo
    
    # Fallback se não conseguir extrair
    return nome_turma, nome_turma, "Escola Desconhecida", "2025"

def extrair_disciplina(nome_teste):
    """
    Extrai a disciplina do nome do teste.
    Exemplo: "CICLO II 1º ano MATEMÁTICA" -> "MATEMÁTICA"
    """
    # Busca por palavras que indicam disciplina no final
    disciplinas_conhecidas = ['MATEMÁTICA', 'PORTUGUÊS', 'HISTÓRIA', 'GEOGRAFIA', 
                             'CIÊNCIAS', 'INGLÊS', 'EDUCAÇÃO FÍSICA', 'ARTES']
    
    nome_teste_upper = nome_teste.upper()
    for disciplina in disciplinas_conhecidas:
        if disciplina in nome_teste_upper:
            return disciplina.title()
    
    # Se não encontrar, usa a última palavra
    palavras = nome_teste.strip().split()
    return palavras[-1].title() if palavras else "Disciplina Desconhecida"

@staff_member_required
def upload_csv(request):
    if request.method == 'POST':
        csv_file = request.FILES.get('csv_file')
        
        # Validações básicas
        if not csv_file:
            messages.error(request, 'Nenhum arquivo enviado.')
            return render(request, 'dashboard/upload_csv.html')
        
        if not csv_file.name.endswith('.csv'):
            messages.error(request, 'O arquivo deve ser um CSV.')
            return render(request, 'dashboard/upload_csv.html')
        
        # Verificação de tamanho do arquivo (5MB max)
        if csv_file.size > 5 * 1024 * 1024:
            messages.error(request, 'Arquivo muito grande. Tamanho máximo: 5MB.')
            return render(request, 'dashboard/upload_csv.html')
        
        try:
            # Decodificação do arquivo
            try:
                decoded_file = csv_file.read().decode('utf-8').splitlines()
            except UnicodeDecodeError:
                try:
                    csv_file.seek(0)
                    decoded_file = csv_file.read().decode('latin-1').splitlines()
                except UnicodeDecodeError:
                    messages.error(request, 'Erro de codificação do arquivo. Use UTF-8 ou Latin-1.')
                    return render(request, 'dashboard/upload_csv.html')
            
            reader = csv.reader(decoded_file)
            
            # Validação do header
            try:
                header = next(reader)
            except StopIteration:
                messages.error(request, 'Arquivo CSV vazio.')
                return render(request, 'dashboard/upload_csv.html')
            
            # Verificar se é o formato esperado (colunas específicas do sistema de avaliação)
            colunas_esperadas = {
                'nome_aluno': None,
                'nome_turma': None,
                'nome_teste': None,
                'respostas': []
            }
            
            # Mapear colunas
            for i, coluna in enumerate(header):
                coluna_lower = coluna.lower()
                if 'nome do aluno' in coluna_lower:
                    colunas_esperadas['nome_aluno'] = i
                elif 'nome da turma' in coluna_lower:
                    colunas_esperadas['nome_turma'] = i
                elif 'nome do teste' in coluna_lower:
                    colunas_esperadas['nome_teste'] = i
                elif 'resposta' in coluna_lower and ('p.' in coluna_lower or 'pergunta' in coluna_lower):
                    # Extrair número da questão
                    match = re.search(r'p\.\s*(\d+)', coluna_lower)
                    if match:
                        numero = int(match.group(1))
                        colunas_esperadas['respostas'].append((numero, i))
            
            # Validar se encontrou as colunas essenciais
            if colunas_esperadas['nome_aluno'] is None:
                messages.error(request, 'Coluna "Nome do aluno" não encontrada.')
                return render(request, 'dashboard/upload_csv.html')
            
            if colunas_esperadas['nome_turma'] is None:
                messages.error(request, 'Coluna "Nome da turma" não encontrada.')
                return render(request, 'dashboard/upload_csv.html')
            
            if colunas_esperadas['nome_teste'] is None:
                messages.error(request, 'Coluna "Nome do teste" não encontrada.')
                return render(request, 'dashboard/upload_csv.html')
            
            if not colunas_esperadas['respostas']:
                messages.error(request, 'Nenhuma coluna de resposta encontrada (P. 1 Resposta, P. 2 Resposta, etc.).')
                return render(request, 'dashboard/upload_csv.html')
            
            # Ordenar respostas por número da questão
            colunas_esperadas['respostas'].sort(key=lambda x: x[0])
            
            # Processamento das linhas
            linhas_processadas = 0
            linhas_com_erro = []
            escola_obj = None
            turma_obj = None
            disciplina_obj = None
            
            for i, row in enumerate(reader, start=2):  # Começa na linha 2 (após header)
                try:
                    if len(row) <= max(colunas_esperadas['nome_aluno'], 
                                      colunas_esperadas['nome_turma'], 
                                      colunas_esperadas['nome_teste']):
                        linhas_com_erro.append(f"Linha {i}: número de colunas insuficiente")
                        continue
                    
                    # Extrair dados da linha
                    nome_aluno = row[colunas_esperadas['nome_aluno']].strip()
                    nome_turma_completo = row[colunas_esperadas['nome_turma']].strip()
                    nome_teste = row[colunas_esperadas['nome_teste']].strip()
                    
                    if not nome_aluno or not nome_turma_completo or not nome_teste:
                        linhas_com_erro.append(f"Linha {i}: dados obrigatórios em branco")
                        continue
                    
                    # Extrair informações da turma (escola, série, etc.)
                    serie, turma_nome, escola_nome, ano_letivo = extrair_info_turma(nome_turma_completo)
                    
                    # Extrair disciplina
                    disciplina_nome = extrair_disciplina(nome_teste)
                    
                    # Criar/buscar objetos (otimização: só cria uma vez por arquivo)
                    if escola_obj is None or escola_obj.nome != escola_nome:
                        escola_obj, _ = Escola.objects.get_or_create(nome=escola_nome)
                    
                    if turma_obj is None or turma_obj.nome != turma_nome:
                        turma_obj, _ = Turma.objects.get_or_create(
                            escola=escola_obj,
                            nome=turma_nome,
                            ano=ano_letivo
                        )
                    
                    if disciplina_obj is None or disciplina_obj.nome != disciplina_nome:
                        disciplina_obj, _ = Disciplina.objects.get_or_create(nome=disciplina_nome)
                    
                    # Criar/buscar aluno
                    aluno_obj, _ = Aluno.objects.get_or_create(
                        turma=turma_obj,
                        nome=nome_aluno
                    )
                    
                    # Processar respostas
                    respostas_salvas = 0
                    for numero_questao, col_index in colunas_esperadas['respostas']:
                        try:
                            if col_index < len(row):
                                resposta_valor = row[col_index].strip()
                                
                                if resposta_valor:  # Só salva se houver resposta
                                    questao_obj, _ = Questao.objects.get_or_create(
                                        disciplina=disciplina_obj,
                                        numero=numero_questao
                                    )
                                    
                                    Resposta.objects.update_or_create(
                                        aluno=aluno_obj,
                                        questao=questao_obj,
                                        defaults={'resposta': resposta_valor}
                                    )
                                    respostas_salvas += 1
                        except Exception as e:
                            linhas_com_erro.append(f"Linha {i}, Questão {numero_questao}: {str(e)}")
                    
                    if respostas_salvas > 0:
                        linhas_processadas += 1
                    else:
                        linhas_com_erro.append(f"Linha {i}: nenhuma resposta válida encontrada")
                    
                except Exception as e:
                    linhas_com_erro.append(f"Linha {i}: erro inesperado - {str(e)}")
                    continue
            
            # Mensagens de resultado
            if linhas_processadas > 0:
                messages.success(request, f'Arquivo processado! {linhas_processadas} aluno(s) importado(s) com sucesso.')
                if escola_obj:
                    messages.info(request, f'Escola: {escola_obj.nome}')
                if turma_obj:
                    messages.info(request, f'Turma: {turma_obj.nome} ({turma_obj.ano})')
                if disciplina_obj:
                    messages.info(request, f'Disciplina: {disciplina_obj.nome}')
            
            if linhas_com_erro:
                if len(linhas_com_erro) <= 5:
                    for erro in linhas_com_erro:
                        messages.warning(request, erro)
                else:
                    messages.warning(request, f'{len(linhas_com_erro)} linha(s) com erro. Primeiros 5 erros:')
                    for erro in linhas_com_erro[:5]:
                        messages.warning(request, erro)
            
            if linhas_processadas == 0:
                messages.error(request, 'Nenhuma linha foi processada com sucesso.')
                
        except Exception as e:
            messages.error(request, f'Erro ao processar o arquivo: {str(e)}')
        
        return render(request, 'dashboard/upload_csv.html')
    
    return render(request, 'dashboard/upload_csv.html')

def custom_login(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('upload_csv')
        else:
            return render(request, 'dashboard/login.html', {'error': 'Usuário ou senha inválidos.'})
    return render(request, 'dashboard/login.html')
