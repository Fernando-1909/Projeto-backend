import { Link } from 'react-router-dom';
import styles from './FeaturedProjects.module.css';

function FeaturedProjects() {
  return (
    <section className={styles.section}>
      <h2>Projetos em Destaque</h2>
      <p>Conheça os projetos de ensino, pesquisa e extensão que estão transformando nossa universidade</p>

      <div className={styles.cards}>
        <div className={styles.card}>
          <span className={`${styles.tag} ${styles.pesquisa}`}>Pesquisa</span>
          <h3>Inteligência Artificial na Educação</h3>
          <p>Desenvolvimento de soluções de IA para personalização do ensino e melhoria do aprendizado.</p>
          <div className={styles.footer}>
            <small>Prof. 1</small>
            <Link to="/projetos"><button className={styles.btn}>Ver detalhes</button></Link>
          </div>
        </div>

        <div className={styles.card}>
          <span className={`${styles.tag} ${styles.ensino}`}>Ensino</span>
          <h3>Metodologias Ativas de Aprendizagem</h3>
          <p>Implementação de novas abordagens pedagógicas para engajar estudantes.</p>
          <div className={styles.footer}>
            <small>Prof. 2</small>
            <Link to="/projetos"><button className={styles.btn}>Ver detalhes</button></Link>
          </div>
        </div>

        <div className={styles.card}>
          <span className={`${styles.tag} ${styles.extensao}`}>Extensão</span>
          <h3>Tecnologia para Comunidades Rurais</h3>
          <p>Levar soluções tecnológicas sustentáveis para comunidades agrícolas da região.</p>
          <div className={styles.footer}>
            <small>Prof. 3</small>
            <Link to="/projetos"><button className={styles.btn}>Ver detalhes</button></Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturedProjects;
