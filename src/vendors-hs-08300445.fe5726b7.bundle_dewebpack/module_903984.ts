interface Size {
  width: number;
  height: number;
}

interface Offset {
  left: number;
  top: number;
}

interface Scroll {
  scrollLeft: number;
  scrollTop: number;
}

const DIMENSION_PATTERN = /margin|padding|width|height|max|min|offset/;

const POSITIONED_PROPERTIES: Record<string, boolean> = {
  left: true,
  top: true
};

const FLOAT_ALIASES: Record<string, number> = {
  cssFloat: 1,
  styleFloat: 1,
  float: 1
};

function getComputedStyleObject(element: HTMLElement): CSSStyleDeclaration | Record<string, never> {
  return element.nodeType === 1 
    ? element.ownerDocument.defaultView!.getComputedStyle(element, null) 
    : {};
}

function normalizePropertyName(element: HTMLElement, property: string): string {
  return FLOAT_ALIASES[property] 
    ? ('cssFloat' in element.style ? 'cssFloat' : 'styleFloat') 
    : property;
}

function getPropertyValue(
  element: HTMLElement, 
  property: string, 
  computedValue: string
): string | number {
  const lowerProperty = property.toLowerCase();
  
  if (computedValue === 'auto') {
    if (lowerProperty === 'height') return element.offsetHeight;
    if (lowerProperty === 'width') return element.offsetWidth;
  }

  if (!(lowerProperty in POSITIONED_PROPERTIES)) {
    POSITIONED_PROPERTIES[lowerProperty] = DIMENSION_PATTERN.test(lowerProperty);
  }

  return POSITIONED_PROPERTIES[lowerProperty] 
    ? parseFloat(computedValue) || 0 
    : computedValue;
}

export function get(element: HTMLElement, property: string): CSSStyleDeclaration;
export function get(element: HTMLElement, property: string, returnComputed: true): string | number;
export function get(element: HTMLElement, property?: string): CSSStyleDeclaration | string | number {
  const computedStyle = getComputedStyleObject(element);
  
  if (!property) {
    return computedStyle;
  }

  const normalizedProperty = normalizePropertyName(element, property);
  const computedValue = (computedStyle as CSSStyleDeclaration)[normalizedProperty as keyof CSSStyleDeclaration] as string 
    || element.style[normalizedProperty as keyof CSSStyleDeclaration];

  return getPropertyValue(element, normalizedProperty, computedValue as string);
}

export function set(element: HTMLElement, property: string, value: string | number): string | number;
export function set(element: HTMLElement, styles: Record<string, string | number>): CSSStyleDeclaration;
export function set(
  element: HTMLElement, 
  propertyOrStyles: string | Record<string, string | number>, 
  value?: string | number
): string | number | CSSStyleDeclaration {
  if (typeof propertyOrStyles === 'string' && value !== undefined) {
    const normalizedProperty = normalizePropertyName(element, propertyOrStyles);
    let finalValue = value;

    if (typeof value === 'number' && DIMENSION_PATTERN.test(normalizedProperty)) {
      finalValue = `${value}px`;
    }

    element.style[normalizedProperty as keyof CSSStyleDeclaration] = finalValue as string;
    return finalValue;
  }

  const styles = propertyOrStyles as Record<string, string | number>;
  for (const key in styles) {
    if (styles.hasOwnProperty(key)) {
      set(element, key, styles[key]);
    }
  }

  return getComputedStyleObject(element) as CSSStyleDeclaration;
}

export function getClientSize(): Size {
  const width = document.documentElement.clientWidth;
  const height = window.innerHeight || document.documentElement.clientHeight;

  return { width, height };
}

export function getDocSize(): Size {
  const width = Math.max(
    document.documentElement.scrollWidth, 
    document.body.scrollWidth
  );
  const height = Math.max(
    document.documentElement.scrollHeight, 
    document.body.scrollHeight
  );

  return { width, height };
}

export function getOffset(element: HTMLElement): Offset {
  const rect = element.getBoundingClientRect();
  const docElement = document.documentElement;

  return {
    left: rect.left + (window.pageXOffset || docElement.scrollLeft) - (docElement.clientLeft || document.body.clientLeft || 0),
    top: rect.top + (window.pageYOffset || docElement.scrollTop) - (docElement.clientTop || document.body.clientTop || 0)
  };
}

export function getOuterHeight(element: HTMLElement): number {
  if (element === document.body) {
    return window.innerHeight || document.documentElement.clientHeight;
  }
  return element.offsetHeight;
}

export function getOuterWidth(element: HTMLElement): number {
  if (element === document.body) {
    return document.documentElement.clientWidth;
  }
  return element.offsetWidth;
}

export function getScroll(): Scroll {
  return {
    scrollLeft: Math.max(document.documentElement.scrollLeft, document.body.scrollLeft),
    scrollTop: Math.max(document.documentElement.scrollTop, document.body.scrollTop)
  };
}