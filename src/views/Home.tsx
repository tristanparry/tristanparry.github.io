import Navbar from '@/src/components/Navbar';
import SettingsMenu from '@/src/components/settings/SettingsMenu';
import TorontoTime from '@/src/components/TorontoTime';
import { SectionRoutes } from '@/src/constants/routes';
import { DEFAULT_ANIMATION_SCROLL_COOLDOWN_DURATION } from '@/src/constants/ui';
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

    const desktopQuery = window.matchMedia('(pointer: fine)');
    const reducedMotionQuery = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    );
    let animationFrame = 0;
    let isAnimating = false;

    const easeOutCubic = (progress: number) => 1 - Math.pow(1 - progress, 3);

    const handleWheel = (event: WheelEvent) => {
      if (
        !desktopQuery.matches ||
        reducedMotionQuery.matches ||
        event.deltaY === 0
      ) {
        return;
      }

      event.preventDefault();
      if (isAnimating) return;

      const sections = Array.from(
        container.querySelectorAll<HTMLElement>('section[id]'),
      );
      if (sections.length === 0) return;

      const currentIndex = sections.reduce((closestIndex, section, index) => {
        const closestDistance = Math.abs(
          sections[closestIndex].offsetTop - container.scrollTop,
        );
        const sectionDistance = Math.abs(
          section.offsetTop - container.scrollTop,
        );
        return sectionDistance < closestDistance ? index : closestIndex;
      }, 0);
      const direction = event.deltaY > 0 ? 1 : -1;
      const targetIndex = Math.max(
        0,
        Math.min(sections.length - 1, currentIndex + direction),
      );

      if (targetIndex === currentIndex) return;

      const start = container.scrollTop;
      const target = sections[targetIndex].offsetTop;
      const startTime = performance.now();
      isAnimating = true;

      const animate = (time: number) => {
        const progress = Math.min(
          (time - startTime) / DEFAULT_ANIMATION_SCROLL_COOLDOWN_DURATION,
          1,
        );
        container.scrollTop = start + (target - start) * easeOutCubic(progress);

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        } else {
          isAnimating = false;
        }
      };

      animationFrame = requestAnimationFrame(animate);
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      container.removeEventListener('wheel', handleWheel);
      cancelAnimationFrame(animationFrame);
    };
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
