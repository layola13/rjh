/**
 * Core module export utility
 * Extends Object prototype with polyfills or utility methods
 */

import { exportStaticMethod, ExportFlags } from './module_5ca1';
import { core } from './module_8378';
import { fails } from './module_79e5';

/**
 * Defines a static method on the Object constructor with fallback handling
 * 
 * @param methodName - The name of the method to define on Object
 * @param implementation - Factory function that enhances the native implementation
 * 
 * @example
 * defineObjectMethod('keys', (nativeKeys) => {
 *   return function(obj) {
 *     return nativeKeys(obj);
 *   };
 * });
 */
export function defineObjectMethod<T extends Function>(
  methodName: string,
  implementation: (nativeMethod: T) => T
): void {
  // Get native implementation from core or fallback to Object
  const nativeMethod = (core.Object ?? {})[methodName] ?? Object[methodName] as unknown as T;
  
  // Create method descriptor
  const methodDescriptor: Record<string, T> = {};
  methodDescriptor[methodName] = implementation(nativeMethod);
  
  // Check if native method fails with test case
  const hasBug = fails(() => {
    (nativeMethod as any)(1);
  });
  
  // Export with static + fail flags if buggy
  exportStaticMethod(
    ExportFlags.S + ExportFlags.F * (hasBug ? 1 : 0),
    'Object',
    methodDescriptor
  );
}