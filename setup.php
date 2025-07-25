<?php
/**
 * SADE - Script de Inicialização
 * Cria as tabelas e usuário admin se não existirem
 */

require_once 'config.php';

try {
    echo "🔧 Iniciando configuração do sistema SADE...\n\n";
    
    // Obter conexão com banco
    $db = getDatabase();
    
    // Verificar se as tabelas existem
    $tables = ['usuarios', 'gabaritos', 'provas', 'respostas_alunos'];
    $tablesExist = true;
    
    foreach ($tables as $table) {
        $result = $db->query("SELECT name FROM sqlite_master WHERE type='table' AND name='$table'");
        if (!$result->fetch()) {
            $tablesExist = false;
            echo "❌ Tabela '$table' não encontrada\n";
        } else {
            echo "✅ Tabela '$table' encontrada\n";
        }
    }
    
    if (!$tablesExist) {
        echo "\n🏗️  Criando estrutura do banco de dados...\n";
        
        // Criar tabelas
        $sql = "
        CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            user_type TEXT CHECK(user_type IN ('admin', 'user')) DEFAULT 'user',
            status TEXT CHECK(status IN ('ativo', 'inativo')) DEFAULT 'ativo',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            last_login DATETIME,
            last_logout DATETIME
        );

        CREATE TABLE IF NOT EXISTS gabaritos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            ano TEXT NOT NULL,
            componente TEXT NOT NULL,
            questao INTEGER NOT NULL,
            gabarito TEXT NOT NULL,
            identificador TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            UNIQUE(ano, componente, questao, identificador)
        );

        CREATE TABLE IF NOT EXISTS provas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            aluno_nome TEXT NOT NULL,
            teste_nome TEXT NOT NULL,
            escola TEXT NOT NULL,
            turma TEXT NOT NULL,
            percentual REAL NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS respostas_alunos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            prova_id INTEGER NOT NULL,
            questao INTEGER NOT NULL,
            resposta TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (prova_id) REFERENCES provas(id) ON DELETE CASCADE
        );
        ";
        
        $db->exec($sql);
        echo "✅ Estrutura do banco criada com sucesso!\n";
    }
    
    // Verificar se existe usuário admin
    $stmt = $db->prepare("SELECT id FROM usuarios WHERE user_type = 'admin' LIMIT 1");
    $stmt->execute();
    $admin = $stmt->fetch();
    
    if (!$admin) {
        echo "\n👤 Criando usuário administrador padrão...\n";
        
        $adminData = [
            'name' => 'Administrador',
            'email' => 'admin@sade.local',
            'password' => password_hash('admin123', PASSWORD_DEFAULT),
            'user_type' => 'admin',
            'status' => 'ativo'
        ];
        
        $stmt = $db->prepare("
            INSERT INTO usuarios (name, email, password, user_type, status, created_at) 
            VALUES (:name, :email, :password, :user_type, :status, CURRENT_TIMESTAMP)
        ");
        
        $stmt->execute($adminData);
        
        echo "✅ Usuário admin criado:\n";
        echo "   📧 Email: admin@sade.local\n";
        echo "   🔑 Senha: admin123\n";
    } else {
        echo "\n✅ Usuário administrador já existe\n";
    }
    
    // Verificar permissões
    echo "\n🔐 Verificando permissões...\n";
    
    $dataDir = __DIR__ . '/data';
    if (!is_writable($dataDir)) {
        echo "❌ Pasta data/ não tem permissão de escrita\n";
        echo "   Execute: chmod 755 data/\n";
    } else {
        echo "✅ Permissões da pasta data/ OK\n";
    }
    
    if (file_exists($dataDir . '/sade.db') && !is_writable($dataDir . '/sade.db')) {
        echo "❌ Arquivo database.db não tem permissão de escrita\n";
        echo "   Execute: chmod 644 data/sade.db\n";
    } else {
        echo "✅ Permissões do banco de dados OK\n";
    }
    
    // Verificar arquivos CSV
    echo "\n📁 Verificando arquivos de dados...\n";
    
    $gabaritosDir = $dataDir . '/gabaritos';
    $provasDir = $dataDir . '/provas';
    
    $gabaritos = glob($gabaritosDir . '/*.csv');
    $provas = glob($provasDir . '/*.csv');
    
    echo "   📊 Gabaritos encontrados: " . count($gabaritos) . " arquivos\n";
    echo "   📋 Provas encontradas: " . count($provas) . " arquivos\n";
    
    if (count($gabaritos) > 0 && count($provas) > 0) {
        echo "✅ Arquivos CSV prontos para processamento\n";
    } else {
        echo "⚠️  Certifique-se de adicionar arquivos CSV nas pastas data/gabaritos/ e data/provas/\n";
    }
    
    echo "\n🎉 Sistema SADE configurado com sucesso!\n";
    echo "🌐 Acesse: http://localhost:8000\n";
    echo "👤 Login: admin@sade.local\n";
    echo "🔑 Senha: admin123\n\n";
    
} catch (Exception $e) {
    echo "❌ Erro na configuração: " . $e->getMessage() . "\n";
    echo "Detalhes: " . $e->getTraceAsString() . "\n";
    exit(1);
}
?>
