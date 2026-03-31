import { useSectionScroll } from '@/src/utils/useSectionScroll';
import clsx from 'clsx';
import { HashLink } from 'react-router-hash-link';

interface TextLinkProps {
  linkText: string;
  linkType: 'section' | 'internal' | 'external';
  path: string;
  underline?: boolean;
  className?: string;
}

const TextLink = ({
  linkText,
  linkType = 'external',
  path,
  underline = true,
  className,
}: TextLinkProps) => {
  const { scrollToSection } = useSectionScroll();
  const TextLinkComponent = (
    <small
      className={clsx(
        'text-primary-text/80 relative',
        underline &&
          'after:absolute after:bottom-0 after:left-0 after:h-px after:w-full',
        underline && 'after:bg-primary-text after:origin-left after:scale-x-0',
        underline && 'after:transition-transform after:duration-200',
        'hover:text-primary-text hover:after:scale-x-100',
        className,
      )}
    >
      {linkText}
    </small>
  );

  if (linkType === 'section') {
    return (
      <button
        type="button"
        onClick={() => scrollToSection(path)}
        className="inline-flex items-center border-0 bg-transparent p-0"
      >
        {TextLinkComponent}
      </button>
    );
  }

  if (linkType === 'internal') {
    return (
      <HashLink to={path} className="inline-flex items-center">
        {TextLinkComponent}
      </HashLink>
    );
  }

  return (
    <a
      href={path}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center"
    >
      {TextLinkComponent}
    </a>
  );
};

export default TextLink;
