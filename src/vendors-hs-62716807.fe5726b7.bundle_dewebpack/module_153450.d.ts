/**
 * Locale receiver hook and component for internationalization (i18n)
 * Provides locale data from context with fallback to default locales
 */

import { Context, Component, ReactNode, useMemo, useContext } from 'react';

/**
 * Locale data structure containing translation keys and values
 */
export interface LocaleData {
  [key: string]: string | LocaleData | (() => LocaleData);
}

/**
 * Locale context value containing component-specific locales
 */
export interface LocaleContextValue {
  /** Current locale code (e.g., 'en-US', 'zh-CN') */
  locale?: string;
  /** Whether the locale exists in the system */
  exist?: boolean;
  /** Component-specific locale data */
  [componentName: string]: LocaleData | string | boolean | undefined;
}

/**
 * Props for LocaleReceiver component
 */
export interface LocaleReceiverProps {
  /** Name of the component requesting locale data */
  componentName?: string;
  /** Default locale data to use as fallback */
  defaultLocale?: LocaleData | (() => LocaleData);
  /** Render prop receiving locale data, locale code, and context */
  children: (
    locale: LocaleData,
    localeCode: string | undefined,
    context: LocaleContextValue
  ) => ReactNode;
}

/**
 * Default locale data registry for all components
 */
declare const defaultLocales: {
  locale: string;
  global: LocaleData;
  [componentName: string]: LocaleData | string;
};

/**
 * React context for locale data
 */
declare const LocaleContext: Context<LocaleContextValue>;

/**
 * Hook to receive locale data for a specific component
 * 
 * @param componentName - Name of the component requesting locale data
 * @param defaultLocale - Optional default locale data to use as fallback
 * @returns Tuple containing merged locale data
 * 
 * @example
 *