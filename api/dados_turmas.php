<?php
/**
 * API - Dados das Turmas
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
    
    // Query para obter desempenho por turma
    $sql = "
        SELECT 
            p.turma,
            p.escola,
            COUNT(ra.id) * 5.0 as media_turma,
            COUNT(ra.id) / 20 as total_alunos
        FROM provas p
        LEFT JOIN respostas_alunos ra ON p.id = ra.prova_id
        $where_sql
        GROUP BY p.turma, p.escola
        ORDER BY media_turma DESC
        LIMIT 10
    ";
    
    $stmt = $db->prepare($sql);
    $stmt->execute($params);
    $dados = $stmt->fetchAll();
    
    $labels = [];
    $valores = [];
    
    foreach ($dados as $row) {
        $labels[] = $row['turma'] . ' (' . $row['escola'] . ')';
        $valores[] = round($row['media_turma'] ?? 0, 1);
    }
    
    echo json_encode([
        'labels' => $labels,
        'valores' => $valores
    ]);
    
} catch (Exception $e) {
    echo json_encode([
        'labels' => [],
        'valores' => [],
        'error' => $e->getMessage()
    ]);
}
?>
