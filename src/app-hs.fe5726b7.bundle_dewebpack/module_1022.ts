import process from 'process';

interface UtilTypes {
  isArrayBuffer?(value: unknown): boolean;
  isDate?(value: unknown): boolean;
  isMap?(value: unknown): boolean;
  isSet?(value: unknown): boolean;
  isRegExp?(value: unknown): boolean;
  isTypedArray?(value: unknown): boolean;
  [key: string]: unknown;
}

/**
 * Attempts to retrieve Node.js util.types for type checking utilities.
 * Falls back to process.binding('util') if require is unavailable.
 * @returns {UtilTypes | undefined} The util.types object or undefined if unavailable
 */
function getUtilTypes(): UtilTypes | undefined {
  try {
    const utilModule = require?.('util');
    if (utilModule?.types) {
      return utilModule.types as UtilTypes;
    }

    const processBinding = process?.binding;
    if (processBinding) {
      return processBinding('util') as UtilTypes;
    }

    return undefined;
  } catch (error) {
    return undefined;
  }
}

const utilTypes = getUtilTypes();

export default utilTypes;