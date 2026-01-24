/**
 * Module: module_get
 * Original ID: get
 * 
 * This module provides functionality related to initialization or state management.
 * The original compressed code suggests a side-effect that sets a global state value.
 */

/**
 * Initializes or resets a global state value.
 * 
 * @remarks
 * This function performs a side effect by setting an internal state.
 * In the original compressed code, it set a variable `zo` to 1.
 * 
 * @returns void
 */
declare function initializeState(): void;

/**
 * Global state value that tracks initialization status.
 * 
 * @remarks
 * This corresponds to the `zo` variable in the compressed code.
 * A value of 1 typically indicates an initialized or active state.
 */
declare let globalStateFlag: number;

export { initializeState, globalStateFlag };