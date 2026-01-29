interface StyleOptions {
  attributes: Record<string, string>;
  options: {
    insert?: (element: HTMLStyleElement) => void;
  };
  setAttributes: (element: HTMLStyleElement, attributes: Record<string, string>) => void;
  insert: (element: HTMLStyleElement, options: StyleOptions['options']) => void;
}

export default function createStyleElement(options: StyleOptions): HTMLStyleElement {
  const styleElement = document.createElement("style");
  
  options.setAttributes(styleElement, options.attributes);
  options.insert(styleElement, options.options);
  
  return styleElement;
}