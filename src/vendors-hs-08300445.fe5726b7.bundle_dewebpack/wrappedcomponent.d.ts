/**
 * Higher-order component that enables server-side rendering (SSR) support for i18next.
 * This HOC wraps a component to inject initial i18n store and language data from the server.
 * 
 * @module withSSR
 */

import type { ComponentType, ReactElement } from 'react';

/**
 * Props injected by the withSSR HOC for server-side rendering.
 */
export interface WithSSRProps {
  /**
   * Initial i18n translation store passed from the server.
   * Contains pre-loaded translations for the initial render.
   */
  initialI18nStore?: Record<string, unknown>;

  /**
   * Initial language code detected or configured on the server.
   * Used to set the default language before client hydration.
   */
  initialLanguage?: string;
}

/**
 * Component with getInitialProps static method support.
 * Used for Next.js-style server-side data fetching.
 */
export interface ComponentWithInitialProps<P = unknown> extends ComponentType<P> {
  /**
   * Static method to fetch initial props on the server.
   * @param context - Server-side rendering context
   * @returns Promise resolving to initial props
   */
  getInitialProps?: (context: unknown) => Promise<Partial<P>>;
}

/**
 * Enhanced component type that includes SSR-specific static properties.
 */
export interface WithSSRComponent<P = unknown> extends ComponentWithInitialProps<P> {
  /**
   * Display name for React DevTools debugging.
   */
  displayName: string;

  /**
   * Reference to the original wrapped component.
   * Useful for testing and component introspection.
   */
  WrappedComponent: ComponentType<P>;
}

/**
 * Higher-order component that adds server-side rendering support for i18next translations.
 * 
 * This HOC performs the following:
 * 1. Extracts `initialI18nStore` and `initialLanguage` from props
 * 2. Calls the `useSSR` hook to initialize i18n on the client
 * 3. Passes remaining props to the wrapped component
 * 4. Composes `getInitialProps` if the wrapped component has one
 * 
 * @template P - Props type of the wrapped component
 * @returns HOC function that wraps a component with SSR support
 * 
 * @example
 *