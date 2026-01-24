import type { ReactNode, ReactElement } from 'react';
import type { i18n } from 'i18next';

/**
 * Props for the I18nextProvider component
 */
export interface I18nextProviderProps {
  /**
   * The i18next instance to be used throughout the application
   */
  i18n: i18n;
  
  /**
   * Default namespace for translations
   */
  defaultNS?: string;
  
  /**
   * Child components that will have access to the i18n context
   */
  children: ReactNode;
}

/**
 * Context value provided by I18nextProvider
 */
export interface I18nContextValue {
  /**
   * The i18next instance
   */
  i18n: i18n;
  
  /**
   * Default namespace for translations
   */
  defaultNS?: string;
}

/**
 * Provider component that makes i18next instance available to the entire application
 * through React context. Wrap your app with this component to enable internationalization.
 * 
 * @param props - Component props
 * @returns React element wrapping children with i18n context
 * 
 * @example
 *