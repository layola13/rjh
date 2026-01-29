export interface StyleModuleOptions {
  insertStyleElement: (options: StyleModuleOptions) => HTMLStyleElement;
  styleTagTransform: (css: string, element: HTMLStyleElement, options: StyleModuleOptions) => void;
  supports?: string;
  media?: string;
  layer?: string;
  css: string;
  sourceMap?: Record<string, unknown>;
  options?: StyleModuleOptions;
}

export interface StyleModule {
  update: (options: StyleModuleOptions) => void;
  remove: () => void;
}

export default function createStyleModule(options: StyleModuleOptions): StyleModule {
  if (typeof document === "undefined") {
    return {
      update: () => {},
      remove: () => {},
    };
  }

  const styleElement = options.insertStyleElement(options);

  return {
    update: (styleOptions: StyleModuleOptions) => {
      applyStyles(styleElement, options, styleOptions);
    },
    remove: () => {
      removeStyleElement(styleElement);
    },
  };
}

function applyStyles(
  element: HTMLStyleElement,
  moduleOptions: StyleModuleOptions,
  styleOptions: StyleModuleOptions
): void {
  let cssContent = "";

  if (styleOptions.supports) {
    cssContent += `@supports (${styleOptions.supports}) {`;
  }

  if (styleOptions.media) {
    cssContent += `@media ${styleOptions.media} {`;
  }

  const hasLayer = styleOptions.layer !== undefined;
  if (hasLayer) {
    const layerName = styleOptions.layer && styleOptions.layer.length > 0 
      ? ` ${styleOptions.layer}` 
      : "";
    cssContent += `@layer${layerName} {`;
  }

  cssContent += styleOptions.css;

  if (hasLayer) {
    cssContent += "}";
  }

  if (styleOptions.media) {
    cssContent += "}";
  }

  if (styleOptions.supports) {
    cssContent += "}";
  }

  const sourceMap = styleOptions.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    const sourceMapJson = JSON.stringify(sourceMap);
    const base64SourceMap = btoa(unescape(encodeURIComponent(sourceMapJson)));
    cssContent += `\n/*# sourceMappingURL=data:application/json;base64,${base64SourceMap} */`;
  }

  moduleOptions.styleTagTransform(cssContent, element, moduleOptions.options ?? moduleOptions);
}

function removeStyleElement(element: HTMLStyleElement): boolean {
  if (element.parentNode === null) {
    return false;
  }
  element.parentNode.removeChild(element);
  return true;
}