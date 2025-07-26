// Sistema de Avaliação e Desempenho Escolar - SADE
// Secretaria da Educação de Ararendá

class SADESystem {
    constructor() {
        this.data = {
            proea: [],
            cnca: []
        };
        this.charts = {};
        this.init();
    }

    async init() {
        this.setupEventListeners();
        await this.loadData();
        this.renderDashboard();
        this.renderAllSections();
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.switchSection(link.dataset.section);
            });
        });

        // Filters
        document.getElementById('proea-grade')?.addEventListener('change', () => this.filterPROEA());
        document.getElementById('proea-subject')?.addEventListener('change', () => this.filterPROEA());
        document.getElementById('proea-school')?.addEventListener('change', () => this.filterPROEA());
        
        document.getElementById('cnca-grade')?.addEventListener('change', () => this.filterCNCA());
        document.getElementById('cnca-subject')?.addEventListener('change', () => this.filterCNCA());
        document.getElementById('cnca-school')?.addEventListener('change', () => this.filterCNCA());

        // Modal
        const modal = document.getElementById('imageModal');
        const close = document.querySelector('.close');
        close.addEventListener('click', () => modal.style.display = 'none');
        window.addEventListener('click', (e) => {
            if (e.target === modal) modal.style.display = 'none';
        });
    }

    loadData() {
        if (typeof SADE_DATA !== 'undefined') {
            this.data = SADE_DATA;
        } else {
            console.error('SADE_DATA não está definido');
            this.data = { proea: [], cnca: [] };
        }
        
        this.populateFilters();
        this.renderComparativeSection();
        
        // Initialize with empty filters (show all data)
        this.filterPROEA();
        this.filterCNCA();
    }

    generatePROEAData() {
        const schools = [
            '03 DE DEZEMBRO',
            '21 DE DEZEMBRO',
            'ANTONIO DE SOUSA BARROS',
            'FIRMINO JOSÉ',
            'JOSE ALVES'
        ];
        
        const subjects = ['LP', 'MAT', 'CN'];
        const grades = [6, 7, 8, 9];
        const data = [];

        schools.forEach(school => {
            grades.forEach(grade => {
                subjects.forEach(subject => {
                    // Simulando diferentes turmas para algumas escolas
                    const variations = this.getSchoolVariations(school, grade);
                    
                    variations.forEach(variation => {
                        const students = Math.floor(Math.random() * 30) + 5;
                        const average = this.generateAverage(school, subject, grade);
                        
                        data.push({
                            program: 'PROEA',
                            school: school,
                            variation: variation,
                            grade: grade,
                            subject: subject,
                            students: students,
                            average: average,
                            performance: this.getPerformanceLevel(average),
                            imagePath: `Graficos/AVALIAÇÃO DAS APRENDIZAGENS DOS ANOS FINAIS - PROEA/${grade}_ano/${subject}/${grade}º_Ano_${variation}_${subject}_Media${average}_Alunos${students}.png`
                        });
                    });
                });
            });
        });

        return data;
    }

    generateCNCAData() {
        const schools = [
            '03 DE DEZEMBRO',
            'JOAQUIM FERREIRA',
            'MOURÃO LIMA',
            'FIRMINO JOSÉ',
            'ANTONIO DE SOUSA BARROS',
            'JOSE ALVES DE SENA'
        ];
        
        const subjects = ['LP', 'MAT'];
        const grades = [1, 2, 3, 4, 5];
        const data = [];

        schools.forEach(school => {
            grades.forEach(grade => {
                subjects.forEach(subject => {
                    const variations = this.getCNCAVariations(school, grade);
                    
                    variations.forEach(variation => {
                        const students = Math.floor(Math.random() * 25) + 8;
                        const average = this.generateAverage(school, subject, grade);
                        
                        data.push({
                            program: 'CNCA',
                            school: school,
                            variation: variation,
                            grade: grade,
                            subject: subject,
                            students: students,
                            average: average,
                            performance: this.getPerformanceLevel(average),
                            imagePath: `Graficos/CNCA - COMPROMISSO CRIANÇA ALFABETIZADA/${grade}_ano/${subject}/${grade}o_Ano_${variation}_${subject}_Media${average}_Alunos${students}.png`
                        });
                    });
                });
            });
        });

        return data;
    }

    getSchoolVariations(school, grade) {
        const variations = [school.replace(/\s+/g, '_').toUpperCase()];
        
        // Algumas escolas têm múltiplas turmas
        if (school === '21 DE DEZEMBRO' && grade >= 7) {
            variations.push('21_DE_DEZEMBRO_A', '21_DE_DEZEMBRO_B', '21_DE_DEZEMBRO_C');
        }
        if (school === 'FIRMINO JOSÉ' && grade >= 7) {
            variations.push('FIRMINO_JOSÉ_A', 'FIRMINO_JOSÉ_B');
        }
        if (school === 'JOSE ALVES' && grade >= 7) {
            variations.push('JOSE_ALVES_A', 'JOSE_ALVES_B');
        }
        
        return variations;
    }

    getCNCAVariations(school, grade) {
        const baseVariation = school.replace(/\s+/g, '_').toUpperCase();
        const variations = [baseVariation];
        
        // Algumas escolas têm turmas A e B
        if (['JOAQUIM FERREIRA', 'MOURÃO LIMA', 'FIRMINO JOSÉ'].includes(school)) {
            variations.push(`A_-_${baseVariation}`, `B_-_${baseVariation}`);
        }
        
        return variations;
    }

    generateAverage(school, subject, grade) {
        // Simulação de médias baseadas em padrões observados
        let base = 65 + Math.random() * 15; // Base entre 65-80
        
        // Ajustes por escola
        if (school.includes('03 DE DEZEMBRO')) base += 5;
        if (school.includes('21 DE DEZEMBRO')) base += 2;
        if (school.includes('ANTONIO')) base -= 3;
        
        // Ajustes por disciplina
        if (subject === 'MAT') base -= 2;
        if (subject === 'CN') base += 1;
        
        // Ajustes por ano
        if (grade <= 3) base += 3;
        if (grade >= 8) base -= 2;
        
        return Math.round(Math.max(40, Math.min(95, base)) * 10) / 10;
    }

    getPerformanceLevel(average) {
        if (average >= 80) return 'excellent';
        if (average >= 70) return 'good';
        if (average >= 60) return 'average';
        return 'poor';
    }

    populateSchoolFilters() {
        const proeaSchools = [...new Set(this.data.proea.map(item => item.school))];
        const cncaSchools = [...new Set(this.data.cnca.map(item => item.school))];
        
        this.populateSelect('proea-school', proeaSchools);
        this.populateSelect('cnca-school', cncaSchools);
    }

    populateFilters() {        
        // PROEA filters
        const proeaGrades = [...new Set(this.data.proea.map(item => item.grade))].sort((a, b) => a - b);
        const proeaSubjects = [...new Set(this.data.proea.map(item => item.subject))];
        const proeaSchools = [...new Set(this.data.proea.map(item => item.school))].sort();
        
        // Clear existing options first
        this.clearSelect('proea-grade');
        this.clearSelect('proea-subject');
        this.clearSelect('proea-school');
        
        // Populate grade options
        proeaGrades.forEach(grade => {
            this.addSelectOption('proea-grade', grade, `${grade}º Ano`);
        });
        
        // Populate subject options
        proeaSubjects.forEach(subject => {
            this.addSelectOption('proea-subject', subject, this.getSubjectName(subject));
        });
        
        // Populate school options
        proeaSchools.forEach(school => {
            this.addSelectOption('proea-school', school, school);
        });
        
        // CNCA filters
        const cncaGrades = [...new Set(this.data.cnca.map(item => item.grade))].sort((a, b) => a - b);
        const cncaSubjects = [...new Set(this.data.cnca.map(item => item.subject))];
        const cncaSchools = [...new Set(this.data.cnca.map(item => item.school))].sort();
        
        // Clear existing options first
        this.clearSelect('cnca-grade');
        this.clearSelect('cnca-subject');
        this.clearSelect('cnca-school');
        
        // Populate grade options
        cncaGrades.forEach(grade => {
            this.addSelectOption('cnca-grade', grade, `${grade}º Ano`);
        });
        
        // Populate subject options
        cncaSubjects.forEach(subject => {
            this.addSelectOption('cnca-subject', subject, this.getSubjectName(subject));
        });
        
        // Populate school options
        cncaSchools.forEach(school => {
            this.addSelectOption('cnca-school', school, school);
        });
    }

    clearSelect(selectId) {
        const select = document.getElementById(selectId);
        if (!select) return;
        
        // Keep only the first option (placeholder)
        const firstOption = select.firstElementChild;
        select.innerHTML = '';
        if (firstOption) {
            select.appendChild(firstOption);
        }
    }

    addSelectOption(selectId, value, text) {
        const select = document.getElementById(selectId);
        if (!select) return;
        
        const optionElement = document.createElement('option');
        optionElement.value = value;
        optionElement.textContent = text;
        select.appendChild(optionElement);
    }

    populateSelect(selectId, options) {
        const select = document.getElementById(selectId);
        if (!select) return;
        
        options.sort().forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option;
            optionElement.textContent = option;
            select.appendChild(optionElement);
        });
    }

    switchSection(sectionId) {
        // Update navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        document.querySelector(`[data-section="${sectionId}"]`).classList.add('active');
        
        // Update sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionId).classList.add('active');
        
        // Render section-specific content
        switch(sectionId) {
            case 'dashboard':
                this.renderDashboard();
                break;
            case 'proea':
                this.renderPROEASection();
                break;
            case 'cnca':
                this.renderCNCASection();
                break;
            case 'comparativo':
                this.renderComparativeSection();
                break;
            case 'escolas':
                this.renderSchoolsSection();
                break;
        }
    }

    renderDashboard() {
        this.updateStats();
        this.renderDashboardCharts();
    }

    updateStats() {
        const allData = [...this.data.proea, ...this.data.cnca];
        
        const totalStudents = allData.reduce((sum, item) => sum + item.students, 0);
        const totalSchools = new Set(allData.map(item => item.school)).size;
        const avgPerformance = allData.reduce((sum, item) => sum + item.average, 0) / allData.length;
        const totalEvaluations = allData.length;
        
        document.getElementById('total-students').textContent = totalStudents.toLocaleString();
        document.getElementById('total-schools').textContent = totalSchools;
        document.getElementById('avg-performance').textContent = avgPerformance.toFixed(1);
        document.getElementById('total-evaluations').textContent = totalEvaluations;
    }

    renderDashboardCharts() {
        this.renderSubjectChart();
        this.renderGradeChart();
        this.renderSchoolComparisonChart();
    }

    renderSubjectChart() {
        const ctx = document.getElementById('subjectChart');
        if (!ctx) return;

        if (this.charts.subject) {
            this.charts.subject.destroy();
        }

        const allData = [...this.data.proea, ...this.data.cnca];
        const subjectData = {};
        
        allData.forEach(item => {
            const subjectName = this.getSubjectName(item.subject);
            if (!subjectData[subjectName]) {
                subjectData[subjectName] = { total: 0, count: 0 };
            }
            subjectData[subjectName].total += item.average;
            subjectData[subjectName].count++;
        });

        const labels = Object.keys(subjectData);
        const data = labels.map(label => 
            (subjectData[label].total / subjectData[label].count).toFixed(1)
        );

        this.charts.subject = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: [
                        '#3498db',
                        '#e74c3c',
                        '#27ae60',
                        '#f39c12'
                    ],
                    borderWidth: 2,
                    borderColor: '#ffffff'
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

    renderGradeChart() {
        const ctx = document.getElementById('gradeChart');
        if (!ctx) return;

        if (this.charts.grade) {
            this.charts.grade.destroy();
        }

        const allData = [...this.data.proea, ...this.data.cnca];
        const gradeData = {};
        
        allData.forEach(item => {
            const gradeName = `${item.grade}º Ano`;
            if (!gradeData[gradeName]) {
                gradeData[gradeName] = { total: 0, count: 0 };
            }
            gradeData[gradeName].total += item.average;
            gradeData[gradeName].count++;
        });

        const labels = Object.keys(gradeData).sort();
        const data = labels.map(label => 
            (gradeData[label].total / gradeData[label].count).toFixed(1)
        );

        this.charts.grade = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Média por Ano',
                    data: data,
                    backgroundColor: '#3498db',
                    borderColor: '#2980b9',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    }

    renderSchoolComparisonChart() {
        const ctx = document.getElementById('schoolComparisonChart');
        if (!ctx) return;

        if (this.charts.schoolComparison) {
            this.charts.schoolComparison.destroy();
        }

        const allData = [...this.data.proea, ...this.data.cnca];
        const schoolData = {};
        
        allData.forEach(item => {
            if (!schoolData[item.school]) {
                schoolData[item.school] = { total: 0, count: 0 };
            }
            schoolData[item.school].total += item.average;
            schoolData[item.school].count++;
        });

        const labels = Object.keys(schoolData).sort();
        const data = labels.map(label => 
            (schoolData[label].total / schoolData[label].count).toFixed(1)
        );

        this.charts.schoolComparison = new Chart(ctx, {
            type: 'horizontalBar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Média da Escola',
                    data: data,
                    backgroundColor: '#27ae60',
                    borderColor: '#219a52',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                scales: {
                    x: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    }

    renderPROEASection() {
        this.filterPROEA();
    }

    renderCNCASection() {
        this.filterCNCA();
    }

    filterPROEA() {
        const grade = document.getElementById('proea-grade').value;
        const subject = document.getElementById('proea-subject').value;
        const school = document.getElementById('proea-school').value;
        
        let filteredData = this.data.proea;
        
        if (grade) {
            filteredData = filteredData.filter(item => item.grade == grade);
        }
        if (subject) {
            filteredData = filteredData.filter(item => item.subject === subject);
        }
        if (school) {
            filteredData = filteredData.filter(item => item.school === school);
        }
        
        // Update both displays
        this.renderIntegratedCharts('proea-chart-display', filteredData, 'PROEA');
        this.renderResults('proea-results', filteredData);
        this.showFilterFeedback('proea', filteredData.length, { grade, subject, school });
    }

    filterCNCA() {
        const grade = document.getElementById('cnca-grade').value;
        const subject = document.getElementById('cnca-subject').value;
        const school = document.getElementById('cnca-school').value;
        
        let filteredData = this.data.cnca;
        
        if (grade) {
            filteredData = filteredData.filter(item => item.grade == grade);
        }
        if (subject) {
            filteredData = filteredData.filter(item => item.subject === subject);
        }
        if (school) {
            filteredData = filteredData.filter(item => item.school === school);
        }
        
        // Update both displays
        this.renderIntegratedCharts('cnca-chart-display', filteredData, 'CNCA');
        this.renderResults('cnca-results', filteredData);
        this.showFilterFeedback('cnca', filteredData.length, { grade, subject, school });
    }

    renderResults(containerId, data) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        if (data.length === 0) {
            container.innerHTML = '<div class="loading"><i class="fas fa-search"></i><h3>Nenhum resultado encontrado</h3><p>Tente ajustar os filtros</p></div>';
            return;
        }
        
        container.innerHTML = data.map(item => this.createResultCard(item)).join('');
        
        // Add click event listeners to result cards
        container.querySelectorAll('.result-card').forEach(card => {
            card.addEventListener('click', () => {
                const img = card.querySelector('.result-image');
                if (window.sadeExports) {
                    window.sadeExports.openImageModal(img, card);
                } else {
                    // Fallback para o sistema antigo
                    const imagePath = card.dataset.imagePath;
                    const title = card.dataset.title;
                    const description = card.dataset.description;
                    this.showModal(imagePath, title, description);
                }
            });
        });
    }

    createResultCard(item) {
        const title = `${item.grade}º Ano - ${item.school} - ${item.subject_name || this.getSubjectName(item.subject)}`;
        const description = `${item.school_variation ? 'Turma: ' + item.school_variation + ' | ' : ''}Programa: ${item.program}`;
        
        return `
            <div class="result-card" data-image-path="${item.image_path}" data-title="${title}" data-description="${description}">
                <div class="result-image-container">
                    <img src="${item.image_path}" alt="${title}" class="result-image" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZWNmMGYxIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzdmOGM4ZCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkdyw6FmaWNvIG7Do28gZGlzcG9uw612ZWw8L3RleHQ+PC9zdmc+'">
                    <div class="image-overlay">
                        <i class="fas fa-search-plus"></i>
                    </div>
                </div>
                <div class="result-content">
                    <h3 class="result-title">${title}</h3>
                    <div class="result-stats">
                        <div class="result-stat">
                            <div class="result-stat-value">${item.average}</div>
                            <div class="result-stat-label">Média</div>
                        </div>
                        <div class="result-stat">
                            <div class="result-stat-value">${item.students}</div>
                            <div class="result-stat-label">Alunos</div>
                        </div>
                    </div>
                    <div class="result-performance">
                        <span class="performance-badge performance-${item.performance}">
                            <i class="fas fa-${this.getPerformanceIcon(item.performance)}"></i>
                            ${item.performance_name || this.getPerformanceName(item.performance)}
                        </span>
                    </div>
                    <div class="result-meta">
                        <i class="fas fa-info-circle"></i>
                        ${description}
                    </div>
                </div>
            </div>
        `;
    }

    renderIntegratedCharts(containerId, data, type) {
        const container = document.getElementById(containerId);
        
        if (!container) return;
        
        if (data.length === 0) {
            container.innerHTML = '<div class="no-charts">Nenhum gráfico disponível para os filtros selecionados.</div>';
            return;
        }
        
        // Display first 6 charts for integrated view
        const chartsToShow = data.slice(0, 6);
        
        container.innerHTML = `
            <div class="chart-display-grid">
                ${chartsToShow.map((item, index) => `
                    <div class="integrated-chart-item" data-index="${index}">
                        <div class="chart-header">
                            <h4>${item.grade}º Ano - ${item.school} - ${item.subject_name || this.getSubjectName(item.subject)}</h4>
                            <div class="chart-stats">
                                <span class="average">Média: ${item.average}</span>
                                <span class="students">Alunos: ${item.students}</span>
                            </div>
                        </div>
                        <div class="chart-container">
                            <img src="${item.image_path}" alt="${item.grade}º Ano - ${item.school}" loading="lazy" />
                        </div>
                        <div class="chart-actions">
                            <button onclick="sadeApp.openModal('${item.image_path}', '${item.grade}º Ano - ${item.school} - ${item.subject_name || this.getSubjectName(item.subject)}')" class="view-full">
                                Ver Ampliado
                            </button>
                            <button onclick="sadeApp.downloadChart('${item.image_path}', '${item.grade}º Ano - ${item.school}')" class="download-btn">
                                Download
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
            ${data.length > 6 ? `
                <div class="show-more">
                    <button onclick="sadeApp.showAllCharts('${containerId}', '${type}')" class="show-more-btn">
                        Ver todos os ${data.length} gráficos
                    </button>
                </div>
            ` : ''}
        `;
    }

    showFilterFeedback(type, count, filters) {
        const activeFilters = Object.entries(filters)
            .filter(([key, value]) => value)
            .map(([key, value]) => `${key}: ${value}`)
            .join(', ');
        
        const feedbackId = `${type}-filter-feedback`;
        let feedbackEl = document.getElementById(feedbackId);
        
        if (!feedbackEl) {
            feedbackEl = document.createElement('div');
            feedbackEl.id = feedbackId;
            feedbackEl.className = 'filter-feedback';
            
            const filterSection = document.querySelector(`#${type}-section .filters`);
            if (filterSection) {
                filterSection.appendChild(feedbackEl);
            }
        }
        
        if (activeFilters) {
            feedbackEl.innerHTML = `
                <div class="feedback-content">
                    <span class="filter-info">Filtros ativos: ${activeFilters}</span>
                    <span class="result-count">${count} resultado(s) encontrado(s)</span>
                    <button onclick="sadeApp.clearFilters('${type}')" class="clear-filters">Limpar Filtros</button>
                </div>
            `;
            feedbackEl.style.display = 'block';
        } else {
            feedbackEl.style.display = 'none';
        }
    }

    clearFilters(type) {
        // Clear filter selects
        document.getElementById(`${type}-grade`).value = '';
        document.getElementById(`${type}-subject`).value = '';
        document.getElementById(`${type}-school`).value = '';
        
        // Hide feedback
        const feedbackEl = document.getElementById(`${type}-filter-feedback`);
        if (feedbackEl) {
            feedbackEl.style.display = 'none';
        }
        
        // Re-filter with empty values
        if (type === 'proea') {
            this.filterPROEA();
        } else {
            this.filterCNCA();
        }
    }

    showAllCharts(containerId, type) {
        const data = type === 'PROEA' ? this.data.proea : this.data.cnca;
        const container = document.getElementById(containerId);
        
        container.innerHTML = `
            <div class="chart-display-grid expanded">
                ${data.map((item, index) => `
                    <div class="integrated-chart-item" data-index="${index}">
                        <div class="chart-header">
                            <h4>${item.grade}º Ano - ${item.school} - ${item.subject_name || this.getSubjectName(item.subject)}</h4>
                            <div class="chart-stats">
                                <span class="average">Média: ${item.average}</span>
                                <span class="students">Alunos: ${item.students}</span>
                            </div>
                        </div>
                        <div class="chart-container">
                            <img src="${item.image_path}" alt="${item.grade}º Ano - ${item.school}" loading="lazy" />
                        </div>
                        <div class="chart-actions">
                            <button onclick="sadeApp.openModal('${item.image_path}', '${item.grade}º Ano - ${item.school} - ${item.subject_name || this.getSubjectName(item.subject)}')" class="view-full">
                                Ver Ampliado
                            </button>
                            <button onclick="sadeApp.downloadChart('${item.image_path}', '${item.grade}º Ano - ${item.school}')" class="download-btn">
                                Download
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="show-less">
                <button onclick="location.reload()" class="show-less-btn">
                    Mostrar menos
                </button>
            </div>
        `;
    }

    renderComparativeSection() {
        this.renderProgramComparisonChart();
        this.renderSubjectEvolutionChart();
    }

    renderProgramComparisonChart() {
        const ctx = document.getElementById('programComparisonChart');
        if (!ctx) return;

        if (this.charts.programComparison) {
            this.charts.programComparison.destroy();
        }

        const proeaAvg = this.data.proea.reduce((sum, item) => sum + item.average, 0) / this.data.proea.length;
        const cncaAvg = this.data.cnca.reduce((sum, item) => sum + item.average, 0) / this.data.cnca.length;

        this.charts.programComparison = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['PROEA (Anos Finais)', 'CNCA (Alfabetização)'],
                datasets: [{
                    label: 'Média do Programa',
                    data: [proeaAvg.toFixed(1), cncaAvg.toFixed(1)],
                    backgroundColor: ['#3498db', '#27ae60'],
                    borderColor: ['#2980b9', '#219a52'],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    }

    renderSubjectEvolutionChart() {
        const ctx = document.getElementById('subjectEvolutionChart');
        if (!ctx) return;

        if (this.charts.subjectEvolution) {
            this.charts.subjectEvolution.destroy();
        }

        const allData = [...this.data.proea, ...this.data.cnca];
        const subjects = ['LP', 'MAT', 'CN'];
        const grades = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        
        const datasets = subjects.map((subject, index) => {
            const color = ['#e74c3c', '#f39c12', '#27ae60'][index];
            const data = grades.map(grade => {
                const gradeData = allData.filter(item => item.grade === grade && item.subject === subject);
                if (gradeData.length === 0) return null;
                return (gradeData.reduce((sum, item) => sum + item.average, 0) / gradeData.length).toFixed(1);
            });
            
            return {
                label: this.getSubjectName(subject),
                data: data,
                borderColor: color,
                backgroundColor: color + '20',
                borderWidth: 2,
                fill: false
            };
        });

        this.charts.subjectEvolution = new Chart(ctx, {
            type: 'line',
            data: {
                labels: grades.map(g => `${g}º Ano`),
                datasets: datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    }

    renderSchoolsSection() {
        const schools = [...new Set([...this.data.proea, ...this.data.cnca].map(item => item.school))];
        const container = document.getElementById('schools-list');
        
        if (!container) return;
        
        container.innerHTML = schools.map(school => this.createSchoolCard(school)).join('');
    }

    createSchoolCard(schoolName) {
        const schoolData = [...this.data.proea, ...this.data.cnca].filter(item => item.school === schoolName);
        const avgPerformance = (schoolData.reduce((sum, item) => sum + item.average, 0) / schoolData.length).toFixed(1);
        const totalStudents = schoolData.reduce((sum, item) => sum + item.students, 0);
        const evaluationsCount = schoolData.length;
        
        return `
            <div class="school-card">
                <div class="school-header">
                    <div class="school-icon">
                        <i class="fas fa-school"></i>
                    </div>
                    <div class="school-name">${schoolName}</div>
                </div>
                <div class="school-stats">
                    <div class="school-stat">
                        <div class="school-stat-value">${avgPerformance}</div>
                        <div class="school-stat-label">Média</div>
                    </div>
                    <div class="school-stat">
                        <div class="school-stat-value">${totalStudents}</div>
                        <div class="school-stat-label">Alunos</div>
                    </div>
                    <div class="school-stat">
                        <div class="school-stat-value">${evaluationsCount}</div>
                        <div class="school-stat-label">Avaliações</div>
                    </div>
                </div>
            </div>
        `;
    }

    renderAllSections() {
        this.renderPROEASection();
        this.renderCNCASection();
        this.renderComparativeSection();
        this.renderSchoolsSection();
    }

    showModal(imagePath, title, description) {
        const modal = document.getElementById('imageModal');
        const modalImage = document.getElementById('modalImage');
        const modalTitle = document.getElementById('modalTitle');
        const modalDescription = document.getElementById('modalDescription');
        
        modalImage.src = imagePath;
        modalTitle.textContent = title;
        modalDescription.textContent = description;
        
        modal.style.display = 'block';
    }

    getSubjectName(code) {
        const subjects = {
            'LP': 'Língua Portuguesa',
            'MAT': 'Matemática',
            'CN': 'Ciências Naturais'
        };
        return subjects[code] || code;
    }

    getPerformanceName(level) {
        const levels = {
            'excellent': 'Excelente',
            'good': 'Bom',
            'average': 'Regular',
            'poor': 'Insuficiente'
        };
        return levels[level] || level;
    }

    getPerformanceIcon(level) {
        const icons = {
            'excellent': 'star',
            'good': 'thumbs-up',
            'average': 'minus-circle',
            'poor': 'exclamation-triangle'
        };
        return icons[level] || 'info-circle';
    }
}

// Initialize the system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SADESystem();
});
