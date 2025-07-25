<?php
/**
 * SADE - Processamento de Arquivos
 * Página para administradores processarem os arquivos das pastas
 */

require_once 'config.php';
require_once 'includes/functions.php';

// Verificar autenticação de admin
checkAuth(USER_TYPE_ADMIN);

$message = '';
$messageType = '';
$processamento = null;

// Processar arquivos se solicitado
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!validateCSRF($_POST['csrf_token'] ?? '')) {
        $message = 'Token de segurança inválido.';
        $messageType = 'danger';
    } else {
        try {
            $dataManager = new DataManager();
            $processamento = $dataManager->processarArquivosExistentes();
            
            $totalProcessados = $processamento['gabaritos'] + $processamento['provas'];
            
            if ($totalProcessados > 0) {
                $message = "Processamento concluído! {$processamento['gabaritos']} gabaritos e {$processamento['provas']} provas processados.";
                $messageType = 'success';
            } else {
                $message = 'Nenhum arquivo novo encontrado para processar.';
                $messageType = 'info';
            }
            
            logActivity('Processamento de arquivos', "Gabaritos: {$processamento['gabaritos']}, Provas: {$processamento['provas']}");
            
        } catch (Exception $e) {
            $message = 'Erro durante o processamento: ' . $e->getMessage();
            $messageType = 'danger';
            logActivity('Erro no processamento', $e->getMessage());
        }
    }
}

// Verificar arquivos nas pastas
$arquivosGabaritos = glob(GABARITOS_DIR . '*.csv');
$arquivosProvas = glob(PROVAS_DIR . '*.csv');

// Obter estatísticas atuais
$dataManager = new DataManager();
$stats = $dataManager->getStats();

// Gerar token CSRF
$csrf_token = generateCSRF();
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo SITE_NAME; ?> - Processamento de Arquivos</title>
    
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Font Awesome -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <!-- Custom CSS -->
    <link href="assets/css/style.css" rel="stylesheet">
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
        <div class="container-fluid">
            <a class="navbar-brand" href="index.php">
                <i class="fas fa-graduation-cap me-2"></i>SADE
            </a>
            
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav me-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="index.php">
                            <i class="fas fa-tachometer-alt me-1"></i>Dashboard
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" href="processar.php">
                            <i class="fas fa-cogs me-1"></i>Processar Arquivos
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="usuarios.php">
                            <i class="fas fa-users me-1"></i>Usuários
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="relatorios.php">
                            <i class="fas fa-chart-bar me-1"></i>Relatórios
                        </a>
                    </li>
                </ul>
                
                <ul class="navbar-nav">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown">
                            <i class="fas fa-user me-1"></i><?php echo htmlspecialchars($_SESSION['user_name']); ?>
                            <span class="badge bg-warning ms-1">Admin</span>
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="logout.php"><i class="fas fa-sign-out-alt me-2"></i>Sair</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Main Content -->
    <div class="container-fluid mt-5 pt-3">
        <!-- Page Header -->
        <div class="row mb-4">
            <div class="col-12">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <h1 class="h3 mb-1">Processamento de Arquivos</h1>
                        <p class="text-muted">Gerencie o processamento de gabaritos e provas</p>
                    </div>
                    <div>
                        <a href="index.php" class="btn btn-outline-primary">
                            <i class="fas fa-arrow-left me-2"></i>Voltar ao Dashboard
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <!-- Messages -->
        <?php if ($message): ?>
            <div class="row mb-4">
                <div class="col-12">
                    <div class="alert alert-<?php echo $messageType; ?> alert-dismissible fade show" role="alert">
                        <i class="fas fa-<?php echo $messageType === 'success' ? 'check-circle' : ($messageType === 'danger' ? 'exclamation-triangle' : 'info-circle'); ?> me-2"></i>
                        <?php echo htmlspecialchars($message); ?>
                        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                    </div>
                </div>
            </div>
        <?php endif; ?>

        <!-- Statistics -->
        <div class="row g-4 mb-4">
            <div class="col-lg-3 col-md-6">
                <div class="card border-0 shadow-sm text-center">
                    <div class="card-body">
                        <div class="stats-icon bg-primary mx-auto mb-3">
                            <i class="fas fa-file-alt"></i>
                        </div>
                        <h4><?php echo count($arquivosGabaritos); ?></h4>
                        <p class="text-muted mb-0">Arquivos de Gabarito</p>
                    </div>
                </div>
            </div>
            
            <div class="col-lg-3 col-md-6">
                <div class="card border-0 shadow-sm text-center">
                    <div class="card-body">
                        <div class="stats-icon bg-success mx-auto mb-3">
                            <i class="fas fa-file-csv"></i>
                        </div>
                        <h4><?php echo count($arquivosProvas); ?></h4>
                        <p class="text-muted mb-0">Arquivos de Prova</p>
                    </div>
                </div>
            </div>
            
            <div class="col-lg-3 col-md-6">
                <div class="card border-0 shadow-sm text-center">
                    <div class="card-body">
                        <div class="stats-icon bg-warning mx-auto mb-3">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <h4><?php echo $stats['total_provas']; ?></h4>
                        <p class="text-muted mb-0">Provas Processadas</p>
                    </div>
                </div>
            </div>
            
            <div class="col-lg-3 col-md-6">
                <div class="card border-0 shadow-sm text-center">
                    <div class="card-body">
                        <div class="stats-icon bg-info mx-auto mb-3">
                            <i class="fas fa-users"></i>
                        </div>
                        <h4><?php echo $stats['total_alunos']; ?></h4>
                        <p class="text-muted mb-0">Alunos Cadastrados</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="row g-4">
            <!-- Process Form -->
            <div class="col-lg-6">
                <div class="card border-0 shadow-sm">
                    <div class="card-header bg-white border-bottom">
                        <h5 class="card-title mb-0">
                            <i class="fas fa-play text-success me-2"></i>
                            Processar Arquivos
                        </h5>
                    </div>
                    <div class="card-body">
                        <p class="text-muted mb-4">
                            Clique no botão abaixo para processar todos os arquivos CSV nas pastas 
                            <code>data/gabaritos/</code> e <code>data/provas/</code>.
                        </p>
                        
                        <form method="POST" id="processForm">
                            <input type="hidden" name="csrf_token" value="<?php echo $csrf_token; ?>">
                            
                            <div class="alert alert-info">
                                <i class="fas fa-info-circle me-2"></i>
                                <strong>Atenção:</strong> Apenas arquivos ainda não processados serão importados.
                                O sistema identifica automaticamente arquivos duplicados.
                            </div>
                            
                            <div class="d-grid">
                                <button type="submit" class="btn btn-success btn-lg" id="processBtn">
                                    <i class="fas fa-cogs me-2"></i>
                                    <span class="btn-text">Processar Todos os Arquivos</span>
                                    <span class="spinner-border spinner-border-sm d-none ms-2" role="status">
                                        <span class="visually-hidden">Processando...</span>
                                    </span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                
                <!-- Results -->
                <?php if ($processamento): ?>
                    <div class="card border-0 shadow-sm mt-4">
                        <div class="card-header bg-success text-white">
                            <h6 class="card-title mb-0">
                                <i class="fas fa-check-circle me-2"></i>
                                Resultado do Processamento
                            </h6>
                        </div>
                        <div class="card-body">
                            <div class="row g-3">
                                <div class="col-md-6">
                                    <div class="text-center">
                                        <h4 class="text-primary"><?php echo $processamento['gabaritos']; ?></h4>
                                        <small class="text-muted">Gabaritos Processados</small>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="text-center">
                                        <h4 class="text-success"><?php echo $processamento['provas']; ?></h4>
                                        <small class="text-muted">Provas Processadas</small>
                                    </div>
                                </div>
                            </div>
                            
                            <hr>
                            
                            <h6>Estatísticas Atualizadas:</h6>
                            <div class="row g-3">
                                <div class="col-md-4">
                                    <div class="text-center">
                                        <h5 class="text-info"><?php echo $processamento['estatisticas']['gabaritos']; ?></h5>
                                        <small class="text-muted">Total Gabaritos</small>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="text-center">
                                        <h5 class="text-warning"><?php echo $processamento['estatisticas']['provas']; ?></h5>
                                        <small class="text-muted">Total Provas</small>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="text-center">
                                        <h5 class="text-success"><?php echo $processamento['estatisticas']['alunos']; ?></h5>
                                        <small class="text-muted">Total Alunos</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                <?php endif; ?>
            </div>
            
            <!-- File Lists -->
            <div class="col-lg-6">
                <!-- Gabaritos -->
                <div class="card border-0 shadow-sm mb-4">
                    <div class="card-header bg-white border-bottom">
                        <h6 class="card-title mb-0">
                            <i class="fas fa-clipboard-list text-primary me-2"></i>
                            Arquivos de Gabarito (<?php echo count($arquivosGabaritos); ?>)
                        </h6>
                    </div>
                    <div class="card-body p-0">
                        <?php if (empty($arquivosGabaritos)): ?>
                            <div class="text-center py-3">
                                <i class="fas fa-folder-open fa-2x text-muted mb-2"></i>
                                <p class="text-muted mb-0">Nenhum arquivo encontrado</p>
                            </div>
                        <?php else: ?>
                            <div class="list-group list-group-flush">
                                <?php foreach (array_slice($arquivosGabaritos, 0, 10) as $arquivo): ?>
                                    <div class="list-group-item d-flex align-items-center">
                                        <i class="fas fa-file-alt text-primary me-3"></i>
                                        <div class="flex-grow-1">
                                            <div class="fw-bold"><?php echo basename($arquivo); ?></div>
                                            <small class="text-muted">
                                                <?php echo number_format(filesize($arquivo) / 1024, 1); ?> KB
                                            </small>
                                        </div>
                                    </div>
                                <?php endforeach; ?>
                                <?php if (count($arquivosGabaritos) > 10): ?>
                                    <div class="list-group-item text-center text-muted">
                                        ... e mais <?php echo count($arquivosGabaritos) - 10; ?> arquivos
                                    </div>
                                <?php endif; ?>
                            </div>
                        <?php endif; ?>
                    </div>
                </div>
                
                <!-- Provas -->
                <div class="card border-0 shadow-sm">
                    <div class="card-header bg-white border-bottom">
                        <h6 class="card-title mb-0">
                            <i class="fas fa-file-csv text-success me-2"></i>
                            Arquivos de Prova (<?php echo count($arquivosProvas); ?>)
                        </h6>
                    </div>
                    <div class="card-body p-0">
                        <?php if (empty($arquivosProvas)): ?>
                            <div class="text-center py-3">
                                <i class="fas fa-folder-open fa-2x text-muted mb-2"></i>
                                <p class="text-muted mb-0">Nenhum arquivo encontrado</p>
                            </div>
                        <?php else: ?>
                            <div class="list-group list-group-flush">
                                <?php foreach (array_slice($arquivosProvas, 0, 10) as $arquivo): ?>
                                    <div class="list-group-item d-flex align-items-center">
                                        <i class="fas fa-file-csv text-success me-3"></i>
                                        <div class="flex-grow-1">
                                            <div class="fw-bold"><?php echo basename($arquivo); ?></div>
                                            <small class="text-muted">
                                                <?php echo number_format(filesize($arquivo) / 1024, 1); ?> KB
                                            </small>
                                        </div>
                                    </div>
                                <?php endforeach; ?>
                                <?php if (count($arquivosProvas) > 10): ?>
                                    <div class="list-group-item text-center text-muted">
                                        ... e mais <?php echo count($arquivosProvas) - 10; ?> arquivos
                                    </div>
                                <?php endif; ?>
                            </div>
                        <?php endif; ?>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    
    <script>
        // Form processing
        document.getElementById('processForm').addEventListener('submit', function(e) {
            const btn = document.getElementById('processBtn');
            const btnText = btn.querySelector('.btn-text');
            const spinner = btn.querySelector('.spinner-border');
            
            // Show loading state
            btn.disabled = true;
            btnText.textContent = 'Processando...';
            spinner.classList.remove('d-none');
            
            // Show progress message
            setTimeout(() => {
                btnText.textContent = 'Analisando arquivos...';
            }, 1000);
            
            setTimeout(() => {
                btnText.textContent = 'Importando dados...';
            }, 3000);
        });
        
        // Auto-refresh every 30 seconds if processing
        <?php if ($processamento): ?>
        setTimeout(() => {
            window.location.reload();
        }, 5000);
        <?php endif; ?>
    </script>
</body>
</html>
