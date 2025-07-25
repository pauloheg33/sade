# Pasta de Resultados

Esta pasta armazena os arquivos CSV com os resultados dos alunos que serão processados pelo sistema.

## Formato dos arquivos CSV de Resultados:

O sistema reconhece automaticamente o formato padrão:

```csv
"Identificador do aluno","Nome do aluno","Nome do teste","Nome da turma","Pontuação percentual","P. 1 Resposta","P. 2 Resposta","P. 3 Resposta"...
"2","Analys Rodrigues da Rocha Araujo","CICLO II 1º ano LÍNGUA PORTUGUESA","1º ANO A - 03 DE DEZEMBRO 2025/2026","86.36 %","A","B","C"...
```

### Colunas obrigatórias:
- **Identificador do aluno**: ID único do aluno
- **Nome do aluno**: Nome completo do aluno
- **Nome do teste**: Nome/descrição da avaliação
- **Nome da turma**: Nome da turma (ex: "1º ANO A - 03 DE DEZEMBRO 2025/2026")
- **Pontuação percentual**: Percentual de acertos (calculado automaticamente)
- **P. 1 Resposta, P. 2 Resposta, ...**: Respostas do aluno para cada questão

### Processamento automático:

O sistema automaticamente:
1. **Extrai o ano escolar** do nome da turma (ex: "1º ANO A" → "1ano")
2. **Identifica as colunas de respostas** (P. 1 Resposta, P. 2 Resposta, etc.)
3. **Cria escolas, turmas e alunos** automaticamente se não existirem
4. **Associa com gabaritos** correspondentes baseado no ano e disciplina
5. **Calcula estatísticas** de desempenho individual e coletivo

### Observações:
- O sistema suporta respostas A, B, C, D, E
- Respostas em branco ou "NAN" são tratadas como não respondidas
- O nome da escola é extraído ou pode ser definido no upload
- Múltiplos arquivos podem ser processados para a mesma escola/turma
