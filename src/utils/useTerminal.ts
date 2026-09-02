import {
  executeCommand,
  type TerminalCommandResult,
} from '@/src/utils/terminal';
import i18n from 'i18next';
import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type KeyboardEvent,
} from 'react';

export interface TerminalEntry {
  command: string;
  output: string[];
}

export const useTerminal = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const [entries, setEntries] = useState<TerminalEntry[]>([]);
  const [isExited, setIsExited] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    outputRef.current?.scrollTo({ top: outputRef.current.scrollHeight });
  }, [entries]);

  const resetSession = () => {
    setInput('');
    setHistory([]);
    setHistoryIndex(null);
    setEntries([]);
    setIsExited(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const command = input.trim();
    if (!command || isExited) return;

    const result: TerminalCommandResult = executeCommand(command);
    setHistory((currentHistory) => [...currentHistory, command]);
    setHistoryIndex(null);
    setInput('');

    if (result.type === 'clear') {
      setEntries([]);
      return;
    }
    if (result.type === 'exit') {
      setEntries((currentEntries) => [
        ...currentEntries,
        { command, output: [i18n.t('contact.terminal.utils.exit')] },
      ]);
      setIsExited(true);
      return;
    }
    setEntries((currentEntries) => [
      ...currentEntries,
      { command, output: result.lines },
    ]);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') return;
    event.preventDefault();
    if (history.length === 0) return;

    const nextIndex =
      event.key === 'ArrowUp'
        ? Math.max(0, (historyIndex ?? history.length) - 1)
        : Math.min(history.length, (historyIndex ?? -1) + 1);
    setHistoryIndex(nextIndex === history.length ? null : nextIndex);
    setInput(nextIndex === history.length ? '' : history[nextIndex]);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  return {
    input,
    entries,
    outputRef,
    isExited,
    handleInputChange,
    handleKeyDown,
    handleSubmit,
    resetSession,
  };
};
