<?php
/**
 * SADE - Configuração Simplificada (Sem Autenticação)
 */

// Diretórios
define('BASE_PATH', dirname(__FILE__));
define('DATA_DIR', BASE_PATH . '/data/');
define('DB_FILE', DATA_DIR . 'sade.db');

// Timezone
date_default_timezone_set('America/Sao_Paulo');

// Criar diretórios se não existirem
if (!is_dir(DATA_DIR)) mkdir(DATA_DIR, 0755, true);

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
?>
