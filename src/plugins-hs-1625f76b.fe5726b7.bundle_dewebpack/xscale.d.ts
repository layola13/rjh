/**
 * Content creation command for adding various types of 3D content to the scene.
 * Handles initialization, positioning, scaling, rotation, and material application.
 */

import { HSCore } from './HSCore';
import { HSCatalog } from './HSCatalog';
import { HSConstants } from './HSConstants';
import { HSApp } from './HSApp';
import { HSFPConstants } from './HSFPConstants';

/**
 * 3D position coordinates
 */
export interface Position3D {
  x: number;
  y: number;
  z: number;
}

/**
 * 3D rotation angles in radians
 */
export interface Rotation3D {
  x: number;
  y: number;
  z: number;
}

/**
 * 3D scale factors
 */
export interface Scale3D {
  XScale: number;
  YScale: number;
  ZScale: number;
}

/**
 * Specification for adding content to the scene
 */
export interface ContentSpec {
  /** The content instance to be added */
  content: HSCore.Model.Content;
  /** Host entity (e.g., wall, face) that the content is attached to */
  host?: HSCore.Model.Entity;
  /** Parent container (typically a layer) */
  parent: HSCore.Model.Layer | HSCore.Scene;
}

/**
 * Extra data for parametric model initialization
 */
export interface ParametricExtraData {
  /** Distance from the wall for positioning */
  distanceToWall?: number;
  /** Polygon data for parametric roof models */
  pmPolygon?: unknown;
  /** Room height for parametric roof models */
  roomHeight?: number;
  /** IDs of walls linked to the roof */
  linkWallIds?: string[];
  /** Whether this is a replacement operation */
  isReplace?: boolean;
  /** Additional stair-specific parameters */
  [key: string]: unknown;
}

/**
 * Request command for creating and adding content to the scene.
 * Supports various content types including doors, windows, furniture, parametric models, etc.
 */
export default class AddContentRequest extends HSCore.Transaction.Request {
  /**
   * Mapping of content types to their corresponding model class names
   */
  private static readonly _CONTENT_CLASSNAME_BY_CONTENT_TYPE: ReadonlyArray<
    readonly [HSCatalog.ContentTypeEnum, string]
  >;

  /** Content metadata */
  private readonly _meta: HSCatalog.ContentMeta;
  
  /** 3D position */
  private readonly _position: Position3D;
  
  /** Rotation (single angle or 3D rotation) */
  private readonly _rotation: number | Rotation3D;
  
  /** Scale factors */
  private readonly _scale?: Scale3D;
  
  /** Host entity */
  private readonly _host?: HSCore.Model.Entity;
  
  /** Flip state */
  private readonly _flip: number;
  
  /** Material assignments by component name */
  private readonly _materialMap: Map<string, HSCore.Material>;
  
  /** Layer to add content to */
  private readonly _layer: HSCore.Model.Layer;
  
  /** Content specification */
  private _spec?: ContentSpec;
  
  /** Snapshot data for undo/redo */
  private readonly _addedContentData: Record<string, unknown>;
  
  /** Extra data for parametric models */
  private readonly _extraData?: ParametricExtraData;
  
  /** The created content instance */
  public content?: HSCore.Model.Content;

  /**
   * Creates a new add content request
   * 
   * @param meta - Content metadata defining the type and properties
   * @param position - Initial 3D position (optional, defaults to origin with default height)
   * @param rotation - Initial rotation angle or 3D rotation (optional, defaults to 0)
   * @param scale - Scale factors (optional)
   * @param host - Host entity to attach to (optional)
   * @param flip - Flip state (optional, defaults to 0)
   * @param materialMap - Material assignments (optional, empty map by default)
   * @param layer - Target layer (optional, defaults to active layer)
   * @param extraData - Extra data for parametric models (optional)
   */
  constructor(
    meta: HSCatalog.ContentMeta,
    position?: Position3D,
    rotation?: number | Rotation3D,
    scale?: Scale3D,
    host?: HSCore.Model.Entity,
    flip?: number,
    materialMap?: Map<string, HSCore.Material>,
    layer?: HSCore.Model.Layer,
    extraData?: ParametricExtraData
  );

  /**
   * Executes the command by creating and adding the content
   * @returns The created content instance
   */
  onCommit(): HSCore.Model.Content;

  /**
   * Creates the content instance based on metadata and configuration
   * @returns The created content instance
   */
  createContent(): HSCore.Model.Content;

  /**
   * Initializes a parametric background wall asynchronously
   * 
   * @param content - The background wall content to initialize
   * @param meta - Content metadata
   */
  initBackgroundWallAsync(
    content: HSCore.Model.NCustomizedParametricBackgroundWall | HSCore.Model.NCPBackgroundWallUnit,
    meta: HSCatalog.ContentMeta
  ): Promise<void>;

  /**
   * Initializes a parametric ceiling asynchronously
   * 
   * @param content - The ceiling content to initialize
   * @param meta - Content metadata
   */
  initParametricCeilingAsync(
    content: HSCore.Model.NCustomizedParametricCeiling,
    meta: HSCatalog.ContentMeta
  ): Promise<void>;

  /**
   * Initializes a parametric roof asynchronously
   * 
   * @param content - The roof content to initialize
   * @param meta - Content metadata
   */
  initParametricRoofAsync(
    content: HSCore.Model.NCustomizedParametricRoof,
    meta: HSCatalog.ContentMeta
  ): Promise<void>;

  /**
   * Initializes parametric stairs asynchronously
   * 
   * @param content - The stairs content to initialize
   * @param meta - Content metadata
   */
  initParametricStairAsync(
    content: HSCore.Model.NCustomizedParametricStairs,
    meta: HSCatalog.ContentMeta
  ): Promise<void>;

  /**
   * Initializes generic parametric content (curtains, bathroom cabinets, etc.) asynchronously
   * 
   * @param content - The parametric content to initialize
   * @param meta - Content metadata
   */
  initParametricContentAsync(
    content: HSCore.Model.ParametricContent,
    meta: HSCatalog.ContentMeta
  ): Promise<void>;

  /**
   * Pre-fetches dependent metadata required for content initialization
   * 
   * @param meta - Content metadata
   */
  preFetchDependentMeta(meta: HSCatalog.ContentMeta): Promise<void>;

  /**
   * Undoes the add operation by removing the content
   */
  onUndo(): void;

  /**
   * Redoes the add operation by re-adding the content
   */
  onRedo(): void;

  /**
   * Gets the current content specification
   * @returns Content specification with current parent and host
   */
  private _getContentSpec(): ContentSpec;

  /**
   * Determines the appropriate content class based on content type
   * 
   * @param meta - Content metadata
   * @returns The model class constructor
   */
  private _getContentClass(meta: HSCatalog.ContentMeta): typeof HSCore.Model.Content;

  /**
   * Gets the composition specification for serialization
   * @returns Array of constructor parameters
   */
  getComposeSpec(): [
    HSCatalog.ContentMeta,
    Position3D,
    number | Rotation3D,
    Scale3D | undefined,
    HSCore.Model.Entity | undefined,
    number
  ];
}