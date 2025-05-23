# <a name="c1"></a>1. Introdução

**Gerenciador de Tarefas** é uma aplicação web desenvolvida para facilitar o controle e organização de tarefas diárias. Este sistema permite que usuários criem, visualizem, editem e excluam tarefas, além de marcar seu status como concluído ou pendente. A aplicação conta com autenticação de usuários e persistência de dados via Supabase.

O projeto é construído utilizando tecnologias modernas de desenvolvimento web, com uma arquitetura dividida entre frontend e backend, e integra serviços de banco de dados e autenticação de forma simples e escalável.

## Funcionalidades

- **CRUD de Tarefas:** Permite criar, ler, atualizar e excluir tarefas.
- **Gerenciamento de Status:** Possibilidade de marcar tarefas como concluídas ou pendentes.
- **Filtro por Status:** Filtragem de tarefas com base no seu estado atual.
- **Autenticação de Usuário:** Sistema de login e registro utilizando o serviço Supabase Auth.

## Tecnologias Utilizadas

- **Frontend:** HTML, CSS, JavaScript puro.
- **Backend:** Node.js com Express.
- **Banco de Dados:** PostgreSQL, acessado através da plataforma [Supabase](https://supabase.io).
- **Serviços de Backend:** Supabase Auth (autenticação) e Supabase DB (persistência de dados).

# <a name="c2"></a>2. Banco de Dados

O sistema utiliza o **PostgreSQL** como banco de dados relacional, gerenciado e hospedado pela plataforma [Supabase](https://supabase.io). O banco de dados é responsável por armazenar todas as informações relacionadas às tarefas e aos usuários autenticados, garantindo persistência e integridade dos dados.

A estrutura de dados foi projetada de forma simples e eficiente para atender às funcionalidades essenciais do sistema de gerenciamento de tarefas, permitindo operações de leitura e escrita com desempenho e segurança.

As principais tabelas utilizadas no projeto são:

- **`users`**: Gerenciada automaticamente pelo Supabase Auth, contém os dados de autenticação dos usuários, como email e ID único.
- **`projects`**:Armazena informações de cada projeto,incluindo título, descrição, status(concluído ou pendente) e ID do usuário associado.
- **`tasks`**: Armazena informações de cada tarefa, incluindo título, descrição, vencimento e horario, se o usuário deseja ser notificado quando o vencimento estiver perto, rank de importância,status (concluída ou pendente), ID do usuário associado e ID do projeto caso a tarefa for associado a um.

A integração com o banco de dados é feita através de queries SQL via Supabase Client no backend Node.js, garantindo acesso seguro e controlado aos dados. A seguir o modelo lógico do banco de dados da aplicação:

<img src=../assets/Modelo-Logico.png style="width:900x; height:900px;">

---

<h1 id="c3">3. Uso da API</h1>

<p>A aplicação expõe uma API RESTful para gerenciar usuários, projetos e tarefas. Todos os endpoints estão disponíveis sob o caminho base <code>/api/</code> e trabalham com requisições e respostas no formato JSON.</p>

<h2>3.1. Usuários</h2>
<ul>
  <li><strong>GET /api/users</strong> – Lista todos os usuários.</li>
  <li><strong>POST /api/users</strong> – Cria um novo usuário.<br>
    Exemplo de corpo:
    <pre><code>{
  "name": "João Silva",
  "email": "joao@exemplo.com"
}</code></pre>
  </li>
  <li><strong>GET /api/users/:id</strong> – Detalha um usuário.</li>
  <li><strong>PUT /api/users/:id</strong> – Atualiza um usuário.</li>
  <li><strong>DELETE /api/users/:id</strong> – Remove um usuário.</li>
  <li><strong>GET /api/users-totals</strong> – Estatísticas de usuários.</li>
</ul>

<h2>3.2. Projetos</h2>
<ul>
  <li><strong>GET /api/projects</strong> – Lista todos os projetos (admin).</li>
  <li><strong>GET /api/users/:userId/projects</strong> – Lista projetos do usuário.</li>
  <li><strong>POST /api/users/:userId/projects</strong> – Cria um novo projeto.<br>
    Exemplo:
    <pre><code>{
  "name": "Projeto Website",
  "description": "Desenvolvimento do site da empresa"
}</code></pre>
  </li>
  <li><strong>GET /api/users/:userId/projects/:id</strong> – Detalha um projeto.</li>
  <li><strong>PUT /api/users/:userId/projects/:id</strong> – Atualiza um projeto.</li>
  <li><strong>DELETE /api/users/:userId/projects/:id</strong> – Remove um projeto.</li>
  <li><strong>GET /api/users/:userId/projects/:projectId/tasks</strong> – Lista tarefas de um projeto.</li>
</ul>

<h2>3.3. Tarefas</h2>
<ul>
  <li><strong>GET /api/tasks</strong> – Lista todas as tarefas (admin).</li>
  <li><strong>GET /api/users/:userId/tasks</strong> – Lista tarefas do usuário.</li>
  <li><strong>POST /api/users/:userId/tasks</strong> – Cria nova tarefa.<br>
    Exemplo:
    <pre><code>{
  "title": "Implementar login",
  "description": "Criar sistema de autenticação",
  "project_id": 1
}</code></pre>
  </li>
  <li><strong>GET /api/users/:userId/tasks/:id</strong> – Detalha uma tarefa.</li>
  <li><strong>PUT /api/users/:userId/tasks/:id</strong> – Atualiza uma tarefa.</li>
  <li><strong>DELETE /api/users/:userId/tasks/:id</strong> – Remove uma tarefa.</li>
  <li><strong>PATCH /api/users/:userId/tasks/:id/complete</strong> – Marca como concluída.</li>
  <li><strong>PATCH /api/users/:userId/tasks/:id/incomplete</strong> – Marca como não concluída.</li>
</ul>

<h2>3.4. Exemplos com <em>curl</em></h2>

<p><strong>Criar um usuário:</strong></p>
<pre><code>curl -X POST http://localhost:3000/api/users \
     -H "Content-Type: application/json" \
     -d '{"name":"Maria Santos","email":"maria@exemplo.com"}'</code></pre>

<p><strong>Criar um projeto para o usuário ID 1:</strong></p>
<pre><code>curl -X POST http://localhost:3000/api/users/1/projects \
     -H "Content-Type: application/json" \
     -d '{"name":"E-commerce","description":"Loja virtual completa"}'</code></pre>

<p><strong>Criar uma tarefa para o usuário ID 1:</strong></p>
<pre><code>curl -X POST http://localhost:3000/api/users/1/tasks \
     -H "Content-Type: application/json" \
     -d '{"title":"Design da homepage","description":"Criar mockup da página inicial","project_id":1}'</code></pre>

<p><strong>Marcar uma tarefa como concluída:</strong></p>
<pre><code>curl -X PATCH http://localhost:3000/api/users/1/tasks/1/complete</code></pre>

<p><strong>Listar projetos de um usuário:</strong></p>
<pre><code>curl http://localhost:3000/api/users/1/projects</code></pre>

<p><strong>Listar tarefas de um projeto:</strong></p>
<pre><code>curl http://localhost:3000/api/users/1/projects/1/tasks</code></pre>

<h2>3.5. Estrutura da API</h2>
<ul>
  <li><strong>Usuários</strong> podem ter múltiplos <strong>projetos</strong>.</li>
  <li><strong>Projetos</strong> pertencem a um usuário e têm várias <strong>tarefas</strong>.</li>
  <li><strong>Tarefas</strong> pertencem a um usuário e, opcionalmente, a um projeto.</li>
</ul>

<p><strong>Nota:</strong> Substitua <code>:userId</code>, <code>:id</code> e <code>:projectId</code> pelos valores reais nas URLs.</p>
