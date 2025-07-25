from django.shortcuts import render, redirect
from django.contrib import messages
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views.generic import View
from django.utils import timezone
from .utils import ProcessadorCSV, extrair_ano_do_nome_arquivo, extrair_disciplina_do_nome_arquivo
from .models import Gabarito, UploadResultado, Escola
import json
import os

class ProcessarGabaritoView(View):
    """View para processar upload de gabaritos"""
    
    @method_decorator(csrf_exempt)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)
    
    def post(self, request):
        try:
            if 'arquivo_gabarito' not in request.FILES:
                return JsonResponse({'erro': 'Nenhum arquivo foi enviado'}, status=400)
            
            arquivo = request.FILES['arquivo_gabarito']
            nome_gabarito = request.POST.get('nome_gabarito', arquivo.name)
            
            # Extrai informações do nome do arquivo
            ano_escolar = extrair_ano_do_nome_arquivo(arquivo.name)
            disciplina_nome = extrair_disciplina_do_nome_arquivo(arquivo.name)
            
            # Processa o gabarito
            gabarito, questoes_criadas = ProcessadorCSV.processar_gabarito(
                arquivo, nome_gabarito, disciplina_nome, ano_escolar
            )
            
            return JsonResponse({
                'sucesso': True,
                'mensagem': f'Gabarito processado com sucesso! {questoes_criadas} questões criadas.',
                'gabarito_id': gabarito.id,
                'disciplina': disciplina_nome,
                'ano': ano_escolar
            })
            
        except Exception as e:
            return JsonResponse({'erro': str(e)}, status=500)

class ProcessarResultadosView(View):
    """View para processar upload de resultados"""
    
    @method_decorator(csrf_exempt)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)
    
    def post(self, request):
        try:
            if 'arquivo_resultados' not in request.FILES:
                return JsonResponse({'erro': 'Nenhum arquivo foi enviado'}, status=400)
            
            arquivo = request.FILES['arquivo_resultados']
            nome_upload = request.POST.get('nome_upload', arquivo.name)
            escola_nome = request.POST.get('escola_nome', 'Escola Principal')
            
            # Processa os resultados
            upload_resultado, alunos_proc, respostas_proc = ProcessadorCSV.processar_resultados(
                arquivo, nome_upload, escola_nome
            )
            
            return JsonResponse({
                'sucesso': True,
                'mensagem': f'Resultados processados! {alunos_proc} alunos e {respostas_proc} respostas.',
                'upload_id': upload_resultado.id,
                'alunos_processados': alunos_proc,
                'respostas_processadas': respostas_proc
            })
            
        except Exception as e:
            return JsonResponse({'erro': str(e)}, status=500)

class AssociarResultadosGabaritoView(View):
    """View para associar resultados com gabarito e calcular desempenho"""
    
    @method_decorator(csrf_exempt)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)
    
    def post(self, request):
        try:
            data = json.loads(request.body)
            upload_id = data.get('upload_id')
            gabarito_id = data.get('gabarito_id')
            
            if not upload_id or not gabarito_id:
                return JsonResponse({'erro': 'IDs de upload e gabarito são obrigatórios'}, status=400)
            
            upload_resultado = UploadResultado.objects.get(id=upload_id)
            gabarito = Gabarito.objects.get(id=gabarito_id)
            
            # Associa resultados com gabarito
            respostas_criadas, media_geral = ProcessadorCSV.associar_resultados_gabarito(
                upload_resultado, gabarito
            )
            
            return JsonResponse({
                'sucesso': True,
                'mensagem': f'Associação concluída! {respostas_criadas} respostas processadas.',
                'respostas_criadas': respostas_criadas,
                'media_geral': media_geral
            })
            
        except Exception as e:
            return JsonResponse({'erro': str(e)}, status=500)

def teste_processamento(request):
    """View de teste para demonstrar o processamento"""
    
    if request.method == 'POST':
        try:
            # Verifica se é o teste automático com o arquivo específico
            arquivo_teste = "/home/paulo/Área de trabalho/sade/sade/media/resultados/1º_ANO_A_-_03_DE_DEZEMBRO_2025_2026_73877.csv"
            
            if os.path.exists(arquivo_teste):
                # Primeiro, cria um gabarito de teste se não existir
                from dashboard.models import Disciplina, Gabarito, Questao
                
                disciplina, _ = Disciplina.objects.get_or_create(nome="Língua Portuguesa")
                
                gabarito, created = Gabarito.objects.get_or_create(
                    nome="CICLO II 1º ano LÍNGUA PORTUGUESA - Teste",
                    disciplina=disciplina,
                    ano_escolar="1ano",
                    defaults={'ativo': True}
                )
                
                # Se gabarito foi criado, adiciona as questões
                if created or gabarito.questao_set.count() == 0:
                    # Gabarito baseado nas respostas mais comuns do CSV
                    respostas_gabarito = ['A', 'B', 'C', 'A', 'B', 'C', 'A', 'B', 'A', 'B', 'C', 'B', 'C', 'A', 'D', 'A', 'A', 'B', 'A', 'B', 'C', 'C']
                    
                    for i, resposta in enumerate(respostas_gabarito, 1):
                        Questao.objects.get_or_create(
                            gabarito=gabarito,
                            numero=i,
                            defaults={'resposta_correta': resposta}
                        )
                
                # Processa os resultados
                escola_nome = "Escola Teste SADE"
                nome_upload = f"Teste Automático - {timezone.now().strftime('%d/%m/%Y %H:%M')}"
                
                upload_resultado, alunos_processados, respostas_processadas = ProcessadorCSV.processar_resultados(
                    arquivo_teste, nome_upload, escola_nome
                )
                
                # Associa com o gabarito
                respostas_criadas, media_geral = ProcessadorCSV.associar_resultados_gabarito(
                    upload_resultado, gabarito, arquivo_teste
                )
                
                messages.success(request, 
                    f'✅ Teste automático concluído com sucesso! '
                    f'📊 {alunos_processados} alunos processados, '
                    f'📝 {respostas_criadas} respostas associadas, '
                    f'📈 Média geral: {media_geral:.2f}%'
                )
            else:
                messages.error(request, '❌ Arquivo de teste não encontrado. Faça upload do arquivo CSV primeiro.')
                
        except Exception as e:
            messages.error(request, f'❌ Erro no teste automático: {str(e)}')
            
        return redirect('teste_processamento')
    
    # Lista gabaritos e uploads para exibição
    gabaritos = Gabarito.objects.all().order_by('-data_criacao')
    uploads = UploadResultado.objects.all().order_by('-data_upload')
    
    context = {
        'gabaritos': gabaritos,
        'uploads': uploads,
    }
    
    return render(request, 'dashboard/upload_processamento.html', context)
