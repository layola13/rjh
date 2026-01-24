/**
 * Data provider interface for face-related operations
 * Handles face paths, holes, and customized models
 */
export declare class IDataProvider {
  /**
   * Creates an instance of IDataProvider
   */
  constructor();

  /**
   * Retrieves the path data for a specific face
   * @param faceId - The identifier of the face
   * @param parameter - Additional parameter for path retrieval
   * @returns An array of path elements
   */
  getFacePath(faceId: unknown, parameter: unknown): unknown[];

  /**
   * Retrieves all paths associated with a face
   * @param faceId - The identifier of the face
   * @returns An object containing face path data
   */
  getFacesPath(faceId: unknown): Record<string, unknown>;

  /**
   * Retrieves hole information for a specific face
   * @param faceId - The identifier of the face
   * @returns An object containing face hole data
   */
  getFaceHoles(faceId: unknown): Record<string, unknown>;

  /**
   * Retrieves all customized models applied to a face
   * @param faceId - The identifier of the face
   * @returns An array of customized model data
   */
  getCustomizedModelsOnFace(faceId: unknown): unknown[];
}