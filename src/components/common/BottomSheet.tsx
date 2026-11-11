import { useEffect, useId, useState } from 'react';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { useEscapeKey } from '../../hooks/useEscapeKey';
import { Eyebrow } from './Eyebrow';
import { CloseIcon } from '../icons/CloseIcon';
import styles from './BottomSheet.module.css';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export function BottomSheet({ isOpen, onClose, title, children }: BottomSheetProps) {
  const titleId = useId();
  const [entered, setEntered] = useState(false);
  const containerRef = useFocusTrap<HTMLDivElement>(isOpen);
  useEscapeKey(isOpen, onClose);

  useEffect(() => {
    if (!isOpen) {
      setEntered(false);
      return;
    }
    const raf = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(raf);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sheetRoot = document.getElementById('sheet-root');
  if (!sheetRoot) return null;

  return createPortal(
    <>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions -- Escape already closes the sheet */}
      <div className={styles.scrim} onClick={onClose} aria-hidden="true" />
      <div className={`${styles.panel} ${entered ? styles.panelOpen : ''}`}>
        <div
          ref={containerRef}
          className={styles.inner}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
        >
          <div className={styles.titleRow}>
            <Eyebrow as="h2" id={titleId}>
              {title}
            </Eyebrow>
            <button
              type="button"
              className={styles.closeButton}
              onClick={onClose}
              aria-label="Close"
            >
              <CloseIcon />
            </button>
          </div>
          <div className={styles.content}>{children}</div>
        </div>
      </div>
    </>,
    sheetRoot,
  );
}
