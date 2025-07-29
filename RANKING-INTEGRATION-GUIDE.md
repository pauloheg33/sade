# Integração Completa do App de Ranking das Escolas

## Sobre a Integração

O app de Ranking das Escolas foi integrado ao SADE dashboard com **três níveis de funcionalidade**:

### 🚀 Versão Completa (Next.js Local)
- **Funcionalidade:** Completa com todas as features do Next.js
- **Como acessar:** Execute `start-ranking.bat` para iniciar o servidor
- **URL:** http://localhost:3001
- **Status:** ✅ Implementado

### 📱 Versão Estática (GitHub Pages)
- **Funcionalidade:** App completo compilado estaticamente
- **Como acessar:** Automático quando acessado via GitHub Pages
- **URL:** Pasta `ranking-app/` no GitHub Pages
- **Status:** ✅ Implementado e funcional

### 📄 Versão Simples (Fallback)
- **Funcionalidade:** Básica, apenas HTML/CSS/JS
- **Como acessar:** Fallback automático se outras versões não estiverem disponíveis
- **URL:** ranking.html
- **Status:** ✅ Implementado como backup

## Como Funciona

O botão "Ranking" no SADE dashboard implementa uma **detecção automática inteligente**:

1. **Primeira tentativa:** Verifica se o Next.js está rodando localmente (localhost:3001)
2. **Segunda tentativa:** Se não estiver, abre a versão estática (`ranking-app/`)
3. **Fallback final:** Se nenhuma funcionar, abre o `ranking.html` simples

## Arquivos Importantes

- `start-ranking.bat` - Script para iniciar o Next.js localmente
- `ranking-app/` - Versão estática compilada do Next.js
- `ranking.html` - Versão simples de fallback
- `index.html` - Contém a lógica de detecção automática no botão Ranking

## Instalação e Configuração

### Pré-requisitos
- Node.js (instalado automaticamente pelo script)
- npm (vem com o Node.js)

### Para Desenvolvedores

1. **Instalar dependências do Next.js:**
```bash
cd "Ranking_das_Escolas/ranking_turmas_escolas/app"
npm install --legacy-peer-deps
```

2. **Iniciar servidor de desenvolvimento:**
```bash
npm run dev
```

3. **Gerar build estática:**
```bash
npm run build
```

Os arquivos estáticos serão gerados na pasta `out/` e copiados para `ranking-app/`.

## GitHub Pages

A versão estática está configurada para funcionar perfeitamente no GitHub Pages, incluindo:
- ✅ Carregamento correto dos dados JSON
- ✅ Estilização Tailwind CSS
- ✅ Funcionalidades interativas
- ✅ Responsividade

## Tecnologias Utilizadas

- **Next.js 14** - Framework React para a versão completa
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **HTML/CSS/JS Vanilla** - Versão fallback
- **GitHub Pages** - Hospedagem da versão estática

## Logs e Debugging

O console do navegador mostra qual versão está sendo carregada:
- `✅ Next.js app local detectado` - Versão completa local
- `✅ Abrindo app estático Next.js` - Versão estática
- `⚠️ Usando fallback ranking.html` - Versão simples

## Suporte

Para problemas ou melhorias, verifique:
1. Se o Node.js está instalado (`node --version`)
2. Se as dependências foram instaladas corretamente
3. Se os dados JSON estão sendo carregados (verificar console)
