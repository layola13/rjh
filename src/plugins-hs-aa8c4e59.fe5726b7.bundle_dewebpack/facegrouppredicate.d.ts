/**
 * Predicate classes for evaluating conditions on face instances
 * @module FaceGroupPredicate
 */

import { Predicate } from './Predicate';
import { DataType } from './DataType';
import { ParameterNames } from './ParameterNames';

/**
 * Comparison function type for evaluating parameter values
 * @template T - The type of values being compared
 * @param actual - The actual value from the parameter
 * @param expected - The expected value to compare against
 * @returns True if the comparison succeeds, false otherwise
 */
export type CompareFunction<T = unknown> = (actual: T, expected: T) => boolean;

/**
 * Context object containing the instance to evaluate
 */
export interface PredicateContext {
  /** The instance containing parameters to evaluate */
  instance: {
    /**
     * Retrieves a parameter by name
     * @param name - The parameter name
     * @returns The parameter object or undefined if not found
     */
    getParameter(name: string): Parameter | undefined;
  };
}

/**
 * Parameter object with typed value
 */
export interface Parameter<T = unknown> {
  /** The data type of the parameter */
  type: DataType;
  /** The current value of the parameter */
  value: T;
}

/**
 * Base predicate class for evaluating parameter conditions
 * @extends Predicate
 */
export declare class ParameterPredicate extends Predicate {
  /** The name of the parameter to evaluate */
  readonly paramName: string;
  
  /** The target value to compare against */
  readonly targetValue: unknown;
  
  /** Optional custom comparison function */
  readonly compare?: CompareFunction;

  /**
   * Creates a new ParameterPredicate
   * @param paramName - The name of the parameter to check
   * @param targetValue - The expected value of the parameter
   * @param compare - Optional comparison function (defaults to type-based comparison)
   */
  constructor(paramName: string, targetValue: unknown, compare?: CompareFunction);

  /**
   * Executes the predicate evaluation
   * @param context - The evaluation context containing the instance
   * @returns True if the parameter exists and matches the target value
   */
  execute(context: PredicateContext): boolean;
}

/**
 * Predicate for evaluating if an instance belongs to a specific room
 * @extends ParameterPredicate
 */
export declare class HostRoomPredicate extends ParameterPredicate {
  /** The target room ID */
  readonly roomId: string;

  /**
   * Creates a new HostRoomPredicate
   * @param roomId - The room ID to check against
   */
  constructor(roomId: string);
}

/**
 * Predicate for evaluating if an instance belongs to a specific layer
 * @extends ParameterPredicate
 */
export declare class HostLayerPredicate extends ParameterPredicate {
  /** The target layer ID */
  readonly layerId: string;

  /**
   * Creates a new HostLayerPredicate
   * @param layerId - The layer ID to check against
   */
  constructor(layerId: string);
}

/**
 * Predicate for checking if an instance has a face group ID assigned
 * Evaluates to true if the faceGroupId parameter exists and is truthy
 * @extends ParameterPredicate
 */
export declare class FaceGroupPredicate extends ParameterPredicate {
  /**
   * Creates a new FaceGroupPredicate
   * Checks if the 'faceGroupId' parameter exists and has a truthy value
   */
  constructor();
}