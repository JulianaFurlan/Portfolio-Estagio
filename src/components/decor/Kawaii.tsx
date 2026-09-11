import { cn } from '../../lib/utils';

type DecorProps = {
  className?: string;
};

/** Coraçãozinho decorativo — puramente visual. */
export function HeartDoodle({ className }: DecorProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={cn('h-full w-full', className)}>
      <path
        d="M12 20.5c-.3 0-.58-.1-.8-.29-3.6-3.02-7.7-6.4-9.5-10.24C.44 7.06 1.6 3.9 4.6 3 6.6 2.4 8.7 3.2 10 4.9c.5.66 1.5.66 2 0 1.3-1.7 3.4-2.5 5.4-1.9 3 .9 4.16 4.06 2.9 6.97-1.8 3.84-5.9 7.22-9.5 10.24-.22.19-.5.29-.8.29z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Estrelinha decorativa de quatro pontas. */
export function StarDoodle({ className }: DecorProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={cn('h-full w-full', className)}>
      <path
        d="M12 2c.6 3.6 1.5 6 3.2 7.8C17 11.5 19.4 12.4 23 13c-3.6.6-6 1.5-7.8 3.2C13.5 18 12.6 20.4 12 24c-.6-3.6-1.5-6-3.2-7.8C7 14.5 4.6 13.6 1 13c3.6-.6 6-1.5 7.8-3.2C10.5 8 11.4 5.6 12 2z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Brilho/sparkle decorativo de quatro pontas fino. */
export function SparkleDoodle({ className }: DecorProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={cn('h-full w-full', className)}>
      <path
        d="M12 3c.4 2.6 1 4.4 2.2 5.6C15.4 9.9 17.2 10.5 19.8 11c-2.6.4-4.4 1-5.6 2.2C13 14.4 12.4 16.2 12 18.8c-.4-2.6-1-4.4-2.2-5.6C8.6 12 6.8 11.4 4.2 11c2.6-.4 4.4-1 5.6-2.2C11 7.6 11.6 5.8 12 3z"
        fill="currentColor"
      />
    </svg>
  );
}
