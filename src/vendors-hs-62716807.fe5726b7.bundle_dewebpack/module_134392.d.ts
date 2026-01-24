/**
 * Anchor Link Component - Type Definitions
 * Provides a navigational link within an Anchor component for smooth scrolling to page sections
 */

import { Component, ReactNode, MouseEvent } from 'react';
import { AnchorContext } from './AnchorContext';

/**
 * Click event handler callback type
 */
export type AnchorLinkClickHandler = (
  event: MouseEvent<HTMLAnchorElement>,
  link: { title: ReactNode; href: string }
) => void;

/**
 * Props for the AnchorLink component
 */
export interface AnchorLinkProps {
  /**
   * Custom CSS class name
   */
  className?: string;

  /**
   * Target section ID or URL to scroll to
   * @default "#"
   */
  href?: string;

  /**
   * Custom prefix for CSS classes
   */
  prefixCls?: string;

  /**
   * Link target attribute (_blank, _self, etc.)
   */
  target?: string;

  /**
   * Link title/label displayed to user
   */
  title: ReactNode;

  /**
   * Nested child AnchorLink components for multi-level navigation
   */
  children?: ReactNode;

  /**
   * Click event handler
   */
  onClick?: AnchorLinkClickHandler;
}

/**
 * Internal render props passed from ConfigConsumer
 */
interface RenderProps {
  /**
   * Function to generate prefixed CSS class names
   */
  getPrefixCls: (suffixCls: string, customizePrefixCls?: string) => string;
}

/**
 * AnchorLink Component
 * 
 * A navigational link component that integrates with Anchor for smooth scrolling navigation.
 * Supports nested links for hierarchical navigation structures.
 * 
 * @example
 *