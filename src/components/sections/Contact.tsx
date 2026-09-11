import { useState } from 'react';
import { Copy, Mail } from 'lucide-react';
import { siteMeta } from '../../data/content';
import { GithubIcon } from '../decor/GithubIcon';

export function Contact() {
  const [copyMessage, setCopyMessage] = useState('');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(siteMeta.contactEmail);
      setCopyMessage('E-mail copiado para a área de transferência.');
    } catch {
      setCopyMessage('Não foi possível copiar o e-mail automaticamente.');
    }
  };

  return (
    <section id="contato" className="bg-creme px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold sm:text-4xl">Contato</h2>
        <p className="mt-4 text-tinta-500">Fico à disposição para conversar sobre o projeto e o estágio.</p>

        <div className="mt-10 rounded-4xl bg-white p-8 shadow-soft">
          <p className="select-all break-all text-base font-medium text-tinta-800">{siteMeta.contactEmail}</p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${siteMeta.contactEmail}`}
              className="inline-flex items-center gap-2 rounded-full bg-rosa-500 px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition-transform duration-200 ease-kawaii hover:scale-[1.03]"
            >
              <Mail size={16} aria-hidden="true" />
              Enviar e-mail
            </a>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-2 rounded-full bg-rosa-50 px-5 py-2.5 text-sm font-semibold text-rosa-700 transition-transform duration-200 ease-kawaii hover:scale-[1.03]"
            >
              <Copy size={16} aria-hidden="true" />
              Copiar e-mail
            </button>
            <a
              href={siteMeta.githubUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Abrir perfil no GitHub"
              className="grid h-11 w-11 place-items-center rounded-full bg-rosa-50 text-tinta-700 transition-transform duration-200 ease-kawaii hover:scale-[1.05] hover:text-rosa-700"
            >
              <GithubIcon className="h-5 w-5" />
            </a>
          </div>

          <p aria-live="polite" className="mt-4 min-h-[1.25rem] text-sm text-rosa-700">
            {copyMessage}
          </p>
        </div>
      </div>
    </section>
  );
}
