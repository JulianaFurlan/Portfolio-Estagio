import { useEffect, useRef, useState } from 'react';

/**
 * Determina a seção ativa pelo critério "quem ocupa mais viewport agora",
 * em vez de checar quando o topo cruza uma faixa fixa — isso evita que
 * seções curtas pareçam "quebradas" perto do fim do scroll.
 */
export function useActiveSection(sectionIds: string[]) {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? '');
  const ratios = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.current.set(entry.target.id, entry.intersectionRatio);
        }

        let bestId = activeId;
        let bestRatio = -1;
        for (const id of sectionIds) {
          const ratio = ratios.current.get(id) ?? 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        }
        if (bestRatio > 0) setActiveId(bestId);
      },
      {
        threshold: Array.from({ length: 21 }, (_, i) => i / 20),
        rootMargin: '-64px 0px 0px 0px',
      },
    );

    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionIds.join(',')]);

  return activeId;
}
