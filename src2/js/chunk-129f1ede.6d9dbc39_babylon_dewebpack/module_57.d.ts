/**
 * Vector3 utility class for 3D geometric operations
 * Provides methods for smoothing, extrusion, interpolation, and vector transformations
 */
declare module 'module_57' {
  import { Vector2, Vector3, Angle } from '@babylonjs/core';
  import { Point } from 'paper'; // or appropriate point library

  /**
   * Utility class for advanced Vector3 operations including smoothing,
   * path generation, and geometric transformations
   */
  export default class Vector3Utils {
    /**
     * Generates a smooth normal vertex array by interpolating between adjacent vertices
     * @param vertices - Array of 3D vertices to smooth
     * @returns Smoothed vertex array with interpolated intermediate points
     */
    static GenSmoothNormalVertexArray(vertices: Vector3[]): Vector3[];

    /**
     * Generates an extrusion shape path with smoothed corners
     * @param vertices - Array of vertices defining the extrusion path
     * @returns Smoothed extrusion path with intermediate control points
     */
    static GenExtrudeShapePath(vertices: Vector3[]): Vector3[];

    /**
     * Linearly interpolates between two Vector3 points
     * @param start - Starting position
     * @param end - Ending position
     * @param steps - Number of interpolation steps (default: 10)
     * @returns Array of interpolated Vector3 points
     */
    static LerpVector3(start: Vector3, end: Vector3, steps?: number): Vector3[];

    /**
     * Checks if a Vector3 array forms a closed loop
     * @param vertices - Array of vertices to check
     * @returns True if first and last vertices are equal within epsilon tolerance
     * @throws Error if array is null or has fewer than 2 elements
     */
    static isClosed(vertices: Vector3[]): boolean;

    /**
     * Sets the closed state of a Vector3 array
     * @param vertices - Array of vertices to modify
     * @param shouldClose - True to close the loop, false to open it
     */
    static SetClosed(vertices: Vector3[], shouldClose: boolean): void;

    /**
     * Calculates the center position for a curve model from three points
     * Projects points to XZ plane and finds 2D center
     * @param point1 - First point
     * @param point2 - Second point
     * @param point3 - Third point
     * @returns Center position as Vector3 with Y=0
     */
    static GetCenterPosVector3_SModelCurve(
      point1: Vector3,
      point2: Vector3,
      point3: Vector3
    ): Vector3;

    /**
     * Moves a point away from a reference point by a specified distance
     * @param point - Point to move
     * @param referencePoint - Reference point to move away from
     * @param distance - Distance to move
     * @returns New position after movement
     */
    static MovePt(point: Vector3, referencePoint: Vector3, distance: number): Vector3;

    /**
     * Converts Vector3 to Vector2 by extracting X and Y components
     * @param vector - Vector3 to convert
     * @returns Vector2 with X and Y components
     */
    static ToVector2(vector: Vector3): Vector2;

    /**
     * Converts Vector3 to Point using X and Z coordinates
     * @param vector - Vector3 to convert
     * @returns Point with X and Z as coordinates
     */
    static ToPointXZ(vector: Vector3): Point;

    /**
     * Calculates the minimum angle between two vectors
     * @param vector1 - First vector
     * @param vector2 - Second vector
     * @returns Angle in degrees (smallest of two possible angles)
     */
    static GetAngleBetweenVectors(vector1: Vector3, vector2: Vector3): number;

    /**
     * Calculates the center point of a bounding box containing all vertices
     * @param vertices - Array of vertices
     * @returns Center position of the bounding box
     */
    static GetMiddleVector3(vertices: Vector3[]): Vector3;

    /**
     * Finds the minimum corner of a bounding box containing all vertices
     * @param vertices - Array of vertices
     * @returns Vector3 with minimum X, Y, Z values
     */
    static GetMinVector3(vertices: Vector3[]): Vector3;

    /**
     * Finds the maximum corner of a bounding box containing all vertices
     * @param vertices - Array of vertices
     * @returns Vector3 with maximum X, Y, Z values
     */
    static GetMaxVector3(vertices: Vector3[]): Vector3;
  }
}