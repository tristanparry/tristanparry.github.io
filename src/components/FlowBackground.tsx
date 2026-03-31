import { useTheme } from '@/src/contexts/ThemeContext';
import { useEffect, useRef } from 'react';

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const withAlpha = (color: string, alpha: number): string => {
  if (!color || !color.includes('(')) {
    return `rgba(128, 128, 128, ${alpha})`;
  }
  if (color.includes('/')) {
    return color.replace(/\/\s*[\d.]+\s*\)$/, `/ ${alpha})`);
  }
  return color.replace(/\)$/, ` / ${alpha})`);
};

interface BlobConfig {
  radius: number;
  driftX: number;
  driftY: number;
  offsetX: number;
  offsetY: number;
  phase: number;
  weight: number;
  color: 'accent' | 'secondary' | 'text';
}

const blobConfigs: BlobConfig[] = [
  {
    radius: 0.34,
    driftX: 0.16,
    driftY: 0.12,
    offsetX: 0.18,
    offsetY: 0.24,
    phase: 0,
    weight: 0.12,
    color: 'accent',
  },
  {
    radius: 0.28,
    driftX: 0.2,
    driftY: 0.18,
    offsetX: 0.72,
    offsetY: 0.22,
    phase: 1.4,
    weight: 0.08,
    color: 'secondary',
  },
  {
    radius: 0.32,
    driftX: 0.14,
    driftY: 0.2,
    offsetX: 0.36,
    offsetY: 0.76,
    phase: 2.2,
    weight: 0.1,
    color: 'accent',
  },
  {
    radius: 0.26,
    driftX: 0.22,
    driftY: 0.12,
    offsetX: 0.78,
    offsetY: 0.7,
    phase: 3.1,
    weight: 0.07,
    color: 'text',
  },
  {
    radius: 0.22,
    driftX: 0.1,
    driftY: 0.16,
    offsetX: 0.52,
    offsetY: 0.48,
    phase: 4.5,
    weight: 0.06,
    color: 'secondary',
  },
];

const FlowBackground = () => {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    const reducedMotionQuery = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    );
    const pointer = {
      currentX: 0.5,
      currentY: 0.45,
      targetX: 0.5,
      targetY: 0.45,
    };
    let frameId = 0;
    let width = 0;
    let height = 0;
    let devicePixelRatio = 1;
    let primaryBg: string;
    let accentColor: string;
    let secondaryAccent: string;
    let textColor: string;
    let blobIntensity = 0.3;
    let pointerAccentIntensity = 0.24;
    let pointerSecondaryIntensity = 0.18;
    let washStartIntensity = 0.06;
    let washMidIntensity = 0.03;
    let washEndIntensity = 0.06;

    const syncColors = () => {
      const isDarkTheme = theme === 'dark';
      const styles = getComputedStyle(document.documentElement);

      const getColor = (varName: string, fallback: string): string => {
        const value = styles.getPropertyValue(varName).trim();
        return value || fallback;
      };

      const lightFallbacks = {
        bg: 'hsl(0 0% 95%)',
        text: 'hsl(0 0% 5%)',
        secondaryText: 'hsl(0 0% 30%)',
      };
      const darkFallbacks = {
        bg: 'hsl(0 0% 5%)',
        text: 'hsl(0 0% 95%)',
        secondaryText: 'hsl(0 0% 70%)',
      };
      const fallbacks = isDarkTheme ? darkFallbacks : lightFallbacks;

      primaryBg = getColor('--color-primary-bg', fallbacks.bg);
      accentColor = getColor('--color-secondary-text', fallbacks.secondaryText);
      secondaryAccent = getColor('--color-primary-text', fallbacks.text);
      textColor = getColor('--color-secondary-text', fallbacks.secondaryText);

      blobIntensity = isDarkTheme ? 0.27 : 0.51;
      pointerAccentIntensity = isDarkTheme ? 0.2 : 0.43;
      pointerSecondaryIntensity = isDarkTheme ? 0.15 : 0.37;
      washStartIntensity = isDarkTheme ? 0.05 : 0.23;
      washMidIntensity = isDarkTheme ? 0.025 : 0.19;
      washEndIntensity = isDarkTheme ? 0.05 : 0.23;
    };

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * devicePixelRatio);
      canvas.height = Math.round(height * devicePixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    };

    const getBlobColor = (blob: BlobConfig) => {
      if (blob.color === 'accent') return accentColor;
      if (blob.color === 'secondary') return secondaryAccent;
      return textColor;
    };

    const drawBlob = (
      x: number,
      y: number,
      radius: number,
      color: string,
      intensity: number,
    ) => {
      const gradient = context.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, withAlpha(color, intensity));
      gradient.addColorStop(0.45, withAlpha(color, intensity * 0.45));
      gradient.addColorStop(0.8, withAlpha(color, intensity * 0.12));
      gradient.addColorStop(1, withAlpha(color, 0));
      context.fillStyle = gradient;
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.fill();
    };

    const supportsFilter =
      typeof context.filter !== 'undefined' &&
      CSS.supports('filter', 'blur(1px)');

    const drawFrame = (time: number) => {
      context.clearRect(0, 0, width, height);
      context.fillStyle =
        primaryBg || (theme === 'dark' ? '#0d0d0d' : '#f2f2f2');
      context.fillRect(0, 0, width, height);
      pointer.currentX += (pointer.targetX - pointer.currentX) * 0.05;
      pointer.currentY += (pointer.targetY - pointer.currentY) * 0.05;
      const pointerX = pointer.currentX * width;
      const pointerY = pointer.currentY * height;
      const minDimension = Math.min(width, height);
      context.globalCompositeOperation = 'source-over';
      if (supportsFilter) {
        context.filter = 'blur(56px)';
      }
      for (const blob of blobConfigs) {
        const orbitX =
          Math.sin(time * 0.00018 + blob.phase) * width * blob.driftX;
        const orbitY =
          Math.cos(time * 0.00015 + blob.phase * 1.2) * height * blob.driftY;
        const pullX = (pointerX - width / 2) * blob.weight;
        const pullY = (pointerY - height / 2) * blob.weight;
        const x = width * blob.offsetX + orbitX + pullX;
        const y = height * blob.offsetY + orbitY + pullY;
        const radius =
          minDimension *
          (blob.radius + Math.sin(time * 0.00022 + blob.phase) * 0.025);
        drawBlob(x, y, radius, getBlobColor(blob), blobIntensity);
      }
      drawBlob(
        pointerX * 0.8 + width * 0.1,
        pointerY * 0.8 + height * 0.1,
        minDimension * 0.26,
        accentColor,
        pointerAccentIntensity,
      );
      drawBlob(
        width - (width - pointerX) * 0.72,
        height - (height - pointerY) * 0.72,
        minDimension * 0.2,
        secondaryAccent,
        pointerSecondaryIntensity,
      );
      if (supportsFilter) {
        context.filter = 'none';
      }
      context.globalCompositeOperation = 'soft-light';
      const wash = context.createLinearGradient(0, 0, width, height);
      wash.addColorStop(0, withAlpha(accentColor, washStartIntensity));
      wash.addColorStop(0.5, withAlpha(textColor, washMidIntensity));
      wash.addColorStop(1, withAlpha(secondaryAccent, washEndIntensity));
      context.fillStyle = wash;
      context.fillRect(0, 0, width, height);
      context.globalCompositeOperation = 'source-over';
      const vignette = context.createRadialGradient(
        width * 0.5,
        height * 0.45,
        minDimension * 0.2,
        width * 0.5,
        height * 0.45,
        Math.max(width, height) * 0.7,
      );
      vignette.addColorStop(0, withAlpha(primaryBg, 0));
      vignette.addColorStop(1, withAlpha(primaryBg, 0.22));
      context.fillStyle = vignette;
      context.fillRect(0, 0, width, height);
    };

    const render = (time: number) => {
      drawFrame(time);
      if (!reducedMotionQuery.matches) {
        frameId = window.requestAnimationFrame(render);
      }
    };

    const start = () => {
      window.cancelAnimationFrame(frameId);
      if (reducedMotionQuery.matches) {
        drawFrame(performance.now());
        return;
      }
      frameId = window.requestAnimationFrame(render);
    };

    const updatePointerTarget = (clientX: number, clientY: number) => {
      pointer.targetX = clamp(clientX / Math.max(width, 1), 0, 1);
      pointer.targetY = clamp(clientY / Math.max(height, 1), 0, 1);
      if (reducedMotionQuery.matches) {
        drawFrame(performance.now());
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      updatePointerTarget(event.clientX, event.clientY);
    };

    const handlePointerLeave = () => {
      pointer.targetX = 0.5;
      pointer.targetY = 0.45;
      if (reducedMotionQuery.matches) {
        drawFrame(performance.now());
      }
    };

    const handleReducedMotionChange = () => {
      start();
    };

    const themeObserver = new MutationObserver(() => {
      syncColors();
      start();
    });

    syncColors();
    resizeCanvas();
    start();
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'style'],
    });
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('resize', start);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerleave', handlePointerLeave);
    reducedMotionQuery.addEventListener('change', handleReducedMotionChange);
    return () => {
      window.cancelAnimationFrame(frameId);
      themeObserver.disconnect();
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('resize', start);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      reducedMotionQuery.removeEventListener(
        'change',
        handleReducedMotionChange,
      );
    };
  }, [theme]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
      <canvas ref={canvasRef} className="block h-full w-full opacity-90" />
    </div>
  );
};

export default FlowBackground;
