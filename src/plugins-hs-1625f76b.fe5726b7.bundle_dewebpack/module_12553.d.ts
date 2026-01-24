/**
 * Room data generation utilities for spatial analysis and floor plan processing.
 * Handles walls, openings (doors, windows, holes), and geometric calculations.
 */

import { HSCore } from './HSCore';
import { Loop, MathAlg, Tolerance, Line2d, Curve2d, Point2d } from './geometry';

/**
 * Represents a 2D point with x and y coordinates in millimeters.
 */
export interface Point2D {
  /** X coordinate in millimeters */
  x: number;
  /** Y coordinate in millimeters */
  y: number;
}

/**
 * Represents a line segment with start and end points.
 */
export interface LineSegment {
  /** Starting point of the line */
  start: Point2D;
  /** Ending point of the line */
  end: Point2D;
}

/**
 * Represents an opening (door, window, or hole) in a room structure.
 */
export interface Opening {
  /** Unique identifier */
  id: string;
  /** Seek identifier for reference */
  seekId: string;
  /** Content type as string (e.g., "door", "window", "hole") */
  contentType: string;
  /** Outline curves defining the opening boundary */
  outline: LineSegment[];
  /** Direction vector for doors (undefined for other openings) */
  direction?: number[];
  /** Line segments that overlap with walls */
  overlaps: LineSegment[];
  /** Height of the opening in millimeters */
  height: number;
  /** Elevation from floor level in millimeters */
  elevation: number;
}

/**
 * Complete room data including walls, openings, and geometric properties.
 */
export interface RoomData {
  /** Wall line segments defining the room perimeter */
  walls: LineSegment[];
  /** Holes within the room floor plan */
  roomHoles: Curve2d[][];
  /** Door openings in the room */
  doors: Opening[];
  /** Window openings in the room */
  windows: Opening[];
  /** Structural holes in walls */
  holes: Opening[];
  /** Parametric openings (customizable openings) */
  parametricOpenings: Opening[];
  /** Total room height from floor to ceiling in millimeters */
  roomHeight: number;
}

/**
 * Generates comprehensive room data including walls, openings, and spatial properties.
 * 
 * @param room - The room object to analyze. If not provided, uses the currently selected room.
 * @returns Room data object with walls, openings, and dimensions, or undefined if no valid room.
 */
export declare function generateRoomData(room?: HSCore.Model.Room): RoomData | undefined;

/**
 * Extracts the outline coordinates of a content object.
 * For parametric openings, uses path segments; for other objects, calculates from dimensions.
 * 
 * @param content - The content object (door, window, hole, etc.)
 * @returns Array of Point2D coordinates defining the content outline
 */
export declare function getContentOutline(content: HSCore.Model.Content): Point2D[];

/**
 * Merges consecutive collinear line segments to simplify geometry.
 * Reduces the number of segments by combining lines with the same direction.
 * 
 * @param curves - Array of 2D curves to merge
 * @returns Simplified array of curves with merged collinear segments
 */
export declare function mergeCurves(curves: Curve2d[]): Curve2d[];