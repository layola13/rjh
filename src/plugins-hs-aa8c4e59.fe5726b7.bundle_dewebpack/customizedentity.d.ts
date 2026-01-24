/**
 * Customized entity types for special model categorization
 */
export enum CustomizedModalResultType {
  /** Structure information type */
  StructureInfo = "structure info",
  /** Sketch molding information type */
  SketchMolding = "sketch molding info",
  /** Parametric ceiling information type */
  ParametricCeiling = "parametric ceiling info",
  /** DIY model information type */
  DIYModel = "diy model info"
}

/**
 * Represents a section with two endpoints and height information
 * Used for calculating surface areas of customized models
 */
declare class Section {
  /** Starting point of the section */
  pointA: Vector2;
  
  /** Ending point of the section */
  pointB: Vector2;
  
  /** Array of height values at this section */
  height: number[];

  /**
   * Creates a new section
   * @param pointA - Starting point
   * @param pointB - Ending point
   * @param height - Initial height value
   */
  constructor(pointA: Vector2, pointB: Vector2, height: number);

  /**
   * Checks if another section has the same endpoints
   * @param section - Section to compare
   * @returns True if sections share the same endpoints (in any order)
   */
  isSameSection(section: Section): boolean;

  /**
   * Adds a height value to this section
   * @param height - Height value to add
   */
  insertHeight(height: number): void;

  /**
   * Calculates the area of this section
   * @param hostFaceOutline - Outline of the host face
   * @returns Calculated area
   */
  getArea(hostFaceOutline: Vector2[]): number;

  /**
   * Gets the length of this section
   * @returns Distance between pointA and pointB
   */
  getLength(): number;
}

/**
 * Manages projection data and calculates surface areas for customized models
 */
declare class ProjectionData {
  /** Array of section objects */
  sectionArray: Section[];
  
  /** Outline points of the host face */
  hostFaceOutline: Vector2[];
  
  /** Total horizontal surface area */
  horizontalArea: number;
  
  /** Total vertical surface area */
  verticalArea: number;

  constructor();

  /**
   * Imports section data from face outline and projection information
   * @param faceOutline - Outline points of the face
   * @param projectionData - Projection data containing paths and distances
   */
  importSectionData(faceOutline: Vector2[], projectionData: ProjectionInfo): void;

  /**
   * Calculates total surface area (horizontal + vertical)
   * @returns Total surface area
   */
  calculateSurfaceArea(): number;

  /**
   * Sets the host face outline with coordinate transformation
   * @param outline - Original outline points
   */
  setHostFaceOutline(outline: Vector2[]): void;

  /**
   * Processes projection data to extract sections and calculate horizontal area
   * @param projectionData - Projection data with paths and distances
   */
  setSectionData(projectionData: ProjectionInfo): void;

  /**
   * Adds a section or updates existing matching section
   * @param pointA - Starting point
   * @param pointB - Ending point
   * @param height - Height at this section
   */
  addSection(pointA: Vector2, pointB: Vector2, height: number): void;

  /**
   * Gets the horizontal surface area
   * @returns Horizontal area
   */
  getHorizontalArea(): number;

  /**
   * Calculates and returns the vertical surface area
   * @returns Vertical area
   */
  getVerticalArea(): number;
}

/**
 * Represents a customized entity with specialized geometry and parameters
 * Handles DIY models, sketch moldings, and parametric ceilings
 */
export declare class CustomizedEntity extends AcceptEntity {
  constructor();

  /**
   * Builds child entities including moldings, light slots, light bands, and DIY faces
   * @param content - Content model to extract children from
   */
  buildChildren(content: Content): void;

  /**
   * Builds entity data including type, category, and instance data
   * @param content - Content model to build data from
   */
  buildEntityData(content: Content): void;

  /**
   * Generates instance data with room, layer, and model-specific parameters
   * @param content - Content model
   * @returns Instance data with all parameters
   */
  getInstanceData(content: Content): InstanceData;

  /**
   * Adds basic model parameters including surface area, projection, and host face
   * @param content - Content model
   * @param instanceData - Instance data to add parameters to
   */
  getBasicModelData(content: Content, instanceData: InstanceData): void;

  /**
   * Builds parametric ceiling specific data based on ceiling type
   * @param content - Parametric ceiling content
   * @param instanceData - Instance data to add parameters to
   */
  buildParametricCeilingData(content: Content, instanceData: InstanceData): void;

  /**
   * Builds beam ceiling specific data including beam dimensions and counts
   * @param content - Beam ceiling content
   * @param instanceData - Instance data to add parameters to
   */
  buildBeamCeilingData(content: Content, instanceData: InstanceData): void;

  /**
   * Calculates total projection length from all projection paths
   * @param content - Content model
   * @returns Total projection length
   */
  getTotalProjectionLength(content: Content): number;

  /**
   * Calculates surface area for customized models using projection data
   * @param content - Content model
   * @returns Calculated surface area
   */
  getSurfaceAreaForCustomizedModel(content: Content): number;

  /**
   * Extracts corner radius values from sketch model
   * @param content - Sketch model content
   * @returns Array of corner radius values
   */
  getCornerCountForSketchModel(content: Content): number[];

  /**
   * Gets bottom face IDs from content's bottom projection
   * @param content - Content model
   * @returns Array of bottom face IDs
   */
  getBottomFaces(content: Content): string[];

  /**
   * Calculates default face area from bottom face projection
   * @param content - Content model
   * @returns Default face area
   */
  getDefaultFaceArea(content: Content): number;
}

/**
 * 2D vector with x and y coordinates
 */
interface Vector2 {
  x: number;
  y: number;
  distanceTo(other: Vector2): number;
}

/**
 * Projection information containing paths and area data
 */
interface ProjectionInfo {
  distance: number;
  area: number;
  paths: Array<{
    paths: Array<Array<{ X: number; Y: number }>>;
    graphicsPath?: string;
  }>;
  surfaceArea?: number;
}

/**
 * Content model interface
 */
interface Content {
  id: string;
  parent: { id: string };
  host: Content;
  x: number;
  y: number;
  XLength: number;
  YLength: number;
  ZLength: number;
  XScale: number;
  YScale: number;
  ZScale: number;
  sketch?: any;
  metadata: {
    parameters: Record<string, any>;
  };
  _graphicsData: {
    faces: Map<string, FaceData>;
  };
  instanceOf(className: string): boolean;
  getMoldingEntities(): any[];
  getLightSlotEntities(): any[];
  getLightBandEntities(): any[];
  getFaceMaterial(faceId: string): any;
  getNormalFaceMaterialData(faceId: string): any;
  getGraphicsData(): any;
  getBottomProjection(includeAll: boolean): ProjectionInfo[];
}

/**
 * Face data with mesh key and bounding information
 */
interface FaceData {
  meshKey: string;
  bounding: number[];
  faceNormal: { x: number; y: number; z: number };
}

/**
 * Instance data container with parameters
 */
interface InstanceData {
  addParameter(...params: Parameter[]): void;
}