import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { deliveryCategories } from '../../data/content';
import { getDeliveryIcon } from '../../lib/deliveryIcons';
import { EASE_KAWAII } from '../../lib/utils';
import { useEscLayer } from '../../hooks/useEscLayer';
import { DeliveryCategoryPanel } from './DeliveryCategoryPanel';

export function Deliveries() {
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const cardRefs = useRef(new Map<string, HTMLButtonElement>());

  const activeCategory = deliveryCategories.find((category) => category.id === activeCategoryId) ?? null;

  const handleBack = () => {
    const previousId = activeCategoryId;
    setActiveCategoryId(null);
    requestAnimationFrame(() => {
      if (previousId) cardRefs.current.get(previousId)?.focus();
    });
  };

  useEscLayer(activeCategoryId !== null, handleBack);

  return (
    <section id="entregas" className="bg-white px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-5xl">
        {!activeCategory && (
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">Entregas</h2>
            <p className="mt-4 text-tinta-500">
              Artefatos organizados por categoria. Selecione uma pasta para ver os itens.
            </p>
          </div>
        )}

        {activeCategory ? (
          <div className="mt-4">
            <DeliveryCategoryPanel category={activeCategory} onBack={handleBack} />
          </div>
        ) : (
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {deliveryCategories.map((category, index) => {
              const Icon = getDeliveryIcon(category.icon);
              const isEmpty = category.items.length === 0;

              return (
                <motion.button
                  key={category.id}
                  ref={(el) => {
                    if (el) cardRefs.current.set(category.id, el);
                    else cardRefs.current.delete(category.id);
                  }}
                  type="button"
                  disabled={isEmpty}
                  onClick={() => setActiveCategoryId(category.id)}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-10% 0px' }}
                  transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.3), ease: EASE_KAWAII }}
                  className="group flex flex-col items-start rounded-4xl bg-creme p-6 text-left shadow-soft transition-transform duration-200 ease-kawaii enabled:hover:-translate-y-1 enabled:hover:shadow-elevated disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-rosa-600 shadow-soft">
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-tinta-800">{category.name}</h3>
                  <p className="mt-1 text-sm text-tinta-500">{category.description}</p>
                  <span className="mt-4 text-xs font-semibold uppercase tracking-wide text-rosa-600">
                    {isEmpty ? 'Em breve' : `${category.items.length} ${category.items.length === 1 ? 'item' : 'itens'}`}
                  </span>
                </motion.button>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
