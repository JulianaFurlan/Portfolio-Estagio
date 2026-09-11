import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { aboutPillars, deliveryCategories, siteMeta, useCases } from '../../data/content';
import { EASE_KAWAII, prefersReducedMotion } from '../../lib/utils';

type CounterProps = {
  value: number;
  label: string;
};

function Counter({ value, label }: CounterProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });
  const [display, setDisplay] = useState(prefersReducedMotion() ? value : 0);

  useEffect(() => {
    if (!isInView || prefersReducedMotion()) return;
    const duration = 900;
    const start = performance.now();

    let frame: number;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setDisplay(Math.round(eased * value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isInView, value]);

  return (
    <div className="text-center">
      <p ref={ref} className="font-display text-4xl font-bold text-rosa-600 sm:text-5xl">
        {display}
      </p>
      <p className="mt-1 text-sm text-tinta-500">{label}</p>
    </div>
  );
}

const totalDeliveryItems = deliveryCategories.reduce((sum, category) => sum + category.items.length, 0);

const stats = [
  { value: useCases.length, label: 'Casos de uso mapeados' },
  { value: deliveryCategories.length, label: 'Categorias de entregas' },
  { value: totalDeliveryItems, label: 'Itens entregues' },
];

export function About() {
  return (
    <section id="sobre" className="bg-creme px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{ duration: 0.5, ease: EASE_KAWAII }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold sm:text-4xl">Sobre o estágio</h2>
          <p className="mt-4 text-tinta-500">
            {siteMeta.systemSummary} O trabalho foi desenvolvido durante o estágio{' '}
            {siteMeta.internshipModality.toLowerCase()} na {siteMeta.company}, em {siteMeta.city}.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-5 sm:grid-cols-3">
          {aboutPillars.map((pillar, index) => (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: EASE_KAWAII }}
              className="rounded-4xl bg-white p-6 shadow-soft"
            >
              <h3 className="text-lg font-semibold text-tinta-800">{pillar.title}</h3>
              <p className="mt-2 text-sm text-tinta-500">{pillar.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-3 gap-6 rounded-4xl bg-white p-8 shadow-soft">
          {stats.map((stat) => (
            <Counter key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
