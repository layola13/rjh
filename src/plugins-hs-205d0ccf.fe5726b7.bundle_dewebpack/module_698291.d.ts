/**
 * CSS Module Export Type Definition
 * 
 * This module exports CSS styles for a remind content wrapper component.
 * Supports light and dark teaching themes.
 * 
 * @module RemindContentStyles
 */

/**
 * CSS module loader function type
 * @param sourceMaps - Whether to include source maps in the CSS output
 * @returns CSS loader instance with push method
 */
type CSSLoaderFactory = (sourceMaps: boolean) => CSSLoader;

/**
 * CSS loader interface for processing style modules
 */
interface CSSLoader {
  /**
   * Adds CSS content to the loader
   * @param content - Tuple containing module ID and CSS string
   */
  push(content: [string, string]): void;
}

/**
 * Webpack module exports interface
 */
interface ModuleExports {
  /** Module identifier */
  id: string;
  /** Module exports object */
  exports: unknown;
}

/**
 * CSS content for the remind content wrapper component
 * 
 * Styles include:
 * - Base wrapper with rounded corners and white background
 * - Light theme variant (teaching-light)
 * - Dark theme variant (teaching-black)
 */
const CSS_CONTENT = `
.remind-content-wrapper {
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  background-color: #fff;
}

.remind-content-wrapper.teaching-light {
  background-color: #fff;
}

.remind-content-wrapper.teaching-black {
  background-color: #343538;
}
`;

/**
 * Webpack module definition function
 * 
 * @param moduleExports - The module exports object
 * @param _unusedParam - Unused parameter (typically module metadata)
 * @param requireFn - Webpack require function for loading dependencies
 */
declare function webpackModule(
  moduleExports: ModuleExports,
  _unusedParam: unknown,
  requireFn: (moduleId: number) => CSSLoaderFactory
): void;

export type { CSSLoaderFactory, CSSLoader, ModuleExports };
export { CSS_CONTENT };