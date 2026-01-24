/**
 * CSS Module Export for HSW Button Styles
 * 
 * This module exports button styling rules for various button states and types:
 * - Normal buttons (.hsw-btn)
 * - Primary buttons (.hsw-btn-primary)
 * - Pop-style buttons (.hsw-btn-pop)
 * - Disabled buttons (.hsw-btn-disable)
 * - Small size variant (.btn-small)
 * 
 * @module HSWButtonStyles
 */

/**
 * CSS loader function signature
 * Typically used by webpack css-loader to inject styles
 * 
 * @param moduleId - The unique identifier for this CSS module
 * @returns Array containing module metadata and CSS content
 */
declare function cssLoaderExport(moduleId: string): [string, string];

/**
 * CSS Module exports interface
 * Contains the compiled CSS string for HSW button component styles
 */
declare const styles: string;

export default styles;

/**
 * Button style classes available in this module:
 * 
 * @class hsw-btn - Base button class with default styling
 * - Font size: 14px
 * - Padding: 0px 20px
 * - Border: 1px solid #c3c4c8
 * - Background: white
 * - Text color: #343a40
 * 
 * @class hsw-btn-primary - Primary action button
 * - Background color: #4d9bd6
 * - Border color: #3085c4
 * - Text color: white
 * - Hover state: #36a1f0 background
 * 
 * @class hsw-btn-pop - Pop-up style button with gradient hover effect
 * - Default: transparent border, blue text
 * - Hover: Linear gradient background (#5E96F7 to #93B8F9)
 * 
 * @class hsw-btn-disable - Disabled button state
 * - Greyed out appearance (#c3c4c8)
 * - Cursor: default (no pointer)
 * 
 * @class btn-small - Size modifier for smaller buttons
 * - Font size: 12px
 * - Padding: 0px 15px
 * 
 * @state :hover - Mouse hover state
 * @state :focus - Keyboard focus state
 * @state hsw-btn-active - Active/pressed state
 */