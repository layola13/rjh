/**
 * VRadioGroup module - Radio button group and radio button components
 * 
 * This module provides two main components:
 * - VRadioGroup: Container component for managing a group of radio buttons
 * - VRadio: Individual radio button component
 * 
 * @module VRadioGroup
 */

/**
 * VRadioGroup component
 * Container component that manages a group of radio buttons with shared state
 */
export declare const VRadioGroup: VRadioGroupComponent;

/**
 * VRadio component
 * Individual radio button component that must be used within a VRadioGroup
 */
export declare const VRadio: VRadioComponent;

/**
 * Default export containing Vuetify subcomponents
 * Used for internal component registration in Vuetify's plugin system
 */
declare const _default: {
  /**
   * Internal Vuetify subcomponents registry
   * Maps component names to their implementations for framework integration
   */
  readonly $_vuetify_subcomponents: {
    readonly VRadioGroup: VRadioGroupComponent;
    readonly VRadio: VRadioComponent;
  };
};

export default _default;

/**
 * VRadioGroup component type definition
 * Represents the radio group container component class/constructor
 */
interface VRadioGroupComponent {
  // Component implementation details would be defined based on VRadioGroup.ts
  new (...args: any[]): any;
}

/**
 * VRadio component type definition
 * Represents the individual radio button component class/constructor
 */
interface VRadioComponent {
  // Component implementation details would be defined based on VRadio.ts
  new (...args: any[]): any;
}