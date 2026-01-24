/**
 * Design information context module
 * Provides access to design entities, floor plan data, and customization models
 */

/**
 * BOM (Bill of Materials) data interface
 * Represents the source data structure containing business entities
 */
export interface BomData {
  /**
   * Retrieves business entities filtered by type
   * @param filter - Filter criteria containing entity type
   * @returns Array of business entities matching the filter
   */
  getBusinessEntities(filter: { type: string }): BusinessEntity[];
}

/**
 * Generic business entity interface
 * Base type for all design elements in the BOM system
 */
export interface BusinessEntity {
  /** Unique identifier for the entity */
  id: string;
  /** Entity type classification */
  type: string;
  /** Associated entity instance with parameters */
  instance?: EntityInstance;
}

/**
 * Entity instance interface
 * Provides access to entity-specific parameter values
 */
export interface EntityInstance {
  /**
   * Gets a parameter value by name
   * @param parameterName - Name of the parameter to retrieve
   * @returns The parameter value (type varies by parameter)
   */
  getParameterValue(parameterName: string): unknown;
}

/**
 * Room entity interface
 * Represents a physical room in the floor plan
 */
export interface Room extends BusinessEntity {
  type: 'Room';
}

/**
 * Wall entity interface
 * Represents a wall structure in the floor plan
 */
export interface Wall extends BusinessEntity {
  type: 'Wall';
}

/**
 * Layer entity interface
 * Represents a design layer grouping related elements
 */
export interface Layer extends BusinessEntity {
  type: 'Layer';
}

/**
 * Face entity interface
 * Represents a surface face of a room
 */
export interface Face extends BusinessEntity {
  type: 'Face';
}

/**
 * Content entity interface
 * Represents furniture or decorative content
 */
export interface Content extends BusinessEntity {
  type: 'Content';
  contentType?: string;
}

/**
 * Opening entity interface
 * Represents doors, windows, or other wall openings
 */
export interface Opening extends BusinessEntity {
  type: 'Opening' | 'ParametricWindow' | 'ParametricOpening';
}

/**
 * Molding entity interface
 * Represents decorative molding elements
 */
export interface Molding extends BusinessEntity {
  type: 'NormalMolding';
}

/**
 * Baseboard entity interface
 * Represents baseboard trim along walls
 */
export interface Baseboard extends BusinessEntity {
  type: 'Baseboard';
}

/**
 * Cornice entity interface
 * Represents ceiling cornice trim
 */
export interface Cornice extends BusinessEntity {
  type: 'Cornice';
}

/**
 * Pave entity interface
 * Represents floor or surface paving
 */
export interface Pave extends BusinessEntity {
  type: 'Pave';
}

/**
 * Customized background wall entity interface
 */
export interface CustomizedBackgroundWall extends BusinessEntity {
  type: 'CustomizedBackgroundWall';
}

/**
 * Customized ceiling entity interface
 */
export interface CustomizedCeiling extends BusinessEntity {
  type: 'CustomizedCeiling';
}

/**
 * Customized platform entity interface
 */
export interface CustomizedPlatform extends BusinessEntity {
  type: 'CustomizedPlatform';
}

/**
 * Design entity interface
 * Root design information container
 */
export interface Design extends BusinessEntity {
  type: 'Design';
}

/**
 * Main design information context class
 * Centralizes access to all design entities and provides organized data structures
 * for floor plans, customizations, and decorative elements
 */
export declare class DesignInfoContext {
  /**
   * Creates a new design information context
   * @param bomData - Bill of Materials data source
   */
  constructor(bomData: BomData);

  /** BOM data source */
  readonly bomData: BomData;

  /** Database API for querying entities */
  dbApi?: unknown;

  /** All layer entities in the design */
  layers?: Layer[];

  /** All pave (flooring) entities */
  paves?: Pave[];

  /** All room entities */
  rooms?: Room[];

  /** All wall entities */
  walls?: Wall[];

  /** Rooms grouped by layer ID */
  layerRooms?: Record<string, Room[]>;

  /** Faces grouped by room ID */
  roomFaces?: Record<string, Face[]>;

  /** All content entities (excluding customized furniture) */
  contents?: Content[];

  /** All opening entities (doors, windows) */
  openings?: Opening[];

  /** Customized background wall entities */
  customizedBackgroundWall?: CustomizedBackgroundWall[];

  /** Customized ceiling entities */
  customizedCeiling?: CustomizedCeiling[];

  /** Customized platform entities */
  customizedPlatform?: CustomizedPlatform[];

  /** All customization model entities */
  customizedEntities?: BusinessEntity[];

  /** Parametric model customization entities */
  customizedPMEntities?: BusinessEntity[];

  /** General customization entities */
  customizationEntities?: BusinessEntity[];

  /** Molding decorative elements */
  moldings?: Molding[];

  /** Cornice trim elements */
  cornices?: Cornice[];

  /** Baseboard trim elements */
  baseboards?: Baseboard[];

  /** Root design entity */
  designEntity?: Design;

  /**
   * Initializes the context by loading and organizing all design data
   * @private
   */
  private init(): void;

  /**
   * Retrieves and stores root design information
   * @private
   */
  private getDesignInfo(): void;

  /**
   * Retrieves and organizes all floor plan related entities
   * Populates rooms, walls, layers, contents, openings, and decorative elements
   * @private
   */
  private getFloorPlanBusinessEntities(): void;

  /**
   * Retrieves pave (flooring) entities from BOM data
   * @private
   */
  private getPaveBusinessEntities(): void;
}

/**
 * Helper function to extract layer ID from entity
 * @param entity - Business entity with layer ID parameter
 * @returns Layer ID value
 */
declare function getLayerId(entity: BusinessEntity): string;

/**
 * Helper function to extract room ID from entity
 * @param entity - Business entity with room ID parameter
 * @returns Room ID value
 */
declare function getRoomId(entity: BusinessEntity): string;