import { HSApp } from './HSApp';
import { HSCore } from './HSCore';
import { HSConstants } from './HSConstants';
import { HSFPConstants } from './HSFPConstants';
import { HSCatalog } from './HSCatalog';
import { HSMath } from './HSMath';
import { GeLib } from './GeLib';
import { ResourceManager } from './ResourceManager';
import { LiveHint } from './LiveHint';

/**
 * Point in 2D space
 */
interface Point2D {
  x: number;
  y: number;
}

/**
 * Grip information for interactive control points
 */
interface GripInfo {
  point: Point2D;
  dir: HSMath.Vector2;
  refParam: string;
}

/**
 * Gizmo type definition for grip elements
 */
interface GizmoType {
  x: number;
  y: number;
  EditFlag?: string;
  Dir?: HSMath.Vector2;
  gripInfo?: GripInfo;
}

/**
 * SVG bounding rectangle with rotation
 */
interface SVGBoundingRect {
  left: number;
  top: number;
  width: number;
  height: number;
  rotation: number;
}

/**
 * Switch socket bounds data
 */
interface SwitchSocketBounds {
  contentBound: SVGBoundingRect;
  wholeBound: SVGBoundingRect;
}

/**
 * View box change event data
 */
interface ViewBoxChangeEvent {
  data: {
    scaleChanged: boolean;
  };
}

/**
 * Signal event with command data
 */
interface CommandEvent {
  data?: {
    cmd?: {
      type: string;
    };
  };
}

/**
 * Event hook for SVG element interactions
 */
declare class EventHook {
  constructor(
    element: unknown,
    eventType: unknown,
    context: unknown,
    isImmediate?: boolean
  );
  
  drag(
    onMove: (dx: number, dy: number, x: number, y: number, event: MouseEvent) => void,
    onStart: (x: number, y: number, event: MouseEvent) => void,
    onEnd: (event: MouseEvent) => void
  ): this;
  
  mouseover(handler: () => void): this;
  mouseout(handler: () => void): this;
  dispose(): void;
}

/**
 * Available cursor styles for grips based on resize direction
 */
declare const CURSOR_STYLES: readonly [
  'ew-resize',
  'nesw-resize',
  'ns-resize',
  'nwse-resize'
];

/**
 * Angle offset for cursor calculation (22.5 degrees)
 */
declare const ANGLE_OFFSET: 22.5;

/**
 * Calculate midpoint between two points
 */
declare function calculateMidpoint(pointA: Point2D, pointB: Point2D): Point2D;

/**
 * Check if entity is a customization product
 */
declare function isCustomizationProduct(entity: HSCore.Model.Entity): boolean;

/**
 * Check if customization product can be resized
 */
declare function canCustomizationProductResize(entity: HSCore.Model.Entity): boolean;

/**
 * Check if host wall is an arc
 */
declare function isHostWallArc(entity: HSCore.Model.Entity): boolean;

/**
 * Get stroke color based on entity state
 */
declare function getStrokeColor(entity: HSCore.Model.Entity, isInvalid: boolean): string;

/**
 * Content selection gizmo for interactive editing of 2D entities.
 * Provides resize grips, bounds visualization, and drag interaction.
 */
declare class ContentSelectedGizmo extends HSApp.View.Base.Gizmo {
  /**
   * Application instance reference
   */
  readonly app: HSApp.Application;
  
  /**
   * Command manager for handling user interactions
   */
  private readonly _cmdMgr: HSApp.CommandManager;
  
  /**
   * Flag indicating if the entity's 2D view data is invalid
   */
  private _isInvalid: boolean;
  
  /**
   * Currently hovered grip element
   */
  private _mouseOverElement: unknown | null;
  
  /**
   * Scale factor for fixed-size elements (compensates for zoom)
   */
  private _fixedSizeFactor: number;
  
  /**
   * Event hook subscriptions
   */
  private _eventHooks: EventHook[];
  
  /**
   * Map of response elements to their visual counterparts
   */
  private readonly _visualElementByResponseElement: Map<unknown, unknown>;
  
  /**
   * Group containing all grip elements
   */
  private _gripsGroup?: unknown;
  
  /**
   * Interactive response elements (invisible, larger hit areas)
   */
  private _gripResponseElements: unknown[];
  
  /**
   * Visual grip elements (visible control points)
   */
  private _gripElements: unknown[];
  
  /**
   * Elements showing member bounds
   */
  private _memberBoundElements: unknown[];
  
  /**
   * Grip positions in canvas space
   */
  grips: Point2D[];
  
  /**
   * Cursor indices for each grip
   */
  gizmoCursors: number[];
  
  /**
   * Mapping of elements to their gizmo types
   */
  private _gizmoTypesByElements: [unknown, GizmoType][];
  
  /**
   * Resizable grip elements
   */
  private _resizableElements: unknown[];
  
  /**
   * Element currently being dragged
   */
  private _draggingElement: unknown | null;
  
  /**
   * Flag indicating mouse is over the dragging element
   */
  private _mouseOverDraggingElement: boolean;
  
  /**
   * Style for grip response areas
   */
  readonly gripResponseStyle: Record<string, unknown>;
  
  /**
   * Style for visible grips
   */
  readonly gripStyle: Record<string, unknown>;
  
  /**
   * @param manager - Gizmo manager instance
   * @param entity - Entity being edited
   * @param layer - SVG layer for rendering
   */
  constructor(manager: unknown, entity: HSCore.Model.Entity, layer: unknown);
  
  /**
   * Get 2D view validation state for the entity
   */
  private _get2dViewData(): boolean;
  
  /**
   * Main draw method - renders grips and bounds based on entity type
   */
  draw(): void;
  
  /**
   * Handle view box changes (zoom/pan)
   */
  private _onViewBoxChanged(event: ViewBoxChangeEvent): void;
  
  /**
   * Determine if content selection bounds should be hidden
   */
  hideContentSelectedBound(): boolean;
  
  /**
   * Draw grips for parametric opening entities
   */
  private _drawParametricOpening(entity: HSCore.Model.ParametricOpening): void;
  
  /**
   * Draw grips for corner window entities
   */
  private _drawCornerwindowGrip(entity: HSCore.Model.CornerWindow): void;
  
  /**
   * Draw grips for bay window entities
   */
  private _drawBayWindowGrip(entity: HSCore.Model.BayWindow): void;
  
  /**
   * Draw grips for corner flat window entities
   */
  private _drawCornerFlatWindowGrip(entity: HSCore.Model.CornerFlatWindow): void;
  
  /**
   * Draw grips for P-ordinary window entities
   */
  private _drawPOrdinaryWindowGrip(entity: HSCore.Model.POrdinaryWindow): void;
  
  /**
   * Calculate cursor index based on angle (for directional resize cursors)
   */
  private _calcuCursorIndex(angle: number): number;
  
  /**
   * Calculate cursor index with angle offset
   */
  private _calculateCursorIndex(angle: number): number;
  
  /**
   * Draw grips for switch/socket entities
   */
  private _drawSwithSocketGrip(entity: HSCore.Model.Entity): void;
  
  /**
   * Check if entity's host is an arc wall
   */
  private _isHostWallArc(entity: HSCore.Model.Entity): boolean;
  
  /**
   * Draw grips for general content entities
   */
  private _drawContentGrip(entity: HSCore.Model.Entity): void;
  
  /**
   * Draw grips for roof opening entities
   */
  private _drawRoofOpening(entity: HSCore.Model.Window): void;
  
  /**
   * Check if entity is a customization product
   */
  private _isCustomizationProduct(entity: HSCore.Model.Entity): boolean;
  
  /**
   * Check if customization product can be resized
   */
  private _couldCustomizationResizeable(entity: HSCore.Model.Entity): boolean;
  
  /**
   * Cleanup method called when gizmo is destroyed
   */
  onCleanup(): void;
  
  /**
   * Build SVG line path string
   */
  private _buildSVGLine(start: Point2D, end: Point2D): string;
  
  /**
   * Get stroke color based on entity state
   */
  private _getStroke(): string;
  
  /**
   * Clean up and remove SVG elements
   */
  private _cleanUpElements(elements: unknown[]): void;
  
  /**
   * Handle command running state
   */
  private _onCommandRunning(): void;
  
  /**
   * Handle command stopped state
   */
  private _onCommandStopped(event: CommandEvent): void;
  
  /**
   * Handle entity host change
   */
  private _onHostChanged(): void;
  
  /**
   * Hide all grip elements
   */
  private _hideGrips(): void;
  
  /**
   * Get visual element corresponding to response element
   */
  private _getVisualElement(responseElement: unknown): unknown;
  
  /**
   * Show all grip elements
   */
  private _showGrips(): void;
  
  /**
   * Update fixed size factor based on zoom level
   */
  private _updateFixedSizeFactor(): void;
  
  /**
   * Bind drag interaction commands for general content
   */
  private _bindCommand(): void;
  
  /**
   * Bind drag interaction commands for corner windows
   */
  private _bindCornerWindowCommand(): void;
  
  /**
   * Bind drag interaction commands for parametric windows
   */
  private _bindParametricWindowCommand(): void;
}

export default ContentSelectedGizmo;