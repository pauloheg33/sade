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
                labels: escolas,
                datasets: [{
                    label: 'Média por Escola',
                    data: medias,
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
        
        // Criar um gráfico para cada escola
        const escolas = [...new Set(this.dados.map(d => d.escola))];
        
        escolas.forEach((escola, index) => {
            const dadosEscola = this.dados.filter(d => d.escola === escola);
            
            // Criar div do gráfico
            const chartDiv = document.createElement('div');
            chartDiv.className = 'small-multiple-chart';
            chartDiv.innerHTML = `
                <div class="chart-title">${escola}</div>
                <canvas id="chart_${index}" width="400" height="300"></canvas>
            `;
            container.appendChild(chartDiv);
            
            // Criar gráfico
            const ctx = document.getElementById(`chart_${index}`);
            
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Ciclo I', 'Ciclo II', 'Ciclo III'],
                    datasets: dadosEscola.map((d, i) => ({
                        label: d.componente,
                        data: [d.ciclo1, d.ciclo2, d.ciclo3],
                        borderColor: this.getColor(i),
                        backgroundColor: this.getColor(i) + '20',
                        tension: 0.4
                    }))
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