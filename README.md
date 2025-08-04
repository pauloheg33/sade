# SADE v0.2.0 - Sistema de Avaliação e Desempenho Escolar

## 📋 Visão Geral

O **SADE** (Sistema de Avaliação e Desempenho Escolar) é uma plataforma web modernizada para visualização e análise de dados educacionais da Secretaria da Educação de Ararendá - CE.

### 🎯 Funcionalidades Principais

- **Dashboard Integrado**: Visão geral com estatísticas consolidadas
- **PROEA**: Avaliação das Aprendizagens dos Anos Finais (6º ao 9º ano)
- **CNCA**: Compromisso Criança Alfabetizada (1º ao 5º ano)
- **Galeria de Gráficos**: Visualização completa de todos os dados

## 🗂️ Estrutura do Projeto (Reorganizada em 2025)

```
sade/
├── 📄 index.html                    # Dashboard principal
├── 📄 proea.html                    # PROEA - Anos Finais
├── 📄 cnca.html                     # CNCA - Anos Iniciais
├── 📁 assets/                       # Recursos organizados
│   ├── css/
│   │   └── styles.css               # Estilos customizados
│   ├── js/
│   │   ├── app-modern.js            # App principal
│   │   ├── config.js                # Configurações
│   │   ├── data-transform.js        # Transformação de dados
│   │   └── integrity-check.js       # Verificação de integridade
│   ├── data/
│   │   └── sade_data.js             # Base de dados principal
│   ├── images/
│   │   ├── logo.png                 # Logo da secretaria
│   │   ├── logo-arara.svg           # Logo alternativo
│   │   └── favicon.svg              # Ícone do site
├── 📁 data/                         # Gráficos por programa
│   ├── AVALIAÇÃO DAS APRENDIZAGENS DOS ANOS FINAIS - PROEA/
│   └── COMPROMISSO CRIANÇA ALFABETIZADA - CNCA/
├── 📁 docs/                         # Documentação
│   ├── README.md                    # Este arquivo
│   ├── CHANGELOG.md                 # Histórico de versões
│   ├── NAVEGACAO-INTEGRADA.md       # Guia de navegação
│   └── outros arquivos .md
├── 📁 tests/                        # Arquivos de teste
├── 📁 scripts/                      # Scripts auxiliares
│   ├── process_data.py              # Processamento de dados
│   └── outros scripts .py/.sh/.bat
├── 📁 An_lise_Gr_ficos_Desempenho_1_/ # Análise consolidada
└── 📁 .github/                      # Configurações GitHub
```

## ⚡ Como Executar

### Desenvolvimento Local

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/pauloheg33/sade.git
   cd sade
   ```

2. **Inicie um servidor local:**
   ```bash
   # Python 3
   python3 -m http.server 8000
   
   # Ou Python 2
   python -m SimpleHTTPServer 8000
   
   # Ou Node.js (se disponível)
   npx serve .
   ```

3. **Acesse no navegador:**
   ```
   http://localhost:8000
   ```

### GitHub Pages (Produção)

O sistema está automaticamente disponível em:
**https://pauloheg33.github.io/sade/**

## 🔧 Tecnologias Utilizadas

### Frontend
- **HTML5** com semântica moderna
- **CSS3** com Custom Properties e Grid/Flexbox
- **JavaScript ES6+** com classes e módulos
- **Bootstrap 5.3.3** para responsividade
- **FontAwesome 6.5.2** para ícones
- **Chart.js 4.4.2** para gráficos
- **FancyBox 5.0** para galeria de imagens
- **Select2 4.1.0** para seletores avançados

### Bibliotecas Especializadas
- **PDF.js 3.11.174** para leitura de PDFs
- **jsPDF** para geração de relatórios
- **jQuery 3.7.1** para manipulação DOM

## 📊 Dados e Estrutura

### Programas Suportados
- **PROEA**: 6º ao 9º ano (CN, LP, MAT)
- **CNCA**: 1º ao 5º ano (LP, MAT)

### Disciplinas
- **LP**: Língua Portuguesa
- **MAT**: Matemática
- **CN**: Ciências da Natureza

### Níveis de Desempenho
- **Excelente**: 90-100 pontos
- **Bom**: 80-89 pontos
- **Satisfatório**: 70-79 pontos
- **Precisa Melhorar**: 60-69 pontos
- **Insatisfatório**: 0-59 pontos

## 🚀 Funcionalidades Avançadas

### Dashboard
- Estatísticas consolidadas em tempo real
- Gráficos interativos por ano e disciplina
- Acesso rápido a todas as seções
- Tema claro/escuro

### Filtros e Buscas
- Filtros por ano, disciplina e escola
- Busca textual avançada
- Ordenação personalizável
- Filtros ativos visíveis

### Galeria de Gráficos
- Visualização em grid responsivo
- Busca em tempo real
- Visualizador de imagens integrado
- Carregamento lazy loading

### Relatórios PDF
- Geração automática de relatórios
- Múltiplos gráficos por página
- Cabeçalhos e metadados
- Download direto

## 🔍 Análise de Desempenho

### Métricas Calculadas
- Média geral por escola/disciplina
- Distribuição de notas
- Comparativos entre anos
- Análises automatizadas

### Visualizações
- Gráficos de barras e pizza
- Tabelas interativas
- Cards de estatísticas
- Mapas de calor (futuro)

## 🛠️ Manutenção e Atualizações

### Atualização de Dados
1. Execute `process_data.py` para processar novos dados
2. O arquivo `sade_data.js` será regenerado automaticamente
3. Commit e push para GitHub Pages

### Adição de Novas Escolas/Disciplinas
1. Adicione os dados na estrutura correta em `/data/`
2. Execute o script de processamento
3. Teste localmente antes do deploy

## ⚠️ Problemas Conhecidos e Soluções

### Erro 404 em Arquivos
- **Causa**: Caminhos incorretos após reorganização
- **Solução**: Verificar referências em HTML/JS

### Carregamento Lento
- **Causa**: Muitas imagens grandes
- **Solução**: Implementado lazy loading

### Problemas de Codificação
- **Causa**: Caracteres especiais em nomes
- **Solução**: Encoding automático implementado

## 🎨 Personalização

### Cores e Temas
Edite as variáveis CSS em `assets/css/styles.css`:

```css
:root {
    --sade-primary: #2563eb;
    --sade-secondary: #1e40af;
    --sade-success: #16a34a;
    --sade-warning: #f97316;
    --sade-danger: #ef4444;
}
```

### Configurações
Modifique `assets/js/config.js` para:
- Alterar informações da aplicação
- Configurar níveis de desempenho
- Ajustar comportamentos da UI

## 📱 Compatibilidade

### Navegadores Suportados
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Dispositivos
- ✅ Desktop (1200px+)
- ✅ Tablet (768px - 1199px)
- ✅ Mobile (320px - 767px)

## 👨‍💻 Desenvolvimento

### Desenvolvedor Principal
**Paulo Henrique**
- GitHub: [@pauloheg33](https://github.com/pauloheg33)
- Email: [contato através do GitHub]

### Organização
**Secretaria da Educação de Ararendá - CE**
- Coordenadoria de Formação, Estatística e Avaliação

## 📝 Licença

Este projeto é propriedade da Secretaria da Educação de Ararendá - CE.
Todos os direitos reservados.

## 🔄 Changelog

### v0.2.0 (Atual)
- ✅ Reorganização completa da estrutura de arquivos
- ✅ Novos assets organizados em pastas
- ✅ Correção de rotas e referências
- ✅ Melhoria na navegação integrada
- ✅ Otimizações de performance

### v0.1.x (Anterior)
- Interface básica
- Funcionalidades iniciais
- Primeira versão do sistema

## 🚧 Roadmap Futuro

- [ ] API REST para dados dinâmicos
- [ ] Sistema de autenticação
- [ ] Relatórios avançados
- [ ] Dashboard administrativo
- [ ] Integração com banco de dados
- [ ] Aplicativo móvel (PWA)

---

**🏛️ Secretaria da Educação de Ararendá - CE**  
*Coordenadoria de Formação, Estatística e Avaliação*

**📊 SADE v0.2.0** - *Sistema de Avaliação e Desempenho Escolar*
