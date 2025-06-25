import { useEffect, useState } from 'react';
import EventosCard from "../components/EventosCard"; 
import styles from "../components/Eventos.module.css";

function Eventos() {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/eventos')
      .then(res => res.json())
      .then(data => setEventos(data))
      .catch(err => console.error('Erro ao buscar eventos:', err));
  }, []);

  return (
    <section className={styles.section}>
      <h2>Eventos e Oficinas</h2>
      <p>Fique por dentro das próximas palestras e oficinas que a UERN está promovendo!</p>

      <div className={styles.grid}>
        {eventos.length > 0 ? (
          eventos.map((evento, index) => (
            <EventosCard
              key={index}
              titulo={evento.titulo}
              descricao={evento.descricao}
              data={evento.data}
              local={evento.local}
            />
          ))
        ) : (
          <p>Carregando eventos...</p>
        )}
      </div>
    </section>
  );
}

export default Eventos;
