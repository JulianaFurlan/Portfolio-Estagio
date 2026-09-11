import { useRef, useState } from 'react';
import { motion, useScroll } from 'framer-motion';
import { useCases, type UseCase, type UseCaseStatus } from '../../data/content';
import { cn, EASE_KAWAII } from '../../lib/utils';
import { UseCaseModal } from './UseCaseModal';

const statusLabel: Record<UseCaseStatus, string> = {
  concluido: 'Concluído',
  'em-andamento': 'Em andamento',
};

function StatusMarker({ status }: { status: UseCaseStatus }) {
  if (status === 'concluido') {
    return <span className="block h-3.5 w-3.5 rounded-full bg-rosa-500" aria-hidden="true" />;
  }
  return <span className="block h-3.5 w-3.5 rounded-full border-2 border-rosa-500 bg-white" aria-hidden="true" />;
}

export function UseCases() {
  const [activeUseCase, setActiveUseCase] = useState<UseCase | null>(null);
  const timelineRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 0.75', 'end 0.4'],
  });

  return (
    <section id="casos-de-uso" className="bg-white px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Casos de uso</h2>
          <p className="mt-4 text-tinta-500">
            Principais fluxos do sistema, apresentados na ordem definida pela documentação do projeto.
          </p>
        </div>

        <ol ref={timelineRef} className="relative mt-14 space-y-8 pl-8 sm:pl-10">
          <span className="absolute bottom-0 left-0 top-0 w-0.5 rounded-full bg-rosa-200" aria-hidden="true" />
          <motion.span
            className="absolute left-0 top-0 h-full w-0.5 origin-top rounded-full bg-rosa-500"
            style={{ scaleY: scrollYProgress }}
            aria-hidden="true"
          />

          {useCases.map((useCase, index) => (
            <motion.li
              key={useCase.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.3), ease: EASE_KAWAII }}
              className="relative"
            >
              <span className="absolute -left-[2.05rem] top-1 grid h-6 w-6 place-items-center rounded-full bg-white ring-4 ring-white sm:-left-[2.55rem]">
                <StatusMarker status={useCase.status} />
              </span>

              <button
                type="button"
                onClick={() => setActiveUseCase(useCase)}
                className="w-full rounded-4xl bg-creme p-6 text-left shadow-soft transition-transform duration-200 ease-kawaii hover:-translate-y-0.5 hover:shadow-elevated"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-lg font-semibold text-tinta-800">{useCase.name}</h3>
                  <span
                    className={cn(
                      'rounded-full px-3 py-1 text-xs font-semibold',
                      useCase.status === 'concluido' ? 'bg-rosa-500 text-white' : 'bg-rosa-100 text-rosa-700',
                    )}
                  >
                    {statusLabel[useCase.status]}
                  </span>
                </div>

                <p className="mt-1 text-sm font-medium text-rosa-700">{useCase.actors.join(', ')}</p>
                <p className="mt-2 text-sm text-tinta-600">{useCase.objective}</p>
                <span className="mt-3 inline-block text-xs font-semibold uppercase tracking-wide text-rosa-500">
                  Ver detalhes
                </span>
              </button>
            </motion.li>
          ))}
        </ol>
      </div>

      <UseCaseModal useCase={activeUseCase} onClose={() => setActiveUseCase(null)} />
    </section>
  );
}
