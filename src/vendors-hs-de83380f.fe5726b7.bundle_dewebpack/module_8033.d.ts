/**
 * Module: module_8033
 * Original ID: 8033
 * 
 * This module exports a forwarded ref component that wraps a default component
 * with a specific icon.
 */

import React from 'react';

/**
 * Props interface for the forwarded component
 * Extends all standard React component props
 */
export interface ForwardedComponentProps extends Record<string, unknown> {
  /** Optional ref forwarding */
  ref?: React.Ref<unknown>;
  /** Icon component or configuration */
  icon?: React.ComponentType | unknown;
  /** Additional props passed to the underlying component */
  [key: string]: unknown;
}

/**
 * The forwarded ref component type
 * Accepts generic props and forwards refs to the underlying component
 */
export type ForwardedComponent = React.ForwardRefExoticComponent<
  ForwardedComponentProps & React.RefAttributes<unknown>
>;

/**
 * Default export: A React component with forwarded ref support
 * Wraps a base component with a predefined icon
 */
declare const _default: ForwardedComponent;

export default _default;