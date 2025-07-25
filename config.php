<?php
/**
 * SADE - Sistema de Avaliação e Desempenho Educacional
 * Configurações principais do sistema
 * 
 * @author Paulo Henrique
 * @version 2.0 (PHP)
 * @date 2025-07-25
 */

// Configurações de segurança da sessão
ini_set('session.cookie_httponly', 1);
ini_set('session.cookie_secure', 0); // Definir como 1 em HTTPS
ini_set('session.use_only_cookies', 1);
ini_set('session.cookie_samesite', 'Strict');

// Configurações de erro (apenas em desenvolvimento)
if (getenv('ENVIRONMENT') === 'development') {
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
} else {
    error_reporting(0);
    ini_set('display_errors', 0);
}

// Iniciar sessão se ainda não iniciada
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Configurações do sistema
define('SITE_NAME', 'SADE - Sistema de Avaliação e Desempenho Educacional');
define('SITE_VERSION', '2.0.1');
define('BASE_PATH', dirname(__FILE__));

// Configurações de diretórios
define('DATA_DIR', BASE_PATH . '/data/');
define('PROVAS_DIR', DATA_DIR . 'provas/');
define('GABARITOS_DIR', DATA_DIR . 'gabaritos/');
define('LOGS_DIR', BASE_PATH . '/logs/');

// Configurações de banco de dados
define('DB_FILE', DATA_DIR . 'sade.db');

// Configurações de segurança
define('SESSION_TIMEOUT', 3600); // 1 hora
define('CSRF_TOKEN_EXPIRE', 3600); // 1 hora

// Tipos de usuário
define('USER_TYPE_ADMIN', 'admin');
define('USER_TYPE_USER', 'user');

// Timezone
date_default_timezone_set('America/Sao_Paulo');

// Criar diretórios necessários
if (!is_dir(DATA_DIR)) mkdir(DATA_DIR, 0755, true);
if (!is_dir(PROVAS_DIR)) mkdir(PROVAS_DIR, 0755, true);
if (!is_dir(GABARITOS_DIR)) mkdir(GABARITOS_DIR, 0755, true);
if (!is_dir(LOGS_DIR)) mkdir(LOGS_DIR, 0755, true);

/**
 * Conectar ao banco SQLite
 */
function getDatabase() {
    static $pdo = null;
    
    if ($pdo === null) {
        try {
            $pdo = new PDO('sqlite:' . DB_FILE);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
            $pdo->exec('PRAGMA foreign_keys = ON');
            
            // Inicializar banco se necessário
            initializeDatabase($pdo);
        } catch (PDOException $e) {
            error_log('Erro de conexão com banco: ' . $e->getMessage());
            die('Erro interno do sistema. Tente novamente.');
        }
    }
    
    return $pdo;
}

/**
 * Inicializar estrutura do banco
 */
function initializeDatabase($pdo) {
    // Criar tabela de usuários
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            user_type TEXT NOT NULL DEFAULT 'user',
            status TEXT NOT NULL DEFAULT 'ativo',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            last_login DATETIME,
            remember_token TEXT
        )
    ");
    
    // Criar usuário admin padrão se não existir
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM usuarios WHERE user_type = 'admin'");
    $stmt->execute();
    if ($stmt->fetchColumn() == 0) {
        $adminPassword = password_hash('admin123', PASSWORD_DEFAULT);
        $stmt = $pdo->prepare("
            INSERT INTO usuarios (name, email, password, user_type) 
            VALUES (?, ?, ?, ?)
        ");
        $stmt->execute(['Administrador', 'admin@sade.local', $adminPassword, 'admin']);
    }
}

/**
 * Verificar autenticação
 */
function checkAuth($requiredType = null) {
    // Verificar se está logado
    if (!isLoggedIn()) {
        redirectToLogin();
    }
    
    // Verificar timeout da sessão
    if (isset($_SESSION['last_activity']) && (time() - $_SESSION['last_activity'] > SESSION_TIMEOUT)) {
        destroySession();
        redirectToLogin('timeout=1');
    }
    
    // Verificar tipo de usuário se especificado
    if ($requiredType && $_SESSION['user_type'] !== $requiredType) {
        header('Location: index.php?access_denied=1');
        exit();
    }
    
    // Regenerar ID da sessão periodicamente para segurança
    if (!isset($_SESSION['last_regeneration']) || (time() - $_SESSION['last_regeneration'] > 300)) {
        session_regenerate_id(true);
        $_SESSION['last_regeneration'] = time();
    }
    
    $_SESSION['last_activity'] = time();
}

/**
 * Verificar se é admin
 */
function isAdmin() {
    return isset($_SESSION['user_type']) && $_SESSION['user_type'] === USER_TYPE_ADMIN;
}

/**
 * Verificar se está logado
 */
function isLoggedIn() {
    return isset($_SESSION['user_id']) && 
           isset($_SESSION['user_type']) && 
           isset($_SESSION['login_time']);
}

/**
 * Redirecionar para login
 */
function redirectToLogin($params = '') {
    $url = 'login.php';
    if ($params) {
        $url .= '?' . $params;
    }
    header('Location: ' . $url);
    exit();
}

/**
 * Destruir sessão
 */
function destroySession() {
    session_destroy();
    session_start();
}

/**
 * Gerar token CSRF
 */
function generateCSRFToken() {
    if (!isset($_SESSION['csrf_token']) || !isset($_SESSION['csrf_token_time']) || 
        (time() - $_SESSION['csrf_token_time'] > CSRF_TOKEN_EXPIRE)) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
        $_SESSION['csrf_token_time'] = time();
    }
    return $_SESSION['csrf_token'];
}

/**
 * Validar token CSRF
 */
function validateCSRFToken($token) {
    return isset($_SESSION['csrf_token']) && 
           isset($_SESSION['csrf_token_time']) && 
           (time() - $_SESSION['csrf_token_time'] <= CSRF_TOKEN_EXPIRE) &&
           hash_equals($_SESSION['csrf_token'], $token);
}

/**
 * Log de atividades
 */
function logActivity($action, $details = '') {
    try {
        $userId = $_SESSION['user_id'] ?? 'anonymous';
        $userEmail = $_SESSION['user_email'] ?? 'unknown';
        $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
        $userAgent = $_SERVER['HTTP_USER_AGENT'] ?? 'unknown';
        
        $log = sprintf(
            "[%s] User: %s (%s) | Action: %s | Details: %s | IP: %s | UA: %s\n",
            date('Y-m-d H:i:s'),
            $userId,
            $userEmail,
            $action,
            $details,
            $ip,
            $userAgent
        );
        
        file_put_contents(LOGS_DIR . 'activity.log', $log, FILE_APPEND | LOCK_EX);
    } catch (Exception $e) {
        error_log('Erro ao gravar log: ' . $e->getMessage());
    }
}

/**
 * Sanitizar entrada
 */
function sanitizeInput($input) {
    if (is_array($input)) {
        return array_map('sanitizeInput', $input);
    }
    return htmlspecialchars(trim($input), ENT_QUOTES, 'UTF-8');
}

/**
 * Validar email
 */
function validateEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

/**
 * Escapar output para HTML
 */
function escape($text) {
    return htmlspecialchars($text, ENT_QUOTES, 'UTF-8');
}

/**
 * Mostrar mensagem de erro
 */
function showError($message) {
    return '<div class="alert alert-danger alert-dismissible fade show" role="alert">' .
           '<i class="fas fa-exclamation-circle me-2"></i>' . escape($message) .
           '<button type="button" class="btn-close" data-bs-dismiss="alert"></button>' .
           '</div>';
}

/**
 * Mostrar mensagem de sucesso
 */
function showSuccess($message) {
    return '<div class="alert alert-success alert-dismissible fade show" role="alert">' .
           '<i class="fas fa-check-circle me-2"></i>' . escape($message) .
           '<button type="button" class="btn-close" data-bs-dismiss="alert"></button>' .
           '</div>';
}

/**
 * Resposta JSON padronizada
 */
function jsonResponse($success = true, $message = '', $data = []) {
    header('Content-Type: application/json');
    echo json_encode([
        'success' => $success,
        'message' => $message,
        'data' => $data,
        'timestamp' => time()
    ]);
    exit();
}

// Autoload das funções principais
require_once BASE_PATH . '/includes/functions.php';
?>
}

// Função para verificar autenticação
function checkAuth($requiredType = null) {
    if (!isset($_SESSION['user_id']) || !isset($_SESSION['user_type'])) {
        header('Location: login.php');
        exit();
    }
    
    // Verificar timeout da sessão
    if (isset($_SESSION['last_activity']) && (time() - $_SESSION['last_activity'] > SESSION_TIMEOUT)) {
        session_destroy();
        header('Location: login.php?timeout=1');
        exit();
    }
    
    // Verificar tipo de usuário se especificado
    if ($requiredType && $_SESSION['user_type'] !== $requiredType) {
        header('Location: index.php?access_denied=1');
        exit();
    }
    
    $_SESSION['last_activity'] = time();
}

// Função para verificar se é admin
function isAdmin() {
    return isset($_SESSION['user_type']) && $_SESSION['user_type'] === USER_TYPE_ADMIN;
}

// Função para verificar se está logado
function isLoggedIn() {
    return isset($_SESSION['user_id']) && isset($_SESSION['user_type']);
}

// Função para log de atividades
function logActivity($action, $details = '') {
    $log = date('Y-m-d H:i:s') . " - $action";
    if ($details) {
        $log .= " - $details";
    }
    $log .= " - IP: " . $_SERVER['REMOTE_ADDR'] . "\n";
    
    file_put_contents(BASE_PATH . '/logs/activity.log', $log, FILE_APPEND | LOCK_EX);
}

// Função para sanitizar entrada
function sanitizeInput($input) {
    return htmlspecialchars(trim($input), ENT_QUOTES, 'UTF-8');
}

// Função para gerar CSRF token
function generateCSRF() {
    if (!isset($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

// Função para verificar CSRF token
function validateCSRF($token) {
    if (empty($token)) {
        return false;
    }
    
    if (!isset($_SESSION['csrf_token'])) {
        return false;
    }
    
    return hash_equals($_SESSION['csrf_token'], $token);
}

// Função para formatar bytes
function formatBytes($bytes, $precision = 2) {
    $units = array('B', 'KB', 'MB', 'GB');
    
    for ($i = 0; $bytes > 1024 && $i < count($units) - 1; $i++) {
        $bytes /= 1024;
    }
    
    return round($bytes, $precision) . ' ' . $units[$i];
}

// Função para criar diretórios se não existirem
function createDirectories() {
    $dirs = [
        DATA_DIR,
        PROVAS_DIR,
        GABARITOS_DIR,
        BASE_PATH . '/logs/'
    ];
    
    foreach ($dirs as $dir) {
        if (!is_dir($dir)) {
            mkdir($dir, 0755, true);
        }
    }
}

// Criar diretórios necessários
createDirectories();

// Inicializar banco de dados
function initDatabase() {
    $db = getDatabase();
    
    // Tabela de usuários
    $db->exec("CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        senha TEXT NOT NULL,
        tipo TEXT NOT NULL DEFAULT 'user',
        ativo BOOLEAN DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )");
    
    // Tabela de escolas
    $db->exec("CREATE TABLE IF NOT EXISTS escolas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        codigo TEXT UNIQUE,
        endereco TEXT,
        telefone TEXT,
        email TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )");
    
    // Tabela de turmas
    $db->exec("CREATE TABLE IF NOT EXISTS turmas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        escola_id INTEGER,
        ano_escolar TEXT,
        turno TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (escola_id) REFERENCES escolas(id)
    )");
    
    // Tabela de alunos
    $db->exec("CREATE TABLE IF NOT EXISTS alunos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        identificador TEXT UNIQUE,
        nome TEXT NOT NULL,
        turma_id INTEGER,
        escola_id INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (turma_id) REFERENCES turmas(id),
        FOREIGN KEY (escola_id) REFERENCES escolas(id)
    )");
    
    // Tabela de gabaritos
    $db->exec("CREATE TABLE IF NOT EXISTS gabaritos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ano TEXT NOT NULL,
        componente TEXT NOT NULL,
        identificador TEXT,
        arquivo_origem TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )");
    
    // Tabela de questões dos gabaritos
    $db->exec("CREATE TABLE IF NOT EXISTS questoes_gabarito (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        gabarito_id INTEGER,
        questao INTEGER,
        resposta_correta TEXT,
        FOREIGN KEY (gabarito_id) REFERENCES gabaritos(id)
    )");
    
    // Tabela de provas processadas
    $db->exec("CREATE TABLE IF NOT EXISTS provas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome_teste TEXT,
        turma TEXT,
        escola TEXT,
        ano TEXT,
        componente TEXT,
        arquivo_origem TEXT,
        processado_em DATETIME DEFAULT CURRENT_TIMESTAMP
    )");
    
    // Tabela de respostas dos alunos
    $db->exec("CREATE TABLE IF NOT EXISTS respostas_alunos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        prova_id INTEGER,
        aluno_id INTEGER,
        identificador_aluno TEXT,
        nome_aluno TEXT,
        pontuacao_percentual DECIMAL(5,2),
        questao INTEGER,
        resposta TEXT,
        correta BOOLEAN DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (prova_id) REFERENCES provas(id),
        FOREIGN KEY (aluno_id) REFERENCES alunos(id)
    )");
    
    // Criar usuário admin padrão se não existir
    $stmt = $db->prepare("SELECT COUNT(*) FROM usuarios WHERE tipo = 'admin'");
    $stmt->execute();
    if ($stmt->fetchColumn() == 0) {
        $adminPassword = password_hash('admin123', PASSWORD_DEFAULT);
        $stmt = $db->prepare("INSERT INTO usuarios (nome, email, senha, tipo) VALUES (?, ?, ?, ?)");
        $stmt->execute(['Administrador', 'admin@sade.local', $adminPassword, 'admin']);
    }
    
    return $db;
}

// Inicializar banco de dados na primeira execução
if (!file_exists(DB_FILE)) {
    initDatabase();
}

?>
