#!/usr/bin/env python
"""
Script de teste para analisar e corrigir problemas no processamento de CSV
"""

import os
import sys
import django
import pandas as pd

# Configurar Django
sys.path.append('/home/paulo/Área de trabalho/sade/sade')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'sade.settings')
django.setup()

from dashboard.utils import ProcessadorCSV
from dashboard.models import Escola, Turma, Aluno, Disciplina, Gabarito, Questao, Resposta, UploadResultado

def analisar_csv(arquivo_path):
    """Analisa o arquivo CSV para identificar problemas"""
    print(f"=== ANALISANDO ARQUIVO: {arquivo_path} ===")
    
    try:
        # Lê o arquivo
        df = pd.read_csv(arquivo_path)
        print(f"✅ Arquivo lido com sucesso!")
        print(f"📊 Dimensões: {df.shape[0]} linhas x {df.shape[1]} colunas")
        
        # Mostra as colunas
        print(f"\n📋 COLUNAS ENCONTRADAS:")
        for i, col in enumerate(df.columns, 1):
            print(f"  {i:2d}. {col}")
        
        # Identifica colunas de respostas
        colunas_respostas = [col for col in df.columns if 'Resposta' in col and 'P.' in col]
        print(f"\n📝 COLUNAS DE RESPOSTAS ENCONTRADAS ({len(colunas_respostas)}):")
        for col in colunas_respostas:
            print(f"  - {col}")
        
        # Analisa os dados
        print(f"\n👥 DADOS DOS ALUNOS:")
        for idx, row in df.iterrows():
            nome = row.get('Nome do aluno', 'N/A')
            turma = row.get('Nome da turma', 'N/A')
            percentual = row.get('Pontuação percentual', 'N/A')
            print(f"  {idx+1}. {nome} - {turma} - {percentual}")
        
        # Analisa as respostas
        print(f"\n📊 ANÁLISE DAS RESPOSTAS:")
        for col in colunas_respostas[:5]:  # Primeiras 5 questões
            valores_unicos = df[col].unique()
            print(f"  {col}: {valores_unicos}")
        
        return df
        
    except Exception as e:
        print(f"❌ ERRO ao analisar arquivo: {str(e)}")
        return None

def processar_csv_com_debug(arquivo_path):
    """Tenta processar o CSV com debug detalhado"""
    print(f"\n=== PROCESSANDO ARQUIVO ===")
    
    try:
        # Primeiro, cria um gabarito de teste
        print("📚 Criando gabarito de teste...")
        from dashboard.models import Disciplina, Gabarito, Questao
        
        # Cria disciplina se não existir
        disciplina, created = Disciplina.objects.get_or_create(nome="Língua Portuguesa")
        print(f"📖 Disciplina: {disciplina.nome} {'(criada)' if created else '(existente)'}")
        
        # Cria gabarito de teste
        gabarito, created = Gabarito.objects.get_or_create(
            nome="CICLO II 1º ano LÍNGUA PORTUGUESA - Teste",
            disciplina=disciplina,
            ano_escolar="1ano",
            defaults={'ativo': True}
        )
        print(f"📋 Gabarito: {gabarito.nome} {'(criado)' if created else '(existente)'}")
        
        # Cria questões de exemplo (22 questões baseadas no CSV)
        if created or gabarito.questao_set.count() == 0:
            # Gabarito exemplo baseado no padrão das respostas
            respostas_gabarito = ['A', 'B', 'C', 'A', 'B', 'C', 'A', 'B', 'A', 'B', 'C', 'B', 'C', 'A', 'D', 'A', 'A', 'B', 'A', 'B', 'C', 'C']
            
            for i, resposta in enumerate(respostas_gabarito, 1):
                Questao.objects.get_or_create(
                    gabarito=gabarito,
                    numero=i,
                    defaults={'resposta_correta': resposta}
                )
            print(f"✅ Criadas {len(respostas_gabarito)} questões no gabarito")
        
        # Agora processa os resultados
        print("\n📊 Processando resultados...")
        escola_nome = "Escola Teste SADE"
        nome_upload = "Teste 1º ANO A - DEZEMBRO 2025"
        
        upload_resultado, alunos_processados, respostas_processadas = ProcessadorCSV.processar_resultados(
            arquivo_path, nome_upload, escola_nome
        )
        
        print(f"✅ Upload processado: {upload_resultado.nome}")
        print(f"👥 Alunos processados: {alunos_processados}")
        print(f"📝 Respostas processadas: {respostas_processadas}")
        
        # Associa com o gabarito
        print("\n🔗 Associando com gabarito...")
        respostas_criadas, media_geral = ProcessadorCSV.associar_resultados_gabarito(
            upload_resultado, gabarito, arquivo_path
        )
        
        print(f"✅ Respostas associadas: {respostas_criadas}")
        print(f"📊 Média geral: {media_geral:.2f}%")
        
        return True
        
    except Exception as e:
        print(f"❌ ERRO no processamento: {str(e)}")
        import traceback
        traceback.print_exc()
        return False

def main():
    arquivo_path = "/home/paulo/Área de trabalho/sade/sade/media/resultados/1º_ANO_A_-_03_DE_DEZEMBRO_2025_2026_73877.csv"
    
    if not os.path.exists(arquivo_path):
        print(f"❌ Arquivo não encontrado: {arquivo_path}")
        return
    
    # Analisa o arquivo
    df = analisar_csv(arquivo_path)
    
    if df is not None:
        # Tenta processar
        sucesso = processar_csv_com_debug(arquivo_path)
        
        if sucesso:
            print(f"\n🎉 PROCESSAMENTO CONCLUÍDO COM SUCESSO!")
        else:
            print(f"\n❌ FALHA NO PROCESSAMENTO")

if __name__ == "__main__":
    main()
