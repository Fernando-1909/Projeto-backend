from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Professor(db.Model):
    __tablename__ = 'professores'
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(255), nullable=False)

    # Relacionamento opcional para facilitar acesso
    projetos_ensino = db.relationship('ProjetoEnsino', backref='professor', lazy=True)
    projetos_pesquisa = db.relationship('ProjetoPesquisa', backref='professor', lazy=True)
    projetos_extensao = db.relationship('ProjetoExtensao', backref='professor', lazy=True)

class ProjetoEnsino(db.Model):
    __tablename__ = 'projetos_ensino'
    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(255), nullable=False)
    descricao = db.Column(db.Text, nullable=False)
    categoria = db.Column(db.String(255), nullable=False)
    foto_path = db.Column(db.String(255))
    professor_id = db.Column(db.Integer, db.ForeignKey('professores.id'), nullable=False)

class ProjetoPesquisa(db.Model):
    __tablename__ = 'projetos_pesquisa'
    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(255), nullable=False)
    descricao = db.Column(db.Text, nullable=False)
    categoria = db.Column(db.String(255), nullable=False)
    foto_path = db.Column(db.String(255))
    professor_id = db.Column(db.Integer, db.ForeignKey('professores.id'), nullable=False)

class ProjetoExtensao(db.Model):
    __tablename__ = 'projetos_extensao'
    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(255), nullable=False)
    descricao = db.Column(db.Text, nullable=False)
    categoria = db.Column(db.String(255), nullable=False)
    foto_path = db.Column(db.String(255))
    professor_id = db.Column(db.Integer, db.ForeignKey('professores.id'), nullable=False)

class Evento(db.Model):
    __tablename__ = 'eventos'
    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(255))
    descricao = db.Column(db.Text)
    data = db.Column(db.Date)
    hora = db.Column(db.Time)
    local = db.Column(db.String(255))
    professor_id = db.Column(db.Integer, db.ForeignKey('professores.id'))


class Mensagem(db.Model):
    __tablename__ = 'mensagens'
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(255))
    email = db.Column(db.String(255))
    mensagem = db.Column(db.Text)
    professor_id = db.Column(db.Integer, db.ForeignKey('professores.id'))

class Inscricao(db.Model):
    __tablename__ = 'inscricoes'
    id = db.Column(db.Integer, primary_key=True)
    nome_participante = db.Column(db.String(255))
    email = db.Column(db.String(255))
    evento_id = db.Column(db.Integer, db.ForeignKey('eventos.id'))
