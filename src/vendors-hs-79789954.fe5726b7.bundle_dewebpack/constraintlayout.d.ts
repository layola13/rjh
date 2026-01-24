/**
 * ConstraintLayout Module Type Definitions
 * Provides AI-powered spatial layout and constraint solving capabilities
 */

import type { HSCore } from './HSCore';
import type { Signal } from './Signal';
import type { Floor, Content } from './Model';
import type { Solver } from './Solver';
import type { EntityObject, RoomObject, GroupObject } from './EntityObject';
import type { 
  ContentConstraintObject, 
  FloorConstraintObject, 
  RegionConstraintObject,
  ContentGroupConstraintObject 
} from './ConstraintObject';
import type { Vector2, Vector3, Box3, Loop, Line2d } from './Math';

/**
 * Rotation and scale transformation interfaces
 */
export interface XRotation {
  /** Rotation around X-axis in degrees */
  value: number;
}

export interface YRotation {
  /** Rotation around Y-axis in degrees */
  value: number;
}

export interface ZRotation {
  /** Rotation around Z-axis in degrees */
  value: number;
}

export interface XScale {
  /** Scale factor along X-axis */
  value: number;
}

export interface YScale {
  /** Scale factor along Y-axis */
  value: number;
}

export interface ZScale {
  /** Scale factor along Z-axis */
  value: number;
}

/**
 * Content placement metadata from layout JSON
 */
export interface ContentDump {
  /** Unique seek identifier */
  seekId: string;
  /** Category identifiers */
  categories: string[];
  /** Content type descriptor */
  contentType: string;
  /** Associated tag */
  tag: string;
  /** Host element tag (optional) */
  hostTag?: string;
  /** Entity identifier */
  entityId: string;
  /** World position */
  x: number;
  y: number;
  z: number;
  /** Scale factors */
  XScale: number;
  YScale: number;
  ZScale: number;
  /** Physical dimensions */
  XLength: number;
  YLength: number;
  ZLength: number;
  /** Rotation angles in degrees */
  XRotation: number;
  YRotation: number;
  ZRotation: number;
  /** Group type for grouped elements */
  groupType?: string;
}

/**
 * Floor geometry representation
 */
export interface FloorDump {
  tag: string;
  bound: {
    left: number;
    top: number;
    width: number;
    height: number;
  };
  layerHeight: number;
  roomType: string;
  worldRawPath2dDump: {
    outer: Array<{
      curve: {
        type: string;
        data: unknown;
      };
      faceTags: string[];
    }>;
    holes: unknown[];
  };
}

/**
 * Complete layout JSON structure
 */
export interface LayoutJSON {
  floorDump: FloorDump;
  contentDumps: ContentDump[];
}

/**
 * Search result from layout service
 */
export interface SearchResult {
  room_id: string;
  room_type: string;
  origin: string;
  floor_distance: number;
  doors_distance: number;
  windows_distance: number;
  id: string;
  created_at: string;
  layout_json_string: string;
  image: {
    src: string;
    desc: string;
  };
  /** Internal: reduced floor polygon for solving */
  floorOuterForSolve?: Line2d[];
  /** Internal: search metadata */
  searchMethodName?: string;
  targetReduceStep?: number;
  roomInfoCentroid?: unknown;
  roomInfoNone?: unknown;
  world_raw_path_2d_dump?: string;
}

/**
 * Layout search options
 */
export interface SearchOptions {
  /** Filter by category IDs */
  categoryIds?: string[];
  /** Strict matching mode */
  strictMode?: boolean;
  /** Generate complete layout vs. partial */
  completeLayout?: boolean;
  /** Layout mode: completion | full */
  mode?: string;
  /** Target room types */
  roomTypes?: string[];
  /** Group information for advanced layouts */
  groupInfos?: GroupInfo[];
  /** Use skeleton-based extraction */
  useSkeleton?: boolean;
  /** Advanced sub-search configuration */
  subSearchOptions?: SubSearchOption[];
  /** Number of results to return */
  k?: number;
}

/**
 * Sub-search configuration
 */
export interface SubSearchOption {
  extractMethod: 'extractRoomBySkeleton' | 'extractRoomMany';
  searchMethod: string;
  whenSucceed?: 'interrupt' | 'continue';
  strictMode?: boolean;
  roomTypes?: string[];
  k?: number;
}

/**
 * Group information for clustered content
 */
export interface GroupInfo {
  id: string;
  groupType: string;
  children?: GroupMemberInfo[];
  content?: Content;
  contents?: Content[];
  categories?: string[];
  contentType?: string;
  seekId?: string;
}

/**
 * Group member metadata
 */
export interface GroupMemberInfo {
  id: string;
  categories: string[];
  contentType: string;
  seekId?: string;
}

/**
 * Constraint extraction result
 */
export interface ConstraintsDump {
  contentObjects: unknown[];
  regionObjects: unknown[];
  contentContentConstraints?: ContentContentConstraint[];
  regionContentConstraints?: RegionContentConstraint[];
  groupInfos?: GroupInfo[];
}

/**
 * Content-to-content spatial constraint
 */
export interface ContentContentConstraint {
  contentId: string;
  refContentId: string;
  constraint: {
    type: string;
    data: {
      selfFaceType: string;
      refFaceType: string;
      distance?: number;
    };
  };
}

/**
 * Region-to-content spatial constraint
 */
export interface RegionContentConstraint {
  contentId: string;
  constraint: {
    type: string;
    data: {
      selfFaceType: string;
      refFaceType: string;
      ratio?: number;
      distance?: number;
    };
  };
}

/**
 * Constraint solving result
 */
export interface ConstraintResult {
  /** Positioned content constraint objects */
  targetCOs: ContentConstraintObject[];
  /** Room boundary object */
  roomEntityObject: RoomObject;
  /** Additional debugging/metadata */
  extraMessage?: unknown;
}

/**
 * Completion context state
 */
export interface CompletionContext {
  /** Fixed (user-placed) contents */
  fixedContents?: Content[];
  /** Proposed (AI-generated) content objects */
  proposedCOs?: ContentConstraintObject[];
  /** Fixed content objects */
  fixedCOs?: ContentConstraintObject[];
  /** Available category IDs for completion */
  categories?: string[];
  /** Result preview images */
  images?: Array<{ src: string; desc: string }>;
  /** Selected result image */
  resultImage?: { src: string; desc: string };
}

/**
 * Signal action payloads
 */
export interface SignalPayload {
  action: string;
  payload: {
    floor?: Floor;
    content?: Content;
    results?: SearchResult[];
    constraintLayout?: ConstraintLayout;
    selectedLayoutIndex?: number;
    args?: unknown[];
    rooms?: Floor[];
    paths?: unknown[];
    message?: string;
  };
}

/**
 * Inspiration data structure for style transfer
 */
export interface InspirationData {
  dumps: ContentDump[];
  groupInfos: GroupInfo[];
  layoutDump?: LayoutJSON;
}

/**
 * Main ConstraintLayout class
 * Manages AI-powered furniture layout with spatial constraints
 */
export declare class ConstraintLayout {
  /**
   * Event signal for layout operations
   */
  readonly signal: Signal;

  /**
   * Target floor being laid out
   */
  targetFloor?: Floor;

  /**
   * Available layout search results
   */
  searchResults: SearchResult[];

  /**
   * Currently selected layout index
   */
  selectedLayoutIndex: number;

  /**
   * Parsed layout JSON data
   */
  layoutJSONs?: LayoutJSON[];

  /**
   * Content type completion tracker
   */
  typeOfCompletion: Map<Content, 'fixed' | 'proposed'>;

  /**
   * Completion operation context
   */
  private _completionContext: CompletionContext;

  /**
   * Category completion manager
   */
  private categoryManager?: CategoryManager;

  /**
   * @param floor - Optional initial floor to layout
   */
  constructor(floor?: Floor);

  /**
   * Search for matching layout configurations
   * @param floor - Target floor
   * @param options - Search filter options
   * @param mode - Operation mode
   * @returns Matching layout results
   */
  search(
    floor: Floor,
    options?: SearchOptions,
    mode?: string
  ): Promise<SearchResult[]>;

  /**
   * Apply selected layout to floor
   * @param layoutIndex - Index of layout to apply (defaults to selectedLayoutIndex)
   * @param mode - Application mode (full | completion | current-step | next-step | etc.)
   * @returns Constraint solving result
   */
  apply(
    layoutIndex?: number,
    mode?: string
  ): Promise<ConstraintResult>;

  /**
   * Apply inspiration data to floor with style transfer
   * @param floor - Target floor
   * @param inspirationData - Source layout data
   * @param layoutIndex - Optional specific layout to use
   * @param handleSpecialTypes - Whether to process curtains/ceiling lights
   * @returns Applied layout result
   */
  applyInspiration(
    floor: Floor,
    inspirationData: InspirationData,
    layoutIndex?: number,
    handleSpecialTypes?: boolean
  ): Promise<ConstraintResult>;

  /**
   * Solve spatial constraints for content placement
   * @param mode - Solving mode
   * @param fixedContents - User-placed immovable contents
   * @returns Constraint solving result
   */
  constraint(
    mode: string,
    fixedContents?: Content[]
  ): Promise<ConstraintResult>;

  /**
   * Complete partial layout with AI suggestions
   * @param floor - Target floor
   * @param layoutIndex - Layout variant to use
   * @param fixedContents - Existing placed contents
   * @returns Completion context with results
   */
  completeLayout(
    floor: Floor,
    layoutIndex: number,
    fixedContents: Content[]
  ): Promise<CompletionContext>;

  /**
   * Shuffle to next layout variant
   * @param mode - Shuffling mode
   */
  shuffle(mode?: string): Promise<void>;

  /**
   * Extract constraint relationships from floor
   * @param floor - Source floor
   * @returns Constraint dump data
   */
  extract(floor: Floor): ConstraintsDump;

  /**
   * Extract content dumps from floor state
   * @param floor - Source floor
   * @returns Floor and content dump data
   */
  extractContentDumpsFromFloor(floor: Floor): {
    floorDump: FloorDump;
    contentDumps: ContentDump[];
    materials: unknown;
    openings: unknown;
  };

  /**
   * Load constraint objects from dump data
   * @param dump - Serialized constraint data
   * @returns Loaded constraint objects
   */
  loadConstraintInfoFromDump(dump: ConstraintsDump): {
    contentObjects: ContentConstraintObject[];
    regionObjects: RegionConstraintObject[];
    contentContentConstraints: ContentContentConstraint[];
    regionContentConstraints: RegionContentConstraint[];
    groupInfos: GroupInfo[];
  };

  /**
   * Search for group-based inspiration data
   * @param params - Search parameters
   * @returns Matched group information
   */
  searchGroupInfos(params: {
    floor: Floor;
    designId: string;
    roomId: string;
  }): Promise<{
    data: InspirationData;
    matchedGroupRows: unknown[];
  } | undefined>;

  /**
   * Search inspiration data for entire house
   * @param params - Search parameters
   * @returns All room inspiration data
   */
  searchWholeHouseGroupInfos(params: {
    designId: string;
  }): Promise<Array<{
    roomType: string;
    data: InspirationData;
    matchedGroupRows: unknown[];
    floorId: string;
  }> | undefined>;

  /**
   * Get matched wall materials from layout
   * @param materialsData - Material configuration
   * @param applyToFloor - Whether to apply to floor
   * @returns Matched material assignments
   */
  getMatchedFaceMaterials(
    materialsData: unknown,
    applyToFloor?: boolean
  ): Promise<unknown>;

  /**
   * Get matched door/window openings
   * @param openingsData - Opening configuration
   * @returns Matched opening assignments
   */
  getMatchedOpenings(openingsData: unknown): unknown;

  /**
   * Get all openings on floor
   * @returns All door/window openings
   */
  getAllFloorOpenings(): unknown;

  /**
   * Clear proposed content suggestions
   */
  clearProposed(): void;

  /**
   * Accept proposed content as fixed
   */
  acceptProposed(): void;

  /**
   * Clean up resources and event listeners
   */
  dispose(): void;

  /**
   * Remove all cached layout data
   */
  clear(): void;
}

/**
 * Internal category completion manager
 */
declare class CategoryManager {
  /** All unique category IDs across layouts */
  private _allCategoryIds: Set<string>;
  
  /** Category groups with completion status */
  availableCategoryGroups: Array<{
    status: 'free' | 'used';
    ids: string[];
  }>;
  
  /** Current category group index */
  private index: number;

  constructor(layoutJSONs: LayoutJSON[]);

  /** Get current category group */
  current(): string[];

  /** Advance to next category group */
  next(): string[];

  /** Go to previous category group */
  prev(): string[];

  /** Mark current group as used */
  occupy(): void;

  /** Mark categories as available again */
  release(categories: string[]): void;

  /** Get all unused categories */
  rest(): string[];
}

export default ConstraintLayout;