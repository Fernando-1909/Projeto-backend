import { useState } from 'react';
import './CadastroAluno.css';

function CadastroAluno() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');        // novo estado para email
  const [curso, setCurso] = useState('');        // novo estado para curso
  const [matricula, setMatricula] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/alunos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, email, curso, matricula })  // envio dos novos campos
      });

      const data = await response.json();
      setMensagem(data.mensagem || data.erro);

      if (response.ok) {
        setNome('');
        setEmail('');       // limpa o campo email
        setCurso('');       // limpa o campo curso
        setMatricula('');
      }
    } catch (err) {
      console.error('Erro ao cadastrar aluno:', err);
      setMensagem('Erro de conexão com o servidor');
    }
  };

  return (
    <div className="cadastro-container">
      <h2>Cadastro de Aluno</h2>
      <form onSubmit={handleSubmit} className="cadastro-form">
        <label>
          Nome:
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            placeholder="Digite seu nome completo"
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="exemplo@email.com"
          />
        </label>
        <label>
          Curso:
          <input
            type="text"
            value={curso}
            onChange={(e) => setCurso(e.target.value)}
            required
            placeholder="Digite seu curso"
          />
        </label>
        <label>
          Matrícula:
          <input
            type="text"
            value={matricula}
            onChange={(e) => setMatricula(e.target.value)}
            required
            placeholder="Ex: 202312345"
          />
        </label>
        <button type="submit">Cadastrar</button>
        {mensagem && <p className="mensagem">{mensagem}</p>}
      </form>
    </div>
  );
}

export default CadastroAluno;
