import { Segment, Point, Line } from 'geometry-library';
import { Frametify } from './Frametify';
import { EdgeJointWay, Dock } from './types';
import { WinPolygon, PolygonCreator } from './polygon';
import { Direction } from './direction';

/**
 * DoubleEarsFrametify class for handling double-eared frame polygons
 * Extends the base Frametify class to provide specialized functionality
 * for polygons with two ear-like protrusions
 */
export declare class DoubleEarsFrametify extends Frametify {
  /**
   * The polygon being processed
   */
  poly: WinPolygon;

  /**
   * Internal edges of the frame structure
   */
  innerEdges: Segment[];

  /**
   * Outer path segments defining the frame boundary
   */
  outsidePath: Segment[];

  /**
   * Creates a new DoubleEarsFrametify instance
   * @param poly - The window polygon to be framed
   */
  constructor(poly: WinPolygon);

  /**
   * Generates the inner polygons for the double-eared frame
   * Creates three distinct polygon regions based on the frame dimensions
   * @param dimensions - Array of dimensional parameters for frame generation
   * @returns Array of three WinPolygon objects representing inner frame sections
   */
  innerPolygons(dimensions: number[]): WinPolygon[];

  /**
   * Generates bar polygons for the frame structure
   * Creates structural bars with proper docking connections and joint configurations
   * @param edgeParam - Edge parameters for bar creation
   * @param jointWays - Array of edge joint configurations (defaults to Vertical for indices 4 and 5)
   * @returns Array of bar polygons with configured docking and shape properties
   */
  barPolygons(edgeParam: number[], jointWays: EdgeJointWay[]): WinPolygon[];

  /**
   * Analyzes the polygon structure and computes internal geometry
   * Calculates intersection points, creates inner edges, and establishes the outer path
   * based on the polygon's edge configuration and dimensional parameters
   * @param dimensions - Array of dimensional parameters for analysis
   */
  analyse(dimensions: number[]): void;
}