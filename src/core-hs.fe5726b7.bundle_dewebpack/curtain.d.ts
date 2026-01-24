/**
 * Curtain module - Defines curtain-related entities, components, and I/O operations
 * @module Curtain
 */

import { Content_IO, Content } from './Content';
import { Entity } from './Entity';
import { Signal } from './Signal';

/**
 * Enumeration of curtain component types
 * @enum {string}
 */
export enum CurtainComponentEnum {
  /** Side panel component of the curtain */
  Side = "curtain_side",
  /** Loop component used for hanging */
  Loop = "curtain_loop",
  /** Screen/fabric component */
  Screen = "curtain_screen",
  /** Rail component for mounting */
  Rail = "curtain_rail",
  /** Tips/end caps of the rail */
  RailTips = "curtain_rail_tip"
}

/**
 * Component state event data
 */
interface ComponentEvent {
  /** The component that was enabled/disabled */
  component: CurtainComponentEnum;
}

/**
 * Serialized curtain data structure
 */
interface SerializedCurtainData {
  /** Array of disabled component storage keys */
  disabledComponents: string[];
  [key: string]: unknown;
}

/**
 * I/O handler for serializing and deserializing Curtain entities
 * @extends Content_IO
 */
export class Curtain_IO extends Content_IO {
  /**
   * Serializes a curtain entity to JSON
   * @param entity - The curtain entity to serialize
   * @param callback - Optional callback to modify serialized data
   * @param includeMetadata - Whether to include metadata in output
   * @param options - Additional serialization options
   * @returns Array of serialized data objects
   */
  dump(
    entity: Curtain,
    callback?: (data: SerializedCurtainData[], entity: Curtain) => void,
    includeMetadata: boolean = true,
    options: Record<string, unknown> = {}
  ): SerializedCurtainData[];

  /**
   * Deserializes JSON data into a curtain entity
   * @param entity - The target curtain entity to populate
   * @param data - Serialized curtain data
   * @param context - Deserialization context
   */
  load(
    entity: Curtain,
    data: SerializedCurtainData,
    context: unknown
  ): void;
}

/**
 * Curtain content entity representing a configurable curtain model
 * @extends Content
 */
export class Curtain extends Content {
  /** List of currently disabled components */
  private _disabledComponents: CurtainComponentEnum[];

  /** Signal dispatched when a component is disabled */
  signalComponentDisabled: Signal<ComponentEvent>;

  /** Signal dispatched when a component is enabled */
  signalComponentEnabled: Signal<ComponentEvent>;

  /**
   * Creates a new curtain entity
   * @param id - Unique identifier for the entity
   * @param metadata - Optional metadata for initialization
   */
  constructor(id?: string, metadata?: unknown);

  /**
   * Cleans up resources and disposes signals
   */
  destroy(): void;

  /**
   * Initializes the curtain from metadata
   * @param metadata - Configuration metadata
   */
  initByMeta(metadata: unknown): void;

  /**
   * Checks if a component is both available and enabled
   * @param component - The component to check
   * @returns True if component is available and enabled
   */
  isComponentEnabled(component: CurtainComponentEnum): boolean;

  /**
   * Gets the count of disabled components
   * @returns Number of disabled components
   */
  disableComponentNumber(): number;

  /**
   * Disables a specific component
   * @param component - The component to disable
   */
  disableComponent(component: CurtainComponentEnum): void;

  /**
   * Enables a previously disabled component
   * @param component - The component to enable
   */
  enableComponent(component: CurtainComponentEnum): void;

  /**
   * Gets a copy of all disabled components
   * @returns Array of disabled components
   */
  getDisabledComponents(): CurtainComponentEnum[];

  /**
   * Gets all currently enabled components
   * @returns Array of enabled components
   */
  getEnabledComponents(): CurtainComponentEnum[];

  /**
   * Normalizes a component name by matching against known component types
   * @param name - The name to normalize
   * @returns Normalized component enum value or original name
   */
  getNormalizedComponentName(name: string): CurtainComponentEnum | string;

  /**
   * Gets the storage key string for a component enum value
   * @param component - The component enum value
   * @returns Storage key string (e.g., "Side", "Loop")
   */
  getComponentStorageKey(component: CurtainComponentEnum): string;

  /**
   * Retrieves component enum from its storage key
   * @param key - Storage key string
   * @returns Corresponding component enum value
   */
  getComponentByStorageKey(key: string): CurtainComponentEnum;

  /**
   * Gets the material assigned to a specific component
   * Note: RailTips requests return Rail material
   * @param component - The component to query
   * @returns Material assigned to the component
   */
  getMaterial(component: CurtainComponentEnum): unknown;

  /**
   * Assigns a material to a specific component
   * Note: RailTips assignment applies to Rail component
   * @param component - The target component
   * @param material - The material to assign
   */
  setMaterial(component: CurtainComponentEnum, material: unknown): void;

  /**
   * Gets all component-material pairs including special handling for RailTips
   * @returns Array of [component, material] tuples
   */
  getMaterialList(): Array<[CurtainComponentEnum, unknown]>;

  /**
   * Gets the I/O handler instance for this entity type
   * @returns Singleton Curtain_IO instance
   */
  getIO(): Curtain_IO;
}