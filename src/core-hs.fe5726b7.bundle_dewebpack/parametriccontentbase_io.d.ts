/**
 * Represents size information for parametric content
 */
export interface SizeInfo {
  /** Width in millimeters */
  W: number;
  /** Depth in millimeters */
  D: number;
  /** Height in millimeters */
  H: number;
}

/**
 * Options for opening a parametric document
 */
export interface OpenDocumentExtra {
  /** Size information in millimeters */
  wdh?: SizeInfo;
  /** Unit scale factor (default: 0.001 for mm to m conversion) */
  unitScale: number;
  /** Whether to skip position calculation */
  dontCalcPosition: boolean;
  /** Calculate position using width/depth/height */
  calcPosWithWDH: boolean;
  /** Use min/max size constraints */
  useMinMax: boolean;
  /** Optional parameter tree */
  paramTree?: unknown;
}

/**
 * Instance data for subparts
 */
export interface SubpartInstance {
  /** Entity identifier */
  eId: string;
  /** Seek identifier for the product */
  seekId: string;
  /** Visibility flag */
  visible: boolean;
}

/**
 * Content instance data
 */
export interface ContentInstance {
  /** Entity identifier */
  eId: string;
  /** Seek identifier for the product */
  seekId: string;
  /** Visibility flag */
  visible: boolean;
}

/**
 * Array element data with transformation
 */
export interface ArrayElement {
  /** Source entity identifier */
  srcId: string;
  /** Entity identifier */
  eId: string;
  /** Transformation matrices */
  matrix: unknown[];
  /** Last transformation info */
  last?: { matrix: unknown; plane?: unknown };
  /** Visibility flag */
  visible: boolean;
}

/**
 * Data model containing instances and arrays
 */
export interface DataModel {
  /** Subpart instances */
  instances: SubpartInstance[];
  /** Content instances */
  contents: ContentInstance[];
  /** Array elements */
  array: ArrayElement[];
}

/**
 * Model data with optional parameters
 */
export interface ModelData {
  /** System parameters including dimensions */
  systemParams?: {
    W: number;
    D: number;
    H: number;
  };
  /** Metadata information */
  meta?: unknown;
  /** Property panel data */
  propertyPanelData?: unknown;
}

/**
 * Graphics data organized by type
 */
export interface GraphicsData {
  /** Face graphics mapped by identifier */
  faces: Map<unknown, unknown>;
  /** Edge graphics mapped by identifier */
  edges: Map<unknown, unknown>;
  /** Content graphics mapped by identifier */
  contents: Map<unknown, unknown>;
}

/**
 * Projection result with paths and contours
 */
export interface ProjectionResult {
  /** Projection paths */
  projections: Array<{
    paths: Array<{
      paths: number[][][];
    }>;
    distanceWithDirection?: number;
    distance?: number;
  }>;
  /** Unioned projection paths */
  unioned?: number[][][];
  /** Calculated contours */
  contours?: unknown;
}

/**
 * I/O handler for ParametricContentBase serialization/deserialization
 */
export declare class ParametricContentBase_IO extends NCustomizedParametricModel_IO {
  /**
   * Dumps the model to a serializable format
   * @param entity - The entity to dump
   * @param metadata - Optional metadata
   * @param options - Dump options
   * @param context - Dump context
   * @returns Serialized data array
   */
  dump(
    entity: ParametricContentBase,
    metadata: unknown,
    options: unknown,
    context: unknown
  ): Array<{ useMinMax: boolean }>;

  /**
   * Loads the model from serialized data
   * @param entity - The entity to load into
   * @param data - Serialized data
   * @param options - Load options
   */
  load(
    entity: ParametricContentBase,
    data: {
      parameters?: { propertymp?: unknown };
      useMinMax?: boolean;
    },
    options?: Record<string, unknown>
  ): void;
}

/**
 * Base class for parametric content models with dynamic geometry
 */
export declare class ParametricContentBase extends NCustomizedParametricModel {
  /** Identifiers of dependent entities */
  dependentSeekIds: string[];
  
  /** Property record for parameters */
  propertyRecord: unknown;
  
  /** Size information in millimeters */
  sizeInfo?: SizeInfo;
  
  /** Whether to use min/max size constraints */
  useMinMax: boolean;
  
  /** 2D outline points */
  outline?: Vector2[];

  /**
   * Creates a new parametric content base instance
   * @param id - Optional entity identifier
   * @param metadata - Optional metadata
   */
  constructor(id?: string, metadata?: unknown);

  /**
   * Initializes the model from metadata
   * @param metadata - Product metadata
   * @param options - Optional initialization options
   * @param useCache - Whether to use cached data
   */
  initByMeta(metadata: unknown, options?: unknown, useCache?: boolean): void;

  /**
   * Initializes parametric content with document
   * @param sizeInfo - Size information
   * @param skipGeneration - Whether to skip child generation
   * @param usePropertyRecord - Whether to use property record
   * @param paramTree - Optional parameter tree
   */
  initParametricContentDocument(
    sizeInfo: SizeInfo,
    skipGeneration: boolean,
    usePropertyRecord: boolean,
    paramTree?: unknown
  ): void;

  /**
   * Opens the parametric document
   * @param sizeInfo - Size information
   * @param usePropertyRecord - Whether to use property record
   * @param paramTree - Optional parameter tree
   */
  openDocument(
    sizeInfo?: SizeInfo,
    usePropertyRecord?: boolean,
    paramTree?: unknown
  ): void;

  /**
   * Initializes model by size properties
   */
  initBySize(): void;

  /**
   * Initializes parametric content
   * @param skipGeneration - Whether to skip child generation
   * @param usePropertyRecord - Whether to use property record
   */
  initParametricContent(skipGeneration: boolean, usePropertyRecord: boolean): void;

  /**
   * Initializes the model document
   * @param modelData - Model data
   * @param skipGeneration - Whether to skip child generation
   * @param usePropertyRecord - Whether to use property record
   */
  initModelDocument(
    modelData: unknown,
    skipGeneration: boolean,
    usePropertyRecord: boolean
  ): void;

  /**
   * Gets the document file path
   * @returns Document file path or undefined
   */
  getDocFile(): string | undefined;

  /**
   * Generates child entities
   * @param modelData - Model data containing children info
   * @param usePropertyRecord - Whether to use property record
   */
  generateChildren(modelData: { dataModel: DataModel }, usePropertyRecord: boolean): void;

  /**
   * Generates subpart entities
   * @param modelData - Model data
   * @param usePropertyRecord - Whether to use property record
   */
  generateSubpart(modelData: { dataModel: DataModel; hideFaces?: unknown }, usePropertyRecord: boolean): void;

  /**
   * Generates content entities
   * @param modelData - Model data
   */
  generateContent(modelData: { dataModel: DataModel }): void;

  /**
   * Generates array entities
   * @param modelData - Model data
   */
  generateArray(modelData: { dataModel: DataModel }): void;

  /**
   * Generates content array with transformations
   * @param arrayElements - Array element data
   * @returns Processed array elements
   */
  generateContentArray(arrayElements: ArrayElement[]): ArrayElement[];

  /**
   * Gets a child entity by entity ID
   * @param entityId - Entity identifier
   * @returns Child entity or undefined
   */
  getChildByEId(entityId: string): unknown;

  /**
   * Gets top projection by entity ID
   * @param entityId - Entity identifier
   * @returns Projection result or undefined
   */
  getTopProjectionByEId(entityId: string): ProjectionResult | undefined;

  /**
   * Gets front projection by entity ID
   * @param entityId - Entity identifier
   * @returns Projection result or undefined
   */
  getFrontProjectionByEId(entityId: string): ProjectionResult | undefined;

  /**
   * Gets BREP graphics data by entity ID
   * @param entityId - Entity identifier
   * @returns Graphics data or undefined
   */
  getBrepGraphicsDataByEId(entityId: string): GraphicsData | undefined;

  /**
   * Gets BREP part by entity ID
   * @param entityId - Entity identifier
   * @returns BREP part or undefined
   */
  getBrepPartByEId(entityId: string): unknown;

  /**
   * Gets extra parameters for opening document
   * @param sizeInfo - Size information
   * @param usePropertyRecord - Whether to use property record
   * @returns Extra parameters object
   */
  getOpenDocumentExtra(sizeInfo: SizeInfo, usePropertyRecord: boolean): OpenDocumentExtra;

  /**
   * Gets model data with parameters
   * @param parameters - Parameter map
   * @param usePropertyRecord - Whether to use property record
   * @returns Model data
   */
  getModelData(parameters: Record<string, unknown>, usePropertyRecord?: boolean): ModelData;

  /**
   * Gets SDK data for the model
   * @param seekId - Seek identifier
   * @param modelId - Model identifier
   * @param parameters - Parameters
   * @param usePropertyRecord - Whether to use property record
   * @returns Model data
   */
  getSDKData(
    seekId: string,
    modelId: string,
    parameters: Record<string, unknown>,
    usePropertyRecord?: boolean
  ): ModelData;

  /**
   * Updates model from data
   * @param modelData - Model data
   * @param skipSizeUpdate - Whether to skip size update
   */
  updateModelFromData(modelData: ModelData, skipSizeUpdate: boolean): void;

  /**
   * Generates property panel data
   * @param propertyMap - Property map
   * @returns Property panel data or undefined
   */
  generatePropertyPanelDatas(propertyMap: unknown): unknown;

  /**
   * Refreshes internal bounding box
   */
  refreshBoundInternal(): void;

  /**
   * Gets entire bound vertices
   * @returns Array of 2D vertices
   */
  getEntireBoundVertexes(): Vector2[];

  /**
   * Transforms top projection distances
   * @param projections - Projection results
   */
  transformTopDistance(projections: ProjectionResult['projections']): void;

  /**
   * Transforms front projection distances
   * @param projections - Projection results
   */
  transformFrontDistance(projections: ProjectionResult['projections']): void;

  /**
   * Gets NCP top transformation matrix
   * @param entity - Entity to transform
   * @param matrix - Matrix to update
   */
  getNCPTopMatrix(entity: ParametricContentBase, matrix: Matrix4): void;

  /**
   * Gets face plane projection
   * @param face - Face identifier
   * @param projectionType - Type of projection
   * @returns Projection result or undefined
   */
  getFacePlaneProject(face: unknown, projectionType: unknown): ProjectionResult | undefined;

  /**
   * Mirrors the entity
   * @param mirrorOptions - Mirror configuration
   */
  mirror(mirrorOptions: { type: unknown; matrix4: Matrix4 }): void;

  /**
   * Marks child models as dirty
   * @param dirtyGeometry - Whether to dirty geometry
   * @param dirtyMaterial - Whether to dirty materials
   */
  dirtyChildModels(dirtyGeometry?: boolean, dirtyMaterial?: boolean): void;

  /**
   * Gets all molding entities recursively
   * @returns Array of molding entities
   */
  getDeepMoldingEntities(): unknown[];

  /**
   * Gets all light band entities recursively
   * @returns Array of light band entities
   */
  getDeepLightBandEntities(): unknown[];

  /**
   * Gets light band bottom projections
   * @returns Array of projection results
   */
  getLightBandBottomProjection(): ProjectionResult[];

  /**
   * Gets all light slot entities recursively
   * @returns Array of light slot entities
   */
  getDeepLightSlotEntities(): unknown[];

  /**
   * Gets all content entities recursively
   * @returns Array of content entities
   */
  getDeepContents(): unknown[];

  /**
   * Gets the I/O handler instance
   * @returns I/O handler
   */
  getIO(): ParametricContentBase_IO;
}