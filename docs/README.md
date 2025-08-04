# SADE v0.2.0 🎓

## Sistema de Avaliação e Desempenho Escolar

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-brightgreen)](https://pauloheg33.github.io/sade/)
[![Version](https://img.shields.io/badge/Version-0.2.0-blue)](https://github.com/pauloheg33/sade)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

**SADE** é uma plataforma web moderna e responsiva para visualização e análise de dados educacionais da **Secretaria da Educação de Ararendá - CE**. O sistema permite acompanhar o desempenho escolar através de gráficos interativos e estatísticas detalhadas.

## 🚀 **Acesso Direto**

### **[👉 Acessar SADE Online](https://pauloheg33.github.io/sade/)**

## 📊 **Funcionalidades**

### **PROEA - Anos Finais (6º ao 9º ano)**
- 🎯 **Filtros Avançados**: Ano escolar, disciplina (CN, LP, MAT) e escola
- 📈 **Estatísticas em Tempo Real**: Total de avaliações, escolas, alunos e média geral
- 🔍 **Busca Inteligente**: Pesquisa por escola, ano ou disciplina
- 📋 **Múltiplas Visualizações**: Grid de cards com gráficos interativos
- 🏫 **Gestão de Turmas**: Diferenciação entre turmas A/B da mesma escola
- 📄 **Download PDF**: Relatórios profissionais das imagens filtradas ⭐ **NOVO**

### **CNCA - Anos Iniciais (1º ao 5º ano)** 
- 📚 **Compromisso Criança Alfabetizada**: Foco em Língua Portuguesa e Matemática
- 📊 **Interface Dedicada**: Layout otimizado para alfabetização
- 🎨 **Design Diferenciado**: Cores e ícones específicos para o programa
- 📈 **Acompanhamento Detalhado**: Progresso individual por escola e turma
- 📄 **Download PDF**: Relatórios profissionais das imagens filtradas ⭐ **NOVO**

### **Dashboard Unificado**
- 🏠 **Visão Geral**: Estatísticas consolidadas de todo o sistema
- 🎯 **Acesso Rápido**: Links diretos para PROEA e CNCA
- 📊 **Gráficos Resumidos**: Performance por ano e distribuição por disciplina
- 🖼️ **Galeria Completa**: Acesso a todos os gráficos do sistema

## 🛠️ **Tecnologias**

- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Framework CSS**: Bootstrap 5.3.3
- **Gráficos**: Chart.js
- **Ícones**: Font Awesome 6.5.2  
- **Componentes**: Select2, Fancybox
- **Hospedagem**: GitHub Pages
- **Processamento**: Python 3.x

## 📁 **Estrutura do Projeto**

```
sade/
├── 📄 index.html          # Dashboard principal
├── 📄 proea.html          # Página dedicada PROEA  
├── 📄 cnca.html           # Página dedicada CNCA
├── 📄 styles.css          # Estilos personalizados
├── 📄 app-modern.js       # JavaScript do dashboard
├── 📄 data-transform.js   # Transformador de dados
├── 📄 sade_data.js        # Base de dados estruturada
├── 📄 config.js           # Configurações do sistema
├── 📄 process_data.py     # Processador de dados Python
├── 📁 assets/             # Logos, ícones e imagens
├── 📁 data/               # Gráficos originais por programa
│   ├── 📁 PROEA/          # Anos finais (6º-9º)
│   └── 📁 CNCA/           # Anos iniciais (1º-5º)
└── 📄 README.md           # Documentação
```

## 🎨 **Características do Design**

### **Responsivo e Moderno**
- ✅ **Mobile-First**: Otimizado para dispositivos móveis
- ✅ **Desktop-Ready**: Interface completa para computadores
- ✅ **Acessibilidade**: Navegação por teclado e leitores de tela
- ✅ **Performance**: Carregamento otimizado e lazy loading

### **Interface Intuitiva**
- 🎯 **Navegação Clara**: Breadcrumbs e menus contextuais
- 🔍 **Busca Instantânea**: Filtros em tempo real
- 📊 **Visualização Direta**: Gráficos mostrados imediatamente
- 🎨 **Modo Escuro**: Alternância entre temas claro/escuro

## 📈 **Dados e Estatísticas**

### **Cobertura Atual**
- **8 Escolas** da rede municipal
- **184 Avaliações** processadas
- **9 Anos/Séries** cobertos (1º ao 9º ano)
- **3 Disciplinas** principais (LP, MAT, CN)

### **Programas Educacionais**
- **PROEA**: Avaliação das Aprendizagens dos Anos Finais
- **CNCA**: Compromisso Criança Alfabetizada

## 🚀 **Como Usar**

### **1. Acesso Online**
Visite: **[https://pauloheg33.github.io/sade/](https://pauloheg33.github.io/sade/)**

### **2. Navegação**
- **Dashboard**: Visão geral do sistema
- **PROEA**: Clique para acessar dados dos anos finais  
- **CNCA**: Clique para acessar dados dos anos iniciais
- **Galeria**: Visualize todos os gráficos disponíveis

### **3. Filtros e Busca**
- Use os **filtros** para refinar os resultados
- Digite na **barra de busca** para encontrar escolas específicas
- **Ordene** os resultados por diferentes critérios
- **Limpe** os filtros para resetar a visualização

## 💻 **Desenvolvimento Local**

### **Pré-requisitos**
- Python 3.7+
- Servidor web local (Live Server, http-server, etc.)

### **Instalação**
```bash
# Clone o repositório
git clone https://github.com/pauloheg33/sade.git
cd sade

# Processe os dados (se necessário)
python process_data.py

# Sirva localmente (com Live Server ou similar)
# Acesse http://localhost:5500
```

### **Atualização de Dados**
```bash
# Adicione novos gráficos à pasta data/
# Execute o processador
python process_data.py

# O arquivo sade_data.js será regenerado automaticamente
```

## 🔄 **Atualizações e Versões**

### **v0.2.0** (Atual)
- ✅ Páginas separadas para PROEA e CNCA
- ✅ Layouts específicos e otimizados  
- ✅ Sistema de dados reestruturado
- ✅ Performance melhorada
- ✅ Navegação aprimorada

### **v0.1.0**
- ✅ Interface moderna e responsiva
- ✅ Dashboard unificado
- ✅ Sistema de filtros avançado
- ✅ Múltiplas visualizações

## 🤝 **Contribuição**

1. **Fork** o projeto
2. **Clone** sua versão
3. **Crie** uma branch para sua feature
4. **Commit** suas mudanças  
5. **Push** para a branch
6. **Abra** um Pull Request

## 📞 **Contato e Suporte**

- **Desenvolvedor**: Paulo Henrique
- **Organização**: Secretaria da Educação de Ararendá - CE
- **GitHub**: [@pauloheg33](https://github.com/pauloheg33)
- **Repositório**: [github.com/pauloheg33/sade](https://github.com/pauloheg33/sade)

## 📝 **Licença**

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

<div align="center">

**SADE v0.2.0** - Sistema de Avaliação e Desempenho Escolar  
*Desenvolvido com ❤️ para a educação de Ararendá - CE*

[![GitHub](https://img.shields.io/badge/GitHub-pauloheg33-blue)](https://github.com/pauloheg33)
[![Website](https://img.shields.io/badge/Website-Live-brightgreen)](https://pauloheg33.github.io/sade/)

</div>

![SADE Logo](assets/logo.png)

# 🎯 SADE v4.0.0 - Sistema de Avaliação e Desempenho Escolar

> **Sistema Moderno de Visualização de Dados Educacionais**  
> Secretaria da Educação de Ararendá - CE

## 🚀 **NOVA VERSÃO v4.0.0 - ARQUITETURA MODERNA**

### ✨ **Principais Melhorias**

#### 🔧 **Stack Tecnológico Atualizado**
- **Bootstrap 5.3.0** - Framework CSS moderno e responsivo
- **Select2 4.1.0** - Dropdowns avançados com busca e múltipla seleção
- **Fancybox 5.0** - Galeria de imagens profissional com zoom e navegação
- **Chart.js 4.4.0** - Gráficos interativos e responsivos
- **Font Awesome 6.0** - Ícones modernos e vetoriais
- **jQuery 3.7.0** - Biblioteca JavaScript otimizada

#### 🎨 **Interface Moderna**
- Design limpo e profissional com gradientes modernos
- Cards com efeitos de hover e transições suaves
- Sistema de navegação por abas intuitivo
- Filtros visuais com badges de status ativo
- Loading states e animações fluidas

#### 🔍 **Sistema de Filtros Aprimorado**
- Dropdowns inteligentes com busca em tempo real
- Filtros persistentes com indicadores visuais
- Aplicação de filtros com debounce para performance
- Limpeza rápida de todos os filtros

#### 🖼️ **Galeria de Imagens Profissional**
- Visualização em grid responsivo
- Zoom avançado com controles de navegação
- Lazy loading para performance otimizada
- Lightbox com informações detalhadas
- Navegação por teclado e touch

#### 📊 **Dashboard Estatístico**
- Métricas em tempo real do sistema
- Gráficos interativos por disciplina e ano
- Cards estatísticos com design moderno
- Distribuição visual de dados

### 🏗️ **Arquitetura do Sistema**

```
SADE v4.0.0/
├── 📄 index.html          # Interface moderna com Bootstrap 5
├── 🎨 styles.css          # Estilos consolidados e otimizados
├── ⚙️ config.js           # Configuração centralizada expandida
├── 📊 sade_data.js        # Base de dados estruturada
├── 🚀 app.js              # Aplicação moderna com classes ES6
├── 📁 data/               # Imagens organizadas por programa
│   ├── PROEA/             # Anos Finais (6º ao 9º)
│   └── CNCA/              # Alfabetização (1º ao 5º)
└── 🎯 assets/             # Recursos visuais e ícones
```

### 💎 **Funcionalidades Avançadas**

#### 🎛️ **Sistema de Navegação**
- **Dashboard**: Visão geral com estatísticas e gráficos
- **PROEA**: Filtros específicos para anos finais (6º-9º)
- **CNCA**: Filtros para programa de alfabetização (1º-5º)
- **Galeria**: Visualização completa de todos os gráficos

#### 🔧 **Filtros Inteligentes**
- **Por Ano Escolar**: Seleção específica do ano letivo
- **Por Disciplina**: LP, MAT, CN com ícones identificadores
- **Por Escola**: Lista completa de instituições
- **Estados Visuais**: Badges indicando filtros ativos

#### 📈 **Visualização de Dados**
- **Gráficos Responsivos**: Ajustam automaticamente ao dispositivo
- **Cores Temáticas**: Identificação visual por disciplina
- **Informações Detalhadas**: Média, número de alunos, escola
- **Performance Levels**: Classificação visual por cores

#### 📄 **Relatórios em PDF** ⭐ **NOVO v0.2.0**
- **Download Inteligente**: Gera PDF apenas com imagens filtradas
- **Formatação Profissional**: Layout A4 com cabeçalho e rodapé
- **Filtros Documentados**: Lista dos filtros aplicados no relatório
- **Qualidade Preservada**: Imagens em alta resolução
- **Nomeação Automática**: Arquivo com programa e data
- **Feedback Visual**: Indicadores de progresso durante geração

### 🌐 **Compatibilidade GitHub Pages**

#### ✅ **Otimizações Implementadas**
- **CDN Libraries**: Todas as bibliotecas via CDN para fast loading
- **URL Encoding**: Caracteres especiais automaticamente codificados
- **Fallback Assets**: Imagens de placeholder para casos de erro
- **Responsive Design**: Funciona perfeitamente em mobile e desktop

### 🛠️ **Como Usar**

#### 💻 **Desenvolvimento Local**
```bash
# Clone o repositório
git clone https://github.com/pauloheg33/sade.git
cd sade
python3 -m http.server 8080
# Acesse: http://localhost:8080
```

#### 🌍 **Produção (GitHub Pages)**
**🌐 Acesse agora**: [https://pauloheg33.github.io/sade/](https://pauloheg33.github.io/sade/)

### 👨‍💻 **Desenvolvimento**

**Desenvolvido por**: Paulo Henrique  
**Organização**: Secretaria da Educação de Ararendá - CE  
**Versão**: 4.0.0  
**Tecnologias**: HTML5, CSS3, JavaScript ES6+, Bootstrap 5, Chart.js  

> *SADE v4.0.0 - Transformando dados educacionais em insights visuais*

[![Deploy Status](https://img.shields.io/badge/deploy-active-brightgreen)](https://pauloheg33.github.io/sade/)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
[![Made with Love](https://img.shields.io/badge/made%20with-❤️-red)](https://github.com/pauloheg33)

## 📋 Sobre o Projeto

O SADE é uma aplicação web moderna desenvolvida para visualizar e analisar dados de desempenho escolar dos programas educacionais do município de Ararendá - CE. O sistema oferece uma interface intuitiva para análise de dados de duas importantes iniciativas:

- **PROEA** - Avaliação das Aprendizagens dos Anos Finais (6º ao 9º ano)
- **CNCA** - Compromisso Criança Alfabetizada (1º ao 5º ano)

## 🚀 Funcionalidades

### ✨ Dashboard Interativo
- Estatísticas gerais em tempo real
- Gráficos dinâmicos de desempenho
- Comparativos entre escolas e disciplinas

### 🔍 Sistema de Filtros Avançados
- Filtro por programa (PROEA/CNCA)
- Filtro por escola
- Filtro por ano escolar
- Filtro por disciplina

### 📊 Visualizações de Dados
- Gráficos integrados por disciplina
- Comparações de performance
- Análise de tendências

### 🖼️ Galeria de Resultados
- Visualização de gráficos educacionais
- Modal de ampliação de imagens
- Sistema de download integrado

## 🛠️ Tecnologias Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Gráficos**: Chart.js
- **Design**: CSS Grid/Flexbox, Variáveis CSS
- **Fonte de Dados**: JSON estruturado
- **Deploy**: GitHub Pages

## 📁 Estrutura do Projeto

```
sade/
├── 📄 index.html          # Página principal
├── 🎨 styles.css          # Estilos consolidados
├── ⚙️ config.js           # Configurações do sistema
├── 📊 sade_data.js        # Base de dados
├── 🔧 script.js           # Lógica principal
├── 📁 assets/             # Recursos estáticos
│   ├── logo.png
│   ├── favicon.svg
│   └── logo-arara.svg
├── 📁 Graficos/           # Gráficos educacionais
│   ├── PROEA/
│   └── CNCA/
└── 📋 README.md           # Documentação
```

## 🎯 Programas Educacionais

### PROEA - Avaliação dos Anos Finais
- **Público**: 6º ao 9º ano do Ensino Fundamental
- **Disciplinas**: Língua Portuguesa, Matemática, Ciências da Natureza
- **Escolas**: 5 unidades educacionais
- **Objetivo**: Avaliar competências e habilidades dos anos finais

### CNCA - Compromisso Criança Alfabetizada
- **Público**: 1º ao 5º ano do Ensino Fundamental
- **Disciplinas**: Língua Portuguesa, Matemática
- **Escolas**: 6 unidades educacionais
- **Objetivo**: Garantir alfabetização na idade certa

## 💻 Como Usar

1. **Acesse o sistema**: [https://pauloheg33.github.io/sade/](https://pauloheg33.github.io/sade/)

2. **Navegue pelas seções**:
   - 🏠 **Dashboard**: Visão geral do sistema
   - 📊 **PROEA**: Dados dos anos finais
   - 📚 **CNCA**: Dados da alfabetização
   - 🔄 **Comparativo**: Análises comparativas
   - 🏫 **Escolas**: Dados por unidade escolar

3. **Use os filtros**:
   - Selecione a escola desejada
   - Escolha o ano escolar
   - Filtre por disciplina

4. **Visualize os resultados**:
   - Clique nas imagens para ampliar
   - Use o botão de download para salvar

## 🔧 Desenvolvimento Local

```bash
# Clone o repositório
git clone https://github.com/pauloheg33/sade.git

# Navegue para o diretório
cd sade

# Inicie um servidor local (Python)
python -m http.server 8000

# Ou use Node.js
npx serve .

# Acesse http://localhost:8000
```

## 📈 Performance e Otimizações

- ⚡ **Carregamento rápido**: Assets otimizados
- 🎨 **CSS consolidado**: Estilos em arquivo único
- 📱 **Design responsivo**: Compatível com todos os dispositivos
- 🔍 **SEO otimizado**: Meta tags estruturadas
- ♿ **Acessibilidade**: Padrões WCAG

## 🤝 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📞 Contato

**Secretaria da Educação de Ararendá**
- 🌐 Website: [ararendá.ce.gov.br](http://ararendá.ce.gov.br)
- 📧 Email: educacao@arara.ce.gov.br
- 📱 Telefone: (85) 3XXX-XXXX

**Desenvolvedor**
- 👨‍💻 GitHub: [@pauloheg33](https://github.com/pauloheg33)
- 📧 Email: pauloheg33@gmail.com

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🙏 Agradecimentos

- **Secretaria da Educação de Ararendá** pelo suporte e dados
- **Professores e gestores** pelas contribuições e feedback
- **Comunidade open source** pelas ferramentas utilizadas

---

<div align="center">
  <strong>Feito com ❤️ para a educação de Ararendá - CE</strong>
  <br>
  <small>© 2025 Secretaria da Educação de Ararendá</small>
</div>
