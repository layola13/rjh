/**
 * Handler Module - Constraint Layout Handler for Auto Styler
 * Provides utilities for applying design templates to rooms and whole houses
 */

/**
 * Log utility for tracking and error logging
 */
export declare class LogUtil {
  private static readonly _category: string;

  /**
   * Log informational events
   * @param message - Log message
   * @param data - Additional log data
   */
  static info(message: string, data?: Record<string, unknown>): void;

  /**
   * Log error events
   * @param message - Error message
   * @param data - Additional error data
   */
  static error(message: string, data?: Record<string, unknown>): void;
}

/**
 * Floor constraint layout mapping result
 */
interface FloorConstraintLayoutMap extends WeakMap<Floor, ConstraintLayout> {}

/**
 * Content seek IDs collection
 */
type ContentSeekIds = string[];

/**
 * Room application result for layout
 */
interface RoomLayoutResult {
  /** Room identifier combining type and ID */
  roomName: string;
  /** Index of applied layout */
  applyLayoutIndex: number;
  /** List of candidate layout options */
  candidateLayouts: SearchResult[];
}

/**
 * Soft decoration data structure
 */
interface SoftDecoData {
  /** Content items to apply */
  contents: unknown[];
  /** Hard decoration configuration */
  hardDeco: Record<string, unknown>;
  /** Prediction data for layout */
  predictData: unknown[];
  /** Wander path data */
  wander: unknown[];
  /** Remaining contents from source room */
  sourceRoomRestContents: ContentSeekIds;
  /** Source room type */
  sourceRoomType?: string;
  /** Source room ID */
  sourceRoom?: string;
}

/**
 * Single room application parameters
 */
interface ApplySingleRoomParams {
  /** Target floor to apply template to */
  targetFloor: Floor;
  /** Design template ID */
  designId: string;
  /** Specific floor ID (optional) */
  floorId?: string;
  /** Type of application: 'all' | 'hardDecoration' | 'softDecoration' */
  applyType: 'all' | 'hardDecoration' | 'softDecoration';
  /** Whether to replace existing items */
  replace?: boolean;
  /** Whether internal content can be used */
  canUseInternal?: boolean;
  /** Pre-fetched payload groups (optional) */
  payloadGroups?: GroupInfo[];
}

/**
 * Single room application result
 */
interface SingleRoomApplicationResult {
  /** Soft decoration data by floor ID */
  softDecoData: Record<string, SoftDecoData>;
  /** Hard decoration results */
  hardResults?: HardDecorationResult;
  /** Group information results */
  groupsResult?: GroupInfo[];
}

/**
 * Group information from whole house design
 */
interface GroupInfo {
  /** Floor ID */
  floorId: string;
  /** Room type */
  roomType: string;
  /** Matched group rows */
  matchedGroupRows: MatchedGroupRow[];
  /** Group data */
  data: GroupData;
}

/**
 * Matched group row data
 */
interface MatchedGroupRow {
  /** X dimension length */
  x_length: number;
  /** Y dimension length */
  y_length: number;
  /** Group type */
  group_type: string;
  /** Category IDs */
  category_ids: string[];
}

/**
 * Group data including layout dump
 */
interface GroupData {
  /** Dumped content information */
  dumps?: ContentDump[];
  /** Layout dump data */
  layoutDump?: LayoutDump;
}

/**
 * Content dump structure
 */
interface ContentDump {
  /** Unique seek ID */
  seekId: string;
  /** Child content dumps */
  children?: ContentDump[];
}

/**
 * Layout dump structure
 */
interface LayoutDump {
  /** Content dumps in layout */
  contentDumps: Array<{
    seekId: string;
    materialMap?: Record<string, unknown>;
  }>;
}

/**
 * Search result from constraint layout
 */
interface SearchResult {
  /** Layout JSON string */
  layout_json_string?: string;
  /** Floor outer boundary for solving */
  floorOuterForSolve?: unknown;
  /** 2D world raw path dump */
  world_raw_path_2d_dump?: unknown;
  /** Matched group count */
  matched_group_count: number;
  /** Group distance metric */
  group_distance: number;
  /** Floor distance metric */
  floor_distance: number;
}

/**
 * Best search result with constraint layout
 */
interface BestSearchResult {
  /** Constraint layout instance */
  constraintLayout: ConstraintLayout;
  /** Search result data */
  searchRet: SearchResult;
  /** Associated group item */
  groupItem: GroupInfo;
}

/**
 * Floor context for searching
 */
interface FloorContext {
  /** Target floor */
  floor: Floor;
  /** Supported room types */
  types: string[];
  /** Selected group item */
  groupItem?: GroupInfo;
  /** Constraint layout instance */
  constraintLayout?: ConstraintLayout;
  /** Layout index */
  layoutIndex?: number;
}

/**
 * Hard decoration result
 */
interface HardDecorationResult {
  /** Opening replacements */
  openings: OpeningReplacement[];
}

/**
 * Opening replacement result
 */
interface OpeningReplacement {
  /** Target opening */
  target: unknown;
  /** Opening information */
  info: unknown;
}

/**
 * Hard decoration data structure
 */
interface HardDecorationData {
  /** Materials by room identifier */
  materials: Record<string, unknown>;
  /** Openings by room identifier */
  openings: Record<string, unknown>;
}

/**
 * Instantiated content result
 */
interface InstantiatedContent {
  /** Content object */
  content: {
    seekId: string;
  };
}

/**
 * Constraint object types
 */
type ConstraintObject = ContentConstraintObject | ContentGroupConstraintObject;

/**
 * Content constraint object
 */
interface ContentConstraintObject {
  /** Target content */
  targetContent?: unknown;
  /** Content data */
  content: unknown;
}

/**
 * Content group constraint object
 */
interface ContentGroupConstraintObject {
  /** Child constraint objects */
  children: ContentConstraintObject[];
}

/**
 * Application result from constraint layout
 */
interface ApplicationResult {
  /** Target constraint objects */
  targetCOs: ConstraintObject[];
  /** Room entity object */
  roomEntityObject: unknown;
}

/**
 * Floor reference (assumed type)
 */
interface Floor {
  /** Floor ID */
  id: string;
  /** Room type */
  roomType: string;
}

/**
 * Constraint Layout class reference (assumed type)
 */
declare class ConstraintLayout {
  constructor(floor?: Floor);
  search(floor: Floor, options: unknown): Promise<void>;
  searchResults: SearchResult[];
  apply(index: number, mode: string): Promise<ApplicationResult>;
  applyInspiration(floor: Floor, data: GroupData, index: number, useInternal: boolean): Promise<ApplicationResult>;
  postProcess(contents: InstantiatedContent[], constraintObjects: ConstraintObject[], roomEntity: unknown): Promise<void>;
  getMatchedFaceMaterials(materials: unknown, useMainMaterial: boolean): Promise<unknown>;
  getMatchDoors(doorData: unknown): unknown[];
  getMatchedOpenings(openings: unknown): unknown[];
  getAllFloorOpenings(): unknown[];
}

/**
 * Main handler for constraint layout operations
 */
export declare class Handler {
  /** Mapping of floors to constraint layouts */
  private floorConstraintLayoutMap: FloorConstraintLayoutMap;
  
  /** Whether to use constraint layout for inspiration */
  private _useConstraintLayoutForInspiration: boolean;
  
  /** Application instance */
  private app: unknown;

  /**
   * Initialize the handler
   * @param config - Configuration object with app instance
   */
  init(config: { app: unknown }): void;

  /**
   * Get A/B test configuration for constraint layout inspiration
   * @private
   */
  private _getConstraintLayoutInspirationABTest(): void;

  /**
   * Check if constraint layout should be used for inspiration
   */
  get useConstraintLayoutForInspiration(): boolean;

  /**
   * Collect content seek IDs from content dumps
   * @param contentDumps - Array of content dumps
   * @returns Array of unique seek IDs
   */
  collectContentSeekIds(contentDumps?: ContentDump[]): ContentSeekIds;

  /**
   * Clear room contents
   * @param clearHard - Whether to clear hard decorations
   * @param clearSoft - Whether to clear soft decorations
   * @param floor - Target floor
   * @private
   */
  private _clearRoom(clearHard: boolean, clearSoft: boolean, floor: Floor): void;

  /**
   * Apply template to a single room
   * @param params - Application parameters
   * @returns Application result with soft/hard decoration data
   */
  applyTemplateToSingleRoom(params: ApplySingleRoomParams): Promise<SingleRoomApplicationResult | undefined>;

  /**
   * Apply template to entire house
   * @param designId - Design template ID
   * @param applyHard - Whether to apply hard decorations
   * @param dryRun - Whether to perform dry run without actual application
   * @param canUseInternal - Whether internal content can be used
   * @returns Array of room layout results
   */
  applyTemplateToWholeHouse(
    designId: string,
    applyHard?: boolean,
    dryRun?: boolean,
    canUseInternal?: boolean
  ): Promise<RoomLayoutResult[]>;

  /**
   * Get whole house group information by design ID
   * @param designId - Design template ID
   * @returns Array of group information
   */
  getWholeHouseGroupInfosByDesignId(designId: string): Promise<GroupInfo[]>;

  /**
   * Get best search result from group candidates
   * @param floorContext - Floor context with types
   * @param groupCandidates - Array of group candidates
   * @returns Best matching search result
   */
  getBestSearchRet(floorContext: FloorContext, groupCandidates: GroupInfo[]): Promise<BestSearchResult | undefined>;

  /**
   * Apply soft decorations to floor
   * @param constraintLayout - Constraint layout instance
   */
  applySoftToFloor(constraintLayout: ConstraintLayout): Promise<void>;

  /**
   * Replace soft decorations on floor
   * @param floor - Target floor
   * @param constraintLayout - Constraint layout instance
   * @param groupData - Group data to apply
   * @param layoutIndex - Layout index to use
   * @param canUseInternal - Whether internal content can be used
   * @returns Array of instantiated contents
   */
  replaceSoftToFloor(
    floor: Floor,
    constraintLayout: ConstraintLayout,
    groupData: GroupData,
    layoutIndex: number,
    canUseInternal?: boolean
  ): Promise<InstantiatedContent[]>;

  /**
   * Apply hard decorations to whole house by design ID
   * @param designId - Design template ID
   * @param targetFloor - Specific target floor (optional)
   * @param canUseInternal - Whether internal content can be used
   * @returns Hard decoration results
   */
  applyHardToWholeHouseByDesignId(
    designId: string,
    targetFloor?: Floor,
    canUseInternal?: boolean
  ): Promise<HardDecorationResult[] | undefined>;

  /**
   * Apply hard decorations to whole house
   * @param hardDecoData - Hard decoration data
   * @param targetFloor - Specific target floor (optional)
   * @param canUseInternal - Whether internal content can be used
   * @returns Array of hard decoration results
   */
  applyHardToWholeHouse(
    hardDecoData: HardDecorationData,
    targetFloor?: Floor,
    canUseInternal?: boolean
  ): Promise<HardDecorationResult[]>;

  /**
   * Apply molding decorations to floor
   * @param floor - Target floor
   */
  applyMoldingToFloor(floor: Floor): Promise<void>;

  /**
   * Apply hard decorations to specific floor
   * @param floor - Target floor
   * @param hardDecoData - Hard decoration data
   * @param canUseInternal - Whether internal content can be used
   * @returns Hard decoration result
   */
  applyHardToFloor(
    floor: Floor,
    hardDecoData: HardDecorationData,
    canUseInternal?: boolean
  ): Promise<HardDecorationResult>;

  /**
   * Check if room type is supportable
   * @param roomType1 - First room type
   * @param roomType2 - Second room type
   * @param checkBoth - Whether to check both types are in same group
   * @returns Whether room types are compatible
   */
  isSupportableRoomType(roomType1: string, roomType2: string, checkBoth?: boolean): boolean;
}