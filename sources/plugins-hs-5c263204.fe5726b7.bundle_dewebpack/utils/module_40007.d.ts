/**
 * CSS Module exports and style injection configuration
 * Handles dynamic style loading and CSS module class name mappings
 */

/**
 * Style loader configuration object
 * Contains methods for injecting and managing CSS styles in the DOM
 */
interface StyleLoaderConfig {
  /** Transforms and applies style tags to the document */
  styleTagTransform: () => void;
  /** Sets attributes on style elements */
  setAttributes: () => void;
  /** Inserts style elements into specified DOM location */
  insert: (target: string) => void;
  /** DOM manipulation API for style injection */
  domAPI: () => void;
  /** Creates and inserts style elements */
  insertStyleElement: () => void;
}

/**
 * CSS Module locals - maps CSS class names to hashed identifiers
 * Example: { button: 'button_a3f2c', container: 'container_9d8e1' }
 */
type CSSModuleLocals = Record<string, string> | undefined;

/**
 * Re-exported CSS module members (excluding 'default')
 * Provides access to any named exports from the CSS module
 */
export * from './source-module';

/**
 * Default export: CSS module class name mappings
 * Returns an object mapping original class names to their hashed versions,
 * or undefined if no locals exist
 */
declare const cssModuleExports: CSSModuleLocals;
export default cssModuleExports;