interface ConfirmLocale {
  okText?: string;
  cancelText?: string;
  justOkText?: string;
}

let confirmLocale: ConfirmLocale = {};

/**
 * Changes the confirmation dialog locale settings
 * @param locale - The new locale configuration to apply
 */
export function changeConfirmLocale(locale?: ConfirmLocale): void {
  confirmLocale = locale ? { ...confirmLocale, ...locale } : {};
}

/**
 * Gets the current confirmation dialog locale settings
 * @returns The current locale configuration
 */
export function getConfirmLocale(): ConfirmLocale {
  return confirmLocale;
}