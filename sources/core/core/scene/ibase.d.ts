/**
 * Base entity module providing core object functionality and state management.
 * @module IBase
 */

import { Signal } from './Signal';

/**
 * Options for field change events
 */
interface FlagChangeOptions {
  flag: number;
  [key: string]: unknown;
}

/**
 * Field change event data
 */
interface FieldChangeEvent<T = unknown> {
  fieldName: string;
  oldValue: T;
  newValue: T;
}

/**
 * Options for defining entity fields
 */
interface DefineFieldOptions {
  enumerable?: boolean;
  configurable?: boolean;
  writable?: boolean;
  [key: string]: unknown;
}

/**
 * Options for defining state fields
 */
interface DefineStateFieldOptions {
  defaultValue?: unknown;
  validator?: (value: unknown) => boolean;
  [key: string]: unknown;
}

/**
 * Base class for all entities in the system.
 * Provides core functionality for field management.
 */
export class IBase {
  /**
   * Sets internal fields on an entity instance.
   * @param entity - Target entity to set fields on
   * @param fields - Key-value pairs of fields to set
   */
  static setEntityFields<T extends IBase>(
    entity: T,
    fields: Record<string, unknown>
  ): void {
    entity.setInternalFields(fields);
  }
}

/**
 * Extended base object with full state management, flags, and signals.
 * Provides lifecycle management, field change tracking, and flag operations.
 */
export class IObject extends IBase {
  /** Unique identifier string */
  protected _id: string = '';
  
  /** Auto-incrementing object ID */
  protected _oid: number;
  
  /** Persistent flag state */
  protected _flag: number = 0;
  
  /** Temporary flag state (can be reset) */
  protected _tempFlag: number = 0;
  
  /** Disposal state indicator */
  protected _disposed: boolean = false;
  
  /** Signal dispatched when flags change */
  signalFlagChanged?: Signal<FlagChangeOptions>;
  
  /** Signal dispatched when fields change */
  signalFieldChanged?: Signal<FieldChangeEvent>;
  
  /** Maximum object ID counter */
  private static _max_oid: number = 0;

  constructor() {
    super();
    this._oid = IObject._max_oid++;
    this.signalFlagChanged = new Signal(this);
    this.signalFieldChanged = new Signal(this);
  }

  /**
   * Defines a state field with change tracking.
   * @param fieldName - Name of the field to define
   * @param defaultValue - Initial value for the field
   * @param options - Additional configuration options
   * @param trackChanges - Whether to track changes to this field
   */
  defineStateField = <T>(
    fieldName: string,
    defaultValue: T,
    options?: DefineStateFieldOptions,
    trackChanges: boolean = true
  ): void => {
    defineStateField(this, fieldName, defaultValue, options, trackChanges);
  };

  /**
   * Raises and dispatches a field change event.
   * @param fieldName - Name of the changed field
   * @param oldValue - Previous value
   * @param newValue - New value
   */
  raiseFieldChanged<T>(fieldName: string, oldValue: T, newValue: T): void {
    this.onFieldChanged(fieldName, oldValue, newValue);
    this.signalFieldChanged?.dispatch({
      fieldName,
      oldValue,
      newValue,
    });
  }

  /**
   * Hook method called when a field changes. Override for custom behavior.
   * @param fieldName - Name of the changed field
   * @param oldValue - Previous value
   * @param newValue - New value
   */
  protected onFieldChanged<T>(
    fieldName: string,
    oldValue: T,
    newValue: T
  ): void {}

  /**
   * Checks if a flag is enabled.
   * @param flag - Flag bit to check
   * @param checkTemp - Whether to also check temporary flags
   * @returns True if flag is on
   */
  isFlagOn(flag: number, checkTemp: boolean = true): boolean {
    return (
      HSCore.Util.Flag.isFlagOn(this._flag, flag) ||
      (checkTemp && HSCore.Util.Flag.isFlagOn(this._tempFlag, flag))
    );
  }

  /**
   * Checks if a flag is disabled.
   * @param flag - Flag bit to check
   * @param checkTemp - Whether to also check temporary flags
   * @returns True if flag is off
   */
  isFlagOff(flag: number, checkTemp: boolean = true): boolean {
    return (
      HSCore.Util.Flag.isFlagOff(this._flag, flag) &&
      (!checkTemp || HSCore.Util.Flag.isFlagOff(this._tempFlag, flag))
    );
  }

  /**
   * Enables a flag.
   * @param flag - Flag bit to enable
   * @param temporary - Whether to set as temporary flag
   * @param options - Additional event options
   */
  setFlagOn(
    flag: number,
    temporary: boolean = false,
    options: Partial<FlagChangeOptions> = {}
  ): void {
    const wasOn = this.isFlagOn(flag);
    
    if (temporary) {
      this._tempFlag = HSCore.Util.Flag.setFlagOn(this._tempFlag, flag);
    } else {
      this._flag = HSCore.Util.Flag.setFlagOn(this._flag, flag);
    }
    
    if (!wasOn) {
      this.signalFlagChanged?.dispatch({ flag, ...options });
    }
  }

  /**
   * Disables a flag.
   * @param flag - Flag bit to disable
   * @param temporary - Whether to clear from temporary flags
   * @param options - Additional event options
   */
  setFlagOff(
    flag: number,
    temporary: boolean = false,
    options: Partial<FlagChangeOptions> = {}
  ): void {
    const wasOff = this.isFlagOff(flag);
    
    if (temporary) {
      this._tempFlag = HSCore.Util.Flag.setFlagOff(this._tempFlag, flag);
    } else {
      this._flag = HSCore.Util.Flag.setFlagOff(this._flag, flag);
    }
    
    if (wasOff !== this.isFlagOff(flag)) {
      this.signalFlagChanged?.dispatch({ flag, ...options });
    }
  }

  /**
   * Resets all temporary flags to zero.
   */
  resetTempFlag(): void {
    this._tempFlag = 0;
  }

  /**
   * Retrieves a value from nested paths.
   * @param paths - Dot-separated path string or array of keys
   * @returns Value at the specified path
   */
  getValueByPaths(paths: string | string[]): unknown {
    return getValueByPaths(paths, this);
  }

  /**
   * Defines a new entity field with descriptor options.
   * @param fieldName - Name of the field
   * @param initialValue - Initial value
   * @param options - Property descriptor options
   */
  defineField<T>(
    fieldName: string,
    initialValue: T,
    options: DefineFieldOptions = {}
  ): void {
    defineEntityField(this, fieldName, initialValue, options);
  }

  /**
   * Defines a map field for storing entity collections.
   * @param fieldName - Name of the map field
   * @param entityType - Type of entities in the map
   * @param options - Additional options
   */
  defineEntityMapField<T>(
    fieldName: string,
    entityType: new (...args: unknown[]) => T,
    options: DefineFieldOptions = {}
  ): void {
    defineEntityMapField(this, fieldName, entityType, options);
  }

  /**
   * Defines a keyed entity map field.
   * @param fieldName - Name of the map field
   * @param entityType - Type of entities in the map
   * @param options - Additional options
   */
  defineKeyEntityMapField<T>(
    fieldName: string,
    entityType: new (...args: unknown[]) => T,
    options: DefineFieldOptions = {}
  ): void {
    defineKeyEntityMapField(this, fieldName, entityType, options);
  }

  /**
   * Updates a field value with change tracking.
   * @param fieldName - Name of field to update
   * @param newValue - New value to set
   */
  updateField<T>(fieldName: string, newValue: T): void {
    updateField(this, fieldName, newValue);
  }

  /**
   * Sets internal fields with double-underscore prefix.
   * @param fields - Fields to set internally
   * @returns This instance for chaining
   */
  setInternalFields(fields: Record<string, unknown>): this {
    Object.keys(fields).forEach((key) => {
      (this as Record<string, unknown>)[`__${key}`] = fields[key];
    });
    return this;
  }

  /**
   * Destroys the object, cleaning up signals and resources.
   */
  destroy(): void {
    if (this._disposed) return;
    
    this.signalFieldChanged?.dispose();
    this.signalFieldChanged = undefined;
    
    this.signalFlagChanged?.dispose();
    this.signalFlagChanged = undefined;
    
    this._disposed = true;
  }
}

// External helper function declarations (assumed to be imported)
declare function defineStateField<T>(
  target: unknown,
  fieldName: string,
  defaultValue: T,
  options?: DefineStateFieldOptions,
  trackChanges?: boolean
): void;

declare function getValueByPaths(
  paths: string | string[],
  target: unknown
): unknown;

declare function defineEntityField<T>(
  target: unknown,
  fieldName: string,
  initialValue: T,
  options: DefineFieldOptions
): void;

declare function defineEntityMapField<T>(
  target: unknown,
  fieldName: string,
  entityType: new (...args: unknown[]) => T,
  options: DefineFieldOptions
): void;

declare function defineKeyEntityMapField<T>(
  target: unknown,
  fieldName: string,
  entityType: new (...args: unknown[]) => T,
  options: DefineFieldOptions
): void;

declare function updateField<T>(
  target: unknown,
  fieldName: string,
  newValue: T
): void;

// Global HSCore namespace declaration
declare global {
  namespace HSCore {
    namespace Util {
      namespace Flag {
        function isFlagOn(flags: number, flag: number): boolean;
        function isFlagOff(flags: number, flag: number): boolean;
        function setFlagOn(flags: number, flag: number): number;
        function setFlagOff(flags: number, flag: number): number;
      }
    }
  }
}