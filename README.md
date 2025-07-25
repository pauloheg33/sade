# SADE - Sistema de Avaliação e Dados Educacionais

Sistema web desenvolvido em Django para gerenciamento e análise de dados educacionais, permitindo o upload e processamento de dados de avaliações através de arquivos CSV.

## Funcionalidades

- ✅ **Sistema de Autenticação**: Login seguro para administradores
- ✅ **Upload de Dados**: Importação via arquivo CSV
- ✅ **Painel Administrativo**: Interface completa para gerenciamento
- ✅ **Dashboard**: Visualização de estatísticas e relatórios
- ✅ **Gestão de Dados**: Escolas, turmas, alunos, disciplinas e avaliações

## Modelos de Dados

- **Escola**: Instituições de ensino
- **Turma**: Classes organizadas por escola, nome e ano
- **Aluno**: Estudantes vinculados às turmas
- **Disciplina**: Matérias avaliadas
- **Questão**: Questões das avaliações por disciplina
- **Resposta**: Respostas dos alunos às questões

## Instalação

### Pré-requisitos
- Python 3.8+
- Django 5.2+

### Passos

1. **Clone o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd sade
   ```

2. **Crie um ambiente virtual**
   ```bash
   python -m venv venv
   venv\Scripts\activate  # Windows
   # ou
   source venv/bin/activate  # Linux/Mac
   ```

3. **Instale as dependências**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure as variáveis de ambiente** (opcional)
   ```bash
   cp .env.example .env
   # Edite o arquivo .env com suas configurações
   ```

5. **Execute as migrações**
   ```bash
   python manage.py migrate
   ```

6. **Crie um superusuário**
   ```bash
   python manage.py createsuperuser
   ```

7. **Execute o servidor**
   ```bash
   python manage.py runserver
   ```

## Formato do Arquivo CSV

O arquivo CSV deve conter as seguintes colunas obrigatórias:

| Coluna | Descrição | Exemplo |
|--------|-----------|---------|
| Escola | Nome da escola | "Escola ABC" |
| Turma | Nome da turma | "3A" |
| Ano | Ano letivo | "2025" |
| Aluno | Nome do aluno | "João Silva" |
| Disciplina | Nome da disciplina | "Matemática" |
| Questão X | Respostas (X = número) | "A", "B", "C", etc. |

### Exemplo de CSV:
```csv
Escola,Turma,Ano,Aluno,Disciplina,Questão 1,Questão 2,Questão 3
Escola ABC,3A,2025,João Silva,Matemática,A,B,C
Escola ABC,3A,2025,Maria Santos,Matemática,B,A,C
Escola XYZ,2B,2025,Pedro Costa,Português,C,C,A
```

## URLs Principais

- `/` - Página inicial com estatísticas gerais
- `/dashboard/` - Dashboard administrativo
- `/upload-csv/` - Upload de arquivos CSV
- `/login/` - Login do sistema
- `/admin/` - Painel administrativo do Django

## Configurações de Segurança

O sistema inclui configurações de segurança para produção:

- Configuração via variáveis de ambiente
- HTTPS obrigatório em produção
- Cookies seguros
- Proteção XSS e CSRF
- Headers de segurança

## Desenvolvimento

### Estrutura do Projeto
```
sade/
├── dashboard/          # App principal
│   ├── models.py      # Modelos de dados
│   ├── views.py       # Views e lógica
│   ├── admin.py       # Configuração do admin
│   ├── urls.py        # URLs do app
│   └── templates/     # Templates HTML
├── sade/              # Configurações do projeto
├── manage.py          # Comando Django
├── requirements.txt   # Dependências
└── README.md         # Este arquivo
```

### Comandos Úteis

```bash
# Aplicar migrações
python manage.py migrate

# Criar migrações
python manage.py makemigrations

# Executar servidor de desenvolvimento
python manage.py runserver

# Acessar shell do Django
python manage.py shell

# Coletar arquivos estáticos (produção)
python manage.py collectstatic
```

## Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## Suporte

Para suporte ou dúvidas, entre em contato com a equipe de desenvolvimento.
