/**
 * Constraint Layout Plugin
 * 
 * This plugin provides constraint-based layout solving capabilities for floor plans,
 * including room application, content placement, design search, and room type estimation.
 */

import type { HSApp } from './app';
import type { HSCore } from './core';
import type { Floor, Layer, Content } from './model';
import type { IPlugin } from './plugin';
import type { Signal, SignalHook } from './util';
import type { TransactionManager, CommandManager } from './managers';

/**
 * Payload for applying rooms action
 */
interface ApplyRoomsPayload {
  /** Target floor to apply layout to */
  floor: Floor;
  /** Floor instance */
  id?: string;
}

/**
 * Payload for placing contents action
 */
interface PlaceContentsPayload {
  /** Target floor */
  floor: Floor;
  /** Placement options */
  options: {
    /** Array of content seek IDs to place */
    seekIds?: string[];
    /** Whether to keep existing contents */
    notClearExists?: boolean;
  };
}

/**
 * Payload for design search action
 */
interface DesignSearchPayload {
  /** Number of results to return */
  k: number;
  /** Area in square meters */
  area: number;
  /** Number of bedrooms */
  bedroomNum: number;
  /** Number of living rooms */
  livingroomNum: number;
  /** Number of bathrooms */
  bathroomNum: number;
  /** Excluded region constraint */
  excludedRegion?: string;
}

/**
 * Payload for room type estimation action
 */
interface EstimateRoomTypePayload {
  /** Floor to estimate */
  floor: Floor;
}

/**
 * Result of design search
 */
interface DesignSearchResult {
  /** Type of search performed */
  searchType: string;
  /** Floor area */
  area: number;
  /** Number of bathrooms */
  bathroomNum: number;
  /** Number of bedrooms */
  bedroomNum: number;
  /** Number of living rooms */
  livingroomNum: number;
  /** URL to design JSON data */
  designJsonUrl: string;
  /** URL to thumbnail image */
  thumbnailUrl: string;
}

/**
 * Result of room type estimation
 */
interface RoomTypeEstimationResult {
  /** Floor that was estimated */
  floor: Floor;
  /** Estimated room type */
  estimatedRoomType: string;
}

/**
 * Signal action types
 */
type ConstraintLayoutAction =
  | 'constraint_layout_input_apply_rooms'
  | 'constraint_layout_input_place_contents'
  | 'constraint_layout_input_search_designs'
  | 'constraint_layout_input_estimate_room_type'
  | 'constraint_layout_output_on_success'
  | 'constraint_layout_output_on_error';

/**
 * Signal data structure
 */
interface ConstraintLayoutSignalData<T = unknown> {
  /** Action type */
  action: ConstraintLayoutAction;
  /** Action payload */
  payload: T;
}

/**
 * Success message payload
 */
interface SuccessPayload {
  /** Success message */
  message: string;
}

/**
 * Error message payload
 */
interface ErrorPayload {
  /** Error message */
  message: string;
}

/**
 * Search options for constraint layout
 */
interface SearchOptions {
  /** Room types to include in search */
  roomTypes: string[];
  /** Whether to enforce strict layout rules */
  strictMode: boolean;
  /** Whether to complete the entire layout */
  completeLayout: boolean;
  /** Origin region (global or domestic) */
  origin: 'global' | 'domestic';
}

/**
 * Apply result containing contents and metadata
 */
interface ApplyResult {
  /** Target constraint objects */
  targetCOs: ConstraintObject[];
  /** Room entity object */
  roomEntityObject: unknown;
}

/**
 * Content replacement result
 */
interface ContentReplacementResult {
  /** Map of seek IDs to replacement IDs */
  seekIdMap: Map<string, string>;
  /** Map of seek IDs to material replacements */
  seekIdMaterialMap: Map<string, unknown>;
}

/**
 * Fake content instance result
 */
interface FakeContentInstance {
  /** Content object */
  content: Content;
}

/**
 * Constraint object base
 */
interface ConstraintObject {
  /** Target content */
  targetContent?: Content;
  /** Content object */
  content?: Content;
}

/**
 * Content group constraint object
 */
interface ContentGroupConstraintObject extends ConstraintObject {
  /** Child constraint objects */
  children: ConstraintObject[];
}

/**
 * Template application options for single room
 */
interface SingleRoomTemplateOptions {
  /** Target floor to apply template to */
  targetFloor: Floor;
  /** Design ID from template */
  designId: string;
  /** Floor ID from template */
  floorId: string;
}

/**
 * Template application options for whole house
 */
interface WholeHouseTemplateOptions {
  /** Template design data */
  designData: unknown;
}

/**
 * Constraint Layout Plugin
 * 
 * Provides advanced layout solving using constraint satisfaction and search algorithms.
 * Supports room layout application, furniture placement, design search, and room type estimation.
 */
export declare class ConstraintLayoutPlugin extends IPlugin {
  /**
   * Application instance
   */
  app: HSApp.App | undefined;

  /**
   * Signal hook for managing signal subscriptions
   */
  signalHook: SignalHook;

  /**
   * Signal dispatcher for layout events
   */
  signal: Signal<ConstraintLayoutSignalData>;

  /**
   * Transaction manager reference
   */
  transManager: TransactionManager | undefined;

  /**
   * Constraint layout solver instance
   */
  constraintLayout: ConstraintLayout;

  /**
   * Internal handler for layout operations
   * @private
   */
  private _handler: Handler | undefined;

  /**
   * Creates a new ConstraintLayoutPlugin instance
   */
  constructor();

  /**
   * Gets the type of layout completion
   */
  get typeOfCompletion(): string;

  /**
   * Handles constraint layout signal events
   * @param signalData - Signal data containing action and payload
   */
  handleConstraintLayoutSignal(signalData: ConstraintLayoutSignalData): Promise<void>;

  /**
   * Applies room layouts to floors
   * @param payload - Array of room application payloads
   * @returns Promise resolving when all rooms are applied
   */
  handleApplyRooms(payload: ApplyRoomsPayload[]): Promise<void>;

  /**
   * Post-processes placed contents, removing invalid placements
   * @param contents - Array of contents to validate
   * @param layout - Constraint layout instance
   * @private
   */
  private _postProcess(contents: Content[], layout: ConstraintLayout): Promise<void>;

  /**
   * Searches for designs matching criteria
   * @param payload - Search criteria
   * @returns Promise resolving to array of design search results
   */
  handleSearchDesigns(payload: DesignSearchPayload): Promise<DesignSearchResult[]>;

  /**
   * Estimates room types based on floor geometry and contents
   * @param payload - Array of floors to estimate
   * @returns Promise resolving to array of estimation results
   */
  handleEstimateRoomType(payload: EstimateRoomTypePayload[]): Promise<RoomTypeEstimationResult[]>;

  /**
   * Places contents in rooms
   * @param payload - Array of content placement requests
   * @returns Promise resolving when all contents are placed
   */
  handlePlaceContents(payload: PlaceContentsPayload[]): Promise<void>;

  /**
   * Unsubscribes from all floor signals
   */
  unListenFloorSignals(): void;

  /**
   * Disposes of plugin resources
   */
  dispose(): void;

  /**
   * Called when plugin is activated
   * @param context - Activation context
   * @param options - Activation options
   */
  onActive(context: unknown, options: unknown): void;

  /**
   * Registers plugin commands with command manager
   */
  registerCommands(): void;

  /**
   * Registers plugin requests with transaction manager
   */
  registerRequests(): void;

  /**
   * Applies a template to the entire house
   * @param options - Template options
   * @param clearExisting - Whether to clear existing contents (default: true)
   * @param skipValidation - Whether to skip validation (default: false)
   * @returns Promise resolving when template is applied
   */
  applyTemplateToWholeHouse(
    options: WholeHouseTemplateOptions,
    clearExisting?: boolean,
    skipValidation?: boolean
  ): Promise<void>;

  /**
   * Applies a template to a single room
   * @param options - Template options for single room
   * @returns Promise resolving to success status
   */
  applyTemplateToSingleRoom(options: SingleRoomTemplateOptions): Promise<boolean>;

  /**
   * Checks if a room type is supported for constraint layout
   * @param roomType - Room type to check
   * @param floor - Floor instance
   * @param useConstraintLayout - Whether to use constraint layout (default: true)
   * @returns True if room type is supported
   */
  isSupportableRoomType(roomType: string, floor: Floor, useConstraintLayout?: boolean): boolean;

  /**
   * Gets the flag indicating whether constraint layout is used for inspiration
   * @returns True if constraint layout is enabled for inspiration
   */
  getUseConstraintLayoutFlag(): boolean;
}

/**
 * Constraint layout solver
 */
declare class ConstraintLayout {
  /**
   * Target floor for layout operations
   */
  targetFloor: Floor | undefined;

  /**
   * Type of completion strategy
   */
  readonly typeOfCompletion: string;

  /**
   * Creates a constraint layout solver
   * @param floor - Initial target floor
   */
  constructor(floor: Floor | undefined);

  /**
   * Searches for layout solutions
   * @param floor - Floor to solve
   * @param options - Search options
   * @returns Promise resolving to search results
   */
  search(floor: Floor, options: SearchOptions): Promise<unknown>;

  /**
   * Applies a layout solution
   * @param solutionIndex - Index of solution to apply
   * @param mode - Application mode ('full' or 'partial')
   * @returns Promise resolving to apply result
   */
  apply(solutionIndex: number, mode: 'full' | 'partial'): Promise<ApplyResult>;

  /**
   * Post-processes applied layout
   * @param instances - Fake content instances
   * @param constraintObjects - Constraint objects
   * @param roomEntity - Room entity object
   * @returns Promise resolving when post-processing is complete
   */
  postProcess(
    instances: FakeContentInstance[],
    constraintObjects: ConstraintObject[],
    roomEntity: unknown
  ): Promise<void>;
}

/**
 * Internal handler for layout operations
 */
declare class Handler {
  /**
   * Whether to use constraint layout for inspiration
   */
  readonly useConstraintLayoutForInspiration: boolean;

  /**
   * Initializes the handler
   * @param context - Initialization context
   */
  init(context: unknown): void;

  /**
   * Applies template to whole house
   * @param options - Template options
   * @param clearExisting - Whether to clear existing contents
   * @param skipValidation - Whether to skip validation
   */
  applyTemplateToWholeHouse(
    options: WholeHouseTemplateOptions,
    clearExisting: boolean,
    skipValidation: boolean
  ): Promise<void>;

  /**
   * Applies template to single room
   * @param options - Template options
   * @returns Promise resolving to success status
   */
  applyTemplateToSingleRoom(options: SingleRoomTemplateOptions): Promise<boolean>;

  /**
   * Checks if room type is supportable
   * @param roomType - Room type
   * @param floor - Floor instance
   * @param useConstraintLayout - Use constraint layout flag
   */
  isSupportableRoomType(roomType: string, floor: Floor, useConstraintLayout: boolean): boolean;
}