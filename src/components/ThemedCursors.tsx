import { DEFAULT_CURSOR_SIZE } from '@/src/constants/ui';
import { useTheme } from '@/src/contexts/ThemeContext';
import bracketCursorSvg from '@/src/images/bracket_cursor.svg?raw';
import ringCursorSvg from '@/src/images/ring_cursor.svg?raw';
import { useEffect, useMemo, useState } from 'react';

const COLOR_VAR = '--color-primary-text';

const ThemedCursors = () => {
  const { theme } = useTheme();
  const size = DEFAULT_CURSOR_SIZE;
  const hotspot = Math.round(size / 2);

  const [fillColor, setFillColor] = useState<string>(() => {
    if (typeof window === 'undefined') return '';
    return getComputedStyle(document.documentElement)
      .getPropertyValue(COLOR_VAR)
      .trim();
  });

  useEffect(() => {
    const read = () => {
      const value = getComputedStyle(document.documentElement)
        .getPropertyValue(COLOR_VAR)
        .trim();
      if (value) setFillColor(value);
    };

    const id = window.requestAnimationFrame(read);
    return () => window.cancelAnimationFrame(id);
  }, [theme]);

  const cursors = useMemo(() => {
    if (!fillColor) return null;

    const makeCursorDataUrl = (svg: string) => {
      const filled = svg.replaceAll('currentColor', fillColor);
      return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(filled)}`;
    };

    const bracketDataUrl = makeCursorDataUrl(bracketCursorSvg);
    const ringDataUrl = makeCursorDataUrl(ringCursorSvg);

    return {
      defaultValue: `url("${bracketDataUrl}") ${hotspot} ${hotspot}, default`,
      interactiveValue: `url("${ringDataUrl}") ${hotspot} ${hotspot}, default`,
    };
  }, [fillColor, hotspot]);

  useEffect(() => {
    if (!cursors) return;
    const root = document.documentElement;
    root.style.setProperty('--cursor-default', cursors.defaultValue);
    root.style.setProperty('--cursor-interactive', cursors.interactiveValue);
  }, [cursors]);

  return null;
};

export default ThemedCursors;
