<?php
/**
 * SADE - Página de Upload CSV
 * Upload e processamento de arquivos CSV
 */

require_once 'config.php';
require_once 'includes/functions.php';

// Verificar autenticação
checkAuth();

// Inicializar classes
$dataManager = new DataManager();
$fileUploader = new FileUploader();

$error = '';
$success = '';
$uploadResult = null;

// Processar upload
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Validar CSRF
    if (!validateCSRF($_POST['csrf_token'] ?? '')) {
        $error = 'Token de segurança inválido. Tente novamente.';
    } else {
        $escolaId = (int)($_POST['escola_id'] ?? 0);
        $disciplina = trim($_POST['disciplina'] ?? '');
        $periodo = trim($_POST['periodo'] ?? '');
        
        if ($escolaId <= 0) {
            $error = 'Por favor, selecione uma escola.';
        } elseif (empty($disciplina)) {
            $error = 'Por favor, informe a disciplina.';
        } elseif (empty($periodo)) {
            $error = 'Por favor, informe o período.';
        } elseif (!isset($_FILES['csv_file']) || $_FILES['csv_file']['error'] !== UPLOAD_ERR_OK) {
            $error = 'Por favor, selecione um arquivo CSV válido.';
        } else {
            try {
                // Upload do arquivo
                $uploadResult = $fileUploader->uploadCSV($_FILES['csv_file'], $escolaId, $disciplina, $periodo);
                
                if ($uploadResult['success']) {
                    $success = 'Arquivo enviado e processado com sucesso! ' . $uploadResult['stats']['total'] . ' registros importados.';
                } else {
                    $error = $uploadResult['error'];
                }
            } catch (Exception $e) {
                $error = 'Erro ao processar arquivo: ' . $e->getMessage();
            }
        }
    }
}

// Buscar escolas para o dropdown
$escolas = $dataManager->getEscolas();

// Gerar token CSRF
$csrf_token = generateCSRF();
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo SITE_NAME; ?> - Upload CSV</title>
    
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
                        <a class="nav-link active" href="upload.php">
                            <i class="fas fa-upload me-1"></i>Upload CSV
                        </a>
                    </li>
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
                            <i class="fas fa-user me-1"></i>Admin
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
                        <h1 class="h3 mb-1">Upload de Dados CSV</h1>
                        <p class="text-muted">Importe dados de avaliações de alunos</p>
                    </div>
                    <div>
                        <a href="index.php" class="btn btn-outline-primary">
                            <i class="fas fa-arrow-left me-2"></i>Voltar ao Dashboard
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <!-- Upload Form -->
            <div class="col-lg-8">
                <div class="card border-0 shadow-sm">
                    <div class="card-header bg-white border-bottom">
                        <h5 class="card-title mb-0">
                            <i class="fas fa-cloud-upload-alt text-primary me-2"></i>
                            Enviar Arquivo CSV
                        </h5>
                    </div>
                    <div class="card-body">
                        <!-- Error/Success Messages -->
                        <?php if ($error): ?>
                            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                                <i class="fas fa-exclamation-triangle me-2"></i>
                                <?php echo htmlspecialchars($error); ?>
                                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                            </div>
                        <?php endif; ?>
                        
                        <?php if ($success): ?>
                            <div class="alert alert-success alert-dismissible fade show" role="alert">
                                <i class="fas fa-check-circle me-2"></i>
                                <?php echo htmlspecialchars($success); ?>
                                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                            </div>
                        <?php endif; ?>
                        
                        <!-- Upload Form -->
                        <form method="POST" enctype="multipart/form-data" id="uploadForm" novalidate>
                            <input type="hidden" name="csrf_token" value="<?php echo $csrf_token; ?>">
                            
                            <div class="row g-3">
                                <div class="col-md-6">
                                    <label for="escola_id" class="form-label">
                                        <i class="fas fa-school me-2"></i>Escola *
                                    </label>
                                    <select class="form-select" id="escola_id" name="escola_id" required>
                                        <option value="">Selecione uma escola...</option>
                                        <?php foreach ($escolas as $escola): ?>
                                            <option value="<?php echo $escola['id']; ?>" 
                                                    <?php echo ($_POST['escola_id'] ?? '') == $escola['id'] ? 'selected' : ''; ?>>
                                                <?php echo htmlspecialchars($escola['nome']); ?>
                                            </option>
                                        <?php endforeach; ?>
                                    </select>
                                    <div class="invalid-feedback">
                                        Por favor, selecione uma escola.
                                    </div>
                                </div>
                                
                                <div class="col-md-6">
                                    <label for="disciplina" class="form-label">
                                        <i class="fas fa-book me-2"></i>Disciplina *
                                    </label>
                                    <select class="form-select" id="disciplina" name="disciplina" required>
                                        <option value="">Selecione uma disciplina...</option>
                                        <option value="Português" <?php echo ($_POST['disciplina'] ?? '') == 'Português' ? 'selected' : ''; ?>>Português</option>
                                        <option value="Matemática" <?php echo ($_POST['disciplina'] ?? '') == 'Matemática' ? 'selected' : ''; ?>>Matemática</option>
                                        <option value="Ciências" <?php echo ($_POST['disciplina'] ?? '') == 'Ciências' ? 'selected' : ''; ?>>Ciências</option>
                                        <option value="História" <?php echo ($_POST['disciplina'] ?? '') == 'História' ? 'selected' : ''; ?>>História</option>
                                        <option value="Geografia" <?php echo ($_POST['disciplina'] ?? '') == 'Geografia' ? 'selected' : ''; ?>>Geografia</option>
                                    </select>
                                    <div class="invalid-feedback">
                                        Por favor, selecione uma disciplina.
                                    </div>
                                </div>
                                
                                <div class="col-md-6">
                                    <label for="periodo" class="form-label">
                                        <i class="fas fa-calendar me-2"></i>Período *
                                    </label>
                                    <select class="form-select" id="periodo" name="periodo" required>
                                        <option value="">Selecione o período...</option>
                                        <option value="1º Bimestre 2024" <?php echo ($_POST['periodo'] ?? '') == '1º Bimestre 2024' ? 'selected' : ''; ?>>1º Bimestre 2024</option>
                                        <option value="2º Bimestre 2024" <?php echo ($_POST['periodo'] ?? '') == '2º Bimestre 2024' ? 'selected' : ''; ?>>2º Bimestre 2024</option>
                                        <option value="3º Bimestre 2024" <?php echo ($_POST['periodo'] ?? '') == '3º Bimestre 2024' ? 'selected' : ''; ?>>3º Bimestre 2024</option>
                                        <option value="4º Bimestre 2024" <?php echo ($_POST['periodo'] ?? '') == '4º Bimestre 2024' ? 'selected' : ''; ?>>4º Bimestre 2024</option>
                                    </select>
                                    <div class="invalid-feedback">
                                        Por favor, selecione o período.
                                    </div>
                                </div>
                                
                                <div class="col-12">
                                    <label for="csv_file" class="form-label">
                                        <i class="fas fa-file-csv me-2"></i>Arquivo CSV *
                                    </label>
                                    <div class="input-group">
                                        <input type="file" class="form-control" id="csv_file" name="csv_file" 
                                               accept=".csv" required>
                                        <button class="btn btn-outline-secondary" type="button" id="fileInfo">
                                            <i class="fas fa-info-circle"></i>
                                        </button>
                                    </div>
                                    <div class="invalid-feedback">
                                        Por favor, selecione um arquivo CSV.
                                    </div>
                                    <div class="form-text">
                                        Formatos aceitos: .csv | Tamanho máximo: <?php echo MAX_UPLOAD_SIZE_MB; ?>MB
                                    </div>
                                </div>
                            </div>
                            
                            <div class="mt-4">
                                <button type="submit" class="btn btn-primary btn-lg" id="submitBtn">
                                    <i class="fas fa-cloud-upload-alt me-2"></i>
                                    <span class="btn-text">Enviar Arquivo</span>
                                    <span class="spinner-border spinner-border-sm d-none ms-2" role="status">
                                        <span class="visually-hidden">Processando...</span>
                                    </span>
                                </button>
                                <button type="button" class="btn btn-outline-secondary btn-lg ms-2" onclick="resetForm()">
                                    <i class="fas fa-undo me-2"></i>Limpar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                
                <!-- Upload Results -->
                <?php if ($uploadResult && $uploadResult['success']): ?>
                    <div class="card border-0 shadow-sm mt-4">
                        <div class="card-header bg-success text-white">
                            <h6 class="card-title mb-0">
                                <i class="fas fa-check-circle me-2"></i>
                                Resultado do Processamento
                            </h6>
                        </div>
                        <div class="card-body">
                            <div class="row g-3">
                                <div class="col-md-3">
                                    <div class="text-center">
                                        <h4 class="text-success"><?php echo $uploadResult['stats']['total']; ?></h4>
                                        <small class="text-muted">Total de Registros</small>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="text-center">
                                        <h4 class="text-primary"><?php echo $uploadResult['stats']['success']; ?></h4>
                                        <small class="text-muted">Importados</small>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="text-center">
                                        <h4 class="text-warning"><?php echo $uploadResult['stats']['errors']; ?></h4>
                                        <small class="text-muted">Erros</small>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="text-center">
                                        <h4 class="text-info"><?php echo number_format($uploadResult['stats']['media'], 1); ?>%</h4>
                                        <small class="text-muted">Média Geral</small>
                                    </div>
                                </div>
                            </div>
                            
                            <?php if (!empty($uploadResult['errors'])): ?>
                                <div class="mt-3">
                                    <h6>Erros Encontrados:</h6>
                                    <div class="alert alert-warning">
                                        <ul class="mb-0">
                                            <?php foreach (array_slice($uploadResult['errors'], 0, 5) as $error): ?>
                                                <li><?php echo htmlspecialchars($error); ?></li>
                                            <?php endforeach; ?>
                                            <?php if (count($uploadResult['errors']) > 5): ?>
                                                <li>... e mais <?php echo count($uploadResult['errors']) - 5; ?> erros</li>
                                            <?php endif; ?>
                                        </ul>
                                    </div>
                                </div>
                            <?php endif; ?>
                        </div>
                    </div>
                <?php endif; ?>
            </div>
            
            <!-- Information Panel -->
            <div class="col-lg-4">
                <!-- Instructions -->
                <div class="card border-0 shadow-sm">
                    <div class="card-header bg-white border-bottom">
                        <h6 class="card-title mb-0">
                            <i class="fas fa-info-circle text-info me-2"></i>
                            Instruções de Upload
                        </h6>
                    </div>
                    <div class="card-body">
                        <div class="step-item mb-3">
                            <div class="step-number">1</div>
                            <div class="step-content">
                                <h6>Prepare o arquivo CSV</h6>
                                <p class="text-muted small mb-0">O arquivo deve conter as colunas: nome, nota</p>
                            </div>
                        </div>
                        
                        <div class="step-item mb-3">
                            <div class="step-number">2</div>
                            <div class="step-content">
                                <h6>Selecione a escola</h6>
                                <p class="text-muted small mb-0">Escolha a escola correspondente aos dados</p>
                            </div>
                        </div>
                        
                        <div class="step-item mb-3">
                            <div class="step-number">3</div>
                            <div class="step-content">
                                <h6>Informe disciplina e período</h6>
                                <p class="text-muted small mb-0">Especifique a matéria e período da avaliação</p>
                            </div>
                        </div>
                        
                        <div class="step-item">
                            <div class="step-number">4</div>
                            <div class="step-content">
                                <h6>Faça o upload</h6>
                                <p class="text-muted small mb-0">Selecione o arquivo e clique em enviar</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- CSV Format Example -->
                <div class="card border-0 shadow-sm mt-4">
                    <div class="card-header bg-white border-bottom">
                        <h6 class="card-title mb-0">
                            <i class="fas fa-file-csv text-success me-2"></i>
                            Formato do CSV
                        </h6>
                    </div>
                    <div class="card-body">
                        <p class="text-muted small mb-3">Exemplo de arquivo CSV válido:</p>
                        <div class="bg-light p-3 rounded">
                            <code>
                                nome,nota<br>
                                João Silva,8.5<br>
                                Maria Santos,9.0<br>
                                Pedro Costa,7.2<br>
                                Ana Lima,8.8
                            </code>
                        </div>
                        
                        <div class="mt-3">
                            <button class="btn btn-sm btn-outline-success" onclick="downloadTemplate()">
                                <i class="fas fa-download me-1"></i>
                                Baixar Modelo
                            </button>
                        </div>
                    </div>
                </div>
                
                <!-- Upload History -->
                <div class="card border-0 shadow-sm mt-4">
                    <div class="card-header bg-white border-bottom">
                        <h6 class="card-title mb-0">
                            <i class="fas fa-history text-warning me-2"></i>
                            Uploads Recentes
                        </h6>
                    </div>
                    <div class="card-body">
                        <?php 
                        $uploadsRecentes = $dataManager->getUploadsRecentes(3);
                        if (empty($uploadsRecentes)): 
                        ?>
                            <div class="text-center py-3">
                                <i class="fas fa-inbox fa-2x text-muted mb-2"></i>
                                <p class="text-muted small mb-0">Nenhum upload encontrado</p>
                            </div>
                        <?php else: ?>
                            <?php foreach ($uploadsRecentes as $upload): ?>
                                <div class="d-flex align-items-center mb-3">
                                    <div class="me-3">
                                        <i class="fas fa-file-csv fa-lg text-success"></i>
                                    </div>
                                    <div class="flex-grow-1">
                                        <h6 class="mb-1 small"><?php echo htmlspecialchars($upload['nome']); ?></h6>
                                        <small class="text-muted">
                                            <?php echo date('d/m/Y H:i', strtotime($upload['created_at'])); ?>
                                        </small>
                                    </div>
                                    <div>
                                        <span class="badge bg-<?php echo $upload['status'] === 'processado' ? 'success' : 'warning'; ?>">
                                            <?php echo ucfirst($upload['status']); ?>
                                        </span>
                                    </div>
                                </div>
                            <?php endforeach; ?>
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
    
    <script>
        // Form validation
        document.getElementById('uploadForm').addEventListener('submit', function(e) {
            const form = this;
            const btn = document.getElementById('submitBtn');
            const btnText = btn.querySelector('.btn-text');
            const spinner = btn.querySelector('.spinner-border');
            
            if (!form.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
                form.classList.add('was-validated');
                return;
            }
            
            // Show loading state
            btn.disabled = true;
            btnText.textContent = 'Processando...';
            spinner.classList.remove('d-none');
        });
        
        // File validation
        document.getElementById('csv_file').addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                // Check file size
                const maxSize = <?php echo MAX_UPLOAD_SIZE; ?>;
                if (file.size > maxSize) {
                    alert('Arquivo muito grande! Tamanho máximo: <?php echo MAX_UPLOAD_SIZE_MB; ?>MB');
                    this.value = '';
                    return;
                }
                
                // Check file type
                if (!file.name.toLowerCase().endsWith('.csv')) {
                    alert('Por favor, selecione apenas arquivos CSV!');
                    this.value = '';
                    return;
                }
            }
        });
        
        // Reset form
        function resetForm() {
            document.getElementById('uploadForm').reset();
            document.getElementById('uploadForm').classList.remove('was-validated');
        }
        
        // Download CSV template
        function downloadTemplate() {
            const csvContent = "nome,nota\nJoão Silva,8.5\nMaria Santos,9.0\nPedro Costa,7.2\nAna Lima,8.8";
            const blob = new Blob([csvContent], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'modelo_notas.csv';
            a.click();
            window.URL.revokeObjectURL(url);
        }
        
        // File info button
        document.getElementById('fileInfo').addEventListener('click', function() {
            alert('Formato CSV:\n\n' +
                  '• Primeira linha: cabeçalho (nome,nota)\n' +
                  '• Demais linhas: dados dos alunos\n' +
                  '• Separador: vírgula (,)\n' +
                  '• Codificação: UTF-8\n' +
                  '• Tamanho máximo: <?php echo MAX_UPLOAD_SIZE_MB; ?>MB');
        });
    </script>
</body>
</html>
