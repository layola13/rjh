import { Light_IO, Light, LightTypeEnum } from './Light';
import { Entity } from './Entity';
import { SignalHook } from './SignalHook';
import { EntityField } from './decorators';
import { Loop } from './Loop';

const TOLERANCE = 0.01;

interface Point {
  x: number;
  y: number;
}

interface PathSegment {
  startPoint: Point;
  endPoint: Point;
}

interface PathData {
  paths: PathSegment[];
  perimeter: number;
  distance?: number;
  eleId?: number;
  contours?: unknown[];
}

interface LoadOptions {
  version?: string;
  [key: string]: unknown;
}

interface DumpOptions {
  [key: string]: unknown;
}

interface RenderParameters {
  temperature: number;
  intensity: number;
  entityId?: string;
  close: boolean;
  rgb: number[];
}

export class MeshLight_IO extends Light_IO {
  private static _instance?: MeshLight_IO;

  static instance(): MeshLight_IO {
    if (!MeshLight_IO._instance) {
      MeshLight_IO._instance = new MeshLight_IO();
    }
    return MeshLight_IO._instance;
  }

  dump(
    entity: MeshLight,
    callback?: (data: unknown[], entity: MeshLight) => void,
    includeChildren: boolean = true,
    options: DumpOptions = {}
  ): unknown[] {
    const result = super.dump(entity, undefined, includeChildren, options);
    const data = result[0] as Record<string, unknown>;
    
    data.contentID = entity.contentID;
    data.paths = entity.paths;
    data.bandIndex = entity.bandIndex;
    
    if (callback) {
      callback(result, entity);
    }
    
    return result;
  }

  load(entity: MeshLight, data: Record<string, unknown>, options: LoadOptions = {}): void {
    super.load(entity, data, options);
    
    (entity as any).__contentID = data.contentID;
    entity.paths = data.paths as PathData[] | undefined;
    
    if (
      entity.paths &&
      entity.paths.length > 0 &&
      entity.paths[0].paths.length > 0 &&
      (entity.paths[0].paths[0].startPoint as any).x === undefined
    ) {
      entity.paths = undefined;
    }
    
    (entity as any).__bandIndex = data.bandIndex;
  }

  postLoad(entity: MeshLight, options: LoadOptions): void {
    super.postLoad(entity, options);
    
    entity.setHostId(entity.contentID, true);
    
    if (HSCore.Util.Version.isEarlierThan(options.version, '0.5')) {
      const length = entity.getLength();
      if (length) {
        entity.intensity = Math.round(entity.intensity / length);
      }
    }
  }
}

export class MeshLight extends Light {
  contentID?: string;
  @EntityField()
  bandIndex: number = -1;
  paths?: PathData[];
  outline: Point[] = new Array(4);
  
  private _pathsSignalHook: SignalHook;

  constructor(id: string = '', parent?: unknown) {
    super(id, parent);
    this.type = LightTypeEnum.MeshLight;
    this.paths = undefined;
    this._pathsSignalHook = new SignalHook(this);
  }

  static create(): MeshLight {
    const light = new MeshLight();
    light.reset();
    return light;
  }

  static get defaultIntensity(): number {
    return 500;
  }

  isVirtual(): boolean {
    return false;
  }

  hasAreaSize(): boolean {
    return true;
  }

  reset(): void {
    super.reset();
    this.contentID = undefined;
    this.bandIndex = -1;
    this.intensity = MeshLight.defaultIntensity;
  }

  getIO(): MeshLight_IO {
    return MeshLight_IO.instance();
  }

  refreshBoundInternal(): void {
    const paths = this.getPaths();
    const bound = this.boundInternal;
    bound.reset();
    
    let minX = Number.MAX_VALUE;
    let maxX = -Number.MAX_VALUE;
    let maxY = -Number.MAX_VALUE;
    let minY = Number.MAX_VALUE;
    
    paths.forEach(pathGroup => {
      pathGroup.forEach(segment => {
        minX = Math.min(minX, Math.min(segment[0].x, segment[1].x));
        maxX = Math.max(maxX, Math.max(segment[0].x, segment[1].x));
        maxY = Math.max(maxY, Math.max(segment[0].y, segment[1].y));
        minY = Math.min(minY, Math.min(segment[0].y, segment[1].y));
      });
    });
    
    this.outline[0] = { x: minX, y: maxY };
    this.outline[1] = { x: maxX, y: maxY };
    this.outline[2] = { x: maxX, y: minY };
    this.outline[3] = { x: minX, y: minY };
    
    for (let i = 0; i < 4; ++i) {
      bound.appendPoint(this.outline[i]);
    }
  }

  getHost(): HSCore.Model.CustomizedModel | HSCore.Model.NCustomizedFeatureModel | undefined {
    if (!this.contentID) return;
    
    const uniqueParent = this.getUniqueParent();
    if (!uniqueParent?.contents) return;
    
    const content = uniqueParent.contents[this.contentID];
    if (
      content instanceof HSCore.Model.CustomizedModel ||
      content instanceof HSCore.Model.NCustomizedFeatureModel
    ) {
      return content;
    }
    
    const customizedPms = uniqueParent.parent?.getCustomizedPms() || [];
    for (const pm of customizedPms) {
      for (const child of pm.getAllChildren()) {
        if (child.id === this.contentID) {
          return child;
        }
      }
    }
  }

  getPaths(): Point[][] {
    if (!this.paths) return [];
    
    const host = this.getHost();
    if (!host) return [];
    
    const { x: hostX, y: hostY, rotation } = host;
    const hostPosition = new HSCore.Util.Math.Vec2(hostX, hostY);
    
    const isInstanceModel = this.getHost() instanceof HSCore.Model.CustomizedPMInstanceModel;
    const isCeilingOrWallModel =
      this.getHost() instanceof HSCore.Model.NCustomizedCeilingModel ||
      this.getHost() instanceof HSCore.Model.NCustomizedParametricCeiling ||
      this.getHost() instanceof HSCore.Model.NCustomizedBackgroundWall;
    
    const transformPoint = (
      rotation: number,
      point: Point,
      origin: HSCore.Util.Math.Vec2
    ): HSCore.Util.Math.Vec2 => {
      if (isInstanceModel) {
        return new HSCore.Util.Math.Vec2(point.x, -point.y);
      }
      
      let transformed = new HSCore.Util.Math.Vec2(point.x, -point.y);
      
      if (isCeilingOrWallModel) {
        transformed = new HSCore.Util.Math.Vec2(point.x, point.y);
      }
      
      transformed.rotate(HSCore.Util.Math.toRadians(rotation));
      transformed.add(origin);
      
      return transformed;
    };
    
    let result: Point[][] = [];
    
    result = this.paths.reduce<Point[][]>((acc, pathData) => {
      const transformedPaths = pathData.paths.reduce<Point[]>((pathAcc, segment) => {
        const transformed = [
          transformPoint(rotation, segment.startPoint, hostPosition),
          transformPoint(rotation, segment.endPoint, hostPosition)
        ];
        pathAcc.push(transformed);
        return pathAcc;
      }, []);
      
      acc.push(transformedPaths);
      return acc;
    }, []);
    
    if (this.paths[0].contours !== undefined) {
      const contours = this.paths[0].contours || [];
      const contourPaths = contours.map(contour => {
        const segments: PathSegment[] = [];
        new Loop(contour).getAllCurves().map(curve => {
          const startPt = curve.getStartPt();
          const endPt = curve.getEndPt();
          segments.push({
            startPoint: startPt,
            endPoint: endPt
          });
        });
        return segments;
      });
      
      result = contourPaths.reduce<Point[][]>((acc, segments) => {
        const transformedPaths = segments.reduce<Point[]>((pathAcc, segment) => {
          const transformed = [
            transformPoint(rotation, segment.startPoint, hostPosition),
            transformPoint(rotation, segment.endPoint, hostPosition)
          ];
          pathAcc.push(transformed);
          return pathAcc;
        }, []);
        
        acc.push(transformedPaths);
        return acc;
      }, []);
    }
    
    return result;
  }

  getLength(): number | undefined {
    let pathsToProcess = this.paths;
    
    if (!pathsToProcess) {
      const host = this.getHost();
      if (!host) return;
      pathsToProcess = host.getLightBandBottomProjection();
    }
    
    if (!pathsToProcess) return;
    
    const length = pathsToProcess.reduce((sum, pathData) => sum + pathData.perimeter, 0);
    this.paths = pathsToProcess;
    
    return length;
  }

  setRemoved(): void {
    this.paths = [];
    this.bandIndex = -1;
    this.setFlagOn(HSCore.Model.EntityFlagEnum.removed);
    
    if (this._pathsSignalHook) {
      this._pathsSignalHook.unlistenAll();
    }
    
    this.dirtyGeometry();
  }

  updateByPaths(newPaths: PathData[] | undefined): void {
    if (!newPaths || newPaths.length === 0) {
      this.setRemoved();
      return;
    }
    
    if (this.isFlagOn(HSCore.Model.EntityFlagEnum.removed)) {
      return;
    }
    
    if (!this.paths || this.paths.length !== 1) {
      this.paths = newPaths;
      
      if ((newPaths as any).eleId !== undefined) {
        this.bandIndex = (newPaths as any).eleId;
      } else {
        this.bandIndex = newPaths.length === 1 ? 0 : -1;
      }
      return;
    }
    
    const currentPath = this.paths[0];
    if (!currentPath.paths) {
      this.setRemoved();
      return;
    }
    
    const uniquePoints: THREE.Vector2[] = [];
    currentPath.paths.forEach(segment => {
      const startX = (segment.startPoint as any)._data
        ? (segment.startPoint as any)._data[0]
        : segment.startPoint.x;
      const startY = (segment.startPoint as any)._data
        ? (segment.startPoint as any)._data[1]
        : segment.startPoint.y;
      const endX = (segment.endPoint as any)._data
        ? (segment.endPoint as any)._data[0]
        : segment.endPoint.x;
      const endY = (segment.endPoint as any)._data
        ? (segment.endPoint as any)._data[1]
        : segment.endPoint.y;
      
      const startVec = new THREE.Vector2(startX, startY);
      const endVec = new THREE.Vector2(endX, endY);
      
      if (!uniquePoints.find(pt => HSCore.Util.Math.isSamePoint(startVec, pt, TOLERANCE))) {
        uniquePoints.push(startVec);
      }
      if (!uniquePoints.find(pt => HSCore.Util.Math.isSamePoint(endVec, pt, TOLERANCE))) {
        uniquePoints.push(endVec);
      }
    });
    
    const matchingIndices: number[] = [];
    newPaths.forEach((pathData, index) => {
      if (!pathData.paths || pathData.paths.length !== currentPath.paths.length) {
        return;
      }
      
      if (!HSCore.Util.Math.nearlyEquals(pathData.distance, currentPath.distance, TOLERANCE)) {
        return;
      }
      
      const allPointsMatch = uniquePoints.every(point =>
        !!pathData.paths.find(segment =>
          HSCore.Util.Math.isSamePoint(point, segment.startPoint, TOLERANCE) ||
          HSCore.Util.Math.isSamePoint(point, segment.endPoint, TOLERANCE)
        )
      );
      
      if (allPointsMatch) {
        let indexToAdd = index;
        if ((pathData as any).eleId !== undefined) {
          indexToAdd = (pathData as any).eleId;
        }
        matchingIndices.push(indexToAdd);
      }
    });
    
    if (matchingIndices.length === 0) {
      this.setRemoved();
      return;
    }
    
    if (matchingIndices.length !== 1 && this.bandIndex && this.bandIndex !== -1) {
      const nextIndex = matchingIndices.findIndex(idx => idx > this.bandIndex!);
      this.bandIndex = nextIndex === -1
        ? matchingIndices[matchingIndices.length - 1]
        : nextIndex > 0
        ? matchingIndices[nextIndex - 1]
        : matchingIndices[0];
    } else {
      this.bandIndex = matchingIndices[0];
    }
    
    this.dirtyPosition();
  }

  onPathsChanged = (): void => {
    if (this.isFlagOn(HSCore.Model.EntityFlagEnum.removed)) {
      this.setRemoved();
      return;
    }
    
    const host = this.getHost();
    if (!host) {
      this.setRemoved();
      return;
    }
    
    const projection = host.getLightBandBottomProjection();
    this.updateByPaths(projection);
  };

  setHostId(contentId: string | undefined, force: boolean): void {
    if (!force && contentId === this.contentID) {
      return;
    }
    
    if (this._pathsSignalHook) {
      this._pathsSignalHook.unlistenAll();
    }
    
    this.contentID = contentId;
    
    const host = this.getHost();
    if (host) {
      if (
        !(host instanceof HSCore.Model.CustomizedPMInstanceModel) ||
        host.isDiyDocOpened()
      ) {
        const projection = host.getLightBandBottomProjection();
        this.updateByPaths(projection);
      }
      
      if (
        this.isFlagOff(HSCore.Model.EntityFlagEnum.removed) &&
        this._pathsSignalHook
      ) {
        this._pathsSignalHook.listen(host.signalWebCADDocChanged, this.onPathsChanged);
      }
    }
  }

  destroy(): void {
    if (this._disposed) return;
    
    if (this._pathsSignalHook) {
      this._pathsSignalHook.dispose();
      (this._pathsSignalHook as any) = undefined;
    }
    
    super.destroy();
  }

  getRenderParameters(): RenderParameters {
    const params = super.getRenderParameters();
    
    params.temperature = this.getTemperature();
    params.intensity = this.intensity * (this.getLength() ?? 0);
    params.entityId = this.contentID;
    params.close = this.close;
    params.rgb = this.rgb;
    
    return params;
  }
}

Entity.registerClass(HSConstants.ModelClass.NgMeshLight, MeshLight);