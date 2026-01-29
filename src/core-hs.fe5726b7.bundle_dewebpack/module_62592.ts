import { PModel_IO, PModel } from './PModel';
import { Entity } from './Entity';
import { FieldValueType } from './FieldValueType';
import { Material } from './Material';
import { Logger } from './Logger';

interface DumpOptions {
  [key: string]: unknown;
}

interface LoadContext {
  states: Record<string, StateField>;
  productsMap?: Map<string, ProductMetadata>;
}

interface StateField {
  id: string;
  value: unknown;
  verify(): boolean;
  bindObjectFieldChanged(obj: unknown, fieldName: string): void;
}

interface ProductMetadata {
  id: string;
  contentType: HSCatalog.ContentType;
  normalTexture?: string;
  profile?: unknown;
  profileSizeX: number;
  profileSizeY: number;
}

interface CreateParams {
  resource?: ProductMetadata;
  localId: string;
  material: unknown;
  parameters?: {
    x?: number | null;
    y?: number | null;
    z?: number | null;
    paths?: number[][][];
  };
}

interface UpdateParams {
  paths?: number[][][];
  profileMeta?: ProductMetadata;
  material?: unknown;
}

interface Point2D {
  x: number;
  y: number;
}

interface Bound2D {
  minx: number;
  maxx: number;
  miny: number;
  maxy: number;
}

interface LightBandData {
  x: number;
  y: number;
  z: number;
  rotation: number;
  XScale: number;
  YScale: number;
  ZScale: number;
  obj: string;
}

class PMolding_IO extends PModel_IO {
  dump(
    model: PMolding,
    callback?: (result: unknown[], model: PMolding) => void,
    includeState: boolean = true,
    options: DumpOptions = {}
  ): unknown[] {
    const result = super.dump(model, undefined, includeState, options);
    const data = result[0] as Record<string, unknown>;

    data.seekId = model.seekId;
    data.name = model.name;
    data.XSize = (model as any).__XSize.id;
    data.YSize = (model as any).__YSize.id;
    data.paths = (model as any).__paths.id;

    callback?.(result, model);
    return result;
  }

  load(target: PMolding, data: any, context: LoadContext): void {
    super.load(target, data, context);

    target.seekId = data.seekId;

    if (context.productsMap) {
      const metadata = context.productsMap.get(data.seekId);
      (target as any).__metadata = metadata;
    }

    if (data.XSize) {
      (target as any).__XSize = context.states[data.XSize];
      (target as any).__XSize.bindObjectFieldChanged(target, 'XSize');
    }

    if (data.YSize) {
      (target as any).__YSize = context.states[data.YSize];
      (target as any).__YSize.bindObjectFieldChanged(target, 'YSize');
    }

    if (data.paths) {
      (target as any).__paths = context.states[data.paths];
      (target as any).__paths.bindObjectFieldChanged(target, 'paths');
    }
  }
}

class PMolding extends PModel {
  private _seekId: string = '';
  private __XSize!: StateField;
  private __YSize!: StateField;
  private __paths!: StateField;
  private __metadata?: ProductMetadata;
  private __x: any;
  private __y: any;
  private __z: any;
  public outline: Point2D[] = [];
  public boundInternal: any;

  constructor(param1: string = '', param2?: unknown) {
    super(param1, param2);

    this.defineStateField('XSize', 0.1);
    this.defineStateField('YSize', 0.1);
    this.defineStateField('paths', []);
    this.defineField('metadata', undefined, {
      fieldValueType: FieldValueType.Metadata,
      postSet(this: PMolding, newValue: unknown, oldValue: unknown): void {
        this._seekId = '';
      }
    });
  }

  static create(params: CreateParams): PMolding {
    const resource = params.resource;
    const molding = new PMolding();

    molding.localId = params.localId;
    molding.material = Material.create(params.material);

    const parameters = params.parameters;
    if (parameters) {
      molding.__x.__value = parameters.x === undefined || parameters.x === null ? 0 : parameters.x;
      molding.__y.__value = parameters.y === undefined || parameters.y === null ? 0 : parameters.y;
      molding.__z.__value = parameters.z === undefined || parameters.z === null ? 0 : parameters.z;
      molding.__paths.__value = parameters.paths ?? [];
    }

    if (resource) {
      molding.metadata = resource;
      molding.__XSize.__value = resource.profileSizeX;
      molding.__YSize.__value = resource.profileSizeY;
    }

    return molding;
  }

  get seekId(): string {
    return this._seekId || (this.metadata ? this.metadata.id : '');
  }

  set seekId(value: string) {
    Logger.console.assert(
      !value || !this.metadata || !this.metadata.id || value === this.metadata.id,
      'seekId should be consistent with metadata!'
    );
    this._seekId = value;
  }

  get metadata(): ProductMetadata | undefined {
    return this.__metadata;
  }

  set metadata(value: ProductMetadata | undefined) {
    this.__metadata = value;
  }

  get contentType(): HSCatalog.ContentType {
    return this.metadata ? this.metadata.contentType : new HSCatalog.ContentType('');
  }

  get normalTexture(): string | undefined {
    return this.metadata?.normalTexture;
  }

  get profile(): unknown {
    return this.metadata?.profile;
  }

  get XSize(): number {
    return this.__XSize.value as number;
  }

  set XSize(value: number) {
    this.__XSize.value = value;
  }

  get YSize(): number {
    return this.__YSize.value as number;
  }

  set YSize(value: number) {
    this.__YSize.value = value;
  }

  get paths(): number[][][] {
    return this.__paths.value as number[][][];
  }

  set paths(value: number[][][]) {
    this.__paths.value = value;
  }

  get x(): number {
    return this.__x.__value;
  }

  get y(): number {
    return this.__y.__value;
  }

  get z(): number {
    return this.__z.__value;
  }

  get ZRotation(): number {
    return (this as any).ZRotation;
  }

  getPaths(): number[][][] {
    const clonedPaths = JSON.parse(JSON.stringify(this.paths)) as number[][][];
    clonedPaths.forEach((path: number[][]) => {
      path.reverse();
    });
    return clonedPaths;
  }

  verify(): boolean {
    if (!super.verify()) {
      return false;
    }

    if (this.__XSize && !this.__XSize.verify()) {
      log.error(`${this.tag}: invalid XSize.`, 'HSCore.Verify.Error', true);
      return false;
    }

    if (this.__YSize && !this.__YSize.verify()) {
      log.error(`${this.tag}: invalid YSize.`, 'HSCore.Verify.Error', true);
      return false;
    }

    const pathsValue = this.__paths?.value;
    const isPathsValid =
      this.__paths &&
      this.__paths.verify() &&
      Array.isArray(pathsValue) &&
      (pathsValue as any[]).every((path: unknown) =>
        Array.isArray(path) ? path.every((point: unknown) => point) : path != null
      );

    if (!isPathsValid) {
      log.error(`${this.tag}: invalid path.`, 'HSCore.Verify.Error', true);
      return false;
    }

    return true;
  }

  getIO(): PMolding_IO {
    return PMolding_IO.instance();
  }

  update(params: UpdateParams): void {
    const { paths, profileMeta, material } = params;

    if (paths) {
      this.paths = paths;
    }

    if (profileMeta) {
      this.metadata = profileMeta;
    }

    if (material) {
      this.setMaterial(material);
    }
  }

  refreshBoundInternal(): void {
    const paths = this.getPaths();
    if (paths.length === 0) {
      return;
    }

    const bound: Bound2D = HSCore.Util.Collision.getPolygonBound(paths[0]);

    this.outline[3] = { x: bound.minx, y: bound.maxy };
    this.outline[2] = { x: bound.maxx, y: bound.maxy };
    this.outline[1] = { x: bound.maxx, y: bound.miny };
    this.outline[0] = { x: bound.minx, y: bound.miny };

    this.boundInternal.reset();
    for (let i = 0; i < 4; ++i) {
      this.boundInternal.appendPoint(this.outline[i]);
    }
  }

  isContentInRoom(room: unknown, strictMode: boolean = false): boolean {
    return this.getUniqueParent().isContentInRoom(room, strictMode);
  }

  isContentInLoop(loop: unknown, strictMode: boolean = false): boolean {
    return this.getUniqueParent().isContentInLoop(loop, strictMode);
  }

  isSameMolding(other: PMolding): boolean {
    if (!other || this.seekId !== other.seekId) {
      return false;
    }

    const thisMaterial = this.material;
    const otherMaterial = other.material;
    const getMaterialSeekId = (mat: any): string => (mat ? mat.seekId : '');

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

  onFieldChanged(fieldName: string, newValue: unknown, oldValue: unknown): void {
    if (fieldName === 'XSize' || fieldName === 'YSize' || fieldName === 'paths') {
      this.dirty();
      this.signalGeometryChanged.dispatch();
    } else if (fieldName === 'x' || fieldName === 'y' || fieldName === 'z') {
      this.dirty();
      this.signalPositionChanged.dispatch();
    } else if (fieldName === 'metadata') {
      this.dirty();
      this.signalGeometryChanged.dispatch();
    }

    super.onFieldChanged(fieldName, newValue, oldValue);
  }

  getLightBandData(): LightBandData[] | null {
    const objStrings = this._generateLightBandObjStr();
    if (!objStrings) {
      return null;
    }

    const results: LightBandData[] = [];
    objStrings.forEach((objStr: string) => {
      if (objStr) {
        results.push({
          x: this.x,
          y: this.z,
          z: -this.y,
          rotation: THREE.Math.degToRad(-this.ZRotation),
          XScale: 1,
          YScale: 1,
          ZScale: 1,
          obj: objStr
        });
      }
    }, this);

    return results;
  }

  private _generateLightBandObjStr(): string[] | null {
    const geometryObject = HSCore.Doc.getDocManager().geometryManager.getGeometryObject(this.id);
    const documentJSON = geometryObject._webCadDocument.getDocumentJSON();

    if (documentJSON?.children) {
      const firstChild = Object.values(documentJSON.children)[0];
      if (firstChild) {
        return [WebCADModelAPI.exportObj(firstChild)];
      }
    }

    return null;
  }
}

Entity.registerClass(HSConstants.ModelClass.NgPMolding, PMolding);

export { PMolding, PMolding_IO };