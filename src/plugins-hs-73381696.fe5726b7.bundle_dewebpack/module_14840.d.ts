/**
 * CSS Module Export Type Definition
 * Module: module_14840
 * Original ID: 14840
 * 
 * This module exports CSS styles for the right property bar component,
 * specifically for kitchen feature editing UI elements and molding styles.
 */

/**
 * CSS module loader function signature
 * @param exports - The module exports object
 * @param require - The require function for loading dependencies
 * @param moduleLoader - The CSS loader function from webpack
 */
declare module 'module_14840' {
  /**
   * CSS content array structure returned by the CSS loader
   * Format: [moduleId, cssContent, sourceMap?]
   */
  type CSSModuleContent = [string, string, any?];

  /**
   * CSS loader function that processes CSS content
   * @param sourceMap - Whether to include source maps (false in this case)
   * @returns Object with push method for adding CSS content
   */
  interface CSSLoader {
    (sourceMap: boolean): {
      /**
       * Adds CSS content to the module
       * @param content - Array containing module ID and CSS string
       */
      push(content: CSSModuleContent): void;
    };
  }

  /**
   * Module exports containing processed CSS styles for:
   * - .editFeatureWallBtn: Button for editing feature walls
   * - .kitchen_moldingBaseTop: Top molding base styling
   * - .kitchen_moldingBaseBottom: Bottom molding base styling
   * - .kitchen_moldingCorniceTop: Top cornice molding styling
   * - .kitchen_moldingCorniceBottom: Bottom cornice molding styling
   * - .kitchen_styleRowTop: Top style row spacing
   * - .kitchen_styleFirstRow: First row spacing
   * - .kitchen_styleSecondRow: Second row spacing
   * - .kitchen_styleRowBottom: Bottom style row spacing
   * - .kitchen_thirdRow: Third row spacing
   * - .molding-base-v-divider: Vertical divider for molding base
   */
  const content: CSSModuleContent;
  export default content;
}