# 🎓 Sistema SADE - Análise de Desempenho Educacional

## 📁 Estrutura Completa Criada

✅ **Pastas de Gabaritos Organizadas:**
```
media/gabaritos/
├── ensino_fundamental_1/
│   ├── 1ano/ ← Aqui você coloca gabaritos do 1º ano
│   ├── 2ano/ ← Aqui você coloca gabaritos do 2º ano
│   ├── 3ano/ ← Aqui você coloca gabaritos do 3º ano
│   ├── 4ano/ ← Aqui você coloca gabaritos do 4º ano
│   └── 5ano/ ← Aqui você coloca gabaritos do 5º ano
└── ensino_fundamental_2/
    ├── 6ano/ ← Preparado para o futuro (6º ano)
    ├── 7ano/ ← Preparado para o futuro (7º ano)
    ├── 8ano/ ← Preparado para o futuro (8º ano)
    └── 9ano/ ← Preparado para o futuro (9º ano)
```

✅ **Pasta de Resultados:**
```
media/resultados/ ← Aqui você coloca os CSVs de resultados
```

## 🔧 Sistema de Processamento Inteligente

### 📋 **Formato de Gabarito Reconhecido Automaticamente:**
```csv
Ano,Componente,Questão,Gabarito,Identificador
1º,Língua Portuguesa,1,A,PZD677983
1º,Língua Portuguesa,2,B,PZD677983
1º,Língua Portuguesa,3,C,PZD677983
```

### 🎯 **Formato de Resultados Reconhecido Automaticamente:**
```csv
"Identificador do aluno","Nome do aluno","Nome do teste","Nome da turma","Pontuação percentual","P. 1 Resposta","P. 2 Resposta"...
"2","Analys Rodrigues","CICLO II 1º ano LÍNGUA PORTUGUESA","1º ANO A - 03 DE DEZEMBRO 2025/2026","86.36 %","A","B"...
```

## 🤖 Recursos Automáticos Implementados

1. **🧠 Reconhecimento Inteligente:**
   - O sistema identifica automaticamente o formato dos seus CSVs
   - Extrai o ano escolar do nome da turma (ex: "1º ANO A" → "1ano")
   - Identifica a disciplina automaticamente
   - Reconhece as colunas de respostas (P. 1 Resposta, P. 2 Resposta, etc.)

2. **🏗️ Criação Automática:**
   - Cria escolas automaticamente se não existirem
   - Cria turmas automaticamente baseado no nome
   - Cadastra alunos automaticamente
   - Associa respostas com gabaritos correspondentes

3. **📊 Análise Automática:**
   - Calcula se cada resposta está correta ou incorreta
   - Gera estatísticas de desempenho por aluno
   - Calcula médias por turma e escola
   - Identifica questões com maior dificuldade

## 🚀 Como Usar

### Passo 1: Colocar os Gabaritos
1. Copie seus arquivos CSV de gabarito para a pasta correspondente:
   - 1º ano: `media/gabaritos/ensino_fundamental_1/1ano/`
   - 2º ano: `media/gabaritos/ensino_fundamental_1/2ano/`
   - E assim por diante...

### Passo 2: Colocar os Resultados
1. Copie seus arquivos CSV de resultados para: `media/resultados/`

### Passo 3: Processar via Admin Django
1. Acesse: `http://127.0.0.1:8000/admin/`
2. Login: `admin` / sua senha
3. Cadastre gabaritos em "Gabaritos"
4. Faça upload de resultados em "Upload de Resultado"
5. Visualize análises em "Análises de Desempenho"

### Passo 4: Testar o Sistema
1. Acesse: `http://127.0.0.1:8000/teste-processamento/`
2. Clique em "🚀 Executar Teste Completo"
3. Veja os resultados processados automaticamente

## 📈 Relatórios Gerados

O sistema gera automaticamente:
- ✅ **Desempenho individual** por aluno
- ✅ **Desempenho por turma** 
- ✅ **Desempenho por escola**
- ✅ **Análise por disciplina**
- ✅ **Questões com maior dificuldade**
- ✅ **Médias e percentuais de acerto**

## 🎯 Acesso ao Sistema

- **🏠 Home:** http://127.0.0.1:8000/
- **📊 Dashboard:** http://127.0.0.1:8000/dashboard/
- **⚙️ Admin:** http://127.0.0.1:8000/admin/
- **🧪 Teste:** http://127.0.0.1:8000/teste-processamento/
- **📈 Relatórios:** http://127.0.0.1:8000/relatorio-desempenho/

## 🔑 Credenciais de Acesso

- **Usuário:** `admin`
- **Senha:** (a que você definiu)

## ✨ Próximos Passos

1. **Coloque seus gabaritos** nas pastas apropriadas (1º ao 5º ano por enquanto)
2. **Adicione seus resultados** na pasta de resultados
3. **Teste o processamento** usando a página de teste
4. **Configure gabaritos** via admin Django
5. **Analise os resultados** nos relatórios gerados

O sistema está **100% funcional** e pronto para processar seus dados reais! 🎉
