import SectionHeader from '@/src/components/SectionHeader';
import { SectionRoutes } from '@/src/constants/routes';
import clsx from 'clsx';

interface SectionProps {
  id: SectionRoutes;
  hero?: boolean;
  children?: React.ReactNode;
  overlayChildren?: React.ReactNode;
  className?: string;
}

const Section = ({
  id,
  hero = false,
  children,
  overlayChildren,
  className,
}: SectionProps) => {
  return (
    <section
      id={id}
      className={clsx(
        'relative shrink-0 snap-start',
        !hero && 'snap-always',
        overlayChildren &&
          'flex h-screen min-h-screen flex-col justify-between',
      )}
    >
      <div
        className={clsx(
          'sticky top-0 flex flex-1 flex-col items-start overflow-hidden',
          !hero && 'z-10 py-2',
          className,
        )}
      >
        {!hero && <SectionHeader id={id} className="px-4" />}
        {children}
      </div>
      {overlayChildren}
    </section>
  );
};

export default Section;
