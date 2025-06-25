// pages/ProjetoDetalhado.jsx
import { useParams } from 'react-router-dom';
import styles from '../styles/Projetos.module.css';

const projetos = [
  {
    id: 1,
    titulo: "Projeto de Robótica Educacional",
    tipo: "Extensão",
    descricao: "Descrição completa do projeto de robótica...",
    orientador: "Prof. João Silva",
  },
  {
    id: 2,
    titulo: "Pesquisa em Biotecnologia",
    tipo: "Pesquisa",
    descricao: "Descrição completa da pesquisa em biotecnologia...",
    orientador: "Profa. Ana Santos",
  },
];

function ProjetoDetalhado() {
  const { id } = useParams();
  const projeto = projetos.find(p => p.id === parseInt(id));

  if (!projeto) return <p>Projeto não encontrado</p>;

  return (
    <div className={styles.projetosPage}>
        <main className={styles.mainContent}>
        <h1>{projeto.titulo}</h1>
        <p><strong>Tipo:</strong> {projeto.tipo}</p>
        <p><strong>Orientador:</strong> {projeto.orientador}</p>
        <p>{projeto.descricao}</p>
        </main>
    </div>
    );
}

export default ProjetoDetalhado;
