// SADE - Download & Export Utilities
class SADEExports {
    constructor() {
        this.initializeDownloadButtons();
        this.initializeImageModal();
    }

    // Inicializar botões de download
    initializeDownloadButtons() {
        this.createDownloadBar();
    }

    // Criar barra de downloads
    createDownloadBar() {
        const downloadBar = document.createElement('div');
        downloadBar.className = 'download-bar';
        downloadBar.innerHTML = `
            <div class="download-container">
                <h3><i class="fas fa-download"></i> Downloads e Relatórios</h3>
                <div class="download-buttons">
                    <button class="download-btn primary" onclick="sadeExports.downloadCurrentData()">
                        <i class="fas fa-file-excel"></i>
                        <span>Dados Filtrados (Excel)</span>
                    </button>
                    <button class="download-btn secondary" onclick="sadeExports.downloadPDF()">
                        <i class="fas fa-file-pdf"></i>
                        <span>Relatório PDF</span>
                    </button>
                    <button class="download-btn tertiary" onclick="sadeExports.downloadAllImages()">
                        <i class="fas fa-images"></i>
                        <span>Todas as Imagens</span>
                    </button>
                </div>
            </div>
        `;

        // Inserir antes da primeira seção
        const main = document.querySelector('.main');
        const firstSection = document.querySelector('.section');
        main.insertBefore(downloadBar, firstSection);
    }

    // Download dos dados filtrados
    downloadCurrentData() {
        const activeSection = document.querySelector('.section.active');
        const sectionId = activeSection.id;
        
        this.showDownloadProgress('Preparando dados...');
        
        setTimeout(() => {
            let data = [];
            let filename = '';

            if (sectionId === 'proea' || sectionId === 'cnca') {
                data = this.getFilteredData(sectionId);
                filename = `${sectionId.toUpperCase()}_dados_${new Date().toISOString().split('T')[0]}.csv`;
            } else {
                data = this.getAllData();
                filename = `SADE_relatorio_completo_${new Date().toISOString().split('T')[0]}.csv`;
            }

            this.downloadCSV(data, filename);
            this.hideDownloadProgress();
        }, 1500);
    }

    // Obter dados filtrados
    getFilteredData(section) {
        const results = document.querySelectorAll(`#${section}-results .result-card`);
        const data = [];

        data.push(['Escola', 'Ano', 'Disciplina', 'Média', 'Alunos', 'Data']);

        results.forEach(card => {
            const title = card.querySelector('.result-title').textContent;
            const stats = card.querySelectorAll('.result-stat-value');
            const meta = card.querySelector('.result-meta').textContent;

            // Extrair informações do título
            const parts = title.split('_');
            const escola = parts.slice(2, -2).join(' ');
            const ano = parts[0];
            const disciplina = parts[parts.length - 2];
            const media = stats[0].textContent;
            const alunos = stats[1].textContent;

            data.push([escola, ano, disciplina, media, alunos, meta]);
        });

        return data;
    }

    // Obter todos os dados
    getAllData() {
        if (window.sadeData) {
            const data = [['Programa', 'Escola', 'Ano', 'Disciplina', 'Média', 'Alunos', 'Data']];
            
            window.sadeData.forEach(item => {
                data.push([
                    item.programa,
                    item.escola,
                    item.ano,
                    item.disciplina,
                    item.media,
                    item.alunos,
                    item.data || 'N/A'
                ]);
            });

            return data;
        }
        return [];
    }

    // Download CSV
    downloadCSV(data, filename) {
        const csvContent = data.map(row => 
            row.map(field => `"${field}"`).join(',')
        ).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
    }

    // Download PDF (simulado)
    downloadPDF() {
        this.showDownloadProgress('Gerando relatório PDF...');
        
        // Simular geração de PDF
        setTimeout(() => {
            const activeSection = document.querySelector('.section.active');
            const sectionTitle = activeSection.querySelector('.section-title').textContent;
            
            // Criar um PDF simples com html2pdf se disponível
            if (typeof html2pdf !== 'undefined') {
                const element = activeSection.cloneNode(true);
                const opt = {
                    margin: 1,
                    filename: `SADE_${sectionTitle.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`,
                    image: { type: 'jpeg', quality: 0.98 },
                    html2canvas: { scale: 2 },
                    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
                };
                html2pdf().set(opt).from(element).save();
            } else {
                this.showToast('Funcionalidade de PDF será implementada em breve', 'info');
            }
            
            this.hideDownloadProgress();
        }, 2000);
    }

    // Download de todas as imagens
    downloadAllImages() {
        this.showDownloadProgress('Preparando imagens...');
        
        setTimeout(() => {
            const images = document.querySelectorAll('.result-image');
            let downloadCount = 0;

            if (images.length === 0) {
                this.showToast('Nenhuma imagem encontrada na seção atual', 'warning');
                this.hideDownloadProgress();
                return;
            }

            images.forEach((img, index) => {
                setTimeout(() => {
                    this.downloadImage(img.src, `grafico_${index + 1}.png`);
                    downloadCount++;
                    
                    if (downloadCount === images.length) {
                        this.hideDownloadProgress();
                        this.showToast(`${downloadCount} imagens baixadas com sucesso!`, 'success');
                    }
                }, index * 300);
            });
        }, 1000);
    }

    // Download de imagem individual
    downloadImage(url, filename) {
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();
    }

    // Mostrar progresso de download
    showDownloadProgress(message) {
        let progressBar = document.querySelector('.download-progress');
        
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.className = 'download-progress';
            document.body.appendChild(progressBar);
        }

        progressBar.innerHTML = `
            <div class="progress-content">
                <div class="progress-spinner"></div>
                <span class="progress-text">${message}</span>
                <div class="progress-bar">
                    <div class="progress-fill"></div>
                </div>
            </div>
        `;

        progressBar.style.display = 'flex';
    }

    // Esconder progresso de download
    hideDownloadProgress() {
        const progressBar = document.querySelector('.download-progress');
        if (progressBar) {
            progressBar.style.display = 'none';
        }
    }

    // Mostrar toast de notificação
    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('show');
        }, 100);

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }

    // Inicializar modal de imagens melhorado
    initializeImageModal() {
        // Remover modal antigo se existir
        const oldModal = document.getElementById('imageModal');
        if (oldModal) {
            oldModal.remove();
        }

        // Criar novo modal aprimorado
        const modal = document.createElement('div');
        modal.id = 'imageModal';
        modal.className = 'image-modal';
        modal.innerHTML = `
            <div class="modal-backdrop"></div>
            <div class="modal-content-wrapper">
                <div class="modal-header">
                    <h3 class="modal-title"></h3>
                    <div class="modal-actions">
                        <button class="modal-btn download" onclick="sadeExports.downloadCurrentImage()">
                            <i class="fas fa-download"></i>
                        </button>
                        <button class="modal-btn fullscreen" onclick="sadeExports.toggleFullscreen()">
                            <i class="fas fa-expand"></i>
                        </button>
                        <button class="modal-btn close" onclick="sadeExports.closeImageModal()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
                <div class="modal-body">
                    <img class="modal-image" src="" alt="">
                    <div class="modal-info">
                        <div class="info-stats"></div>
                        <div class="info-meta"></div>
                    </div>
                </div>
                <div class="modal-navigation">
                    <button class="nav-btn prev" onclick="sadeExports.previousImage()">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    <div class="nav-indicator">
                        <span class="current-index">1</span> / <span class="total-images">1</span>
                    </div>
                    <button class="nav-btn next" onclick="sadeExports.nextImage()">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        this.currentImageIndex = 0;
        this.currentImages = [];
        this.currentImageSrc = '';

        // Event listeners
        modal.querySelector('.modal-backdrop').addEventListener('click', () => this.closeImageModal());
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (modal.style.display === 'flex') {
                switch(e.key) {
                    case 'Escape':
                        this.closeImageModal();
                        break;
                    case 'ArrowLeft':
                        this.previousImage();
                        break;
                    case 'ArrowRight':
                        this.nextImage();
                        break;
                }
            }
        });
    }

    // Abrir modal de imagem
    openImageModal(imgElement, resultCard) {
        const modal = document.getElementById('imageModal');
        const modalImage = modal.querySelector('.modal-image');
        const modalTitle = modal.querySelector('.modal-title');
        const modalStats = modal.querySelector('.info-stats');
        const modalMeta = modal.querySelector('.info-meta');

        // Configurar imagem atual
        this.currentImageSrc = imgElement.src;
        modalImage.src = this.currentImageSrc;

        // Configurar título
        const title = resultCard.querySelector('.result-title').textContent;
        modalTitle.textContent = title;

        // Configurar estatísticas
        const stats = resultCard.querySelectorAll('.result-stat');
        modalStats.innerHTML = '';
        stats.forEach(stat => {
            const statClone = stat.cloneNode(true);
            modalStats.appendChild(statClone);
        });

        // Configurar meta informações
        const meta = resultCard.querySelector('.result-meta');
        if (meta) {
            modalMeta.innerHTML = meta.innerHTML;
        }

        // Configurar navegação
        this.setupImageNavigation();

        // Mostrar modal
        modal.style.display = 'flex';
        setTimeout(() => modal.classList.add('show'), 10);
    }

    // Configurar navegação de imagens
    setupImageNavigation() {
        const activeSection = document.querySelector('.section.active');
        this.currentImages = Array.from(activeSection.querySelectorAll('.result-card'));
        
        const currentImg = document.querySelector(`img[src="${this.currentImageSrc}"]`);
        const currentCard = currentImg.closest('.result-card');
        this.currentImageIndex = this.currentImages.indexOf(currentCard);

        this.updateNavigationUI();
    }

    // Atualizar UI de navegação
    updateNavigationUI() {
        const modal = document.getElementById('imageModal');
        const currentSpan = modal.querySelector('.current-index');
        const totalSpan = modal.querySelector('.total-images');
        const prevBtn = modal.querySelector('.nav-btn.prev');
        const nextBtn = modal.querySelector('.nav-btn.next');

        currentSpan.textContent = this.currentImageIndex + 1;
        totalSpan.textContent = this.currentImages.length;

        prevBtn.disabled = this.currentImageIndex === 0;
        nextBtn.disabled = this.currentImageIndex === this.currentImages.length - 1;
    }

    // Imagem anterior
    previousImage() {
        if (this.currentImageIndex > 0) {
            this.currentImageIndex--;
            this.updateModalContent();
        }
    }

    // Próxima imagem
    nextImage() {
        if (this.currentImageIndex < this.currentImages.length - 1) {
            this.currentImageIndex++;
            this.updateModalContent();
        }
    }

    // Atualizar conteúdo do modal
    updateModalContent() {
        const currentCard = this.currentImages[this.currentImageIndex];
        const img = currentCard.querySelector('.result-image');
        
        this.openImageModal(img, currentCard);
    }

    // Baixar imagem atual
    downloadCurrentImage() {
        const filename = `grafico_${this.currentImageIndex + 1}_${new Date().toISOString().split('T')[0]}.png`;
        this.downloadImage(this.currentImageSrc, filename);
        this.showToast('Imagem baixada com sucesso!', 'success');
    }

    // Toggle fullscreen
    toggleFullscreen() {
        const modal = document.getElementById('imageModal');
        const btn = modal.querySelector('.modal-btn.fullscreen i');
        
        if (modal.classList.contains('fullscreen')) {
            modal.classList.remove('fullscreen');
            btn.className = 'fas fa-expand';
        } else {
            modal.classList.add('fullscreen');
            btn.className = 'fas fa-compress';
        }
    }

    // Fechar modal
    closeImageModal() {
        const modal = document.getElementById('imageModal');
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    window.sadeExports = new SADEExports();
});
