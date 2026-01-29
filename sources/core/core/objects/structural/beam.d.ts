/**
 * Beam module - Represents a structural beam element in a 3D building model
 * 
 * This module provides the Beam class for modeling structural beams with customizable
 * alignment options and wall snapping behavior.
 */

/**
 * Enumeration defining how a beam aligns to adjacent walls
 * 
 * @enum {string}
 */
export enum AlignToWallTypeEnum {
  /** Align beam to the edge of the wall */
  edge = "edge",
  
  /** Align beam to the center of the wall */
  center = "center"
}

/**
 * Interface representing graphics data structure for a body
 */
interface GraphicsData {
  /** Array of face geometry data */
  faces: Face[];
}

/**
 * Interface representing a single face in the graphics mesh
 */
interface Face {
  // Face-specific properties would be defined here
  // Exact structure depends on the graphics engine implementation
  [key: string]: unknown;
}

/**
 * Callback function type for traversing face data
 * 
 * @param face - The current face being processed
 * @param index - The index of the face in the faces array
 */
type FaceTraverseCallback = (face: Face, index: number) => void;

/**
 * Base class for customized 3D models (imported from external module)
 * 
 * @abstract
 */
declare abstract class CustomizedModel {
  /**
   * Creates a new customized model
   * 
   * @param id - Unique identifier for the model
   * @param options - Optional configuration parameters
   */
  constructor(id?: string, options?: unknown);
  
  /**
   * Retrieves the graphics data for this model
   * 
   * @returns The graphics data structure containing mesh information
   */
  protected getGraphicsData(): GraphicsData;
  
  /** Internal graphics data cache */
  protected _graphicsData?: GraphicsData;
}

/**
 * Entity registration system (imported from external module)
 */
declare namespace Entity {
  /**
   * Registers a class with the entity system
   * 
   * @param className - The class identifier constant
   * @param classConstructor - The class constructor to register
   */
  function registerClass(className: string, classConstructor: new (...args: unknown[]) => unknown): void;
}

/**
 * Global constants namespace
 */
declare namespace HSConstants {
  namespace ModelClass {
    /** Class identifier for beam entities */
    const NgBeam: string;
  }
}

/**
 * Beam class - Represents a structural beam element
 * 
 * Extends the CustomizedModel base class to provide beam-specific functionality
 * including wall alignment and room snapping capabilities.
 * 
 * @extends CustomizedModel
 * 
 * @example
 *