import { useId, useState } from 'react';
import { ImageIcon } from 'lucide-react';
import type { ArtifactRef, UseCase, UseCaseStatus } from '../../data/content';
import { findDeliveryFile } from '../../lib/deliveries';
import { Modal } from '../overlay/Modal';
import { Lightbox } from '../overlay/Lightbox';

const statusLabel: Record<UseCaseStatus, string> = {
  concluido: 'Concluído',
  'em-andamento': 'Em andamento',
};

function RefChip({ reference }: { reference: ArtifactRef }) {
  const [open, setOpen] = useState(false);
  const resolved = findDeliveryFile(reference.category, reference.slug);

  if (!resolved) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-tinta-100 px-3 py-1.5 text-xs font-medium text-tinta-500">
        <ImageIcon size={13} aria-hidden="true" />
        {reference.label}
      </span>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 rounded-full bg-rosa-50 px-3 py-1.5 text-xs font-medium text-rosa-700 transition-colors hover:bg-rosa-100"
      >
        <ImageIcon size={13} aria-hidden="true" />
        {reference.label}
      </button>
      <Lightbox
        isOpen={open}
        files={[resolved.file]}
        index={0}
        onIndexChange={() => {}}
        onClose={() => setOpen(false)}
        titleId={`lightbox-${reference.slug}`}
        itemTitle={resolved.item.title}
      />
    </>
  );
}

type UseCaseModalProps = {
  useCase: UseCase | null;
  onClose: () => void;
};

export function UseCaseModal({ useCase, onClose }: UseCaseModalProps) {
  const titleId = useId();
  const refs: ArtifactRef[] = [...(useCase?.screenRefs ?? []), ...(useCase?.diagramRef ? [useCase.diagramRef] : [])];

  return (
    <Modal isOpen={useCase !== null} onClose={onClose} titleId={titleId}>
      {useCase && (
        <div>
          <div className="flex flex-wrap items-center gap-2 pr-10">
            <h3 id={titleId} className="text-xl font-bold text-tinta-900">
              {useCase.name}
            </h3>
            <span
              className={
                useCase.status === 'concluido'
                  ? 'rounded-full bg-rosa-500 px-3 py-1 text-xs font-semibold text-white'
                  : 'rounded-full bg-rosa-100 px-3 py-1 text-xs font-semibold text-rosa-700'
              }
            >
              {statusLabel[useCase.status]}
            </span>
          </div>

          <p className="mt-1 text-sm font-medium text-rosa-700">{useCase.actors.join(', ')}</p>
          <p className="mt-3 text-sm text-tinta-600">{useCase.objective}</p>

          <ol className="mt-4 space-y-1.5 text-sm text-tinta-600">
            {useCase.mainFlow.map((step, index) => (
              <li key={step} className="flex gap-2">
                <span className="font-semibold text-rosa-500">{index + 1}.</span>
                {step}
              </li>
            ))}
          </ol>

          {refs.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {refs.map((ref) => (
                <RefChip key={`${ref.category}-${ref.slug}`} reference={ref} />
              ))}
            </div>
          )}

          <div className="mt-6 border-t border-rosa-100 pt-4 text-xs text-tinta-400">
            <p>
              <span className="font-semibold text-tinta-500">Fluxo: </span>
              {useCase.source.flow}
            </p>
            <p className="mt-1">
              <span className="font-semibold text-tinta-500">Atores: </span>
              {useCase.source.actors}
            </p>
          </div>
        </div>
      )}
    </Modal>
  );
}
