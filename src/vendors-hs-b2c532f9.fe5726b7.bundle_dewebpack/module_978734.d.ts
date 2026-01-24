/**
 * QuadTree data structure for efficient 2D spatial partitioning and collision detection.
 * Automatically subdivides space into quadrants (NW, NE, SW, SE) when element count exceeds threshold.
 */

/** Quadrant identifiers */
type QuadrantKey = 'NW' | 'NE' | 'SW' | 'SE';

/** Base element interface - all elements must have position and optional dimensions */
interface QuadTreeElement {
  /** X coordinate (must be integer) */
  x: number;
  /** Y coordinate (must be integer) */
  y: number;
  /** Width (defaults to 1 if omitted, must be non-negative) */
  width?: number;
  /** Height (defaults to 1 if omitted, must be non-negative) */
  height?: number;
  /** Allow additional properties for user data */
  [key: string]: unknown;
}

/** Configuration options for QuadTree initialization */
interface QuadTreeOptions {
  /** X coordinate of top-left corner (defaults to 0, must be integer) */
  x?: number;
  /** Y coordinate of top-left corner (defaults to 0, must be integer) */
  y?: number;
  /** Width of the quad tree region (required, must be positive integer) */
  width: number;
  /** Height of the quad tree region (required, must be positive integer) */
  height: number;
  /** Maximum elements per node before subdivision (defaults to 1, must be positive integer) */
  maxElements?: number;
}

/** Internal structure for child quadrants */
interface QuadrantDescriptor<T extends QuadTreeElement> {
  /** Factory function to lazily create child quadtree */
  create: () => QuadTree<T>;
  /** Lazily initialized child tree instance */
  tree: QuadTree<T> | null;
  /** Getter to ensure tree is created on first access */
  get: () => QuadTree<T>;
}

/** Bounding box for spatial calculations */
interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

/** Point representation */
interface Point {
  x: number;
  y: number;
}

/** Collision detection function signature */
type CollisionPredicate<T extends QuadTreeElement> = (
  element1: T,
  element2: T
) => boolean;

/** Element filtering/searching predicate */
type ElementPredicate<T extends QuadTreeElement> = (element: T) => boolean;

/** Callback for element iteration */
type ElementCallback<T extends QuadTreeElement> = (element: T) => void;

/** Visitor callback for tree traversal */
type VisitorCallback = () => void;

/**
 * QuadTree implementation for efficient 2D spatial indexing.
 * Elements are automatically subdivided into quadrants when capacity is exceeded.
 * 
 * @template T - Element type, must extend QuadTreeElement
 */
declare class QuadTree<T extends QuadTreeElement = QuadTreeElement> {
  /** X coordinate of this quadrant */
  readonly x: number;
  
  /** Y coordinate of this quadrant */
  readonly y: number;
  
  /** Width of this quadrant */
  readonly width: number;
  
  /** Height of this quadrant */
  readonly height: number;
  
  /** Maximum elements before subdivision */
  readonly maxElements: number;
  
  /** Elements that fit within a single quadrant */
  readonly contents: T[];
  
  /** Elements that span multiple quadrants */
  readonly oversized: T[];
  
  /** Total number of elements in this tree (including children) */
  size: number;
  
  /** Child quadrants (lazily initialized) */
  readonly children: Record<QuadrantKey, QuadrantDescriptor<T>>;

  /**
   * Creates a new QuadTree instance.
   * 
   * @param options - Configuration object
   * @throws Error if dimensions are missing, non-positive, or coordinates are non-integer
   * @throws Error if maxElements is less than 1
   * 
   * @example
   * const tree = new QuadTree({ x: 0, y: 0, width: 1000, height: 1000, maxElements: 4 });
   */
  constructor(options: QuadTreeOptions);

  /**
   * Removes all elements and resets the tree structure.
   * 
   * @returns void
   */
  clear(): void;

  /**
   * Inserts a single element into the tree.
   * 
   * @param element - Element to insert
   * @param trackChanges - If true, intercepts property setters to auto-update tree on coordinate changes
   * @returns This tree instance (for chaining)
   * @throws Error if element is invalid (missing coordinates, negative dimensions)
   */
  push(element: T, trackChanges?: boolean): this;

  /**
   * Inserts multiple elements into the tree.
   * 
   * @param elements - Array of elements to insert
   * @param trackChanges - If true, intercepts property setters for all elements
   * @returns This tree instance (for chaining)
   * @throws Error if any element is invalid
   */
  pushAll(elements: T[], trackChanges?: boolean): this;

  /**
   * Removes an element from the tree.
   * 
   * @param element - Element to remove
   * @param preserveTracking - If true, keeps property interceptors active
   * @returns true if element was found and removed, false otherwise
   * @throws Error if element is invalid
   */
  remove(element: T, preserveTracking?: boolean): boolean;

  /**
   * Finds all elements that collide with the given element.
   * 
   * @param element - Element to test for collisions
   * @param collisionTest - Custom collision detection function (defaults to bounding box overlap)
   * @returns Array of colliding elements (excluding the input element itself)
   * @throws Error if element is invalid
   */
  colliding(element: T, collisionTest?: CollisionPredicate<T>): T[];

  /**
   * Executes a callback for each element that collides with the given element.
   * 
   * @param element - Element to test for collisions
   * @param callback - Function called for each collision
   * @param collisionTest - Custom collision detection function (defaults to bounding box overlap)
   * @returns null
   * @throws Error if element is invalid
   */
  onCollision(
    element: T,
    callback: ElementCallback<T>,
    collisionTest?: CollisionPredicate<T>
  ): null;

  /**
   * Alias for `where()` - finds elements matching criteria.
   * 
   * @param criteria - Partial element properties to match, or full element for spatial search
   * @returns Array of matching elements
   */
  get(criteria: Partial<T>): T[];

  /**
   * Finds elements matching the given criteria.
   * If criteria includes x/y coordinates, performs spatial search.
   * Otherwise, searches by property equality.
   * 
   * @param criteria - Properties to match
   * @returns Array of matching elements
   * @throws Error if spatial search criteria is invalid
   */
  where(criteria: Partial<T>): T[];

  /**
   * Iterates over all elements in the tree.
   * 
   * @param callback - Function called for each element
   * @returns This tree instance (for chaining)
   */
  each(callback: ElementCallback<T>): this;

  /**
   * Finds all elements matching a predicate.
   * 
   * @param predicate - Test function
   * @returns Array of elements where predicate returned true
   */
  find(predicate: ElementPredicate<T>): T[];

  /**
   * Creates a new tree containing only elements matching the predicate.
   * 
   * @param predicate - Test function (if omitted, copies entire tree)
   * @returns New filtered QuadTree, or null if result would be empty
   */
  filter(predicate?: ElementPredicate<T>): QuadTree<T> | null;

  /**
   * Creates a new tree containing elements NOT matching the predicate.
   * 
   * @param predicate - Test function
   * @returns New filtered QuadTree, or null if result would be empty
   */
  reject(predicate: ElementPredicate<T>): QuadTree<T> | null;

  /**
   * Traverses all nodes in the tree (depth-first), calling the callback on each.
   * Callback is bound to the current node context.
   * 
   * @param callback - Function called for each node
   * @returns This tree instance (for chaining)
   */
  visit(callback: VisitorCallback): this;

  /**
   * Generates a human-readable ASCII representation of the tree structure.
   * 
   * @returns Multi-line string showing tree hierarchy, oversized elements, and contents
   */
  pretty(): string;
}

export = QuadTree;