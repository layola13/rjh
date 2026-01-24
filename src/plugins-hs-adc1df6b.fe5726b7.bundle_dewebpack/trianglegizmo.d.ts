import { HSApp } from './HSApp';
import { Vector2 } from './Vector2';
import { HSCore } from './HSCore';

/**
 * Style configuration for visual elements
 */
interface StyleConfig {
  /** Style when element is selected */
  selected: Record<string, string | number>;
  /** Style when element is in normal state */
  normal: Record<string, string | number>;
  /** Style when element is hovered */
  hover: Record<string, string | number>;
}

/**
 * Coordinate point in 2D space
 */
interface Point {
  x: number;
  y: number;
}

/**
 * SVG element tuple representing a button (circle + triangle)
 */
type ButtonElements = [SVGCircleElement, SVGPathElement];

/**
 * Event data for view box changes
 */
interface ViewBoxChangedEvent {
  data?: {
    scaleChanged?: boolean;
  };
}

/**
 * Roof entity with parameters and properties
 */
interface RoofEntity {
  parameters: {
    roomLoop: {
      clone(): {
        scale(factor: number): {
          getAllCurves(): Curve[];
        };
      };
    };
  };
  signalDirty: Signal<void>;
}

/**
 * Geometric curve interface
 */
interface Curve {
  getMidPt(): Vector2;
  getDirection(): Vector2;
  clone(): Curve;
  scale(factor: number): Curve;
}

/**
 * Signal/Event handling interface
 */
interface Signal<T> {
  listen(handler: (data: T) => void): Signal<T>;
}

/**
 * Canvas drawing context
 */
interface CanvasContext {
  getScaleFactor(): number;
  circle(radius: number): SVGCircleElement;
  path(pathData: string): SVGPathElement;
  modelPointToCanvas(point: number[] | Vector2): Point;
  hscanvas: {
    signalViewBoxChanged: Signal<ViewBoxChangedEvent>;
  };
}

/**
 * Entity with roof property
 */
interface Entity {
  roof: RoofEntity;
}

/**
 * Interactive gizmo for controlling roof triangle pitch direction.
 * Displays circular buttons with triangle indicators at each roof edge midpoint,
 * allowing users to select the starting position for roof pitch calculation.
 */
export declare class TriangleGizmo extends HSApp.View.SVG.Gizmo {
  /** Event hooks for cleanup */
  private _eventHooks: HSApp.View.SVG.Events.Hook[];
  
  /** Collection of button elements (circle + triangle pairs) */
  private _buttons: ButtonElements[];
  
  /** Current scale factor for UI elements */
  private _scale: number;
  
  /** Style configuration for triangle indicators */
  private _roofPitchTriangleStyle: StyleConfig;
  
  /** Style configuration for circular buttons */
  private _roofPitchCircleStyle: StyleConfig;
  
  /** Index of currently selected button */
  private _selectedIndex: number;

  /**
   * Creates a new TriangleGizmo instance
   * @param context - Canvas drawing context
   * @param canvas - Canvas element
   * @param entity - Entity containing roof data
   */
  constructor(context: CanvasContext, canvas: unknown, entity: Entity);

  /**
   * Gets the associated roof entity
   */
  get roof(): RoofEntity;

  /**
   * Handles view box changes (zoom, pan)
   * @param event - View box changed event data
   */
  private _onViewBoxChanged(event?: ViewBoxChangedEvent): void;

  /**
   * Handles roof data changes, triggers UI rebuild
   */
  private _onRoofDirty(): void;

  /**
   * Main drawing lifecycle method
   */
  onDraw(): void;

  /**
   * Cleans up event listeners and removes UI elements
   */
  private _reset(): void;

  /**
   * Cleanup lifecycle method
   */
  onCleanup(): void;

  /**
   * Creates button elements for each roof edge
   */
  createButtons(): void;

  /**
   * Updates existing button positions and styles
   */
  UpdateButtons(): void;

  /**
   * Binds mouse event handlers to buttons
   */
  bindEventHook(): void;

  /**
   * Handles mouse hover events
   * @param isHovering - Whether mouse is entering or leaving
   * @param event - Mouse event
   */
  onHover(isHovering: boolean, event: MouseEvent): void;

  /**
   * Updates visual styles based on selection and hover state
   * @param hoveredElement - Currently hovered DOM element (optional)
   */
  private _updateStyle(hoveredElement?: EventTarget | null): void;

  /**
   * Handles button click to change roof pitch direction
   * @param event - Mouse event
   */
  onMouseDown(event: MouseEvent): void;

  /**
   * Builds SVG elements (circle + triangle) for a button
   * @param curve - Roof edge curve
   * @param offset - Offset distance from edge
   * @returns Tuple of circle and triangle SVG elements
   */
  buildBtnSvg(curve: Curve, offset: number): ButtonElements;

  /**
   * Generates SVG path data for triangle shape
   * @param vertex1 - First vertex position
   * @param vertex2 - Second vertex position
   * @param vertex3 - Third vertex position
   * @returns SVG path string
   */
  private _buildTrianglePaths(vertex1: Vector2, vertex2: Vector2, vertex3: Vector2): string;
}