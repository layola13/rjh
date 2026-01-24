/**
 * Circuit component enumeration and base class
 * @module CircuitCompEnum
 */

import { Component } from './Component';

/**
 * Enumeration of circuit component types
 */
export enum CircuitCompEnum {
  /** Generic circuit component type */
  GBCircuit = "GBCircuit"
}

/**
 * Base circuit component class
 * Extends the core Component class to provide circuit-specific functionality
 */
export class CircuitComp extends Component {
  // Base implementation for circuit components
}