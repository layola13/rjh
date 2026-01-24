/**
 * Data provider interface for handling face geometry and customized models.
 * Provides methods to access face paths, holes, and associated customized models.
 */
export declare class IDataProvider {
  /**
   * Creates an instance of IDataProvider.
   */
  constructor();

  /**
   * Retrieves the outer path geometry for a given face.
   * @param face - The face object containing raw geometry data
   * @param options - Additional options for path retrieval
   * @returns The outer path geometry of the face
   */
  getFacePath(face: Face, options: unknown): Path;

  /**
   * Retrieves all paths associated with a face.
   * @param face - The face object to query
   * @returns An object containing face paths (currently returns empty object)
   */
  getFacesPath(face: Face): Record<string, unknown>;

  /**
   * Retrieves hole geometries within a face.
   * @param face - The face object to query for holes
   * @returns An object containing hole definitions (currently returns empty object)
   */
  getFaceHoles(face: Face): Record<string, unknown>;

  /**
   * Retrieves customized models applied to a specific face.
   * @param face - The face object to query
   * @returns An array of customized models (currently returns empty array)
   */
  getCustomizedModelsOnFace(face: Face): CustomizedModel[];
}

/**
 * Represents a face object with raw geometry data.
 */
interface Face {
  rawGeometry: {
    outer: Path;
  };
}

/**
 * Represents a geometric path.
 */
type Path = unknown;

/**
 * Represents a customized model applied to a face.
 */
type CustomizedModel = unknown;