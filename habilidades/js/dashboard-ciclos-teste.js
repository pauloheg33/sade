// Dashboard de Ciclos - Versão Simplificada para Teste
console.log('📊 Carregando Dashboard de Ciclos...');

class DashboardCiclos {
    constructor() {
        console.log('🚀 Inicializando DashboardCiclos...');
        
        // Dados básicos para teste
        this.dados = [
            {
                escola: "03 DE DEZEMBRO",
                ano: "5º",
                componente: "Língua Portuguesa", 
                ciclo1: 69.56,
                ciclo2: 72.0,
                ciclo3: 74.6
            },
            {
                escola: "ANTÔNIO DE SOUSA",
                ano: "5º", 
                componente: "Língua Portuguesa",
                ciclo1: 69.4,
                ciclo2: 71.2,
                ciclo3: 73.8
            },
            {
                escola: "FIRMINO JOSÉ",
                ano: "5º",
                componente: "Língua Portuguesa", 
                ciclo1: 64.6,
                ciclo2: 66.8,
                ciclo3: 69.2
            }
        ];
        
        this.init();
    }
    
    init() {
        console.log('🎯 Iniciando dashboard...');
        
        try {
            this.setupFilters();
            this.updateMetrics();
            this.createCharts();
            console.log('✅ Dashboard carregado com sucesso!');
        } catch (error) {
            console.error('❌ Erro ao carregar dashboard:', error);
        }
    }
    
    setupFilters() {
        console.log('🔧 Configurando filtros...');
        
        // Popular filtros básicos
        const escolas = [...new Set(this.dados.map(d => d.escola))];
        const anos = [...new Set(this.dados.map(d => d.ano))];
        const componentes = [...new Set(this.dados.map(d => d.componente))];
        
        this.populateSelect('filtroEscola', escolas);
        this.populateSelect('filtroAno', anos);
        this.populateSelect('filtroComponente', componentes);
        
        // Event listeners
        document.getElementById('resetarFiltros')?.addEventListener('click', () => {
            this.resetFilters();
        });
    }
    
    populateSelect(id, options) {
        const select = document.getElementById(id);
        if (select) {
            options.forEach(option => {
                const opt = document.createElement('option');
                opt.value = option;
                opt.textContent = option;
                select.appendChild(opt);
            });
        }
    }
    
    updateMetrics() {
        console.log('📊 Atualizando métricas...');
        
        // Calcular médias
        const medias = this.dados.map(d => (d.ciclo1 + d.ciclo2 + d.ciclo3) / 3);
        const mediaGeral = medias.reduce((a, b) => a + b, 0) / medias.length;
        
        // Atualizar elementos
        const mediaElement = document.getElementById('mediaGeral');
        const totalElement = document.getElementById('totalAlunos');
        
        if (mediaElement) {
            mediaElement.textContent = mediaGeral.toFixed(1) + '%';
        }
        
        if (totalElement) {
            totalElement.textContent = this.dados.length + ' registros';
        }
    }
    
    createCharts() {
        console.log('📈 Criando gráficos...');
        
        this.createResumoChart();
        this.createEvolucaoChart();
        this.createSmallMultiples();
    }
    
    createResumoChart() {
        const ctx = document.getElementById('resumoChart');
        if (!ctx) {
            console.warn('⚠️ Canvas resumoChart não encontrado');
            return;
        }
        
        const escolas = [...new Set(this.dados.map(d => d.escola))];
        const medias = escolas.map(escola => {
            const dadosEscola = this.dados.filter(d => d.escola === escola);
            const media = dadosEscola.reduce((acc, d) => acc + (d.ciclo1 + d.ciclo2 + d.ciclo3) / 3, 0) / dadosEscola.length;
            return media;
        });
        
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: escolas.map(e => e.substring(0, 12)),
                datasets: [{
                    label: 'Média por Escola',
                    data: medias.map(m => Math.round(m * 10) / 10),
                    backgroundColor: 'rgba(46, 134, 193, 0.8)',
                    borderColor: 'rgba(46, 134, 193, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Resumo por Escola'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                },
                // Animation para mostrar valores nas barras
                animation: {
                    onComplete: function() {
                        const chartInstance = this;
                        const ctx = chartInstance.ctx;
                        
                        ctx.font = Chart.helpers.fontString(12, 'bold', Chart.defaults.font.family);
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'bottom';
                        ctx.fillStyle = '#000';
                        
                        this.data.datasets.forEach((dataset, i) => {
                            const meta = chartInstance.getDatasetMeta(i);
                            meta.data.forEach((bar, index) => {
                                const data = Math.round(dataset.data[index] * 10) / 10;
                                if (data > 0) {
                                    ctx.fillText(data, bar.x, bar.y - 5);
                                }
                            });
                        });
                    }
                }
            }
        });
    }
    
    createEvolucaoChart() {
        const ctx = document.getElementById('evolucaoChart');
        if (!ctx) {
            console.warn('⚠️ Canvas evolucaoChart não encontrado');
            return;
        }
        
        // Calcular médias por ciclo
        const mediaCiclo1 = this.dados.reduce((acc, d) => acc + d.ciclo1, 0) / this.dados.length;
        const mediaCiclo2 = this.dados.reduce((acc, d) => acc + d.ciclo2, 0) / this.dados.length;
        const mediaCiclo3 = this.dados.reduce((acc, d) => acc + d.ciclo3, 0) / this.dados.length;
        
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Ciclo I', 'Ciclo II', 'Ciclo III'],
                datasets: [{
                    label: 'Evolução Geral',
                    data: [mediaCiclo1, mediaCiclo2, mediaCiclo3],
                    borderColor: 'rgba(243, 156, 18, 1)',
                    backgroundColor: 'rgba(243, 156, 18, 0.2)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Evolução por Ciclo'
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
    
    createSmallMultiples() {
        console.log('🔢 Criando small multiples...');
        
        const container = document.getElementById('smallMultiplesContainer');
        if (!container) {
            console.warn('⚠️ Container smallMultiplesContainer não encontrado');
            return;
        }
        
        // Limpar container
        container.innerHTML = '';
        
        // Agrupar dados por componente para criar um gráfico por matéria
        const componentes = [...new Set(this.dados.map(d => d.componente))];
        
        componentes.forEach((componente, index) => {
            const dadosComponente = this.dados.filter(d => d.componente === componente);
            
            // Criar div do gráfico
            const chartDiv = document.createElement('div');
            chartDiv.className = 'small-multiple-chart';
            chartDiv.innerHTML = `
                <div class="chart-title">${componente}</div>
                <canvas id="chart_${index}" width="400" height="300"></canvas>
            `;
            container.appendChild(chartDiv);
            
            // Preparar dados para o gráfico de barras
            const escolas = dadosComponente.map(d => d.escola.replace(/\s+/g, ' ').substring(0, 15));
            const ciclo1Data = dadosComponente.map(d => Math.round(d.ciclo1));
            const ciclo2Data = dadosComponente.map(d => Math.round(d.ciclo2));
            const ciclo3Data = dadosComponente.map(d => Math.round(d.ciclo3));
            
            // Criar gráfico
            const ctx = document.getElementById(`chart_${index}`);
            
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: escolas,
                    datasets: [
                        {
                            label: 'Ciclo I',
                            data: ciclo1Data,
                            backgroundColor: '#3498DB',
                            borderColor: '#2980B9',
                            borderWidth: 1
                        },
                        {
                            label: 'Ciclo II',
                            data: ciclo2Data,
                            backgroundColor: '#E74C3C',
                            borderColor: '#C0392B',
                            borderWidth: 1
                        },
                        {
                            label: 'Ciclo III',
                            data: ciclo3Data,
                            backgroundColor: '#F39C12',
                            borderColor: '#E67E22',
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: true,
                            position: 'top',
                            labels: {
                                font: {
                                    size: 11
                                }
                            }
                        },
                        // Plugin para mostrar valores em cima das barras
                        datalabels: {
                            display: true,
                            color: 'black',
                            font: {
                                weight: 'bold',
                                size: 11
                            },
                            formatter: function(value) {
                                return value;
                            },
                            anchor: 'end',
                            align: 'top'
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
                                color: 'rgba(0,0,0,0.1)'
                            }
                        },
                        x: {
                            ticks: {
                                font: {
                                    size: 9
                                },
                                maxRotation: 45
                            },
                            grid: {
                                display: false
                            }
                        }
                    },
                    // Callback personalizado para mostrar valores nas barras
                    onHover: (event, activeElements) => {
                        event.native.target.style.cursor = activeElements.length > 0 ? 'pointer' : 'default';
                    },
                    // Animation para mostrar valores
                    animation: {
                        onComplete: function() {
                            const chartInstance = this;
                            const ctx = chartInstance.ctx;
                            
                            ctx.font = Chart.helpers.fontString(11, 'bold', Chart.defaults.font.family);
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'bottom';
                            ctx.fillStyle = '#000';
                            
                            this.data.datasets.forEach((dataset, i) => {
                                const meta = chartInstance.getDatasetMeta(i);
                                meta.data.forEach((bar, index) => {
                                    const data = dataset.data[index];
                                    if (data > 0) {
                                        ctx.fillText(data, bar.x, bar.y - 5);
                                    }
                                });
                            });
                        }
                    }
                }
            });
        });
    }
    
    getColor(index) {
        const colors = [
            '#E74C3C', // Vermelho
            '#3498DB', // Azul  
            '#2ECC71', // Verde
            '#F39C12', // Laranja
            '#9B59B6', // Roxo
            '#1ABC9C'  // Turquesa
        ];
        return colors[index % colors.length];
    }
    
    resetFilters() {
        console.log('🔄 Resetando filtros...');
        
        document.getElementById('filtroEscola').value = '';
        document.getElementById('filtroAno').value = '';
        document.getElementById('filtroComponente').value = '';
        document.getElementById('filtroTurma').value = '';
        document.getElementById('filtroAvaliacao').value = '';
        
        this.updateMetrics();
        this.createCharts();
    }
}

console.log('📝 Classe DashboardCiclos definida');

// Tornar disponível globalmente
window.DashboardCiclos = DashboardCiclos;