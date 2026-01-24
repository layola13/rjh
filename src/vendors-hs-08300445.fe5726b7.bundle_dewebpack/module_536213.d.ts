import React from 'react';

/**
 * Props injected by the hover HOC into the wrapped component
 */
export interface HoverInjectedProps {
  /** Indicates whether the element is currently being hovered */
  hover: boolean;
}

/**
 * Higher-order component that adds hover state tracking to a component
 * 
 * @template P - Props type of the wrapped component
 * @param WrappedComponent - The component to enhance with hover functionality
 * @param containerElement - The HTML element type to use as wrapper (default: "span")
 * @returns A new component with hover state management
 * 
 * @example
 *