<?php
/**
 * API - Obter estatísticas do sistema
 */
require_once '../config.php';

header('Content-Type: application/json');

try {
    $stats = getSystemStatistics();
    jsonResponse(true, 'Estatísticas carregadas com sucesso', $stats);
    
} catch (Exception $e) {
    error_log('Erro ao carregar estatísticas: ' . $e->getMessage());
    jsonResponse(false, 'Erro ao carregar estatísticas');
}
?>
