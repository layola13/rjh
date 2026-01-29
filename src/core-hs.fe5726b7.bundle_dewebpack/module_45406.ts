import { PModel_IO, PModel, PModelValueProperties } from './PModel';
import { Entity } from './Entity';
import { Material } from './Material';
import { ArrayState } from './ArrayState';
import { PointState } from './PointState';
import { defineFields } from './defineFields';
import { StateUtil } from './StateUtil';

interface DumpOptions {
  [key: string]: unknown;
}

interface LoadOptions {
  states: Record<string, ArrayState>;
  statesData: Record<string, unknown>;
}

interface DumpResult {
  height: string;
  paths?: string[];
  [key: string]: unknown;
}

interface CreateParameters {
  localId: string;
  material: unknown;
  parameters?: {
    x?: number | null;
    y?: number | null;
    z?: number | null;
    paths?: unknown[];
    height?: number;
  };
}

interface Point2D {
  x: number;
  y: number;
}

interface Point3D extends Point2D {
  z: number;
}

interface BoundingBox {
  square: {
    maxX: number;
    maxY: number;
    minX: number;
    minY: number;
    minZ: number;
    maxZ: number;
  };
  center: Point3D;
  XSize: number;
  YSize: number;
  ZSize: number;
}

interface UpdateParams {
  height?: number;
  paths?: ArrayState[] | Point2D[][] | Point3D[][];
}

export class PExtruding_IO extends PModel_IO {
  dump(
    entity: PExtruding,
    callback?: (result: [DumpResult, ...unknown[]], entity: PExtruding) => void,
    includeChildren: boolean = true,
    options: DumpOptions = {}
  ): [DumpResult, ...unknown[]] {
    const result = super.dump(entity, undefined, includeChildren, options);
    const data = result[0] as DumpResult;
    
    data.height = entity.__height.id;
    
    if (entity.paths) {
      data.paths = entity.__paths.map((path: ArrayState) => path.id);
    }
    
    if (callback) {
      callback(result, entity);
    }
    
    return result;
  }

  load(entity: PExtruding, data: DumpResult, options: LoadOptions = {} as LoadOptions): void {
    super.load(entity, data, options);
    
    entity.__paths = [];
    
    data.paths?.forEach((pathId: string) => {
      let pathState = options.states[pathId];
      
      if (!pathState) {
        pathState = new ArrayState(pathId);
        options.states[pathState.id] = pathState;
        pathState.load(options.statesData[pathId], options);
      }
      
      pathState.bindObjectFieldChanged(entity, 'paths');
      entity.__paths.push(pathState);
    });
    
    entity.__height = options.states[data.height];
    entity.__height.bindObjectFieldChanged(entity, 'height');
  }
}

export class PExtruding extends PModel {
  __height!: ArrayState;
  __paths!: ArrayState[];
  private _direction?: Point3D;

  constructor(id: string = '', parent?: unknown) {
    super(id, parent);
    
    this.defineStateField('height', 0);
    
    this.defineField('paths', [], {
      set: (value: unknown) => {
        const previousPaths = this.paths;
        const normalizedPaths = this.normalizePaths(value);
        this.__paths = normalizedPaths;
        this.onFieldChanged('paths', previousPaths, normalizedPaths);
      }
    });
  }

  private normalizePaths(value: unknown): ArrayState[] {
    if (this.isArrayStateArray(value)) {
      return value;
    }
    
    if (Array.isArray(value) && this.isNestedArray(value)) {
      if (this.isPointStateNestedArray(value)) {
        return value.map((points: PointState[]) => {
          const arrayState = new ArrayState();
          points.forEach((point: PointState) => {
            arrayState.addPoint(point);
          });
          return arrayState;
        });
      }
      
      if (this.isPoint2DNestedArray(value)) {
        return StateUtil.pathsToArrayStates(value);
      }
      
      throw new Error('invalid paths');
    }
    
    throw new Error('invalid paths');
  }

  private isArrayStateArray(value: unknown): value is ArrayState[] {
    return Array.isArray(value) && value.every((item) => item instanceof ArrayState);
  }

  private isNestedArray(value: unknown[]): boolean {
    return value.every((item) => Array.isArray(item));
  }

  private isPointStateNestedArray(value: unknown[]): value is PointState[][] {
    return value.every((arr) => 
      Array.isArray(arr) && arr.every((item) => item instanceof PointState)
    );
  }

  private isPoint2DNestedArray(value: unknown[]): value is Point2D[][] {
    return value.every((arr) =>
      Array.isArray(arr) && arr.every((item) => this.isPoint(item))
    );
  }

  private isPoint(value: unknown): value is Point2D | Point3D {
    const point = value as Record<string, unknown>;
    return ['x', 'y', 'z'].every((key) => point[key] !== undefined);
  }

  static create(params: CreateParameters): PExtruding {
    const extruding = new PExtruding();
    extruding.localId = params.localId;
    extruding.material = Material.create(params.material);
    
    const parameters = params.parameters;
    if (parameters) {
      extruding.__x.__value = parameters.x ?? 0;
      extruding.__y.__value = parameters.y ?? 0;
      extruding.__z.__value = parameters.z ?? 0;
      
      if (!parameters.paths || !Array.isArray(parameters.paths)) {
        throw new Error('not a valid paths');
      }
      
      extruding.__paths = parameters.paths as ArrayState[];
      extruding.__height.__value = parameters.height ?? 0;
    }
    
    return extruding;
  }

  defineValueProperties(): void {
    const properties: Record<string, unknown> = {};
    
    Object.keys(PModelValueProperties).forEach((key: string) => {
      const propertyName = `${key}Value`;
      properties[propertyName] = {
        initialValue: undefined,
        get: () => {
          const parent = this.getUniqueParent();
          if (parent instanceof HSCore.Model.PAssembly) {
            const stateKey = `${this.localId}_${PModelValueProperties[key]}`;
            if (parent.states[stateKey]) {
              return parent.states[stateKey].__value;
            }
          }
          return this[key as keyof this];
        }
      };
    });
    
    defineFields(this, properties);
  }

  verify(): boolean {
    const parentValid = super.verify();
    if (!parentValid) {
      return false;
    }
    
    if (!this.__height || !this.__height.verify()) {
      log.error(`${this.tag}: invalid height.`, 'HSCore.Verify.Error', true);
      return false;
    }
    
    if (!this.__paths || this.__paths.length === 0) {
      log.error(`${this.tag}: invalid path.`, 'HSCore.Verify.Error', true);
      return false;
    }
    
    const allPathsValid = this.__paths.every((path) => path.verify());
    if (!allPathsValid) {
      log.error(`${this.tag}: invalid path.`, 'HSCore.Verify.Error', true);
      return false;
    }
    
    return true;
  }

  getIO(): PExtruding_IO {
    return PExtruding_IO.instance();
  }

  update(params: UpdateParams): void {
    const { height, paths } = params;
    
    if (height !== undefined) {
      this.height = height;
    }
    
    if (paths !== undefined) {
      this.paths = paths;
    }
  }

  isContentInRoom(room: unknown, checkBounds: boolean = false): boolean {
    return this.getUniqueParent().isContentInRoom(room, checkBounds);
  }

  isContentInLoop(loop: unknown, checkBounds: boolean = false): boolean {
    return this.getUniqueParent().isContentInLoop(loop, checkBounds);
  }

  refreshBoundInternal(): void {
    const topPaths = this.getTopPaths();
    const bound = HSCore.Util.Collision.getPolygonBound(topPaths[0]);
    
    this.outline[3] = { x: bound.minx, y: bound.maxy };
    this.outline[2] = { x: bound.maxx, y: bound.maxy };
    this.outline[1] = { x: bound.maxx, y: bound.miny };
    this.outline[0] = { x: bound.minx, y: bound.miny };
    
    this.boundInternal.reset();
    for (let i = 0; i < 4; ++i) {
      this.boundInternal.appendPoint(this.outline[i]);
    }
  }

  onFieldChanged(fieldName: string, oldValue: unknown, newValue: unknown): void {
    if (fieldName === 'paths' || fieldName === 'height') {
      this.dirty();
      this.signalGeometryChanged.dispatch();
    }
    
    super.onFieldChanged(fieldName, oldValue, newValue);
  }

  getPaths(): Point2D[][] {
    return this.paths.map((path: ArrayState) => path.toArray());
  }

  getTopPaths(): Point2D[][] {
    const paths = this.paths.map((path: ArrayState) => path.toArray());
    
    if (!this._direction) {
      return paths;
    }
    
    const direction = new THREE.Vector3(
      this._direction.x,
      this._direction.y,
      this._direction.z
    ).normalize();
    
    const upVector = new THREE.Vector3(0, 0, 1);
    const downVector = new THREE.Vector3(0, 0, -1);
    
    if (
      GeLib.VectorUtils.isSameDirection(direction, upVector) ||
      GeLib.VectorUtils.isSameDirection(direction, downVector)
    ) {
      return paths;
    }
    
    const boundingBox = this._getPolygonBoundingBox3d(paths[0]);
    if (!boundingBox) {
      return paths;
    }
    
    const rightVector = new THREE.Vector3(1, 0, 0);
    const leftVector = new THREE.Vector3(-1, 0, 0);
    
    if (GeLib.VectorUtils.isSameDirection(direction, rightVector)) {
      return [
        [
          { x: boundingBox.square.minX, y: boundingBox.square.maxY },
          { x: boundingBox.square.minX, y: boundingBox.square.minY },
          { x: boundingBox.square.minX + this.height, y: boundingBox.square.minY },
          { x: boundingBox.square.minX + this.height, y: boundingBox.square.maxY }
        ]
      ];
    }
    
    if (GeLib.VectorUtils.isSameDirection(direction, leftVector)) {
      return [
        [
          { x: boundingBox.square.minX - this.height, y: boundingBox.square.maxY },
          { x: boundingBox.square.minX - this.height, y: boundingBox.square.minY },
          { x: boundingBox.square.minX, y: boundingBox.square.minY },
          { x: boundingBox.square.minX, y: boundingBox.square.maxY }
        ]
      ];
    }
    
    assert(false, 'unhandled direction');
    return paths;
  }

  forEachState(callback: (state: unknown) => void): void {
    this.paths.forEach((path: ArrayState) => {
      if (path.children) {
        path.children.forEach((child: unknown) => {
          callback(child);
        });
      }
      callback(path);
    });
  }

  forEachPath(callback: (path: unknown) => void): void {
    const parent = this.getFirstParent();
    const pathIds = this.__paths.value;
    
    parent.forEachChild((child: { localId: string }) => {
      if (pathIds.indexOf(child.localId) !== -1) {
        callback(child);
      }
    });
  }

  setDirection(direction: Point3D): void {
    this._direction = direction;
    this._invalidateSubgraph();
  }

  private _getPolygonBoundingBox3d(points: (Point2D | Point3D)[]): BoundingBox | undefined {
    if (!points || points.length <= 2) {
      return undefined;
    }
    
    let maxX = -Infinity;
    let maxY = -Infinity;
    let maxZ = -Infinity;
    let minX = Infinity;
    let minY = Infinity;
    let minZ = Infinity;
    
    for (let i = 0, length = points.length; i < length; i++) {
      const point = points[i];
      maxX = Math.max(point.x, maxX);
      minX = Math.min(point.x, minX);
      maxY = Math.max(point.y, maxY);
      minY = Math.min(point.y, minY);
      
      const point3d = point as Point3D;
      if (point3d.z !== undefined) {
        maxZ = Math.max(point3d.z, maxZ);
        minZ = Math.min(point3d.z, minZ);
      }
    }
    
    return {
      square: { maxX, maxY, minX, minY, minZ, maxZ },
      center: {
        x: (minX + maxX) / 2,
        y: (maxY + minY) / 2,
        z: (maxZ + minZ) / 2
      },
      XSize: maxX - minX,
      YSize: maxY - minY,
      ZSize: maxZ - minZ
    };
  }
}

Entity.registerClass(HSConstants.ModelClass.NgPExtruding, PExtruding);