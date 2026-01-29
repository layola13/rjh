import { Matrix3, Coordinate3 } from './math';
import { ContentBase_IO, ContentBase } from './content-base';
import { Entity } from './entity';
import { FieldValueType } from './field-value-type';
import { Material } from './material';
import { EntityField } from './entity-field';
import { loadSegment3D, pointsToLine3ds, tryFixMultiParentsData } from './geometry-utils';
import { EntityProxyTypeEnum, EntityProxyFactory } from './entity-proxy';
import { Logger } from './logger';

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface Point2D {
  x: number;
  y: number;
}

interface Segment3D {
  dump(): unknown;
  discrete(): Point3D[];
}

interface ProfileMetadata {
  id: string;
  seekId: string;
  contentType: unknown;
  normalTexture?: unknown;
  profile?: unknown;
  profileHigh?: unknown;
  profileSizeX?: number;
  profileSizeY?: number;
}

interface MaterialData {
  ID: string;
  metadata?: ProfileMetadata;
  dump(callback?: DumpCallback): unknown[];
}

interface DumpOptions {
  productsMap?: Map<string, ProfileMetadata>;
  data?: Record<string, unknown>;
  customizationVersion?: string;
}

interface DumpResult {
  seekId?: string;
  localId?: string;
  name?: string;
  customizationContentType?: string[];
  isFunctionComponent?: boolean;
  imodelParentId?: string;
  fixK?: unknown;
  fixS?: unknown;
  paths?: unknown[];
  material?: string;
  profileRefYDir?: Point3D;
  profileTransform?: unknown;
  modelCutPlanes?: unknown[];
  masterId?: string;
  XSize?: number;
  YSize?: number;
  profileDir?: string;
}

interface CreateParameters {
  localId: string;
  material: unknown;
  resource?: ProfileMetadata;
  parameters?: {
    x?: number | null;
    y?: number | null;
    z?: number | null;
    paths?: Segment3D[][];
    profileRefYDir?: Point3D;
    profileTransform?: Matrix3;
    modelCutPlanes?: Coordinate3[];
  };
}

interface UpdateParameters {
  paths?: Segment3D[][];
  profileMeta?: ProfileMetadata;
  material?: unknown;
  profileTransform?: Matrix3;
  modelCutPlanes?: Coordinate3[];
}

type DumpCallback = (result: unknown[], entity: unknown) => void;

export class DSweep_IO extends ContentBase_IO {
  dump(
    entity: DSweep,
    callback?: DumpCallback,
    deepClone: boolean = true,
    options: DumpOptions = {}
  ): unknown[] {
    let result = super.dump(entity, undefined, deepClone, options);
    const dumpData = result[0] as DumpResult;
    const metadata = entity.metadata;

    if (options.productsMap && metadata?.id) {
      options.productsMap.set(metadata.id, metadata);
      dumpData.seekId = entity.seekId;
    }

    if (entity.localId) {
      dumpData.localId = entity.__localId;
    }

    dumpData.name = entity._name;
    dumpData.customizationContentType = entity.__customizationContentType;
    dumpData.isFunctionComponent = entity.isFunctionComponent;
    dumpData.imodelParentId = entity.imodelParentId;
    dumpData.fixK = entity.fixK;
    dumpData.fixS = entity.fixS;

    if (entity.__paths) {
      dumpData.paths = entity.__paths.map(pathGroup =>
        pathGroup.map(segment => segment.dump())
      );
    }

    if (entity.material) {
      dumpData.material = entity.material.ID;

      if (entity.material.metadata && options.productsMap) {
        options.productsMap.set(entity.material.metadata.seekId, entity.material.metadata);
      }

      if (deepClone || this.mustDeepClone(dumpData.material)) {
        result = result.concat(entity.material.dump(callback));
      }
    }

    if (entity.__profileRefYDir) {
      dumpData.profileRefYDir = {
        x: entity.__profileRefYDir.x,
        y: entity.__profileRefYDir.y,
        z: entity.__profileRefYDir.z
      };
    }

    dumpData.profileTransform = entity.profileTransform?.dump();
    dumpData.modelCutPlanes = entity.__modelCutPlanes.map(plane => plane.dump());
    dumpData.masterId = entity.__masterId;

    if (callback) {
      callback(result, entity);
    }

    return result;
  }

  load(entity: DSweep, data: DumpResult, options: DumpOptions): void {
    this._migrateOldData(data, options);
    super.load(entity, data, options);

    entity.seekId = data.seekId || entity.seekId;
    entity.__localId = data.localId || "";
    entity.__customizationContentType = data.customizationContentType || [];
    entity.__isFunctionComponent = data.isFunctionComponent;
    entity.__imodelParentId = data.imodelParentId;
    entity.__fixK = data.fixK;
    entity.__fixS = data.fixS;

    if (options.productsMap) {
      const metadata = options.productsMap.get(data.seekId!);
      entity._metadata = metadata ?? null;
    }

    entity.__paths = data.paths!.map(pathGroup =>
      pathGroup.map(segmentData => loadSegment3D(segmentData))
    );

    if (data.material) {
      const materialData = options.data?.[data.material];

      if (materialData) {
        const loadedMaterial = entity.loadEntity(materialData, options) as MaterialData | undefined;

        if (loadedMaterial?.seekId && options.productsMap) {
          const materialMetadata = options.productsMap.get(loadedMaterial.seekId);
          (loadedMaterial as any).__metadata = materialMetadata;
        }

        entity.__material = loadedMaterial;
      }
    }

    if (data.profileRefYDir) {
      entity.__profileRefYDir = data.profileRefYDir;
    }

    if (data.profileTransform) {
      entity.__profileTransform = Matrix3.make(data.profileTransform);
    }

    if (data.modelCutPlanes) {
      entity.__modelCutPlanes = data.modelCutPlanes.map(planeData =>
        new Coordinate3().load(planeData)
      );
    }

    entity.__masterId = data.masterId;
  }

  private _migrateOldData(data: DumpResult, options: DumpOptions): void {
    if (this._isOldDump(data) && !options.customizationVersion) {
      let metadata: ProfileMetadata | undefined;
      let scaleMatrix: Matrix3 | undefined;

      if (!data.profileTransform && data.profileDir !== "right") {
        data.profileTransform = new Matrix3([
          [-1, 0, 0],
          [0, 1, 0],
          [0, 0, 1]
        ]).dump();
      }

      if (options.productsMap) {
        metadata = options.productsMap.get(data.seekId!);
      }

      if (metadata?.profile) {
        scaleMatrix = HSCore.Util.DEntityUtils.ProfileUtil.calcProfileScaleMatrix(
          metadata.profile,
          {
            x: data.XSize ?? metadata.profileSizeX!,
            y: data.YSize ?? metadata.profileSizeY!
          }
        );
      }

      if (scaleMatrix) {
        if (data.profileTransform) {
          const existingTransform = Matrix3.make(data.profileTransform);
          data.profileTransform = scaleMatrix.preMultiply(existingTransform).dump();
        } else {
          data.profileTransform = scaleMatrix.dump();
        }
      }
    }

    if (
      this._isOldPathsDump(data) &&
      (!options.customizationVersion ||
        !HSCore.Util.Version.isEarlierThan(options.customizationVersion, "0.2"))
    ) {
      data.paths = (data.paths as any)
        .map((points: Point3D[]) => pointsToLine3ds(points))
        .map((segments: Segment3D[]) => segments.map(seg => seg.dump()));
    }
  }

  private _isOldDump(data: DumpResult): boolean {
    return typeof data.XSize === "number" && typeof data.YSize === "number";
  }

  private _isOldPathsDump(data: DumpResult): boolean {
    return (
      !!data.paths &&
      data.paths.length > 0 &&
      data.paths[0].length > 0 &&
      typeof (data.paths[0][0] as any).x === "number"
    );
  }
}

export class DSweep extends ContentBase {
  private _seekId: string = "";
  private _metadata: ProfileMetadata | null = null;
  public __customizationContentType: string[] = [];
  public __isFunctionComponent: boolean = false;
  public __paths: Segment3D[][] = [];
  public __localId: string = "";
  public __name: string = "";
  public outline: Point2D[] = [];
  public __modelCutPlanes: Coordinate3[] = [];
  public __host: unknown = undefined;
  public __imodelParentId?: string;
  public __fixK?: unknown;
  public __fixS?: unknown;
  public __profileRefYDir?: Point3D;
  public __material?: MaterialData;
  public __profileTransform?: Matrix3;
  public __masterId?: string;
  public __x?: number;
  public __y?: number;
  public __z?: number;

  constructor(id: string = "", parent?: unknown) {
    super(id, parent);
  }

  static create(params: CreateParameters): DSweep {
    const sweep = new DSweep();
    const resource = params.resource;

    sweep.__localId = params.localId;
    sweep.__material = Material.create(params.material);

    const parameters = params.parameters;
    if (parameters) {
      sweep.__x = parameters.x === undefined || parameters.x === null ? 0 : parameters.x;
      sweep.__y = parameters.y === undefined || parameters.y === null ? 0 : parameters.y;
      sweep.__z = parameters.z === undefined || parameters.z === null ? 0 : parameters.z;
      sweep.__paths = parameters.paths ?? [];

      if (parameters.profileRefYDir) {
        const { x, y, z } = parameters.profileRefYDir;
        sweep.__profileRefYDir = { x, y, z };
      }

      if (parameters.profileTransform) {
        sweep.__profileTransform = parameters.profileTransform;
      }

      sweep.__modelCutPlanes = parameters.modelCutPlanes || [];
    }

    if (resource) {
      sweep._metadata = resource;
    }

    return sweep;
  }

  @EntityField({
    get(this: DSweep): string {
      return this._seekId || (this.metadata ? this.metadata.id : "");
    },
    partialSet(this: DSweep, value: string): void {
      Logger.console.assert(
        !value || !this.metadata || !this.metadata.id || value === this.metadata.id,
        "seekId should be consistent with metadata!"
      );
      this._seekId = value;
    }
  })
  seekId!: string;

  @EntityField({
    fieldValueType: FieldValueType.Metadata,
    get(this: DSweep): ProfileMetadata | null {
      return this._metadata;
    },
    partialSet(this: DSweep, value: ProfileMetadata | null): void {
      this._metadata = value;
      this._seekId = "";
    }
  })
  metadata!: ProfileMetadata | null;

  @EntityField()
  customizationContentType!: string[];

  @EntityField()
  isFunctionComponent!: boolean;

  @EntityField()
  imodelParentId!: string | undefined;

  @EntityField()
  fixK!: unknown;

  @EntityField()
  fixS!: unknown;

  @EntityField()
  paths!: Segment3D[][];

  @EntityField()
  profileRefYDir!: Point3D | undefined;

  @EntityField()
  localId!: string;

  @EntityField()
  name!: string;

  @EntityField()
  material!: MaterialData | undefined;

  @EntityField()
  host!: unknown;

  @EntityField()
  profileTransform!: Matrix3 | undefined;

  @EntityField()
  modelCutPlanes!: Coordinate3[];

  @EntityField()
  masterId!: string | undefined;

  get contentType(): unknown {
    return this.metadata ? this.metadata.contentType : new HSCatalog.ContentType("");
  }

  get normalTexture(): unknown | undefined {
    return this.metadata?.normalTexture;
  }

  get profile(): unknown | undefined {
    return this.metadata?.profileHigh || this.metadata?.profile;
  }

  getPaths(): Point3D[][] {
    const discretizedPaths = this.paths.map(pathGroup => {
      const points: Point3D[] = [];
      pathGroup.forEach((segment, index) => {
        const discretePoints = segment.discrete();
        if (index > 0) {
          discretePoints.shift();
        }
        points.push(...discretePoints);
      });
      return points;
    });

    discretizedPaths.forEach(path => {
      path.reverse();
    });

    return discretizedPaths;
  }

  verify(): boolean {
    return !!this.seekId && super.verify();
  }

  getIO(): DSweep_IO {
    return DSweep_IO.instance();
  }

  update(params: UpdateParameters): void {
    const { paths, profileMeta, material, profileTransform, modelCutPlanes } = params;

    if (paths) {
      this.paths = paths;
    }

    if (profileMeta) {
      this.metadata = profileMeta;
    }

    if (profileTransform) {
      this.profileTransform = profileTransform;
    }

    if (paths || profileMeta || profileTransform) {
      this.dirtyGeometry();
    }

    if (modelCutPlanes) {
      this.modelCutPlanes = modelCutPlanes;
    }

    if (material) {
      this.setMaterial("", material);
    }
  }

  setMaterial(key: string, materialData: unknown): void {
    let actualMaterial = key as unknown;

    if (typeof key === "string") {
      actualMaterial = materialData;
    }

    if (this.material !== actualMaterial) {
      this.material = Material.create(actualMaterial);
      this.dirtyMaterial();
    }
  }

  getMaterial(): MaterialData | undefined {
    return this.__material;
  }

  refreshBoundInternal(): void {
    const paths = this.getPaths();

    if (paths.length === 0) {
      return;
    }

    const bounds = HSCore.Util.Collision.getPolygonBound(paths[0]);

    this.outline[3] = { x: bounds.minx, y: bounds.maxy };
    this.outline[2] = { x: bounds.maxx, y: bounds.maxy };
    this.outline[1] = { x: bounds.maxx, y: bounds.miny };
    this.outline[0] = { x: bounds.minx, y: bounds.miny };

    this.boundInternal.reset();

    for (let i = 0; i < 4; ++i) {
      this.boundInternal.appendPoint(this.outline[i]);
    }
  }

  isContentInRoom(room: unknown, checkParam: boolean = false): boolean | undefined {
    const parent = this.getUniqueParent();
    return parent?.isContentInRoom(room, checkParam);
  }

  isContentInLoop(loop: unknown, checkParam: boolean = false): boolean | undefined {
    const parent = this.getUniqueParent();
    return parent?.isContentInLoop(loop, checkParam);
  }

  canTransactField(): boolean {
    return false;
  }

  getUniqueParent(): unknown {
    return (
      super.getUniqueParent() ||
      (tryFixMultiParentsData(this) ? super.getUniqueParent() : undefined)
    );
  }

  getProxyId(): EntityProxyTypeEnum | undefined {
    return EntityProxyTypeEnum.CustomizationProduct;
  }

  getProxyObject(): unknown {
    const proxyId = this.getProxyId();
    if (proxyId) {
      return EntityProxyFactory.getProxyObject(proxyId);
    }
  }
}

Entity.registerClass(HSConstants.ModelClass.DSweep, DSweep);