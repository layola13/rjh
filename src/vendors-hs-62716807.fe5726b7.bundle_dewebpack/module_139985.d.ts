/**
 * LocaleProvider component for Ant Design internationalization.
 * @deprecated This component is deprecated. Please use `locale` with `ConfigProvider` instead.
 * @see http://u.ant.design/locale
 */

import { Component, ReactNode } from 'react';

/**
 * Internal mark used to identify Ant Design LocaleProvider instances.
 */
export const ANT_MARK = 'internalMark';

/**
 * Modal locale configuration interface.
 */
interface ModalLocale {
  okText?: string;
  cancelText?: string;
  justOkText?: string;
}

/**
 * Locale configuration object structure.
 */
interface Locale {
  /** Locale identifier (e.g., 'en_US', 'zh_CN') */
  locale?: string;
  /** Modal component locale settings */
  Modal?: ModalLocale;
  /** Additional locale properties */
  [key: string]: unknown;
}

/**
 * Props for the LocaleProvider component.
 */
interface LocaleProviderProps {
  /** Locale configuration object */
  locale?: Locale;
  /** Child components to be wrapped with locale context */
  children?: ReactNode;
  /** Internal marker (deprecated, for backward compatibility) */
  _ANT_MARK__?: string;
}

/**
 * Context value provided to descendant components.
 */
interface LocaleContextValue extends Locale {
  /** Indicates whether locale context exists */
  exist: boolean;
}

/**
 * LocaleProvider component for providing internationalization context.
 * 
 * @deprecated Use ConfigProvider with locale prop instead.
 * 
 * @example
 *