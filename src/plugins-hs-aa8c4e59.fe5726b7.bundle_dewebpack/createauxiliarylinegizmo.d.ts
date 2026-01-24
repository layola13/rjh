import { HSCore } from './HSCore';
import { Vector2, Line2d } from './geometry';
import { PathItem, InputBoxComp, InputBoxType, EndPointItem, EndPointType } from './canvas-items';
import { SnapHelper, SnapType } from './snap';
import { HSApp } from './HSApp';
import { getUnitParam } from './utils';

/**
 * Snap types that should trigger vector snapping behavior
 */
const VECTOR_SNAP_TYPES: SnapType[] = [
  SnapType.Border,
  SnapType.ArcLength,
  SnapType.ArcHeight,
  SnapType.AuxiliaryLine,
  SnapType.MidPoint
];

/**
 * Attributes for auxiliary line rendering
 */
export interface AuxiAttr {
  // Specific rendering attributes for auxiliary lines
}

/**
 * Attributes for snap line rendering
 */
export interface SnapAttr {
  // Specific rendering attributes for snap lines
}

/**
 * Attributes for auxiliary endpoint rendering
 */
export interface AuxiEndPointAttr {
  // Specific rendering attributes for auxiliary endpoints
}

/**
 * Mouse event with standard DOM properties
 */
interface MouseEventData {
  /** Mouse button pressed (0: left, 2: right) */
  button: number;
  /** Horizontal screen coordinate */
  clientX: number;
  /** Vertical screen coordinate */
  clientY: number;
  /** Whether Ctrl key is pressed */
  ctrlKey: boolean;
}

/**
 * Result of a snap operation
 */
interface SnapResult {
  /** Offset vector to apply */
  offset: Vector2;
  /** Type of snap detected */
  type: SnapType;
  /** Geometric curve involved in snap */
  curve: {
    isLine2d(): boolean;
    getDirection(): Vector2;
  };
}

/**
 * Mouse tooltip options
 */
interface TooltipOptions {
  /** X position */
  x: number;
  /** Y position */
  y: number;
}

/**
 * Tooltip style configuration
 */
interface TooltipStyle {
  /** Background color */
  background: string;
  /** Text color */
  txtColor: string;
}

/**
 * Transaction request for creating auxiliary lines
 */
interface TransactionRequest {
  // Transaction request structure
}

/**
 * Transaction manager for undo/redo operations
 */
interface TransactionManager {
  /**
   * Commit a transaction request
   * @param request - The transaction request to commit
   */
  commit(request: TransactionRequest): void;
  
  /**
   * Create a transaction request
   * @param type - Request type constant
   * @param args - Arguments for the request
   * @returns Transaction request object
   */
  createRequest(type: string, args: unknown[]): TransactionRequest;
}

/**
 * Command manager interface
 */
interface CommandManager {
  /**
   * Cancel the current command
   */
  cancel(): void;
}

/**
 * Command context
 */
interface CommandContext {
  /** Command manager instance */
  mgr?: CommandManager;
}

/**
 * Canvas context for rendering
 */
interface CanvasContext {
  /** Canvas element */
  hscanvas: {
    /** Signal emitted when viewbox changes */
    signalViewBoxChanged: HSCore.Util.Signal<void>;
  };
}

/**
 * Base class for temporary gizmos in the SVG view
 */
declare class TempGizmoBase {
  /**
   * Constructor for temporary gizmo
   * @param context - Canvas rendering context
   * @param param2 - Additional parameter
   * @param param3 - Additional parameter
   * @param param4 - Visibility flag
   */
  constructor(
    context: CanvasContext,
    param2: unknown,
    param3: unknown,
    param4: boolean
  );

  /** Context for rendering */
  protected context: CanvasContext;
  
  /** Command context */
  protected cmd: CommandContext;
  
  /** Signal hook for event management */
  protected signalHook: {
    listen<T>(signal: HSCore.Util.Signal<T>, handler: (data: T) => void): void;
    unlistenAll(): void;
  };

  /**
   * Mark the gizmo as needing redraw
   */
  protected setDirty(): void;

  /**
   * Called when gizmo is being destroyed
   */
  onCleanup(): void;

  /**
   * Called each frame to render the gizmo
   */
  onDraw(): void;

  /**
   * Handle mouse move events
   * @param event - Mouse event data
   */
  mouseMoveHandler(event: MouseEventData): void;

  /**
   * Handle mouse click events
   * @param event - Mouse event data
   */
  mouseClickHandler(event: MouseEventData): void;
}

/**
 * Gizmo for creating auxiliary lines in the canvas.
 * Provides interactive line creation with snapping and visual feedback.
 * 
 * Usage:
 * 1. First click sets the start point
 * 2. Move mouse to preview line
 * 3. Second click confirms and creates the auxiliary line
 * 4. Right-click cancels the operation
 */
export declare class CreateAuxiliaryLineGizmo extends TempGizmoBase {
  /**
   * Create a new auxiliary line gizmo
   * @param context - Canvas rendering context
   * @param param2 - Additional initialization parameter
   * @param param3 - Additional initialization parameter
   */
  constructor(context: CanvasContext, param2: unknown, param3: unknown);

  /**
   * Signal emitted when gizmo state changes
   */
  signal: HSCore.Util.Signal<unknown>;

  /**
   * Visual representation of the auxiliary line being created
   */
  private _lineItem: PathItem;

  /**
   * Current cursor position in model coordinates
   */
  private _pos?: Vector2;

  /**
   * Start point of the line (set after first click)
   */
  private _start?: Vector2;

  /**
   * Visual indicator for current cursor position
   */
  private _posItem: EndPointItem;

  /**
   * Visual indicator for line start point
   */
  private _startItem: EndPointItem;

  /**
   * Direction vector for special snapping modes (perpendicular, parallel, etc.)
   */
  private _snapVector?: Vector2;

  /**
   * Direction vector for constrained line creation
   */
  private _specialVector?: Vector2;

  /**
   * Visual representation of special constraint line
   */
  private _specialPathItem: PathItem;

  /**
   * Input box for entering exact line length
   */
  private _inputBox: InputBoxComp;

  /**
   * Helper for snapping to geometric features
   */
  private _snapHelper: SnapHelper;

  /**
   * Get all visual elements managed by this gizmo
   * @returns Array of all drawable items
   */
  private get _elements(): Array<PathItem | InputBoxComp | EndPointItem>;

  /**
   * Render the current state of the gizmo
   */
  onDraw(): void;

  /**
   * Handle mouse movement to update preview
   * @param event - Mouse event with position and modifiers
   */
  mouseMoveHandler(event: MouseEventData): void;

  /**
   * Handle mouse clicks for point selection
   * @param event - Mouse event with button information
   */
  mouseClickHandler(event: MouseEventData): void;

  /**
   * Clean up resources when gizmo is destroyed
   */
  onCleanup(): void;

  /**
   * Process a click event (set start or create line)
   * @private
   */
  private _clickHandler(): void;

  /**
   * Update visual elements when viewport changes
   * @private
   */
  private _onViewBoxChanged(): void;

  /**
   * Cancel current operation and reset to initial state
   * @private
   */
  private _back(): void;
}

/**
 * Global function to update mouse cursor tooltip
 * @param text - Tooltip text (omit to hide)
 * @param position - Screen position for tooltip
 * @param style - Visual style configuration
 */
declare function updateMouseTips(
  text?: string,
  position?: TooltipOptions,
  style?: TooltipStyle
): void;

/**
 * Global resource manager for localized strings
 */
declare const ResourceManager: {
  /**
   * Get localized string by key
   * @param key - Resource key
   * @returns Localized string
   */
  getString(key: string): string;
};

/**
 * Application-level constants
 */
declare const HSFPConstants: {
  /** Request type constants for transaction system */
  RequestType: {
    /** Request to create an auxiliary line */
    CreateAuxiliaryLine: string;
  };
};

/**
 * Exported constants for rendering attributes
 */
export declare const AuxiAttr: AuxiAttr;
export declare const SnapAttr: SnapAttr;
export declare const AuxiEndPointAttr: AuxiEndPointAttr;