import Navbar from '@/src/components/Navbar';
import SettingsMenu from '@/src/components/settings/SettingsMenu';
import TorontoTime from '@/src/components/TorontoTime';
import Contact from '@/src/views/Contact';
import Experience from '@/src/views/Experience';
import Hero from '@/src/views/Hero';
import Projects from '@/src/views/Projects';
import { useEffect, useRef } from 'react';

const Home = () => {
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  return (
    <main
      ref={containerRef}
      data-scroll-container
      className="no-scrollbar h-screen-safe relative snap-y snap-mandatory overflow-y-auto overscroll-y-none"
    >
      <TorontoTime />
      <Navbar />
      <Hero />
      <Experience />
      <Projects />
      <Contact />
      <SettingsMenu />
    </main>
  );
};

export default Home;
