# 🔐 Sistema de Login e Autenticação com JWT

Sistema completo de autenticação desenvolvido do zero com Node.js, bcrypt e JSON Web Tokens.

## ✨ Funcionalidades

- Cadastro de usuário com validação e hash de senha
- Login com geração de token JWT
- Rota protegida acessível apenas com token válido
- Dashboard autenticado com dados do usuário
- Redirecionamento automático para login se não autenticado
- Feedback visual de erros e sucesso em todas as telas
- Logout com limpeza de sessão

## 🛠️ Tecnologias

- **Node.js + Express** — servidor e rotas da API
- **bcryptjs** — hash seguro de senhas
- **jsonwebtoken** — geração e validação de tokens JWT
- **better-sqlite3** — banco de dados local persistente
- **HTML, CSS e JavaScript puro** — frontend sem frameworks

## 🧠 Como funciona
```
Usuário se cadastra → senha é convertida em hash → salva no banco
Usuário faz login   → hash comparado → token JWT gerado → enviado ao frontend
Rota protegida      → token validado pelo middleware → acesso liberado
```

O token JWT carrega os dados do usuário e expira em 2 horas. Sem token válido, qualquer rota protegida retorna erro 401 ou 403.

## 🚀 Como rodar localmente

**Pré-requisitos:** Node.js instalado
```bash
# Clone o repositório
git clone https://github.com/WilliandosSantos89/auth-system.git

# Entre na pasta
cd auth-system

# Instale as dependências
npm install

# Inicie o servidor
node server.js
```

Acesse:
- `http://localhost:3000/register.html` — Cadastro
- `http://localhost:3000/login.html` — Login
- `http://localhost:3000/dashboard.html` — Área protegida

## 📁 Estrutura do Projeto
```
auth-system/
├── server.js        # Servidor, rotas e middleware JWT
├── database.js      # Configuração do SQLite
├── package.json     # Dependências
└── public/
    ├── register.html  # Tela de cadastro
    ├── login.html     # Tela de login
    ├── dashboard.html # Área autenticada
    └── style.css      # Estilos globais
```

## 📚 O que aprendi com esse projeto

- Como senhas são armazenadas com segurança usando hash bcrypt
- O que é JWT, como é gerado e como é validado
- Como criar middlewares de autenticação reutilizáveis
- Banco de dados relacional com SQLite e SQL básico
- Fluxo completo de autenticação em aplicações web

## 👤 Autor

Feito por **Williando Santos** — [LinkedIn](https://linkedin.com/in/seu-perfil) · [GitHub](https://github.com/WilliandosSantos89)