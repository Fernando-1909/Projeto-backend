// src/components/PalestraCard.jsx
import styles from '../styles/EventosCard.module.css';

function PalestraCard({ titulo, descricao, data, local }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardConteudo}>
        <h2>{titulo}</h2>
        <p>{descricao}</p>
        <p><strong>Data:</strong> {data}</p>
        <p><strong>Local:</strong> {local}</p>
      </div>
    </div>
  );
}

export default PalestraCard;
