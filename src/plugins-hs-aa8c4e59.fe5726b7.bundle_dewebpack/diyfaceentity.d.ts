/**
 * DIY Face Entity Module
 * 
 * This module defines the DIYFaceEntity class, which represents a customizable face entity
 * in a 3D modeling or CAD system. It handles face geometry, materials, and instance data.
 */

import { AcceptEntity } from './AcceptEntity';
import { ModelClassName } from './ModelClassName';
import { InstanceData, Parameter, DataType } from './InstanceData';

/**
 * Configuration object for building a DIY face entity
 */
export interface DIYFaceEntityConfig {
  /** Unique identifier for the face */
  faceId: string | number;
  
  /** Content object containing geometric and material data */
  content: FaceContent;
}

/**
 * Face content interface representing the geometric and material properties
 */
export interface FaceContent {
  /** Unique identifier for the content */
  id: string;
  
  /**
   * Gets the material configuration for a specific face
   * @param faceId - The face identifier
   * @returns Material data or undefined if not found
   */
  getFaceMaterial(faceId: string | number): FaceMaterial | undefined;
  
  /**
   * Gets the normal face material data
   * @param faceId - The face identifier
   * @returns Normal material data
   */
  getNormalFaceMaterialData(faceId: string | number): NormalMaterialData;
}

/**
 * Face material configuration
 */
export interface FaceMaterial {
  /** Mixed paint configuration for the face */
  mixpaint?: MixPaint;
}

/**
 * Mixed paint configuration for face rendering
 */
export interface MixPaint {
  /** Unique identifier for the paint */
  id: string;
}

/**
 * Normal material data structure
 */
export interface NormalMaterialData {
  /** Material seek identifier, can be "local", "generated", or a custom ID */
  seekId: string;
}

/**
 * Area calculation result containing full and valid areas
 */
export interface AreaData {
  /** Total area of the face including holes */
  fullArea: number;
  
  /** Valid area excluding holes */
  validArea: number;
}

/**
 * 2D geometry data for face rendering
 */
export interface Geometry2DData {
  /** Paint/pave identifier for material application */
  paveId?: string;
  
  /** Material category data */
  material?: CategoryData;
}

/**
 * Category data for material classification
 */
export interface CategoryData {
  [key: string]: unknown;
}

/**
 * Bounding size dimensions
 */
export interface BoundingSize {
  /** Width of the bounding box */
  width: number;
  
  /** Height of the bounding box */
  height: number;
}

/**
 * 2D curve path with outer boundary and optional holes
 */
export interface CurvePath {
  /** Outer boundary curve points */
  outer: Point2D[];
  
  /** Optional array of hole curves */
  holes?: Point2D[][];
}

/**
 * 2D point coordinate
 */
export type Point2D = [number, number];

/**
 * Area calculation input with outer boundary and holes
 */
export interface AreaInput {
  /** Outer boundary points */
  outer: Point2D[];
  
  /** Array of hole boundaries */
  holes: Point2D[][];
}

/**
 * DIYFaceEntity class for handling customizable face entities in 3D modeling
 * 
 * @extends AcceptEntity
 * 
 * @example
 *