from flask import Blueprint, request, jsonify
from models import db, Professor, ProjetoEnsino, ProjetoPesquisa, ProjetoExtensao, Evento, Mensagem, Inscricao

bp = Blueprint('routes', __name__)

# Dicionário para mapear o tipo de projeto ao modelo correspondente
projeto_modelos = {
    'ensino': ProjetoEnsino,
    'pesquisa': ProjetoPesquisa,
    'extensao': ProjetoExtensao
}

# Criar professor
@bp.route('/professores', methods=['POST'])
def criar_professor():
    data = request.json
    nome = data.get('nome')
    if not nome:
        return jsonify({'error': 'Nome do professor é obrigatório'}), 400

    professor = Professor(nome=nome)
    db.session.add(professor)
    db.session.commit()

    return jsonify({'id': professor.id, 'nome': professor.nome}), 201

# Listar todos professores
@bp.route('/professores', methods=['GET'])
def listar_professores():
    professores = Professor.query.all()
    resultado = [{'id': p.id, 'nome': p.nome} for p in professores]
    return jsonify(resultado), 200

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
