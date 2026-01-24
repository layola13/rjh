/**
 * Registrable mixin utilities for Vue components.
 * Provides inject/provide patterns for component registration and communication.
 * 
 * @module mixins/registrable
 */

/**
 * Console warning function type
 */
type ConsoleWarnFunction = (message: string) => void;

/**
 * Registration interface for child components
 */
interface Registrable {
  /**
   * Register a child component with the parent
   * @param component - The component instance to register
   */
  register: (component: any) => void;
  
  /**
   * Unregister a child component from the parent
   * @param component - The component instance to unregister
   */
  unregister: (component: any) => void;
}

/**
 * Vue component constructor type
 */
interface VueComponentOptions {
  name: string;
  inject?: Record<string, { default: any }>;
  provide?: () => Record<string, any>;
}

/**
 * Creates a stub registrable object that warns when methods are called.
 * Used when a component is not properly nested within its required parent.
 * 
 * @param componentName - Name of the component requiring registration
 * @param injectName - Name of the parent component that should provide registration
 * @returns A function that logs a console warning
 */
declare function createRegistrationStub(
  componentName: string,
  injectName: string
): () => void;

/**
 * Creates a Vue mixin that injects a registrable interface from a parent component.
 * Child components use this to register themselves with their parent.
 * 
 * @param injectKey - The injection key to use for dependency injection
 * @param componentName - Optional name of the component for error messages
 * @param parentName - Optional name of the parent component for error messages
 * @returns Vue component options with inject configuration
 * 
 * @example
 *