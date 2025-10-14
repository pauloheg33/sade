// Dados reais baseados no arquivo YAML fornecido
const dadosCiclos = {
    escolas: [
        "03 DE DEZEMBRO",
        "ANTÔNIO DE SOUSA BARROS", 
        "FIRMINO JOSÉ",
        "JOAQUIM FERREIRA",
        "JOSÉ ALVES",
        "MARIA AMÉLIA",
        "MOURÃO LIMA",
        "21 DE DEZEMBRO"
    ],
    anos: ["5º Ano", "9º Ano"],
    avaliacoes: ["CNCA 2025", "PROEA 2025"],
    componentes: ["Língua Portuguesa", "Matemática", "Ciências da Natureza"],
    turmas: ["Turma A", "Turma B", "Turma C"],
    ciclos: ["Ciclo I", "Ciclo II", "Ciclo III"],

    // Dados reais do arquivo YAML
    dadosDesempenho: [
        // 5º Ano - CNCA 2025
        {
            escola: "03 DE DEZEMBRO",
            ano: "5º Ano",
            avaliacao: "CNCA 2025",
            componente: "Língua Portuguesa",
            turma: "Turma A",
            mediaCicloI: 69.56,
            mediaCicloII: 72.0,
            mediaCicloIII: 74.6,
            mediaGeral: 72.05
        },
        {
            escola: "03 DE DEZEMBRO",
            ano: "5º Ano",
            avaliacao: "CNCA 2025",
            componente: "Matemática",
            turma: "Turma A",
            mediaCicloI: 71.23,
            mediaCicloII: 70.1,
            mediaCicloIII: 72.7,
            mediaGeral: 71.34
        },
        {
            escola: "ANTÔNIO DE SOUSA BARROS",
            ano: "5º Ano",
            avaliacao: "CNCA 2025",
            componente: "Língua Portuguesa",
            turma: "Turma A",
            mediaCicloI: 69.4,
            mediaCicloII: 71.2,
            mediaCicloIII: 73.5,
            mediaGeral: 71.37
        },
        {
            escola: "ANTÔNIO DE SOUSA BARROS",
            ano: "5º Ano",
            avaliacao: "CNCA 2025",
            componente: "Matemática",
            turma: "Turma A",
            mediaCicloI: 62.8,
            mediaCicloII: 63.9,
            mediaCicloIII: 66.2,
            mediaGeral: 64.30
        },
        {
            escola: "FIRMINO JOSÉ",
            ano: "5º Ano",
            avaliacao: "CNCA 2025",
            componente: "Língua Portuguesa",
            turma: "Turma A",
            mediaCicloI: 76.1,
            mediaCicloII: 78.3,
            mediaCicloIII: 74.5,
            mediaGeral: 76.30
        },
        {
            escola: "FIRMINO JOSÉ",
            ano: "5º Ano",
            avaliacao: "CNCA 2025",
            componente: "Matemática",
            turma: "Turma A",
            mediaCicloI: 77.2,
            mediaCicloII: 79.6,
            mediaCicloIII: 78.25,
            mediaGeral: 78.35
        },
        {
            escola: "FIRMINO JOSÉ",
            ano: "5º Ano",
            avaliacao: "CNCA 2025",
            componente: "Língua Portuguesa",
            turma: "Turma B",
            mediaCicloI: 76.8,
            mediaCicloII: 79.0,
            mediaCicloIII: 77.56,
            mediaGeral: 77.79
        },
        {
            escola: "FIRMINO JOSÉ",
            ano: "5º Ano",
            avaliacao: "CNCA 2025",
            componente: "Matemática",
            turma: "Turma B",
            mediaCicloI: 78.1,
            mediaCicloII: 80.9,
            mediaCicloIII: 79.93,
            mediaGeral: 79.64
        },
        {
            escola: "JOAQUIM FERREIRA",
            ano: "5º Ano",
            avaliacao: "CNCA 2025",
            componente: "Língua Portuguesa",
            turma: "Turma A",
            mediaCicloI: 54.7,
            mediaCicloII: 56.0,
            mediaCicloIII: 51.22,
            mediaGeral: 53.97
        },
        {
            escola: "JOAQUIM FERREIRA",
            ano: "5º Ano",
            avaliacao: "CNCA 2025",
            componente: "Matemática",
            turma: "Turma A",
            mediaCicloI: 56.5,
            mediaCicloII: 58.1,
            mediaCicloIII: 52.58,
            mediaGeral: 55.73
        },
        {
            escola: "JOSÉ ALVES",
            ano: "5º Ano",
            avaliacao: "CNCA 2025",
            componente: "Língua Portuguesa",
            turma: "Turma A",
            mediaCicloI: 62.3,
            mediaCicloII: 64.2,
            mediaCicloIII: 63.54,
            mediaGeral: 63.35
        },
        {
            escola: "JOSÉ ALVES",
            ano: "5º Ano",
            avaliacao: "CNCA 2025",
            componente: "Matemática",
            turma: "Turma A",
            mediaCicloI: 63.1,
            mediaCicloII: 64.4,
            mediaCicloIII: 62.52,
            mediaGeral: 63.34
        },
        {
            escola: "JOSÉ ALVES",
            ano: "5º Ano",
            avaliacao: "CNCA 2025",
            componente: "Língua Portuguesa",
            turma: "Turma B",
            mediaCicloI: 63.6,
            mediaCicloII: 65.1,
            mediaCicloIII: 64.45,
            mediaGeral: 64.38
        },
        {
            escola: "JOSÉ ALVES",
            ano: "5º Ano",
            avaliacao: "CNCA 2025",
            componente: "Matemática",
            turma: "Turma B",
            mediaCicloI: 65.2,
            mediaCicloII: 68.3,
            mediaCicloIII: 67.77,
            mediaGeral: 67.09
        },
        {
            escola: "MARIA AMÉLIA",
            ano: "5º Ano",
            avaliacao: "CNCA 2025",
            componente: "Língua Portuguesa",
            turma: "Turma A",
            mediaCicloI: 67.4,
            mediaCicloII: 69.8,
            mediaCicloIII: 71.9,
            mediaGeral: 69.70
        },
        {
            escola: "MARIA AMÉLIA",
            ano: "5º Ano",
            avaliacao: "CNCA 2025",
            componente: "Matemática",
            turma: "Turma A",
            mediaCicloI: 69.0,
            mediaCicloII: 71.3,
            mediaCicloIII: 70.01,
            mediaGeral: 70.10
        },
        {
            escola: "MOURÃO LIMA",
            ano: "5º Ano",
            avaliacao: "CNCA 2025",
            componente: "Língua Portuguesa",
            turma: "Turma A",
            mediaCicloI: 63.9,
            mediaCicloII: 65.6,
            mediaCicloIII: 68.2,
            mediaGeral: 65.90
        },
        {
            escola: "MOURÃO LIMA",
            ano: "5º Ano",
            avaliacao: "CNCA 2025",
            componente: "Matemática",
            turma: "Turma A",
            mediaCicloI: 66.1,
            mediaCicloII: 68.9,
            mediaCicloIII: 71.4,
            mediaGeral: 68.80
        },
        {
            escola: "MOURÃO LIMA",
            ano: "5º Ano",
            avaliacao: "CNCA 2025",
            componente: "Língua Portuguesa",
            turma: "Turma B",
            mediaCicloI: 70.1,
            mediaCicloII: 72.8,
            mediaCicloIII: 75.6,
            mediaGeral: 72.83
        },
        {
            escola: "MOURÃO LIMA",
            ano: "5º Ano",
            avaliacao: "CNCA 2025",
            componente: "Matemática",
            turma: "Turma B",
            mediaCicloI: 71.0,
            mediaCicloII: 73.7,
            mediaCicloIII: 76.4,
            mediaGeral: 73.70
        },

        // 9º Ano - PROEA 2025
        {
            escola: "03 DE DEZEMBRO",
            ano: "9º Ano",
            avaliacao: "PROEA 2025",
            componente: "Ciências da Natureza",
            turma: "Turma A",
            mediaCicloI: 73.4,
            mediaCicloII: 76.5,
            mediaCicloIII: 78.8,
            mediaGeral: 76.23
        },
        {
            escola: "03 DE DEZEMBRO",
            ano: "9º Ano",
            avaliacao: "PROEA 2025",
            componente: "Língua Portuguesa",
            turma: "Turma A",
            mediaCicloI: 74.1,
            mediaCicloII: 76.9,
            mediaCicloIII: 79.5,
            mediaGeral: 76.83
        },
        {
            escola: "03 DE DEZEMBRO",
            ano: "9º Ano",
            avaliacao: "PROEA 2025",
            componente: "Matemática",
            turma: "Turma A",
            mediaCicloI: 73.2,
            mediaCicloII: 75.8,
            mediaCicloIII: 78.1,
            mediaGeral: 75.70
        },
        {
            escola: "ANTÔNIO DE SOUSA BARROS",
            ano: "9º Ano",
            avaliacao: "PROEA 2025",
            componente: "Ciências da Natureza",
            turma: "Turma A",
            mediaCicloI: 56.8,
            mediaCicloII: 59.3,
            mediaCicloIII: 61.5,
            mediaGeral: 59.20
        },
        {
            escola: "ANTÔNIO DE SOUSA BARROS",
            ano: "9º Ano",
            avaliacao: "PROEA 2025",
            componente: "Língua Portuguesa",
            turma: "Turma A",
            mediaCicloI: 61.2,
            mediaCicloII: 63.5,
            mediaCicloIII: 65.8,
            mediaGeral: 63.50
        },
        {
            escola: "ANTÔNIO DE SOUSA BARROS",
            ano: "9º Ano",
            avaliacao: "PROEA 2025",
            componente: "Matemática",
            turma: "Turma A",
            mediaCicloI: 58.4,
            mediaCicloII: 60.7,
            mediaCicloIII: 59.45,
            mediaGeral: 59.52
        },
        {
            escola: "FIRMINO JOSÉ",
            ano: "9º Ano",
            avaliacao: "PROEA 2025",
            componente: "Ciências da Natureza",
            turma: "Turma A",
            mediaCicloI: 60.8,
            mediaCicloII: 63.2,
            mediaCicloIII: 65.9,
            mediaGeral: 63.30
        },
        {
            escola: "FIRMINO JOSÉ",
            ano: "9º Ano",
            avaliacao: "PROEA 2025",
            componente: "Língua Portuguesa",
            turma: "Turma A",
            mediaCicloI: 62.5,
            mediaCicloII: 64.4,
            mediaCicloIII: 63.78,
            mediaGeral: 63.56
        },
        {
            escola: "FIRMINO JOSÉ",
            ano: "9º Ano",
            avaliacao: "PROEA 2025",
            componente: "Matemática",
            turma: "Turma A",
            mediaCicloI: 59.7,
            mediaCicloII: 62.0,
            mediaCicloIII: 60.21,
            mediaGeral: 60.64
        },
        {
            escola: "FIRMINO JOSÉ",
            ano: "9º Ano",
            avaliacao: "PROEA 2025",
            componente: "Ciências da Natureza",
            turma: "Turma B",
            mediaCicloI: 62.3,
            mediaCicloII: 65.5,
            mediaCicloIII: 60.15,
            mediaGeral: 62.65
        },
        {
            escola: "FIRMINO JOSÉ",
            ano: "9º Ano",
            avaliacao: "PROEA 2025",
            componente: "Língua Portuguesa",
            turma: "Turma B",
            mediaCicloI: 60.9,
            mediaCicloII: 62.1,
            mediaCicloIII: 64.4,
            mediaGeral: 62.47
        },
        {
            escola: "FIRMINO JOSÉ",
            ano: "9º Ano",
            avaliacao: "PROEA 2025",
            componente: "Matemática",
            turma: "Turma B",
            mediaCicloI: 59.8,
            mediaCicloII: 61.8,
            mediaCicloIII: 60.89,
            mediaGeral: 60.83
        },
        {
            escola: "JOSÉ ALVES",
            ano: "9º Ano",
            avaliacao: "PROEA 2025",
            componente: "Ciências da Natureza",
            turma: "Turma A",
            mediaCicloI: 60.1,
            mediaCicloII: 62.3,
            mediaCicloIII: 60.74,
            mediaGeral: 61.05
        },
        {
            escola: "JOSÉ ALVES",
            ano: "9º Ano",
            avaliacao: "PROEA 2025",
            componente: "Língua Portuguesa",
            turma: "Turma A",
            mediaCicloI: 63.2,
            mediaCicloII: 65.4,
            mediaCicloIII: 64.16,
            mediaGeral: 64.25
        },
        {
            escola: "JOSÉ ALVES",
            ano: "9º Ano",
            avaliacao: "PROEA 2025",
            componente: "Matemática",
            turma: "Turma A",
            mediaCicloI: 64.6,
            mediaCicloII: 67.0,
            mediaCicloIII: 69.3,
            mediaGeral: 66.97
        },
        {
            escola: "21 DE DEZEMBRO",
            ano: "9º Ano",
            avaliacao: "PROEA 2025",
            componente: "Ciências da Natureza",
            turma: "Turma A",
            mediaCicloI: 67.1,
            mediaCicloII: 68.5,
            mediaCicloIII: 69.2,
            mediaGeral: 68.27
        },
        {
            escola: "21 DE DEZEMBRO",
            ano: "9º Ano",
            avaliacao: "PROEA 2025",
            componente: "Língua Portuguesa",
            turma: "Turma A",
            mediaCicloI: 66.8,
            mediaCicloII: 68.5,
            mediaCicloIII: 69.8,
            mediaGeral: 68.37
        },
        {
            escola: "21 DE DEZEMBRO",
            ano: "9º Ano",
            avaliacao: "PROEA 2025",
            componente: "Matemática",
            turma: "Turma A",
            mediaCicloI: 59.3,
            mediaCicloII: 60.2,
            mediaCicloIII: 63.79,
            mediaGeral: 61.10
        },
        {
            escola: "21 DE DEZEMBRO",
            ano: "9º Ano",
            avaliacao: "PROEA 2025",
            componente: "Ciências da Natureza",
            turma: "Turma B",
            mediaCicloI: 65.6,
            mediaCicloII: 66.3,
            mediaCicloIII: 62.54,
            mediaGeral: 64.81
        },
        {
            escola: "21 DE DEZEMBRO",
            ano: "9º Ano",
            avaliacao: "PROEA 2025",
            componente: "Língua Portuguesa",
            turma: "Turma B",
            mediaCicloI: 64.8,
            mediaCicloII: 66.1,
            mediaCicloIII: 63.99,
            mediaGeral: 64.96
        },
        {
            escola: "21 DE DEZEMBRO",
            ano: "9º Ano",
            avaliacao: "PROEA 2025",
            componente: "Matemática",
            turma: "Turma B",
            mediaCicloI: 65.9,
            mediaCicloII: 66.8,
            mediaCicloIII: 61.94,
            mediaGeral: 64.88
        },
        {
            escola: "21 DE DEZEMBRO",
            ano: "9º Ano",
            avaliacao: "PROEA 2025",
            componente: "Ciências da Natureza",
            turma: "Turma C",
            mediaCicloI: 65.7,
            mediaCicloII: 67.0,
            mediaCicloIII: 68.3,
            mediaGeral: 67.00
        },
        {
            escola: "21 DE DEZEMBRO",
            ano: "9º Ano",
            avaliacao: "PROEA 2025",
            componente: "Língua Portuguesa",
            turma: "Turma C",
            mediaCicloI: 67.1,
            mediaCicloII: 67.7,
            mediaCicloIII: 68.4,
            mediaGeral: 67.73
        },
        {
            escola: "21 DE DEZEMBRO",
            ano: "9º Ano",
            avaliacao: "PROEA 2025",
            componente: "Matemática",
            turma: "Turma C",
            mediaCicloI: 64.1,
            mediaCicloII: 64.8,
            mediaCicloIII: 65.7,
            mediaGeral: 64.87
        }
    ],

    // Dados de evolução temporal calculados dinamicamente
    calcularEvolucaoTemporal: function() {
        const evolucao = {};
        
        this.dadosDesempenho.forEach(item => {
            if (!evolucao[item.escola]) {
                evolucao[item.escola] = {
                    escola: item.escola,
                    cicloI: [],
                    cicloII: [],
                    cicloIII: []
                };
            }
            
            evolucao[item.escola].cicloI.push(item.mediaCicloI);
            evolucao[item.escola].cicloII.push(item.mediaCicloII);
            evolucao[item.escola].cicloIII.push(item.mediaCicloIII);
        });

        // Calcular médias por ciclo para cada escola
        const resultado = [];
        Object.keys(evolucao).forEach(escola => {
            const data = evolucao[escola];
            
            resultado.push({
                ciclo: "Ciclo I",
                escola: escola,
                mediaGeral: (data.cicloI.reduce((a, b) => a + b, 0) / data.cicloI.length).toFixed(1)
            });
            
            resultado.push({
                ciclo: "Ciclo II", 
                escola: escola,
                mediaGeral: (data.cicloII.reduce((a, b) => a + b, 0) / data.cicloII.length).toFixed(1)
            });
            
            resultado.push({
                ciclo: "Ciclo III",
                escola: escola,
                mediaGeral: (data.cicloIII.reduce((a, b) => a + b, 0) / data.cicloIII.length).toFixed(1)
            });
        });
        
        return resultado;
    }
};

// Funções de filtro e análise
class DashboardCiclos {
    constructor() {
        this.filtros = {
            escola: null,
            ano: null,
            avaliacao: null,
            componente: null,
            turma: null
        };
        this.dados = dadosCiclos;
        this.chartComparativo = null;
        this.chartLinha = null;
        this.inicializar();
    }

    inicializar() {
        this.criarFiltros();
        this.atualizarDashboard();
        this.configurarEventos();
    }

    criarFiltros() {
        // Criar dropdowns de filtros
        this.criarDropdown('escola', this.dados.escolas);
        this.criarDropdown('ano', this.dados.anos);
        this.criarDropdown('avaliacao', this.dados.avaliacoes);
        this.criarDropdown('componente', this.dados.componentes);
        this.criarDropdown('turma', this.dados.turmas);
    }

    criarDropdown(tipo, opcoes) {
        const select = document.getElementById(`filtro-${tipo}`);
        if (select) {
            select.innerHTML = '<option value="">Todos</option>';
            opcoes.forEach(opcao => {
                const option = document.createElement('option');
                option.value = opcao;
                option.textContent = opcao;
                if (this.filtros[tipo] === opcao) {
                    option.selected = true;
                }
                select.appendChild(option);
            });
        }
    }

    aplicarFiltro(tipo, valor) {
        this.filtros[tipo] = valor || null;
        this.atualizarDashboard();
    }

    obterDadosFiltrados() {
        return this.dados.dadosDesempenho.filter(item => {
            return Object.keys(this.filtros).every(filtro => {
                if (!this.filtros[filtro]) return true;
                return item[filtro] === this.filtros[filtro];
            });
        });
    }

    calcularMediaGeral() {
        const dadosFiltrados = this.obterDadosFiltrados();
        if (dadosFiltrados.length === 0) return 0;
        
        const soma = dadosFiltrados.reduce((acc, item) => acc + item.mediaGeral, 0);
        return (soma / dadosFiltrados.length).toFixed(1);
    }

    atualizarDashboard() {
        this.atualizarCardMetrica();
        this.atualizarGraficoComparativo();
        this.atualizarGraficoLinha();
        this.atualizarEstatisticas();
    }

    atualizarCardMetrica() {
        const mediaGeral = this.calcularMediaGeral();
        const cardElement = document.getElementById('card-media-geral');
        if (cardElement) {
            cardElement.textContent = `${mediaGeral}%`;
        }
    }

    atualizarGraficoComparativo() {
        const dadosFiltrados = this.obterDadosFiltrados();
        
        // Agrupar por turma e componente
        const dadosAgrupados = {};
        dadosFiltrados.forEach(item => {
            const key = `${item.turma}-${item.componente}`;
            if (!dadosAgrupados[key]) {
                dadosAgrupados[key] = {
                    turma: item.turma,
                    componente: item.componente,
                    mediaCicloI: 0,
                    mediaCicloII: 0,
                    mediaCicloIII: 0,
                    count: 0
                };
            }
            dadosAgrupados[key].mediaCicloI += item.mediaCicloI;
            dadosAgrupados[key].mediaCicloII += item.mediaCicloII;
            dadosAgrupados[key].mediaCicloIII += item.mediaCicloIII;
            dadosAgrupados[key].count++;
        });

        // Calcular médias
        Object.keys(dadosAgrupados).forEach(key => {
            const item = dadosAgrupados[key];
            item.mediaCicloI = (item.mediaCicloI / item.count).toFixed(1);
            item.mediaCicloII = (item.mediaCicloII / item.count).toFixed(1);
            item.mediaCicloIII = (item.mediaCicloIII / item.count).toFixed(1);
        });

        this.criarGraficoComparativo(Object.values(dadosAgrupados));
    }

    atualizarGraficoLinha() {
        const dadosEvolucao = this.dados.calcularEvolucaoTemporal();
        const dadosFiltrados = dadosEvolucao.filter(item => {
            return !this.filtros.escola || item.escola === this.filtros.escola;
        });

        this.criarGraficoLinha(dadosFiltrados);
    }

    criarGraficoComparativo(dados) {
        const container = document.getElementById('grafico-comparativo');
        if (!container) return;

        // Limpar container
        container.innerHTML = '';

        if (dados.length === 0) {
            container.innerHTML = `
                <div class="text-center p-4">
                    <i class="fas fa-chart-column text-muted" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                    <h5 class="text-muted">Nenhum dado encontrado</h5>
                    <p class="text-muted mb-0">Selecione uma escola para visualizar os dados</p>
                </div>
            `;
            return;
        }

        // Agrupar dados por componente
        const dadosPorComponente = {};
        dados.forEach(item => {
            if (!dadosPorComponente[item.componente]) {
                dadosPorComponente[item.componente] = [];
            }
            dadosPorComponente[item.componente].push(item);
        });

        // Cores para cada ciclo
        const coresCiclos = {
            'Ciclo I': { bg: '#3b82f6', border: '#2563eb' },
            'Ciclo II': { bg: '#ef4444', border: '#dc2626' },
            'Ciclo III': { bg: '#10b981', border: '#059669' }
        };

        // Cores de fundo para cada componente
        const coresComponentes = {
            'Língua Portuguesa': '#e0f2fe',
            'Matemática': '#fef3c7', 
            'Ciências da Natureza': '#f0fdf4'
        };

        // Criar estrutura HTML para múltiplos gráficos
        const componentes = Object.keys(dadosPorComponente);
        const numComponentes = componentes.length;
        
        container.innerHTML = `
            <div class="small-multiples-container">
                <div class="legend-container mb-3">
                    <div class="d-flex justify-content-center gap-4">
                        <div class="legend-item">
                            <span class="legend-dot" style="background: #3b82f6;"></span>
                            Ciclo I
                        </div>
                        <div class="legend-item">
                            <span class="legend-dot" style="background: #ef4444;"></span>
                            Ciclo II
                        </div>
                        <div class="legend-item">
                            <span class="legend-dot" style="background: #10b981;"></span>
                            Ciclo III
                        </div>
                    </div>
                </div>
                <div class="charts-grid" style="display: grid; grid-template-columns: repeat(${Math.min(numComponentes, 3)}, 1fr); gap: 20px;">
                    ${componentes.map((componente, index) => `
                        <div class="chart-panel" style="background: ${coresComponentes[componente] || '#f8f9fa'}; border-radius: 12px; padding: 15px;">
                            <h6 class="chart-title text-center mb-3" style="font-weight: 600; color: #374151;">
                                ${componente}
                            </h6>
                            <div class="chart-wrapper" style="height: 280px; position: relative;">
                                <canvas id="chart-${index}" style="max-height: 280px;"></canvas>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        // Criar gráfico para cada componente
        componentes.forEach((componente, index) => {
            setTimeout(() => {
                this.criarGraficoIndividual(componente, dadosPorComponente[componente], index, coresCiclos);
            }, index * 200); // Animação escalonada
        });
    }

    criarGraficoIndividual(componente, dados, index, coresCiclos) {
        const ctx = document.getElementById(`chart-${index}`);
        if (!ctx) return;

        // Preparar dados
        const turmas = [...new Set(dados.map(item => item.turma.replace('Turma ', '')))].sort();
        
        const datasets = [
            {
                label: 'Ciclo I',
                data: turmas.map(turma => {
                    const item = dados.find(d => d.turma.replace('Turma ', '') === turma);
                    return item ? parseFloat(item.mediaCicloI) : 0;
                }),
                backgroundColor: coresCiclos['Ciclo I'].bg,
                borderColor: coresCiclos['Ciclo I'].border,
                borderWidth: 2,
                borderRadius: 4,
                borderSkipped: false
            },
            {
                label: 'Ciclo II', 
                data: turmas.map(turma => {
                    const item = dados.find(d => d.turma.replace('Turma ', '') === turma);
                    return item ? parseFloat(item.mediaCicloII) : 0;
                }),
                backgroundColor: coresCiclos['Ciclo II'].bg,
                borderColor: coresCiclos['Ciclo II'].border,
                borderWidth: 2,
                borderRadius: 4,
                borderSkipped: false
            },
            {
                label: 'Ciclo III',
                data: turmas.map(turma => {
                    const item = dados.find(d => d.turma.replace('Turma ', '') === turma);
                    return item ? parseFloat(item.mediaCicloIII) : 0;
                }),
                backgroundColor: coresCiclos['Ciclo III'].bg,
                borderColor: coresCiclos['Ciclo III'].border,
                borderWidth: 2,
                borderRadius: 4,
                borderSkipped: false
            }
        ];

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: turmas,
                datasets: datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false
                },
                plugins: {
                    legend: {
                        display: false // Legenda centralizada acima
                    },
                    tooltip: {
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        titleColor: '#374151',
                        bodyColor: '#374151',
                        borderColor: '#e5e7eb',
                        borderWidth: 1,
                        cornerRadius: 8,
                        displayColors: true,
                        callbacks: {
                            title: function(context) {
                                return `Turma ${context[0].label}`;
                            },
                            label: function(context) {
                                return `${context.dataset.label}: ${context.parsed.y.toFixed(1)}%`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            font: {
                                family: 'Inter',
                                size: 12,
                                weight: '600'
                            },
                            color: '#374151'
                        }
                    },
                    y: {
                        beginAtZero: true,
                        max: 100,
                        grid: {
                            color: 'rgba(0,0,0,0.1)',
                            lineWidth: 1
                        },
                        ticks: {
                            font: {
                                family: 'Inter',
                                size: 10
                            },
                            color: '#6b7280',
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                },
                animation: {
                    duration: 800,
                    easing: 'easeInOutQuart'
                }
            }
        });
    }

    criarGraficoLinha(dados) {
        const ctx = document.getElementById('grafico-evolucao');
        if (!ctx) return;

        // Destruir gráfico existente se houver
        if (this.chartLinha) {
            this.chartLinha.destroy();
        }

        if (dados.length === 0) {
            return;
        }

        // Agrupar por escola
        const escolasUnicas = [...new Set(dados.map(item => item.escola))];
        const cores = [
            { border: '#ef4444', bg: '#fef2f2' },
            { border: '#3b82f6', bg: '#eff6ff' },
            { border: '#f59e0b', bg: '#fffbeb' },
            { border: '#10b981', bg: '#f0fdf4' },
            { border: '#8b5cf6', bg: '#faf5ff' },
            { border: '#06b6d4', bg: '#f0fdfa' },
            { border: '#84cc16', bg: '#f7fee7' },
            { border: '#f97316', bg: '#fff7ed' }
        ];
        
        const datasets = escolasUnicas.slice(0, 8).map((escola, index) => {
            const dadosEscola = dados.filter(item => item.escola === escola);
            const escolaNome = escola.length > 15 ? escola.substring(0, 15) + '...' : escola;
            
            return {
                label: escolaNome,
                data: this.dados.ciclos.map(ciclo => {
                    const item = dadosEscola.find(d => d.ciclo === ciclo);
                    return item ? parseFloat(item.mediaGeral) : null;
                }),
                borderColor: cores[index].border,
                backgroundColor: cores[index].bg,
                borderWidth: 3,
                pointBackgroundColor: cores[index].border,
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8,
                tension: 0.3,
                fill: false
            };
        });

        this.chartLinha = new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.dados.ciclos,
                datasets: datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false
                },
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            usePointStyle: true,
                            padding: 15,
                            font: {
                                family: 'Inter',
                                size: 10,
                                weight: '500'
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        titleColor: '#374151',
                        bodyColor: '#374151',
                        borderColor: '#e5e7eb',
                        borderWidth: 1,
                        cornerRadius: 8,
                        displayColors: true,
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: ${context.parsed.y?.toFixed(1) || 'N/A'}%`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            font: {
                                family: 'Inter',
                                size: 11,
                                weight: '500'
                            },
                            color: '#6b7280'
                        }
                    },
                    y: {
                        beginAtZero: true,
                        max: 100,
                        grid: {
                            color: '#f3f4f6',
                            lineWidth: 1
                        },
                        ticks: {
                            font: {
                                family: 'Inter',
                                size: 11
                            },
                            color: '#6b7280',
                            callback: function(value) {
                                return value + '%';
                            }
                        },
                        title: {
                            display: true,
                            text: 'Média (%)',
                            font: {
                                family: 'Inter',
                                size: 12,
                                weight: '600'
                            },
                            color: '#374151'
                        }
                    }
                },
                animation: {
                    duration: 1000,
                    easing: 'easeInOutQuart'
                }
            }
        });
    }

    atualizarEstatisticas() {
        const dadosFiltrados = this.obterDadosFiltrados();
        const stats = document.getElementById('estatisticas-resumo');
        
        if (stats && dadosFiltrados.length > 0) {
            const melhorDesempenho = Math.max(...dadosFiltrados.map(d => d.mediaGeral));
            const piorDesempenho = Math.min(...dadosFiltrados.map(d => d.mediaGeral));
            const totalRegistros = dadosFiltrados.length;

            stats.innerHTML = `
                <div class="stat-item">
                    <i class="fas fa-arrow-up text-success"></i>
                    <span>Melhor: ${melhorDesempenho.toFixed(1)}%</span>
                </div>
                <div class="stat-item">
                    <i class="fas fa-arrow-down text-danger"></i>
                    <span>Menor: ${piorDesempenho.toFixed(1)}%</span>
                </div>
                <div class="stat-item">
                    <i class="fas fa-chart-bar text-info"></i>
                    <span>Registros: ${totalRegistros}</span>
                </div>
            `;
        }
    }

    configurarEventos() {
        // Configurar eventos de mudança nos filtros
        ['escola', 'ano', 'avaliacao', 'componente', 'turma'].forEach(filtro => {
            const element = document.getElementById(`filtro-${filtro}`);
            if (element) {
                element.addEventListener('change', (e) => {
                    this.aplicarFiltro(filtro, e.target.value);
                });
            }
        });

        // Botão de reset
        const resetBtn = document.getElementById('reset-filtros');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                this.resetarFiltros();
            });
        }
    }

    resetarFiltros() {
        this.filtros = {
            escola: null,
            ano: null,
            avaliacao: null,
            componente: null,
            turma: null
        };
        
        this.criarFiltros();
        this.atualizarDashboard();
    }
}

// Inicializar quando o documento estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    window.dashboardCiclos = new DashboardCiclos();
});