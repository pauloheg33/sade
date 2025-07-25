<?php
/**
 * API - Dados da Tabela
 */

require_once '../config.php';

header('Content-Type: application/json');

try {
    $db = getDatabase();
    
    // Filtros
    $where_conditions = [];
    $params = [];
    
    if (!empty($_GET['escola'])) {
        $where_conditions[] = "p.escola = ?";
        $params[] = $_GET['escola'];
    }
    
    if (!empty($_GET['turma'])) {
        $where_conditions[] = "p.turma = ?";
        $params[] = $_GET['turma'];
    }
    
    if (!empty($_GET['ano'])) {
        $where_conditions[] = "p.ano = ?";
        $params[] = $_GET['ano'];
    }
    
    $where_sql = !empty($where_conditions) ? 'WHERE ' . implode(' AND ', $where_conditions) : '';
    
    // Query para tabela resumo
    $sql = "
        SELECT 
            p.escola,
            p.turma,
            p.ano,
            COUNT(ra.id) / 20 as total_alunos,
            ROUND(COUNT(ra.id) * 5.0, 1) as media
        FROM provas p
        LEFT JOIN respostas_alunos ra ON p.id = ra.prova_id
        $where_sql
        GROUP BY p.escola, p.turma, p.ano
        ORDER BY p.escola, p.turma
    ";
    
    $stmt = $db->prepare($sql);
    $stmt->execute($params);
    $dados = $stmt->fetchAll();
    
    echo json_encode($dados);
    
} catch (Exception $e) {
    echo json_encode([
        'error' => $e->getMessage()
    ]);
}
?>
