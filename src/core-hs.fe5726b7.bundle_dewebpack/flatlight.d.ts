/**
 * FlatLight module - Defines flat rectangular area light entities
 * @module FlatLight
 */

import { VirtualAreaLight_IO, VirtualAreaLight } from './VirtualAreaLight';
import { LightTypeEnum } from './LightTypes';
import { Entity } from './Entity';

/**
 * IO handler for FlatLight serialization and deserialization
 * Handles version-specific data migration during load operations
 */
export class FlatLight_IO extends VirtualAreaLight_IO {
  /**
   * Post-load processing for FlatLight entities
   * Migrates intensity values for versions earlier than 0.6
   * 
   * @param entity - The FlatLight entity being loaded
   * @param context - Load context containing version information
   */
  postLoad(entity: FlatLight, context: LoadContext): void {
    super.postLoad(entity, context);
    
    // Migrate intensity calculation for pre-0.6 versions
    if (HSCore.Util.Version.isEarlierThan(context.version, "0.6")) {
      const area = entity.getArea();
      if (area) {
        entity.intensity = Math.round(entity.intensity / area);
      }
    }
  }
}

/**
 * FlatLight - Rectangular flat area light entity
 * Represents a planar light source with configurable width and height
 */
export class FlatLight extends VirtualAreaLight {
  /** Light type identifier */
  public readonly type: LightTypeEnum.FlatLight;
  
  /** Width of the flat light in world units */
  public width: number;
  
  /** Height of the flat light in world units */
  public height: number;

  /**
   * Creates a new FlatLight instance
   * 
   * @param name - Optional name for the light entity
   * @param parent - Optional parent entity
   */
  constructor(name: string = "", parent?: Entity) {
    super(name, parent);
    this.type = LightTypeEnum.FlatLight;
    this.width = 1;
    this.height = 1;
  }

  /**
   * Factory method to create a new FlatLight with default settings
   * 
   * @returns A newly created and initialized FlatLight instance
   */
  static create(): FlatLight {
    const light = new FlatLight();
    light.reset();
    return light;
  }

  /**
   * Resets the light to default values
   * Sets width and height to 1 unit
   */
  reset(): void {
    super.reset();
    this.width = 1;
    this.height = 1;
  }

  /**
   * Gets the IO handler for this entity type
   * 
   * @returns Singleton instance of FlatLight_IO
   */
  getIO(): FlatLight_IO {
    return FlatLight_IO.instance();
  }

  /**
   * Calculates the total area of the flat light
   * 
   * @returns Area in square world units
   */
  getArea(): number {
    return this.height * this.width;
  }

  /**
   * Constructs the geometric path defining the light boundary
   * 
   * @param vertexCount - Number of vertices (must be 4 for rectangular light)
   * @returns Array of corner vertices in local space, or empty array if vertexCount !== 4
   */
  constructPath(vertexCount: number = 4): THREE.Vector3[] {
    if (vertexCount !== 4) {
      return [];
    }

    const halfWidth = this.width / 2;
    const halfHeight = this.height / 2;

    return [
      new THREE.Vector3(-halfWidth, -halfHeight, 0), // Bottom-left
      new THREE.Vector3(halfWidth, -halfHeight, 0),  // Bottom-right
      new THREE.Vector3(halfWidth, halfHeight, 0),   // Top-right
      new THREE.Vector3(-halfWidth, halfHeight, 0)   // Top-left
    ];
  }
}

/**
 * Load context interface for deserialization
 */
interface LoadContext {
  /** Version string of the source data format */
  version: string;
}

// Register the FlatLight class with the entity system
Entity.registerClass(HSConstants.ModelClass.NgFlatLight, FlatLight);