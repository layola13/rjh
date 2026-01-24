/**
 * Style injection module for dynamic CSS management in DOM
 * Provides functionality to inject, update, and remove style elements
 */

/**
 * Options for style insertion and transformation
 */
interface StyleInsertionOptions {
  /** Custom options passed to styleTagTransform */
  options?: Record<string, unknown>;
  /** Function to insert style element into DOM */
  insertStyleElement: (options: StyleInsertionOptions) => HTMLStyleElement;
  /** Function to transform and apply style content */
  styleTagTransform: (
    cssContent: string,
    styleElement: HTMLStyleElement,
    options?: Record<string, unknown>
  ) => void;
}

/**
 * CSS content with metadata for conditional application
 */
interface StyleContent {
  /** Raw CSS content */
  css: string;
  /** Media query condition (e.g., "screen and (min-width: 768px)") */
  media?: string;
  /** CSS @supports feature query */
  supports?: string;
  /** CSS cascade layer name */
  layer?: string;
  /** Source map for debugging */
  sourceMap?: SourceMap;
}

/**
 * Source map structure for CSS debugging
 */
interface SourceMap {
  version: number;
  sources: string[];
  names: string[];
  mappings: string;
  file?: string;
  sourcesContent?: string[];
}

/**
 * API for managing a single style injection
 */
interface StyleInjectionAPI {
  /** Update the style element with new content */
  update: (content: StyleContent) => void;
  /** Remove the style element from DOM */
  remove: () => void;
}

/**
 * Creates a style injection manager for dynamic CSS manipulation
 * 
 * @param options - Configuration including insert and transform functions
 * @returns API to update or remove the injected styles
 * 
 * @example
 *