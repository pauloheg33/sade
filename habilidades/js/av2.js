// Dados simulados para AV2 (substitua pelos dados reais)
const dadosAV2 = {
    escolas: [
        'FIRMINO JOSÉ',
        'JOAQUIM FERREIRA', 
        'JOSÉ ALVES DE SENA',
        'MOURÃO LIMA',
        'ANTONIO DE SOUSA BARROS',
        '03 DE DEZEMBRO',
        'MARIA AMELIA'
    ],
    
    // Dados simulados por ano/disciplina/escola
    resultados: {
        '2_portugues': [
            { escola: 'FIRMINO JOSÉ', alunos: 18, media: 68.5 },
            { escola: 'JOAQUIM FERREIRA', alunos: 22, media: 71.2 },
            { escola: 'MOURÃO LIMA', alunos: 20, media: 74.8 }
        ],
        '2_matematica': [
            { escola: 'FIRMINO JOSÉ', alunos: 18, media: 65.3 },
            { escola: 'JOAQUIM FERREIRA', alunos: 22, media: 68.7 },
            { escola: 'MOURÃO LIMA', alunos: 20, media: 72.1 }
        ],
        '4_portugues': [
            { escola: 'JOSÉ ALVES DE SENA', alunos: 25, media: 63.4 },
            { escola: 'ANTONIO DE SOUSA BARROS', alunos: 19, media: 69.8 },
            { escola: '03 DE DEZEMBRO', alunos: 15, media: 75.2 }
        ],
        '4_matematica': [
            { escola: 'JOSÉ ALVES DE SENA', alunos: 25, media: 61.8 },
            { escola: 'ANTONIO DE SOUSA BARROS', alunos: 19, media: 67.3 },
            { escola: '03 DE DEZEMBRO', alunos: 15, media: 73.9 }
        ],
        '5_portugues': [
            { escola: 'FIRMINO JOSÉ', alunos: 23, media: 70.1 },
            { escola: 'MOURÃO LIMA', alunos: 21, media: 73.6 },
            { escola: 'MARIA AMELIA', alunos: 16, media: 76.8 }
        ],
        '5_matematica': [
            { escola: 'FIRMINO JOSÉ', alunos: 23, media: 67.8 },
            { escola: 'MOURÃO LIMA', alunos: 21, media: 71.2 },
            { escola: 'MARIA AMELIA', alunos: 16, media: 74.5 }
        ],
        '8_portugues': [
            { escola: 'JOAQUIM FERREIRA', alunos: 28, media: 64.7 },
            { escola: 'JOSÉ ALVES DE SENA', alunos: 24, media: 59.3 },
            { escola: 'MOURÃO LIMA', alunos: 26, media: 68.9 }
        ],
        '8_matematica': [
            { escola: 'JOAQUIM FERREIRA', alunos: 28, media: 62.4 },
            { escola: 'JOSÉ ALVES DE SENA', alunos: 24, media: 57.1 },
            { escola: 'MOURÃO LIMA', alunos: 26, media: 66.2 }
        ],
        '9_portugues': [
            { escola: 'FIRMINO JOSÉ', alunos: 20, media: 66.8 },
            { escola: 'JOAQUIM FERREIRA', alunos: 25, media: 69.4 },
            { escola: 'ANTONIO DE SOUSA BARROS', alunos: 18, media: 72.1 }
        ],
        '9_matematica': [
            { escola: 'FIRMINO JOSÉ', alunos: 20, media: 64.2 },
            { escola: 'JOAQUIM FERREIRA', alunos: 25, media: 67.8 },
            { escola: 'ANTONIO DE SOUSA BARROS', alunos: 18, media: 70.5 }
        ]
    }
};

let chartDesempenho = null;
let chartEscolas = null;

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    carregarEscolas();
    configurarEventos();
});

function carregarEscolas() {
    const selectEscola = document.getElementById('filter-escola-av2');
    dadosAV2.escolas.forEach(escola => {
        const option = document.createElement('option');
        option.value = escola;
        option.textContent = escola;
        selectEscola.appendChild(option);
    });
}

function configurarEventos() {
    document.getElementById('analisar-av2').addEventListener('click', analisarDados);
    document.getElementById('limpar-filtros-av2').addEventListener('click', limparFiltros);
    
    // Auto-análise quando ambos filtros estão selecionados
    document.getElementById('filter-ano-av2').addEventListener('change', verificarAutoAnalise);
    document.getElementById('filter-disciplina-av2').addEventListener('change', verificarAutoAnalise);
}

function verificarAutoAnalise() {
    const ano = document.getElementById('filter-ano-av2').value;
    const disciplina = document.getElementById('filter-disciplina-av2').value;
    
    if (ano && disciplina) {
        setTimeout(() => analisarDados(), 500);
    }
}

function analisarDados() {
    const ano = document.getElementById('filter-ano-av2').value;
    const disciplina = document.getElementById('filter-disciplina-av2').value;
    const escola = document.getElementById('filter-escola-av2').value;
    
    if (!ano || !disciplina) {
        alert('Por favor, selecione o ano escolar e a disciplina');
        return;
    }
    
    mostrarLoading(true);
    
    // Simular delay de carregamento
    setTimeout(() => {
        const chave = `${ano}_${disciplina}`;
        let dados = dadosAV2.resultados[chave] || [];
        
        // Filtrar por escola se selecionada
        if (escola) {
            dados = dados.filter(item => item.escola === escola);
        }
        
        if (dados.length === 0) {
            mostrarMensagemSemDados();
            return;
        }
        
        exibirResultados(dados, ano, disciplina);
        mostrarLoading(false);
    }, 1000);
}

function mostrarLoading(mostrar) {
    document.getElementById('loading-av2').style.display = mostrar ? 'block' : 'none';
    document.getElementById('resultados-av2').style.display = mostrar ? 'none' : 'block';
    document.getElementById('stats-container').style.display = mostrar ? 'none' : 'flex';
    document.getElementById('placeholder-av2').style.display = mostrar ? 'none' : 'none';
}

function mostrarMensagemSemDados() {
    document.getElementById('loading-av2').style.display = 'none';
    document.getElementById('resultados-av2').style.display = 'none';
    document.getElementById('stats-container').style.display = 'none';
    
    const placeholder = document.getElementById('placeholder-av2');
    placeholder.innerHTML = `
        <i class="fas fa-exclamation-triangle" style="font-size: 4rem; color: #ffc107; margin-bottom: 1rem;"></i>
        <h4 class="text-warning">Nenhum dado encontrado</h4>
        <p class="text-muted mb-0">
            Não foram encontrados dados para os filtros selecionados
        </p>
    `;
    placeholder.style.display = 'block';
}

function exibirResultados(dados, ano, disciplina) {
    const disciplinaTexto = disciplina === 'portugues' ? 'Português' : 'Matemática';
    
    // Atualizar título
    document.getElementById('resultado-titulo').textContent = 
        `${disciplinaTexto} - ${ano}º Ano`;
    
    // Calcular estatísticas
    const totalAlunos = dados.reduce((sum, item) => sum + item.alunos, 0);
    const mediaGeral = dados.reduce((sum, item) => sum + (item.media * item.alunos), 0) / totalAlunos;
    const totalEscolas = dados.length;
    const totalQuestoes = Math.floor(Math.random() * 20) + 15; // Simulado
    
    // Atualizar estatísticas
    document.getElementById('total-alunos').textContent = totalAlunos;
    document.getElementById('media-geral-av2').textContent = mediaGeral.toFixed(1) + '%';
    document.getElementById('escolas-participantes').textContent = totalEscolas;
    document.getElementById('questoes-analisadas').textContent = totalQuestoes;
    
    // Criar gráficos
    criarGraficoDesempenho(dados);
    criarGraficoEscolas(dados);
    
    // Preencher tabela
    preencherTabela(dados, ano, disciplinaTexto);
    
    // Mostrar seções
    document.getElementById('placeholder-av2').style.display = 'none';
    document.getElementById('stats-container').style.display = 'flex';
    document.getElementById('resultados-av2').style.display = 'block';
}

function criarGraficoDesempenho(dados) {
    const ctx = document.getElementById('chart-desempenho-av2').getContext('2d');
    
    if (chartDesempenho) {
        chartDesempenho.destroy();
    }
    
    // Categorizar desempenho
    const categorias = { 'Baixo (< 60%)': 0, 'Médio (60-75%)': 0, 'Alto (> 75%)': 0 };
    
    dados.forEach(item => {
        if (item.media < 60) categorias['Baixo (< 60%)']++;
        else if (item.media <= 75) categorias['Médio (60-75%)']++;
        else categorias['Alto (> 75%)']++;
    });
    
    chartDesempenho = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(categorias),
            datasets: [{
                data: Object.values(categorias),
                backgroundColor: ['#dc3545', '#ffc107', '#28a745'],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

function criarGraficoEscolas(dados) {
    const ctx = document.getElementById('chart-escolas-av2').getContext('2d');
    
    if (chartEscolas) {
        chartEscolas.destroy();
    }
    
    // Ordenar por média
    const dadosOrdenados = [...dados].sort((a, b) => b.media - a.media);
    
    chartEscolas = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: dadosOrdenados.map(item => item.escola),
            datasets: [{
                label: 'Média (%)',
                data: dadosOrdenados.map(item => item.media),
                backgroundColor: 'rgba(54, 162, 235, 0.8)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}

function preencherTabela(dados, ano, disciplina) {
    const tbody = document.querySelector('#tabela-resultados-av2 tbody');
    tbody.innerHTML = '';
    
    // Ordenar por média (decrescente)
    const dadosOrdenados = [...dados].sort((a, b) => b.media - a.media);
    
    dadosOrdenados.forEach(item => {
        const tr = document.createElement('tr');
        
        // Determinar classe de desempenho
        let classeDesempenho = 'badge bg-success';
        let textoDesempenho = 'Alto';
        
        if (item.media < 60) {
            classeDesempenho = 'badge bg-danger';
            textoDesempenho = 'Baixo';
        } else if (item.media <= 75) {
            classeDesempenho = 'badge bg-warning';
            textoDesempenho = 'Médio';
        }
        
        tr.innerHTML = `
            <td>${item.escola}</td>
            <td>${ano}º Ano</td>
            <td>${disciplina}</td>
            <td>${item.alunos}</td>
            <td>${item.media.toFixed(1)}%</td>
            <td><span class="${classeDesempenho}">${textoDesempenho}</span></td>
        `;
        
        tbody.appendChild(tr);
    });
}

function limparFiltros() {
    document.getElementById('filter-ano-av2').value = '';
    document.getElementById('filter-disciplina-av2').value = '';
    document.getElementById('filter-escola-av2').value = '';
    
    // Resetar interface
    document.getElementById('loading-av2').style.display = 'none';
    document.getElementById('resultados-av2').style.display = 'none';
    document.getElementById('stats-container').style.display = 'none';
    
    const placeholder = document.getElementById('placeholder-av2');
    placeholder.innerHTML = `
        <i class="fas fa-chart-line" style="font-size: 4rem; color: #dee2e6; margin-bottom: 1rem;"></i>
        <h4 class="text-muted">Selecione os filtros e clique em "Analisar Dados"</h4>
        <p class="text-muted mb-0">
            Escolha o ano escolar e a disciplina para visualizar os resultados da avaliação AV2
        </p>
    `;
    placeholder.style.display = 'block';
    
    // Destruir gráficos
    if (chartDesempenho) {
        chartDesempenho.destroy();
        chartDesempenho = null;
    }
    
    if (chartEscolas) {
        chartEscolas.destroy();
        chartEscolas = null;
    }
}
