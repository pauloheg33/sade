// Dados reais da AV2 - baseados nos arquivos de análises /habilidades/analises
const dadosAV2 = {
    anos: ['2º', '4º', '5º', '8º', '9º'],
    materias: ['Português', 'Matemática'],
    
    // Mapeamento dos arquivos de análise
    arquivosAnalise: {
        '2º': {
            'Português': 'correlacao_questoes_descritores_P0201.txt',
            'Matemática': 'correlacao_questoes_descritores_M0201.txt'
        },
        '4º': {
            'Português': 'correlacao_questoes_descritores_C0401.txt',
            'Matemática': 'correlacao_questoes_descritores_C0401.txt'
        },
        '5º': {
            'Português': 'correlacao_questoes_descritores_C0501.txt',
            'Matemática': 'correlacao_questoes_descritores_C0501.txt'
        },
        '8º': {
            'Português': 'correlacao_questoes_descritores_C0801.txt',
            'Matemática': 'correlacao_questoes_descritores_C0801.txt'
        },
        '9º': {
            'Português': 'correlacao_questoes_descritores_C0901.txt',
            'Matemática': 'correlacao_questoes_descritores_C0901.txt'
        }
    },
    
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
            },
            'Matemática': {
                caderno: 'C0801',
                totalQuestoes: 26,
                descritores: {
                    'D002_M': { nome: 'Reconhecer características do sistema de numeração decimal', questoes: 2, percentual: 7.7 },
                    'D005_M': { nome: 'Utilizar números naturais na resolução de problemas', questoes: 1, percentual: 3.8 },
                    'D020_M': { nome: 'Corresponder figuras tridimensionais às suas planificações', questoes: 1, percentual: 3.8 },
                    'D021_M': { nome: 'Utilizar informações de tabelas ou gráficos na resolução de problemas', questoes: 1, percentual: 3.8 },
                    'D025_M': { nome: 'Utilizar área de figuras bidimensionais na resolução de problemas', questoes: 1, percentual: 3.8 },
                    'D030_M': { nome: 'Utilizar conversão entre unidades de medida na resolução de problemas', questoes: 3, percentual: 11.5 },
                    'D086_M': { nome: 'Executar multiplicação ou divisão com números naturais', questoes: 2, percentual: 7.7 },
                    'D122_M': { nome: 'Utilizar cálculos com operações em que um dos termos é desconhecido', questoes: 2, percentual: 7.7 },
                    'D127_M': { nome: 'Reconhecer e nomear polígonos', questoes: 1, percentual: 3.8 },
                    'D128_M': { nome: 'Calcular probabilidade de um evento', questoes: 1, percentual: 3.8 },
                    'D129_M': { nome: 'Calcular média aritmética', questoes: 2, percentual: 7.7 },
                    'D130_M': { nome: 'Resolver sistema de equações do 1º grau', questoes: 2, percentual: 7.7 },
                    'D131_M': { nome: 'Calcular porcentagem', questoes: 2, percentual: 7.7 },
                    'D132_M': { nome: 'Resolver problemas de contagem', questoes: 1, percentual: 3.8 },
                    'D133_M': { nome: 'Utilizar expressões algébricas na resolução de problemas', questoes: 1, percentual: 3.8 },
                    'D134_M': { nome: 'Representar graficamente equação do 1º grau', questoes: 1, percentual: 3.8 },
                    'D135_M': { nome: 'Calcular volume de sólidos geométricos', questoes: 1, percentual: 3.8 },
                    'D136_M': { nome: 'Aplicar transformações geométricas', questoes: 1, percentual: 3.8 }
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
            },
            'Matemática': {
                caderno: 'C0901',
                totalQuestoes: 26,
                descritores: {
                    'D032_M': { nome: 'Simplificar expressões algébricas', questoes: 1, percentual: 3.8 },
                    'D033_M': { nome: 'Localizar números irracionais na reta numérica', questoes: 1, percentual: 3.8 },
                    'D034_M': { nome: 'Resolver problemas envolvendo expressões algébricas', questoes: 1, percentual: 3.8 },
                    'D035_M': { nome: 'Reconhecer ângulos em figuras geométricas', questoes: 1, percentual: 3.8 },
                    'D036_M': { nome: 'Calcular volume de sólidos geométricos', questoes: 1, percentual: 3.8 },
                    'D037_M': { nome: 'Resolver problemas de proporcionalidade', questoes: 1, percentual: 3.8 },
                    'D038_M': { nome: 'Calcular porcentagens', questoes: 1, percentual: 3.8 },
                    'D039_M': { nome: 'Aplicar teorema de Pitágoras', questoes: 1, percentual: 3.8 },
                    'D040_M': { nome: 'Identificar funções em diagramas', questoes: 1, percentual: 3.8 },
                    'D041_M': { nome: 'Interpretar gráficos e tabelas', questoes: 1, percentual: 3.8 },
                    'D042_M': { nome: 'Reconhecer funções em gráficos', questoes: 1, percentual: 3.8 },
                    'D043_M': { nome: 'Calcular densidade demográfica', questoes: 1, percentual: 3.8 },
                    'D044_M': { nome: 'Resolver equações do segundo grau', questoes: 1, percentual: 3.8 },
                    'D045_M': { nome: 'Aplicar teorema de Pitágoras em problemas', questoes: 1, percentual: 3.8 },
                    'D046_M': { nome: 'Calcular probabilidades', questoes: 1, percentual: 3.8 },
                    'D047_M': { nome: 'Localizar números decimais na reta numérica', questoes: 1, percentual: 3.8 },
                    'D048_M': { nome: 'Classificar triângulos', questoes: 1, percentual: 3.8 },
                    'D049_M': { nome: 'Resolver problemas com sistema monetário', questoes: 2, percentual: 7.7 },
                    'D050_M': { nome: 'Calcular área de figuras planas', questoes: 1, percentual: 3.8 },
                    'D051_M': { nome: 'Calcular média aritmética', questoes: 1, percentual: 3.8 },
                    'D052_M': { nome: 'Resolver problemas de porcentagem', questoes: 1, percentual: 3.8 },
                    'D053_M': { nome: 'Resolver problemas de regra de três', questoes: 1, percentual: 3.8 },
                    'D054_M': { nome: 'Identificar vistas de sólidos geométricos', questoes: 1, percentual: 3.8 },
                    'D055_M': { nome: 'Resolver sistemas de equações', questoes: 1, percentual: 3.8 },
                    'D056_M': { nome: 'Reconhecer ângulos em retas paralelas', questoes: 1, percentual: 3.8 }
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
            console.log(`Processando disciplina ${disciplina} para ${ano}:`);
            const dados = dadosAV2.resultados[ano][disciplina];
            console.log(`Dados da disciplina:`, dados);
            
            if (dados && dados.totalQuestoes) {
                console.log(`Gerando card para ${disciplina} - ${ano}`);
                html += criarCardDisciplina(ano, disciplina, dados);
            } else {
                console.log(`Dados inválidos ou sem totalQuestoes para ${disciplina} - ${ano}:`, dados);
            }
        });
    } else {
        console.log(`Nenhum dado encontrado para ${ano}`);
    }
    
    console.log(`HTML gerado para ${ano}:`, html.length > 0 ? 'Conteúdo gerado' : 'Nenhum conteúdo');
    
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
async function mostrarDetalhes(ano, disciplina) {
    console.log(`Iniciando mostrarDetalhes para ${ano} - ${disciplina}`);
    
    const dados = dadosAV2.resultados[ano] && dadosAV2.resultados[ano][disciplina];
    
    if (!dados) {
        console.error(`Dados não encontrados para ${ano} - ${disciplina}`);
        alert('Dados não encontrados para esta seleção.');
        return;
    }
    
    console.log('Dados encontrados:', dados);
    
    // Remover modais existentes antes de criar novos
    removerModaisExistentes();
    
    // Mostrar loading
    mostrarModalLoading();
    
    try {
        // Carregar questões do arquivo de análise
        console.log('Carregando questões do arquivo...');
        const questoes = await carregarQuestoesDoArquivo(ano, disciplina);
        console.log(`Questões carregadas: ${questoes.length}`);
        
        // Remover modal de loading
        removerModalLoading();
        
        // Criar modal com detalhes das questões
        criarModalDetalhes(ano, disciplina, dados, questoes);
        
    } catch (error) {
        console.error('Erro ao carregar questões:', error);
        
        // Remover modal de loading em caso de erro
        removerModalLoading();
        
        alert('Erro ao carregar os detalhes das questões. Verifique o console para mais informações.');
    }
}

function removerModaisExistentes() {
    // Remover modal de loading se existir
    const loadingModal = document.getElementById('loadingModal');
    if (loadingModal) {
        const modalInstance = bootstrap.Modal.getInstance(loadingModal);
        if (modalInstance) {
            modalInstance.hide();
        }
        loadingModal.remove();
    }
    
    // Remover modal de detalhes se existir
    const detalhesModal = document.getElementById('detalhesModal');
    if (detalhesModal) {
        const modalInstance = bootstrap.Modal.getInstance(detalhesModal);
        if (modalInstance) {
            modalInstance.hide();
        }
        detalhesModal.remove();
    }
    
    // Remover backdrop manualmente se ainda existir
    const backdrops = document.querySelectorAll('.modal-backdrop');
    backdrops.forEach(backdrop => backdrop.remove());
    
    // Garantir que o body não tenha classes de modal
    document.body.classList.remove('modal-open');
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
}

function removerModalLoading() {
    const loadingModal = document.getElementById('loadingModal');
    if (loadingModal) {
        const modalInstance = bootstrap.Modal.getInstance(loadingModal);
        if (modalInstance) {
            modalInstance.hide();
        }
        // Aguardar animação antes de remover
        setTimeout(() => {
            loadingModal.remove();
        }, 200);
    }
}

function criarModalDetalhes(ano, disciplina, dados, questoes) {
    const modalHtml = `
        <div class="modal fade" id="detalhesModal" tabindex="-1" data-bs-backdrop="true" data-bs-keyboard="true">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">
                            <i class="fas ${disciplina === 'Português' ? 'fa-book' : 'fa-calculator'} me-2"></i>
                            ${disciplina} - ${ano} Ano - Questões e Descritores
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row mb-3">
                            <div class="col-md-4">
                                <div class="stat-box text-center">
                                    <div class="stat-number">${questoes.length}</div>
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
                        
                        <h6 class="mb-3">
                            <i class="fas fa-list-ol me-2"></i>Questões e Correlações com Descritores:
                        </h6>
                        <div class="questoes-container" style="max-height: 500px; overflow-y: auto;">
                            ${criarListaQuestoes(questoes)}
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Adicionar modal ao DOM
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    // Configurar evento para limpeza adequada ao fechar
    const modalElement = document.getElementById('detalhesModal');
    modalElement.addEventListener('hidden.bs.modal', function () {
        // Limpar completamente ao fechar
        setTimeout(() => {
            removerModaisExistentes();
        }, 100);
    });
    
    // Mostrar modal
    const modal = new bootstrap.Modal(modalElement, {
        backdrop: true,
        keyboard: true,
        focus: true
    });
    
    modal.show();
}

function mostrarModalLoading() {
    // Remover loading modal existente primeiro
    const existingLoadingModal = document.getElementById('loadingModal');
    if (existingLoadingModal) {
        existingLoadingModal.remove();
    }
    
    const loadingHtml = `
        <div class="modal fade" id="loadingModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-body text-center p-4">
                        <div class="spinner-border text-primary mb-3" role="status">
                            <span class="visually-hidden">Carregando...</span>
                        </div>
                        <p class="mb-0">Carregando questões...</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', loadingHtml);
    const modal = new bootstrap.Modal(document.getElementById('loadingModal'), {
        backdrop: 'static',
        keyboard: false
    });
    modal.show();
}

async function carregarQuestoesDoArquivo(ano, disciplina) {
    const nomeArquivo = dadosAV2.arquivosAnalise[ano] && dadosAV2.arquivosAnalise[ano][disciplina];
    
    if (!nomeArquivo) {
        throw new Error(`Arquivo não encontrado para ${ano} - ${disciplina}`);
    }
    
    try {
        const response = await fetch(`./analises/${nomeArquivo}`);
        if (!response.ok) {
            throw new Error(`Erro ao carregar arquivo: ${response.status}`);
        }
        
        const conteudo = await response.text();
        return parseQuestoesDoConteudo(conteudo, disciplina);
        
    } catch (error) {
        console.error(`Erro ao carregar ${nomeArquivo}:`, error);
        
        // Fallback: usar questões simuladas baseadas nos descritores conhecidos
        return gerarQuestoesFallback(ano, disciplina);
    }
}

function parseQuestoesDoConteudo(conteudo, disciplina) {
    const questoes = [];
    const linhas = conteudo.split('\n');
    
    console.log(`Parseando conteúdo para ${disciplina}`);
    console.log(`Total de linhas: ${linhas.length}`);
    console.log(`Primeiras 5 linhas do conteúdo:`, linhas.slice(0, 5));
    
    // Detectar tipo de arquivo baseado no conteúdo
    const isArquivoSeparado = conteudo.includes('CADERNO P0201') || conteudo.includes('CADERNO M0201');
    const isArquivoCombinado9ano = conteudo.includes('=== LÍNGUA PORTUGUESA ===') && conteudo.includes('=== MATEMÁTICA ===');
    const isArquivoCombinado8ano = conteudo.includes('LÍNGUA PORTUGUESA (Questões 1-26)') && conteudo.includes('MATEMÁTICA (Questões 27-52)');
    const isArquivo4e5Anos = conteudo.includes('LÍNGUA PORTUGUESA (Questões 1-22)') && conteudo.includes('MATEMÁTICA (Questões 23-44)');
    
    console.log(`Tipo de arquivo detectado:`, {
        separado: isArquivoSeparado,
        combinado9ano: isArquivoCombinado9ano,
        combinado8ano: isArquivoCombinado8ano,
        combinado4e5anos: isArquivo4e5Anos
    });
    
    console.log(`Primeiras linhas do arquivo:`, linhas.slice(0, 10));
    
    // Determinar faixas de questões baseado na disciplina e tipo de arquivo
    let faixaInicio = 1;
    let faixaFim = 999;
    
    if (isArquivoCombinado9ano) {
        // Para 9º ano (arquivos com === LÍNGUA PORTUGUESA ===)
        if (disciplina === 'Português') {
            faixaInicio = 1;
            faixaFim = 26;
        } else if (disciplina === 'Matemática') {
            faixaInicio = 27;
            faixaFim = 52;
        }
    } else if (isArquivoCombinado8ano) {
        // Para 8º ano (arquivos com LÍNGUA PORTUGUESA (Questões 1-26))
        if (disciplina === 'Português') {
            faixaInicio = 1;
            faixaFim = 26;
        } else if (disciplina === 'Matemática') {
            faixaInicio = 27;
            faixaFim = 52;
        }
    } else if (isArquivo4e5Anos) {
        // Para 4º e 5º anos (arquivos com LÍNGUA PORTUGUESA (Questões 1-22))
        if (disciplina === 'Português') {
            faixaInicio = 1;
            faixaFim = 22;
        } else if (disciplina === 'Matemática') {
            faixaInicio = 23;
            faixaFim = 44;
        }
    }
    // Para arquivos separados (2º ano), usar todas as questões (faixaInicio=1, faixaFim=999)
    
    console.log(`Faixa para ${disciplina}: ${faixaInicio}-${faixaFim}`);
    
    // Processar cada linha procurando por questões
    for (let i = 0; i < linhas.length; i++) {
        const linha = linhas[i].trim();
        let questaoEncontrada = false;
        
        // PADRÃO 1: Questão 01: D019_P - Descrição (usado no 9º ano)
        const matchPadrao1 = linha.match(/^Questão\s+(\d+):\s+(D\d+_[PM])\s*-\s*(.+)/);
        if (matchPadrao1) {
            const numeroQuestao = parseInt(matchPadrao1[1]);
            const codigoDescritor = matchPadrao1[2];
            const nomeDescritor = matchPadrao1[3];
            
            if (numeroQuestao >= faixaInicio && numeroQuestao <= faixaFim) {
                questoes.push({
                    numero: numeroQuestao,
                    codigo: `Q${numeroQuestao.toString().padStart(2, '0')}`,
                    texto: `Questão ${numeroQuestao} - ${disciplina}`,
                    descritor: {
                        codigo: codigoDescritor,
                        nome: nomeDescritor
                    }
                });
                console.log(`Padrão 1 - Adicionada questão ${numeroQuestao}: ${codigoDescritor}`);
                questaoEncontrada = true;
            }
        }
        
        // PADRÃO 1B: QUESTÃO 01 → D019_P: Descrição (usado no 8º ano)
        if (!questaoEncontrada) {
            const matchPadrao1B = linha.match(/^QUESTÃO\s+(\d+)\s*→\s*(D\d+_[PM]):\s*(.+)/);
            if (matchPadrao1B) {
                console.log(`Testando Padrão 1B com linha: "${linha}"`);
                console.log(`Match encontrado:`, matchPadrao1B);
                
                const numeroQuestao = parseInt(matchPadrao1B[1]);
                const codigoDescritor = matchPadrao1B[2];
                const nomeDescritor = matchPadrao1B[3];
                
                console.log(`Questão ${numeroQuestao}, faixa: ${faixaInicio}-${faixaFim}`);
                
                if (numeroQuestao >= faixaInicio && numeroQuestao <= faixaFim) {
                    questoes.push({
                        numero: numeroQuestao,
                        codigo: `Q${numeroQuestao.toString().padStart(2, '0')}`,
                        texto: `Questão ${numeroQuestao} - ${disciplina}`,
                        descritor: {
                            codigo: codigoDescritor,
                            nome: nomeDescritor
                        }
                    });
                    console.log(`Padrão 1B - Adicionada questão ${numeroQuestao}: ${codigoDescritor}`);
                    questaoEncontrada = true;
                }
            } else {
                // Debug: testar se a linha parece ser uma questão mas não fez match
                if (linha.includes('QUESTÃO') && linha.includes('→')) {
                    console.log(`Linha com QUESTÃO → não fez match: "${linha}"`);
                }
            }
        }
        
        // PADRÃO 2: 01) (código) texto (usado no 2º ano e 4º-5º anos)
        if (!questaoEncontrada) {
            const matchPadrao2 = linha.match(/^(\d+)\)\s*\(([^)]+)\)\s*(.+)/);
            if (matchPadrao2) {
                const numeroQuestao = parseInt(matchPadrao2[1]);
                const codigoQuestao = matchPadrao2[2];
                const textoQuestao = matchPadrao2[3];
                
                if (numeroQuestao >= faixaInicio && numeroQuestao <= faixaFim) {
                    // Procurar descritor na próxima linha ou linhas seguintes
                    for (let j = i + 1; j < Math.min(i + 5, linhas.length); j++) {
                        const linhaDescritor = linhas[j].trim();
                        const matchDescritor = linhaDescritor.match(/Descritor:\s*(D\d+_[PM])\s*-\s*(.+)/);
                        if (matchDescritor) {
                            questoes.push({
                                numero: numeroQuestao,
                                codigo: `Q${numeroQuestao.toString().padStart(2, '0')}`,
                                texto: textoQuestao.length > 80 ? textoQuestao.substring(0, 80) + '...' : textoQuestao,
                                descritor: {
                                    codigo: matchDescritor[1],
                                    nome: matchDescritor[2]
                                }
                            });
                            console.log(`Padrão 2 - Adicionada questão ${numeroQuestao}: ${matchDescritor[1]}`);
                            questaoEncontrada = true;
                            break;
                        }
                        // Se encontrar uma nova questão, parar de procurar
                        if (linhaDescritor.match(/^\d+\)/)) break;
                    }
                }
            }
        }
    }
    
    console.log(`Total de questões carregadas para ${disciplina}: ${questoes.length}`);
    
    return questoes;
}

function gerarQuestoesFallback(ano, disciplina) {
    console.log(`Gerando fallback para ${ano} - ${disciplina}`);
    const dados = dadosAV2.resultados[ano] && dadosAV2.resultados[ano][disciplina];
    if (!dados) {
        console.log('Dados não encontrados para fallback');
        return [];
    }
    
    const questoes = [];
    let numeroQuestao = (disciplina === 'Matemática') ? 27 : 1; // Matemática começa na questão 27 para anos combinados
    
    console.log(`Iniciando numeração em: ${numeroQuestao}`);
    
    // Gerar questões baseadas nos descritores conhecidos
    Object.entries(dados.descritores).forEach(([codigo, info]) => {
        for (let i = 0; i < info.questoes; i++) {
            const questao = {
                numero: numeroQuestao,
                codigo: `Q${numeroQuestao.toString().padStart(2, '0')}`,
                texto: `Questão ${numeroQuestao} - ${disciplina} (baseado em ${codigo})`,
                descritor: {
                    codigo: codigo,
                    nome: info.nome
                }
            };
            questoes.push(questao);
            console.log(`Gerada questão fallback ${numeroQuestao}: ${codigo}`);
            numeroQuestao++;
        }
    });
    
    console.log(`Total de questões fallback geradas: ${questoes.length}`);
    return questoes;
}

function criarListaQuestoes(questoes) {
    if (!questoes || questoes.length === 0) {
        return '<div class="alert alert-info">Nenhuma questão encontrada.</div>';
    }
    
    return questoes.map(questao => `
        <div class="card mb-3 questao-card">
            <div class="card-header d-flex justify-content-between align-items-center">
                <span class="fw-bold">
                    <i class="fas fa-question-circle me-2 text-primary"></i>
                    Questão ${questao.numero.toString().padStart(2, '0')}
                </span>
                <span class="badge bg-secondary">${questao.codigo}</span>
            </div>
            <div class="card-body">
                <p class="questao-texto mb-3">${questao.texto}</p>
                <div class="descritor-info p-3 bg-light rounded">
                    <div class="row align-items-center">
                        <div class="col-md-3">
                            <span class="badge bg-primary fs-6">${questao.descritor.codigo}</span>
                        </div>
                        <div class="col-md-9">
                            <small class="text-muted fw-bold">Descritor:</small>
                            <div>${questao.descritor.nome}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}
