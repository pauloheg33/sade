# 🏆 SADE - Ranking das Escolas

## Como Usar o Sistema de Ranking

### 1. Acesso Rápido (Recomendado)

1. **Abra o SADE** (index.html)
2. **Clique no botão "Ranking"** no menu ou no dashboard
3. A aplicação será aberta automaticamente em uma nova aba
4. **Versão HTML** - funciona imediatamente, sem instalação

### 2. Versão Avançada (Next.js)

Para funcionalidades avançadas, execute:
1. **Execute o arquivo `start-ranking.bat`** (clique duplo)
2. **Aguarde** a instalação das dependências (apenas na primeira vez)
3. **Espere** a mensagem "✓ Ready" aparecer no terminal
4. A aplicação estará disponível em: **http://localhost:3001**

### 3. Indicadores de Status

- **● Dados OK** (verde): Arquivo de dados encontrado
- **● Sem Dados** (amarelo): Arquivo de dados não encontrado

### 4. Funcionalidades

**Versão HTML (ranking.html):**
- ✅ Ranking interativo de turmas
- ✅ Filtros por ano e disciplina
- ✅ Gráficos de desempenho
- ✅ Estatísticas em tempo real
- ✅ Interface moderna e responsiva
- ✅ Funciona offline

**Versão Next.js (localhost:3001):**
- ✅ Todas as funcionalidades da versão HTML
- ✅ Recursos avançados de interação
- ✅ Melhor performance
- ✅ Atualizações automáticas

### 5. Problemas Comuns

**❌ "Dados não encontrados"**
- Verifique se o arquivo `data/ranking_turmas_por_ano.json` existe
- Confirme que está na pasta correta do projeto

**❌ Para versão Next.js: "Node.js não encontrado"**
- Instale o Node.js: https://nodejs.org
- Baixe a versão LTS
- Reinicie o computador após instalar

**❌ "Erro ao instalar dependências"**
- Verifique sua conexão com a internet
- Execute como Administrador
- Tente excluir a pasta `node_modules` e executar novamente

### 6. Arquivos do Sistema

- `index.html` - Página principal do SADE
- `ranking.html` - Aplicação de ranking (HTML simples)
- `start-ranking.bat` - Inicia a versão Next.js
- `Ranking_das_Escolas/` - Aplicação Next.js completa
- `data/ranking_turmas_por_ano.json` - Dados do ranking

---

**Desenvolvido por Paulo Henrique**
*Secretaria da Educação de Ararendá - CE*
