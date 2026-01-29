interface ConfirmLocale {
  okText?: string;
  cancelText?: string;
  justOkText?: string;
  [key: string]: unknown;
}

interface LocaleData {
  Modal: ConfirmLocale;
}

const defaultLocale: LocaleData = {
  Modal: {}
};

let currentConfirmLocale: ConfirmLocale = { ...defaultLocale.Modal };

/**
 * Change the confirm dialog locale configuration
 * @param locale - The new locale configuration to merge with current settings
 */
export function changeConfirmLocale(locale?: ConfirmLocale): void {
  currentConfirmLocale = locale 
    ? { ...currentConfirmLocale, ...locale } 
    : { ...defaultLocale.Modal };
}

/**
 * Get the current confirm dialog locale configuration
 * @returns The current locale configuration
 */
export function getConfirmLocale(): ConfirmLocale {
  return currentConfirmLocale;
}