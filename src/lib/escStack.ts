type EscHandler = () => void;

/**
 * Pilha global de camadas que respondem a Esc (lightbox, modal, drill-down de
 * pastas). Cada camada só registra seu handler enquanto é a mais alta aberta,
 * então nunca disputam o mesmo evento e não dependem de ordem de listeners
 * nem de stopPropagation.
 */
const stack: EscHandler[] = [];

export function pushEscLayer(onClose: EscHandler) {
  stack.push(onClose);
}

export function popEscLayer(onClose: EscHandler) {
  const index = stack.lastIndexOf(onClose);
  if (index !== -1) stack.splice(index, 1);
}

export function handleEscKey() {
  const top = stack[stack.length - 1];
  top?.();
}
