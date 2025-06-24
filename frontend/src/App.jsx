import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Projetos from './pages/Projetos';
import ProjetoDetalhado from './pages/ProjetoDetalhado';
import Orientadores from './pages/Orientadores';
import Eventos from './pages/Eventos';
import Formulario from './pages/Formulario';

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
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
