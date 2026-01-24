/**
 * Export handler for room design information
 * Provides utilities to extract and export room, content, and material data
 */

/**
 * Size dimensions for 3D content
 */
export interface XSize {
  /** Width dimension */
  value: number;
}

export interface YSize {
  /** Height dimension */
  value: number;
}

export interface ZSize {
  /** Depth dimension */
  value: number;
}

/**
 * Material information for a content part
 */
export interface MaterialInfo {
  /** Part identifier key */
  partKey: string;
  /** Seek platform material ID (UUID format) */
  seekId: string;
  /** Display name of the material */
  name: string;
}

/**
 * 3D content item in a room
 */
export interface ContentItem {
  /** Unique content identifier */
  id: string;
  /** Parent room ID */
  roomId?: string;
  /** Content class type */
  Class: string;
  /** Seek platform content ID (UUID format) */
  seekId?: string;
  /** Width dimension */
  XSize: XSize;
  /** Height dimension */
  YSize: YSize;
  /** Depth dimension */
  ZSize: ZSize;
  /** List of materials applied to this content */
  materialList: MaterialInfo[];
  /** Flip state (optional) */
  flip?: boolean;
}

/**
 * Light fixture in a room
 */
export interface LightItem {
  /** Unique light identifier */
  id: string;
  /** Parent room ID */
  roomId?: string;
  /** Light type/class */
  Class: string;
  /** 3D position X coordinate */
  x: number;
  /** 3D position Y coordinate */
  y: number;
  /** 3D position Z coordinate */
  z: number;
  /** Seek platform light ID (UUID format) */
  seekId?: string;
}

/**
 * Window/opening element
 */
export interface WindowItem {
  /** Unique window identifier */
  id: string;
  /** Parent room ID */
  roomId?: string;
  /** Window class type */
  Class: string;
  /** Seek platform window ID (UUID format) */
  seekId?: string;
  /** Width dimension */
  XSize: XSize;
  /** Height dimension */
  YSize: YSize;
  /** Depth dimension */
  ZSize: ZSize;
}

/**
 * Room information with associated content
 */
export interface RoomInfo {
  /** Unique room identifier */
  id: string;
  /** Room type code */
  roomType: string;
  /** Localized room type name */
  roomTypeDisplayName: string;
  /** Floor area in square units */
  area: number;
  /** List of all seek IDs used in this room */
  seekIdList: string[];
  /** Light fixtures in this room */
  lightList: LightItem[];
  /** Windows/openings in this room */
  windowList: WindowItem[];
  /** 3D content items in this room */
  contentList: ContentItem[];
  /** Material seek IDs applied to room surfaces */
  materialList: string[];
}

/**
 * Complete design export data
 */
export interface DesignInfo {
  /** Export timestamp (milliseconds since epoch) */
  timeCreated: number;
  /** Total number of rooms */
  count: number;
  /** Detailed information for each room */
  room: RoomInfo[];
}

/**
 * Internal export data structure
 */
interface ExportInfo {
  /** All content items across all rooms */
  contentList: ContentItem[];
  /** All light fixtures across all rooms */
  lightList: LightItem[];
  /** All room metadata */
  roomList: Array<{
    id: string;
    roomType: string;
    roomTypeDisplayName?: string;
    area: number;
  }>;
  /** Mapping of room IDs to material seek IDs */
  roomIdMaterialMap: Record<string, string[]>;
}

/**
 * Paint/material data structure
 */
interface PaintData {
  mixpaint?: {
    data?: {
      paints?: Array<{
        material?: {
          seekId?: string;
          name?: string;
        };
      }>;
    };
  };
}

/**
 * Material with seek ID
 */
interface MaterialWithSeekId {
  seekId?: string;
  name?: string;
  paintData?: PaintData;
}

/**
 * Internal helper class for export operations
 */
declare class ExportHandlerHelper {
  /** UUID validation regex pattern */
  static readonly seekIdReg: RegExp;

  /**
   * Calculate room floor area from geometry
   * @param room - Room entity to measure
   * @returns Floor area in square units
   */
  private static _getRoomArea(room: unknown): number;

  /**
   * Extract and collect unique seek IDs from material data
   * @param material - Material object to process
   * @param seekIdSet - Set for deduplication (mutated)
   * @param seekIdList - Output list (mutated)
   */
  private static _getSeekId(
    material: MaterialWithSeekId,
    seekIdSet: Record<string, boolean>,
    seekIdList: string[]
  ): void;

  /**
   * Export all room, content, and material information
   * @returns Complete export data structure
   */
  static getExportInfo(): ExportInfo;

  /**
   * Generate structured design information for export
   * @param includeAllSeekIds - Whether to include duplicate seek IDs (default: false)
   * @returns Formatted design data ready for export
   */
  static getDesignInfo(includeAllSeekIds?: boolean): DesignInfo;
}

/**
 * Main export handler for room design data
 * Provides static methods to export room details, content, materials, and lighting
 */
export declare class ExportHandler {
  /**
   * Export detailed room information including content, materials, and lighting
   * @param includeAllSeekIds - Whether to include all seek IDs without deduplication (default: false)
   * @returns Complete design information for all rooms
   * @example
   *