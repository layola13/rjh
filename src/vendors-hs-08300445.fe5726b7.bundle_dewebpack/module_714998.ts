const containerCache = new Map<HTMLElement, HTMLElement>();

const DATA_RC_ORDER = "data-rc-order";
const DATA_RC_PRIORITY = "data-rc-priority";
const DEFAULT_MARK = "rc-util-key";

type PrependType = boolean | "queue";
type OrderType = "prepend" | "prependQueue" | "append";

interface CSSOptions {
  attachTo?: HTMLElement;
  csp?: {
    nonce?: string;
  };
  prepend?: PrependType;
  priority?: number;
  mark?: string;
  styles?: HTMLStyleElement[];
}

function getMarkAttribute(options: CSSOptions = {}): string {
  const { mark } = options;
  if (!mark) return DEFAULT_MARK;
  return mark.startsWith("data-") ? mark : `data-${mark}`;
}

function getContainer(options: CSSOptions): HTMLElement {
  if (options.attachTo) {
    return options.attachTo;
  }
  return document.querySelector("head") || document.body;
}

function getStyles(container: HTMLElement): HTMLStyleElement[] {
  const cachedContainer = containerCache.get(container) || container;
  return Array.from(cachedContainer.children).filter(
    (element): element is HTMLStyleElement => element.tagName === "STYLE"
  );
}

function getOrderType(prepend: PrependType | undefined): OrderType {
  if (prepend === "queue") return "prependQueue";
  return prepend ? "prepend" : "append";
}

function isStyleElementInDocument(element: HTMLElement): boolean {
  return document.contains(element);
}

function ensureContainerCache(container: HTMLElement, options: CSSOptions): void {
  const cached = containerCache.get(container);
  if (!cached || !isStyleElementInDocument(cached)) {
    const placeholderStyle = injectCSS("", options);
    const parentNode = placeholderStyle.parentNode as HTMLElement;
    containerCache.set(container, parentNode);
    container.removeChild(placeholderStyle);
  }
}

export function injectCSS(css: string, options: CSSOptions = {}): HTMLStyleElement | null {
  if (typeof document === "undefined") return null;

  const { csp, prepend, priority = 0 } = options;
  const orderType = getOrderType(prepend);
  const isPrependQueue = orderType === "prependQueue";

  const styleElement = document.createElement("style");
  styleElement.setAttribute(DATA_RC_ORDER, orderType);

  if (isPrependQueue && priority) {
    styleElement.setAttribute(DATA_RC_PRIORITY, String(priority));
  }

  if (csp?.nonce) {
    styleElement.nonce = csp.nonce;
  }

  styleElement.innerHTML = css;

  const container = getContainer(options);
  const firstChild = container.firstChild;

  if (prepend) {
    if (isPrependQueue) {
      const existingStyles = (options.styles || getStyles(container)).filter((element) => {
        const order = element.getAttribute(DATA_RC_ORDER);
        if (!["prepend", "prependQueue"].includes(order || "")) {
          return false;
        }
        const elementPriority = Number(element.getAttribute(DATA_RC_PRIORITY) || 0);
        return priority >= elementPriority;
      });

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
  const styles = options.styles || getStyles(container);
  const markAttribute = getMarkAttribute(options);

  return styles.find((element) => element.getAttribute(markAttribute) === key);
}

export function updateCSS(css: string, key: string, options: CSSOptions = {}): HTMLStyleElement | null {
  const container = getContainer(options);
  const styles = getStyles(container);
  const mergedOptions: CSSOptions = {
    ...options,
    styles,
  };

  ensureContainerCache(container, mergedOptions);

  const existingStyle = findExistingStyle(key, mergedOptions);

  if (existingStyle) {
    if (mergedOptions.csp?.nonce && existingStyle.nonce !== mergedOptions.csp.nonce) {
      existingStyle.nonce = mergedOptions.csp.nonce;
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

  return newStyle;
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