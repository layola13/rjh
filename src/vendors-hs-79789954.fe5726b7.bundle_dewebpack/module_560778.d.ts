/**
 * 3D Bounding Box Utilities Module
 * Provides functions for creating, transforming, and calculating intersections of 3D bounding boxes
 */

import { Box3, Vector3, Matrix4 } from 'three';

/**
 * Represents a 3D dimensional object with length properties
 */
export interface Box3Dimensions {
  /** Length along the X axis */
  XLength: number;
  /** Length along the Y axis */
  YLength: number;
  /** Length along the Z axis */
  ZLength: number;
}

/**
 * Represents a 3-element array for 3D coordinates [x, y, z]
 */
export type Vector3Array = [number, number, number];

/**
 * Represents either an array or Vector3 object
 */
export type Vector3Like = Vector3Array | Vector3;

/**
 * Builds a bounding box from size dimensions
 * Creates a Box3 centered at origin with the given dimensions
 * 
 * @param size - Size dimensions as [width, height, depth]
 * @param target - Optional target Box3 to store the result (default: new Box3)
 * @returns A Box3 centered at origin with the specified dimensions
 */
export function buildBBoxFromSize(size: Vector3Array, target?: Box3): Box3;

/**
 * Transforms a bounding box by applying a transformation matrix
 * 
 * @param box - The bounding box to transform
 * @param transformMatrix - The 4x4 transformation matrix to apply
 * @param target - Optional target Box3 to store the result (default: new Box3)
 * @returns The transformed bounding box
 */
export function transformBBox(box: Box3, transformMatrix: Matrix4, target?: Box3): Box3;

/**
 * Creates a Box3 from minimum and maximum points with optional transformation
 * Handles both array and Vector3 inputs
 * 
 * @param min - Minimum corner point (array or Vector3)
 * @param max - Maximum corner point (array or Vector3)
 * @param transform - Optional transformation matrix to apply
 * @returns A new Box3 instance
 */
export function createHSBox3(min: Vector3Like, max: Vector3Like, transform?: Matrix4): Box3;

/**
 * Transforms a Box3 by applying a transformation matrix to its corners
 * Modifies the box in place
 * 
 * @param box - The box to transform
 * @param transform - The transformation matrix to apply
 * @returns The transformed box (same instance as input)
 */
export function transformHSBox(box: Box3, transform: Matrix4): Box3;

/**
 * Converts a bounding box from view space to model space
 * Performs coordinate system transformation (view to model coordinates)
 * 
 * @param viewBox - The bounding box in view space coordinates
 * @param modelBox - The target box to store model space coordinates
 * @returns The model space bounding box (same instance as modelBox parameter)
 */
export function viewToModelBox(viewBox: Box3, modelBox: Box3): Box3;

/**
 * Calculates the intersection of two 3D bounding boxes
 * If boxes don't intersect, the result will be an empty box
 * 
 * @param boxA - First bounding box
 * @param boxB - Second bounding box
 * @param target - Target box to store the intersection result
 * @returns The intersection box (same instance as target parameter)
 */
export function hsBoxIntersection(boxA: Box3, boxB: Box3, target: Box3): Box3;

/**
 * Calculates the intersection of two 2D bounding boxes (X-Y plane only)
 * If boxes don't intersect, the result will be an empty box
 * 
 * @param boxA - First 2D bounding box
 * @param boxB - Second 2D bounding box
 * @param target - Target box to store the 2D intersection result
 * @returns The 2D intersection box (same instance as target parameter)
 */
export function hsBox2Intersection(boxA: Box3, boxB: Box3, target: Box3): Box3;

/**
 * Calculates the Intersection over Union (IOU) metric between two 3D boxes
 * IOU is defined as: (intersection volume) / (union volume)
 * 
 * @param boxA - First box with dimension properties
 * @param boxB - Second box with dimension properties
 * @returns IOU value between 0 and 1, where 1 means perfect overlap
 */
export function calculateIOU(boxA: Box3Dimensions, boxB: Box3Dimensions): number;