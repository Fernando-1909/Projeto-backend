import { useState } from "react";
import styles from "../styles/Formulario.module.css";

const projetos = ["Projeto de Robótica", "Pesquisa em Biotecnologia"];
const eventos = ["Semana da Ciência", "Oficina de IA", "Palestra sobre Sustentabilidade"];

function Formulario() {
  const [tipoInscricao, setTipoInscricao] = useState("");
  const [opcaoSelecionada, setOpcaoSelecionada] = useState("");
  const [formData, setFormData] = useState({
    nome: "",
    matricula: "",
    celular: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode integrar com o back-end futuramente (SQL, etc)
    console.log("Dados enviados:", { tipoInscricao, opcaoSelecionada, ...formData });
    alert("Formulário enviado!");
  };

  return (
    <div className={styles.formPage}>
      <h1>Inscrição</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Deseja se inscrever em:
          <select value={tipoInscricao} onChange={e => {
            setTipoInscricao(e.target.value);
            setOpcaoSelecionada(""); // resetar seleção
          }} required>
            <option value="">Selecione</option>
            <option value="projeto">Projeto</option>
            <option value="evento">Evento</option>
          </select>
        </label>

        {tipoInscricao === "projeto" && (
          <label>
            Escolha o projeto:
            <select value={opcaoSelecionada} onChange={e => setOpcaoSelecionada(e.target.value)} required>
              <option value="">Selecione</option>
              {projetos.map((proj, i) => (
                <option key={i} value={proj}>{proj}</option>
              ))}
            </select>
          </label>
        )}

        {tipoInscricao === "evento" && (
          <label>
            Escolha o evento:
            <select value={opcaoSelecionada} onChange={e => setOpcaoSelecionada(e.target.value)} required>
              <option value="">Selecione</option>
              {eventos.map((evt, i) => (
                <option key={i} value={evt}>{evt}</option>
              ))}
            </select>
          </label>
        )}

        <label>
          Nome:
          <input type="text" name="nome" value={formData.nome} onChange={handleChange} required />
        </label>

        {tipoInscricao === "projeto" && (
          <label>
            Matrícula:
            <input type="text" name="matricula" value={formData.matricula} onChange={handleChange} required />
          </label>
        )}

        {tipoInscricao === "evento" && (
          <label>
            Celular (opcional):
            <input type="tel" name="celular" value={formData.celular} onChange={handleChange} />
          </label>
        )}

        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default Formulario;
