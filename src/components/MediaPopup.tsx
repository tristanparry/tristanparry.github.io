import type { GithubProject } from '@/src/utils/getGithubProjects';
import clsx from 'clsx';
import { useEffect, useRef } from 'react';

interface MediaPopupProps {
  media: GithubProject['media'];
  mediaUrl?: string;
  isVisible?: boolean;
  viewportWidth?: number;
  className?: string;
}

const MediaPopup = ({
  media,
  mediaUrl,
  isVisible = false,
  viewportWidth = 35,
  className,
}: MediaPopupProps) => {
  const videoBlob = media?.video;
  const imageBlob = media?.image;
  const shouldRender = Boolean((videoBlob || imageBlob) && mediaUrl);

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

  if (videoBlob) {
    return (
      <video
        ref={(node) => {
          elRef.current = node;
        }}
        src={mediaUrl}
        style={style}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className={clsx(
          'shadow-md transition-opacity duration-200',
          isVisible ? 'opacity-100' : 'opacity-0',
          className,
        )}
      />
    );
  }

  if (imageBlob) {
    return (
      <img
        ref={(node) => {
          elRef.current = node;
        }}
        src={mediaUrl}
        style={style}
        className={clsx(
          'shadow-md transition-opacity duration-200',
          isVisible ? 'opacity-100' : 'opacity-0',
          className,
        )}
      />
    );
  }

  return null;
};

export default MediaPopup;
