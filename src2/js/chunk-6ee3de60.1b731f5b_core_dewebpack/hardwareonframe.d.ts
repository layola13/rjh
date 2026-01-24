/**
 * Hardware positioning options relative to frame edge
 */
export enum DockSide {
  /** Hardware positioned on the outside of the frame */
  Outside = 0,
  /** Hardware positioned on the inside of the frame */
  Inside = 1,
  /** Hardware positioned at the middle of the frame */
  Middle = 2
}

/**
 * Configuration data for hardware on frame
 */
export interface HardwareOnFrameData {
  /** Index of the edge where hardware is placed (-1 if not set) */
  edgeIndex?: number;
  /** Additional data from parent HardwareOnEdge */
  [key: string]: unknown;
}

/**
 * Represents hardware components mounted on window/door frame edges.
 * Extends HardwareOnEdge to provide frame-specific positioning and alignment.
 */
export declare class HardwareOnFrame extends HardwareOnEdge {
  /** Dimension line to middle of frame edge */
  dimToMid: DimToMid;
  
  /** Tool type for editing this hardware */
  editTool: ToolType.editHardwareOnFrame;
  
  /** Whether to dock opposite to the opening direction */
  protected _dockOppositeWithOpenDirection: boolean;
  
  /** Position of hardware relative to frame edge (outside/inside/middle) */
  protected _dockSide: DockSide;
  
  /** Index of the edge where hardware is placed */
  protected _edgeIndex: number;
  
  /** Whether to ignore arc edges when computing placement */
  protected _ignoreArcEdge?: boolean;

  /**
   * Gets the distance from the baseline based on dock side
   * - Outside: 0
   * - Inside: full edge width
   * - Middle: half edge width
   */
  protected get _distanceFromBaseline(): number;

  /**
   * Gets the edge where hardware is placed
   * @returns The polygon edge at _edgeIndex, or undefined if index is -1
   */
  get edge(): Segment | Arc | undefined;

  /**
   * Gets/sets the edge index
   */
  get edgeIndex(): number;
  set edgeIndex(value: number);

  /**
   * Gets/sets the dock side (Outside/Inside/Middle)
   */
  get dockSide(): DockSide;
  set dockSide(value: DockSide);

  /**
   * Creates the hardware instance with positioning and dimensions
   * @returns This instance for chaining
   */
  create(): this;

  /**
   * Translates the hardware by given vector
   * @param vector - Translation vector
   */
  translate(vector: Vector): void;

  /**
   * Fixes and validates hardware data, ensuring edgeIndex is set
   * @param data - Raw hardware data
   * @returns Validated data with defaults applied
   */
  fixData(data: Partial<HardwareOnFrameData>): HardwareOnFrameData;

  /**
   * Computes which edge the hardware should be placed on based on open direction
   */
  protected computeEdge(): void;

  /**
   * Determines edge direction based on window/door opening direction
   * @param openDirection - Direction the window/door opens
   * @param opposite - Whether to use opposite direction
   * @returns Calculated direction for hardware placement
   */
  static directionByOpenDirection(
    openDirection: OpenDirection,
    opposite?: boolean
  ): Direction;

  /**
   * Aligns this hardware to match another hardware's position
   * @param target - Hardware to align with
   * @param mirrorEdge - Whether to mirror the edge index and flip offset
   */
  alignTo(target: HardwareOnFrame, mirrorEdge?: boolean): void;

  /**
   * Sets position offset based on distance from ground
   * @param distance - Distance from ground in mm
   * @returns True if position was successfully set
   */
  setOffsetByDistanceToGround(distance: number): boolean;

  /**
   * Sets the distance from ground and updates aligned hardware
   * @param distance - New distance from ground in mm
   * @param unused - Unused parameter (kept for compatibility)
   * @param updateAligned - Whether to update all aligned hardware (default: true)
   */
  setDistanceToGround(distance: number, unused?: number, updateAligned?: boolean): void;

  /**
   * Sets position offset based on distance from sash edge
   * @param distance - Distance from sash in mm
   * @returns True if position was successfully set
   */
  setOffsetByDistanceToSash(distance: number): boolean;

  /**
   * Sets the distance from sash and updates aligned hardware
   * @param distance - New distance from sash in mm
   * @param unused - Unused parameter (kept for compatibility)
   * @param updateAligned - Whether to update all aligned hardware (default: true)
   */
  setDistanceToSash(distance: number, unused?: number, updateAligned?: boolean): void;

  /**
   * Moves hardware to new position on specified edge
   * @param percentOffset - Offset along edge as percentage (0-1)
   * @param edgeIndex - Index of edge to move to (optional)
   * @param referenceHardware - Reference hardware for mirroring logic (optional)
   */
  move(percentOffset: number, edgeIndex?: number, referenceHardware?: HardwareOnFrame): void;

  /**
   * Clones properties from another hardware instance
   * @param source - Source hardware to clone from
   * @returns This instance for chaining
   */
  cloneFrom(source: HardwareOnFrame): this;

  /**
   * Copies common settings from another hardware
   * @param source - Source hardware to copy settings from
   */
  copyCommonSettings(source: Hardware): void;

  /**
   * Gets all hardware instances aligned with this one
   * @returns Array of aligned hardware instances
   */
  protected allHardwaresAlignedWith(): HardwareOnFrame[];

  /**
   * Gets the direction vector of the hardware shape
   * @returns Direction vector
   */
  protected hardwareShapeDirection(): Vector;

  /**
   * Pre-creation setup logic
   */
  protected preCreate(): void;

  /**
   * Creates the visual shapes for the hardware
   */
  protected createShapes(): void;

  /**
   * Updates the polygon representation
   */
  updatePoly(): void;

  /**
   * Draws the hardware on the view
   * @param view - View to draw on
   */
  draw(view: View): void;

  /**
   * Checks if hardware should be ignored/hidden
   * @returns True if should be ignored
   */
  ignore(): boolean;
}