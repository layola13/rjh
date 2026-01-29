interface StyleInjectorOptions {
  attributes: Record<string, string>;
  options: {
    insert?: HTMLElement | string;
  };
  insert: (element: HTMLStyleElement, options: StyleInjectorOptions['options']) => void;
  setAttributes: (element: HTMLStyleElement, attributes: Record<string, string>) => void;
}

export default function createStyleElement(options: StyleInjectorOptions): HTMLStyleElement {
  const styleElement = document.createElement("style");
  options.setAttributes(styleElement, options.attributes);
  options.insert(styleElement, options.options);
  return styleElement;
}