<?php
/**
 * SADE - Validação do Sistema
 * Verifica se tudo está funcionando corretamente
 */

require_once 'config.php';

// Verificar se não está logado para executar validação
if (isLoggedIn()) {
    echo "Sistema funcionando - usuário já logado!";
    exit;
}

echo "<!DOCTYPE html>
<html lang='pt-BR'>
<head>
    <meta charset='UTF-8'>
    <title>SADE - Validação do Sistema</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .check { color: green; }
        .error { color: red; }
        .warning { color: orange; }
    </style>
</head>
<body>
<h1>SADE - Validação do Sistema</h1>";

$errors = 0;
$warnings = 0;

// 1. Verificar estrutura de diretórios
echo "<h2>1. Estrutura de Diretórios</h2>";
$dirs = [DATA_DIR, PROVAS_DIR, GABARITOS_DIR, LOGS_DIR];
foreach ($dirs as $dir) {
    if (is_dir($dir) && is_writable($dir)) {
        echo "<span class='check'>✓</span> $dir - OK<br>";
    } else {
        echo "<span class='error'>✗</span> $dir - ERRO<br>";
        $errors++;
    }
}

// 2. Verificar banco de dados
echo "<h2>2. Banco de Dados</h2>";
try {
    $db = getDatabase();
    echo "<span class='check'>✓</span> Conexão com banco - OK<br>";
    
    // Verificar tabelas
    $stmt = $db->query("SELECT name FROM sqlite_master WHERE type='table'");
    $tables = $stmt->fetchAll(PDO::FETCH_COLUMN);
    
    if (in_array('usuarios', $tables)) {
        echo "<span class='check'>✓</span> Tabela usuarios - OK<br>";
        
        // Verificar usuário admin
        $stmt = $db->prepare("SELECT COUNT(*) FROM usuarios WHERE user_type = 'admin'");
        $stmt->execute();
        if ($stmt->fetchColumn() > 0) {
            echo "<span class='check'>✓</span> Usuário admin - OK<br>";
        } else {
            echo "<span class='warning'>⚠</span> Usuário admin - AVISO: Não encontrado<br>";
            $warnings++;
        }
    } else {
        echo "<span class='error'>✗</span> Tabela usuarios - ERRO<br>";
        $errors++;
    }
} catch (Exception $e) {
    echo "<span class='error'>✗</span> Banco de dados - ERRO: " . $e->getMessage() . "<br>";
    $errors++;
}

// 3. Verificar arquivos de dados
echo "<h2>3. Arquivos de Dados</h2>";
if (is_dir(PROVAS_DIR)) {
    $provasFiles = array_diff(scandir(PROVAS_DIR), ['.', '..']);
    $csvFiles = array_filter($provasFiles, function($file) {
        return pathinfo($file, PATHINFO_EXTENSION) === 'csv';
    });
    echo "<span class='check'>✓</span> Arquivos de provas: " . count($csvFiles) . " encontrados<br>";
} else {
    echo "<span class='error'>✗</span> Diretório de provas não encontrado<br>";
    $errors++;
}

if (is_dir(GABARITOS_DIR)) {
    $gabaritoFiles = array_diff(scandir(GABARITOS_DIR), ['.', '..']);
    $csvGabaritos = array_filter($gabaritoFiles, function($file) {
        return pathinfo($file, PATHINFO_EXTENSION) === 'csv';
    });
    echo "<span class='check'>✓</span> Arquivos de gabaritos: " . count($csvGabaritos) . " encontrados<br>";
} else {
    echo "<span class='error'>✗</span> Diretório de gabaritos não encontrado<br>";
    $errors++;
}

// 4. Verificar funções principais
echo "<h2>4. Funções do Sistema</h2>";
$functions = [
    'getAvailableSchools',
    'getAvailableYears', 
    'getSystemStatistics',
    'validateEmail',
    'sanitizeInput'
];

foreach ($functions as $func) {
    if (function_exists($func)) {
        echo "<span class='check'>✓</span> Função $func - OK<br>";
    } else {
        echo "<span class='error'>✗</span> Função $func - ERRO<br>";
        $errors++;
    }
}

// 5. Verificar classes
echo "<h2>5. Classes do Sistema</h2>";
$classes = ['CSVProcessor', 'ReportGenerator', 'SimpleCache'];
foreach ($classes as $class) {
    if (class_exists($class)) {
        echo "<span class='check'>✓</span> Classe $class - OK<br>";
    } else {
        echo "<span class='error'>✗</span> Classe $class - ERRO<br>";
        $errors++;
    }
}

// 6. Verificar APIs
echo "<h2>6. APIs</h2>";
$apis = [
    'api/get_filters.php',
    'api/get_turmas.php', 
    'api/get_statistics.php',
    'api/get_performance_data.php'
];

foreach ($apis as $api) {
    if (file_exists($api)) {
        echo "<span class='check'>✓</span> $api - OK<br>";
    } else {
        echo "<span class='error'>✗</span> $api - ERRO<br>";
        $errors++;
    }
}

// Resumo
echo "<h2>Resumo da Validação</h2>";
if ($errors == 0 && $warnings == 0) {
    echo "<p style='color: green; font-weight: bold;'>✓ Sistema 100% funcional!</p>";
} elseif ($errors == 0) {
    echo "<p style='color: orange; font-weight: bold;'>⚠ Sistema funcional com $warnings avisos</p>";
} else {
    echo "<p style='color: red; font-weight: bold;'>✗ Sistema com $errors erros e $warnings avisos</p>";
}

echo "<hr>";
echo "<p><a href='login.php'>← Voltar para o Login</a></p>";
echo "</body></html>";
?>
