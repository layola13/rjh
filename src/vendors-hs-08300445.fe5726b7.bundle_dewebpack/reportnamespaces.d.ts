/**
 * React i18next integration module for server-side rendering and internationalization
 * Provides context, namespaces tracking, and initial props composition for i18n
 */

import { Context } from 'react';
import { i18n, Resource, InitOptions } from 'i18next';

/**
 * Configuration options for React i18next integration
 */
export interface ReactI18nextOptions {
  /**
   * Events to bind to for i18n updates (e.g., "languageChanged")
   * @default "languageChanged"
   */
  bindI18n?: string;

  /**
   * Events to bind to for i18n store updates
   * @default ""
   */
  bindI18nStore?: string;

  /**
   * Value to use for empty translation nodes
   * @default ""
   */
  transEmptyNodeValue?: string;

  /**
   * Enable support for basic HTML nodes in translations
   * @default true
   */
  transSupportBasicHtmlNodes?: boolean;

  /**
   * Wrap text nodes in translations
   * @default ""
   */
  transWrapTextNodes?: string;

  /**
   * List of basic HTML tags to preserve in translations
   * @default ["br", "strong", "i", "p"]
   */
  transKeepBasicHtmlNodesFor?: string[];

  /**
   * Enable React Suspense for async loading
   * @default true
   */
  useSuspense?: boolean;

  /**
   * Function to unescape HTML entities in translations
   */
  unescape?: (text: string) => string;
}

/**
 * Initial props returned for SSR hydration
 */
export interface I18nInitialProps {
  /**
   * Pre-loaded translation resources organized by language and namespace
   */
  initialI18nStore: Record<string, Record<string, Resource>>;

  /**
   * The initial language to use on client
   */
  initialLanguage: string;
}

/**
 * Generic context object for Next.js or similar SSR frameworks
 */
export interface SSRContext {
  [key: string]: unknown;
}

/**
 * Component with getInitialProps method
 */
export interface ComponentWithInitialProps<P = Record<string, unknown>> {
  getInitialProps?: (context: SSRContext) => Promise<P>;
}

/**
 * Extended i18n instance with optional namespace reporting
 */
export interface I18nWithReporting extends i18n {
  reportNamespaces?: ReportNamespaces;
}

/**
 * React Context for providing i18n instance throughout the component tree
 */
export declare const I18nContext: Context<I18nWithReporting | undefined>;

/**
 * Tracks used translation namespaces for SSR optimization
 * Collects which namespaces are accessed during render to preload only necessary translations
 */
export declare class ReportNamespaces {
  private usedNamespaces: Record<string, boolean>;

  constructor();

  /**
   * Register namespaces as used during render
   * @param namespaces - Array of namespace keys that were accessed
   */
  addUsedNamespaces(namespaces: string[]): void;

  /**
   * Get all namespaces that have been registered as used
   * @returns Array of unique namespace keys
   */
  getUsedNamespaces(): string[];
}

/**
 * Update the default configuration options for React i18next
 * @param options - Partial options to merge with existing defaults
 */
export declare function setDefaults(options?: Partial<ReactI18nextOptions>): void;

/**
 * Get the current default configuration options
 * @returns Current default options object
 */
export declare function getDefaults(): ReactI18nextOptions;

/**
 * Set the global i18n instance
 * @param instance - The i18next instance to use globally
 */
export declare function setI18n(instance: I18nWithReporting): void;

/**
 * Get the global i18n instance
 * @returns The current i18next instance
 */
export declare function getI18n(): I18nWithReporting;

/**
 * i18next plugin definition for React integration
 * Automatically initializes React-specific options and registers the i18n instance
 */
export declare const initReactI18next: {
  type: '3rdParty';
  init: (instance: i18n & { options: InitOptions & { react?: Partial<ReactI18nextOptions> } }) => void;
};

/**
 * Get initial props for SSR including pre-loaded translations
 * Extracts all used namespaces and their resources for all languages
 * @returns Props object with initialI18nStore and initialLanguage
 */
export declare function getInitialProps(): I18nInitialProps;

/**
 * Higher-order function to compose getInitialProps with i18n initial props
 * Wraps a component's getInitialProps to automatically include translation data
 * 
 * @param Component - Component class with optional getInitialProps method
 * @returns Function that returns a Promise resolving to merged initial props
 * 
 * @example
 *