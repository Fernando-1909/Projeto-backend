import Hero from '../components/Hero';
import FeaturedProjects from '../components/FeaturedProjects';
import Orientadores from '../components/Orientadores';
import Eventos from '../components/Eventos';
import ProporEvento from '../components/ProporEvento';

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <Orientadores />
      <Eventos />
      <ProporEvento />
    </>
  );
}
