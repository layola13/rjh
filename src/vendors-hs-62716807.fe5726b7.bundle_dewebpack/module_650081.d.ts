/**
 * React context providers and contexts for Form components
 * Provides form configuration, item management, and prefix customization
 */

import type { ReactNode, ReactElement } from 'react';

/**
 * Configuration for form layout and behavior
 */
export interface FormContextValue {
  /**
   * Alignment of form labels
   * @default 'right'
   */
  labelAlign: 'left' | 'right';

  /**
   * Whether the form layout is vertical
   * @default false
   */
  vertical: boolean;

  /**
   * Callback to register form item references
   * @param name - The form field name or path
   * @param ref - Reference to the form item element
   */
  itemRef: (name?: string | string[], ref?: unknown) => void;
}

/**
 * Context for managing form-level configuration
 */
export declare const FormContext: React.Context<FormContextValue>;

/**
 * Configuration for form item error handling
 */
export interface FormItemContextValue {
  /**
   * Callback to update validation errors for a form item
   * @param name - The form field name
   * @param errors - Array of error messages
   */
  updateItemErrors: (name: string | string[], errors?: string[]) => void;
}

/**
 * Context for managing individual form item state and validation
 */
export declare const FormItemContext: React.Context<FormItemContextValue>;

/**
 * Configuration for form item CSS class prefixes
 */
export interface FormItemPrefixContextValue {
  /**
   * CSS class prefix for form components
   * @default ''
   */
  prefixCls: string;
}

/**
 * Context for customizing form component class prefixes
 */
export declare const FormItemPrefixContext: React.Context<FormItemPrefixContextValue>;

/**
 * Props for the FormProvider component
 */
export interface FormProviderProps {
  /**
   * Child components to be wrapped by the provider
   */
  children?: ReactNode;

  /**
   * Form instance or configuration options
   */
  [key: string]: unknown;
}

/**
 * Top-level provider component for form state management
 * Wraps form components to provide shared context and configuration
 * 
 * @param props - FormProvider configuration
 * @returns React element wrapping children with form context
 * 
 * @example
 *