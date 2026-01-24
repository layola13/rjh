import { Constraint } from './Constraint';

/**
 * Represents a computation method used in position constraint chains
 */
type ComputationMethod =
  | 'add'
  | 'sub'
  | 'mul'
  | 'div'
  | 'result_add'
  | 'result_sub'
  | 'result_mul'
  | 'result_div'
  | 'nonnegative';

/**
 * Represents a state object with id and value properties
 */
interface State {
  /** Unique identifier for the state */
  id: string;
  /** Current numeric value of the state */
  value: number;
}

/**
 * Represents a single computation step in the constraint chain
 */
interface ComputeChainStep {
  /** The computation method to apply */
  method: ComputationMethod;
  /** Array of states involved in this computation step */
  states: State[];
}

/**
 * Serialized representation of a computation chain step
 */
interface SerializedComputeChainStep {
  /** The computation method to apply */
  method: ComputationMethod;
  /** Array of state IDs */
  states: string[];
}

/**
 * Input configuration for initialization
 */
interface ConstraintInput {
  /** Computation method for this input */
  method: ComputationMethod;
  /** Array of state IDs or references */
  states?: string[];
}

/**
 * Serialized constraint data structure
 */
interface SerializedConstraintData {
  /** Local identifier */
  localId: string;
  /** Constraint type */
  type: string;
  /** Input configurations */
  inputs: ConstraintInput[];
  /** Output state ID or array of IDs */
  output: string | string[];
  /** Serialized computation chain */
  computeChain?: SerializedComputeChainStep[];
}

/**
 * State registry mapping state IDs to State objects
 */
interface StateRegistry {
  [stateId: string]: State;
}

/**
 * Load options for deserialization
 */
interface LoadOptions {
  /** Registry of available states */
  states: StateRegistry;
}

/**
 * Dump options for serialization
 */
interface DumpOptions {
  [key: string]: unknown;
}

/**
 * PositionConstraint class manages computational chains for position-related constraints.
 * Supports various arithmetic operations (add, sub, mul, div) and their result variants.
 * 
 * @extends {Constraint}
 */
export declare class PositionConstraint extends Constraint {
  /** Model class identifier from HSConstants */
  Class: string;

  /** Local identifier for this constraint instance */
  localId: string;

  /** Type identifier for the constraint */
  type: string;

  /** 
   * Ordered chain of computation steps to execute.
   * Each step contains a method and associated states.
   */
  computeChain: ComputeChainStep[];

  /**
   * Creates a new PositionConstraint instance
   * @param name - Optional name for the constraint
   */
  constructor(name?: string);

  /**
   * Initializes the constraint with serialized data and state registry
   * @param data - Serialized constraint configuration
   * @param stateRegistry - Registry mapping state IDs to State objects
   */
  init(data: SerializedConstraintData, stateRegistry: StateRegistry): void;

  /**
   * Executes the computation chain and updates output state values.
   * Processes each step sequentially, applying the specified method to state values.
   */
  compute(): void;

  /**
   * Serializes the constraint to a portable data structure
   * @param options - Optional serialization configuration
   * @returns Array containing serialized constraint data
   */
  dump(options?: DumpOptions): SerializedConstraintData[];

  /**
   * Deserializes constraint data and reconstructs the compute chain
   * @param data - Serialized constraint data
   * @param options - Load options including state registry
   */
  load(data: SerializedConstraintData, options?: LoadOptions): void;

  /**
   * Validates the constraint's internal state
   * @returns True if the constraint is valid and has a compute chain
   */
  verify(): boolean;

  /**
   * Validates the constraint before serialization
   * @returns True if the constraint is ready to be dumped
   */
  verifyBeforeDump(): boolean;
}