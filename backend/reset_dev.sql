-- Reset do banco de dados para ambiente de desenvolvimento
DROP DATABASE IF EXISTS uern_projetos_db;
CREATE DATABASE uern_projetos_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE uern_projetos_db;

-- Tabela de Professores
CREATE TABLE professores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    titulacao VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    lattes VARCHAR(255),
    orcid VARCHAR(50),
    bio TEXT,
    foto VARCHAR(255),
    senha_hash VARCHAR(255),
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de Alunos (para verificação de matrícula)
CREATE TABLE alunos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    matricula VARCHAR(20) NOT NULL UNIQUE,
    email VARCHAR(100),
    curso VARCHAR(100)
);

-- Áreas de Pesquisa (1:N com professores)
CREATE TABLE areas_pesquisa (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    professor_id INT NOT NULL,
    FOREIGN KEY (professor_id) REFERENCES professores(id) ON DELETE CASCADE
);

-- Ligação Projeto <-> Área de Pesquisa (N:N)
CREATE TABLE projeto_area (
    projeto_id INT NOT NULL,
    area_id INT NOT NULL,
    tipo VARCHAR(20) NOT NULL,
    PRIMARY KEY (projeto_id, area_id, tipo)
);

-- Publicações (1:N com professores)
CREATE TABLE publicacoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    ano INT,
    tipo VARCHAR(50),
    link VARCHAR(255),
    professor_id INT NOT NULL,
    FOREIGN KEY (professor_id) REFERENCES professores(id) ON DELETE CASCADE
);

-- Orientações (1:N com professores)
CREATE TABLE orientacoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_orientando VARCHAR(255) NOT NULL,
    nivel VARCHAR(50),
    tema TEXT,
    professor_id INT NOT NULL,
    FOREIGN KEY (professor_id) REFERENCES professores(id) ON DELETE CASCADE
);

-- Projetos
CREATE TABLE projetos_ensino (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT NOT NULL,
    categoria VARCHAR(255) NOT NULL,
    foto_path VARCHAR(255),
    professor_id INT NOT NULL,
    FOREIGN KEY (professor_id) REFERENCES professores(id) ON DELETE CASCADE
);

CREATE TABLE projetos_pesquisa (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT NOT NULL,
    categoria VARCHAR(255) NOT NULL,
    foto_path VARCHAR(255),
    professor_id INT NOT NULL,
    FOREIGN KEY (professor_id) REFERENCES professores(id) ON DELETE CASCADE
);

CREATE TABLE projetos_extensao (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT NOT NULL,
    categoria VARCHAR(255) NOT NULL,
    foto_path VARCHAR(255),
    professor_id INT NOT NULL,
    FOREIGN KEY (professor_id) REFERENCES professores(id) ON DELETE CASCADE
);

-- Eventos (palestras e oficinas)
CREATE TABLE eventos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255),
    descricao TEXT,
    data DATE,
    hora TIME,
    local VARCHAR(255),
    professor_id INT,
    FOREIGN KEY (professor_id) REFERENCES professores(id) ON DELETE SET NULL
);

-- Mensagens
CREATE TABLE mensagens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255),
    email VARCHAR(255),
    mensagem TEXT,
    professor_id INT,
    FOREIGN KEY (professor_id) REFERENCES professores(id) ON DELETE SET NULL
);

-- Inscrição em eventos
CREATE TABLE inscricoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_participante VARCHAR(255),
    email VARCHAR(255),
    curso VARCHAR(100),
    matricula VARCHAR(20) NOT NULL,
    evento_id INT,
    FOREIGN KEY (evento_id) REFERENCES eventos(id) ON DELETE CASCADE,
    FOREIGN KEY (matricula) REFERENCES alunos(matricula) ON DELETE RESTRICT
);

-- Inscrição em projetos
CREATE TABLE inscricoes_projetos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_participante VARCHAR(255),
    email VARCHAR(255),
    curso VARCHAR(100),
    matricula VARCHAR(20) NOT NULL,
    projeto_id INT NOT NULL,
    tipo_projeto ENUM('ensino', 'pesquisa', 'extensao') NOT NULL,
    FOREIGN KEY (matricula) REFERENCES alunos(matricula) ON DELETE RESTRICT
);

-- DADOS DE TESTE

-- Professor
INSERT INTO professores (nome, titulacao, email, lattes, orcid, bio, senha_hash)
VALUES ('Dr. João Silva', 'Doutor', 'joao@uern.br', 'http://lattes.cnpq.br/joao', '0000-0001-2345-6789', 'Docente com experiência em pesquisa e extensão.', 'senha123hash');

-- Alunos
INSERT INTO alunos (nome, matricula, email, curso)
VALUES 
('Maria Clara', '2021001', 'maria@aluno.uern.br', 'Ciência da Computação'),
('Lucas Ferreira', '2021002', 'lucas@aluno.uern.br', 'Engenharia de Software');

-- Evento
INSERT INTO eventos (titulo, descricao, data, hora, local, professor_id)
VALUES ('Oficina de Python', 'Introdução ao Python com aplicações práticas.', '2025-08-01', '14:00', 'Auditório Central', 1);

-- Projeto de ensino
INSERT INTO projetos_ensino (titulo, descricao, categoria, foto_path, professor_id)
VALUES ('Projeto Aprender Mais', 'Aulas de reforço para alunos da rede pública.', 'Inclusão Social', NULL, 1);
