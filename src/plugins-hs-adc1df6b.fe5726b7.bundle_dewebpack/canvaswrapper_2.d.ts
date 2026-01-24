/**
 * Canvas wrapper module for managing 2D auxiliary canvas rendering
 * Handles layer-based entity filtering and canvas lifecycle
 */

import { HSApp } from './types/HSApp';
import { HSCore } from './types/HSCore';

/**
 * Wrapper class for managing auxiliary 2D canvas rendering
 * Provides canvas creation, resize handling, and entity filtering based on layer hierarchy
 */
export declare class CanvasWrapper {
  /**
   * The auxiliary 2D canvas instance
   * @private
   */
  private _aux2DCanvas?: HSApp.View.SVG.AuxCanvas;

  /**
   * The DOM container element for the auxiliary canvas
   * @private
   */
  private _aux2DContainer?: HTMLElement;

  /**
   * Observer for handling container resize events
   * @private
   */
  private _resizeObserver?: ResizeObserver;

  /**
   * Reference to the root layer from the floorplan scene
   * @private
   */
  private _rootLayer?: HSCore.Model.Layer;

  /**
   * Reference to the outdoor layer from the floorplan scene
   * @private
   */
  private _outdoorLayer?: HSCore.Model.Layer;

  /**
   * Creates a new CanvasWrapper instance
   * @param container - The DOM element that will contain the auxiliary canvas
   */
  constructor(container: HTMLElement);

  /**
   * Gets the auxiliary 2D canvas instance
   * @returns The canvas instance if created, undefined otherwise
   */
  get aux2DCanvas(): HSApp.View.SVG.AuxCanvas | undefined;

  /**
   * Checks if an entity is inherited from a specific layer
   * @param entity - The entity to check
   * @param layer - The target layer to verify inheritance from
   * @returns True if the entity is a child of the specified layer
   * @private
   */
  private _isInheritedFromLayer(
    entity: HSCore.Model.Entity,
    layer?: HSCore.Model.Layer
  ): boolean;

  /**
   * Creates and initializes the auxiliary 2D canvas
   * Sets up entity filtering rules, view settings, and resize observer
   * @remarks
   * - Only entities from root or outdoor layers are rendered
   * - Cameras and layers are always created
   * - Walls must belong to root or outdoor layer
   * - Slabs/faces are filtered to root layer only
   * - Custom structures, roofs, and openings are filtered to root or outdoor layers
   */
  createAux2D(): void;

  /**
   * Sets up the resize observer to monitor container dimension changes
   * @private
   */
  private _listenResizeObserver(): void;

  /**
   * Destroys the auxiliary canvas and cleans up resources
   * Disconnects the resize observer and clears the canvas instance
   */
  destroyAux2D(): void;

  /**
   * Handles canvas resize by triggering onResized and fit operations
   * Called automatically when container dimensions change
   */
  resizeAux2D(): void;
}

/**
 * Configuration interface for canvas entity creation rules
 * @internal
 */
interface CanvasSetupConfig {
  /**
   * Determines if an entity can be created/rendered on the canvas
   * @param entity - The entity to evaluate
   * @returns True if the entity should be rendered
   */
  canCreateEntity(entity: HSCore.Model.Entity): boolean;

  /**
   * Override settings for various view types
   */
  overrideViewSettings: {
    /**
     * Face rendering configuration
     */
    face: {
      /**
       * Whether to use mixpaint rendering for faces
       */
      useMixpaint: boolean;

      /**
       * Style provider for face rendering
       */
      style: {
        /**
         * Gets the rendering style for a face entity
         * @param entity - The face entity
         * @param context - Additional rendering context
         * @returns Style object with fill color and opacity
         */
        getStyle(entity: HSCore.Model.Face, context: unknown): {
          fill: string;
          opacity: number;
        };
      };
    };

    /**
     * Layer rendering configuration
     */
    layer: {
      /**
       * Determines if a layer should be drawn
       * @param layer - The layer to evaluate
       * @returns True if layer is root or outdoor layer
       */
      canDraw(layer: HSCore.Model.Layer): boolean;
    };

    /**
     * Wall rendering configuration
     */
    wall: {
      /**
       * Determines if a wall should be drawn
       * @param wall - The wall entity to evaluate
       * @returns True if wall belongs to root or outdoor layer
       */
      canDraw(wall: HSCore.Model.Wall): boolean;
    };
  };
}

/**
 * Type definitions for HSCore model entities
 * @internal
 */
declare namespace HSCore.Model {
  interface Entity {
    getParentsInPath(): Entity[];
  }

  interface Camera extends Entity {}
  interface Layer extends Entity {}
  interface Wall extends Entity {}
  interface Slab extends Entity {}
  interface Face extends Entity {}
  interface NCustomizedStructure extends Entity {}
  interface NCustomizedParametricRoof extends Entity {}
  interface Opening extends Entity {}
  interface ParametricOpening extends Entity {}
}

/**
 * Type definitions for HSApp view components
 * @internal
 */
declare namespace HSApp.View.SVG {
  interface AuxCanvas {
    setupCanvas(config: CanvasSetupConfig): void;
    activate(): void;
    show(): void;
    onResized(): void;
    fit(): void;
    clear(): void;
  }

  interface AuxCanvasConstructor {
    new (container: HTMLElement): AuxCanvas;
  }
}

/**
 * Type definitions for HSApp application
 * @internal
 */
declare namespace HSApp {
  interface App {
    floorplan: {
      scene: {
        rootLayer: HSCore.Model.Layer;
        outdoorLayer: HSCore.Model.Layer;
      };
    };
  }

  namespace App {
    function getApp(): App;
  }
}