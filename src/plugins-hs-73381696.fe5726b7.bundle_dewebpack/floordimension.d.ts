import type { HSCore } from './HSCore';
import type { HSApp } from './HSApp';

/**
 * Options for configuring the FloorDimension display
 */
interface FloorDimensionOptions {
  /** Font family for dimension labels */
  fontFamily: string;
  /** Color of the dimension text */
  fontColor: string;
  /** Font weight for dimension labels */
  fontWeight: number;
  /** Configuration for area label display */
  areaLabel: {
    /** Font size for area label */
    fontSize: number;
  };
  /** Configuration for room type label display */
  roomType: {
    /** Font size for room type label */
    fontSize: number;
  };
}

/**
 * Cached position data for dimension labels
 */
interface LabelPositionCache {
  /** X coordinate on canvas */
  x: number;
  /** Y coordinate on canvas */
  y: number;
}

/**
 * FloorDimension gizmo for displaying room area and type labels in the SVG view.
 * Extends the base SVG Gizmo class to render dimension annotations on floor plans.
 * 
 * Features:
 * - Displays room area with configurable units and precision
 * - Shows room type labels with localized names
 * - Automatically hides/shows based on zoom level and room visibility flags
 * - Responds to document settings changes (units, precision, visibility toggles)
 * - Calculates optimal label positioning using room mass properties
 */
export declare class FloorDimension extends HSApp.View.SVG.Gizmo {
  /** Type identifier for this gizmo */
  type: string;

  /** Minimum screen length (in pixels) required to show dimensions */
  kMinScreenLengthToShowDim: number;

  /** Display options for fonts, colors, and sizing */
  options: FloorDimensionOptions;

  /** Cached label position to avoid recalculation */
  private _labelPositionCache?: LabelPositionCache;

  /** Timer ID for debounced dimension refresh */
  private _refreshShowDimensionTimerId?: number;

  /** Array of event hooks for managing event listeners */
  private _eventHooks: HSApp.View.SVG.Events.Hook[];

  /** Computed geometry of the room */
  private geometry?: unknown;

  /** Calculated area of the room */
  private area?: number;

  /** Mass properties including centroid coordinates */
  private massProps?: number[];

  /** SVG text elements for displaying labels [roomType, areaLabel] */
  element?: unknown[];

  /**
   * Creates a new FloorDimension gizmo
   * @param entity - The room entity to display dimensions for
   * @param context - The rendering context
   * @param layer - The SVG layer to render into
   */
  constructor(
    entity: HSCore.Model.Room,
    context: HSApp.View.SVG.Context,
    layer: HSApp.View.SVG.Layer
  );

  /**
   * Sets the minimum screen length threshold for showing dimensions
   * @param minLength - Minimum length in screen pixels
   */
  setMinScreenLength(minLength: number): void;

  /**
   * Lifecycle hook called when the gizmo is activated.
   * Sets up signal listeners for:
   * - Entity dirty state changes
   * - Entity flag changes (hidden, dimensionOff, roomtypeOff)
   * - Entity field changes (roomType, roomTypeDisplayName)
   * - Slab builder updates
   * - View activation events
   * - Document settings changes (units, precision)
   * - Canvas viewbox/scale changes
   * - App settings changes
   * - Active layer changes
   */
  onActivate(): void;

  /**
   * Hides dimension elements temporarily and schedules a refresh.
   * Used during view transformations to prevent flickering.
   */
  hideElement(): void;

  /**
   * Lifecycle hook called when the gizmo is deactivated.
   * Cleans up all event listeners.
   */
  onDeactivate(): void;

  /**
   * Lifecycle hook called during cleanup.
   * Removes SVG elements and unbinds commands.
   */
  onCleanup(): void;

  /**
   * Determines if the dimension can be drawn based on:
   * - Not in ceiling environment
   * - Entity exists and is not hidden
   * - Room has valid geometry
   * - Room area meets minimum size requirement
   * - Mass properties are valid numbers
   * 
   * @returns True if dimension should be drawn
   */
  canDraw(): boolean;

  /**
   * Calculates the canvas scaling ratio for dimension labels.
   * Accounts for canvas scale factor and 2D/3D view differences.
   * 
   * @returns Scaling ratio for dimension elements
   */
  private _getCanvasChangeRatio(): number;

  /**
   * Main draw method that checks if drawing is possible and executes onDraw
   */
  draw(): void;

  /**
   * Performs the actual drawing of dimension labels.
   * - Checks visibility conditions
   * - Calculates font sizes based on canvas scale
   * - Formats area and room type strings
   * - Creates or updates SVG text elements
   * - Positions labels with text shadows for readability
   */
  onDraw(): void;

  /**
   * Binds mouse event handlers to dimension elements.
   * Sets cursor status on hover.
   */
  private _bindCommand(): void;

  /**
   * Unbinds all event handlers from dimension elements
   */
  private _unbindCommand(): void;

  /**
   * Handles app settings changes for room visibility toggles
   * @param event - Event data containing changed field name
   */
  private _onAppSettingsChanged(event: { data: { fieldName: string } }): void;

  /**
   * Retrieves the room geometry from the geometry manager
   * @returns Geometry object with outer boundary
   */
  private _getRoomGeometry(): { outer: unknown } | undefined;

  /**
   * Calculates the optimal position for dimension labels.
   * Uses room mass properties centroid and converts to canvas coordinates.
   * 
   * @returns Label position in canvas coordinates
   */
  private _getLabelPosition(): LabelPositionCache;

  /**
   * Determines if dimensions should be visible based on:
   * - Room's parent slab exists
   * - Room's base layer is active or is the outdoor layer
   * 
   * @returns True if dimensions should be visible
   */
  private _isDimensionVisible(): boolean;
}