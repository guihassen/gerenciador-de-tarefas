# <a name="c1"></a>1. Introdução 

**Gerenciador de Tarefas** é uma aplicação web desenvolvida para facilitar o controle e organização de tarefas diárias. Este sistema permite que usuários criem, visualizem, editem e excluam tarefas, além de marcar seu status como concluído ou pendente. A aplicação conta com autenticação de usuários e persistência de dados via Supabase.

O projeto é construído utilizando tecnologias modernas de desenvolvimento web, com uma arquitetura dividida entre frontend e backend, e integra serviços de banco de dados e autenticação de forma simples e escalável.

##  Funcionalidades

- **CRUD de Tarefas:** Permite criar, ler, atualizar e excluir tarefas.
- **Gerenciamento de Status:** Possibilidade de marcar tarefas como concluídas ou pendentes.
- **Filtro por Status:** Filtragem de tarefas com base no seu estado atual.
- **Autenticação de Usuário:** Sistema de login e registro utilizando o serviço Supabase Auth.

##  Tecnologias Utilizadas

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


