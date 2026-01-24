/**
 * Portal component for rendering children into a DOM node that exists outside the DOM hierarchy of the parent component.
 * This module provides a React component that uses React Portals to render content into a container element.
 * 
 * @module PortalWrapper
 */

import type { ReactNode, RefObject, ForwardRefExoticComponent, RefAttributes } from 'react';

/**
 * Properties for the Portal component
 */
export interface PortalProps {
  /**
   * Callback function invoked after the component updates
   * @param props - The current props of the component
   */
  didUpdate?: (props: PortalProps) => void;

  /**
   * Function that returns the container DOM element where children will be rendered
   * @returns The HTML element that will serve as the portal container
   */
  getContainer: () => HTMLElement;

  /**
   * The content to be rendered inside the portal
   */
  children: ReactNode;
}

/**
 * Handle exposed by the Portal component through ref
 */
export interface PortalHandle {
  // Currently empty, but allows future imperative methods to be exposed
}

/**
 * Portal component that renders children into a DOM node outside the parent component hierarchy.
 * 
 * Features:
 * - Lazy initialization of the container element
 * - Automatic cleanup when unmounted
 * - Preserves the container's parent node for restoration
 * - Client-side only rendering support
 * 
 * @example
 *