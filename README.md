# SADE - Sistema de Avaliação e Desempenho Escolar

**Prefeitura Municipal de Ararendá - CE**

Sistema profissional para análise e visualização de dados educacionais da rede municipal de ensino de Ararendá.

## 🎯 Visão Geral

O SADE é uma plataforma web desenvolvida para a Secretaria de Educação de Ararendá, permitindo o acompanhamento e análise do desempenho escolar através de dois programas principais:

- **PROEA** - Programa de Avaliação da Educação (Anos Finais - 6º ao 9º ano)
- **CNCA** - Compromisso Criança Alfabetizada (1º ao 5º ano)

## ✨ Funcionalidades

### 📊 Dashboard Interativo
- Visão geral com estatísticas principais
- Gráficos dinâmicos por disciplina e ano escolar
- Comparativo entre escolas e programas

### 🔍 Filtros Avançados
- Filtros por ano escolar, disciplina e escola
- Busca personalizada de dados
- Visualização dinâmica dos resultados

### 📈 Análise Comparativa
- Comparação entre programas PROEA e CNCA
- Evolução por disciplina
- Rankings de desempenho

### 🏫 Análise por Escola
- Desempenho detalhado de cada unidade escolar
- Estatísticas específicas por escola
- Histórico de avaliações

### 📥 Downloads e Relatórios
- **Export CSV/Excel**: Dados filtrados em planilhas
- **Relatórios PDF**: Documentos profissionais para apresentação
- **Download de Imagens**: Gráficos em alta resolução
- **Relatórios Personalizados**: Baseados nos filtros aplicados

### 🖼️ Visualização de Gráficos
- **Modal Aprimorado**: Visualização ampliada de gráficos
- **Navegação por Imagens**: Próximo/anterior com atalhos de teclado
- **Fullscreen**: Modo tela cheia para apresentações
- **Download Individual**: Baixar gráficos específicos

## 🛠️ Tecnologias Utilizadas

### Frontend
- **HTML5**: Estrutura semântica
- **CSS3**: Design system profissional com variáveis CSS
- **JavaScript ES6+**: Funcionalidades interativas
- **Chart.js**: Visualização de dados em gráficos

### Bibliotecas e Ferramentas
- **Font Awesome**: Ícones profissionais
- **Google Fonts**: Typography system (Inter, Poppins, Montserrat)
- **html2pdf.js**: Geração de relatórios PDF
- **GitHub Pages**: Hospedagem gratuita

### Design System
- **Cores Oficiais**: Paleta baseada na identidade municipal
- **Gradients**: Efeitos visuais modernos
- **Animations**: Micro-interações suaves
- **Responsive Design**: Adaptável a todos os dispositivos

## 📁 Estrutura do Projeto

```
sade/
├── assets/
│   ├── animations.css      # Animações e transições
│   ├── components.css      # Componentes específicos
│   ├── legacy-fixes.css    # Correções de compatibilidade
│   ├── exports.js          # Funcionalidades de download
│   ├── favicon.svg         # Ícone do sistema
│   ├── logo-arara.svg      # Logo municipal (fallback)
│   ├── logo.png            # Logo oficial de Ararendá
│   └── planodefundo.jpg    # Background alternativo
├── Graficos/               # Imagens dos gráficos
│   ├── PROEA/             # Dados do PROEA
│   └── CNCA/              # Dados do CNCA
├── index.html             # Página principal
├── styles.css             # Estilos principais
├── script.js              # Lógica da aplicação
├── sade_data.js           # Dados processados
├── process_data.py        # Script de processamento
└── README.md              # Documentação
```

## 🚀 Como Usar

### Acesso Online
🌐 **[https://pauloheg33.github.io/sade](https://pauloheg33.github.io/sade)**

### Navegação
1. **Dashboard**: Visão geral dos dados
2. **PROEA**: Análise dos anos finais (6º-9º)
3. **CNCA**: Análise da alfabetização (1º-5º)
4. **Comparativo**: Análises comparativas
5. **Por Escola**: Dados específicos por unidade

### Downloads
- Clique em "Downloads e Relatórios" para acessar as opções
- Use os filtros para personalizar os dados
- Clique nas imagens para visualização ampliada
- Use as teclas ←/→ para navegar entre gráficos

## 📊 Dados Disponíveis

### Estatísticas Gerais
- **3.428 alunos** avaliados
- **10 escolas** participantes
- **174 avaliações** realizadas
- **3 disciplinas** analisadas

### Programas
- **PROEA**: Língua Portuguesa, Matemática, Ciências Naturais
- **CNCA**: Língua Portuguesa, Matemática

### Escolas Participantes
- 03 DE DEZEMBRO
- 21 DE DEZEMBRO
- ANTONIO DE SOUSA BARROS
- FIRMINO JOSÉ
- JOSE ALVES
- E outras unidades da rede municipal

## 🎨 Design e Identidade Visual

### Cores Principais
- **Azul Primário**: #4A90E2 (Cor institucional)
- **Verde Municipal**: #22C55E
- **Dourado**: #F59E0B
- **Laranja**: #EA580C

### Typography
- **Títulos**: Montserrat (Display)
- **Interface**: Poppins (Secondary)
- **Texto**: Inter (Primary)

### Características Visuais
- Design limpo e profissional
- Gradients sutis
- Sombras suaves
- Animações smooth
- Layout responsivo

## 🔧 Desenvolvimento Local

### Pré-requisitos
- Python 3.x (para processamento de dados)
- Navegador web moderno
- Editor de código

### Processamento de Dados
```bash
python process_data.py
```

### Visualização Local
Abra o arquivo `index.html` em um navegador ou use um servidor local:
```bash
python -m http.server 8000
```

## 📈 Atualizações e Melhorias

### Versão Atual: 2.0
- ✅ Design system profissional
- ✅ Funcionalidades de download
- ✅ Modal aprimorado para imagens
- ✅ Navegação por teclado
- ✅ Relatórios personalizados
- ✅ Animações suaves
- ✅ Responsividade completa

### Próximas Atualizações
- 📱 App mobile nativo
- 🔐 Sistema de autenticação
- 📊 Gráficos em tempo real
- 🤖 Análises preditivas
- 📧 Relatórios automáticos por email

## 👥 Equipe de Desenvolvimento

**Secretaria de Educação de Ararendá**
- Desenvolvimento e manutenção do sistema
- Análise de dados educacionais
- Suporte técnico

## 📞 Suporte

Para dúvidas, sugestões ou suporte técnico:
- **Email**: secretaria.educacao@ararenda.ce.gov.br
- **Telefone**: (85) XXXX-XXXX
- **Endereço**: Prefeitura Municipal de Ararendá - CE

## 📄 Licença

© 2025 Prefeitura Municipal de Ararendá - CE
Todos os direitos reservados.

---

**Sistema desenvolvido com 💙 para a educação de Ararendá**
