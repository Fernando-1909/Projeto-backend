// pages/Projetos.jsx
import styles from '../styles/Projetos.module.css';
import ProjetoCard from '../components/ProjetoCard';

const projetos = [
  {
    id: 1,
    titulo: "Projeto de Robótica Educacional",
    tipo: "Extensão",
    descricao: "Envolve alunos na criação de soluções robóticas para escolas públicas.",
  },
  {
    id: 2,
    titulo: "Pesquisa em Biotecnologia",
    tipo: "Pesquisa",
    descricao: "Estudos aplicados à saúde e à agricultura.",
  },
];

function Projetos() {
  return (
    <div className={styles.projetosPage}>
      <h1>Projetos</h1>
      <div className={styles.lista}>
        {projetos.map((projeto) => (
          <ProjetoCard key={projeto.id} projeto={projeto} />
        ))}
      </div>
    </div>
  );
}

export default Projetos;
