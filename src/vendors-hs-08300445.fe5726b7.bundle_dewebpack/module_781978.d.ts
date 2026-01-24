import { ComponentType, ForwardRefExoticComponent, PropsWithoutRef, RefAttributes } from 'react';
import { Namespace, TFunction, i18n } from 'i18next';

/**
 * Options for configuring the withTranslation Higher-Order Component
 */
export interface WithTranslationOptions {
  /**
   * Key prefix to be prepended to all translation keys used within the component
   * @example
   * // With keyPrefix: 'common'
   * // t('button') will resolve to 'common.button'
   */
  keyPrefix?: string;

  /**
   * If true, forwards refs to the wrapped component using React.forwardRef
   * @default false
   */
  withRef?: boolean;
}

/**
 * Props injected into components wrapped with withTranslation HOC
 */
export interface WithTranslationProps {
  /**
   * Translation function for retrieving localized strings
   * @param key - Translation key to lookup
   * @param options - Interpolation options or default value
   * @returns Translated string
   */
  t: TFunction;

  /**
   * i18next instance providing access to language detection, resource loading, etc.
   */
  i18n: i18n;

  /**
   * Indicates whether translations are loaded and ready to use
   * Useful for preventing render before translations are available
   */
  tReady: boolean;
}

/**
 * Higher-Order Component that injects i18next translation capabilities into a component
 * 
 * @param namespace - i18next namespace(s) to load for this component
 * @param options - Configuration options for translation behavior
 * @returns HOC function that wraps a component with translation props
 * 
 * @example
 *