/**
 * CSS Module loader configuration and export
 * 
 * This module configures style injection for CSS modules and exports
 * the CSS class name mappings (locals) for use in components.
 */

import styleInjectFn from './module_230';
import domAPI from './module_823';
import insertFn from './module_317';
import setAttributesFn from './module_38';
import insertStyleElement from './module_762';
import styleTagTransform from './module_935';
import styles from './module_781';

/**
 * Configuration options for style injection
 */
interface StyleLoaderOptions {
  /** Function to transform style tags before insertion */
  styleTagTransform: () => void;
  /** Function to set attributes on style elements */
  setAttributes: () => void;
  /** Function to insert style elements into the DOM */
  insert: (target: string) => void;
  /** DOM manipulation API */
  domAPI: () => void;
  /** Function to create and insert style elements */
  insertStyleElement: () => void;
}

/**
 * CSS module with optional locals (class name mappings)
 */
interface CSSModule {
  /** Scoped CSS class name mappings */
  locals?: Record<string, string>;
}

/**
 * Style loader configuration
 */
const loaderOptions: StyleLoaderOptions = {
  styleTagTransform: styleTagTransform,
  setAttributes: setAttributesFn,
  insert: insertFn.bind(null, 'head'),
  domAPI: domAPI,
  insertStyleElement: insertStyleElement
};

// Inject styles into the DOM with the configured options
styleInjectFn(styles, loaderOptions);

/**
 * Exported CSS class name mappings
 * Returns the scoped class names if available, otherwise undefined
 */
const cssModuleLocals: Record<string, string> | undefined = 
  styles?.locals ?? undefined;

export default cssModuleLocals;