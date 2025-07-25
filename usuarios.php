<?php
/**
 * SADE - Gerenciamento de Usuários
 * Página para administradores gerenciarem usuários
 */

require_once 'config.php';
require_once 'includes/functions.php';

// Verificar autenticação de admin
checkAuth(USER_TYPE_ADMIN);

$message = '';
$messageType = '';
$action = $_GET['action'] ?? '';

// Processar ações
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!validateCSRF($_POST['csrf_token'] ?? '')) {
        $message = 'Token de segurança inválido.';
        $messageType = 'danger';
    } else {
        $userManager = new UserManager();
        
        switch ($_POST['action']) {
            case 'create':
                try {
                    $data = [
                        'name' => trim($_POST['name']),
                        'email' => trim($_POST['email']),
                        'password' => $_POST['password'],
                        'user_type' => $_POST['user_type'],
                        'status' => $_POST['status'] ?? 'ativo'
                    ];
                    
                    if (empty($data['name']) || empty($data['email']) || empty($data['password'])) {
                        throw new Exception('Todos os campos são obrigatórios.');
                    }
                    
                    if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
                        throw new Exception('Email inválido.');
                    }
                    
                    if (strlen($data['password']) < 6) {
                        throw new Exception('A senha deve ter pelo menos 6 caracteres.');
                    }
                    
                    $userId = $userManager->createUser($data);
                    $message = 'Usuário criado com sucesso!';
                    $messageType = 'success';
                    
                    logActivity('Usuário criado', "ID: $userId, Email: {$data['email']}");
                    
                } catch (Exception $e) {
                    $message = 'Erro ao criar usuário: ' . $e->getMessage();
                    $messageType = 'danger';
                }
                break;
                
            case 'update':
                try {
                    $data = [
                        'id' => $_POST['user_id'],
                        'name' => trim($_POST['name']),
                        'email' => trim($_POST['email']),
                        'user_type' => $_POST['user_type'],
                        'status' => $_POST['status']
                    ];
                    
                    if (!empty($_POST['password'])) {
                        if (strlen($_POST['password']) < 6) {
                            throw new Exception('A senha deve ter pelo menos 6 caracteres.');
                        }
                        $data['password'] = $_POST['password'];
                    }
                    
                    if (empty($data['name']) || empty($data['email'])) {
                        throw new Exception('Nome e email são obrigatórios.');
                    }
                    
                    if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
                        throw new Exception('Email inválido.');
                    }
                    
                    $userManager->updateUser($data);
                    $message = 'Usuário atualizado com sucesso!';
                    $messageType = 'success';
                    
                    logActivity('Usuário atualizado', "ID: {$data['id']}, Email: {$data['email']}");
                    
                } catch (Exception $e) {
                    $message = 'Erro ao atualizar usuário: ' . $e->getMessage();
                    $messageType = 'danger';
                }
                break;
                
            case 'delete':
                try {
                    $userId = $_POST['user_id'];
                    
                    if ($userId == $_SESSION['user_id']) {
                        throw new Exception('Você não pode excluir sua própria conta.');
                    }
                    
                    $userManager->deleteUser($userId);
                    $message = 'Usuário excluído com sucesso!';
                    $messageType = 'success';
                    
                    logActivity('Usuário excluído', "ID: $userId");
                    
                } catch (Exception $e) {
                    $message = 'Erro ao excluir usuário: ' . $e->getMessage();
                    $messageType = 'danger';
                }
                break;
        }
    }
}

// Obter lista de usuários
$userManager = new UserManager();
$usuarios = $userManager->getAllUsers();

// Obter estatísticas
$stats = [
    'total' => count($usuarios),
    'admins' => count(array_filter($usuarios, fn($u) => $u['user_type'] === USER_TYPE_ADMIN)),
    'users' => count(array_filter($usuarios, fn($u) => $u['user_type'] === USER_TYPE_USER)),
    'ativos' => count(array_filter($usuarios, fn($u) => $u['status'] === 'ativo'))
];

// Gerar token CSRF
$csrf_token = generateCSRF();
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo SITE_NAME; ?> - Gerenciamento de Usuários</title>
    
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
                        <a class="nav-link" href="processar.php">
                            <i class="fas fa-cogs me-1"></i>Processar Arquivos
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" href="usuarios.php">
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
                        <h1 class="h3 mb-1">Gerenciamento de Usuários</h1>
                        <p class="text-muted">Gerencie contas de usuários e administradores</p>
                    </div>
                    <div>
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createUserModal">
                            <i class="fas fa-plus me-2"></i>Novo Usuário
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

        <!-- Statistics -->
        <div class="row g-4 mb-4">
            <div class="col-lg-3 col-md-6">
                <div class="card border-0 shadow-sm text-center">
                    <div class="card-body">
                        <div class="stats-icon bg-primary mx-auto mb-3">
                            <i class="fas fa-users"></i>
                        </div>
                        <h4><?php echo $stats['total']; ?></h4>
                        <p class="text-muted mb-0">Total de Usuários</p>
                    </div>
                </div>
            </div>
            
            <div class="col-lg-3 col-md-6">
                <div class="card border-0 shadow-sm text-center">
                    <div class="card-body">
                        <div class="stats-icon bg-warning mx-auto mb-3">
                            <i class="fas fa-user-shield"></i>
                        </div>
                        <h4><?php echo $stats['admins']; ?></h4>
                        <p class="text-muted mb-0">Administradores</p>
                    </div>
                </div>
            </div>
            
            <div class="col-lg-3 col-md-6">
                <div class="card border-0 shadow-sm text-center">
                    <div class="card-body">
                        <div class="stats-icon bg-info mx-auto mb-3">
                            <i class="fas fa-user"></i>
                        </div>
                        <h4><?php echo $stats['users']; ?></h4>
                        <p class="text-muted mb-0">Usuários Comuns</p>
                    </div>
                </div>
            </div>
            
            <div class="col-lg-3 col-md-6">
                <div class="card border-0 shadow-sm text-center">
                    <div class="card-body">
                        <div class="stats-icon bg-success mx-auto mb-3">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <h4><?php echo $stats['ativos']; ?></h4>
                        <p class="text-muted mb-0">Usuários Ativos</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Users Table -->
        <div class="row">
            <div class="col-12">
                <div class="card border-0 shadow-sm">
                    <div class="card-header bg-white border-bottom">
                        <h5 class="card-title mb-0">
                            <i class="fas fa-list me-2"></i>
                            Lista de Usuários
                        </h5>
                    </div>
                    <div class="card-body p-0">
                        <?php if (empty($usuarios)): ?>
                            <div class="text-center py-5">
                                <i class="fas fa-users fa-3x text-muted mb-3"></i>
                                <h5 class="text-muted">Nenhum usuário encontrado</h5>
                                <p class="text-muted">Comece criando o primeiro usuário.</p>
                            </div>
                        <?php else: ?>
                            <div class="table-responsive">
                                <table class="table table-hover mb-0">
                                    <thead class="table-light">
                                        <tr>
                                            <th>ID</th>
                                            <th>Nome</th>
                                            <th>Email</th>
                                            <th>Tipo</th>
                                            <th>Status</th>
                                            <th>Criado em</th>
                                            <th>Último Acesso</th>
                                            <th width="150">Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <?php foreach ($usuarios as $user): ?>
                                            <tr>
                                                <td><?php echo $user['id']; ?></td>
                                                <td>
                                                    <div class="d-flex align-items-center">
                                                        <div class="avatar-sm bg-<?php echo $user['user_type'] === USER_TYPE_ADMIN ? 'warning' : 'primary'; ?> rounded-circle me-2 d-flex align-items-center justify-content-center">
                                                            <i class="fas fa-<?php echo $user['user_type'] === USER_TYPE_ADMIN ? 'user-shield' : 'user'; ?> text-white"></i>
                                                        </div>
                                                        <div>
                                                            <div class="fw-bold"><?php echo htmlspecialchars($user['name']); ?></div>
                                                            <?php if ($user['id'] == $_SESSION['user_id']): ?>
                                                                <small class="text-muted">(Você)</small>
                                                            <?php endif; ?>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td><?php echo htmlspecialchars($user['email']); ?></td>
                                                <td>
                                                    <span class="badge bg-<?php echo $user['user_type'] === USER_TYPE_ADMIN ? 'warning' : 'primary'; ?>">
                                                        <?php echo $user['user_type'] === USER_TYPE_ADMIN ? 'Admin' : 'Usuário'; ?>
                                                    </span>
                                                </td>
                                                <td>
                                                    <span class="badge bg-<?php echo $user['status'] === 'ativo' ? 'success' : 'secondary'; ?>">
                                                        <?php echo ucfirst($user['status']); ?>
                                                    </span>
                                                </td>
                                                <td>
                                                    <small class="text-muted">
                                                        <?php echo date('d/m/Y H:i', strtotime($user['created_at'])); ?>
                                                    </small>
                                                </td>
                                                <td>
                                                    <small class="text-muted">
                                                        <?php echo $user['last_login'] ? date('d/m/Y H:i', strtotime($user['last_login'])) : 'Nunca'; ?>
                                                    </small>
                                                </td>
                                                <td>
                                                    <div class="btn-group btn-group-sm" role="group">
                                                        <button type="button" class="btn btn-outline-primary" onclick="editUser(<?php echo htmlspecialchars(json_encode($user)); ?>)">
                                                            <i class="fas fa-edit"></i>
                                                        </button>
                                                        <?php if ($user['id'] != $_SESSION['user_id']): ?>
                                                            <button type="button" class="btn btn-outline-danger" onclick="deleteUser(<?php echo $user['id']; ?>, '<?php echo htmlspecialchars($user['name']); ?>')">
                                                                <i class="fas fa-trash"></i>
                                                            </button>
                                                        <?php endif; ?>
                                                    </div>
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
        </div>
    </div>

    <!-- Create User Modal -->
    <div class="modal fade" id="createUserModal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        <i class="fas fa-user-plus me-2"></i>Novo Usuário
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <form method="POST">
                    <input type="hidden" name="csrf_token" value="<?php echo $csrf_token; ?>">
                    <input type="hidden" name="action" value="create">
                    
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="create_name" class="form-label">Nome Completo</label>
                            <input type="text" class="form-control" id="create_name" name="name" required>
                        </div>
                        
                        <div class="mb-3">
                            <label for="create_email" class="form-label">Email</label>
                            <input type="email" class="form-control" id="create_email" name="email" required>
                        </div>
                        
                        <div class="mb-3">
                            <label for="create_password" class="form-label">Senha</label>
                            <input type="password" class="form-control" id="create_password" name="password" required minlength="6">
                            <div class="form-text">Mínimo de 6 caracteres.</div>
                        </div>
                        
                        <div class="mb-3">
                            <label for="create_user_type" class="form-label">Tipo de Usuário</label>
                            <select class="form-select" id="create_user_type" name="user_type" required>
                                <option value="<?php echo USER_TYPE_USER; ?>">Usuário</option>
                                <option value="<?php echo USER_TYPE_ADMIN; ?>">Administrador</option>
                            </select>
                        </div>
                        
                        <div class="mb-3">
                            <label for="create_status" class="form-label">Status</label>
                            <select class="form-select" id="create_status" name="status" required>
                                <option value="ativo">Ativo</option>
                                <option value="inativo">Inativo</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="submit" class="btn btn-primary">
                            <i class="fas fa-save me-2"></i>Criar Usuário
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- Edit User Modal -->
    <div class="modal fade" id="editUserModal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        <i class="fas fa-user-edit me-2"></i>Editar Usuário
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <form method="POST">
                    <input type="hidden" name="csrf_token" value="<?php echo $csrf_token; ?>">
                    <input type="hidden" name="action" value="update">
                    <input type="hidden" name="user_id" id="edit_user_id">
                    
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="edit_name" class="form-label">Nome Completo</label>
                            <input type="text" class="form-control" id="edit_name" name="name" required>
                        </div>
                        
                        <div class="mb-3">
                            <label for="edit_email" class="form-label">Email</label>
                            <input type="email" class="form-control" id="edit_email" name="email" required>
                        </div>
                        
                        <div class="mb-3">
                            <label for="edit_password" class="form-label">Nova Senha</label>
                            <input type="password" class="form-control" id="edit_password" name="password" minlength="6">
                            <div class="form-text">Deixe em branco para manter a senha atual.</div>
                        </div>
                        
                        <div class="mb-3">
                            <label for="edit_user_type" class="form-label">Tipo de Usuário</label>
                            <select class="form-select" id="edit_user_type" name="user_type" required>
                                <option value="<?php echo USER_TYPE_USER; ?>">Usuário</option>
                                <option value="<?php echo USER_TYPE_ADMIN; ?>">Administrador</option>
                            </select>
                        </div>
                        
                        <div class="mb-3">
                            <label for="edit_status" class="form-label">Status</label>
                            <select class="form-select" id="edit_status" name="status" required>
                                <option value="ativo">Ativo</option>
                                <option value="inativo">Inativo</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="submit" class="btn btn-primary">
                            <i class="fas fa-save me-2"></i>Salvar Alterações
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div class="modal fade" id="deleteUserModal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title text-danger">
                        <i class="fas fa-exclamation-triangle me-2"></i>Confirmar Exclusão
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <p>Tem certeza que deseja excluir o usuário <strong id="delete_user_name"></strong>?</p>
                    <p class="text-danger"><i class="fas fa-warning me-1"></i>Esta ação não pode ser desfeita.</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <form method="POST" class="d-inline">
                        <input type="hidden" name="csrf_token" value="<?php echo $csrf_token; ?>">
                        <input type="hidden" name="action" value="delete">
                        <input type="hidden" name="user_id" id="delete_user_id">
                        <button type="submit" class="btn btn-danger">
                            <i class="fas fa-trash me-2"></i>Excluir Usuário
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    
    <script>
        function editUser(user) {
            document.getElementById('edit_user_id').value = user.id;
            document.getElementById('edit_name').value = user.name;
            document.getElementById('edit_email').value = user.email;
            document.getElementById('edit_user_type').value = user.user_type;
            document.getElementById('edit_status').value = user.status;
            document.getElementById('edit_password').value = '';
            
            new bootstrap.Modal(document.getElementById('editUserModal')).show();
        }
        
        function deleteUser(userId, userName) {
            document.getElementById('delete_user_id').value = userId;
            document.getElementById('delete_user_name').textContent = userName;
            
            new bootstrap.Modal(document.getElementById('deleteUserModal')).show();
        }
        
        // Reset form when modal is closed
        document.getElementById('createUserModal').addEventListener('hidden.bs.modal', function () {
            this.querySelector('form').reset();
        });
        
        document.getElementById('editUserModal').addEventListener('hidden.bs.modal', function () {
            this.querySelector('form').reset();
        });
    </script>
</body>
</html>
