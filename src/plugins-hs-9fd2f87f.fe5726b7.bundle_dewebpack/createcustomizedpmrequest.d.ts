/**
 * CreateCustomizedPMRequest Module
 * 
 * Provides a request handler for creating customized PM (Property Model) instances
 * within a floorplan scene. Handles model creation, async operations, and undo/redo.
 */

import { HSCore } from './path-to-hscore';
import { CustomizedPMRequest } from './path-to-customized-pm-request';

/**
 * Modeling data structure for customized PM creation
 */
interface ModelingData {
  /** Metadata for PM instances */
  instanceMetas: unknown[];
  /** Additional modeling properties */
  [key: string]: unknown;
}

/**
 * Host context for PM operations
 */
interface PMHost {
  /** Host-specific properties */
  [key: string]: unknown;
}

/**
 * Floorplan containing the scene graph
 */
interface Floorplan {
  /** Scene graph for adding models */
  scene: {
    /** Add a child node to the scene */
    addChild(child: unknown): void;
  };
}

/**
 * Options for model creation
 */
interface CreateModelOptions {
  /** Whether to open the model after creation */
  open?: boolean;
}

/**
 * Async message types for request handling
 */
type AsyncMessage = 'createModel' | string;

/**
 * Request handler for creating customized Property Models
 * 
 * This class extends CustomizedPMRequest to provide specialized handling
 * for creating PM models from modeling data, including scene integration
 * and transaction support (commit/undo/redo).
 */
export declare class CreateCustomizedPMRequest extends CustomizedPMRequest {
  /** Modeling data defining the PM structure */
  private readonly _modelingData: ModelingData;
  
  /** Host context for PM operations */
  private readonly _host: PMHost;
  
  /** Target floorplan for model placement */
  private readonly _floorplan: Floorplan;

  /**
   * Creates a new CreateCustomizedPMRequest instance
   * 
   * @param modelingData - Data defining the PM model structure and instances
   * @param host - Host context providing PM operation capabilities
   * @param floorplan - Target floorplan where the model will be added
   */
  constructor(
    modelingData: ModelingData,
    host: PMHost,
    floorplan: Floorplan
  );

  /**
   * Creates and initializes a customized PM model
   * 
   * This method:
   * 1. Creates a PM model from modeling data
   * 2. Freezes the model to prevent modifications
   * 3. Adds the model to the floorplan scene
   * 4. Updates children based on WebCAD document metadata
   * 
   * @param open - Whether to open the model after creation (default: false)
   * @returns Promise resolving to the created model instance
   */
  createModel(open?: boolean): Promise<unknown>;

  /**
   * Handles async request messages
   * 
   * Processes incoming async messages, routing "createModel" requests
   * to the createModel method and delegating others to the parent class.
   * 
   * @param message - The async message type to process
   * @param args - Arguments for the message handler
   * @returns Promise resolving to the operation result (model or boolean)
   */
  onReceiveAsync(message: AsyncMessage, args: CreateModelOptions): Promise<unknown | boolean>;

  /**
   * Commits the request transaction
   * 
   * Called when the operation should be finalized and made permanent.
   * Delegates to parent class implementation.
   */
  onCommit(): void;

  /**
   * Reverts the request transaction
   * 
   * Called to undo the operation and restore previous state.
   * Delegates to parent class implementation.
   */
  onUndo(): void;

  /**
   * Re-applies the request transaction
   * 
   * Called to redo a previously undone operation.
   * Delegates to parent class implementation.
   */
  onRedo(): void;
}