import clsx from 'clsx';

interface TextChipProps {
  text: string;
  className?: string;
}

const TextChip = ({ text, className }: TextChipProps) => {
  return (
    <small
      className={clsx(
        'border-secondary-text text-secondary-text py-3/4 w-fit rounded-full border px-2 text-xs backdrop-blur-md transition-all duration-200 select-none',
        className,
      )}
    >
      {text}
    </small>
  );
};

export default TextChip;
