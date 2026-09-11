import { useState } from 'react';
import { PlayCircle } from 'lucide-react';
import { demoContent, siteMeta } from '../../data/content';
import { YoutubeIcon } from '../decor/YoutubeIcon';

export function Demo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const hasVideo = siteMeta.youtubeVideoId.length > 0;

  return (
    <section id="demonstracao" className="bg-creme px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold sm:text-4xl">Demonstração</h2>
        <p className="mt-4 text-tinta-500">{demoContent.description}</p>

        <div className="mt-10 overflow-hidden rounded-4xl bg-white shadow-soft">
          <div className="relative aspect-video w-full bg-rosa-50">
            {isPlaying && hasVideo ? (
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube-nocookie.com/embed/${siteMeta.youtubeVideoId}?autoplay=1`}
                title={`Demonstração — ${siteMeta.systemName}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : hasVideo ? (
              <button
                type="button"
                onClick={() => setIsPlaying(true)}
                aria-label="Reproduzir vídeo de demonstração"
                className="group absolute inset-0 h-full w-full"
                style={{
                  backgroundImage: `url(https://img.youtube.com/vi/${siteMeta.youtubeVideoId}/hqdefault.jpg)`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <span className="absolute inset-0 bg-tinta-900/25 transition-colors duration-200 group-hover:bg-tinta-900/35" />
                <span className="absolute inset-0 grid place-items-center">
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-white/90 text-rosa-600 shadow-elevated transition-transform duration-200 ease-kawaii group-hover:scale-110">
                    <PlayCircle size={32} aria-hidden="true" />
                  </span>
                </span>
              </button>
            ) : (
              <div className="absolute inset-0 grid place-items-center">
                <div className="grid h-16 w-16 place-items-center rounded-full bg-white/80 text-rosa-500 shadow-soft">
                  <PlayCircle size={32} aria-hidden="true" />
                </div>
              </div>
            )}
          </div>
        </div>

        {hasVideo && (
          <a
            href={siteMeta.youtubeUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-tinta-700 shadow-soft transition-transform duration-200 ease-kawaii hover:scale-[1.03]"
          >
            <YoutubeIcon className="h-4 w-4 text-rosa-600" />
            Assistir no YouTube
          </a>
        )}
      </div>
    </section>
  );
}
