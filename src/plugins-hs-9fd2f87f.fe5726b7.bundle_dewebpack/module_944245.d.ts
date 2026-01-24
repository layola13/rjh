/**
 * Design editing plugin API module
 * Manages design metadata, project data, and various design operations
 */

/**
 * Design metadata attributes
 */
interface DesignAttributes {
  /** ACS (Autodesk Construction Solutions) asset identifier */
  acs_asset_id?: string;
  /** ACS project identifier */
  acs_project_id?: string;
  /** Template identifier if design is based on a template */
  templateId?: string;
  [key: string]: unknown;
}

/**
 * Address information for a design
 */
interface AddressData {
  [key: string]: unknown;
}

/**
 * Provincial/City/District geographical data
 */
interface PCDData {
  [key: string]: unknown;
}

/**
 * Design style item
 */
interface StyleItem {
  /** Style code identifier */
  code: string;
  /** Style name */
  name?: string;
  [key: string]: unknown;
}

/**
 * Design style data collection
 */
interface StyleData {
  [key: string]: unknown;
}

/**
 * Temporary design data structure
 */
interface TempDesign {
  /** Design type: 2 for regular user, 4 for template user */
  designType?: number;
  [key: string]: unknown;
}

/**
 * Project data array
 */
type ProjectData = unknown[];

/**
 * API response structure for design update
 */
interface DesignUpdateResponse {
  /** Error message if update fails */
  erMessage?: string;
  [key: string]: unknown;
}

/**
 * MTOP response structure
 */
interface MtopResponse<T> {
  /** Response status array */
  ret: string[];
  /** Response data */
  data: T;
}

/**
 * Design styles response data
 */
interface DesignStylesData {
  /** Array of style items */
  items: StyleItem[];
}

/**
 * Error logging information
 */
interface ErrorInfo {
  /** Additional error information */
  info: unknown;
  /** Error source location */
  path: {
    /** Source file path */
    file: string;
    /** Function name where error occurred */
    functionName: string;
  };
}

/**
 * Design editor plugin API module
 * Provides functionality for managing design metadata, saving changes,
 * loading geographical and style data, and handling design permissions
 */
declare module EditDesignPlugin {
  /**
   * Logger instance for the edit design plugin
   */
  export const logger: unknown;

  /**
   * Temporary design data storage
   */
  export const tempDesign: TempDesign;

  /**
   * Project data collection
   */
  export const projectData: ProjectData;

  /**
   * Cached style data
   */
  export const styleData: StyleData;

  /**
   * Cached Provincial/City/District geographical data
   */
  export const pcdData: PCDData;

  /**
   * Retrieves the current design metadata
   * @returns Design metadata object from the application
   */
  export function getDesignMeta(): unknown;

  /**
   * Checks if the save operation is a direct re-save of the same design
   * @param designId - The design identifier to check
   * @returns True if the design ID matches the current design metadata ID
   */
  export function isDirectSaveAgain(designId: string): boolean;

  /**
   * Verifies if the current user is the owner of the design
   * @param userId - The user identifier to check ownership against
   * @returns True if user is logged in and matches the design's user ID
   */
  export function isOwner(userId: string): boolean;

  /**
   * Checks if the current design is in read-only mode
   * @returns True if the design is read-only
   */
  export function isReadOnly(): boolean;

  /**
   * Determines if the design has private document status
   * @returns True if document status is Private
   */
  export function isPrivate(): boolean;

  /**
   * Checks if the current user is the template design user
   * @returns True if the user's ADA ID matches the template user configuration
   */
  export function isTemplateDesignUser(): boolean;

  /**
   * Saves design changes to the server
   * @param designId - The design identifier to save. If null, saves to tempDesign only
   * @param designData - The design data to save
   * @returns Promise resolving when save completes or rejecting with error
   */
  export function saveChanges(
    designId: string | null,
    designData: TempDesign
  ): Promise<void>;

  /**
   * Updates the document status in design metadata
   * @param status - The new document status value
   */
  export function setDocumentStatus(status: number): void;

  /**
   * Sends a POST request to save design data
   * @param assetId - The asset identifier for the design
   * @param designData - The design data to save
   * @returns Promise resolving with save response or error message
   */
  export function postSaveDesignRequest(
    assetId: string,
    designData: TempDesign
  ): Promise<DesignUpdateResponse>;

  /**
   * Calculates the total floorplan area
   * @returns The floorplan area value
   */
  export function getfloorplanarea(): number;

  /**
   * Calculates the gross floor area for a floorplan
   * @param floorplan - The floorplan data
   * @returns The gross floor area value
   */
  export function getFloorplanGrossFloorArea(floorplan: unknown): number;

  /**
   * Calculates the gross internal area for a floorplan
   * @param floorplan - The floorplan data
   * @returns The gross internal area value
   */
  export function getFloorplanGrossInternalArea(floorplan: unknown): number;

  /**
   * Retrieves design attributes from metadata
   * @returns Design attributes object or empty object if none exist
   */
  export function getAttributes(): DesignAttributes;

  /**
   * Retrieves address information from design metadata
   * @returns Address data object or empty object if none exists
   */
  export function getAddress(): AddressData;

  /**
   * Gets the ACS asset ID from query string or attributes
   * @returns The ACS asset ID or null if not found
   */
  export function getAcsAssetId(): string | null;

  /**
   * Gets the ACS project ID from attributes or query string
   * @returns The ACS project ID or null if not found
   */
  export function getAcsProjectId(): string | null;

  /**
   * Retrieves the template ID from design attributes
   * @returns The template ID or null if not found
   */
  export function getTemplateId(): string | null;

  /**
   * Loads Provincial/City/District geographical data
   * Returns cached data if already loaded, otherwise fetches from server
   * @returns Promise resolving with PCD data or rejecting with error
   */
  export function loadAddressData(): Promise<PCDData>;

  /**
   * Loads neighborhood data for a specific region
   * @param regionCode - The region code to load neighborhood data for
   * @returns Promise resolving with neighborhood data or rejecting with error
   */
  export function loadNeighborhoodData(regionCode: string): Promise<unknown>;

  /**
   * Loads design style data from the server
   * Returns cached data if already loaded, filters out 'all' style code
   * @returns Promise resolving with style data array or rejecting with error
   */
  export function loadStyleData(): Promise<StyleItem[]>;
}

export = EditDesignPlugin;