from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

# Tabela de associação entre Projeto e Área de Pesquisa (N:N)
projeto_area = db.Table('projeto_area',
    db.Column('area_id', db.Integer, db.ForeignKey('areas_pesquisa.id'), primary_key=True),
    db.Column('projeto_id', db.Integer, nullable=False),
    db.Column('tipo', db.String(20), nullable=False)  # 'ensino', 'pesquisa', 'extensao'
)

class Professor(db.Model):
    __tablename__ = 'professores'
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    titulacao = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    lattes = db.Column(db.String(512))
    orcid = db.Column(db.String(512))
    bio = db.Column(db.Text)
    foto = db.Column(db.String(255))
    senha_hash = db.Column(db.String(512))
    data_atualizacao = db.Column(db.DateTime)


    def set_senha(self, senha):
        self.senha_hash = generate_password_hash(senha)

    def verificar_senha(self, senha):
        return check_password_hash(self.senha_hash, senha)

    def __repr__(self):
        return f"<Professor {self.nome}>"

class AreaPesquisa(db.Model):
    __tablename__ = 'areas_pesquisa'
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    descricao = db.Column(db.Text)
    professor_id = db.Column(db.Integer, db.ForeignKey('professores.id'), nullable=False)

    def __repr__(self):
        return f"<ÁreaPesquisa {self.nome}>"

class Publicacao(db.Model):
    __tablename__ = 'publicacoes'
    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(255), nullable=False)
    ano = db.Column(db.Integer, nullable=False)
    tipo = db.Column(db.String(50))
    link = db.Column(db.String(255))
    professor_id = db.Column(db.Integer, db.ForeignKey('professores.id'), nullable=False)

class Orientacao(db.Model):
    __tablename__ = 'orientacoes'
    id = db.Column(db.Integer, primary_key=True)
    nome_orientando = db.Column(db.String(255), nullable=False)
    nivel = db.Column(db.String(50))
    tema = db.Column(db.Text)
    professor_id = db.Column(db.Integer, db.ForeignKey('professores.id'), nullable=False)

# Mixin base para projetos
class ProjetoBase(db.Model):
    __abstract__ = True
    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(255), nullable=False)
    descricao = db.Column(db.Text, nullable=False)
    categoria = db.Column(db.String(255), nullable=False)
    foto_path = db.Column(db.String(255))
    professor_id = db.Column(db.Integer, db.ForeignKey('professores.id'), nullable=False)

class ProjetoEnsino(ProjetoBase):
    __tablename__ = 'projetos_ensino'
    professor = db.relationship('Professor', backref='projetos_ensino')
    areas = db.relationship('AreaPesquisa', secondary=projeto_area,
                            primaryjoin="and_(ProjetoEnsino.id==projeto_area.c.projeto_id, projeto_area.c.tipo=='ensino')",
                            secondaryjoin="AreaPesquisa.id==projeto_area.c.area_id",
                            backref='projetos_ensino')

class ProjetoPesquisa(ProjetoBase):
    __tablename__ = 'projetos_pesquisa'
    professor = db.relationship('Professor', backref='projetos_pesquisa')
    areas = db.relationship('AreaPesquisa', secondary=projeto_area,
                            primaryjoin="and_(ProjetoPesquisa.id==projeto_area.c.projeto_id, projeto_area.c.tipo=='pesquisa')",
                            secondaryjoin="AreaPesquisa.id==projeto_area.c.area_id",
                            backref='projetos_pesquisa')

class ProjetoExtensao(ProjetoBase):
    __tablename__ = 'projetos_extensao'
    professor = db.relationship('Professor', backref='projetos_extensao')
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
    professor_id = db.Column(db.Integer, db.ForeignKey('professores.id'))

    inscricoes = db.relationship('InscricaoEvento', backref='evento', lazy=True)

class Mensagem(db.Model):
    __tablename__ = 'mensagens'
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(255))
    email = db.Column(db.String(255))
    mensagem = db.Column(db.Text)
    professor_id = db.Column(db.Integer, db.ForeignKey('professores.id'))

class Aluno(db.Model):
    __tablename__ = 'alunos'
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False)
    curso = db.Column(db.String(255), nullable=False)
    matricula = db.Column(db.String(50), unique=True, nullable=False)

    inscricoes_evento = db.relationship('InscricaoEvento', backref='aluno', lazy=True)
    inscricoes_projeto = db.relationship('InscricaoProjeto', backref='aluno', lazy=True)

    def __repr__(self):
        return f"<Aluno {self.nome} - {self.matricula}>"

class InscricaoEvento(db.Model):
    __tablename__ = 'inscricoes_eventos'
    id = db.Column(db.Integer, primary_key=True)
    aluno_id = db.Column(db.Integer, db.ForeignKey('alunos.id'), nullable=False)
    evento_id = db.Column(db.Integer, db.ForeignKey('eventos.id'), nullable=False)

class InscricaoProjeto(db.Model):
    __tablename__ = 'inscricoes_projetos'
    id = db.Column(db.Integer, primary_key=True)
    aluno_id = db.Column(db.Integer, db.ForeignKey('alunos.id'), nullable=False)
    projeto_id = db.Column(db.Integer, nullable=False)
    tipo_projeto = db.Column(db.String(20), nullable=False)  # 'ensino', 'pesquisa', 'extensao'
