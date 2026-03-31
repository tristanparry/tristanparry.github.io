import Navbar from '@/src/components/Navbar';
import SettingsMenu from '@/src/components/settings/SettingsMenu';
import TorontoTime from '@/src/components/TorontoTime';
import { SectionRoutes } from '@/src/constants/routes';
import Contact from '@/src/views/Contact';
import Experience from '@/src/views/Experience';
import Hero from '@/src/views/Hero';
import Projects from '@/src/views/Projects';
import { useEffect, useRef, useState } from 'react';

const Home = () => {
  const containerRef = useRef<HTMLElement | null>(null);
  const [activeSectionId, setActiveSectionId] = useState<SectionRoutes>(
    SectionRoutes.Hero,
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const sections = Array.from(
      container.querySelectorAll<HTMLElement>('section[id]'),
    );
    if (sections.length === 0) return;
    const intersectionRatios = new Map<string, number>();
    sections.forEach((section) => {
      intersectionRatios.set(section.id, 0);
    });
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          intersectionRatios.set(
            entry.target.id,
            entry.isIntersecting ? entry.intersectionRatio : 0,
          );
        });
        let nextSectionId = sections[0].id as SectionRoutes;
        let highestRatio = -1;
        sections.forEach((section) => {
          const ratio = intersectionRatios.get(section.id) ?? 0;
          if (ratio > highestRatio) {
            highestRatio = ratio;
            nextSectionId = section.id as SectionRoutes;
          }
        });
        setActiveSectionId((currentSectionId) =>
          currentSectionId === nextSectionId ? currentSectionId : nextSectionId,
        );
      },
      {
        root: container,
        threshold: Array.from({ length: 11 }, (_, i) => i / 10),
      },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
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
      <Experience isActive={activeSectionId === SectionRoutes.Experience} />
      <Projects isActive={activeSectionId === SectionRoutes.Projects} />
      <Contact />
      <SettingsMenu />
    </main>
  );
};

export default Home;
