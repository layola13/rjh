/**
 * Parametric model parameters interface
 */
interface ParametricModelParameters {
  /** Type identifier for the parametric model */
  type: string;
  [key: string]: unknown;
}

/**
 * Configuration for parametric model creation
 */
interface ParametricModelConfig {
  /** Model parameters including type information */
  parameters?: ParametricModelParameters;
  [key: string]: unknown;
}

/**
 * Base interface for parametric model instances
 */
interface IParametricModel {
  // Add specific model methods and properties as needed
}

/**
 * Constructor type for parametric model creators
 */
type ParametricModelCreator = new (
  config: ParametricModelConfig,
  param2: unknown,
  param3: unknown,
  param4: unknown
) => IParametricModel;

/**
 * Manager class for creating and registering parametric model creators.
 * Implements singleton pattern to ensure a single instance manages all model types.
 */
export declare class Manager {
  /**
   * Map storing registered model creators by type identifier
   * @private
   */
  private _creators: Map<string, ParametricModelCreator>;

  /**
   * Singleton instance of the Manager
   * @private
   */
  private static _instance: Manager;

  /**
   * Creates a new Manager instance
   */
  constructor();

  /**
   * Gets the singleton instance of the Manager.
   * Creates a new instance if one doesn't exist.
   * 
   * @returns The singleton Manager instance
   */
  static instance(): Manager;

  /**
   * Registers a creator function for a specific parametric model type.
   * 
   * @param type - The type identifier for the model
   * @param creator - Constructor function that creates instances of the model
   */
  registerCreator(type: string, creator: ParametricModelCreator): void;

  /**
   * Creates a parametric model instance based on the provided configuration.
   * Returns null if the configuration is invalid or no creator is registered for the type.
   * 
   * @param config - Configuration object containing model parameters
   * @param param2 - Second parameter passed to the model constructor
   * @param param3 - Third parameter passed to the model constructor
   * @param param4 - Fourth parameter passed to the model constructor
   * @returns A new parametric model instance or null if creation fails
   */
  createParametricModel(
    config: ParametricModelConfig,
    param2: unknown,
    param3: unknown,
    param4: unknown
  ): IParametricModel | null;
}

/**
 * Extruded body parametric model
 */
export declare class ExtrudedBody implements IParametricModel {
  constructor(config: ParametricModelConfig, param2: unknown, param3: unknown, param4: unknown);
}

/**
 * Wall parametric model
 */
export declare class Wall implements IParametricModel {
  constructor(config: ParametricModelConfig, param2: unknown, param3: unknown, param4: unknown);
}

/**
 * Window parametric model
 */
export declare class Window implements IParametricModel {
  constructor(config: ParametricModelConfig, param2: unknown, param3: unknown, param4: unknown);
}

/**
 * Window sill parametric model
 */
export declare class WindowSill implements IParametricModel {
  constructor(config: ParametricModelConfig, param2: unknown, param3: unknown, param4: unknown);
}

/**
 * Window ceiling parametric model
 */
export declare class WindowCeiling implements IParametricModel {
  constructor(config: ParametricModelConfig, param2: unknown, param3: unknown, param4: unknown);
}

/**
 * Window hole parametric model
 */
export declare class WindowHole implements IParametricModel {
  constructor(config: ParametricModelConfig, param2: unknown, param3: unknown, param4: unknown);
}

/**
 * Window pocket parametric model
 */
export declare class WindowPocket implements IParametricModel {
  constructor(config: ParametricModelConfig, param2: unknown, param3: unknown, param4: unknown);
}