/**
 * Container class for managing child nodes in a scene graph.
 * Extends Node to provide hierarchical structure and child management capabilities.
 */
declare class Container extends Node {
  /**
   * Array of child nodes contained within this container.
   */
  children: Node[];

  /**
   * Retrieves child nodes, optionally filtered by a predicate function.
   * @param filter - Optional predicate function to filter children
   * @returns Array of child nodes (filtered or all)
   */
  getChildren(filter?: (child: Node) => boolean): Node[];

  /**
   * Checks if the container has any child nodes.
   * @returns True if container has at least one child
   */
  hasChildren(): boolean;

  /**
   * Removes all child nodes from the container without destroying them.
   * Detaches children by clearing their parent reference and index.
   * @returns This container instance for method chaining
   */
  removeChildren(): this;

  /**
   * Destroys all child nodes and removes them from the container.
   * Child nodes are completely destroyed and cannot be reused.
   * @returns This container instance for method chaining
   */
  destroyChildren(): this;

  /**
   * Adds one or more child nodes to the container.
   * If child already has a parent, it will be moved to this container.
   * @param children - One or more nodes to add
   * @returns This container instance for method chaining
   */
  add(...children: Node[]): this;

  /**
   * Destroys the container and all its children.
   * @returns This container instance for method chaining
   */
  destroy(): this;

  /**
   * Finds all descendant nodes matching the given selector.
   * @param selector - Search criteria (string, function, or object)
   * @returns Array of matching nodes
   */
  find(selector: string | Function | Record<string, unknown>): Node[];

  /**
   * Finds the first descendant node matching the given selector.
   * @param selector - Search criteria (string, function, or object)
   * @returns First matching node or undefined if none found
   */
  findOne(selector: string | Function | Record<string, unknown>): Node | undefined;

  /**
   * General purpose find method used internally by find() and findOne().
   * @param selector - Search criteria
   * @param findOne - If true, stops after finding first match
   * @returns Array of matching nodes
   * @internal
   */
  _generalFind(selector: string | Function | Record<string, unknown>, findOne: boolean): Node[];

  /**
   * Recursively traverses all descendant nodes.
   * @param callback - Function called for each descendant; return true to stop traversal
   * @returns True if traversal was stopped early
   * @internal
   */
  _descendants(callback: (node: Node) => boolean): boolean;

  /**
   * Serializes the container and all its children to a plain object.
   * @returns Object representation of the container
   */
  toObject(): ContainerConfig;

  /**
   * Checks if this container is an ancestor of the given node.
   * @param node - Node to check ancestry against
   * @returns True if this container is an ancestor of the node
   */
  isAncestorOf(node: Node): boolean;

  /**
   * Creates a deep clone of the container and all its children.
   * @param config - Optional configuration to override cloned properties
   * @returns Cloned container instance
   */
  clone(config?: Partial<ContainerConfig>): this;

  /**
   * Gets all Shape descendants that intersect with the given point.
   * @param point - Point coordinates to check intersection
   * @returns Array of intersecting visible shapes
   */
  getAllIntersections(point: Vector2d): Shape[];

  /**
   * Clears cache for this container and all descendants.
   * @param cacheType - Type of cache to clear
   * @internal
   */
  _clearSelfAndDescendantCache(cacheType: string): void;

  /**
   * Updates the index property of all children to match their array position.
   * @internal
   */
  _setChildrenIndices(): void;

  /**
   * Draws the container and its children to the scene canvas.
   * @param canvas - Optional canvas to draw on (defaults to layer canvas)
   * @param top - Top node in the rendering hierarchy
   * @returns This container instance for method chaining
   */
  drawScene(canvas?: Canvas, top?: Node): this;

  /**
   * Draws the container and its children to the hit detection canvas.
   * @param canvas - Optional hit canvas to draw on
   * @param top - Top node in the rendering hierarchy
   * @returns This container instance for method chaining
   */
  drawHit(canvas?: Canvas, top?: Node): this;

  /**
   * Internal method to draw children for either scene or hit canvas.
   * @param method - Method name to call on children ('drawScene' or 'drawHit')
   * @param canvas - Canvas to draw on
   * @param top - Top node in the rendering hierarchy
   * @internal
   */
  _drawChildren(method: 'drawScene' | 'drawHit', canvas?: Canvas, top?: Node): void;

  /**
   * Gets the bounding box that contains all visible children.
   * @param config - Configuration options for client rect calculation
   * @returns Bounding rectangle containing all children
   */
  getClientRect(config?: GetClientRectConfig): IRect;

  /**
   * Gets/sets the x position of the clipping region.
   */
  clipX(): number | undefined;
  clipX(x: number): this;

  /**
   * Gets/sets the y position of the clipping region.
   */
  clipY(): number | undefined;
  clipY(y: number): this;

  /**
   * Gets/sets the width of the clipping region.
   */
  clipWidth(): number | undefined;
  clipWidth(width: number): this;

  /**
   * Gets/sets the height of the clipping region.
   */
  clipHeight(): number | undefined;
  clipHeight(height: number): this;

  /**
   * Gets/sets the custom clipping function.
   * Function receives canvas context and shape as parameters.
   */
  clipFunc(): ((context: CanvasRenderingContext2D, shape: this) => void) | undefined;
  clipFunc(func: (context: CanvasRenderingContext2D, shape: this) => void): this;

  /**
   * Gets/sets all clip properties at once.
   */
  clip(): ClipConfig | undefined;
  clip(config: ClipConfig): this;
}

/**
 * Configuration object for Container serialization.
 */
interface ContainerConfig extends NodeConfig {
  /** Array of child node configurations */
  children?: NodeConfig[];
}

/**
 * Configuration for clipping region.
 */
interface ClipConfig {
  /** X position of clip region */
  x?: number;
  /** Y position of clip region */
  y?: number;
  /** Width of clip region */
  width?: number;
  /** Height of clip region */
  height?: number;
}

/**
 * Configuration options for getClientRect method.
 */
interface GetClientRectConfig {
  /** Skip applying transformations */
  skipTransform?: boolean;
  /** Calculate rect relative to this node */
  relativeTo?: Node;
  /** Skip shadow in calculations */
  skipShadow?: boolean;
  /** Skip stroke in calculations */
  skipStroke?: boolean;
}

/**
 * 2D vector representing a point.
 */
interface Vector2d {
  x: number;
  y: number;
}

/**
 * Rectangle interface.
 */
interface IRect {
  x: number;
  y: number;
  width: number;
  height: number;
}