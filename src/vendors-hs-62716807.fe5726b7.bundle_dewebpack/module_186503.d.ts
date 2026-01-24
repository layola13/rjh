/**
 * Type definitions for create-react-class module
 * Module: module_186503
 * Original ID: 186503
 */

import type { Component, ComponentClass, ReactElement, ComponentSpec, ClassicComponentClass } from 'react';

/**
 * Specification for creating a React class component
 * @template P - Props type
 * @template S - State type
 */
interface CreateReactClassSpec<P = any, S = any> extends ComponentSpec<P, S> {
  displayName?: string;
  mixins?: Array<any>;
  statics?: Record<string, any>;
  propTypes?: Record<string, any>;
  contextTypes?: Record<string, any>;
  childContextTypes?: Record<string, any>;
  getDefaultProps?(): Partial<P>;
  getInitialState?(): Partial<S> | null;
}

/**
 * Factory function that creates React class components
 * 
 * This is a compatibility layer for creating class-based React components
 * using the legacy createClass API. It requires React to be available
 * and uses React's internal component updater mechanism.
 * 
 * @template P - Component props type
 * @template S - Component state type
 * @param spec - Component specification object
 * @returns A React component class
 * 
 * @throws {Error} If React is not loaded or available
 * 
 * @example
 *