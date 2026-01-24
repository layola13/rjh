/**
 * Translation component type definitions
 * @module Translation
 */

import type { Namespace, UseTranslationOptions, UseTranslationResponse, TFunction } from 'i18next';
import type { ReactNode } from 'react';

/**
 * Translation render prop callback function
 * @param t - Translation function
 * @param context - Translation context containing i18n instance and current language
 * @param ready - Indicates whether translations are loaded and ready
 * @returns React node to render
 */
export type TranslationRenderFunction = (
  t: TFunction,
  context: {
    /** i18next instance */
    i18n: UseTranslationResponse['i18n'];
    /** Current language code */
    lng: string;
  },
  ready: boolean
) => ReactNode;

/**
 * Props for the Translation component
 */
export interface TranslationProps extends Omit<UseTranslationOptions, 'keyPrefix'> {
  /**
   * Namespace(s) to load translations from
   * Can be a single namespace string or an array of namespaces
   */
  ns?: Namespace;

  /**
   * Render function that receives translation utilities
   * @param t - Translation function for accessing translations
   * @param context - Object containing i18n instance and current language
   * @param ready - Boolean indicating if translations are ready
   */
  children: TranslationRenderFunction;
}

/**
 * Translation component using render props pattern
 * Provides access to translation function and i18n context through a render function
 * 
 * @example
 *