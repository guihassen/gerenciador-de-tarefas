-- init.sql

-- Criação da tabela de usuários
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  username VARCHAR(100) NOT NULL UNIQUE,
  profession VARCHAR(100) NOT NULL,
  password_hash VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  is_active BOOLEAN DEFAULT TRUE
);

-- Criação da tabela de projetos
CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  project_name VARCHAR(100) NOT NULL,
  description TEXT,
  project_status VARCHAR(50) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  user_id INTEGER NOT NULL,
  FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Criação da tabela de tarefas
CREATE TABLE IF NOT EXISTS tasks (
  id SERIAL PRIMARY KEY,
  task_name VARCHAR(100) NOT NULL,
  task_description TEXT,
  due_date DATE,
  due_time TIME,
  has_notification BOOLEAN DEFAULT FALSE,
  task_priority VARCHAR(50),
  is_completed BOOLEAN DEFAULT FALSE,
  project_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  FOREIGN KEY(project_id) REFERENCES projects(id) ON DELETE CASCADE,
  FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Criação de índices para melhorar performance nas buscas
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects(user_id);
CREATE INDEX IF NOT EXISTS idx_tasks_user_id ON tasks(user_id);
CREATE INDEX IF NOT EXISTS idx_tasks_project_id ON tasks(project_id);

INSERT INTO users (full_name, username, profession, password_hash, email)
VALUES
  ('Alice Johnson', 'alicej', 'Software Engineer', 'hashed_password_1', 'alice@example.com'),
  ('Bob Smith', 'bobsmith', 'Project Manager', 'hashed_password_2', 'bob@example.com')
ON CONFLICT DO NOTHING;