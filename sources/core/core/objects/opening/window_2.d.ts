import type { Hole } from './Hole';
import type { WebCadDocument } from './WebCadDocument';
import type { WindowSill as WindowSillBase } from './WindowSill';

/**
 * Window sill component that handles positioning and scaling transformations
 * Extends the base WindowSill with custom matrix calculations
 */
declare class WindowSillComponent extends WindowSillBase {
  /**
   * Local transformation matrix for the window sill
   * @private
   */
  private _matrixLocal: THREE.Matrix4;

  /**
   * Creates a new WindowSillComponent instance
   * @param entity - The window sill entity from the parametric model
   * @param context - The rendering/scene context
   * @param parent - Parent node in the scene graph
   */
  constructor(
    entity: HSCore.Model.Parametrization.WindowSill,
    context: WebCadDocument,
    parent: unknown
  );

  /**
   * Updates the local position matrix based on parent entity scaling
   * Applies inverse scaling transformation to maintain correct proportions
   */
  onUpdatePosition(): void;
}

/**
 * Event data structure for child node operations
 */
interface ChildEventData {
  /** The entity associated with the child node */
  entity?: HSCore.Model.Parametrization.WindowSill | unknown;
}

/**
 * Event object passed when child nodes are added
 */
interface ChildEvent {
  /** Event data containing the entity reference */
  data: ChildEventData;
}

/**
 * Window component that extends Hole functionality with window sill support
 * Manages the creation and lifecycle of window sill child objects
 */
export declare class Window extends Hole {
  /**
   * Map of child nodes indexed by entity ID
   * @protected
   */
  protected childNodes?: Map<string, WindowSillComponent>;

  /**
   * Creates a new Window instance
   * @param entity - The window entity from the parametric model
   * @param context - The rendering/scene context
   * @param parent - Parent node in the scene graph
   */
  constructor(entity: unknown, context: unknown, parent: unknown);

  /**
   * Initialization hook called when the window is first created
   * Checks for existing window sill and creates corresponding object
   * @override
   */
  onInit(): void;

  /**
   * Factory method to create window sill objects
   * @param entity - The window sill entity
   * @returns A new WindowSillComponent instance
   */
  createSillObject(entity: HSCore.Model.Parametrization.WindowSill): WindowSillComponent;

  /**
   * Hook called when a child node is added to the window
   * Handles special logic for WindowSill entities
   * @param event - Event containing the added child entity
   * @override
   */
  onChildAdded(event: ChildEvent): void;
}

/**
 * Global namespace for HSCore parametric modeling system
 */
declare global {
  namespace HSCore {
    namespace Model {
      namespace Parametrization {
        /**
         * Window sill entity from the parametric model
         */
        interface WindowSill {
          /** Unique identifier for the window sill */
          id: string;
          /** X-axis scale factor */
          XScale: number;
          /** Y-axis scale factor */
          YScale: number;
          /** Z-axis scale factor */
          ZScale: number;
          /**
           * Gets the unique parent entity with scale information
           * @returns Parent entity or null if not found
           */
          getUniqueParent(): { XScale: number; YScale: number; ZScale: number } | null;
        }

        /**
         * Base entity interface with window sill retrieval capability
         */
        interface Entity {
          /**
           * Retrieves the window sill associated with this entity
           * @returns The window sill or undefined if not present
           */
          getWindowSill(): WindowSill | undefined;
        }
      }
    }
  }

  namespace THREE {
    /**
     * 4x4 transformation matrix from Three.js
     */
    class Matrix4 {
      /**
       * Sets this matrix to a scale transformation
       * @param x - X-axis scale factor
       * @param y - Y-axis scale factor
       * @param z - Z-axis scale factor
       */
      makeScale(x: number, y: number, z: number): this;
    }
  }
}