import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Projetos from './pages/Projetos';
import ProjetoDetalhado from './pages/ProjetoDetalhado';
import Orientadores from './pages/Orientadores';
import Eventos from './pages/Eventos';
import Formulario from './pages/Formulario';
import CadastroAluno from './components/CadastroAluno';
import CadastroProjeto from './components/CadastroProjeto';
import CadastroProfessor from './components/CadastroProfessor';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projetos" element={<Projetos />} />
        <Route path="/projetos/:id" element={<ProjetoDetalhado />} />
        <Route path="/orientadores" element={<Orientadores />} />
        <Route path="/eventos" element={<Eventos />} />
        <Route path="/inscricao" element={<Formulario />} />
        <Route path="/cadastro-aluno" element={<CadastroAluno />} />
        <Route path="/cadastro-projeto" element={<CadastroProjeto />} />
        <Route path="/cadastro-professor" element={<CadastroProfessor />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
