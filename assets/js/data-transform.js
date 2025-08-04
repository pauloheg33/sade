/**
 * SADE - Transformador de Dados
 * Converte a estrutura de dados para uso nas páginas específicas
 */

// Função para transformar dados PROEA
function transformProeaData(rawData) {
    const schools = {};
    
    if (!rawData || !rawData.PROEA) return schools;
    
    Object.entries(rawData.PROEA).forEach(([grade, gradeData]) => {
        Object.entries(gradeData).forEach(([subject, subjectData]) => {
            Object.entries(subjectData).forEach(([school, schoolItems]) => {
                if (!schools[school]) {
                    schools[school] = {};
                }
                if (!schools[school][grade]) {
                    schools[school][grade] = {};
                }
                
                // Para cada item da escola (pode ter múltiplas turmas)
                schoolItems.forEach(item => {
                    const key = item.turma ? `${subject}_${item.turma}` : subject;
                    schools[school][grade][key] = {
                        media: item.media,
                        alunos: item.alunos,
                        imagem: item.imagem,
                        turma: item.turma || null
                    };
                });
            });
        });
    });
    
    return schools;
}

// Função para transformar dados CNCA
function transformCncaData(rawData) {
    const schools = {};
    
    if (!rawData || !rawData.CNCA) return schools;
    
    Object.entries(rawData.CNCA).forEach(([grade, gradeData]) => {
        Object.entries(gradeData).forEach(([subject, subjectData]) => {
            Object.entries(subjectData).forEach(([school, schoolItems]) => {
                if (!schools[school]) {
                    schools[school] = {};
                }
                if (!schools[school][grade]) {
                    schools[school][grade] = {};
                }
                
                // Para cada item da escola (pode ter múltiplas turmas)
                schoolItems.forEach(item => {
                    const key = item.turma ? `${subject}_${item.turma}` : subject;
                    schools[school][grade][key] = {
                        media: item.media,
                        alunos: item.alunos,
                        imagem: item.imagem,
                        turma: item.turma || null
                    };
                });
            });
        });
    });
    
    return schools;
}

// Função para achatar dados para lista
function flattenSchoolData(schoolData, program) {
    const flattened = [];
    
    Object.entries(schoolData).forEach(([school, grades]) => {
        Object.entries(grades).forEach(([grade, subjects]) => {
            Object.entries(subjects).forEach(([subjectKey, data]) => {
                // Extrair subject e turma do key
                let subject, turma = null;
                if (subjectKey.includes('_') && data.turma) {
                    const parts = subjectKey.split('_');
                    subject = parts[0];
                    turma = parts.slice(1).join('_');
                } else {
                    subject = subjectKey;
                }
                
                flattened.push({
                    school: school,
                    turma: turma,
                    grade: grade,
                    subject: subject,
                    media: data.media,
                    alunos: data.alunos,
                    imagem: data.imagem
                });
            });
        });
    });
    
    return flattened;
}

// Dados transformados globais
let sadeData = {};

// Inicializar dados quando SADE_DATA estiver disponível
if (typeof SADE_DATA !== 'undefined') {
    sadeData = {
        proea: transformProeaData(SADE_DATA),
        cnca: transformCncaData(SADE_DATA)
    };
}

// Compatibilidade com versões antigas
window.sadeData = sadeData;
