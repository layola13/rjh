import React from 'react';

/**
 * State interface for the active HOC component
 */
interface ActiveState {
  /** Whether the component is currently in an active (pressed) state */
  active: boolean;
}

/**
 * Props that will be injected into the wrapped component
 */
interface InjectedActiveProps {
  /** Indicates if the component is currently being pressed/active */
  active: boolean;
}

/**
 * Higher-order component that adds active state tracking to a component.
 * Tracks mouse down/up events and passes the active state to the wrapped component.
 * 
 * @template P - Props type of the wrapped component
 * @param WrappedComponent - The component to wrap with active state functionality
 * @param ContainerElement - The HTML element type to use as container (default: 'span')
 * @returns A new component class that wraps the original with active state tracking
 * 
 * @example
 *