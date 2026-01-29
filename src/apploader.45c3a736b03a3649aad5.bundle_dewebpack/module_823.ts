interface StyleOptions {
  supports?: string;
  media?: string;
  layer?: string;
  css: string;
  sourceMap?: object;
}

interface StyleInjector {
  insertStyleElement: (injector: StyleInjector) => HTMLStyleElement;
  styleTagTransform: (css: string, element: HTMLStyleElement, options?: unknown) => void;
  options?: unknown;
}

interface StyleHandler {
  update: (options: StyleOptions) => void;
  remove: () => void;
}

export default function(injector: StyleInjector): StyleHandler {
  if (typeof document === "undefined") {
    return {
      update: function(): void {},
      remove: function(): void {}
    };
  }

  const styleElement = injector.insertStyleElement(injector);

  return {
    update: function(options: StyleOptions): void {
      applyStyles(styleElement, injector, options);
    },

    remove: function(): void {
      removeStyleElement(styleElement);
    }
  };
}

function applyStyles(
  element: HTMLStyleElement,
  injector: StyleInjector,
  options: StyleOptions
): void {
  let cssContent = "";

  if (options.supports) {
    cssContent += `@supports (${options.supports}) {`;
  }

  if (options.media) {
    cssContent += `@media ${options.media} {`;
  }

  const hasLayer = options.layer !== undefined;
  if (hasLayer) {
    const layerName = options.layer && options.layer.length > 0 ? ` ${options.layer}` : "";
    cssContent += `@layer${layerName} {`;
  }

  cssContent += options.css;

  if (hasLayer) {
    cssContent += "}";
  }

  if (options.media) {
    cssContent += "}";
  }

  if (options.supports) {
    cssContent += "}";
  }

  const sourceMap = options.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    const encodedSourceMap = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
    cssContent += `\n/*# sourceMappingURL=data:application/json;base64,${encodedSourceMap} */`;
  }

  injector.styleTagTransform(cssContent, element, injector.options);
}

function removeStyleElement(element: HTMLStyleElement): boolean {
  if (element.parentNode === null) {
    return false;
  }
  element.parentNode.removeChild(element);
  return true;
}