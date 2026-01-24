import { ContentMeta, Position3D, Rotation3D, Scale3D, MaterialMap } from './types';

/**
 * Content creation transaction request
 * Handles the creation and initialization of various content types in the scene
 */
export default class CreateContentRequest extends HSCore.Transaction.Common.StateRequest {
  /**
   * Mapping of content types to their corresponding model classes
   */
  private static readonly _CONTENT_CLASSNAME_BY_CONTENT_TYPE: Array<[HSCatalog.ContentTypeEnum, HSConstants.ModelClass]> = [
    [HSCatalog.ContentTypeEnum.AdjustableArchWallOpening, HSConstants.ModelClass.NgHole],
    [HSCatalog.ContentTypeEnum.AdjustableArchWallNiche, HSConstants.ModelClass.NgHole],
    [HSCatalog.ContentTypeEnum.WallOpening, HSConstants.ModelClass.NgHole],
    [HSCatalog.ContentTypeEnum.SlabOpening, HSConstants.ModelClass.NgHole],
    [HSCatalog.ContentTypeEnum.WallNiche, HSConstants.ModelClass.NgHole],
    [HSCatalog.ContentTypeEnum.SlabNiche, HSConstants.ModelClass.NgHole],
    [HSCatalog.ContentTypeEnum.AirConditionHoleOpening, HSConstants.ModelClass.NgHole],
    [HSCatalog.ContentTypeEnum.Door, HSConstants.ModelClass.NgDoor],
    [HSCatalog.ContentTypeEnum.Window, HSConstants.ModelClass.NgWindow],
    [HSCatalog.ContentTypeEnum.CustomizedFeaturewall, HSConstants.ModelClass.NgCustomizedModel],
    [HSCatalog.ContentTypeEnum.CustomizedCeiling, HSConstants.ModelClass.NgCustomizedModel],
    [HSCatalog.ContentTypeEnum.SoftCloth, HSConstants.ModelClass.NgSoftCloth],
    [HSCatalog.ContentTypeEnum.SmartCustomizedCeiling, HSConstants.ModelClass.NgCustomizedModel],
    [HSCatalog.ContentTypeEnum.Beam, HSConstants.ModelClass.NgBeam],
    [HSCatalog.ContentTypeEnum.ColumnDiyRound, HSConstants.ModelClass.NgColumn],
    [HSCatalog.ContentTypeEnum.ColumnDiySquare, HSConstants.ModelClass.NgColumn],
    [HSCatalog.ContentTypeEnum.Flue, HSConstants.ModelClass.NgFlue],
    [HSCatalog.ContentTypeEnum.Riser, HSConstants.ModelClass.NgFlue],
    [HSCatalog.ContentTypeEnum.CustomizedPlatform, HSConstants.ModelClass.NgCustomizedModel],
    [HSCatalog.ContentTypeEnum.CustomizedFixedFurniture, HSConstants.ModelClass.NgCustomizedModel],
    [HSCatalog.ContentTypeEnum.CustomizedFloor, HSConstants.ModelClass.NgCustomizedModel],
    [HSCatalog.ContentTypeEnum.CustomizedFurniture, HSConstants.ModelClass.NgCustomizedModel],
    [HSCatalog.ContentTypeEnum.CustomizedWainscot, HSConstants.ModelClass.NgCustomizedModel],
    [HSCatalog.ContentTypeEnum.CustomizedPersonalizedModel, HSConstants.ModelClass.NgCustomizedModel],
    [HSCatalog.ContentTypeEnum.CustomizedBackgroundModel, HSConstants.ModelClass.NgCustomizedModel],
    [HSCatalog.ContentTypeEnum.Curtain, HSConstants.ModelClass.NgCurtain],
    [HSCatalog.ContentTypeEnum.SewerPipeRound, HSConstants.ModelClass.NgSewerPipe],
    [HSCatalog.ContentTypeEnum.SewerPipeSquare, HSConstants.ModelClass.NgSewerPipe],
    [HSCatalog.ContentTypeEnum.ExtrusionCustomizedBackgroundWall, HSConstants.ModelClass.CustomizedBackgroundWall],
    [HSCatalog.ContentTypeEnum.ExtrusionCustomizedCeilingModel, HSConstants.ModelClass.CustomizedCeilingModel]
  ];

  private readonly _meta: ContentMeta;
  private readonly _position: Position3D;
  private readonly _rotation: number | Rotation3D;
  private readonly _scale?: Scale3D;
  private readonly _host?: HSCore.Model.Entity;
  private readonly _flip: number;
  private readonly _materialMap: Map<string, HSCore.Model.Material>;
  private readonly _layer: HSCore.Model.Layer;
  private _content?: HSCore.Model.Content;
  private _spec?: ContentSpec;

  constructor(
    meta: ContentMeta,
    position?: Position3D,
    rotation?: number | Rotation3D,
    scale?: Scale3D,
    host?: HSCore.Model.Entity,
    flip?: number,
    materialMap?: Map<string, HSCore.Model.Material>,
    layer?: HSCore.Model.Layer
  ) {
    super();

    this._meta = meta;

    const activeDocument = HSCore.Doc.getDocManager().activeDocument;
    this._layer = layer ?? activeDocument.scene.activeLayer;

    const defaultHeight = meta?.defaultHeight ?? 0;
    const contentType = meta?.contentType;

    let initialZ = defaultHeight;

    if (HSCore.Util.Math.nearlyEquals(0, defaultHeight) && contentType) {
      if (contentType.isTypeOf(HSCatalog.ContentTypeEnum.ext_Ventilation)) {
        initialZ = HSConstants.Constants.DEFAULT_VENTILATION_Z;
      } else if (contentType.isTypeOf(HSCatalog.ContentTypeEnum.ext_CeilingAttached)) {
        initialZ = this._layer.height - meta.ZLength;
      }
    }

    this._position = position ?? { x: 0, y: 0, z: initialZ };
    this._rotation = rotation ?? 0;
    this._host = host;
    this._scale = scale;
    this._flip = flip ?? 0;
    this._materialMap = materialMap ?? new Map();
  }

  /**
   * Gets the created content instance
   */
  get content(): HSCore.Model.Content | undefined {
    return this._content;
  }

  /**
   * Commits the transaction and creates the content
   */
  onCommit(): HSCore.Model.Content {
    this._content = this.createContent();
    super.onCommit();
    return this._content;
  }

  /**
   * Creates and initializes the content object based on metadata
   */
  createContent(): HSCore.Model.Content {
    const activeDocument = HSCore.Doc.getDocManager().activeDocument;
    const ContentClass = this._getContentClass(this._meta);
    const content = new ContentClass('', activeDocument);

    content.initByMeta(this._meta);

    const layer = this._layer;

    // Apply materials
    if (this._materialMap.size > 0) {
      for (const [materialKey, material] of this._materialMap) {
        content.setMaterial(materialKey, material);
      }
    } else {
      content.setDefaultMaterial();
    }

    // Set position
    content.x = this._position.x;
    content.y = this._position.y;

    // Apply scale
    if (this._scale) {
      content.XScale = this._scale.XScale;
      content.YScale = this._scale.YScale;
      content.ZScale = this._scale.ZScale;
    }

    // Apply flip
    if (this._flip) {
      content.flip = this._flip;
    }

    // Set Z position for non-opening content types
    if (!this._meta.contentType.isTypeOf(HSCatalog.ContentTypeEnum.ext_opening)) {
      content.z = this._position.z;
    }

    // Special handling for wainscot
    if (this._meta.contentType.isTypeOf(HSCatalog.ContentTypeEnum.ext_Wainscot)) {
      content.z = 0.08;
    }

    // Apply rotation
    if (typeof this._rotation === 'number') {
      content.ZRotation = this._rotation;
    } else {
      content.XRotation = this._rotation.x;
      content.YRotation = this._rotation.y;
      content.ZRotation = this._rotation.z;
    }

    // Add content to scene
    const parentLayer = layer;
    this._spec = {
      content,
      host: this._host,
      parent: parentLayer
    };

    HSCore.Util.Content.addContent(this._spec);

    // Special handling for obstacles
    if (content instanceof HSCore.Model.Obstacle) {
      content.setHeight(layer.height);
      content.initialZLength = layer.height;
    }

    // Sync customized model children
    if (content instanceof HSCore.Model.CustomizedModel) {
      HSCore.Util.CustomizedModel.syncChildrenByWebCADDocument(content);
    }

    return content;
  }

  /**
   * Determines the appropriate content class based on metadata
   */
  private _getContentClass(meta: ContentMeta): new (...args: any[]) => HSCore.Model.Content {
    const entry = CreateContentRequest._CONTENT_CLASSNAME_BY_CONTENT_TYPE.find(
      ([contentTypeEnum]) => meta.contentType.isTypeOf(contentTypeEnum)
    );

    let className = entry?.[1] ?? HSConstants.ModelClass.NgContent;

    // Special handling for curtains
    if (className === HSConstants.ModelClass.NgCurtain) {
      const hasCurtainComponent = meta.components.some(component =>
        Object.values(HSCore.Model.CurtainComponentEnum).some(curtainType =>
          component.includes(curtainType)
        )
      );

      if (!hasCurtainComponent) {
        className = HSConstants.ModelClass.NgContent;
      }
    }
    // Special handling for beams
    else if (className === HSConstants.ModelClass.NgBeam) {
      if (!meta.webCADDocument && !meta.customizedProductUrl && !meta.parameters) {
        className = HSConstants.ModelClass.NgContent;
      }
    }
    // Special handling for assemblies
    else if (meta.productType === HSCatalog.ProductTypeEnum.PAssembly) {
      className = HSConstants.ModelClass.NgPAssembly;
    }

    return HSCore.Model.Entity.getClass(className);
  }

  /**
   * Gets the composition specification for this request
   */
  getComposeSpec(): [ContentMeta, Position3D, number | Rotation3D, Scale3D | undefined, HSCore.Model.Entity | undefined, number] {
    return [
      this._meta,
      this._position,
      this._rotation,
      this._scale,
      this._host,
      this._flip
    ];
  }

  /**
   * Indicates whether this transaction can handle field-level changes
   */
  canTransactField(): boolean {
    return true;
  }
}

/**
 * Content specification for adding content to the scene
 */
interface ContentSpec {
  content: HSCore.Model.Content;
  host?: HSCore.Model.Entity;
  parent: HSCore.Model.Layer;
}