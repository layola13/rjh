/**
 * CSS Module Type Definition
 * 
 * This module exports CSS styles for a "not-remind" component with theme variations.
 * The styles include light and dark theme support with hover effects.
 */

/**
 * CSS class names available in this module
 */
export interface NotRemindStyles {
  /** Base class for not-remind element with underline text decoration and pointer cursor */
  'not-remind': string;
  /** Light theme variant with gray text color (#9b9fab) */
  light: string;
  /** Dark theme variant with semi-transparent white text color */
  black: string;
}

/**
 * CSS Module exports
 * Contains class name mappings for the not-remind component styles
 */
declare const styles: NotRemindStyles;

export default styles;

/**
 * CSS Content (for reference):
 * 
 * .not-remind {
 *   text-decoration: underline;
 *   font-size: 12px;
 *   cursor: pointer;
 *   display: inline-block;
 *   transition: color 0.2s linear;
 * }
 * 
 * .not-remind.light {
 *   color: #9b9fab;
 * }
 * 
 * .not-remind.black {
 *   color: rgba(255, 255, 255, 0.46);
 * }
 * 
 * .not-remind:hover {
 *   color: #396efe;
 * }
 */