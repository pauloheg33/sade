// Sistema de gerenciamento da página AVALIE CE - CICLO II
class AvalieCeApp {
    constructor() {
        this.dadosFiltrados = [];
        this.filtrosAtivos = {};
        this.estatisticas = {};
        this.init();
    }

    init() {
        this.carregarDados();
        this.setupEventListeners();
        this.renderizarInterface();
        this.atualizarEstatisticas();
    }

    carregarDados() {
        // Garantir que os dados estejam carregados
        if (typeof AvalieCeProcessor !== 'undefined') {
            this.dadosFiltrados = avalieCeData.avaliacoes;
            this.estatisticas = AvalieCeProcessor.gerarEstatisticas();
        }
    }

    setupEventListeners() {
        // Filtros
        const filtros = ['av2-escola', 'av2-ano', 'av2-disciplina', 'av2-nivel'];
        filtros.forEach(id => {
            const elemento = document.getElementById(id);
            if (elemento) {
                elemento.addEventListener('change', () => this.aplicarFiltros());
            }
        });

        // Busca
        const campoBusca = document.getElementById('av2-busca');
        if (campoBusca) {
            campoBusca.addEventListener('input', () => this.aplicarFiltros());
        }

        // Ordenação
        const campoOrdem = document.getElementById('av2-ordenacao');
        if (campoOrdem) {
            campoOrdem.addEventListener('change', () => this.aplicarFiltros());
        }

        // Limpar filtros
        const btnLimpar = document.getElementById('av2-limpar-filtros');
        if (btnLimpar) {
            btnLimpar.addEventListener('click', () => this.limparFiltros());
        }
    }

    renderizarInterface() {
        this.renderizarFiltros();
        this.renderizarCards();
        this.renderizarEstatisticasLaterais();
    }

    renderizarFiltros() {
        // Popular dropdown de escolas
        const selectEscolas = document.getElementById('av2-escola');
        if (selectEscolas) {
            const escolas = [...new Set(avalieCeData.avaliacoes.map(item => item.escola))].sort();
            selectEscolas.innerHTML = '<option value="">Todas as escolas</option>';
            escolas.forEach(escola => {
                selectEscolas.innerHTML += `<option value="${escola}">${escola}</option>`;
            });
        }

        // Popular dropdown de anos
        const selectAnos = document.getElementById('av2-ano');
        if (selectAnos) {
            selectAnos.innerHTML = '<option value="">Todos os anos</option>';
            avalieCeData.metadata.anosAvaliados.forEach(ano => {
                selectAnos.innerHTML += `<option value="${ano}">${ano} Ano</option>`;
            });
        }
    }

    aplicarFiltros() {
        const filtros = {
            escola: document.getElementById('av2-escola')?.value || '',
            ano: document.getElementById('av2-ano')?.value || '',
            disciplina: document.getElementById('av2-disciplina')?.value || '',
            nivel: document.getElementById('av2-nivel')?.value || '',
            busca: document.getElementById('av2-busca')?.value || ''
        };

        // Aplicar busca textual
        let dadosFiltrados = avalieCeData.avaliacoes;
        if (filtros.busca) {
            dadosFiltrados = dadosFiltrados.filter(item => 
                item.escola.toLowerCase().includes(filtros.busca.toLowerCase()) ||
                item.ano.includes(filtros.busca) ||
                item.turma.toLowerCase().includes(filtros.busca.toLowerCase())
            );
        }

        // Aplicar outros filtros
        dadosFiltrados = AvalieCeProcessor.filtrarDados({
            ...filtros,
            escola: filtros.escola
        });

        // Aplicar ordenação
        const ordenacao = document.getElementById('av2-ordenacao')?.value || 'escola';
        dadosFiltrados = AvalieCeProcessor.ordenarDados(dadosFiltrados, ordenacao);

        this.dadosFiltrados = dadosFiltrados;
        this.filtrosAtivos = filtros;

        this.renderizarCards();
        this.renderizarFiltrosAtivos();
        this.atualizarContadores();
    }

    renderizarCards() {
        const container = document.getElementById('av2-resultados');
        if (!container) return;

        if (this.dadosFiltrados.length === 0) {
            container.innerHTML = `
                <div class="col-12">
                    <div class="alert alert-info text-center">
                        <i class="fas fa-search fa-2x mb-3"></i>
                        <h5>Nenhum resultado encontrado</h5>
                        <p class="mb-0">Tente ajustar os filtros para encontrar mais resultados.</p>
                    </div>
                </div>
            `;
            return;
        }

        let html = '';
        this.dadosFiltrados.forEach((item, index) => {
            const nivel = AvalieCeProcessor.determinarNivel(item.media);
            const nivelInfo = avalieCeData.niveis[nivel];
            const imagemPath = this.gerarCaminhoImagem(item);
            
            html += `
                <div class="col-lg-4 col-md-6 mb-4" data-index="${index}">
                    <div class="card av2-result-card h-100 border-0 shadow-sm">
                        <div class="card-header bg-light border-0 d-flex justify-content-between align-items-center">
                            <div>
                                <h6 class="mb-0 fw-bold text-primary">${item.escola}</h6>
                                <small class="text-muted">${item.ano} Ano ${item.turma ? '- Turma ' + item.turma : ''}</small>
                            </div>
                            <span class="badge rounded-pill" style="background-color: ${nivelInfo.cor}; color: white;">
                                ${nivelInfo.label}
                            </span>
                        </div>
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-center mb-3">
                                <div>
                                    <span class="text-muted">Disciplina:</span>
                                    <strong class="d-block">${this.formatarDisciplina(item.disciplina)}</strong>
                                </div>
                                <div class="text-end">
                                    <span class="text-muted">Média:</span>
                                    <h4 class="mb-0 fw-bold" style="color: ${nivelInfo.cor};">
                                        ${item.media}
                                    </h4>
                                </div>
                            </div>
                            <div class="progress mb-3" style="height: 8px;">
                                <div class="progress-bar" style="width: ${item.media}%; background-color: ${nivelInfo.cor};"></div>
                            </div>
                            <div class="d-flex justify-content-between">
                                <button class="btn btn-outline-primary btn-sm" onclick="avalieCeApp.visualizarGrafico('${imagemPath}', '${item.escola}', '${item.ano}', '${item.turma}', '${item.disciplina}')">
                                    <i class="fas fa-chart-bar me-1"></i>Ver Gráfico
                                </button>
                                <div class="btn-group">
                                    <button class="btn btn-outline-info btn-sm" onclick="avalieCeApp.visualizarGraficoEscola('${item.escola}')">
                                        <i class="fas fa-chart-line me-1"></i>Escola
                                    </button>
                                    <button class="btn btn-outline-secondary btn-sm" onclick="avalieCeApp.verDetalhes('${index}')">
                                        <i class="fas fa-info-circle me-1"></i>Info
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;
    }

    renderizarEstatisticasLaterais() {
        console.log('Iniciando renderização das estatísticas');
        const container = document.getElementById('av2-estatisticas');
        if (!container) {
            console.error('Container av2-estatisticas não encontrado');
            return;
        }

        const stats = this.estatisticas;
        console.log('Dados das estatísticas:', stats);
        
        let html = `
            <div class="quick-stat-card mb-3">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <i class="fas fa-school text-primary"></i>
                        <span class="ms-2">Escolas</span>
                    </div>
                    <strong>${avalieCeData.metadata.totalEscolas}</strong>
                </div>
            </div>
            
            <div class="quick-stat-card mb-3">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <i class="fas fa-users text-info"></i>
                        <span class="ms-2">Turmas</span>
                    </div>
                    <strong>${avalieCeData.metadata.totalTurmas}</strong>
                </div>
            </div>
            
            <div class="quick-stat-card mb-3">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <i class="fas fa-chart-line text-success"></i>
                        <span class="ms-2">Média Geral</span>
                    </div>
                    <strong class="text-success">${avalieCeData.metadata.mediaGeral}</strong>
                </div>
            </div>

            <hr class="my-3">
            
            <h6 class="text-muted mb-3">Por Nível de Desempenho:</h6>
        `;

        // Distribuição por níveis
        Object.keys(avalieCeData.niveis).forEach(nivel => {
            const nivelInfo = avalieCeData.niveis[nivel];
            const count = stats.distribuicao[nivel] || 0;
            const percent = Math.round((count / avalieCeData.metadata.totalTurmas) * 100);
            
            html += `
                <div class="quick-stat-card mb-2">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <span class="badge" style="background-color: ${nivelInfo.cor}; color: white; font-size: 0.7em;">${nivelInfo.label}</span>
                        </div>
                        <div class="text-end">
                            <strong>${count}</strong>
                            <small class="text-muted d-block">${percent}%</small>
                        </div>
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;
        console.log('Estatísticas renderizadas com sucesso');
    }

    renderizarFiltrosAtivos() {
        const container = document.getElementById('av2-filtros-ativos');
        if (!container) return;

        let badges = [];
        
        if (this.filtrosAtivos.escola) {
            badges.push(`<span class="badge bg-primary me-1 mb-1">Escola: ${this.filtrosAtivos.escola} <i class="fas fa-times ms-1" onclick="avalieCeApp.removerFiltro('escola')"></i></span>`);
        }
        
        if (this.filtrosAtivos.ano) {
            badges.push(`<span class="badge bg-info me-1 mb-1">Ano: ${this.filtrosAtivos.ano} <i class="fas fa-times ms-1" onclick="avalieCeApp.removerFiltro('ano')"></i></span>`);
        }
        
        if (this.filtrosAtivos.disciplina && this.filtrosAtivos.disciplina !== 'TODAS') {
            badges.push(`<span class="badge bg-success me-1 mb-1">Disciplina: ${this.formatarDisciplina(this.filtrosAtivos.disciplina)} <i class="fas fa-times ms-1" onclick="avalieCeApp.removerFiltro('disciplina')"></i></span>`);
        }
        
        if (this.filtrosAtivos.nivel) {
            const nivelInfo = avalieCeData.niveis[this.filtrosAtivos.nivel];
            badges.push(`<span class="badge me-1 mb-1" style="background-color: ${nivelInfo.cor};">Nível: ${nivelInfo.label} <i class="fas fa-times ms-1" onclick="avalieCeApp.removerFiltro('nivel')"></i></span>`);
        }
        
        if (this.filtrosAtivos.busca) {
            badges.push(`<span class="badge bg-warning text-dark me-1 mb-1">Busca: "${this.filtrosAtivos.busca}" <i class="fas fa-times ms-1" onclick="avalieCeApp.removerFiltro('busca')"></i></span>`);
        }

        container.innerHTML = badges.length ? badges.join('') : '';
    }

    atualizarContadores() {
        const contadorResultados = document.getElementById('av2-contador-resultados');
        if (contadorResultados) {
            contadorResultados.textContent = `Exibindo ${this.dadosFiltrados.length} de ${avalieCeData.metadata.totalTurmas} turmas`;
        }
    }

    gerarCaminhoImagem(item) {
        let nomeArquivo = '';
        
        // Usar o nome exato da escola como está nos arquivos
        let escolaArquivo = item.escola;
        
        if (item.disciplina === 'GERAL') {
            // Para avaliações gerais (4º, 5º, 8º, 9º anos)
            nomeArquivo = `${escolaArquivo}_${item.ano}_Ano${item.turma ? '_' + item.turma : ''}_${item.media}.png`;
        } else {
            // Para disciplinas específicas (LP, MAT no 2º ano)
            nomeArquivo = `${escolaArquivo}_${item.ano}_Ano${item.turma ? '_' + item.turma : ''}_${item.disciplina}_${item.media}.png`;
        }
        
        return `av2/graficos_individuais/${nomeArquivo}`;
    }

    formatarDisciplina(disciplina) {
        const mapeamento = {
            'LP': 'Língua Portuguesa',
            'MAT': 'Matemática',
            'GERAL': 'Avaliação Geral'
        };
        return mapeamento[disciplina] || disciplina;
    }

    visualizarGrafico(caminho, escola, ano, turma, disciplina) {
        const titulo = `${escola} - ${ano} Ano ${turma ? '- Turma ' + turma : ''} - ${this.formatarDisciplina(disciplina)}`;
        
        console.log('Tentando abrir imagem:', caminho); // Debug
        
        // Verificar se a imagem existe antes de tentar abrir
        const img = new Image();
        img.onload = () => {
            // Imagem carregada com sucesso, usar Fancybox
            if (typeof Fancybox !== 'undefined') {
                Fancybox.show([{
                    src: caminho,
                    caption: titulo,
                    thumb: caminho
                }]);
            } else {
                // Fallback: abrir em nova janela
                window.open(caminho, '_blank');
            }
        };
        img.onerror = () => {
            // Imagem não encontrada, mostrar erro
            alert(`Gráfico não encontrado: ${caminho}\n\nEscola: ${escola}\nAno: ${ano}º\nTurma: ${turma || 'Única'}\nDisciplina: ${this.formatarDisciplina(disciplina)}`);
            console.error('Imagem não encontrada:', caminho);
        };
        img.src = caminho;
    }

    visualizarGraficoEscola(escola) {
        if (typeof graficosLinhaEscolas !== 'undefined') {
            const grafico = graficosLinhaEscolas.find(item => item.escola === escola);
            if (grafico) {
                const caminho = `av2/linhas_por_escola_atualizado/${grafico.arquivo}`;
                const titulo = `${escola} - Evolução por Ano Escolar`;
                
                console.log('Tentando abrir gráfico da escola:', caminho); // Debug
                
                // Verificar se a imagem existe antes de tentar abrir
                const img = new Image();
                img.onload = () => {
                    if (typeof Fancybox !== 'undefined') {
                        Fancybox.show([{
                            src: caminho,
                            caption: titulo,
                            thumb: caminho
                        }]);
                    } else {
                        window.open(caminho, '_blank');
                    }
                };
                img.onerror = () => {
                    alert(`Gráfico consolidado não encontrado: ${caminho}\n\nEscola: ${escola}`);
                    console.error('Gráfico da escola não encontrado:', caminho);
                };
                img.src = caminho;
            } else {
                alert(`Gráfico consolidado não disponível para a escola: ${escola}`);
            }
        }
    }

    verDetalhes(index) {
        const item = this.dadosFiltrados[index];
        const nivel = AvalieCeProcessor.determinarNivel(item.media);
        const nivelInfo = avalieCeData.niveis[nivel];
        
        const html = `
            <div class="text-center">
                <h5 class="text-primary mb-3">${item.escola}</h5>
                <div class="row">
                    <div class="col-6">
                        <strong>Ano Escolar:</strong><br>
                        <span class="badge bg-info fs-6">${item.ano} Ano</span>
                    </div>
                    <div class="col-6">
                        <strong>Turma:</strong><br>
                        <span class="badge bg-secondary fs-6">${item.turma || 'Única'}</span>
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-6">
                        <strong>Disciplina:</strong><br>
                        ${this.formatarDisciplina(item.disciplina)}
                    </div>
                    <div class="col-6">
                        <strong>Média:</strong><br>
                        <h4 style="color: ${nivelInfo.cor};">${item.media}</h4>
                    </div>
                </div>
                <hr>
                <div>
                    <strong>Nível de Desempenho:</strong><br>
                    <span class="badge fs-6" style="background-color: ${nivelInfo.cor}; color: white;">
                        ${nivelInfo.label}
                    </span>
                </div>
            </div>
        `;
        
        // Mostrar modal ou alert com as informações
        if (typeof bootstrap !== 'undefined') {
            // Usar modal do Bootstrap se disponível
            this.mostrarModalDetalhes(html);
        } else {
            alert(`Detalhes da turma:\n\nEscola: ${item.escola}\nAno: ${item.ano}\nTurma: ${item.turma || 'Única'}\nDisciplina: ${this.formatarDisciplina(item.disciplina)}\nMédia: ${item.media}\nNível: ${nivelInfo.label}`);
        }
    }

    mostrarModalDetalhes(conteudo) {
        // Criar modal dinamicamente
        let modal = document.getElementById('av2-modal-detalhes');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'av2-modal-detalhes';
            modal.className = 'modal fade';
            modal.innerHTML = `
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Detalhes da Avaliação</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body" id="av2-modal-body">
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                        </div>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
        }
        
        document.getElementById('av2-modal-body').innerHTML = conteudo;
        const modalInstance = new bootstrap.Modal(modal);
        modalInstance.show();
    }

    atualizarEstatisticas() {
        this.renderizarEstatisticasLaterais();
    }

    removerFiltro(tipo) {
        const elemento = document.getElementById(`av2-${tipo}`);
        if (elemento) {
            elemento.value = '';
        }
        this.aplicarFiltros();
    }

    limparFiltros() {
        const filtros = ['av2-escola', 'av2-ano', 'av2-disciplina', 'av2-nivel', 'av2-busca', 'av2-ordenacao'];
        filtros.forEach(id => {
            const elemento = document.getElementById(id);
            if (elemento) {
                elemento.value = elemento.id === 'av2-ordenacao' ? 'escola' : '';
            }
        });
        
        this.dadosFiltrados = avalieCeData.avaliacoes;
        this.filtrosAtivos = {};
        
        this.renderizarCards();
        this.renderizarFiltrosAtivos();
        this.atualizarContadores();
    }
}

// Instanciar a aplicação quando a página carregar
let avalieCeApp;

document.addEventListener('DOMContentLoaded', function() {
    // Aguardar um pouco para garantir que todos os scripts foram carregados
    setTimeout(() => {
        if (typeof AvalieCeProcessor !== 'undefined') {
            avalieCeApp = new AvalieCeApp();
        }
    }, 100);
});
