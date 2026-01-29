export function getNodeUtilTypes(): any {
  try {
    const utilTypes = require?.('util')?.types;
    if (utilTypes) {
      return utilTypes;
    }

    const processBinding = process?.binding?.('util');
    if (processBinding) {
      return processBinding;
    }

    return undefined;
  } catch (error) {
    return undefined;
  }
}

export default getNodeUtilTypes();