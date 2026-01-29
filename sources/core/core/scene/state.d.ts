/**
 * State management module for HSCore framework
 * Provides base state management with signal-based change notification
 */

import { Logger } from './Logger';
import { Signal, SignalHook } from './Signal';

/**
 * Options for StateField decorator
 */
interface StateFieldOptions<T = any> {
  /** Prefix for internal property storage (default: "__") */
  prefix?: string;
  /** Custom getter function */
  get?(): T;
  /** Custom setter function */
  set?(value: T | State<T>): void;
  /** Partial setter for complex state updates */
  partialSet?(value: T | State<T>): void;
  /** Validation function before setting value */
  validate?(value: T | State<T>): boolean;
  /** Partial state setter callback */
  partialSetState?(state: State<T>): void;
  /** Custom state setter */
  setState?(state: State<T>): void;
  /** Custom state getter */
  getState?(createIfMissing?: boolean): State<T> | undefined;
  /** Custom equality comparison */
  equals?(value: T | State<T>): boolean;
  /** Binary equality comparison for primitives */
  binaryEqual?(oldValue: T, newValue: T): boolean;
  /** Default value for the state */
  defaultValue?: T;
  /** Whether the state should be persisted (default: true) */
  persistable?: boolean;
}

/**
 * Serialized state data structure
 */
interface StateDumpData {
  /** Short class name */
  l: string;
  /** State ID */
  id: string;
  /** Local identifier */
  localId?: string;
  /** Display name */
  name?: string;
  /** State value */
  value?: any;
  /** Whether the state is editable */
  isEditable?: boolean;
}

/**
 * Options for dump/load operations
 */
interface StateSerializationOptions {
  /** Callback function during serialization */
  callback?: (state: State<any>) => void;
  /** Map of state IDs to their dump data */
  statesData?: Record<string, StateDumpData>;
  /** Map of state IDs to state instances */
  states?: Record<string, State<any>>;
  /** ID generator for remapping state IDs */
  stateIdGenerator?: {
    generate(id: string): string;
    getNewId?(id: string): string;
  };
  /** Custom function to retrieve state by ID */
  getStateById?(id: string): State<any> | undefined;
}

/**
 * Change notification event data
 */
interface StateChangeEvent<T = any> {
  /** The state object that changed */
  object: State<T>;
  /** Name of the field that changed */
  fieldName?: string;
  /** Previous value */
  oldValue?: T;
  /** New value */
  newValue?: T;
  /** Alias for fieldName */
  name?: string;
  /** Alias for newValue */
  value?: T;
}

/**
 * Base State class for managing stateful values with change notifications
 * 
 * @template T The type of value stored in the state
 */
declare class State<T = any> {
  /** Fully qualified class name */
  static readonly Class: string;
  
  /** Map of class names to constructor functions */
  private static readonly _constructorByClassName: Map<string, new (...args: any[]) => State<any>>;

  /** Local identifier for the state */
  localId: string;
  
  /** Display name of the state */
  name: string;
  
  /** Whether the state value can be edited */
  isEditable: boolean;
  
  /** Internal storage for the state value */
  private __value?: T;
  
  /** Whether the state should be persisted */
  private __persistable: boolean;
  
  /** Whether the state has been disposed */
  private _disposed: boolean;
  
  /** Unique identifier for the state */
  readonly id: string;
  
  /** Associated document */
  private readonly _doc: any;
  
  /** Signal emitted before value changes */
  private _signalValueChanging: Signal<StateChangeEvent<T>>;
  
  /** Signal emitted after value changes */
  private _signalValueChanged: Signal<StateChangeEvent<T>>;
  
  /** Hook for managing signal listeners */
  private _signalHook: SignalHook;
  
  /** Cached tag string for debugging */
  private _tag?: string;

  /**
   * Creates a new State instance
   * 
   * @param idPrefix Prefix for generating unique ID
   * @param document Associated document (defaults to active document)
   */
  constructor(idPrefix?: string, document?: any);

  /**
   * Gets the current state value
   */
  get value(): T | undefined;

  /**
   * Sets the state value and triggers change notifications
   */
  set value(newValue: T | undefined);

  /**
   * Gets the unique identifier
   */
  get ID(): string;

  /**
   * Gets the class name without namespace
   */
  getClassName(): string;

  /**
   * Gets a debug tag combining class name and ID
   */
  get tag(): string;

  /**
   * Initializes state from serialized data
   * 
   * @param data Serialized state data
   * @param options Deserialization options
   */
  init(data: StateDumpData, options?: StateSerializationOptions): void;

  /**
   * Validates that a value is a valid number or State instance
   * 
   * @param propertyName Name of the property being validated
   * @param value Value to validate
   * @returns true if valid, false otherwise
   */
  validateNumberInput(propertyName: string, value: any): boolean;

  /**
   * Verifies that the state is in a valid state for operations
   * 
   * @returns true if valid, false otherwise
   */
  verify(): boolean;

  /**
   * Verifies state before serialization
   * 
   * @returns true if valid for dumping, false otherwise
   */
  verifyBeforeDump(): boolean;

  /**
   * Serializes the state to a plain object
   * 
   * @param callback Optional callback during serialization
   * @param options Serialization options
   * @returns Array containing serialized state data
   */
  dump(callback?: (state: State<T>) => void, options?: StateSerializationOptions): StateDumpData[];

  /**
   * Deserializes state from a plain object
   * 
   * @param data Serialized state data
   * @param options Deserialization options
   */
  load(data: StateDumpData | null, options?: StateSerializationOptions): void;

  /**
   * Binds this state's change events to trigger field changed on another object
   * 
   * @param targetObject Object to notify of changes
   * @param fieldName Name of the field on target object
   */
  bindObjectFieldChanged(targetObject: any, fieldName: string): void;

  /**
   * Raises a field changed event
   * 
   * @param fieldName Name of the field that changed
   * @param oldValue Previous value
   * @param newValue New value
   */
  raiseFieldChanged(fieldName: string, oldValue: T, newValue: T): void;

  /**
   * Hook called when a field changes (override in subclasses)
   * 
   * @param fieldName Name of the field that changed
   * @param oldValue Previous value
   * @param newValue New value
   */
  protected onFieldChanged(fieldName: string, oldValue: T, newValue: T): void;

  /**
   * Dispatches value changing notification
   * 
   * @param oldValue Previous value
   * @param newValue New value
   * @param fieldName Optional field name
   */
  dispatchValueChanging(oldValue: T | undefined, newValue: T | undefined, fieldName?: string): void;

  /**
   * Dispatches value changed notification
   * 
   * @param oldValue Previous value
   * @param newValue New value
   * @param fieldName Optional field name
   */
  dispatchValueChanged(oldValue: T | undefined, newValue: T | undefined, fieldName?: string): void;

  /**
   * Binds a child state to forward its change events
   * 
   * @param childState Child state to bind
   * @param fieldName Field name for the child state
   */
  protected _bindChildState(childState: State<any> | undefined, fieldName: string): void;

  /**
   * Unbinds a child state
   * 
   * @param childState Child state to unbind
   */
  protected _unbindChildState(childState: State<any> | undefined): void;

  /**
   * Binds this state to an owner object
   * 
   * @param ownerObject Object that owns this state
   * @param onChanging Callback for value changing
   * @param onChanged Callback for value changed
   */
  bindOwnerObject(
    ownerObject: any,
    onChanging: (event: { data: StateChangeEvent<T> }) => void,
    onChanged: (event: { data: StateChangeEvent<T> }) => void
  ): void;

  /**
   * Unbinds this state from an owner object
   * 
   * @param ownerObject Object to unbind from
   */
  unbindOwnerObject(ownerObject: any): void;

  /**
   * Unbinds this state from an object (alias for unbindOwnerObject)
   * 
   * @param object Object to unbind from
   */
  unbindObject(object: any): void;

  /**
   * Unbinds all listeners
   */
  unbindAll(): void;

  /**
   * Destroys the state and cleans up resources
   */
  destroy(): void;

  /**
   * Registers a state class with a fully qualified name
   * 
   * @param className Fully qualified class name
   * @param constructor Constructor function
   */
  static registerClass(className: string, constructor: new (...args: any[]) => State<any>): void;

  /**
   * Gets a registered state class by name
   * 
   * @param className Class name (short or long form)
   * @returns Constructor function or undefined
   */
  static getClass(className: string): (new (...args: any[]) => State<any>) | undefined;

  /**
   * Creates a state instance from serialized data
   * 
   * @param data Serialized state data
   * @param options Deserialization options
   * @returns New state instance or undefined
   */
  static createFromDump<T = any>(data: StateDumpData | null, options?: StateSerializationOptions): State<T> | undefined;

  /**
   * Serializes a state instance
   * 
   * @param state State to serialize
   * @param options Serialization options
   * @returns Array containing serialized state data
   */
  static dumpState<T = any>(state: State<T>, options?: StateSerializationOptions): StateDumpData[];

  /**
   * Loads a state from serialized data, reusing existing instance if available
   * 
   * @param data Serialized state data
   * @param options Deserialization options
   * @param forceReload Whether to reload existing state
   * @returns State instance or undefined
   */
  static loadFromDump<T = any>(
    data: StateDumpData | null,
    options?: StateSerializationOptions,
    forceReload?: boolean
  ): State<T> | undefined;

  /**
   * Loads a state by ID from serialization options
   * 
   * @param stateId State ID to load
   * @param options Deserialization options
   * @param forceReload Whether to reload existing state
   * @returns State instance or undefined
   */
  static loadFromDumpById<T = any>(
    stateId: string | null,
    options?: StateSerializationOptions,
    forceReload?: boolean
  ): State<T> | undefined;

  /**
   * Gets an existing state instance from serialization context
   * 
   * @param stateId State ID to retrieve
   * @param options Deserialization options
   * @returns Existing state instance or undefined
   */
  static getExistingState<T = any>(
    stateId: string | null,
    options?: StateSerializationOptions
  ): State<T> | undefined;

  /**
   * Sets the value without triggering change notifications
   * 
   * @param value New value to set
   */
  setValueSilent(value: T | undefined): void;
}

/**
 * Property decorator that wraps a value in a State instance
 * 
 * @template T The type of value stored in the state
 * @param StateClass Constructor for the state class to use
 * @param options Configuration options for the state field
 * @returns Property decorator function
 * 
 * @example
 * class MyClass {
 *   @StateField(NumberState, { defaultValue: 0 })
 *   count: number;
 * }
 */
declare function StateField<T = any>(
  StateClass?: new (...args: any[]) => State<T>,
  options?: StateFieldOptions<T>
): (target: any, propertyKey: string) => void;

export { State, StateField };