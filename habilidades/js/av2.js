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
                    'D131_M': { nome: 'Calcular porcentagem', questoes: 2, percentual: 7.7 }
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
    }
};

// Dados de desempenho das escolas
const desempenhoEscolas = {
    '2º': {
        'Português': {
            'FIRMINO JOSÉ': { media: 70.1, alunos: 19 },
            'JOAQUIM FERREIRA': { media: 65.8, alunos: 21 },
            'JOSE ALVES DE SENA': { media: 61.6, alunos: 22 },
            'MOURÃO LIMA': { media: 80.4, alunos: 25 },
            'ANTONIO DE SOUSA BARROS': { media: 67.7, alunos: 18 },
            '03 DE DEZEMBRO': { media: 83.9, alunos: 6 },
            'MARIA AMELIA': { media: 69.9, alunos: 7 }
        },
        'Matemática': {
            'FIRMINO JOSÉ': { media: 71.3, alunos: 19 },
            'JOAQUIM FERREIRA': { media: 72.0, alunos: 21 },
            'JOSE ALVES DE SENA': { media: 54.0, alunos: 22 },
            'MOURÃO LIMA': { media: 69.8, alunos: 25 },
            'ANTONIO DE SOUSA BARROS': { media: 60.8, alunos: 18 },
            '03 DE DEZEMBRO': { media: 74.6, alunos: 6 },
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
            'FIRMINO JOSÉ': { media: 65.8, alunos: 18 },
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
            'FIRMINO JOSÉ': { media: 63.5, alunos: 16 },
            'JOAQUIM FERREIRA': { media: 68.8, alunos: 19 },
            'MOURÃO LIMA': { media: 72.1, alunos: 23 }
        },
        'Matemática': {
            'FIRMINO JOSÉ': { media: 61.2, alunos: 16 },
            'JOAQUIM FERREIRA': { media: 64.7, alunos: 19 },
            'MOURÃO LIMA': { media: 69.3, alunos: 23 }
        }
    }
};

// Inicialização automática
document.addEventListener('DOMContentLoaded', function() {
    carregarTodosDados();
});

function carregarTodosDados() {
    console.log('Carregando todos os dados da AV2...');
    
    // Calcular estatísticas gerais
    calcularEstatisticasGerais();
    
    // Carregar dados por ano
    carregarDadosPorAno();
}

function calcularEstatisticasGerais() {
    let totalAlunos = 0;
    let totalEscolas = new Set();
    
    // Percorrer todos os dados para calcular totais
    Object.keys(dadosAV2.resultados).forEach(ano => {
        Object.keys(dadosAV2.resultados[ano]).forEach(disciplina => {
            if (desempenhoEscolas[ano] && desempenhoEscolas[ano][disciplina]) {
                Object.keys(desempenhoEscolas[ano][disciplina]).forEach(escola => {
                    totalAlunos += desempenhoEscolas[ano][disciplina][escola].alunos;
                    totalEscolas.add(escola);
                });
            }
        });
    });
    
    // Atualizar estatísticas na tela
    document.getElementById('total-alunos').textContent = totalAlunos.toLocaleString();
    document.getElementById('total-escolas').textContent = totalEscolas.size;
}

function carregarDadosPorAno() {
    console.log('Carregando dados por ano...');
    dadosAV2.anos.forEach(ano => {
        const container = document.getElementById(`dados-${ano.replace('º', '')}ano`);
        if (container) {
            console.log(`Carregando dados para ${ano}...`);
            container.innerHTML = criarCardsAno(ano);
        } else {
            console.warn(`Container não encontrado para: dados-${ano.replace('º', '')}ano`);
        }
    });
}

function criarCardsAno(ano) {
    let html = '';
    
    console.log(`Criando cards para ${ano}:`, dadosAV2.resultados[ano]);
    
    // Card para Português
    if (dadosAV2.resultados[ano] && dadosAV2.resultados[ano]['Português']) {
        html += criarCardDisciplina(ano, 'Português', dadosAV2.resultados[ano]['Português']);
    }
    
    // Card para Matemática
    if (dadosAV2.resultados[ano] && dadosAV2.resultados[ano]['Matemática']) {
        html += criarCardDisciplina(ano, 'Matemática', dadosAV2.resultados[ano]['Matemática']);
    }
    
    return html;
}

function criarCardDisciplina(ano, disciplina, dados) {
    const escolasData = desempenhoEscolas[ano] && desempenhoEscolas[ano][disciplina] ? desempenhoEscolas[ano][disciplina] : {};
    
    // Calcular média geral e total de alunos
    let totalAlunos = 0;
    let somaMedias = 0;
    let numEscolas = 0;
    
    Object.values(escolasData).forEach(escola => {
        totalAlunos += escola.alunos;
        somaMedias += escola.media * escola.alunos;
        numEscolas++;
    });
    
    const mediaGeral = totalAlunos > 0 ? (somaMedias / totalAlunos).toFixed(1) : 0;
    
    // Criar lista de descritores (limitada a 5 principais)
    let descritoresHtml = '';
    const descritoresOrdenados = Object.entries(dados.descritores)
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
                <small class="text-muted">${descritor.nome}</small>
                <div class="progress mt-1" style="height: 4px;">
                    <div class="progress-bar" style="width: ${descritor.percentual}%; background-color: ${cor};"></div>
                </div>
            </div>
        `;
    });
    
    // Criar ranking de escolas
    let escolasRanking = '';
    const escolasOrdenadas = Object.entries(escolasData)
        .sort(([,a], [,b]) => b.media - a.media)
        .slice(0, 3);
    
    escolasOrdenadas.forEach(([nomeEscola, dadosEscola], index) => {
        const medalha = ['🥇', '🥈', '🥉'][index] || '';
        escolasRanking += `
            <div class="d-flex justify-content-between align-items-center mb-2">
                <small class="fw-bold">${medalha} ${nomeEscola}</small>
                <div class="text-end">
                    <span class="badge bg-primary">${dadosEscola.media}%</span>
                    <small class="text-muted d-block">${dadosEscola.alunos} alunos</small>
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
                        <span class="badge bg-light text-dark">${dados.totalQuestoes} questões</span>
                    </div>
                </div>
                <div class="card-body">
                    <!-- Estatísticas -->
                    <div class="row g-3 mb-3">
                        <div class="col-4">
                            <div class="text-center">
                                <div class="h6 mb-0 text-primary">${totalAlunos}</div>
                                <small class="text-muted">Alunos</small>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="text-center">
                                <div class="h6 mb-0 text-success">${mediaGeral}%</div>
                                <small class="text-muted">Média</small>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="text-center">
                                <div class="h6 mb-0 text-info">${Object.keys(dados.descritores).length}</div>
                                <small class="text-muted">Descritores</small>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Principais Descritores -->
                    <div class="mb-3">
                        <h6 class="text-primary mb-2">
                            <i class="fas fa-list me-1"></i>Principais Descritores
                        </h6>
                        <div style="max-height: 200px; overflow-y: auto;">
                            ${descritoresHtml}
                        </div>
                        ${Object.keys(dados.descritores).length > 5 ? 
                            `<small class="text-muted">E mais ${Object.keys(dados.descritores).length - 5} descritores...</small>` : ''}
                    </div>
                    
                    <!-- Top 3 Escolas -->
                    <div>
                        <h6 class="text-primary mb-2">
                            <i class="fas fa-trophy me-1"></i>Melhores Desempenhos
                        </h6>
                        ${escolasRanking}
                        ${numEscolas > 3 ? `<small class="text-muted">E mais ${numEscolas - 3} escolas...</small>` : ''}
                    </div>
                </div>
                <div class="card-footer">
                    <small class="text-muted">
                        <i class="fas fa-school me-1"></i>${numEscolas} escolas participantes
                    </small>
                    <div class="mt-2">
                        <a href="analise-detalhada.html" class="btn btn-outline-primary btn-sm">
                            <i class="fas fa-microscope me-1"></i>Análise Detalhada
                        </a>
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
