/**
 * Enterprise AI Moodboard Page Styles Module
 * 
 * This module exports CSS styles for the enterprise AI moodboard page component.
 * It defines the layout and styling rules for the main page container.
 * 
 * @module enterprise-ai-moodboard-page-styles
 */

/**
 * CSS Module exports for the enterprise AI moodboard page.
 * Contains styling definitions that set the page to full height.
 */
declare const styles: {
  /** Main container class for the enterprise AI moodboard page */
  readonly 'enterprise-ai-moodboard-page': string;
};

export default styles;

/**
 * CSS class names available in this module
 */
export type EnterpriseAIMoodboardPageStyles = typeof styles;

/**
 * Individual style class identifier
 */
export type StyleClassName = keyof EnterpriseAIMoodboardPageStyles;