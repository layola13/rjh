/**
 * Locale configuration module for confirmation modals
 * Manages internationalization settings for modal dialogs
 */

/**
 * Locale configuration interface for confirmation modals
 * Contains all translatable strings and regional settings
 */
export interface ConfirmLocale {
  /** Text for the OK/Confirm button */
  okText?: string;
  /** Text for the Cancel button */
  cancelText?: string;
  /** Text for the confirmation title */
  justOkText?: string;
  /** Additional locale-specific properties */
  [key: string]: string | undefined;
}

/**
 * Updates the global locale configuration for confirmation modals
 * Merges provided locale settings with existing configuration
 * 
 * @param locale - Partial locale configuration to merge, or null/undefined to reset to default
 * @returns void
 * 
 * @example
 *