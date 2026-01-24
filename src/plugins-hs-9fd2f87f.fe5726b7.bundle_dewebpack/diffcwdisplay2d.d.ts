import { Display2D } from './Display2D';
import { DiffCWRouteDisplay2D } from './DiffCWRouteDisplay2D';

/**
 * Interface representing a differential continuous wave route
 */
interface DiffCWRoute {
  /** Unique identifier for the route */
  id: string;
  [key: string]: unknown;
}

/**
 * Interface representing an entity with differential CW routes
 */
interface DiffCWEntity {
  /** Array of differential continuous wave routes */
  diffRoutes: DiffCWRoute[];
  [key: string]: unknown;
}

/**
 * Context interface for canvas operations
 */
interface CanvasContext {
  [key: string]: unknown;
}

/**
 * Canvas interface with display object retrieval capability
 */
interface Canvas {
  /**
   * Retrieves a display object by its unique identifier
   * @param id - The unique identifier of the display object
   * @returns The display object if found, undefined otherwise
   */
  getDisplayObjectByID(id: string): DiffCWRouteDisplay2D | undefined;
  [key: string]: unknown;
}

/**
 * Group interface for organizing display objects
 */
interface Group {
  [key: string]: unknown;
}

/**
 * 2D display component for differential continuous wave (DiffCW) visualization
 * 
 * This class manages the rendering and visibility of differential continuous wave routes
 * in a 2D canvas environment. It extends the base Display2D class and handles the
 * initialization and updates of child route display objects.
 * 
 * @extends Display2D
 */
export declare class DiffCWDisplay2D extends Display2D {
  /** The entity containing differential CW route data */
  protected entity: DiffCWEntity;
  
  /** The rendering context */
  protected context: CanvasContext;
  
  /** The canvas instance for display object management */
  protected canvas: Canvas;
  
  /** The parent group for organizing display objects */
  protected group: Group;

  /**
   * Initializes the DiffCW display component
   * 
   * Sets up the display by adding all differential CW routes from the entity
   * to the canvas for rendering.
   */
  init(): void;

  /**
   * Adds child display objects for each differential CW route
   * 
   * Iterates through the provided routes and creates or retrieves corresponding
   * DiffCWRouteDisplay2D instances, initializing them if newly created and adding
   * them as children to this display component.
   * 
   * @param routes - Array of differential CW routes to be added
   * @private
   */
  private _addDiffCWRoutes(routes: DiffCWRoute[]): void;

  /**
   * Updates the visibility status of all child route displays
   * 
   * Propagates visibility changes to all differential CW route display objects
   * managed by this component.
   * 
   * @param visible - The visibility state to apply to all child routes
   */
  updateVisibleStatus(visible: boolean): void;

  /**
   * Adds a child display object to this component
   * 
   * @param child - The child display object to add
   * @protected
   */
  protected addChild(child: DiffCWRouteDisplay2D): void;
}