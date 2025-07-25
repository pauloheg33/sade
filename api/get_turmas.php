<?php
/**
 * API - Obter turmas por escola
 */
require_once '../config.php';

header('Content-Type: application/json');

try {
    $escola = sanitizeInput($_GET['escola'] ?? '');
    
    if (empty($escola)) {
        jsonResponse(false, 'Escola não especificada');
    }
    
    $turmas = getTurmasBySchool($escola);
    
    jsonResponse(true, 'Turmas carregadas com sucesso', [
        'turmas' => $turmas
    ]);
    
} catch (Exception $e) {
    error_log('Erro ao carregar turmas: ' . $e->getMessage());
    jsonResponse(false, 'Erro ao carregar turmas');
}
?>
