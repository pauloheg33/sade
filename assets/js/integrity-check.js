/**
 * SADE - Verificador de Integridade
 * Testa se todos os componentes estão funcionando corretamente
 */

console.log('🔍 SADE - Iniciando verificação de integridade...');

// Verificar se os dados foram carregados
setTimeout(() => {
    console.log('📊 Verificando dados...');
    
    if (typeof SADE_DATA !== 'undefined') {
        console.log('✅ SADE_DATA carregado:', Object.keys(SADE_DATA));
    } else {
        console.error('❌ SADE_DATA não encontrado');
    }
    
    if (typeof sadeData !== 'undefined') {
        console.log('✅ sadeData transformado:', Object.keys(sadeData));
        if (sadeData.proea) {
            const proeaSchools = Object.keys(sadeData.proea);
            console.log(`✅ PROEA: ${proeaSchools.length} escolas encontradas:`, proeaSchools);
        }
        if (sadeData.cnca) {
            const cncaSchools = Object.keys(sadeData.cnca);
            console.log(`✅ CNCA: ${cncaSchools.length} escolas encontradas:`, cncaSchools);
        }
    } else {
        console.error('❌ sadeData não encontrado');
    }
    
    // Verificar se as funções de transformação existem
    if (typeof flattenSchoolData === 'function') {
        console.log('✅ Função flattenSchoolData disponível');
    } else {
        console.error('❌ Função flattenSchoolData não encontrada');
    }
    
    // Verificar se o CONFIG está carregado
    if (typeof CONFIG !== 'undefined') {
        console.log('✅ CONFIG carregado:', CONFIG.APP_VERSION);
    } else {
        console.error('❌ CONFIG não encontrado');
    }
    
    console.log('🎉 Verificação de integridade concluída!');
}, 1000);

// Exportar função de verificação
window.checkIntegrity = function() {
    console.log('🔍 Executando verificação manual...');
    
    const checks = {
        sadeData: typeof SADE_DATA !== 'undefined',
        transformedData: typeof sadeData !== 'undefined',
        flattenFunction: typeof flattenSchoolData === 'function',
        config: typeof CONFIG !== 'undefined',
        bootstrap: typeof bootstrap !== 'undefined',
        jquery: typeof $ !== 'undefined'
    };
    
    console.table(checks);
    
    const passed = Object.values(checks).filter(Boolean).length;
    const total = Object.keys(checks).length;
    
    console.log(`📊 Resultado: ${passed}/${total} verificações passaram`);
    
    return checks;
};
