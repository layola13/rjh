/**
 * Sets the state for a module by applying tag and substitution values.
 * 
 * @param data - Object containing the tag identifier and substitution value
 * @param data.tag - The tag identifier used to locate the state entry
 * @param data.substitution - The substitution value to be set for the specified tag
 * @param modules - Array or collection of modules that contain setState functionality
 * @param moduleIndex - The index of the target module in the modules collection
 */
declare function setModuleState(
  data: { tag: string; substitution: unknown },
  modules: Array<{ setState: (tag: string, substitution: unknown) => void }>,
  moduleIndex: number
): void;