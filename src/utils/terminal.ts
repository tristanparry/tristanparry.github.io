import { SectionRoutes } from '@/src/constants/routes';
import { SocialLinks } from '@/src/constants/socials';
import { SPACE } from '@/src/constants/ui';
import { openUrl } from '@/src/utils/urls';
import i18n from 'i18next';

const echo = (input: string): string => input;

const notFound = (input: string): string =>
  `${input}: ${i18n.t('contact.terminal.notFound')}`;

const ls = (): string =>
  Object.values(SectionRoutes)
    .map((section) => i18n.t(`sections.${section}`))
    .concat([i18n.t('sections.resume')])
    .join(SPACE + SPACE);

const email = () => openUrl(SocialLinks.Email);
const mail = () => email();

const github = () => openUrl(SocialLinks.GitHub);

const linkedin = () => openUrl(SocialLinks.LinkedIn);

const help = (): string[] => {
  const translatedHelp = i18n.t('contact.terminal.utils.help', {
    returnObjects: true,
  });
  return Array.isArray(translatedHelp)
    ? translatedHelp.map(String)
    : String(translatedHelp).split('\n');
};

const exit = () => {};

export type TerminalCommandResult =
  | { type: 'output'; lines: string[] }
  | { type: 'clear' }
  | { type: 'exit' };

const commandHandlers: Record<
  string,
  (args: string[]) => TerminalCommandResult
> = {
  clear: () => ({ type: 'clear' }),
  echo: (args) => ({ type: 'output', lines: [echo(args.join(' '))] }),
  email: () => {
    email();
    return { type: 'output', lines: [i18n.t('contact.terminal.utils.email')] };
  },
  exit: () => {
    exit();
    return { type: 'exit' };
  },
  github: () => {
    github();
    return { type: 'output', lines: [i18n.t('contact.terminal.utils.github')] };
  },
  help: () => ({ type: 'output', lines: help() }),
  linkedin: () => {
    linkedin();
    return {
      type: 'output',
      lines: [i18n.t('contact.terminal.utils.linkedin')],
    };
  },
  ls: () => ({ type: 'output', lines: [ls()] }),
  mail: () => {
    mail();
    return { type: 'output', lines: [i18n.t('contact.terminal.utils.email')] };
  },
};

export const executeCommand = (input: string): TerminalCommandResult => {
  const parts = input.trim().split(/\s+/);
  const command = parts.shift()?.toLowerCase() ?? '';
  if (!command) return { type: 'output', lines: [] };
  return (
    commandHandlers[command]?.(parts) ?? {
      type: 'output',
      lines: [notFound(command)],
    }
  );
};
