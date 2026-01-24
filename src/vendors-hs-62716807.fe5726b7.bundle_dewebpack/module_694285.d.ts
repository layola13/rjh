/**
 * Typography Link Component Type Definitions
 * 
 * A React component for rendering hyperlinks with ellipsis support and typography features.
 * Extends standard anchor element properties with additional typography capabilities.
 */

import type { Ref, RefObject, AnchorHTMLAttributes, ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * Props for the Typography Link component
 * Extends standard HTML anchor element attributes
 */
export interface TypographyLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'ref'> {
  /**
   * Whether to display ellipsis when text overflows
   * Only accepts boolean value (object configuration is not supported)
   * @default false
   */
  ellipsis?: boolean;

  /**
   * Specifies the relationship between the current document and the linked document
   * Automatically set to "noopener noreferrer" when target="_blank" if not provided
   */
  rel?: string;

  /**
   * Navigation callback (internal use, will be removed from final props)
   * @internal
   */
  navigate?: (...args: unknown[]) => void;

  /**
   * Target attribute for the anchor element
   * Common values: "_blank", "_self", "_parent", "_top"
   */
  target?: string;
}

/**
 * Ref type for Typography Link component
 * Provides access to the underlying content container element
 */
export interface TypographyLinkRef {
  /**
   * Reference to the content container DOM element
   */
  contentRef: RefObject<HTMLElement>;
}

/**
 * Typography Link Component
 * 
 * A forward ref component that renders an accessible hyperlink with typography features.
 * Automatically adds security attributes for external links.
 * 
 * @example
 *