import { Vector3, Quaternion } from './Vector3Module';

/**
 * Enum representing the position or direction of a mark.
 * Used to define orientation in 3D space.
 */
export enum MarkPos {
  /** Upward direction */
  Up = 0,
  /** Downward direction */
  Down = 1,
  /** Left direction */
  Left = 2,
  /** Right direction */
  Right = 3
}

/**
 * Utility class for calculating quaternion transformations based on coordinate systems.
 * Provides methods to convert between different 3D coordinate spaces used for extrusion,
 * shape definitions, and marking systems.
 */
export default class MarkPosHelper {
  /** Default extrude X-axis direction: right (1, 0, 0) */
  static readonly ExtrudeX: Vector3;
  
  /** Default extrude Y-axis direction: up in world space (0, 0, 1) */
  static readonly ExtrudeY: Vector3;
  
  /** Default extrude Z-axis direction: backward (0, -1, 0) */
  static readonly ExtrudeZ: Vector3;
  
  /** Default shape X-axis direction: right (1, 0, 0) */
  static readonly defaultXShape: Vector3;
  
  /** Default shape Y-axis direction: forward (0, 1, 0) */
  static readonly defaultYShape: Vector3;
  
  /** Default shape Z-axis direction: up (0, 0, 1) */
  static readonly defaultZShape: Vector3;
  
  /** Mark coordinate system X-axis: right (1, 0, 0) */
  static readonly markX: Vector3;
  
  /** Mark coordinate system Y-axis: forward (0, 1, 0) */
  static readonly markY: Vector3;
  
  /** Mark coordinate system Z-axis: up (0, 0, 1) */
  static readonly markZ: Vector3;

  /**
   * Calculates the quaternion rotation from the default extrude coordinate system
   * to a target coordinate system defined by three axis vectors.
   * 
   * @param axes - Array of three Vector3 representing [X, Y, Z] axes of target system
   * @returns Quaternion representing the rotation transformation
   */
  static GetQuaternionFromExtrude(axes: [Vector3, Vector3, Vector3]): Quaternion;

  /**
   * Calculates the quaternion rotation from the default shape coordinate system
   * to a target coordinate system defined by three axis vectors.
   * 
   * @param axes - Array of three Vector3 representing [X, Y, Z] axes of target system
   * @returns Quaternion representing the rotation transformation
   */
  static GetTransferQuationFromShapeDefault(axes: [Vector3, Vector3, Vector3]): Quaternion;

  /**
   * Calculates the quaternion rotation from the mark coordinate system
   * to a target coordinate system defined by three axis vectors.
   * 
   * @param axes - Array of three Vector3 representing [X, Y, Z] axes of target system
   * @returns Quaternion representing the rotation transformation
   */
  static GetTransferQuationFromMark(axes: [Vector3, Vector3, Vector3]): Quaternion;

  /**
   * Calculates the quaternion rotation from the mark coordinate system
   * based on a predefined mark position direction.
   * 
   * @param position - The mark position direction (defaults to MarkPos.Down)
   * @returns Quaternion representing the rotation for the specified position
   * 
   * @remarks
   * - Up/Down: Uses Right, Backward, Up axes
   * - Left: Uses Up, Backward, Left axes
   * - Right: Uses Down, Backward, Right axes
   */
  static GetTransferQuationFromMarkPos(position?: MarkPos): Quaternion;
}