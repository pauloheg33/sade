/**
 * SADE - Sistema de Avaliação e Desempenho Educacional
 * Funcionalidades JavaScript
 */

// ==========================================================================
// CONFIGURAÇÕES GLOBAIS
// ==========================================================================
const SADE = {
    config: {
        apiUrl: window.location.origin,
        refreshInterval: 30000, // 30 segundos
        chartColors: [
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 99, 132, 0.8)',
            'rgba(255, 205, 86, 0.8)',
            'rgba(75, 192, 192, 0.8)',
            'rgba(153, 102, 255, 0.8)',
            'rgba(255, 159, 64, 0.8)'
        ],
        animations: {
            fadeIn: 'fadeIn 0.6s ease-out',
            slideIn: 'slideIn 0.6s ease-out',
            pulse: 'pulse 2s infinite'
        }
    },
    
    // Utilitários
    utils: {},
    
    // Componentes
    components: {},
    
    // Dados em tempo real
    realTime: {},
    
    // Gráficos
    charts: {}
};

// ==========================================================================
// UTILITÁRIOS
// ==========================================================================
SADE.utils = {
    /**
     * Formatar números
     */
    formatNumber: function(num, decimals = 0) {
        return new Intl.NumberFormat('pt-BR', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        }).format(num);
    },
    
    /**
     * Formatar porcentagem
     */
    formatPercent: function(num, decimals = 1) {
        return this.formatNumber(num, decimals) + '%';
    },
    
    /**
     * Formatar data
     */
    formatDate: function(date, format = 'short') {
        const options = {
            short: { day: '2-digit', month: '2-digit', year: 'numeric' },
            long: { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            },
            time: { 
                hour: '2-digit', 
                minute: '2-digit',
                day: '2-digit', 
                month: '2-digit', 
                year: 'numeric'
            }
        };
        
        return new Intl.DateTimeFormat('pt-BR', options[format]).format(new Date(date));
    },
    
    /**
     * Debounce function
     */
    debounce: function(func, wait, immediate) {
        let timeout;
        return function executedFunction() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    },
    
    /**
     * Requisições AJAX
     */
    ajax: async function(url, options = {}) {
        const defaultOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        };
        
        const config = { ...defaultOptions, ...options };
        
        try {
            const response = await fetch(url, config);
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || 'Erro na requisição');
            }
            
            return data;
        } catch (error) {
            console.error('Erro AJAX:', error);
            throw error;
        }
    },
    
    /**
     * Mostrar notificação
     */
    showNotification: function(message, type = 'info', duration = 5000) {
        const notification = document.createElement('div');
        notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
        notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
        
        const icons = {
            success: 'fas fa-check-circle',
            danger: 'fas fa-exclamation-triangle',
            warning: 'fas fa-exclamation-circle',
            info: 'fas fa-info-circle'
        };
        
        notification.innerHTML = `
            <i class="${icons[type]} me-2"></i>
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(notification);
        
        // Auto-remover
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, duration);
    },
    
    /**
     * Loading overlay
     */
    showLoading: function(element) {
        const overlay = document.createElement('div');
        overlay.className = 'loading-overlay position-absolute w-100 h-100 d-flex align-items-center justify-content-center';
        overlay.style.cssText = 'top: 0; left: 0; background: rgba(255,255,255,0.8); z-index: 1000;';
        overlay.innerHTML = `
            <div class="text-center">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Carregando...</span>
                </div>
                <div class="mt-2">Carregando...</div>
            </div>
        `;
        
        element.style.position = 'relative';
        element.appendChild(overlay);
        
        return overlay;
    },
    
    hideLoading: function(element) {
        const overlay = element.querySelector('.loading-overlay');
        if (overlay) {
            overlay.remove();
        }
    }
};

// ==========================================================================
// COMPONENTES
// ==========================================================================
SADE.components = {
    /**
     * Inicializar tooltips
     */
    initTooltips: function() {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function(tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    },
    
    /**
     * Inicializar popovers
     */
    initPopovers: function() {
        const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
        popoverTriggerList.map(function(popoverTriggerEl) {
            return new bootstrap.Popover(popoverTriggerEl);
        });
    },
    
    /**
     * Contador animado
     */
    animateCounter: function(element, start = 0, end, duration = 2000) {
        const range = end - start;
        const increment = end > start ? 1 : -1;
        const stepTime = Math.abs(Math.floor(duration / range));
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            element.textContent = SADE.utils.formatNumber(current);
            
            if (current === end) {
                clearInterval(timer);
            }
        }, stepTime);
    },
    
    /**
     * Validação de formulários
     */
    validateForm: function(form) {
        const inputs = form.querySelectorAll('input, select, textarea');
        let isValid = true;
        
        inputs.forEach(input => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                input.classList.add('is-invalid');
                isValid = false;
            } else {
                input.classList.remove('is-invalid');
                input.classList.add('is-valid');
            }
            
            // Validações específicas
            if (input.type === 'email' && input.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value)) {
                    input.classList.add('is-invalid');
                    isValid = false;
                }
            }
            
            if (input.type === 'file' && input.hasAttribute('required')) {
                if (!input.files.length) {
                    input.classList.add('is-invalid');
                    isValid = false;
                }
            }
        });
        
        return isValid;
    },
    
    /**
     * Progress bar animada
     */
    animateProgressBar: function(progressBar, targetPercent, duration = 1000) {
        let currentPercent = 0;
        const increment = targetPercent / (duration / 16); // 60fps
        
        const animate = () => {
            currentPercent += increment;
            if (currentPercent >= targetPercent) {
                currentPercent = targetPercent;
            }
            
            progressBar.style.width = currentPercent + '%';
            progressBar.setAttribute('aria-valuenow', Math.round(currentPercent));
            
            if (currentPercent < targetPercent) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }
};

// ==========================================================================
// DADOS EM TEMPO REAL
// ==========================================================================
SADE.realTime = {
    /**
     * Atualizar estatísticas
     */
    updateStats: async function() {
        try {
            const data = await SADE.utils.ajax('/api/stats.php');
            
            // Atualizar cards de estatísticas
            document.querySelectorAll('[data-stat]').forEach(element => {
                const stat = element.dataset.stat;
                if (data[stat] !== undefined) {
                    const newValue = data[stat];
                    const currentValue = parseInt(element.textContent.replace(/\D/g, ''));
                    
                    if (newValue !== currentValue) {
                        SADE.components.animateCounter(element, currentValue, newValue);
                    }
                }
            });
            
        } catch (error) {
            console.error('Erro ao atualizar estatísticas:', error);
        }
    },
    
    /**
     * Verificar novos uploads
     */
    checkNewUploads: async function() {
        try {
            const data = await SADE.utils.ajax('/api/uploads.php?recent=true');
            
            if (data.hasNew) {
                SADE.utils.showNotification(
                    `${data.count} novo(s) upload(s) processado(s)!`,
                    'success'
                );
                
                // Atualizar lista de uploads
                this.updateUploadsList(data.uploads);
            }
            
        } catch (error) {
            console.error('Erro ao verificar uploads:', error);
        }
    },
    
    /**
     * Atualizar lista de uploads
     */
    updateUploadsList: function(uploads) {
        const container = document.querySelector('#uploadsRecentes');
        if (!container) return;
        
        container.innerHTML = '';
        
        uploads.forEach(upload => {
            const item = document.createElement('div');
            item.className = 'upload-item d-flex align-items-center mb-3 fade-in';
            item.innerHTML = `
                <div class="me-3">
                    <i class="fas fa-file-csv fa-lg text-success"></i>
                </div>
                <div class="flex-grow-1">
                    <h6 class="mb-1 small">${upload.nome}</h6>
                    <small class="text-muted">${SADE.utils.formatDate(upload.created_at, 'time')}</small>
                </div>
                <div>
                    <span class="badge bg-${upload.status === 'processado' ? 'success' : 'warning'}">
                        ${upload.status}
                    </span>
                </div>
            `;
            
            container.appendChild(item);
        });
    }
};

// ==========================================================================
// GRÁFICOS
// ==========================================================================
SADE.charts = {
    /**
     * Configurações padrão do Chart.js
     */
    defaultConfig: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    padding: 20,
                    usePointStyle: true
                }
            }
        },
        animation: {
            duration: 2000,
            easing: 'easeInOutQuart'
        }
    },
    
    /**
     * Criar gráfico de barras
     */
    createBarChart: function(ctx, data, options = {}) {
        const config = {
            type: 'bar',
            data: {
                labels: data.labels,
                datasets: [{
                    label: data.label || 'Dados',
                    data: data.values,
                    backgroundColor: SADE.config.chartColors,
                    borderColor: SADE.config.chartColors.map(color => color.replace('0.8', '1')),
                    borderWidth: 2,
                    borderRadius: 8
                }]
            },
            options: {
                ...this.defaultConfig,
                ...options,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return value + (data.suffix || '');
                            }
                        }
                    }
                }
            }
        };
        
        return new Chart(ctx, config);
    },
    
    /**
     * Criar gráfico de linha
     */
    createLineChart: function(ctx, data, options = {}) {
        const config = {
            type: 'line',
            data: {
                labels: data.labels,
                datasets: data.datasets || [{
                    label: data.label || 'Dados',
                    data: data.values,
                    borderColor: SADE.config.chartColors[0],
                    backgroundColor: SADE.config.chartColors[0].replace('0.8', '0.2'),
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                ...this.defaultConfig,
                ...options
            }
        };
        
        return new Chart(ctx, config);
    },
    
    /**
     * Criar gráfico de pizza
     */
    createPieChart: function(ctx, data, options = {}) {
        const config = {
            type: 'doughnut',
            data: {
                labels: data.labels,
                datasets: [{
                    data: data.values,
                    backgroundColor: SADE.config.chartColors,
                    borderWidth: 3,
                    borderColor: '#fff'
                }]
            },
            options: {
                ...this.defaultConfig,
                ...options,
                cutout: '60%'
            }
        };
        
        return new Chart(ctx, config);
    },
    
    /**
     * Atualizar dados do gráfico
     */
    updateChart: function(chart, newData) {
        chart.data.datasets[0].data = newData.values;
        if (newData.labels) {
            chart.data.labels = newData.labels;
        }
        chart.update();
    }
};

// ==========================================================================
// INICIALIZAÇÃO
// ==========================================================================
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar componentes Bootstrap
    SADE.components.initTooltips();
    SADE.components.initPopovers();
    
    // Animar contadores nas páginas
    document.querySelectorAll('[data-counter]').forEach(element => {
        const target = parseInt(element.dataset.counter);
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    SADE.components.animateCounter(element, 0, target);
                    observer.unobserve(element);
                }
            });
        });
        observer.observe(element);
    });
    
    // Configurar formulários
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!SADE.components.validateForm(this)) {
                e.preventDefault();
                e.stopPropagation();
            }
            this.classList.add('was-validated');
        });
    });
    
    // Auto-refresh (apenas no dashboard)
    if (window.location.pathname.includes('index.php') || window.location.pathname === '/') {
        setInterval(() => {
            SADE.realTime.updateStats();
            SADE.realTime.checkNewUploads();
        }, SADE.config.refreshInterval);
    }
    
    // Configurar dropzone para upload de arquivos
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach(input => {
        const container = input.closest('.form-group, .mb-3');
        if (container) {
            container.addEventListener('dragover', function(e) {
                e.preventDefault();
                this.classList.add('dragover');
            });
            
            container.addEventListener('dragleave', function(e) {
                e.preventDefault();
                this.classList.remove('dragover');
            });
            
            container.addEventListener('drop', function(e) {
                e.preventDefault();
                this.classList.remove('dragover');
                
                const files = e.dataTransfer.files;
                if (files.length > 0) {
                    input.files = files;
                    input.dispatchEvent(new Event('change'));
                }
            });
        }
    });
    
    // Adicionar efeitos de hover nos cards
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.animation = SADE.config.animations.fadeIn;
        });
    });
    
    // Configurar teclas de atalho
    document.addEventListener('keydown', function(e) {
        // Ctrl + / = Ajuda
        if (e.ctrlKey && e.key === '/') {
            e.preventDefault();
            const helpModal = document.querySelector('#helpModal');
            if (helpModal) {
                new bootstrap.Modal(helpModal).show();
            }
        }
        
        // Ctrl + U = Upload (na página de upload)
        if (e.ctrlKey && e.key === 'u' && window.location.pathname.includes('upload.php')) {
            e.preventDefault();
            document.querySelector('#csv_file')?.click();
        }
    });
});

// ==========================================================================
// FUNÇÕES GLOBAIS PARA COMPATIBILIDADE
// ==========================================================================

/**
 * Atualizar dados em tempo real (chamada do HTML)
 */
function updateRealTimeData() {
    SADE.realTime.updateStats();
    SADE.realTime.checkNewUploads();
}

/**
 * Mostrar loading em botão
 */
function showButtonLoading(button, text = 'Carregando...') {
    const originalText = button.innerHTML;
    button.disabled = true;
    button.innerHTML = `
        <span class="spinner-border spinner-border-sm me-2" role="status">
            <span class="visually-hidden">Loading...</span>
        </span>
        ${text}
    `;
    
    return () => {
        button.disabled = false;
        button.innerHTML = originalText;
    };
}

/**
 * Confirmar ação
 */
function confirmAction(message, callback) {
    if (confirm(message)) {
        callback();
    }
}

/**
 * Exportar objeto SADE para uso global
 */
window.SADE = SADE;
