// SADE - Sistema de Avaliação e Desempenho Escolar
// Arquivo de Configuração
// Secretaria da Educação de Ararendá

const SADE_CONFIG = {
    // Informações da Aplicação
    APP_NAME: 'SADE - Sistema de Avaliação e Desempenho Escolar',
    APP_VERSION: '3.0.0',
    ORGANIZATION: 'Secretaria da Educação de Ararendá',
    
    // Configurações de Performance
    DEBOUNCE_DELAY: 300,
    ANIMATION_DURATION: 300,
    LAZY_LOAD_THRESHOLD: 0.1,
    
    // Configurações de Dados
    SUBJECTS: {
        'LP': 'Língua Portuguesa',
        'MAT': 'Matemática',
        'CN': 'Ciências da Natureza'
    },
    
    PERFORMANCE_LEVELS: {
        'excellent': { min: 80, label: 'Excelente', color: '#22C55E' },
        'good': { min: 70, label: 'Bom', color: '#3B82F6' },
        'average': { min: 60, label: 'Regular', color: '#F59E0B' },
        'poor': { min: 0, label: 'Insuficiente', color: '#EF4444' }
    },
    
    PROGRAMS: {
        'PROEA': {
            name: 'PROEA - Avaliação dos Anos Finais',
            grades: [6, 7, 8, 9],
            subjects: ['LP', 'MAT', 'CN'],
            folder: 'AVALIAÇÃO DAS APRENDIZAGENS DOS ANOS FINAIS - PROEA'
        },
        'CNCA': {
            name: 'CNCA - Compromisso Criança Alfabetizada',
            grades: [1, 2, 3, 4, 5],
            subjects: ['LP', 'MAT'],
            folder: 'CNCA - COMPROMISSO CRIANÇA ALFABETIZADA'
        }
    },
    
    // Configurações de UI
    CHART_COLORS: [
        '#4A90E2', '#22C55E', '#F59E0B', '#EF4444', 
        '#8B5CF6', '#06B6D4', '#F97316', '#84CC16'
    ],
    
    // Configurações de Export
    EXPORT_FORMATS: ['excel', 'pdf', 'csv'],
    
    // Configurações de Cache
    CACHE_DURATION: 5 * 60 * 1000, // 5 minutos
    
    // Mensagens do Sistema
    MESSAGES: {
        LOADING: 'Carregando dados...',
        NO_DATA: 'Nenhum dado encontrado para os filtros selecionados',
        ERROR_LOAD: 'Erro ao carregar dados. Tente novamente.',
        SUCCESS_EXPORT: 'Dados exportados com sucesso!',
        ERROR_EXPORT: 'Erro ao exportar dados. Tente novamente.'
    }
};

// Função utilitária para obter configurações
const getConfig = (path) => {
    return path.split('.').reduce((obj, key) => obj?.[key], SADE_CONFIG);
};

// Exportar para uso global
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SADE_CONFIG;
}
