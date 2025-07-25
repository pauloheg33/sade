# SADE - Sistema de Avaliação e Desempenho Educacional

[![Django](https://img.shields.io/badge/Django-5.2.4-green.svg)](https://www.djangoproject.com/)
[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://www.python.org/)
[![License](https://img.shields.io/badge/License-MIT-red.svg)](LICENSE)

## 📊 Sobre o Projeto

O SADE é um sistema web desenvolvido em Django para análise de desempenho educacional, focado em identificar dificuldades de aprendizado através da análise detalhada de questões que os alunos mais erram.

### 🎯 Principais Funcionalidades

- **📈 Análise por Turmas**: Relatórios detalhados mostrando quais questões cada turma tem mais dificuldade
- **📋 Análise por Questões**: Ranking global das questões mais difíceis em todas as turmas
- **🏫 Dashboard Moderno**: Interface intuitiva com estatísticas em tempo real
- **📤 Upload CSV**: Processamento automático de dados de avaliações
- **🔐 Sistema de Login**: Autenticação segura para acesso ao sistema
- **⚙️ Configurações**: Painel completo para personalização do sistema

## 🚀 Instalação e Configuração

### Pré-requisitos

- Python 3.8 ou superior
- pip (gerenciador de pacotes Python)
- Git

### 1. Clone o Repositório

```bash
git clone https://github.com/pauloheg33/sade.git
cd sade
```

### 2. Crie um Ambiente Virtual

```bash
python -m venv venv

# No Linux/Mac
source venv/bin/activate

# No Windows
venv\Scripts\activate
```

### 3. Instale as Dependências

```bash
pip install -r requirements.txt
```

### 4. Configure as Variáveis de Ambiente

```bash
# Copie o arquivo de exemplo
cp .env.example .env

# Edite o arquivo .env com suas configurações
nano .env
```

### 5. Execute as Migrações

```bash
python manage.py makemigrations
python manage.py migrate
```

### 6. Crie um Superusuário

```bash
python manage.py createsuperuser
```

### 7. Execute o Servidor

```bash
python manage.py runserver
```

Acesse: `http://localhost:8000`

## 📝 Como Usar

### 1. Acesso ao Sistema

- **URL de Login**: `http://localhost:8000/login/`
- **Credenciais de Demo**: 
  - Usuário: `admin`
  - Senha: `admin123` (ou use suas credenciais de superusuário)

### 2. Upload de Dados

1. Acesse **Upload de CSV** no menu
2. Selecione um arquivo CSV com o formato:
   ```
   Nome do aluno,Nome da turma,Nome do teste,P. 1 Resposta,P. 2 Resposta,...
   João Silva,5º ANO A - ESCOLA EXEMPLO 2025/2026,MATEMÁTICA,A,B,C,D,...
   ```
3. Aguarde o processamento

### 3. Visualização de Relatórios

#### Relatório por Turmas
- Mostra questões mais difíceis para cada turma
- Identifica onde focar o reforço pedagógico
- Estatísticas completas por turma

#### Relatório por Questões
- Ranking das questões mais difíceis globalmente
- Análise de dificuldade por disciplina
- Recomendações pedagógicas

## 🏗️ Estrutura do Projeto

```
sade/
├── dashboard/                 # App principal
│   ├── models.py             # Modelos de dados
│   ├── views.py              # Views otimizadas
│   ├── admin.py              # Configuração do admin
│   ├── urls.py               # Rotas
│   ├── services/             # Lógica de negócio
│   │   ├── csv_processor.py  # Processamento de CSV
│   │   ├── reports.py        # Geração de relatórios
│   │   └── statistics.py     # Cálculos estatísticos
│   └── templates/            # Templates HTML
├── sade/                     # Configurações do projeto
│   ├── settings.py           # Configurações principais
│   ├── urls.py               # URLs raiz
│   └── wsgi.py               # WSGI para produção
├── requirements.txt          # Dependências
├── .env.example             # Exemplo de configurações
└── README.md                # Esta documentação
```

## 🔧 Configurações Avançadas

### Banco de Dados

Para produção, configure PostgreSQL no `.env`:

```env
DJANGO_ENVIRONMENT=production
DB_NAME=sade_prod
DB_USER=sade_user
DB_PASSWORD=sua_senha_segura
DB_HOST=localhost
DB_PORT=5432
```

### Cache

Para melhor performance, configure Redis:

```env
CACHE_LOCATION=127.0.0.1:11211
```

### Segurança

Em produção, configure:

```env
DJANGO_DEBUG=False
DJANGO_SECRET_KEY=sua_chave_secreta_super_segura
SECURE_SSL_REDIRECT=True
SESSION_COOKIE_SECURE=True
CSRF_COOKIE_SECURE=True
```

## 📊 API Endpoints

### Autenticação
- `POST /login/` - Login do usuário
- `POST /logout/` - Logout do usuário

### Dashboard
- `GET /home/` - Dashboard principal
- `GET /api/dashboard-stats/` - Estatísticas para gráficos

### Relatórios
- `GET /relatorio-turmas/` - Relatório por turmas
- `GET /relatorio-questoes/` - Relatório por questões
- `GET /api/turma-dados/<id>/` - Dados específicos de uma turma

### Sistema
- `GET /health/` - Health check da aplicação

## 🎨 Interface

O sistema possui uma interface moderna e responsiva com:

- **Bootstrap 5.3**: Framework CSS moderno
- **Font Awesome**: Ícones vetoriais
- **Chart.js**: Gráficos interativos
- **Design Responsivo**: Funciona em desktop e mobile

## 🧪 Testes

```bash
# Executar testes
python manage.py test

# Com coverage
pip install coverage
coverage run --source='.' manage.py test
coverage report
```

## 📈 Performance

### Otimizações Implementadas

- **Cache de 5 minutos** para estatísticas do dashboard
- **Select related** em queries do banco
- **Paginação** em listagens grandes
- **Compressão** de arquivos estáticos
- **Índices** no banco de dados

### Monitoramento

- Health check endpoint: `/health/`
- Logs estruturados em `django_errors.log`
- Métricas de performance no admin

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👥 Equipe

- **Desenvolvedor Principal**: Paulo Henrique
- **GitHub**: [@pauloheg33](https://github.com/pauloheg33)

## 🆘 Suporte

Para suporte e dúvidas:

1. Abra uma [Issue](https://github.com/pauloheg33/sade/issues)
2. Consulte a [Wiki](https://github.com/pauloheg33/sade/wiki)
3. Entre em contato pelo email: [seu-email@example.com]

## 🔄 Changelog

### v2.0.0 (Atual)
- ✅ Refatoração completa do código
- ✅ Implementação de services (csv_processor, reports, statistics)
- ✅ Admin otimizado com filtros e buscas avançadas
- ✅ Cache implementado para melhor performance
- ✅ Interface moderna com Bootstrap 5.3
- ✅ Sistema de login e autenticação
- ✅ Relatórios detalhados por turma e questão
- ✅ API endpoints para integrações
- ✅ Documentação completa

### v1.0.0
- ✅ Sistema básico de upload CSV
- ✅ Dashboard inicial
- ✅ Modelos básicos de dados

---

**⭐ Se este projeto foi útil para você, considere dar uma estrela no GitHub!**
