#!/usr/bin/env python3
"""
Verificador de Integridade do SADE v0.2.0
Testa se todas as rotas e arquivos estão funcionando corretamente
"""

import os
import sys
import requests
import time
from urllib.parse import urljoin

# Configurações
BASE_URL = "http://localhost:8000"
TIMEOUT = 5

def verificar_arquivo_local(caminho):
    """Verifica se arquivo existe localmente"""
    return os.path.exists(caminho)

def verificar_url(url):
    """Verifica se URL está acessível"""
    try:
        response = requests.get(url, timeout=TIMEOUT)
        return response.status_code == 200
    except:
        return False

def main():
    print("🔍 SADE v0.2.0 - Verificador de Integridade")
    print("=" * 50)
    
    # Arquivos principais
    arquivos_principais = [
        "index.html",
        "proea.html", 
        "cnca.html",
        "matrizes.html",
        "ranking.html"
    ]
    
    # Assets críticos
    assets_criticos = [
        "assets/css/styles.css",
        "assets/js/app-modern.js",
        "assets/js/config.js",
        "assets/js/data-transform.js",
        "assets/data/sade_data.js"
    ]
    
    # Verificar arquivos localmente
    print("\n📁 Verificando arquivos locais...")
    todos_ok = True
    
    for arquivo in arquivos_principais + assets_criticos:
        existe = verificar_arquivo_local(arquivo)
        status = "✅" if existe else "❌"
        print(f"{status} {arquivo}")
        if not existe:
            todos_ok = False
    
    # Verificar URLs (se servidor estiver rodando)
    print(f"\n🌐 Verificando URLs em {BASE_URL}...")
    servidor_rodando = verificar_url(BASE_URL)
    
    if servidor_rodando:
        print("✅ Servidor local detectado")
        
        for arquivo in arquivos_principais:
            url = urljoin(BASE_URL, arquivo)
            ok = verificar_url(url)
            status = "✅" if ok else "❌"
            print(f"{status} {url}")
            if not ok:
                todos_ok = False
    else:
        print("⚠️  Servidor local não detectado")
        print("   Execute: python3 -m http.server 8000")
    
    # Resultado final
    print("\n" + "=" * 50)
    if todos_ok and servidor_rodando:
        print("🎉 TODOS OS TESTES PASSARAM!")
        print("   O SADE está funcionando corretamente.")
    elif todos_ok:
        print("⚠️  ARQUIVOS OK, MAS SERVIDOR OFFLINE")
        print("   Execute o servidor para teste completo.")
    else:
        print("❌ PROBLEMAS DETECTADOS!")
        print("   Verifique os arquivos marcados com ❌")
    
    return 0 if todos_ok else 1

if __name__ == "__main__":
    sys.exit(main())
