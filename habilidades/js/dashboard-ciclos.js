// Dados simulados baseados na estrutura do Power BI
const dadosCiclos = {
    escolas: [
        "03 DE DEZEMBRO",
        "ANTONIO MARCOS PAULINO",
        "DOMINGOS FERREIRA LIMA",
        "FRANCISCO GADELHA LIMA",
        "JOSE JACOME DE LIMA",
        "JOSE NOBERTO DE OLIVEIRA",
        "MANOEL FERREIRA LIMA",
        "MARIA IVANISE LIMA",
        "VICENTE PAULO CARNEIRO"
    ],
    anos: ["5º Ano", "9º Ano"],
    avaliacoes: ["CNCA 2025", "AVALIE CE 2025"],
    componentes: ["Língua Portuguesa", "Matemática"],
    turmas: ["5A", "5B", "5C", "9A", "9B", "9C"],
    ciclos: ["Ciclo I", "Ciclo II", "Ciclo III"],

    // Dados de desempenho por escola/ano/componente
    dadosDesempenho: [
        {
            escola: "03 DE DEZEMBRO",
            ano: "5º Ano",
            avaliacao: "CNCA 2025",
            componente: "Língua Portuguesa",
            turma: "5A",
            mediaCicloI: 72.5,
            mediaCicloII: 68.3,
            mediaCicloIII: 75.1,
            mediaGeral: 71.9
        },
        {
            escola: "03 DE DEZEMBRO",
            ano: "5º Ano",
            avaliacao: "CNCA 2025",
            componente: "Matemática",
            turma: "5A",
            mediaCicloI: 65.2,
            mediaCicloII: 62.8,
            mediaCicloIII: 69.4,
            mediaGeral: 65.8
        },
        {
            escola: "03 DE DEZEMBRO",
            ano: "5º Ano",
            avaliacao: "CNCA 2025",
            componente: "Língua Portuguesa",
            turma: "5B",
            mediaCicloI: 78.1,
            mediaCicloII: 73.6,
            mediaCicloIII: 80.2,
            mediaGeral: 77.3
        },
        {
            escola: "03 DE DEZEMBRO",
            ano: "5º Ano",
            avaliacao: "CNCA 2025",
            componente: "Matemática",
            turma: "5B",
            mediaCicloI: 70.3,
            mediaCicloII: 67.1,
            mediaCicloIII: 73.5,
            mediaGeral: 70.3
        },
        {
            escola: "03 DE DEZEMBRO",
            ano: "9º Ano",
            avaliacao: "AVALIE CE 2025",
            componente: "Língua Portuguesa",
            turma: "9A",
            mediaCicloI: 58.2,
            mediaCicloII: 62.5,
            mediaCicloIII: 66.8,
            mediaGeral: 62.5
        },
        {
            escola: "03 DE DEZEMBRO",
            ano: "9º Ano",
            avaliacao: "AVALIE CE 2025",
            componente: "Matemática",
            turma: "9A",
            mediaCicloI: 52.1,
            mediaCicloII: 56.3,
            mediaCicloIII: 61.2,
            mediaGeral: 56.5
        },
        // Dados para outras escolas...
        {
            escola: "ANTONIO MARCOS PAULINO",
            ano: "5º Ano",
            avaliacao: "CNCA 2025",
            componente: "Língua Portuguesa",
            turma: "5A",
            mediaCicloI: 74.8,
            mediaCicloII: 71.2,
            mediaCicloIII: 77.5,
            mediaGeral: 74.5
        },
        {
            escola: "ANTONIO MARCOS PAULINO",
            ano: "5º Ano",
            avaliacao: "CNCA 2025",
            componente: "Matemática",
            turma: "5A",
            mediaCicloI: 68.5,
            mediaCicloII: 65.3,
            mediaCicloIII: 71.8,
            mediaGeral: 68.5
        },
        {
            escola: "ANTONIO MARCOS PAULINO",
            ano: "9º Ano",
            avaliacao: "AVALIE CE 2025",
            componente: "Língua Portuguesa",
            turma: "9A",
            mediaCicloI: 60.3,
            mediaCicloII: 64.1,
            mediaCicloIII: 68.5,
            mediaGeral: 64.3
        },
        {
            escola: "ANTONIO MARCOS PAULINO",
            ano: "9º Ano",
            avaliacao: "AVALIE CE 2025",
            componente: "Matemática",
            turma: "9A",
            mediaCicloI: 54.2,
            mediaCicloII: 58.1,
            mediaCicloIII: 63.4,
            mediaGeral: 58.6
        },
        // Mais dados para completar o dataset...
        {
            escola: "DOMINGOS FERREIRA LIMA",
            ano: "5º Ano",
            avaliacao: "CNCA 2025",
            componente: "Língua Portuguesa",
            turma: "5A",
            mediaCicloI: 69.2,
            mediaCicloII: 66.8,
            mediaCicloIII: 72.1,
            mediaGeral: 69.4
        },
        {
            escola: "DOMINGOS FERREIRA LIMA",
            ano: "5º Ano",
            avaliacao: "CNCA 2025",
            componente: "Matemática",
            turma: "5A",
            mediaCicloI: 63.1,
            mediaCicloII: 60.5,
            mediaCicloIII: 66.8,
            mediaGeral: 63.5
        }
    ],

    // Dados de evolução temporal
    evolucaoTemporal: [
        { ciclo: "Ciclo I", escola: "03 DE DEZEMBRO", mediaGeral: 68.9 },
        { ciclo: "Ciclo II", escola: "03 DE DEZEMBRO", mediaGeral: 65.4 },
        { ciclo: "Ciclo III", escola: "03 DE DEZEMBRO", mediaGeral: 72.3 },
        { ciclo: "Ciclo I", escola: "ANTONIO MARCOS PAULINO", mediaGeral: 71.5 },
        { ciclo: "Ciclo II", escola: "ANTONIO MARCOS PAULINO", mediaGeral: 68.2 },
        { ciclo: "Ciclo III", escola: "ANTONIO MARCOS PAULINO", mediaGeral: 74.8 }
    ]
};

// Funções de filtro e análise
class DashboardCiclos {
    constructor() {
        this.filtros = {
            escola: "03 DE DEZEMBRO",
            ano: "5º Ano",
            avaliacao: "CNCA 2025",
            componente: null,
            turma: null
        };
        this.dados = dadosCiclos;
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
        const dadosEvolucao = this.dados.evolucaoTemporal.filter(item => {
            return !this.filtros.escola || item.escola === this.filtros.escola;
        });

        this.criarGraficoLinha(dadosEvolucao);
    }

    criarGraficoComparativo(dados) {
        const ctx = document.getElementById('grafico-comparativo');
        if (!ctx) return;

        // Destruir gráfico existente se houver
        if (this.chartComparativo) {
            this.chartComparativo.destroy();
        }

        const labels = dados.map(item => `${item.turma} - ${item.componente}`);
        
        this.chartComparativo = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Ciclo I',
                        data: dados.map(item => parseFloat(item.mediaCicloI)),
                        backgroundColor: 'rgba(54, 162, 235, 0.8)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Ciclo II',
                        data: dados.map(item => parseFloat(item.mediaCicloII)),
                        backgroundColor: 'rgba(255, 99, 132, 0.8)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Ciclo III',
                        data: dados.map(item => parseFloat(item.mediaCicloIII)),
                        backgroundColor: 'rgba(75, 192, 192, 0.8)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Comparativo entre Ciclos',
                        font: { size: 16, weight: 'bold' }
                    },
                    legend: {
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        title: {
                            display: true,
                            text: 'Média (%)'
                        }
                    }
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

        // Agrupar por escola
        const escolasUnicas = [...new Set(dados.map(item => item.escola))];
        const datasets = escolasUnicas.map((escola, index) => {
            const dadosEscola = dados.filter(item => item.escola === escola);
            const cores = [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 205, 86, 1)',
                'rgba(75, 192, 192, 1)'
            ];
            
            return {
                label: escola,
                data: this.dados.ciclos.map(ciclo => {
                    const item = dadosEscola.find(d => d.ciclo === ciclo);
                    return item ? item.mediaGeral : 0;
                }),
                borderColor: cores[index % cores.length],
                backgroundColor: cores[index % cores.length].replace('1)', '0.1)'),
                tension: 0.1
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
                plugins: {
                    title: {
                        display: true,
                        text: 'Evolução por Ciclo',
                        font: { size: 16, weight: 'bold' }
                    },
                    legend: {
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        title: {
                            display: true,
                            text: 'Média Geral (%)'
                        }
                    }
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
            escola: "03 DE DEZEMBRO",
            ano: "5º Ano",
            avaliacao: "CNCA 2025",
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