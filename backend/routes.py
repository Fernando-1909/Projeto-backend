from flask import Blueprint, request, jsonify
from models import db, Professor, ProjetoEnsino, ProjetoPesquisa, ProjetoExtensao, Evento, Mensagem, Inscricao, Publicacao, Orientacao
from flask import Blueprint, jsonify, request
from models import db, Professor, AreaPesquisa
import jwt
from datetime import datetime, timedelta

bp = Blueprint('routes', __name__)

SECRET_KEY = 'senha123' # Mudar para algo mais seguro, botei assim pra ficar fácil pra mim :)

# Dicionário para mapear o tipo de projeto ao modelo correspondente
projeto_modelos = {
    'ensino': ProjetoEnsino,
    'pesquisa': ProjetoPesquisa,
    'extensao': ProjetoExtensao
}

# Criar projeto (ensino, pesquisa ou extensão)
@bp.route('/projetos/<tipo>', methods=['POST'])
def criar_projeto(tipo):
    Model = projeto_modelos.get(tipo)
    if not Model:
        return jsonify({'error': 'Tipo de projeto inválido'}), 400

    data = request.json
    titulo = data.get('titulo')
    descricao = data.get('descricao')
    categoria = data.get('categoria')
    foto_path = data.get('foto_path')
    professor_id = data.get('professor_id')

    if not all([titulo, descricao, categoria, professor_id]):
        return jsonify({'error': 'Campos obrigatórios faltando'}), 400

    # Verifica se o professor existe
    professor = Professor.query.get(professor_id)
    if not professor:
        return jsonify({'error': 'Professor não encontrado'}), 404

    projeto = Model(
        titulo=titulo,
        descricao=descricao,
        categoria=categoria,
        foto_path=foto_path,
        professor_id=professor_id
    )
    db.session.add(projeto)
    db.session.commit()

    return jsonify({'message': f'Projeto de {tipo} criado com sucesso', 'id': projeto.id}), 201

# Listar projetos por tipo, com filtros opcionais categoria e professor
@bp.route('/projetos/<tipo>', methods=['GET'])
def listar_projetos(tipo):
    Model = projeto_modelos.get(tipo)
    if not Model:
        return jsonify({'error': 'Tipo de projeto inválido'}), 400

    categoria = request.args.get('categoria')
    professor_id = request.args.get('professor_id')

    query = Model.query

    if categoria:
        query = query.filter(Model.categoria == categoria)
    if professor_id:
        query = query.filter(Model.professor_id == professor_id)

    projetos = query.all()
    resultado = []
    for p in projetos:
        resultado.append({
            'id': p.id,
            'titulo': p.titulo,
            'descricao': p.descricao,
            'categoria': p.categoria,
            'foto_path': p.foto_path,
            'professor_id': p.professor_id,
            'professor_nome': p.professor.nome if p.professor else None
        })

    return jsonify(resultado), 200

# Rota para pegar um projeto específico pelo tipo e id
@bp.route('/projetos/<tipo>/<int:id>', methods=['GET'])
def obter_projeto(tipo, id):
    Model = projeto_modelos.get(tipo)
    if not Model:
        return jsonify({'error': 'Tipo de projeto inválido'}), 400

    projeto = Model.query.get(id)
    if not projeto:
        return jsonify({'error': 'Projeto não encontrado'}), 404

    resultado = {
        'id': projeto.id,
        'titulo': projeto.titulo,
        'descricao': projeto.descricao,
        'categoria': projeto.categoria,
        'foto_path': projeto.foto_path,
        'professor_id': projeto.professor_id,
        'professor_nome': projeto.professor.nome if projeto.professor else None
    }
    return jsonify(resultado), 200

# Eventos
@bp.route('/api/eventos', methods=['GET'])
def listar_eventos():
    eventos = Evento.query.all()
    return jsonify([{
        'id': e.id,
        'titulo': e.titulo,
        'descricao': e.descricao,
        'data': e.data.isoformat(),
        'hora': e.hora.strftime('%H:%M'),
        'local': e.local
    } for e in eventos])


# Mensagem de contato
@bp.route('/api/contato', methods=['POST'])
def enviar_mensagem():
    data = request.json
    msg = Mensagem(
        nome=data['nome'],
        email=data['email'],
        mensagem=data['mensagem'],
        professor_id=data.get('professor_id')
    )
    db.session.add(msg)
    db.session.commit()
    return jsonify({'mensagem': 'Contato enviado com sucesso!'})

# Inscrição em evento
@bp.route('/api/inscricoes', methods=['POST'])
def inscrever_evento():
    data = request.json
    insc = Inscricao(
        nome_participante=data['nome_participante'],
        email=data['email'],
        evento_id=data['evento_id']
    )
    db.session.add(insc)
    db.session.commit()
    return jsonify({'mensagem': 'Inscrição realizada com sucesso!'})


@bp.route('/api/professor', methods=['GET'])
def get_professor():
    professor = Professor.query.first()
    if not professor:
        return jsonify({'mensagem': 'Professor não encontrado'}), 404

    return jsonify({
        'id': professor.id,
        'nome': professor.nome,
        'titulacao': professor.titulacao,
        'email': professor.email,
        'lattes': professor.lattes,
        'orcid': professor.orcid,
        'bio': professor.bio,
        'foto': professor.foto
    })

@bp.route('/api/areas', methods=['GET'])
def get_areas():
    areas = AreaPesquisa.query.all()
    return jsonify([{
        'id': area.id,
        'nome': area.nome,
        'descricao': area.descricao,
        'professor_id': area.professor_id
    } for area in areas])

@bp.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    senha = data.get('senha')

    professor = Professor.query.filter_by(email=email).first()
    if professor and professor.verificar_senha(senha):
        token = jwt.encode({
            'user_id': professor.id,
            'exp': datetime.utcnow() + timedelta(hours=2)
        }, SECRET_KEY, algorithm='HS256')

        return jsonify({
            'token': token,
            'expiresIn': '2h'
        })

    return jsonify({'mensagem': 'Credenciais inválidas'}), 401

@bp.route('/api/publicacoes', methods=['GET'])
def listar_publicacoes():
    publicacoes = Publicacao.query.all()
    return jsonify([{
        'id': p.id,
        'titulo': p.titulo,
        'ano': p.ano,
        'tipo': p.tipo,
        'link': p.link,
        'professor_id': p.professor_id,
        'professor_nome': p.professor.nome
    } for p in publicacoes]), 200


@bp.route('/api/orientacoes', methods=['GET'])
def listar_orientacoes():
    orientacoes = Orientacao.query.all()
    return jsonify([{
        'id': o.id,
        'nome_orientando': o.nome_orientando,
        'nivel': o.nivel,
        'tema': o.tema,
        'professor_id': o.professor_id,
        'professor_nome': o.professor.nome
    } for o in orientacoes]), 200