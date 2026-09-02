import TerminalPrompt from '@/src/components/TerminalPrompt';
import { SocialLinks } from '@/src/constants/socials';
import {
  DEFAULT_ANIMATION_EASE,
  DEFAULT_ANIMATION_SCROLL_DURATION,
  SPACE,
} from '@/src/constants/ui';
import { useTheme } from '@/src/contexts/ThemeContext';
import { Theme } from '@/src/types/ui';
import { openUrl } from '@/src/utils/urls';
import { useTerminal } from '@/src/utils/useTerminal';
import clsx from 'clsx';
import { motion, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

interface TerminalProps {
  className?: string;
}

const Terminal = ({ className }: TerminalProps) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const visibilityFrameRef = useRef<number | null>(null);
  const isTerminalInView = useInView(terminalRef, {
    amount: 0.25,
    once: true,
  });
  const {
    input,
    entries,
    outputRef,
    isExited,
    handleInputChange,
    handleKeyDown,
    handleSubmit,
    resetSession,
  } = useTerminal();

  const focusInput = () => {
    inputRef.current?.focus({ preventScroll: true });
  };

  const handleReset = () => {
    resetSession();
    window.requestAnimationFrame(focusInput);
  };

  const keepInputVisible = () => {
    const input = inputRef.current;
    const viewport = window.visualViewport;
    if (!input || !viewport) return;

    const inputRect = input.getBoundingClientRect();
    const viewportTop = viewport.offsetTop;
    const viewportBottom = viewportTop + viewport.height;
    const isInputAboveViewport = inputRect.top < viewportTop + 12;
    const isInputBelowViewport = inputRect.bottom > viewportBottom - 12;
    if (!isInputAboveViewport && !isInputBelowViewport) return;

    input.scrollIntoView({
      block: 'nearest',
      inline: 'nearest',
      behavior: 'instant',
    });
  };

  const handleInputFocus = () => {
    const viewport = window.visualViewport;
    if (!viewport) return;

    const updateInputPosition = () => {
      visibilityFrameRef.current = null;
      if (document.activeElement !== inputRef.current) return;
      keepInputVisible();
    };
    const scheduleInputPosition = () => {
      if (visibilityFrameRef.current !== null) return;
      visibilityFrameRef.current =
        window.requestAnimationFrame(updateInputPosition);
    };

    const stopTrackingInputPosition = () => {
      viewport.removeEventListener('resize', scheduleInputPosition);
      viewport.removeEventListener('scroll', scheduleInputPosition);
    };

    viewport.addEventListener('resize', scheduleInputPosition, {
      passive: true,
    });
    viewport.addEventListener('scroll', scheduleInputPosition, {
      passive: true,
    });
    scheduleInputPosition();

    inputRef.current?.addEventListener('blur', stopTrackingInputPosition, {
      once: true,
    });
  };

  useEffect(
    () => () => {
      if (visibilityFrameRef.current !== null) {
        window.cancelAnimationFrame(visibilityFrameRef.current);
      }
    },
    [],
  );

  return (
    <motion.div
      ref={terminalRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: isTerminalInView ? 1 : 0 }}
      transition={{
        duration: DEFAULT_ANIMATION_SCROLL_DURATION,
        ease: DEFAULT_ANIMATION_EASE,
      }}
      onClick={focusInput}
      className={clsx(
        'border-tertiary-bg font-terminal flex min-h-0 flex-col rounded-xl border p-4 text-white backdrop-blur-lg duration-200 hover:cursor-text',
        theme === Theme.Light ? 'bg-black/90' : 'bg-black/40',
        className,
      )}
    >
      <div
        ref={outputRef}
        role="log"
        aria-live="polite"
        onWheelCapture={(event) => {
          const terminal = event.currentTarget;
          const hasOverflow = terminal.scrollHeight > terminal.clientHeight;
          const isAtTop = terminal.scrollTop <= 0;
          const isAtBottom =
            terminal.scrollTop + terminal.clientHeight >= terminal.scrollHeight;
          const isScrollingUp = event.deltaY < 0;
          const isScrollingDown = event.deltaY > 0;
          const canScroll =
            hasOverflow &&
            ((!isAtTop && isScrollingUp) || (!isAtBottom && isScrollingDown));

          if (!canScroll) return;

          event.preventDefault();
          event.stopPropagation();
          terminal.scrollBy({ top: event.deltaY });
        }}
        className="terminal-scrollbar min-h-0 min-w-0 flex-1 overflow-y-auto"
      >
        <div className="text-tertiary-text flex flex-col">
          {Object.entries(SocialLinks).map(([name, url]) => (
            <small
              key={name}
              onClick={() => openUrl(url)}
              className="group w-fit cursor-pointer"
            >
              {'- ['}
              <small className="group-hover:text-white group-hover:underline">
                {t(`contact.terminal.links.${name.toLowerCase()}`)}
              </small>
              {']'}
            </small>
          ))}
          <small>{t('contact.terminal.helpText')}</small>
        </div>
        {entries.map((entry, index) => (
          <div key={`${entry.command}-${index}`}>
            <TerminalPrompt>
              <span>
                ${SPACE}
                {entry.command}
              </span>
            </TerminalPrompt>
            {entry.output.map((line, lineIndex) => (
              <small
                key={`${line}-${lineIndex}`}
                className="block whitespace-pre-wrap"
              >
                {line}
              </small>
            ))}
            {SPACE}
          </div>
        ))}
        {isExited ? (
          <button
            type="button"
            onClick={handleReset}
            className="group text-tertiary-text w-fit text-left text-sm"
          >
            {'['}
            <small className="cursor-pointer group-hover:text-white group-hover:underline">
              {t('contact.terminal.reset')}
            </small>
            {']'}
          </button>
        ) : (
          <form onSubmit={handleSubmit} className="flex items-baseline">
            <TerminalPrompt>
              <span>${SPACE}</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onFocus={handleInputFocus}
                aria-label="Terminal command"
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                className="min-w-0 flex-1 bg-transparent text-sm focus:outline-none"
              />
            </TerminalPrompt>
          </form>
        )}
      </div>
    </motion.div>
  );
};

export default Terminal;
