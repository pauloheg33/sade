<?php
/**
 * SADE - Página Principal
 * Dashboard principal do sistema
 */

require_once 'config.php';
require_once 'includes/functions.php';

// Verificar autenticação
checkAuth();

// Inicializar classes
$dataManager = new DataManager();
$reportGenerator = new ReportGenerator();

// Processar arquivos existentes se for a primeira vez
$processamento = $dataManager->processarArquivosExistentes();

// Buscar estatísticas
$stats = $dataManager->getStats();
$provasRecentes = $dataManager->getProvasRecentes(5);
$relatorioEscolas = $reportGenerator->relatorioDesempenhoPorEscola();
$dadosGrafico = $reportGenerator->dadosGraficoDisciplinas();

?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo SITE_NAME; ?> - Dashboard</title>
    
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Font Awesome -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <!-- Chart.js -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
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
                        <a class="nav-link active" href="index.php">
                            <i class="fas fa-tachometer-alt me-1"></i>Dashboard
                        </a>
                    </li>
                    <?php if (isAdmin()): ?>
                    <li class="nav-item">
                        <a class="nav-link" href="processar.php">
                            <i class="fas fa-cogs me-1"></i>Processar Arquivos
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="usuarios.php">
                            <i class="fas fa-users me-1"></i>Usuários
                        </a>
                    </li>
                    <?php endif; ?>
                    <li class="nav-item">
                        <a class="nav-link" href="relatorios.php">
                            <i class="fas fa-chart-bar me-1"></i>Relatórios
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="escolas.php">
                            <i class="fas fa-school me-1"></i>Escolas
                        </a>
                    </li>
                </ul>
                
                <ul class="navbar-nav">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown">
                            <i class="fas fa-user me-1"></i><?php echo htmlspecialchars($_SESSION['user_name']); ?>
                            <span class="badge bg-<?php echo isAdmin() ? 'warning' : 'info'; ?> ms-1">
                                <?php echo isAdmin() ? 'Admin' : 'User'; ?>
                            </span>
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="perfil.php"><i class="fas fa-user-cog me-2"></i>Perfil</a></li>
                            <?php if (isAdmin()): ?>
                            <li><a class="dropdown-item" href="configuracoes.php"><i class="fas fa-cogs me-2"></i>Configurações</a></li>
                            <?php endif; ?>
                            <li><hr class="dropdown-divider"></li>
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
                        <h1 class="h3 mb-1">Dashboard</h1>
                        <p class="text-muted">Visão geral do sistema de avaliação educacional</p>
                    </div>
                    <div>
                        <span class="badge bg-success fs-6">Sistema Online</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Statistics Cards -->
        <div class="row g-4 mb-4">
            <div class="col-xl-3 col-md-6">
                <div class="card stats-card border-0 shadow-sm">
                    <div class="card-body text-center">
                        <div class="stats-icon bg-primary">
                            <i class="fas fa-school"></i>
                        </div>
                        <h3 class="mt-3 mb-1"><?php echo number_format($stats['total_escolas']); ?></h3>
                        <p class="text-muted mb-0">Escolas Cadastradas</p>
                    </div>
                </div>
            </div>
            
            <div class="col-xl-3 col-md-6">
                <div class="card stats-card border-0 shadow-sm">
                    <div class="card-body text-center">
                        <div class="stats-icon bg-success">
                            <i class="fas fa-users"></i>
                        </div>
                        <h3 class="mt-3 mb-1"><?php echo number_format($stats['total_alunos']); ?></h3>
                        <p class="text-muted mb-0">Alunos Avaliados</p>
                    </div>
                </div>
            </div>
            
            <div class="col-xl-3 col-md-6">
                <div class="card stats-card border-0 shadow-sm">
                    <div class="card-body text-center">
                        <div class="stats-icon bg-warning">
                            <i class="fas fa-file-alt"></i>
                        </div>
                        <h3 class="mt-3 mb-1"><?php echo number_format($stats['total_provas']); ?></h3>
                        <p class="text-muted mb-0">Provas Processadas</p>
                    </div>
                </div>
            </div>
            
            <div class="col-xl-3 col-md-6">
                <div class="card stats-card border-0 shadow-sm">
                    <div class="card-body text-center">
                        <div class="stats-icon bg-info">
                            <i class="fas fa-chart-line"></i>
                        </div>
                        <h3 class="mt-3 mb-1"><?php echo $stats['media_geral']; ?>%</h3>
                        <p class="text-muted mb-0">Média Geral</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Charts Row -->
        <div class="row g-4 mb-4">
            <!-- Performance Chart -->
            <div class="col-lg-8">
                <div class="card border-0 shadow-sm">
                    <div class="card-header bg-white border-bottom">
                        <h5 class="card-title mb-0">
                            <i class="fas fa-chart-bar text-primary me-2"></i>
                            Desempenho por Disciplina
                        </h5>
                    </div>
                    <div class="card-body">
                        <canvas id="disciplinasChart" height="300"></canvas>
                    </div>
                </div>
            </div>
            
            <!-- Quick Actions -->
            <div class="col-lg-4">
                <div class="card border-0 shadow-sm">
                    <div class="card-header bg-white border-bottom">
                        <h5 class="card-title mb-0">
                            <i class="fas fa-rocket text-success me-2"></i>
                            Ações Rápidas
                        </h5>
                    </div>
                    <div class="card-body">
                        <div class="d-grid gap-2">
                            <?php if (isAdmin()): ?>
                            <a href="processar.php" class="btn btn-primary">
                                <i class="fas fa-cogs me-2"></i>Processar Arquivos
                            </a>
                            <a href="usuarios.php" class="btn btn-success">
                                <i class="fas fa-users me-2"></i>Gerenciar Usuários
                            </a>
                            <?php endif; ?>
                            <a href="relatorios.php" class="btn btn-info">
                                <i class="fas fa-chart-line me-2"></i>Gerar Relatório
                            </a>
                            <a href="escolas.php" class="btn btn-warning">
                                <i class="fas fa-school me-2"></i>Ver Escolas
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Recent Uploads and Schools Performance -->
        <div class="row g-4">
            <!-- Recent Tests -->
            <div class="col-lg-6">
                <div class="card border-0 shadow-sm">
                    <div class="card-header bg-white border-bottom">
                        <h5 class="card-title mb-0">
                            <i class="fas fa-clock text-warning me-2"></i>
                            Provas Recentes
                        </h5>
                    </div>
                    <div class="card-body p-0">
                        <?php if (empty($provasRecentes)): ?>
                            <div class="text-center py-4">
                                <i class="fas fa-inbox fa-3x text-muted mb-3"></i>
                                <p class="text-muted">Nenhuma prova processada</p>
                                <?php if (isAdmin()): ?>
                                <a href="processar.php" class="btn btn-primary">Processar Arquivos</a>
                                <?php endif; ?>
                            </div>
                        <?php else: ?>
                            <div class="table-responsive">
                                <table class="table table-hover mb-0">
                                    <tbody>
                                        <?php foreach ($provasRecentes as $prova): ?>
                                            <tr>
                                                <td>
                                                    <div class="d-flex align-items-center">
                                                        <div class="me-3">
                                                            <i class="fas fa-file-alt fa-2x text-success"></i>
                                                        </div>
                                                        <div>
                                                            <h6 class="mb-1"><?php echo htmlspecialchars($prova['nome_teste']); ?></h6>
                                                            <small class="text-muted">
                                                                <?php echo htmlspecialchars($prova['escola'] ?? 'Escola não informada'); ?> - 
                                                                <?php echo htmlspecialchars($prova['turma']); ?>
                                                            </small>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td class="text-end">
                                                    <span class="badge bg-success">
                                                        <?php echo $prova['total_respostas']; ?> respostas
                                                    </span>
                                                    <br>
                                                    <small class="text-muted">
                                                        <?php echo date('d/m/Y H:i', strtotime($prova['processado_em'])); ?>
                                                    </small>
                                                </td>
                                            </tr>
                                        <?php endforeach; ?>
                                    </tbody>
                                </table>
                            </div>
                        <?php endif; ?>
                    </div>
                </div>
            </div>
            
            <!-- Schools Performance -->
            <div class="col-lg-6">
                <div class="card border-0 shadow-sm">
                    <div class="card-header bg-white border-bottom">
                        <h5 class="card-title mb-0">
                            <i class="fas fa-trophy text-warning me-2"></i>
                            Ranking de Escolas
                        </h5>
                    </div>
                    <div class="card-body p-0">
                        <?php if (empty($relatorioEscolas)): ?>
                            <div class="text-center py-4">
                                <i class="fas fa-chart-line fa-3x text-muted mb-3"></i>
                                <p class="text-muted">Dados insuficientes para ranking</p>
                            </div>
                        <?php else: ?>
                            <div class="table-responsive">
                                <table class="table table-hover mb-0">
                                    <tbody>
                                        <?php 
                                        $position = 1;
                                        foreach (array_slice($relatorioEscolas, 0, 5) as $escola): 
                                        ?>
                                            <tr>
                                                <td>
                                                    <span class="badge bg-primary rounded-pill me-2"><?php echo $position; ?>º</span>
                                                    <strong><?php echo htmlspecialchars($escola['escola']); ?></strong>
                                                    <br>
                                                    <small class="text-muted">
                                                        <?php echo $escola['total_alunos']; ?> alunos • <?php echo $escola['total_provas']; ?> provas
                                                    </small>
                                                </td>
                                                <td class="text-end">
                                                    <h6 class="mb-0 text-success">
                                                        <?php echo number_format($escola['media_escola'], 1); ?>%
                                                    </h6>
                                                </td>
                                            </tr>
                                        <?php 
                                        $position++;
                                        endforeach; 
                                        ?>
                                    </tbody>
                                </table>
                            </div>
                        <?php endif; ?>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    
    <!-- Custom JS -->
    <script src="assets/js/main.js"></script>
    
    <!-- Chart Configuration -->
    <script>
        // Gráfico de disciplinas
        const ctx = document.getElementById('disciplinasChart').getContext('2d');
        const disciplinasChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: <?php echo json_encode(array_column($dadosGrafico, 'disciplina')); ?>,
                datasets: [{
                    label: 'Média (%)',
                    data: <?php echo json_encode(array_column($dadosGrafico, 'media')); ?>,
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.8)',
                        'rgba(255, 99, 132, 0.8)',
                        'rgba(255, 205, 86, 0.8)',
                        'rgba(75, 192, 192, 0.8)',
                        'rgba(153, 102, 255, 0.8)'
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(255, 205, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)'
                    ],
                    borderWidth: 2,
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeInOutQuart'
                }
            }
        });

        // Atualizar dados em tempo real (demo)
        setInterval(() => {
            updateRealTimeData();
        }, 30000); // 30 segundos
    </script>
</body>
</html>
