import { Vector2 } from './Vector2';
import { HSCore } from './HSCore';
import { HSCatalog } from './HSCatalog';
import { HSConstants } from './HSConstants';

interface Position3D {
  x: number;
  y: number;
  z: number;
}

interface Rotation3D {
  x: number;
  y: number;
  z: number;
}

interface Scale3D {
  XScale: number;
  YScale: number;
  ZScale: number;
}

interface ContentMeta {
  defaultHeight?: number;
  contentType?: HSCatalog.ContentType;
  XLength?: number;
  YLength?: number;
  ZLength?: number;
}

interface AddOpeningOptions {
  oldOpening?: HSCore.Model.Opening | HSCore.Model.ParametricOpening;
  autoBuild?: boolean;
}

interface AddContentParams {
  content: HSCore.Model.Content;
  host: HSCore.Model.Wall | HSCore.Model.Slab;
  parent: HSCore.Model.Layer;
}

export class AddOpeningRequest extends HSCore.Transaction.Common.StateRequest {
  private _meta: ContentMeta;
  private _layer: HSCore.Model.Layer;
  private _host: HSCore.Model.Wall | HSCore.Model.Slab;
  private _position: Position3D;
  private _rotation: number | Rotation3D;
  private _scale?: Scale3D;
  private _oldOpening?: HSCore.Model.Opening | HSCore.Model.ParametricOpening;
  private _autoBuild: boolean;
  public result?: HSCore.Model.Content;

  constructor(
    meta: ContentMeta,
    position?: Position3D,
    rotation?: number | Rotation3D,
    scale?: Scale3D,
    host?: HSCore.Model.Wall | HSCore.Model.Slab,
    layer?: HSCore.Model.Layer,
    autoBuild?: boolean,
    providedLayer?: HSCore.Model.Layer,
    options?: AddOpeningOptions
  ) {
    super();

    this._meta = meta;

    const docManager = HSCore.Doc.getDocManager();
    const activeDocument = docManager.activeDocument;

    this._oldOpening = options?.oldOpening;
    this._autoBuild = options?.autoBuild ?? true;
    this._layer = providedLayer instanceof HSCore.Model.Layer 
      ? providedLayer 
      : activeDocument.scene.activeLayer;

    let defaultHeight = meta?.defaultHeight ?? 0;
    const contentType = meta?.contentType;

    if (HSCore.Util.Math.nearlyEquals(0, defaultHeight) && contentType) {
      if (contentType.isTypeOf(HSCatalog.ContentTypeEnum.ext_Ventilation)) {
        defaultHeight = HSConstants.Constants.DEFAULT_VENTILATION_Z;
      } else if (contentType.isTypeOf(HSCatalog.ContentTypeEnum.ext_CeilingAttached)) {
        defaultHeight = this._layer.height - (meta.ZLength ?? 0);
      }
    }

    this._host = host!;
    this._position = position ?? { x: 0, y: 0, z: defaultHeight };
    this._rotation = rotation ?? 0;
    this._scale = scale;
  }

  onCommit(): HSCore.Model.Content | undefined {
    const meta = this._meta;
    const ContentClass = this._getContentClass(meta);

    if (!ContentClass) {
      return undefined;
    }

    const content = new ContentClass();
    content.initByMeta(meta);

    const layer = this._layer;

    content.x = this._position.x;
    content.y = this._position.y;
    content.z = this._position.z;

    if (!this._scale && this._oldOpening && HSCore.Util.Content.isSlabOpening(this._oldOpening)) {
      this._scale = {
        XScale: meta.XLength 
          ? (this._oldOpening.XLength * this._oldOpening.XScale) / meta.XLength 
          : 1,
        YScale: meta.YLength 
          ? (this._oldOpening.YLength * this._oldOpening.YScale) / meta.YLength 
          : 1,
        ZScale: 1
      };
    }

    if (this._scale) {
      if (content instanceof HSCore.Model.Opening && content.supportPM()) {
        content.XLength *= this._scale.XScale;
        content.YLength *= this._scale.YScale;
        content.ZLength *= this._scale.ZScale;
        content.updateByPM();
      } else {
        content.XScale = this._scale.XScale;
        content.YScale = this._scale.YScale;
        content.ZScale = this._scale.ZScale;
      }
    }

    if (typeof this._rotation === 'number') {
      content.ZRotation = this._rotation;
    } else {
      content.XRotation = this._rotation.x;
      content.YRotation = this._rotation.y;
      content.ZRotation = this._rotation.z;
    }

    if (this._oldOpening) {
      let thickness = this._oldOpening.thickness;
      const contentPosition = new Vector2(content);

      if (this._host instanceof HSCore.Model.Wall) {
        const wallWidth = this._host.width;
        const projectedPoint = this._host.rightPath.getProjectedPtBy(contentPosition);
        const normalDirection = contentPosition.subtracted(projectedPoint).normalize();

        if (
          HSCore.Util.Content.isWallOpening(this._oldOpening) &&
          !HSCore.Util.Content.isWallNiche(this._oldOpening) &&
          HSCore.Util.Content.isWallNiche(content)
        ) {
          const newPosition = projectedPoint.added(normalDirection.multiplied(wallWidth / 4));
          content.x = newPosition.x;
          content.y = newPosition.y;
          thickness = wallWidth / 2;
        } else if (
          HSCore.Util.Content.isWallNiche(this._oldOpening) &&
          HSCore.Util.Content.isWallOpening(content) &&
          !HSCore.Util.Content.isWallNiche(content)
        ) {
          const newPosition = projectedPoint.added(normalDirection.multiplied(wallWidth / 2));
          content.x = newPosition.x;
          content.y = newPosition.y;
          thickness = wallWidth;
        }
      } else if (this._host instanceof HSCore.Model.Slab) {
        const slabThickness = this._host.thickness;

        if (
          HSCore.Util.Content.isSlabOpening(this._oldOpening) &&
          !HSCore.Util.Content.isSlabNiche(this._oldOpening) &&
          HSCore.Util.Content.isSlabNiche(content)
        ) {
          content.z = slabThickness / 4;
          thickness = slabThickness / 2;
        } else if (
          HSCore.Util.Content.isSlabNiche(this._oldOpening) &&
          HSCore.Util.Content.isSlabOpening(content) &&
          !HSCore.Util.Content.isSlabNiche(content)
        ) {
          content.z = slabThickness / 2;
          thickness = slabThickness;
        }
      }

      content.thickness = thickness;
    }

    const parentLayer = layer;
    const addParams: AddContentParams = {
      content,
      host: this._host,
      parent: parentLayer
    };

    HSCore.Util.Content.addContent(addParams);

    if (this._autoBuild) {
      content.build?.();
    }

    if (
      content.getHost() instanceof HSCore.Model.Wall &&
      (content instanceof HSCore.Model.Opening || content instanceof HSCore.Model.ParametricOpening)
    ) {
      content.linkFaces.forEach((face: HSCore.Model.Face) => {
        HSCore.Util.Molding.reAddFaceMolding(face);
      });
    }

    this.result = content;
    return content;
  }

  canTransactField(): boolean {
    return true;
  }

  private _getContentClass(meta: ContentMeta): any {
    let contentClassName: string = HSConstants.ModelClass.NgContent;

    const contentClassMapping = (HSCore.Model as any)._CONTENT_CLASSNAME_BY_CONTENT_TYPE;

    if (contentClassMapping && Array.isArray(contentClassMapping)) {
      contentClassMapping.some((mapping: [HSCatalog.ContentType, string]) => {
        const [typeCheck, className] = mapping;
        if (meta.contentType?.isTypeOf(typeCheck)) {
          contentClassName = className;
          return true;
        }
        return false;
      });
    }

    return HSCore.Model.Entity.getClass(contentClassName);
  }
}