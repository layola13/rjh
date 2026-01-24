/**
 * CSS module definition for popup modal styling
 * 
 * This module exports CSS styles for popup containers with modal effects.
 * Includes positioning, transforms, and transition animations.
 */

/**
 * CSS module export function type
 * @param shouldUseSourceMap - Whether to include source maps in the CSS output
 * @returns CSS loader instance with push method
 */
type CSSLoaderFunction = (shouldUseSourceMap: boolean) => CSSLoader;

/**
 * CSS Loader interface for managing CSS module content
 */
interface CSSLoader {
  /**
   * Pushes CSS content to the loader
   * @param content - Tuple containing module ID and CSS string content
   */
  push(content: [string, string]): void;
}

/**
 * Module exports interface
 */
interface ModuleExports {
  /** Module ID identifier */
  id: string;
  /** Module exports value */
  exports: CSSLoader;
}

/**
 * CSS content for popup modal components
 * 
 * Styles include:
 * - `.md-modal`: Base modal positioning (centered, fixed)
 * - `.md-effect-1`: Initial scale effect (scale 0.3)
 * - `.md-show.md-effect-1`: Show state with full scale (scale 1)
 */
declare const cssContent: string;

/**
 * Module definition function
 * @param moduleExports - Module exports object
 * @param _unused - Unused parameter (typically module require/dependencies)
 * @param cssLoaderFactory - CSS loader factory function from webpack
 */
declare function defineModule(
  moduleExports: ModuleExports,
  _unused: unknown,
  cssLoaderFactory: CSSLoaderFunction
): void;

export default defineModule;
export { CSSLoader, CSSLoaderFunction, ModuleExports, cssContent };