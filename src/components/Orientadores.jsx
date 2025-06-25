import { Link } from 'react-router-dom';
import styles from './Orientadores.module.css';

function Orientadores() {
  const professores = [
    { sigla: "P1", nome: "Prof. 1", descricao: "Doutor em Ciência da Computação", extra: "Especialista em IA educacional" },
    { sigla: "P2", nome: "Prof. 2", descricao: "Doutora em Educação", extra: "Metodologias ativas e inovação" },
    { sigla: "P3", nome: "Prof. 3", descricao: "Doutor em Engenharia Agrícola", extra: "Tecnologia para agricultura familiar" },
    { sigla: "P4", nome: "Prof. 4", descricao: "Doutora em Biotecnologia", extra: "Soluções ambientais e industriais" }
  ];

  return (
    <section className={styles.section}>
      <h2>Nossos Orientadores</h2>
      <p>Conheça os professores que lideram nossos projetos e orientam nossos estudantes</p>

      <div className={styles.cards}>
        {professores.map((prof) => (
          <div className={styles.card} key={prof.sigla}>
            <div className={styles.icon}>{prof.sigla}</div>
            <h3>{prof.nome}</h3>
            <p>{prof.descricao}</p>
            <small>{prof.extra}</small>
            <div className={styles.footer}>
              <Link to="/orientadores"><button className={styles.btn}>Ver orientadores</button></Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Orientadores;
