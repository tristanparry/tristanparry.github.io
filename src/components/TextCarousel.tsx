import clsx from 'clsx';
import { useEffect, useRef, useState, type CSSProperties } from 'react';

interface TextCarouselProps {
  text: string;
  direction?: 'left' | 'right';
  duration?: number;
  background?: boolean;
  className?: string;
  textClassName?: string;
}

const DEFAULT_REPEAT_COUNT = 10;

export const TextCarousel = ({
  text,
  direction = 'left',
  duration = 200,
  background = false,
  className,
  textClassName,
}: TextCarouselProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const groupRef = useRef<HTMLDivElement | null>(null);
  const sampleItemRef = useRef<HTMLSpanElement | null>(null);
  const [repeatCount, setRepeatCount] = useState(DEFAULT_REPEAT_COUNT);
  const [segmentWidth, setSegmentWidth] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    const group = groupRef.current;
    const sampleItem = sampleItemRef.current;

    if (!container || !track || !group || !sampleItem) {
      return;
    }

    const updateCarouselMetrics = () => {
      const groupStyles = window.getComputedStyle(group);
      const itemGap = Number.parseFloat(groupStyles.columnGap || '0') || 0;
      const containerWidth = container.getBoundingClientRect().width;
      const itemWidth = sampleItem.getBoundingClientRect().width;

      if (containerWidth > 0 && itemWidth > 0) {
        const nextRepeatCount = Math.max(
          DEFAULT_REPEAT_COUNT,
          Math.ceil((containerWidth * 2) / (itemWidth + itemGap)) + 1,
        );

        setRepeatCount((current) =>
          current === nextRepeatCount ? current : nextRepeatCount,
        );
      }

      const trackStyles = window.getComputedStyle(track);
      const trackGap = Number.parseFloat(trackStyles.columnGap || '0') || 0;

      setSegmentWidth(group.getBoundingClientRect().width + trackGap);
    };

    updateCarouselMetrics();

    const resizeObserver = new ResizeObserver(updateCarouselMetrics);
    resizeObserver.observe(container);
    resizeObserver.observe(track);
    resizeObserver.observe(group);
    resizeObserver.observe(sampleItem);

    return () => {
      resizeObserver.disconnect();
    };
  }, [repeatCount, text, textClassName]);

  const items = Array.from({ length: repeatCount }, (_, i) => (
    <span
      key={i}
      ref={i === 0 ? sampleItemRef : undefined}
      className={clsx(
        'text-primary-text/10 inline-flex items-center gap-4 text-5xl font-black whitespace-nowrap uppercase sm:text-7xl',
        textClassName,
      )}
    >
      <span className="tracking-[0.3em]">{text}</span>
      <span className="text-primary-text/5 text-4xl sm:text-6xl">
        &bull;&nbsp;
      </span>
    </span>
  ));

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={
        {
          '--text-carousel-duration': `${duration}s`,
          '--text-carousel-segment-width': `${segmentWidth}px`,
        } as CSSProperties
      }
      className={clsx(
        'pointer-events-none overflow-hidden select-none',
        background ? 'absolute inset-0 flex items-center' : 'relative w-full',
        className,
      )}
    >
      <div
        ref={trackRef}
        className={clsx(
          'text-carousel-track flex w-max min-w-max shrink-0 gap-4',
          direction === 'right' && 'text-carousel-track-reverse',
        )}
      >
        <div ref={groupRef} className="text-carousel-group flex shrink-0 gap-4">
          {items}
        </div>
        <div className="text-carousel-group flex shrink-0 gap-4">{items}</div>
      </div>
    </div>
  );
};
