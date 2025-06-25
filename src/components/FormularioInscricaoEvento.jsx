import { useState, useEffect } from 'react';

function FormularioInscricaoEvento() {
  const [matricula, setMatricula] = useState('');
  const [eventoId, setEventoId] = useState('');
  const [eventos, setEventos] = useState([]);
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/api/eventos')
      .then(res => res.json())
      .then(data => setEventos(data))
      .catch(err => console.error('Erro ao carregar eventos:', err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('matricula', matricula);
    formData.append('evento_id', eventoId);

    try {
      const response = await fetch('http://localhost:8080/api/inscrever-evento', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setMensagem(data.mensagem || data.erro);
    } catch (err) {
      console.error('Erro ao inscrever-se:', err);
      setMensagem('Erro ao enviar inscrição.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Inscrição em Evento</h3>
      <label>
        Matrícula:
        <input
          type="text"
          value={matricula}
          onChange={(e) => setMatricula(e.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Selecione o Evento:
        <select
          value={eventoId}
          onChange={(e) => setEventoId(e.target.value)}
          required
        >
          <option value="">Selecione...</option>
          {eventos.map((evento) => (
            <option key={evento.id} value={evento.id}>
              {evento.titulo} - {evento.data}
            </option>
          ))}
        </select>
      </label>
      <br />
      <button type="submit">Inscrever-se</button>
      {mensagem && <p>{mensagem}</p>}
    </form>
  );
}

export default FormularioInscricaoEvento;
