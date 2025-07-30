# Matrizes de Referência - SADE v0.2.0

## 📋 Visão Geral

O módulo de **Matrizes de Referência** é uma nova funcionalidade do SADE que permite analisar a correlação entre questões de provas e as habilidades definidas nas matrizes de referência curricular.

## ✨ Funcionalidades

### 🔄 Análise de Correlação
- **Upload de Provas**: Aceita arquivos PDF, DOC, DOCX e TXT
- **Processamento Automático**: Identifica questões e mapeia com habilidades
- **Análise Inteligente**: Calcula correlação e confiança das identificações

### 📊 Visualizações Interativas
- **Gráfico de Dispersão**: Correlação questão x habilidade
- **Gráfico de Pizza**: Distribuição por ciclos de aprendizagem
- **Gráfico de Cobertura**: Percentual de habilidades cobertas na prova
- **Lista Detalhada**: Habilidades identificadas com métricas

### 🔍 Exploração das Matrizes
- **Browser Interativo**: Navegue por todas as habilidades
- **Filtros Avançados**: Por ano, disciplina e busca textual
- **Detalhes Completos**: Código, descrição, BNCC e ciclos

## 🎯 Disciplinas Suportadas

### 📚 Língua Portuguesa - Leitura
- **Anos**: 6º ao 9º ano
- **Habilidades**: Localização, inferência, interpretação
- **Ciclos**: I, II e III

### 🔢 Matemática  
- **Anos**: 6º ao 9º ano
- **Habilidades**: Números, álgebra, geometria
- **Ciclos**: I, II e III

### 🔬 Ciências da Natureza
- **Anos**: 6º ao 9º ano
- **Habilidades**: Vida, terra, matéria e energia
- **Ciclos**: I, II e III

## 🚀 Como Usar

### 1. Acesso ao Sistema
- Acesse a página inicial do SADE
- Clique no card **"Matrizes de Referência"** ou no menu **"Matrizes"**

### 2. Upload de Prova
```
1. Selecione o ano escolar (6º ao 9º)
2. Escolha a disciplina
3. Informe o nome da escola
4. Faça upload do arquivo da prova
5. Clique em "Analisar Prova"
```

### 3. Análise dos Resultados
- **Gráfico Principal**: Visualize correlações por questão
- **Lista de Habilidades**: Veja detalhes das identificações
- **Métricas de Cobertura**: Avalie a qualidade da prova

### 4. Exploração das Matrizes
- Use os filtros para encontrar habilidades específicas
- Busque por palavras-chave nas descrições
- Explore os códigos BNCC e ciclos de aprendizagem

## 🔧 Arquivos e Estrutura

### Arquivos Principais
```
matrizes.html              # Página principal do módulo
matrizes.js               # Lógica de análise e visualização
matriz/matriz_referencia.js  # Base de dados das habilidades
styles.css                # Estilos específicos (adicionados)
```

### Dependências
- **Bootstrap 5.3.3**: Interface responsiva
- **Chart.js**: Gráficos interativos
- **Font Awesome**: Ícones
- **Select2**: Seletores avançados

## 📈 Métricas e Análises

### Correlação Questão x Habilidade
- **60-100%**: Faixa de correlação simulada
- **Interativo**: Clique nos pontos para detalhes
- **Visual**: Código de cores por nível de correlação

### Distribuição por Ciclos
- **Ciclo I**: Habilidades fundamentais
- **Ciclo II**: Habilidades intermediárias  
- **Ciclo III**: Habilidades avançadas

### Cobertura da Matriz
- **Percentual**: Habilidades cobertas vs. total
- **Visual**: Gráfico tipo donut
- **Métrica**: Qualidade da distribuição da prova

## 🎨 Design e Experiência

### Tema Visual
- **Cor Principal**: Roxo (#7c3aed)
- **Gradientes**: Efeitos modernos
- **Responsivo**: Funciona em todos os dispositivos

### Interatividade
- **Drag & Drop**: Upload intuitivo de arquivos
- **Timeline**: Processo de análise visual
- **Filtros Dinâmicos**: Resultados em tempo real

### Modo Escuro
- **Suporte Completo**: Todos os componentes adaptados
- **Persistência**: Preferência salva localmente
- **Gráficos**: Cores ajustadas automaticamente

## 🔮 Funcionalidades Futuras

### Análise Avançada
- [ ] OCR para digitalização de provas físicas
- [ ] IA para sugestões de melhoria
- [ ] Relatórios em PDF automáticos

### Integração
- [ ] API para sistemas externos
- [ ] Banco de dados para histórico
- [ ] Compartilhamento de análises

### Colaboração
- [ ] Comentários nas análises
- [ ] Workspace para equipes
- [ ] Versionamento de provas

## 🐛 Limitações Conhecidas

### Simulação de Dados
- A análise atual é **simulada** para demonstração
- Em produção, seria necessário OCR real e processamento de texto
- As correlações são geradas aleatoriamente para fins de teste

### Formatos Suportados
- PDF: Requer OCR para texto digitalizado
- DOC/DOCX: Extração de texto necessária
- TXT: Suporte completo implementado

## 🤝 Contribuição

### Para Desenvolvedores
1. **Estenda a Matriz**: Adicione novas habilidades em `matriz_referencia.js`
2. **Melhore a Análise**: Implemente algoritmos reais em `matrizes.js`
3. **Novos Gráficos**: Adicione visualizações com Chart.js

### Para Educadores
1. **Teste com Provas Reais**: Valide a relevância das análises
2. **Sugira Métricas**: Proponha novos indicadores educacionais
3. **Feedback UX**: Ajude a melhorar a experiência do usuário

---

**Desenvolvido por Paulo Henrique para a Secretaria da Educação de Ararendá**  
*SADE v0.2.0 - Sistema de Avaliação e Desempenho Escolar*
