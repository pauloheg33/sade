// Dados reais da AV2 - baseados nos arquivos de análises /habilidades/analises
const dadosAV2 = {
    anos: ['2º', '4º', '5º', '8º', '9º'],
    materias: ['Português', 'Matemática'],
    
    // Dados extraídos dos arquivos de correlação questões x descritores
    resultados: {
        '2º': {
            'Português': {
                caderno: 'P0201',
                totalQuestoes: 22,
                descritores: {
                    'D002_P': { nome: 'Reconhecer as letras do alfabeto', questoes: 2, percentual: 9.1 },
                    'D006_P': { nome: 'Identificar rimas', questoes: 2, percentual: 9.1 },
                    'D008_P': { nome: 'Identificar sílabas de uma palavra', questoes: 3, percentual: 13.6 },
                    'D009_P': { nome: 'Ler palavras formadas por sílabas canônicas', questoes: 6, percentual: 27.3 },
                    'D014_P': { nome: 'Identificar variações de sons de grafemas', questoes: 1, percentual: 4.5 },
                    'D017_P': { nome: 'Reconhecer o gênero de um texto', questoes: 4, percentual: 18.2 },
                    'D021_P': { nome: 'Localizar informação explícita', questoes: 3, percentual: 13.6 },
                    'D030_P': { nome: 'Reconhecer os elementos que compõem uma narrativa e o conflito gerador', questoes: 1, percentual: 4.5 }
                }
            },
            'Matemática': {
                caderno: 'M0201',
                totalQuestoes: 22,
                descritores: {
                    'D002_M': { nome: 'Reconhecer características do sistema de numeração decimal', questoes: 5, percentual: 22.7 },
                    'D004_M': { nome: 'Executar adição ou subtração com números naturais', questoes: 3, percentual: 13.6 },
                    'D005_M': { nome: 'Utilizar números naturais na resolução de problemas', questoes: 2, percentual: 9.1 },
                    'D009_M': { nome: 'Identificar informações apresentadas em tabelas ou gráficos', questoes: 2, percentual: 9.1 },
                    'D011_M': { nome: 'Identificar representações de figuras tridimensionais', questoes: 2, percentual: 9.1 },
                    'D015_M': { nome: 'Corresponder cédulas e/ou moedas do Sistema Monetário Brasileiro', questoes: 2, percentual: 9.1 },
                    'D082_M': { nome: 'Executar a medição de grandezas por meio de medidas convencionais', questoes: 3, percentual: 13.6 },
                    'D097_M': { nome: 'Comparar ou ordenar quantidades pela contagem', questoes: 3, percentual: 13.6 }
                }
            }
        },
        '4º': {
            'Português': {
                caderno: 'C0401',
                totalQuestoes: 22,
                descritores: {
                    'D016_P': { nome: 'Identificar a finalidade de textos de diferentes gêneros', questoes: 3, percentual: 13.6 },
                    'D017_P': { nome: 'Reconhecer o gênero de um texto', questoes: 3, percentual: 13.6 },
                    'D021_P': { nome: 'Localizar informação explícita', questoes: 6, percentual: 27.3 },
                    'D022_P': { nome: 'Inferir o sentido de palavra ou expressão a partir do contexto', questoes: 2, percentual: 9.1 },
                    'D023_P': { nome: 'Inferir informações em textos', questoes: 2, percentual: 9.1 },
                    'D025_P': { nome: 'Reconhecer efeitos de sentido da pontuação e outras notações', questoes: 2, percentual: 9.1 },
                    'D028_P': { nome: 'Reconhecer o assunto de um texto lido', questoes: 2, percentual: 9.1 },
                    'D037_P': { nome: 'Reconhecer relações entre partes de um texto (recursos coesivos)', questoes: 2, percentual: 9.1 }
                }
            },
            'Matemática': {
                caderno: 'C0401',
                totalQuestoes: 22,
                descritores: {
                    'D001_M': { nome: 'Identificar a localização ou movimentação de pessoas/objetos no espaço', questoes: 2, percentual: 9.1 },
                    'D002_M': { nome: 'Reconhecer características do sistema de numeração decimal', questoes: 2, percentual: 9.1 },
                    'D004_M': { nome: 'Executar adição ou subtração com números naturais', questoes: 1, percentual: 4.5 },
                    'D009_M': { nome: 'Identificar informações apresentadas em tabelas ou gráficos', questoes: 4, percentual: 18.2 },
                    'D013_M': { nome: 'Identificar números naturais segundo critérios de ordem', questoes: 2, percentual: 9.1 },
                    'D025_M': { nome: 'Utilizar área de figuras bidimensionais na resolução de problemas', questoes: 3, percentual: 13.6 },
                    'D029_M': { nome: 'Reconhecer fração como representação de diferentes significados', questoes: 2, percentual: 9.1 },
                    'D084_M': { nome: 'Utilizar conversão entre unidades de medidas de tempo', questoes: 2, percentual: 9.1 },
                    'D086_M': { nome: 'Executar multiplicação ou divisão com números naturais', questoes: 4, percentual: 18.2 }
                }
            }
        },
        '5º': {
            'Português': {
                caderno: 'C0501',
                totalQuestoes: 22,
                descritores: {
                    'D016_P': { nome: 'Identificar a finalidade de textos de diferentes gêneros', questoes: 4, percentual: 18.2 },
                    'D017_P': { nome: 'Reconhecer o gênero de um texto', questoes: 2, percentual: 9.1 },
                    'D021_P': { nome: 'Localizar informação explícita', questoes: 3, percentual: 13.6 },
                    'D022_P': { nome: 'Inferir o sentido de palavra ou expressão a partir do contexto', questoes: 2, percentual: 9.1 },
                    'D023_P': { nome: 'Inferir informações em textos', questoes: 4, percentual: 18.2 },
                    'D028_P': { nome: 'Reconhecer o assunto de um texto lido', questoes: 2, percentual: 9.1 },
                    'D030_P': { nome: 'Reconhecer os elementos que compõem uma narrativa e o conflito gerador', questoes: 1, percentual: 4.5 },
                    'D037_P': { nome: 'Reconhecer relações entre partes de um texto (recursos coesivos)', questoes: 2, percentual: 9.1 },
                    'D039_P': { nome: 'Reconhecer o sentido das relações lógico-discursivas', questoes: 1, percentual: 4.5 },
                    'D044_P': { nome: 'Identificar marcas linguísticas em um texto', questoes: 1, percentual: 4.5 }
                }
            },
            'Matemática': {
                caderno: 'C0501',
                totalQuestoes: 22,
                descritores: {
                    'D001_M': { nome: 'Identificar a localização ou movimentação de pessoas/objetos no espaço', questoes: 2, percentual: 9.1 },
                    'D002_M': { nome: 'Reconhecer características do sistema de numeração decimal', questoes: 3, percentual: 13.6 },
                    'D003_M': { nome: 'Identificar composições ou decomposições de números naturais', questoes: 1, percentual: 4.5 },
                    'D009_M': { nome: 'Identificar informações apresentadas em tabelas ou gráficos', questoes: 2, percentual: 9.1 },
                    'D011_M': { nome: 'Identificar representações de figuras tridimensionais', questoes: 1, percentual: 4.5 },
                    'D013_M': { nome: 'Identificar números naturais segundo critérios de ordem', questoes: 2, percentual: 9.1 },
                    'D020_M': { nome: 'Corresponder figuras tridimensionais às suas planificações', questoes: 1, percentual: 4.5 },
                    'D021_M': { nome: 'Utilizar informações de tabelas ou gráficos na resolução de problemas', questoes: 2, percentual: 9.1 },
                    'D025_M': { nome: 'Utilizar área de figuras bidimensionais na resolução de problemas', questoes: 2, percentual: 9.1 },
                    'D029_M': { nome: 'Reconhecer fração como representação de diferentes significados', questoes: 3, percentual: 13.6 },
                    'D030_M': { nome: 'Utilizar conversão entre unidades de medida na resolução de problemas', questoes: 2, percentual: 9.1 },
                    'D079_M': { nome: 'Utilizar números racionais na resolução de problemas', questoes: 1, percentual: 4.5 }
                }
            }
        },
        '8º': {
            'Português': {
                caderno: 'C0801',
                totalQuestoes: 26,
                descritores: {
                    'D016_P': { nome: 'Identificar a finalidade de textos de diferentes gêneros', questoes: 3, percentual: 11.5 },
                    'D017_P': { nome: 'Reconhecer o gênero de um texto', questoes: 3, percentual: 11.5 },
                    'D019_P': { nome: 'Reconhecer formas de tratar informação na comparação de textos', questoes: 2, percentual: 7.7 },
                    'D022_P': { nome: 'Inferir o sentido de palavra ou expressão a partir do contexto', questoes: 1, percentual: 3.8 },
                    'D023_P': { nome: 'Inferir informações em textos', questoes: 2, percentual: 7.7 },
                    'D024_P': { nome: 'Reconhecer efeito de humor ou de ironia em um texto', questoes: 1, percentual: 3.8 },
                    'D025_P': { nome: 'Reconhecer efeitos de sentido da pontuação e outras notações', questoes: 2, percentual: 7.7 },
                    'D026_P': { nome: 'Reconhecer efeitos de sentido de recursos linguísticos', questoes: 3, percentual: 11.5 },
                    'D028_P': { nome: 'Reconhecer o assunto de um texto lido', questoes: 1, percentual: 3.8 },
                    'D037_P': { nome: 'Reconhecer relações entre partes de um texto (recursos coesivos)', questoes: 2, percentual: 7.7 },
                    'D038_P': { nome: 'Distinguir um fato da opinião', questoes: 1, percentual: 3.8 },
                    'D039_P': { nome: 'Reconhecer o sentido das relações lógico-discursivas', questoes: 2, percentual: 7.7 },
                    'D043_P': { nome: 'Reconhecer recursos estilísticos utilizados na construção de textos', questoes: 1, percentual: 3.8 },
                    'D044_P': { nome: 'Identificar marcas linguísticas em um texto', questoes: 2, percentual: 7.7 }
                }
            }
        },
        '9º': {
            'Português': {
                caderno: 'C0901',
                totalQuestoes: 26,
                descritores: {
                    'D016_P': { nome: 'Identificar a finalidade de textos de diferentes gêneros', questoes: 6, percentual: 23.1 },
                    'D019_P': { nome: 'Reconhecer formas de tratar informação na comparação de textos', questoes: 2, percentual: 7.7 },
                    'D022_P': { nome: 'Inferir o sentido de palavra ou expressão a partir do contexto', questoes: 3, percentual: 11.5 },
                    'D023_P': { nome: 'Inferir informações em textos', questoes: 3, percentual: 11.5 },
                    'D024_P': { nome: 'Reconhecer efeito de humor ou de ironia em um texto', questoes: 1, percentual: 3.8 },
                    'D026_P': { nome: 'Reconhecer efeitos de sentido de recursos linguísticos', questoes: 1, percentual: 3.8 },
                    'D037_P': { nome: 'Reconhecer relações entre partes de um texto (recursos coesivos)', questoes: 2, percentual: 7.7 },
                    'D038_P': { nome: 'Distinguir um fato da opinião', questoes: 2, percentual: 7.7 },
                    'D039_P': { nome: 'Reconhecer o sentido das relações lógico-discursivas', questoes: 3, percentual: 11.5 },
                    'D043_P': { nome: 'Reconhecer recursos estilísticos utilizados na construção de textos', questoes: 1, percentual: 3.8 },
                    'D044_P': { nome: 'Identificar marcas linguísticas em um texto', questoes: 2, percentual: 7.7 }
                }
            }
        }
    }
};

// Inicialização automática
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM carregado. Iniciando apresentação visual AV2...');
    setTimeout(() => {
        carregarTodosDados();
    }, 100);
});

function carregarTodosDados() {
    console.log('Carregando apresentação das provas AV2...');
    
    // Calcular estatísticas gerais das provas
    calcularEstatisticasGerais();
    
    // Carregar apresentação por ano
    carregarDadosPorAno();
}

function calcularEstatisticasGerais() {
    let totalQuestoes = 0;
    let totalDescritores = new Set();
    let totalCadernos = 0;
    let totalDisciplinas = dadosAV2.materias.length;
    
    console.log('Calculando estatísticas das provas...');
    
    // Contar questões e descritores únicos
    Object.keys(dadosAV2.resultados).forEach(ano => {
        Object.keys(dadosAV2.resultados[ano]).forEach(disciplina => {
            const dados = dadosAV2.resultados[ano][disciplina];
            if (dados.totalQuestoes) {
                totalQuestoes += dados.totalQuestoes;
                totalCadernos++;
                
                Object.keys(dados.descritores || {}).forEach(descritor => {
                    totalDescritores.add(descritor);
                });
            }
        });
    });
    
    console.log('Estatísticas calculadas:', { 
        totalQuestoes, 
        totalDescritores: totalDescritores.size,
        totalCadernos,
        totalDisciplinas
    });
    
    // Atualizar estatísticas na tela
    updateElementContent('total-alunos', totalQuestoes);
    updateElementContent('total-escolas', totalDescritores.size);
    updateElementContent('total-anos', dadosAV2.anos.length);
    updateElementContent('total-disciplinas', totalDisciplinas);
}

function updateElementContent(id, content) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = content;
    } else {
        console.warn(`Elemento ${id} não encontrado`);
    }
}

function carregarDadosPorAno() {
    console.log('Carregando apresentação por ano...');
    dadosAV2.anos.forEach(ano => {
        const container = document.getElementById(`dados-${ano.replace('º', '')}ano`);
        if (container) {
            console.log(`Carregando dados para ${ano}...`);
            const htmlContent = criarCardsAno(ano);
            container.innerHTML = htmlContent;
            
            // Se não há conteúdo, mostrar mensagem
            if (!htmlContent.trim()) {
                container.innerHTML = `
                    <div class="col-12">
                        <div class="alert alert-info">
                            <i class="fas fa-info-circle me-2"></i>
                            Dados das provas do ${ano} ano em preparação...
                        </div>
                    </div>
                `;
            }
        } else {
            console.warn(`Container não encontrado para: dados-${ano.replace('º', '')}ano`);
        }
    });
}

function criarCardsAno(ano) {
    let html = '';
    
    console.log(`Criando cards para ${ano}:`, dadosAV2.resultados[ano]);
    
    // Card para cada disciplina disponível
    if (dadosAV2.resultados[ano]) {
        Object.keys(dadosAV2.resultados[ano]).forEach(disciplina => {
            const dados = dadosAV2.resultados[ano][disciplina];
            if (dados && dados.totalQuestoes) {
                html += criarCardDisciplina(ano, disciplina, dados);
            }
        });
    }
    
    return html;
}

function criarCardDisciplina(ano, disciplina, dados) {
    // Calcular estatísticas dos descritores
    const descritores = dados.descritores || {};
    const totalDescritores = Object.keys(descritores).length;
    
    // Criar lista de descritores (limitada a 5 principais)
    let descritoresHtml = '';
    const descritoresOrdenados = Object.entries(descritores)
        .sort(([,a], [,b]) => b.questoes - a.questoes)
        .slice(0, 5);
    
    descritoresOrdenados.forEach(([codigo, descritor]) => {
        const cor = obterCorDescritor(codigo);
        descritoresHtml += `
            <div class="mb-2">
                <div class="d-flex justify-content-between align-items-center">
                    <small class="fw-bold text-primary">${codigo}</small>
                    <span class="badge" style="background-color: ${cor};">${descritor.questoes} questões</span>
                </div>
                <small class="text-muted" title="${descritor.nome}">${descritor.nome.substring(0, 60)}${descritor.nome.length > 60 ? '...' : ''}</small>
                <div class="progress mt-1" style="height: 4px;">
                    <div class="progress-bar" style="width: ${descritor.percentual}%; background-color: ${cor};"></div>
                </div>
            </div>
        `;
    });
    
    return `
        <div class="col-md-6">
            <div class="av2-card card h-100">
                <div class="card-header ${disciplina === 'Português' ? 'bg-success' : 'bg-info'} text-white">
                    <div class="d-flex justify-content-between align-items-center">
                        <h6 class="mb-0">
                            <i class="fas ${disciplina === 'Português' ? 'fa-book' : 'fa-calculator'} me-2"></i>
                            ${disciplina}
                        </h6>
                        <span class="badge bg-light text-dark">Caderno ${dados.caderno}</span>
                    </div>
                </div>
                <div class="card-body">
                    <!-- Estatísticas da Prova -->
                    <div class="row g-3 mb-3">
                        <div class="col-4">
                            <div class="text-center">
                                <div class="h6 mb-0 text-primary">${dados.totalQuestoes}</div>
                                <small class="text-muted">Questões</small>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="text-center">
                                <div class="h6 mb-0 text-success">${totalDescritores}</div>
                                <small class="text-muted">Descritores</small>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="text-center">
                                <div class="h6 mb-0 text-info">${dados.caderno}</div>
                                <small class="text-muted">Caderno</small>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Principais Descritores -->
                    <div class="mb-3">
                        <h6 class="text-primary mb-2">
                            <i class="fas fa-list me-1"></i>Principais Descritores Avaliados
                        </h6>
                        <div style="max-height: 200px; overflow-y: auto;">
                            ${descritoresHtml}
                        </div>
                        ${totalDescritores > 5 ? 
                            `<small class="text-muted">E mais ${totalDescritores - 5} descritores...</small>` : ''}
                    </div>
                    
                    <!-- Distribuição de Questões -->
                    <div>
                        <h6 class="text-primary mb-2">
                            <i class="fas fa-chart-pie me-1"></i>Distribuição das Questões
                        </h6>
                        <div class="row">
                            <div class="col-6">
                                <small class="text-muted">Total de Questões:</small>
                                <div class="fw-bold">${dados.totalQuestoes}</div>
                            </div>
                            <div class="col-6">
                                <small class="text-muted">Descritores Únicos:</small>
                                <div class="fw-bold">${totalDescritores}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <small class="text-muted">
                        <i class="fas fa-file-alt me-1"></i>Caderno de Prova: ${dados.caderno}
                    </small>
                    <div class="mt-2">
                        <button class="btn btn-outline-primary btn-sm" onclick="mostrarDetalhes('${ano}', '${disciplina}')">
                            <i class="fas fa-microscope me-1"></i>Ver Detalhes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function obterCorDescritor(codigo) {
    const cores = [
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
        '#FF9F40', '#C9CBCF', '#FF6B6B', '#4ECDC4', '#45B7D1'
    ];
    
    // Gerar cor baseada no código
    let hash = 0;
    for (let i = 0; i < codigo.length; i++) {
        hash = codigo.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    return cores[Math.abs(hash) % cores.length];
}

// Função para mostrar detalhes (corrige o problema dos links)
function mostrarDetalhes(ano, disciplina) {
    const dados = dadosAV2.resultados[ano] && dadosAV2.resultados[ano][disciplina];
    
    if (!dados) {
        alert('Dados não encontrados para esta seleção.');
        return;
    }
    
    // Criar modal com detalhes
    const modalHtml = `
        <div class="modal fade" id="detalhesModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">
                            <i class="fas ${disciplina === 'Português' ? 'fa-book' : 'fa-calculator'} me-2"></i>
                            ${disciplina} - ${ano} Ano
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row mb-3">
                            <div class="col-md-4">
                                <div class="stat-box text-center">
                                    <div class="stat-number">${dados.totalQuestoes}</div>
                                    <div class="stat-label">Questões</div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="stat-box text-center">
                                    <div class="stat-number">${Object.keys(dados.descritores).length}</div>
                                    <div class="stat-label">Descritores</div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="stat-box text-center">
                                    <div class="stat-number">${dados.caderno}</div>
                                    <div class="stat-label">Caderno</div>
                                </div>
                            </div>
                        </div>
                        
                        <h6>Todos os Descritores Avaliados:</h6>
                        <div class="table-responsive">
                            <table class="table table-sm">
                                <thead>
                                    <tr>
                                        <th>Código</th>
                                        <th>Descrição</th>
                                        <th>Questões</th>
                                        <th>%</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${Object.entries(dados.descritores).map(([codigo, desc]) => `
                                        <tr>
                                            <td><span class="badge bg-primary">${codigo}</span></td>
                                            <td>${desc.nome}</td>
                                            <td class="text-center">${desc.questoes}</td>
                                            <td class="text-center">${desc.percentual}%</td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remover modal existente se houver
    const existingModal = document.getElementById('detalhesModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Adicionar modal ao DOM
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    // Mostrar modal
    const modal = new bootstrap.Modal(document.getElementById('detalhesModal'));
    modal.show();
}
