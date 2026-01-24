/**
 * Locale configuration module for confirmation dialogs
 * Manages localization settings for Modal confirmation components
 */

/**
 * Locale configuration object for confirmation modals
 */
export interface ConfirmLocale {
  okText?: string;
  cancelText?: string;
  justOkText?: string;
  [key: string]: string | undefined;
}

/**
 * Changes the current confirmation modal locale settings
 * 
 * @param locale - New locale configuration to apply. If null/undefined, resets to default Modal locale
 * @returns void
 * 
 * @example
 *