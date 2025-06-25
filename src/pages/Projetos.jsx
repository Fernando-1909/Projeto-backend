import { useState, useEffect } from 'react';
import '../components/Projetos.css';

function Projetos() {
  const [ensino, setEnsino] = useState([]);
  const [pesquisa, setPesquisa] = useState([]);
  const [extensao, setExtensao] = useState([]);
  const [erro, setErro] = useState('');

  const carregarProjetos = async () => {
    try {
      const tipos = ['ensino', 'pesquisa', 'extensao'];

      for (const tipo of tipos) {
        const res = await fetch(`http://localhost:8080/projetos/${tipo}`);
        const data = await res.json();
        if (tipo === 'ensino') setEnsino(data);
        if (tipo === 'pesquisa') setPesquisa(data);
        if (tipo === 'extensao') setExtensao(data);
      }
    } catch (err) {
      console.error('Erro ao buscar projetos:', err);
      setErro('Erro ao carregar projetos');
    }
  };

  useEffect(() => {
    carregarProjetos();
  }, []);

  const renderCards = (projetos) => (
    <div className="projetos-grid">
      {projetos.map(proj => (
        <div key={proj.id} className="card-projeto">
          <img src={proj.foto_path || 'https://via.placeholder.com/150'} alt="Capa do projeto" />
          <h3>{proj.titulo}</h3>
          <p><strong>Categoria:</strong> {proj.categoria}</p>
          <p>{proj.descricao}</p>
          <p><strong>Orientador:</strong> {proj.professor_nome || 'Desconhecido'}</p>
        </div>
      ))}
    </div>
  );

  return (
    <div className="pagina-projetos">
      <h2>Projetos de Ensino</h2>
      {renderCards(ensino)}

      <h2>Projetos de Pesquisa</h2>
      {renderCards(pesquisa)}

      <h2>Projetos de Extensão</h2>
      {renderCards(extensao)}

      {erro && <p style={{ color: 'red' }}>{erro}</p>}
    </div>
  );
}

export default Projetos;
