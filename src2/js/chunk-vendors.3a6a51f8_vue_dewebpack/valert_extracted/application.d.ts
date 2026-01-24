/**
 * Application service for managing application layout insets
 * Tracks and updates spacing values for different UI regions
 */

import { Service } from '../service/index';

/**
 * Represents registered components for a specific application region
 * Key: component identifier, Value: numeric inset value
 */
interface ApplicationRegionMap {
  [componentId: string]: number;
}

/**
 * Collection of all application regions and their registered components
 */
interface ApplicationRegions {
  /** Top navigation bar region */
  bar: ApplicationRegionMap;
  /** Top content region */
  top: ApplicationRegionMap;
  /** Left sidebar region */
  left: ApplicationRegionMap;
  /** Inset footer region */
  insetFooter: ApplicationRegionMap;
  /** Right sidebar region */
  right: ApplicationRegionMap;
  /** Bottom content region */
  bottom: ApplicationRegionMap;
  /** Footer region */
  footer: ApplicationRegionMap;
}

/**
 * Type representing valid application region names
 */
type ApplicationRegionName = keyof ApplicationRegions;

/**
 * Application service class
 * Manages layout insets for different application regions
 * Extends the base Service class
 */
export declare class Application extends Service {
  /**
   * Service property identifier
   */
  static readonly property: 'application';

  /**
   * Current bar region total inset value
   */
  bar: number;

  /**
   * Current top region total inset value
   */
  top: number;

  /**
   * Current left region total inset value
   */
  left: number;

  /**
   * Current inset footer region total inset value
   */
  insetFooter: number;

  /**
   * Current right region total inset value
   */
  right: number;

  /**
   * Current bottom region total inset value
   */
  bottom: number;

  /**
   * Current footer region total inset value
   */
  footer: number;

  /**
   * Internal storage for all application regions and their registered components
   */
  protected application: ApplicationRegions;

  /**
   * Registers a component's inset value for a specific application region
   * @param componentId - Unique identifier for the component
   * @param regionName - Name of the application region
   * @param insetValue - Numeric inset value to register
   */
  register(
    componentId: string,
    regionName: ApplicationRegionName,
    insetValue: number
  ): void;

  /**
   * Unregisters a component from a specific application region
   * @param componentId - Unique identifier for the component
   * @param regionName - Name of the application region
   */
  unregister(componentId: string, regionName: ApplicationRegionName): void;

  /**
   * Updates the total inset value for a specific region
   * Sums all registered component values for that region
   * @param regionName - Name of the application region to update
   */
  protected update(regionName: ApplicationRegionName): void;
}