<?php
/**
 * SADE - Configuração Simplificada (Sem Autenticação)
 */

// Diretórios principais
define('BASE_PATH', __DIR__);
define('DATA_DIR', BASE_PATH . '/data/');
define('PROVAS_DIR', DATA_DIR . 'provas/');
define('GABARITOS_DIR', DATA_DIR . 'gabaritos/');
define('LOGS_DIR', BASE_PATH . '/logs/');
define('DB_FILE', DATA_DIR . 'sade.db');

// Timezone
date_default_timezone_set('America/Sao_Paulo');

// Criar diretórios se não existirem
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
        } catch (PDOException $e) {
            die('Erro no banco: ' . $e->getMessage());
        }
    }
    
    return $pdo;
}

/**
 * Resposta JSON padronizada
 */
function jsonResponse($success = true, $message = '', $data = []) {
    header('Content-Type: application/json');
    echo json_encode([
        'success' => $success,
        'message' => $message,
        'data'    => $data,
        'timestamp' => time()
    ]);
    exit();
}

// Sistema sem autenticação: funções retornam verdadeiro para compatibilidade
function isLoggedIn() { return true; }
function isAdmin() { return true; }
function checkAuth() { return true; }

// Carregar helpers
require_once BASE_PATH . '/includes/functions.php';
?>
