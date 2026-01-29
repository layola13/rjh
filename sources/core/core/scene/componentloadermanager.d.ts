/**
 * Component loader manager module
 * Manages the loading of different component types based on their type identifier
 */

import { ComponentTypeDump } from './component-type-dump';
import { DeviceComp } from './device-comp';
import { JointComp } from './joint-comp';
import { StrongElecComp } from './strong-elec-comp';
import { WeakElecComp } from './weak-elec-comp';
import { HotWaterComp } from './hot-water-comp';
import { ColdWaterComp } from './cold-water-comp';
import { GBCircuitComp } from './gb-circuit-comp';
import { GBPowerSysComp } from './gb-power-sys-comp';

/**
 * Serialized component data structure
 */
export interface ComponentDumpData {
  /** Component type identifier */
  tp: ComponentTypeDump;
  /** Additional component-specific data */
  [key: string]: unknown;
}

/**
 * Base component interface
 */
export interface Component {
  /** Component type */
  type: ComponentTypeDump;
  /** Component identifier */
  id?: string;
}

/**
 * Component loader context
 */
export interface LoaderContext {
  /** Resource manager or loader configuration */
  [key: string]: unknown;
}

/**
 * Manages loading and instantiation of various component types.
 * Implements singleton pattern for centralized component management.
 */
export declare class ComponentLoaderManager {
  private static _ins: ComponentLoaderManager | undefined;

  /**
   * Gets the singleton instance of ComponentLoaderManager
   * @returns The singleton instance
   */
  static get ins(): ComponentLoaderManager;

  /**
   * Loads a component from serialized data based on its type
   * @param data - Serialized component data containing type and properties
   * @param context - Loading context with additional resources or configuration
   * @returns The loaded component instance, or undefined if type is not recognized
   */
  load(data: ComponentDumpData, context: LoaderContext): Component | undefined;
}