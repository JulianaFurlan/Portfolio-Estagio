import { useEffect, useRef } from 'react';
import { popEscLayer, pushEscLayer } from '../lib/escStack';

/** Registra `onClose` na pilha de Esc apenas enquanto `active` for verdadeiro. */
export function useEscLayer(active: boolean, onClose: () => void) {
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!active) return;
    const stableHandler = () => onCloseRef.current();
    pushEscLayer(stableHandler);
    return () => popEscLayer(stableHandler);
  }, [active]);
}
