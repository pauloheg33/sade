# 🎓 SADE - Sistema de Avaliação e Desempenho Escolar

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
