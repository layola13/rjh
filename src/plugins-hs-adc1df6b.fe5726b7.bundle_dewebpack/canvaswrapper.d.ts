/**
 * CanvasWrapper - Manages auxiliary 2D canvas rendering for architectural layers
 * 
 * This class handles the creation and lifecycle of a 2D canvas overlay that displays
 * architectural elements (walls, slabs, faces, etc.) with custom styling based on
 * their layer hierarchy and properties.
 */

import { HSApp } from './app-types';
import { HSCore } from './core-types';

/**
 * Configuration for entity rendering on the auxiliary canvas
 */
interface CanvasSetupConfig {
  /** Determines whether an entity should be rendered on the canvas */
  canCreateEntity: (entity: HSCore.Model.Entity) => boolean;
  
  /** Custom rendering settings that override default view behavior */
  overrideViewSettings: {
    face: FaceViewSettings;
    layer: LayerViewSettings;
    wall: WallViewSettings;
  };
}

/**
 * Rendering configuration for face entities
 */
interface FaceViewSettings {
  /** Whether to use mixed paint rendering */
  useMixpaint: boolean;
  
  style: {
    /** Returns custom style for a face entity */
    getStyle: (entity: HSCore.Model.Face, context: unknown) => StyleProperties;
  };
}

/**
 * Rendering configuration for layer entities
 */
interface LayerViewSettings {
  /** Determines if a layer should be drawn */
  canDraw: (layer: HSCore.Model.Layer) => boolean;
}

/**
 * Rendering configuration for wall entities
 */
interface WallViewSettings {
  /** Determines if a wall should be drawn */
  canDraw: (wall: HSCore.Model.Wall) => boolean;
  
  style: {
    /** Returns custom style for a wall entity based on its properties and layer */
    getStyle: (wall: HSCore.Model.Wall) => StyleProperties | undefined;
  };
}

/**
 * CSS-like style properties for canvas rendering
 */
interface StyleProperties {
  fill?: string;
  stroke?: string;
  opacity?: number;
}

/**
 * Manages auxiliary 2D canvas for architectural visualization
 * 
 * Provides functionality to:
 * - Create and manage a 2D canvas overlay
 * - Render architectural entities with layer-aware styling
 * - Handle responsive canvas resizing
 * - Filter entities based on layer hierarchy
 */
export class CanvasWrapper {
  private _aux2DCanvas?: HSApp.View.SVG.AuxCanvas;
  private _aux2DContainer: HTMLElement;
  private _resizeObserver?: ResizeObserver;
  private _layer: HSCore.Model.Layer;
  private _belowLayers?: HSCore.Model.Layer[];

  /**
   * Creates a new CanvasWrapper instance
   * 
   * @param container - HTML element that will host the auxiliary canvas
   * @param layer - The primary layer to render
   */
  constructor(container: HTMLElement, layer: HSCore.Model.Layer) {
    this._aux2DContainer = container;
    this.updateLayer(layer);
  }

  /**
   * Gets the auxiliary 2D canvas instance
   */
  get aux2DCanvas(): HSApp.View.SVG.AuxCanvas | undefined {
    return this._aux2DCanvas;
  }

  /**
   * Updates the active layer and recalculates layer hierarchy
   * 
   * @param layer - The new layer to set as active
   */
  updateLayer(layer: HSCore.Model.Layer): void {
    this._layer = layer;
    this._belowLayers = this._getBelowLayersInOrder(this._layer, 2);
  }

  /**
   * Retrieves layers below the specified layer in rendering order
   * 
   * @param layer - The reference layer
   * @param count - Number of layers below to retrieve
   * @returns Array of layers below the reference layer, or undefined if not found
   */
  private _getBelowLayersInOrder(
    layer: HSCore.Model.Layer,
    count: number
  ): HSCore.Model.Layer[] | undefined {
    const allLayers = layer.getUniqueParent().getActualLayersOnGround();
    const layerIndex = allLayers.indexOf(layer);

    if (layerIndex > -1) {
      const startIndex = Math.max(0, layerIndex - count);
      return allLayers.slice(startIndex, layerIndex);
    }

    return undefined;
  }

  /**
   * Checks if an entity is inherited from a specific layer
   * 
   * @param entity - The entity to check
   * @param layer - The layer to verify inheritance from
   * @returns True if the entity belongs to the layer's hierarchy
   */
  private _isInheritedFromLayer(
    entity: HSCore.Model.Entity,
    layer?: HSCore.Model.Layer
  ): boolean {
    const parentPath = entity.getParentsInPath();
    return layer ? parentPath.includes(layer) : false;
  }

  /**
   * Creates and initializes the auxiliary 2D canvas
   * 
   * Sets up:
   * - Entity filtering based on type and layer
   * - Custom styling for walls, faces, and layers
   * - Resize observation for responsive behavior
   */
  createAux2D(): void {
    if (!this._aux2DContainer || this._aux2DCanvas) {
      return;
    }

    this._aux2DCanvas = new HSApp.View.SVG.AuxCanvas(this._aux2DContainer);

    const canDrawWall = (wall: HSCore.Model.Wall): boolean => {
      return (
        this._isInheritedFromLayer(wall, this._layer) ||
        this._belowLayers?.some((belowLayer) =>
          this._isInheritedFromLayer(wall, belowLayer)
        ) ||
        false
      );
    };

    const config: CanvasSetupConfig = {
      canCreateEntity: (entity: HSCore.Model.Entity): boolean => {
        // Always render cameras and layers
        if (
          entity instanceof HSCore.Model.Camera ||
          entity instanceof HSCore.Model.Layer
        ) {
          return true;
        }

        // Walls can be rendered if they belong to current or below layers
        if (entity instanceof HSCore.Model.Wall) {
          return canDrawWall(entity);
        }

        // Other architectural elements must belong to the current layer
        if (
          entity instanceof HSCore.Model.Slab ||
          entity instanceof HSCore.Model.Face ||
          entity instanceof HSCore.Model.NCustomizedStructure ||
          entity instanceof HSCore.Model.NCustomizedParametricRoof ||
          entity instanceof HSCore.Model.Opening ||
          entity instanceof HSCore.Model.ParametricOpening
        ) {
          return this._isInheritedFromLayer(entity, this._layer);
        }

        return false;
      },

      overrideViewSettings: {
        face: {
          useMixpaint: false,
          style: {
            getStyle: (_entity: HSCore.Model.Face, _context: unknown): StyleProperties => {
              return {
                fill: '#EAEBEF',
                opacity: 0.8,
              };
            },
          },
        },

        layer: {
          canDraw: (layer: HSCore.Model.Layer): boolean => {
            return (
              layer === this._layer ||
              this._belowLayers?.includes(layer) ||
              false
            );
          },
        },

        wall: {
          canDraw: canDrawWall,
          style: {
            getStyle: (wall: HSCore.Model.Wall): StyleProperties | undefined => {
              // Only style generic walls
              if (wall.wallType !== HSCore.Model.WallTypeEnum.generic) {
                return undefined;
              }

              // Style based on whether wall is load-bearing and its layer depth
              if (wall.isLoadBearing) {
                // Current layer: dark gray
                if (this._isInheritedFromLayer(wall, this._layer)) {
                  return { fill: '#838486', stroke: '#838486' };
                }
                // One layer below: medium gray
                if (this._isInheritedFromLayer(wall, this._belowLayers?.[1])) {
                  return { fill: '#AAACAF', stroke: '#AAACAF' };
                }
                // Two layers below: light gray
                if (this._isInheritedFromLayer(wall, this._belowLayers?.[0])) {
                  return { fill: '#D3D5D9', stroke: '#ABACB2' };
                }
              } else {
                // Non-load-bearing walls: lighter color scheme
                if (this._isInheritedFromLayer(wall, this._layer)) {
                  return { fill: '#D4D5DA', stroke: '#818288' };
                }
                if (this._isInheritedFromLayer(wall, this._belowLayers?.[1])) {
                  return { fill: '#DDDEE3', stroke: '#ABACB2' };
                }
                if (this._isInheritedFromLayer(wall, this._belowLayers?.[0])) {
                  return { fill: '#E4E6EC', stroke: '#BFC1C6' };
                }
              }

              return undefined;
            },
          },
        },
      },
    };

    this._aux2DCanvas.setupCanvas(config);
    this._aux2DCanvas.activate();
    this._aux2DCanvas.show();
    this._listenResizeObserver();
  }

  /**
   * Sets up a ResizeObserver to handle container size changes
   * @private
   */
  private _listenResizeObserver(): void {
    this._resizeObserver = new ResizeObserver(() => {
      this.resizeAux2D();
    });

    this._resizeObserver.observe(this._aux2DContainer);
  }

  /**
   * Destroys the auxiliary canvas and cleans up resources
   * 
   * - Disconnects resize observer
   * - Clears canvas content
   * - Releases references
   */
  destroyAux2D(): void {
    this._resizeObserver?.disconnect();
    this._resizeObserver = undefined;

    this._aux2DCanvas?.clear();
    this._aux2DCanvas = undefined;
    this._aux2DContainer = undefined;
  }

  /**
   * Handles canvas resize events
   * 
   * Triggers canvas resize and fit operations to maintain proper scaling
   */
  resizeAux2D(): void {
    if (this._aux2DCanvas) {
      this._aux2DCanvas.onResized();
      this._aux2DCanvas.fit();
    }
  }
}