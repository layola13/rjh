/**
 * CSS Module Export Type Definition
 * Module: module_982027
 * Original ID: 982027
 * 
 * This module exports CSS styles for a nine-patch grid component.
 * Nine-patch is a drawable graphic used for creating scalable UI elements.
 */

/**
 * CSS Module Loader Function Type
 * Represents the webpack css-loader module export function
 */
type CSSLoaderModule = (useSourceMap: boolean) => {
  push: (entry: [string, string, string]) => void;
};

/**
 * Module Export Function
 * @param exports - The module exports object
 * @param cssLoader - The CSS loader utility function from module 986380
 * @returns void
 */
declare function moduleExport(
  exports: { id: string; exports?: unknown },
  cssLoader: CSSLoaderModule,
  _context: unknown
): void;

/**
 * Nine Patch CSS Module
 * Contains styles for rendering a nine-patch grid interface component
 * 
 * CSS Classes:
 * - `.nine-patch-container`: Main container with inline-block display
 * - `.nine-patch`: Flex container for patch rows
 * - `.nine-patch-row`: Individual row in the grid (9px height)
 * - `.nine-patch-block`: Individual block cell (8x8px)
 * - `.nine-patch-block:hover`: Hover state styling
 * - `.nine-patch-block.active`: Active/selected state styling
 */
export interface NinePatchCSSModule {
  /** Module identifier */
  id: string;
  
  /** Raw CSS content as string */
  toString(): string;
}

/**
 * CSS Content exported by this module
 */
export const CSS_CONTENT: string;

export default moduleExport;