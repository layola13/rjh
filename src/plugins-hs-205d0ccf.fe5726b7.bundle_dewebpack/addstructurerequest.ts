import { HSCore, HSCatalog, HSConstants } from './dependencies';

interface Position {
  x: number;
  y: number;
  z: number;
}

interface Rotation {
  x: number;
  y: number;
  z: number;
}

interface Scale {
  XScale: number;
  YScale: number;
  ZScale: number;
}

interface ContentMeta {
  defaultHeight?: number;
  contentType: ContentType;
  ZLength: number;
}

interface ContentType {
  isTypeOf(type: string): boolean;
}

interface Layer {
  height: number;
  addChild(child: Structure): void;
}

interface Structure {
  initByMeta(meta: ContentMeta): void;
  setMaterial(key: string, value: unknown): void;
  setDefaultMaterial(): void;
  x: number;
  y: number;
  XScale: number;
  YScale: number;
  ZScale: number;
  flip: number;
  XRotation: number;
  YRotation: number;
  ZRotation: number;
  setStructureMode(wallpart: boolean): void;
  syncLayerHeight(): void;
}

type StructureClass = new () => Structure;

export class AddStructureRequest extends HSCore.Transaction.Common.StateRequest {
  private static readonly _STRUCTURE_CLASSNAME_BY_CONTENT_TYPE = new Map<string, string>([
    [HSCatalog.ContentTypeEnum.ColumnDiyRound, HSConstants.ModelClass.NCustomizedCircleColumn],
    [HSCatalog.ContentTypeEnum.ColumnDiySquare, HSConstants.ModelClass.NCustomizedSquareColumn],
    [HSCatalog.ContentTypeEnum.Flue, HSConstants.ModelClass.NCustomizedFlue],
    [HSCatalog.ContentTypeEnum.Riser, HSConstants.ModelClass.NCustomizedRiser],
    [HSCatalog.ContentTypeEnum.Outlet, HSConstants.ModelClass.NCustomizedOutlet],
  ]);

  public meta: ContentMeta;
  public layer: Layer;
  public position: Position;
  public rotation: number | Rotation;
  public host: unknown;
  public scale?: Scale;
  public flip: number;
  public materialMap: Map<string, unknown>;
  public wallpart: boolean;
  public spec?: unknown;

  constructor(
    meta: ContentMeta,
    position?: Position,
    rotation?: number | Rotation,
    scale?: Scale,
    host?: unknown,
    flip?: number,
    materialMap?: Map<string, unknown>,
    layer?: Layer,
    wallpart?: boolean
  ) {
    super();

    this.meta = meta;

    const activeDocument = HSCore.Doc.getDocManager().activeDocument;
    this.layer = layer ?? activeDocument.scene.activeLayer;

    let defaultHeight = meta?.defaultHeight ?? 0;
    const contentType = meta?.contentType;

    if (HSCore.Util.Math.nearlyEquals(0, defaultHeight) && contentType) {
      if (contentType.isTypeOf(HSCatalog.ContentTypeEnum.ext_Ventilation)) {
        defaultHeight = HSConstants.Constants.DEFAULT_VENTILATION_Z;
      } else if (contentType.isTypeOf(HSCatalog.ContentTypeEnum.ext_CeilingAttached)) {
        defaultHeight = this.layer.height - meta.ZLength;
      }
    }

    this.position = position ?? { x: 0, y: 0, z: defaultHeight };
    this.rotation = rotation ?? 0;
    this.host = host;
    this.scale = scale;
    this.flip = flip ?? 0;
    this.materialMap = materialMap ?? new Map();
    this.wallpart = wallpart ?? true;
  }

  public canTransactField(): boolean {
    return true;
  }

  public onCommit(): Structure | undefined {
    const structure = this.createStructure();
    super.onCommit([]);
    return structure;
  }

  public createStructure(): Structure | undefined {
    const StructureClass = this._getContentClass(this.meta);
    
    if (!StructureClass) {
      return undefined;
    }

    const structure = new StructureClass();
    structure.initByMeta(this.meta);

    if (this.materialMap.size > 0) {
      for (const [materialKey, materialValue] of this.materialMap) {
        structure.setMaterial(materialKey, materialValue);
      }
    } else {
      structure.setDefaultMaterial();
    }

    structure.x = this.position.x;
    structure.y = this.position.y;

    if (this.scale) {
      structure.XScale = this.scale.XScale;
      structure.YScale = this.scale.YScale;
      structure.ZScale = this.scale.ZScale;
    }

    if (this.flip) {
      structure.flip = this.flip;
    }

    if (typeof this.rotation === 'number') {
      structure.ZRotation = this.rotation;
    } else {
      structure.XRotation = this.rotation.x;
      structure.YRotation = this.rotation.y;
      structure.ZRotation = this.rotation.z;
    }

    this.layer.addChild(structure);
    structure.setStructureMode(this.wallpart);
    structure.syncLayerHeight();

    return structure;
  }

  private _getContentClass(meta: ContentMeta): StructureClass | undefined {
    for (const [contentTypeKey, className] of AddStructureRequest._STRUCTURE_CLASSNAME_BY_CONTENT_TYPE) {
      if (meta.contentType.isTypeOf(contentTypeKey)) {
        return HSCore.Model.Entity.getClass(className) as StructureClass;
      }
    }
    return undefined;
  }
}

export type XScale = number;
export type YScale = number;
export type ZScale = number;
export type ZRotation = number;
export type XRotation = number;
export type YRotation = number;