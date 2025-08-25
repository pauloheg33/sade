// Dados reais da AV2 - AVALIE CE
const dadosAV2 = {
    escolas: ['03 DE DEZEMBRO', 'FIRMINO JOSÉ', 'JOAQUIM FERREIRA', 'JOSE ALVES DE SENA', 'MOURÃO LIMA', 'ANTONIO DE SOUSA BARROS', 'MARIA AMELIA'],
    anos: ['2º', '5º', '8º', '9º'],
    materias: ['Português', 'Matemática'],
    
    // Dados por ano/matéria baseados nas correlações fornecidas
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
        '5º': {
            'Português': {
                totalQuestoes: 26,
                descritores: {
                    'D016_P': { nome: 'Identificar a finalidade de textos de diferentes gêneros', questoes: 4, percentual: 15.4 },
                    'D017_P': { nome: 'Reconhecer o gênero de um texto', questoes: 3, percentual: 11.5 },
                    'D019_P': { nome: 'Reconhecer formas de tratar informação na comparação de textos', questoes: 2, percentual: 7.7 },
                    'D022_P': { nome: 'Inferir o sentido de palavra ou expressão a partir do contexto', questoes: 2, percentual: 7.7 },
                    'D023_P': { nome: 'Inferir informações em textos', questoes: 3, percentual: 11.5 },
                    'D024_P': { nome: 'Reconhecer efeito de humor ou de ironia em um texto', questoes: 1, percentual: 3.8 },
                    'D025_P': { nome: 'Reconhecer efeitos de sentido da pontuação e outras notações', questoes: 2, percentual: 7.7 },
                    'D026_P': { nome: 'Reconhecer efeitos de sentido de recursos linguísticos', questoes: 3, percentual: 11.5 },
                    'D028_P': { nome: 'Reconhecer o assunto de um texto lido', questoes: 1, percentual: 3.8 },
                    'D037_P': { nome: 'Reconhecer relações entre partes de um texto (recursos coesivos)', questoes: 2, percentual: 7.7 },
                    'D038_P': { nome: 'Distinguir um fato da opinião', questoes: 1, percentual: 3.8 },
                    'D039_P': { nome: 'Reconhecer o sentido das relações lógico-discursivas', questoes: 2, percentual: 7.7 }
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
let filtroAnoAtual = '';
let filtroMateriaAtual = '';
let graficosInicializados = false;
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
    
    const elementTotalEscolas = document.getElementById('total-escolas-av2');
    const elementTotalAlunos = document.getElementById('total-alunos-av2');
    const elementMediaMunicipio = document.getElementById('media-municipio-av2');
    const elementNumeroAvaliacoes = document.getElementById('numero-avaliacoes-av2');
    
    if (elementTotalEscolas) elementTotalEscolas.textContent = stats.totalEscolas;
    if (elementTotalAlunos) elementTotalAlunos.textContent = stats.totalAlunos;
    if (elementMediaMunicipio) elementMediaMunicipio.textContent = `${stats.mediaMunicipio}%`;
    if (elementNumeroAvaliacoes) elementNumeroAvaliacoes.textContent = stats.numeroAvaliacoes;
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
    
    // Atualizar dados filtrados
    filtroAnoAtual = ano;
    filtroMateriaAtual = disciplina;
    
    // Gerar análises
    gerarAnaliseDescritores(ano, disciplina);
    gerarAnaliseEscolas(ano, disciplina, escola);
    
    // Mostrar seção de resultados
    const resultadosSection = document.getElementById('av2-resultados');
    if (resultadosSection) {
        resultadosSection.style.display = 'block';
    }
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
