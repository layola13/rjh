/**
 * Camera horizontal field of view (FOV) control command
 * Manages FOV adjustments for FirstPerson and OrbitView camera types
 */

/**
 * Camera type enumeration
 */
declare namespace HSCore.Model {
  enum CameraTypeEnum {
    FirstPerson = 'FirstPerson',
    OrbitView = 'OrbitView'
  }
}

/**
 * Camera constants defining FOV ranges
 */
declare namespace HSConstants {
  namespace Constants {
    /** Maximum horizontal FOV for first-person camera (in degrees) */
    const FIRSTPERSON_CAMERA_HORIZONTAL_FOV_MAX: number;
    
    /** Minimum horizontal FOV for first-person camera (in degrees) */
    const FIRSTPERSON_CAMERA_HORIZONTAL_FOV_MIN: number;
    
    /** Maximum horizontal FOV for orbit-view camera (in degrees) */
    const ORBITVIEW_CAMERA_HORIZONTAL_FOV_MAX: number;
    
    /** Minimum horizontal FOV for orbit-view camera (in degrees) */
    const ORBITVIEW_CAMERA_HORIZONTAL_FOV_MIN: number;
  }
}

/**
 * Camera interface with FOV control
 */
interface Camera {
  /** Camera type (FirstPerson or OrbitView) */
  type: HSCore.Model.CameraTypeEnum;
  
  /** Current horizontal field of view in degrees */
  horizontal_fov: number;
}

/**
 * Command message payload for updating FOV
 */
interface UpdateHorizontalFovPayload {
  /** New FOV value in degrees */
  value: number;
}

/**
 * Command message payload for accumulating FOV changes
 */
interface AccumulateHorizontalFovPayload {
  /** Delta value to add to current FOV */
  delta: number;
}

/**
 * Union type for all possible command payloads
 */
type CommandPayload = UpdateHorizontalFovPayload | AccumulateHorizontalFovPayload;

/**
 * Base command class from HSApp framework
 */
declare namespace HSApp.Cmd {
  class Command {
    /**
     * Execute the command
     */
    onExecute(): void;
    
    /**
     * Receive and process command messages
     * @param messageType - Type of the command message
     * @param payload - Command payload data
     * @returns Whether the command was successfully processed
     */
    onReceive(messageType: string, payload: unknown): boolean;
    
    /**
     * Check if this command supports undo/redo operations
     * @returns true if undo/redo is supported
     */
    canUndoRedo(): boolean;
  }
}

/**
 * Camera horizontal FOV control command
 * Extends the base Command class to provide FOV manipulation functionality
 */
declare class CameraHorizontalFovCommand extends HSApp.Cmd.Command {
  /**
   * The camera instance being controlled
   */
  readonly camera: Camera;
  
  /**
   * Maximum allowed horizontal FOV for the current camera type (in degrees)
   * @private
   */
  private _maxHorizontalFov: number;
  
  /**
   * Minimum allowed horizontal FOV for the current camera type (in degrees)
   * @private
   */
  private _minHorizontalFov: number;
  
  /**
   * Conversion factor from length units to angle degrees
   * Calculated as: 1 / (maxFov - minFov)
   * @private
   */
  private _lengthToAngleFactor: number;
  
  /**
   * Create a new camera FOV control command
   * @param camera - Camera instance to control
   */
  constructor(camera: Camera);
  
  /**
   * Initialize horizontal FOV range based on camera type
   * Sets min/max FOV limits and calculates the length-to-angle conversion factor
   * @param cameraType - Type of camera (FirstPerson or OrbitView)
   * @private
   */
  private _buildHorizontalFovRange(cameraType: HSCore.Model.CameraTypeEnum): void;
  
  /**
   * Directly update camera's horizontal FOV to a specific value
   * @param fovValue - New FOV value in degrees
   * @private
   */
  private _updateCameraHorizontalFov(fovValue: number): void;
  
  /**
   * Accumulate (add) a delta value to the current horizontal FOV
   * Clamps the result to min/max FOV range
   * @param delta - Delta value to add (will be converted using length-to-angle factor)
   * @private
   */
  private _accumulateCameraHorizontalFov(delta: number): void;
  
  /**
   * Execute the command (no-op for this command type)
   */
  onExecute(): void;
  
  /**
   * Receive and process FOV-related command messages
   * @param messageType - Command message type:
   *   - "update_horizontal_fov": Set FOV to a specific value
   *   - "accumulate_horizontal_fov": Add a delta to current FOV
   * @param payload - Command payload containing value or delta
   * @returns true if message was processed successfully
   */
  onReceive(
    messageType: 'update_horizontal_fov',
    payload: UpdateHorizontalFovPayload
  ): boolean;
  onReceive(
    messageType: 'accumulate_horizontal_fov',
    payload: AccumulateHorizontalFovPayload
  ): boolean;
  onReceive(messageType: string, payload: CommandPayload): boolean;
  
  /**
   * Check if this command supports undo/redo
   * @returns false - FOV changes are not undoable
   */
  canUndoRedo(): boolean;
}

export default CameraHorizontalFovCommand;