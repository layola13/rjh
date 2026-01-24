/**
 * Sketch module for 2D extraordinary sketch visualization
 * Manages SVG rendering and interaction for sketch elements including faces, edges, points, and dimensions
 */

import { HSCore } from '@hscore/model';
import { HSApp } from '@hsapp/view';

/**
 * SVG group container for organizing sketch elements by type
 */
interface SketchSVGGroups {
  /** Background layer group */
  bkg: SVGGElement;
  /** Face elements group */
  face: SVGGElement;
  /** Edge elements group */
  edge: SVGGElement;
  /** Point elements group */
  point: SVGGElement;
  /** Dimension and guideline group */
  dimension: SVGGElement;
}

/**
 * Event data for entity dirty notifications
 */
interface EntityDirtyEvent {
  data: {
    type: HSCore.Model.EntityEventType;
    fieldName?: string;
    newValue?: unknown;
  };
}

/**
 * Event data for child entity additions
 */
interface ChildAddedEvent {
  data: {
    entity: HSCore.Model.Entity;
  };
}

/**
 * Transaction manager event for state changes
 */
interface TransactionEvent {
  data: {
    request: unknown;
  };
}

/**
 * Main Sketch display component for 2D extraordinary sketches
 * Renders and manages all sketch geometry including background, faces, edges, points, and guidelines
 * 
 * @extends HSApp.View.SVG.Base.Display2D
 */
export declare class Sketch extends HSApp.View.SVG.Base.Display2D {
  /**
   * SVG groups organized by element type
   * @private
   */
  private _svgGroups: SketchSVGGroups | undefined;

  /**
   * Creates a new Sketch display instance
   * 
   * @param context - Rendering context
   * @param parent - Parent display object
   * @param group - SVG group container
   * @param entity - Interactive model entity
   */
  constructor(
    context: HSApp.View.SVG.Context,
    parent: HSApp.View.SVG.Base.Display,
    group: SVGGElement,
    entity: HSApp.ExtraordinarySketch2d.InteractiveModel
  );

  /**
   * Initialize the sketch display
   * Sets up SVG groups, sketch elements, and event listeners
   * 
   * @param layer - Optional layer entity to listen for changes
   */
  init(layer?: HSCore.Model.Entity): void;

  /**
   * Listen to layer field changes (e.g., slab editor updates)
   * Recreates sketch elements when source data changes
   * 
   * @param layer - Layer entity to observe
   * @private
   */
  private _listenLayer(layer: HSCore.Model.Entity): void;

  /**
   * Listen to transaction manager state changes (undo/redo/commit)
   * Reselects interactive models after transaction operations
   * 
   * @private
   */
  private _listenStateChanged(): void;

  /**
   * Handle child entity added to the sketch
   * Creates corresponding interactive model and display
   * 
   * @param event - Child added event data
   */
  onChildAdded(event: ChildAddedEvent): void;

  /**
   * Update the internal sketch data model
   * Clears existing model mappings and updates source reference
   * 
   * @param newSourceModel - New source model data
   * @private
   */
  private _updateSketchData(newSourceModel: HSCore.Model.ExtraordinarySketch2d): void;

  /**
   * Handle entity dirty events
   * Propagates dirty notifications to child items based on event type
   * Handles Position, Geometry, and Material change types
   * 
   * @param event - Entity dirty event data
   */
  onEntityDirty(event: EntityDirtyEvent): void;

  /**
   * Initialize SVG group containers for each element type
   * Creates groups for: background, face, edge, point, dimension
   * 
   * @private
   */
  private _initGroups(): void;

  /**
   * Initialize all sketch elements from source model
   * Creates interactive models and displays for:
   * - Background
   * - Faces
   * - Edges (extracted from faces)
   * - Points (extracted from faces)
   * - Guidelines
   * 
   * @private
   */
  private _initSketchElements(): void;

  /**
   * Recreate child display for given interactive model
   * Removes existing display if present, creates new display, initializes and adds to scene
   * 
   * @param model - Interactive model to create display for
   * @private
   */
  private _reCreateChild(model: HSApp.ExtraordinarySketch2d.InteractiveModel): void;

  /**
   * Clear all child displays
   * Removes all children from canvas and internal collections
   * 
   * @private
   */
  private _clearAllChild(): void;

  /**
   * Factory method to create appropriate display object for model type
   * 
   * Supported types:
   * - ExtraordinaryBackground → Background display
   * - ExtraordinaryFace2d → Face display
   * - ExtraordinaryEdge → Line/Circle/CircleArc display (based on curve type)
   * - ExtraordinaryPoint2d → Point2d display
   * - ExtraordinaryGuideline → GuideLine2d display
   * 
   * @param model - Interactive model to create display for
   * @returns Display object or undefined if type not supported
   * @private
   */
  private _createChildDisplay(
    model: HSApp.ExtraordinarySketch2d.InteractiveModel
  ): HSApp.View.SVG.Base.Display | undefined;
}