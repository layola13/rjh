/**
 * CustomizedModelMolding Module
 * 
 * Provides classes for handling customized model molding operations,
 * including serialization/deserialization and molding parameter management.
 */

import { Molding, Molding_IO } from './Molding';
import { Entity } from './Entity';
import { Signal } from './Signal';

/**
 * Material data structure from HSCore.Material namespace
 */
declare namespace HSCore.Material {
  class MaterialData {
    id: string;
    static dumpMaterialData(data: MaterialData, context: DumpContext): void;
    static loadFromDumpById(id: string, context: LoadContext): MaterialData;
    static create(data: unknown): MaterialData;
    toJson(): Record<string, unknown>;
  }
}

/**
 * Content type from HSCatalog namespace
 */
declare namespace HSCatalog {
  class ContentType {
    constructor(types: string | string[]);
    _types?: string[];
  }
}

/**
 * WebCAD Model API operations
 */
declare namespace WebCADModelAPI {
  interface MoldingAddResult {
    moldingId: string;
    isValid: boolean;
    webCADDocument: unknown;
    relativeIndices?: number[];
  }

  function addMoldingV2(
    document: unknown,
    pathData: PathData,
    profileData: ProfileFullData,
    options: MoldingOptions
  ): MoldingAddResult;

  function getMoldingMaterialData(document: unknown, moldingId: string): unknown;
  function editMolding(
    document: unknown,
    moldingId: string,
    profileData: ProfileFullData,
    flip: boolean,
    flipVertical: boolean
  ): unknown;
  function updateGraphicsDataByChild(
    document: unknown,
    graphicsData: GraphicsData,
    moldingId: string
  ): void;
  function getMoldingParameters(document: unknown, moldingId: string): Record<string, unknown>;
}

/**
 * THREE.js Vector3
 */
declare namespace THREE {
  class Vector3 {
    x: number;
    y: number;
    z: number;
    constructor(x: number, y: number, z: number);
  }
}

/**
 * Context for dump operations
 */
interface DumpContext {
  [key: string]: unknown;
}

/**
 * Context for load operations with product mapping
 */
interface LoadContext {
  productsMap?: Map<string, ProfileMetadata>;
  [key: string]: unknown;
}

/**
 * Path data for molding operations
 */
interface PathData {
  path: unknown;
  wholePath: unknown;
}

/**
 * Molding options configuration
 */
interface MoldingOptions {
  moldingId?: string;
  validateNormal?: THREE.Vector3 | { x: number; y: number; z: number };
  validateNormals?: Array<THREE.Vector3 | { x: number; y: number; z: number } | null>;
  relativeIndices?: number[];
  [key: string]: unknown;
}

/**
 * Molding parameters structure
 */
interface MoldingParameters {
  path?: unknown;
  wholePath?: unknown;
  profileWidth?: number;
  profileHeight?: number;
  offsetX?: number;
  offsetY?: number;
  flip?: boolean;
  flipVertical?: boolean;
  flipHorizontal?: boolean;
  materialData?: HSCore.Material.MaterialData;
  keepProfileCordinate?: boolean;
  considerYRayNegate?: boolean;
  options?: MoldingOptions;
  [key: string]: unknown;
}

/**
 * Profile metadata structure
 */
interface ProfileMetadata {
  id?: string;
  contentType?: HSCatalog.ContentType | { _types?: string[] };
  offsetX?: number;
  offsetY?: number;
  normalTexture?: unknown;
  toJSON?(): Record<string, unknown>;
  [key: string]: unknown;
}

/**
 * Full profile data including metadata and material
 */
interface ProfileFullData {
  data: Record<string, unknown>;
  flipHorizontal: boolean;
  flipVertical: boolean;
  flip: boolean;
  materialData: Record<string, unknown> | HSCore.Material.MaterialData;
  normalTexture?: unknown;
  keepProfileCordinate: boolean;
}

/**
 * Sketch model data reference
 */
interface SketchModelData {
  documentId: string;
  [key: string]: unknown;
}

/**
 * Face data with optional sketch model reference
 */
interface FaceData {
  sketchModelData?: SketchModelData;
  [key: string]: unknown;
}

/**
 * Graphics data collection
 */
interface GraphicsData {
  faces: Map<number, FaceData>;
  edges: Map<number, unknown>;
  contents: Map<number, unknown>;
}

/**
 * Serialized molding record structure
 */
interface MoldingRecord {
  parameters?: string;
  profileId?: string;
  metadata?: string;
  [key: string]: unknown;
}

/**
 * Parsed profile metadata result
 */
interface ParsedProfileData {
  profileMeta: ProfileMetadata;
  profileParameters: Partial<MoldingParameters>;
}

/**
 * Initialization metadata for molding
 */
interface MoldingInitMetadata {
  path: unknown;
  wholePath: unknown;
  profile: ProfileMetadata & Partial<MoldingParameters>;
  flip?: boolean;
  flipVertical?: boolean;
  flipHorizontal?: boolean;
  materialData?: HSCore.Material.MaterialData | Record<string, unknown>;
  options?: MoldingOptions;
}

/**
 * I/O handler for CustomizedModelMolding serialization and deserialization
 */
export class CustomizedModelMolding_IO extends Molding_IO {
  /**
   * Serialize molding instance to storable format
   * 
   * @param molding - The molding instance to dump
   * @param callback - Optional callback for post-processing
   * @param includeMetadata - Whether to include metadata (default: true)
   * @param context - Additional context for dump operation
   * @returns Array of serialized records
   */
  dump(
    molding: CustomizedModelMolding,
    callback?: (records: unknown[], molding: CustomizedModelMolding) => void,
    includeMetadata?: boolean,
    context?: DumpContext
  ): unknown[];

  /**
   * Deserialize molding instance from stored format
   * 
   * @param molding - The target molding instance
   * @param record - The serialized record
   * @param context - Additional context including product map
   */
  load(molding: CustomizedModelMolding, record: MoldingRecord, context?: LoadContext): void;
}

/**
 * Customized model molding entity
 * 
 * Represents a molding applied to a customized model with configurable
 * parameters, material data, and WebCAD document integration.
 */
export class CustomizedModelMolding extends Molding {
  private _parameters: MoldingParameters;

  /**
   * Signal dispatched when material changes
   */
  readonly signalMaterialChanged: Signal<unknown>;

  /**
   * Signal dispatched when WebCAD document changes
   */
  readonly signalWebCADDocChanged: Signal<unknown>;

  /**
   * Create a new CustomizedModelMolding instance
   * 
   * @param tag - Identifier tag (default: empty string)
   * @param parent - Optional parent entity
   */
  constructor(tag?: string, parent?: unknown);

  /**
   * Get molding parameters
   */
  get parameters(): MoldingParameters;

  /**
   * Set molding parameters
   */
  set parameters(value: MoldingParameters);

  /**
   * Get the path data
   */
  get path(): unknown;

  /**
   * Get the whole path data
   */
  get wholePath(): unknown;

  /**
   * Get molding options
   */
  get options(): MoldingOptions;

  /**
   * Get the unique molding identifier
   */
  get moldingId(): string;

  /**
   * Get profile width (default: 0)
   */
  get profileWidth(): number;

  /**
   * Get profile height (default: 0)
   */
  get profileHeight(): number;

  /**
   * Get X-axis offset (default: 0)
   */
  get offsetX(): number;

  /**
   * Get Y-axis offset (default: 0)
   */
  get offsetY(): number;

  /**
   * Check if molding is flipped
   */
  get flip(): boolean;

  /**
   * Check if molding is vertically flipped
   */
  get flipVertical(): boolean;

  /**
   * Check if molding is horizontally flipped
   */
  get flipHorizontal(): boolean;

  /**
   * Get material data
   */
  get materialData(): HSCore.Material.MaterialData | undefined;

  /**
   * Set material data
   */
  set materialData(value: HSCore.Material.MaterialData | Record<string, unknown>);

  /**
   * Check if profile coordinate system is preserved
   */
  get keepProfileCordinate(): boolean;

  /**
   * Get the I/O handler instance
   */
  getIO(): CustomizedModelMolding_IO;

  /**
   * Construct metadata for molding initialization
   * 
   * @param path - Path data
   * @param wholePath - Complete path data
   * @param profile - Profile metadata with parameters
   * @param flip - Flip flag
   * @param flipVertical - Vertical flip flag
   * @param keepCoordinate - Keep profile coordinate flag (default: true)
   * @param moldingId - Molding identifier (default: empty)
   * @param options - Additional options (default: empty object)
   * @returns Constructed metadata object
   */
  static constructMetaData(
    path: unknown,
    wholePath: unknown,
    profile: ProfileMetadata & Partial<MoldingParameters>,
    flip: boolean,
    flipVertical: boolean,
    keepCoordinate?: boolean,
    moldingId?: string,
    options?: MoldingOptions
  ): MoldingInitMetadata;

  /**
   * Initialize molding from metadata
   * 
   * @param metadata - Initialization metadata
   */
  initByMeta(metadata: MoldingInitMetadata): void;

  /**
   * Get metadata filter keys (returns null - no filtering)
   */
  getMetadataFilterKeys(): null;

  /**
   * Parse profile metadata into separate meta and parameters
   * 
   * @param profile - Raw profile data
   * @returns Parsed profile metadata and parameters
   */
  private _parseProfileMetaData(profile: ProfileMetadata & Partial<MoldingParameters>): ParsedProfileData;

  /**
   * Get complete profile data including metadata and material
   * 
   * @returns Full profile data structure
   */
  getProfileFullData(): ProfileFullData;

  /**
   * Mark geometry as dirty (needs regeneration)
   */
  dirtyGeometry(): void;

  /**
   * Mark material as dirty and dispatch signal
   * 
   * @param data - Material data
   */
  dirtyMaterial(data: unknown): void;

  /**
   * Extract graphics data from parent entity
   * 
   * @param parentData - Parent's graphics data
   * @param targetData - Target data collection
   */
  private _getGraphicsDataFromParent(parentData: GraphicsData, targetData: GraphicsData): void;

  /**
   * Get graphics data synchronously
   * 
   * @returns Graphics data collection
   */
  getGraphicsData(): GraphicsData;

  /**
   * Get graphics data asynchronously
   * 
   * @returns Promise resolving to graphics data collection
   */
  getGraphicsDataAsync(): Promise<GraphicsData>;

  /**
   * Apply molding to a customized model
   * 
   * @param model - Target customized model
   * @returns True if successfully applied, false otherwise
   */
  applyToCustomizedModel(model: { webCADDocument: unknown; setWebCADDocumentQuietly(doc: unknown): void }): boolean;

  /**
   * Get material data from WebCAD document
   * 
   * @returns Material data or undefined
   */
  getMaterialData(): HSCore.Material.MaterialData | undefined;

  /**
   * Update molding metadata and regenerate geometry
   * 
   * @param metadata - New initialization metadata
   */
  updateMetadata(metadata: MoldingInitMetadata): void;

  /**
   * Get molding parameters from WebCAD document
   * 
   * @returns Parameters object
   */
  getParameters(): Record<string, unknown>;

  /**
   * Check if content entity is within this molding's loop
   * 
   * @param content - Content entity to check
   * @param strict - Use strict containment check (default: false)
   * @returns True if content is in loop
   */
  isContentInLoop(content: unknown, strict?: boolean): boolean;

  /**
   * Check if field transactions are allowed
   * 
   * @returns Always false for molding entities
   */
  canTransactField(): boolean;
}

/**
 * Register CustomizedModelMolding class with entity system
 */
declare module './Entity' {
  namespace Entity {
    function registerClass(modelClass: string, constructor: typeof CustomizedModelMolding): void;
  }
}