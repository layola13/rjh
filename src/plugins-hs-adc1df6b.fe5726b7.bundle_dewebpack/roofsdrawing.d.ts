/**
 * RoofsDrawing module - provides SVG-based rendering for roof structures
 * @module RoofsDrawing
 */

/**
 * SVG group container interface for organizing different drawing layers
 */
interface SVGGroups {
  /** Face elements layer - renders roof surfaces */
  face: SVGGElement;
  /** Edge elements layer - renders roof boundaries and ridges */
  edge: SVGGElement;
  /** Point elements layer - renders vertices and control points */
  point: SVGGElement;
  /** Dimension elements layer - renders measurements and annotations */
  dimension: SVGGElement;
}

/**
 * Drawing context interface providing SVG manipulation capabilities
 */
interface DrawingContext {
  /**
   * Creates a new SVG group element
   * @returns A new SVG group element
   */
  group(): SVGGElement;
}

/**
 * Entity interface representing a roof structure with drawable regions
 */
interface RoofEntity {
  /** Collection of drawable regions within the roof structure */
  drawingRegions: DrawingRegion[];
  
  /**
   * Retrieves the 2D sketch data for the roof
   * @returns The sketch data object
   */
  getSketch(): unknown;
  
  /**
   * Retrieves the builder instance for constructing roof geometry
   * @returns The builder instance
   */
  getBuilder(): unknown;
}

/**
 * Drawing region entity representing a subdivided area of a roof
 */
interface DrawingRegion {
  /** Region identifier */
  id: string | number;
  /** Additional region-specific data */
  [key: string]: unknown;
}

/**
 * Child component event data structure
 */
interface ChildAddedEventData {
  /** The entity associated with the added child */
  entity: DrawingRegion;
}

/**
 * Event object for child addition notifications
 */
interface ChildAddedEvent {
  /** Event payload containing entity information */
  data: ChildAddedEventData;
}

/**
 * Base display class for 2D SVG rendering components
 */
declare class Display2D {
  /**
   * Creates a new Display2D instance
   * @param context - The drawing context for SVG operations
   * @param parent - Parent display component (nullable)
   * @param group - The SVG group element to render into
   * @param entity - The entity to be rendered
   */
  constructor(
    context: DrawingContext,
    parent: Display2D | null,
    group: SVGGElement,
    entity: unknown
  );

  /** The drawing context instance */
  protected context: DrawingContext;
  
  /** The parent component in the display hierarchy */
  protected parent: Display2D | null;
  
  /** The SVG group element containing this component's output */
  protected group: SVGGElement;
  
  /** The entity being rendered by this component */
  protected entity: unknown;

  /**
   * Adds a child component to this display
   * @param child - The child component to add
   */
  protected addChild(child: Display2D): void;
}

/**
 * RoofsDrawing - Main component for rendering roof structures in SVG format
 * 
 * This class manages the complete rendering pipeline for roof drawings, including:
 * - Hierarchical SVG group organization (faces, edges, points, dimensions)
 * - Background sketch rendering
 * - Dynamic region management
 * - Child component lifecycle
 * 
 * @extends Display2D
 */
declare class RoofsDrawing extends Display2D {
  /**
   * Creates a new RoofsDrawing instance
   * @param context - The drawing context providing SVG manipulation capabilities
   * @param parent - Optional parent display component
   * @param group - The root SVG group element for this drawing
   * @param entity - The roof entity containing geometry and region data
   */
  constructor(
    context: DrawingContext,
    parent: Display2D | null,
    group: SVGGElement,
    entity: RoofEntity
  );

  /** The roof entity being rendered */
  protected entity: RoofEntity;

  /** Root SVG node for all drawing elements */
  protected node: SVGGElement;

  /** Organized SVG groups for different drawing layers */
  private _svgGroups: SVGGroups | undefined;

  /**
   * Initializes the drawing component and renders initial content
   * 
   * Performs the following operations:
   * 1. Creates the root SVG node
   * 2. Initializes layer groups (face, edge, point, dimension)
   * 3. Renders the background sketch
   * 4. Processes and renders all drawing regions
   */
  init(): void;

  /**
   * Cleanup handler called before component destruction
   * 
   * Releases resources and clears internal state:
   * - Calls parent cleanup
   * - Clears SVG group references
   */
  onCleanup(): void;

  /**
   * Initializes the layered SVG group structure
   * 
   * Creates separate groups for:
   * - face: Roof surface polygons
   * - edge: Roof boundaries and ridges
   * - point: Vertices and control points
   * - dimension: Measurements and labels
   * 
   * @private
   */
  private _initGroups(): void;

  /**
   * Initializes and renders the background sketch layer
   * 
   * Creates an interactive 2D sketch component that provides:
   * - Underlying geometry visualization
   * - Reference lines and construction aids
   * 
   * @private
   */
  private _initBkgSketch(): void;

  /**
   * Event handler for child component additions
   * 
   * Called when a new region is dynamically added to the entity
   * @param event - Event containing the newly added region entity
   */
  onChildAdded(event: ChildAddedEvent): void;

  /**
   * Creates and initializes a region drawing component
   * 
   * @param region - The drawing region entity to render
   * @private
   */
  private _addChildRegion(region: DrawingRegion): void;
}

export { RoofsDrawing };