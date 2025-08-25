// Script para extrair dados dos arquivos de análises
const fs = require('fs');
const path = require('path');

function parseCorrelacaoFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    
    // Extrair informações do cabeçalho
    let caderno = '';
    let disciplina = '';
    let ano = '';
    
    for (let line of lines) {
        if (line.includes('CADERNO')) {
            caderno = line.match(/CADERNO (\w+)/)?.[1] || '';
        }
        if (line.includes('LÍNGUA PORTUGUESA')) {
            disciplina = 'Português';
            ano = line.match(/(\d+)º ano/)?.[1] || '';
        }
        if (line.includes('MATEMÁTICA')) {
            disciplina = 'Matemática';
            ano = line.match(/(\d+)º ano/)?.[1] || '';
        }
    }
    
    // Extrair questões e descritores
    const questoes = [];
    const descritores = new Map();
    
    let currentQuestion = null;
    let questionNumber = 0;
    
    for (let line of lines) {
        line = line.trim();
        
        // Identificar questão
        const questionMatch = line.match(/^(\d+)\) \(([^)]+)\)/);
        if (questionMatch) {
            questionNumber = parseInt(questionMatch[1]);
            const codigo = questionMatch[2];
            currentQuestion = {
                numero: questionNumber,
                codigo: codigo,
                texto: line
            };
        }
        
        // Identificar descritor
        const descriptorMatch = line.match(/Descritor: (D\d+_[PM]) - (.+)/);
        if (descriptorMatch && currentQuestion) {
            const descriptorCode = descriptorMatch[1];
            const descriptorName = descriptorMatch[2];
            
            currentQuestion.descritor = {
                codigo: descriptorCode,
                nome: descriptorName
            };
            
            questoes.push(currentQuestion);
            
            // Contar descritores
            if (descritores.has(descriptorCode)) {
                descritores.get(descriptorCode).questoes++;
            } else {
                descritores.set(descriptorCode, {
                    nome: descriptorName,
                    questoes: 1
                });
            }
            
            currentQuestion = null;
        }
    }
    
    // Converter map para objeto e calcular percentuais
    const descriptoresObj = {};
    const totalQuestoes = questoes.length;
    
    for (let [codigo, info] of descritores) {
        descriptoresObj[codigo] = {
            nome: info.nome,
            questoes: info.questoes,
            percentual: parseFloat(((info.questoes / totalQuestoes) * 100).toFixed(1))
        };
    }
    
    return {
        caderno,
        disciplina,
        ano,
        totalQuestoes,
        questoes,
        descritores: descriptoresObj
    };
}

// Processar todos os arquivos
const analysesDir = 'C:/Users/paulo/OneDrive/Desktop/SADE/sade/habilidades/analises';
const files = fs.readdirSync(analysesDir);

const dadosAV2 = {
    escolas: [], // Não utilizado para AV2
    anos: [],
    materias: ['Português', 'Matemática'],
    resultados: {}
};

files.forEach(file => {
    if (file.startsWith('correlacao_questoes_descritores_')) {
        const filePath = path.join(analysesDir, file);
        const data = parseCorrelacaoFile(filePath);
        
        if (!dadosAV2.anos.includes(`${data.ano}º`)) {
            dadosAV2.anos.push(`${data.ano}º`);
        }
        
        if (!dadosAV2.resultados[`${data.ano}º`]) {
            dadosAV2.resultados[`${data.ano}º`] = {};
        }
        
        dadosAV2.resultados[`${data.ano}º`][data.disciplina] = {
            caderno: data.caderno,
            totalQuestoes: data.totalQuestoes,
            descritores: data.descritores,
            questoes: data.questoes
        };
    }
});

// Ordenar anos
dadosAV2.anos.sort((a, b) => parseInt(a) - parseInt(b));

console.log('Dados processados:', JSON.stringify(dadosAV2, null, 2));
