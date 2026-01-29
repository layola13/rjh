import { State, StateField } from './State';
import { Entity } from './Entity';

interface Point2D {
  x: number;
  y: number;
}

interface Arc2DConfig {
  localId: string;
  _des: string;
  isEditable: boolean;
  value: {
    x: string;
    y: string;
    centerAngle: string;
  };
}

interface DumpOptions {
  [key: string]: unknown;
}

interface DumpedState {
  x?: string;
  y?: string;
  centerAngle?: string;
  [key: string]: unknown;
}

export class Arc2DState extends State {
  static readonly Class = HSConstants.ModelClass.Arc2DState;

  localId?: string;
  name?: string;
  isEditable?: boolean;

  private __x!: State;
  private __y!: State;
  private __centerAngle!: State;

  @StateField(State, {
    validate(value: unknown): boolean {
      return this.validateNumberInput('x', value);
    }
  })
  x!: number;

  @StateField(State, {
    validate(value: unknown): boolean {
      return this.validateNumberInput('y', value);
    }
  })
  y!: number;

  @StateField(State, {
    validate(value: unknown): boolean {
      return this.validateNumberInput('centerAngle', value);
    }
  })
  centerAngle!: number;

  constructor(id: string = '', parent?: State) {
    super(id, parent);
  }

  init(config: Arc2DConfig, stateMap: Record<string, State>): void {
    this.dispatchValueChanging(this, this);
    
    this.localId = config.localId;
    this.name = config._des;
    this.isEditable = config.isEditable;

    ['x', 'y', 'centerAngle'].forEach((propName) => {
      const stateId = config.value[propName as keyof typeof config.value];
      const childState = stateMap[stateId];
      (this as any)[`__${propName}`] = childState;
      this._bindChildState(childState);
    });

    this.dispatchValueChanged(this, this);
  }

  getDiscretePoints(startPoint: Point2D, endPoint: Point2D): Point2D[] {
    const points: Point2D[] = [];
    
    const start: Point2D = {
      x: startPoint.x,
      y: startPoint.y
    };
    const end: Point2D = {
      x: endPoint.x,
      y: endPoint.y
    };

    const centerX = this.x;
    const centerY = this.y;
    const angleRadians = this.centerAngle * Math.PI / 180;

    start.x -= centerX;
    start.y -= centerY;
    end.x -= centerX;
    end.y -= centerY;

    const radius = Math.sqrt(start.x * start.x + start.y * start.y);
    const startAngle = Math.atan2(start.y, start.x);
    
    const TOLERANCE = 0.001;
    const angleStep = 2 * Math.acos(1 - TOLERANCE / radius);
    const segmentCount = Math.floor(Math.abs(angleRadians) / angleStep) + 2;
    const angleIncrement = angleRadians / segmentCount;

    for (let i = segmentCount - 1; i > 0; --i) {
      points.push({
        x: radius * Math.cos(startAngle + i * angleIncrement) + centerX,
        y: radius * Math.sin(startAngle + i * angleIncrement) + centerY
      });
    }

    return points;
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

  dump(callback?: (result: DumpedState[], state: this) => void, options: DumpOptions = {}): DumpedState[] {
    let result = super.dump(callback, options);
    const mainState = result[0];

    mainState.x = this.__x.id;
    mainState.y = this.__y.id;
    mainState.centerAngle = this.__centerAngle.id;

    ['x', 'y', 'centerAngle'].forEach((propName) => {
      const childState = (this as any)[`__${propName}`] as State | undefined;
      if (!childState) return;

      const dumpedChild = State.dumpState(childState, options);
      result = result.concat(dumpedChild);
    });

    if (callback) {
      callback(result, this);
    }

    return result;
  }

  load(data: DumpedState, options: DumpOptions = {}): void {
    super.load(data, options);

    ['x', 'y', 'centerAngle'].forEach((propName) => {
      const stateId = data[propName] as string | undefined;
      if (!stateId) return;

      const loadedState = State.loadFromDumpById(stateId, options);
      if (loadedState) {
        (this as any)[`__${propName}`] = loadedState;
        this._bindChildState(loadedState);
      }
    });
  }
}

State.registerClass(Arc2DState.Class, Arc2DState);
Entity.registerClass(Arc2DState.Class, Arc2DState);