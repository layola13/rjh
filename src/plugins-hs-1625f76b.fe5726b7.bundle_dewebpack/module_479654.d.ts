/**
 * CSS module definition for house type button component
 * 
 * This module exports CSS styles for a house type selection button with various states
 * and child elements including icons, images, badges, and notification dots.
 * 
 * @module HouseTypeButtonStyles
 */

/**
 * CSS module loader function type
 * Represents a webpack css-loader module that exports CSS content
 * 
 * @param exports - The module exports object
 * @param module - The module metadata object
 * @param cssLoaderApi - The CSS loader API function from webpack
 */
declare module '*.css' {
  /**
   * Main container for house type button
   * 
   * Features:
   * - Fixed dimensions: 105px × 108px
   * - Light gray background (#f0f2f5) with dark border
   * - Rounded corners (10px radius)
   * - Positioned relatively for absolute child elements
   * - Hover state with darker background (#DEE0E6)
   */
  export const houseTypeButton: string;

  /**
   * Content wrapper inside the button
   * 
   * Layout:
   * - Flexbox with space-between alignment
   * - Padding: 14px (top), 10px (right), 0 (bottom), 14px (left)
   * - Handles overflow for long content
   */
  export const content: string;

  /**
   * Text content area
   * 
   * Typography:
   * - 16px font size with bold weight
   * - Flexible width with overflow handling
   * - Color: #33353b (dark gray)
   */
  export const contentText: string;

  /**
   * Smart text wrapper for responsive content
   * Takes full width of parent container
   */
  export const contentTextSmart: string;

  /**
   * Tip/description text below main content
   * 
   * Styling:
   * - 6px top margin, 14px left margin
   * - Muted color: #60646F (medium gray)
   */
  export const houseTypeTip: string;

  /**
   * Icon element positioned at bottom-right
   * 
   * Position:
   * - Absolute positioning at right: 0, bottom: 0
   * - Large icon size: 50px
   */
  export const houseTypeIcon: string;

  /**
   * Image element for house type visual
   * 
   * Specifications:
   * - Absolute positioning at bottom-right corner
   * - Dimensions: 75px × 60px
   * - Rounded corners matching button style
   * - Positioned at right: 0.5px, bottom: 0.5px (accounting for border)
   */
  export const houseTypeImg: string;

  /**
   * "New" badge indicator
   * 
   * Design:
   * - Inline-block display
   * - Red background (#EB5D46)
   * - Custom border-radius: 9px 3px 9px 9px (tag-like appearance)
   * - White text, 12px size
   * - Uses AlibabaPuHuiTi-Bold font
   * - Padding: 1px (vertical), 4px (horizontal)
   */
  export const houseTypeNew: string;

  /**
   * Notification dot indicator
   * 
   * Appearance:
   * - Circular shape: 6px diameter
   * - Red background
   * - Positioned absolutely at top-right (10px from top, 8px from right)
   * - Used to indicate unread or new status
   */
  export const houseTypeDot: string;
}

/**
 * Type definition for the CSS module export structure
 */
export interface HouseTypeButtonStyles {
  /** CSS class name for the main button container */
  'house-type-button': string;
  
  /** CSS class name for the content wrapper */
  content: string;
  
  /** CSS class name for the text content area */
  'content-text': string;
  
  /** CSS class name for smart text wrapper */
  'content-text-smart': string;
  
  /** CSS class name for the tip/description text */
  'house-type-tip': string;
  
  /** CSS class name for the icon element */
  'house-type-icon': string;
  
  /** CSS class name for the image element */
  'house-type-img': string;
  
  /** CSS class name for the "new" badge */
  'house-type-new': string;
  
  /** CSS class name for the notification dot */
  'house-type-dot': string;
}

/**
 * Default export of the CSS module
 */
declare const styles: HouseTypeButtonStyles;
export default styles;