<?php
/**
 * Teste das Funções Essenciais
 */

require_once 'config.php';

echo "<h2>Teste das Funções Essenciais - SADE</h2>";

// Testar conexão com banco
echo "<h3>1. Teste de Conexão com Banco</h3>";
try {
    $db = getDatabase();
    echo "✅ Conexão com banco de dados: OK<br>";
} catch (Exception $e) {
    echo "❌ Erro na conexão: " . $e->getMessage() . "<br>";
}

// Testar funções de autenticação
echo "<h3>2. Teste de Funções de Autenticação</h3>";
if (function_exists('checkAuth')) {
    echo "✅ Função checkAuth(): Disponível<br>";
} else {
    echo "❌ Função checkAuth(): Não encontrada<br>";
}

if (function_exists('isLoggedIn')) {
    echo "✅ Função isLoggedIn(): Disponível<br>";
} else {
    echo "❌ Função isLoggedIn(): Não encontrada<br>";
}

if (function_exists('doLogin')) {
    echo "✅ Função doLogin(): Disponível<br>";
} else {
    echo "❌ Função doLogin(): Não encontrada<br>";
}

if (function_exists('doLogout')) {
    echo "✅ Função doLogout(): Disponível<br>";
} else {
    echo "❌ Função doLogout(): Não encontrada<br>";
}

// Testar funções utilitárias
echo "<h3>3. Teste de Funções Utilitárias</h3>";
if (function_exists('sanitizeInput')) {
    echo "✅ Função sanitizeInput(): Disponível<br>";
} else {
    echo "❌ Função sanitizeInput(): Não encontrada<br>";
}

if (function_exists('validateEmail')) {
    echo "✅ Função validateEmail(): Disponível<br>";
} else {
    echo "❌ Função validateEmail(): Não encontrada<br>";
}

if (function_exists('formatBytes')) {
    echo "✅ Função formatBytes(): Disponível<br>";
    echo "Teste: " . formatBytes(1024) . "<br>";
} else {
    echo "❌ Função formatBytes(): Não encontrada<br>";
}

// Testar estrutura do banco
echo "<h3>4. Teste de Estrutura do Banco</h3>";
try {
    $db = getDatabase();
    
    // Verificar tabela usuarios
    $stmt = $db->prepare("SELECT COUNT(*) FROM usuarios");
    $stmt->execute();
    $userCount = $stmt->fetchColumn();
    echo "✅ Tabela usuarios: $userCount usuários cadastrados<br>";
    
    // Verificar se admin existe
    $stmt = $db->prepare("SELECT COUNT(*) FROM usuarios WHERE user_type = 'admin'");
    $stmt->execute();
    $adminCount = $stmt->fetchColumn();
    echo "✅ Usuários admin: $adminCount<br>";
    
    // Verificar outras tabelas
    $tables = ['escolas', 'turmas', 'alunos', 'gabaritos', 'provas'];
    foreach ($tables as $table) {
        try {
            $stmt = $db->prepare("SELECT COUNT(*) FROM $table");
            $stmt->execute();
            $count = $stmt->fetchColumn();
            echo "✅ Tabela $table: $count registros<br>";
        } catch (Exception $e) {
            echo "❌ Tabela $table: Erro - " . $e->getMessage() . "<br>";
        }
    }
    
} catch (Exception $e) {
    echo "❌ Erro ao verificar banco: " . $e->getMessage() . "<br>";
}

// Testar diretórios
echo "<h3>5. Teste de Diretórios</h3>";
$dirs = [
    'data' => DATA_DIR,
    'provas' => PROVAS_DIR,
    'gabaritos' => GABARITOS_DIR,
    'logs' => BASE_PATH . '/logs/'
];

foreach ($dirs as $name => $dir) {
    if (is_dir($dir)) {
        echo "✅ Diretório $name: OK ($dir)<br>";
    } else {
        echo "❌ Diretório $name: Não encontrado ($dir)<br>";
    }
}

echo "<h3>6. Teste de Classes</h3>";
if (class_exists('DataManager')) {
    echo "✅ Classe DataManager: Disponível<br>";
} else {
    echo "❌ Classe DataManager: Não encontrada<br>";
}

if (class_exists('CSVProcessor')) {
    echo "✅ Classe CSVProcessor: Disponível<br>";
} else {
    echo "❌ Classe CSVProcessor: Não encontrada<br>";
}

if (class_exists('ReportGenerator')) {
    echo "✅ Classe ReportGenerator: Disponível<br>";
} else {
    echo "❌ Classe ReportGenerator: Não encontrada<br>";
}

echo "<hr>";
echo "<p><strong>Teste concluído!</strong> <a href='login.php'>← Voltar ao Login</a></p>";
?>
