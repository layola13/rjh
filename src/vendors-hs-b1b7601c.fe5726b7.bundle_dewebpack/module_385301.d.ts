/**
 * Style injection module for dynamic CSS management
 * Handles insertion, update, and removal of style elements in the DOM
 */

/**
 * Options for style injection
 */
interface StyleInjectionOptions {
  /** CSS selector or insertion point configuration */
  insertStyleElement: (options: StyleInjectionOptions) => HTMLStyleElement;
  /** Custom transform function for style tag content */
  styleTagTransform?: (css: string, element: HTMLStyleElement, options: unknown) => void;
  /** Additional options passed to styleTagTransform */
  options?: unknown;
}

/**
 * CSS content configuration
 */
interface CSSContent {
  /** The CSS string to inject */
  css: string;
  /** Media query condition (e.g., "screen and (min-width: 768px)") */
  media?: string;
  /** CSS @supports condition */
  supports?: string;
  /** CSS @layer name */
  layer?: string;
  /** Source map for the CSS */
  sourceMap?: SourceMap;
}

/**
 * Source map structure
 */
interface SourceMap {
  version: number;
  sources: string[];
  names: string[];
  mappings: string;
  file?: string;
  sourceRoot?: string;
  sourcesContent?: string[];
}

/**
 * Style loader API
 */
interface StyleLoaderAPI {
  /** Update the injected styles with new content */
  update: (content: CSSContent) => void;
  /** Remove the injected styles from the DOM */
  remove: () => void;
}

/**
 * Creates a style loader that manages dynamic CSS injection
 * 
 * @param options - Configuration options including element insertion strategy
 * @returns API object with update and remove methods
 */
declare function createStyleLoader(options: StyleInjectionOptions): StyleLoaderAPI;

export = createStyleLoader;