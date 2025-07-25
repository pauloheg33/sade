<?php
/**
 * SADE - Logout
 * Script para encerrar sessão do usuário
 */

session_start();

// Registrar logout se houver sessão ativa
if (isset($_SESSION['user_id'])) {
    require_once 'config.php';
    
    try {
        $db = getDatabase();
        
        // Atualizar último logout
        $stmt = $db->prepare("UPDATE usuarios SET last_logout = CURRENT_TIMESTAMP WHERE id = ?");
        $stmt->execute([$_SESSION['user_id']]);
        
        // Log da atividade
        if (function_exists('logActivity')) {
            logActivity('Logout realizado', 'Usuário: ' . ($_SESSION['user_name'] ?? 'N/A'));
        }
        
    } catch (Exception $e) {
        // Em caso de erro, apenas continua com o logout
        error_log("Erro no logout: " . $e->getMessage());
    }
}

// Destruir todas as variáveis de sessão
$_SESSION = array();

// Destruir o cookie de sessão se existir
if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000,
        $params["path"], $params["domain"],
        $params["secure"], $params["httponly"]
    );
}

// Destruir a sessão
session_destroy();

// Limpar cookies de lembrar
if (isset($_COOKIE['remember_token'])) {
    setcookie('remember_token', '', time() - 3600, '/', '', true, true);
}

// Redirecionar para login
header("Location: login.php?logout=1");
exit();
?>
