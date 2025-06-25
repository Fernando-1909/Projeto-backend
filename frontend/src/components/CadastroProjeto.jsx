import { useState } from 'react';

function CadastroProjeto() {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('');
  const [fotoPath, setFotoPath] = useState('');
  const [tipoProjeto, setTipoProjeto] = useState('ensino');
  const [professorId, setProfessorId] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8080/projetos/${tipoProjeto}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          titulo,
          descricao,
          categoria,
          foto_path: fotoPath,
          professor_id: professorId
        })
      });

      const data = await response.json();
      setMensagem(data.message || data.error || 'Erro ao cadastrar projeto.');

      if (response.ok) {
        setTitulo('');
        setDescricao('');
        setCategoria('');
        setFotoPath('');
        setProfessorId('');
      }
    } catch (err) {
      console.error('Erro ao cadastrar projeto:', err);
      setMensagem('Erro de conexão com o servidor.');
    }
  };

  return (
    <div className="cadastro-container">
      <h2>Cadastro de Projeto</h2>
      <form onSubmit={handleSubmit} className="cadastro-form">
        <label>Título:
          <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
        </label>

        <label>Descrição:
          <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} required />
        </label>

        <label>Categoria:
          <input type="text" value={categoria} onChange={(e) => setCategoria(e.target.value)} required />
        </label>

        <label>Foto (URL):
          <input type="text" value={fotoPath} onChange={(e) => setFotoPath(e.target.value)} />
        </label>

        <label>Tipo de Projeto:
          <select value={tipoProjeto} onChange={(e) => setTipoProjeto(e.target.value)} required>
            <option value="ensino">Ensino</option>
            <option value="pesquisa">Pesquisa</option>
            <option value="extensao">Extensão</option>
          </select>
        </label>

        <label>ID do Professor:
          <input type="number" value={professorId} onChange={(e) => setProfessorId(e.target.value)} required />
        </label>

        <button type="submit">Cadastrar Projeto</button>
        {mensagem && <p>{mensagem}</p>}
      </form>
    </div>
  );
}

export default CadastroProjeto;
