from django.shortcuts import render
from django.contrib.admin.views.decorators import staff_member_required
from django.http import HttpResponse, JsonResponse
import csv
from django.contrib import messages
from .models import Escola, Turma, Aluno, Disciplina, Questao, Resposta, Gabarito, UploadResultado, AnaliseDesempenho
from django.contrib.auth import authenticate, login
from django.shortcuts import redirect
from django.db.models import Count, Q, Avg, Sum
from django.db.models.functions import Round
import json
from datetime import datetime, timedelta
from django.utils import timezone

# Create your views here.

def home(request):
    """Página inicial com estatísticas básicas melhoradas"""
    # Estatísticas básicas
    total_escolas = Escola.objects.count()
    total_turmas = Turma.objects.count()
    total_alunos = Aluno.objects.count()
    total_gabaritos = Gabarito.objects.filter(ativo=True).count()
    total_uploads = UploadResultado.objects.filter(processado=True).count()
    total_respostas = Resposta.objects.count()
    
    # Estatísticas de desempenho
    respostas_corretas = Resposta.objects.filter(correta=True).count()
    media_geral = (respostas_corretas / total_respostas * 100) if total_respostas > 0 else 0
    
    # Últimas atividades
    ultimos_uploads = UploadResultado.objects.filter(processado=True).order_by('-data_upload')[:5]
    ultimos_gabaritos = Gabarito.objects.filter(ativo=True).order_by('-data_criacao')[:5]
    
    # Distribuição por anos
    distribuicao_anos = Turma.objects.values('ano').annotate(
        total_turmas=Count('id'),
        total_alunos=Count('aluno')
    ).order_by('ano')
    
    # Top escolas por alunos
    top_escolas = Escola.objects.annotate(
        total_alunos=Count('turma__aluno')
    ).filter(total_alunos__gt=0).order_by('-total_alunos')[:5]
    
    context = {
        'total_escolas': total_escolas,
        'total_turmas': total_turmas,
        'total_alunos': total_alunos,
        'total_gabaritos': total_gabaritos,
        'total_uploads': total_uploads,
        'total_respostas': total_respostas,
        'media_geral': round(media_geral, 2),
        'ultimos_uploads': ultimos_uploads,
        'ultimos_gabaritos': ultimos_gabaritos,
        'distribuicao_anos': distribuicao_anos,
        'top_escolas': top_escolas,
    }
    return render(request, 'dashboard/home.html', context)

@staff_member_required
def dashboard(request):
    """Dashboard com estatísticas detalhadas e visualizações avançadas"""
    # Estatísticas gerais
    stats = {
        'escolas': Escola.objects.count(),
        'turmas': Turma.objects.count(),
        'alunos': Aluno.objects.count(),
        'disciplinas': Disciplina.objects.count(),
        'gabaritos': Gabarito.objects.filter(ativo=True).count(),
        'uploads_processados': UploadResultado.objects.filter(processado=True).count(),
        'total_questoes': Questao.objects.count(),
        'total_respostas': Resposta.objects.count(),
    }
    
    # Cálculo de desempenho geral
    respostas_corretas = Resposta.objects.filter(correta=True).count()
    stats['media_geral'] = round((respostas_corretas / stats['total_respostas'] * 100), 2) if stats['total_respostas'] > 0 else 0
    stats['respostas_corretas'] = respostas_corretas
    stats['respostas_incorretas'] = stats['total_respostas'] - respostas_corretas
    
    # Performance por ano escolar
    performance_anos = []
    for ano_choice in Turma.ANO_CHOICES:
        ano_codigo, ano_nome = ano_choice
        respostas_ano = Resposta.objects.filter(aluno__turma__ano=ano_codigo)
        total_respostas_ano = respostas_ano.count()
        corretas_ano = respostas_ano.filter(correta=True).count()
        
        if total_respostas_ano > 0:
            media_ano = round((corretas_ano / total_respostas_ano * 100), 2)
            performance_anos.append({
                'ano': ano_nome,
                'codigo': ano_codigo,
                'media': media_ano,
                'total_respostas': total_respostas_ano,
                'alunos': Aluno.objects.filter(turma__ano=ano_codigo).count()
            })
    
    # Performance por disciplina
    performance_disciplinas = []
    for disciplina in Disciplina.objects.all():
        respostas_disc = Resposta.objects.filter(questao__gabarito__disciplina=disciplina)
        total_respostas_disc = respostas_disc.count()
        corretas_disc = respostas_disc.filter(correta=True).count()
        
        if total_respostas_disc > 0:
            media_disc = round((corretas_disc / total_respostas_disc * 100), 2)
            performance_disciplinas.append({
                'disciplina': disciplina.nome,
                'media': media_disc,
                'total_respostas': total_respostas_disc,
                'questoes': Questao.objects.filter(gabarito__disciplina=disciplina).count()
            })
    
    # Top 5 escolas por desempenho
    top_escolas_desempenho = []
    for escola in Escola.objects.all():
        respostas_escola = Resposta.objects.filter(aluno__turma__escola=escola)
        total_resp = respostas_escola.count()
        corretas_resp = respostas_escola.filter(correta=True).count()
        
        if total_resp > 0:
            media_escola = round((corretas_resp / total_resp * 100), 2)
            top_escolas_desempenho.append({
                'escola': escola.nome,
                'media': media_escola,
                'total_alunos': Aluno.objects.filter(turma__escola=escola).count(),
                'total_respostas': total_resp
            })
    
    top_escolas_desempenho.sort(key=lambda x: x['media'], reverse=True)
    top_escolas_desempenho = top_escolas_desempenho[:5]
    
    # Análises recentes
    analises_recentes = AnaliseDesempenho.objects.order_by('-data_analise')[:5]
    
    # Uploads recentes
    uploads_recentes = UploadResultado.objects.filter(processado=True).order_by('-data_upload')[:5]
    
    # Gabaritos por ano
    gabaritos_por_ano = {}
    for gabarito in Gabarito.objects.filter(ativo=True):
        ano = gabarito.get_ano_escolar_display()
        if ano not in gabaritos_por_ano:
            gabaritos_por_ano[ano] = []
        gabaritos_por_ano[ano].append(gabarito)
    
    context = {
        'stats': stats,
        'performance_anos': performance_anos,
        'performance_disciplinas': performance_disciplinas,
        'top_escolas_desempenho': top_escolas_desempenho,
        'analises_recentes': analises_recentes,
        'uploads_recentes': uploads_recentes,
        'gabaritos_por_ano': gabaritos_por_ano,
    }
    return render(request, 'dashboard/dashboard.html', context)

def dados_graficos_dashboard(request):
    """API para fornecer dados para gráficos do dashboard"""
    tipo = request.GET.get('tipo', 'performance_anos')
    
    if tipo == 'performance_anos':
        dados = []
        labels = []
        
        for ano_choice in Turma.ANO_CHOICES:
            ano_codigo, ano_nome = ano_choice
            respostas_ano = Resposta.objects.filter(aluno__turma__ano=ano_codigo)
            total_respostas_ano = respostas_ano.count()
            corretas_ano = respostas_ano.filter(correta=True).count()
            
            if total_respostas_ano > 0:
                media_ano = round((corretas_ano / total_respostas_ano * 100), 2)
                labels.append(ano_nome)
                dados.append(media_ano)
        
        return JsonResponse({
            'labels': labels,
            'datasets': [{
                'label': 'Desempenho por Ano (%)',
                'data': dados,
                'backgroundColor': [
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(255, 205, 86, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(153, 102, 255, 0.8)',
                    'rgba(255, 159, 64, 0.8)',
                    'rgba(199, 199, 199, 0.8)',
                    'rgba(83, 102, 255, 0.8)',
                    'rgba(255, 99, 255, 0.8)',
                ],
                'borderColor': [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 205, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(199, 199, 199, 1)',
                    'rgba(83, 102, 255, 1)',
                    'rgba(255, 99, 255, 1)',
                ],
                'borderWidth': 2
            }]
        })
    
    elif tipo == 'performance_disciplinas':
        dados = []
        labels = []
        
        for disciplina in Disciplina.objects.all():
            respostas_disc = Resposta.objects.filter(questao__gabarito__disciplina=disciplina)
            total_respostas_disc = respostas_disc.count()
            corretas_disc = respostas_disc.filter(correta=True).count()
            
            if total_respostas_disc > 0:
                media_disc = round((corretas_disc / total_respostas_disc * 100), 2)
                labels.append(disciplina.nome)
                dados.append(media_disc)
        
        return JsonResponse({
            'labels': labels,
            'datasets': [{
                'label': 'Desempenho por Disciplina (%)',
                'data': dados,
                'backgroundColor': 'rgba(75, 192, 192, 0.8)',
                'borderColor': 'rgba(75, 192, 192, 1)',
                'borderWidth': 2
            }]
        })
    
    elif tipo == 'distribuicao_respostas':
        corretas = Resposta.objects.filter(correta=True).count()
        incorretas = Resposta.objects.filter(correta=False).count()
        
        return JsonResponse({
            'labels': ['Corretas', 'Incorretas'],
            'datasets': [{
                'data': [corretas, incorretas],
                'backgroundColor': [
                    'rgba(34, 197, 94, 0.8)',
                    'rgba(239, 68, 68, 0.8)'
                ],
                'borderColor': [
                    'rgba(34, 197, 94, 1)',
                    'rgba(239, 68, 68, 1)'
                ],
                'borderWidth': 2
            }]
        })
    
    elif tipo == 'alunos_por_escola':
        dados = []
        labels = []
        
        escolas = Escola.objects.annotate(
            total_alunos=Count('turma__aluno')
        ).filter(total_alunos__gt=0).order_by('-total_alunos')[:8]
        
        for escola in escolas:
            labels.append(escola.nome[:20] + '...' if len(escola.nome) > 20 else escola.nome)
            dados.append(escola.total_alunos)
        
        return JsonResponse({
            'labels': labels,
            'datasets': [{
                'label': 'Número de Alunos',
                'data': dados,
                'backgroundColor': 'rgba(168, 85, 247, 0.8)',
                'borderColor': 'rgba(168, 85, 247, 1)',
                'borderWidth': 2
            }]
        })
    
    return JsonResponse({'error': 'Tipo de gráfico não reconhecido'}, status=400)

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
