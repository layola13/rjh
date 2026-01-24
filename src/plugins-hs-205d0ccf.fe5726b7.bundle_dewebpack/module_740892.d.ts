/**
 * Style loader module configuration
 * Handles CSS injection and transformation for webpack bundles
 */

/**
 * Style loader API interface
 */
export interface StyleLoaderAPI {
  styleTagTransform: StyleTagTransformFunction;
  setAttributes: SetAttributesFunction;
  insert: InsertFunction;
  domAPI: DomAPIFunction;
  insertStyleElement: InsertStyleElementFunction;
}

/**
 * Function that transforms style content before injection
 */
export type StyleTagTransformFunction = () => void;

/**
 * Function that sets attributes on style elements
 */
export type SetAttributesFunction = () => void;

/**
 * Function that inserts style elements into the DOM
 * @param target - The target selector (e.g., "head")
 */
export type InsertFunction = (target: string) => void;

/**
 * DOM manipulation API function
 */
export type DomAPIFunction = () => void;

/**
 * Function that creates and inserts style elements
 */
export type InsertStyleElementFunction = () => void;

/**
 * Style module with optional locals (CSS Modules)
 */
export interface StyleModule {
  locals?: Record<string, string>;
  [key: string]: unknown;
}

/**
 * Re-exported members from the style module
 * All exports except 'default' from the source module
 */
export * from './style-module';

/**
 * Default export: CSS Module locals or undefined
 * Contains the class name mappings when CSS Modules are enabled
 */
declare const _default: Record<string, string> | undefined;
export default _default;