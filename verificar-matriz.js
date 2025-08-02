// Script para verificar e corrigir problemas com a matriz de referência
console.log('Verificando e corrigindo a matriz de referência...');

// Verificar se matrizReferencia está definida
if (typeof matrizReferencia !== 'undefined') {
    console.log('✅ matrizReferencia está definida');
    
    // Verificar se estatisticasMatriz está definida
    if (typeof estatisticasMatriz === 'undefined') {
        console.log('⚠️ estatisticasMatriz não está definida, criando...');
        
        // Criar estatisticasMatriz se não existir
        window.estatisticasMatriz = {
            total: Object.values(matrizReferencia).reduce((total, disciplina) => 
                total + Object.values(disciplina).reduce((subTotal, ano) => subTotal + ano.length, 0), 0
            ),
            porDisciplina: Object.fromEntries(
                Object.entries(matrizReferencia).map(([disc, anos]) => [
                    disc, 
                    Object.values(anos).reduce((total, ano) => total + ano.length, 0)
                ])
            )
        };
        
        console.log('✅ estatisticasMatriz criada:', estatisticasMatriz);
    } else {
        console.log('✅ estatisticasMatriz já está definida');
    }
    
    // Adicionar função verificarMatriz ao escopo global se não existir
    if (typeof window.verificarMatriz !== 'function') {
        window.verificarMatriz = function() {
            if (typeof matrizReferencia === 'undefined') {
                alert('❌ Matriz de Referência não carregada! Verifique se o arquivo matriz-referencia-dados.js está presente.');
                return;
            }
            
            let info = '📊 INFORMAÇÕES DA MATRIZ DE REFERÊNCIA\n\n';
            info += `Total de habilidades: ${estatisticasMatriz.total}\n\n`;
            info += '📚 Por disciplina:\n';
            
            Object.entries(estatisticasMatriz.porDisciplina).forEach(([disc, total]) => {
                const disciplinaNome = {
                    'portugues_leitura': 'Português - Leitura',
                    'portugues_escrita': 'Português - Escrita', 
                    'matematica': 'Matemática',
                    'ciencias': 'Ciências da Natureza'
                }[disc] || disc;
                
                info += `• ${disciplinaNome}: ${total} habilidades\n`;
            });
            
            info += '\n🎓 Por ano (Português - Leitura):\n';
            Object.entries(matrizReferencia.portugues_leitura).forEach(([ano, habilidades]) => {
                info += `• ${ano}º ano: ${habilidades.length} habilidades\n`;
            });
            
            alert(info);
        };
        
        console.log('✅ Função verificarMatriz adicionada ao escopo global');
    }
} else {
    console.error('❌ matrizReferencia NÃO está definida');
    
    // Tentar carregar o arquivo novamente
    console.log('⚠️ Tentando carregar matriz-referencia-dados.js...');
    
    const script = document.createElement('script');
    script.src = 'matriz-referencia-dados.js';
    script.onload = function() {
        console.log('✅ matriz-referencia-dados.js carregado com sucesso!');
        
        // Verificar novamente após carregar
        if (typeof matrizReferencia !== 'undefined') {
            console.log('✅ matrizReferencia está definida após carregar');
            
            // Criar estatisticasMatriz se não existir
            if (typeof estatisticasMatriz === 'undefined') {
                window.estatisticasMatriz = {
                    total: Object.values(matrizReferencia).reduce((total, disciplina) => 
                        total + Object.values(disciplina).reduce((subTotal, ano) => subTotal + ano.length, 0), 0
                    ),
                    porDisciplina: Object.fromEntries(
                        Object.entries(matrizReferencia).map(([disc, anos]) => [
                            disc, 
                            Object.values(anos).reduce((total, ano) => total + ano.length, 0)
                        ])
                    )
                };
                
                console.log('✅ estatisticasMatriz criada após carregar:', estatisticasMatriz);
            }
        } else {
            console.error('❌ matrizReferencia ainda NÃO está definida após carregar');
        }
    };
    script.onerror = function() {
        console.error('❌ Erro ao carregar matriz-referencia-dados.js');
    };
    document.head.appendChild(script);
}

// Adicionar botão para verificar a matriz
window.addEventListener('DOMContentLoaded', function() {
    console.log('DOM carregado, adicionando botão de verificação...');
    
    // Verificar se o botão já existe
    if (!document.getElementById('verificarMatrizBtn')) {
        const btnContainer = document.createElement('div');
        btnContainer.className = 'mt-3';
        btnContainer.innerHTML = `
            <button id="verificarMatrizBtn" class="btn btn-warning">
                <i class="fas fa-sync me-2"></i>Verificar Matriz Novamente
            </button>
        `;
        
        // Adicionar após o formulário
        const form = document.getElementById('analysisForm');
        if (form) {
            form.parentNode.insertBefore(btnContainer, form.nextSibling);
            
            // Adicionar evento de clique
            document.getElementById('verificarMatrizBtn').addEventListener('click', function() {
                console.log('Verificando matriz novamente...');
                
                if (typeof matrizReferencia !== 'undefined') {
                    console.log('✅ matrizReferencia está definida');
                    
                    if (typeof estatisticasMatriz !== 'undefined') {
                        console.log('✅ estatisticasMatriz está definida');
                        alert('✅ Matriz de Referência está carregada corretamente!');
                    } else {
                        console.error('❌ estatisticasMatriz NÃO está definida');
                        alert('⚠️ matrizReferencia está definida, mas estatisticasMatriz não!');
                    }
                } else {
                    console.error('❌ matrizReferencia NÃO está definida');
                    alert('❌ Matriz de Referência NÃO está carregada!');
                }
            });
        }
    }
});