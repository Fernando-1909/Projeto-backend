// components/ProjetoCard.jsx
import { Link } from 'react-router-dom';
import styles from '../styles/Projetos.module.css';

function ProjetoCard({ projeto }) {
  return (
    <div className={styles.card}>
      <h2>{projeto.titulo}</h2>
      <p><strong>Tipo:</strong> {projeto.tipo}</p>
      <p>{projeto.descricao}</p>
      <Link to={`/projetos/${projeto.id}`}>
        <button className={styles.botao}>Ver Detalhes</button>
      </Link>
    </div>
  );
}

export default ProjetoCard;
