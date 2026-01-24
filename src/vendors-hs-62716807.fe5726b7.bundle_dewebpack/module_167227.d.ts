/**
 * Button component module
 * Exports a default component with Button and Group sub-components
 */

/**
 * Button component interface
 */
export interface ButtonComponent {
  // Button component implementation
  // Add specific button props and methods based on your requirements
}

/**
 * Group component interface
 */
export interface GroupComponent {
  // Group component implementation
  // Add specific group props and methods based on your requirements
}

/**
 * Main component interface with sub-components
 */
export interface MainComponent {
  /**
   * Button sub-component
   */
  Button: ButtonComponent;
  
  /**
   * Group sub-component
   */
  Group: GroupComponent;
}

/**
 * Button sub-component export
 */
export const Button: ButtonComponent;

/**
 * Group sub-component export
 */
export const Group: GroupComponent;

/**
 * Default export - Main component with Button and Group attached
 */
declare const _default: MainComponent;
export default _default;