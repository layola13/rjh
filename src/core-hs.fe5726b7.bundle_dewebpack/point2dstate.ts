import { State, StateField } from './State';
import { Entity } from './Entity';

class Point2DState extends State {
  static readonly Class = HSConstants.ModelClass.Point2DState;

  private __x!: State;
  private __y!: State;

  @StateField(State, {
    validate(this: Point2DState, value: unknown): boolean {
      return this.validateNumberInput('x', value);
    }
  })
  x!: number;

  @StateField(State, {
    validate(this: Point2DState, value: unknown): boolean {
      return this.validateNumberInput('y', value);
    }
  })
  y!: number;

  constructor(id: string = '', parent?: State) {
    super(id, parent);
  }

  init(source: PointSource, stateMap: Record<string, State>): void {
    this.dispatchValueChanging(this, this);
    this.localId = source.localId;
    this.name = source._des;
    this.isEditable = source.isEditable;

    ['x', 'y'].forEach((axis) => {
      const childState = stateMap[source.value[axis]];
      this[`__${axis}` as '__x' | '__y'] = childState;
      this._bindChildState(childState);
    });

    this.dispatchValueChanged(this, this);
  }

  verify(): boolean {
    return !!(
      this.id &&
      this.__persistable &&
      this.__x.verify &&
      this.__x.verify() &&
      this.__y.verify &&
      this.__y.verify()
    );
  }

  verifyBeforeDump(): boolean {
    return this.verify();
  }

  dump(callback?: DumpCallback, options: DumpOptions = {}): DumpResult[] {
    let results = super.dump(callback, options);
    const primaryDump = results[0];

    primaryDump.x = this.__x.id;
    primaryDump.y = this.__y.id;

    ['x', 'y'].forEach((axis) => {
      const childState = this[`__${axis}` as '__x' | '__y'];
      if (!childState) return;

      const childDump = State.dumpState(childState, options);
      results = results.concat(childDump);
    });

    if (callback) {
      callback(results, this);
    }

    return results;
  }

  load(data: LoadData, options: LoadOptions = {}): void {
    super.load(data, options);

    ['x', 'y'].forEach((axis) => {
      const stateId = data[axis];
      const childState = State.loadFromDumpById(stateId, options);
      if (childState) {
        this[`__${axis}` as '__x' | '__y'] = childState;
        this._bindChildState(childState);
      }
    });
  }
}

interface PointSource {
  localId: string;
  _des: string;
  isEditable: boolean;
  value: {
    x: string;
    y: string;
  };
}

interface DumpOptions {
  [key: string]: unknown;
}

interface LoadOptions {
  [key: string]: unknown;
}

interface DumpResult {
  x?: string;
  y?: string;
  [key: string]: unknown;
}

interface LoadData {
  x: string;
  y: string;
  [key: string]: unknown;
}

type DumpCallback = (results: DumpResult[], state: Point2DState) => void;

State.registerClass(Point2DState.Class, Point2DState);
Entity.registerClass(Point2DState.Class, Point2DState);

export { Point2DState };