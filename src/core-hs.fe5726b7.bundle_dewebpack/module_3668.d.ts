/**
 * Checks if a value is a constructor function.
 * 
 * This module provides a robust way to determine if a given value can be used
 * as a constructor (i.e., called with the `new` keyword).
 * 
 * @module isConstructor
 */

import { uncurryThis } from './uncurryThis';
import { fails } from './fails';
import { isCallable } from './isCallable';
import { classof } from './classof';
import { getBuiltIn } from './getBuiltIn';
import { inspectSource } from './inspectSource';

/**
 * Regular expression to detect class or function declarations
 */
declare const CLASS_OR_FUNCTION_PATTERN: RegExp;

/**
 * Uncurried version of RegExp.prototype.exec
 */
declare const regExpExec: <T extends RegExp>(regexp: T, str: string) => RegExpExecArray | null;

/**
 * Empty constructor function used for testing
 */
declare const emptyConstructor: new () => void;

/**
 * Empty array used as arguments placeholder
 */
declare const emptyArgs: readonly [];

/**
 * Native Reflect.construct function if available
 */
declare const reflectConstruct: typeof Reflect.construct | undefined;

/**
 * Checks if a value is a constructor using Reflect.construct.
 * 
 * @param target - The value to check
 * @returns True if the value can be used as a constructor
 */
declare function isConstructorViaReflect(target: unknown): target is new (...args: any[]) => any;

/**
 * Checks if a value is a constructor using heuristic methods.
 * Falls back when Reflect.construct is not available or unreliable.
 * 
 * @param target - The value to check
 * @returns True if the value appears to be a constructor
 */
declare function isConstructorViaHeuristic(target: unknown): target is new (...args: any[]) => any;

/**
 * Determines if a value is a constructor function.
 * 
 * A constructor is a function that can be called with the `new` keyword.
 * This includes:
 * - Class declarations and expressions
 * - Regular functions (but not arrow functions)
 * - Built-in constructors (Object, Array, etc.)
 * 
 * Excludes:
 * - AsyncFunction
 * - GeneratorFunction
 * - AsyncGeneratorFunction
 * - Arrow functions
 * - Non-callable values
 * 
 * @param target - The value to check
 * @returns True if the value is a constructor
 * 
 * @example
 *