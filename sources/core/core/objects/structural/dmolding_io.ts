import { Content_IO, Content } from './Content';
import { Entity } from './Entity';
import { EntityField } from './EntityField';
import { defaultMaterialData } from './defaultMaterialData';
import { tryFixMultiParentsData } from './utils';
import { EntityProxyTypeEnum, EntityProxyFactory } from './EntityProxy';

interface DumpOptions {
  [key: string]: unknown;
}

interface LoadContext {
  productsMap?: Map<string, unknown>;
  [key: string]: unknown;
}

interface DumpedData {
  seekId?: string;
  localId?: string;
  name?: string;
  customizationContentType?: string[];
  isFunctionComponent?: boolean;
  imodelParentId?: string;
  fixK?: number;
  fixS?: number;
  XSize?: number;
  YSize?: number;
  paths?: Vec2[][];
  masterId?: string;
  material?: string;
  [key: string]: unknown;
}

interface Vec2 {
  x: number;
  y: number;
}

interface ProductMetadata {
  seekId?: string;
  [key: string]: unknown;
}

interface UpdateParams {
  paths?: Vec2[][];
  material?: HSCore.Material.Material;
}

export class DMolding_IO extends Content_IO {
  private static _instance?: DMolding_IO;

  static instance(): DMolding_IO {
    if (!this._instance) {
      this._instance = new DMolding_IO();
    }
    return this._instance;
  }

  dump(
    entity: Entity,
    callback?: (result: DumpedData[], source: DMolding) => void,
    includeMetadata: boolean = true,
    options: DumpOptions = {}
  ): DumpedData[] {
    const result = super.dump(entity, undefined, includeMetadata, options);
    const dumpedData = result[0];
    const molding = entity as DMolding;

    dumpedData.seekId = molding.seekId;
    dumpedData.localId = molding.__localId;
    dumpedData.name = molding.__name;
    dumpedData.customizationContentType = molding.__customizationContentType;
    dumpedData.isFunctionComponent = molding.isFunctionComponent;
    dumpedData.imodelParentId = molding.imodelParentId;
    dumpedData.fixK = molding.fixK;
    dumpedData.fixS = molding.fixS;
    dumpedData.XSize = molding.__XSize;
    dumpedData.YSize = molding.__YSize;
    dumpedData.paths = molding.__paths;
    dumpedData.masterId = molding.__masterId;

    if (callback) {
      callback(result, molding);
    }

    return result;
  }

  load(entity: Entity, data: DumpedData, context: LoadContext): void {
    super.load(entity, data, context);

    const molding = entity as DMolding;

    molding.__seekId = data.seekId;
    molding.__localId = data.localId;
    molding.__customizationContentType = data.customizationContentType ?? [];
    molding.__isFunctionComponent = data.isFunctionComponent;
    molding.__imodelParentId = data.imodelParentId;
    molding.__fixK = data.fixK;
    molding.__fixS = data.fixS;

    if (context.productsMap) {
      const metadata = context.productsMap.get(data.seekId ?? '');
      molding.__metadata = metadata;
    }

    molding.__paths = data.paths;

    if (data.material) {
      const loadedMaterial = Entity.loadFromDumpById(data.material, context);
      if (loadedMaterial) {
        molding.material = loadedMaterial as HSCore.Material.Material;
      }
    }

    molding.__masterId = data.masterId;
  }
}

export class DMolding extends Content {
  @EntityField()
  private __paths: Vec2[][] = [];

  @EntityField()
  private __masterId?: string;

  @EntityField()
  private __customizationContentType: string[] = [];

  @EntityField()
  private __isFunctionComponent: boolean = false;

  @EntityField()
  private __imodelParentId?: string;

  @EntityField()
  private __fixK?: number;

  @EntityField()
  private __fixS?: number;

  @EntityField()
  private __localId: string = '';

  constructor(id: string = '', parent?: Entity) {
    super(id, parent);
  }

  static create(metadata: ProductMetadata): DMolding {
    const instance = new DMolding();
    instance.metadata = metadata;
    instance.seekId = metadata.seekId ?? '';
    return instance;
  }

  get material(): HSCore.Material.Material {
    let materialInstance = this._materialByComponent.get('');
    if (!materialInstance) {
      materialInstance = HSCore.Material.Material.create(defaultMaterialData);
      this._materialByComponent.set('', materialInstance);
    }
    return materialInstance;
  }

  set material(value: HSCore.Material.Material) {
    super.setMaterial('', value);
  }

  get paths(): Vec2[][] {
    return this.__paths;
  }

  set paths(value: Vec2[][]) {
    this.__paths = value;
  }

  get masterId(): string | undefined {
    return this.__masterId;
  }

  set masterId(value: string | undefined) {
    this.__masterId = value;
  }

  get customizationContentType(): string[] {
    return this.__customizationContentType;
  }

  set customizationContentType(value: string[]) {
    this.__customizationContentType = value;
  }

  get isFunctionComponent(): boolean {
    return this.__isFunctionComponent;
  }

  set isFunctionComponent(value: boolean) {
    this.__isFunctionComponent = value;
  }

  get imodelParentId(): string | undefined {
    return this.__imodelParentId;
  }

  set imodelParentId(value: string | undefined) {
    this.__imodelParentId = value;
  }

  get fixK(): number | undefined {
    return this.__fixK;
  }

  set fixK(value: number | undefined) {
    this.__fixK = value;
  }

  get fixS(): number | undefined {
    return this.__fixS;
  }

  set fixS(value: number | undefined) {
    this.__fixS = value;
  }

  get localId(): string {
    return this.__localId;
  }

  set localId(value: string) {
    this.__localId = value;
  }

  getPaths(): Vec2[][] {
    const clonedPaths = JSON.parse(JSON.stringify(this.paths)) as Vec2[][];
    clonedPaths.forEach(path => {
      path.reverse();
    });
    return clonedPaths;
  }

  verify(): boolean {
    return super.verify();
  }

  getIO(): DMolding_IO {
    return DMolding_IO.instance();
  }

  update(params: UpdateParams): void {
    const { paths, material } = params;
    if (paths) {
      this.paths = paths;
    }
    if (material) {
      this.setMaterial(material);
    }
  }

  refreshBoundInternal(): void {
    const boundInternal = this.boundInternal;
    const proxyObject = this.getProxyObject();
    const worldBoxPoints = proxyObject?.getWorldBoxPoints(this) ?? [];

    if (worldBoxPoints.length) {
      boundInternal.reset();
      for (let i = 0; i < worldBoxPoints.length; ++i) {
        boundInternal.appendPoint(worldBoxPoints[i]);
      }
      this.outline[3] = boundInternal.getTopLeft();
      this.outline[2] = boundInternal.getMax();
      this.outline[1] = boundInternal.getBottomRight();
      this.outline[0] = boundInternal.getMin();
    }
  }

  forEachContent(callback: (content: Content) => void, recursive: boolean): void {
    // Empty implementation
  }

  isContentInRoom(face: HSCore.Model.Face, includeEdge: boolean = false): boolean {
    if (!face || !this.paths || !this.paths.length || !this.paths[0].length || this.paths[0].length < 2) {
      return false;
    }

    if (!(face instanceof HSCore.Model.Face)) {
      return false;
    }

    if (!HSCore.Util.Layer.isInSameLayer(face, this)) {
      return false;
    }

    const outerPolygon = face.getOuterLoopPolygon();
    if (!outerPolygon) {
      return false;
    }

    const testPoints: THREE.Vector3[] = [];
    const globalMatrix = HSCore.Util.Matrix3DHandler.getGlobalMatrix4(this);

    for (let i = 0; i < this.paths[0].length - 1; i++) {
      const midPoint = HSCore.Util.Math.Vec2.lerp(this.paths[0][i], this.paths[0][i + 1], 0.5);
      const worldPoint = new THREE.Vector3(midPoint.x, midPoint.y, 0).applyMatrix4(globalMatrix);
      testPoints.push(worldPoint);
    }

    return testPoints.some(point =>
      HSCore.Util.Math.isPointInPolygon({ x: point.x, y: point.y }, outerPolygon, includeEdge)
    );
  }

  isContentInLoop(face: HSCore.Model.Face, includeEdge: boolean = false): boolean {
    if (!face || !this.paths || !this.paths.length || !this.paths[0].length || this.paths[0].length < 2) {
      return false;
    }

    if (!HSCore.Util.Layer.isInSameLayer(face, this)) {
      return false;
    }

    const roomInfo = HSCore.Doc.getDocManager().geometryManager.getFaceRoomInfo(face);
    const loop = roomInfo?.loop;
    const loopPath = loop?.loopPath;

    const testPoints: THREE.Vector3[] = [];
    const globalMatrix = HSCore.Util.Matrix3DHandler.getGlobalMatrix4(this);

    for (let i = 0; i < this.paths[0].length - 1; i++) {
      const midPoint = HSCore.Util.Math.Vec2.lerp(this.paths[0][i], this.paths[0][i + 1], 0.5);
      const worldPoint = new THREE.Vector3(midPoint.x, midPoint.y, 0).applyMatrix4(globalMatrix);
      testPoints.push(worldPoint);
    }

    return testPoints.some(point =>
      HSCore.Util.Math.isPointInPolygon({ x: point.x, y: point.y }, loopPath, includeEdge)
    );
  }

  isSameMolding(other: DMolding): boolean {
    if (!other || this.seekId !== other.seekId) {
      return false;
    }

    const thisMaterial = this.material;
    const otherMaterial = other.material;

    const getMaterialSeekId = (material: HSCore.Material.Material | undefined): string =>
      material ? material.seekId : '';

    if (getMaterialSeekId(thisMaterial) !== getMaterialSeekId(otherMaterial)) {
      return false;
    }

    if (!HSCore.Util.Math.nearlyEquals(this.XSize, other.XSize)) {
      return false;
    }

    if (!HSCore.Util.Math.nearlyEquals(this.YSize, other.YSize)) {
      return false;
    }

    return true;
  }

  isContentValid(): boolean {
    return !this.isFlagOn(HSCore.Model.EntityFlagEnum.hidden) &&
           !this.isFlagOn(HSCore.Model.EntityFlagEnum.removed);
  }

  canTransactField(): boolean {
    return false;
  }

  getUniqueParent(): Entity | undefined {
    const parent = super.getUniqueParent();
    if (parent) {
      return parent;
    }

    return tryFixMultiParentsData(this) ? super.getUniqueParent() : undefined;
  }

  getProxyId(): EntityProxyTypeEnum {
    return EntityProxyTypeEnum.CustomizationProduct;
  }

  getProxyObject(): unknown {
    const proxyId = this.getProxyId();
    if (proxyId) {
      return EntityProxyFactory.getProxyObject(proxyId);
    }
    return undefined;
  }
}

Entity.registerClass(HSConstants.ModelClass.DMolding, DMolding);