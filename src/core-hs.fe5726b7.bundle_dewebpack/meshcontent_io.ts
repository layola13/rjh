import { Content_IO, Content } from './Content';
import { Entity } from './Entity';
import { EntityField } from './decorators';
import { defaultMaterialData } from './constants';
import { tryFixMultiParentsData } from './utils';
import { cacheManager } from './CacheManager';
import { resolveZoweeOriginData } from './ZoweeDataResolver';
import { Logger } from './Logger';

const MATERIAL_KEY = 'material';

interface DumpOptions {
  [key: string]: unknown;
}

interface MeshMetadata {
  id?: string;
  jid?: string;
  contentType?: string;
  XLength?: number;
  YLength?: number;
  ZLength?: number;
  [key: string]: unknown;
}

interface SerializedMeshContent {
  hiddenByConstrain?: boolean;
  localId?: string;
  textureType?: string;
  material?: string;
  seekId?: string;
  [key: string]: unknown;
}

interface Point2D {
  x: number;
  y: number;
}

interface BoundingBox3D {
  [key: string]: unknown;
}

export class MeshContent_IO extends Content_IO {
  dump(
    entity: Entity,
    callback?: (dump: unknown[], meshContent: MeshContent) => void,
    includeChildren: boolean = true,
    options: DumpOptions = {}
  ): unknown[] {
    const dumpResult = super.dump(entity, undefined, includeChildren, options);
    const serialized = dumpResult[0] as SerializedMeshContent;
    const meshContent = entity as MeshContent;

    serialized.hiddenByConstrain = meshContent.hiddenByConstrain;

    if (meshContent.__localId) {
      serialized.localId = meshContent.__localId;
    }

    if (meshContent.__textureType) {
      serialized.textureType = meshContent.__textureType;
    }

    if (callback) {
      callback(dumpResult, meshContent);
    }

    return dumpResult;
  }

  load(
    entity: Entity,
    serialized: SerializedMeshContent,
    context: unknown
  ): void {
    if (!serialized.seekId) {
      serialized.seekId = 'generated';
    }

    super.load(entity, serialized, context);

    const meshContent = entity as MeshContent;
    meshContent.__hiddenByConstrain = serialized.hiddenByConstrain ?? false;
    meshContent.__localId = serialized.localId ?? '';
    meshContent.__textureType = serialized.textureType ?? '';

    if (typeof serialized.material === 'string') {
      const materialEntity = Entity.loadFromDumpById(serialized.material, context);
      if (materialEntity) {
        meshContent._materialByComponent.set(MATERIAL_KEY, materialEntity);
      }
    }
  }
}

export class MeshContent extends Content {
  __hiddenByConstrain: boolean;
  __localId: string;
  __textureType: string | undefined;
  _materialById: Map<string, unknown>;
  _metaId: string;
  _seekId: string;

  constructor(id: string = '', parent?: Entity) {
    super(id, parent);
    this.__hiddenByConstrain = false;
    this.__localId = '';
    this.__textureType = undefined;
    this._materialById = new Map();
    this._metaId = '';
    this._seekId = 'local';
  }

  private _initByOriginData(metadata: MeshMetadata): void {
    Logger.console.log('initByOriginData');
    if (metadata) {
      resolveZoweeOriginData(this, metadata);
    }
  }

  static create(metadata: MeshMetadata | null | undefined): MeshContent | null {
    if (!metadata || !metadata.contentType) {
      console.error(
        `DMeshContent.create: invalid input metadata '${JSON.stringify(metadata)}'.`,
        'HSCore.CreateEntity.Error'
      );
      return null;
    }

    const meshContent = new MeshContent();
    meshContent.metadata = metadata;
    meshContent.__XLength = metadata.XLength ?? 1;
    meshContent.__YLength = metadata.YLength ?? 1;
    meshContent.__ZLength = metadata.ZLength ?? 1;
    meshContent._initByOriginData(metadata);

    return meshContent;
  }

  initByMeta(metadata: MeshMetadata): void {
    this.metadata = metadata;
    this._initByOriginData(metadata);
  }

  get metaId(): string {
    if (!this._metaId) {
      this._metaId = this.metadata.id ?? this.metadata.jid ?? '';
    }
    return this._metaId;
  }

  set mesh(value: unknown) {
    cacheManager.setMesh(this.metaId, value);
  }

  get mesh(): unknown {
    return cacheManager.getMesh(this.metaId);
  }

  set metaInfo(value: unknown) {
    cacheManager.setMeta(this.id, value);
  }

  get metaInfo(): unknown {
    return cacheManager.getMeta(this.id);
  }

  getMaterialInfo(materialId: string): unknown | undefined {
    return cacheManager.getMeshMaterial(this.metaId)?.get(materialId);
  }

  set materialInfo(value: Map<string, unknown>) {
    cacheManager.setMeshMaterial(this.metaId, value);
  }

  getMaterial(materialId: string): unknown {
    let material = this._materialById.get(materialId);

    if (!material) {
      const materialInfo = this.getMaterialInfo(materialId);
      material = materialInfo
        ? HSCore.Material.Material.create(materialInfo)
        : HSCore.Material.Material.create(defaultMaterialData);
      this._materialById.set(materialId, material);
    }

    return material;
  }

  get material(): unknown {
    let material = this._materialById.get(MATERIAL_KEY);

    if (!material) {
      material = HSCore.Material.Material.create(defaultMaterialData);
      this._materialById.set(MATERIAL_KEY, material);
    }

    return material;
  }

  getMaterialList(): Array<[string, unknown]> {
    return Array.from(this._materialById.entries());
  }

  getPaths(): void {
    // Implementation not provided in original code
  }

  getTopPaths(): Point2D[] {
    return [{ x: 0, y: 0 }];
  }

  getGlobalBound3dPoints(): unknown {
    return HSCore.Util.DEntityUtils.BoundUtil.getGlobalBound3dPoints(this);
  }

  getGlobalBoundingBox3d(): BoundingBox3D {
    return HSCore.Util.DEntityUtils.BoundUtil.getGlobalBoundingBox3d(this);
  }

  getBoundingBox3d(): BoundingBox3D {
    return HSCore.Util.DEntityUtils.BoundUtil.getBoundingBox3d(this);
  }

  getBound3dPoints(): unknown {
    return HSCore.Util.DEntityUtils.BoundUtil.getBound3dPoints(this);
  }

  getLocalBound3dPoints(): unknown {
    return HSCore.Util.DEntityUtils.BoundUtil.getLocalBound3dPoints(this);
  }

  getLocalBoundBox3d(): BoundingBox3D {
    return HSCore.Util.DEntityUtils.BoundUtil.getLocalBoundBox3d(this);
  }

  dirtyRecursive(): void {
    this.dirtyGeometry();
  }

  onAddedToParent(parent: Entity): void {
    super.onAddedToParent(parent);
    if (Object.keys(this.parents).length > 1) {
      this.logger.error('[DMeshModel-Parent] multi parents detected.');
    }
  }

  isContentInLoop(target: unknown, recursive: boolean = false): boolean {
    const nonLayerParent = Object.values(this._parents).find(
      (parent) => !(parent instanceof HSCore.Model.Layer)
    );
    return nonLayerParent
      ? nonLayerParent.isContentInLoop(target, recursive)
      : super.isContentInLoop(target, recursive);
  }

  isContentInRoom(room: unknown): boolean {
    const nonLayerParent = Object.values(this._parents).find(
      (parent) => !(parent instanceof HSCore.Model.Layer)
    );
    return nonLayerParent
      ? nonLayerParent.isContentInRoom(room)
      : super.isContentInRoom(room);
  }

  getIO(): MeshContent_IO {
    return MeshContent_IO.instance();
  }

  canTransactField(): boolean {
    return false;
  }

  getUniqueParent(): Entity | undefined {
    return (
      super.getUniqueParent() ??
      (tryFixMultiParentsData(this) ? super.getUniqueParent() : undefined)
    );
  }

  @EntityField()
  hiddenByConstrain!: boolean;

  @EntityField()
  localId!: string;

  @EntityField()
  textureType!: string | undefined;
}

Entity.registerClass(HSConstants.ModelClass.MeshContent, MeshContent);