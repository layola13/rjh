/**
 * Corner generation and management module for 3D scenes
 * Handles corner meshes, wall corners, and frame intersections
 */

import { Scene, TransformNode, Vector2, Vector3, Vector4, Angle, Mesh } from '@babylonjs/core';

/**
 * Point-like object with x, y coordinates
 */
export interface Point2D {
  x: number;
  y: number;
}

/**
 * Corner definition
 */
export interface Corner {
  /** Unique identifier */
  id?: string;
  /** Starting point */
  startPt: Point2D;
  /** Ending point */
  endPt: Point2D;
  /** Width/height dimension */
  wh?: number;
  /** Corner angle in degrees */
  angle: number;
  /** Host frame identifier */
  hostFrameId: string;
  /** Related frame identifiers */
  cornerFrameIds: string[];
  /** Corner type (e.g., 'WallCornerJoiner', 'CornerJoiner', 'PanoramicCorner') */
  type?: string;
  /** Whether to generate a square corner */
  squareCorner?: boolean;
}

/**
 * Frame definition
 */
export interface Frame {
  /** Unique identifier */
  id: string;
  /** Anchor point */
  anchor: Point2D;
  /** Arc height for 3D frames */
  arcHeight?: number;
}

/**
 * Wall definition
 */
export interface Wall {
  /** Unique identifier */
  id: string;
  /** Wall points */
  pts: Point2D[];
}

/**
 * Scene configuration data
 */
export interface SceneData {
  /** Array of frames in the scene */
  frames: Frame[];
  /** Array of walls in the scene */
  walls: Wall[];
  /** Whether background wall is enabled */
  bgWall?: boolean;
}

/**
 * Dimension parameters for corner generation
 */
export interface DimensionParams {
  /** Center position */
  center_pos: Point2D;
  /** Frame depth */
  frame_depth: number;
  /** Wall depth */
  wall_depth: number;
  /** Corner group collection */
  cornerGroup: CornerGroup[];
  /** Object group collection */
  objGroup: TransformNode[];
}

/**
 * Corner group data structure
 */
export interface CornerGroup {
  /** Corner definition */
  corner: Corner;
  /** Root corner mesh node */
  cornerMesh: TransformNode;
  /** Corner group mesh node */
  cornerGroupMesh: TransformNode;
  /** 3D mesh for corner frame intersection */
  threeDMeshCorner?: TransformNode;
  /** Radian value for 3D corner */
  threeDMeshCornerRadian: number;
  /** 3D mesh for host frame */
  threeDMeshHost?: TransformNode;
  /** Radian value for 3D host */
  threeDMeshHostRadian: number;
}

/**
 * Corner generation options
 */
export interface CornerOptions {
  /** Whether to generate a square corner */
  squareCorner?: boolean;
  /** Corner type identifier */
  cornerType?: string;
}

/**
 * Extrusion shape configuration
 */
export interface ExtrudeShapeConfig {
  /** 2D shape points */
  shape2d: Vector2[];
  /** Shape pivot point type */
  shapePivot?: ShapePivotPoint;
  /** Material reference */
  mat: Material;
  /** Shape offset */
  offset?: Vector2;
  /** Face UV mapping array */
  faceUV?: Vector4[];
}

/**
 * Shape pivot point enumeration
 */
export enum ShapePivotPoint {
  LeftDown = 'LeftDown',
  Center = 'Center',
}

/**
 * Profile type enumeration
 */
export enum ProfileTypesEnum {
  LXCIN = 'LXCIN',
  LXCOUT = 'LXCOUT',
  BrickWallOut = 'BrickWallOut',
  BrickWallIn = 'BrickWallIn',
}

/**
 * UV calculation mode enumeration
 */
export enum ModeCalFaceUVEnum {
  FixedU = 'FixedU',
  FixedUV = 'FixedUV',
}

/**
 * Material reference type
 */
export type Material = unknown;

/**
 * Corner extension utility class
 * Generates corner meshes, wall corners, and handles frame intersections
 */
export default class CornerExtension {
  /** Babylon.js scene reference */
  private static scene: Scene;

  /** Offset value for calculations (in meters) */
  static readonly offsetValue: number = 0.1;

  /** Cross frame threshold for corner detection */
  static readonly cornerCrossFrame: number = 0.2;

  /** Whether to use circular corner interpolation */
  static readonly isCircle: boolean = true;

  /**
   * Initialize the corner extension with a scene
   * @param scene - Babylon.js scene instance
   */
  static Init(scene: Scene): void;

  /**
   * Generate corner meshes for all corners in the scene
   * @param corners - Array of corner definitions
   * @param parentNode - Parent transform node for all corners
   * @param dimensions - Dimension parameters (depths, center position, etc.)
   * @param sceneData - Scene data containing frames and walls
   */
  static GenCorners(
    corners: Corner[],
    parentNode: TransformNode,
    dimensions: DimensionParams,
    sceneData: SceneData
  ): void;

  /**
   * Generate a corner mesh (in meters)
   * @param startPoint - Starting point (in meters)
   * @param endPoint - Ending point (in meters)
   * @param width - Corner width (default: 0.075m)
   * @param depth - Frame depth (default: 0.1m)
   * @param angle - Corner angle in degrees (default: 90°)
   * @param isLeft - Whether corner is on left side (default: true)
   * @param options - Additional corner options
   * @returns Corner mesh transform node
   */
  static GenCornerM(
    startPoint: Vector2,
    endPoint: Vector2,
    width?: number,
    depth?: number,
    angle?: number,
    isLeft?: boolean,
    options?: CornerOptions
  ): TransformNode | undefined;

  /**
   * Generate a corner mesh (in scene units, 1 unit = 10cm)
   * @param startPoint - Starting point (in scene units)
   * @param endPoint - Ending point (in scene units)
   * @param width - Corner width (default: 0.75 scene units)
   * @param depth - Frame depth (default: 1 scene unit)
   * @param angle - Corner angle in degrees (default: 90°)
   * @param isLeft - Whether corner is on left side (default: true)
   * @param options - Additional corner options
   * @returns Corner mesh transform node
   */
  static GenCorner(
    startPoint: Vector2,
    endPoint: Vector2,
    width?: number,
    depth?: number,
    angle?: number,
    isLeft?: boolean,
    options?: CornerOptions
  ): TransformNode | undefined;

  /**
   * Generate a wall corner mesh (in meters)
   * @param startPoint - Starting point (in meters)
   * @param endPoint - Ending point (in meters)
   * @param width - Corner width (default: 0.075m)
   * @param frameDepth - Frame depth (default: 0.1m)
   * @param angle - Corner angle in degrees (default: 90°)
   * @param isLeft - Whether corner is on left side (default: true)
   * @param wallDepth - Wall depth (default: 0.2m)
   * @returns Wall corner mesh transform node
   */
  static GenCornerWallM(
    startPoint: Vector2,
    endPoint: Vector2,
    width?: number,
    frameDepth?: number,
    angle?: number,
    isLeft?: boolean,
    wallDepth?: number
  ): TransformNode | undefined;

  /**
   * Generate a wall corner mesh (in scene units)
   * @param startPoint - Starting point (in scene units)
   * @param endPoint - Ending point (in scene units)
   * @param width - Corner width (default: 0 scene units)
   * @param frameDepth - Frame depth (default: 1 scene unit)
   * @param angle - Corner angle in degrees (default: 90°)
   * @param isLeft - Whether corner is on left side (default: true)
   * @param wallDepth - Wall depth (default: 2 scene units)
   * @returns Wall corner mesh transform node
   */
  static GenCornerWall(
    startPoint: Vector2,
    endPoint: Vector2,
    width?: number,
    frameDepth?: number,
    angle?: number,
    isLeft?: boolean,
    wallDepth?: number
  ): TransformNode | undefined;

  /**
   * Generate an inner wall corner mesh (in meters)
   * Used for angled corner intersections
   * @param startPoint - Starting point (in meters)
   * @param endPoint - Ending point (in meters)
   * @param width - Corner width (default: 0.075m)
   * @param frameDepth - Frame depth (default: 0.1m)
   * @param angle - Corner angle in degrees (default: 90°)
   * @param isLeft - Whether corner is on left side (default: true)
   * @param wallDepth - Wall depth (default: 0.2m)
   * @returns Inner wall corner mesh transform node
   */
  static GenCornerWallInM(
    startPoint: Vector2,
    endPoint: Vector2,
    width?: number,
    frameDepth?: number,
    angle?: number,
    isLeft?: boolean,
    wallDepth?: number
  ): TransformNode | undefined;

  /**
   * Generate an inner wall corner mesh (in scene units)
   * Used for angled corner intersections
   * @param startPoint - Starting point (in scene units)
   * @param endPoint - Ending point (in scene units)
   * @param width - Corner width (default: 0 scene units)
   * @param frameDepth - Frame depth (default: 1 scene unit)
   * @param angle - Corner angle in degrees (default: 90°)
   * @param isLeft - Whether corner is on left side (default: true)
   * @param wallDepth - Wall depth (default: 2 scene units)
   * @returns Inner wall corner mesh transform node
   */
  static GenCornerWallIn(
    startPoint: Vector2,
    endPoint: Vector2,
    width?: number,
    frameDepth?: number,
    angle?: number,
    isLeft?: boolean,
    wallDepth?: number
  ): TransformNode | undefined;
}