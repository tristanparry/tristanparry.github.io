import BackButton from '@/src/components/BackButton';
import Button from '@/src/components/Button';
import SettingsMenu from '@/src/components/settings/SettingsMenu';
import { RESUME_FILEPATH, RESUME_FILENAME } from '@/src/constants/resume';
import {
  DEFAULT_ANIMATION_DURATION,
  DEFAULT_ANIMATION_EASE,
  DEFAULT_ANIMATION_HEADER_VIEWPORT_AMOUNT,
  Icons,
} from '@/src/constants/ui';
import { usePageTransitionComplete } from '@/src/utils/usePageTransitionComplete';
import { useWindowScroll } from '@/src/utils/useWindowScroll';
import Footer from '@/src/views/Footer';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const Resume = () => {
  const { t } = useTranslation();
  const { hasCompleted } = usePageTransitionComplete();
  const [numPages, setNumPages] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const { isScrolled } = useWindowScroll();

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const measureContainer = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      containerRef.current = node;
      setContainerWidth(node.clientWidth);
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          setContainerWidth(entry.contentRect.width);
        }
      });
      resizeObserver.observe(node);
    }
  }, []);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = RESUME_FILEPATH;
    link.download = RESUME_FILENAME;
    link.click();
  };

  return (
    <main className="flex flex-1 flex-col">
      <div
        className={clsx(
          'sticky top-0 z-20 flex items-center justify-between px-4 py-2 select-none',
          'transition-all duration-200',
          isScrolled && 'bg-primary-bg/75 shadow-xs backdrop-blur-sm',
        )}
      >
        <BackButton />
        <Button
          iconName={Icons.Download}
          altText={t('resume.actions.download')}
          onClick={handleDownload}
        />
      </div>
      <div
        className="mx-auto w-full px-2 sm:w-[80%] md:w-[50%]"
        ref={measureContainer}
      >
        <motion.h2
          initial={{ opacity: 0 }}
          animate={hasCompleted ? { opacity: 1 } : { opacity: 0 }}
          transition={{
            duration: DEFAULT_ANIMATION_DURATION,
            ease: DEFAULT_ANIMATION_EASE,
          }}
          viewport={{
            amount: DEFAULT_ANIMATION_HEADER_VIEWPORT_AMOUNT,
            once: true,
          }}
          className="font-heading mt-4 leading-none font-bold sm:mt-8"
        >
          {t('sections.resume')}
        </motion.h2>
        <Document
          file={RESUME_FILEPATH}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
            <p className="text-secondary-text flex h-64 items-center justify-center">
              {t('resume.loading')}
            </p>
          }
          error={
            <p className="text-secondary-text flex h-64 flex-col items-center justify-center">
              {t('resume.error')}
            </p>
          }
        >
          {Array.from(new Array(numPages), (_, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              width={containerWidth}
              className="mb-4 shadow-lg"
            />
          ))}
        </Document>
      </div>
      <SettingsMenu />
      <Footer className="z-20 mt-4 sm:mt-8" />
    </main>
  );
};

export default Resume;
