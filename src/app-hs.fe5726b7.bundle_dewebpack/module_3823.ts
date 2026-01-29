export default function createStyleInjector(options: StyleInjectorOptions): StyleInjector {
  if (typeof document === "undefined") {
    return {
      update: function(): void {},
      remove: function(): void {}
    };
  }

  const styleElement = options.insertStyleElement(options);

  return {
    update: function(styleConfig: StyleConfig): void {
      applyStylesToElement(styleElement, options, styleConfig);
    },
    remove: function(): void {
      removeStyleElement(styleElement);
    }
  };
}

interface StyleInjectorOptions {
  insertStyleElement: (options: StyleInjectorOptions) => HTMLElement;
  styleTagTransform: (css: string, element: HTMLElement, options: StyleInjectorOptions) => void;
  options?: unknown;
}

interface StyleConfig {
  css: string;
  supports?: string;
  media?: string;
  layer?: string;
  sourceMap?: Record<string, unknown>;
}

interface StyleInjector {
  update: (config?: StyleConfig) => void;
  remove: () => void;
}

function applyStylesToElement(
  element: HTMLElement,
  options: StyleInjectorOptions,
  styleConfig: StyleConfig
): void {
  let cssContent = "";

  if (styleConfig.supports) {
    cssContent += `@supports (${styleConfig.supports}) {`;
  }

  if (styleConfig.media) {
    cssContent += `@media ${styleConfig.media} {`;
  }

  const hasLayer = styleConfig.layer !== undefined;
  if (hasLayer) {
    const layerName = styleConfig.layer && styleConfig.layer.length > 0 
      ? ` ${styleConfig.layer}` 
      : "";
    cssContent += `@layer${layerName} {`;
  }

  cssContent += styleConfig.css;

  if (hasLayer) {
    cssContent += "}";
  }

  if (styleConfig.media) {
    cssContent += "}";
  }

  if (styleConfig.supports) {
    cssContent += "}";
  }

  const sourceMap = styleConfig.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    const sourceMapJson = JSON.stringify(sourceMap);
    const encodedSourceMap = btoa(unescape(encodeURIComponent(sourceMapJson)));
    cssContent += `\n/*# sourceMappingURL=data:application/json;base64,${encodedSourceMap} */`;
  }

  options.styleTagTransform(cssContent, element, options.options);
}

function removeStyleElement(element: HTMLElement): boolean {
  if (element.parentNode === null) {
    return false;
  }
  element.parentNode.removeChild(element);
  return true;
}