/**
 * CSS module list entry tuple structure
 * [id, css, media, sourceMap, supports, layer]
 */
type CSSModuleEntry = [
  id: string | null,
  css: string,
  media?: string,
  sourceMap?: unknown,
  supports?: string,
  layer?: string
];

/**
 * CSS module list with enhanced toString and import methods
 */
interface CSSModuleList extends Array<CSSModuleEntry> {
  /**
   * Converts the module list to a CSS string with appropriate at-rules
   * @returns Combined CSS string with @media, @supports, and @layer rules
   */
  toString(): string;

  /**
   * Imports CSS modules into the current list
   * @param modules - CSS module entries or a CSS string to import
   * @param mediaQuery - Optional media query to wrap imported modules
   * @param dedupe - Whether to deduplicate modules by ID
   * @param supportsQuery - Optional @supports condition
   * @param layer - Optional @layer name
   */
  i(
    modules: CSSModuleEntry[] | string,
    mediaQuery?: string,
    dedupe?: boolean,
    supportsQuery?: string,
    layer?: string
  ): void;
}

/**
 * Replacement function for CSS content processing
 */
type CSSReplacementFunction = (module: CSSModuleEntry) => string;

/**
 * Creates a CSS module list with enhanced functionality for managing CSS imports
 * 
 * @param replacementFunction - Function to process CSS content from module entries
 * @returns A new CSS module list with toString and import capabilities
 * 
 * @example
 * const list = cssModuleListFactory((entry) => entry[1]);
 * list.i([[null, ".class { color: red; }"]]);
 * console.log(list.toString()); // ".class { color: red; }"
 */
declare function cssModuleListFactory(
  replacementFunction: CSSReplacementFunction
): CSSModuleList;

export = cssModuleListFactory;