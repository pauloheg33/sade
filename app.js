/**
 * SADE v4.1.0 - Sistema de Avaliação e Desempenho Escolar
 * Aplicação moderna com UI aprimorada, tema escuro e mais funcionalidades.
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
        this.allGalleryItems = []; // Cache for gallery search
        this.init();
    }

    async init() {
        console.log('🚀 Inicializando SADE v4.1.0...');
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
        this.setupTheme();
        this.setupBackToTop();
        
        // Carregar conteúdo da seção inicial
        this.switchSection('dashboard', true);
        
        console.log('✅ SADE v4.1.0 inicializado com sucesso!');
    }

    setupEventListeners() {
        // Navegação principal
        document.querySelectorAll('.nav-link[data-section]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.switchSection(e.target.closest('[data-section]').dataset.section);
            });
        });

        // Filtros
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

        // Busca na galeria
        const gallerySearch = document.getElementById('gallery-search');
        if (gallerySearch) {
            gallerySearch.addEventListener('input', (e) => this.filterCompleteGallery(e.target.value));
        }
        
        // Botão de tema
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    }

    initializeSelect2() {
        const select2Config = {
            theme: 'bootstrap-5',
            width: '100%',
            placeholder: 'Selecione uma opção...',
            allowClear: true,
            language: {
                noResults: () => 'Nenhum resultado encontrado',
            }
        };
        $('#proea-grade').select2(select2Config);
        $('#proea-subject').select2(select2Config);
        $('#proea-school').select2(select2Config);
        $('#cnca-grade').select2(select2Config);
        $('#cnca-subject').select2(select2Config);
        $('#cnca-school').select2(select2Config);
    }

    initializeFancybox() {
        Fancybox.bind("[data-fancybox]", {
            groupAll: true,
            Toolbar: {
                display: {
                    left: ["infobar"],
                    middle: ["zoomIn", "zoomOut", "toggle1to1", "rotateCCW", "rotateCW", "flipX", "flipY"],
                    right: ["slideshow", "thumbs", "close"]
                }
            },
            Thumbs: { autoStart: false }
        });
    }

    switchSection(section, isInitialLoad = false) {
        if (!isInitialLoad && this.currentSection === section) return;

        this.currentSection = section;

        // Atualiza navegação
        document.querySelectorAll('.nav-link[data-section]').forEach(link => {
            link.classList.toggle('active', link.dataset.section === section);
        });

        // Atualiza breadcrumb
        const breadcrumb = document.getElementById('breadcrumb');
        const sectionNames = {
            dashboard: 'Dashboard',
            proea: 'PROEA - Anos Finais',
            cnca: 'CNCA - Compromisso Criança Alfabetizada',
            gallery: 'Galeria Completa'
        };
        breadcrumb.innerHTML = `<li class="breadcrumb-item active" aria-current="page">${sectionNames[section]}</li>`;

        // Mostra a seção correta
        document.querySelectorAll('.section').forEach(sec => {
            sec.classList.remove('active');
        });
        document.getElementById(`${section}-section`).classList.add('active');

        // Carrega conteúdo específico da seção
        switch(section) {
            case 'proea': this.loadProeaContent(); break;
            case 'cnca': this.loadCncaContent(); break;
            case 'gallery': this.loadCompleteGallery(); break;
        }
    }

    populateFilters() {
        try {
            this.populateProgramFilters('proea', SADE_DATA.PROEA);
            this.populateProgramFilters('cnca', SADE_DATA.CNCA);
            console.log('✅ Filtros populados com sucesso!');
        } catch (error) {
            console.error('❌ Erro ao popular filtros:', error);
            this.showError('Falha ao carregar os dados dos filtros.');
        }
    }

    populateProgramFilters(program, data) {
        const grades = new Set();
        const subjects = new Set();
        const schools = new Set();

        Object.entries(data).forEach(([grade, gradeData]) => {
            grades.add(grade);
            Object.entries(gradeData).forEach(([subject, subjectData]) => {
                subjects.add(subject);
                Object.keys(subjectData).forEach(school => schools.add(school));
            });
        });

        this.populateSelect(`${program}-grade`, Array.from(grades).sort());
        this.populateSelect(`${program}-subject`, Array.from(subjects).sort());
        this.populateSelect(`${program}-school`, Array.from(schools).sort());
    }

    populateSelect(selectId, options) {
        const select = document.getElementById(selectId);
        if (!select) return;

        const currentValue = select.value;
        const firstOption = select.options[0];
        select.innerHTML = '';
        select.appendChild(firstOption);

        options.forEach(optionText => {
            const optionElement = document.createElement('option');
            optionElement.value = optionText;
            optionElement.textContent = optionText;
            select.appendChild(optionElement);
        });
        select.value = currentValue;
    }

    applyFilters(program) {
        const resultsContainer = document.getElementById(`${program}-results`);
        const loadingSpinner = document.getElementById(`${program}-loading`);
        
        resultsContainer.innerHTML = '';
        loadingSpinner.style.display = 'block';

        setTimeout(() => {
            try {
                const filteredData = this.getFilteredData(program);
                this.displayResults(program, filteredData);
            } catch (error) {
                console.error(`❌ Erro ao aplicar filtros para ${program}:`, error);
                this.showError('Ocorreu um erro ao filtrar os dados.', resultsContainer);
            } finally {
                loadingSpinner.style.display = 'none';
            }
        }, 300);
    }

    getFilteredData(program) {
        const data = SADE_DATA[program.toUpperCase()];
        const { grade: gradeFilter, subject: subjectFilter, school: schoolFilter } = this.filters[program];
        const results = [];

        for (const [grade, gradeData] of Object.entries(data)) {
            if (gradeFilter && gradeFilter !== grade) continue;
            for (const [subject, subjectData] of Object.entries(gradeData)) {
                if (subjectFilter && subjectFilter !== subject) continue;
                for (const [school, schoolData] of Object.entries(subjectData)) {
                    if (schoolFilter && schoolFilter !== school) continue;
                    results.push({ grade, subject, school, ...schoolData });
                }
            }
        }
        return results;
    }

    displayResults(program, data) {
        const container = document.getElementById(`${program}-results`);
        if (data.length === 0) {
            container.innerHTML = this.getNoResultsHTML();
            return;
        }
        container.innerHTML = data.map(item => this.createGalleryItem(item)).join('');
    }

    createGalleryItem(item) {
        const imagePath = this.encodeImagePath(item.imagem);
        const media = item.media ? parseFloat(item.media).toFixed(1) : 'N/A';
        const caption = `${item.school} - ${item.grade} - ${item.subject}`;

        return `
            <div class="gallery-item" data-search-term="${caption.toLowerCase()}">
                <a href="${imagePath}" data-fancybox="gallery-${item.program || 'default'}" data-caption="${caption}">
                    <img src="${imagePath}" alt="Gráfico: ${caption}" loading="lazy" onerror="this.onerror=null;this.src='assets/no-image.png';">
                    <div class="gallery-overlay">
                        <h5 class="text-white">${item.school}</h5>
                        <p class="mb-1 small">${item.grade} - ${item.subject}</p>
                        <div class="d-flex justify-content-between small">
                            <span><i class="fas fa-chart-line me-1"></i> Média: <strong>${media}</strong></span>
                            <span><i class="fas fa-users me-1"></i> Alunos: <strong>${item.alunos || 'N/A'}</strong></span>
                        </div>
                    </div>
                </a>
            </div>`;
    }

    updateActiveFilters(program) {
        const container = document.getElementById(`${program}-active-filters`);
        const active = Object.entries(this.filters[program]).filter(([, value]) => value);

        if (active.length > 0) {
            const labels = { grade: 'Ano', subject: 'Disciplina', school: 'Escola' };
            container.innerHTML = `
                <div class="d-flex align-items-center gap-2 flex-wrap">
                    <strong class="small me-2">Filtros ativos:</strong>
                    ${active.map(([key, value]) => `<span class="filter-badge">${labels[key]}: ${value}</span>`).join('')}
                </div>`;
        } else {
            container.innerHTML = '';
        }
    }

    clearFilters(program) {
        this.filters[program] = { grade: '', subject: '', school: '' };
        ['grade', 'subject', 'school'].forEach(filter => {
            $(`#${program}-${filter}`).val('').trigger('change.select2');
        });
        this.applyFilters(program);
        this.updateActiveFilters(program);
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
        const countSpan = document.getElementById('gallery-total-count');
        
        if (this.allGalleryItems.length > 0) return;

        loading.style.display = 'block';
        container.innerHTML = '';

        setTimeout(() => {
            try {
                ['PROEA', 'CNCA'].forEach(program => {
                    Object.entries(SADE_DATA[program]).forEach(([grade, gradeData]) => {
                        Object.entries(gradeData).forEach(([subject, subjectData]) => {
                            Object.entries(subjectData).forEach(([school, schoolData]) => {
                                this.allGalleryItems.push({ program, grade, subject, school, ...schoolData });
                            });
                        });
                    });
                });

                container.innerHTML = this.allGalleryItems.map(item => this.createGalleryItem(item)).join('');
                if(countSpan) countSpan.textContent = this.allGalleryItems.length;
            } catch (error) {
                console.error('❌ Erro ao carregar galeria completa:', error);
                this.showError('Ocorreu um erro ao carregar a galeria.', container);
            } finally {
                loading.style.display = 'none';
            }
        }, 500);
    }

    filterCompleteGallery(searchTerm) {
        const term = searchTerm.toLowerCase().trim();
        const galleryItems = document.querySelectorAll('#complete-gallery .gallery-item');
        galleryItems.forEach(item => {
            const itemTerm = item.dataset.searchTerm || '';
            item.style.display = itemTerm.includes(term) ? 'block' : 'none';
        });
    }

    generateDashboardStats() {
        try {
            let totalStudents = 0, totalEvaluations = 0, totalPerformance = 0, performanceCount = 0;
            const schools = new Set();

            ['PROEA', 'CNCA'].forEach(program => {
                Object.values(SADE_DATA[program]).forEach(gradeData => {
                    Object.values(gradeData).forEach(subjectData => {
                        Object.entries(subjectData).forEach(([school, data]) => {
                            schools.add(school);
                            if (data.alunos) totalStudents += parseInt(data.alunos, 10);
                            if (data.media) {
                                totalPerformance += parseFloat(data.media);
                                performanceCount++;
                            }
                            totalEvaluations++;
                        });
                    });
                });
            });

            document.getElementById('total-students').textContent = totalStudents.toLocaleString('pt-BR');
            document.getElementById('total-schools').textContent = schools.size;
            document.getElementById('avg-performance').textContent = performanceCount > 0 ? (totalPerformance / performanceCount).toFixed(1) : '0';
            document.getElementById('total-evaluations').textContent = totalEvaluations.toLocaleString('pt-BR');
        } catch (error) {
            console.error('❌ Erro ao gerar estatísticas do dashboard:', error);
        }
    }

    createDashboardCharts() {
        this.createSubjectChart();
        this.createGradeChart();
    }

    createSubjectChart() {
        const ctx = document.getElementById('subjectChart')?.getContext('2d');
        if (!ctx) return;

        const subjectCounts = {};
        ['PROEA', 'CNCA'].forEach(program => {
            Object.values(SADE_DATA[program]).forEach(gradeData => {
                Object.keys(gradeData).forEach(subject => {
                    subjectCounts[subject] = (subjectCounts[subject] || 0) + 1;
                });
            });
        });

        if (this.charts.subject) this.charts.subject.destroy();
        this.charts.subject = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(subjectCounts),
                datasets: [{
                    data: Object.values(subjectCounts),
                    backgroundColor: ['#2563eb', '#16a34a', '#f97316', '#ef4444', '#6d28d9', '#db2777'],
                    borderColor: document.body.classList.contains('dark-mode') ? '#161b22' : '#fff',
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'bottom', labels: { color: document.body.classList.contains('dark-mode') ? '#c9d1d9' : '#333' } }
                }
            }
        });
    }

    createGradeChart() {
        const ctx = document.getElementById('gradeChart')?.getContext('2d');
        if (!ctx) return;

        const gradeAverages = {};
        ['PROEA', 'CNCA'].forEach(program => {
            Object.entries(SADE_DATA[program]).forEach(([grade, gradeDataObj]) => {
                let totalMedia = 0, count = 0;
                Object.values(gradeDataObj).forEach(subjectData => {
                    Object.values(subjectData).forEach(data => {
                        if (data.media) {
                            totalMedia += parseFloat(data.media);
                            count++;
                        }
                    });
                });
                if (count > 0) gradeAverages[grade] = (gradeAverages[grade] || 0) + (totalMedia / count);
            });
        });
        
        const sortedGrades = Object.keys(gradeAverages).sort();

        if (this.charts.grade) this.charts.grade.destroy();
        this.charts.grade = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: sortedGrades,
                datasets: [{
                    label: 'Média de Performance',
                    data: sortedGrades.map(grade => gradeAverages[grade]),
                    backgroundColor: '#2563eb',
                    borderRadius: 4,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: { beginAtZero: true, max: 100, grid: { color: document.body.classList.contains('dark-mode') ? '#30363d' : '#e2e8f0' }, ticks: { color: document.body.classList.contains('dark-mode') ? '#c9d1d9' : '#333' } },
                    x: { grid: { display: false }, ticks: { color: document.body.classList.contains('dark-mode') ? '#c9d1d9' : '#333' } }
                }
            }
        });
    }

    setupTheme() {
        const themeToggle = document.getElementById('theme-toggle');
        const icon = themeToggle.querySelector('i');
        if (localStorage.getItem('sadeTheme') === 'dark') {
            document.body.classList.add('dark-mode');
            icon.classList.replace('fa-moon', 'fa-sun');
        }
        themeToggle.style.display = 'block';
    }

    toggleTheme() {
        const themeToggle = document.getElementById('theme-toggle');
        const icon = themeToggle.querySelector('i');
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('sadeTheme', 'dark');
            icon.classList.replace('fa-moon', 'fa-sun');
        } else {
            localStorage.setItem('sadeTheme', 'light');
            icon.classList.replace('fa-sun', 'fa-moon');
        }
        // Recriar gráficos para atualizar cores
        this.createDashboardCharts();
    }

    setupBackToTop() {
        const backToTopButton = document.getElementById('back-to-top');
        if (!backToTopButton) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.style.display = 'block';
            } else {
                backToTopButton.style.display = 'none';
            }
        });

        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    encodeImagePath(path) {
        if (!path) return 'assets/no-image.png';
        // encodeURI é mais seguro e abrangente que substituições manuais
        return encodeURI(path);
    }

    getNoResultsHTML() {
        return `
            <div class="col-12 text-center py-5">
                <i class="fas fa-search-minus fa-4x text-muted mb-4"></i>
                <h4 class="fw-bold">Nenhum resultado encontrado</h4>
                <p class="text-muted">Tente ajustar ou limpar os filtros para visualizar os dados.</p>
            </div>`;
    }

    showError(message, container) {
        const errorHTML = `
            <div class="col-12 text-center py-5">
                <i class="fas fa-exclamation-triangle fa-4x text-danger mb-4"></i>
                <h4 class="fw-bold">Ocorreu um Erro</h4>
                <p class="text-muted">${message}</p>
            </div>`;
        if (container) {
            container.innerHTML = errorHTML;
        } else {
            // Fallback para um erro mais geral
            document.querySelector('.section.active').innerHTML = errorHTML;
        }
    }
}

// Inicializar a aplicação
const sadeApp = new SADEModern();

// Disponibilizar funções globais se necessário (embora o ideal seja evitar)
window.sadeApp = sadeApp;
