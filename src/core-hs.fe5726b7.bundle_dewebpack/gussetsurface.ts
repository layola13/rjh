import { Entity } from './Entity';
import { GussetModelInstance, GussetBrick } from './GussetModel';
import { SignalHook, SignalEvent } from './SignalHook';
import { PaintsUtil } from './PaintsUtil';
import { MixPaintDecorator } from './MixPaintDecorator';
import { ServiceManager } from './ServiceManager';
import { ClipPathMode } from './ClipPathMode';
import { MathUtil, Vector2 } from './MathUtil';
import { Logger } from './Logger';

interface MixPaint {
  faceGroupId?: string;
  faceGroup: {
    getPaveBoundingBox(faceId: string): THREE.Box2;
  };
}

interface FaceEntity extends Entity {
  signalDirty: any;
  signalFieldChanged: any;
  signalFlagChanged: any;
  surfaceObj?: {
    localToWorld: {
      toArray(): number[];
    };
  };
  getFaceMaterial?(faceId: string): FaceMaterial | null;
  getFaceInstanceEntity?(faceId: string): FaceInstanceEntity | null;
  getUniqueParent(): Entity | null;
}

interface FaceMaterial {
  paveTo3dMatrix: THREE.Matrix4;
}

interface FaceInstanceEntity {
  getTransformMatrix(): THREE.Matrix4;
}

interface PatternUnit {
  materials: Array<{ seekId: string }>;
}

interface PavingOption {
  rotation?: number;
  point?: { x: number; y: number };
}

interface Pattern {
  pavingOption?: PavingOption;
  patternUnits: PatternUnit[];
}

interface Region {
  pattern: Pattern;
  path: {
    outer: any;
    holes?: any[];
  };
}

interface ClipPath {
  outer: any;
  holes?: any[];
}

interface ClipLocation {
  column: number;
  row: number;
}

interface BrickPositionResult {
  globalCenters: THREE.Vector2[];
  rotation: number;
}

interface BuildingProductMeta {
  tileSize_x: number;
  tileSize_y: number;
}

interface DirtyOptions {
  options?: any;
}

interface FieldChangedData {
  fieldName?: string;
}

interface FlagChangedData {
  flag?: number;
}

const POSITION_FIELD_NAMES = new Set([
  'x', 'y', 'z',
  'XRotation', 'YRotation', 'ZRotation',
  'XScale', 'YScale', 'ZScale'
]);

const IDENTITY_MATRIX = new THREE.Matrix4();
const COORDINATE_TRANSFORM_MATRIX = new THREE.Matrix4().fromArray([
  1, 0, 0, 0,
  0, 0, -1, 0,
  0, 1, 0, 0,
  0, 0, 0, 1
]);

export class GussetSurface extends Entity {
  private readonly _faceEntity: FaceEntity;
  private readonly _faceId: string;
  private readonly _isCustomizedModel: boolean;
  private readonly _modelInstanceMap: Map<string, GussetModelInstance>;
  private readonly _signalHook: SignalHook;
  private _faceMatrix?: THREE.Matrix4;

  constructor(faceEntity: FaceEntity, faceId: string) {
    super();
    this.setFlagOn(
      HSCore.Model.EntityFlagEnum.unselectable | HSCore.Model.EntityFlagEnum.freezed
    );
    this._faceEntity = faceEntity;
    this._faceId = faceId;
    this._isCustomizedModel =
      faceEntity instanceof HSCore.Model.CustomizedModel ||
      faceEntity instanceof HSCore.Model.NCustomizedFeatureModel;
    this._modelInstanceMap = new Map<string, GussetModelInstance>();
    this._signalHook = new SignalHook(this);
    this._signalHook
      .listen(faceEntity.signalDirty, this.onFaceEntityDirty.bind(this))
      .listen(faceEntity.signalFieldChanged, this._onFaceEntityFieldChanged.bind(this))
      .listen(faceEntity.signalFlagChanged, this._onFaceEntityFlagChanged.bind(this));
  }

  destroy(): void {
    if (!this._disposed) {
      this._signalHook.dispose();
      super.destroy();
    }
  }

  needDump(): boolean {
    return false;
  }

  canTransact(): boolean {
    return false;
  }

  onFaceEntityDirty(event: SignalEvent | DirtyOptions): void {
    const data = event instanceof SignalEvent ? event.data : event;
    this.dirty(data, data?.options);
  }

  private _onFaceEntityFieldChanged(event: SignalEvent<FieldChangedData>): void {
    const fieldName = event?.data?.fieldName;
    if (fieldName && POSITION_FIELD_NAMES.has(fieldName)) {
      this.dirtyPosition(undefined);
    }
  }

  private _onFaceEntityFlagChanged(event: SignalEvent<FlagChangedData>): void {
    const flag = event?.data?.flag;
    if (flag === HSCore.Model.EntityFlagEnum.hidden) {
      if (this.faceEntity.isFlagOn(flag)) {
        this.setFlagOn(flag);
      } else {
        this.setFlagOff(flag);
      }
    }
  }

  get mixpaint(): MixPaint | undefined {
    return GussetSurface.getMixPaint(this._faceEntity, this._faceId);
  }

  get faceEntity(): FaceEntity {
    return this._faceEntity;
  }

  get faceId(): string {
    return this._faceId;
  }

  get faceMatrix(): THREE.Matrix4 | undefined {
    return this._faceMatrix;
  }

  get modelInstanceMap(): Map<string, GussetModelInstance> {
    return this._modelInstanceMap;
  }

  get isCustomizedModel(): boolean {
    return this._isCustomizedModel;
  }

  isValid(): boolean {
    return this.mixpaint !== undefined;
  }

  equalsSurface(entity: FaceEntity, faceId: string): boolean {
    if (this._faceEntity !== entity) {
      return false;
    }
    if (this._faceId === faceId) {
      return true;
    }
    if (this._isCustomizedModel) {
      const thisMixPaint = this.mixpaint;
      const otherMixPaint = GussetSurface.getMixPaint(entity, faceId);
      if (!thisMixPaint || !otherMixPaint) {
        return false;
      }
      if (
        thisMixPaint === otherMixPaint ||
        (thisMixPaint.faceGroupId &&
          otherMixPaint.faceGroupId &&
          thisMixPaint.faceGroupId === otherMixPaint.faceGroupId)
      ) {
        return true;
      }
    }
    return false;
  }

  equalsMixPaint(mixPaint: MixPaint | undefined): boolean {
    return !!mixPaint && mixPaint === this.mixpaint;
  }

  static getMixPaint(entity: FaceEntity, faceId: string): MixPaint | undefined {
    const material = PaintsUtil.getMaterial(entity, faceId);
    return material?.mixpaint;
  }

  findHost(entityId?: string): Entity | null | undefined {
    const entity = entityId ? this.doc.getEntityById(entityId) : this.faceEntity;
    if (
      entity instanceof HSCore.Model.Ceiling ||
      entity instanceof HSCore.Model.CustomizedModel ||
      entity instanceof HSCore.Model.NCustomizedFeatureModel ||
      entity instanceof HSCore.Model.Floor
    ) {
      return entity;
    }
    if (entity instanceof HSCore.Model.Face) {
      return entity.getMaster();
    }
    return entity;
  }

  private _computeBrickPositions(
    clipPath: ClipPath,
    region: Region,
    productMeta: BuildingProductMeta
  ): BrickPositionResult {
    const globalCenters: THREE.Vector2[] = [];
    const pavingOption = region.pattern.pavingOption;
    const rotation = MathUtil.degreeToRadius(pavingOption?.rotation ?? 0);
    const result: BrickPositionResult = {
      globalCenters,
      rotation
    };

    const tileSizeX = productMeta.tileSize_x;
    const tileSizeY = productMeta.tileSize_y;
    if (!tileSizeX || !tileSizeY) {
      return result;
    }

    const boundingBox = ServiceManager.getMathService().getBoxFromPath(region.path);
    const point = pavingOption?.point;
    const origin = new Vector2(
      (point?.x ?? 0) + boundingBox.min.x,
      (point?.y ?? 0) + boundingBox.max.y
    );

    const xVector = Vector2.X(tileSizeX);
    const yVector = Vector2.Y(tileSizeY);
    if (rotation !== 0) {
      xVector.vecRotate(rotation);
      yVector.vecRotate(rotation);
    }

    const startCenter = origin.added(xVector.multiplied(0.5).subtract(yVector.multiplied(0.5)));

    let pathToClip = region.path;
    if (clipPath.holes && clipPath.holes.length > 0) {
      pathToClip = {
        outer: pathToClip.outer,
        holes: pathToClip.holes ? pathToClip.holes.concat(clipPath.holes) : clipPath.holes
      };
    }

    let offsetPoint = origin;
    if (region.pattern.pavingOption?.point) {
      offsetPoint = origin.subtracted(region.pattern.pavingOption.point);
    }

    const clipperService = ServiceManager.getClipperService();
    const patternInfo = {
      pattern: region.pattern,
      point: offsetPoint
    };
    const locations = clipperService.getClipLocation(
      pathToClip,
      patternInfo,
      ClipPathMode.Complete
    );

    for (let i = 0, len = locations.length; i < len; ++i) {
      const location = locations[i];
      const center = new THREE.Vector2(
        startCenter.x + xVector.x * location.column + yVector.x * location.row,
        startCenter.y + xVector.y * location.column + yVector.y * location.row
      );
      if (
        boundingBox.containsPoint(center) ||
        clipperService.getPathByLocation(patternInfo, [locations[i]], [pathToClip]).length !== 0
      ) {
        globalCenters.push(center);
      }
    }

    return result;
  }

  update(): void {
    const layer = HSCore.Util.Layer.getEntityLayer(this._faceEntity);
    this._faceMatrix = GussetSurface.computeFaceMatrix(layer, this._faceEntity, this._faceId);

    const instanceMap = this._modelInstanceMap;
    instanceMap.clear();

    const mixPaint = this.mixpaint;
    if (!mixPaint) {
      return;
    }

    const decorator = new MixPaintDecorator(mixPaint);
    const gussetRegions = decorator.findGussetModelRegions();
    if (gussetRegions.size === 0) {
      return;
    }

    const useFaceGroup = !!mixPaint.faceGroupId && !this._isCustomizedModel;
    const boundingBox = mixPaint.faceGroup.getPaveBoundingBox(this.faceId || this.faceEntity.id);

    let brickIndex = 0;
    gussetRegions.forEach((regions: Region[], clipPath: ClipPath) => {
      for (let i = 0, regionCount = regions.length; i < regionCount; ++i) {
        const region = regions[i];
        const productId = region.pattern.patternUnits[0].materials[0].seekId;
        const productMeta = HSCatalog.MetaManager.instance().getBuildingProductMeta(productId);
        if (!productMeta) {
          continue;
        }

        const positionResult = this._computeBrickPositions(clipPath, region, productMeta);
        const rotation = positionResult.rotation;
        const centers = positionResult.globalCenters;
        if (centers.length === 0) {
          continue;
        }

        let instance = instanceMap.get(productId);
        if (!instance) {
          instance = new GussetModelInstance(productMeta);
          instanceMap.set(productId, instance);
        }

        for (let j = 0, centerCount = centers.length; j < centerCount; ++j) {
          const localCenter = GussetBrick.toLocalCenter(centers[j], boundingBox, useFaceGroup);
          if (!localCenter) {
            continue;
          }
          const brickId = `${this._faceEntity.id}/${this.id}/${brickIndex++}`;
          const brick = new GussetBrick(brickId, instance.metaDecorator);
          brick.setViewTransfrom(localCenter, rotation, this.faceEntity);
          instance.bricks.push(brick);
        }
      }
    });
  }

  static computeFaceMatrix(
    layer: Entity,
    faceEntity: FaceEntity,
    faceId: string
  ): THREE.Matrix4 | undefined {
    let matrix: THREE.Matrix4 | undefined;

    if (!faceEntity) {
      Logger.console.error('Invalid face entity');
      return matrix;
    }

    const geometryManager = HSCore.Doc.getDocManager().geometryManager;
    const getEntityWorldMatrix = (entity: Entity): THREE.Matrix4 | null => {
      const geometryObject = entity && geometryManager.getGeometryObjectWithoutUpdate(entity.id);
      if (geometryObject) {
        if (geometryObject.positionDirty) {
          geometryObject.onUpdatePosition();
        }
        if (geometryObject.needUpdateMatrix) {
          geometryObject.updateWorldMatrix();
        }
        return geometryObject.matrixWorld;
      }
      return null;
    };

    if (
      faceEntity instanceof HSCore.Model.CustomizedModel ||
      faceEntity instanceof HSCore.Model.NCustomizedFeatureModel
    ) {
      if (!faceId) {
        Logger.console.error('Invalid faceId');
        return matrix;
      }

      const paintInfo = HSCore.Paint.PaintsUtil.getCustomizedModelFacePaintInfo(
        faceEntity,
        faceId,
        undefined
      );
      if (!paintInfo) {
        return matrix;
      }

      const entityMatrix = HSCore.Util.Matrix3DHandler.getMatrix4(faceEntity);
      matrix = new THREE.Matrix4().getInverse(paintInfo.projMatrix);
      matrix.premultiply(entityMatrix);
      matrix.premultiply(COORDINATE_TRANSFORM_MATRIX);

      const layerWorldMatrix = getEntityWorldMatrix(layer);
      let inverseMatrix: THREE.Matrix4 | undefined;
      if (layerWorldMatrix && !layerWorldMatrix.equals(IDENTITY_MATRIX)) {
        inverseMatrix = new THREE.Matrix4().getInverse(layerWorldMatrix);
      }

      const parentWorldMatrix = getEntityWorldMatrix(faceEntity.getUniqueParent()!);
      if (parentWorldMatrix && !parentWorldMatrix.equals(IDENTITY_MATRIX)) {
        inverseMatrix = inverseMatrix
          ? inverseMatrix.multiply(parentWorldMatrix)
          : parentWorldMatrix.clone();
      }

      if (inverseMatrix) {
        HSCore.Util.Transform.revertMatrixUnit(inverseMatrix);
        const transformedMatrix = HSCore.Util.Transform.toTHREEMatrix(inverseMatrix);
        matrix.premultiply(transformedMatrix);
      }
    } else if (faceEntity instanceof HSCore.Model.CustomizedPMModel) {
      if (!faceId) {
        return matrix;
      }

      const faceMaterial = faceEntity.getFaceMaterial?.(faceId);
      const faceInstance = faceEntity.getFaceInstanceEntity?.(faceId);
      if (!faceMaterial || !faceInstance) {
        return matrix;
      }

      const transformMatrix = faceInstance.getTransformMatrix();
      matrix = faceMaterial.paveTo3dMatrix.clone();
      matrix.premultiply(transformMatrix);
      matrix.premultiply(COORDINATE_TRANSFORM_MATRIX);
    } else {
      const localToWorld = faceEntity.surfaceObj?.localToWorld;
      const transformMatrix = localToWorld
        ? new THREE.Matrix4().fromArray(localToWorld.toArray())
        : undefined;
      if (!transformMatrix) {
        Logger.console.error('Invalid face geometry : ' + faceEntity.id);
        return matrix;
      }

      transformMatrix.multiply(COORDINATE_TRANSFORM_MATRIX);
      matrix = HSCore.Util.Transform.toTHREEMatrix(transformMatrix);
    }

    return matrix;
  }
}

Entity.registerClass(HSConstants.ModelClass.GussetSurface, GussetSurface);