import type { TorontoTimeType } from '@/src/types/dates';
import type { Position } from '@/src/types/experience';

export const getCurrentYear = () => new Date().getFullYear();

const parseYearMonth = (value: string): Date => {
  const [year, month] = value.split('-').map(Number);
  return new Date(year, month - 1);
};

export const formatPositionDateRange = (
  position: Position,
  locale: string,
  presentLabel: string,
): string => {
  const formatter = new Intl.DateTimeFormat(locale, {
    month: 'short',
    year: 'numeric',
  });
  const start = formatter.format(parseYearMonth(position.start));
  if (!position.end) return `${start} - ${presentLabel}`;
  const end = formatter.format(parseYearMonth(position.end));
  return `${start} - ${end}`;
};

export const getCurrentTorontoTime = (locale: string): TorontoTimeType => {
  const now = new Date();
  return {
    time: now.toLocaleTimeString(locale, {
      timeZone: 'America/Toronto',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }),
    date: now.toLocaleDateString(locale, {
      timeZone: 'America/Toronto',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }),
  };
};
