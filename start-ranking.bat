@echo off
echo =======================================================
echo    SADE - Iniciando Aplicacao de Ranking das Escolas
echo =======================================================
echo.

cd /d "%~dp0Ranking_das_Escolas\ranking_turmas_escolas\app"

echo Verificando se Node.js esta instalado...
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ ERRO: Node.js nao encontrado!
    echo.
    echo Para instalar Node.js:
    echo 1. Acesse: https://nodejs.org
    echo 2. Baixe a versao LTS
    echo 3. Execute a instalacao
    echo 4. Reinicie este script
    echo.
    pause
    exit /b 1
)

echo ✅ Node.js encontrado!
echo.

echo Verificando dependencias...
if not exist "node_modules" (
    echo 📦 Instalando dependencias... 
    echo Isso pode levar alguns minutos na primeira execucao...
    npm install
    if errorlevel 1 (
        echo ❌ Erro ao instalar dependencias!
        pause
        exit /b 1
    )
)

echo ✅ Dependencias OK!
echo.

echo 🚀 Iniciando aplicacao na porta 3001...
echo.
echo ⏳ Aguarde a mensagem "Ready" antes de acessar
echo 🌐 URL: http://localhost:3001
echo.
echo Para parar a aplicacao: Ctrl+C
echo =======================================================

npm run dev -- --port 3001
