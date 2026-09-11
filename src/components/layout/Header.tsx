import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { navItems, siteMeta } from '../../data/content';
import { useActiveSection } from '../../hooks/useActiveSection';
import { cn, scrollToId } from '../../lib/utils';

const sectionIds = navItems.map((item) => item.id);

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const activeId = useActiveSection(sectionIds);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  const handleNavigate = (id: string) => {
    setIsOpen(false);
    scrollToId(id);
  };

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-kawaii',
        isScrolled ? 'bg-creme/95 shadow-soft backdrop-blur-sm' : 'bg-transparent',
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleNavigate('hero');
          }}
          className="font-display text-lg font-bold text-tinta-800"
        >
          {siteMeta.studentName.split(' ')[0]}
          <span className="text-rosa-600">.</span>
        </a>

        <nav aria-label="Navegação principal" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigate(item.id);
                  }}
                  aria-current={activeId === item.id ? 'true' : undefined}
                  className={cn(
                    'relative rounded-full px-4 py-2 text-sm font-medium text-tinta-600 transition-colors duration-200 hover:text-rosa-700',
                    activeId === item.id && 'text-rosa-700',
                  )}
                >
                  {item.label}
                  {activeId === item.id && (
                    <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-rosa-500" />
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-controls="menu-mobile"
          aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
          className="grid h-10 w-10 place-items-center rounded-full bg-white text-tinta-700 shadow-soft transition-transform duration-200 ease-kawaii hover:scale-105 md:hidden"
        >
          {isOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </div>

      {isOpen && (
        <nav
          id="menu-mobile"
          aria-label="Navegação mobile"
          className="border-t border-rosa-100 bg-creme px-5 pb-6 pt-2 md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigate(item.id);
                  }}
                  aria-current={activeId === item.id ? 'true' : undefined}
                  className={cn(
                    'block rounded-2xl px-4 py-3 text-base font-medium text-tinta-700 transition-colors',
                    activeId === item.id && 'bg-rosa-100 text-rosa-700',
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
