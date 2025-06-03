from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

# Tabela de associação entre Projeto e Área de Pesquisa (N:N)
projeto_area = db.Table('projeto_area',
    db.Column('area_id', db.Integer, db.ForeignKey('areas_pesquisaquisa.id'), primary_key=True),
    db.Column('projeto_id', db.Integer, nullable=False),
    db.Column('tipo', db.String(20), nullable=False),  # 'ensino', 'pesquisa', 'extensao'
)

class Professor(db.Model):
    __tablename__ = 'professores'
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    titulacao = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    lattes = db.Column(db.String(255))
    orcid = db.Column(db.String(50))
    bio = db.Column(db.Text)
    foto = db.Column(db.String(255))
    senha_hash = db.Column(db.String(128))
    data_atualizacao = db.Column(db.DateTime)

    # Relacionamentos
    areas = db.relationship('AreasPesquisa', backref='professores', lazy=True)
    publicacoes = db.relationship('Publicacao', backref='professores', lazy=True)
    orientacoes = db.relationship('Orientacao', backref='professores', lazy=True)
    projetos_ensino = db.relationship('ProjetoEnsino', backref='professores', lazy=True)
    projetos_pesquisa = db.relationship('ProjetoPesquisa', backref='professores', lazy=True)
    projetos_extensao = db.relationship('ProjetoExtensao', backref='professores', lazy=True)

    def set_senha(self, senha):
        self.senha_hash = generate_password_hash(senha)

    def verificar_senha(self, senha):
        return check_password_hash(self.senha_hash, senha)


class AreaPesquisa(db.Model):
    __tablename__ = 'areas_pesquisa'
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    descricao = db.Column(db.Text)
    professores_id = db.Column(db.Integer, db.ForeignKey('professores.id'), nullable=False)


class Publicacao(db.Model):
    __tablename__ = 'publicacoes'
    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(255), nullable=False)
    ano = db.Column(db.Integer, nullable=False)
    tipo = db.Column(db.String(50))
    link = db.Column(db.String(255))
    professores_id = db.Column(db.Integer, db.ForeignKey('professores.id'), nullable=False)


class Orientacao(db.Model):
    __tablename__ = 'orientacoes'
    id = db.Column(db.Integer, primary_key=True)
    nome_orientando = db.Column(db.String(255), nullable=False)
    nivel = db.Column(db.String(50))
    tema = db.Column(db.Text)
    professores_id = db.Column(db.Integer, db.ForeignKey('professores.id'), nullable=False)


# Modelos dos projetos

class ProjetoBase:
    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(255), nullable=False)
    descricao = db.Column(db.Text, nullable=False)
    categoria = db.Column(db.String(255), nullable=False)
    foto_path = db.Column(db.String(255))
    professores_id = db.Column(db.Integer, db.ForeignKey('professores.id'), nullable=False)


class ProjetoEnsino(db.Model, ProjetoBase):
    __tablename__ = 'projetos_ensino'
    areas = db.relationship('AreaPesquisa', secondary=projeto_area,
                            primaryjoin="and_(ProjetoEnsino.id==projeto_area.c.projeto_id, projeto_area.c.tipo=='ensino')",
                            secondaryjoin="AreaPesquisa.id==projeto_area.c.area_id",
                            backref='projetos_ensino')


class ProjetoPesquisa(db.Model, ProjetoBase):
    __tablename__ = 'projetos_pesquisa'
    areas = db.relationship('AreaPesquisa', secondary=projeto_area,
                            primaryjoin="and_(ProjetoPesquisa.id==projeto_area.c.projeto_id, projeto_area.c.tipo=='pesquisa')",
                            secondaryjoin="AreaPesquisa.id==projeto_area.c.area_id",
                            backref='projetos_pesquisa')


class ProjetoExtensao(db.Model, ProjetoBase):
    __tablename__ = 'projetos_extensao'
    areas = db.relationship('AreaPesquisa', secondary=projeto_area,
                            primaryjoin="and_(ProjetoExtensao.id==projeto_area.c.projeto_id, projeto_area.c.tipo=='extensao')",
                            secondaryjoin="AreaPesquisa.id==projeto_area.c.area_id",
                            backref='projetos_extensao')


class Evento(db.Model):
    __tablename__ = 'eventos'
    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(255))
    descricao = db.Column(db.Text)
    data = db.Column(db.Date)
    hora = db.Column(db.Time)
    local = db.Column(db.String(255))
    professores_id = db.Column(db.Integer, db.ForeignKey('professores.id'))


class Mensagem(db.Model):
    __tablename__ = 'mensagens'
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(255))
    email = db.Column(db.String(255))
    mensagem = db.Column(db.Text)
    professores_id = db.Column(db.Integer, db.ForeignKey('professores.id'))


class Inscricao(db.Model):
    __tablename__ = 'inscricoes'
    id = db.Column(db.Integer, primary_key=True)
    nome_participante = db.Column(db.String(255))
    email = db.Column(db.String(255))
    evento_id = db.Column(db.Integer, db.ForeignKey('eventos.id'))
