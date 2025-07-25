# Pasta de Gabaritos

Esta pasta contém os gabaritos organizados por nível de ensino e ano escolar.

## Estrutura:

### Ensino Fundamental I (1º ao 5º ano)
- `ensino_fundamental_1/1ano/` - Gabaritos do 1º ano
- `ensino_fundamental_1/2ano/` - Gabaritos do 2º ano
- `ensino_fundamental_1/3ano/` - Gabaritos do 3º ano
- `ensino_fundamental_1/4ano/` - Gabaritos do 4º ano
- `ensino_fundamental_1/5ano/` - Gabaritos do 5º ano

### Ensino Fundamental II (6º ao 9º ano)
- `ensino_fundamental_2/6ano/` - Gabaritos do 6º ano
- `ensino_fundamental_2/7ano/` - Gabaritos do 7º ano
- `ensino_fundamental_2/8ano/` - Gabaritos do 8º ano
- `ensino_fundamental_2/9ano/` - Gabaritos do 9º ano

## Formato dos arquivos CSV de Gabarito:

O sistema reconhece automaticamente o formato padrão:

```csv
Ano,Componente,Questão,Gabarito,Identificador
1º,Língua Portuguesa,1,A,PZD677983
1º,Língua Portuguesa,2,B,PZD677983
1º,Língua Portuguesa,3,C,PZD677983
```

### Colunas obrigatórias:
- **Ano**: Ano escolar (1º, 2º, 3º, etc.)
- **Componente**: Disciplina (Língua Portuguesa, Matemática, etc.)
- **Questão**: Número da questão
- **Gabarito**: Resposta correta (A, B, C, D, E ou vazio para questões sem gabarito)
- **Identificador**: Código identificador do teste (opcional)

### Observações:
- Questões com gabarito vazio ou em branco são ignoradas automaticamente
- O sistema extrai automaticamente a disciplina e ano do nome do arquivo
- Nomes de arquivo sugeridos: `1oano_Língua_Portuguesa.csv`, `2ano_Matemática.csv`
