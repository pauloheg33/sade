// Dados das avaliações AVALIE CE CICLO II
// Extraídos dos nomes dos arquivos de imagem

const avalieCeData = {
    // Dados extraídos dos gráficos individuais
    avaliacoes: [
        // 03 DE DEZEMBRO
        { escola: "03 DE DEZEMBRO", ano: "2º", turma: "A", disciplina: "LP", media: 73.5 },
        { escola: "03 DE DEZEMBRO", ano: "2º", turma: "A", disciplina: "MAT", media: 73.0 },
        { escola: "03 DE DEZEMBRO", ano: "4º", turma: "A", disciplina: "GERAL", media: 75.0 },
        { escola: "03 DE DEZEMBRO", ano: "5º", turma: "A", disciplina: "GERAL", media: 74.9 },
        { escola: "03 DE DEZEMBRO", ano: "8º", turma: "A", disciplina: "GERAL", media: 75.1 },
        { escola: "03 DE DEZEMBRO", ano: "9º", turma: "A", disciplina: "GERAL", media: 74.4 },

        // 21 DE DEZEMBRO
        { escola: "21 DE DEZEMBRO", ano: "8º", turma: "A", disciplina: "GERAL", media: 64.3 },
        { escola: "21 DE DEZEMBRO", ano: "8º", turma: "B", disciplina: "GERAL", media: 66.1 },
        { escola: "21 DE DEZEMBRO", ano: "8º", turma: "C", disciplina: "GERAL", media: 62.7 },
        { escola: "21 DE DEZEMBRO", ano: "9º", turma: "A", disciplina: "GERAL", media: 68.4 },
        { escola: "21 DE DEZEMBRO", ano: "9º", turma: "B", disciplina: "GERAL", media: 65.6 },
        { escola: "21 DE DEZEMBRO", ano: "9º", turma: "C", disciplina: "GERAL", media: 66.9 },

        // ANTONIO DE SOUSA BARROS
        { escola: "ANTONIO DE SOUSA BARROS", ano: "2º", turma: "", disciplina: "LP", media: 67.3 },
        { escola: "ANTONIO DE SOUSA BARROS", ano: "2º", turma: "", disciplina: "MAT", media: 66.5 },
        { escola: "ANTONIO DE SOUSA BARROS", ano: "4º", turma: "", disciplina: "GERAL", media: 69.4 },
        { escola: "ANTONIO DE SOUSA BARROS", ano: "5º", turma: "", disciplina: "GERAL", media: 71.0 },
        { escola: "ANTONIO DE SOUSA BARROS", ano: "8º", turma: "A", disciplina: "GERAL", media: 71.1 },
        { escola: "ANTONIO DE SOUSA BARROS", ano: "9º", turma: "A", disciplina: "GERAL", media: 71.2 },

        // FIRMINO JOSÉ
        { escola: "FIRMINO JOSÉ", ano: "2º", turma: "A", disciplina: "LP", media: 73.5 },
        { escola: "FIRMINO JOSÉ", ano: "2º", turma: "A", disciplina: "MAT", media: 70.7 },
        { escola: "FIRMINO JOSÉ", ano: "2º", turma: "B", disciplina: "LP", media: 72.8 },
        { escola: "FIRMINO JOSÉ", ano: "2º", turma: "B", disciplina: "MAT", media: 69.7 },
        { escola: "FIRMINO JOSÉ", ano: "4º", turma: "A", disciplina: "GERAL", media: 73.6 },
        { escola: "FIRMINO JOSÉ", ano: "4º", turma: "B", disciplina: "GERAL", media: 72.9 },
        { escola: "FIRMINO JOSÉ", ano: "5º", turma: "A", disciplina: "GERAL", media: 73.2 },
        { escola: "FIRMINO JOSÉ", ano: "5º", turma: "B", disciplina: "GERAL", media: 71.3 },
        { escola: "FIRMINO JOSÉ", ano: "8º", turma: "A", disciplina: "GERAL", media: 73.7 },
        { escola: "FIRMINO JOSÉ", ano: "8º", turma: "B", disciplina: "GERAL", media: 68.9 },
        { escola: "FIRMINO JOSÉ", ano: "9º", turma: "A", disciplina: "GERAL", media: 73.4 },
        { escola: "FIRMINO JOSÉ", ano: "9º", turma: "B", disciplina: "GERAL", media: 73.2 },

        // JOAQUIM FERREIRA
        { escola: "JOAQUIM FERREIRA", ano: "2º", turma: "A", disciplina: "LP", media: 64.0 },
        { escola: "JOAQUIM FERREIRA", ano: "2º", turma: "A", disciplina: "MAT", media: 62.7 },
        { escola: "JOAQUIM FERREIRA", ano: "4º", turma: "A", disciplina: "GERAL", media: 64.5 },
        { escola: "JOAQUIM FERREIRA", ano: "5º", turma: "A", disciplina: "GERAL", media: 63.2 },

        // JOSE ALVES DE SENA
        { escola: "JOSE ALVES DE SENA", ano: "2º", turma: "A", disciplina: "LP", media: 58.3 },
        { escola: "JOSE ALVES DE SENA", ano: "2º", turma: "A", disciplina: "MAT", media: 59.8 },
        { escola: "JOSE ALVES DE SENA", ano: "4º", turma: "A", disciplina: "GERAL", media: 63.2 },
        { escola: "JOSE ALVES DE SENA", ano: "5º", turma: "A", disciplina: "GERAL", media: 59.9 },
        { escola: "JOSE ALVES DE SENA", ano: "8º", turma: "A", disciplina: "GERAL", media: 63.5 },
        { escola: "JOSE ALVES DE SENA", ano: "8º", turma: "B", disciplina: "GERAL", media: 64.7 },
        { escola: "JOSE ALVES DE SENA", ano: "9º", turma: "A", disciplina: "GERAL", media: 61.9 },

        // MARIA AMELIA
        { escola: "MARIA AMELIA", ano: "2º", turma: "", disciplina: "LP", media: 67.3 },
        { escola: "MARIA AMELIA", ano: "2º", turma: "", disciplina: "MAT", media: 67.0 },
        { escola: "MARIA AMELIA", ano: "4º", turma: "", disciplina: "GERAL", media: 65.2 },
        { escola: "MARIA AMELIA", ano: "5º", turma: "", disciplina: "GERAL", media: 65.4 },

        // MOURÃO LIMA
        { escola: "MOURÃO LIMA", ano: "2º", turma: "A", disciplina: "LP", media: 56.1 },
        { escola: "MOURÃO LIMA", ano: "2º", turma: "A", disciplina: "MAT", media: 55.8 },
        { escola: "MOURÃO LIMA", ano: "2º", turma: "B", disciplina: "LP", media: 56.6 },
        { escola: "MOURÃO LIMA", ano: "2º", turma: "B", disciplina: "MAT", media: 57.0 },
        { escola: "MOURÃO LIMA", ano: "4º", turma: "A", disciplina: "GERAL", media: 61.5 },
        { escola: "MOURÃO LIMA", ano: "4º", turma: "B", disciplina: "GERAL", media: 60.1 },
        { escola: "MOURÃO LIMA", ano: "5º", turma: "A", disciplina: "GERAL", media: 59.7 },
        { escola: "MOURÃO LIMA", ano: "5º", turma: "B", disciplina: "GERAL", media: 58.7 }
    ],

    // Metadados
    metadata: {
        nomeAvaliacao: "AVALIE CE - CICLO II",
        descricao: "Avaliação Diagnóstica do Estado do Ceará - Ensino Fundamental",
        anosAvaliados: ["2º", "4º", "5º", "8º", "9º"],
        disciplinas: ["Língua Portuguesa", "Matemática"],
        totalTurmas: 0, // será calculado dinamicamente
        totalEscolas: 0, // será calculado dinamicamente
        mediaGeral: 0 // será calculado dinamicamente
    },

    // Configurações de desempenho
    niveis: {
        critico: { min: 0, max: 50, cor: "#dc3545", label: "Crítico" },
        baixo: { min: 50, max: 60, cor: "#fd7e14", label: "Baixo" },
        adequado: { min: 60, max: 70, cor: "#ffc107", label: "Adequado" },
        avancado: { min: 70, max: 100, cor: "#28a745", label: "Avançado" }
    }
};

// Funções auxiliares para processamento dos dados
const AvalieCeProcessor = {
    init() {
        this.calcularMetadados();
        this.gerarEstatisticas();
    },

    calcularMetadados() {
        const data = avalieCeData.avaliacoes;
        
        // Calcular totais únicos
        const escolas = [...new Set(data.map(item => item.escola))];
        const turmas = data.length;
        const mediaGeral = data.reduce((acc, item) => acc + item.media, 0) / data.length;

        avalieCeData.metadata.totalEscolas = escolas.length;
        avalieCeData.metadata.totalTurmas = turmas;
        avalieCeData.metadata.mediaGeral = Math.round(mediaGeral * 10) / 10;
    },

    gerarEstatisticas() {
        const data = avalieCeData.avaliacoes;
        
        // Estatísticas por ano escolar
        const porAno = data.reduce((acc, item) => {
            if (!acc[item.ano]) acc[item.ano] = [];
            acc[item.ano].push(item.media);
            return acc;
        }, {});

        // Estatísticas por escola
        const porEscola = data.reduce((acc, item) => {
            if (!acc[item.escola]) acc[item.escola] = [];
            acc[item.escola].push(item.media);
            return acc;
        }, {});

        // Distribuição por níveis de desempenho
        const distribuicao = data.reduce((acc, item) => {
            const nivel = this.determinarNivel(item.media);
            acc[nivel] = (acc[nivel] || 0) + 1;
            return acc;
        }, {});

        return {
            porAno: Object.keys(porAno).map(ano => ({
                ano,
                media: Math.round(porAno[ano].reduce((a, b) => a + b, 0) / porAno[ano].length * 10) / 10,
                total: porAno[ano].length
            })),
            porEscola: Object.keys(porEscola).map(escola => ({
                escola,
                media: Math.round(porEscola[escola].reduce((a, b) => a + b, 0) / porEscola[escola].length * 10) / 10,
                total: porEscola[escola].length
            })),
            distribuicao
        };
    },

    determinarNivel(media) {
        const niveis = avalieCeData.niveis;
        if (media < niveis.baixo.min) return 'critico';
        if (media < niveis.adequado.min) return 'baixo';
        if (media < niveis.avancado.min) return 'adequado';
        return 'avancado';
    },

    filtrarDados(filtros = {}) {
        let dados = avalieCeData.avaliacoes;

        if (filtros.escola) {
            dados = dados.filter(item => item.escola.toLowerCase().includes(filtros.escola.toLowerCase()));
        }

        if (filtros.ano) {
            dados = dados.filter(item => item.ano === filtros.ano);
        }

        if (filtros.disciplina && filtros.disciplina !== 'TODAS') {
            dados = dados.filter(item => item.disciplina === filtros.disciplina);
        }

        if (filtros.nivel) {
            dados = dados.filter(item => this.determinarNivel(item.media) === filtros.nivel);
        }

        return dados;
    },

    ordenarDados(dados, criterio = 'escola') {
        switch (criterio) {
            case 'media-desc':
                return dados.sort((a, b) => b.media - a.media);
            case 'media-asc':
                return dados.sort((a, b) => a.media - b.media);
            case 'escola':
                return dados.sort((a, b) => a.escola.localeCompare(b.escola));
            case 'ano':
                return dados.sort((a, b) => a.ano.localeCompare(b.ano));
            default:
                return dados;
        }
    }
};

// Inicializar processador
AvalieCeProcessor.init();

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.avalieCeData = avalieCeData;
    window.AvalieCeProcessor = AvalieCeProcessor;
}
