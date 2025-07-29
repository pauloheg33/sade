#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import re
import json
from collections import defaultdict
import pandas as pd

def extrair_dados_do_nome_arquivo(nome_arquivo):
    """
    Extrai dados estruturados do nome do arquivo
    Formato esperado: AnoEnsino_Escola_Disciplina_MediaXX.X_AlunosYY.png
    """
    # Remove a extensão .png
    nome_base = nome_arquivo.replace('.png', '')
    
    # Padrão regex para extrair informações
    # Captura: Ano, Escola, Disciplina, Média, Número de Alunos
    padrao = r'^(\d+[ºo]_Ano)_(.+?)_([A-Z]+)_Media(\d+\.?\d*)_Alunos(\d+)$'
    
    match = re.match(padrao, nome_base)
    
    if match:
        ano_ensino = match.group(1)
        escola_raw = match.group(2)
        disciplina = match.group(3)
        media = float(match.group(4))
        num_alunos = int(match.group(5))
        
        # Limpar e padronizar nome da escola
        escola = limpar_nome_escola(escola_raw)
        
        # Mapear disciplinas
        disciplinas_map = {
            'LP': 'Língua Portuguesa',
            'MAT': 'Matemática', 
            'CN': 'Ciências Naturais'
        }
        
        disciplina_nome = disciplinas_map.get(disciplina, disciplina)
        
        # Padronizar ano de ensino
        ano_padronizado = padronizar_ano_ensino(ano_ensino)
        
        return {
            'ano_ensino': ano_padronizado,
            'escola': escola,
            'disciplina': disciplina_nome,
            'media': media,
            'num_alunos': num_alunos,
            'arquivo': nome_arquivo
        }
    
    return None

def limpar_nome_escola(escola_raw):
    """
    Limpa e padroniza nomes das escolas
    """
    # Remove prefixos de turma (A_, B_, etc.)
    escola = re.sub(r'^[A-Z]_-_', '', escola_raw)
    
    # Substitui underscores por espaços
    escola = escola.replace('_', ' ')
    
    # Padroniza nomes conhecidos
    padronizacoes = {
        '03 DE DEZEMBRO': 'Escola 03 de Dezembro',
        '21 DE DEZEMBRO': 'Escola 21 de Dezembro', 
        'ANTONIO DE SOUSA BARROS': 'Escola Antônio de Sousa Barros',
        'FIRMINO JOSÉ': 'Escola Firmino José',
        'JOSE ALVES': 'Escola José Alves',
        'JOSE ALVES DE SENA': 'Escola José Alves de Sena',
        'JOAQUIM FERREIRA': 'Escola Joaquim Ferreira',
        'MOURÃO LIMA': 'Escola Mourão Lima',
        'MARIA AMELIA': 'Escola Maria Amélia'
    }
    
    for nome_original, nome_padronizado in padronizacoes.items():
        if nome_original in escola:
            escola = nome_padronizado
            break
    
    return escola

def padronizar_ano_ensino(ano_raw):
    """
    Padroniza anos de ensino
    """
    # Extrai o número do ano
    numero = re.search(r'(\d+)', ano_raw).group(1)
    
    if numero in ['1', '2', '3', '4', '5']:
        return f'{numero}º Ano - Ensino Fundamental I'
    elif numero in ['6', '7', '8', '9']:
        return f'{numero}º Ano - Ensino Fundamental II'
    else:
        return f'{numero}º Ano'

def calcular_media_ponderada_escola(dados_escola):
    """
    Calcula média ponderada da escola considerando número de alunos
    """
    total_pontos = 0
    total_alunos = 0
    
    for dado in dados_escola:
        total_pontos += dado['media'] * dado['num_alunos']
        total_alunos += dado['num_alunos']
    
    if total_alunos == 0:
        return 0
    
    return total_pontos / total_alunos

def processar_dados_escolas():
    """
    Processa todos os arquivos e cria estrutura de dados
    """
    diretorio = '/home/ubuntu/Uploads'
    dados_brutos = []
    
    # Processar todos os arquivos PNG
    for arquivo in os.listdir(diretorio):
        if arquivo.endswith('.png'):
            dados = extrair_dados_do_nome_arquivo(arquivo)
            if dados:
                dados_brutos.append(dados)
    
    print(f"Processados {len(dados_brutos)} arquivos com dados válidos")
    
    # Organizar dados por escola e ano de ensino
    dados_organizados = defaultdict(lambda: defaultdict(list))
    
    for dado in dados_brutos:
        escola = dado['escola']
        ano_ensino = dado['ano_ensino']
        dados_organizados[escola][ano_ensino].append(dado)
    
    # Calcular métricas por escola e ano
    rankings = {}
    
    for escola, anos_dados in dados_organizados.items():
        rankings[escola] = {}
        
        for ano_ensino, disciplinas_dados in anos_dados.items():
            # Calcular média geral da escola para este ano
            media_geral = calcular_media_ponderada_escola(disciplinas_dados)
            
            # Calcular médias por disciplina
            disciplinas_medias = {}
            total_alunos_ano = 0
            
            for dado in disciplinas_dados:
                disciplina = dado['disciplina']
                if disciplina not in disciplinas_medias:
                    disciplinas_medias[disciplina] = []
                disciplinas_medias[disciplina].append({
                    'media': dado['media'],
                    'alunos': dado['num_alunos']
                })
                total_alunos_ano += dado['num_alunos']
            
            # Calcular média ponderada por disciplina
            medias_disciplinas_final = {}
            for disciplina, dados_disc in disciplinas_medias.items():
                total_pontos = sum(d['media'] * d['alunos'] for d in dados_disc)
                total_alunos_disc = sum(d['alunos'] for d in dados_disc)
                medias_disciplinas_final[disciplina] = total_pontos / total_alunos_disc if total_alunos_disc > 0 else 0
            
            rankings[escola][ano_ensino] = {
                'media_geral': round(media_geral, 2),
                'total_alunos': total_alunos_ano,
                'disciplinas': medias_disciplinas_final,
                'detalhes': disciplinas_dados
            }
    
    return rankings, dados_brutos

def criar_rankings_por_ano():
    """
    Cria rankings ordenados por ano de ensino
    """
    rankings, dados_brutos = processar_dados_escolas()
    
    # Organizar rankings por ano de ensino
    rankings_por_ano = defaultdict(list)
    
    for escola, anos_dados in rankings.items():
        for ano_ensino, metricas in anos_dados.items():
            rankings_por_ano[ano_ensino].append({
                'escola': escola,
                'media_geral': metricas['media_geral'],
                'total_alunos': metricas['total_alunos'],
                'disciplinas': metricas['disciplinas']
            })
    
    # Ordenar cada ano por média geral (decrescente)
    for ano in rankings_por_ano:
        rankings_por_ano[ano].sort(key=lambda x: x['media_geral'], reverse=True)
        
        # Adicionar posição no ranking
        for i, escola_dados in enumerate(rankings_por_ano[ano]):
            escola_dados['posicao'] = i + 1
    
    return dict(rankings_por_ano), rankings, dados_brutos

def gerar_estatisticas_gerais(rankings_por_ano, dados_brutos):
    """
    Gera estatísticas gerais do sistema educacional
    """
    total_escolas = len(set(dado['escola'] for dado in dados_brutos))
    total_alunos = sum(dado['num_alunos'] for dado in dados_brutos)
    
    # Média geral por disciplina
    disciplinas_stats = defaultdict(list)
    for dado in dados_brutos:
        disciplinas_stats[dado['disciplina']].append({
            'media': dado['media'],
            'alunos': dado['num_alunos']
        })
    
    medias_disciplinas_sistema = {}
    for disciplina, dados_disc in disciplinas_stats.items():
        total_pontos = sum(d['media'] * d['alunos'] for d in dados_disc)
        total_alunos_disc = sum(d['alunos'] for d in dados_disc)
        medias_disciplinas_sistema[disciplina] = round(total_pontos / total_alunos_disc, 2)
    
    # Escola com melhor desempenho geral
    todas_medias_escolas = []
    for ano_dados in rankings_por_ano.values():
        for escola_dados in ano_dados:
            todas_medias_escolas.append({
                'escola': escola_dados['escola'],
                'ano': ano_dados,
                'media': escola_dados['media_geral']
            })
    
    if todas_medias_escolas:
        melhor_escola = max(todas_medias_escolas, key=lambda x: x['media'])
    else:
        melhor_escola = None
    
    return {
        'total_escolas': total_escolas,
        'total_alunos': total_alunos,
        'total_turmas': len(dados_brutos),
        'medias_disciplinas_sistema': medias_disciplinas_sistema,
        'melhor_desempenho': melhor_escola
    }

def main():
    """
    Função principal
    """
    print("🏫 Processando dados das escolas...")
    
    # Processar dados e criar rankings
    rankings_por_ano, rankings_completos, dados_brutos = criar_rankings_por_ano()
    
    # Gerar estatísticas
    estatisticas = gerar_estatisticas_gerais(rankings_por_ano, dados_brutos)
    
    # Estrutura final dos dados
    dados_finais = {
        'metadata': {
            'data_processamento': '2025-07-29',
            'total_arquivos_processados': len(dados_brutos),
            'versao': '1.0'
        },
        'estatisticas_gerais': estatisticas,
        'rankings_por_ano': rankings_por_ano,
        'dados_detalhados_escolas': rankings_completos,
        'dados_brutos': dados_brutos
    }
    
    # Salvar em JSON
    arquivo_saida = '/home/ubuntu/ranking_escolas.json'
    with open(arquivo_saida, 'w', encoding='utf-8') as f:
        json.dump(dados_finais, f, ensure_ascii=False, indent=2)
    
    print(f"✅ Dados processados e salvos em: {arquivo_saida}")
    
    # Exibir resumo
    print("\n📊 RESUMO DOS RESULTADOS:")
    print(f"• Total de escolas: {estatisticas['total_escolas']}")
    print(f"• Total de alunos: {estatisticas['total_alunos']}")
    print(f"• Total de turmas: {estatisticas['total_turmas']}")
    
    print("\n🏆 RANKINGS POR ANO DE ENSINO:")
    for ano, ranking in rankings_por_ano.items():
        print(f"\n{ano}:")
        for i, escola in enumerate(ranking[:3]):  # Top 3
            print(f"  {i+1}º {escola['escola']} - Média: {escola['media_geral']}")
    
    print(f"\n📈 MÉDIAS POR DISCIPLINA (Sistema):")
    for disciplina, media in estatisticas['medias_disciplinas_sistema'].items():
        print(f"  • {disciplina}: {media}")
    
    return dados_finais

if __name__ == "__main__":
    dados = main()
