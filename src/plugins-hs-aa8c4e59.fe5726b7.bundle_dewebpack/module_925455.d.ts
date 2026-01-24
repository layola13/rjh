/**
 * Camera control command module
 * Handles first-person camera drag interactions and near-plane adjustments
 */

declare namespace HSApp.Cmd {
  /**
   * Base command class interface
   */
  class Command {
    /** Command manager reference */
    mgr: CommandManager;
  }
}

declare namespace HSCore.Util {
  /**
   * Signal/Event dispatcher for decoupled communication
   * @template T - The type of data dispatched by the signal
   */
  class Signal<T = void> {
    /**
     * Creates a new Signal instance
     * @param context - The context object for the signal
     */
    constructor(context?: any);

    /**
     * Dispatches the signal with optional data
     * @param data - Data to pass to signal listeners
     */
    dispatch(data?: T): void;
  }
}

declare namespace HSConstants {
  /**
   * Application-wide constant values
   */
  namespace Constants {
    /**
     * Maximum allowed value for first-person camera near clipping plane
     * Controls the minimum distance at which objects are rendered
     */
    const FIRSTPERSON_CAMERA_NEAR_MAX: number;
  }
}

/**
 * THREE.js Vector2 type from Three.js library
 */
declare namespace THREE {
  /**
   * 2D vector representation
   */
  class Vector2 {
    constructor(x?: number, y?: number);
    
    /**
     * Normalizes this vector (makes it unit length)
     * @returns This vector for chaining
     */
    normalize(): this;
    
    /**
     * Computes the dot product with another vector
     * @param v - The other vector
     * @returns The dot product result
     */
    dot(v: Vector2): number;
  }
}

/**
 * Camera state snapshot for undo/redo operations
 */
interface CameraSavedState {
  /** Camera X position */
  x: number;
  /** Camera Y position */
  y: number;
  /** Target X coordinate */
  target_x: number;
  /** Target Y coordinate */
  target_y: number;
  /** Near clipping plane distance */
  near: number;
}

/**
 * Camera object interface
 */
interface Camera {
  /** Current X position */
  x: number;
  /** Current Y position */
  y: number;
  /** Target X coordinate for movement */
  target_x: number;
  /** Target Y coordinate for movement */
  target_y: number;
  /** Near clipping plane distance */
  near: number;
}

/**
 * Drag event data payload
 */
interface DragEventData {
  /** Offset values [deltaX, deltaY] for drag operations */
  offset?: [number, number];
}

/**
 * Command manager interface
 */
interface CommandManager {
  /**
   * Marks the command as complete
   */
  complete(): void;
}

/**
 * First-person camera drag command
 * Handles drag-to-adjust-near-plane interactions for the camera
 * @extends HSApp.Cmd.Command
 */
declare class CameraDragCommand extends HSApp.Cmd.Command {
  /**
   * The camera being controlled
   */
  readonly camera: Camera;

  /**
   * Saved camera state for potential undo operations
   */
  readonly saved: CameraSavedState;

  /**
   * Signal dispatched when drag operation ends
   * Listeners receive the camera object
   */
  readonly signalDragEnd: HSCore.Util.Signal<Camera>;

  /**
   * Creates a new camera drag command
   * @param camera - The camera to control
   */
  constructor(camera: Camera);

  /**
   * Moves the camera target to specified coordinates
   * @param x - Target X coordinate
   * @param y - Target Y coordinate
   */
  moveTo(x: number, y: number): void;

  /**
   * Executes command initialization
   * Saves the current camera state before drag begins
   */
  onExecute(): void;

  /**
   * Handles incoming events during command execution
   * @param eventType - The type of event ('dragmove', 'dragend', etc.)
   * @param eventData - Event-specific data payload
   */
  onReceive(eventType: string, eventData: DragEventData): void;

  /**
   * Determines if this command supports undo/redo
   * @returns Always false - camera drag operations are not undoable
   */
  canUndoRedo(): boolean;
}

export default CameraDragCommand;