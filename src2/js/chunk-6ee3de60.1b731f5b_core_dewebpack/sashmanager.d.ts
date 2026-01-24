import { EventBus } from './EventBus';
import { PolyId, HitResult } from './PolyId';
import { addDecorationBarRet } from './DecorationBar';
import { 
  PushSashHardwareManager, 
  FoldHardwareManager 
} from './HardwareManager';
import {
  ShapeType,
  Sash,
  PushSash,
  FoldSash,
  GuardSash,
  CircleSash,
  KfcSash,
  DoubleKfcSash,
  DoubleSash,
  Slide,
  AntiTheft,
  Fold,
  DimType,
  FenesCreator
} from './Shapes';
import {
  EventType,
  KfcSashSettings,
  DoubleKfcSashSettings,
  SashSettings,
  AntiTheftSettings,
  DoubleSashSettings,
  SlideSettings,
  FoldSashSettings,
  SashGroupSettings
} from './Events';

/**
 * Represents a fenes (window/door element) with its associated polygon and type
 */
interface IFenes {
  /** The shape type of the fenes */
  type: ShapeType;
  /** Polygon identifier */
  polyId: PolyId;
  /** The actual shape object */
  obj: any;
  /** Whether the fenes is enabled */
  enabled: boolean;
  /** Offset vector for positioning */
  offvec: Vector;
  /** Whether the fenes is currently selected */
  selected: boolean;
  /** The polygon geometry */
  polygon: Polygon;

  /** Translate the fenes by a vector */
  translate(vector: Vector): void;
  /** Clear all child elements */
  clearChildren(): void;
  /** Hide assist elements */
  hideAssist(): void;
  /** Remove the fenes from the scene */
  remove(): void;
  /** Delete the fenes */
  delete(): void;
  /** Serialize to JSON */
  toJSON(): any;
  /** Deserialize from JSON */
  deserialize(data: any): IFenes;
  /** Add a mullion to the fenes */
  addMullion(mullion: any): boolean;
  /** Add a decoration bar to the fenes */
  addDecorationBar(bar: any, view: any): addDecorationBarRet;
  /** Drag a mullion */
  dragMullion(mullion: any, point: Point): boolean;
  /** Drag an inner mullion */
  dragInnerMullion(mullion: any, point: Point, direction: Vector): boolean;
  /** Hit test for bar elements */
  hitBar(point: Point, view: any): HitResult;
  /** Snap to edge */
  snapEdge(point: Point, threshold: number, direction: Vector): any;
}

/**
 * Interface for the host frame object
 */
interface IHost {
  /** The underlying frame object */
  obj: any;
  /** The frame's polygon geometry */
  polygon: Polygon;
  /** The view instance */
  view: IView;
  /** Add a child object to the frame */
  add(obj: any): void;
  /** Remove a child object from the frame */
  remove(obj: any): void;
}

/**
 * Interface for the view object
 */
interface IView {
  /** Event bus for publish/subscribe */
  eventBus: EventBus;
  /** Whether the view is currently being dragged */
  isDragging: boolean;
}

/**
 * Callback to find a polygon by its ID
 */
type PolygonFinder = (polyId: PolyId) => Polygon | undefined;

/**
 * Callback to find a handle by polygon ID
 */
type HandleFinder = (polyId: PolyId) => Sash | undefined;

/**
 * Serialized sash data structure
 */
interface SashJSON {
  /** The shape type */
  type: ShapeType;
  /** The polygon identifier */
  polyId: any;
  /** Additional sash-specific data */
  [key: string]: any;
}

/**
 * Manages all sashes (windows/doors) within a frame.
 * Handles creation, deletion, serialization, and interaction with various sash types.
 */
export declare class SashManager {
  /** The host frame containing the sashes */
  private readonly host: IHost;
  
  /** Internal collection of all fenes (sash wrappers) */
  private _ifenes: IFenes[];
  
  /** Callback to find handles by polygon ID */
  private readonly findHandle: HandleFinder;

  /**
   * Creates a new SashManager instance
   * @param host - The host frame object
   * @param hookEvents - Whether to automatically hook up event listeners (default: true)
   */
  constructor(host: IHost, hookEvents?: boolean);

  /**
   * Subscribes to relevant events from the view's event bus
   * - handle_position_change: Updates shutter manager when handles move
   * - wall_shape_change: Updates hardware dimensions when wall shapes change
   */
  private hookEvent(): void;

  /**
   * Finds all fenes associated with a specific polygon ID
   * @param polyId - The polygon identifier to search for
   * @returns Array of matching fenes
   */
  fenesByPolyId(polyId: PolyId): IFenes[];

  /**
   * Attempts to add a mullion (vertical/horizontal divider) to any sash
   * @param mullion - The mullion object to add
   * @returns true if successfully added to any sash, false otherwise
   */
  addMullion(mullion: any): boolean;

  /**
   * Attempts to add a decoration bar to any sash
   * @param bar - The decoration bar object to add
   * @param view - The current view instance
   * @returns Result code indicating success or reason for failure
   */
  addDecorationBar(bar: any, view: any): addDecorationBarRet;

  /**
   * Attempts to drag a mullion within any sash
   * @param mullion - The mullion being dragged
   * @param point - The target point
   * @returns true if drag was handled by any sash
   */
  dragMullion(mullion: any, point: Point): boolean;

  /**
   * Attempts to drag an inner mullion within any sash
   * @param mullion - The inner mullion being dragged
   * @param point - The target point
   * @param direction - The drag direction vector
   * @returns true if drag was handled by any sash
   */
  dragInnerMullion(mullion: any, point: Point, direction: Vector): boolean;

  /**
   * Adds a standard or circle sash to the frame
   * @param polygon - The polygon geometry for the sash
   * @param type - The sash type (default: ShapeType.Sash)
   * @returns true if successfully added, false if already exists
   */
  addSash(polygon: Polygon, type?: ShapeType): boolean;

  /**
   * Adds a KFC (Kentucky Fried Chicken) style sash
   * @param polygon - The polygon geometry (must not be circular)
   * @param type - The sash type (default: ShapeType.Sash)
   * @returns true if successfully added, false otherwise
   */
  addKfcSash(polygon: Polygon, type?: ShapeType): boolean;

  /**
   * Adds a double KFC sash
   * @param polygon - The polygon geometry (must not be circular)
   * @returns true if successfully added, false otherwise
   */
  addDoubleKfcSash(polygon: Polygon): boolean;

  /**
   * Adds a double sash (dual-opening window)
   * @param polygon - The polygon geometry
   * @param type - The sash type (default: ShapeType.DoubleSash)
   * @returns true if successfully added, false otherwise
   */
  addDoubleSash(polygon: Polygon, type?: ShapeType): boolean;

  /**
   * Adds a sliding sash
   * @param polygon - The polygon geometry
   * @param slideConfig - Configuration for the slide mechanism
   * @returns true if successfully added, false otherwise
   */
  addSlide(polygon: Polygon, slideConfig: any): boolean;

  /**
   * Adds an anti-theft shutter/grille
   * @param polygon - The polygon geometry
   * @returns true if successfully added, false otherwise
   */
  addShutter(polygon: Polygon): boolean;

  /**
   * Adds a folding sash
   * @param polygon - The polygon geometry
   * @param type - The fold type (default: ShapeType.FoldSash)
   * @returns true if successfully added, false otherwise
   */
  addFold(polygon: Polygon, type?: ShapeType): boolean;

  /**
   * Adds a shade push sash (window with integrated shade)
   * @param polygon - The polygon geometry (must not be circular)
   * @returns true if successfully added, false otherwise
   */
  addShadePushSash(polygon: Polygon): boolean;

  /**
   * Adds a double shade push sash
   * @param polygon - The polygon geometry (must not be circular)
   * @returns true if successfully added, false otherwise
   */
  addDoubleShadePushSash(polygon: Polygon): boolean;

  /**
   * Recreates all sashes based on a polygon finder callback.
   * Non-shutter sashes are processed first, then shutters.
   * @param polygonFinder - Callback to retrieve updated polygon by ID
   */
  recreate(polygonFinder: PolygonFinder): void;

  /**
   * Resets all offset vectors to zero for all fenes
   */
  resetOffvec(): void;

  /**
   * Internal helper to remove a sash by index
   * @param index - The index in the _ifenes array
   * @param polygonFinder - Callback to find polygon for redraw
   * @param view - The view instance for drawing
   */
  private _removeSash(index: number, polygonFinder: PolygonFinder, view: any): void;

  /**
   * Deletes the currently selected sash
   * @param polygonFinder - Callback to find polygon for redraw
   * @param view - The view instance for drawing
   */
  delete(polygonFinder: PolygonFinder, view: any): void;

  /**
   * Removes all sashes associated with polygons at or after the given index
   * @param polygonIndex - The starting polygon index
   * @param polygonFinder - Callback to find polygons
   * @param view - The view instance for drawing
   */
  removeSash(polygonIndex: number, polygonFinder: PolygonFinder, view: any): void;

  /**
   * Relocates sashes to new polygons based on their center points
   * @param polygons - Array of available polygons
   * @param polygonFinder - Callback to find polygons
   * @param view - The view instance for drawing
   */
  reLocateSashes(polygons: Polygon[], polygonFinder: PolygonFinder, view: any): void;

  /**
   * Serializes all sashes to JSON.
   * Non-shutter sashes are serialized first, followed by shutters.
   * @returns Array of serialized sash data
   */
  toJSON(): SashJSON[];

  /**
   * Deserializes sashes from JSON, reconciling with existing sashes.
   * Handles additions, removals, and type changes.
   * @param data - Array of serialized sash data
   */
  deserialize(data: SashJSON[]): void;

  /**
   * Gets polygon IDs currently in use by sashes
   */
  readonly usedPoly: PolyId[];

  /**
   * Gets all standard sashes (Sash and Screen types)
   */
  readonly sashes: Sash[];

  /**
   * Gets all glass sashes (standard + double sashes)
   */
  readonly glassSashes: Sash[];

  /**
   * Gets all circular sashes
   */
  readonly circleSashes: CircleSash[];

  /**
   * Gets all KFC sashes
   */
  readonly kfcSashes: KfcSash[];

  /**
   * Gets all double sashes (DoubleSash and DoubleScreen types)
   */
  readonly doubleSashes: DoubleSash[];

  /**
   * Gets all double KFC sashes
   */
  readonly doubleKfcSashes: DoubleKfcSash[];

  /**
   * Gets all anti-theft shutters/grilles
   */
  readonly thefts: AntiTheft[];

  /**
   * Gets all folding sashes
   */
  readonly folds: Fold[];

  /**
   * Gets all sliding sashes
   */
  readonly slides: Slide[];

  /**
   * Gets all shade push sashes
   */
  readonly shadePushSashes: PushSash[];

  /**
   * Gets all double shade push sashes
   */
  readonly doubleShadePushSashes: DoubleSash[];

  /**
   * Gets all fold shade sashes
   */
  readonly foldShades: Fold[];

  /**
   * Gets all guard sashes
   */
  readonly guardSashes: GuardSash[];

  /**
   * Gets all sashes that truncate the frame (extend beyond frame boundaries)
   */
  readonly truncateSashes: Array<Sash | DoubleSash | Slide>;

  /**
   * Gets all sashes of all types combined
   */
  readonly allSashes: Sash[];

  /**
   * Gets all dimension objects from sashes (mullions, bottom dims, handle dims)
   */
  readonly dims: any[];

  /**
   * Translates all sashes by a vector
   * @param vector - The translation vector
   */
  translate(vector: Vector): void;

  /**
   * Hit tests all sashes for bar elements at the given point
   * @param point - The point to test
   * @param view - The current view instance
   * @returns true if any bar was hit
   */
  hitBar(point: Point, view: any): boolean;

  /**
   * Emits sash group settings event for the given sash
   * @param sash - The sash that was hit
   * @param view - The current view instance
   */
  private emitSashGroupSettings(sash: any, view: any): void;

  /**
   * Hides all assist elements (guides, handles, etc.) for all sashes
   */
  hideAssist(): void;

  /**
   * Attempts to snap to an edge in any sash
   * @param point - The point to snap from
   * @param threshold - The snap distance threshold
   * @param direction - The snap direction vector
   * @returns Snap result or undefined if no snap occurred
   */
  snapEdge(point: Point, threshold: number, direction: Vector): any;
}