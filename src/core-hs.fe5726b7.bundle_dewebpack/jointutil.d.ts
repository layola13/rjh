import { JointType, AllTJoint, AllLJoint, DDBuilder } from './JointType';
import { WallFaceType } from './WallFaceType';
import { WallJoint, JointPointType } from './WallJoint';
import { MathUtil } from './MathUtil';
import { TgWallUtil } from './TgWallUtil';
import { Logger } from './Logger';

/**
 * Wall information interface containing wall geometry data
 */
interface WallInfo {
  /** The wall object */
  wall: Wall;
  /** The joint curve of the wall */
  curve: Curve;
  /** Width of the wall */
  width: number;
  /** Left boundary curve (reversed) */
  leftCurve: Curve;
  /** Right boundary curve */
  rightCurve: Curve;
}

/**
 * Wall-joint relationship information
 */
interface WallJointInfo {
  /** The wall object */
  wall: Wall;
  /** The joint point type (from/to/between) */
  type: JointPointType;
}

/**
 * Result of joint conversion operation
 */
interface ConversionResult {
  /** The converted joint object */
  convertedJoint: WallJoint;
}

/**
 * Options for querying wall joints
 */
interface WallJointQueryOptions {
  /** Include specific joint types */
  include?: JointType;
  /** Exclude specific joint types */
  exclude?: JointType;
}

/**
 * Wall object interface
 */
interface Wall {
  /** User-defined metadata */
  userData: {
    /** Face type tag */
    tag?: WallFaceType;
    /** Index in collection */
    index?: number;
  };
  /** Joint curve of the wall */
  jointCurve: Curve;
  /** Width of the wall */
  width: number;
  /** Left boundary curve */
  leftCurve: Curve;
  /** Right boundary curve */
  rightCurve: Curve;
  /** Curve at the 'from' end */
  fromCurve: Curve;
  /** Curve at the 'to' end */
  toCurve: Curve;
  /** Check if wall is arc-shaped */
  isArcWall(): boolean;
}

/**
 * Geometric curve interface
 */
interface Curve {
  /** Get the start point of the curve */
  getStartPt(): Point;
  /** Get the end point of the curve */
  getEndPt(): Point;
  /** Get a reversed copy of the curve */
  reversed(): Curve;
}

/**
 * 3D point interface
 */
interface Point {
  /** Calculate distance to another point */
  distanceTo(other: Point): number;
}

/**
 * Path container for DIY joints
 */
interface PathContainer {
  /** The geometric path */
  path?: Wall[];
}

/**
 * Utility class for managing wall joints in architectural modeling.
 * Provides methods for creating, converting, and manipulating various joint types (L-shaped, T-shaped, Tangent, etc.)
 */
declare class JointUtil {
  /**
   * Create DIY joints from a collection of wall groups
   * @param wallGroups - Collection of wall groups to process
   * @param pathMap - Optional map of path containers to wall arrays
   */
  static createDIYJoints(
    wallGroups: Map<Wall, JointPointType>[],
    pathMap?: Map<PathContainer, Wall[]>
  ): void;

  /**
   * Create a single DIY joint from a wall-type map
   * @param wallTypeMap - Map of walls to their joint point types
   */
  static createDIYJoint(wallTypeMap: Map<Wall, JointPointType>): void;

  /**
   * Convert DIY-type joints to X-type miter joints (internal implementation)
   * @param joints - Array of joints to convert
   * @returns Array of converted X-type joints
   */
  static _convertDIYTypeToXTypeJoints(joints: WallJoint[]): WallJoint[];

  /**
   * Convert DIY-type joints to X-type miter joints for specified walls
   * @param walls - Walls whose joints should be converted
   * @returns Array of converted joints
   */
  static convertDIYTypeToXTypeJoints(walls: Wall[]): WallJoint[];

  /**
   * Attempt to convert a joint to L-shape or T-shape
   * @param wall - The wall containing the joint
   * @param pointType - The point type on the wall
   * @param targetPointType - Optional target point type for conversion
   * @returns Conversion result if successful, undefined otherwise
   */
  static convertJointShape(
    wall: Wall,
    pointType: JointPointType,
    targetPointType?: JointPointType
  ): ConversionResult | undefined;

  /**
   * Convert a joint to L-shape
   * @param wall - The wall containing the joint
   * @param pointType - The point type on the wall
   * @param targetPointType - Optional target point type
   * @returns Conversion result if successful, undefined otherwise
   */
  static convertToLShape(
    wall: Wall,
    pointType: JointPointType,
    targetPointType?: JointPointType
  ): ConversionResult | undefined;

  /**
   * Convert a joint to T-shape
   * @param wall - The wall containing the joint
   * @param pointType - The point type on the wall
   * @returns Conversion result if successful, undefined otherwise
   */
  static convertToTShape(
    wall: Wall,
    pointType: JointPointType
  ): ConversionResult | undefined;

  /**
   * Convert L-shaped joint to T-shaped joint
   * @param wall - The wall containing the joint
   * @param pointType - The point type on the wall
   * @returns Conversion result if successful, undefined otherwise
   */
  static convertLShapeToTShape(
    wall: Wall,
    pointType: JointPointType
  ): ConversionResult | undefined;

  /**
   * Convert T-shaped joint to L-shaped joint
   * @param wall - The wall containing the joint
   * @param pointType - The point type on the wall
   * @param targetPointType - Optional target point type
   * @param useDefaultType - Whether to use default L-type if no intersection found
   * @returns Conversion result if successful, undefined otherwise
   */
  static convertTShapeToLShape(
    wall: Wall,
    pointType: JointPointType,
    targetPointType?: JointPointType,
    useDefaultType?: boolean
  ): ConversionResult | undefined;

  /**
   * Convert tangent-shaped joint to L-shaped joint
   * @param wall - The wall containing the joint
   * @param pointType - The point type on the wall
   * @param forceConvert - Force conversion even if geometry doesn't suggest L-shape
   * @returns Conversion result if successful, undefined otherwise
   */
  static convertTangentShapeToLShape(
    wall: Wall,
    pointType: JointPointType,
    forceConvert?: boolean
  ): ConversionResult | undefined;

  /**
   * Convert L-shaped joint to tangent-shaped joint
   * @param wall - The wall containing the joint
   * @param pointType - The point type on the wall
   * @returns Conversion result if successful, undefined otherwise
   */
  static convertLShapeToTangentShape(
    wall: Wall,
    pointType: JointPointType
  ): ConversionResult | undefined;

  /**
   * Convert L-shaped joint to another L-shaped joint configuration
   * @param wall - The wall containing the joint
   * @param pointType - The point type on the wall
   * @returns Conversion result if successful, undefined otherwise
   */
  static convertLShapeToLShape(
    wall: Wall,
    pointType: JointPointType
  ): ConversionResult | undefined;

  /**
   * Internal: Convert L-shaped joint to another L-shape configuration
   * @param joint - The joint to convert
   * @param targetType - Optional target joint type
   * @returns The converted joint or undefined
   */
  static _convertLShapeToLShape(
    joint: WallJoint,
    targetType?: JointType
  ): WallJoint | undefined;

  /**
   * Internal: Convert tangent joint to L-shaped joint
   * @param joint - The joint to convert
   * @param targetType - The target joint type
   * @returns The converted joint or undefined
   */
  static _convertTangentShapeToLShape(
    joint: WallJoint,
    targetType: JointType
  ): WallJoint | undefined;

  /**
   * Internal: Convert L-shaped joint to tangent joint
   * @param joint - The joint to convert
   * @returns The converted joint or undefined
   */
  static _convertLShapeToTangentShape(joint: WallJoint): WallJoint | undefined;

  /**
   * Internal: Convert L-shaped joint to T-shaped joint
   * @param joint - The joint to convert
   * @param targetWall - The wall that becomes the T-bar
   * @param targetType - The target joint type
   * @returns The converted joint or undefined
   */
  static _convertLShapeToTShape(
    joint: WallJoint,
    targetWall: Wall,
    targetType: JointType
  ): WallJoint | undefined;

  /**
   * Internal: Convert T-shaped joint to L-shaped joint
   * @param joint - The joint to convert
   * @param pointType - The point type for the new configuration
   * @param targetType - The target joint type
   * @returns The converted joint or undefined
   */
  static _convertTShapeToLShape(
    joint: WallJoint,
    pointType: JointPointType,
    targetType: JointType
  ): WallJoint | undefined;

  /**
   * Convert L-type joint to between-point T-type joint
   * @param joint - The joint to convert
   * @param betweenWall - The wall that becomes the T-bar
   * @param targetType - Optional target T-type
   * @returns The converted joint or undefined
   */
  static convertLTypeToBetweenTType(
    joint: WallJoint,
    betweenWall: Wall,
    targetType?: JointType
  ): WallJoint | undefined;

  /**
   * Convert end-point T-type joint to between-point T-type joint
   * @param joint - The joint to convert
   * @param betweenWall - The wall that becomes the T-bar
   * @param targetType - Optional target T-type
   * @returns The converted joint or undefined
   */
  static convertEndTTypeToBetweenTType(
    joint: WallJoint,
    betweenWall: Wall,
    targetType?: JointType
  ): WallJoint | undefined;

  /**
   * Convert between-point T-type joint to L-type joint
   * @param joint - The joint to convert
   * @param pointType - The new end point type
   * @param targetType - Optional target L-type
   * @returns The converted joint or undefined
   */
  static convertBetweenTTypeToLType(
    joint: WallJoint,
    pointType: JointPointType,
    targetType?: JointType
  ): WallJoint | undefined;

  /**
   * Convert between-point T-type joint to end-point T-type joint
   * @param joint - The joint to convert
   * @param pointType - The new end point type
   * @param targetType - Optional target T-type
   * @returns The converted joint or undefined
   */
  static convertBetweenTTypeToEndTType(
    joint: WallJoint,
    pointType: JointPointType,
    targetType?: JointType
  ): WallJoint | undefined;

  /**
   * Convert end-point T-type joint to L-type joint
   * @param joint - The joint to convert
   * @param targetType - Optional target L-type (defaults to LCross|LMiter)
   * @returns The converted joint or undefined
   */
  static convertEndTTypeToLType(
    joint: WallJoint,
    targetType?: JointType
  ): WallJoint | undefined;

  /**
   * Convert tangent-type joint to L-type joint
   * @param joint - The joint to convert
   * @param targetType - Optional target L-type (defaults to LCross|LMiter)
   * @returns The converted joint or undefined
   */
  static convertTangentTypeToLType(
    joint: WallJoint,
    targetType?: JointType
  ): WallJoint | undefined;

  /**
   * Convert L-type joint to tangent-type joint
   * @param joint - The joint to convert
   * @returns The converted joint or undefined
   */
  static convertLTypeToTangentType(joint: WallJoint): WallJoint | undefined;

  /**
   * Check if point type represents the 'from' end
   * @param pointType - The point type to check
   * @returns True if point type is 'from'
   */
  static isFromPointType(pointType: JointPointType): boolean;

  /**
   * Check if point type represents the 'to' end
   * @param pointType - The point type to check
   * @returns True if point type is 'to'
   */
  static isToPointType(pointType: JointPointType): boolean;

  /**
   * Get the end point type based on a boolean flag
   * @param isFrom - True for 'from', false for 'to'
   * @returns The corresponding JointPointType
   */
  static getEndPointType(isFrom: boolean): JointPointType;

  /**
   * Check if joint is L-shaped (not T-shaped and not tangent)
   * @param joint - The joint to check
   * @returns True if joint is L-shaped
   */
  static isLShapedJoint(joint: WallJoint): boolean;

  /**
   * Check if joint is T-shaped (has a between-point wall)
   * @param joint - The joint to check
   * @returns True if joint is T-shaped
   */
  static isTShapedJoint(joint: WallJoint): boolean;

  /**
   * Check if joint is L-shaped T-joint (T-type but without between-point)
   * @param joint - The joint to check
   * @returns True if joint is L-shaped T-joint
   */
  static isLShapedTJoint(joint: WallJoint): boolean;

  /**
   * Get the primary (subject) wall info from a joint
   * @param joint - The joint to query
   * @returns The wall info of the subject wall
   */
  static getSubjectWallInfo(joint: WallJoint): WallJointInfo;

  /**
   * Get all joints linked to a point on specified walls
   * @param walls - Walls to search
   * @param pointType - Optional point type filter
   * @returns Array of linked joints
   */
  static getPointLinkedJoints(
    walls: Wall[],
    pointType?: JointPointType
  ): WallJoint[];

  /**
   * Get all walls linked to a specific point on a wall
   * @param wall - The wall to query
   * @param pointType - The point type on the wall
   * @returns Array of linked walls (excluding tangent joints)
   */
  static getPointLinkedWalls(wall: Wall, pointType: JointPointType): Wall[];

  /**
   * Calculate the intersection point between two walls
   * @param wallInfo1 - First wall information
   * @param wallInfo2 - Second wall information
   * @param isFromPoint - Whether to use the 'from' point of wallInfo2
   * @param maxDistance - Maximum allowed distance (default: Infinity)
   * @returns The intersection point or undefined if not found/too far
   */
  static getJointPoint(
    wallInfo1: WallInfo,
    wallInfo2: WallInfo,
    isFromPoint: boolean,
    maxDistance?: number
  ): Point | undefined;

  /**
   * Convert L-uncross joints to L-cross joints
   * @param joints - Joints to convert
   */
  static convertLUncrossToLCross(joints: WallJoint[]): void;

  /**
   * Convert L-cross joints to L-uncross joints
   * @param joints - Joints to convert
   */
  static convertLCrossToLUncross(joints: WallJoint[]): void;

  /**
   * Convert T-uncross joints to T-cross joints
   * @param joints - Joints to convert
   */
  static convertTUncrossToTCross(joints: WallJoint[]): void;

  /**
   * Convert T-cross joints to T-uncross joints
   * @param joints - Joints to convert
   */
  static convertTCrossToTUncross(joints: WallJoint[]): void;

  /**
   * Convert all cross-type joints to uncross-type joints
   * @param joints - Joints to convert
   */
  static convertCrossToUncross(joints: WallJoint[]): void;

  /**
   * Convert all uncross-type joints to cross-type joints
   * @param joints - Joints to convert
   */
  static convertUnCrossToCross(joints: WallJoint[]): void;

  /**
   * Extract wall information for joint processing
   * @param wall - The wall to extract info from
   * @returns Wall information object
   */
  static getWallInfo(wall: Wall): WallInfo;

  /**
   * Get the default L-type joint flags
   * @returns Default L-type (LCross | LMiter)
   */
  static getDefaultLType(): JointType;

  /**
   * Extract L-type flags from a joint type, ensuring cross variant
   * @param jointType - The joint type to process
   * @returns L-type flags with cross variant
   */
  static getLType(jointType: JointType): JointType;

  /**
   * Get the default T-type joint flags
   * @returns Default T-type (TCross)
   */
  static getDefaultTType(): JointType;

  /**
   * Extract T-type flags from a joint type, ensuring cross variant
   * @param jointType - The joint type to process
   * @returns T-type flags with cross variant
   */
  static getTType(jointType: JointType): JointType;

  /**
   * Check if joint type contains L-type flags
   * @param jointType - The joint type to check
   * @returns True if contains L-type flags
   */
  static isLType(jointType: JointType): boolean;

  /**
   * Check if joint type contains T-type flags
   * @param jointType - The joint type to check
   * @returns True if contains T-type flags
   */
  static isTType(jointType: JointType): boolean;

  /**
   * Update joints when a wall switches between arc and straight
   * @param wall - The wall that changed shape
   */
  static covertJointsForArcSwitch(wall: Wall): void;

  /**
   * Check if a joint is valid for processing (not tangent, and if T-type, properly linked)
   * @param joint - The joint to validate
   * @returns True if joint is valid for processing
   */
  static isValidProcessJoint(joint: WallJoint): boolean;
}

export { JointUtil };