import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize, Minimize, X } from 'lucide-react';
import type { DeliveryFile } from '../../data/content';
import { useEscLayer } from '../../hooks/useEscLayer';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { cn, EASE_KAWAII } from '../../lib/utils';

const MIN_SCALE = 1;
const MAX_SCALE = 6;
const DRAG_THRESHOLD = 4;
const DOUBLE_CLICK_SCALE = 2.5;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

type Fit = { width: number; height: number };
type View = { scale: number; tx: number; ty: number };

type LightboxProps = {
  isOpen: boolean;
  files: DeliveryFile[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
  titleId: string;
  itemTitle: string;
};

export function Lightbox({ isOpen, files, index, onIndexChange, onClose, titleId, itemTitle }: LightboxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const fitRef = useRef<Fit>({ width: 1, height: 1 });
  const naturalRef = useRef<{ width: number; height: number } | null>(null);

  const [view, setView] = useState<View>({ scale: 1, tx: 0, ty: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const dragOrigin = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const isPointerDown = useRef(false);
  const pinchStartDistance = useRef(0);
  const pinchStartView = useRef<View>({ scale: 1, tx: 0, ty: 0 });

  const current = files[index];

  useEscLayer(isOpen, onClose);
  useFocusTrap(isOpen, dialogRef);

  useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  const clampView = useCallback((next: View): View => {
    const fit = fitRef.current;
    const container = containerRef.current?.getBoundingClientRect();
    if (!container) return next;

    const scale = clamp(next.scale, MIN_SCALE, MAX_SCALE);
    const scaledWidth = fit.width * scale;
    const scaledHeight = fit.height * scale;

    let tx = next.tx;
    let ty = next.ty;

    if (scaledWidth <= container.width) {
      tx = (container.width - scaledWidth) / 2;
    } else {
      tx = clamp(tx, container.width - scaledWidth, 0);
    }

    if (scaledHeight <= container.height) {
      ty = (container.height - scaledHeight) / 2;
    } else {
      ty = clamp(ty, container.height - scaledHeight, 0);
    }

    return { scale, tx, ty };
  }, []);

  const resetView = useCallback(() => {
    const container = containerRef.current?.getBoundingClientRect();
    const natural = naturalRef.current;
    if (!container || !natural) return;

    const containerAspect = container.width / container.height;
    const naturalAspect = natural.width / natural.height;

    let width: number;
    let height: number;
    if (naturalAspect > containerAspect) {
      width = container.width;
      height = width / naturalAspect;
    } else {
      height = container.height;
      width = height * naturalAspect;
    }

    fitRef.current = { width, height };
    setView({ scale: 1, tx: (container.width - width) / 2, ty: (container.height - height) / 2 });
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    naturalRef.current = null;
    setView({ scale: 1, tx: 0, ty: 0 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, index]);

  useEffect(() => {
    if (!isOpen) return;
    const onResize = () => resetView();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [isOpen, resetView]);

  useEffect(() => {
    const onFullscreenChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    }
  }, [isOpen]);

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const img = event.currentTarget;
    naturalRef.current = { width: img.naturalWidth, height: img.naturalHeight };
    resetView();
  };

  const goTo = useCallback(
    (nextIndex: number) => {
      if (nextIndex < 0 || nextIndex >= files.length) return;
      onIndexChange(nextIndex);
    },
    [files.length, onIndexChange],
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!isOpen || !el) return;

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      const rect = el.getBoundingClientRect();
      const cursorX = event.clientX - rect.left;
      const cursorY = event.clientY - rect.top;
      const factor = Math.exp(-event.deltaY * 0.0015);

      setView((prev) => {
        const nextScale = clamp(prev.scale * factor, MIN_SCALE, MAX_SCALE);
        const ratio = nextScale / prev.scale;
        return clampView({
          scale: nextScale,
          tx: cursorX - (cursorX - prev.tx) * ratio,
          ty: cursorY - (cursorY - prev.ty) * ratio,
        });
      });
    };

    // listener nativo e não-passivo: o onWheel do React não garante
    // preventDefault() de forma confiável para bloquear o scroll da página.
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [isOpen, clampView]);

  const handleDoubleClick = (event: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cursorX = event.clientX - rect.left;
    const cursorY = event.clientY - rect.top;

    setView((prev) => {
      if (prev.scale > 1) {
        return clampView({ scale: 1, tx: 0, ty: 0 });
      }
      const ratio = DOUBLE_CLICK_SCALE / prev.scale;
      return clampView({
        scale: DOUBLE_CLICK_SCALE,
        tx: cursorX - (cursorX - prev.tx) * ratio,
        ty: cursorY - (cursorY - prev.ty) * ratio,
      });
    });
  };

  const getDistance = () => {
    const [a, b] = Array.from(pointers.current.values());
    return Math.hypot(a.x - b.x, a.y - b.y);
  };

  const getMidpoint = () => {
    const [a, b] = Array.from(pointers.current.values());
    const rect = containerRef.current?.getBoundingClientRect();
    return { x: (a.x + b.x) / 2 - (rect?.left ?? 0), y: (a.y + b.y) / 2 - (rect?.top ?? 0) };
  };

  const handlePointerDown = (event: React.PointerEvent) => {
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    isPointerDown.current = true;

    if (pointers.current.size === 2) {
      pinchStartDistance.current = getDistance();
      pinchStartView.current = view;
      setIsDragging(false);
    } else if (pointers.current.size === 1) {
      dragOrigin.current = { x: event.clientX, y: event.clientY, tx: view.tx, ty: view.ty };
    }
  };

  const handlePointerMove = (event: React.PointerEvent) => {
    if (!isPointerDown.current || !pointers.current.has(event.pointerId)) return;
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });

    if (pointers.current.size === 2) {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const distance = getDistance();
      const midpoint = getMidpoint();
      const ratio = distance / (pinchStartDistance.current || distance);
      const base = pinchStartView.current;
      const nextScale = clamp(base.scale * ratio, MIN_SCALE, MAX_SCALE);
      const scaleRatio = nextScale / base.scale;
      setView(
        clampView({
          scale: nextScale,
          tx: midpoint.x - (midpoint.x - base.tx) * scaleRatio,
          ty: midpoint.y - (midpoint.y - base.ty) * scaleRatio,
        }),
      );
      return;
    }

    if (view.scale <= 1) return;

    const dx = event.clientX - dragOrigin.current.x;
    const dy = event.clientY - dragOrigin.current.y;

    if (!isDragging && Math.hypot(dx, dy) > DRAG_THRESHOLD) {
      setIsDragging(true);
      (event.target as HTMLElement).setPointerCapture(event.pointerId);
    }

    if (isDragging || Math.hypot(dx, dy) > DRAG_THRESHOLD) {
      setView((prev) => clampView({ ...prev, tx: dragOrigin.current.tx + dx, ty: dragOrigin.current.ty + dy }));
    }
  };

  const endPointer = (event: React.PointerEvent) => {
    pointers.current.delete(event.pointerId);
    isPointerDown.current = pointers.current.size > 0;
    setIsDragging(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowRight') {
      if (view.scale > 1) {
        setView((prev) => clampView({ ...prev, tx: prev.tx - 80 }));
      } else {
        goTo(index + 1);
      }
    } else if (event.key === 'ArrowLeft') {
      if (view.scale > 1) {
        setView((prev) => clampView({ ...prev, tx: prev.tx + 80 }));
      } else {
        goTo(index - 1);
      }
    }
  };

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      containerRef.current?.requestFullscreen().catch(() => {});
    }
  };

  const resetZoom = () => setView(clampView({ scale: 1, tx: 0, ty: 0 }));

  if (!current) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          tabIndex={-1}
          onKeyDown={handleKeyDown}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: EASE_KAWAII }}
          className="fixed inset-0 z-[70] flex flex-col bg-tinta-900/95"
        >
          <h2 id={titleId} className="sr-only">
            {itemTitle} — visualização ampliada
          </h2>

          <div className="flex items-center justify-between px-4 py-3 text-white sm:px-6">
            <button
              type="button"
              onClick={resetZoom}
              className="rounded-full bg-white/10 px-3 py-1.5 text-sm font-medium transition-colors hover:bg-white/20"
              aria-label="Redefinir zoom para 100%"
            >
              {Math.round(view.scale * 100)}%
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleFullscreen}
                aria-label={isFullscreen ? 'Sair da tela cheia' : 'Ver em tela cheia'}
                className="grid h-9 w-9 place-items-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
              >
                {isFullscreen ? <Minimize size={18} aria-hidden="true" /> : <Maximize size={18} aria-hidden="true" />}
              </button>
              <button
                type="button"
                onClick={onClose}
                aria-label="Fechar"
                className="grid h-9 w-9 place-items-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>
          </div>

          <div
            ref={containerRef}
            onDoubleClick={handleDoubleClick}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={endPointer}
            onPointerCancel={endPointer}
            className="relative flex-1 touch-none overflow-hidden"
          >
            <img
              key={current.id}
              src={current.path}
              alt={current.alt ?? itemTitle}
              onLoad={handleImageLoad}
              draggable={false}
              className={cn('absolute left-0 top-0 select-none', isDragging ? 'cursor-grabbing' : view.scale > 1 ? 'cursor-grab' : 'cursor-zoom-in')}
              style={{
                width: fitRef.current.width,
                height: fitRef.current.height,
                transform: `translate(${view.tx}px, ${view.ty}px) scale(${view.scale})`,
                transformOrigin: '0 0',
              }}
            />

            {files.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => goTo(index - 1)}
                  disabled={index === 0}
                  aria-label="Imagem anterior"
                  className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 disabled:pointer-events-none disabled:opacity-30 sm:left-5"
                >
                  <ChevronLeft size={22} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => goTo(index + 1)}
                  disabled={index === files.length - 1}
                  aria-label="Próxima imagem"
                  className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 disabled:pointer-events-none disabled:opacity-30 sm:right-5"
                >
                  <ChevronRight size={22} aria-hidden="true" />
                </button>
              </>
            )}
          </div>

          {files.length > 1 && (
            <p className="pb-4 text-center text-sm text-white/70" aria-live="polite">
              {index + 1} / {files.length}
            </p>
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
