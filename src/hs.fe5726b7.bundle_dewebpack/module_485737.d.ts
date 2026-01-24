/**
 * CSS Module Export Type Definition
 * Module: module_485737
 * Original ID: 485737
 */

/**
 * CSS content array tuple type
 * Format: [moduleId, cssContent, sourceMap]
 */
type CSSModuleExport = [string, string, string | boolean];

/**
 * CSS loader function interface
 * @param sourceMap - Whether to include source maps
 * @returns CSS loader instance with push method
 */
interface CSSLoader {
  (sourceMap: boolean): {
    push: (content: CSSModuleExport) => void;
  };
}

/**
 * Webpack module interface
 */
interface WebpackModule {
  /** Module identifier */
  id: string;
  /** Module exports object */
  exports: unknown;
}

/**
 * CSS Module Definition
 * Contains styles for name-room-popup component including:
 * - Main container flex layout (.name-room-popup)
 * - Action button styling (.name-room-popup__action-btn)
 * - Alternative action button (.name-room-popup-action-btn)
 * - Tip image spacing (.name-room-popup__tip-img)
 * 
 * @param module - Webpack module object
 * @param exports - Module exports object (unused)
 * @param require - Webpack require function
 */
declare function moduleFactory(
  module: WebpackModule,
  exports: unknown,
  require: (moduleId: number) => CSSLoader
): void;

export default moduleFactory;

/**
 * CSS Classes exported by this module
 */
export interface NameRoomPopupStyles {
  /** Main popup container with flexbox layout */
  'name-room-popup': string;
  /** Primary action button (120x30px, blue background) */
  'name-room-popup__action-btn': string;
  /** Alternative action button with margin spacing */
  'name-room-popup-action-btn': string;
  /** Tip image container with bottom margin */
  'name-room-popup__tip-img': string;
}