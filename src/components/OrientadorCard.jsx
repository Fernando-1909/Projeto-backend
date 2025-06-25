// components/OrientadorCard.jsx
import { FaUserTie } from 'react-icons/fa';
import styles from '../styles/Orientadores.module.css';

function OrientadorCard({ nome, area, descricao }) {
  return (
    <div className={styles.card}>
      <div className={styles.imagemPlaceholder}>
        <FaUserTie className={styles.icone} />
      </div>
      <h2>{nome}</h2>
      <p><strong>Área:</strong> {area}</p>
      <p>{descricao}</p>
    </div>
  );
}

export default OrientadorCard;
