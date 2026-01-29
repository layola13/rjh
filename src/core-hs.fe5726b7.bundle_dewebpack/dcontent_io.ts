import { Coordinate3 } from './Coordinate3';
import { Content_IO, Content } from './Content';
import { Entity } from './Entity';
import { EntityField } from './EntityField';
import { tryFixMultiParentsData } from './MultiParentsUtils';
import { EntityProxyTypeEnum, EntityProxyFactory } from './EntityProxy';

interface LayoutInfo {
  start?: number;
  end?: number;
  [key: string]: unknown;
}

interface CuttingInfo {
  [key: string]: unknown;
}

interface TextureMaterialValue {
  value: string;
  angle: number;
}

interface TextureMaterialData {
  key: string;
  value: string;
  angle: number;
}

interface ShapeRotation {
  x?: number;
  y?: number;
  z?: number;
}

interface MetadataInfo {
  categories?: string[];
  isScalable?: boolean;
  top?: string;
  model3d?: string;
  modelTexture?: string;
  XLength?: number;
  YLength?: number;
  ZLength?: number;
}

interface DumpOptions {
  [key: string]: unknown;
}

interface LoadContext {
  version: string;
  [key: string]: unknown;
}

type DumpCallback = (data: unknown[], entity: DContent) => void;

export class DContent_IO extends Content_IO {
  private static _instance?: DContent_IO;

  public static instance(): DContent_IO {
    if (!DContent_IO._instance) {
      DContent_IO._instance = new DContent_IO();
    }
    return DContent_IO._instance;
  }

  public dump(
    entity: DContent,
    callback?: DumpCallback,
    recursive: boolean = true,
    options: DumpOptions = {}
  ): unknown[] {
    let result = super.dump(entity, undefined, recursive, options);
    const firstItem = result[0] as Record<string, unknown>;

    firstItem.masterId = entity.__masterId;
    firstItem.layoutInfo = entity.__layoutInfo;
    firstItem.cuttingInfo = entity.__cuttingInfo;
    firstItem.hiddenByConstrain = entity.__hiddenByConstrain;
    firstItem.customizationContentType = entity.__customizationContentType;
    firstItem.isFunctionComponent = entity.isFunctionComponent;
    firstItem.imodelParentId = entity.imodelParentId;
    firstItem.fixK = entity.fixK;
    firstItem.fixS = entity.fixS;
    firstItem.materialId = entity.materialId;

    if (entity.__textureType) {
      firstItem.textureType = entity.__textureType;
    }

    firstItem.textureType = entity.__textureType;

    if (entity.__textureMaterialMap) {
      const textureMaterials: TextureMaterialData[] = [];
      entity.__textureMaterialMap.forEach((materialValue, key) => {
        textureMaterials.push({
          key,
          value: materialValue.value,
          angle: materialValue.angle
        });
      });
      if (textureMaterials.length) {
        firstItem.textureMaterials = textureMaterials;
      }
    }

    firstItem.modelCutPlanes = entity.__modelCutPlanes.map(plane => plane.dump());

    if (recursive) {
      entity.forEachChild((child: DContent) => {
        result = result.concat(child.dump(callback, recursive, options));
      });
    }

    if (callback) {
      callback(result, entity);
    }

    return result;
  }

  public load(entity: DContent, data: Record<string, unknown>, context: LoadContext): void {
    super.load(entity, data, context);

    entity.__masterId = data.masterId as string;
    entity.__layoutInfo = data.layoutInfo as LayoutInfo | undefined;
    entity.__cuttingInfo = data.cuttingInfo as CuttingInfo | undefined;
    entity.__hiddenByConstrain = data.hiddenByConstrain as boolean;
    entity.__customizationContentType = (data.customizationContentType as string[]) || [];
    entity.__textureType = (data.textureType as string) || "";
    entity.__isFunctionComponent = data.isFunctionComponent as boolean;
    entity.__imodelParentId = data.imodelParentId as string;
    entity.__fixK = data.fixK as number;
    entity.__fixS = data.fixS as number;
    entity.__materialId = data.materialId as string;

    const textureMaterialMap = new Map<string, TextureMaterialValue>();
    if (data.textureMaterials && Array.isArray(data.textureMaterials)) {
      (data.textureMaterials as TextureMaterialData[]).forEach(material => {
        textureMaterialMap.set(material.key, {
          value: material.value,
          angle: material.angle
        });
      });
    }
    entity.__textureMaterialMap = textureMaterialMap;

    if (data.modelCutPlanes && Array.isArray(data.modelCutPlanes)) {
      entity.__modelCutPlanes = (data.modelCutPlanes as unknown[]).map(planeData =>
        new Coordinate3().load(planeData)
      );
    }
  }

  public postLoad(entity: DContent, context: LoadContext): void {
    super.postLoad(entity, context);

    if (HSCore.Util.Version.isEarlierThan(context.version, "0.22")) {
      try {
        entity.migrateOldDContent();
      } catch (error) {
        if (error instanceof Error) {
          log.error(
            `Floorplan throws '${error.stack}' when migrating ${entity.tag}`,
            "HSCore.Load.Error"
          );
        }
      }
    }
  }
}

export class DContent extends Content {
  public __masterId?: string;
  public __hiddenByConstrain: boolean = false;
  public __customizationContentType: string[] = [];
  public __layoutInfo?: LayoutInfo;
  public __modelCutPlanes: Coordinate3[] = [];
  public __cuttingInfo?: CuttingInfo;
  public __textureMaterialMap?: Map<string, TextureMaterialValue>;
  public __localId: string = "";
  public __textureType?: string;
  public __isFunctionComponent: boolean = false;
  public __imodelParentId?: string;
  public __fixK?: number;
  public __fixS?: number;
  public __materialId?: string;

  @EntityField()
  public get masterId(): string | undefined {
    return this.__masterId;
  }

  @EntityField()
  public get hiddenByConstrain(): boolean {
    return this.__hiddenByConstrain;
  }

  @EntityField()
  public get customizationContentType(): string[] {
    return this.__customizationContentType;
  }

  @EntityField()
  public get layoutInfo(): LayoutInfo | undefined {
    return this.__layoutInfo;
  }
  public set layoutInfo(value: LayoutInfo | undefined) {
    this.__layoutInfo = value;
  }

  @EntityField()
  public get modelCutPlanes(): Coordinate3[] {
    return this.__modelCutPlanes;
  }

  @EntityField()
  public cuttingInfo?: CuttingInfo;

  @EntityField()
  public textureMaterialMap?: Map<string, TextureMaterialValue>;

  @EntityField()
  public get localId(): string {
    return this.__localId;
  }

  @EntityField()
  public get textureType(): string | undefined {
    return this.__textureType;
  }

  @EntityField()
  public get isFunctionComponent(): boolean {
    return this.__isFunctionComponent;
  }

  @EntityField()
  public get imodelParentId(): string | undefined {
    return this.__imodelParentId;
  }

  @EntityField()
  public get fixK(): number | undefined {
    return this.__fixK;
  }

  @EntityField()
  public get fixS(): number | undefined {
    return this.__fixS;
  }

  @EntityField()
  public get materialId(): string | undefined {
    return this.__materialId;
  }

  @EntityField()
  public shapeRotation?: ShapeRotation;

  constructor(id: string = "", parent?: DContent) {
    super(id, parent);
  }

  public static create(metadata?: MetadataInfo, source?: DContent): DContent {
    const content = new DContent();
    
    if (metadata) {
      content.initByMeta(metadata);
      content.setDefaultMaterial();
    }
    
    if (source) {
      content.layoutInfo = Object.assign({}, source.layoutInfo);
      content.cuttingInfo = source.cuttingInfo;
      content.textureMaterialMap = source.textureMaterialMap;
    }
    
    return content;
  }

  public get needClip(): boolean {
    return (
      (this.layoutInfo !== undefined && 
        (this.layoutInfo.end !== undefined || this.layoutInfo.start !== undefined)) ||
      (this.modelCutPlanes?.length ?? 0) > 0
    );
  }

  public migrateOldDContent(): void {
    this.__XLength = this.XSize;
    this.__YLength = this.YSize;
    this.__ZLength = this.ZSize;
    this.__XScale = 1;
    this.__YScale = 1;
    this.__ZScale = 1;

    if (this.parent?.Class === HSConstants.ModelClass.DMolding) {
      return;
    }

    if (this.parent?.Class === HSConstants.ModelClass.DContent) {
      this.__x *= this.parent.XScale;
      this.__y *= this.parent.YScale;
      this.__z *= this.parent.ZScale;
    }

    const localMatrix = HSCore.Util.Matrix3DHandler.getMatrix4(this, true);
    localMatrix.setPosition(new THREE.Vector3());

    const centerOffset = new THREE.Vector3(
      this.__XLength / 2,
      -this.__YLength / 2,
      this.__ZLength / 2
    );
    centerOffset.applyMatrix4(localMatrix);
    
    this.__y -= centerOffset.y;
    this.__z += this.__ZLength / 2;

    const isSpecialCategory = 
      this.metadata?.categories?.[0] === "71cbb821-760a-48a2-aac4-1fcbf8675b3b";

    if (!isSpecialCategory) {
      this.__x -= centerOffset.x;

      const outline = HSCore.Util.Math.computeOutline(
        { x: this.__XLength / 2, y: -this.__YLength / 2 },
        this.__XLength,
        this.__YLength,
        0
      );

      const outlinePoints: THREE.Vector3[] = [];
      outline.forEach(point => {
        outlinePoints.push(new THREE.Vector3(point.x, point.y, 0));
        outlinePoints.push(new THREE.Vector3(point.x, point.y, this.__ZLength));
      });

      const transformedPoints = outlinePoints.map(point =>
        point.clone().applyMatrix4(localMatrix)
      );

      let minZ = Infinity;
      let maxZ = -Infinity;
      transformedPoints.forEach(point => {
        minZ = Math.min(minZ, point.z);
        maxZ = Math.max(maxZ, point.z);
      });

      this.__z -= (maxZ + minZ) / 2;
    }

    const pivotOffset = isSpecialCategory
      ? new THREE.Vector3(0, -this.__YLength / 2, 0)
      : new THREE.Vector3(this.__XLength / 2, -this.__YLength / 2, 0);
    
    pivotOffset.applyMatrix4(localMatrix);
    this.__x += pivotOffset.x;
    this.__y += pivotOffset.y;
    this.__z += pivotOffset.z;
  }

  public updateContentMetaData(metadata: MetadataInfo): void {
    this.metadata = metadata;
    this.isScalable = metadata.isScalable;
    this.XScale = 1;
    this.YScale = 1;
    this.ZScale = 1;
    this.topView = metadata.top || "";
    this.model3d = metadata.model3d;
    this.modelTexture = metadata.modelTexture;
  }

  public resize(xLength: number, yLength: number, zLength: number): void {
    this.XLength = xLength;
    this.YLength = yLength;
    this.ZLength = zLength;
    this.XScale = 1;
    this.YScale = 1;
    this.ZScale = 1;
  }

  public getOriginSize(): { x: number; y: number; z: number } {
    return {
      x: typeof this.metadata.XLength !== "number" || this.metadata.XLength === 0
        ? this.XLength
        : this.metadata.XLength,
      y: typeof this.metadata.YLength !== "number" || this.metadata.YLength === 0
        ? this.YLength
        : this.metadata.YLength,
      z: typeof this.metadata.ZLength !== "number" || this.metadata.ZLength === 0
        ? this.ZLength
        : this.metadata.ZLength
    };
  }

  public getRealScale(): { x: number; y: number; z: number } {
    const originSize = this.getOriginSize();

    const calculateScale = (currentLength: number, originLength: number): number => {
      const safeCurrentLength = currentLength < 0.001 ? 0.001 : currentLength;
      return originLength < 0.001 ? 1 : safeCurrentLength / originLength;
    };

    return {
      x: calculateScale(this.XLength, originSize.x),
      y: calculateScale(this.YLength, originSize.y),
      z: calculateScale(this.ZLength, originSize.z)
    };
  }

  public getLocalMatrix(includeScale: boolean = true): THREE.Matrix4 {
    const matrix = HSCore.Util.Matrix3DHandler.getMatrix4WithAnimationMat(this, true);

    if (includeScale) {
      const scale = this.getRealScale();
      matrix.multiply(new THREE.Matrix4().makeScale(scale.x, scale.y, scale.z));
    }

    if (this.parent instanceof DContent && this.parent.shapeRotation) {
      const rotationMatrix = new THREE.Matrix4();
      const euler = new THREE.Euler(
        -(this.parent.shapeRotation.x || 0) * Math.PI / 180,
        -(this.parent.shapeRotation.y || 0) * Math.PI / 180,
        -(this.parent.shapeRotation.z || 0) * Math.PI / 180
      );
      rotationMatrix.makeRotationFromEuler(euler);
      matrix.premultiply(rotationMatrix);
    }

    return matrix;
  }

  public getLocalOutLine(): unknown {
    return HSCore.Util.DEntityUtils.BoundUtil.getLocalBoundOutline(this, true, true);
  }

  public getGlobalBound3dPoints(): unknown {
    return HSCore.Util.DEntityUtils.BoundUtil.getGlobalBound3dPoints(this, true, true);
  }

  public getGlobalBoundingBox3d(): unknown {
    return HSCore.Util.DEntityUtils.BoundUtil.getGlobalBoundingBox3d(this, true, true);
  }

  public getBoundingBox3d(): unknown {
    return HSCore.Util.DEntityUtils.BoundUtil.getBoundingBox3d(this, true, true);
  }

  public getBound3dPoints(): unknown {
    return HSCore.Util.DEntityUtils.BoundUtil.getBound3dPoints(this, true, true);
  }

  public getLocalBound3dPoints(): unknown {
    return HSCore.Util.DEntityUtils.BoundUtil.getLocalBound3dPoints(this, true, true);
  }

  public getLocalBoundBox3d(): unknown {
    return HSCore.Util.DEntityUtils.BoundUtil.getLocalBoundBox3d(this, true, true);
  }

  public verify(): boolean {
    return super.verify();
  }

  public getIO(): DContent_IO {
    return DContent_IO.instance();
  }

  public isContentInLoop(entity: unknown, checkFlag: boolean = false): boolean {
    return HSCore.Util.Content.isContentInLoop(this, entity, checkFlag);
  }

  public canTransactField(): boolean {
    return false;
  }

  public getUniqueParent(): DContent | undefined {
    return (
      super.getUniqueParent() ||
      (tryFixMultiParentsData(this) ? super.getUniqueParent() : undefined)
    );
  }

  public getProxyId(): EntityProxyTypeEnum {
    return EntityProxyTypeEnum.CustomizationProduct;
  }

  public getProxyObject(): unknown | undefined {
    const proxyId = this.getProxyId();
    if (proxyId) {
      return EntityProxyFactory.getProxyObject(proxyId);
    }
  }
}

Entity.registerClass(HSConstants.ModelClass.DContent, DContent);