import { Entity } from './Entity';
import { NCustomizedParametricModel_IO, NCustomizedParametricModel } from './NCustomizedParametricModel';
import { CeilingSDK, EN_PROPERTY_PANEL_ITEM_TYPE, IInputData, IPropertyPanelData } from './CeilingSDK';
import { Line2d } from './Line2d';
import { CircleArc2d } from './CircleArc2d';
import { Circle2d } from './Circle2d';
import { Loop, Vector2, Vector3, Matrix4, Plane, Arc2d } from './Geometry';
import { MaterialUtil } from './MaterialUtil';
import { Logger } from './Logger';

export { EN_PROPERTY_PANEL_ITEM_TYPE, IInputData, IPropertyPanelData };

interface CeilingParameters {
  uuid?: string;
  roomLoop?: Loop;
  roomHeight?: number;
  propertytree?: unknown;
  rotation?: number;
  parametricCeilingType?: string;
}

interface MoldingData {
  seekId: string;
  uniqueKey: string;
}

interface ParametersOutput {
  [key: string]: unknown;
  parametricCeilingType?: string;
  isRectMainPart: boolean;
  minSizeLimited: boolean;
  moldings: MoldingData[];
}

interface ParamsChangedOptions {
  resetMoldingIds?: string[];
}

interface DumpOptions {
  [key: string]: unknown;
}

interface LoadOptions {
  [key: string]: unknown;
}

interface ModelMetadata {
  parametricMeta?: string;
  XLength?: number;
  YLength?: number;
  position?: {
    x: number;
    y: number;
    z: number;
  };
  userFreeData?: {
    parametricMeta?: string;
    [key: string]: unknown;
  };
}

interface GraphicsOption {
  isCeiling?: boolean;
  [key: string]: unknown;
}

CeilingSDK.onParamsChangedCallback = (
  event: unknown,
  entityId: string,
  params: unknown,
  options?: ParamsChangedOptions
): boolean => {
  const entity = HSCore.Doc.getDocManager().activeDocument.entityList[entityId];
  
  if (!entity) {
    return false;
  }

  if (options?.resetMoldingIds) {
    entity.clearSweeperCachesByEids(options.resetMoldingIds);
  }

  entity.constructBrep(params);
  entity.dirtyChildModels(true);
  
  return true;
};

export class NCustomizedParametricCeiling_IO extends NCustomizedParametricModel_IO {
  public dump(entity: unknown, target: unknown, includeGeometry = true, options: DumpOptions = {}): unknown {
    return super.dump(entity, target, includeGeometry, options);
  }

  public load(entity: unknown, source: unknown, options: LoadOptions = {}): void {
    super.load(entity, source, options);
  }
}

export class NCustomizedParametricCeiling extends NCustomizedParametricModel {
  public parameters: CeilingParameters = {};
  public selfHostLightSlots: unknown[] = [];
  public selfHostMoldings: unknown[] = [];
  public metadata!: ModelMetadata;
  public properties!: Map<string, unknown>;

  constructor(name = "", type?: unknown) {
    super(name, type);
  }

  public getParameters(): ParametersOutput {
    const result: ParametersOutput = Object.create(null);
    
    for (const [key, value] of this.properties) {
      result[key] = value;
    }

    result.parametricCeilingType = this.parameters.parametricCeilingType;
    result.isRectMainPart = ['CascadeCeiling', 'PlaneCeiling'].includes(
      this.parameters.parametricCeilingType ?? ''
    );
    result.minSizeLimited = true;

    const moldings = this.getAllParametricSelfMoldings();
    result.moldings = [];

    for (const molding of moldings) {
      result.moldings.push({
        seekId: molding.parameters.seekId,
        uniqueKey: molding.moldingId.split('-')[1]
      });
    }

    return result;
  }

  public initByParameters(params: unknown, roomLoop: Loop): void {
    const centroid = roomLoop.getCentroidPoint();
    const METERS_TO_MM = 1000;
    
    this.x = centroid.x / METERS_TO_MM;
    this.y = centroid.y / METERS_TO_MM;

    const parentRoom = this.getParentRoom();
    if (parentRoom) {
      this.z = parentRoom.ceilingHeight3d;
    }

    this.initCeilingDocument(roomLoop);
    this.constructBrep(params);
  }

  public initByMeta(metadata: ModelMetadata, options?: unknown, useCache = false): void {
    super.initByMeta(metadata, options, useCache);

    if (!metadata.userFreeData?.parametricMeta) {
      metadata.userFreeData = metadata.userFreeData ?? {};
      metadata.userFreeData.parametricMeta = JSON.stringify(metadata.userFreeData);
    }

    const parametricMeta = metadata.userFreeData.parametricMeta;
    this.metadata.parametricMeta = parametricMeta;
    this.parameters.parametricCeilingType = JSON.parse(parametricMeta).parametricCeilingType;

    if (useCache) {
      this.initCeiling(undefined, useCache);
    }
  }

  public getRoomLoop(source?: unknown): Loop {
    const METERS_TO_MM = 1000;
    const DEFAULT_LENGTH = this.metadata.XLength ?? 0;
    const DEFAULT_WIDTH = this.metadata.YLength ?? 0;
    
    let loop = Loop.createByRectangle(
      new Vector2(0, 0),
      new Vector2(DEFAULT_LENGTH, DEFAULT_WIDTH)
    ).scale(METERS_TO_MM);

    if (!source) {
      return loop;
    }

    if (source instanceof HSCore.Model.Face2d) {
      const curves = source.outerLoop.curves;
      let scaledCurves: unknown[] = [];

      for (const curve of curves) {
        if (curve instanceof Line2d) {
          const start = new Vector2(curve.start);
          const end = new Vector2(curve.end);
          const line = new Line2d(start, end).clone().scale(METERS_TO_MM);
          scaledCurves.push(line);
        } else if (curve instanceof CircleArc2d) {
          const center = new Vector2(curve.center);
          const start = new Vector2(curve.start);
          const end = new Vector2(curve.end);
          const arc = Arc2d.makeArcByStartEndPoints(center, start, end, !curve.clockwise)
            .clone()
            .scale(METERS_TO_MM);
          scaledCurves.push(arc);
        } else if (curve instanceof Circle2d) {
          const center = new Vector2(curve.center);
          const radius = curve.radius;
          const arc = Arc2d.makeArcByStartEndAngles(center, radius, 0, 2 * Math.PI, true)
            .clone()
            .scale(METERS_TO_MM);
          scaledCurves.push(arc);
        } else {
          Logger.console.assert(false, 'unknown type!');
        }
      }

      scaledCurves = this.resortCurves(scaledCurves);
      loop = new Loop(scaledCurves);

      if (this.judgeClockWise(scaledCurves)) {
        loop.reverse();
      }

      const transformMatrix = source.parent.parent.getSketchTransformMatrix();
      const localToWorld = new Matrix4().fromArray(
        source.parent.parent.getLocalToWorldMatrix().toArray()
      );
      const plane = new Plane(
        transformMatrix.getBasicVec(3),
        transformMatrix.getBasicVec(0),
        transformMatrix.getBasicVec(1)
      );

      const curves3d = loop.getAllCurves().map(curve => 
        plane.getCurve3d(curve).transform(localToWorld)
      );

      const planeXOY = Plane.XOY();
      const projectedCurves = curves3d.map(curve => planeXOY.getCurve2d(curve));
      loop = new Loop(projectedCurves);
    } else {
      const points = (source as unknown[]).map((point: { x: number; y: number }) => ({
        x: METERS_TO_MM * point.x,
        y: METERS_TO_MM * point.y
      }));
      loop = new Loop(points);

      if (this.judgeClockWise(loop.getAllCurves())) {
        loop.reverse();
      }
    }

    return loop;
  }

  public initCeiling(face?: unknown, useCache?: boolean): void {
    const roomLoop = this.getRoomLoop(face);

    if (roomLoop.isValid()) {
      this.initCeilingDocument(roomLoop, useCache);
    } else {
      Logger.console.assert(false, 'room loop is not valid!');
    }
  }

  public initModelDocument(
    modelData: { roomLoop: Loop },
    useCache?: boolean,
    skipConstruct = false
  ): void {
    const roomLoop = modelData.roomLoop;
    this.initCeilingDocument(roomLoop, useCache, skipConstruct);
  }

  public initCeilingDocument(roomLoop: Loop, useCache?: boolean, skipConstruct?: boolean): void {
    const METERS_TO_MM = 1000;
    const TOLERANCE = 0.001;
    const parentRoom = this.getParentRoom();
    
    let roomHeight = 0;
    if (parentRoom) {
      roomHeight = METERS_TO_MM * parentRoom.ceilingHeight3d;
    } else if (this.parameters.roomHeight) {
      roomHeight = this.parameters.roomHeight;
    }

    const parametricMetaStr = JSON.stringify(JSON.parse(this.metadata.parametricMeta ?? '{}'));
    const rotation = this.parameters.rotation ?? 0;

    const uuid = CeilingSDK.openDocument(
      parametricMetaStr,
      this.id,
      roomLoop,
      roomHeight,
      TOLERANCE,
      rotation
    );

    if (uuid) {
      this.parameters.uuid = uuid;
      this.parameters.roomLoop = roomLoop;
      this.parameters.roomHeight = roomHeight;
      this.constructBrep(undefined, useCache, skipConstruct);
      this.dirtyChildModels(true);
    } else {
      Logger.console.assert(false, 'CeilingSDK.openDocument failed!');
    }
  }

  public generatePropertyPanelDatas(propertyMap: Map<string, unknown>): IPropertyPanelData | undefined {
    const record = this.map2record(propertyMap);
    const ceilingData = CeilingSDK.getCeilingData(this.parameters.uuid ?? '', this.id, record);
    return ceilingData?.propertyPanelData;
  }

  public setRotation(rotation: number): void {
    this.parameters = {
      uuid: this.parameters.uuid,
      roomLoop: this.parameters.roomLoop,
      roomHeight: this.parameters.roomHeight,
      propertytree: this.parameters.propertytree,
      rotation,
      parametricCeilingType: this.parameters.parametricCeilingType
    };

    if (this.parameters.roomLoop) {
      this.initCeilingDocument(this.parameters.roomLoop, false);
    } else {
      Logger.console.assert(false, '参数化吊顶区域数据缺失!');
    }
  }

  public getModelData(record: Record<string, unknown>): unknown {
    const data = CeilingSDK.getCeilingData(this.parameters.uuid ?? '', this.id, record);
    this.dirtyGeometry();
    this.dirty();
    return data;
  }

  public updatePositionFromMeta(metadata: ModelMetadata, skipUpdate = false): void {
    if (skipUpdate || !metadata.position) {
      return;
    }

    const Z_OFFSET = 0.0008;
    this.x = metadata.position.x;
    this.y = metadata.position.y;
    this.z = metadata.position.z - Z_OFFSET;
    this.XScale = 1;
    this.YScale = 1;
    this.ZScale = 1;
    this.rotation = 0;
  }

  public isBottomFace(face: unknown): boolean {
    if (face.getSurface().isPlane()) {
      const centerNormal = face.getCenterNorm();
      const downVector = Vector3.Z().reverse();
      
      if (centerNormal.isSameDirection(downVector)) {
        return true;
      }
    }
    return false;
  }

  public getGraphicsOption(entity: unknown, includeTexture = true): GraphicsOption {
    const option = super.getGraphicsOption(entity, includeTexture);
    option.isCeiling = true;
    return option;
  }

  public getFaceProjectionPlane(face: unknown, params: unknown): unknown {
    const projectionPlane = super.getFaceProjectionPlane(face, params);
    
    if (!projectionPlane) {
      return projectionPlane;
    }

    if (MaterialUtil.isRCP(this, face)) {
      projectionPlane.xRay.reverse();
    }

    return projectionPlane;
  }

  protected map2record(map: Map<string, unknown>): Record<string, unknown> {
    const record: Record<string, unknown> = {};
    for (const [key, value] of map) {
      record[key] = value;
    }
    return record;
  }

  protected getAllParametricSelfMoldings(): Array<{ parameters: { seekId: string }; moldingId: string }> {
    return [];
  }

  protected getParentRoom(): { ceilingHeight3d: number } | undefined {
    return undefined;
  }

  protected resortCurves(curves: unknown[]): unknown[] {
    return curves;
  }

  protected judgeClockWise(curves: unknown[]): boolean {
    return false;
  }

  protected constructBrep(params?: unknown, useCache?: boolean, skipConstruct?: boolean): void {}

  protected dirtyChildModels(dirty: boolean): void {}

  protected dirtyGeometry(): void {}

  protected dirty(): void {}

  protected x = 0;
  protected y = 0;
  protected z = 0;
  protected XScale = 1;
  protected YScale = 1;
  protected ZScale = 1;
  protected rotation = 0;
  protected id = '';
}

Entity.registerClass(HSConstants.ModelClass.NCustomizedParametricCeiling, NCustomizedParametricCeiling);