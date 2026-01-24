/**
 * Regenerator Runtime Type Definitions
 * Provides runtime support for ES2015+ generators and async/await in older environments
 */

/**
 * Represents the state of a generator execution
 */
type GeneratorState = 'suspendedStart' | 'suspendedYield' | 'executing' | 'completed';

/**
 * Type of operation result from generator execution
 */
type CompletionType = 'normal' | 'throw' | 'break' | 'continue' | 'return';

/**
 * Iterator result object
 */
interface IteratorResult<T> {
  value: T;
  done: boolean;
}

/**
 * Completion record for generator state transitions
 */
interface CompletionRecord {
  type: CompletionType;
  arg?: any;
}

/**
 * Try-catch-finally entry in generator context
 */
interface TryEntry {
  tryLoc: string | number;
  catchLoc?: number;
  finallyLoc?: number;
  afterLoc?: number;
  completion?: CompletionRecord;
}

/**
 * Delegate iterator information
 */
interface DelegateInfo {
  iterator: Iterator<any>;
  resultName: string;
  nextLoc: number | string;
}

/**
 * Generator context managing execution state
 */
interface GeneratorContext {
  /** Previous execution position */
  prev: number;
  /** Next execution position */
  next: number | string;
  /** Value sent into generator */
  sent: any;
  /** Internal sent value storage */
  _sent: any;
  /** Whether generator has completed */
  done: boolean;
  /** Delegated iterator information */
  delegate: DelegateInfo | null;
  /** Current method being invoked */
  method: 'next' | 'throw' | 'return';
  /** Argument for current method */
  arg: any;
  /** Stack of try-catch-finally blocks */
  tryEntries: TryEntry[];
  /** Return value for completed generator */
  rval?: any;
  
  /**
   * Internal invoke method for generator operations
   */
  _invoke(method: string, arg: any): IteratorResult<any>;
  
  /**
   * Reset generator to initial state
   */
  reset(skipTempReset?: boolean): void;
  
  /**
   * Stop generator execution
   */
  stop(): any;
  
  /**
   * Dispatch exception through try-catch blocks
   */
  dispatchException(exception: any): void;
  
  /**
   * Abrupt completion (break, continue, return, throw)
   */
  abrupt(type: CompletionType, arg: any): any;
  
  /**
   * Complete current operation
   */
  complete(record: CompletionRecord, afterLoc?: string | number): any;
  
  /**
   * Finish finally block
   */
  finish(finallyLoc: string | number): any;
  
  /**
   * Catch exception at location
   */
  catch(tryLoc: string | number): any;
  
  /**
   * Delegate to another iterator
   */
  delegateYield(iterable: any, resultName: string, nextLoc: string | number): any;
}

/**
 * Async iterator wrapper for Promises
 */
declare class AsyncIterator {
  constructor(generator: Generator, promise: PromiseConstructor);
  next(arg?: any): Promise<IteratorResult<any>>;
  throw(error: any): Promise<IteratorResult<any>>;
  return(value: any): Promise<IteratorResult<any>>;
}

/**
 * Main regenerator runtime exports
 */
export interface RegeneratorRuntime {
  /**
   * Wrap a generator function with runtime support
   */
  wrap(
    innerFn: Function,
    outerFn?: Function,
    self?: any,
    tryLocsList?: any[]
  ): Generator;
  
  /**
   * Check if a function is a generator function
   */
  isGeneratorFunction(fn: any): boolean;
  
  /**
   * Mark a function as a generator function
   */
  mark<T extends Function>(genFun: T): T;
  
  /**
   * Wrap a value for async/await
   */
  awrap(value: any): { __await: any };
  
  /**
   * Create an async function iterator
   */
  async(
    innerFn: Function,
    outerFn: Function | null,
    self: any,
    tryLocsList: any[],
    promiseImpl?: PromiseConstructor
  ): Promise<any>;
  
  /**
   * AsyncIterator constructor
   */
  AsyncIterator: typeof AsyncIterator;
  
  /**
   * Get iterator for object keys
   */
  keys(object: object): Iterator<string>;
  
  /**
   * Get iterator for iterable values
   */
  values(iterable: any): Iterator<any>;
}

/**
 * Global regenerator runtime instance
 */
declare global {
  var regeneratorRuntime: RegeneratorRuntime;
  
  interface Generator<T = unknown, TReturn = any, TNext = unknown> 
    extends Iterator<T, TReturn, TNext>, GeneratorContext {
    next(...args: [] | [TNext]): IteratorResult<T, TReturn>;
    return(value: TReturn): IteratorResult<T, TReturn>;
    throw(e: any): IteratorResult<T, TReturn>;
    [Symbol.iterator](): Generator<T, TReturn, TNext>;
  }
  
  interface GeneratorFunction {
    new (...args: any[]): Generator;
    (...args: any[]): Generator;
    readonly length: number;
    readonly name: string;
    readonly prototype: Generator;
    displayName?: string;
  }
  
  var GeneratorFunction: GeneratorFunction;
}

export default RegeneratorRuntime;