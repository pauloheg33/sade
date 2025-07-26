// SADE - Sistema de Avaliação e Desempenho Escolar
// Arquivo de Configuração
// Secretaria da Educação de Ararendá

/**
 * SADE v4.1.0 Configuration File
 * Otimizado para GitHub Pages
 * Secretaria da Educação de Ararendá - CE
 */

const CONFIG = {
    // Application Info
    APP_NAME: 'SADE',
    APP_VERSION: '4.1.0',
    APP_DESCRIPTION: 'Sistema de Avaliação e Desempenho Escolar',
    DEVELOPER: 'Paulo Henrique',
    ORGANIZATION: 'Secretaria da Educação de Ararendá - CE',
    
    // GitHub Pages Configuration
    BASE_URL: 'https://pauloheg33.github.io/sade/',
    REPO_URL: 'https://github.com/pauloheg33/sade',
    
    // UI Theme Configuration
    THEME: {
        PRIMARY: '#2563eb',
        SECONDARY: '#1e40af', 
        SUCCESS: '#16a34a',
        WARNING: '#f97316',
        DANGER: '#ef4444',
        LIGHT: '#f8fafc',
        DARK: '#1e293b'
    },
    
    // Performance Levels
    PERFORMANCE_LEVELS: {
        EXCELLENT: { min: 90, max: 100, color: '#10b981', label: 'Excelente', badge: 'success' },
        GOOD: { min: 80, max: 89, color: '#3b82f6', label: 'Bom', badge: 'primary' },
        SATISFACTORY: { min: 70, max: 79, color: '#f59e0b', label: 'Satisfatório', badge: 'warning' },
        NEEDS_IMPROVEMENT: { min: 60, max: 69, color: '#ef4444', label: 'Precisa Melhorar', badge: 'danger' },
        UNSATISFACTORY: { min: 0, max: 59, color: '#dc2626', label: 'Insatisfatório', badge: 'dark' }
    },
    
    // Subjects Configuration
    SUBJECTS: {
        'LP': {
            name: 'Língua Portuguesa',
            fullName: 'Língua Portuguesa',
            color: '#3b82f6',
            icon: 'fas fa-book-open',
            description: 'Avaliação de competências em leitura, escrita e interpretação'
        },
        'MAT': {
            name: 'Matemática',
            fullName: 'Matemática',
            color: '#ef4444',
            icon: 'fas fa-calculator',
            description: 'Avaliação de competências matemáticas e raciocínio lógico'
        },
        'CN': {
            name: 'Ciências da Natureza',
            fullName: 'Ciências da Natureza',
            color: '#10b981',
            icon: 'fas fa-flask',
            description: 'Avaliação de conhecimentos científicos e naturais'
        }
    },
    
    // Programs Configuration
    PROGRAMS: {
        'PROEA': {
            name: 'PROEA',
            fullName: 'Avaliação das Aprendizagens dos Anos Finais',
            description: 'Programa de avaliação para 6º ao 9º ano do Ensino Fundamental',
            grades: ['6º_ano', '7º_ano', '8º_ano', '9º_ano'],
            gradeLabels: ['6º Ano', '7º Ano', '8º Ano', '9º Ano'],
            color: '#3b82f6',
            icon: 'fas fa-graduation-cap'
        },
        'CNCA': {
            name: 'CNCA',
            fullName: 'Compromisso Criança Alfabetizada',
            description: 'Programa de avaliação para 1º ao 5º ano do Ensino Fundamental',
            grades: ['1º_ano', '2º_ano', '3º_ano', '4º_ano', '5º_ano'],
            gradeLabels: ['1º Ano', '2º Ano', '3º Ano', '4º Ano', '5º Ano'],
            color: '#10b981',
            icon: 'fas fa-child'
        }
    },
    
    // Modern UI Libraries Configuration
    LIBRARIES: {
        BOOTSTRAP: '5.3.0',
        JQUERY: '3.7.0',
        SELECT2: '4.1.0-rc.0',
        FANCYBOX: '5.0',
        CHARTJS: '4.4.0',
        FONTAWESOME: '6.0.0'
    },
    
    // Gallery Configuration
    GALLERY: {
        ITEMS_PER_PAGE: 24,
        THUMBNAIL_SIZE: { width: 300, height: 200 },
        LAZY_LOADING: true,
        FANCYBOX_SETTINGS: {
            groupAll: true,
            autoFocus: true,
            trapFocus: true,
            placeFocusBack: true,
            preventCaptionOverlap: true
        }
    },
    
    // Filter Configuration
    FILTERS: {
        DEBOUNCE_DELAY: 300,
        AUTO_APPLY: true,
        SHOW_ACTIVE_FILTERS: true,
        PERSISTENT_STATE: false
    },
    
    // Chart Configuration
    CHARTS: {
        DEFAULT_HEIGHT: 400,
        RESPONSIVE: true,
        MAINTAIN_ASPECT_RATIO: false,
        COLORS: {
            PRIMARY: '#2563eb',
            SECONDARY: '#64748b',
            SUCCESS: '#059669',
            WARNING: '#d97706',
            DANGER: '#dc2626',
            INFO: '#0891b2'
        },
        ANIMATION: {
            DURATION: 750,
            EASING: 'easeInOutQuart'
        }
    },
    
    // System Settings
    SETTINGS: {
        ANIMATION_DURATION: 300,
        LOADING_TIMEOUT: 1000,
        MAX_RETRY_ATTEMPTS: 3,
        ENABLE_DEBUG: true,
        CONSOLE_LOGS: true,
        ERROR_REPORTING: true
    },
    
    // API/Data Configuration
    DATA: {
        IMAGE_BASE_PATH: 'data/',
        FALLBACK_IMAGE: 'assets/no-image.png',
        LAZY_LOAD_IMAGES: true,
        CACHE_ENABLED: false
    },
    
    // GitHub Pages Configuration
    GITHUB_PAGES: {
        ENABLED: true,
        BASE_URL: 'https://pauloheg33.github.io/sade/',
        ENCODING: {
            SPECIAL_CHARS: true,
            URL_ENCODE: true
        }
    },
    
    // Responsive Breakpoints
    BREAKPOINTS: {
        SM: 576,
        MD: 768,
        LG: 992,
        XL: 1200,
        XXL: 1400
    }
};

// Utility Functions
CONFIG.UTILS = {
    getPerformanceLevel: (score) => {
        for (const [key, level] of Object.entries(CONFIG.PERFORMANCE_LEVELS)) {
            if (score >= level.min && score <= level.max) {
                return { key, ...level };
            }
        }
        return { key: 'UNSATISFACTORY', ...CONFIG.PERFORMANCE_LEVELS.UNSATISFACTORY };
    },
    
    getSubjectInfo: (code) => CONFIG.SUBJECTS[code] || { name: code, color: '#6b7280', icon: 'fas fa-question' },
    
    getProgramInfo: (code) => CONFIG.PROGRAMS[code] || { name: code, color: '#6b7280' },
    
    formatGrade: (grade) => {
        return grade.replace('_', ' ').replace(/(\d+)/, '$1º').replace('ano', 'Ano');
    },
    
    encodeForUrl: (str) => {
        if (!CONFIG.GITHUB_PAGES.ENCODING.URL_ENCODE) return str;
        return str
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
};

// Debug Information
if (CONFIG.SETTINGS.ENABLE_DEBUG) {
    console.log(`🚀 ${CONFIG.APP_NAME} v${CONFIG.APP_VERSION} - ${CONFIG.APP_DESCRIPTION}`);
    console.log(`👨‍💻 Desenvolvido por ${CONFIG.DEVELOPER}`);
    console.log(`🏛️ ${CONFIG.ORGANIZATION}`);
    console.log('📋 Configuração carregada:', CONFIG);
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}

// Função utilitária para obter configurações
const getConfig = (path) => {
    return path.split('.').reduce((obj, key) => obj?.[key], SADE_CONFIG);
};

// Exportar para uso global
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SADE_CONFIG;
}
