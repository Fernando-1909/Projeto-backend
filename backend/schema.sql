-- Criação do banco de dados
CREATE DATABASE IF NOT EXISTS uern_projetos_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE uern_projetos_db;

-- Tabela de professores
CREATE TABLE IF NOT EXISTS professores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL
);

-- Tabela de projetos de ensino
CREATE TABLE IF NOT EXISTS projetos_ensino (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT NOT NULL,
    categoria VARCHAR(255) NOT NULL,
    foto_path VARCHAR(255),  -- Caminho da imagem salvo na pasta /assets
    professor_id INT NOT NULL,
    FOREIGN KEY (professor_id) REFERENCES professores(id) ON DELETE CASCADE
);

-- Tabela de projetos de pesquisa
CREATE TABLE IF NOT EXISTS projetos_pesquisa (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT NOT NULL,
    categoria VARCHAR(255) NOT NULL,
    foto_path VARCHAR(255),
    professor_id INT NOT NULL,
    FOREIGN KEY (professor_id) REFERENCES professores(id) ON DELETE CASCADE
);

-- Tabela de projetos de extensão
CREATE TABLE IF NOT EXISTS projetos_extensao (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT NOT NULL,
    categoria VARCHAR(255) NOT NULL,
    foto_path VARCHAR(255),
    professor_id INT NOT NULL,
    FOREIGN KEY (professor_id) REFERENCES professores(id) ON DELETE CASCADE
);

-- Tabela de Eventos (Palestras e Oficinas)
CREATE TABLE eventos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255),
    descricao TEXT,
    data DATE,
    hora TIME,
    local VARCHAR(255),
    professor_id INT,
    FOREIGN KEY (professor_id) REFERENCES professores(id)
);


-- Tabela de Mensagens de Contato
CREATE TABLE mensagens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255),
    email VARCHAR(255),
    mensagem TEXT,
    professor_id INT,
    FOREIGN KEY (professor_id) REFERENCES professores(id)
);

-- Tabela de Inscrições em Eventos
CREATE TABLE inscricoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_participante VARCHAR(255),
    email VARCHAR(255),
    evento_id INT,
    FOREIGN KEY (evento_id) REFERENCES eventos(id)
);
