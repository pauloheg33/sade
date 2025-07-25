<?php
/**
 * SADE - Relatórios de Desempenho
 * Página para visualização de relatórios e estatísticas
 */

require_once 'config.php';
require_once 'includes/functions.php';

// Verificar autenticação
checkAuth();

$message = '';
$messageType = '';

// Obter filtros
$filtros = [
    'ano' => $_GET['ano'] ?? '',
    'componente' => $_GET['componente'] ?? '',
    'escola' => $_GET['escola'] ?? '',
    'turma' => $_GET['turma'] ?? ''
];

// Limpar filtros vazios
$filtros = array_filter($filtros);

try {
    $reportGenerator = new ReportGenerator();
    $dataManager = new DataManager();
    
    // Obter dados para os filtros
    $anos = $dataManager->getAnos();
    $componentes = $dataManager->getComponentes();
    $escolas = $dataManager->getEscolas();
    $turmas = $dataManager->getTurmas();
    
    // Gerar relatório baseado nos filtros
    $relatorio = $reportGenerator->gerarRelatorio($filtros);
    
} catch (Exception $e) {
    $message = 'Erro ao gerar relatório: ' . $e->getMessage();
    $messageType = 'danger';
    $relatorio = null;
}

// Verificar se é admin
$isAdmin = isAdmin();
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo SITE_NAME; ?> - Relatórios</title>
    
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
                        <a class="nav-link" href="index.php">
                            <i class="fas fa-tachometer-alt me-1"></i>Dashboard
                        </a>
                    </li>
                    <?php if ($isAdmin): ?>
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
                        <a class="nav-link active" href="relatorios.php">
                            <i class="fas fa-chart-bar me-1"></i>Relatórios
                        </a>
                    </li>
                </ul>
                
                <ul class="navbar-nav">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown">
                            <i class="fas fa-user me-1"></i><?php echo htmlspecialchars($_SESSION['user_name']); ?>
                            <?php if ($isAdmin): ?>
                                <span class="badge bg-warning ms-1">Admin</span>
                            <?php endif; ?>
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
                        <h1 class="h3 mb-1">Relatórios de Desempenho</h1>
                        <p class="text-muted">Análise detalhada do desempenho por turmas e componentes</p>
                    </div>
                    <div>
                        <button type="button" class="btn btn-outline-primary" onclick="window.print()">
                            <i class="fas fa-print me-2"></i>Imprimir
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Messages -->
        <?php if ($message): ?>
            <div class="row mb-4">
                <div class="col-12">
                    <div class="alert alert-<?php echo $messageType; ?> alert-dismissible fade show" role="alert">
                        <i class="fas fa-<?php echo $messageType === 'success' ? 'check-circle' : 'exclamation-triangle'; ?> me-2"></i>
                        <?php echo htmlspecialchars($message); ?>
                        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                    </div>
                </div>
            </div>
        <?php endif; ?>

        <!-- Filters -->
        <div class="row mb-4">
            <div class="col-12">
                <div class="card border-0 shadow-sm">
                    <div class="card-header bg-white border-bottom">
                        <h6 class="card-title mb-0">
                            <i class="fas fa-filter me-2"></i>Filtros
                        </h6>
                    </div>
                    <div class="card-body">
                        <form method="GET" class="row g-3">
                            <div class="col-md-3">
                                <label for="ano" class="form-label">Ano</label>
                                <select class="form-select" id="ano" name="ano">
                                    <option value="">Todos os anos</option>
                                    <?php foreach ($anos as $ano): ?>
                                        <option value="<?php echo $ano; ?>" <?php echo ($filtros['ano'] ?? '') === $ano ? 'selected' : ''; ?>>
                                            <?php echo $ano; ?>
                                        </option>
                                    <?php endforeach; ?>
                                </select>
                            </div>
                            
                            <div class="col-md-3">
                                <label for="componente" class="form-label">Componente</label>
                                <select class="form-select" id="componente" name="componente">
                                    <option value="">Todos os componentes</option>
                                    <?php foreach ($componentes as $comp): ?>
                                        <option value="<?php echo htmlspecialchars($comp); ?>" <?php echo ($filtros['componente'] ?? '') === $comp ? 'selected' : ''; ?>>
                                            <?php echo htmlspecialchars($comp); ?>
                                        </option>
                                    <?php endforeach; ?>
                                </select>
                            </div>
                            
                            <div class="col-md-3">
                                <label for="escola" class="form-label">Escola</label>
                                <select class="form-select" id="escola" name="escola">
                                    <option value="">Todas as escolas</option>
                                    <?php foreach ($escolas as $escola): ?>
                                        <option value="<?php echo htmlspecialchars($escola); ?>" <?php echo ($filtros['escola'] ?? '') === $escola ? 'selected' : ''; ?>>
                                            <?php echo htmlspecialchars($escola); ?>
                                        </option>
                                    <?php endforeach; ?>
                                </select>
                            </div>
                            
                            <div class="col-md-3">
                                <label for="turma" class="form-label">Turma</label>
                                <select class="form-select" id="turma" name="turma">
                                    <option value="">Todas as turmas</option>
                                    <?php foreach ($turmas as $turma): ?>
                                        <option value="<?php echo htmlspecialchars($turma); ?>" <?php echo ($filtros['turma'] ?? '') === $turma ? 'selected' : ''; ?>>
                                            <?php echo htmlspecialchars($turma); ?>
                                        </option>
                                    <?php endforeach; ?>
                                </select>
                            </div>
                            
                            <div class="col-12">
                                <button type="submit" class="btn btn-primary">
                                    <i class="fas fa-search me-2"></i>Filtrar
                                </button>
                                <a href="relatorios.php" class="btn btn-outline-secondary">
                                    <i class="fas fa-undo me-2"></i>Limpar Filtros
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <?php if ($relatorio): ?>
            <!-- Summary Cards -->
            <div class="row g-4 mb-4">
                <div class="col-lg-3 col-md-6">
                    <div class="card border-0 shadow-sm text-center">
                        <div class="card-body">
                            <div class="stats-icon bg-primary mx-auto mb-3">
                                <i class="fas fa-users"></i>
                            </div>
                            <h4><?php echo $relatorio['resumo']['total_alunos']; ?></h4>
                            <p class="text-muted mb-0">Total de Alunos</p>
                        </div>
                    </div>
                </div>
                
                <div class="col-lg-3 col-md-6">
                    <div class="card border-0 shadow-sm text-center">
                        <div class="card-body">
                            <div class="stats-icon bg-success mx-auto mb-3">
                                <i class="fas fa-percentage"></i>
                            </div>
                            <h4><?php echo number_format($relatorio['resumo']['media_geral'], 1); ?>%</h4>
                            <p class="text-muted mb-0">Média Geral</p>
                        </div>
                    </div>
                </div>
                
                <div class="col-lg-3 col-md-6">
                    <div class="card border-0 shadow-sm text-center">
                        <div class="card-body">
                            <div class="stats-icon bg-warning mx-auto mb-3">
                                <i class="fas fa-file-alt"></i>
                            </div>
                            <h4><?php echo $relatorio['resumo']['total_provas']; ?></h4>
                            <p class="text-muted mb-0">Total de Provas</p>
                        </div>
                    </div>
                </div>
                
                <div class="col-lg-3 col-md-6">
                    <div class="card border-0 shadow-sm text-center">
                        <div class="card-body">
                            <div class="stats-icon bg-info mx-auto mb-3">
                                <i class="fas fa-graduation-cap"></i>
                            </div>
                            <h4><?php echo count($relatorio['por_componente']); ?></h4>
                            <p class="text-muted mb-0">Componentes</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Charts Row -->
            <div class="row g-4 mb-4">
                <!-- Performance by Component -->
                <div class="col-lg-6">
                    <div class="card border-0 shadow-sm">
                        <div class="card-header bg-white border-bottom">
                            <h6 class="card-title mb-0">
                                <i class="fas fa-chart-bar me-2"></i>Desempenho por Componente
                            </h6>
                        </div>
                        <div class="card-body">
                            <canvas id="componentChart" height="300"></canvas>
                        </div>
                    </div>
                </div>
                
                <!-- Performance Distribution -->
                <div class="col-lg-6">
                    <div class="card border-0 shadow-sm">
                        <div class="card-header bg-white border-bottom">
                            <h6 class="card-title mb-0">
                                <i class="fas fa-chart-pie me-2"></i>Distribuição de Desempenho
                            </h6>
                        </div>
                        <div class="card-body">
                            <canvas id="distributionChart" height="300"></canvas>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Detailed Tables -->
            <div class="row g-4">
                <!-- By Component -->
                <?php if (!empty($relatorio['por_componente'])): ?>
                    <div class="col-lg-6">
                        <div class="card border-0 shadow-sm">
                            <div class="card-header bg-white border-bottom">
                                <h6 class="card-title mb-0">
                                    <i class="fas fa-list me-2"></i>Detalhes por Componente
                                </h6>
                            </div>
                            <div class="card-body p-0">
                                <div class="table-responsive">
                                    <table class="table table-hover mb-0">
                                        <thead class="table-light">
                                            <tr>
                                                <th>Componente</th>
                                                <th>Alunos</th>
                                                <th>Média</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <?php foreach ($relatorio['por_componente'] as $comp): ?>
                                                <tr>
                                                    <td><?php echo htmlspecialchars($comp['componente']); ?></td>
                                                    <td><?php echo $comp['total_alunos']; ?></td>
                                                    <td>
                                                        <strong><?php echo number_format($comp['media'], 1); ?>%</strong>
                                                    </td>
                                                    <td>
                                                        <?php
                                                        $status = $comp['media'] >= 70 ? 'success' : ($comp['media'] >= 50 ? 'warning' : 'danger');
                                                        $texto = $comp['media'] >= 70 ? 'Bom' : ($comp['media'] >= 50 ? 'Regular' : 'Baixo');
                                                        ?>
                                                        <span class="badge bg-<?php echo $status; ?>"><?php echo $texto; ?></span>
                                                    </td>
                                                </tr>
                                            <?php endforeach; ?>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                <?php endif; ?>
                
                <!-- By School/Class -->
                <?php if (!empty($relatorio['por_turma'])): ?>
                    <div class="col-lg-6">
                        <div class="card border-0 shadow-sm">
                            <div class="card-header bg-white border-bottom">
                                <h6 class="card-title mb-0">
                                    <i class="fas fa-school me-2"></i>Detalhes por Turma
                                </h6>
                            </div>
                            <div class="card-body p-0">
                                <div class="table-responsive">
                                    <table class="table table-hover mb-0">
                                        <thead class="table-light">
                                            <tr>
                                                <th>Escola</th>
                                                <th>Turma</th>
                                                <th>Alunos</th>
                                                <th>Média</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <?php foreach (array_slice($relatorio['por_turma'], 0, 15) as $turma): ?>
                                                <tr>
                                                    <td>
                                                        <small><?php echo htmlspecialchars($turma['escola']); ?></small>
                                                    </td>
                                                    <td><?php echo htmlspecialchars($turma['turma']); ?></td>
                                                    <td><?php echo $turma['total_alunos']; ?></td>
                                                    <td>
                                                        <strong><?php echo number_format($turma['media'], 1); ?>%</strong>
                                                    </td>
                                                </tr>
                                            <?php endforeach; ?>
                                            <?php if (count($relatorio['por_turma']) > 15): ?>
                                                <tr>
                                                    <td colspan="4" class="text-center text-muted">
                                                        ... e mais <?php echo count($relatorio['por_turma']) - 15; ?> turmas
                                                    </td>
                                                </tr>
                                            <?php endif; ?>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                <?php endif; ?>
            </div>
        <?php else: ?>
            <!-- No Data -->
            <div class="row">
                <div class="col-12">
                    <div class="card border-0 shadow-sm">
                        <div class="card-body text-center py-5">
                            <i class="fas fa-chart-bar fa-3x text-muted mb-3"></i>
                            <h5 class="text-muted">Nenhum dado encontrado</h5>
                            <p class="text-muted">Verifique os filtros ou certifique-se de que existem dados processados.</p>
                            <?php if ($isAdmin): ?>
                                <a href="processar.php" class="btn btn-primary">
                                    <i class="fas fa-cogs me-2"></i>Processar Dados
                                </a>
                            <?php endif; ?>
                        </div>
                    </div>
                </div>
            </div>
        <?php endif; ?>
    </div>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    
    <?php if ($relatorio): ?>
    <script>
        // Component Chart
        const componentData = <?php echo json_encode(array_map(function($item) {
            return ['componente' => $item['componente'], 'media' => $item['media']];
        }, $relatorio['por_componente'])); ?>;
        
        const componentCtx = document.getElementById('componentChart').getContext('2d');
        new Chart(componentCtx, {
            type: 'bar',
            data: {
                labels: componentData.map(item => item.componente),
                datasets: [{
                    label: 'Média (%)',
                    data: componentData.map(item => item.media),
                    backgroundColor: 'rgba(54, 162, 235, 0.8)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
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
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
        
        // Distribution Chart
        const ranges = [
            { label: 'Baixo (0-49%)', count: 0, color: '#dc3545' },
            { label: 'Regular (50-69%)', count: 0, color: '#ffc107' },
            { label: 'Bom (70-89%)', count: 0, color: '#28a745' },
            { label: 'Excelente (90-100%)', count: 0, color: '#007bff' }
        ];
        
        // Calculate distribution from component data
        componentData.forEach(item => {
            const media = item.media;
            if (media < 50) ranges[0].count++;
            else if (media < 70) ranges[1].count++;
            else if (media < 90) ranges[2].count++;
            else ranges[3].count++;
        });
        
        const distributionCtx = document.getElementById('distributionChart').getContext('2d');
        new Chart(distributionCtx, {
            type: 'doughnut',
            data: {
                labels: ranges.map(r => r.label),
                datasets: [{
                    data: ranges.map(r => r.count),
                    backgroundColor: ranges.map(r => r.color),
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    </script>
    <?php endif; ?>
</body>
</html>
