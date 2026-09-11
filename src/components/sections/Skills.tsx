import { useRef, useState } from 'react';
import { skills, type SkillItem } from '../../data/content';

type MarqueeRowProps = {
  items: SkillItem[];
  direction: 'forward' | 'reverse';
};

function MarqueeRow({ items, direction }: MarqueeRowProps) {
  const hoverCount = useRef(0);
  const [isPaused, setIsPaused] = useState(false);

  const handleEnter = () => {
    hoverCount.current += 1;
    setIsPaused(true);
  };

  const handleLeave = () => {
    hoverCount.current = Math.max(0, hoverCount.current - 1);
    if (hoverCount.current === 0) setIsPaused(false);
  };

  const doubled = [...items, ...items];

  return (
    <div
      className="relative overflow-hidden"
      style={{
        WebkitMaskImage:
          'linear-gradient(to right, transparent 0, black 8%, black 92%, transparent 100%)',
        maskImage: 'linear-gradient(to right, transparent 0, black 8%, black 92%, transparent 100%)',
      }}
    >
      <div
        className={direction === 'forward' ? 'flex w-max animate-marquee gap-3' : 'flex w-max animate-marquee-reverse gap-3'}
        style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
      >
        {doubled.map((skill, index) => (
          <span
            key={`${skill.name}-${index}`}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            className="flex-none rounded-full bg-white px-5 py-2.5 text-sm font-medium text-tinta-700 shadow-soft"
          >
            {skill.name}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Skills() {
  const hardSkills = skills.filter((skill) => skill.track === 'hard');
  const softSkills = skills.filter((skill) => skill.track === 'soft');

  return (
    <section id="habilidades" className="overflow-clip bg-creme px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-bold sm:text-4xl">Habilidades</h2>
        <p className="mt-4 text-tinta-500">Competências técnicas e comportamentais exercitadas no estágio.</p>
      </div>

      <div className="mx-auto mt-12 flex max-w-5xl flex-col gap-4">
        <MarqueeRow items={hardSkills} direction="forward" />
        <MarqueeRow items={softSkills} direction="reverse" />
      </div>
    </section>
  );
}
