import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import logo from '../assets/uernlogo.png';

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Link to="/"><img src={logo} alt="Logo UERN" className={styles.logo}/></Link>
      <div className={styles.menu}>
        <Link to="/orientadores"><button>ORIENTADORES</button></Link>
        <Link to="/projetos"><button>PROJETOS</button></Link>
        <Link to="/eventos"><button>PALESTRAS E OFICINAS</button></Link>
        <Link to="/inscricao"><button>INSCREVA-SE</button></Link>
      </div>
      <div className={styles.right}>
        <input type="text" placeholder="Pesquisar..." />
        <button>Contato</button>
      </div>
    </nav>

  );
}

export default Navbar;
