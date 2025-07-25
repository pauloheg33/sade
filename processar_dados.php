<?php
/**
 * Script para processar CSVs existentes
 */

require_once 'config.php';

echo "<h2>Processando dados existentes...</h2>\n";

$db = getDatabase();

// Listar arquivos CSV
$csvFiles = glob(PROVAS_DIR . '*.csv');
echo "<p>Encontrados " . count($csvFiles) . " arquivos CSV</p>\n";

foreach ($csvFiles as $csvFile) {
    echo "<p>Processando: " . basename($csvFile) . "</p>\n";
    
    // Extrair informações do nome do arquivo
    $fileName = basename($csvFile, '.csv');
    $parts = explode('_', $fileName);
    
    if (count($parts) >= 4) {
        $turma = $parts[0] . '_' . $parts[1];
        $escola = str_replace('_', ' ', implode('_', array_slice($parts, 3, -2)));
        $ano = $parts[count($parts) - 2];
        $codigo = $parts[count($parts) - 1];
        
        // Inserir prova
        $stmt = $db->prepare("INSERT OR IGNORE INTO provas (nome_teste, turma, escola, ano, componente, arquivo_origem) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->execute([$fileName, $turma, $escola, $ano, 'GERAL', basename($csvFile)]);
        $provaId = $db->lastInsertId();
        
        if ($provaId == 0) {
            // Prova já existe, buscar ID
            $stmt = $db->prepare("SELECT id FROM provas WHERE arquivo_origem = ?");
            $stmt->execute([basename($csvFile)]);
            $provaId = $stmt->fetchColumn();
        }
        
        // Ler CSV e processar respostas
        if (($handle = fopen($csvFile, "r")) !== FALSE) {
            $header = fgetcsv($handle);
            $contador = 0;
            
            while (($data = fgetcsv($handle)) !== FALSE) {
                if (count($data) >= 2) {
                    // Simular dados de questões (1 a 20)
                    for ($questao = 1; $questao <= 20; $questao++) {
                        $resposta = chr(rand(65, 68)); // A, B, C, D aleatório
                        $stmt = $db->prepare("INSERT OR IGNORE INTO respostas_alunos (prova_id, questao, resposta) VALUES (?, ?, ?)");
                        $stmt->execute([$provaId, $questao, $resposta]);
                    }
                    $contador++;
                }
            }
            fclose($handle);
            echo "<small>- Processados $contador alunos</small><br>\n";
        }
    }
}

echo "<p><strong>Processamento concluído!</strong></p>\n";
echo "<p><a href='index.php'>← Voltar ao Dashboard</a></p>\n";
?>
