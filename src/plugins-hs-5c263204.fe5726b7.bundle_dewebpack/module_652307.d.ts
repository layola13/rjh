/**
 * CSS Module Declaration
 * 
 * This module exports CSS styles for feedback block components.
 * Supports both default (white) and dark theme variants.
 * 
 * @module FeedbackBlockStyles
 */

/**
 * CSS class names available in this module
 */
export interface FeedbackBlockStyles {
  /**
   * Main wrapper for feedback blocks
   * - Full width display block
   * - White background with subtle shadow
   * - 8px border radius for rounded corners
   * - 20px vertical and 18px horizontal padding
   */
  'feedback-block-wrapper': string;

  /**
   * Dark theme variant modifier
   * - Semi-transparent white background (10% opacity)
   * - Applied in combination with 'feedback-block-wrapper'
   */
  'feedback-black': string;
}

/**
 * Default export of CSS module styles
 */
declare const styles: FeedbackBlockStyles;
export default styles;

/**
 * CSS Content (for reference):
 * 
 * .feedback-block-wrapper {
 *   display: block;
 *   width: 100%;
 *   background: #FFFFFF;
 *   box-shadow: 0 2px 50px 0 rgba(0, 0, 0, 0.03);
 *   border-radius: 8px;
 *   padding: 20px 18px;
 * }
 * 
 * .feedback-block-wrapper.feedback-black {
 *   background: rgba(255, 255, 255, 0.1);
 * }
 */