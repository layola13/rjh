import { types as utilTypes } from 'util';

interface NodeModule {
  exports: unknown;
  require?: NodeRequire;
  nodeType?: number;
}

interface ProcessBinding {
  (module: string): { types?: typeof utilTypes };
}

interface ProcessWithBinding {
  binding?: ProcessBinding;
}

/**
 * Attempts to retrieve Node.js util.types for type checking.
 * Falls back to process.binding if available.
 * @returns The util.types object or undefined if unavailable
 */
function getUtilTypes(): typeof utilTypes | undefined {
  try {
    if (typeof require !== 'undefined') {
      const util = require('util');
      return util?.types;
    }
    
    if (typeof process !== 'undefined') {
      const proc = process as ProcessWithBinding;
      return proc.binding?.('util')?.types;
    }
    
    return undefined;
  } catch {
    return undefined;
  }
}

export const utilTypesHelper = getUtilTypes();