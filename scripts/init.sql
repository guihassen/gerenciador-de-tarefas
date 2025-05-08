-- init.sql

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  nome_completo VARCHAR(100) NOT NULL,
  nome_usuario VARCHAR(100) NOT NULL,
  profissao VARCHAR NOT NULL,
  hash_senha VARCHAR(50) NOT NULL,
  email_login VARCHAR NOT NULL,
  ativo BOOL
);

CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  nome_projeto VARCHAR (100) NOT NULL,
  descricao TEXT ,
  status_projeto VARCHAR NOT NULL,
  ativo BOOL ,
  user_id INTEGER UNIQUE,
  FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS tasks (
  id SERIAL PRIMARY KEY,
  nome_tarefa VARCHAR,
  descricao_tarefa TEXT,
  vencimento_tarefa DATE,
  horario TIME,
  com_notificacao BOOL,
  rank_tarefa VARCHAR,
  tarefa_concluida BOOL,
  projeto_id INTEGER UNIQUE,
  user_id INTEGER UNIQUE,
  FOREIGN KEY(projeto_id) REFERENCES projects(user_id),
  FOREIGN KEY(user_id) REFERENCES users(id)
);