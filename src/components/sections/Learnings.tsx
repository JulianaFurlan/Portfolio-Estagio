import { motion } from 'framer-motion';
import { learnings } from '../../data/content';
import { HeartDoodle } from '../decor/Kawaii';
import { EASE_KAWAII } from '../../lib/utils';

export function Learnings() {
  return (
    <section id="aprendizados" className="bg-white px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Aprendizados</h2>
          <p className="mt-4 text-tinta-500">Reflexões sobre a experiência ao longo do estágio.</p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {learnings.map((learning, index) => (
            <motion.div
              key={learning.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.5, delay: Math.min(index * 0.08, 0.3), ease: EASE_KAWAII }}
              className="rounded-4xl bg-creme p-6 shadow-soft"
            >
              <HeartDoodle className="h-5 w-5 text-rosa-400" />
              <h3 className="mt-3 text-base font-semibold text-tinta-800">{learning.title}</h3>
              <p className="mt-2 text-sm text-tinta-500">{learning.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
