import type { GithubProject } from '@/src/types/projects';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

const POPUP_FADE_DURATION = 0.2;

interface MediaPopupProps {
  media?: GithubProject['media'];
  viewportWidth?: number;
  className?: string;
}

const MediaPopup = ({
  media,
  viewportWidth = 35,
  className,
}: MediaPopupProps) => {
  const shouldRender = Boolean(media);

  const elRef = useRef<HTMLElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!shouldRender) return;
    const updatePosition = () => {
      rafRef.current = null;
      const el = elRef.current;
      if (!el) return;
      const elRect = el.getBoundingClientRect();
      const popupWidth = elRect.width;
      const popupHeight = elRect.height;
      let left = mouseRef.current.x;
      let top = mouseRef.current.y - popupHeight;
      if (left + popupWidth > window.innerWidth) {
        left = mouseRef.current.x - popupWidth;
      }
      if (top < 0) {
        top = mouseRef.current.y;
      }
      const maxLeft = Math.max(0, window.innerWidth - popupWidth);
      const maxTop = Math.max(0, window.innerHeight - popupHeight);
      left = Math.min(Math.max(left, 0), maxLeft);
      top = Math.min(Math.max(top, 0), maxTop);
      el.style.left = `${left}px`;
      el.style.top = `${top}px`;
    };
    const onMouseMove = (e: MouseEvent): void => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      if (rafRef.current != null) return;
      rafRef.current = window.requestAnimationFrame(updatePosition);
    };
    window.addEventListener('mousemove', onMouseMove);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      if (rafRef.current != null) window.cancelAnimationFrame(rafRef.current);
    };
  }, [shouldRender]);

  const style: React.CSSProperties = {
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: 10,
    width: `${viewportWidth}vw`,
    maxWidth: '500px',
    height: 'auto',
    borderRadius: 'var(--radius-md)',
    border: '1.5px solid var(--color-secondary-bg)',
  };

  if (!shouldRender) return null;

  if (media?.type === 'video') {
    return (
      <motion.video
        ref={(node) => {
          elRef.current = node;
        }}
        src={media.url}
        style={style}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: POPUP_FADE_DURATION, ease: 'easeInOut' }}
        className={clsx('shadow-md', className)}
      />
    );
  }

  if (media?.type === 'image') {
    return (
      <motion.img
        ref={(node) => {
          elRef.current = node;
        }}
        src={media.url}
        style={style}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: POPUP_FADE_DURATION, ease: 'easeInOut' }}
        className={clsx('shadow-md', className)}
      />
    );
  }

  return null;
};

export default MediaPopup;
