/**
 * Direction enumeration and UI utility types
 * Provides utilities for auto-fitting menus and handling UI collision detection
 */

/**
 * Direction enum for menu positioning
 * Represents the four quadrants around a point
 */
export enum Direction {
  /** Top-right quadrant */
  topRight = 0,
  /** Bottom-right quadrant */
  bottomRight = 1,
  /** Top-left quadrant */
  topLeft = 2,
  /** Bottom-left quadrant */
  bottomLeft = 3,
}

/**
 * 2D vector representing a point or size
 */
export interface Vector2 {
  x: number;
  y: number;
}

/**
 * Rectangular size dimensions
 */
export interface Size {
  width: number;
  height: number;
}

/**
 * Geometric loop representing a closed polygon
 */
export interface Loop {
  /**
   * Get all points in the loop
   */
  getAllPoints(): Vector2[];
  
  /**
   * Translate the loop by a vector
   */
  translate(offset: Vector2): Loop;
  
  /**
   * Get the bounding box of the loop
   */
  getBoundingBox(): {
    min: Vector2;
    max: Vector2;
  };
}

/**
 * Information about a collision boundary
 */
export interface CollisionInfo {
  /** Unique identifier for the collision area */
  key: string;
  /** The geometric loop representing the boundary */
  loop: Loop;
}

/**
 * Information about an intersection during collision detection
 */
export interface IntersectInfo {
  /** Unique identifier for the intersecting area */
  key: string;
  /** The geometric loop of the intersection */
  loop: Loop;
}

/**
 * Strategy handler function type for auto-fit positioning
 */
export type StrategyHandler = (params: StrategyHandlerParams) => Vector2 | null;

/**
 * Parameters passed to strategy handlers
 */
export interface StrategyHandlerParams {
  /** Sorted array of points to consider */
  sortedPoints?: Vector2[];
  /** Directions to try for positioning */
  directions?: Direction[];
  /** Collision areas to avoid */
  collisionInfos?: CollisionInfo[];
  /** Previously detected intersections */
  intersectInfos?: IntersectInfo[];
  /** Reference position (e.g., mouse position) */
  position?: Vector2;
  /** Offset to apply to positioning */
  offset?: Vector2;
  /** Maximum container boundary */
  maxContainerLoop?: Loop;
  /** Size of the menu being positioned */
  menuSize?: Size;
}

/**
 * Configuration for a positioning strategy
 */
export interface StrategyInfo {
  /** Offset to apply when positioning */
  offset?: Vector2;
  /** Directions to attempt in order of preference */
  directions?: Direction[];
  /** Collision boundaries to check against */
  collisionInfos?: CollisionInfo[];
  /** Strategy function to use for positioning */
  strategyHandler: StrategyHandler;
  /** Reference position for positioning */
  position?: Vector2;
  /** Whether this strategy is disabled */
  disable?: boolean;
}

/**
 * Parameters for auto-fit menu positioning
 */
export interface AutoFitMenuParams {
  /** Maximum container element */
  maxContainer: HTMLElement;
  /** Array of positioning strategies to try */
  strategyInfos?: StrategyInfo[];
  /** Collision boundaries to avoid */
  collisionInfos?: CollisionInfo[];
  /** Loop representing current selection */
  selectedLoop: Loop;
}

/**
 * Result of collision detection
 */
export interface CollisionResult {
  /** Whether a collision was detected */
  isIntersect: boolean;
  /** Key of the colliding element, if any */
  key?: string;
}

/**
 * Position with optional display property
 */
export interface ElementPosition {
  left: number;
  top: number;
  width: number;
  height: number;
  display?: string;
}

/**
 * Final positioning result
 */
export interface PositionResult {
  left: number;
  top: number;
}

/**
 * UI utility functions for menu positioning and collision detection
 */
export const UIUtil: {
  /**
   * Automatically fit a menu to avoid collisions and stay within bounds
   * @param mousePosition - Current mouse position
   * @param menuElement - The menu DOM element to position
   * @param params - Configuration parameters for auto-fitting
   * @returns Position for the menu, or null if no valid position found
   */
  autoFitMenuHandler(
    mousePosition: Vector2,
    menuElement: HTMLElement,
    params: AutoFitMenuParams
  ): PositionResult | null;

  /**
   * Get the active view considering the current environment (2D or 3D)
   * @returns The active view instance
   */
  getActiveViewWithEnvironment(): unknown;

  /**
   * Get a screen-space loop representing a selection
   * @param element - The selected model element
   * @returns Loop in screen coordinates
   */
  getSelectionLoop(element: unknown): Loop;

  /**
   * Strategy handlers for different positioning approaches
   */
  strategyHandlers: {
    /**
     * Position by checking collision with all boundaries
     */
    collisionIntersect: StrategyHandler;
    
    /**
     * Position by checking partial collision with specific boundaries
     */
    partCollisionIntersect: StrategyHandler;
    
    /**
     * Position relative to mouse, checking collisions
     */
    mouseCollisionIntersect: StrategyHandler;
    
    /**
     * Simple positioning relative to mouse position
     */
    mousePos: StrategyHandler;
  };

  /**
   * Apply positioning strategies in order until valid position found
   * @param params - Strategy parameters
   * @returns Valid position, or null if none found
   */
  applyAutoFitMenuStrategy(params: {
    sortedPoints?: Vector2[];
    menuSize: Size;
    maxContainerLoop: Loop;
    strategyInfos: StrategyInfo[];
  }): PositionResult | null;

  /**
   * Check if a point and direction yield a valid non-colliding position
   * @param params - Validation parameters
   * @returns Valid point, or null if invalid
   */
  getValidPoint(params: {
    pt: Vector2;
    dir: Direction;
    offset?: Vector2;
    menuSize: Size;
    maxContainerLoop: Loop;
    collisionInfos?: CollisionInfo[];
    intersectInfos?: IntersectInfo[];
  }): Vector2 | null;

  /**
   * Sort points by x-coordinate (descending), then y-coordinate (ascending)
   * @param points - Array of points to sort
   * @returns Sorted array
   */
  sortedPoints(points: Vector2[]): Vector2[];

  /**
   * Create a loop for a DOM element positioned in a specific direction
   * @param point - Reference point
   * @param size - Size of the element
   * @param direction - Direction from the point
   * @returns Loop representing the positioned element
   */
  getDomLoopByDirection(
    point: Vector2,
    size: Size,
    direction: Direction
  ): Loop;

  /**
   * Calculate a point offset in a specific direction
   * @param point - Starting point
   * @param direction - Direction to offset
   * @param offset - Offset amount
   * @returns Offset point
   */
  getPtByOffset(
    point: Vector2,
    direction: Direction,
    offset: Vector2
  ): Vector2;

  /**
   * Check if a loop collides with any collision boundaries
   * @param loop - Loop to check
   * @param collisionInfos - Boundaries to check against
   * @returns Collision result
   */
  checkLoopCollision(
    loop: Loop,
    collisionInfos: CollisionInfo[]
  ): CollisionResult;

  /**
   * Get the size of a DOM element
   * @param element - DOM element
   * @returns Width and height
   */
  getDomSize(element: HTMLElement): Size;

  /**
   * Get collision information for a set of UI element keys
   * @param keys - Array of element keys to check
   * @returns Array of collision boundaries
   */
  getCollisionInfo(keys: string[]): CollisionInfo[];

  /**
   * Create a loop from an HTML element's bounding box
   * @param element - DOM element
   * @returns Loop representing the element bounds
   */
  getElementLoop(element: HTMLElement): Loop;

  /**
   * Get screen-space points for a 3D content element
   * @param content - 3D content model
   * @returns Array of screen-space points forming convex hull
   */
  get3DContentScreenPts(content: unknown): Vector2[];

  /**
   * Get transformation matrix for a content element
   * @param content - Content with position, rotation, and size
   * @returns 4x4 transformation matrix
   */
  getMatrix4FromContent(content: unknown): unknown;

  /**
   * Compute convex hull of points using Graham scan algorithm
   * @param points - Array of 2D points
   * @returns Points forming the convex hull
   */
  melKMan(points: Vector2[]): Vector2[];
};