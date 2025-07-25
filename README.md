# SADE - Sistema de Avaliação e Desempenho Educacional

Sistema completo para análise de desempenho educacional desenvolvido em PHP com SQLite.

## 🚀 Características

- **Backend:** PHP 8.3+ com SQLite
- **Frontend:** Bootstrap 5 + Chart.js  
- **Segurança:** Autenticação por sessão, proteção CSRF
- **Responsivo:** Interface mobile-friendly
- **Multi-usuário:** Sistema de permissões (Admin/Usuário)

## 📋 Funcionalidades

### 👤 Administradores
- ✅ Dashboard completo com estatísticas
- ✅ Processamento automático de arquivos CSV
- ✅ Gerenciamento completo de usuários
- ✅ Relatórios avançados com filtros e gráficos
- ✅ Controle total do sistema

### 👥 Usuários
- ✅ Dashboard com visão resumida
- ✅ Acesso a relatórios com filtros
- ✅ Visualização de dados permitidos

## 🛠️ Instalação

### Pré-requisitos
- PHP 8.1+
- Extensões PHP: `sqlite3`, `pdo_sqlite`
- Servidor web (Apache/Nginx) ou PHP built-in server

### Ubuntu/Debian
```bash
sudo apt update
sudo apt install php php-sqlite3 php-pdo-sqlite
```

### Configuração
1. Clone o repositório:
```bash
git clone https://github.com/pauloheg33/sade.git
cd sade
```

2. Execute o script de configuração:
```bash
php setup.php
```

3. Inicie o servidor:
```bash
php -S localhost:8000
```

4. Acesse: http://localhost:8000

## 🔐 Acesso Inicial

- **URL:** http://localhost:8000
- **Email:** admin@sade.local
- **Senha:** admin123

## 📁 Estrutura do Projeto

```
sade/
├── config.php              # Configurações e autenticação
├── index.php               # Dashboard principal
├── login.php               # Sistema de login
├── logout.php              # Logout seguro
├── processar.php           # Processamento de arquivos (Admin)
├── usuarios.php            # Gerenciamento de usuários (Admin)
├── relatorios.php          # Relatórios com filtros
├── setup.php               # Script de configuração inicial
├── includes/
│   ├── functions.php       # Classes principais do sistema
│   └── processador.php     # Processamento de arquivos CSV
├── assets/
│   └── css/
│       └── style.css       # Estilos customizados
└── data/
    ├── sade.db            # Banco de dados SQLite
    ├── provas/            # Arquivos CSV de provas
    └── gabaritos/         # Arquivos CSV de gabaritos
```

## 📊 Formato dos Arquivos CSV

### Gabaritos
```csv
Ano,Componente,Questão,Gabarito,Identificador
2024,Matemática,1,A,MAT001
2024,Matemática,2,B,MAT001
```

### Provas
```csv
Nome do Aluno,Nome do Teste,Escola,Turma,Percentual,Q1,Q2,Q3...
João Silva,Avaliação Matemática,Escola ABC,9º A,75.5,A,B,C...
```

## 🔧 Uso do Sistema

### 1. Primeiro Acesso
1. Acesse com credenciais admin
2. Vá em "Processar Arquivos"
3. Clique em "Processar Todos os Arquivos"
4. Aguarde a importação dos dados

### 2. Gerenciar Usuários
1. Acesse "Usuários" no menu admin
2. Clique em "Novo Usuário"
3. Preencha os dados e defina permissões
4. Salve o usuário

### 3. Visualizar Relatórios
1. Acesse "Relatórios"
2. Use os filtros disponíveis:
   - Ano
   - Componente
   - Escola
   - Turma
3. Visualize gráficos e tabelas
4. Use "Imprimir" para relatórios em PDF

## 🛡️ Segurança

- Senhas criptografadas com `password_hash()`
- Proteção CSRF em todos os formulários
- Validação de entrada em todos os campos
- Controle de acesso baseado em sessões
- Logs de atividades do sistema

## 📈 Características dos Relatórios

- Gráficos interativos com Chart.js
- Filtros dinâmicos por múltiplos critérios
- Estatísticas em tempo real
- Exportação para impressão
- Análise de desempenho por:
  - Componente curricular
  - Escola/Turma
  - Período/Ano
  - Distribuição de notas

## 🔄 Atualizações

Para atualizar o sistema:
```bash
git pull origin main
php setup.php  # Se necessário
```

## 📝 Logs e Debugging

O sistema registra atividades em:
- Logs de login/logout
- Logs de processamento
- Logs de criação/edição de usuários

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas alterações (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🆘 Suporte

Para suporte e dúvidas:
- Abra uma [Issue](https://github.com/pauloheg33/sade/issues)
- Consulte a documentação no código
- Execute `php setup.php` para reconfigurar

---

**Desenvolvido com ❤️ para a educação brasileira**
