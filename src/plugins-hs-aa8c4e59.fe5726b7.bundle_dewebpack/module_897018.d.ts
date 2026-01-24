/**
 * Camera control command module
 * Handles camera movement, rotation, and interaction in 3D view
 */

import HSCore from './HSCore';
import HSApp from './HSApp';
import HSFPConstants from './HSFPConstants';
import TWEEN from '@tweenjs/tween.js';
import * as THREE from 'three';

/** 3D point coordinates */
interface Point3D {
  x: number;
  y: number;
  z: number;
}

/** 2D point coordinates */
interface Point2D {
  x: number;
  y: number;
}

/** Camera position and target data */
interface CameraPositionData {
  position?: Point3D;
  target?: Point3D;
  updatePitch?: boolean;
}

/** Mouse drag state for different buttons */
interface MouseDragState {
  left: boolean;
  middle: boolean;
  right: boolean;
}

/** Bounding box dimensions */
interface BoundingBox {
  center: Point3D;
  size: Point3D;
}

/** Command parameters for camera initialization */
interface CameraCommandParams {
  event?: MouseEvent;
  factor?: number;
  [key: string]: any;
}

/** Camera movement result data */
interface CameraMoveData {
  position?: Point3D;
  target?: Point3D;
  delta?: Point3D;
  zoom?: number;
  pitch?: number;
}

/** Event data for camera interactions */
interface CameraEventData {
  event?: MouseEvent | WheelEvent;
  entity?: any;
  factor?: number;
  needChangeRatio?: boolean;
  type?: string;
  value?: number;
  toward?: string;
  pitch?: number;
  snap?: boolean;
  degree?: number;
  cameraData?: Partial<HSCore.Model.Camera>;
  options?: FitCameraOptions;
  cameraObj?: Partial<HSCore.Model.Camera>;
}

/** Options for camera fitting operations */
interface FitCameraOptions {
  fitFactor?: number;
  targetRoom?: any;
  fitContent?: any;
  fitLayer?: any;
}

/** Camera strategy interface for different camera modes */
interface ICameraStrategy {
  initParam(params: any): void;
  calcMoveData(direction: Point3D, speed: number): CameraMoveData | null;
  calcDragData(data: CameraEventData): CameraMoveData | null;
  calcMiddleDragData(data: CameraEventData): CameraMoveData | null;
  fitScreen?(factor: number): void;
  fitEntity?(factor: number): void;
  changeCameraZoom?(delta: number): void;
  changeCameraZDistance?(delta: number): void;
  setCameraPosition?(pitch: number, distance: number): void;
  fitDistance?(factor: number, target?: any): void;
  computeFit?(currentPos: CameraPositionData, fov: number, bounds: BoundingBox): CameraPositionData;
  updateParam?(): void;
  distance?: number;
}

/**
 * Camera control command class
 * Manages camera movement, rotation, and view interactions
 */
declare class CameraCommand extends HSApp.Cmd.Command {
  /** The controlled camera instance */
  camera: HSCore.Model.Camera;
  
  /** Original camera pitch when command started */
  cameraOriginPitch: number;
  
  /** Original mouse position when drag started */
  mouseOriginPoint: Point2D;
  
  /** Current mouse button drag states */
  mouseDragOn: MouseDragState;
  
  /** Command initialization parameters */
  private _param: CameraCommandParams;
  
  /** Whether mouse button is currently pressed */
  private _isMouseDown: boolean;
  
  /** Signal dispatched when drag ends */
  signalDragEnd: HSCore.Util.Signal;
  
  /** Signal dispatched when key is released */
  signalKeyUp: HSCore.Util.Signal;
  
  /** Signal dispatched during drag movement */
  signalDragMoving: HSCore.Util.Signal;
  
  /** Signal dispatched when camera moves in render mode (optional) */
  signalRenderCameraMoving?: HSCore.Util.Signal;
  
  /** Mouse button configuration (0: standard, 1: swapped left/right) */
  mouseLeftAndRightButtonSetting: number;
  
  /** Camera control strategy based on camera type */
  strategy: ICameraStrategy;
  
  /** Whether pitch snapping is enabled (render mode only) */
  bPitchSnap?: boolean;
  
  /** Animation time accumulator */
  time: number;
  
  /** Whether resolution ratio needs to change during movement */
  needChangeRatio: boolean;
  
  /** Last recorded camera position [x, y, z] */
  private _lastPosition: [number, number, number];
  
  /** Last recorded camera target position [x, y, z] */
  private _lastTargetPos: [number, number, number];
  
  /** Reference to view camera control */
  cameraControl?: HSApp.View.ViewControl;

  /**
   * Creates a new camera command
   * @param camera - The camera to control
   * @param params - Initialization parameters including event data
   */
  constructor(camera: HSCore.Model.Camera, params?: CameraCommandParams);

  /**
   * Checks if mouse button is currently pressed
   * @returns True if mouse is down
   */
  isMouseDown(): boolean;

  /**
   * Handles camera drag movement
   * @param moveData - Camera movement data
   */
  cameraDragMove(moveData: CameraMoveData): void;

  /**
   * Moves camera to specified position/target
   * @param moveData - Target position and rotation data
   */
  cameraMoveTo(moveData: CameraPositionData): void;

  /**
   * Animates camera movement to target position
   * @param targetData - Final camera position and target
   */
  cameraAnimateMoveTo(targetData: CameraPositionData): void;

  /**
   * Moves camera target point
   * @param target - New target coordinates
   */
  moveTargetTo(target: Point3D): void;

  /**
   * Moves camera position
   * @param position - New camera coordinates
   */
  movePositionTo(position: Point3D): void;

  /**
   * Updates camera pitch based on current position and target
   */
  updatePitch(): void;

  /**
   * Applies pitch snapping to align with cardinal angles
   * @param pitch - Input pitch in degrees
   * @param enableSnap - Whether to apply snapping (default: true)
   * @returns Snapped pitch value
   */
  pitchWithSnap(pitch: number, enableSnap?: boolean): number;

  /**
   * Moves camera and target by delta amounts
   * @param deltaX - X-axis movement
   * @param deltaY - Y-axis movement
   * @param deltaZ - Z-axis movement
   */
  move(deltaX: number, deltaY: number, deltaZ: number): void;

  /**
   * Moves camera along a single axis
   * @param axis - Axis to move along ('x', 'y', or 'z')
   * @param value - New position value
   */
  moveAlongAxis(axis: 'x' | 'y' | 'z', value: number): void;

  /**
   * Executes command initialization
   */
  onExecute(): void;

  /**
   * Moves camera in specified direction
   * @param direction - Movement direction constant
   */
  private _moveToward(direction: string): void;

  /**
   * Executes camera movement with speed and direction
   * @param speed - Movement speed
   * @param direction - Normalized direction vector
   */
  private _moveCamera(speed: number, direction: Point3D): void;

  /**
   * Dispatches camera movement event signal
   */
  private _cameraMovingDispatch(): void;

  /**
   * Fits camera to view entire entity
   * @param entity - Content or entity to fit in view
   */
  fitCameraToEntity(entity: HSCore.Model.Content | any): void;

  /**
   * Rotates camera around target by angle
   * @param degrees - Rotation angle in degrees
   */
  rotateCameraByDeltaDegree(degrees: number): void;

  /**
   * Receives and processes camera command events
   * @param eventType - Type of event to process
   * @param eventData - Event-specific data
   * @returns True if event was handled
   */
  onReceive(eventType: string, eventData?: CameraEventData): boolean;

  /**
   * Updates camera movement and resolution ratio per frame
   * @param deltaTime - Time elapsed since last frame
   */
  private _moveAndChangeRatio(deltaTime: number): void;

  /**
   * Calculates movement direction from pressed keys
   * @returns Normalized direction vector
   */
  private _calcMoveDirecion(): Point3D;

  /**
   * Smoothly transitions camera to new view
   * @param options - Target camera state and transition options
   */
  cameraViewSwitch(options: { cameraObj: Partial<HSCore.Model.Camera> }): void;

  /**
   * Fits camera to specified target with options
   * @param options - Camera data and fit options
   */
  fitCamera(options: { cameraData: Partial<HSCore.Model.Camera>; options: FitCameraOptions }): void;

  /**
   * Checks if camera is currently being dragged
   * @returns True if drag is active
   */
  isDraging(): boolean;

  /**
   * Called when command completes
   */
  onComplete(): void;

  /**
   * Cleanup operations when command ends
   */
  onCleanup(): void;

  /**
   * Whether this command can be undone/redone
   * @returns Always false for camera commands
   */
  canUndoRedo(): boolean;

  /**
   * Whether this command can be suspended
   * @returns Always false for camera commands
   */
  canSuspend(): boolean;

  /**
   * Whether this is a transient command
   * @returns Always true for camera commands
   */
  isTransient(): boolean;
}

export default CameraCommand;