import { AcceptEntity } from './AcceptEntity';
import { InstanceData, Parameter, DataType } from './InstanceDataTypes';

/**
 * Represents a slab entity in the building model.
 * A slab is a horizontal structural element (floor, ceiling, roof).
 */
export declare class SlabEntity extends AcceptEntity {
  /**
   * Constructs the entity data from the provided source object.
   * @param source - The source data object containing slab properties
   */
  buildEntityData(source: SlabSourceData): void;

  /**
   * Builds child entities (empty implementation for slabs).
   */
  buildChildren(): void;

  /**
   * Extracts and formats instance data from the source object.
   * @param source - The source data object
   * @returns Formatted instance data with center, size, and layer information
   */
  getInstanceData(source: SlabSourceData): InstanceData;
}

/**
 * Source data structure for slab entities
 */
interface SlabSourceData {
  /** Unique identifier */
  id: string;
  /** Slab classification type */
  Class: string;
  /** Thickness of the slab in units */
  thickness: number;
  /** Bounding box of the slab */
  bound: BoundingBox;
  /** Gets the base layer of the slab */
  getBaseLayer(): Layer | null;
  /** Gets the layer underneath the slab */
  getUnderLayer(): Layer | null;
}

interface BoundingBox {
  getTopLeft(): Point2D;
  getBottomRight(): Point2D;
}

interface Point2D {
  x: number;
  y: number;
}

interface Layer {
  id: string;
}