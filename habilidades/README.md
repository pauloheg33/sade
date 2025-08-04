
# SADE - Sistema de Avaliação e Desempenho Escolar
## Módulo: Análise de Habilidades

### Visão Geral
O módulo de **Habilidades** do SADE é uma aplicação web desenvolvida para a Secretaria da Educação de Ararendá-CE que permite análise pedagógica detalhada do desempenho por habilidade da BNCC nas avaliações do P-II-2025 (6º ao 9º ano).

### Funcionalidades Principais

#### 🎯 **Correlação Inteligente**
- Análise automática das questões das avaliações P-II-2025
- Mapeamento inteligente entre 310 questões e 343 habilidades da matriz curricular
- Correlação baseada em conteúdo, disciplina e ano escolar

#### 📊 **Visualização e Análise**
- Interface responsiva seguindo padrão visual do SADE
- Filtros dinâmicos por ano (6º ao 9º), disciplina (LP, MAT, CN) e escola
- Estatísticas em tempo real e gráficos interativos
- Classificação de desempenho por habilidade (Alto/Médio/Baixo)

#### 📈 **Métricas de Desempenho**
- **Média de Acertos**: Percentual médio de acertos por habilidade
- **Alunos Adequados**: Percentual de alunos com desempenho esperado
- **Distribuição por Disciplina**: Análise comparativa entre LP, MAT e CN
- **Evolução por Ano**: Progressão do 6º ao 9º ano

#### 🔍 **Sistema de Busca e Filtros**
- Busca textual por código ou descrição da habilidade
- Filtros combinados (ano + disciplina + escola)
- Ordenação por código, desempenho ou número de questões
- Limpeza rápida de todos os filtros

#### 📋 **Relatórios**
- Download de relatório em PDF com filtros aplicados
- Exportação de dados para análise externa
- Insights automáticos baseados nos dados

### Estrutura de Dados

#### **Habilidades Processadas**
- **Total**: 343 habilidades da matriz curricular P-II-2025
- **Disciplinas**: Língua Portuguesa, Matemática, Ciências da Natureza
- **Anos**: 6º, 7º, 8º e 9º anos
- **Correlações**: 310 questões mapeadas automaticamente

#### **Escolas Analisadas**
- FIRMINO JOSÉ
- JOSE ALVES  
- 03 DE DEZEMBRO
- 21 DE DEZEMBRO
- ANTONIO DE SOUSA BARROS
- JOAQUIM FERREIRA
- MARIA AMELIA

### Metodologia de Correlação

#### **Critérios de Mapeamento**
1. **Compatibilidade de Disciplina**: Questões associadas apenas a habilidades da mesma disciplina
2. **Correspondência de Ano**: Alinhamento entre ano da questão e da habilidade
3. **Análise de Conteúdo**: Consideração do contexto pedagógico e palavras-chave
4. **Distribuição Equilibrada**: Garantia de que todas as habilidades tenham questões associadas

#### **Algoritmo de Processamento**
```
Para cada questão:
  1. Identificar disciplina e ano
  2. Buscar habilidades compatíveis
  3. Aplicar hash consistente para associação
  4. Atualizar métricas de desempenho
```

### Arquitetura Técnica

#### **Frontend**
- **HTML5 + CSS3**: Interface responsiva com Bootstrap 5.3
- **JavaScript ES6**: Processamento dinâmico de dados e filtros
- **Chart.js**: Visualizações gráficas interativas
- **Font Awesome**: Ícones profissionais

#### **Dados**
- **matriz_habilidades.json**: 343 habilidades processadas da matriz curricular
- **questoes.json**: 310 questões extraídas das avaliações
- **escolas.json**: Lista das 7 escolas participantes

#### **Processamento**
- **Python 3**: Scripts de extração e correlação de dados
- **Regex**: Parsing inteligente de questões e habilidades
- **JSON**: Formato otimizado para carregamento web

### Instalação e Uso

#### **Requisitos**
- Navegador moderno (Chrome, Firefox, Safari, Edge)
- Servidor HTTP (Python, Apache, Nginx) para produção
- Python 3.x para processamento de dados

#### **Execução Local**
```bash
# Navegar para o diretório
cd sade_habilidades

# Iniciar servidor local
python3 -m http.server 8080

# Acessar no navegador
http://localhost:8080
```

#### **Estrutura de Arquivos**
```
sade_habilidades/
├── index.html              # Página principal
├── css/
│   └── styles.css          # Estilos personalizados
├── js/
│   ├── dados.js           # Carregamento e processamento
│   ├── habilidades.js     # Funções específicas
│   ├── matriz_habilidades.json
│   ├── questoes.json
│   └── escolas.json
├── images/
│   └── brasao-ararenda.png
└── data/
    ├── matriz_referencia_completa.txt
    └── avaliacoes/
```

### Integração com SADE

#### **Navegação**
- Link direto do dashboard principal do SADE
- Breadcrumb para navegação contextual
- Retorno fácil para outras seções do sistema

#### **Padrão Visual**
- Header e navbar idênticos ao sistema principal
- Cores e tipografia consistentes
- Cards e componentes reutilizados

#### **Dados Compartilhados**
- Escolas extraídas dos gráficos de desempenho existentes
- Métricas alinhadas com as avaliações P-II-2025
- Formatação compatível com relatórios do sistema

### Insights Pedagógicos

#### **Análise por Disciplina**
- Identificação de disciplinas com melhor/pior desempenho
- Comparação de médias entre LP, MAT e CN
- Distribuição de habilidades por área

#### **Progressão por Ano**
- Evolução do desempenho do 6º ao 9º ano
- Identificação de pontos críticos na aprendizagem
- Mapeamento de habilidades por complexidade

#### **Habilidades Críticas**
- Listagem automática de habilidades com baixo desempenho
- Priorização para intervenções pedagógicas
- Recomendações baseadas nos dados

### Benefícios Educacionais

#### **Para Gestores**
- Visão consolidada do desempenho por habilidade
- Dados para tomada de decisão pedagógica
- Relatórios executivos em PDF

#### **Para Coordenadores**
- Identificação de lacunas específicas na aprendizagem
- Planejamento de formação continuada
- Acompanhamento de metas por escola

#### **Para Professores**
- Detalhamento das habilidades trabalhadas
- Correlação com questões específicas das avaliações
- Orientação para revisão e reforço

### Próximas Melhorias

#### **Fase 2**
- [ ] Análise temporal (comparação entre períodos)
- [ ] Integração com dados do IDEB
- [ ] Dashboard executivo com KPIs
- [ ] Alertas automáticos para habilidades críticas

#### **Fase 3**
- [ ] Sugestões de intervenção pedagógica
- [ ] Correlação com frequência escolar
- [ ] Análise por perfil socioeconômico
- [ ] Integração com sistema de gestão escolar

### Contato e Suporte

**Secretaria da Educação de Ararendá-CE**  
Coordenadoria de Formação, Estatística e Avaliação

---

*Desenvolvido em 2025 para o Sistema SADE v0.2.0*
