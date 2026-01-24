/**
 * CSS Module Declaration
 * 
 * This module exports CSS styles for a feedback switch component.
 * The styles include layout properties and theme variants (e.g., dark theme).
 * 
 * @module FeedbackSwitchStyles
 */

/**
 * CSS class names exported by this module
 */
export interface FeedbackSwitchStyles {
  /**
   * Main container for the feedback switch block
   * - Uses flexbox layout
   * - Centers items vertically
   * - Distributes space between child elements
   */
  'feedback-switch-block': string;

  /**
   * Dark theme variant modifier for the feedback switch
   * - Applies white text color with 86% opacity to checkbox labels
   */
  'feedback-black': string;

  /**
   * Container for checkbox elements
   */
  'check-box-container': string;

  /**
   * Checkbox input element
   */
  'check-box': string;
}

/**
 * Default export of the CSS module
 * Contains the class name mappings for the feedback switch component
 */
declare const styles: FeedbackSwitchStyles;

export default styles;