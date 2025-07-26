/**
 * SADE v4.0.0 - Sistema de Avaliação e Desempenho Escolar
 * Aplicação moderna com bibliotecas atualizadas
 * Desenvolvido por Paulo Henrique
 */

class SADEModern {
    constructor() {
        this.currentSection = 'dashboard';
        this.filters = {
            proea: { grade: '', subject: '', school: '' },
            cnca: { grade: '', subject: '', school: '' }
        };
        this.charts = {};
        this.init();
    }

    async init() {
        console.log('🚀 Inicializando SADE v4.0.0...');
        
        // Aguarda o carregamento completo do DOM
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        this.setupEventListeners();
        this.initializeSelect2();
        this.populateFilters();
        this.initializeFancybox();
        this.generateDashboardStats();
        this.createDashboardCharts();
        
        console.log('✅ SADE v4.0.0 inicializado com sucesso!');
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('[data-section]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.switchSection(e.target.closest('[data-section]').dataset.section);
            });
        });

        // Filter change events
        ['proea', 'cnca'].forEach(program => {
            ['grade', 'subject', 'school'].forEach(filter => {
                const element = document.getElementById(`${program}-${filter}`);
                if (element) {
                    element.addEventListener('change', () => {
                        this.filters[program][filter] = element.value;
                        this.applyFilters(program);
                        this.updateActiveFilters(program);
                    });
                }
            });
        });
    }

    initializeSelect2() {
        // Configuração global do Select2
        $.fn.select2.defaults.set('theme', 'default');
        $.fn.select2.defaults.set('width', '100%');
        $.fn.select2.defaults.set('placeholder', 'Selecione uma opção...');
        $.fn.select2.defaults.set('allowClear', true);
        $.fn.select2.defaults.set('language', {
            noResults: () => 'Nenhum resultado encontrado',
            searching: () => 'Buscando...',
            loadingMore: () => 'Carregando mais resultados...',
            removeAllItems: () => 'Remover todos os itens'
        });

        // Inicializa todos os selects
        $('.select2').select2();
    }

    initializeFancybox() {
        // Configuração do Fancybox para galeria de imagens
        Fancybox.bind("[data-fancybox]", {
            groupAll: true,
            Toolbar: {
                display: {
                    left: ["infobar"],
                    middle: ["zoomIn", "zoomOut", "toggle1to1", "rotateCCW", "rotateCW", "flipX", "flipY"],
                    right: ["slideshow", "thumbs", "close"]
                }
            },
            Thumbs: {
                autoStart: true
            }
        });
    }

    switchSection(section) {
        // Update navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        document.querySelector(`[data-section="${section}"]`).classList.add('active');

        // Update breadcrumb
        const breadcrumb = document.getElementById('breadcrumb');
        const sectionNames = {
            dashboard: 'Dashboard',
            proea: 'PROEA - Anos Finais',
            cnca: 'CNCA - Compromisso Criança Alfabetizada',
            gallery: 'Galeria Completa'
        };
        breadcrumb.innerHTML = `<li class="breadcrumb-item active">${sectionNames[section]}</li>`;

        // Hide all sections
        document.querySelectorAll('.section').forEach(sec => {
            sec.style.display = 'none';
        });

        // Show selected section
        document.getElementById(`${section}-section`).style.display = 'block';
        this.currentSection = section;

        // Load section-specific content
        if (section === 'proea') {
            this.loadProeaContent();
        } else if (section === 'cnca') {
            this.loadCncaContent();
        } else if (section === 'gallery') {
            this.loadCompleteGallery();
        }
    }

    populateFilters() {
        console.log('📋 Populando filtros...');
        
        try {
            // PROEA Filters
            this.populateProgramFilters('proea', SADE_DATA.PROEA);
            
            // CNCA Filters  
            this.populateProgramFilters('cnca', SADE_DATA.CNCA);
            
            console.log('✅ Filtros populados com sucesso!');
        } catch (error) {
            console.error('❌ Erro ao popular filtros:', error);
        }
    }

    populateProgramFilters(program, data) {
        const grades = new Set();
        const subjects = new Set();
        const schools = new Set();

        // Extrair dados únicos
        Object.entries(data).forEach(([grade, gradeData]) => {
            grades.add(grade);
            
            Object.entries(gradeData).forEach(([subject, subjectData]) => {
                subjects.add(subject);
                
                Object.keys(subjectData).forEach(school => {
                    schools.add(school);
                });
            });
        });

        // Popular dropdowns
        this.populateSelect(`${program}-grade`, Array.from(grades).sort(), 'Todos os anos');
        this.populateSelect(`${program}-subject`, Array.from(subjects).sort(), 'Todas as disciplinas');
        this.populateSelect(`${program}-school`, Array.from(schools).sort(), 'Todas as escolas');

        console.log(`✅ Filtros ${program.toUpperCase()} populados:`, {
            grades: grades.size,
            subjects: subjects.size,
            schools: schools.size
        });
    }

    populateSelect(selectId, options, placeholder) {
        const select = document.getElementById(selectId);
        if (!select) {
            console.warn(`⚠️ Select ${selectId} não encontrado`);
            return;
        }

        // Limpar opções existentes (exceto a primeira)
        while (select.options.length > 1) {
            select.removeChild(select.lastChild);
        }

        // Adicionar novas opções
        options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option;
            optionElement.textContent = option;
            select.appendChild(optionElement);
        });

        // Reinicializar Select2
        $(`#${selectId}`).select2('destroy').select2();
    }

    applyFilters(program) {
        console.log(`🔍 Aplicando filtros para ${program}:`, this.filters[program]);
        
        const resultsContainer = document.getElementById(`${program}-results`);
        const loadingSpinner = document.getElementById(`${program}-loading`);
        
        // Mostrar loading
        resultsContainer.innerHTML = '';
        loadingSpinner.style.display = 'block';

        // Simular delay para melhor UX
        setTimeout(() => {
            const filteredData = this.getFilteredData(program);
            this.displayResults(program, filteredData);
            loadingSpinner.style.display = 'none';
        }, 500);
    }

    getFilteredData(program) {
        const data = SADE_DATA[program.toUpperCase()];
        const filters = this.filters[program];
        const results = [];

        Object.entries(data).forEach(([grade, gradeData]) => {
            if (filters.grade && filters.grade !== grade) return;

            Object.entries(gradeData).forEach(([subject, subjectData]) => {
                if (filters.subject && filters.subject !== subject) return;

                Object.entries(subjectData).forEach(([school, schoolData]) => {
                    if (filters.school && filters.school !== school) return;

                    results.push({
                        grade,
                        subject,
                        school,
                        ...schoolData
                    });
                });
            });
        });

        return results;
    }

    displayResults(program, data) {
        const container = document.getElementById(`${program}-results`);
        
        if (data.length === 0) {
            container.innerHTML = `
                <div class="col-12 text-center py-5">
                    <i class="fas fa-search fa-3x text-muted mb-3"></i>
                    <h4 class="text-muted">Nenhum resultado encontrado</h4>
                    <p class="text-muted">Tente ajustar os filtros para encontrar mais resultados.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = data.map(item => this.createGalleryItem(item)).join('');
        
        // Reinicializar Fancybox para novos elementos
        Fancybox.destroy();
        this.initializeFancybox();
    }

    createGalleryItem(item) {
        const imagePath = this.encodeImagePath(item.imagem);
        const mediaDisplay = item.media ? item.media.toFixed(1) : 'N/A';
        
        return `
            <div class="gallery-item">
                <a href="${imagePath}" 
                   data-fancybox="gallery" 
                   data-caption="${item.escola || item.school} - ${item.ano || item.grade} - ${item.disciplina || item.subject}">
                    <img src="${imagePath}" 
                         alt="Gráfico ${item.escola || item.school}" 
                         loading="lazy"
                         onerror="this.src='assets/no-image.png'">
                    <div class="gallery-overlay">
                        <h6 class="mb-1">${item.escola || item.school}</h6>
                        <p class="mb-1 small">${item.ano || item.grade} - ${item.disciplina || item.subject}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="badge bg-primary">Média: ${mediaDisplay}</span>
                            <span class="badge bg-secondary">${item.alunos || 'N/A'} alunos</span>
                        </div>
                    </div>
                </a>
            </div>
        `;
    }

    updateActiveFilters(program) {
        const container = document.getElementById(`${program}-active-filters`);
        const filters = this.filters[program];
        const activeFilters = [];

        Object.entries(filters).forEach(([key, value]) => {
            if (value) {
                const labels = {
                    grade: 'Ano',
                    subject: 'Disciplina',
                    school: 'Escola'
                };
                activeFilters.push(`${labels[key]}: ${value}`);
            }
        });

        if (activeFilters.length > 0) {
            container.innerHTML = `
                <div class="d-flex align-items-center gap-2 flex-wrap">
                    <strong>Filtros ativos:</strong>
                    ${activeFilters.map(filter => `<span class="filter-badge">${filter}</span>`).join('')}
                </div>
            `;
        } else {
            container.innerHTML = '';
        }
    }

    clearFilters(program) {
        // Reset filter values
        this.filters[program] = { grade: '', subject: '', school: '' };

        // Reset select elements
        ['grade', 'subject', 'school'].forEach(filter => {
            const select = document.getElementById(`${program}-${filter}`);
            if (select) {
                $(select).val('').trigger('change');
            }
        });

        // Clear active filters display
        document.getElementById(`${program}-active-filters`).innerHTML = '';

        // Reload all data
        this.applyFilters(program);
    }

    loadProeaContent() {
        if (document.getElementById('proea-results').children.length === 0) {
            this.applyFilters('proea');
        }
    }

    loadCncaContent() {
        if (document.getElementById('cnca-results').children.length === 0) {
            this.applyFilters('cnca');
        }
    }

    loadCompleteGallery() {
        const container = document.getElementById('complete-gallery');
        const loading = document.getElementById('gallery-loading');
        
        if (container.children.length > 0) return;

        loading.style.display = 'block';

        setTimeout(() => {
            const allData = [];
            
            // Combinar dados PROEA e CNCA
            ['PROEA', 'CNCA'].forEach(program => {
                Object.entries(SADE_DATA[program]).forEach(([grade, gradeData]) => {
                    Object.entries(gradeData).forEach(([subject, subjectData]) => {
                        Object.entries(subjectData).forEach(([school, schoolData]) => {
                            allData.push({
                                program,
                                grade,
                                subject,
                                school,
                                ...schoolData
                            });
                        });
                    });
                });
            });

            container.innerHTML = allData.map(item => this.createGalleryItem(item)).join('');
            loading.style.display = 'none';
            
            // Reinicializar Fancybox
            Fancybox.destroy();
            this.initializeFancybox();
        }, 800);
    }

    generateDashboardStats() {
        let totalStudents = 0;
        let totalEvaluations = 0;
        let totalPerformance = 0;
        let performanceCount = 0;
        const schools = new Set();

        ['PROEA', 'CNCA'].forEach(program => {
            Object.values(SADE_DATA[program]).forEach(gradeData => {
                Object.values(gradeData).forEach(subjectData => {
                    Object.entries(subjectData).forEach(([school, data]) => {
                        schools.add(school);
                        if (data.alunos) totalStudents += parseInt(data.alunos);
                        if (data.media) {
                            totalPerformance += parseFloat(data.media);
                            performanceCount++;
                        }
                        totalEvaluations++;
                    });
                });
            });
        });

        document.getElementById('total-students').textContent = totalStudents.toLocaleString();
        document.getElementById('total-schools').textContent = schools.size;
        document.getElementById('avg-performance').textContent = (totalPerformance / performanceCount).toFixed(1);
        document.getElementById('total-evaluations').textContent = totalEvaluations;
    }

    createDashboardCharts() {
        this.createSubjectChart();
        this.createGradeChart();
    }

    createSubjectChart() {
        const ctx = document.getElementById('subjectChart').getContext('2d');
        const subjectData = {};

        ['PROEA', 'CNCA'].forEach(program => {
            Object.values(SADE_DATA[program]).forEach(gradeData => {
                Object.entries(gradeData).forEach(([subject, subjectData]) => {
                    if (!subjectData[subject]) subjectData[subject] = 0;
                    subjectData[subject] += Object.keys(subjectData).length;
                });
            });
        });

        this.charts.subject = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(subjectData),
                datasets: [{
                    data: Object.values(subjectData),
                    backgroundColor: [
                        '#2563eb', '#059669', '#d97706', '#dc2626', '#7c3aed'
                    ]
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

    createGradeChart() {
        const ctx = document.getElementById('gradeChart').getContext('2d');
        const gradeData = {};

        ['PROEA', 'CNCA'].forEach(program => {
            Object.entries(SADE_DATA[program]).forEach(([grade, gradeDataObj]) => {
                if (!gradeData[grade]) gradeData[grade] = [];
                
                Object.values(gradeDataObj).forEach(subjectData => {
                    Object.values(subjectData).forEach(data => {
                        if (data.media) gradeData[grade].push(parseFloat(data.media));
                    });
                });
            });
        });

        // Calcular médias por ano
        const gradeAverages = {};
        Object.entries(gradeData).forEach(([grade, values]) => {
            gradeAverages[grade] = values.reduce((a, b) => a + b, 0) / values.length;
        });

        this.charts.grade = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Object.keys(gradeAverages),
                datasets: [{
                    label: 'Média de Performance',
                    data: Object.values(gradeAverages),
                    backgroundColor: '#2563eb',
                    borderColor: '#1d4ed8',
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

    encodeImagePath(imagePath) {
        if (!imagePath) return 'assets/no-image.png';
        
        // Codificar caracteres especiais para URLs
        return imagePath
            .replace(/º/g, '%C2%BA')
            .replace(/ª/g, '%C2%AA')
            .replace(/ã/g, '%C3%A3')
            .replace(/ç/g, '%C3%A7')
            .replace(/é/g, '%C3%A9')
            .replace(/í/g, '%C3%AD')
            .replace(/ó/g, '%C3%B3')
            .replace(/ú/g, '%C3%BA')
            .replace(/Ã/g, '%C3%83')
            .replace(/Ç/g, '%C3%87')
            .replace(/É/g, '%C3%89')
            .replace(/Í/g, '%C3%8D')
            .replace(/Ó/g, '%C3%93')
            .replace(/Ú/g, '%C3%9A')
            .replace(/ /g, '%20');
    }
}

// Inicializar aplicação quando o DOM estiver pronto
const sadeApp = new SADEModern();

// Funções globais para compatibilidade
window.clearFilters = (program) => sadeApp.clearFilters(program);

// Debug helper
window.SADE_DEBUG = {
    app: sadeApp,
    data: () => SADE_DATA,
    filters: () => sadeApp.filters
};

console.log('🎯 SADE v4.0.0 carregado! Use window.SADE_DEBUG para debug.');
