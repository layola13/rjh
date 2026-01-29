/**
 * DataRequest module - handles data change requests with undo/redo support
 * @module DataRequest
 */

import { Request } from './Request';

/**
 * Represents a data change request that can be committed, undone, and redone.
 * This class encapsulates before/after states and a setter function to apply changes.
 * 
 * @template T - The type of data being changed
 */
export class DataRequest<T = unknown> extends Request {
  /** The state before the change */
  private readonly _before: T;
  
  /** The state after the change */
  private readonly _after: T;
  
  /** Function to apply the state change */
  private readonly _setter: (value: T) => void;
  
  /** The scope (context) in which the setter should be called */
  private readonly _setterScope: unknown;

  /**
   * Creates a new DataRequest instance
   * 
   * @param before - The value before the change
   * @param after - The value after the change
   * @param setter - Function that applies the value change
   * @param setterScope - The context (`this`) for the setter function
   */
  constructor(
    before: T,
    after: T,
    setter: (value: T) => void,
    setterScope: unknown
  ) {
    super();
    this._before = before;
    this._after = after;
    this._setter = setter;
    this._setterScope = setterScope;
  }

  /**
   * Called when the request is committed (applied for the first time)
   * Applies the 'after' state
   */
  onCommit(): void {
    this._setter.call(this._setterScope, this._after);
  }

  /**
   * Called when the request is undone
   * Reverts to the 'before' state
   */
  onUndo(): void {
    this._setter.call(this._setterScope, this._before);
  }

  /**
   * Called when the request is redone
   * Re-applies the 'after' state
   */
  onRedo(): void {
    this._setter.call(this._setterScope, this._after);
  }
}