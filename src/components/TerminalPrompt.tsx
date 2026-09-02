import { SPACE } from '@/src/constants/ui';
import { getBrowserName } from '@/src/utils/browser';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

interface TerminalPromptProps {
  children?: ReactNode;
}

const TerminalPrompt = ({ children }: TerminalPromptProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex w-full flex-col items-baseline text-sm duration-200">
      <span className="text-primary-terminal-accent">
        <span className="text-secondary-accent">
          tristan@{t('contact.terminal.hostname')}
          {SPACE}
        </span>
        <span className="text-secondary-terminal-accent">
          {getBrowserName()}
        </span>
        {SPACE}~{SPACE}
      </span>
      <div className="flex">{children}</div>
    </div>
  );
};

export default TerminalPrompt;
