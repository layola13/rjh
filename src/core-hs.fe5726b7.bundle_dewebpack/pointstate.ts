import { State, StateField } from './State';
import { Entity } from './Entity';

interface PointData {
  localId: string;
  _des: string;
  isEditable: boolean;
  value: {
    x: string;
    y: string;
    z: string;
  };
}

interface StateMap {
  [key: string]: State;
}

interface DumpOptions {
  [key: string]: unknown;
}

interface DumpedState {
  x?: string;
  y?: string;
  z?: string;
  [key: string]: unknown;
}

type DumpCallback = (result: DumpedState[], state: PointState) => void;

export class PointState extends State {
  static readonly Class = HSConstants.ModelClass.PointState;

  localId?: string;
  name?: string;
  isEditable?: boolean;

  @StateField(State, {
    validate(value: unknown): boolean {
      return this.validateNumberInput('x', value);
    }
  })
  x?: number;

  @StateField(State, {
    validate(value: unknown): boolean {
      return this.validateNumberInput('y', value);
    }
  })
  y?: number;

  @StateField(State, {
    validate(value: unknown): boolean {
      return this.validateNumberInput('z', value);
    }
  })
  z?: number;

  private __x!: State;
  private __y!: State;
  private __z!: State;
  private __persistable?: boolean;

  constructor(id: string = '', parent?: State) {
    super(id, parent);
  }

  init(pointData: PointData, stateMap: StateMap): void {
    this.dispatchValueChanging(this, this);
    
    this.localId = pointData.localId;
    this.name = pointData._des;
    this.isEditable = pointData.isEditable;

    (['x', 'y', 'z'] as const).forEach((axis) => {
      const stateId = pointData.value[axis];
      const childState = stateMap[stateId];
      this[`__${axis}` as '__x' | '__y' | '__z'] = childState;
      this._bindChildState(childState);
    });

    this.dispatchValueChanged(this, this);
  }

  verify(): boolean {
    return !!(
      this.id &&
      this.__persistable &&
      this.__x.verify?.() &&
      this.__y.verify?.() &&
      this.__z.verify?.()
    );
  }

  verifyBeforeDump(): boolean {
    return this.verify();
  }

  dump(callback?: DumpCallback, options: DumpOptions = {}): DumpedState[] {
    let result = super.dump(callback, options);
    const mainState = result[0];

    mainState.x = this.__x.id;
    mainState.y = this.__y.id;
    mainState.z = this.__z.id;

    (['x', 'y', 'z'] as const).forEach((axis) => {
      const childState = this[`__${axis}` as '__x' | '__y' | '__z'];
      if (!childState) return;

      const dumpedChild = State.dumpState(childState, options);
      result = result.concat(dumpedChild);
    });

    callback?.(result, this);
    return result;
  }

  load(loadedData: DumpedState, options: DumpOptions = {}): void {
    super.load(loadedData, options);

    (['x', 'y', 'z'] as const).forEach((axis) => {
      const stateId = loadedData[axis];
      if (!stateId) return;

      const childState = State.loadFromDumpById(stateId as string, options);
      if (childState) {
        this[`__${axis}` as '__x' | '__y' | '__z'] = childState;
        this._bindChildState(childState);
      }
    });
  }
}

State.registerClass(PointState.Class, PointState);
State.registerClass('hsw.core.state.PointState', PointState);
Entity.registerClass(PointState.Class, PointState);
Entity.registerClass('hsw.core.state.PointState', PointState);