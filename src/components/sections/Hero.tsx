import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { siteMeta } from '../../data/content';
import { EASE_KAWAII, scrollToId } from '../../lib/utils';
import { HeartDoodle, SparkleDoodle, StarDoodle } from '../decor/Kawaii';

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_KAWAII } },
};

export function Hero() {
  return (
    <section
      id="hero"
      aria-label="Apresentação"
      className="relative flex min-h-screen flex-col justify-center overflow-clip bg-gradient-rosa-radial px-5 pb-20 pt-28 sm:px-8"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-clip">
        <StarDoodle className="absolute left-[8%] top-[18%] h-6 w-6 text-rosa-300/70 sm:h-8 sm:w-8" />
        <SparkleDoodle className="absolute right-[12%] top-[28%] h-5 w-5 text-rosa-400/60" />
        <HeartDoodle className="absolute bottom-[22%] left-[14%] h-6 w-6 text-rosa-300/60" />
        <SparkleDoodle className="absolute bottom-[30%] right-[10%] h-7 w-7 text-rosa-400/50" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto flex max-w-3xl flex-col items-center text-center"
      >
        <motion.span
          variants={item}
          className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-rosa-700 shadow-soft"
        >
          <StarDoodle className="h-3.5 w-3.5 text-rosa-500" />
          {siteMeta.course} · {siteMeta.institution}
        </motion.span>

        <motion.h1
          variants={item}
          className="mt-6 text-4xl font-bold leading-tight text-tinta-900 sm:text-5xl md:text-6xl"
        >
          {siteMeta.studentName}
        </motion.h1>

        <motion.p variants={item} className="mt-3 text-lg font-medium text-rosa-700 sm:text-xl">
          {siteMeta.role}
        </motion.p>

        <motion.p variants={item} className="mt-5 max-w-xl text-balance text-base text-tinta-500 sm:text-lg">
          Portfólio do estágio {siteMeta.internshipModality.toLowerCase()} na {siteMeta.company}, com o
          desenvolvimento do {siteMeta.systemName}.
        </motion.p>

        <motion.div variants={item} className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => scrollToId('casos-de-uso')}
            className="rounded-full bg-rosa-500 px-6 py-3 text-sm font-semibold text-white shadow-glow transition-transform duration-200 ease-kawaii hover:scale-[1.03]"
          >
            Ver casos de uso
          </button>
          <button
            type="button"
            onClick={() => scrollToId('entregas')}
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-tinta-700 shadow-soft transition-transform duration-200 ease-kawaii hover:scale-[1.03]"
          >
            Ver entregas
          </button>
        </motion.div>
      </motion.div>

      <motion.button
        type="button"
        onClick={() => scrollToId('sobre')}
        aria-label="Rolar para a próxima seção"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 6, 0] }}
        transition={{
          opacity: { duration: 0.6, delay: 0.8 },
          y: { duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: 0.8 },
        }}
        className="absolute inset-x-0 bottom-6 mx-auto grid h-9 w-9 place-items-center rounded-full bg-white/80 text-rosa-600 shadow-soft sm:bottom-8"
      >
        <ChevronDown size={18} aria-hidden="true" />
      </motion.button>
    </section>
  );
}
