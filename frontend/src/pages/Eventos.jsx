// src/pages/Palestras.jsx
import styles from '../styles/EventosCard.module.css';
import PalestraCard from '../components/EventosCard';

function Palestras() {
  const palestras = [
    {
      titulo: "Oficina de Iniciação Científica",
      descricao: "Aprenda os primeiros passos para desenvolver pesquisa científica.",
      data: "25/07/2025",
      local: "Auditório Central",
    },
    {
      titulo: "Palestra sobre Extensão Universitária",
      descricao: "Importância da extensão e seu impacto na comunidade.",
      data: "28/07/2025",
      local: "Bloco D, Sala 204",
    },
    // Adicione mais itens aqui
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.titulo}>Palestras e Oficinas</h1>
      <div className={styles.lista}>
        {palestras.map((p, index) => (
          <PalestraCard key={index} {...p} />
        ))}
      </div>
    </div>
  );
}

export default Palestras;
