import Logo from '@/src/components/Logo';
import {
  OVERLAY_FADE_DURATION,
  LOGO_FADE_DURATION,
  LOGO_DRAW_DURATION,
  LOGO_HEIGHT,
  DEFAULT_ANIMATION_EASE,
  EXTRA_SMALL_SCREEN_BREAKPOINT,
} from '@/src/constants/ui';
import { TransitionStage } from '@/src/types/transition';
import { useWindowSize } from '@/src/utils/useWindowSize';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();
  const { width } = useWindowSize();
  const [stage, setStage] = useState<TransitionStage>(TransitionStage.LogoIn);
  const [displayChildren, setDisplayChildren] = useState<ReactNode>(children);
  const [logoKey, setLogoKey] = useState<number>(0);
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);
  const prevPathRef = useRef<string>(location.pathname);

  useEffect(() => {
    if (isInitialLoad) {
      return;
    }
    if (location.pathname !== prevPathRef.current) {
      prevPathRef.current = location.pathname;
      setTimeout(() => {
        setStage(TransitionStage.OverlayIn);
      }, 0);
    }
  }, [location.pathname, isInitialLoad]);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    switch (stage) {
      case TransitionStage.OverlayIn:
        timeout = setTimeout(() => {
          setDisplayChildren(children);
          setLogoKey((k) => k + 1);
          setStage(TransitionStage.LogoIn);
        }, OVERLAY_FADE_DURATION * 1000);
        break;
      case TransitionStage.LogoIn:
        timeout = setTimeout(() => {
          setStage(TransitionStage.LogoDraw);
        }, LOGO_FADE_DURATION * 1000);
        break;
      case TransitionStage.LogoDraw:
        timeout = setTimeout(() => {
          setStage(TransitionStage.LogoOut);
        }, LOGO_DRAW_DURATION * 1000);
        break;
      case TransitionStage.LogoOut:
        timeout = setTimeout(() => {
          setStage(TransitionStage.OverlayOut);
        }, LOGO_FADE_DURATION * 1000);
        break;
      case TransitionStage.OverlayOut:
        timeout = setTimeout(() => {
          setStage(TransitionStage.Idle);
          if (isInitialLoad) {
            setIsInitialLoad(false);
          }
          if (typeof window !== 'undefined') {
            window.dispatchEvent(
              new CustomEvent('page-transition-complete', {
                detail: { isInitialLoad },
              }),
            );
          }
        }, OVERLAY_FADE_DURATION * 1000);
        break;
    }
    return () => clearTimeout(timeout);
  }, [stage, children, isInitialLoad]);

  const isTransitioning = stage !== TransitionStage.Idle;

  useEffect(() => {
    if (isTransitioning) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('page-transition');
    } else {
      document.body.style.overflow = '';
      document.body.classList.remove('page-transition');
    }
    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('page-transition');
    };
  }, [isTransitioning]);

  const showLogo = [
    TransitionStage.LogoIn,
    TransitionStage.LogoDraw,
    TransitionStage.LogoOut,
  ].includes(stage);
  const logoOpacity =
    stage === TransitionStage.LogoOut
      ? 0
      : stage === TransitionStage.LogoIn || stage === TransitionStage.LogoDraw
        ? 1
        : 0;
  const overlayOpacity =
    stage === TransitionStage.OverlayOut ? 0 : isTransitioning ? 1 : 0;

  return (
    <>
      {displayChildren}
      {isTransitioning && (
        <motion.div
          className="bg-primary-text fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: isInitialLoad ? 1 : 0 }}
          animate={{ opacity: overlayOpacity }}
          transition={{
            duration: OVERLAY_FADE_DURATION,
            ease: DEFAULT_ANIMATION_EASE,
          }}
        >
          {showLogo && (
            <motion.div
              key={logoKey}
              className="text-primary-bg max-w-full px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: logoOpacity }}
              transition={{
                duration: LOGO_FADE_DURATION,
                ease: DEFAULT_ANIMATION_EASE,
              }}
            >
              <Logo
                height={
                  width < EXTRA_SMALL_SCREEN_BREAKPOINT
                    ? LOGO_HEIGHT / 2
                    : LOGO_HEIGHT
                }
              />
            </motion.div>
          )}
        </motion.div>
      )}
    </>
  );
};

export default PageTransition;
