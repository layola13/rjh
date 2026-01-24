/**
 * Higher-order component that tracks focus state and passes it to the wrapped component.
 * @module FocusHandler
 */

import React from 'react';

/**
 * Props for the wrapped component that will receive focus state
 */
export interface WithFocusProps {
  /** Indicates whether the component currently has focus */
  focus: boolean;
}

/**
 * State managed by the focus handler HOC
 */
interface FocusHandlerState {
  /** Current focus state */
  focus: boolean;
}

/**
 * Type for any React component
 */
type ComponentType<P = any> = React.ComponentType<P>;

/**
 * Valid HTML element tag names that can be used as wrapper elements
 */
type WrapperElementTag = keyof JSX.IntrinsicElements;

/**
 * Higher-order component that wraps a component with focus tracking functionality.
 * 
 * @template P - Props type of the wrapped component
 * @param WrappedComponent - The component to wrap with focus tracking
 * @param wrapperTag - HTML element tag to use as wrapper (defaults to "span")
 * @returns A new component that tracks focus state and passes it to the wrapped component
 * 
 * @example
 *