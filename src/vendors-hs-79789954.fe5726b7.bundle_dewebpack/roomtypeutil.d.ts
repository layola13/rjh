/**
 * Parsed room identifier structure
 */
export interface RoomIdComponents {
  /** Design identifier */
  designId: string;
  /** Room type classification */
  roomType: string;
  /** Floor identifier */
  floorId: string;
  /** Contents percentage value */
  contentsPercentage: string;
  /** Flip transformation flag */
  flip: string;
  /** Rotation angle value */
  rotation: string;
  /** Applied design index */
  appliedIndex: string;
}

/**
 * Room type key for supported room categories
 */
export type SupportedRoomType =
  | 'Bathroom'
  | 'MasterBathroom'
  | 'SecondBathroom'
  | 'BathroomDryArea'
  | 'Bedroom'
  | 'SecondBedroom'
  | 'MasterBedroom'
  | 'LivingRoom'
  | 'DiningRoom'
  | 'LivingDiningRoom';

/**
 * Object with roomType property
 */
export interface RoomTypeObject {
  roomType: string;
}

/**
 * Mapping of room types to their compatible room type groups
 */
export type RoomTypeMapping = Record<SupportedRoomType, string[]>;

/**
 * Array of all supported room type keys
 */
export const supportedRoomTypes: string[];

/**
 * Parse a room identifier string into structured components
 * @param roomId - Underscore-delimited room identifier string
 * @returns Parsed room identifier components
 */
export function destructureRoomId(roomId: string): RoomIdComponents;

/**
 * Check if a room type is supported for design variations
 * @param roomType - Room type to validate
 * @returns True if the room type has compatible alternatives
 */
export function isSupportRoomType(roomType: string): boolean;

/**
 * Get compatible room types for a floor's room
 * @param room - Room object containing roomType property
 * @returns Array of compatible room type strings, empty if unsupported
 */
export function getFloorRoomTypes(room: RoomTypeObject): string[];

/**
 * Get grouped compatible room types by room type key
 * @param roomType - Room type key to lookup
 * @returns Array of compatible room type strings, or undefined
 */
export function getGroupedRoomTypes(roomType: string): string[] | undefined;

/**
 * Utility class providing categorized room type collections
 */
export class RoomTypeUtil {
  /** Master bedroom, bedroom, and second bedroom types */
  static readonly bedrooms: string[];
  
  /** Living room, combined living-dining, and dining room types */
  static readonly livingrooms: string[];
  
  /** All bathroom variants including master and dry area */
  static readonly bathrooms: string[];
  
  /** Aisle/corridor room types */
  static readonly aisles: string[];
  
  /** Cloakroom/wardrobe room types */
  static readonly cloakrooms: string[];
  
  /** Children's room types */
  static readonly kidsrooms: string[];
  
  /** Balcony room types */
  static readonly balconies: string[];
  
  /** Kitchen room types */
  static readonly kitchens: string[];
  
  /** Courtyard room types */
  static readonly courtyards: string[];
  
  /** Terrace room types */
  static readonly terraces: string[];
}