// pages/Orientadores.jsx
import React from 'react';
import OrientadorCard from '../components/OrientadorCard';
import styles from '../styles/Orientadores.module.css';

const orientadores = [
  {
    nome: "Prof. João Silva",
    area: "Ensino",
    descricao: "Atua com metodologias ativas na educação básica.",
  },
  {
    nome: "Profa. Ana Santos",
    area: "Pesquisa",
    descricao: "Trabalha com biotecnologia e microbiologia.",
  },
];

function Orientadores() {
  return (
    <div className={styles.orientadoresPage}>
      <h1 className={styles.titulo}>Orientadores</h1>
      <div className={styles.cardContainer}>
        {orientadores.map((o, index) => (
          <OrientadorCard key={index} {...o} />
        ))}
      </div>
    </div>
  );
}

export default Orientadores;
