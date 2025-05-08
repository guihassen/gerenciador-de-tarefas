<h1>📋 Gerenciador de Tarefas</h1>

  <p>Um sistema simples de gerenciamento de tarefas (To-do list) desenvolvido com JavaScript no frontend, Node.js no backend e banco de dados PostgreSQL via Supabase.</p>

  <h2>🚀 Funcionalidades</h2>
  <ul>
    <li>✅ Criar, ler, atualizar e deletar tarefas</li>
    <li>🕒 Marcar tarefas como concluídas ou pendentes</li>
    <li>🔍 Filtrar tarefas por status</li>
    <li>🔒 Autenticação de usuários com Supabase</li>
   
  </ul>

  <h2>🛠️ Tecnologias Utilizadas</h2>
  <ul>
    <li><strong>Frontend:</strong> HTML, CSS, JavaScript</li>
    <li><strong>Backend:</strong> Node.js (Express)</li>
    <li><strong>Banco de Dados:</strong> PostgreSQL (via <a href="https://supabase.io" target="_blank">Supabase</a>)</li>
    <li><strong>Hospedagem/Serviços:</strong> Supabase Auth e Supabase DB</li>
  </ul>

<h2>📦 Como Rodar o Projeto Localmente</h2>

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/guihassen/gerenciador-de-tarefas
   cd gerenciador-de-tarefas

2. **Instale as dependências: Certifique-se de que você tem o Node.js instalado. Em seguida, execute:**
```bash
npm install
```

3. **Configure as variáveis de ambiente: Crie um arquivo .env na raiz do projeto (se ainda não existir) e configure as variáveis de ambiente , com os dados da seu banco de dados no supabase,conforme o exemplo abaixo:**
```bash
DB_USER= "seu_usuario"
DB_HOST= "seu_host"
DB_DATABASE= "seu_banco"
DB_PASSWORD= "sua_senha"
DB_PORT= "sua_porta"
DB_SSL= "true"
PORT= 3000
```

4. **Execute o script de inicialização do banco de dados: Certifique-se de que o banco de dados PostgreSQL está configurado e rodando. Depois, execute o script SQL para criar as tabelas:**
```bash
node scripts/runSQLScript.js
``` 
5. **Inicie o servidor: Execute o comando abaixo para iniciar o servidor:**
```bash
npm start
```
6.**Acesse a aplicação: Abra o navegador e acesse:**
```bash
http://localhost:3000
``` 

7.**Testes (opcional): Para rodar os testes, execute:**
```bash
npm test
```