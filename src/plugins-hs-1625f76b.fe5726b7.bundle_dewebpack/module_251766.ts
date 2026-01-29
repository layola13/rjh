import { getClass } from './path/to/Entity';
import { StateRequest } from './path/to/Transaction';
import { getDocManager } from './path/to/DocManager';
import { addContent } from './path/to/ContentUtil';
import { syncChildrenByWebCADDocument } from './path/to/CustomizedModelUtil';
import { nearlyEquals } from './path/to/MathUtil';

interface Position {
  x: number;
  y: number;
  z: number;
}

interface Rotation {
  x?: number;
  y?: number;
  z?: number;
}

interface Scale {
  XScale: number;
  YScale: number;
  ZScale: number;
}

interface ContentMeta {
  defaultHeight?: number;
  contentType: ContentType;
  ZLength?: number;
  webCADDocument?: unknown;
  customizedProductUrl?: string;
  parameters?: unknown;
  productType?: string;
  components?: string[];
}

interface ContentType {
  isTypeOf(type: string): boolean;
}

interface Layer {
  height: number;
}

interface Content {
  x: number;
  y: number;
  z: number;
  XScale?: number;
  YScale?: number;
  ZScale?: number;
  flip?: number;
  XRotation?: number;
  YRotation?: number;
  ZRotation?: number;
  initByMeta(meta: ContentMeta): void;
  setMaterial(key: string, value: unknown): void;
  setDefaultMaterial(): void;
  setHeight?(height: number): void;
  initialZLength?: number;
}

interface Obstacle extends Content {
  setHeight(height: number): void;
  initialZLength: number;
}

interface CustomizedModel extends Content {}

interface ContentSpec {
  content: Content;
  host: unknown;
  parent: Layer;
}

type ContentClassMapping = [string, string];

const DEFAULT_VENTILATION_Z = 0; // Replace with actual constant
const DEFAULT_CEILING_OFFSET = 0; // Replace with actual constant

/**
 * Creates and manages content entities with specified properties
 */
export default class ContentCreationRequest extends StateRequest {
  private static readonly _CONTENT_CLASSNAME_BY_CONTENT_TYPE: ContentClassMapping[] = [
    ['AdjustableArchWallOpening', 'NgHole'],
    ['AdjustableArchWallNiche', 'NgHole'],
    ['WallOpening', 'NgHole'],
    ['SlabOpening', 'NgHole'],
    ['WallNiche', 'NgHole'],
    ['SlabNiche', 'NgHole'],
    ['AirConditionHoleOpening', 'NgHole'],
    ['Door', 'NgDoor'],
    ['Window', 'NgWindow'],
    ['CustomizedFeaturewall', 'NgCustomizedModel'],
    ['CustomizedCeiling', 'NgCustomizedModel'],
    ['SoftCloth', 'NgSoftCloth'],
    ['SmartCustomizedCeiling', 'NgCustomizedModel'],
    ['Beam', 'NgBeam'],
    ['ColumnDiyRound', 'NgColumn'],
    ['ColumnDiySquare', 'NgColumn'],
    ['Flue', 'NgFlue'],
    ['Riser', 'NgFlue'],
    ['CustomizedPlatform', 'NgCustomizedModel'],
    ['CustomizedFixedFurniture', 'NgCustomizedModel'],
    ['CustomizedFloor', 'NgCustomizedModel'],
    ['CustomizedFurniture', 'NgCustomizedModel'],
    ['CustomizedWainscot', 'NgCustomizedModel'],
    ['CustomizedPersonalizedModel', 'NgCustomizedModel'],
    ['CustomizedBackgroundModel', 'NgCustomizedModel'],
    ['Curtain', 'NgCurtain'],
    ['SewerPipeRound', 'NgSewerPipe'],
    ['SewerPipeSquare', 'NgSewerPipe'],
    ['ExtrusionCustomizedBackgroundWall', 'CustomizedBackgroundWall'],
    ['ExtrusionCustomizedCeilingModel', 'CustomizedCeilingModel']
  ];

  private _meta: ContentMeta;
  private _layer: Layer;
  private _position: Position;
  private _rotation: number | Rotation;
  private _host: unknown;
  private _scale?: Scale;
  private _flip: number;
  private _materialMap: Map<string, unknown>;
  private _content?: Content;
  private _spec?: ContentSpec;

  constructor(
    meta: ContentMeta,
    position?: Position,
    rotation?: number | Rotation,
    scale?: Scale,
    host?: unknown,
    flip?: number,
    materialMap?: Map<string, unknown>,
    layer?: Layer
  ) {
    super();
    
    this._meta = meta;
    
    const activeDocument = getDocManager().activeDocument;
    this._layer = layer ?? activeDocument.scene.activeLayer;
    
    let defaultHeight = meta?.defaultHeight ?? 0;
    const contentType = meta?.contentType;
    
    if (nearlyEquals(0, defaultHeight) && contentType) {
      if (contentType.isTypeOf('ext_Ventilation')) {
        defaultHeight = DEFAULT_VENTILATION_Z;
      } else if (contentType.isTypeOf('ext_CeilingAttached')) {
        defaultHeight = this._layer.height - (meta.ZLength ?? 0);
      }
    }
    
    this._position = position ?? { x: 0, y: 0, z: defaultHeight };
    this._rotation = rotation ?? 0;
    this._host = host;
    this._scale = scale;
    this._flip = flip ?? 0;
    this._materialMap = materialMap ?? new Map();
  }

  get content(): Content | undefined {
    return this._content;
  }

  onCommit(): Content {
    this._content = this.createContent();
    super.onCommit();
    return this._content;
  }

  createContent(): Content {
    const activeDocument = getDocManager().activeDocument;
    const meta = this._meta;
    
    const ContentClass = this._getContentClass(meta);
    const content = new ContentClass('', activeDocument) as Content;
    
    content.initByMeta(meta);
    
    const layer = this._layer;
    
    if (this._materialMap.size > 0) {
      for (const [materialKey, materialValue] of this._materialMap) {
        content.setMaterial(materialKey, materialValue);
      }
    } else {
      content.setDefaultMaterial();
    }
    
    content.x = this._position.x;
    content.y = this._position.y;
    
    if (this._scale) {
      content.XScale = this._scale.XScale;
      content.YScale = this._scale.YScale;
      content.ZScale = this._scale.ZScale;
    }
    
    if (this._flip) {
      content.flip = this._flip;
    }
    
    if (!meta.contentType.isTypeOf('ext_opening')) {
      content.z = this._position.z;
    }
    
    if (meta.contentType.isTypeOf('ext_Wainscot')) {
      content.z = 0.08;
    }
    
    if (typeof this._rotation === 'number') {
      content.ZRotation = this._rotation;
    } else {
      content.XRotation = this._rotation.x ?? 0;
      content.YRotation = this._rotation.y ?? 0;
      content.ZRotation = this._rotation.z ?? 0;
    }
    
    const parentLayer = layer;
    this._spec = {
      content,
      host: this._host,
      parent: parentLayer
    };
    
    addContent(this._spec);
    
    if (this._isObstacle(content)) {
      content.setHeight(layer.height);
      content.initialZLength = layer.height;
    }
    
    if (this._isCustomizedModel(content)) {
      syncChildrenByWebCADDocument(content);
    }
    
    return content;
  }

  private _getContentClass(meta: ContentMeta): new (...args: unknown[]) => Content {
    const mapping = ContentCreationRequest._CONTENT_CLASSNAME_BY_CONTENT_TYPE.find(
      ([contentTypeKey]) => meta.contentType.isTypeOf(contentTypeKey)
    );
    
    let className = mapping?.[1] ?? 'NgContent';
    
    if (className === 'NgCurtain') {
      const hasCurtainComponent = meta.components?.some(component =>
        Object.values(['CurtainTrack', 'CurtainRod', 'CurtainFabric']).some(
          enumValue => component.includes(enumValue)
        )
      );
      
      if (!hasCurtainComponent) {
        className = 'NgContent';
      }
    } else if (className === 'NgBeam') {
      if (!meta.webCADDocument && !meta.customizedProductUrl && !meta.parameters) {
        className = 'NgContent';
      }
    } else if (meta.productType === 'PAssembly') {
      className = 'NgPAssembly';
    }
    
    return getClass(className) as new (...args: unknown[]) => Content;
  }

  getComposeSpec(): [ContentMeta, Position, number | Rotation, Scale | undefined, unknown, number] {
    return [this._meta, this._position, this._rotation, this._scale, this._host, this._flip];
  }

  canTransactField(): boolean {
    return true;
  }

  private _isObstacle(content: Content): content is Obstacle {
    return 'setHeight' in content && typeof content.setHeight === 'function';
  }

  private _isCustomizedModel(content: Content): content is CustomizedModel {
    return content.constructor.name === 'CustomizedModel';
  }
}