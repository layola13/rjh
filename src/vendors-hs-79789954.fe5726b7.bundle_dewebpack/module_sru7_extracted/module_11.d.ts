/**
 * Sets the state for a module by updating its tag and substitution values.
 * This function appears to be part of a state management system that updates
 * module configuration or runtime state.
 * 
 * @param state - The state object containing tag and substitution information
 * @param state.tag - The tag identifier for the state entry
 * @param state.substitution - The substitution value to be applied
 * @param modules - Array or collection of modules
 * @param moduleId - The numeric identifier of the target module
 */
export function setModuleState(
  state: { tag: string; substitution: unknown },
  modules: Array<{ setState(tag: string, substitution: unknown): void }>,
  moduleId: number
): void;

/**
 * Alternative signature if the function is meant to be used as a method
 */
export interface ModuleStateUpdater {
  (
    state: { tag: string; substitution: unknown },
    modules: Array<{ setState(tag: string, substitution: unknown): void }>,
    moduleId: number
  ): void;
}

/**
 * State object structure for module state updates
 */
export interface ModuleState {
  /** Tag identifier for the state entry */
  tag: string;
  /** Substitution value to be applied to the module */
  substitution: unknown;
}

/**
 * Module interface with setState capability
 */
export interface StatefulModule {
  /**
   * Updates the module's state with the given tag and substitution
   * @param tag - The tag identifier
   * @param substitution - The substitution value
   */
  setState(tag: string, substitution: unknown): void;
}