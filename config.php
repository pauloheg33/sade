<?php
/**
 * SADE - Sistema de Avaliação e Desempenho Educacional
 * Configurações principais do sistema
 * 
 * @author Paulo Henrique
 * @version 2.0 (PHP)
 * @date 2025-07-25
 */

// Configurações de erro
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Configurações de sessão
session_start();

// Configurações do sistema
define('SITE_NAME', 'SADE - Sistema de Avaliação e Desempenho Educacional');
define('SITE_VERSION', '2.0.0');
define('SITE_URL', 'https://' . ($_SERVER['HTTP_HOST'] ?? 'localhost'));
define('BASE_PATH', dirname(__FILE__));

// Configurações de diretórios
define('DATA_DIR', BASE_PATH . '/data/');
define('PROVAS_DIR', DATA_DIR . 'provas/');
define('GABARITOS_DIR', DATA_DIR . 'gabaritos/');

// Configurações de banco de dados (SQLite para compatibilidade)
define('DB_FILE', DATA_DIR . 'sade.db');

// Configurações de segurança
define('SESSION_TIMEOUT', 3600); // 1 hora

// Tipos de usuário
define('USER_TYPE_ADMIN', 'admin');
define('USER_TYPE_USER', 'user');

// Timezone
date_default_timezone_set('America/Sao_Paulo');

// Função para conectar ao banco SQLite
function getDatabase() {
    try {
        $pdo = new PDO('sqlite:' . DB_FILE);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $pdo;
    } catch (PDOException $e) {
        die('Erro de conexão: ' . $e->getMessage());
    }
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
    return isset($_SESSION['csrf_token']) && hash_equals($_SESSION['csrf_token'], $token);
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
