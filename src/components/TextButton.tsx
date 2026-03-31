import clsx from 'clsx';
import { noop } from 'lodash';

interface TextButtonProps {
  buttonText?: string;
  onClick: () => void;
  underline?: boolean;
  className?: string;
}

const TextButton = ({
  buttonText,
  onClick = noop,
  underline = true,
  className,
}: TextButtonProps) => {
  return (
    <button onClick={onClick} className="inline-flex items-center p-0">
      <small
        className={clsx(
          'text-primary-text/80 relative',
          underline &&
            'after:absolute after:bottom-0 after:left-0 after:h-px after:w-full',
          underline &&
            'after:bg-primary-text after:origin-left after:scale-x-0',
          underline && 'after:transition-transform after:duration-200',
          'hover:text-primary-text hover:after:scale-x-100',
          className,
        )}
        onClick={onClick}
      >
        {buttonText}
      </small>
    </button>
  );
};

export default TextButton;
