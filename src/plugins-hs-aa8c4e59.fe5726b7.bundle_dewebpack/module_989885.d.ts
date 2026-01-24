/**
 * Auto Styler Utility Module
 * 
 * Provides utility functions for the Auto Styler feature including:
 * - Room type and style attribute management
 * - Image processing and upload
 * - Template data handling
 * - 2D rendering capture
 */

export interface Point {
  x: number;
  y: number;
}

export interface Room {
  getOuterLoopPolygon(): Point[];
}

export interface AttributeValue {
  id: string;
  value?: string;
}

export interface Attribute {
  id: string;
  name: string;
  values: AttributeValue[];
}

export interface ImageOptions {
  maxWidth: number;
  maxHeight: number;
  beforeSendingToServerCallback?: () => void;
}

export interface TemplateData {
  id: string;
  area?: number;
  roomId: string;
  templateName: string;
  roomType: string;
  roomStyle?: string;
  designId: string;
  designUrl: string;
  templateData: unknown;
  thumb: string;
  usePostProcess?: boolean;
}

export interface WholehouseTemplateData {
  attributes?: Attribute[];
  [key: string]: unknown;
}

export interface RenderedPicture {
  id: string;
  roomId: string;
  url: string;
  originUrl: string;
  renderingType: string;
  type: 'rendered';
  iconUrl: string;
  designVersion: string;
}

export interface RoomTypeInfo {
  id: string;
  name: string;
}

export interface Render2DOptions {
  format?: string;
  width?: number;
  height?: number;
  forground?: boolean;
  center?: boolean;
  factor?: number;
  environment?: string;
  viewMode?: string;
}

export interface CatalogProductData {
  id: string;
  name: string;
  thumb: string;
  description: string;
  category: string;
  productType: string;
  contentType: string;
  postProcess?: string;
  attributes: Attribute[];
  free: string;
}

export interface AutostylerRequestData {
  designId: string;
  templateData: unknown;
  onlyHardDeco: boolean;
  roomConstruct: unknown;
}

export interface TemplateSearchParams {
  roomTypes: string[];
  roomStyle: string;
  limit: number;
}

/**
 * Auto Styler utility class providing static helper methods
 */
export default class AutoStylerUtil {
  /**
   * Find which room contains the clicked position
   * 
   * @param clickPosition - [x, y] coordinates of the click event
   * @param rooms - Array of room objects to check against
   * @returns The room containing the point, or null if none found
   */
  static getClickEventPositionRoom(
    clickPosition: [number, number],
    rooms: Room[]
  ): Room | null;

  /**
   * Parse resource URL and prepend appropriate path prefix
   * 
   * @param resourcePath - Original resource path
   * @returns Fully qualified resource URL
   */
  static parseURL(resourcePath: string): string;

  /**
   * Upload picture to S3 storage with optional resizing
   * 
   * @param target - Upload target (unused in implementation)
   * @param options - Upload and resize options
   * @returns Promise resolving to upload response
   */
  static uploadPictureToS3_(
    target: unknown,
    options?: Partial<ImageOptions>
  ): Promise<unknown>;

  /**
   * Convert room type ID to attribute object
   * 
   * @param roomTypeId - Room type identifier
   * @returns Attribute object or undefined if not found
   */
  static roomTypeToAttribute_(roomTypeId: string): Attribute | undefined;

  /**
   * Get coupon type as attribute based on app parameters
   * 
   * @returns Coupon attribute or null
   */
  static couponTypeToAttribute_(): Attribute | null;

  /**
   * Set the current room type attribute
   * 
   * @param attribute - Room type attribute to set
   */
  static setRoomTypeAttribute_(attribute: Attribute): void;

  /**
   * Convert room style ID to attribute object
   * 
   * @param roomStyleId - Room style identifier
   * @returns Attribute object or undefined if not found
   */
  static roomStyleToAttribute_(roomStyleId: string): Attribute | undefined;

  /**
   * Set the current room style attribute
   * 
   * @param attribute - Room style attribute to set
   */
  static setRoomStyleAttribute_(attribute: Attribute): void;

  /**
   * Get the current room style attribute
   * 
   * @returns Current room style attribute
   */
  static getRoomStyleAttribute_(): Attribute | undefined;

  /**
   * Get list of available room types
   * 
   * @returns Array of room type info objects
   */
  static getAvailableRoomTypeList_(): RoomTypeInfo[];

  /**
   * Get set of invalid/excluded room types
   * 
   * @returns Set of room type enum values to exclude
   */
  static getInvalidRoomTypeSet_(): Set<string>;

  /**
   * Fetch rendered pictures from server by design ID
   * 
   * @param designId - Design identifier
   * @returns Promise resolving to array of rendered pictures
   */
  static getRenderedPicturesFromServer_(
    designId: string
  ): Promise<RenderedPicture[]>;

  /**
   * Prepare styler template data for sending to server
   * 
   * @param templateData - Template data object
   * @returns Formatted catalog product data
   */
  static getSendingStylerTemplateData_(
    templateData: TemplateData
  ): CatalogProductData;

  /**
   * Prepare wholehouse template data for sending to server
   * 
   * @param templateData - Wholehouse template data
   * @returns Enhanced template data with attributes
   */
  static getSendingWholehouseTemplateData_(
    templateData: WholehouseTemplateData
  ): WholehouseTemplateData;

  /**
   * Resize and center image to fit within max dimensions
   * 
   * @param imageDataURL - Base64 encoded image data URL
   * @param maxWidth - Maximum width constraint
   * @param maxHeight - Maximum height constraint
   * @returns Promise resolving to resized image data URL
   */
  static getCenteredResizedImageDataURL_(
    imageDataURL: string,
    maxWidth: number,
    maxHeight: number
  ): Promise<string>;

  /**
   * Capture 2D rendering of current scene
   * 
   * @param options - Rendering options
   * @returns Promise resolving to image data URL
   */
  static get2DImage(options: Render2DOptions): Promise<string>;

  /**
   * Check if running in automation test mode
   * 
   * @returns True if automation test is active
   */
  static isAutomationTest(): boolean;

  /**
   * Get the room that contains the active camera
   * 
   * @returns Room containing camera or null
   */
  static getCameraRoom(): Room | null;

  /**
   * Get template name from app parameters
   * 
   * @returns Template name string
   */
  static getTemplateName(): string;

  /**
   * Fetch autostyler data from remote service
   * 
   * @param designId - Design identifier
   * @param templateData - Template configuration data
   * @param roomConstruct - Room construction data
   * @returns Promise resolving to autostyler response
   */
  static getAutostylerData(
    designId: string,
    templateData: unknown,
    roomConstruct: unknown
  ): Promise<unknown>;

  /**
   * Save base64 encoded image as PNG file
   * 
   * @param base64Data - Base64 encoded image string
   * @param suffix - Filename suffix
   */
  static saveBase64ToPng(base64Data: string, suffix: string): void;

  /**
   * Search for template designs matching criteria
   * 
   * @param roomTypes - Array of room type filters
   * @param roomStyle - Room style filter
   * @param limit - Maximum number of results
   * @returns Promise resolving to template items array
   */
  static getTemplateDesignData(
    roomTypes: string[],
    roomStyle: string,
    limit: number
  ): Promise<unknown[]>;
}