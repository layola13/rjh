import { Logger } from './Logger';
import { Signal, SignalHook } from './Signal';

interface StateData {
  l?: string;
  id: string;
  localId?: string;
  name?: string;
  value?: unknown;
  isEditable?: boolean;
  Class?: string;
}

interface DumpOptions {
  callback?: (state: State) => void;
  statesData?: Record<string, StateData>;
  states?: Record<string, State>;
  stateIdGenerator?: {
    generate: (id: string) => string;
    getNewId?: (id: string) => string;
  };
  getStateById?: (id: string) => State | undefined;
}

interface LoadOptions extends DumpOptions {}

interface FieldChangedData {
  object: State;
  fieldName?: string;
  oldValue: unknown;
  newValue: unknown;
  name?: string;
  value?: unknown;
}

interface SignalData {
  data: FieldChangedData;
}

interface StateFieldOptions<T = unknown> {
  prefix?: string;
  defaultValue?: T;
  persistable?: boolean;
  get?: (this: any) => T;
  set?: (this: any, value: T | State) => void;
  partialSet?: (this: any, value: T | State) => void;
  validate?: (this: any, value: T | State) => boolean;
  partialSetState?: (this: any, state: State) => void;
  setState?: (this: any, state: State) => void;
  getState?: (this: any, create?: boolean) => State | undefined;
  equals?: (this: any, value: T | State) => boolean;
  binaryEqual?: (oldValue: T, newValue: T) => boolean;
}

type StateConstructor = new (id?: string, doc?: any) => State;

declare global {
  const HSCore: {
    Util: {
      IDGenerator: {
        generate: (prefix: string, type: any) => string;
      };
      IDGeneratorType: {
        State: symbol;
      };
      Object: {
        isValidNumber: (value: unknown) => boolean;
      };
      Math: {
        nearlyEquals: (a: number, b: number) => boolean;
      };
    };
    Doc: {
      getDocManager: () => {
        activeDocument: any;
      };
    };
  };
  const HSConstants: {
    ClassLNameToSName: Map<string, string>;
    ClassSNameToLName: Map<string, string>;
    ModelClass: {
      State: string;
    };
  };
  function assert(condition: boolean, message: string, context: string): void;
  const log: {
    error: (message: string, context: string) => void;
  };
}

class State<T = unknown> {
  static readonly Class: string = HSConstants.ModelClass.State;
  private static _constructorByClassName: Map<string, StateConstructor> = new Map();

  readonly id: string;
  localId: string = "";
  name: string = "Default";
  isEditable: boolean = true;

  private __value: T | undefined = undefined;
  private __persistable: boolean = true;
  private _disposed: boolean = false;
  private _doc: any;
  private _signalValueChanging: Signal;
  private _signalValueChanged: Signal;
  private _signalHook: SignalHook;
  private _tag?: string;

  constructor(idPrefix: string = "", doc?: any) {
    this.id = HSCore.Util.IDGenerator.generate(idPrefix, HSCore.Util.IDGeneratorType.State);
    this._doc = doc || HSCore.Doc.getDocManager().activeDocument;
    this._signalValueChanging = new Signal(this);
    this._signalValueChanged = new Signal(this);
    this._signalHook = new SignalHook();
    this._doc.stateManager.add(this);
  }

  get value(): T | undefined {
    return this.__value;
  }

  set value(newValue: T | undefined) {
    const oldValue = this.__value;
    if (oldValue !== newValue) {
      this.dispatchValueChanging(oldValue, newValue);
      this.__value = newValue;
      this.dispatchValueChanged(oldValue, newValue);
    }
  }

  get ID(): string {
    return this.id;
  }

  getClassName(): string {
    const classConstructor = this.constructor as any;
    const className = classConstructor.Class || classConstructor.prototype.Class;
    return className ? className.slice(className.lastIndexOf(".") + 1) : this.constructor.name;
  }

  get tag(): string {
    if (!this._tag) {
      this._tag = `${this.getClassName()}-${this.id}`;
    }
    return this._tag;
  }

  init(data: StateData, options?: LoadOptions): void {
    this.localId = data.localId ?? "";
    this.__value = data.value as T;
    this.name = data.name ?? "Default";
    this.isEditable = !!data.isEditable;
  }

  validateNumberInput(fieldName: string, value: unknown): boolean {
    const isValid = value instanceof State || HSCore.Util.Object.isValidNumber(value);
    if (!isValid) {
      assert(false, `${this.tag}: invalid ${fieldName}.`, "HSCore.State");
    }
    return isValid;
  }

  verify(): boolean {
    return !!(this.id && this.__persistable && this.__value !== undefined && this.__value !== null);
  }

  verifyBeforeDump(): boolean {
    return this.verify();
  }

  dump(callback?: (state: State) => void, options: DumpOptions = {}): StateData[] {
    if (!this.verifyBeforeDump()) {
      log.error(`${this.tag} verify failed!`, "HSCore.Dump.Error");
    }

    const classConstructor = this.constructor as any;
    const dumpData: StateData = {
      l: HSConstants.ClassLNameToSName.get(classConstructor.Class),
      id: this.id
    };

    if (options.statesData) {
      options.statesData[this.id] = dumpData;
    }

    if (this.localId) {
      dumpData.localId = this.localId;
    }

    if (this.name && this.name !== "Default") {
      dumpData.name = this.name;
    }

    if (this.__value != null) {
      dumpData.value = this.__value;
    }

    if (this.isEditable) {
      dumpData.isEditable = this.isEditable;
    }

    return [dumpData];
  }

  load(data: StateData | undefined, options: LoadOptions = {}): void {
    if (!data) return;

    if (data.localId) {
      this.localId = data.localId;
    }

    if (data.name) {
      this.name = data.name;
    }

    this.__value = data.value as T;
    this.isEditable = !!data.isEditable;
  }

  bindObjectFieldChanged(owner: any, fieldName: string): void {
    this._signalHook.listen(this._signalValueChanged, (signalData: SignalData) => {
      const oldValue = signalData.data.oldValue;
      const newValue = signalData.data.newValue ?? signalData.data.value;
      owner.raiseFieldChanged(fieldName, oldValue, newValue);
    }, owner);
  }

  raiseFieldChanged(fieldName: string, oldValue: unknown, newValue: unknown): void {
    this.onFieldChanged(fieldName, oldValue, newValue);
    this.dispatchValueChanged(oldValue, newValue, fieldName);
  }

  onFieldChanged(fieldName: string, oldValue: unknown, newValue: unknown): void {
    // Override in subclasses
  }

  dispatchValueChanging(oldValue: unknown, newValue: unknown, fieldName?: string): void {
    this._signalValueChanging.dispatch({
      object: this,
      fieldName,
      oldValue,
      newValue
    });
  }

  dispatchValueChanged(oldValue: unknown, newValue: unknown, fieldName?: string): void {
    this._signalValueChanged.dispatch({
      object: this,
      fieldName,
      oldValue,
      newValue,
      name: fieldName,
      value: newValue
    });
  }

  protected _bindChildState(childState: State | undefined, fieldName: string): void {
    childState?.bindOwnerObject(
      this,
      (signalData: SignalData) => {
        const data = signalData?.data ?? { object: childState };
        this.dispatchValueChanging(data, data, fieldName);
      },
      (signalData: SignalData) => {
        const data = signalData?.data ?? { object: childState };
        this.dispatchValueChanged(data, data, fieldName);
      }
    );
  }

  protected _unbindChildState(childState: State | undefined): void {
    childState?.unbindOwnerObject(this);
  }

  bindOwnerObject(
    owner: any,
    onChanging: (data: SignalData) => void,
    onChanged: (data: SignalData) => void
  ): void {
    this._signalHook.listen(this._signalValueChanging, onChanging.bind(owner));
    this._signalHook.listen(this._signalValueChanged, onChanged.bind(owner));
  }

  unbindOwnerObject(owner: any): void {
    this._signalHook.unlistenGroup(owner);
  }

  unbindObject(owner: any): void {
    this.unbindOwnerObject(owner);
  }

  unbindAll(): void {
    this._signalHook.unlistenAll();
  }

  destroy(): void {
    this._signalHook.dispose();
    (this._signalHook as any) = undefined;
    this._signalValueChanging.dispose();
    (this._signalValueChanging as any) = undefined;
    this._signalValueChanged.dispose();
    (this._signalValueChanged as any) = undefined;
    this._disposed = true;
  }

  setValueSilent(value: T): void {
    this.__value = value;
  }

  static registerClass(className: string, constructor: StateConstructor): void {
    constructor.prototype.Class = className;
    State._constructorByClassName.set(className, constructor);
  }

  static getClass(className: string): StateConstructor | undefined {
    let fullClassName = HSConstants.ClassSNameToLName.get(className);
    if (!fullClassName) {
      fullClassName = className;
    }
    return State._constructorByClassName.get(fullClassName);
  }

  static createFromDump(data: StateData | undefined, options: DumpOptions = {}): State | undefined {
    if (!data) return undefined;

    let stateId = data.id;
    if (options.stateIdGenerator) {
      stateId = options.stateIdGenerator.generate(stateId);
    }

    if (stateId && options.states) {
      const existingState = options.states[stateId];
      if (existingState) return existingState;
    }

    let StateClass = State.getClass(data.l ?? data.Class ?? "");
    if (!StateClass) {
      StateClass = State;
    }

    const state = new StateClass(stateId);

    if (options.states) {
      options.states[state.id] = state;
    }

    state.load(data, options);
    return state;
  }

  static dumpState(state: State, options: DumpOptions = {}): StateData[] {
    const cachedData = options.statesData?.[state.id];
    return cachedData ? [cachedData] : state.dump(options.callback, options);
  }

  static loadFromDump(
    data: StateData | undefined,
    options: LoadOptions = {},
    reload: boolean = false
  ): State | undefined {
    if (!data) return undefined;

    const existingState = State.getExistingState(data.id, options);
    if (existingState) {
      if (reload) {
        existingState.load(data, options);
      }
      return existingState;
    }

    return State.createFromDump(data, options);
  }

  static loadFromDumpById(
    stateId: string | undefined,
    options: LoadOptions = {},
    reload: boolean = false
  ): State | undefined {
    if (!stateId) return undefined;

    const existingState = State.getExistingState(stateId, options);
    const stateData = options.statesData?.[stateId];

    if (existingState) {
      if (reload && stateData) {
        existingState.load(stateData, options);
      }
      return existingState;
    }

    return stateData ? State.createFromDump(stateData, options) : undefined;
  }

  static getExistingState(stateId: string | undefined, options: LoadOptions = {}): State | undefined {
    if (!stateId) return undefined;

    let finalId = stateId;
    if (options.stateIdGenerator?.getNewId) {
      finalId = options.stateIdGenerator.getNewId(stateId);
    }

    if (!finalId) return undefined;

    if (options.getStateById) {
      return options.getStateById(finalId);
    }

    return options.states?.[finalId];
  }
}

function StateField<T = unknown>(
  StateClass?: StateConstructor,
  options: StateFieldOptions<T> = {}
): PropertyDecorator {
  return (target: any, propertyKey: string | symbol): any => {
    const fieldName = propertyKey as string;
    const prefix = options.prefix ?? "__";
    const privateFieldName = prefix + fieldName;

    const setStateInternal = options.setState ?? function (this: any, state: State): void {
      if (options.partialSetState) {
        options.partialSetState.call(this, state);
      } else {
        this[privateFieldName] = state;
      }
      if (state) {
        this._bindChildState(state, fieldName);
      }
    };

    const getStateInternal = options.getState ?? function (this: any, createIfMissing: boolean = true): State | undefined {
      let state = this[privateFieldName];
      if (createIfMissing && !(state instanceof State)) {
        const newState = StateClass ? new StateClass() : new State();
        newState.__persistable = options.persistable !== false;
        newState.__value = options.defaultValue;
        state = newState;
        setStateInternal.call(this, state);
      }
      return state;
    };

    const getterWithCreate = options.get ?? function (this: any): T | undefined {
      const state = getStateInternal.call(this, true);
      return state?.value as T;
    };

    const getterWithoutCreate = options.get ?? function (this: any): T | undefined {
      const state = getStateInternal.call(this, false);
      return state?.value as T;
    };

    const equalsCheck = options.equals ?? function (this: any, newValue: T | State): boolean {
      const state = getStateInternal.call(this, true);
      if (newValue instanceof State && newValue === state) {
        return true;
      }
      if (state) {
        const currentValue = getterWithoutCreate.call(this);
        if (typeof newValue === "number" && typeof currentValue === "number") {
          return HSCore.Util.Math.nearlyEquals(newValue, currentValue);
        }
        return newValue === currentValue;
      }
      return false;
    };

    const binaryEqualCheck = options.binaryEqual;

    const setterInternal = options.set ?? function (this: any, newValue: T | State): void {
      const isStateInstance = newValue instanceof State;
      const createState = !isStateInstance;
      let state = getStateInternal.call(this, createState);

      if (!state && createState) {
        if (!options.getState) {
          Logger.console.assert(false, `undefined state ${fieldName}`);
        }
        return;
      }

      if (options.validate && !options.validate.call(this, newValue)) {
        return;
      }

      if (equalsCheck && equalsCheck.call(this, newValue)) {
        return;
      }

      const oldValue = getterWithoutCreate.call(this);

      if (!equalsCheck && binaryEqualCheck && binaryEqualCheck(oldValue as T, newValue as T)) {
        return;
      }

      let oldState: State | undefined;
      const actualValue = newValue instanceof State ? newValue.value : newValue;

      if (options.partialSet) {
        options.partialSet.call(this, newValue);
      } else if (isStateInstance) {
        oldState = state;
        if (typeof this.dispatchValueChanging === "function") {
          this.dispatchValueChanging(oldValue, actualValue, fieldName);
        }
        this._unbindChildState(oldState);
        setStateInternal.call(this, newValue as State);
        state = newValue as State;
      } else {
        (state as State).value = actualValue;
      }

      if (isStateInstance && typeof this.dispatchValueChanged === "function") {
        this.dispatchValueChanged(oldValue, actualValue, fieldName);
      }
    };

    return {
      get(this: any): T | undefined {
        return getterWithCreate.call(this);
      },
      set(this: any, value: T | State): void {
        setterInternal.call(this, value);
      }
    };
  };
}

State.registerClass(State.Class, State);

export { State, StateField };