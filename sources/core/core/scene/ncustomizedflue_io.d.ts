/**
 * Module: NCustomizedFlue_IO
 * Defines IO handler and entity class for customized flue structures
 */

import { Line2d, Point2d, Transform2d } from './geometry';
import { NCustomizedStructure, NCustomizedStructre_IO, StructureMode } from './NCustomizedStructure';
import { Entity } from './Entity';

/**
 * IO handler for NCustomizedFlue entities
 * Handles serialization and deserialization of flue structure data
 */
export class NCustomizedFlue_IO extends NCustomizedStructre_IO {
  /**
   * Serialize a flue entity to a data object
   * @param entity - The flue entity to serialize
   * @param callback - Optional callback to modify the serialized data
   * @param includeDefaults - Whether to include default values in output
   * @param options - Additional serialization options
   * @returns Serialized data object
   */
  dump(
    entity: NCustomizedFlue,
    callback?: (data: unknown, entity: NCustomizedFlue) => void,
    includeDefaults: boolean = true,
    options: Record<string, unknown> = {}
  ): unknown {
    const data = super.dump(entity, undefined, includeDefaults, options);
    
    if (callback) {
      callback(data, entity);
    }
    
    return data;
  }

  /**
   * Deserialize data into a flue entity
   * @param data - The data to deserialize
   * @param entity - The target entity to populate
   * @param options - Additional deserialization options
   */
  load(
    data: unknown,
    entity: NCustomizedFlue,
    options: Record<string, unknown> = {}
  ): void {
    super.load(data, entity, options);
  }
}

/**
 * Customized flue structure entity
 * Represents a rectangular flue with configurable dimensions and transformations
 */
export class NCustomizedFlue extends NCustomizedStructure {
  /**
   * Create a new flue structure
   * @param name - Optional name identifier for the flue
   */
  constructor(name: string = "") {
    super(name);
    this.structureMode = StructureMode.wallpart;
  }

  /**
   * Initialize flue properties from metadata
   * @param metadata - Metadata object containing flue properties
   */
  initByMeta(metadata: unknown): void {
    super.initByMeta(metadata);
  }

  /**
   * Get the 2D profile path of the flue
   * Returns the first profile array if available
   */
  get path(): Line2d[] {
    const profile = this.calcProfile();
    return profile ? profile[0] : [];
  }

  /**
   * Get the 3D height of the flue (scaled Z length)
   */
  get height3d(): number {
    return this.ZLength * this.ZScale;
  }

  /**
   * Set the 3D height of the flue
   * Automatically calculates ZLength based on current ZScale
   */
  set height3d(value: number) {
    this.ZLength = value / this.ZScale;
  }

  /**
   * Get the centerline curve of the flue
   * Returns a horizontal line through the center with applied 2D transform
   */
  get curve(): Line2d {
    const line = new Line2d(
      { x: -this.XSize / 2, y: 0 },
      { x: this.XSize / 2, y: 0 }
    );
    
    const transform = this.get2DTransform();
    line.transform(transform);
    
    return line;
  }

  /**
   * Set the structure mode (currently no-op for flues)
   * @param mode - The structure mode to set
   */
  setStructureMode(mode: StructureMode): void {
    // No implementation - flue mode is fixed to wallpart
  }

  /**
   * Calculate the 2D profile of the flue as a rectangular outline
   * @param applyTransform - Whether to apply the 2D transform to the profile
   * @returns Array containing one profile (array of four lines forming a rectangle)
   */
  calcProfile(applyTransform: boolean = true): Line2d[][] {
    // Right edge (bottom)
    const rightEdge = new Line2d(
      { x: -this.XSize / 2, y: -this.YSize / 2 },
      { x: this.XSize / 2, y: -this.YSize / 2 }
    );
    rightEdge.userData = { curveid: "right", index: 0 };

    // Front edge
    const frontEdge = new Line2d(
      { x: this.XSize / 2, y: -this.YSize / 2 },
      { x: this.XSize / 2, y: this.YSize / 2 }
    );
    frontEdge.userData = { curveid: "front", index: 0 };

    // Left edge (top)
    const leftEdge = new Line2d(
      { x: this.XSize / 2, y: this.YSize / 2 },
      { x: -this.XSize / 2, y: this.YSize / 2 }
    );
    leftEdge.userData = { curveid: "left", index: 0 };

    // Back edge
    const backEdge = new Line2d(
      { x: -this.XSize / 2, y: this.YSize / 2 },
      { x: -this.XSize / 2, y: -this.YSize / 2 }
    );
    backEdge.userData = { curveid: "back", index: 0 };

    if (applyTransform) {
      const transform = this.get2DTransform();
      rightEdge.transform(transform);
      frontEdge.transform(transform);
      leftEdge.transform(transform);
      backEdge.transform(transform);
    }

    return [[rightEdge, frontEdge, leftEdge, backEdge]];
  }

  /**
   * Get the left edge path of the flue profile
   * Returns the line segment marked with curveid "left"
   */
  get leftPath(): Line2d | undefined {
    const profile = this.calcProfile(true);
    if (!profile) return undefined;

    const leftLines = profile[0].filter(
      (line) => line.userData?.curveid === "left"
    );
    
    return leftLines.length > 0 ? leftLines[0] : undefined;
  }

  /**
   * Get the right edge path of the flue profile
   * Returns the line segment marked with curveid "right"
   */
  get rightPath(): Line2d | undefined {
    const profile = this.calcProfile(true);
    if (!profile) return undefined;

    const rightLines = profile[0].filter(
      (line) => line.userData?.curveid === "right"
    );
    
    return rightLines.length > 0 ? rightLines[0] : undefined;
  }

  /**
   * Create a new instance of the same class
   * @returns New NCustomizedFlue instance
   */
  newSelf(): NCustomizedFlue {
    return new NCustomizedFlue();
  }

  /**
   * Get the IO handler for this entity type
   * @returns Singleton instance of NCustomizedFlue_IO
   */
  getIO(): NCustomizedFlue_IO {
    return NCustomizedFlue_IO.instance();
  }
}

// Register the class with the entity system
Entity.registerClass(HSConstants.ModelClass.NCustomizedFlue, NCustomizedFlue);