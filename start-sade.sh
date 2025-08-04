#!/bin/bash
# SADE v0.2.0 - Script de Inicialização do Servidor de Desenvolvimento
# Secretaria da Educação de Ararendá - CE

echo "🚀 SADE v0.2.0 - Sistema de Avaliação e Desempenho Escolar"
echo "==============================================="
echo "📍 Secretaria da Educação de Ararendá - CE"
echo "👨‍💻 Desenvolvido por Paulo Henrique"
echo ""

# Verificar se Python está instalado
if command -v python3 &> /dev/null; then
    PYTHON_CMD="python3"
elif command -v python &> /dev/null; then
    PYTHON_CMD="python"
else
    echo "❌ Erro: Python não encontrado!"
    echo "   Instale Python 3.x para continuar."
    exit 1
fi

echo "✅ Python encontrado: $PYTHON_CMD"

# Verificar integridade do projeto
echo ""
echo "🔍 Verificando integridade do projeto..."
if [ -f "scripts/verificar_integridade.py" ]; then
    $PYTHON_CMD scripts/verificar_integridade.py
    if [ $? -ne 0 ]; then
        echo "⚠️  Problemas de integridade detectados!"
        echo "   Verifique os arquivos antes de continuar."
        exit 1
    fi
else
    echo "⚠️  Script de verificação não encontrado, continuando..."
fi

# Iniciar servidor
echo ""
echo "🌐 Iniciando servidor HTTP local..."
echo "   URL: http://localhost:8000"
echo "   Pressione Ctrl+C para parar o servidor"
echo ""

# Abrir navegador automaticamente (se disponível)
if command -v xdg-open &> /dev/null; then
    echo "🔗 Abrindo navegador..."
    sleep 2
    xdg-open "http://localhost:8000" &
elif command -v open &> /dev/null; then
    echo "🔗 Abrindo navegador..."
    sleep 2
    open "http://localhost:8000" &
fi

# Iniciar servidor Python
$PYTHON_CMD -m http.server 8000
