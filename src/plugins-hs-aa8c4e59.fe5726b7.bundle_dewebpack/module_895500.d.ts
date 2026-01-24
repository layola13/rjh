/**
 * Camera control command for handling camera movements and rotations.
 * Supports both FirstPerson and OrbitView camera types with drag and rotation operations.
 */

import { CameraTypeEnum } from 'HSCore/Model';
import { Command } from 'HSApp/Cmd';
import { FirstpersonCamera, OrbitCamera } from 'HSApp/Camera';

/**
 * Saved camera state for restoration and delta calculations
 */
interface SavedCameraState {
  /** Camera X position */
  x?: number;
  /** Camera Y position */
  y?: number;
  /** Camera target X position */
  target_x?: number;
  /** Camera target Y position */
  target_y?: number;
}

/**
 * Event data for drag operations
 */
interface DragEventData {
  /** Offset values [x, y] from drag start position */
  offset?: [number, number];
  /** Original DOM event */
  event?: MouseEvent;
}

/**
 * Event data for rotation operations
 */
interface RotationEventData {
  /** Rotation angle in degrees */
  degree?: number;
}

/**
 * Camera movement strategy interface
 */
interface ICameraStrategy {
  /**
   * Move camera target in 2D space
   * @param saved - Saved camera state
   * @param offsetX - X-axis offset
   * @param offsetY - Y-axis offset
   */
  moveTarget2D(saved: SavedCameraState, offsetX: number, offsetY: number): void;
}

/**
 * Camera object interface
 */
interface ICamera {
  /** Current camera X position */
  x: number;
  /** Current camera Y position */
  y: number;
  /** Target X position for camera to look at */
  target_x: number;
  /** Target Y position for camera to look at */
  target_y: number;
  /** Camera type (FirstPerson or OrbitView) */
  type: CameraTypeEnum;
}

/**
 * Camera control command class that handles camera movements, rotations, and drag operations.
 * Implements different strategies based on camera type and provides angle snapping for FirstPerson cameras.
 */
declare class CameraControlCommand extends Command {
  /** The camera instance being controlled */
  camera: ICamera;
  
  /** Saved camera state for delta calculations */
  saved: SavedCameraState;
  
  /** Camera movement strategy based on camera type */
  strategy: ICameraStrategy;
  
  /** Last calculated rotation angle in degrees */
  lastAngle: number;

  /**
   * Creates a new camera control command
   * @param camera - The camera instance to control
   */
  constructor(camera: ICamera);

  /**
   * Move camera target to specified coordinates
   * @param x - Target X coordinate
   * @param y - Target Y coordinate
   */
  moveTo(x: number, y: number): void;

  /**
   * Execute command - saves current camera state
   */
  onExecute(): void;

  /**
   * Handle received events (dragmove, dragend, rotateByDeltaDegree)
   * @param eventType - Type of event received
   * @param eventData - Event-specific data
   */
  onReceive(
    eventType: 'dragmove' | 'dragend' | 'rotateByDeltaDegree',
    eventData: DragEventData | RotationEventData
  ): void;

  /**
   * Check if current active environment supports target-based camera control
   * @returns True if environment is Default, Render, ManualLighting, or SparkPicEnv
   */
  private _isTargetEnvironment(): boolean;

  /**
   * Calculate rotation angle from saved state with offset
   * @param savedState - Saved camera state
   * @param offset - Offset values [x, y]
   * @returns Calculated angle in degrees
   */
  private _calculateAngle(savedState: SavedCameraState, offset: [number, number]): number;

  /**
   * Find snapping angle if within threshold
   * @param angle - Current angle in degrees
   * @param threshold - Snapping threshold in degrees (default: 3)
   * @returns Snapped angle or undefined if no snap target found
   */
  private _findSnappingAngle(angle: number, threshold?: number): number | undefined;

  /**
   * Move camera by specified radian angle with visual feedback
   * @param angleInDegrees - Target angle in degrees
   * @param eventData - Event data containing mouse position for tooltip
   */
  private _moveCameraByRadian(angleInDegrees: number, eventData: DragEventData): void;

  /**
   * Rotate camera by delta degree around current position
   * @param deltaDegrees - Rotation amount in degrees
   */
  moveCameraByDeltaDegree(deltaDegrees: number): void;

  /**
   * Indicates whether this command can be undone/redone
   * @returns Always returns false
   */
  canUndoRedo(): boolean;
}

export default CameraControlCommand;