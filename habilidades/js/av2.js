// Dados reais da AV2 - AVALIE CE baseados nas correlações dos arquivos de análise
const dadosAV2 = {
    escolas: ['03 DE DEZEMBRO', 'FIRMINO JOSÉ', 'JOAQUIM FERREIRA', 'JOSE ALVES DE SENA', 'MOURÃO LIMA', 'ANTONIO DE SOUSA BARROS', 'MARIA AMELIA'],
    anos: ['2º', '4º', '5º', '8º', '9º'],
    materias: ['Português', 'Matemática'],
    
    // Dados por ano/matéria baseados nas correlações reais dos arquivos de análise
    resultados: {
        '2º': {
            'Português': {
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
                totalQuestoes: 26,
                descritores: {
                    'D002_M': { nome: 'Reconhecer características do sistema de numeração decimal', questoes: 2, percentual: 7.7 },
                    'D005_M': { nome: 'Utilizar números naturais na resolução de problemas', questoes: 1, percentual: 3.8 },
                    'D020_M': { nome: 'Corresponder figuras tridimensionais às suas planificações', questoes: 1, percentual: 3.8 },
                    'D021_M': { nome: 'Utilizar informações de tabelas ou gráficos na resolução de problemas', questoes: 1, percentual: 3.8 },
                    'D025_M': { nome: 'Utilizar área de figuras bidimensionais na resolução de problemas', questoes: 1, percentual: 3.8 },
                    'D030_M': { nome: 'Utilizar conversão entre unidades de medida na resolução de problemas', questoes: 3, percentual: 11.5 },
                    'D086_M': { nome: 'Executar multiplicação ou divisão com números naturais', questoes: 2, percentual: 7.7 },
                    'D122_M': { nome: 'Utilizar cálculos envolvendo operação com termo desconhecido', questoes: 2, percentual: 7.7 },
                    'D127_M': { nome: 'Reconhecer e nomear polígonos conforme características', questoes: 1, percentual: 3.8 },
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
    },
    
    // Dados de desempenho das escolas (baseados nos dados reais fornecidos)
    desempenhoEscolas: {
        '2º': {
            'Português': {
                '03 DE DEZEMBRO': { media: 83.9, alunos: 6 },
                'FIRMINO JOSÉ': { media: 70.1, alunos: 19 },
                'JOAQUIM FERREIRA': { media: 65.8, alunos: 21 },
                'JOSE ALVES DE SENA': { media: 61.6, alunos: 22 },
                'MOURÃO LIMA': { media: 80.4, alunos: 25 },
                'ANTONIO DE SOUSA BARROS': { media: 67.7, alunos: 18 },
                'MARIA AMELIA': { media: 69.9, alunos: 7 }
            },
            'Matemática': {
                '03 DE DEZEMBRO': { media: 74.6, alunos: 6 },
                'FIRMINO JOSÉ': { media: 71.3, alunos: 19 },
                'JOAQUIM FERREIRA': { media: 72.0, alunos: 21 },
                'JOSE ALVES DE SENA': { media: 54.0, alunos: 22 },
                'MOURÃO LIMA': { media: 69.8, alunos: 25 },
                'ANTONIO DE SOUSA BARROS': { media: 60.8, alunos: 18 },
                'MARIA AMELIA': { media: 68.0, alunos: 7 }
            }
        },
        '4º': {
            'Português': {
                'FIRMINO JOSÉ': { media: 72.5, alunos: 20 },
                'JOAQUIM FERREIRA': { media: 68.3, alunos: 24 },
                'JOSE ALVES DE SENA': { media: 59.8, alunos: 26 },
                'MOURÃO LIMA': { media: 75.2, alunos: 22 },
                'ANTONIO DE SOUSA BARROS': { media: 71.4, alunos: 19 },
                '03 DE DEZEMBRO': { media: 80.1, alunos: 8 }
            },
            'Matemática': {
                'FIRMINO JOSÉ': { media: 68.9, alunos: 20 },
                'JOAQUIM FERREIRA': { media: 65.7, alunos: 24 },
                'JOSE ALVES DE SENA': { media: 56.4, alunos: 26 },
                'MOURÃO LIMA': { media: 72.8, alunos: 22 },
                'ANTONIO DE SOUSA BARROS': { media: 69.2, alunos: 19 },
                '03 DE DEZEMBRO': { media: 77.3, alunos: 8 }
            }
        },
        '5º': {
            'Português': {
                'FIRMINO JOSÉ': { media: 68.2, alunos: 18 },
                'JOAQUIM FERREIRA': { media: 71.4, alunos: 28 },
                'JOSE ALVES DE SENA': { media: 54.1, alunos: 24 },
                'MOURÃO LIMA': { media: 70.9, alunos: 19 },
                'ANTONIO DE SOUSA BARROS': { media: 71.5, alunos: 12 },
                '03 DE DEZEMBRO': { media: 82.1, alunos: 11 }
            },
            'Matemática': {
                'FIRMINO JOSÉ': { media: 66.0, alunos: 18 },
                'JOAQUIM FERREIRA': { media: 70.6, alunos: 28 },
                'JOSE ALVES DE SENA': { media: 55.3, alunos: 24 },
                'MOURÃO LIMA': { media: 72.6, alunos: 19 },
                'ANTONIO DE SOUSA BARROS': { media: 66.3, alunos: 12 },
                '03 DE DEZEMBRO': { media: 85.5, alunos: 11 }
            }
        },
        '8º': {
            'Português': {
                'FIRMINO JOSÉ': { media: 65.8, alunos: 20 },
                'JOAQUIM FERREIRA': { media: 66.2, alunos: 21 },
                'MOURÃO LIMA': { media: 70.4, alunos: 25 }
            },
            'Matemática': {
                'FIRMINO JOSÉ': { media: 68.1, alunos: 20 },
                'JOAQUIM FERREIRA': { media: 65.2, alunos: 21 },
                'MOURÃO LIMA': { media: 73.0, alunos: 25 }
            }
        },
        '9º': {
            'Português': {
                'FIRMINO JOSÉ': { media: 67.3, alunos: 22 },
                'JOAQUIM FERREIRA': { media: 69.5, alunos: 25 },
                'ANTONIO DE SOUSA BARROS': { media: 72.8, alunos: 18 }
            },
            'Matemática': {
                'FIRMINO JOSÉ': { media: 64.7, alunos: 22 },
                'JOAQUIM FERREIRA': { media: 67.2, alunos: 25 },
                'ANTONIO DE SOUSA BARROS': { media: 70.1, alunos: 18 }
            }
        }
    }
};

// Variáveis globais para controle do estado
let chartDescritores = null;
let chartDesempenho = null;
let chartEscolas = null;

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    carregarEscolas();
    configurarEventos();
    atualizarEstatisticas();
});

function carregarEscolas() {
    const selectEscola = document.getElementById('filter-escola-av2');
    if (selectEscola) {
        dadosAV2.escolas.forEach(escola => {
            const option = document.createElement('option');
            option.value = escola;
            option.textContent = escola;
            selectEscola.appendChild(option);
        });
    }
}

function configurarEventos() {
    const btnAnalisar = document.getElementById('analisar-av2');
    const btnLimpar = document.getElementById('limpar-filtros-av2');
    const filterAno = document.getElementById('filter-ano-av2');
    const filterDisciplina = document.getElementById('filter-disciplina-av2');
    
    if (btnAnalisar) btnAnalisar.addEventListener('click', analisarDados);
    if (btnLimpar) btnLimpar.addEventListener('click', limparFiltros);
    if (filterAno) filterAno.addEventListener('change', verificarAutoAnalise);
    if (filterDisciplina) filterDisciplina.addEventListener('change', verificarAutoAnalise);
}

function atualizarEstatisticas() {
    const stats = calcularEstatisticas();
    
    const elementTotalEscolas = document.getElementById('escolas-participantes');
    const elementTotalAlunos = document.getElementById('total-alunos');
    const elementMediaMunicipio = document.getElementById('media-geral-av2');
    const elementNumeroAvaliacoes = document.getElementById('questoes-analisadas');
    
    if (elementTotalEscolas) elementTotalEscolas.textContent = stats.totalEscolas;
    if (elementTotalAlunos) elementTotalAlunos.textContent = stats.totalAlunos;
    if (elementMediaMunicipio) elementMediaMunicipio.textContent = `${stats.mediaMunicipio}%`;
    if (elementNumeroAvaliacoes) elementNumeroAvaliacoes.textContent = stats.numeroAvaliacoes;
    
    // Mostrar container de estatísticas
    const statsContainer = document.getElementById('stats-container');
    if (statsContainer && stats.numeroAvaliacoes > 0) {
        statsContainer.style.display = 'flex';
    }
}

function calcularEstatisticas() {
    let totalEscolas = new Set();
    let totalAlunos = 0;
    let somaMedias = 0;
    let contadorMedias = 0;
    let numeroAvaliacoes = 0;
    
    // Iterar pelos dados reais organizados por ano
    Object.entries(dadosAV2.desempenhoEscolas).forEach(([ano, materias]) => {
        Object.entries(materias).forEach(([materia, escolas]) => {
            Object.entries(escolas).forEach(([escola, dados]) => {
                totalEscolas.add(escola);
                totalAlunos += dados.alunos;
                somaMedias += dados.media;
                contadorMedias++;
            });
        });
    });
    
    numeroAvaliacoes = contadorMedias;
    
    return {
        totalEscolas: totalEscolas.size,
        totalAlunos: totalAlunos,
        mediaMunicipio: contadorMedias > 0 ? (somaMedias / contadorMedias).toFixed(1) : 0,
        numeroAvaliacoes: numeroAvaliacoes
    };
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
    
    // Gerar análises
    gerarAnaliseDescritores(ano, disciplina);
    gerarAnaliseEscolas(ano, disciplina, escola);
    
    // Mostrar seção de resultados
    const resultadosSection = document.getElementById('av2-resultados');
    if (resultadosSection) {
        resultadosSection.style.display = 'block';
    }
}

function gerarAnaliseDescritores(ano, disciplina) {
    const dadosResultados = dadosAV2.resultados[ano];
    if (!dadosResultados || !dadosResultados[disciplina]) {
        console.warn(`Dados não encontrados para ${ano}º ano - ${disciplina}`);
        return;
    }

    const descritores = dadosResultados[disciplina].descritores;
    const totalQuestoes = dadosResultados[disciplina].totalQuestoes;
    
    // Preparar dados para o gráfico de descritores
    const labels = [];
    const valores = [];
    const cores = [];
    
    Object.entries(descritores).forEach(([codigo, descritor]) => {
        labels.push(codigo.replace('_P', '').replace('_M', ''));
        valores.push(descritor.questoes);
        cores.push(gerarCorAleatoria());
    });
    
    // Criar gráfico de descritores
    criarGraficoDescritores(labels, valores, cores);
    
    // Atualizar tabela de descritores
    atualizarTabelaDescritores(descritores, totalQuestoes);
    
    // Atualizar informações resumo
    atualizarResumoDescritores(Object.keys(descritores).length, totalQuestoes, ano, disciplina);
}

function gerarAnaliseEscolas(ano, disciplina, escolaFiltro = null) {
    const dadosEscolas = dadosAV2.desempenhoEscolas[ano];
    if (!dadosEscolas || !dadosEscolas[disciplina]) {
        console.warn(`Dados de escolas não encontrados para ${ano}º ano - ${disciplina}`);
        return;
    }

    let escolas = dadosEscolas[disciplina];
    
    // Filtrar por escola específica se solicitado
    if (escolaFiltro && escolas[escolaFiltro]) {
        escolas = { [escolaFiltro]: escolas[escolaFiltro] };
    }
    
    // Preparar dados para gráficos
    const nomesEscolas = Object.keys(escolas);
    const medias = nomesEscolas.map(escola => escolas[escola].media);
    const alunos = nomesEscolas.map(escola => escolas[escola].alunos);
    
    // Criar gráficos de desempenho das escolas
    criarGraficoDesempenhoEscolas(nomesEscolas, medias, alunos);
    
    // Atualizar tabela de escolas
    atualizarTabelaEscolas(escolas, ano, disciplina);
}

function criarGraficoDescritores(labels, valores, cores) {
    const ctx = document.getElementById('chart-desempenho-av2');
    if (!ctx) return;

    // Destruir gráfico existente se houver
    if (chartDescritores) {
        chartDescritores.destroy();
    }

    chartDescritores = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: valores,
                backgroundColor: cores,
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Distribuição de Questões por Descritor',
                    font: { size: 16, weight: 'bold' }
                },
                legend: {
                    position: 'right',
                    labels: { padding: 15, usePointStyle: true }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.parsed} questões`;
                        }
                    }
                }
            }
        }
    });
}

function criarGraficoDesempenhoEscolas(escolas, medias, alunos) {
    const ctx = document.getElementById('chart-escolas-av2');
    if (!ctx) return;

    // Destruir gráfico existente se houver
    if (chartDesempenho) {
        chartDesempenho.destroy();
    }

    chartDesempenho = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: escolas.map(escola => escola.length > 15 ? escola.substring(0, 15) + '...' : escola),
            datasets: [
                {
                    label: 'Média (%)',
                    data: medias,
                    backgroundColor: 'rgba(54, 162, 235, 0.8)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                    yAxisID: 'y'
                },
                {
                    label: 'Nº Alunos',
                    data: alunos,
                    type: 'line',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 2,
                    fill: false,
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Desempenho das Escolas',
                    font: { size: 16, weight: 'bold' }
                },
                legend: {
                    display: true,
                    position: 'top'
                }
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Escolas'
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Média (%)'
                    },
                    min: 0,
                    max: 100
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Número de Alunos'
                    },
                    grid: {
                        drawOnChartArea: false,
                    },
                }
            }
        }
    });
}

function atualizarTabelaDescritores(descritores, totalQuestoes) {
    const tbody = document.getElementById('tabela-descritores-body-av2');
    if (!tbody) return;

    tbody.innerHTML = '';
    
    Object.entries(descritores).forEach(([codigo, descritor]) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${codigo.replace('_P', '').replace('_M', '')}</strong></td>
            <td>${descritor.nome}</td>
            <td class="text-center">
                <span class="badge bg-primary">${descritor.questoes}</span>
            </td>
            <td class="text-center">
                <span class="badge bg-success">${descritor.percentual.toFixed(1)}%</span>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function atualizarTabelaEscolas(escolas, ano, disciplina) {
    const tbody = document.getElementById('tabela-escolas-body-av2');
    if (!tbody) return;

    tbody.innerHTML = '';
    
    // Converter para array e ordenar por média decrescente
    const escolasArray = Object.entries(escolas).map(([nome, dados]) => ({
        nome,
        ...dados
    })).sort((a, b) => b.media - a.media);
    
    escolasArray.forEach((escola, index) => {
        const row = document.createElement('tr');
        const posicao = index + 1;
        let badgeClass = 'bg-success';
        if (posicao === 1) badgeClass = 'bg-warning';
        else if (posicao === 2) badgeClass = 'bg-info';
        else if (posicao === 3) badgeClass = 'bg-secondary';
        
        row.innerHTML = `
            <td class="text-center">
                <span class="badge ${badgeClass}">${posicao}º</span>
            </td>
            <td>${escola.nome}</td>
            <td class="text-center">
                <span class="badge bg-primary">${escola.alunos}</span>
            </td>
            <td class="text-center">
                <span class="badge bg-success">${escola.media.toFixed(1)}%</span>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function atualizarResumoDescritores(totalDescritores, totalQuestoes, ano, disciplina) {
    const resumoElement = document.getElementById('resumo-descritores-av2');
    if (!resumoElement) return;

    resumoElement.innerHTML = `
        <div class="alert alert-info">
            <h5 class="alert-heading">
                <i class="fas fa-chart-pie me-2"></i>Análise ${ano}º Ano - ${disciplina}
            </h5>
            <p class="mb-2">
                <strong>Total de Descritores Avaliados:</strong> ${totalDescritores}<br>
                <strong>Total de Questões:</strong> ${totalQuestoes}<br>
                <strong>Média de Questões por Descritor:</strong> ${(totalQuestoes / totalDescritores).toFixed(1)}
            </p>
        </div>
    `;
}

function limparFiltros() {
    // Limpar selects
    document.getElementById('filter-ano-av2').value = '';
    document.getElementById('filter-disciplina-av2').value = '';
    document.getElementById('filter-escola-av2').value = '';
    
    // Esconder resultados
    const resultadosSection = document.getElementById('av2-resultados');
    if (resultadosSection) {
        resultadosSection.style.display = 'none';
    }
    
    // Destruir gráficos
    if (chartDescritores) {
        chartDescritores.destroy();
        chartDescritores = null;
    }
    if (chartDesempenho) {
        chartDesempenho.destroy();
        chartDesempenho = null;
    }
    
    // Limpar tabelas
    const tabelaDescritores = document.getElementById('tabela-descritores-body-av2');
    const tabelaEscolas = document.getElementById('tabela-escolas-body-av2');
    const resumoDescritores = document.getElementById('resumo-descritores-av2');
    
    if (tabelaDescritores) tabelaDescritores.innerHTML = '';
    if (tabelaEscolas) tabelaEscolas.innerHTML = '';
    if (resumoDescritores) resumoDescritores.innerHTML = '';
}

function gerarCorAleatoria() {
    const cores = [
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
        '#FF9F40', '#FF6384', '#C9CBCF', '#4BC0C0', '#FF6384',
        '#36A2EB', '#FFCE56', '#E74C3C', '#3498DB', '#2ECC71',
        '#F39C12', '#9B59B6', '#1ABC9C', '#E67E22', '#95A5A6'
    ];
    return cores[Math.floor(Math.random() * cores.length)];
}

// Função para exportar dados (funcionalidade adicional)
function exportarDados() {
    const ano = document.getElementById('filter-ano-av2').value;
    const disciplina = document.getElementById('filter-disciplina-av2').value;
    
    if (!ano || !disciplina) {
        alert('Selecione o ano e a disciplina para exportar os dados');
        return;
    }
    
    const dados = {
        filtros: { ano, disciplina },
        descritores: dadosAV2.resultados[ano] ? dadosAV2.resultados[ano][disciplina] : null,
        escolas: dadosAV2.desempenhoEscolas[ano] ? dadosAV2.desempenhoEscolas[ano][disciplina] : null
    };
    
    const blob = new Blob([JSON.stringify(dados, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `av2_${ano}_${disciplina.toLowerCase()}_${new Date().getTime()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
