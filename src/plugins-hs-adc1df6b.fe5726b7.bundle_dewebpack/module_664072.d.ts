/**
 * Design utility functions for managing floorplan designs, templates, and metadata
 */

import { FloorplanDocument, DesignMetadata, Underlay } from './floorplan-types';
import { SaveOptions, SaveRequestData, DesignDetail, UploadResult } from './design-types';
import { AddressData, BasicAttributes, DesignAttributes, StyleData } from './metadata-types';
import { ErrorStatusEnum } from './error-types';

/**
 * Address information for a design
 */
export interface Address {
  /** Neighborhood name */
  neighbor: string;
  /** Province ID */
  provinceId: number;
  /** Province name */
  provinceName: string;
  /** City ID */
  cityId: number;
  /** City name */
  cityName: string;
  /** District ID */
  districtId: number;
  /** District name */
  districtName: string;
}

/**
 * Basic attributes of a floorplan design
 */
export interface BasicAttributes {
  /** Number of bedrooms */
  bedroomNum: number;
  /** Number of living rooms */
  livingroomNum: number;
  /** Number of bathrooms */
  bathroomNum: number;
  /** Design style information */
  style: {
    /** Style code */
    code: string;
    /** Localized style name */
    name: string;
  };
  /** Total area of the floorplan */
  area: number;
  /** Gross floor area */
  grossFloorArea: number;
  /** Gross internal area */
  grossInternalArea: number;
}

/**
 * Options for saving a design
 */
export interface SaveOptions {
  /** Whether to save as a new design */
  isSaveas?: boolean;
  /** Whether this is an auto-create operation */
  isAutoCreate?: boolean;
  /** Whether to include underlay image */
  needUnderlay?: boolean;
  /** 2D thumbnail image data URL */
  image2D?: string;
}

/**
 * Design save request data
 */
export interface SaveRequestData {
  /** Design ID (for updates) */
  designId?: string;
  /** Last design ID (for save-as) */
  lastDesignId?: string;
  /** Design type (2=floorplan, 4=template) */
  designType: number;
  /** Design name */
  name: string;
  /** Design description */
  description?: string;
  /** Tenant identifier */
  tenant: string;
  /** Document status */
  status: number;
  /** Serialized floorplan data */
  data: string;
  /** Metadata */
  meta: {
    /** 3D thumbnail */
    image?: { url: string };
    /** 2D thumbnail */
    image2d?: { url: string };
    /** Background image */
    backgroundimage?: { url: string };
    /** Bill of materials */
    bom?: unknown;
  };
  /** Magic number for version control */
  magic: number;
  /** Origin apartment ID */
  originApartmentId?: string;
  /** Address information */
  address?: Address;
  /** Basic attributes */
  basicAttributes?: BasicAttributes;
  /** Extended attributes (JSON string) */
  attributes?: string;
  /** Main asset ID */
  mainAssetId?: string;
  /** Asset type */
  assetType?: number;
  /** Coupon platform */
  couponPlatform?: string;
  /** Business domain */
  bizDomain?: string;
  /** Original accessory asset ID */
  originalAccessoryAssetId?: string;
  /** Save type (3=auto-create) */
  saveType?: number;
  /** DWG file data */
  dwg?: unknown;
}

/**
 * Design detail response
 */
export interface DesignDetail {
  /** Design ID */
  id?: string;
  /** Design ID (alternative field) */
  designId?: string;
  /** Design name */
  name: string;
  /** Description */
  description?: string;
  /** Status */
  status: number;
  /** Version ID */
  versionId?: string;
  /** User ID */
  userId: string;
  /** Template ID */
  templateId?: string;
  /** Address */
  address?: Address;
  /** Basic attributes */
  basicAttributes?: BasicAttributes;
  /** Metadata */
  meta: {
    image?: { url: string };
    image2d?: { url: string };
    bom?: unknown;
  };
  /** Original accessory asset ID */
  originalAccessoryAssetId?: string;
  /** Removed accessory asset ID */
  removedAccessoryAssetId?: string;
  /** New accessory asset ID */
  newAccessoryAssetId?: string;
}

/**
 * Error data structure
 */
export interface ErrorData {
  /** Error status */
  status: 'error' | 'cancel';
  /** Error type */
  errorType?: string;
  /** Error object */
  error?: Error;
  /** Error message */
  message?: string;
  /** Original result that caused the error */
  originalResult?: unknown;
  /** Dumps that timed out */
  errorDump?: string[];
}

/**
 * Dump data result
 */
export interface DumpDataResult {
  /** Serialized design data */
  data: string;
  /** External service dump data */
  ext: Record<string, unknown>;
  /** Design ID */
  designId: string;
}

/**
 * Dump service interface
 */
export interface DumpService {
  /** Prepare dump asynchronously */
  prepareDumpAsync(): Promise<boolean>;
  /** Dump synchronously */
  dumpSync(): unknown;
  /** Post dump data asynchronously */
  postDumpAsync(data: unknown): Promise<{ data?: { value: unknown }; timeout?: boolean }>;
}

/**
 * Design utility class for managing floorplan designs
 */
export default class DesignUtil {
  /**
   * Check if current user is in template design mode
   */
  static isTemplateDesignOnly(): boolean;

  /**
   * Get total floorplan area
   * @param floorplan - Floorplan document
   * @returns Total area in square units
   */
  static getfloorplanarea(floorplan: FloorplanDocument): number;

  /**
   * Get gross floor area
   * @param floorplan - Floorplan document
   * @returns Gross floor area
   */
  static getFloorplanGrossFloorArea(floorplan: FloorplanDocument): number;

  /**
   * Get gross internal area
   * @param floorplan - Floorplan document
   * @returns Gross internal area
   */
  static getFloorplanGrossInternalArea(floorplan: FloorplanDocument): number;

  /**
   * Export image from canvas
   * @param canvas - Canvas element or context
   * @param documentType - Type of document (default: "thumbnail 3d")
   * @param options - Export options (width, height, foreground)
   * @returns Promise resolving to image data URL
   */
  static exportImgFromCanvas(
    canvas: unknown,
    documentType?: string,
    options?: { width?: number; height?: number; forground?: boolean }
  ): Promise<string>;

  /**
   * Upload data URL to S3 storage
   * @param dataURL - Image data URL
   * @returns Promise resolving to upload result
   */
  static uploadDataURLToS3(dataURL: string): Promise<UploadResult>;

  /**
   * Upload template design
   * @param context - Design context with floorplan and metadata
   * @param options - Save options
   * @returns Promise resolving to save result
   */
  static uploadTemplateDesign(
    context: { floorplan: FloorplanDocument; designMetadata: DesignMetadata },
    options: SaveOptions
  ): Promise<DesignDetail>;

  /**
   * Get save request data for design
   * @param context - Design context
   * @param options - Save options
   * @returns Request data object
   */
  static getSaveRequestData(
    context: { floorplan: FloorplanDocument; designMetadata: DesignMetadata },
    options: SaveOptions
  ): SaveRequestData;

  /**
   * Get metadata request data
   * @param floorplan - Floorplan document
   * @param isAutoCreate - Whether this is an auto-create operation
   * @returns Metadata request data
   */
  static getMetaRequestData(floorplan: FloorplanDocument, isAutoCreate?: boolean): Partial<SaveRequestData>;

  /**
   * Populate save design data with additional metadata
   * @param floorplan - Floorplan document
   * @param requestData - Request data to populate
   * @param additionalData - Additional data (e.g., DWG)
   * @returns Populated request data
   */
  static populateSaveDesignData(
    floorplan: FloorplanDocument,
    requestData: SaveRequestData,
    additionalData?: { dwg?: unknown }
  ): SaveRequestData;

  /**
   * Upload design to server
   * @param context - Design context
   * @param options - Save options
   * @returns Promise resolving to save result
   */
  static uploadDesign(
    context: { floorplan: FloorplanDocument },
    options: SaveOptions
  ): Promise<DesignDetail>;

  /**
   * Update design metadata
   * @param assetId - Asset ID
   * @param metadata - Metadata to update
   * @returns Promise resolving to update result
   */
  static updateDesignMeta(assetId: string, metadata: Partial<DesignDetail>): Promise<unknown>;

  /**
   * Refresh design metadata from server
   * @param floorplan - Floorplan document with metadata
   * @param designId - Design ID
   * @param shouldFlush - Whether to flush metadata changes
   * @returns Promise resolving to design detail
   */
  static refreshDesignMeta(
    floorplan: { designMetadata: DesignMetadata },
    designId: string,
    shouldFlush?: boolean
  ): Promise<DesignDetail>;

  /**
   * Transform error to standardized format
   * @param error - Error to transform
   * @returns Standardized error data
   */
  static transformError(error: unknown): ErrorData;

  /**
   * Transform result data with error handling
   * @param resultPromise - Promise or array of promises to transform
   * @returns Transformed result promise
   */
  static transformResultData(resultPromise: Promise<unknown> | Promise<unknown>[]): Promise<unknown>;

  /**
   * Transform result with error handling and user feedback
   * @param resultPromise - Promise to transform
   * @returns Transformed result promise
   */
  static transformResult(resultPromise: Promise<unknown>): Promise<unknown>;

  /**
   * Show live hint notification
   * @param hintType - Type of hint to show
   * @param callbackId - Callback ID for hint actions
   */
  static showLiveHint(hintType: string, callbackId?: string): void;

  /**
   * Hide live hint notification
   */
  static hideLiveHint(): void;

  /**
   * Update browser URL bar with design information
   * @param floorplan - Floorplan document
   */
  static updateUrlBar(floorplan: FloorplanDocument): void;

  /**
   * Remove underlay from floorplan
   * @param floorplan - Floorplan document
   */
  static removeUnderlay(floorplan: FloorplanDocument): void;

  /**
   * Populate refresh metadata result
   * @param floorplan - Floorplan document
   * @param detail - Design detail from server
   */
  static populateRefreshMetaResult(floorplan: FloorplanDocument, detail: DesignDetail): void;

  /**
   * Post save design request
   * @param requestData - Request data
   * @param isSaveAs - Whether this is a save-as operation
   * @returns Promise resolving to save result
   */
  static postSaveDesignRequest(requestData: SaveRequestData, isSaveAs?: boolean): Promise<DesignDetail>;

  /**
   * Get ACS project ID
   * @param floorplan - Floorplan document
   * @returns ACS project ID or null
   */
  static getAcsProjectId(floorplan: FloorplanDocument): string | null;

  /**
   * Get ACS asset ID
   * @param floorplan - Floorplan document
   * @returns ACS asset ID or null
   */
  static getAcsAssetId(floorplan: FloorplanDocument): string | null;

  /**
   * Get address from floorplan metadata
   * @param floorplan - Floorplan document
   * @returns Address object
   */
  static getAddress(floorplan: FloorplanDocument): Address;

  /**
   * Get basic attributes from floorplan metadata
   * @param floorplan - Floorplan document
   * @returns Basic attributes object
   */
  static getBasicAttributes(floorplan: FloorplanDocument): BasicAttributes;

  /**
   * Get extended attributes from floorplan metadata
   * @param floorplan - Floorplan document
   * @returns Attributes object
   */
  static getAttributes(floorplan: FloorplanDocument): Record<string, unknown>;

  /**
   * Extract design extra info to JSON
   * @param request - Request object
   * @returns Promise resolving to extraction result
   */
  static extractDesignExtraInfoToJson(request: { data?: unknown }): Promise<unknown>;

  /**
   * Get data with dump data from external services
   * @param dataGetter - Function to get serialized data
   * @param dumpServices - Map of dump service instances
   * @returns Promise resolving to dump data result
   */
  static getDataWithDumpData(
    dataGetter: (() => string) | undefined,
    dumpServices: Map<string, DumpService>
  ): Promise<DumpDataResult>;

  /**
   * Load address data (provinces, cities, districts)
   * @returns Promise resolving to address data array
   */
  static loadAddressData(): Promise<AddressData[]>;

  /**
   * Load style data
   * @returns Promise resolving to style data array
   */
  static loadStyleData(): Promise<StyleData[]>;
}