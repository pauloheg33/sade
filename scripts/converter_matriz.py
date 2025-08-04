import re
import json

# Ler o arquivo da matriz completa
with open('matriz_referencia_completa.txt', 'r', encoding='utf-8') as f:
    content = f.read()

# Estrutura para armazenar os dados
matriz_dados = {
    'portugues_leitura': {
        '6': [], '7': [], '8': [], '9': []
    },
    'portugues_escrita': {
        '6': [], '7': [], '8': [], '9': []
    },
    'matematica': {
        '6': [], '7': [], '8': [], '9': []
    },
    'ciencias': {
        '6': [], '7': [], '8': [], '9': []
    }
}

# Processar seções
lines = content.split('\n')
current_subject = None
current_grade = None
current_entry = {}

for line in lines:
    line = line.strip()
    
    if not line:
        continue
    
    # Detectar seção principal
    if line.startswith('### LÍNGUA PORTUGUESA – LEITURA'):
        current_subject = 'portugues_leitura'
        continue
    elif line.startswith('### LÍNGUA PORTUGUESA – ESCRITA'):
        current_subject = 'portugues_escrita'
        continue
    elif line.startswith('### MATEMÁTICA'):
        current_subject = 'matematica'
        continue
    elif line.startswith('### CIÊNCIAS DA NATUREZA'):
        current_subject = 'ciencias'
        continue
    
    # Detectar ano
    if line.startswith('#### '):
        grade_match = re.search(r'(\d+)º ANO', line)
        if grade_match:
            current_grade = grade_match.group(1)
        continue
    
    # Processar entrada de habilidade
    if line.startswith('- Código:'):
        # Salvar entrada anterior se existir
        if current_entry and current_subject and current_grade:
            matriz_dados[current_subject][current_grade].append(current_entry.copy())
        
        # Iniciar nova entrada
        codigo = line.replace('- Código:', '').strip()
        current_entry = {'codigo': codigo}
        
    elif line.strip().startswith('Habilidade:'):
        habilidade = line.replace('Habilidade:', '').strip()
        current_entry['habilidade'] = habilidade
        
        # Extrair palavras-chave da habilidade
        palavras_chave = re.findall(r'\b[a-záéíóúàèìòùâêîôûãõç]{4,}\b', habilidade.lower())
        current_entry['palavras_chave'] = list(set(palavras_chave))[:10]
        
    elif line.strip().startswith('BNCC:'):
        bncc = line.replace('BNCC:', '').strip()
        current_entry['bncc'] = bncc

# Salvar última entrada
if current_entry and current_subject and current_grade:
    matriz_dados[current_subject][current_grade].append(current_entry.copy())

# Gerar arquivo JavaScript
js_content = f"""// Matriz de Referência Completa - SADE v0.3.0
// Gerado automaticamente a partir do arquivo oficial

const matrizReferencia = {json.dumps(matriz_dados, ensure_ascii=False, indent=2)};

// Função para buscar habilidades por disciplina e ano
function buscarHabilidades(disciplina, ano) {{
    return matrizReferencia[disciplina] && matrizReferencia[disciplina][ano] || [];
}}

// Função para correlacionar questão com habilidades
function correlacionarQuestao(textoQuestao, disciplina, ano, precisaoMinima = 50) {{
    const habilidades = buscarHabilidades(disciplina, ano);
    const correlacoes = [];
    
    const palavrasQuestao = extrairPalavrasChave(textoQuestao);
    
    habilidades.forEach(habilidade => {{
        const score = calcularSimilaridade(palavrasQuestao, habilidade.palavras_chave, habilidade.habilidade);
        
        if (score >= precisaoMinima) {{
            correlacoes.push({{
                ...habilidade,
                precisao: score,
                palavras_correspondentes: encontrarPalavrasCorrespondentes(palavrasQuestao, habilidade.palavras_chave)
            }});
        }}
    }});
    
    return correlacoes.sort((a, b) => b.precisao - a.precisao);
}}

// Função para extrair palavras-chave de texto
function extrairPalavrasChave(texto) {{
    const stopWords = new Set([
        'o', 'a', 'os', 'as', 'um', 'uma', 'uns', 'umas', 'de', 'da', 'do', 'das', 'dos',
        'em', 'na', 'no', 'nas', 'nos', 'para', 'por', 'com', 'sem', 'sob', 'sobre',
        'que', 'qual', 'quais', 'como', 'quando', 'onde', 'por que', 'porque',
        'e', 'ou', 'mas', 'se', 'então', 'assim', 'também', 'já', 'ainda',
        'é', 'são', 'foi', 'foram', 'ser', 'estar', 'ter', 'haver',
        'este', 'esta', 'estes', 'estas', 'esse', 'essa', 'esses', 'essas',
        'aquele', 'aquela', 'aqueles', 'aquelas', 'isso', 'isto', 'aquilo',
        'texto', 'questão', 'pergunta', 'resposta', 'letra', 'item', 'alternativa'
    ]);
    
    return texto.toLowerCase()
        .replace(/[^\\w\\sáéíóúàèìòùâêîôûãõç]/g, ' ')
        .split(/\\s+/)
        .filter(palavra => palavra.length > 3 && !stopWords.has(palavra))
        .slice(0, 15);
}}

// Função para calcular similaridade entre textos
function calcularSimilaridade(palavrasQuestao, palavrasHabilidade, textoHabilidade) {{
    let score = 0;
    let matches = 0;
    
    // Pontuação por palavras-chave correspondentes
    palavrasQuestao.forEach(palavra => {{
        if (palavrasHabilidade.includes(palavra)) {{
            matches++;
            score += 15; // 15 pontos por palavra-chave exata
        }} else {{
            // Verificar similaridade parcial
            palavrasHabilidade.forEach(habilPalavra => {{
                if (palavra.includes(habilPalavra) || habilPalavra.includes(palavra)) {{
                    score += 8; // 8 pontos por similaridade parcial
                }}
            }});
            
            // Verificar no texto completo da habilidade
            if (textoHabilidade.toLowerCase().includes(palavra)) {{
                score += 5; // 5 pontos por presença no texto
            }}
        }}
    }});
    
    // Bônus por densidade de correspondências
    if (matches > 0) {{
        const densidade = matches / Math.max(palavrasQuestao.length, palavrasHabilidade.length);
        score += densidade * 20;
    }}
    
    return Math.min(Math.round(score), 100);
}}

// Função para encontrar palavras correspondentes
function encontrarPalavrasCorrespondentes(palavrasQuestao, palavrasHabilidade) {{
    return palavrasQuestao.filter(palavra => 
        palavrasHabilidade.includes(palavra) ||
        palavrasHabilidade.some(habil => palavra.includes(habil) || habil.includes(palavra))
    );
}}

// Estatísticas da matriz
const estatisticasMatriz = {{
    total: Object.values(matrizReferencia).reduce((total, disciplina) => 
        total + Object.values(disciplina).reduce((subTotal, ano) => subTotal + ano.length, 0), 0
    ),
    porDisciplina: Object.fromEntries(
        Object.entries(matrizReferencia).map(([disc, anos]) => [
            disc, 
            Object.values(anos).reduce((total, ano) => total + ano.length, 0)
        ])
    )
}};

console.log('📚 Matriz de Referência carregada:', estatisticasMatriz);
"""

# Salvar arquivo JavaScript
with open('matriz-referencia-dados.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

print("✅ Arquivo matriz-referencia-dados.js criado com sucesso!")
print(f"📊 Total de habilidades processadas: {sum(len(anos[ano]) for anos in matriz_dados.values() for ano in anos)}")
