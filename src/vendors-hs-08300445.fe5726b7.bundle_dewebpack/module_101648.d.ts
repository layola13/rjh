/**
 * Server-Side Rendering (SSR) hook for i18next internationalization.
 * Initializes i18n store and language on the server side.
 * @module useSSR
 */

import { useContext } from 'react';
import { I18nContext, getI18n } from 'i18next-react';
import type { i18n as I18nInstance, Resource } from 'i18next';

/**
 * Options for the useSSR hook
 */
interface UseSSROptions {
  /**
   * Custom i18n instance to use instead of context or global instance
   */
  i18n?: I18nInstance;
}

/**
 * Initializes i18n for server-side rendering by populating the resource store
 * and setting the initial language. Prevents re-initialization on cloned instances.
 * 
 * @param initialStore - Initial translation resources organized by language and namespace
 * @param initialLanguage - Initial language code to set (e.g., 'en', 'de')
 * @param options - Additional options including custom i18n instance
 * 
 * @example
 *