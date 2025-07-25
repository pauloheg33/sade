#!/usr/bin/env python
"""
Script para testar o processamento do arquivo CSV específico via interface web
"""

import os
import sys
import django

# Configurar Django
sys.path.append('/home/paulo/Área de trabalho/sade/sade')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'sade.settings')
django.setup()

from dashboard.utils import ProcessadorCSV
from dashboard.models import Escola, Turma, Aluno, Disciplina, Gabarito, Questao, Resposta, UploadResultado, AnaliseDesempenho

def processar_arquivo_usuario():
    """Processa o arquivo CSV enviado pelo usuário"""
    arquivo_path = "/home/paulo/Área de trabalho/sade/sade/media/resultados/1º_ANO_A_-_03_DE_DEZEMBRO_2025_2026_73877.csv"
    
    print("🚀 PROCESSAMENTO DO ARQUIVO DO USUÁRIO")
    print("=" * 50)
    
    if not os.path.exists(arquivo_path):
        print(f"❌ Arquivo não encontrado: {arquivo_path}")
        return False
    
    try:
        # 1. Criar gabarito com base nas respostas mais prováveis
        print("📚 PASSO 1: Criando gabarito...")
        disciplina, _ = Disciplina.objects.get_or_create(nome="Língua Portuguesa")
        
        # Remove gabaritos de teste anteriores
        Gabarito.objects.filter(nome__contains="CICLO II 1º ano LÍNGUA PORTUGUESA").delete()
        
        gabarito = Gabarito.objects.create(
            nome="CICLO II 1º ano LÍNGUA PORTUGUESA",
            disciplina=disciplina,
            ano_escolar="1ano",
            ativo=True
        )
        
        # Gabarito baseado na análise do arquivo
        # As respostas mais comuns indicam o gabarito provável
        respostas_gabarito = [
            'A', 'B', 'C', 'A', 'B', 'C', 'A', 'B', 'A', 'B',  # 1-10
            'C', 'B', 'C', 'A', 'D', 'A', 'A', 'B', 'A', 'B',  # 11-20
            'C', 'C'  # 21-22
        ]
        
        for i, resposta in enumerate(respostas_gabarito, 1):
            Questao.objects.create(
                gabarito=gabarito,
                numero=i,
                resposta_correta=resposta
            )
        
        print(f"✅ Gabarito criado com {len(respostas_gabarito)} questões")
        
        # 2. Processar resultados
        print("\n📊 PASSO 2: Processando resultados...")
        escola_nome = "Escola do Arquivo Enviado"
        nome_upload = "Processamento 1º ANO A - DEZEMBRO 2025"
        
        upload_resultado, alunos_processados, respostas_processadas = ProcessadorCSV.processar_resultados(
            arquivo_path, nome_upload, escola_nome
        )
        
        print(f"✅ Upload processado: {upload_resultado.nome}")
        print(f"👥 Alunos processados: {alunos_processados}")
        print(f"📝 Respostas processadas: {respostas_processadas}")
        
        # 3. Associar com gabarito
        print("\n🔗 PASSO 3: Associando com gabarito...")
        respostas_criadas, media_geral = ProcessadorCSV.associar_resultados_gabarito(
            upload_resultado, gabarito, arquivo_path
        )
        
        print(f"✅ Respostas associadas: {respostas_criadas}")
        print(f"📊 Média geral: {media_geral:.2f}%")
        
        # 4. Exibir estatísticas detalhadas
        print("\n📈 PASSO 4: Estatísticas detalhadas...")
        
        # Estatísticas por aluno
        print("\n👥 DESEMPENHO POR ALUNO:")
        respostas = Resposta.objects.filter(upload_resultado=upload_resultado)
        alunos_unicos = respostas.values_list('aluno__nome', flat=True).distinct()
        
        for nome_aluno in alunos_unicos:
            respostas_aluno = respostas.filter(aluno__nome=nome_aluno)
            total_questoes = respostas_aluno.count()
            acertos = respostas_aluno.filter(correta=True).count()
            percentual = (acertos / total_questoes * 100) if total_questoes > 0 else 0
            
            print(f"  📝 {nome_aluno}: {acertos}/{total_questoes} = {percentual:.1f}%")
        
        # Questões mais difíceis
        print("\n❌ QUESTÕES MAIS DIFÍCEIS:")
        for questao in gabarito.questao_set.all()[:10]:  # Primeiras 10
            respostas_questao = respostas.filter(questao=questao)
            if respostas_questao.exists():
                total = respostas_questao.count()
                erros = respostas_questao.filter(correta=False).count()
                percentual_erro = (erros / total * 100) if total > 0 else 0
                if percentual_erro > 30:  # Mostra questões com mais de 30% de erro
                    print(f"  ❌ Questão {questao.numero}: {percentual_erro:.1f}% de erro (Gabarito: {questao.resposta_correta})")
        
        print(f"\n🎉 PROCESSAMENTO CONCLUÍDO COM SUCESSO!")
        print(f"📊 Sistema está pronto para análises no dashboard!")
        print(f"🌐 Acesse: http://127.0.0.1:8000/dashboard/")
        
        return True
        
    except Exception as e:
        print(f"❌ ERRO no processamento: {str(e)}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    processar_arquivo_usuario()
