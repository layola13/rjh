/**
 * Registrable mixin utilities for Vue components.
 * Provides inject/provide pattern for component registration.
 * 
 * @module registrable
 */

/**
 * Options for injectable registrable functionality
 */
interface RegistrableInjection {
  /** Register a child component */
  register: () => void;
  /** Unregister a child component */
  unregister: () => void;
}

/**
 * Options for providable registrable functionality
 */
interface RegistrableProvider {
  /** Register a child component with this parent */
  register: (child: unknown) => void;
  /** Unregister a child component from this parent */
  unregister: (child: unknown) => void;
}

/**
 * Creates a warning function for missing parent component context
 * 
 * @param componentName - The name of the component being used
 * @param parentName - The name of the required parent component
 * @returns A function that logs a console warning
 */
declare function createMissingParentWarning(
  componentName: string,
  parentName: string
): () => void;

/**
 * Creates a Vue mixin that injects registrable functionality from a parent component
 * 
 * @param namespace - The injection key name
 * @param componentName - Optional name of the child component (for warnings)
 * @param parentName - Optional name of the parent component (for warnings)
 * @returns A Vue mixin with inject configuration
 * 
 * @example
 *