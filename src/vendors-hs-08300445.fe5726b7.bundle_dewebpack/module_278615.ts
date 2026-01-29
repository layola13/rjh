const ATTR_ORDER = 'data-rc-order';
const ATTR_PRIORITY = 'data-rc-priority';
const DEFAULT_KEY = 'rc-util-key';

const containerCache = new Map<HTMLElement, HTMLElement>();

interface CSSOptions {
  mark?: string;
  prepend?: boolean | 'queue';
  priority?: number;
  attachTo?: HTMLElement;
  csp?: {
    nonce?: string;
  };
  styles?: HTMLStyleElement[];
}

type OrderType = 'prepend' | 'prependQueue' | 'append';

function getMarkAttribute(options: CSSOptions = {}): string {
  const { mark } = options;
  if (!mark) return DEFAULT_KEY;
  return mark.startsWith('data-') ? mark : `data-${mark}`;
}

function getContainer(options: CSSOptions): HTMLElement {
  if (options.attachTo) {
    return options.attachTo;
  }
  return document.querySelector('head') || document.body;
}

function getStyleElements(container: HTMLElement): HTMLStyleElement[] {
  const cachedContainer = containerCache.get(container) || container;
  return Array.from(cachedContainer.children).filter(
    (element): element is HTMLStyleElement => element.tagName === 'STYLE'
  );
}

function isClient(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

function isElementInDocument(doc: Document, element: HTMLElement): boolean {
  return doc.contains(element);
}

function getOrderType(prepend?: boolean | 'queue'): OrderType {
  if (prepend === 'queue') return 'prependQueue';
  return prepend ? 'prepend' : 'append';
}

export function injectCSS(css: string, options: CSSOptions = {}): HTMLStyleElement | null {
  if (!isClient()) return null;

  const { csp, prepend, priority = 0 } = options;
  const orderType = getOrderType(prepend);
  const isQueue = orderType === 'prependQueue';

  const styleElement = document.createElement('style');
  styleElement.setAttribute(ATTR_ORDER, orderType);

  if (isQueue && priority) {
    styleElement.setAttribute(ATTR_PRIORITY, String(priority));
  }

  if (csp?.nonce) {
    styleElement.nonce = csp.nonce;
  }

  styleElement.innerHTML = css;

  const container = getContainer(options);
  const firstChild = container.firstChild;

  if (prepend) {
    if (isQueue) {
      const existingStyles = (options.styles || getStyleElements(container)).filter(
        (element) => {
          const order = element.getAttribute(ATTR_ORDER);
          if (!['prepend', 'prependQueue'].includes(order ?? '')) {
            return false;
          }
          const elementPriority = Number(element.getAttribute(ATTR_PRIORITY) || 0);
          return priority >= elementPriority;
        }
      );

      if (existingStyles.length) {
        const lastMatch = existingStyles[existingStyles.length - 1];
        container.insertBefore(styleElement, lastMatch.nextSibling);
        return styleElement;
      }
    }
    container.insertBefore(styleElement, firstChild);
  } else {
    container.appendChild(styleElement);
  }

  return styleElement;
}

function findExistingStyle(key: string, options: CSSOptions = {}): HTMLStyleElement | undefined {
  const container = getContainer(options);
  const styles = options.styles || getStyleElements(container);
  const markAttr = getMarkAttribute(options);

  return styles.find((element) => element.getAttribute(markAttr) === key);
}

function ensureContainerCache(container: HTMLElement, options: CSSOptions): void {
  const cachedContainer = containerCache.get(container);

  if (!cachedContainer || !isElementInDocument(document, cachedContainer)) {
    const placeholder = injectCSS('', options);
    if (placeholder) {
      const parentNode = placeholder.parentNode as HTMLElement;
      containerCache.set(container, parentNode);
      parentNode.removeChild(placeholder);
    }
  }
}

export function updateCSS(css: string, key: string, options: CSSOptions = {}): HTMLStyleElement {
  const container = getContainer(options);
  const styles = getStyleElements(container);
  const mergedOptions: CSSOptions = { ...options, styles };

  ensureContainerCache(container, mergedOptions);

  const existingStyle = findExistingStyle(key, mergedOptions);

  if (existingStyle) {
    const { csp } = mergedOptions;
    if (csp?.nonce && existingStyle.nonce !== csp.nonce) {
      existingStyle.nonce = csp.nonce;
    }

    if (existingStyle.innerHTML !== css) {
      existingStyle.innerHTML = css;
    }

    return existingStyle;
  }

  const newStyle = injectCSS(css, mergedOptions);
  if (newStyle) {
    newStyle.setAttribute(getMarkAttribute(mergedOptions), key);
  }

  return newStyle!;
}

export function removeCSS(key: string, options: CSSOptions = {}): void {
  const existingStyle = findExistingStyle(key, options);
  if (existingStyle) {
    const container = getContainer(options);
    container.removeChild(existingStyle);
  }
}

export function clearContainerCache(): void {
  containerCache.clear();
}