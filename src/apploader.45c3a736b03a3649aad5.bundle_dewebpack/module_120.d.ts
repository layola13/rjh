/**
 * Style loader module configuration
 * 
 * This module configures and applies CSS styles using various style loaders.
 * It sets up the style injection mechanism and exports the CSS module's local class names.
 */

import styleInject from './module_230';
import domAPI from './module_823';
import insertFn from './module_317';
import setAttributes from './module_38';
import insertStyleElement from './module_762';
import styleTagTransform from './module_935';
import styles from './module_441';

/**
 * Configuration object for style loader
 */
interface StyleLoaderConfig {
  /** Transform function for style tags */
  styleTagTransform: () => void;
  /** Function to set attributes on style elements */
  setAttributes: () => void;
  /** Function to insert style elements into DOM */
  insert: (target: string) => void;
  /** DOM manipulation API */
  domAPI: () => void;
  /** Function to create and insert style elements */
  insertStyleElement: () => void;
}

/**
 * CSS Module locals type - maps class names to their hashed equivalents
 */
type CSSModuleLocals = Record<string, string> | undefined;

/**
 * Style module with optional locals (CSS Modules)
 */
interface StyleModule {
  /** CSS module class name mappings */
  locals?: CSSModuleLocals;
}

/** Style loader configuration */
const config: StyleLoaderConfig = {
  styleTagTransform: styleTagTransform(),
  setAttributes: setAttributes(),
  insert: insertFn().bind(null, 'head'),
  domAPI: domAPI(),
  insertStyleElement: insertStyleElement()
};

// Apply styles with configuration
styleInject()(styles, config);

/**
 * Exported CSS module locals (class name mappings)
 * Returns the hashed class names if CSS Modules are enabled, otherwise undefined
 */
const cssModuleLocals: CSSModuleLocals = styles?.locals ?? undefined;

export default cssModuleLocals;