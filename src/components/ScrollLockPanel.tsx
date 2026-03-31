import {
  DEFAULT_ANIMATION_DURATION,
  DEFAULT_ANIMATION_EASE,
} from '@/src/constants/ui';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState, type ReactNode } from 'react';

interface ScrollLockPanelProps {
  children: ReactNode;
  className?: string;
  wheelLock?: boolean;
  bottomSlot?: ReactNode;
  bottomSlotClassName?: string;
  bottomSlotMinSpace?: number;
}

const ScrollLockPanel = ({
  children,
  className,
  wheelLock = true,
  bottomSlot,
  bottomSlotClassName,
  bottomSlotMinSpace = 0,
}: ScrollLockPanelProps) => {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [availableBottomSpace, setAvailableBottomSpace] = useState(0);

  useEffect(() => {
    if (!wheelLock) return;
    const el = panelRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX) || e.deltaY === 0) return;

      if (el.scrollHeight <= el.clientHeight + 1) return;

      const deltaY = e.deltaY;
      const atTop = el.scrollTop <= 0;
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;

      if ((deltaY > 0 && !atBottom) || (deltaY < 0 && !atTop)) {
        e.preventDefault();
        e.stopPropagation();
        el.scrollTop += deltaY;
      }
    };

    el.addEventListener('wheel', onWheel, { passive: false, capture: true });
    return () => el.removeEventListener('wheel', onWheel, true);
  }, [wheelLock]);

  useEffect(() => {
    if (!bottomSlot) return;
    const panelEl = panelRef.current;
    const contentEl = contentRef.current;
    if (!panelEl || !contentEl) return;
    const updateAvailableBottomSpace = () => {
      setAvailableBottomSpace(
        Math.max(0, panelEl.clientHeight - contentEl.offsetHeight),
      );
    };
    updateAvailableBottomSpace();
    const resizeObserver = new ResizeObserver(updateAvailableBottomSpace);
    resizeObserver.observe(panelEl);
    resizeObserver.observe(contentEl);
    window.addEventListener('resize', updateAvailableBottomSpace);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateAvailableBottomSpace);
    };
  }, [bottomSlot]);

  const shouldRenderBottomSlot =
    !!bottomSlot && availableBottomSpace >= bottomSlotMinSpace;

  return (
    <div
      data-section-scroll
      ref={panelRef}
      className={clsx('no-scrollbar min-h-0 overflow-y-auto', className)}
    >
      <div className="flex min-h-full flex-col">
        <div ref={contentRef}>{children}</div>
        {shouldRenderBottomSlot && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{
              duration: DEFAULT_ANIMATION_DURATION,
              ease: DEFAULT_ANIMATION_EASE,
            }}
            viewport={{ amount: 'all', once: false }}
            className={clsx('mt-auto', bottomSlotClassName)}
          >
            {bottomSlot}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ScrollLockPanel;
