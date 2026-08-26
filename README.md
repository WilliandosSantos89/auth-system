# Sistema de Login e Autenticação com JWT

Aplicação educacional que demonstra um fluxo completo de cadastro, login e acesso a rotas protegidas usando Node.js, SQLite, bcrypt e JSON Web Tokens.

> **Status:** projeto de estudo funcional. Não deve ser usado em produção sem revisão de segurança, testes automatizados e configuração adequada de infraestrutura.

## Problema demonstrado

O projeto mostra como uma aplicação pode cadastrar usuários sem armazenar senhas em texto puro, autenticar credenciais e proteger recursos do servidor com tokens de duração limitada.

## Funcionalidades

- cadastro de usuário com validação;
- hash de senha com bcrypt;
- login com geração de token JWT;
- middleware para validar tokens;
- rota protegida;
- dashboard autenticado;
- mensagens de erro e sucesso;
- logout e limpeza da sessão.

## Fluxo de autenticação

~~~text
Cadastro → hash da senha → persistência no SQLite
Login → comparação do hash → geração do JWT
Rota protegida → validação do token → acesso autorizado
~~~

O token expira após duas horas. Requisições sem um token válido recebem resposta 401 ou 403.

## Tecnologias

| Tecnologia | Uso |
| --- | --- |
| Node.js e Express | servidor HTTP e rotas |
| bcryptjs | hash e comparação de senhas |
| jsonwebtoken | criação e validação de JWT |
| better-sqlite3 | persistência local |
| HTML, CSS e JavaScript | interface do usuário |

## Como executar

**Pré-requisito:** Node.js instalado.

~~~bash
git clone https://github.com/WilliandosSantos89/auth-system.git
cd auth-system
npm install
node server.js
~~~

Depois, acesse:

- <code>http://localhost:3000/register.html</code> — cadastro;
- <code>http://localhost:3000/login.html</code> — login;
- <code>http://localhost:3000/dashboard.html</code> — área protegida.

## Estrutura principal

~~~text
auth-system/
├── server.js
├── database.js
├── package.json
└── public/
    ├── register.html
    ├── login.html
    ├── dashboard.html
    └── style.css
~~~

## Aprendizados

- armazenamento seguro de senhas com hash;
- autenticação baseada em tokens;
- criação de middleware reutilizável;
- persistência com SQLite;
- integração entre frontend e API.

## Próximas melhorias

- adicionar testes automatizados;
- aplicar cookies seguros em vez de depender apenas do armazenamento no navegador;
- criar fluxo de recuperação de senha;
- validar variáveis de ambiente;
- remover artefatos locais e dependências versionadas do repositório.

## Autor

Desenvolvido por **Willian dos Santos**.

[LinkedIn](https://www.linkedin.com/in/willian-dos-santos/) · [GitHub](https://github.com/WilliandosSantos89)

## Licença

Consulte o arquivo [LICENSE](LICENSE).