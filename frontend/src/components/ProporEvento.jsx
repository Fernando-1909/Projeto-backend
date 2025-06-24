import styles from './ProporEvento.module.css';
import { Link } from 'react-router-dom';

function ProporEvento() {
  return (
    <section className={styles.section}>
      <div className={styles.card}>
        <h2>Quer se inscrever?</h2>
        <p>Se você é um discente em busca de um projeto, ou quer entrar em um evento ou palestra, junte-se a nós!</p>
        <Link to="/inscricao"><button>Inscrever-se</button></Link>
      </div>
    </section>
  );
}

export default ProporEvento;
