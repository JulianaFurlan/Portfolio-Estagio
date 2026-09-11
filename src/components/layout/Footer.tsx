import { Mail } from 'lucide-react';
import { siteMeta } from '../../data/content';
import { GithubIcon } from '../decor/GithubIcon';
import { scrollToId } from '../../lib/utils';

const footerSections = [
  { id: 'sobre', label: 'Sobre' },
  { id: 'casos-de-uso', label: 'Casos de uso' },
  { id: 'demonstracao', label: 'Demonstração' },
  { id: 'entregas', label: 'Entregas' },
  { id: 'testes', label: 'Testes e limitações' },
  { id: 'habilidades', label: 'Habilidades' },
  { id: 'aprendizados', label: 'Aprendizados' },
  { id: 'contato', label: 'Contato' },
];

export function Footer() {
  return (
    <footer className="border-t border-rosa-100 bg-white">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div className="max-w-sm">
            <p className="font-display text-lg font-bold text-tinta-800">{siteMeta.studentName}</p>
            <p className="mt-2 text-sm text-tinta-500">
              {siteMeta.role} · {siteMeta.institution}
            </p>
            <p className="mt-1 text-sm text-tinta-500">{siteMeta.internshipModality}</p>
          </div>

          <nav aria-label="Navegação do rodapé">
            <ul className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
              {footerSections.map((section) => (
                <li key={section.id}>
                  <button
                    type="button"
                    onClick={() => scrollToId(section.id)}
                    className="text-tinta-500 transition-colors hover:text-rosa-700"
                  >
                    {section.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex gap-3">
            <a
              href={siteMeta.githubUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Abrir perfil no GitHub"
              className="grid h-11 w-11 place-items-center rounded-full bg-rosa-50 text-tinta-700 transition-colors hover:bg-rosa-100 hover:text-rosa-700"
            >
              <GithubIcon className="h-5 w-5" />
            </a>
            <a
              href={`mailto:${siteMeta.contactEmail}`}
              aria-label="Enviar e-mail"
              className="grid h-11 w-11 place-items-center rounded-full bg-rosa-50 text-tinta-700 transition-colors hover:bg-rosa-100 hover:text-rosa-700"
            >
              <Mail size={20} aria-hidden="true" />
            </a>
          </div>
        </div>

        <p className="mt-10 text-center text-xs text-tinta-400">
          {siteMeta.systemName} · Portfólio de estágio produzido para {siteMeta.institution}.
        </p>
      </div>
    </footer>
  );
}
