/**
 * CSS Module Export Declaration
 * @module module_631637
 * @description Defines styles for the right property bar component, including pocket sections and apply button
 */

/**
 * Webpack module factory function for CSS-in-JS module
 * @param e - Module exports object
 * @param t - Module metadata (unused)
 * @param n - Webpack require function for importing dependencies
 */
declare function cssModuleFactory(
  e: { exports: unknown; id: string },
  t: unknown,
  n: (moduleId: number) => CssLoaderFunction
): void;

/**
 * CSS Loader function type
 * @description Returns a CSS loader instance that can process CSS strings
 * @param sourceMap - Whether to generate source maps
 * @returns CSS loader instance with push method
 */
interface CssLoaderFunction {
  (sourceMap: boolean): CssLoader;
}

/**
 * CSS Loader instance
 * @description Handles CSS module compilation and injection
 */
interface CssLoader {
  /**
   * Push CSS content to the loader
   * @param entry - Tuple containing module ID and CSS content
   */
  push(entry: [string, string]): void;
}

/**
 * CSS Module Content
 * @description Styles for right property bar component
 * 
 * Classes included:
 * - .rightpropertybar .pocket_top - Top pocket section with 9px margin
 * - .rightpropertybar .pocket_bottom - Bottom pocket section with 9px margin
 * - .rightpropertybar .pocket_middle - Middle pocket section with 5px margin
 * - .rightpropertybar .pocket_secondRowHdivider - Horizontal divider with 10px margin
 * - .rightpropertybar .pocket_secondRowVdivider - Vertical divider with 5px right margin
 * - .rightpropertybar .applyBtn - Apply button with hover effects (228x30px)
 * - .rightpropertybar .applyBtn .imgRightLabel - Label inside apply button
 * - .rightpropertybar .applyBtn .svgIconContainer - SVG icon container (16x16px)
 * - .rightpropertybar .applyBtn .svgWrapper svg - SVG element sizing
 * - .rightpropertybar .applyBtn:hover - Hover state with blue background (#327DFF)
 */
declare const cssContent: string;

export { cssModuleFactory as default, cssContent };