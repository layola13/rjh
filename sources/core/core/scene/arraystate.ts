import { State } from './State';
import { Arc2DState } from './Arc2DState';
import { Point2DState } from './Point2DState';
import { PointState } from './PointState';
import { Entity } from './Entity';

interface Point2D {
  x: number;
  y: number;
}

interface Point3D extends Point2D {
  z: number;
}

interface ArrayStateData {
  localId: string;
  _des: string;
  isEditable: boolean;
  value: string[];
}

interface DumpOptions {
  [key: string]: unknown;
}

interface LoadOptions {
  [key: string]: unknown;
}

interface DumpedState {
  children?: string[];
  [key: string]: unknown;
}

type DumpCallback = (dump: DumpedState[], state: ArrayState) => void;

declare global {
  interface Array<T> {
    xRemove(item: T): void;
    xPushCollection(items: T[]): void;
  }

  namespace HSConstants {
    enum ModelClass {
      ArrayState = 'ArrayState'
    }
  }
}

export class ArrayState extends State {
  static readonly Class = HSConstants.ModelClass.ArrayState;

  private __children: State[] = [];

  constructor(id: string = '', parent?: State) {
    super(id, parent);
    this.__children = [];
  }

  get children(): State[] {
    return this.__children;
  }

  addItem(item: State, dispatch: boolean = true): void {
    if (dispatch) {
      this.dispatchValueChanging(this, this);
    }
    this.__children.push(item);
    this._bindChildState(item);
    if (dispatch) {
      this.dispatchValueChanged(this, this);
    }
  }

  removeItem(itemOrId: State | string, dispatch: boolean = true): void {
    const item = itemOrId instanceof State 
      ? itemOrId 
      : this.children.find(child => child.id === itemOrId);

    if (item) {
      if (dispatch) {
        this.dispatchValueChanging(this, this);
      }
      this.__children.xRemove(item);
      this._unbindChildState(item);
      if (dispatch) {
        this.dispatchValueChanged(this, this);
      }
    }
  }

  addPoint(point: State): void {
    this.addItem(point);
  }

  removePoint(pointOrId: State | string): void {
    this.removeItem(pointOrId);
  }

  init(data: ArrayStateData, stateMap: Record<string, State> = {}): void {
    this.dispatchValueChanging(this, this);
    this.localId = data.localId;
    this.name = data._des;
    this.isEditable = data.isEditable;

    data.value.forEach(childId => {
      const childState = stateMap[childId];
      this.addItem(childState, false);
    });

    this.dispatchValueChanged(this, this);
  }

  verify(): boolean {
    return !!(
      this.id &&
      (this.name || this.localId) &&
      this.__persistable &&
      this.children.every(child => child.verify())
    );
  }

  verifyBeforeDump(): boolean {
    return this.verify();
  }

  dump(callback?: DumpCallback, options: DumpOptions = {}): DumpedState[] {
    let result = super.dump(callback, options);
    result[0].children = this.children.map(child => child.id);

    this.children.forEach(child => {
      const childDump = State.dumpState(child, options);
      result = result.concat(childDump);
    });

    if (callback) {
      callback(result, this);
    }

    return result;
  }

  load(data: DumpedState, options: LoadOptions = {}): void {
    super.load(data, options);

    this.__children.forEach(child => {
      this._unbindChildState(child);
    });

    this.__children = [];

    const uniqueChildIds = Array.from(new Set(data.children ?? []));
    uniqueChildIds.forEach(childId => {
      const childState = State.loadFromDumpById(childId as string, options);
      if (childState) {
        this.addItem(childState, false);
      }
    });
  }

  toArray(): (Point2D | Point3D)[] {
    return this.toPath();
  }

  toPath(): (Point2D | Point3D)[] {
    const children = this.children;
    const points: (Point2D | Point3D)[] = [];

    for (let i = 0, length = children.length; i < length; ++i) {
      const currentChild = children[i];

      if (currentChild instanceof Arc2DState) {
        const prevIndex = i - 1 < 0 ? length - 1 : i - 1;
        const nextChild = children[i + 1 === length ? 0 : i + 1];
        const prevChild = children[prevIndex];
        const discretePoints = currentChild.getDiscretePoints(nextChild, prevChild);
        points.xPushCollection(discretePoints);
      } else if (currentChild instanceof Point2DState) {
        points.push({
          x: currentChild.x,
          y: currentChild.y
        });
      } else if (currentChild instanceof PointState) {
        points.push({
          x: currentChild.x,
          y: currentChild.y,
          z: currentChild.z
        });
      }
    }

    return this._combineSamePoint(points);
  }

  private _combineSamePoint(points: (Point2D | Point3D)[]): (Point2D | Point3D)[] {
    const uniquePoints: (Point2D | Point3D)[] = [];

    points.reduce((prev, current) => {
      const is3DPrev = 'z' in prev;
      const is3DCurrent = 'z' in current;
      
      const isSame = prev.x === current.x && 
                     prev.y === current.y && 
                     (is3DPrev && is3DCurrent ? prev.z === current.z : !is3DPrev && !is3DCurrent);

      if (!isSame) {
        uniquePoints.push(current);
      }

      return uniquePoints.slice(-1)[0] ?? current;
    }, {} as Point2D | Point3D);

    return uniquePoints;
  }
}

State.registerClass(ArrayState.Class, ArrayState);
State.registerClass('hsw.core.state.ArrayState', ArrayState);
Entity.registerClass(ArrayState.Class, ArrayState);
Entity.registerClass('hsw.core.state.ArrayState', ArrayState);