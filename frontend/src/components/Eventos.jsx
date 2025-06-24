import styles from './Eventos.module.css';

function Eventos() {
  return (
    <section className={styles.section}>
      <h2>Eventos e Oficinas</h2>
      <p>Fique por dentro das próximas palestras e oficinas que a UERN está promovendo!</p>

      <div className={styles.grid}>
        <div className={styles.event}>
          <h3>Oficina de Redação Científica</h3>
          <p>Aprenda a escrever artigos e projetos com qualidade acadêmica.</p>
          <span>📅 12 de Agosto</span>
        </div>

        <div className={styles.event}>
          <h3>Palestra: A pesquisa no RN</h3>
          <p>Panorama atual da ciência no estado e como contribuir.</p>
          <span>📅 22 de Agosto</span>
        </div>

        <div className={styles.event}>
          <h3>Workshop de Extensão</h3>
          <p>Como transformar seu projeto em uma ação social relevante.</p>
          <span>📅 28 de Agosto</span>
        </div>
      </div>
    </section>
  );
}

export default Eventos;
