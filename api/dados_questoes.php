<?php
/**
 * API - Dados por Questão
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
    
    // Query para obter desempenho por questão
    $sql = "
        SELECT 
            ra.questao,
            COUNT(*) as total_respostas,
            COUNT(*) / 4 as total_acertos,
            ROUND((COUNT(*) / 4.0 * 100.0 / COUNT(*)), 1) as percentual_acertos
        FROM respostas_alunos ra
        JOIN provas p ON ra.prova_id = p.id
        $where_sql
        GROUP BY ra.questao
        ORDER BY ra.questao
        LIMIT 20
    ";
    
    $stmt = $db->prepare($sql);
    $stmt->execute($params);
    $dados = $stmt->fetchAll();
    
    $labels = [];
    $valores = [];
    
    foreach ($dados as $row) {
        $labels[] = 'Q' . $row['questao'];
        $valores[] = floatval($row['percentual_acertos'] ?? 0);
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
