import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, File, FileText } from 'lucide-react';
import type { DeliveryCategory, DeliveryFile, DeliveryItem } from '../../data/content';
import { Lightbox } from '../overlay/Lightbox';
import { EASE_KAWAII } from '../../lib/utils';

function isViewable(file: DeliveryFile) {
  return file.kind === 'image' || file.kind === 'pdf';
}

type LightboxTarget = {
  item: DeliveryItem;
  files: DeliveryFile[];
  index: number;
};

function InfoFileCard({ file, title }: { file: DeliveryFile; title: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-3xl bg-white p-6 text-center shadow-soft">
      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-rosa-50 text-rosa-600">
        <FileText size={20} aria-hidden="true" />
      </span>
      <p className="text-sm font-medium text-tinta-700">{title}</p>
      {file.fileTypeLabel && (
        <span className="rounded-full bg-tinta-100 px-2.5 py-0.5 text-xs font-semibold text-tinta-500">
          {file.fileTypeLabel}
        </span>
      )}
    </div>
  );
}

function ItemCard({ item, onOpen }: { item: DeliveryItem; onOpen: (target: LightboxTarget) => void }) {
  const viewableFiles = item.files.filter(isViewable);

  if (item.files.length === 1) {
    const file = item.files[0];
    if (!isViewable(file)) {
      return <InfoFileCard file={file} title={item.title} />;
    }
    return (
      <button
        type="button"
        onClick={() => onOpen({ item, files: viewableFiles, index: 0 })}
        className="group overflow-hidden rounded-3xl bg-white text-left shadow-soft transition-transform duration-200 ease-kawaii hover:-translate-y-1 hover:shadow-elevated"
      >
        <div className="aspect-video w-full overflow-hidden bg-rosa-50">
          <img
            src={file.thumbPath ?? file.path}
            alt={file.alt ?? item.title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-300 ease-kawaii group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          <p className="text-sm font-semibold text-tinta-800">{item.title}</p>
          {item.description && <p className="mt-1 text-xs text-tinta-500">{item.description}</p>}
        </div>
      </button>
    );
  }

  return (
    <div className="rounded-3xl bg-white p-4 shadow-soft">
      <p className="text-sm font-semibold text-tinta-800">{item.title}</p>
      {item.description && <p className="mt-1 text-xs text-tinta-500">{item.description}</p>}

      <div className="mt-3 grid grid-cols-3 gap-2">
        {item.files.map((file) => {
          if (!isViewable(file)) {
            return (
              <div
                key={file.id}
                className="grid aspect-square place-items-center rounded-xl bg-tinta-50 text-tinta-400"
                title={file.fileTypeLabel}
              >
                <File size={18} aria-hidden="true" />
              </div>
            );
          }
          const viewableIndex = viewableFiles.findIndex((f) => f.id === file.id);
          return (
            <button
              key={file.id}
              type="button"
              onClick={() => onOpen({ item, files: viewableFiles, index: viewableIndex })}
              className="aspect-square overflow-hidden rounded-xl bg-rosa-50 transition-transform duration-200 ease-kawaii hover:scale-95"
            >
              <img
                src={file.thumbPath ?? file.path}
                alt={file.alt ?? item.title}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

type DeliveryCategoryPanelProps = {
  category: DeliveryCategory;
  onBack: () => void;
};

export function DeliveryCategoryPanel({ category, onBack }: DeliveryCategoryPanelProps) {
  const [lightboxTarget, setLightboxTarget] = useState<LightboxTarget | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          aria-label="Voltar para as categorias"
          className="grid h-10 w-10 place-items-center rounded-full bg-white text-tinta-700 shadow-soft transition-transform duration-200 ease-kawaii hover:scale-105"
        >
          <ArrowLeft size={18} aria-hidden="true" />
        </button>
        <div>
          <h3 ref={headingRef} tabIndex={-1} className="text-xl font-semibold text-tinta-800 outline-none">
            {category.name}
          </h3>
          <p className="text-sm text-tinta-500">{category.description}</p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: EASE_KAWAII }}
        className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {category.items.map((item) => (
          <ItemCard key={item.id} item={item} onOpen={setLightboxTarget} />
        ))}
      </motion.div>

      <Lightbox
        isOpen={lightboxTarget !== null}
        files={lightboxTarget?.files ?? []}
        index={lightboxTarget?.index ?? 0}
        onIndexChange={(nextIndex) =>
          setLightboxTarget((prev) => (prev ? { ...prev, index: nextIndex } : prev))
        }
        onClose={() => setLightboxTarget(null)}
        titleId="lightbox-title"
        itemTitle={lightboxTarget?.item.title ?? ''}
      />
    </div>
  );
}
