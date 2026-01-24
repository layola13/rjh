/**
 * Physical light module providing serialization and entity classes for physical lighting in 3D scenes.
 * Handles light properties including temperature, intensity, content references, and rendering parameters.
 */

import { Light, Light_IO, LightTypeEnum } from './Light';
import { Entity } from './Entity';
import { EntityField } from './decorators';
import { Logger } from './Logger';

/**
 * Serialization handler for PhysicalLight entities.
 * Manages conversion between runtime PhysicalLight instances and serialized data format.
 */
export class PhysicalLight_IO extends Light_IO {
  /**
   * Serializes a PhysicalLight instance to a transferable format.
   * @param entity - The PhysicalLight entity to serialize
   * @param callback - Optional callback invoked after serialization with result and source entity
   * @param includeDefaults - Whether to include default values in output (default: true)
   * @param options - Additional serialization options
   * @returns Array containing serialized data objects
   */
  dump(
    entity: PhysicalLight,
    callback?: (result: any[], source: PhysicalLight) => void,
    includeDefaults?: boolean,
    options?: Record<string, any>
  ): any[];

  /**
   * Deserializes data into a PhysicalLight instance.
   * @param entity - The target PhysicalLight entity to populate
   * @param data - Serialized data containing light properties
   * @param options - Additional deserialization options
   */
  load(
    entity: PhysicalLight,
    data: SerializedPhysicalLightData,
    options?: Record<string, any>
  ): void;

  /**
   * Gets the singleton instance of PhysicalLight_IO.
   * @returns The shared IO handler instance
   */
  static instance(): PhysicalLight_IO;
}

/**
 * Serialized representation of PhysicalLight data.
 */
interface SerializedPhysicalLightData {
  /** Human-readable name components */
  name: string[];
  /** Reference ID to associated content/asset */
  contentID?: string;
  /** Top-down view representation identifier */
  topView: string;
}

/**
 * Physical light entity representing real-world light sources with physical properties.
 * Supports temperature, intensity, area sizing, and content-based bounding.
 */
export class PhysicalLight extends Light {
  /** Light classification type */
  readonly type: LightTypeEnum.PhysicalLight;

  /** Human-readable name components for the light */
  name: string[];

  /** Reference ID to associated 3D content or asset */
  contentID?: string;

  /** Top-down view representation identifier */
  @EntityField()
  topView: string;

  /** Associated 3D content object (lazily resolved) */
  protected content?: {
    bound: BoundingBox;
  };

  /**
   * Creates a new PhysicalLight instance.
   * @param name - Optional initial name
   * @param parent - Optional parent entity
   */
  constructor(name?: string, parent?: Entity);

  /**
   * Factory method to create and initialize a new PhysicalLight.
   * @returns Fully initialized PhysicalLight instance
   */
  static create(): PhysicalLight;

  /**
   * Checks if this light is virtual (non-physical).
   * @returns Always false for PhysicalLight
   */
  isVirtual(): boolean;

  /**
   * Checks if this light type supports area sizing.
   * @returns Always true for PhysicalLight
   */
  hasAreaSize(): boolean;

  /**
   * Resets all light properties to default values.
   */
  reset(): void;

  /**
   * Gets the IO handler for serialization operations.
   * @returns PhysicalLight_IO singleton instance
   */
  getIO(): PhysicalLight_IO;

  /**
   * Recalculates internal bounding box based on associated content.
   * Falls back to parent implementation if no content is attached.
   */
  protected refreshBoundInternal(): void;

  /**
   * Computes rendering parameters for the graphics pipeline.
   * @returns Object containing all render-time properties
   */
  getRenderParameters(): PhysicalLightRenderParameters;

  /**
   * Retrieves bounding data for spatial queries.
   * Logs a warning as physical lights use content-based bounds.
   * @returns Bounding box data
   */
  getBoundingData(): BoundingBox;

  /**
   * Gets the color temperature of the light source.
   * @returns Temperature in Kelvin
   */
  protected getTemperature(): number;

  /**
   * Gets the baseline intensity value for this light type.
   * @returns Initial intensity value
   */
  protected getInitialIntensity(): number;
}

/**
 * Rendering parameters specific to physical lights.
 */
interface PhysicalLightRenderParameters {
  /** Color temperature in Kelvin */
  temperature: number;
  /** Absolute light intensity */
  intensity: number;
  /** Referenced entity/content ID */
  entityId?: string;
  /** Whether the light is turned off */
  close: boolean;
  /** RGB color values */
  rgb: [number, number, number];
  /** Whether light affects specular reflections */
  affectSpecular: boolean;
  /** Intensity multiplier relative to initial value */
  intensityScale: number;
}

/**
 * Axis-aligned bounding box structure.
 */
interface BoundingBox {
  min: { x: number; y: number; z: number };
  max: { x: number; y: number; z: number };
  copy(source: BoundingBox): void;
}