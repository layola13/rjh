/**
 * IO handler for NCustomizedOutlet entities
 * Manages serialization and deserialization of outlet structures
 */
export declare class NCustomizedOutlet_IO extends NCustomizedStructre_IO {
  /**
   * Serializes an outlet entity to a plain object
   * @param entity - The outlet entity to serialize
   * @param callback - Optional callback to post-process the dumped data
   * @param includeGeometry - Whether to include geometric data in the output
   * @param options - Additional serialization options
   * @returns Serialized representation of the entity
   */
  dump(
    entity: NCustomizedOutlet,
    callback?: (data: any, entity: NCustomizedOutlet) => void,
    includeGeometry?: boolean,
    options?: Record<string, any>
  ): any;

  /**
   * Deserializes data into an outlet entity
   * @param data - The serialized data to load
   * @param entity - Target entity to populate with data
   * @param options - Additional deserialization options
   */
  load(
    data: any,
    entity: NCustomizedOutlet,
    options?: Record<string, any>
  ): void;

  /**
   * Gets the singleton instance of the IO handler
   */
  static instance(): NCustomizedOutlet_IO;
}

/**
 * Represents a customized outlet structure in the model
 * An outlet is a circular structure with an inner hole, extruded in 3D space
 */
export declare class NCustomizedOutlet extends NCustomizedStructure {
  /**
   * Creates a new outlet instance
   * @param id - Optional unique identifier for the outlet
   */
  constructor(id?: string);

  /**
   * The structure mode (always set to independent for outlets)
   */
  structureMode: StructureMode;

  /**
   * Gets the 2D profile path of the outlet
   * Returns the computed profile curves for rendering
   */
  readonly path: Curve2d[][];

  /**
   * Gets the 3D height of the outlet (scaled Z length)
   */
  get height3d(): number;

  /**
   * Sets the 3D height of the outlet
   * @param value - The desired height in 3D space
   */
  set height3d(value: number);

  /**
   * Gets the center curve (diameter line) of the outlet in 2D space
   * Returns a transformed line representing the outlet's diameter
   */
  readonly curve: Line2d;

  /**
   * Gets the radius (diameter) of the outlet in scaled units
   */
  readonly radius: number;

  /**
   * Sets the structure mode (no-op for outlets as mode is fixed)
   * @param mode - The structure mode to set (ignored)
   */
  setStructureMode(mode: StructureMode): void;

  /**
   * Generates the boundary representation (B-Rep) solid geometry
   * @param forceRegenerate - Whether to force regeneration ignoring cache
   * @param skipTransform - Whether to skip applying transformations
   * @returns The generated B-Rep body or undefined if geometry is invalid
   */
  generateBrep(forceRegenerate?: boolean, skipTransform?: boolean): Body | undefined;

  /**
   * Calculates the 2D profile curves (outer and inner circles)
   * @param applyTransform - Whether to apply 2D transformation to the curves
   * @returns Array of curve loops: [outer circle], [inner circle]
   */
  calcProfile(applyTransform?: boolean): Curve2d[][] | undefined;

  /**
   * Determines the tessellation density for a face
   * @param face - The face to analyze
   * @returns Number of discrete segments to use for rendering (20-100)
   */
  getFaceDiscreteCount(face: Face): number;

  /**
   * Synchronizes the layer height (no-op for outlets)
   */
  syncLayerHeight(): void;

  /**
   * Creates a new instance of the same type
   * @returns A new NCustomizedOutlet instance
   */
  newSelf(): NCustomizedOutlet;

  /**
   * Gets the IO handler for this entity type
   * @returns The singleton IO handler instance
   */
  getIO(): NCustomizedOutlet_IO;
}