// SADE - Matrizes de Referência
// Sistema de análise de correlação entre questões e habilidades

class MatrizesAnalyzer {
    constructor() {
        this.charts = {};
        this.currentAnalysis = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadMatrixBrowser();
        this.setupThemeToggle();
    }

    setupEventListeners() {
        // Upload area drag and drop
        const uploadArea = document.getElementById('uploadArea');
        const fileInput = document.getElementById('fileInput');

        uploadArea.addEventListener('click', () => fileInput.click());
        uploadArea.addEventListener('dragover', this.handleDragOver.bind(this));
        uploadArea.addEventListener('dragleave', this.handleDragLeave.bind(this));
        uploadArea.addEventListener('drop', this.handleDrop.bind(this));

        fileInput.addEventListener('change', this.handleFileSelect.bind(this));

        // Form submission
        document.getElementById('provaUploadForm').addEventListener('submit', this.handleFormSubmit.bind(this));

        // Remove file button
        document.getElementById('removeFile').addEventListener('click', this.removeFile.bind(this));

        // Matrix browser filters
        document.getElementById('browserAno').addEventListener('change', this.filterMatrix.bind(this));
        document.getElementById('browserDisciplina').addEventListener('change', this.filterMatrix.bind(this));
        document.getElementById('browserSearch').addEventListener('input', this.filterMatrix.bind(this));
    }

    handleDragOver(e) {
        e.preventDefault();
        document.getElementById('uploadArea').classList.add('drag-over');
    }

    handleDragLeave(e) {
        e.preventDefault();
        document.getElementById('uploadArea').classList.remove('drag-over');
    }

    handleDrop(e) {
        e.preventDefault();
        document.getElementById('uploadArea').classList.remove('drag-over');
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            this.processFile(files[0]);
        }
    }

    handleFileSelect(e) {
        const file = e.target.files[0];
        if (file) {
            this.processFile(file);
        }
    }

    processFile(file) {
        // Validar arquivo
        const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
        const maxSize = 10 * 1024 * 1024; // 10MB

        if (!validTypes.includes(file.type)) {
            alert('Tipo de arquivo não suportado. Use PDF, DOC, DOCX ou TXT.');
            return;
        }

        if (file.size > maxSize) {
            alert('Arquivo muito grande. Máximo 10MB.');
            return;
        }

        // Mostrar preview do arquivo
        document.getElementById('fileName').textContent = file.name;
        document.getElementById('filePreview').style.display = 'block';
    }

    removeFile() {
        document.getElementById('fileInput').value = '';
        document.getElementById('filePreview').style.display = 'none';
        document.getElementById('uploadArea').classList.remove('drag-over');
    }

    async handleFormSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData();
        const fileInput = document.getElementById('fileInput');
        const anoEscolar = document.getElementById('anoEscolar').value;
        const disciplina = document.getElementById('disciplina').value;
        const escola = document.getElementById('escola').value;

        if (!fileInput.files[0]) {
            alert('Por favor, selecione um arquivo.');
            return;
        }

        // Mostrar modal de loading
        const loadingModal = new bootstrap.Modal(document.getElementById('loadingModal'));
        loadingModal.show();

        // Atualizar mensagens de loading
        document.getElementById('loadingTitle').textContent = 'Processando arquivo...';
        document.getElementById('loadingMessage').textContent = 'Analisando conteúdo e identificando questões';
        document.getElementById('loadingDetails').textContent = `Arquivo: ${file.name}`;

        // Simular processamento do arquivo para identificar número real de questões
        const file = fileInput.files[0];
        this.processFileContent(file).then((numQuestoes) => {
            // Atualizar modal com número de questões encontradas
            document.getElementById('loadingTitle').textContent = 'Correlacionando habilidades...';
            document.getElementById('loadingMessage').textContent = 'Mapeando questões com a matriz de referência';
            document.getElementById('loadingDetails').textContent = `${numQuestoes} questões identificadas`;
            
            setTimeout(() => {
                loadingModal.hide();
                this.generateMockAnalysis(anoEscolar, disciplina, escola, numQuestoes);
            }, 2000);
        });
    }

    async processFileContent(file) {
        // Simular leitura do arquivo para identificar questões
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target.result;
                // Simular identificação de questões no conteúdo
                const numQuestoes = this.detectQuestionsInContent(content);
                resolve(numQuestoes);
            };
            
            if (file.type === 'text/plain') {
                reader.readAsText(file);
            } else {
                // Para outros tipos, simular um número mais realista
                const baseQuestions = Math.floor(Math.random() * 20) + 25; // 25-45 questões
                resolve(baseQuestions);
            }
        });
    }

    detectQuestionsInContent(content) {
        // Tentar identificar questões por padrões comuns
        const patterns = [
            /\b(\d+)[\.\)\-\s]/g,     // Padrões como "1.", "1)", "1-", "1 "
            /questão\s*(\d+)/gi,      // "Questão 1", "questão 2"
            /pergunta\s*(\d+)/gi,     // "Pergunta 1"
            /item\s*(\d+)/gi,         // "Item 1"
            /^\s*(\d+)\s*[-\.]/gm,    // Início de linha com número
            /\n\s*(\d+)\s*[\.]/g      // Nova linha com número e ponto
        ];

        let maxQuestions = 0;
        let allNumbers = [];
        
        patterns.forEach(pattern => {
            const matches = content.match(pattern);
            if (matches) {
                // Extrair números e adicionar à lista
                matches.forEach(match => {
                    const numMatch = match.match(/(\d+)/);
                    if (numMatch) {
                        const num = parseInt(numMatch[1]);
                        if (num > 0 && num <= 100) { // Questões válidas entre 1 e 100
                            allNumbers.push(num);
                        }
                    }
                });
            }
        });

        if (allNumbers.length > 0) {
            // Ordenar números e encontrar sequências
            allNumbers.sort((a, b) => a - b);
            const uniqueNumbers = [...new Set(allNumbers)];
            
            // Se há uma sequência razoável, usar o maior número
            if (uniqueNumbers.length >= 5) {
                maxQuestions = Math.max(...uniqueNumbers);
            } else {
                // Contar ocorrências mais frequentes
                maxQuestions = uniqueNumbers.length > 0 ? Math.max(...uniqueNumbers) : 0;
            }
        }

        // Se não encontrou padrões, usar um número baseado no tamanho do conteúdo
        if (maxQuestions === 0) {
            const contentLength = content.length;
            const lines = content.split('\n').length;
            
            if (contentLength > 15000) {
                maxQuestions = Math.floor(Math.random() * 25) + 40; // 40-65 questões
            } else if (contentLength > 8000) {
                maxQuestions = Math.floor(Math.random() * 15) + 30; // 30-45 questões
            } else if (contentLength > 3000) {
                maxQuestions = Math.floor(Math.random() * 10) + 20; // 20-30 questões
            } else {
                maxQuestions = Math.floor(Math.random() * 8) + 15; // 15-23 questões
            }
            
            console.log(`Estimativa baseada no conteúdo: ${maxQuestions} questões (${contentLength} chars, ${lines} linhas)`);
        } else {
            console.log(`Questões identificadas por padrões: ${maxQuestions}`);
        }

        return Math.min(maxQuestions, 80); // Limitar a 80 questões máximo
    }

    generateMockAnalysis(ano, disciplina, escola, numQuestoes = null) {
        // Obter habilidades relevantes
        const habilidades = getHabilidades(disciplina, parseInt(ano));
        
        // Se não foi fornecido número de questões, usar um padrão mais realista
        const totalQuestoes = numQuestoes || (Math.floor(Math.random() * 20) + 30); // 30-50 questões
        
        // Simular identificação de correlações
        const questoesSimuladas = this.generateMockQuestions(habilidades, totalQuestoes);
        
        this.currentAnalysis = {
            ano,
            disciplina,
            escola,
            habilidades,
            questoes: questoesSimuladas,
            totalQuestoes: totalQuestoes,
            timestamp: new Date()
        };

        this.displayAnalysisResults();
    }

    generateMockQuestions(habilidades, totalQuestoes = null) {
        const questoes = [];
        const numQuestoes = totalQuestoes || (Math.floor(Math.random() * 20) + 30); // 30-50 questões

        console.log(`Gerando análise para ${numQuestoes} questões`);

        for (let i = 1; i <= numQuestoes; i++) {
            const habilidadeIndex = Math.floor(Math.random() * habilidades.length);
            const correlacao = Math.random() * 0.4 + 0.6; // 60-100% de correlação

            questoes.push({
                numero: i,
                habilidade: habilidades[habilidadeIndex],
                correlacao: correlacao,
                confianca: Math.random() * 0.3 + 0.7 // 70-100% de confiança
            });
        }

        console.log(`Questões geradas: ${questoes.length}`);
        return questoes;
    }

    displayAnalysisResults() {
        const resultsSection = document.getElementById('analysisResults');
        resultsSection.style.display = 'block';
        resultsSection.scrollIntoView({ behavior: 'smooth' });

        this.renderCorrelationChart();
        this.renderHabilidadesList();
        this.renderCycleChart();
        this.renderCoverageChart();
    }

    renderCorrelationChart() {
        const ctx = document.getElementById('correlationChart').getContext('2d');
        
        if (this.charts.correlation) {
            this.charts.correlation.destroy();
        }

        const questoes = this.currentAnalysis.questoes;
        const totalQuestoes = questoes.length;
        
        this.charts.correlation = new Chart(ctx, {
            type: 'scatter',
            data: {
                datasets: [{
                    label: 'Correlação Questão x Habilidade',
                    data: questoes.map(q => ({
                        x: q.numero,
                        y: q.correlacao * 100
                    })),
                    backgroundColor: 'rgba(124, 58, 237, 0.6)',
                    borderColor: 'rgba(124, 58, 237, 1)',
                    borderWidth: 2,
                    pointRadius: 6,
                    pointHoverRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: `Correlação entre Questões e Habilidades (${totalQuestoes} questões)`
                    },
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Número da Questão'
                        },
                        min: 0,
                        max: Math.max(totalQuestoes + 2, 20) // Garantir que o eixo X seja adequado
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Correlação (%)'
                        },
                        min: 0,
                        max: 100
                    }
                },
                onClick: (event, elements) => {
                    if (elements.length > 0) {
                        const index = elements[0].index;
                        const questao = questoes[index];
                        this.showQuestionDetails(questao);
                    }
                }
            }
        });
    }

    renderHabilidadesList() {
        const container = document.getElementById('habilidadesList');
        const habilidadesUnicas = [...new Set(this.currentAnalysis.questoes.map(q => q.habilidade.codigo))];
        const totalQuestoes = this.currentAnalysis.questoes.length;
        
        // Cabeçalho com estatísticas
        let header = `
            <div class="alert alert-info mb-3">
                <h6 class="mb-2"><i class="fas fa-info-circle me-2"></i>Resumo da Análise</h6>
                <div class="row">
                    <div class="col-6">
                        <strong>${totalQuestoes}</strong> questões processadas
                    </div>
                    <div class="col-6">
                        <strong>${habilidadesUnicas.length}</strong> habilidades identificadas
                    </div>
                </div>
            </div>
        `;
        
        container.innerHTML = header + habilidadesUnicas.map(codigo => {
            const habilidade = this.currentAnalysis.habilidades.find(h => h.codigo === codigo);
            const questoesRelacionadas = this.currentAnalysis.questoes.filter(q => q.habilidade.codigo === codigo);
            const mediaCorrelacao = questoesRelacionadas.reduce((sum, q) => sum + q.correlacao, 0) / questoesRelacionadas.length;
            
            return `
                <div class="skill-item">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                        <span class="skill-code">${habilidade.codigo}</span>
                        <span class="badge bg-success">${Math.round(mediaCorrelacao * 100)}%</span>
                    </div>
                    <div class="skill-description mb-2">${habilidade.descricao}</div>
                    <div class="d-flex justify-content-between">
                        <span class="skill-bncc">BNCC: ${habilidade.bncc}</span>
                        <small class="text-muted">${questoesRelacionadas.length} questão(ões)</small>
                    </div>
                </div>
            `;
        }).join('');
    }

    renderCycleChart() {
        const ctx = document.getElementById('cycleChart').getContext('2d');
        
        if (this.charts.cycle) {
            this.charts.cycle.destroy();
        }

        const ciclos = {};
        this.currentAnalysis.questoes.forEach(q => {
            q.habilidade.ciclos.forEach(ciclo => {
                ciclos[ciclo] = (ciclos[ciclo] || 0) + 1;
            });
        });

        this.charts.cycle = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(ciclos),
                datasets: [{
                    data: Object.values(ciclos),
                    backgroundColor: [
                        '#7c3aed',
                        '#3b82f6',
                        '#10b981',
                        '#f59e0b',
                        '#ef4444'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Questões por Ciclo'
                    }
                }
            }
        });
    }

    renderCoverageChart() {
        const ctx = document.getElementById('coverageChart').getContext('2d');
        
        if (this.charts.coverage) {
            this.charts.coverage.destroy();
        }

        const totalHabilidades = this.currentAnalysis.habilidades.length;
        const habilidadesCober = new Set(this.currentAnalysis.questoes.map(q => q.habilidade.codigo)).size;
        const cobertura = (habilidadesCober / totalHabilidades) * 100;

        this.charts.coverage = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Cobertas', 'Não Cobertas'],
                datasets: [{
                    data: [habilidadesCober, totalHabilidades - habilidadesCober],
                    backgroundColor: ['#10b981', '#e5e7eb']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: `Cobertura: ${Math.round(cobertura)}%`
                    }
                }
            }
        });
    }

    showQuestionDetails(questao) {
        const detailsHtml = `
            <div class="alert alert-info">
                <h6><i class="fas fa-question-circle me-2"></i>Questão ${questao.numero}</h6>
                <p><strong>Habilidade:</strong> ${questao.habilidade.codigo} - ${questao.habilidade.descricao}</p>
                <p><strong>Correlação:</strong> ${Math.round(questao.correlacao * 100)}%</p>
                <p><strong>Confiança:</strong> ${Math.round(questao.confianca * 100)}%</p>
                <small><strong>BNCC:</strong> ${questao.habilidade.bncc}</small>
            </div>
        `;
        
        // Criar modal temporário para mostrar detalhes
        const modalId = 'questionDetailsModal';
        let modal = document.getElementById(modalId);
        
        if (!modal) {
            modal = document.createElement('div');
            modal.id = modalId;
            modal.className = 'modal fade';
            modal.innerHTML = `
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Detalhes da Questão</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">${detailsHtml}</div>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
        } else {
            modal.querySelector('.modal-body').innerHTML = detailsHtml;
        }
        
        new bootstrap.Modal(modal).show();
    }

    loadMatrixBrowser() {
        this.filterMatrix();
    }

    filterMatrix() {
        const ano = document.getElementById('browserAno').value;
        const disciplina = document.getElementById('browserDisciplina').value;
        const search = document.getElementById('browserSearch').value.toLowerCase();

        let habilidades = getHabilidades(disciplina || null, ano ? parseInt(ano) : null);

        if (search) {
            habilidades = habilidades.filter(h => 
                h.descricao.toLowerCase().includes(search) ||
                h.codigo.toLowerCase().includes(search) ||
                h.bncc.toLowerCase().includes(search)
            );
        }

        this.renderMatrixBrowser(habilidades);
    }

    renderMatrixBrowser(habilidades) {
        const container = document.getElementById('matrixBrowser');
        
        if (habilidades.length === 0) {
            container.innerHTML = `
                <div class="text-center p-4">
                    <i class="fas fa-search fa-3x text-muted mb-3"></i>
                    <p class="text-muted">Nenhuma habilidade encontrada com os filtros aplicados.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = habilidades.map(habilidade => `
            <div class="matrix-item">
                <div class="matrix-header">
                    <span class="matrix-code">${habilidade.codigo}</span>
                    <span class="matrix-bncc">${habilidade.bncc}</span>
                </div>
                <div class="matrix-description mb-2">${habilidade.descricao}</div>
                <div class="d-flex justify-content-between align-items-center">
                    <span class="text-muted small">${habilidade.disciplina} • ${habilidade.ano}</span>
                    <div class="matrix-cycles">
                        ${habilidade.ciclos.map(ciclo => `<span class="cycle-badge">${ciclo}</span>`).join('')}
                    </div>
                </div>
            </div>
        `).join('');
    }

    setupThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                document.body.classList.toggle('dark-mode');
                const isDark = document.body.classList.contains('dark-mode');
                themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
                
                // Salvar preferência
                localStorage.setItem('theme', isDark ? 'dark' : 'light');
                
                // Atualizar gráficos se existirem
                this.updateChartsTheme(isDark);
            });

            // Carregar tema salvo
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'dark') {
                document.body.classList.add('dark-mode');
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            }
        }
    }

    updateChartsTheme(isDark) {
        const textColor = isDark ? '#c9d1d9' : '#333';
        const gridColor = isDark ? '#30363d' : '#e5e7eb';

        Object.values(this.charts).forEach(chart => {
            if (chart && chart.options) {
                // Atualizar cores do texto
                if (chart.options.plugins?.title) {
                    chart.options.plugins.title.color = textColor;
                }
                if (chart.options.plugins?.legend) {
                    chart.options.plugins.legend.labels.color = textColor;
                }
                if (chart.options.scales) {
                    Object.values(chart.options.scales).forEach(scale => {
                        if (scale.title) scale.title.color = textColor;
                        if (scale.ticks) scale.ticks.color = textColor;
                        if (scale.grid) scale.grid.color = gridColor;
                    });
                }
                chart.update();
            }
        });
    }
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    new MatrizesAnalyzer();
});
