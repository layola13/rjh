/**
 * React i18next type definitions
 * 
 * This module provides TypeScript declarations for react-i18next library,
 * which offers React bindings for i18next internationalization framework.
 */

import { ComponentType, Context, ReactNode } from 'react';
import { i18n, TFunction, Resource, InitOptions } from 'i18next';

/**
 * Context for accessing i18n instance and language state in React components
 */
export const I18nContext: Context<{
  i18n: i18n;
  defaultNS?: string;
  lng?: string;
}>;

/**
 * Provider component that makes i18n instance available to the React component tree
 * 
 * @example
 *