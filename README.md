# 🛍️ LabDeProg — E-commerce de Roupas

Aplicação web de **e-commerce de roupas desenvolvida com Django**, criada como projeto acadêmico e utilizada para colocar em prática conceitos de desenvolvimento web, banco de dados, autenticação e testes de software.

---

## 📌 Sobre o projeto

O **LabDeProg** é uma aplicação de loja virtual que permite aos usuários navegar pela plataforma, visualizar produtos e realizar operações relacionadas ao carrinho de compras.

O projeto foi desenvolvido de forma colaborativa e também serve como base para estudos e práticas de **Quality Assurance (QA)**, incluindo elaboração de cenários de teste, identificação de possíveis problemas e documentação de resultados.

---

## 🚀 Tecnologias utilizadas

* **Python**
* **Django**
* **SQLite**
* **HTML5**
* **CSS3**
* **Pytest**
* **Docker**
* **Docker Compose**

---

## ✨ Funcionalidades

### 👤 Autenticação

* Cadastro de usuários
* Login
* Gerenciamento de autenticação

### 🛍️ Produtos

* Visualização de produtos
* Navegação pelo catálogo

### 🛒 Carrinho

* Adição de produtos
* Alteração da quantidade de produtos
* Remoção de produtos
* Visualização dos produtos adicionados
* Cálculo do valor total

---

## 🧪 Testes e qualidade

O projeto também é utilizado para prática de **Software Testing e Quality Assurance**.

Entre as atividades realizadas estão:

* Criação de cenários de teste
* Elaboração de casos de teste
* Testes funcionais
* Testes de regras de negócio
* Testes de validação
* Testes de valores limite
* Identificação e documentação de bugs
* Reteste de funcionalidades após correções
* Testes automatizados com **Pytest**

A utilização do projeto para práticas de QA permite simular um fluxo próximo ao encontrado em equipes de desenvolvimento, desde a identificação de um problema até sua validação após uma possível correção.

---

## 🐳 Executando com Docker

### Pré-requisitos

* Docker
* Docker Compose

### Clone o projeto

```bash
git clone https://github.com/lucasbrol/labdeprog.git
cd labdeprog
```

### Execute a aplicação

```bash
docker compose up --build
```

Após a inicialização, acesse a aplicação pelo endereço disponibilizado pelo servidor.

### Para encerrar

```bash
docker compose down
```

---

## 💻 Executando localmente

### 1. Clone o repositório

```bash
git clone https://github.com/lucasbrol/labdeprog.git
cd labdeprog
```

### 2. Crie um ambiente virtual

```bash
python -m venv venv
```

No Windows:

```bash
venv\Scripts\activate
```

No Linux/macOS:

```bash
source venv/bin/activate
```

### 3. Instale as dependências

```bash
pip install -r requirements.txt
```

### 4. Execute as migrações

```bash
python manage.py migrate
```

### 5. Inicie o servidor

```bash
python manage.py runserver
```

A aplicação estará disponível em:

```text
http://127.0.0.1:8000/
```

---

## 🧪 Executando os testes

Para executar os testes automatizados:

```bash
pytest
```

Para obter uma saída mais detalhada:

```bash
pytest -v
```

---

## 📁 Estrutura do projeto

```text
labdeprog/
│
├── autenticacao/          # Autenticação e gerenciamento de usuários
├── home/                  # Funcionalidades da aplicação
├── meu_projeto/           # Configurações principais do Django
├── staticfiles/           # Arquivos estáticos
│
├── manage.py              # Gerenciador do projeto Django
├── Dockerfile             # Configuração da imagem Docker
├── docker-compose.yml     # Configuração dos containers
├── pytest.ini             # Configuração dos testes
├── requirements.txt       # Dependências do projeto
├── .gitignore             # Arquivos ignorados pelo Git
└── README.md
```

---

## 🎯 Objetivos de aprendizado

O desenvolvimento do projeto permitiu praticar conceitos como:

* Desenvolvimento de aplicações web com Django
* Programação em Python
* Estruturação de projetos web
* Autenticação de usuários
* Manipulação de banco de dados
* Desenvolvimento de funcionalidades de e-commerce
* Testes automatizados
* Testes funcionais
* Identificação e documentação de bugs
* Controle de versão com Git e GitHub
* Containerização utilizando Docker

---

## 🔍 Práticas de QA

O projeto também está sendo utilizado como ambiente prático para desenvolvimento de conhecimentos em **Quality Assurance**.

O processo inclui a criação de cenários e casos de teste para funcionalidades como login, produtos e carrinho de compras, além da utilização de ferramentas e conceitos relacionados a:

* Test Case Design
* Boundary Value Analysis
* Equivalence Partitioning
* Bug Reporting
* Severity e Priority
* Regression Testing
* Retesting
* Jira

---

## 📌 Status do projeto

🚧 **Em desenvolvimento**

O projeto pode receber novas funcionalidades, melhorias de código e novos testes ao longo do processo de desenvolvimento e aprendizado.

---

## 👨‍💻 Autores

* **Lucas Brasil Oliveira** — [@lucasbrol](https://github.com/lucasbrol)
* **Luan Siqueira** — [@luansiqueira](https://github.com/luansiqueira)
* **Matoso Dias** — [@matosod1as](https://github.com/matosod1as)

---

## 📄 Licença

Este projeto foi desenvolvido para fins acadêmicos e educacionais.
