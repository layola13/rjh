interface StyleInjectorOptions {
  attributes: Record<string, string>;
  options: { insert?: (element: HTMLStyleElement) => void };
  setAttributes: (element: HTMLStyleElement, attributes: Record<string, string>) => void;
  insert: (element: HTMLStyleElement, options: { insert?: (element: HTMLStyleElement) => void }) => void;
}

export default function createStyleElement(config: StyleInjectorOptions): HTMLStyleElement {
  const styleElement = document.createElement("style");
  
  config.setAttributes(styleElement, config.attributes);
  config.insert(styleElement, config.options);
  
  return styleElement;
}