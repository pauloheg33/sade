
// SADE Habilidades - Funções específicas de habilidades

// Função para buscar habilidades por critério
function buscarHabilidades(criterio, valor) {
    return Object.keys(habilidadesData).filter(key => {
        const hab = habilidadesData[key];
        return hab[criterio] === valor;
    });
}

// Função para obter estatísticas detalhadas de uma habilidade
function obterEstatisticasHabilidade(habilidadeKey) {
    const hab = habilidadesData[habilidadeKey];
    if (!hab) return null;
    
    const questoesAssociadas = hab.questoes_ids.map(id => questoesData[id]).filter(Boolean);
    
    return {
        codigo: hab.codigo,
        disciplina: hab.disciplina_nome,
        ano: hab.ano,
        descricao: hab.habilidade,
        bncc: hab.bncc,
        numeroQuestoes: questoesAssociadas.length,
        mediaAcertos: hab.media_acertos,
        percentualAdequado: hab.alunos_adequado,
        classificacao: hab.classificacao,
        questoes: questoesAssociadas.map(q => ({
            numero: q.numero,
            codigo: q.codigo,
            desempenho: q.desempenho,
            acertos: q.acertos,
            totalAlunos: q.total_alunos
        }))
    };
}

// Função para obter ranking de habilidades por desempenho
function obterRankingHabilidades(filtros = {}) {
    let habilidades = Object.keys(habilidadesData);
    
    // Aplicar filtros
    if (filtros.disciplina) {
        habilidades = habilidades.filter(key => 
            habilidadesData[key].disciplina === filtros.disciplina);
    }
    
    if (filtros.ano) {
        habilidades = habilidades.filter(key => 
            habilidadesData[key].ano === filtros.ano);
    }
    
    // Ordenar por desempenho
    return habilidades
        .map(key => ({
            key,
            ...habilidadesData[key]
        }))
        .sort((a, b) => b.media_acertos - a.media_acertos);
}

// Função para obter dados para gráfico de evolução
function obterDadosEvolucao(disciplina) {
    const anos = ['6', '7', '8', '9'];
    
    return anos.map(ano => {
        const habilidadesAno = Object.keys(habilidadesData).filter(key => {
            const hab = habilidadesData[key];
            return hab.disciplina === disciplina && hab.ano === ano;
        });
        
        const mediaAno = habilidadesAno.length > 0 ?
            habilidadesAno.reduce((sum, key) => 
                sum + habilidadesData[key].media_acertos, 0) / habilidadesAno.length : 0;
        
        return {
            ano: ano + 'º Ano',
            media: Math.round(mediaAno * 100) / 100,
            totalHabilidades: habilidadesAno.length
        };
    });
}

// Função para obter habilidades com baixo desempenho
function obterHabilidadesBaixoDesempenho(limiteDesempenho = 60) {
    return Object.keys(habilidadesData)
        .filter(key => habilidadesData[key].media_acertos < limiteDesempenho)
        .map(key => ({
            key,
            ...habilidadesData[key]
        }))
        .sort((a, b) => a.media_acertos - b.media_acertos);
}

// Função para obter distribuição de habilidades por nível de desempenho
function obterDistribuicaoDesempenho() {
    const distribuicao = {
        alto: 0,    // >= 75%
        medio: 0,   // 60-74%
        baixo: 0    // < 60%
    };
    
    Object.values(habilidadesData).forEach(hab => {
        if (hab.media_acertos >= 75) distribuicao.alto++;
        else if (hab.media_acertos >= 60) distribuicao.medio++;
        else distribuicao.baixo++;
    });
    
    return distribuicao;
}

// Função para exportar dados para análise externa
function exportarDadosAnalise() {
    const dados = Object.keys(habilidadesData).map(key => {
        const hab = habilidadesData[key];
        return {
            codigo: hab.codigo,
            disciplina: hab.disciplina,
            disciplina_nome: hab.disciplina_nome,
            ano: hab.ano,
            habilidade: hab.habilidade,
            bncc: hab.bncc,
            num_questoes: hab.num_questoes || 0,
            media_acertos: hab.media_acertos,
            alunos_adequado: hab.alunos_adequado,
            classificacao: hab.classificacao
        };
    });
    
    return dados;
}

// Função para gerar insights automáticos
function gerarInsights() {
    const insights = [];
    
    // Análise por disciplina
    const disciplinas = ['LP', 'MAT', 'CN'];
    const mediasPorDisciplina = {};
    
    disciplinas.forEach(disc => {
        const habilidadesDisc = Object.values(habilidadesData)
            .filter(hab => hab.disciplina === disc);
        
        if (habilidadesDisc.length > 0) {
            const media = habilidadesDisc.reduce((sum, hab) => 
                sum + hab.media_acertos, 0) / habilidadesDisc.length;
            mediasPorDisciplina[disc] = media;
        }
    });
    
    // Disciplina com melhor/pior desempenho
    const disciplinasOrdenadas = Object.entries(mediasPorDisciplina)
        .sort(([,a], [,b]) => b - a);
    
    if (disciplinasOrdenadas.length > 0) {
        const [melhorDisc, melhorMedia] = disciplinasOrdenadas[0];
        const [piorDisc, piorMedia] = disciplinasOrdenadas[disciplinasOrdenadas.length - 1];
        
        const nomeDisc = {
            'LP': 'Língua Portuguesa',
            'MAT': 'Matemática', 
            'CN': 'Ciências da Natureza'
        };
        
        insights.push({
            tipo: 'disciplina_melhor',
            titulo: 'Melhor Desempenho por Disciplina',
            descricao: `${nomeDisc[melhorDisc]} apresenta o melhor desempenho médio com ${melhorMedia.toFixed(1)}%`,
            valor: melhorMedia,
            categoria: 'positivo'
        });
        
        if (piorDisc !== melhorDisc) {
            insights.push({
                tipo: 'disciplina_pior',
                titulo: 'Maior Oportunidade de Melhoria',
                descricao: `${nomeDisc[piorDisc]} tem potencial de melhoria com média de ${piorMedia.toFixed(1)}%`,
                valor: piorMedia,
                categoria: 'atencao'
            });
        }
    }
    
    // Análise de habilidades críticas
    const habilidadesCriticas = obterHabilidadesBaixoDesempenho(50);
    if (habilidadesCriticas.length > 0) {
        insights.push({
            tipo: 'habilidades_criticas',
            titulo: 'Habilidades Críticas',
            descricao: `${habilidadesCriticas.length} habilidade(s) com desempenho abaixo de 50%`,
            valor: habilidadesCriticas.length,
            categoria: 'critico'
        });
    }
    
    // Distribuição geral
    const distribuicao = obterDistribuicaoDesempenho();
    const total = distribuicao.alto + distribuicao.medio + distribuicao.baixo;
    
    if (total > 0) {
        const percentualAlto = (distribuicao.alto / total) * 100;
        insights.push({
            tipo: 'distribuicao_geral',
            titulo: 'Distribuição de Desempenho',
            descricao: `${percentualAlto.toFixed(1)}% das habilidades têm desempenho alto (≥75%)`,
            valor: percentualAlto,
            categoria: percentualAlto >= 60 ? 'positivo' : 'atencao'
        });
    }
    
    return insights;
}

// Tornar funções disponíveis globalmente
window.HabilidadesFunctions = {
    buscarHabilidades,
    obterEstatisticasHabilidade,
    obterRankingHabilidades,
    obterDadosEvolucao,
    obterHabilidadesBaixoDesempenho,
    obterDistribuicaoDesempenho,
    exportarDadosAnalise,
    gerarInsights
};
