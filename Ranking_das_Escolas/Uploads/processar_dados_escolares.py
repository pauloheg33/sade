#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import re
import json
from collections import defaultdict

def normalizar_nome_escola(nome):
    """
    Normaliza nomes de escolas para identificar padrões similares
    Ex: 'JOSE ALVES' e 'JOSE ALVES DE SENA' são tratados como a mesma escola
    """
    # Remove acentos e converte para maiúsculo
    nome = nome.upper().strip()
    
    # Remove underscores e substitui por espaços
    nome = nome.replace('_', ' ')
    
    # Mapeamento de escolas similares (ordem importa - mais específico primeiro)
    mapeamento = {
        'JOSE ALVES DE SENA': 'JOSE ALVES',
        'JOSE ALVES': 'JOSE ALVES',
        '03 DE DEZEMBRO': '03 DE DEZEMBRO',
        '21 DE DEZEMBRO': '21 DE DEZEMBRO',
        'ANTONIO DE SOUSA BARROS': 'ANTONIO DE SOUSA BARROS',
        'FIRMINO JOSÉ': 'FIRMINO JOSÉ',
        'FIRMINO JOSE': 'FIRMINO JOSÉ',
        'JOAQUIM FERREIRA': 'JOAQUIM FERREIRA',
        'MOURÃO LIMA': 'MOURÃO LIMA',
        'MOURAO LIMA': 'MOURÃO LIMA',
        'MARIA AMELIA': 'MARIA AMELIA',
        'MARIA AMÉLIA': 'MARIA AMELIA'
    }
    
    # Verifica se o nome corresponde a algum padrão conhecido
    for padrao, nome_normalizado in mapeamento.items():
        if padrao in nome:
            return nome_normalizado
    
    # Se não encontrou correspondência, retorna o nome limpo
    return nome.strip()

def extrair_dados_arquivo(nome_arquivo):
    """
    Extrai dados do nome do arquivo
    Formato esperado: Ano_Escola_[Turma_]Disciplina_Media_Alunos.png
    """
    # Remove a extensão .png
    nome_base = nome_arquivo.replace('.png', '')
    
    # Padrões específicos para diferentes formatos
    padroes = [
        # Formato: 1o_Ano_A_-_ESCOLA_LP_Media83.9_Alunos6
        r'(\d+[ºo]?)_Ano_([ABC])_-_(.+?)_([A-Z]+)_Media([\d.]+)_Alunos(\d+)',
        # Formato: 7º_Ano_ESCOLA_A_CN_Media78.2_Alunos32
        r'(\d+[ºo]?)_Ano_(.+?)_([ABC])_([A-Z]+)_Media([\d.]+)_Alunos(\d+)',
        # Formato: 6º_Ano_ESCOLA_CN_Media80.0_Alunos7 (sem turma)
        r'(\d+[ºo]?)_Ano_(.+?)_([A-Z]+)_Media([\d.]+)_Alunos(\d+)'
    ]
    
    for i, padrao in enumerate(padroes):
        match = re.match(padrao, nome_base)
        if match:
            grupos = match.groups()
            
            if i == 0:  # Formato: 1o_Ano_A_-_ESCOLA_LP_Media83.9_Alunos6
                ano, turma, escola, disciplina, media, alunos = grupos
            elif i == 1:  # Formato: 7º_Ano_ESCOLA_A_CN_Media78.2_Alunos32
                ano, escola, turma, disciplina, media, alunos = grupos
            else:  # Formato: 6º_Ano_ESCOLA_CN_Media80.0_Alunos7 (sem turma)
                ano, escola, disciplina, media, alunos = grupos
                turma = "ÚNICA"
            
            # Normaliza o ano
            ano = ano.replace('º', '').replace('o', '')
            
            # Normaliza a escola
            escola_normalizada = normalizar_nome_escola(escola)
            
            # Mapeia disciplinas
            disciplinas_map = {
                'CN': 'Ciências Naturais',
                'LP': 'Língua Portuguesa', 
                'MAT': 'Matemática'
            }
            
            disciplina_completa = disciplinas_map.get(disciplina, disciplina)
            
            return {
                'ano': f"{ano}º Ano",
                'escola': escola_normalizada,
                'turma': turma,
                'disciplina': disciplina_completa,
                'media': float(media),
                'alunos': int(alunos),
                'arquivo': nome_arquivo
            }
    
    print(f"Não foi possível processar: {nome_arquivo}")
    return None

def processar_todas_imagens():
    """
    Processa todas as imagens PNG no diretório atual
    """
    dados = []
    arquivos_png = [f for f in os.listdir('.') if f.endswith('.png')]
    
    print(f"Processando {len(arquivos_png)} arquivos...")
    
    for arquivo in sorted(arquivos_png):
        dado = extrair_dados_arquivo(arquivo)
        if dado:
            dados.append(dado)
    
    return dados

def calcular_ranking_turmas(dados):
    """
    Calcula o ranking das turmas por ano baseado na média geral das disciplinas
    """
    # Agrupa dados por ano, escola e turma
    turmas = defaultdict(lambda: defaultdict(list))
    
    for dado in dados:
        chave_turma = f"{dado['escola']} - Turma {dado['turma']}"
        turmas[dado['ano']][chave_turma].append(dado)
    
    ranking_por_ano = {}
    
    for ano, turmas_ano in turmas.items():
        ranking_ano = []
        
        for nome_turma, dados_turma in turmas_ano.items():
            # Calcula média geral da turma (média das disciplinas)
            medias_disciplinas = [d['media'] for d in dados_turma]
            media_geral = sum(medias_disciplinas) / len(medias_disciplinas)
            
            # Calcula total de alunos (assume que é o mesmo para todas as disciplinas)
            total_alunos = dados_turma[0]['alunos']
            
            # Organiza dados por disciplina
            disciplinas = {}
            for d in dados_turma:
                disciplinas[d['disciplina']] = {
                    'media': d['media'],
                    'alunos': d['alunos']
                }
            
            # Extrai escola e turma do nome
            escola, turma_info = nome_turma.split(' - Turma ')
            
            turma_data = {
                'escola': escola,
                'turma': turma_info,
                'media_geral': round(media_geral, 2),
                'total_alunos': total_alunos,
                'disciplinas': disciplinas,
                'num_disciplinas': len(disciplinas)
            }
            
            ranking_ano.append(turma_data)
        
        # Ordena por média geral (decrescente)
        ranking_ano.sort(key=lambda x: x['media_geral'], reverse=True)
        
        # Adiciona posição no ranking
        for i, turma in enumerate(ranking_ano, 1):
            turma['posicao'] = i
        
        ranking_por_ano[ano] = ranking_ano
    
    return ranking_por_ano

def gerar_estatisticas_gerais(dados, ranking):
    """
    Gera estatísticas gerais dos dados
    """
    total_turmas = sum(len(turmas) for turmas in ranking.values())
    total_alunos = sum(d['alunos'] for d in dados)
    
    escolas = set(d['escola'] for d in dados)
    disciplinas = set(d['disciplina'] for d in dados)
    anos = set(d['ano'] for d in dados)
    
    # Média geral por escola
    medias_por_escola = defaultdict(list)
    for d in dados:
        medias_por_escola[d['escola']].append(d['media'])
    
    ranking_escolas = []
    for escola, medias in medias_por_escola.items():
        media_escola = sum(medias) / len(medias)
        ranking_escolas.append({
            'escola': escola,
            'media_geral': round(media_escola, 2),
            'num_registros': len(medias)
        })
    
    ranking_escolas.sort(key=lambda x: x['media_geral'], reverse=True)
    
    return {
        'total_turmas': total_turmas,
        'total_alunos_registros': total_alunos,
        'num_escolas': len(escolas),
        'num_disciplinas': len(disciplinas),
        'num_anos': len(anos),
        'escolas': list(escolas),
        'disciplinas': list(disciplinas),
        'anos': sorted(list(anos)),
        'ranking_escolas': ranking_escolas
    }

def main():
    print("=== PROCESSAMENTO DE DADOS ESCOLARES ===")
    print()
    
    # Processa todas as imagens
    dados = processar_todas_imagens()
    print(f"✓ Processados {len(dados)} registros com sucesso")
    
    # Calcula ranking das turmas
    ranking = calcular_ranking_turmas(dados)
    print(f"✓ Ranking calculado para {len(ranking)} anos de ensino")
    
    # Gera estatísticas gerais
    stats = gerar_estatisticas_gerais(dados, ranking)
    print(f"✓ Estatísticas geradas: {stats['num_escolas']} escolas, {stats['total_turmas']} turmas")
    
    # Prepara dados finais
    dados_finais = {
        'metadata': {
            'data_processamento': '2025-07-29',
            'total_arquivos_processados': len(dados),
            'descricao': 'Ranking de turmas por desempenho escolar'
        },
        'estatisticas_gerais': stats,
        'ranking_por_ano': ranking,
        'dados_brutos': dados
    }
    
    # Salva em JSON
    with open('dados_escolares_processados.json', 'w', encoding='utf-8') as f:
        json.dump(dados_finais, f, ensure_ascii=False, indent=2)
    
    print(f"✓ Dados salvos em 'dados_escolares_processados.json'")
    
    # Exibe resumo do ranking
    print("\n=== RESUMO DO RANKING POR ANO ===")
    for ano in sorted(ranking.keys()):
        print(f"\n{ano}:")
        for i, turma in enumerate(ranking[ano][:3], 1):  # Top 3
            print(f"  {i}º lugar: {turma['escola']} - Turma {turma['turma']} "
                  f"(Média: {turma['media_geral']}, Alunos: {turma['total_alunos']})")
    
    return dados_finais

if __name__ == "__main__":
    main()
