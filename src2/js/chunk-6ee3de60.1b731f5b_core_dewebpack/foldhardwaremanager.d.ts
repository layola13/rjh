import { PushSashHardwareManager } from './PushSashHardwareManager';
import { Handle, HardwareShape } from './Handle';
import { Vector2D } from './types';

/**
 * Interface for edge geometry operations
 */
interface Edge {
  /**
   * Gets the tangent vector at the start of the edge
   */
  tangentInStart(): Vector2D;
}

/**
 * Serialized data structure for FoldHardwareManager
 */
interface FoldHardwareManagerData {
  /** Serialized handle for fold hardware */
  handleForFold: Record<string, unknown>;
  /** Serialized lock hardware */
  lock?: Record<string, unknown>;
  /** Additional properties from parent class */
  [key: string]: unknown;
}

/**
 * Manager for fold-type hardware components including hinges, handles, and locks.
 * Extends PushSashHardwareManager to provide specialized behavior for folding mechanisms.
 */
export class FoldHardwareManager extends PushSashHardwareManager {
  /** Handle specifically designed for fold operations */
  readonly handleForFold: Handle;
  
  /** Lock mechanism for the fold hardware */
  readonly lock: Handle;

  constructor() {
    super();
    this.handleForFold = Handle.forFold(this);
    this.lock = Handle.lock(this);
  }

  /**
   * Gets all hardware components including hinges, handles, and lock
   * @returns Array of all hardware components
   */
  get hardwares(): Handle[] {
    return [...this.hinges, this.handle, this.handleForFold, this.lock];
  }

  /**
   * Creates all hardware components
   * @returns This instance for method chaining
   */
  create(): this {
    super.create();
    this.handleForFold.create();
    this.lock.create();
    return this;
  }

  /**
   * Recreates hardware components by cloning existing configurations
   */
  recreate(): void {
    super.recreate();
    this.handleForFold = Handle.forFold(this)
      .cloneFrom(this.handleForFold)
      .create();
    this.lock = Handle.lock(this)
      .cloneFrom(this.lock)
      .create();
  }

  /**
   * Updates the polygon geometry for all hardware components
   */
  updatePoly(): void {
    super.updatePoly();
    this.handleForFold.updatePoly();
    this.lock.updatePoly();
  }

  /**
   * Translates all hardware components by the given vector
   * @param offset - Translation vector
   */
  translate(offset: Vector2D): void {
    super.translate(offset);
    this.handleForFold.translate(offset);
    this.lock.translate(offset);
  }

  /**
   * Serializes the hardware manager to JSON
   * @returns Serialized representation
   */
  toJSON(): FoldHardwareManagerData {
    const data = super.toJSON() as FoldHardwareManagerData;
    data.handleForFold = this.handleForFold.toJSON();
    data.lock = this.lock.toJSON();
    return data;
  }

  /**
   * Deserializes data into this hardware manager
   * @param data - Serialized hardware manager data
   * @returns This instance for method chaining
   */
  deserialize(data: FoldHardwareManagerData): this {
    super.deserialize(data);
    this.handleForFold.deserialize(data.handleForFold);
    if (data.lock) {
      this.lock.deserialize(data.lock);
    }
    return this;
  }

  /**
   * Fixes and validates deserialized data, ensuring required fields exist
   * @param data - Raw deserialized data
   * @returns Fixed and validated data
   */
  protected fixData(data: FoldHardwareManagerData): FoldHardwareManagerData {
    const fixedData = super.fixData(data);
    
    // Ensure handleForFold has correct hardware shape
    if (fixedData.handleForFold.hardwareShape === undefined) {
      fixedData.handleForFold.hardwareShape = HardwareShape.HandleForFold;
    }
    
    return fixedData;
  }

  /**
   * Synchronizes fold handles based on edge geometry and orientation
   * @param edge - The edge to synchronize with
   * @param percentOffset - Offset percentage along the edge (0-1)
   * @param context - Rendering context for drawing
   */
  syncHandlesForFold(
    edge: Edge,
    percentOffset: number,
    context: CanvasRenderingContext2D
  ): void {
    const edgeTangent = edge.tangentInStart();
    const handle = this.handleForFold;
    
    if (!handle.edge) {
      return;
    }
    
    const handleTangent = handle.edge.tangentInStart();
    
    // Determine if tangents are in opposite directions based on orientation
    const isOppositeDirection = this.isVertical
      ? edgeTangent.x * handleTangent.x < 0
      : edgeTangent.y * handleTangent.y < 0;
    
    // Invert offset if directions are opposite
    handle.percentOffset = isOppositeDirection ? 1 - percentOffset : percentOffset;
    
    handle.updatePoly();
    handle.draw(context);
  }
}