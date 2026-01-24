/**
 * 2D curve definition for geometric paths
 */
interface Curve2D {
  /** Curve type identifier (e.g., "ln2" for 2D line) */
  type: string;
  /** Curve data: [[x, y], [dirX, dirY], [unused, length]] */
  data: [[number, number], [number, number], [number, number]];
}

/**
 * Closed loop path definition
 */
interface LoopPath {
  /** Path type identifier */
  type: string;
  /** Array of curves forming the closed loop */
  data: Curve2D[];
}

/**
 * Bounding box definition
 */
interface BoundingBox {
  /** Left edge X coordinate */
  left: number;
  /** Top edge Y coordinate */
  top: number;
  /** Width of bounding box */
  width: number;
  /** Height of bounding box */
  height: number;
}

/**
 * Floor geometry dump
 */
interface FloorGeometryDump {
  /** Floor identifier tag */
  tag: string;
  /** Bounding box of floor area */
  bound: BoundingBox;
  /** Array of floor element tags */
  floorTags: string[];
  /** Array of ceiling element tags */
  ceilingTags: string[];
  /** Height of the layer/floor */
  layerHeight: number;
  /** Type of room */
  roomType: RoomType;
  /** 2D path data for floor boundaries */
  worldRawPath2dDump: {
    /** Outer boundary path */
    outer: Array<{
      /** Curve defining boundary segment */
      curve: Curve2D;
      /** Associated face tags */
      faceTags: string[];
    }>;
    /** Interior holes/cutouts */
    holes: Array<any>;
  };
}

/**
 * 3D content item (furniture, fixture, etc.)
 */
interface ContentItem {
  /** Unique seek identifier */
  seekId: string;
  /** Array of category UUIDs */
  categories: string[];
  /** Content type description */
  contentType: string;
  /** Content tag identifier */
  tag: string;
  /** Host surface/parent tag */
  hostTag: string;
  /** Entity numeric ID */
  entityId: string;
  /** X position in world coordinates */
  x: number;
  /** Y position in world coordinates */
  y: number;
  /** Z position (height) in world coordinates */
  z: number;
  /** X-axis scale factor */
  XScale: number;
  /** Y-axis scale factor */
  YScale: number;
  /** Z-axis scale factor */
  ZScale: number;
  /** Length along X-axis */
  XLength: number;
  /** Length along Y-axis */
  YLength: number;
  /** Length along Z-axis (height) */
  ZLength: number;
  /** Rotation around X-axis (degrees) */
  XRotation: number;
  /** Rotation around Y-axis (degrees) */
  YRotation: number;
  /** Rotation around Z-axis (degrees) */
  ZRotation: number;
}

/**
 * Grouped content with hierarchy
 */
interface GroupedContent extends ContentItem {
  /** Group classification type */
  groupType: GroupType;
  /** Child content items */
  children: ContentItem[];
}

/**
 * Validation reason for furniture placement
 */
interface PlacementReason {
  /** Reason type */
  type: PlacementReasonType;
  /** Score contribution (positive = valid, negative = invalid) */
  score: number;
  /** Array of affected content IDs */
  ids: string[];
  /** Whether this reason is valid */
  valid: boolean;
}

/**
 * Extracted furniture group information
 */
interface ExtractInfo {
  /** Whether this extraction is valid */
  valid: boolean;
  /** Overall validation score */
  score: number;
  /** Furniture group type */
  type: GroupType;
  /** Primary content ID */
  id: string;
  /** Content tag */
  tag: string;
  /** Whether to ignore bounding box in calculations */
  ignoreBox: boolean;
  /** JSON string of loop path defining bounds */
  loopDump: string;
  /** Child content extraction info */
  children: Array<{
    id: string;
    tag: string;
    ignoreBox: boolean;
    loopDump: string;
  }>;
  /** Array of placement validation reasons */
  reasons: PlacementReason[];
}

/**
 * Room-specific data containing furniture and layout
 */
interface RoomData {
  /** Array of grouped content items (furniture sets) */
  groupAndContentDumps: GroupedContent[];
  /** Extracted placement validation information */
  extractInfos: ExtractInfo[];
}

/**
 * Complete floor and room data structure
 */
interface FloorDumpData {
  /** Floor geometry and metadata */
  floorDump: FloorGeometryDump;
  /** Room-specific data indexed by room type */
  roomData: {
    /** Bedroom furniture and layout */
    Bedroom?: RoomData;
    /** Living room furniture and layout */
    LivingRoom?: RoomData;
    /** Bathroom furniture and layout */
    Bathroom?: RoomData;
    /** Second bedroom furniture and layout */
    SecondBedroom?: RoomData;
    /** Additional rooms */
    [roomType: string]: RoomData | undefined;
  };
}

/**
 * Room type enumeration
 */
type RoomType = 
  | "Bedroom"
  | "SecondBedroom"
  | "LivingRoom"
  | "Bathroom"
  | "Kitchen"
  | "DiningRoom"
  | "Study"
  | "Balcony";

/**
 * Furniture group type enumeration
 */
type GroupType =
  | "Bed"
  | "Sofa"
  | "Table"
  | "Armoire"
  | "TV"
  | "Toilet"
  | "Shower"
  | "Basin"
  | "UnClassified";

/**
 * Placement validation reason types
 */
type PlacementReasonType =
  | "onTheFloor"      // Item is properly placed on floor
  | "onTheWall"       // Item is properly attached to wall
  | "adaptation"      // Item adapts to adjacent furniture
  | "collision"       // Item collides with other objects
  | "outOfBounds";    // Item exceeds room boundaries

/**
 * Module exports
 */
export const floorDump: FloorGeometryDump;
export const roomData: FloorDumpData["roomData"];