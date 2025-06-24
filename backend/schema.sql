-- Criação do banco de dados
CREATE DATABASE IF NOT EXISTS uern_projetos_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE uern_projetos_db;

-- Tabela de Professores
DROP TABLE IF EXISTS professores;
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

-- Tabela de Alunos (usada para validar matrícula)
DROP TABLE IF EXISTS alunos;
CREATE TABLE alunos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    matricula VARCHAR(20) NOT NULL UNIQUE,
    curso VARCHAR(100)
);

-- Tabela de Áreas de Pesquisa (1:N com professores)
DROP TABLE IF EXISTS areas_pesquisa;
CREATE TABLE areas_pesquisa (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    professor_id INT NOT NULL,
    FOREIGN KEY (professor_id) REFERENCES professores(id) ON DELETE CASCADE
);

-- Tabela de ligação Projeto <-> Área de Pesquisa (N:N)
DROP TABLE IF EXISTS projeto_area;
CREATE TABLE projeto_area (
    projeto_id INT NOT NULL,
    area_id INT NOT NULL,
    tipo VARCHAR(20) NOT NULL, -- 'ensino', 'pesquisa', 'extensao'
    PRIMARY KEY (projeto_id, area_id, tipo)
    -- As FKs são definidas em triggers ou pela aplicação devido ao campo "tipo"
);

-- Publicações
DROP TABLE IF EXISTS publicacoes;
CREATE TABLE publicacoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    ano INT,
    tipo VARCHAR(50),
    link VARCHAR(255),
    professor_id INT NOT NULL,
    FOREIGN KEY (professor_id) REFERENCES professores(id) ON DELETE CASCADE
);

-- Orientações
DROP TABLE IF EXISTS orientacoes;
CREATE TABLE orientacoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_orientando VARCHAR(255) NOT NULL,
    nivel VARCHAR(50),
    tema TEXT,
    professor_id INT NOT NULL,
    FOREIGN KEY (professor_id) REFERENCES professores(id) ON DELETE CASCADE
);

-- Projetos (ensino, pesquisa, extensão)
DROP TABLE IF EXISTS projetos_ensino;
CREATE TABLE projetos_ensino (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT NOT NULL,
    categoria VARCHAR(255) NOT NULL,
    foto_path VARCHAR(255),
    professor_id INT NOT NULL,
    FOREIGN KEY (professor_id) REFERENCES professores(id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS projetos_pesquisa;
CREATE TABLE projetos_pesquisa (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT NOT NULL,
    categoria VARCHAR(255) NOT NULL,
    foto_path VARCHAR(255),
    professor_id INT NOT NULL,
    FOREIGN KEY (professor_id) REFERENCES professores(id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS projetos_extensao;
CREATE TABLE projetos_extensao (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT NOT NULL,
    categoria VARCHAR(255) NOT NULL,
    foto_path VARCHAR(255),
    professor_id INT NOT NULL,
    FOREIGN KEY (professor_id) REFERENCES professores(id) ON DELETE CASCADE
);

-- Eventos
DROP TABLE IF EXISTS eventos;
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

-- Mensagens de Contato
DROP TABLE IF EXISTS mensagens;
CREATE TABLE mensagens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255),
    email VARCHAR(255),
    mensagem TEXT,
    professor_id INT,
    FOREIGN KEY (professor_id) REFERENCES professores(id) ON DELETE SET NULL
);

-- Inscrições em Eventos (agora com matrícula obrigatória)
DROP TABLE IF EXISTS inscricoes;
CREATE TABLE inscricoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_participante VARCHAR(255),
    email VARCHAR(255),
    matricula VARCHAR(20) NOT NULL,
    curso VARCHAR(100),
    evento_id INT,
    FOREIGN KEY (evento_id) REFERENCES eventos(id) ON DELETE CASCADE,
    FOREIGN KEY (matricula) REFERENCES alunos(matricula) ON DELETE RESTRICT
);

-- Inscrições em Projetos (nova tabela separada)
DROP TABLE IF EXISTS inscricoes_projetos;
CREATE TABLE inscricoes_projetos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_participante VARCHAR(255),
    email VARCHAR(255),
    matricula VARCHAR(20) NOT NULL,
    curso VARCHAR(100),
    tipo_projeto VARCHAR(20) NOT NULL, -- ensino, pesquisa, extensao
    projeto_id INT NOT NULL,
    FOREIGN KEY (matricula) REFERENCES alunos(matricula) ON DELETE RESTRICT
    -- FK do projeto será verificada na aplicação devido ao campo tipo_projeto
);
