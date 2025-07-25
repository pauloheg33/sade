<?php
/**
 * SADE - Página de Login
 * Sistema de autenticação
 */

require_once 'config.php';

// Se já estiver logado, redirecionar
if (isLoggedIn()) {
    header('Location: index.php');
    exit;
}

$error = '';
$success = '';

// Processar login
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';
    $remember = isset($_POST['remember']);
    
    // Validar CSRF
    if (!validateCSRF($_POST['csrf_token'] ?? '')) {
        $error = 'Token de segurança inválido. Tente novamente.';
    } elseif (empty($email) || empty($password)) {
        $error = 'Por favor, preencha todos os campos.';
    } else {
        try {
            $db = getDatabase();
            $stmt = $db->prepare("SELECT id, nome, email, senha, tipo FROM usuarios WHERE email = ? AND ativo = 1");
            $stmt->execute([$email]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if ($user && password_verify($password, $user['senha'])) {
                // Login bem-sucedido
                $_SESSION['user_id'] = $user['id'];
                $_SESSION['user_name'] = $user['nome'];
                $_SESSION['user_email'] = $user['email'];
                $_SESSION['user_type'] = $user['tipo'];
                $_SESSION['login_time'] = time();
                $_SESSION['last_activity'] = time();
                
                // Cookie "lembrar-me"
                if ($remember) {
                    $token = bin2hex(random_bytes(32));
                    setcookie('remember_token', $token, time() + (30 * 24 * 60 * 60), '/', '', true, true);
                }
                
                // Log da atividade
                logActivity("Login realizado", "Usuário: {$user['email']} ({$user['tipo']})");
                
                // Redirecionar baseado no tipo de usuário
                $redirect = $_GET['redirect'] ?? 'index.php';
                header('Location: ' . $redirect);
                exit;
            } else {
                $error = 'Email ou senha incorretos.';
                logActivity("Tentativa de login falhada", "Email: $email");
            }
        } catch (Exception $e) {
            $error = 'Erro interno do sistema. Tente novamente.';
            logActivity("Erro no login", $e->getMessage());
        }
    }
}

// Gerar token CSRF
$csrf_token = generateCSRF();
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo SITE_NAME; ?> - Login</title>
    
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Font Awesome -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <!-- Custom CSS -->
    <link href="assets/css/style.css" rel="stylesheet">
    
    <style>
        body {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
        }
        
        .login-container {
            background: white;
            border-radius: 20px;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        
        .login-header {
            background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
            color: white;
            padding: 2rem;
            text-align: center;
        }
        
        .login-form {
            padding: 2rem;
        }
        
        .form-control {
            border-radius: 10px;
            border: 1px solid #ddd;
            padding: 12px 15px;
            font-size: 16px;
        }
        
        .form-control:focus {
            border-color: #007bff;
            box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
        }
        
        .btn-login {
            background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
            border: none;
            border-radius: 10px;
            padding: 12px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .btn-login:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0, 123, 255, 0.3);
        }
        
        .demo-info {
            background: #f8f9fa;
            border-radius: 10px;
            padding: 1rem;
            margin-bottom: 1rem;
            border-left: 4px solid #28a745;
        }
        
        .floating-shapes {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            z-index: -1;
        }
        
        .shape {
            position: absolute;
            opacity: 0.1;
            animation: float 6s ease-in-out infinite;
        }
        
        .shape:nth-child(1) {
            top: 10%;
            left: 20%;
            animation-delay: 0s;
        }
        
        .shape:nth-child(2) {
            top: 20%;
            right: 20%;
            animation-delay: 2s;
        }
        
        .shape:nth-child(3) {
            bottom: 20%;
            left: 10%;
            animation-delay: 4s;
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
        }
    </style>
</head>
<body>
    <!-- Floating Shapes -->
    <div class="floating-shapes">
        <div class="shape">
            <i class="fas fa-graduation-cap fa-5x"></i>
        </div>
        <div class="shape">
            <i class="fas fa-chart-line fa-4x"></i>
        </div>
        <div class="shape">
            <i class="fas fa-users fa-4x"></i>
        </div>
    </div>
    
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6 col-lg-5">
                <div class="login-container">
                    <!-- Header -->
                    <div class="login-header">
                        <div class="mb-3">
                            <i class="fas fa-graduation-cap fa-3x"></i>
                        </div>
                        <h2 class="mb-1">SADE</h2>
                        <p class="mb-0">Sistema de Avaliação e Desempenho Educacional</p>
                    </div>
                    
                    <!-- Form -->
                    <div class="login-form">
                        <!-- Demo Info -->
                        <div class="demo-info">
                            <h6 class="text-success mb-2">
                                <i class="fas fa-info-circle me-2"></i>Acesso Demo
                            </h6>
                            <p class="mb-1"><strong>Admin:</strong> admin@sade.local / admin123</p>
                            <p class="mb-0"><small>Administradores podem gerenciar usuários e ver todos os dados</small></p>
                        </div>
                        
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
                        
                        <!-- Login Form -->
                        <form method="POST" id="loginForm" novalidate>
                            <input type="hidden" name="csrf_token" value="<?php echo $csrf_token; ?>">
                            
                            <div class="mb-3">
                                <label for="email" class="form-label">
                                    <i class="fas fa-envelope me-2"></i>Email
                                </label>
                                <input type="email" class="form-control" id="email" name="email" 
                                       value="<?php echo htmlspecialchars($_POST['email'] ?? ''); ?>"
                                       required autocomplete="email">
                                <div class="invalid-feedback">
                                    Por favor, informe um email válido.
                                </div>
                            </div>
                            
                            <div class="mb-3">
                                <label for="password" class="form-label">
                                    <i class="fas fa-lock me-2"></i>Senha
                                </label>
                                <div class="input-group">
                                    <input type="password" class="form-control" id="password" name="password" 
                                           required autocomplete="current-password">
                                    <button class="btn btn-outline-secondary" type="button" id="togglePassword">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                </div>
                                <div class="invalid-feedback">
                                    Por favor, informe a senha.
                                </div>
                            </div>
                            
                            <div class="mb-3 form-check">
                                <input type="checkbox" class="form-check-input" id="remember" name="remember">
                                <label class="form-check-label" for="remember">
                                    Lembrar-me por 30 dias
                                </label>
                            </div>
                            
                            <div class="d-grid">
                                <button type="submit" class="btn btn-primary btn-login">
                                    <i class="fas fa-sign-in-alt me-2"></i>
                                    <span class="btn-text">Entrar</span>
                                    <span class="spinner-border spinner-border-sm d-none" role="status">
                                        <span class="visually-hidden">Carregando...</span>
                                    </span>
                                </button>
                            </div>
                        </form>
                        
                        <!-- Links -->
                        <div class="text-center mt-4">
                            <div class="row">
                                <div class="col-12">
                                    <a href="#" class="text-decoration-none" data-bs-toggle="modal" data-bs-target="#helpModal">
                                        <i class="fas fa-question-circle me-1"></i>
                                        Precisa de ajuda?
                                    </a>
                                </div>
                            </div>
                        </div>
                        
                        <!-- System Info -->
                        <div class="text-center mt-4 pt-3 border-top">
                            <small class="text-muted">
                                <i class="fas fa-shield-alt me-1"></i>
                                Sistema seguro e criptografado
                                <br>
                                Versão 2.0 | &copy; 2024 SADE
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Help Modal -->
    <div class="modal fade" id="helpModal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        <i class="fas fa-question-circle text-primary me-2"></i>
                        Ajuda - Sistema SADE
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <h6>Credenciais Demo:</h6>
                    <ul>
                        <li><strong>Admin:</strong> admin@sade.local / admin123</li>
                        <li><small>Acesso completo ao sistema</small></li>
                    </ul>
                    
                    <h6 class="mt-3">Funcionalidades por Perfil:</h6>
                    <div class="row">
                        <div class="col-6">
                            <strong>Administrador:</strong>
                            <ul class="small">
                                <li>Gerenciar usuários</li>
                                <li>Processar provas</li>
                                <li>Relatórios completos</li>
                                <li>Configurações</li>
                            </ul>
                        </div>
                        <div class="col-6">
                            <strong>Usuário:</strong>
                            <ul class="small">
                                <li>Dashboard com filtros</li>
                                <li>Ver desempenho de turmas</li>
                                <li>Relatórios básicos</li>
                            </ul>
                        </div>
                    </div>
                    
                    <h6 class="mt-3">Suporte:</h6>
                    <p class="mb-0">Este é um sistema demonstrativo. Para suporte técnico ou dúvidas sobre implementação, entre em contato com o desenvolvedor.</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    
    <!-- Custom JS -->
    <script>
        // Form validation
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            const form = this;
            const btn = form.querySelector('button[type="submit"]');
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
            btnText.textContent = 'Entrando...';
            spinner.classList.remove('d-none');
        });
        
        // Toggle password visibility
        document.getElementById('togglePassword').addEventListener('click', function() {
            const password = document.getElementById('password');
            const icon = this.querySelector('i');
            
            if (password.type === 'password') {
                password.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                password.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
        
        // Auto-fill demo credentials
        document.addEventListener('DOMContentLoaded', function() {
            document.getElementById('email').value = 'admin@sade.local';
            document.getElementById('password').value = 'admin123';
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', function(e) {
            // Alt + D for demo fill
            if (e.altKey && e.key === 'd') {
                e.preventDefault();
                document.getElementById('email').value = 'admin@sade.local';
                document.getElementById('password').value = 'admin123';
                document.getElementById('email').focus();
            }
        });
        
        // Prevent multiple submissions
        let formSubmitted = false;
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            if (formSubmitted) {
                e.preventDefault();
                return false;
            }
            formSubmitted = true;
        });
    </script>
</body>
</html>
