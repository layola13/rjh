/**
 * CSS Module Export
 * Webpack CSS loader module that exports stylesheet content
 * Original Module ID: 633936
 */

/**
 * CSS loader module function signature
 * @param exports - Module exports object to be populated
 * @param cssLoaderApi - CSS loader API (typically from module 986380)
 * @param loaderContext - Webpack loader context
 */
declare module 'module_633936' {
  /**
   * CSS content for right property bar door stone styles
   * Contains styling for:
   * - .rightpropertybar .doorStone_Top - Top door stone margin
   * - .rightpropertybar .doorStone_Bottom - Bottom door stone margin
   * - .rightpropertybar .react-radio .react-radio-btn .stone-fill - Stone fill width
   */
  const cssContent: string;
  
  export default cssContent;
}

/**
 * CSS Module Styles Interface
 * Represents the CSS classes exported by this module
 */
interface DoorStoneStyles {
  /** Top door stone container with 9px top margin */
  doorStone_Top: string;
  
  /** Bottom door stone container with 9px top margin */
  doorStone_Bottom: string;
  
  /** Stone fill element with 40px width inside radio button */
  'stone-fill': string;
}

/**
 * Typed CSS Module Export
 * Use this for type-safe CSS class name references
 */
declare const styles: DoorStoneStyles;

export default styles;