import { Link } from 'react-router-dom';
import styles from './Hero.module.css';

function Hero() {
  return (
    <section className={styles.hero}>
      <h1>Pensando em participar de algum projeto?</h1>
      <p>
        Integrar-se a um projeto vigente da UERN é uma oportunidade única de aplicar seu conhecimento acadêmico, contribuir com a ciência e fortalecer sua formação.
      </p>
        <Link to="/projetos"><button>Ver Projetos</button></Link>
    </section>
  );
}

export default Hero;
