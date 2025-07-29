#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import json
import plotly.graph_objects as go
import plotly.express as px
from plotly.subplots import make_subplots
import pandas as pd

def carregar_dados():
    """Carrega os dados processados do arquivo JSON"""
    with open('dados_escolares_processados.json', 'r', encoding='utf-8') as f:
        return json.load(f)

def criar_grafico_ranking_geral(dados):
    """Cria gráfico do ranking geral das escolas"""
    ranking_escolas = dados['estatisticas_gerais']['ranking_escolas']
    
    escolas = [item['escola'] for item in ranking_escolas]
    medias = [item['media_geral'] for item in ranking_escolas]
    registros = [item['num_registros'] for item in ranking_escolas]
    
    fig = go.Figure()
    
    fig.add_trace(go.Bar(
        x=escolas,
        y=medias,
        text=[f'{media:.1f}' for media in medias],
        textposition='auto',
        name='Média Geral',
        marker_color='lightblue',
        hovertemplate='<b>%{x}</b><br>Média: %{y:.2f}<br>Registros: %{customdata}<extra></extra>',
        customdata=registros
    ))
    
    fig.update_layout(
        title='Ranking Geral das Escolas por Desempenho',
        xaxis_title='Escolas',
        yaxis_title='Média Geral',
        xaxis_tickangle=-45,
        height=600,
        showlegend=False
    )
    
    fig.write_html('ranking_escolas.html')
    return fig

def criar_grafico_ranking_por_ano(dados):
    """Cria gráficos de ranking por ano de ensino"""
    ranking_por_ano = dados['ranking_por_ano']
    
    # Cria subplots para cada ano
    anos = sorted(ranking_por_ano.keys())
    
    fig = make_subplots(
        rows=3, cols=3,
        subplot_titles=anos,
        specs=[[{"secondary_y": False}]*3]*3
    )
    
    for i, ano in enumerate(anos):
        row = i // 3 + 1
        col = i % 3 + 1
        
        turmas_ano = ranking_por_ano[ano][:5]  # Top 5 por ano
        
        nomes_turmas = [f"{t['escola']}<br>Turma {t['turma']}" for t in turmas_ano]
        medias = [t['media_geral'] for t in turmas_ano]
        
        fig.add_trace(
            go.Bar(
                x=nomes_turmas,
                y=medias,
                text=[f'{m:.1f}' for m in medias],
                textposition='auto',
                name=ano,
                showlegend=False
            ),
            row=row, col=col
        )
    
    fig.update_layout(
        title='Top 5 Turmas por Ano de Ensino',
        height=1200,
        showlegend=False
    )
    
    fig.write_html('ranking_por_ano.html')
    return fig

def criar_grafico_desempenho_disciplinas(dados):
    """Cria gráfico de desempenho por disciplina"""
    dados_brutos = dados['dados_brutos']
    
    # Agrupa por disciplina
    disciplinas_data = {}
    for item in dados_brutos:
        disciplina = item['disciplina']
        if disciplina not in disciplinas_data:
            disciplinas_data[disciplina] = []
        disciplinas_data[disciplina].append(item['media'])
    
    # Calcula estatísticas por disciplina
    disciplinas = []
    medias = []
    medianas = []
    
    for disciplina, valores in disciplinas_data.items():
        disciplinas.append(disciplina)
        medias.append(sum(valores) / len(valores))
        medianas.append(sorted(valores)[len(valores)//2])
    
    fig = go.Figure()
    
    fig.add_trace(go.Bar(
        x=disciplinas,
        y=medias,
        name='Média',
        text=[f'{m:.1f}' for m in medias],
        textposition='auto',
        marker_color='lightcoral'
    ))
    
    fig.add_trace(go.Bar(
        x=disciplinas,
        y=medianas,
        name='Mediana',
        text=[f'{m:.1f}' for m in medianas],
        textposition='auto',
        marker_color='lightgreen'
    ))
    
    fig.update_layout(
        title='Desempenho Médio por Disciplina',
        xaxis_title='Disciplinas',
        yaxis_title='Nota Média',
        barmode='group',
        height=500
    )
    
    fig.write_html('desempenho_disciplinas.html')
    return fig

def criar_grafico_distribuicao_alunos(dados):
    """Cria gráfico da distribuição de alunos por escola"""
    dados_brutos = dados['dados_brutos']
    
    # Agrupa alunos por escola
    alunos_por_escola = {}
    for item in dados_brutos:
        escola = item['escola']
        if escola not in alunos_por_escola:
            alunos_por_escola[escola] = 0
        alunos_por_escola[escola] += item['alunos']
    
    escolas = list(alunos_por_escola.keys())
    totais_alunos = list(alunos_por_escola.values())
    
    fig = go.Figure(data=[go.Pie(
        labels=escolas,
        values=totais_alunos,
        hole=0.3,
        textinfo='label+percent+value',
        texttemplate='%{label}<br>%{value} alunos<br>(%{percent})'
    )])
    
    fig.update_layout(
        title='Distribuição de Alunos por Escola',
        height=600
    )
    
    fig.write_html('distribuicao_alunos.html')
    return fig

def criar_tabela_ranking_completo(dados):
    """Cria tabela HTML com ranking completo"""
    ranking_por_ano = dados['ranking_por_ano']
    
    html = """
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Ranking Completo das Turmas</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #2c3e50; text-align: center; }
            h2 { color: #34495e; border-bottom: 2px solid #3498db; padding-bottom: 5px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
            th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
            th { background-color: #3498db; color: white; }
            tr:nth-child(even) { background-color: #f2f2f2; }
            .posicao { font-weight: bold; text-align: center; }
            .media { font-weight: bold; color: #27ae60; }
            .top3 { background-color: #fff3cd; }
        </style>
    </head>
    <body>
        <h1>Ranking Completo das Turmas por Desempenho Escolar</h1>
    """
    
    for ano in sorted(ranking_por_ano.keys()):
        turmas = ranking_por_ano[ano]
        
        html += f"""
        <h2>{ano}</h2>
        <table>
            <thead>
                <tr>
                    <th>Posição</th>
                    <th>Escola</th>
                    <th>Turma</th>
                    <th>Média Geral</th>
                    <th>Total de Alunos</th>
                    <th>Disciplinas</th>
                    <th>Língua Portuguesa</th>
                    <th>Matemática</th>
                    <th>Ciências Naturais</th>
                </tr>
            </thead>
            <tbody>
        """
        
        for turma in turmas:
            classe_css = "top3" if turma['posicao'] <= 3 else ""
            
            # Extrai notas por disciplina
            lp = turma['disciplinas'].get('Língua Portuguesa', {}).get('media', '-')
            mat = turma['disciplinas'].get('Matemática', {}).get('media', '-')
            cn = turma['disciplinas'].get('Ciências Naturais', {}).get('media', '-')
            
            html += f"""
                <tr class="{classe_css}">
                    <td class="posicao">{turma['posicao']}º</td>
                    <td>{turma['escola']}</td>
                    <td>{turma['turma']}</td>
                    <td class="media">{turma['media_geral']}</td>
                    <td>{turma['total_alunos']}</td>
                    <td>{turma['num_disciplinas']}</td>
                    <td>{lp if lp != '-' else '-'}</td>
                    <td>{mat if mat != '-' else '-'}</td>
                    <td>{cn if cn != '-' else '-'}</td>
                </tr>
            """
        
        html += """
            </tbody>
        </table>
        """
    
    html += """
    </body>
    </html>
    """
    
    with open('ranking_completo.html', 'w', encoding='utf-8') as f:
        f.write(html)
    
    return html

def gerar_relatorio_executivo(dados):
    """Gera relatório executivo em HTML"""
    stats = dados['estatisticas_gerais']
    
    html = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Relatório Executivo - Desempenho Escolar</title>
        <style>
            body {{ font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }}
            .header {{ background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px; text-align: center; }}
            .stats-grid {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 20px 0; }}
            .stat-card {{ background: #f8f9fa; padding: 20px; border-radius: 10px; text-align: center; border-left: 4px solid #3498db; }}
            .stat-number {{ font-size: 2em; font-weight: bold; color: #2c3e50; }}
            .stat-label {{ color: #7f8c8d; margin-top: 5px; }}
            .insights {{ background: #e8f5e8; padding: 20px; border-radius: 10px; margin: 20px 0; }}
            .top-performers {{ background: #fff3cd; padding: 20px; border-radius: 10px; margin: 20px 0; }}
        </style>
    </head>
    <body>
        <div class="header">
            <h1>Relatório Executivo</h1>
            <h2>Análise de Desempenho Escolar por Turmas</h2>
            <p>Data de Processamento: {dados['metadata']['data_processamento']}</p>
        </div>
        
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-number">{stats['num_escolas']}</div>
                <div class="stat-label">Escolas Analisadas</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">{stats['total_turmas']}</div>
                <div class="stat-label">Turmas Avaliadas</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">{stats['num_anos']}</div>
                <div class="stat-label">Anos de Ensino</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">{stats['num_disciplinas']}</div>
                <div class="stat-label">Disciplinas</div>
            </div>
        </div>
        
        <div class="insights">
            <h3>🎯 Principais Insights</h3>
            <ul>
                <li><strong>Escola com melhor desempenho geral:</strong> {stats['ranking_escolas'][0]['escola']} (Média: {stats['ranking_escolas'][0]['media_geral']:.1f})</li>
                <li><strong>Total de registros de alunos processados:</strong> {stats['total_alunos_registros']:,}</li>
                <li><strong>Disciplinas avaliadas:</strong> {', '.join(stats['disciplinas'])}</li>
                <li><strong>Amplitude de anos:</strong> {stats['anos'][0]} ao {stats['anos'][-1]}</li>
            </ul>
        </div>
        
        <div class="top-performers">
            <h3>🏆 Top 5 Escolas por Desempenho Geral</h3>
            <ol>
    """
    
    for i, escola in enumerate(stats['ranking_escolas'][:5], 1):
        html += f"<li><strong>{escola['escola']}</strong> - Média: {escola['media_geral']:.1f} ({escola['num_registros']} registros)</li>"
    
    html += """
            </ol>
        </div>
        
        <div style="margin-top: 40px; text-align: center; color: #7f8c8d;">
            <p>Relatório gerado automaticamente a partir da análise de 184 imagens de dados escolares</p>
        </div>
    </body>
    </html>
    """
    
    with open('relatorio_executivo.html', 'w', encoding='utf-8') as f:
        f.write(html)
    
    return html

def main():
    print("=== GERAÇÃO DE RELATÓRIOS VISUAIS ===")
    
    # Carrega dados
    dados = carregar_dados()
    print("✓ Dados carregados")
    
    # Gera gráficos
    criar_grafico_ranking_geral(dados)
    print("✓ Gráfico de ranking geral criado")
    
    criar_grafico_ranking_por_ano(dados)
    print("✓ Gráficos de ranking por ano criados")
    
    criar_grafico_desempenho_disciplinas(dados)
    print("✓ Gráfico de desempenho por disciplina criado")
    
    criar_grafico_distribuicao_alunos(dados)
    print("✓ Gráfico de distribuição de alunos criado")
    
    # Gera tabelas e relatórios
    criar_tabela_ranking_completo(dados)
    print("✓ Tabela de ranking completo criada")
    
    gerar_relatorio_executivo(dados)
    print("✓ Relatório executivo gerado")
    
    print("\n=== ARQUIVOS GERADOS ===")
    print("📊 ranking_escolas.html - Ranking geral das escolas")
    print("📊 ranking_por_ano.html - Top 5 turmas por ano")
    print("📊 desempenho_disciplinas.html - Desempenho por disciplina")
    print("📊 distribuicao_alunos.html - Distribuição de alunos")
    print("📋 ranking_completo.html - Tabela completa de rankings")
    print("📄 relatorio_executivo.html - Relatório executivo")
    print("📁 dados_escolares_processados.json - Dados estruturados")

if __name__ == "__main__":
    main()
