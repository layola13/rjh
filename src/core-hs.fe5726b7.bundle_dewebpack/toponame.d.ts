/**
 * Represents a topological name identifier for geometric elements.
 * Used to track and reference geometric entities through their topological properties.
 */
export declare class TopoName {
  /**
   * The source identifier for this topological element.
   */
  readonly sourceId: string;

  /**
   * The type of topological element (e.g., "vertex", "edge", "face").
   */
  private readonly _type: string;

  /**
   * The index of this element within its type category.
   */
  private _index?: number;

  /**
   * The index in the source geometry.
   */
  private readonly _sourceIndex?: number;

  /**
   * Indicates whether the element has the same direction as its reference.
   */
  private readonly _isSameDirection?: boolean;

  /**
   * Creates a new TopoName instance.
   * @param sourceId - The source identifier for this topological element
   * @param type - The type of topological element
   * @param index - The index of this element within its type category
   * @param sourceIndex - The index in the source geometry
   * @param isSameDirection - Whether the element has the same direction as its reference
   */
  constructor(
    sourceId: string,
    type: string,
    index?: number,
    sourceIndex?: number,
    isSameDirection?: boolean
  );

  /**
   * Sets the index of this element.
   */
  set index(value: number);

  /**
   * Gets the index of this element, defaults to 0 if undefined.
   */
  get index(): number;

  /**
   * Gets the type of topological element.
   */
  get type(): string;

  /**
   * Gets the source index, defaults to -1 if undefined.
   */
  get sourceIndex(): number;

  /**
   * Generates a unique identifier string for this topological name.
   * Format: `${sourceId}_${type}_${index}_${sourceIndex}[_${isSameDirection}]`
   */
  get id(): string;

  /**
   * Gets whether the element has the same direction as its reference.
   */
  get isSameDirection(): boolean | undefined;

  /**
   * Creates a deep copy of this TopoName instance.
   * @returns A new TopoName instance with the same properties
   */
  clone(): TopoName;

  /**
   * Serializes this TopoName to a compact object format for storage.
   * @returns A serialized representation of this TopoName
   */
  dump(): TopoNameData;

  /**
   * Deserializes a TopoName from a compact object format.
   * @param data - The serialized TopoName data
   * @returns A new TopoName instance reconstructed from the data
   */
  static load(data: TopoNameData): TopoName;
}

/**
 * Serialized representation of TopoName for storage and transmission.
 */
export interface TopoNameData {
  /** Source ID */
  sId: string;
  /** Type */
  t: string;
  /** Index */
  i?: number;
  /** Source Index */
  sI?: number;
  /** Same Direction */
  sD?: boolean;
}