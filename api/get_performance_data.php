<?php
/**
 * API - Obter dados de desempenho para o gráfico
 */
require_once '../config.php';

header('Content-Type: application/json');

try {
    $escola = $_GET['escola'] ?? '';
    $ano = $_GET['ano'] ?? '';
    $turma = $_GET['turma'] ?? '';
    $disciplina = $_GET['disciplina'] ?? '';
    
    $provasDir = '../data/provas/';
    $gabaritosDir = '../data/gabaritos/';
    
    // Encontrar arquivo de gabarito correspondente
    $gabaritoFile = null;
    if ($disciplina && $ano) {
        $anoSimples = str_replace('º', 'o', $ano); // Converter 2º para 2o
        $gabaritoFile = $gabaritosDir . $anoSimples . 'ano_' . $disciplina . '.csv';
        
        if (!file_exists($gabaritoFile)) {
            echo json_encode([
                'success' => false,
                'message' => 'Gabarito não encontrado para ' . $ano . ' - ' . $disciplina
            ]);
            exit;
        }
    }
    
    // Carregar gabarito
    $gabarito = [];
    if ($gabaritoFile && ($handle = fopen($gabaritoFile, 'r')) !== FALSE) {
        $header = fgetcsv($handle); // Pular cabeçalho
        while (($data = fgetcsv($handle)) !== FALSE) {
            if (count($data) >= 4) {
                $questao = intval($data[2]);
                $resposta = trim($data[3]);
                if ($questao > 0 && !empty($resposta)) {
                    $gabarito[$questao] = $resposta;
                }
            }
        }
        fclose($handle);
    }
    
    if (empty($gabarito)) {
        echo json_encode([
            'success' => false,
            'message' => 'Gabarito vazio ou inválido'
        ]);
        exit;
    }
    
    // Encontrar arquivos de provas correspondentes
    $respostasAlunos = [];
    $totalAlunos = 0;
    
    if (is_dir($provasDir)) {
        $files = scandir($provasDir);
        foreach ($files as $file) {
            if ($file !== '.' && $file !== '..' && strpos($file, '.csv') !== false) {
                $incluirArquivo = true;
                
                // Filtrar por disciplina
                if ($disciplina) {
                    $incluirArquivo = $incluirArquivo && (strpos(strtoupper($file), strtoupper($disciplina)) !== false);
                }
                
                // Filtrar por ano
                if ($ano) {
                    $incluirArquivo = $incluirArquivo && (strpos($file, $ano) !== false);
                }
                
                // Filtrar por escola
                if ($escola) {
                    $escolaFormatada = str_replace(' ', '_', strtoupper($escola));
                    $incluirArquivo = $incluirArquivo && (strpos(strtoupper($file), $escolaFormatada) !== false);
                }
                
                // Filtrar por turma
                if ($turma) {
                    $turmaFormatada = str_replace(' ', '_', strtoupper($turma));
                    $incluirArquivo = $incluirArquivo && (strpos(strtoupper($file), $turmaFormatada) !== false);
                }
                
                if ($incluirArquivo) {
                    $filePath = $provasDir . $file;
                    if (($handle = fopen($filePath, 'r')) !== FALSE) {
                        $header = fgetcsv($handle); // Cabeçalho
                        
                        while (($data = fgetcsv($handle)) !== FALSE) {
                            if (count($data) >= 18) { // Mínimo de colunas para ter respostas
                                $totalAlunos++;
                                
                                // Extrair respostas (geralmente começam na coluna 18)
                                $respostasInicio = 18;
                                for ($i = $respostasInicio; $i < count($data); $i++) {
                                    $questao = $i - $respostasInicio + 1;
                                    $resposta = trim($data[$i]);
                                    
                                    if (!empty($resposta) && isset($gabarito[$questao])) {
                                        if (!isset($respostasAlunos[$questao])) {
                                            $respostasAlunos[$questao] = [];
                                        }
                                        $respostasAlunos[$questao][] = $resposta;
                                    }
                                }
                            }
                        }
                        fclose($handle);
                    }
                }
            }
        }
    }
    
    // Calcular desempenho por questão
    $questoes = [];
    $maxQuestoes = max(array_keys($gabarito));
    
    for ($q = 1; $q <= $maxQuestoes; $q++) {
        if (isset($gabarito[$q])) {
            $respostasQuestao = $respostasAlunos[$q] ?? [];
            $acertos = 0;
            $total = count($respostasQuestao);
            
            foreach ($respostasQuestao as $resposta) {
                // Normalizar resposta para comparação
                $respostaNorm = strtoupper(trim($resposta));
                $gabaritoNorm = strtoupper(trim($gabarito[$q]));
                
                if ($respostaNorm === $gabaritoNorm) {
                    $acertos++;
                }
            }
            
            $percentual = $total > 0 ? ($acertos / $total) * 100 : 0;
            
            $questoes[] = [
                'questao' => $q,
                'acertos' => $acertos,
                'total' => $total,
                'percentual_acerto' => round($percentual, 2),
                'gabarito' => $gabarito[$q]
            ];
        }
    }
    
    echo json_encode([
        'success' => true,
        'questoes' => $questoes,
        'total_alunos' => $totalAlunos,
        'filtros_aplicados' => [
            'escola' => $escola,
            'ano' => $ano,
            'turma' => $turma,
            'disciplina' => $disciplina
        ]
    ]);
    
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage(),
        'trace' => $e->getTraceAsString()
    ]);
}
?>
