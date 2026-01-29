/**
 * Represents information about a slab face in a 3D modeling or CAD system.
 * This class extends the base FaceInfo class and adds support for auxiliary faces
 * and linked structural faces.
 * 
 * @module SlabFaceInfo
 * @see FaceInfo from module 24616
 */

/**
 * Represents a face object with geometric and hierarchical information
 */
interface Face {
  /**
   * Gets the unique parent entity of this face
   * @returns The parent entity or undefined if no parent exists
   */
  getUniqueParent(): UniqueParent | undefined;
}

/**
 * Represents the parent entity containing a slab builder
 */
interface UniqueParent {
  /**
   * The slab builder responsible for constructing and managing slab geometry
   */
  slabBuilder: SlabBuilder;
}

/**
 * Builder interface for slab construction operations
 */
interface SlabBuilder {
  /**
   * Retrieves all structural faces linked to the specified slab face
   * @param face - The slab face to query for linked structural faces
   * @returns Array of linked structural faces
   */
  getSlabFaceLinkedStructFaces(face: Face): Face[];
}

/**
 * Base class for face information (imported from module 24616)
 */
declare class FaceInfo {
  /**
   * The face object this info represents
   */
  readonly face: Face;

  /**
   * Creates a new FaceInfo instance
   * @param face - The face object to wrap
   */
  constructor(face: Face);
}

/**
 * Extended face information for slab elements.
 * Provides additional context about auxiliary status and linked structural faces.
 */
export declare class SlabFaceInfo extends FaceInfo {
  /**
   * Indicates whether this is an auxiliary face
   * Auxiliary faces typically represent helper geometry or construction aids
   */
  readonly isAux: boolean;

  /**
   * Creates a new SlabFaceInfo instance
   * @param face - The face object to wrap
   * @param isAux - Whether this face is auxiliary
   */
  constructor(face: Face, isAux: boolean);

  /**
   * Gets all structural faces linked to this slab face.
   * Returns an empty array if the face has no parent or no linked faces.
   * 
   * @returns Array of linked structural faces
   */
  get linkStructureFaces(): Face[];
}