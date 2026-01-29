export interface TimePickerLocale {
  placeholder?: string;
  rangePlaceholder?: [string, string];
}

export interface LanguageConfig {
  placeholder?: string;
  yearPlaceholder?: string;
  quarterPlaceholder?: string;
  monthPlaceholder?: string;
  weekPlaceholder?: string;
  rangePlaceholder?: [string, string];
  rangeYearPlaceholder?: [string, string];
  rangeMonthPlaceholder?: [string, string];
  rangeWeekPlaceholder?: [string, string];
}

export interface LocaleConfig {
  lang: LanguageConfig;
  timePickerLocale: TimePickerLocale;
}

type PickerMode = 'year' | 'quarter' | 'month' | 'week' | 'time';

export function getPlaceholder(
  mode: PickerMode,
  locale: LocaleConfig,
  customPlaceholder?: string
): string | undefined {
  if (customPlaceholder !== undefined) {
    return customPlaceholder;
  }

  if (mode === 'year' && locale.lang.yearPlaceholder) {
    return locale.lang.yearPlaceholder;
  }

  if (mode === 'quarter' && locale.lang.quarterPlaceholder) {
    return locale.lang.quarterPlaceholder;
  }

  if (mode === 'month' && locale.lang.monthPlaceholder) {
    return locale.lang.monthPlaceholder;
  }

  if (mode === 'week' && locale.lang.weekPlaceholder) {
    return locale.lang.weekPlaceholder;
  }

  if (mode === 'time' && locale.timePickerLocale.placeholder) {
    return locale.timePickerLocale.placeholder;
  }

  return locale.lang.placeholder;
}

export function getRangePlaceholder(
  mode: PickerMode,
  locale: LocaleConfig,
  customPlaceholder?: [string, string]
): [string, string] | undefined {
  if (customPlaceholder !== undefined) {
    return customPlaceholder;
  }

  if (mode === 'year' && locale.lang.rangeYearPlaceholder) {
    return locale.lang.rangeYearPlaceholder;
  }

  if (mode === 'month' && locale.lang.rangeMonthPlaceholder) {
    return locale.lang.rangeMonthPlaceholder;
  }

  if (mode === 'week' && locale.lang.rangeWeekPlaceholder) {
    return locale.lang.rangeWeekPlaceholder;
  }

  if (mode === 'time' && locale.timePickerLocale.rangePlaceholder) {
    return locale.timePickerLocale.rangePlaceholder;
  }

  return locale.lang.rangePlaceholder;
}