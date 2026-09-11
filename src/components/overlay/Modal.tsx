import { useEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useEscLayer } from '../../hooks/useEscLayer';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { EASE_KAWAII } from '../../lib/utils';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  titleId: string;
  children: ReactNode;
};

export function Modal({ isOpen, onClose, titleId, children }: ModalProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEscLayer(isOpen, onClose);
  useFocusTrap(isOpen, containerRef);

  useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: EASE_KAWAII }}
        >
          <button
            type="button"
            aria-label="Fechar"
            onClick={onClose}
            className="absolute inset-0 bg-tinta-900/50 backdrop-blur-sm"
          />

          <motion.div
            ref={containerRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: EASE_KAWAII }}
            className="relative max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-4xl bg-white p-6 shadow-elevated sm:p-8"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar"
              className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full bg-rosa-50 text-tinta-600 transition-colors hover:bg-rosa-100 hover:text-rosa-700"
            >
              <X size={18} aria-hidden="true" />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
