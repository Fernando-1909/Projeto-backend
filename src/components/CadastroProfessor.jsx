import { useState } from 'react';

function CadastroProfessor() {
  const [nome, setNome] = useState('');
  const [titulacao, setTitulacao] = useState('');
  const [email, setEmail] = useState('');
  const [lattes, setLattes] = useState('');
  const [orcid, setOrcid] = useState('');
  const [bio, setBio] = useState('');
  const [senha, setSenha] = useState('');
  const [foto, setFoto] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/professores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome,
          titulacao,
          email,
          lattes,
          orcid,
          bio,
          senha,
          foto
        })
      });

      const data = await response.json();
      setMensagem(data.mensagem || data.erro);

      if (response.ok) {
        setNome('');
        setTitulacao('');
        setEmail('');
        setLattes('');
        setOrcid('');
        setBio('');
        setSenha('');
        setFoto('');
      }
    } catch (err) {
      console.error('Erro ao cadastrar professor:', err);
      setMensagem('Erro de conexão com o servidor');
    }
  };

  return (
    <div className="cadastro-container">
      <h2>Cadastro de Professor</h2>
      <form onSubmit={handleSubmit} className="cadastro-form">
        <label>Nome:
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
        </label>

        <label>Titulação:
          <input type="text" value={titulacao} onChange={(e) => setTitulacao(e.target.value)} required />
        </label>

        <label>Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>

        <label>Lattes:
          <input type="url" value={lattes} onChange={(e) => setLattes(e.target.value)} />
        </label>

        <label>ORCID:
          <input type="url" value={orcid} onChange={(e) => setOrcid(e.target.value)} />
        </label>

        <label>Biografia:
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
        </label>

        <label>Senha:
          <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
        </label>

        <label>Foto (URL):
          <input type="text" value={foto} onChange={(e) => setFoto(e.target.value)} />
        </label>

        <button type="submit">Cadastrar Professor</button>
        {mensagem && <p>{mensagem}</p>}
      </form>
    </div>
  );
}

export default CadastroProfessor;
