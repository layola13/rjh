interface StyleOptions {
  element?: HTMLElement;
}

/**
 * Applies styles to an element and returns the previous style values
 * @param styles - Object containing CSS property-value pairs to apply
 * @param options - Configuration options
 * @returns Object containing the previous style values
 */
export default function applyStyles(
  styles: Partial<CSSStyleDeclaration> | null | undefined,
  options: StyleOptions = {}
): Partial<CSSStyleDeclaration> {
  if (!styles) {
    return {};
  }

  const { element = document.body } = options;
  const previousStyles: Partial<CSSStyleDeclaration> = {};
  const styleKeys = Object.keys(styles) as Array<keyof CSSStyleDeclaration>;

  // Store previous style values
  styleKeys.forEach((key) => {
    previousStyles[key] = element.style[key] as any;
  });

  // Apply new styles
  styleKeys.forEach((key) => {
    (element.style as any)[key] = styles[key];
  });

  return previousStyles;
}