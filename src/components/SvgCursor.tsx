import { DEFAULT_CURSOR_SIZE } from '@/src/constants/ui';
import { useTheme } from '@/src/contexts/ThemeContext';
import bracketCursorSvg from '@/src/images/bracket_cursor.svg?raw';
import {
  cloneElement,
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
  type ReactElement,
} from 'react';

interface SvgCursorProps {
  svg?: string | null | undefined;
  children: ReactElement<{ style?: CSSProperties }>;
  size?: number;
  hotspot?: number;
  colorVar?: string;
}

const SvgCursor = ({
  svg = bracketCursorSvg,
  children,
  size = DEFAULT_CURSOR_SIZE,
  hotspot,
  colorVar = '--color-primary-text',
}: SvgCursorProps) => {
  const { theme } = useTheme();

  const [fillColor, setFillColor] = useState<string>(() => {
    if (typeof window === 'undefined') return '';
    return getComputedStyle(document.documentElement)
      .getPropertyValue(colorVar)
      .trim();
  });

  useEffect(() => {
    const readColorVar = () => {
      const value = getComputedStyle(document.documentElement)
        .getPropertyValue(colorVar)
        .trim();
      if (value) setFillColor(value);
    };
    const id = window.requestAnimationFrame(readColorVar);
    return () => window.cancelAnimationFrame(id);
  }, [colorVar, theme]);

  const cursorDataUrl = useMemo(() => {
    if (!svg || !fillColor) return null;
    const sized = svg.replace(
      '<svg ',
      `<svg width="${size}" height="${size}" `,
    );
    const filled = sized.replaceAll('currentColor', fillColor);
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(filled)}`;
  }, [fillColor, size, svg]);

  const resolvedHotspot = Math.round(hotspot ?? size / 2);

  if (!cursorDataUrl) return children;

  const cursorValue = `url("${cursorDataUrl}") ${resolvedHotspot} ${resolvedHotspot}, default`;

  return cloneElement(children, {
    style: {
      ...(children.props.style ?? {}),
      cursor: cursorValue,
    },
  });
};

export default SvgCursor;
