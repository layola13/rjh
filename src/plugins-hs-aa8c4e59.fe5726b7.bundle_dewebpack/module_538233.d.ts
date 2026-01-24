/**
 * Camera movement command that handles various camera manipulation operations
 * including drag movement, keyboard navigation, and automatic movement.
 */

/**
 * Camera type enumeration
 */
declare enum CameraTypeEnum {
  FirstPerson = 'FirstPerson',
  OrbitView = 'OrbitView'
}

/**
 * 2D Vector utility class
 */
declare class Vec2 {
  x: number;
  y: number;
  
  /**
   * Normalizes the vector to unit length
   */
  normalize(): void;
}

/**
 * Bounding box representation
 */
declare class BrepBound {
  left: number;
  top: number;
  width: number;
  height: number;
  
  /**
   * Copies properties from another bound
   */
  copy(other: BrepBound): void;
  
  /**
   * Expands the bound by specified margins
   */
  expandMargin(horizontalMargin: number, verticalMargin: number): BrepBound;
  
  /**
   * Checks if the bound has valid dimensions
   */
  isValid(): boolean;
}

/**
 * Camera model with position and target coordinates
 */
declare class Camera {
  type: CameraTypeEnum;
  x: number;
  y: number;
  target_x: number;
  target_y: number;
  bound: BrepBound;
  outline: number[][];
}

/**
 * Camera strategy interface for different camera behaviors
 */
declare interface ICameraStrategy {
  /**
   * Optional calculation method called when camera eye position moves
   */
  moveEyeCalc?(): void;
}

/**
 * First-person camera strategy implementation
 */
declare class FirstpersonCamera implements ICameraStrategy {
  constructor(camera: Camera);
  moveEyeCalc?(): void;
}

/**
 * Orbit camera strategy implementation
 */
declare class OrbitCamera implements ICameraStrategy {
  constructor(camera: Camera);
  moveEyeCalc?(): void;
}

/**
 * Wall entity with collision detection properties
 */
declare interface IWall {
  bound: BrepBound;
  outline: number[][];
}

/**
 * Scene layer containing walls and other entities
 */
declare interface ISceneLayer {
  bound: BrepBound;
}

/**
 * Scene containing active layer
 */
declare interface IScene {
  activeLayer: ISceneLayer;
}

/**
 * Floor plan containing scene and walls
 */
declare interface IFloorplan {
  scene: IScene;
  
  /**
   * Iterates over all walls in the floor plan
   */
  forEachWall(callback: (wall: IWall) => void): void;
}

/**
 * Command execution context containing optional parameters
 */
declare interface ICommandContext {
  /**
   * Enable wall collision snap behavior
   */
  wallSnapEnable?: boolean;
  
  /**
   * Whether to move camera target along with position
   */
  withTarget?: boolean;
}

/**
 * Event data for drag movements
 */
declare interface IDragEventData {
  /**
   * Movement offset as [x, y] tuple
   */
  offset?: [number, number];
}

/**
 * Event data for keyboard input
 */
declare interface IKeyEventData {
  /**
   * Key code of the pressed/released key
   */
  keyCode: number;
}

/**
 * Event data for position-based movement
 */
declare interface IMoveToEventData {
  position: {
    x: number;
    y: number;
  };
}

/**
 * Event data for frame updates
 */
declare interface IFrameEventData {
  /**
   * Delta time or frame number
   */
  [key: string]: any;
}

/**
 * Union type for all possible event data
 */
declare type EventData = IDragEventData | IKeyEventData | IMoveToEventData | IFrameEventData;

/**
 * Command manager interface
 */
declare interface ICommandManager {
  /**
   * Marks the command as complete
   */
  complete(): void;
}

/**
 * Saved camera state for movement calculations
 */
declare interface ISavedCameraState {
  x: number;
  y: number;
  target_x: number;
  target_y: number;
}

/**
 * Base command class
 */
declare class Command {
  /**
   * Command manager reference
   */
  mgr: ICommandManager;
  
  /**
   * Handles incoming events
   */
  onReceive(eventType: string, eventData: EventData): void;
}

/**
 * Offset calculation result mapping key codes to [x, y] offsets
 */
declare interface IOffsetMap {
  38: [number, number]; // Up arrow
  40: [number, number]; // Down arrow
  39: [number, number]; // Right arrow
  37: [number, number]; // Left arrow
}

/**
 * Camera movement command that handles drag, keyboard, and programmatic camera control.
 * Supports collision detection with walls and multiple camera strategies.
 */
declare class CameraMoveCommand extends Command {
  /**
   * The camera being controlled
   */
  readonly camera: Camera;
  
  /**
   * Saved camera state from command execution start
   */
  readonly saved: ISavedCameraState;
  
  /**
   * Accumulated keyboard movement offset
   */
  readonly keyMoveOffset: [number, number];
  
  /**
   * Array of currently pressed key codes
   */
  readonly pressedKey: number[];
  
  /**
   * Camera movement strategy based on camera type
   */
  readonly strategy: ICameraStrategy;
  
  /**
   * Whether wall collision snap is enabled
   */
  wallSnapEnable: boolean;
  
  /**
   * Whether to move camera target along with position
   */
  withTarget: boolean;
  
  /**
   * Model to screen coordinate conversion factor
   */
  private _modelToScreen: number;
  
  /**
   * Tracks whether camera moved in current frame
   */
  private _frameMoved: boolean;
  
  /**
   * Creates a new camera movement command
   * @param camera - The camera to control
   * @param svgElement - Optional SVG element for coordinate conversion
   */
  constructor(camera: Camera, svgElement?: SVGElement);
  
  /**
   * Moves camera to absolute coordinates
   * @param x - Target x coordinate
   * @param y - Target y coordinate
   */
  moveTo(x: number, y: number): void;
  
  /**
   * Moves camera by relative offset with collision detection
   * @param offsetX - X axis movement offset
   * @param offsetY - Y axis movement offset
   */
  move(offsetX: number, offsetY: number): void;
  
  /**
   * Called when command execution starts
   * @param context - Execution context with options
   */
  onExecute(context?: ICommandContext): void;
  
  /**
   * Handles various input events (drag, keyboard, frame updates)
   * @param eventType - Type of event ('dragmove', 'dragend', 'keydown', 'keyup', 'moveto', 'newframe')
   * @param eventData - Event-specific data
   */
  onReceive(eventType: string, eventData: EventData): void;
  
  /**
   * Moves camera based on pressed keys for smooth frame-based movement
   * @param frameData - Frame timing or delta information
   */
  private _moveCameraEachFrame(frameData: number | IFrameEventData): void;
  
  /**
   * Calculates movement offsets for arrow keys based on camera orientation
   * @param speed - Movement speed factor
   * @returns Map of key codes to [x, y] offset tuples
   */
  calculateOffset(speed: number): IOffsetMap;
  
  /**
   * Indicates this command cannot be undone/redone
   * @returns Always false
   */
  canUndoRedo(): false;
  
  /**
   * Indicates this is a transient command (not saved in history)
   * @returns Always true
   */
  isTransient(): true;
}

export default CameraMoveCommand;