/**
 * React i18n hook for internationalization
 * Provides translation functionality in React components
 */

import type { i18n, TFunction, Namespace, FallbackNs } from 'i18next';
import type { UseTranslationOptions, UseTranslationResponse } from 'react-i18next';

/**
 * Options for the useTranslation hook
 */
export interface UseTranslationHookOptions<N extends Namespace = FallbackNs> {
  /**
   * i18next instance to use. If not provided, will use context or global instance
   */
  i18n?: i18n;
  
  /**
   * Key prefix to prepend to all translation keys
   */
  keyPrefix?: string;
  
  /**
   * Whether to use React Suspense for loading translations
   * @default true
   */
  useSuspense?: boolean;
  
  /**
   * Namespace mode - how to handle multiple namespaces
   * @default 'default'
   */
  nsMode?: 'default' | 'fallback';
  
  /**
   * Which events to bind to on the i18n instance
   */
  bindI18n?: string;
  
  /**
   * Which events to bind to on the i18n store
   */
  bindI18nStore?: string;
}

/**
 * Return type of useTranslation hook
 * Extends array to support tuple destructuring: [t, i18n, ready]
 */
export interface UseTranslationResult<N extends Namespace = FallbackNs> 
  extends Array<TFunction<N> | i18n | boolean> {
  /**
   * Translation function
   */
  t: TFunction<N>;
  
  /**
   * i18next instance
   */
  i18n: i18n;
  
  /**
   * Whether translations are loaded and ready
   */
  ready: boolean;
  
  /**
   * Array index access for destructuring
   */
  [0]: TFunction<N>;
  [1]: i18n;
  [2]: boolean;
}

/**
 * React hook for using i18next translations
 * 
 * @template N - Namespace type
 * @param namespace - Namespace(s) to load. Can be string or array of strings
 * @param options - Hook configuration options
 * @returns Tuple containing [t, i18n, ready] with named properties
 * 
 * @example
 *