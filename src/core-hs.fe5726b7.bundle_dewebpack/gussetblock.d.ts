import { Entity } from './Entity';
import { FreePatternBlock } from './FreePatternBlock';
import * as THREE from 'three';

/**
 * Represents a 2D point coordinate
 */
export interface Point2D {
  x: number;
  y: number;
}

/**
 * Represents a bounding box with min/max coordinates
 */
export interface BoundingBox {
  min: Point2D;
  max: Point2D;
}

/**
 * Metadata information for the gusset block
 */
export interface GussetBlockMetaData {
  /** Z-axis length/height of the block */
  ZLength: number;
  /** Optional baseline attribute for thickness calculation */
  attrBaseline?: number;
  // Add other metadata properties as needed
}

/**
 * Paving option configuration
 */
interface PavingOption {
  point: Point2D;
}

/**
 * Pattern interface with child block metadata access
 */
interface Pattern {
  getChildBlockMetaData(): GussetBlockMetaData;
}

/**
 * GussetBlock - A specialized free pattern block with 3D transformation capabilities
 * 
 * This class extends FreePatternBlock to provide additional view transformation
 * features including translation, rotation, and scaling in 3D space.
 */
export declare class GussetBlock extends FreePatternBlock {
  /**
   * 3D translation vector for view transformation
   */
  private _viewTranslation: THREE.Vector3;

  /**
   * 3D rotation quaternion for view transformation
   */
  private _viewRotation: THREE.Quaternion;

  /**
   * 3D scale vector for view transformation
   */
  private _viewScale: THREE.Vector3;

  /**
   * Array of 2D points defining the block geometry
   */
  points?: Point2D[];

  /**
   * Original array of 2D points before any transformations
   */
  originPoints?: Point2D[];

  /**
   * Paving configuration options
   */
  protected _pavingOption: PavingOption;

  /**
   * Associated pattern containing metadata
   */
  pattern?: Pattern;

  /**
   * Rotation angle of the block (in radians)
   */
  rotationAngle: number;

  /**
   * Creates a new GussetBlock instance
   * 
   * @param id - Unique identifier for the block (default: empty string)
   * @param param - Additional initialization parameter
   */
  constructor(id?: string, param?: unknown);

  /**
   * Calculates the thickness of the block based on metadata
   * 
   * @param metaData - Metadata object; if not provided, fetches from pattern
   * @returns Thickness value in the same units as ZLength or attrBaseline
   */
  getThickness(metaData?: GussetBlockMetaData): number;

  /**
   * Computes the local center point of the block geometry
   * 
   * @returns The center point in local coordinates, or undefined if no points exist
   */
  getLocalCenter(): THREE.Vector3 | undefined;

  /**
   * Retrieves metadata from the associated pattern
   * 
   * @returns Metadata object or undefined if no pattern exists
   */
  getMetaData(): GussetBlockMetaData | undefined;

  /**
   * Factory method to create a GussetBlock from an array of points
   * 
   * @param points - Array of 2D points defining the block shape
   * @returns New GussetBlock instance with the given points
   */
  static create(points: Point2D[]): GussetBlock;

  /**
   * Copies properties from another GussetBlock instance
   * 
   * @param source - Source block to copy from
   */
  copyFrom(source: GussetBlock): void;

  /**
   * Creates a deep copy of this GussetBlock
   * 
   * @returns New GussetBlock instance with copied properties
   */
  clone(): GussetBlock;

  /**
   * Gets the view translation vector
   */
  get viewTranslation(): THREE.Vector3;

  /**
   * Gets the view rotation quaternion
   */
  get viewRotation(): THREE.Quaternion;

  /**
   * Gets the view scale vector
   */
  get viewScale(): THREE.Vector3;

  /**
   * Calculates the center point relative to a bounding box
   * 
   * @param checkBounds - Whether to validate that the center is within bounds
   * @param boundingBox - The bounding box to calculate relative to
   * @returns Relative center point or undefined if out of bounds
   */
  getRelativeCenter(
    checkBounds: boolean,
    boundingBox?: BoundingBox
  ): THREE.Vector3 | undefined;

  /**
   * Sets the view transformation matrices for rendering
   * 
   * @param position - 2D position for translation
   * @param isFlipped - Whether the view is flipped (affects rotation direction)
   * @param metaData - Optional metadata; if not provided, fetches from pattern
   */
  setViewTransfrom(
    position: Point2D,
    isFlipped: boolean,
    metaData?: GussetBlockMetaData
  ): void;
}