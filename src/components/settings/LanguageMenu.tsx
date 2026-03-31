import Button from '@/src/components/Button';
import TextButton from '@/src/components/TextButton';
import { Icons } from '@/src/constants/ui';
import i18n from '@/src/i18n';
import { type LanguageCode, Language } from '@/src/types/i18n';
import clsx from 'clsx';
import { startCase } from 'lodash';
import { useEffect, useRef, useState } from 'react';

const LanguageMenu = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      const el = containerRef.current;
      if (!el) return;
      if (e.target instanceof Node && el.contains(e.target)) return;
      setIsOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setIsOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative">
      <Button
        iconName={Icons.Globe}
        onClick={() => setIsOpen((prev) => !prev)}
        className="rounded-none rounded-b-md transition-all duration-200 sm:rounded-none sm:rounded-r-md"
      />
      {isOpen && (
        <div className="border-secondary-border bg-primary-bg/75 hover:bg-primary-bg/90 absolute right-[100%] bottom-0 mb-4 flex flex-col gap-2 rounded-md border p-2 transition-all duration-200 sm:right-0 sm:bottom-[100%]">
          {Object.keys(Language).map((langCode) => (
            <TextButton
              className={clsx(
                'w-max',
                langCode === i18n.language
                  ? 'text-primary-text font-semibold'
                  : 'text-secondary-text',
              )}
              key={langCode}
              buttonText={startCase(Language[langCode as LanguageCode])}
              onClick={() => {
                i18n.changeLanguage(langCode as LanguageCode);
                setIsOpen(false);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageMenu;
