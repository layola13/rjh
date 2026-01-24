/**
 * Shutter generator module for creating window shutter components
 * @module ShutterGenerator
 */

import { Vector2, Vector4, Vector3, TransformNode, Mesh, Quaternion, Axis, Scene } from '@babylonjs/core';

/**
 * Point interface representing 2D coordinates
 */
export interface Point {
  x: number;
  y: number;
}

/**
 * Shutter configuration defining dimensions and spacing
 */
export interface ShutterConfig {
  /** Array of points defining the shutter boundary */
  pts: Point[];
  /** Inner padding from edges */
  padding: number;
  /** Width of each individual shade/slat */
  shadeWidth: number;
  /** Gap between consecutive shades */
  gap: number;
}

/**
 * Glass plan configuration containing positioning data
 */
export interface GlassPlan {
  /** Base Z-axis offset for fixed elements */
  fixedbasez: number;
  /** Array of Z-position offsets */
  fixedposzarray: number[];
}

/**
 * Configuration object containing glass plan and fixed group mesh references
 */
export interface SceneConfig {
  /** Glass plan configuration */
  glassPlan: GlassPlan;
  /** Array to collect generated fixed geometry meshes */
  fixedGroup: Mesh[];
}

/**
 * Bounding box representing spatial extents
 */
export interface BoundingBox {
  xmin: number;
  xmax: number;
  ymin: number;
  ymax: number;
  toPoints(): Point[];
}

/**
 * Polygon utility class for geometric calculations
 */
export interface PolygonConstructor {
  new(points: Point[]): {
    box: BoundingBox;
  };
  point(x: number, y: number): Point;
  Polygon: PolygonConstructor;
}

/**
 * Profile generation utility
 */
export interface ProfileGenerator {
  /**
   * Generate custom mesh from vector2 profile
   * @param name - Mesh identifier
   * @param points - Profile boundary points
   * @param zPosition - Z-axis position
   * @param depth - Extrusion depth
   * @param material - Optional material
   * @param profileType - Profile type identifier
   * @param uvs - UV mapping coordinates per face
   * @returns Generated mesh with rotation quaternion
   */
  GenCustomerM_vector2(
    name: string,
    points: Point[],
    zPosition: number,
    depth: number,
    material: unknown,
    profileType: string,
    uvs: Vector4[]
  ): Mesh;
}

/**
 * Profile type retrieval utility
 */
export interface ProfileTypeUtil {
  GetProfileType(profileType: ProfileTypesEnum): string;
}

/**
 * Enumeration of available profile types
 */
export enum ProfileTypesEnum {
  LXCIN = 'LXCIN'
}

/**
 * Glass orientation calculation utility
 */
export interface GlassUtil {
  RecalOrientationGlass(config: ShutterConfig): void;
}

/**
 * Shutter generator class responsible for creating venetian blind components
 */
export default class ShutterGenerator {
  /** Active Babylon.js scene instance */
  private static scene: Scene;

  /**
   * Initialize the shutter generator with a scene context
   * @param scene - Babylon.js scene instance
   */
  static Init(scene: Scene): void;

  /**
   * Generate horizontal shutter slats for window covering
   * @param shutterConfigs - Array of shutter configuration objects
   * @param parentNode - Parent transform node for grouping
   * @param sceneConfig - Scene configuration with glass plan data
   * @param addToFixedGroup - Whether to add generated meshes to fixed group (default: true)
   * @remarks
   * - Creates evenly spaced horizontal slats within the defined boundary
   * - Applies 30-degree rotation around X-axis for venetian blind effect
   * - Each slat has configurable width, gap, and padding
   * - Uses custom profile extrusion with UV mapping
   */
  static GenShutter(
    shutterConfigs: ShutterConfig[],
    parentNode: TransformNode,
    sceneConfig: SceneConfig,
    addToFixedGroup?: boolean
  ): void;
}