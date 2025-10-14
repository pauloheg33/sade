// Dashboard de Ciclos - Dados YAML e Interface Moderna
console.log('📊 Carregando Dashboard de Ciclos com dados YAML...');

// Dados reais do YAML fornecido
const dadosYAML = [
    // CNCA 2025 - 5º Ano
    {
        avaliacao: "CNCA 2025",
        escola: "03 DE DEZEMBRO",
        turma: "Turma A",
        ano: "5º Ano",
        componente: "Língua Portuguesa",
        ciclo1: 69.56,
        ciclo2: 72.0,
        ciclo3: 74.6
    },
    {
        avaliacao: "CNCA 2025",
        escola: "03 DE DEZEMBRO",
        turma: "Turma A",
        ano: "5º Ano",
        componente: "Matemática",
        ciclo1: 71.23,
        ciclo2: 70.1,
        ciclo3: 72.7
    },
    {
        avaliacao: "CNCA 2025",
        escola: "ANTÔNIO DE SOUSA BARROS",
        turma: "Turma A",
        ano: "5º Ano",
        componente: "Língua Portuguesa",
        ciclo1: 69.4,
        ciclo2: 71.2,
        ciclo3: 73.5
    },
    {
        avaliacao: "CNCA 2025",
        escola: "ANTÔNIO DE SOUSA BARROS",
        turma: "Turma A",
        ano: "5º Ano",
        componente: "Matemática",
        ciclo1: 62.8,
        ciclo2: 63.9,
        ciclo3: 66.2
    },
    {
        avaliacao: "CNCA 2025",
        escola: "FIRMINO JOSÉ",
        turma: "Turma A",
        ano: "5º Ano",
        componente: "Língua Portuguesa",
        ciclo1: 76.1,
        ciclo2: 78.3,
        ciclo3: 74.5
    },
    {
        avaliacao: "CNCA 2025",
        escola: "FIRMINO JOSÉ",
        turma: "Turma A",
        ano: "5º Ano",
        componente: "Matemática",
        ciclo1: 77.2,
        ciclo2: 79.6,
        ciclo3: 78.25
    },
    {
        avaliacao: "CNCA 2025",
        escola: "FIRMINO JOSÉ",
        turma: "Turma B",
        ano: "5º Ano",
        componente: "Língua Portuguesa",
        ciclo1: 76.8,
        ciclo2: 79.0,
        ciclo3: 77.56
    },
    {
        avaliacao: "CNCA 2025",
        escola: "FIRMINO JOSÉ",
        turma: "Turma B",
        ano: "5º Ano",
        componente: "Matemática",
        ciclo1: 78.1,
        ciclo2: 80.9,
        ciclo3: 79.93
    },
    {
        avaliacao: "CNCA 2025",
        escola: "JOAQUIM FERREIRA",
        turma: "Turma A",
        ano: "5º Ano",
        componente: "Língua Portuguesa",
        ciclo1: 54.7,
        ciclo2: 56.0,
        ciclo3: 51.22
    },
    {
        avaliacao: "CNCA 2025",
        escola: "JOAQUIM FERREIRA",
        turma: "Turma A",
        ano: "5º Ano",
        componente: "Matemática",
        ciclo1: 56.5,
        ciclo2: 58.1,
        ciclo3: 52.58
    },
    {
        avaliacao: "CNCA 2025",
        escola: "JOSÉ ALVES",
        turma: "Turma A",
        ano: "5º Ano",
        componente: "Língua Portuguesa",
        ciclo1: 62.3,
        ciclo2: 64.2,
        ciclo3: 63.54
    },
    {
        avaliacao: "CNCA 2025",
        escola: "JOSÉ ALVES",
        turma: "Turma A",
        ano: "5º Ano",
        componente: "Matemática",
        ciclo1: 63.1,
        ciclo2: 64.4,
        ciclo3: 62.52
    },
    {
        avaliacao: "CNCA 2025",
        escola: "JOSÉ ALVES",
        turma: "Turma B",
        ano: "5º Ano",
        componente: "Língua Portuguesa",
        ciclo1: 63.6,
        ciclo2: 65.1,
        ciclo3: 64.45
    },
    {
        avaliacao: "CNCA 2025",
        escola: "JOSÉ ALVES",
        turma: "Turma B",
        ano: "5º Ano",
        componente: "Matemática",
        ciclo1: 65.2,
        ciclo2: 68.3,
        ciclo3: 67.77
    },
    {
        avaliacao: "CNCA 2025",
        escola: "MARIA AMÉLIA",
        turma: "Turma A",
        ano: "5º Ano",
        componente: "Língua Portuguesa",
        ciclo1: 67.4,
        ciclo2: 69.8,
        ciclo3: 71.9
    },
    {
        avaliacao: "CNCA 2025",
        escola: "MARIA AMÉLIA",
        turma: "Turma A",
        ano: "5º Ano",
        componente: "Matemática",
        ciclo1: 69.0,
        ciclo2: 71.3,
        ciclo3: 70.01
    },
    {
        avaliacao: "CNCA 2025",
        escola: "MOURÃO LIMA",
        turma: "Turma A",
        ano: "5º Ano",
        componente: "Língua Portuguesa",
        ciclo1: 63.9,
        ciclo2: 65.6,
        ciclo3: 68.2
    },
    {
        avaliacao: "CNCA 2025",
        escola: "MOURÃO LIMA",
        turma: "Turma A",
        ano: "5º Ano",
        componente: "Matemática",
        ciclo1: 66.1,
        ciclo2: 68.9,
        ciclo3: 71.4
    },
    {
        avaliacao: "CNCA 2025",
        escola: "MOURÃO LIMA",
        turma: "Turma B",
        ano: "5º Ano",
        componente: "Língua Portuguesa",
        ciclo1: 70.1,
        ciclo2: 72.8,
        ciclo3: 75.6
    },
    {
        avaliacao: "CNCA 2025",
        escola: "MOURÃO LIMA",
        turma: "Turma B",
        ano: "5º Ano",
        componente: "Matemática",
        ciclo1: 71.0,
        ciclo2: 73.7,
        ciclo3: 76.4
    },
    // PROEA 2025 - 9º Ano
    {
        avaliacao: "PROEA 2025",
        escola: "03 DE DEZEMBRO",
        turma: "Turma A",
        ano: "9º Ano",
        componente: "Ciências da Natureza",
        ciclo1: 73.4,
        ciclo2: 76.5,
        ciclo3: 78.8
    },
    {
        avaliacao: "PROEA 2025",
        escola: "03 DE DEZEMBRO",
        turma: "Turma A",
        ano: "9º Ano",
        componente: "Língua Portuguesa",
        ciclo1: 74.1,
        ciclo2: 76.9,
        ciclo3: 79.5
    },
    {
        avaliacao: "PROEA 2025",
        escola: "03 DE DEZEMBRO",
        turma: "Turma A",
        ano: "9º Ano",
        componente: "Matemática",
        ciclo1: 73.2,
        ciclo2: 75.8,
        ciclo3: 78.1
    },
    {
        avaliacao: "PROEA 2025",
        escola: "ANTÔNIO DE SOUSA BARROS",
        turma: "Turma A",
        ano: "9º Ano",
        componente: "Ciências da Natureza",
        ciclo1: 56.8,
        ciclo2: 59.3,
        ciclo3: 61.5
    },
    {
        avaliacao: "PROEA 2025",
        escola: "ANTÔNIO DE SOUSA BARROS",
        turma: "Turma A",
        ano: "9º Ano",
        componente: "Língua Portuguesa",
        ciclo1: 61.2,
        ciclo2: 63.5,
        ciclo3: 65.8
    },
    {
        avaliacao: "PROEA 2025",
        escola: "ANTÔNIO DE SOUSA BARROS",
        turma: "Turma A",
        ano: "9º Ano",
        componente: "Matemática",
        ciclo1: 58.4,
        ciclo2: 60.7,
        ciclo3: 59.45
    },
    {
        avaliacao: "PROEA 2025",
        escola: "FIRMINO JOSÉ",
        turma: "Turma A",
        ano: "9º Ano",
        componente: "Ciências da Natureza",
        ciclo1: 60.8,
        ciclo2: 63.2,
        ciclo3: 65.9
    },
    {
        avaliacao: "PROEA 2025",
        escola: "FIRMINO JOSÉ",
        turma: "Turma A",
        ano: "9º Ano",
        componente: "Língua Portuguesa",
        ciclo1: 62.5,
        ciclo2: 64.4,
        ciclo3: 63.78
    },
    {
        avaliacao: "PROEA 2025",
        escola: "FIRMINO JOSÉ",
        turma: "Turma A",
        ano: "9º Ano",
        componente: "Matemática",
        ciclo1: 59.7,
        ciclo2: 62.0,
        ciclo3: 60.21
    },
    {
        avaliacao: "PROEA 2025",
        escola: "FIRMINO JOSÉ",
        turma: "Turma B",
        ano: "9º Ano",
        componente: "Ciências da Natureza",
        ciclo1: 62.3,
        ciclo2: 65.5,
        ciclo3: 60.15
    },
    {
        avaliacao: "PROEA 2025",
        escola: "FIRMINO JOSÉ",
        turma: "Turma B",
        ano: "9º Ano",
        componente: "Língua Portuguesa",
        ciclo1: 60.9,
        ciclo2: 62.1,
        ciclo3: 64.4
    },
    {
        avaliacao: "PROEA 2025",
        escola: "FIRMINO JOSÉ",
        turma: "Turma B",
        ano: "9º Ano",
        componente: "Matemática",
        ciclo1: 59.8,
        ciclo2: 61.8,
        ciclo3: 60.89
    },
    {
        avaliacao: "PROEA 2025",
        escola: "JOSÉ ALVES",
        turma: "Turma A",
        ano: "9º Ano",
        componente: "Ciências da Natureza",
        ciclo1: 60.1,
        ciclo2: 62.3,
        ciclo3: 60.74
    },
    {
        avaliacao: "PROEA 2025",
        escola: "JOSÉ ALVES",
        turma: "Turma A",
        ano: "9º Ano",
        componente: "Língua Portuguesa",
        ciclo1: 63.2,
        ciclo2: 65.4,
        ciclo3: 64.16
    },
    {
        avaliacao: "PROEA 2025",
        escola: "JOSÉ ALVES",
        turma: "Turma A",
        ano: "9º Ano",
        componente: "Matemática",
        ciclo1: 64.6,
        ciclo2: 67.0,
        ciclo3: 69.3
    },
    {
        avaliacao: "PROEA 2025",
        escola: "21 DE DEZEMBRO",
        turma: "Turma A",
        ano: "9º Ano",
        componente: "Ciências da Natureza",
        ciclo1: 67.1,
        ciclo2: 68.5,
        ciclo3: 69.2
    },
    {
        avaliacao: "PROEA 2025",
        escola: "21 DE DEZEMBRO",
        turma: "Turma A",
        ano: "9º Ano",
        componente: "Língua Portuguesa",
        ciclo1: 66.8,
        ciclo2: 68.5,
        ciclo3: 69.8
    },
    {
        avaliacao: "PROEA 2025",
        escola: "21 DE DEZEMBRO",
        turma: "Turma A",
        ano: "9º Ano",
        componente: "Matemática",
        ciclo1: 59.3,
        ciclo2: 60.2,
        ciclo3: 63.79
    },
    {
        avaliacao: "PROEA 2025",
        escola: "21 DE DEZEMBRO",
        turma: "Turma B",
        ano: "9º Ano",
        componente: "Ciências da Natureza",
        ciclo1: 65.6,
        ciclo2: 66.3,
        ciclo3: 62.54
    },
    {
        avaliacao: "PROEA 2025",
        escola: "21 DE DEZEMBRO",
        turma: "Turma B",
        ano: "9º Ano",
        componente: "Língua Portuguesa",
        ciclo1: 64.8,
        ciclo2: 66.1,
        ciclo3: 63.99
    },
    {
        avaliacao: "PROEA 2025",
        escola: "21 DE DEZEMBRO",
        turma: "Turma B",
        ano: "9º Ano",
        componente: "Matemática",
        ciclo1: 65.9,
        ciclo2: 66.8,
        ciclo3: 61.94
    },
    {
        avaliacao: "PROEA 2025",
        escola: "21 DE DEZEMBRO",
        turma: "Turma C",
        ano: "9º Ano",
        componente: "Ciências da Natureza",
        ciclo1: 65.7,
        ciclo2: 67.0,
        ciclo3: 68.3
    },
    {
        avaliacao: "PROEA 2025",
        escola: "21 DE DEZEMBRO",
        turma: "Turma C",
        ano: "9º Ano",
        componente: "Língua Portuguesa",
        ciclo1: 67.1,
        ciclo2: 67.7,
        ciclo3: 68.4
    },
    {
        avaliacao: "PROEA 2025",
        escola: "21 DE DEZEMBRO",
        turma: "Turma C",
        ano: "9º Ano",
        componente: "Matemática",
        ciclo1: 64.1,
        ciclo2: 64.8,
        ciclo3: 65.7
    }
];

class DashboardCiclos {
    constructor() {
        console.log('🚀 Inicializando Dashboard de Ciclos com novo layout...');
        
        this.dados = dadosYAML;
        this.dadosFiltrados = [...this.dados];
        
        // Configurações de cores
        this.cores = {
            ciclo1: '#42A5F5',
            ciclo2: '#66BB6A', 
            ciclo3: '#FFA726'
        };
        
        this.init();
    }
    
    init() {
        console.log('🎯 Iniciando dashboard...');
        
        try {
            this.isInitializing = true;
            this.setupFilters();
            this.updateMetrics();
            
            // Aguardar que o DOM esteja completamente renderizado
            setTimeout(() => {
                this.createCharts();
                this.isInitializing = false;
                console.log('✅ Dashboard carregado com sucesso!');
            }, 500);
            
        } catch (error) {
            console.error('❌ Erro ao carregar dashboard:', error);
            this.isInitializing = false;
        }
    }
    
    setupFilters() {
        console.log('🔧 Configurando filtros...');
        
        // Extrair valores únicos para os filtros
        const escolas = [...new Set(this.dados.map(d => d.escola))].sort();
        const anos = [...new Set(this.dados.map(d => d.ano))].sort();
        const componentes = [...new Set(this.dados.map(d => d.componente))].sort();
        const turmas = [...new Set(this.dados.map(d => d.turma))].sort();
        const avaliacoes = [...new Set(this.dados.map(d => d.avaliacao))].sort();
        
        // Popular os selects
        this.populateSelect('filtroEscola', escolas);
        this.populateSelect('filtroAno', anos);
        this.populateSelect('filtroComponente', componentes);
        this.populateSelect('filtroTurma', turmas);
        this.populateSelect('filtroAvaliacao', avaliacoes);
        
        // Definir valores padrão
        document.getElementById('filtroEscola').value = 'FIRMINO JOSÉ';
        document.getElementById('filtroAvaliacao').value = 'CNCA 2025';
        
        // Event listeners para filtros
        ['filtroEscola', 'filtroAno', 'filtroComponente', 'filtroTurma', 'filtroAvaliacao'].forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('change', () => {
                    if (!this.isInitializing) {
                        this.applyFilters();
                    }
                });
            }
        });
        
        // Aplicar filtros iniciais sem recriação de gráficos
        this.dadosFiltrados = [...this.dados];
        const escola = document.getElementById('filtroEscola').value || 'FIRMINO JOSÉ';
        const avaliacao = document.getElementById('filtroAvaliacao').value || 'CNCA 2025';
        
        this.dadosFiltrados = this.dados.filter(d => {
            return (!escola || d.escola === escola) &&
                   (!avaliacao || d.avaliacao === avaliacao);
        });
    }
    
    populateSelect(id, options) {
        const select = document.getElementById(id);
        if (select) {
            // Manter primeira opção (Todos)
            const firstOption = select.querySelector('option');
            select.innerHTML = '';
            if (firstOption) {
                select.appendChild(firstOption);
            }
            
            options.forEach(option => {
                const opt = document.createElement('option');
                opt.value = option;
                opt.textContent = option;
                select.appendChild(opt);
            });
        }
    }
    
    applyFilters() {
        // Prevenir execução durante inicialização
        if (this.isInitializing) {
            return;
        }
        
        const escola = document.getElementById('filtroEscola').value;
        const ano = document.getElementById('filtroAno').value;
        const componente = document.getElementById('filtroComponente').value;
        const turma = document.getElementById('filtroTurma').value;
        const avaliacao = document.getElementById('filtroAvaliacao').value;
        
        this.dadosFiltrados = this.dados.filter(d => {
            return (!escola || d.escola === escola) &&
                   (!ano || d.ano === ano) &&
                   (!componente || d.componente === componente) &&
                   (!turma || d.turma === turma) &&
                   (!avaliacao || d.avaliacao === avaliacao);
        });
        
        console.log(`Filtros aplicados: ${this.dadosFiltrados.length} registros`);
        
        // Pequeno delay para evitar múltiplas recriações
        if (this.updateTimeout) {
            clearTimeout(this.updateTimeout);
        }
        
        this.updateTimeout = setTimeout(() => {
            this.updateMetrics();
            this.createCharts();
        }, 300);
    }
    
    updateMetrics() {
        console.log('📊 Atualizando métricas...');
        
        if (this.dadosFiltrados.length === 0) {
            document.getElementById('mediaGeral').textContent = '0,00';
            return;
        }
        
        // Calcular média geral
        const totalPontos = this.dadosFiltrados.reduce((acc, d) => {
            return acc + d.ciclo1 + d.ciclo2 + d.ciclo3;
        }, 0);
        
        const mediaGeral = totalPontos / (this.dadosFiltrados.length * 3);
        document.getElementById('mediaGeral').textContent = mediaGeral.toFixed(2).replace('.', ',');
    }
    
    createCharts() {
        console.log('📈 Criando gráficos...');
        
        this.createEvolutionChart();
        this.createComponentCharts();
    }
    
    createEvolutionChart() {
        const ctx = document.getElementById('evolutionChart');
        if (!ctx) {
            console.warn('Canvas evolutionChart não encontrado');
            return;
        }
        
        // Destruir gráfico existente
        if (this.evolutionChart && typeof this.evolutionChart.destroy === 'function') {
            try {
                this.evolutionChart.destroy();
            } catch(e) {
                console.warn('Erro ao destruir gráfico anterior:', e);
            }
        }
        
        // Calcular médias por ciclo para a escola selecionada
        const escola = document.getElementById('filtroEscola').value || 'FIRMINO JOSÉ';
        const dadosEscola = this.dadosFiltrados.filter(d => d.escola === escola);
        
        if (dadosEscola.length === 0) {
            console.warn('Nenhum dado encontrado para a escola:', escola);
            return;
        }
        
        const mediaCiclo1 = dadosEscola.reduce((acc, d) => acc + d.ciclo1, 0) / dadosEscola.length;
        const mediaCiclo2 = dadosEscola.reduce((acc, d) => acc + d.ciclo2, 0) / dadosEscola.length;
        const mediaCiclo3 = dadosEscola.reduce((acc, d) => acc + d.ciclo3, 0) / dadosEscola.length;
        
        try {
            this.evolutionChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Ciclo I', 'Ciclo II', 'Ciclo III'],
                    datasets: [{
                        label: escola,
                        data: [mediaCiclo1, mediaCiclo2, mediaCiclo3],
                        borderColor: '#2196F3',
                        backgroundColor: 'rgba(33, 150, 243, 0.1)',
                        tension: 0.4,
                        fill: true,
                        pointBackgroundColor: '#2196F3',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        pointRadius: 5
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    animation: {
                        duration: 1000
                    },
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: false,
                            min: Math.min(mediaCiclo1, mediaCiclo2, mediaCiclo3) - 5,
                            max: Math.max(mediaCiclo1, mediaCiclo2, mediaCiclo3) + 5,
                            ticks: {
                                font: {
                                    size: 10
                                }
                            },
                            grid: {
                                color: 'rgba(0, 0, 0, 0.1)'
                            }
                        },
                        x: {
                            ticks: {
                                font: {
                                    size: 9
                                }
                            },
                            grid: {
                                display: false
                            }
                        }
                    }
                }
            });
            
            // Não adicionar valores automaticamente para evitar loops
            
        } catch(error) {
            console.error('Erro ao criar gráfico de evolução:', error);
        }
    }
    
    addValuesToEvolutionChart() {
        if (!this.evolutionChart || !this.evolutionChart.ctx) return;
        
        const chart = this.evolutionChart;
        const ctx = chart.ctx;
        
        ctx.save();
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.fillStyle = '#1A1A1A';
        
        chart.data.datasets.forEach((dataset, i) => {
            const meta = chart.getDatasetMeta(i);
            if (meta && meta.data) {
                meta.data.forEach((point, index) => {
                    const value = dataset.data[index].toFixed(1);
                    ctx.fillText(value, point.x, point.y - 8);
                });
            }
        });
        
        ctx.restore();
    }
    
    createComponentCharts() {
        // Componentes para criar gráficos
        const componentesConfig = [
            { id: 'cienciasChart', componente: 'Ciências da Natureza' },
            { id: 'portuguesesChart', componente: 'Língua Portuguesa' },
            { id: 'matematicaChart', componente: 'Matemática' }
        ];
        
        componentesConfig.forEach(config => {
            this.createComponentChart(config.id, config.componente);
        });
    }
    
    createComponentChart(canvasId, componente) {
        const ctx = document.getElementById(canvasId);
        if (!ctx) {
            console.warn(`Canvas ${canvasId} não encontrado`);
            return;
        }
        
        // Destruir gráfico existente
        if (this[canvasId + 'Instance'] && typeof this[canvasId + 'Instance'].destroy === 'function') {
            try {
                this[canvasId + 'Instance'].destroy();
            } catch(e) {
                console.warn(`Erro ao destruir gráfico ${canvasId}:`, e);
            }
        }
        
        // Filtrar dados por componente
        const dadosComponente = this.dadosFiltrados.filter(d => d.componente === componente);
        
        if (dadosComponente.length === 0) {
            console.warn(`Nenhum dado encontrado para ${componente}`);
            // Criar gráfico vazio
            this.createEmptyChart(ctx, canvasId, componente);
            return;
        }
        
        // Agrupar por turma
        const turmas = [...new Set(dadosComponente.map(d => d.turma))].sort();
        
        const datasets = [
            {
                label: 'Ciclo I',
                data: turmas.map(turma => {
                    const dadosTurma = dadosComponente.filter(d => d.turma === turma);
                    return dadosTurma.reduce((acc, d) => acc + d.ciclo1, 0) / dadosTurma.length;
                }),
                backgroundColor: this.cores.ciclo1,
                borderColor: this.cores.ciclo1,
                borderWidth: 1
            },
            {
                label: 'Ciclo II',
                data: turmas.map(turma => {
                    const dadosTurma = dadosComponente.filter(d => d.turma === turma);
                    return dadosTurma.reduce((acc, d) => acc + d.ciclo2, 0) / dadosTurma.length;
                }),
                backgroundColor: this.cores.ciclo2,
                borderColor: this.cores.ciclo2,
                borderWidth: 1
            },
            {
                label: 'Ciclo III',
                data: turmas.map(turma => {
                    const dadosTurma = dadosComponente.filter(d => d.turma === turma);
                    return dadosTurma.reduce((acc, d) => acc + d.ciclo3, 0) / dadosTurma.length;
                }),
                backgroundColor: this.cores.ciclo3,
                borderColor: this.cores.ciclo3,
                borderWidth: 1
            }
        ];
        
        try {
            this[canvasId + 'Instance'] = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: turmas,
                    datasets: datasets
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    animation: {
                        duration: 1000
                    },
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100,
                            ticks: {
                                font: {
                                    size: 10
                                }
                            },
                            grid: {
                                color: 'rgba(0, 0, 0, 0.1)'
                            }
                        },
                        x: {
                            ticks: {
                                font: {
                                    size: 10
                                }
                            },
                            grid: {
                                display: false
                            }
                        }
                    }
                }
            });
            
            // Usar animation callback simples
            this[canvasId + 'Instance'].options.animation = {
                duration: 800,
                onComplete: () => {
                    this.addValuesToChart(this[canvasId + 'Instance']);
                }
            };
            
        } catch(error) {
            console.error(`Erro ao criar gráfico ${canvasId}:`, error);
        }
    }
    
    createEmptyChart(ctx, canvasId, componente) {
        try {
            this[canvasId + 'Instance'] = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Sem dados'],
                    datasets: [{
                        label: 'Sem dados',
                        data: [0],
                        backgroundColor: '#e0e0e0',
                        borderColor: '#ccc',
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
                            max: 100,
                            ticks: {
                                font: {
                                    size: 10
                                }
                            }
                        },
                        x: {
                            ticks: {
                                font: {
                                    size: 10
                                }
                            }
                        }
                    }
                }
            });
        } catch(error) {
            console.error(`Erro ao criar gráfico vazio para ${canvasId}:`, error);
        }
    }
    
    addValuesToChart(chart) {
        if (!chart || !chart.ctx) return;
        
        const ctx = chart.ctx;
        
        ctx.save();
        ctx.font = '11px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.fillStyle = '#1A1A1A';
        
        chart.data.datasets.forEach((dataset, i) => {
            const meta = chart.getDatasetMeta(i);
            if (meta && meta.data) {
                meta.data.forEach((bar, index) => {
                    const value = Math.round(dataset.data[index]);
                    if (value > 0) {
                        ctx.fillText(value, bar.x, bar.y - 5);
                    }
                });
            }
        });
        
        ctx.restore();
    }
}

console.log('📝 Classe DashboardCiclos definida');

// Tornar disponível globalmente
window.DashboardCiclos = DashboardCiclos;