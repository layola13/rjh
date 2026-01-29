/**
 * TubeBox module - Handles 3D tube box visualization and transformation
 * @module TubeBox
 */

import { Vector3, Quaternion, Matrix4, Box3 } from 'three';
import { ContentBox } from './ContentBox';
import { HSCore } from './HSCore';
import { Vector3 as BabylonVector3, Quaternion as BabylonQuaternion } from './BabylonTypes';
import { getMatrix4FromTransform } from './TransformUtils';

/**
 * Represents a 3D bounding point in space
 */
interface BoundingPoint {
  x: number;
  y: number;
  z: number;
}

/**
 * Transform parameters for creating a 4x4 transformation matrix
 */
interface TransformParameters {
  x: number;
  y: number;
  z: number;
  XScale: number;
  YScale: number;
  ZScale: number;
  XRotation: number;
  YRotation: number;
  ZRotation: number;
}

/**
 * Bounding box dimensions and position information
 */
interface BoundingBox {
  XSize: number;
  YSize: number;
  ZSize: number;
  center: BoundingPoint;
  bottom: number;
}

/**
 * Geometry object containing visual mesh data and transformation matrix
 */
interface GeometryObject {
  geometry: {
    objects: Array<{
      bounding: number[];
    }>;
  };
  matrix: Matrix4;
  hasArcTube?: boolean;
}

/**
 * Document context providing access to geometry management
 */
interface DocumentContext {
  document: {
    geometryManager: {
      getGeometryObject(id: string): GeometryObject | undefined;
    };
  };
}

/**
 * TubeBox class - Manages 3D tube box visualization with automatic bounds calculation
 * Extends ContentBox to provide specialized handling for concealed work tubes
 */
export declare class TubeBox extends ContentBox {
  /**
   * The contents (entities) contained within this tube box
   */
  contents: HSCore.Model.ConcealedWorkTube[];

  /**
   * Visual gizmo for representing the box in 3D space
   */
  boxGizmo: {
    position: BabylonVector3;
    scale: BabylonVector3;
    rotation: BabylonQuaternion;
  };

  /**
   * Document context for accessing geometry data
   */
  context: DocumentContext;

  /**
   * Builds and updates the visual representation data for the tube box
   * Calculates position, scale, and rotation from contained entities
   * @remarks
   * - Skips processing if no contents exist
   * - Converts THREE.js coordinate system to Babylon.js (swaps Y/Z axes)
   * @returns void
   */
  buildContentData(): void;

  /**
   * Calculates the combined transformation matrix for one or more entities
   * @param entities - Array of concealed work tube entities to process
   * @returns Transformation matrix representing the combined bounds, or undefined if no valid entities
   * @remarks
   * Special handling for single ConcealedWorkTube entities:
   * - If the tube has exactly 2 nodes and no arc, uses the original matrix
   * - Otherwise computes a bounding box from all geometry objects
   * 
   * For multiple entities, computes a unified bounding box from all bounding points
   */
  getEntityTransform(entities: HSCore.Model.ConcealedWorkTube[]): Matrix4 | undefined;
}

/**
 * Re-export for module compatibility
 */
export { TubeBox };