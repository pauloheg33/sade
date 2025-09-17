
// SADE Habilidades - Dados e Funções de Processamento

// Variáveis globais
let habilidadesData = {};
let questoesData = {};
let escolasData = [];
let currentFilters = {
    ano: '',
    disciplina: '',
    escola: '',
    search: ''
};

// Dados simulados de desempenho por escola (baseados nos gráficos)
const desempenhoEscolas = {
    'FIRMINO JOSÉ': { media: 68.2, alunos: 22 },
    'JOSE ALVES': { media: 63.8, alunos: 18 },
    '03 DE DEZEMBRO': { media: 75.1, alunos: 15 },
    '21 DE DEZEMBRO': { media: 66.9, alunos: 30 },
    'ANTONIO DE SOUSA BARROS': { media: 64.5, alunos: 12 },
    'JOAQUIM FERREIRA': { media: 68.5, alunos: 25 },
    'MARIA AMELIA': { media: 71.4, alunos: 14 },
    'MOURÃO LIMA': { media: 72.8, alunos: 28 }
};

// Cores para gráficos
const coresGraficos = {
    LP: '#4472c4',
    MAT: '#70ad47', 
    CN: '#ffc000'
};

// Função para carregar dados
async function carregarDados() {
    try {
        // Mostrar loading
        document.getElementById('loading').style.display = 'block';
        document.getElementById('resultados-container').style.display = 'none';
        document.getElementById('graficos-container').style.display = 'none';
        
        // Carregar arquivos JSON
        const [habilidadesRes, questoesRes, escolasRes] = await Promise.all([
            fetch('js/matriz_habilidades.json'),
            fetch('js/questoes.json'),
            fetch('js/escolas.json')
        ]);
        
        habilidadesData = await habilidadesRes.json();
        questoesData = await questoesRes.json();
        escolasData = await escolasRes.json();
        
        // Simular dados de desempenho baseados nos gráficos
        processarDadosDesempenho();
        
        // Preencher select de escolas
        preencherSelectEscolas();
        
        // Aplicar filtros e mostrar resultados
        aplicarFiltros();
        
        // Esconder loading
        document.getElementById('loading').style.display = 'none';
        
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
        document.getElementById('loading').innerHTML = `
            <div class="alert alert-danger">
                <i class="fas fa-exclamation-triangle me-2"></i>
                Erro ao carregar dados: ${error.message}
            </div>
        `;
    }
}

// Processar dados de desempenho
function processarDadosDesempenho() {
    // Para cada habilidade, calcular métricas baseadas nas questões associadas
    Object.keys(habilidadesData).forEach(key => {
        const hab = habilidadesData[key];
        
        if (hab.questoes_ids.length > 0) {
            // Calcular média de acertos baseada nas questões
            let totalAcertos = 0;
            let totalAlunos = 0;
            
            hab.questoes_ids.forEach(questaoId => {
                const questao = questoesData[questaoId];
                if (questao) {
                    totalAcertos += questao.acertos || 0;
                    totalAlunos += questao.total_alunos || 0;
                }
            });
            
            hab.media_acertos = totalAlunos > 0 ? 
                Math.round((totalAcertos / totalAlunos) * 100 * 100) / 100 : 0;
            
            // Simular percentual de alunos com desempenho adequado
            hab.alunos_adequado = Math.max(0, hab.media_acertos - (10 + Math.random() * 20));
            hab.alunos_adequado = Math.round(hab.alunos_adequado * 100) / 100;
            
            // Classificar desempenho
            if (hab.media_acertos >= 75) hab.classificacao = 'alto';
            else if (hab.media_acertos >= 60) hab.classificacao = 'medio';
            else hab.classificacao = 'baixo';
        } else {
            // Dados simulados para habilidades sem questões
            hab.media_acertos = 50 + Math.random() * 40;
            hab.alunos_adequado = hab.media_acertos - (5 + Math.random() * 15);
            hab.classificacao = hab.media_acertos >= 75 ? 'alto' : 
                               (hab.media_acertos >= 60 ? 'medio' : 'baixo');
        }
    });
}

// Preencher select de escolas
function preencherSelectEscolas() {
    const selectEscola = document.getElementById('filter-escola');
    selectEscola.innerHTML = '<option value="">Todas as escolas</option>';
    
    escolasData.forEach(escola => {
        const option = document.createElement('option');
        option.value = escola;
        option.textContent = escola;
        selectEscola.appendChild(option);
    });
}

// Aplicar filtros
function aplicarFiltros() {
    // Obter valores dos filtros
    currentFilters.ano = document.getElementById('filter-ano').value;
    currentFilters.disciplina = document.getElementById('filter-disciplina').value;
    currentFilters.escola = document.getElementById('filter-escola').value;
    currentFilters.search = document.getElementById('search-input').value.toLowerCase();
    
    // Filtrar habilidades
    const habilidadesFiltradas = Object.keys(habilidadesData).filter(key => {
        const hab = habilidadesData[key];
        
        // Aplicar filtros
        if (currentFilters.ano && hab.ano !== currentFilters.ano) return false;
        if (currentFilters.disciplina && hab.disciplina !== currentFilters.disciplina) return false;
        if (currentFilters.search && 
            !hab.habilidade.toLowerCase().includes(currentFilters.search) &&
            !hab.codigo.toLowerCase().includes(currentFilters.search)) return false;
        
        return true;
    });
    
    // Ordenar resultados
    const ordenacao = document.getElementById('ordenar').value;
    habilidadesFiltradas.sort((a, b) => {
        const habA = habilidadesData[a];
        const habB = habilidadesData[b];
        
        switch (ordenacao) {
            case 'desempenho':
                return habB.media_acertos - habA.media_acertos;
            case 'questoes':
                return habB.num_questoes - habA.num_questoes;
            default: // codigo
                return habA.codigo.localeCompare(habB.codigo);
        }
    });
    
    // Exibir resultados
    exibirHabilidades(habilidadesFiltradas);
    
    // Atualizar estatísticas
    atualizarEstatisticas(habilidadesFiltradas);
    
    // Gerar gráficos
    gerarGraficos(habilidadesFiltradas);
    
    // Mostrar containers
    document.getElementById('resultados-container').style.display = 'block';
    document.getElementById('graficos-container').style.display = 'block';
}

// Exibir habilidades
function exibirHabilidades(habilidadesFiltradas) {
    const container = document.getElementById('habilidades-grid');
    
    if (habilidadesFiltradas.length === 0) {
        container.innerHTML = `
            <div class="col-12">
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <h4>Nenhuma habilidade encontrada</h4>
                    <p>Tente ajustar os filtros de busca</p>
                </div>
            </div>
        `;
        return;
    }
    
    container.innerHTML = '';
    
    habilidadesFiltradas.forEach(key => {
        const hab = habilidadesData[key];
        
        const card = document.createElement('div');
        card.className = 'col-lg-6 col-xl-4 fade-in';
        card.innerHTML = `
            <div class="card habilidade-card">
                <div class="habilidade-header">
                    <div class="habilidade-codigo">${hab.codigo}</div>
                    <div class="habilidade-disciplina">${hab.disciplina_nome} - ${hab.ano}º Ano</div>
                </div>
                <div class="habilidade-body">
                    <div class="habilidade-descricao">${hab.habilidade}</div>
                    <div class="habilidade-bncc">
                        <i class="fas fa-bookmark me-1"></i>
                        BNCC: ${hab.bncc}
                    </div>
                    <div class="habilidade-stats">
                        <div class="stat-item">
                            <div class="stat-valor">${hab.num_questoes || 0}</div>
                            <div class="stat-titulo">Questões</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-valor">${hab.media_acertos.toFixed(1)}%</div>
                            <div class="stat-titulo">Média</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-valor">${hab.alunos_adequado.toFixed(1)}%</div>
                            <div class="stat-titulo">Adequado</div>
                        </div>
                    </div>
                    <div class="mt-3 d-flex justify-content-between align-items-center">
                        <span class="questoes-badge">
                            <i class="fas fa-question-circle me-1"></i>
                            ${hab.num_questoes || 0} questão(ões)
                        </span>
                        <span class="desempenho-badge desempenho-${hab.classificacao}">
                            <i class="fas fa-chart-line me-1"></i>
                            ${hab.classificacao === 'alto' ? 'Alto' : 
                              hab.classificacao === 'medio' ? 'Médio' : 'Baixo'}
                        </span>
                    </div>
                </div>
            </div>
        `;
        
        container.appendChild(card);
    });
}

// Atualizar estatísticas
function atualizarEstatisticas(habilidadesFiltradas) {
    const totalHabilidades = habilidadesFiltradas.length;
    const totalQuestoes = habilidadesFiltradas.reduce((sum, key) => 
        sum + (habilidadesData[key].num_questoes || 0), 0);
    
    const mediaGeral = totalHabilidades > 0 ? 
        habilidadesFiltradas.reduce((sum, key) => 
            sum + habilidadesData[key].media_acertos, 0) / totalHabilidades : 0;
    
    const escolasUnicas = new Set();
    if (currentFilters.escola) {
        escolasUnicas.add(currentFilters.escola);
    } else {
        Object.keys(desempenhoEscolas).forEach(escola => escolasUnicas.add(escola));
    }
    
    document.getElementById('total-habilidades').textContent = totalHabilidades;
    document.getElementById('total-questoes').textContent = totalQuestoes;
    document.getElementById('media-geral').textContent = mediaGeral.toFixed(1) + '%';
    document.getElementById('escolas-ativas').textContent = escolasUnicas.size;
}

// Gerar gráficos
function gerarGraficos(habilidadesFiltradas) {
    gerarGraficoDisciplinas(habilidadesFiltradas);
    gerarGraficoDesempenho(habilidadesFiltradas);
}

// Gráfico de distribuição por disciplina
function gerarGraficoDisciplinas(habilidadesFiltradas) {
    const ctx = document.getElementById('chart-disciplinas').getContext('2d');
    
    // Contar por disciplina
    const disciplinas = {};
    habilidadesFiltradas.forEach(key => {
        const hab = habilidadesData[key];
        disciplinas[hab.disciplina] = (disciplinas[hab.disciplina] || 0) + 1;
    });
    
    // Destruir gráfico anterior se existir
    if (window.chartDisciplinas) {
        window.chartDisciplinas.destroy();
    }
    
    window.chartDisciplinas = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(disciplinas).map(d => 
                d === 'LP' ? 'Língua Portuguesa' : 
                d === 'MAT' ? 'Matemática' : 'Ciências da Natureza'),
            datasets: [{
                data: Object.values(disciplinas),
                backgroundColor: Object.keys(disciplinas).map(d => coresGraficos[d]),
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        font: { size: 11 }
                    }
                }
            }
        }
    });
}

// Gráfico de desempenho por ano
function gerarGraficoDesempenho(habilidadesFiltradas) {
    const ctx = document.getElementById('chart-desempenho').getContext('2d');
    
    // Calcular média por ano
    const anos = {};
    habilidadesFiltradas.forEach(key => {
        const hab = habilidadesData[key];
        if (!anos[hab.ano]) {
            anos[hab.ano] = { total: 0, count: 0 };
        }
        anos[hab.ano].total += hab.media_acertos;
        anos[hab.ano].count++;
    });
    
    const dadosGrafico = Object.keys(anos).sort().map(ano => ({
        ano: ano + 'º Ano',
        media: anos[ano].count > 0 ? anos[ano].total / anos[ano].count : 0
    }));
    
    // Destruir gráfico anterior se existir
    if (window.chartDesempenho) {
        window.chartDesempenho.destroy();
    }
    
    window.chartDesempenho = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: dadosGrafico.map(d => d.ano),
            datasets: [{
                label: 'Média de Acertos (%)',
                data: dadosGrafico.map(d => d.media),
                backgroundColor: '#4472c4',
                borderColor: '#4472c4',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

// Limpar filtros
function limparFiltros() {
    document.getElementById('filter-ano').value = '';
    document.getElementById('filter-disciplina').value = '';
    document.getElementById('filter-escola').value = '';
    document.getElementById('search-input').value = '';
    document.getElementById('ordenar').value = 'codigo';
    
    aplicarFiltros();
}

// Download PDF
function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Obter habilidades filtradas com a mesma lógica da exibição
    const habilidadesFiltradas = Object.keys(habilidadesData).filter(key => {
        const hab = habilidadesData[key];
        
        // Aplicar filtros
        if (currentFilters.ano && hab.ano !== currentFilters.ano) return false;
        if (currentFilters.disciplina && hab.disciplina !== currentFilters.disciplina) return false;
        if (currentFilters.search && 
            !hab.habilidade.toLowerCase().includes(currentFilters.search) &&
            !hab.codigo.toLowerCase().includes(currentFilters.search)) return false;
        
        return true;
    });
    
    // Ordenar da mesma forma que na exibição
    const ordenacao = document.getElementById('ordenar').value;
    habilidadesFiltradas.sort((a, b) => {
        const habA = habilidadesData[a];
        const habB = habilidadesData[b];
        
        switch (ordenacao) {
            case 'desempenho':
                return habB.media_acertos - habA.media_acertos;
            case 'questoes':
                return habB.num_questoes - habA.num_questoes;
            default: // codigo
                return habA.codigo.localeCompare(habB.codigo);
        }
    });
    
    // Título
    doc.setFontSize(16);
    doc.text('SADE - Relatório de Habilidades', 20, 20);
    
    // Data
    doc.setFontSize(10);
    doc.text('Gerado em: ' + new Date().toLocaleDateString('pt-BR'), 20, 30);
    
    // Filtros aplicados
    let y = 40;
    doc.text('Filtros aplicados:', 20, y);
    y += 10;
    
    if (currentFilters.ano) {
        doc.text(`- Ano: ${currentFilters.ano}º`, 25, y);
        y += 5;
    }
    if (currentFilters.disciplina) {
        const discNome = currentFilters.disciplina === 'LP' ? 'Língua Portuguesa' :
                        currentFilters.disciplina === 'MAT' ? 'Matemática' : 'Ciências da Natureza';
        doc.text(`- Disciplina: ${discNome}`, 25, y);
        y += 5;
    }
    if (currentFilters.escola) {
        doc.text(`- Escola: ${currentFilters.escola}`, 25, y);
        y += 5;
    }
    if (currentFilters.search) {
        doc.text(`- Busca: ${currentFilters.search}`, 25, y);
        y += 5;
    }
    
    y += 10;
    
    // Estatísticas
    doc.text('Estatísticas:', 20, y);
    y += 10;
    doc.text(`Total de Habilidades: ${habilidadesFiltradas.length}`, 25, y);
    y += 5;
    const totalQuestoes = habilidadesFiltradas.reduce((sum, key) => 
        sum + (habilidadesData[key].num_questoes || 0), 0);
    doc.text(`Total de Questões: ${totalQuestoes}`, 25, y);
    y += 5;
    const mediaGeral = habilidadesFiltradas.length > 0 ? 
        habilidadesFiltradas.reduce((sum, key) => 
            sum + habilidadesData[key].media_acertos, 0) / habilidadesFiltradas.length : 0;
    doc.text(`Média Geral: ${mediaGeral.toFixed(1)}%`, 25, y);
    
    y += 15;
    
    // Lista das habilidades
    if (habilidadesFiltradas.length > 0) {
        doc.setFontSize(12);
        doc.text('Habilidades Encontradas:', 20, y);
        y += 10;
        
        doc.setFontSize(8);
        habilidadesFiltradas.forEach((key, index) => {
            const hab = habilidadesData[key];
            
            // Verificar se precisa de nova página
            if (y > 270) {
                doc.addPage();
                y = 20;
            }
            
            // Código e disciplina
            doc.setFont(undefined, 'bold');
            doc.text(`${hab.codigo} - ${hab.disciplina_nome} (${hab.ano}º Ano)`, 20, y);
            y += 5;
            
            // Descrição da habilidade
            doc.setFont(undefined, 'normal');
            const descricao = hab.habilidade;
            const linhasDescricao = doc.splitTextToSize(descricao, 170);
            doc.text(linhasDescricao, 20, y);
            y += linhasDescricao.length * 4;
            
            // BNCC
            doc.text(`BNCC: ${hab.bncc}`, 20, y);
            y += 4;
            
            // Estatísticas
            doc.text(`Questões: ${hab.num_questoes || 0} | Média: ${hab.media_acertos.toFixed(1)}% | Adequado: ${hab.alunos_adequado.toFixed(1)}%`, 20, y);
            y += 8;
            
            // Separador
            if (index < habilidadesFiltradas.length - 1) {
                doc.line(20, y, 190, y);
                y += 5;
            }
        });
    } else {
        doc.text('Nenhuma habilidade encontrada com os filtros aplicados.', 20, y);
    }
    
    // Salvar
    doc.save('relatorio-habilidades-sade.pdf');
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Carregar dados iniciais
    carregarDados();
    
    // Event listeners para filtros
    document.getElementById('filter-ano').addEventListener('change', aplicarFiltros);
    document.getElementById('filter-disciplina').addEventListener('change', aplicarFiltros);
    document.getElementById('filter-escola').addEventListener('change', aplicarFiltros);
    document.getElementById('search-input').addEventListener('input', aplicarFiltros);
    document.getElementById('ordenar').addEventListener('change', aplicarFiltros);
    
    // Event listeners para botões
    document.getElementById('limpar-filtros').addEventListener('click', limparFiltros);
    document.getElementById('download-pdf').addEventListener('click', downloadPDF);
});
