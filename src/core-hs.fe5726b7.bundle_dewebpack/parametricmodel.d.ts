import { BaseObject } from './BaseObject';
import { WebCadDocument } from './WebCadDocument';
import { Util } from './Util';

/**
 * Graphics object configuration interface
 */
interface GraphicsObjectConfig {
  /** Entity identifier */
  entityId: string;
  /** Graphics object type */
  type: HSConstants.GraphicsObjectType;
  /** Visibility state */
  visible: boolean;
}

/**
 * Graphics data result structure
 */
interface GraphicsDataResult {
  /** Mesh definitions array */
  meshDefs: MeshDefinition[];
  /** Graphics objects array */
  objects: GraphicsObject[];
}

/**
 * Mesh definition with material data
 */
interface MeshDefinition {
  meshKey: string;
  // Additional mesh properties from applyMaterialToUV
  [key: string]: unknown;
}

/**
 * Graphics object with material and mesh reference
 */
interface GraphicsObject extends GraphicsObjectConfig {
  /** Graphics path identifier */
  graphicsPath: string;
  /** Mesh key reference */
  mesh: string;
  /** Material configuration */
  material: MaterialObject;
}

/**
 * Material object structure
 */
interface MaterialObject {
  [key: string]: unknown;
}

/**
 * Entity interface with required methods and properties
 */
interface Entity {
  /** Entity unique identifier */
  ID: string;
  /** Entity parameters */
  parameters: {
    /** Material data configuration */
    materialData: unknown;
  };
  /** Get host entity */
  getHost(): Entity | null | undefined;
  /** Check if flag is off */
  isFlagOff(flag: HSCore.Model.EntityFlagEnum): boolean;
}

/**
 * Parametric model class for handling CAD entities with graphics rendering
 * Manages WebCAD document lifecycle and graphics data conversion
 */
declare class ParametricModel extends BaseObject {
  /** Internal WebCAD document instance */
  private _webCADDocument: WebCadDocument;
  
  /** Parent WebCAD document reference */
  protected parentWebCADDoc: unknown;

  /**
   * Creates a new ParametricModel instance
   * @param entity - The entity to model
   * @param parentDoc - Parent WebCAD document
   * @param param2 - Additional construction parameter
   * @param param3 - Additional construction parameter
   */
  constructor(
    entity: Entity,
    parentDoc: unknown,
    param2: unknown,
    param3: unknown
  );

  /**
   * Called when the model needs to be updated
   * Reinitializes the internal WebCAD document
   */
  onUpdate(): void;

  /**
   * Asynchronously converts entity to graphics data
   * @returns Promise resolving to graphics data with mesh definitions and objects
   */
  toGraphicsDataAsync(): Promise<GraphicsDataResult>;

  /**
   * Synchronously converts entity to graphics data
   * @returns Graphics data with mesh definitions and objects
   */
  toGraphicsData(): GraphicsDataResult;

  /**
   * Handler called when entity flags change
   * @param flag - The flag that changed
   */
  onFlagChanged(flag: unknown): void;
}

export { ParametricModel };