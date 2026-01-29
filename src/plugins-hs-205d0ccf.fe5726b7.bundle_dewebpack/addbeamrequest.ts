import { HSCore, HSCatalog, HSConstants } from './hs-core';

interface Position {
  x: number;
  y: number;
  z: number;
}

interface Scale {
  XScale: number;
  YScale: number;
  ZScale: number;
}

interface Rotation {
  x: number;
  y: number;
  z: number;
}

interface BeamMeta {
  defaultHeight?: number;
  contentType?: {
    isTypeOf(type: string): boolean;
  };
  ZLength?: number;
}

interface Layer {
  height: number;
  addChild(child: unknown): void;
}

export class AddBeamRequest extends HSCore.Transaction.Common.StateRequest {
  meta?: BeamMeta;
  layer?: Layer;
  position: Position;
  rotation: number | Rotation;
  host?: unknown;
  scale?: Scale;
  flip: number;
  spec?: unknown;

  constructor(
    meta: BeamMeta | undefined,
    position?: Position,
    rotation?: number | Rotation,
    scale?: Scale,
    host?: unknown,
    flip?: number,
    spec?: unknown,
    layer?: Layer
  ) {
    super();

    this.meta = meta;

    const docManager = HSCore.Doc.getDocManager();
    const activeDocument = docManager.activeDocument;
    this.layer = layer || activeDocument.scene.activeLayer;

    let defaultHeight = meta?.defaultHeight || 0;
    const contentType = meta?.contentType;

    if (HSCore.Util.Math.nearlyEquals(0, defaultHeight) && contentType) {
      if (contentType.isTypeOf(HSCatalog.ContentTypeEnum.ext_Ventilation)) {
        defaultHeight = HSConstants.Constants.DEFAULT_VENTILATION_Z;
      } else if (contentType.isTypeOf(HSCatalog.ContentTypeEnum.ext_CeilingAttached)) {
        defaultHeight = this.layer.height - (meta.ZLength || 0);
      }
    }

    this.position = position || { x: 0, y: 0, z: defaultHeight || 0 };
    this.rotation = rotation || 0;
    this.host = host;
    this.scale = scale;
    this.flip = flip || 0;
  }

  onCommit(): unknown {
    const beam = this.createBeam();
    super.onCommit([]);
    return beam;
  }

  canTransactField(): boolean {
    return true;
  }

  createBeam(): unknown {
    const beam = new HSCore.Model.NCustomizedBeam();
    
    beam.initByMeta(this.meta);
    beam.x = this.position.x;
    beam.y = this.position.y;
    beam.z = this.position.z;

    if (this.scale) {
      beam.XScale = this.scale.XScale;
      beam.YScale = this.scale.YScale;
      beam.ZScale = this.scale.ZScale;
    }

    if (this.flip) {
      beam.flip = this.flip;
    }

    if (typeof this.rotation === 'number') {
      beam.ZRotation = this.rotation;
    } else {
      beam.XRotation = this.rotation.x;
      beam.YRotation = this.rotation.y;
      beam.ZRotation = this.rotation.z;
    }

    this.layer?.addChild(beam);
    beam.setBeamType(true);
    beam.dirtyGeometry();

    return beam;
  }
}