/**
 * Locale configuration interface for date picker component
 */
interface LocaleConfig {
  /** Language-specific translations */
  lang: {
    /** Default placeholder text */
    placeholder?: string;
    /** Placeholder for year picker */
    yearPlaceholder?: string;
    /** Placeholder for quarter picker */
    quarterPlaceholder?: string;
    /** Placeholder for month picker */
    monthPlaceholder?: string;
    /** Placeholder for week picker */
    weekPlaceholder?: string;
    /** Default placeholder for range picker */
    rangePlaceholder?: [string, string];
    /** Placeholder for year range picker */
    rangeYearPlaceholder?: [string, string];
    /** Placeholder for month range picker */
    rangeMonthPlaceholder?: [string, string];
    /** Placeholder for week range picker */
    rangeWeekPlaceholder?: [string, string];
  };
  /** Time picker locale configuration */
  timePickerLocale: {
    /** Placeholder for time picker */
    placeholder?: string;
    /** Placeholder for time range picker */
    rangePlaceholder?: [string, string];
  };
}

/**
 * Picker type for determining placeholder text
 */
type PickerType = 'year' | 'quarter' | 'month' | 'week' | 'time' | 'date';

/**
 * Get placeholder text for single picker based on picker type and locale
 * @param pickerType - The type of picker (year, quarter, month, week, time, date)
 * @param locale - Locale configuration object
 * @param customPlaceholder - Optional custom placeholder to override defaults
 * @returns Placeholder text string
 */
export function getPlaceholder(
  pickerType: PickerType,
  locale: LocaleConfig,
  customPlaceholder?: string
): string | undefined {
  if (customPlaceholder !== undefined) {
    return customPlaceholder;
  }

  if (pickerType === 'year' && locale.lang.yearPlaceholder) {
    return locale.lang.yearPlaceholder;
  }

  if (pickerType === 'quarter' && locale.lang.quarterPlaceholder) {
    return locale.lang.quarterPlaceholder;
  }

  if (pickerType === 'month' && locale.lang.monthPlaceholder) {
    return locale.lang.monthPlaceholder;
  }

  if (pickerType === 'week' && locale.lang.weekPlaceholder) {
    return locale.lang.weekPlaceholder;
  }

  if (pickerType === 'time' && locale.timePickerLocale.placeholder) {
    return locale.timePickerLocale.placeholder;
  }

  return locale.lang.placeholder;
}

/**
 * Get placeholder text for range picker based on picker type and locale
 * @param pickerType - The type of picker (year, quarter, month, week, time, date)
 * @param locale - Locale configuration object
 * @param customPlaceholder - Optional custom placeholder tuple to override defaults
 * @returns Placeholder text tuple [startPlaceholder, endPlaceholder]
 */
export function getRangePlaceholder(
  pickerType: PickerType,
  locale: LocaleConfig,
  customPlaceholder?: [string, string]
): [string, string] | undefined {
  if (customPlaceholder !== undefined) {
    return customPlaceholder;
  }

  if (pickerType === 'year' && locale.lang.rangeYearPlaceholder) {
    return locale.lang.rangeYearPlaceholder;
  }

  if (pickerType === 'month' && locale.lang.rangeMonthPlaceholder) {
    return locale.lang.rangeMonthPlaceholder;
  }

  if (pickerType === 'week' && locale.lang.rangeWeekPlaceholder) {
    return locale.lang.rangeWeekPlaceholder;
  }

  if (pickerType === 'time' && locale.timePickerLocale.rangePlaceholder) {
    return locale.timePickerLocale.rangePlaceholder;
  }

  return locale.lang.rangePlaceholder;
}