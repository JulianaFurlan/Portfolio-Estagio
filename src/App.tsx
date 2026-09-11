import { useEffect } from 'react';
import { BackToTop } from './components/layout/BackToTop';
import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import { SkipLink } from './components/layout/SkipLink';
import { About } from './components/sections/About';
import { Contact } from './components/sections/Contact';
import { Deliveries } from './components/sections/Deliveries';
import { Demo } from './components/sections/Demo';
import { Hero } from './components/sections/Hero';
import { Learnings } from './components/sections/Learnings';
import { Skills } from './components/sections/Skills';
import { TestsLimitations } from './components/sections/TestsLimitations';
import { UseCases } from './components/sections/UseCases';
import { handleEscKey } from './lib/escStack';

function App() {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      // Tela cheia tem prioridade: o navegador já sai dela; a pilha de
      // camadas (lightbox/modal/pastas) só reage quando não há tela cheia.
      if (document.fullscreenElement) return;
      handleEscKey();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <>
      <SkipLink />
      <Header />
      <main id="conteudo-principal">
        <Hero />
        <About />
        <UseCases />
        <Demo />
        <Deliveries />
        <TestsLimitations />
        <Skills />
        <Learnings />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}

export default App;
