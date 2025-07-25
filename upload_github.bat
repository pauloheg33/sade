@echo off
echo =====================================
echo   SADE - Upload para GitHub
echo =====================================
echo.

echo Verificando se Git esta instalado...
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERRO: Git nao encontrado!
    echo Instale o Git primeiro: https://git-scm.com/download/win
    pause
    exit /b 1
)

echo Git encontrado! Prosseguindo...
echo.

echo Inicializando repositorio Git...
git init

echo Configurando repositorio remoto...
git remote add origin https://github.com/pauloheg33/sade.git

echo Configurando branch principal...
git branch -M main

echo Adicionando arquivos...
git add .

echo Fazendo commit inicial...
git commit -m "Initial commit: SADE - Sistema de Avaliacao e Dados Educacionais

- Sistema completo de gestao educacional
- Upload e processamento de dados CSV
- Dashboard com graficos interativos
- Relatorios de desempenho por questao
- Interface responsiva com Bootstrap
- Painel administrativo Django
- Autenticacao e controle de acesso"

echo.
echo Fazendo upload para GitHub...
echo ATENCAO: Voce pode precisar inserir suas credenciais do GitHub
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo =====================================
    echo   SUCESSO! Projeto enviado para:
    echo   https://github.com/pauloheg33/sade
    echo =====================================
) else (
    echo.
    echo ERRO: Falha no upload. Verifique suas credenciais.
)

echo.
pause
