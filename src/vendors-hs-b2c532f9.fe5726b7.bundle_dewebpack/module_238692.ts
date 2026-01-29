import { add } from './module_436476';
import { default as initializeInstance } from './module_391564';
import { clickRail } from './module_850300';
import { dragScrollbar } from './module_5578';
import { keyboard } from './module_437702';
import { wheel } from './module_890562';
import { touch } from './module_19044';
import { selection } from './module_224097';
import { update } from './module_732184';

interface ScrollbarSettings {
  theme: string;
  handlers: string[];
}

interface ScrollbarInstance {
  settings: ScrollbarSettings;
}

type HandlerFunction = (element: HTMLElement) => void;

const handlers: Record<string, HandlerFunction> = {
  'click-rail': clickRail,
  'drag-scrollbar': dragScrollbar,
  keyboard,
  wheel,
  touch,
  selection
};

function getType(value: unknown): string {
  return typeof value;
}

export default function initializePerfectScrollbar(
  element: HTMLElement,
  options?: ScrollbarSettings | unknown
): void {
  element.classList.add('ps');

  const instance: ScrollbarInstance = add(
    element,
    getType(options) === 'object' ? (options as ScrollbarSettings) : {}
  );

  element.classList.add(`ps--theme_${instance.settings.theme}`);

  instance.settings.handlers.forEach((handlerName: string) => {
    handlers[handlerName](element);
  });

  update(element);
  initializeInstance(element);
}