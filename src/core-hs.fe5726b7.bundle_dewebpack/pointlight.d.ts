/**
 * PointLight module - Defines point light entities with radial illumination
 */

import type { Light, Light_IO, LightTypeEnum } from './Light';
import type { Entity } from './Entity';
import type { Bound } from './Bound';
import type { EntityGroup } from './EntityGroup';
import type { Vec2, Coordinate } from './Math';

/**
 * Serialization/deserialization handler for PointLight entities
 */
export declare class PointLight_IO extends Light_IO {
  /**
   * Serializes a PointLight instance to a plain object
   * @param entity - The PointLight instance to dump
   * @param callback - Optional callback invoked after dump with result and entity
   * @param includeMetadata - Whether to include metadata in the dump
   * @param options - Additional serialization options
   * @returns Serialized representation of the point light
   */
  dump<T extends PointLight>(
    entity: T,
    callback?: (result: unknown[], entity: T) => void,
    includeMetadata?: boolean,
    options?: Record<string, unknown>
  ): unknown[];

  /**
   * Deserializes data into a PointLight instance
   * @param entity - The target PointLight instance to populate
   * @param data - Serialized data containing radius and other properties
   * @param options - Additional deserialization options
   */
  load(
    entity: PointLight,
    data: PointLightData,
    options?: Record<string, unknown>
  ): void;

  /**
   * Returns the singleton instance of PointLight_IO
   */
  static instance(): PointLight_IO;
}

/**
 * Serialized data structure for PointLight
 */
interface PointLightData {
  /** Radius of light influence in scene units */
  radius?: number;
  [key: string]: unknown;
}

/**
 * Point light entity - emits light uniformly in all directions from a point
 */
export declare class PointLight extends Light {
  /**
   * Radius of light influence (default: 0.2)
   */
  radius: number;

  /**
   * Type identifier for this light (PointLight)
   */
  readonly type: LightTypeEnum;

  /**
   * Bounding box for the light volume
   * @internal
   */
  protected boundInternal: Bound;

  /**
   * Outline vertices defining the light's visual bounds
   * @internal
   */
  protected outline: Coordinate[];

  /**
   * X dimension size (2 × radius)
   * @internal
   */
  protected XSize: number;

  /**
   * Y dimension size (2 × radius)
   * @internal
   */
  protected YSize: number;

  /**
   * Z dimension size (2 × radius)
   * @internal
   */
  protected ZSize: number;

  /**
   * Parent group containing this light
   * @internal
   */
  protected group?: EntityGroup;

  /**
   * Creates a new PointLight instance
   * @param name - Optional name for the light entity
   * @param parent - Optional parent entity
   */
  constructor(name?: string, parent?: Entity);

  /**
   * Factory method to create and initialize a new PointLight
   * @returns Fully initialized PointLight instance
   */
  static create(): PointLight;

  /**
   * Resets the light to default values (radius = 0.2)
   */
  reset(): void;

  /**
   * Returns the IO handler for serialization
   */
  getIO(): PointLight_IO;

  /**
   * Recalculates the bounding box and outline based on current radius
   * @internal
   */
  protected refreshBoundInternal(): void;

  /**
   * Gathers parameters needed for rendering this light
   * @returns Render parameters including position, radius, color, intensity, etc.
   */
  getRenderParameters(): PointLightRenderParameters;

  /**
   * Handles property change notifications
   * @param fieldName - Name of the changed field
   * @param newValue - New value of the field
   * @param oldValue - Previous value of the field
   * @internal
   */
  protected onFieldChanged(
    fieldName: string,
    newValue: unknown,
    oldValue: unknown
  ): void;

  /**
   * Marks position-dependent data as dirty for recalculation
   * @internal
   */
  protected dirtyPosition(): void;
}

/**
 * Render parameters for PointLight
 */
interface PointLightRenderParameters {
  /** Color temperature in Kelvin */
  temperature: number;
  /** Light intensity multiplier */
  intensity: number;
  /** World X coordinate */
  x: number;
  /** World Y coordinate */
  y: number;
  /** World Z coordinate (including base height) */
  z: number;
  /** Radius of light influence */
  radius: number;
  /** RGB color values */
  rgb: [number, number, number];
  /** Whether this light affects specular highlights */
  affectSpecular: boolean;
  /** Whether the light is turned off */
  close: boolean;
  /** Type of light source content */
  sourceContentType: unknown;
}