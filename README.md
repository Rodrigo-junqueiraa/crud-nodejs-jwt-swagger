Tasks API - Node.js + JWT + Swagger

API RESTful para gerenciamento de tarefas com autenticação baseada em JWT (JSON Web Token).
O projeto implementa um CRUD completo de tarefas com rotas protegidas por autenticação, documentação interativa via Swagger e organização em camadas (routes, repositories e middlewares).

📌 Objetivo do Projeto

Esta aplicação foi desenvolvida com o objetivo de demonstrar:

Implementação de uma API REST com Node.js e Express

Autenticação e autorização com JWT

Proteção de rotas por middleware

Organização do código em camadas

Uso de variáveis de ambiente com dotenv

Documentação automática com Swagger

Testes de endpoints via Postman

Cada usuário autenticado possui acesso apenas às suas próprias tarefas.

🚀 Tecnologias Utilizadas

Node.js

Express

JWT (jsonwebtoken)

Dotenv

Swagger UI

Nodemon

⚙️ Pré-requisitos

Antes de iniciar, certifique-se de possuir instalado:

Node.js (versão 18 ou superior)

NPM

📥 Instalação do Projeto

Clone o repositório:

git clone https://github.com/Rodrigo-junqueiraa/crud-nodejs-jwt-swagger.git
cd crud-nodejs-jwt-swagger

Instale as dependências:

npm install
🔐 Configuração das Variáveis de Ambiente

Crie um arquivo .env na raiz do projeto com o seguinte conteúdo:

JWT_SECRET=sua_chave_secreta
PORT=3000

A variável JWT_SECRET será utilizada para assinar os tokens de autenticação.

▶️ Execução do Projeto

Inicie o servidor em ambiente de desenvolvimento:

npm run dev

A aplicação será iniciada em:

http://localhost:3000
📄 Documentação da API

A documentação interativa da API pode ser acessada em:

http://localhost:3000/docs

Nela será possível visualizar e testar todos os endpoints disponíveis.

🔑 Fluxo de Autenticação
1. Registrar um usuário

Realize uma requisição:

POST /auth/register

Com o seguinte corpo (JSON):

{
  "name": "Rodrigo",
  "email": "rodrigo@teste.com",
  "password": "123"
}
2. Realizar Login

Requisição:

POST /auth/login

Resposta esperada:

{
  "token": "seu_token_jwt"
}
3. Utilizar o Token nas Rotas Protegidas

No Postman (ou outra ferramenta), adicione o token no Header:

Authorization: Bearer seu_token_jwt
📌 Endpoints Disponíveis
Auth
Método	Endpoint	Descrição
POST	/auth/register	Cadastro de usuário
POST	/auth/login	Login e geração de token
Tasks (Rotas Protegidas)
Método	Endpoint	Descrição
GET	/tasks	Listar tarefas do usuário
GET	/tasks/	Buscar tarefa por ID
POST	/tasks	Criar nova tarefa
PUT	/tasks/	Atualizar tarefa existente
DELETE	/tasks/	Remover tarefa
🧱 Estrutura do Projeto
src/
 ├── data/
 │    ├── tasksRepo.js
 │    └── usersRepo.js
 ├── middlewares/
 │    └── authMiddleware.js
 ├── routes/
 │    ├── tasksRoutes.js
 │    └── authRoutes.js
 ├── app.js
 └── server.js
📜 Scripts Disponíveis
npm run dev

Inicia o servidor com Nodemon para desenvolvimento.

🔒 Segurança

Senhas e tokens são tratados apenas no backend.

O .env não deve ser versionado.

Cada usuário possui acesso apenas às suas próprias tarefas.

🧪 Testes

Os endpoints podem ser testados via:

Postman

Swagger UI (/docs)

<img width="1913" height="636" alt="image" src="https://github.com/user-attachments/assets/519e0a76-648b-41ff-b3a6-7ffc816af77e" />


📈 Considerações Finais

Este projeto demonstra a implementação de autenticação baseada em token e proteção de rotas em uma API RESTful, servindo como base para aplicações mais robustas que necessitem de controle de acesso e segregação de dados por usuário.
