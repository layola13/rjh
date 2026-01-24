/**
 * Scene module - Manages scene initialization and view model creation
 * Original Module ID: 1316
 */

import { BaseObject } from './BaseObject';

/**
 * Represents a layer in the scene hierarchy
 */
export interface Layer {
  /** Layer identifier */
  id?: string;
  /** Layer configuration */
  config?: Record<string, unknown>;
}

/**
 * Represents a customized parameter or component
 */
export interface CustomizedParam {
  /** Parameter identifier */
  id?: string;
  /** Parameter value */
  value?: unknown;
}

/**
 * Entity interface that contains scene data and structure
 */
export interface SceneEntity {
  /** Preview layer for the scene */
  previewLayer: Layer;
  
  /**
   * Iterates over all layers in the entity
   * @param callback - Function to execute for each layer
   * @param context - Execution context for the callback
   */
  forEachLayer(callback: (layer: Layer) => void, context?: unknown): void;
  
  /**
   * Retrieves all customized parameters
   * @returns Array of customized parameters
   */
  getCustomizedPms(): CustomizedParam[];
}

/**
 * Scene class - Core scene management component that handles initialization
 * and view model creation for layers and customized parameters
 * 
 * Extends BaseObject to provide scene-specific functionality including:
 * - Preview layer initialization
 * - Layer hierarchy traversal
 * - Customized parameter handling
 */
export declare class Scene extends BaseObject {
  /**
   * The entity associated with this scene
   */
  entity: SceneEntity;

  /**
   * Creates a new Scene instance
   * @param param1 - First initialization parameter (typically scene configuration)
   * @param param2 - Second initialization parameter (typically scene options)
   * @param param3 - Third initialization parameter (typically scene context)
   */
  constructor(param1: unknown, param2: unknown, param3: unknown);

  /**
   * Initializes the scene by creating view models for:
   * 1. The preview layer
   * 2. All entity layers
   * 3. All customized parameters
   * 
   * This method is called during scene setup and ensures all components
   * have their corresponding view models created.
   */
  onInit(): void;

  /**
   * Creates a view model for the given layer or parameter
   * @param item - Layer or customized parameter to create view model for
   */
  protected createViewModel(item: Layer | CustomizedParam): void;
}