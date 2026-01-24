/**
 * CSS Module Declaration
 * 
 * This module exports CSS styles for user information components.
 * Originally compiled from a CSS/SCSS file and injected via style-loader.
 */

/**
 * CSS class names exported by this module
 */
export interface CSSModuleClasses {
  /**
   * Base styling for user information container
   * Applies a 45-degree linear gradient background from red to blue
   */
  'user-info-base': string;

  /**
   * Container for expiration time description
   * Uses flexbox layout with white text color
   */
  'expire-time-desc': string;

  /**
   * Time description text within the expiration time container
   * Applies left margin spacing
   */
  'time-desc': string;
}

/**
 * CSS module exports
 * Can be imported and used as className values in React/TypeScript components
 */
declare const styles: CSSModuleClasses;

export default styles;