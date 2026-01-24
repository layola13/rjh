/**
 * Command for importing customized PM (Product Model) instances with interactive placement
 * Handles mouse-based positioning, snapping, and preview during import
 */

import { Command } from 'HSApp.Cmd';
import { App } from 'HSApp.App';
import { UserInputPlugin } from 'HSFPConstants.PluginType';
import { Document } from 'HSCore.Doc';
import { TransactionManager, TransactionSession, TransactionRequest } from 'HSApp.Transaction';
import { SnappingHelper, SnappingStrategy } from 'HSApp.Snapping';
import { SelectionManager } from 'HSApp.Selection';

/**
 * 3D position coordinates
 */
interface Position3D {
  x: number;
  y: number;
  z: number;
}

/**
 * Mouse event data from user input
 */
interface MouseEventData {
  /** Mouse position in model coordinates [x, y, z?] */
  position: number[];
  /** Original DOM event */
  event: {
    ctrlKey: boolean;
    shiftKey: boolean;
    altKey: boolean;
    keyCode?: number;
  };
  /** Movement vectors for linear constraints */
  vectors?: unknown;
  /** Whether movement is constrained to a line */
  linearMove?: boolean;
  /** Picked layer in the scene */
  pickedLayer?: unknown;
  /** Entities under mouse cursor */
  mouseOver?: unknown[];
  /** Model-to-screen scale factor for snap distance */
  modelToScreen?: number;
}

/**
 * Snapping context information
 */
interface SnappingContext {
  ctrlKey: boolean;
  shiftKey: boolean;
  altKey: boolean;
  vectors?: unknown;
  linearMove?: boolean;
  mousePosition: Position3D;
  pickedLayer: unknown;
  pickResults?: unknown[];
  defaultGround?: unknown;
  freeMoveSnap?: boolean;
}

/**
 * Snapping operation parameters
 */
interface SnappingOptions {
  snapOffset: number;
  autoFitEnable: boolean;
  ignoreSnapOffset: boolean;
  vectors?: unknown;
  notZ: boolean;
  fixedZValue?: number;
  freeMove: boolean;
  stretchInSpace: boolean;
  constraintInRoom: boolean;
  constraintInPolygon: boolean;
  polygon?: unknown;
  room?: unknown;
  trySnapToAllContents: boolean;
  defaultGround?: unknown;
  freeMoveSnap?: boolean;
  pickResults?: unknown[];
  linearMove?: boolean;
  mousePosition: Position3D;
}

/**
 * Metadata attribute definition
 */
interface Attribute {
  id: string;
  free: unknown[];
}

/**
 * Command metadata for customized PM import
 */
interface CustomizedPMMetadata {
  /** User-defined custom data */
  userFreeData?: ModelData;
  /** Content type identifier */
  contentType: string;
  /** Attribute definitions including model URL */
  attributes: Attribute[];
}

/**
 * 3D model information
 */
interface ModelInfo {
  /** Model position */
  pos: Position3D;
  /** Bounding box dimensions */
  XLength: number;
  YLength: number;
  ZLength: number;
  /** Scale factors [x, y, z] */
  scale: number[];
  /** Rotation angles [x, y, z] */
  rotation: number[];
}

/**
 * Complete model data from JSON
 */
interface ModelData {
  /** 3D model geometry/definition */
  model3d: unknown;
  /** Model transformation and dimensions */
  modelInfo: ModelInfo;
}

/**
 * Entity with position and bounding box
 */
interface PreviewEntity {
  x: number;
  y: number;
  z: number;
  refreshBoundInternal?(): void;
}

/**
 * Command for importing and placing customized PM instances
 * Provides interactive placement with real-time preview and snapping
 */
export declare class CmdImportCustomizedPMInstance extends Command {
  /** Application instance */
  private readonly _app: App;
  
  /** Transaction session for undo/redo */
  private _session?: TransactionSession;
  
  /** Command metadata containing model information */
  private readonly _meta: CustomizedPMMetadata;
  
  /** User input plugin for mouse interaction */
  private readonly _userInputPlugin: UserInputPlugin;
  
  /** Active floorplan document */
  private readonly _fp: Document;
  
  /** Original mouse position when command starts */
  private readonly _originMousePos: Position3D;
  
  /** Previous mouse position for delta calculation */
  private _preMousePos?: Position3D;
  
  /** Preview entity being placed */
  private _previewEntity?: PreviewEntity;
  
  /** Whether preview has been created */
  private _previewCreate?: boolean;
  
  /** Transaction request for model import */
  private _request?: TransactionRequest;
  
  /** Snapping helper for placement assistance */
  private snappingHelper?: SnappingHelper;
  
  /** Last snapping operation result */
  private snappingResult?: unknown;
  
  /** Snap distance in screen pixels */
  snapScreenOffset: number;
  
  /** Default snap distance in model units */
  defaultSnapOffset: number;
  
  /** Current snap distance in model units */
  snapOffset: number;

  /**
   * @param metadata - Model metadata including attributes and user data
   */
  constructor(metadata: CustomizedPMMetadata);

  /**
   * Initialize command execution and start transaction session
   */
  onExecute(): void;

  /**
   * Handle user input events (mouse move, click, keydown)
   * @param eventType - Type of event: "mousemove" | "click" | "keydown"
   * @param eventData - Event-specific data
   */
  onReceive(eventType: string, eventData: MouseEventData): boolean;

  /**
   * Get last mouse position in model coordinates
   * @returns Picked position from active view
   */
  private _getLastMousePosition(): Position3D;

  /**
   * Create snapping strategies based on active view mode
   * @param helper - Snapping helper instance
   * @returns Array of snapping strategy instances
   */
  private _getSnappingStrategies(helper: SnappingHelper): SnappingStrategy[];

  /**
   * Handle mouse move event - update preview position with snapping
   * @param eventData - Mouse event data with position and modifiers
   */
  private _onMove(eventData: MouseEventData): Promise<void>;

  /**
   * Execute snapping logic to adjust preview position
   * @param previousZ - Previous Z coordinate before move
   * @param lockZ - Whether to lock Z-axis movement
   * @param context - Snapping context with mouse state
   */
  private _doSnapping(previousZ: number, lockZ: boolean, context: SnappingContext): void;

  /**
   * Cancel command - cleanup preview and abort transaction
   */
  private _onCancel(): void;

  /**
   * Complete placement - commit transaction and finalize entity
   */
  private _onComplete(): Promise<void>;

  /**
   * Create preview entity by fetching model data and importing
   * Loads model from URL if specified in attributes
   */
  private _makePreview(): Promise<void>;

  /**
   * Remove preview entity from scene
   */
  private _clearPreview(): void;
}