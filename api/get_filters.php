<?php
/**
 * API - Obter filtros disponíveis
 */
require_once '../config.php';

header('Content-Type: application/json');

try {
    $escolas = getAvailableSchools();
    $anos = getAvailableYears();
    
    jsonResponse(true, 'Filtros carregados com sucesso', [
        'escolas' => $escolas,
        'anos' => $anos
    ]);
    
} catch (Exception $e) {
    error_log('Erro ao carregar filtros: ' . $e->getMessage());
    jsonResponse(false, 'Erro ao carregar filtros');
}
?>
