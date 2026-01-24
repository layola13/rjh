/**
 * Represents metadata for creating a POrdinaryWindow instance.
 * Contains configuration data including child models.
 */
interface POrdinaryWindowMetadata {
  userFreeData: {
    /** Child models to be created with the window */
    models?: unknown[];
    [key: string]: unknown;
  };
  /** Creates a deep copy of the metadata */
  clone(): POrdinaryWindowMetadata;
  [key: string]: unknown;
}

/**
 * Specification object used for adding/removing POrdinaryWindow instances.
 * Contains all necessary data for window creation and management.
 */
interface POrdinaryWindowSpec {
  /** The created POrdinaryWindow instance */
  pOrdinaryWindow: HSCore.Model.POrdinaryWindow;
  /** The host object this window belongs to */
  host: unknown;
  /** The parent layer where the window will be added */
  parent: HSCore.Model.Layer;
  /** Child models to be added with the window */
  models: unknown[];
  [key: string]: unknown;
}

/**
 * Transaction request for creating a POrdinaryWindow (普通窗户).
 * Handles the complete lifecycle: commit, undo, and redo operations.
 * 
 * This class manages window creation as a reversible transaction:
 * - Commit: Creates the window and adds it to the scene
 * - Undo: Removes the window from the scene
 * - Redo: Re-adds the window to the scene
 * 
 * @extends HSCore.Transaction.Common.CompositeRequest
 */
declare class CreatePOrdinaryWindowRequest extends HSCore.Transaction.Common.CompositeRequest {
  /**
   * Metadata containing window configuration
   * @private
   */
  private _meta: POrdinaryWindowMetadata;

  /**
   * Host object that owns this window
   * @private
   */
  private _host: unknown;

  /**
   * Cached specification used for redo operations
   * @private
   */
  private _spec: POrdinaryWindowSpec;

  /**
   * Creates a new POrdinaryWindow creation request.
   * 
   * @param metadata - Window metadata including user data and models
   * @param param1 - Second parameter (purpose unclear from minified code)
   * @param param2 - Third parameter (purpose unclear from minified code)
   * @param param3 - Fourth parameter (purpose unclear from minified code)
   * @param host - Host object that will own the window
   */
  constructor(
    metadata: POrdinaryWindowMetadata,
    param1: unknown,
    param2: unknown,
    param3: unknown,
    host: unknown
  );

  /**
   * Executes the window creation transaction.
   * 
   * This method:
   * 1. Clones the metadata to avoid mutation
   * 2. Extracts child models from metadata
   * 3. Creates a POrdinaryWindow instance
   * 4. Retrieves the active layer from the floorplan
   * 5. Builds a specification with host and parent references
   * 6. Creates child models and appends them
   * 7. Adds the window to the scene via Content utility
   * 
   * @returns The created POrdinaryWindow instance
   */
  onCommit(): HSCore.Model.POrdinaryWindow;

  /**
   * Reverts the window creation.
   * 
   * Removes the POrdinaryWindow from the scene and calls
   * the parent class's onUndo with an empty array.
   * 
   * @returns void
   */
  onUndo(): void;

  /**
   * Re-applies the window creation.
   * 
   * Calls the parent class's onRedo, then re-adds the
   * window using the cached specification.
   * 
   * @returns void
   */
  onRedo(): void;
}

/**
 * Factory function that creates the CreatePOrdinaryWindowRequest class.
 * 
 * @param baseClass - The CompositeRequest base class to extend
 * @returns The CreatePOrdinaryWindowRequest class constructor
 */
declare function createPOrdinaryWindowRequestClass(
  baseClass: typeof HSCore.Transaction.Common.CompositeRequest
): typeof CreatePOrdinaryWindowRequest;

export default createPOrdinaryWindowRequestClass;

/**
 * Global namespace declarations for HSCore framework types
 */
declare namespace HSCore {
  namespace Model {
    /**
     * Represents an ordinary window in the floorplan system
     */
    interface POrdinaryWindow {
      /**
       * Creates child model instances from metadata
       * @param models - Array of model metadata
       */
      createChildModels(models: unknown[]): unknown[];
      [key: string]: unknown;
    }

    /**
     * Factory for creating POrdinaryWindow instances
     */
    namespace POrdinaryWindow {
      /**
       * Creates a new POrdinaryWindow from metadata
       * @param metadata - Configuration metadata
       */
      function create(metadata: POrdinaryWindowMetadata): POrdinaryWindow;
    }

    /**
     * Represents a layer in the scene hierarchy
     */
    interface Layer {
      [key: string]: unknown;
    }
  }

  namespace Util {
    namespace Content {
      /**
       * Generates a specification object for POrdinaryWindow creation
       * @param window - The POrdinaryWindow instance
       */
      function getPOrdinaryWindowSpec(window: Model.POrdinaryWindow): POrdinaryWindowSpec;

      /**
       * Adds a POrdinaryWindow to the scene
       * @param spec - Window specification
       */
      function addPOrdinaryWindow(spec: POrdinaryWindowSpec): void;

      /**
       * Removes a POrdinaryWindow from the scene
       * @param window - The window instance to remove
       */
      function removePOrdinaryWindow(window: Model.POrdinaryWindow): void;
    }
  }

  namespace Transaction {
    namespace Common {
      /**
       * Base class for composite transaction requests
       */
      class CompositeRequest {
        /**
         * Called when the transaction is first executed
         */
        protected onCommit(): unknown;

        /**
         * Called when the transaction is undone
         * @param args - Arguments for undo operation
         */
        protected onUndo(args: unknown[]): void;

        /**
         * Called when the transaction is redone
         * @param args - Arguments for redo operation
         */
        protected onRedo(args: unknown[]): void;
      }
    }
  }
}

declare namespace HSApp {
  namespace App {
    /**
     * Gets the global application instance
     */
    function getApp(): AppInstance;

    interface AppInstance {
      /** The main floorplan manager */
      floorplan: FloorplanManager;
      [key: string]: unknown;
    }

    interface FloorplanManager {
      /** The 3D scene containing all objects */
      scene: Scene;
      [key: string]: unknown;
    }

    interface Scene {
      /** The currently active layer for operations */
      activeLayer: HSCore.Model.Layer;
      [key: string]: unknown;
    }
  }
}