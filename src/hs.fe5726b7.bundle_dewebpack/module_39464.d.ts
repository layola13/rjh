/**
 * Style loader module that handles CSS injection and management
 * @module StyleLoaderModule
 */

/**
 * Configuration options for style injection
 */
interface StyleLoaderOptions {
  /** Transform function for style tags */
  styleTagTransform: () => void;
  /** Function to set attributes on style elements */
  setAttributes: () => void;
  /** Function to insert style elements into DOM */
  insert: (target: string) => void;
  /** DOM API handler for style manipulation */
  domAPI: () => void;
  /** Function to insert style element into document */
  insertStyleElement: () => void;
}

/**
 * CSS module locals containing class name mappings
 */
interface CSSModuleLocals {
  [className: string]: string;
}

/**
 * Style loader function that processes and injects CSS
 */
type StyleLoaderFunction = () => {
  /** Local class name mappings for CSS modules */
  locals?: CSSModuleLocals;
};

/**
 * Re-exported CSS module members (excluding default export)
 */
export * from './styles';

/**
 * Default export containing CSS module locals or undefined
 * Represents the processed CSS module with its class name mappings
 */
declare const cssModuleExport: CSSModuleLocals | undefined;

export default cssModuleExport;