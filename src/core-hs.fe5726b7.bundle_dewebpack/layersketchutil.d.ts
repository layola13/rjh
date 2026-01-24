import { ExtraordinaryBackground } from './ExtraordinaryBackground';
import { ExtraordinaryGuideline } from './ExtraordinaryGuideline';
import { TgSlabUtil } from './TgSlabUtil';

/**
 * Represents a 2D curve segment in the sketch
 */
export interface CurveSegment {
  /** The curve geometry */
  curve: unknown;
}

/**
 * Represents a polygon with outer boundary and optional holes
 */
export interface PolygonData {
  /** Outer boundary curve segments */
  outer: CurveSegment[];
  /** Inner hole polygons */
  holes: PolygonData[];
}

/**
 * Represents a hole in the slab sketch
 */
export interface SlabSketch2dHole {
  /** Unique identifier for the hole */
  id: string;
  /** Loop geometry containing all curves */
  loop: {
    /** Get all curves that form the closed loop */
    getAllCurves(): unknown[];
  };
}

/**
 * Represents a guideline in the slab sketch
 */
export interface SlabSketch2dGuideline {
  /** The guideline curve geometry */
  curve: unknown;
  /** Starting anchor point */
  fromAnchor: unknown;
  /** Ending anchor point */
  endAnchor: unknown;
  /** Type of guideline */
  type: unknown;
}

/**
 * Input parameters for layer sketch data
 */
export interface LayerSketchInput {
  /** Optional array of holes in the slab sketch */
  slabSketch2dHoles?: SlabSketch2dHole[];
  /** Array of guidelines in the slab sketch */
  slabSketch2dGuildLines: SlabSketch2dGuideline[];
}

/**
 * Represents a hole polygon with topology information
 */
export interface HolePolygon extends PolygonData {
  /** Unique identifier for the hole */
  id: string;
  /** Topology tag in format "-1_{HoleTopoTag}" */
  topo: string;
}

/**
 * Complete 2D sketch data for a layer
 */
export interface LayerSketch2dData {
  /** Background polygons representing the floor slab */
  background: ExtraordinaryBackground;
  /** Array of hole polygons */
  holes: HolePolygon[];
  /** Array of construction guidelines */
  guideLines: ExtraordinaryGuideline[];
}

/**
 * Utility class for creating and manipulating layer sketch data
 */
export declare class LayerSketchUtil {
  /**
   * Topology tag used to identify slab holes
   * @default "slabhole"
   */
  static readonly HoleTopoTag: string;

  /**
   * Creates 2D sketch data for a layer floor slab
   * 
   * Converts floor slab paths into a structured 2D sketch representation
   * including background polygons, holes, and guidelines.
   * 
   * @param input - Layer sketch input containing holes and guidelines
   * @returns 2D sketch data structure, or undefined if no floor slab paths exist
   * 
   * @example
   *