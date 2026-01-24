/**
 * State manager interface with setState method
 */
interface StateManager<T = unknown> {
  /**
   * Sets the state for a given tag with the provided value
   * @param tag - The identifier/key for the state
   * @param value - The value to set for the state
   */
  setState(tag: string, value: T): void;
}

/**
 * Entity with substitution configuration
 */
interface SubstitutionEntity<T = unknown> {
  /**
   * Tag identifier for the substitution
   */
  tag: string;
  
  /**
   * Array of substitution values to apply
   */
  substitution: T[];
}

/**
 * Applies substitutions from an entity to an array of state managers
 * 
 * This function iterates through each substitution value in the entity and
 * calls setState on the corresponding state manager at index (n + r), where:
 * - n is the base index offset
 * - r is the current iteration index
 * 
 * @param entity - The entity containing tag and substitution values
 * @param stateManagers - Array of state managers to update
 * @param baseIndex - Base offset index for accessing state managers
 * 
 * @example
 * const entity = { tag: 'color', substitution: ['red', 'blue'] };
 * const managers = [manager0, manager1, manager2];
 * applySubstitutions(entity, managers, 0);
 * // Calls: manager0.setState('color', 'red')
 * //        manager1.setState('color', 'blue')
 */
declare function applySubstitutions<T = unknown>(
  entity: SubstitutionEntity<T>,
  stateManagers: StateManager<T>[],
  baseIndex: number
): void;