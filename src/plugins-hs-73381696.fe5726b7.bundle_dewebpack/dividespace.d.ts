/**
 * DivideSpace module - provides functionality for dividing floor spaces with walls
 */

declare namespace HSApp.View.SVG {
  /**
   * Path style configuration for SVG elements
   */
  interface PathStyle {
    'stroke-dasharray'?: string;
    'stroke-width'?: number;
    stroke?: string;
    fill?: string;
    'fill-opacity'?: number;
    opacity?: number;
  }

  /**
   * 2D point representation
   */
  interface Point2D {
    x: number;
    y: number;
  }

  /**
   * Edge reference with optional extra path data
   */
  interface EdgeReference {
    edge: HSCore.Model.Edge;
    extraPath?: Point2D[];
  }

  /**
   * Dividing path data structure
   */
  interface DividingPathData {
    path: Point2D[];
    startExtraPath?: Point2D[];
    endExtraPath?: Point2D[];
    firstEdges: HSCore.Model.Edge[];
    lastEdges: HSCore.Model.Edge[];
    firstPointOnEdge: THREE.Vector3;
    lastPointOnEdge: THREE.Vector3;
  }

  /**
   * Inference result containing snap information
   */
  interface InferenceResult {
    point?: Point2D;
    indicateLines?: [Point2D, Point2D][];
    offset?: Point2D;
  }

  /**
   * Linear dimension state enumeration
   */
  enum LinearDimensionStateEnum {
    editable = 'editable',
    focus = 'focus',
  }

  /**
   * Dimension commit type enumeration
   */
  enum LinearDimensionCommitTypeEnum {
    click = 'click',
    tab = 'tab',
  }

  /**
   * Linear dimension gizmo interface
   */
  interface LinearDimension {
    LinearDimensionStateEnum: typeof LinearDimensionStateEnum;
    LinearDimensionCommitTypeEnum: typeof LinearDimensionCommitTypeEnum;
    min: number;
    max: number;
    start: HSCore.Util.Math.Vec2;
    end: HSCore.Util.Math.Vec2;
    textPosition: HSCore.Util.Math.Vec2;
    rotation: number;
    active: boolean;
    valueChanged: Signal;
    valueChanging: Signal;
    valueChangeCommit: Signal;
    
    updateState(state: string, value: boolean): void;
    hide(): void;
    show(): void;
    draw(): void;
    activate(): void;
    deactivate(): void;
  }

  /**
   * Point inference system for snapping behavior
   */
  class PointInference {
    constructor(context: unknown);
    
    _snapCADPoints?: HSCore.Model.Vertex[];
    
    setSnapLines(lines: [Point2D, Point2D][]): void;
    setSnapCADPoints(points: HSCore.Model.Vertex[]): void;
    solve(point: Point2D, result: InferenceResult, options?: { orthoDir?: Point2D }): boolean;
  }

  /**
   * DivideSpace tool - interactive gizmo for dividing floor spaces
   * Allows users to draw dividing walls within a floor polygon
   */
  class DivideSpace extends Temp {
    /** Alignment indication lines */
    alignmentLines: SVGElement[];
    
    /** Current drawing path */
    path: Point2D[];
    
    /** Point inference system for snapping */
    inference: PointInference;
    
    /** Style for valid path segments */
    pathStyle: PathStyle;
    
    /** Style for invalid/crossing path segments */
    invalidPathStyle: PathStyle;
    
    /** Style for auto-width path mode */
    autowidthPathStyle: PathStyle;
    
    /** Style for valid preview */
    previewStyle: PathStyle;
    
    /** Style for invalid preview */
    invalidPreviewStyle: PathStyle;
    
    /** Style for auto-width preview mode */
    autowidthPreviewStyle: PathStyle;
    
    /** Linear dimension gizmo for length input */
    lengthDimension: LinearDimension;
    
    /** Current mouse position in model space */
    pos?: Point2D;
    
    /** Original position before snapping */
    originPos?: Point2D;
    
    /** Position being traced */
    tracingPosition?: Point2D;
    
    /** Whether currently in tracing mode */
    isTracing: boolean;
    
    /** Whether in preview mode */
    isPreview: boolean;
    
    /** Whether position is locked during dimension editing */
    isLocked: boolean;
    
    /** Floor entity being divided */
    entity?: HSCore.Model.Floor;
    
    /** Z-coordinate value for 3D operations */
    zValue: number;
    
    /** Loop path defining floor boundary */
    loopPath: Point2D[];
    
    /** 3D line segments of floor boundary */
    lines: THREE.Line3[];
    
    /** Edge line segments with edge references */
    edgeLines: Array<THREE.Line3 & { edge?: HSCore.Model.Edge; wall?: unknown }>;
    
    /** Background highlight element */
    background?: SVGElement;
    
    /** Floor highlight element */
    floorElement?: SVGElement;
    
    /** Preview path element */
    previewElement?: SVGElement;
    
    /** Current stroke path element */
    currentStroke?: SVGElement;
    
    /** Circle indicator at cursor */
    circleIndicator?: SVGElement;
    
    /** Tracing mode indicator */
    tracingIndicator?: SVGElement;
    
    /** Tracing path line */
    tracingPath?: SVGElement;
    
    /** Main path element */
    pathElement?: SVGElement;
    
    /** Current wall width */
    currentWallWidth: number;
    
    /** Previous wall width (for auto-width) */
    previousWallWidth?: number;
    
    /** Whether direction is flipped */
    isFlipping: boolean;
    
    /** Whether Ctrl key is pressed */
    pressCtrl: boolean;
    
    /** Whether auto wall-width is enabled */
    autoWallwidth: boolean;
    
    /** Whether currently using auto wall-width */
    isAutoWallwidth: boolean;
    
    /** Whether in orthogonal drawing mode */
    isOrthoMode: boolean;
    
    /**
     * Creates a new DivideSpace gizmo
     * @param context - Drawing context
     * @param unknown1 - Additional parameter
     * @param unknown2 - Additional parameter
     */
    constructor(context: unknown, unknown1: unknown, unknown2: unknown);
    
    /**
     * Creates a linear dimension gizmo
     * @param context - Drawing context
     * @param param1 - Parameter 1
     * @param param2 - Parameter 2
     * @returns Linear dimension instance
     */
    protected _createLinearDimension(
      context: unknown,
      param1: unknown,
      param2: unknown
    ): LinearDimension;
    
    /**
     * Resets the tool to initial state
     */
    reset(): void;
    
    /**
     * Handles viewbox change events
     */
    protected _onViewBoxChanged(): void;
    
    /**
     * Handles background/underlay change events
     */
    protected _onBackgroundChanged(event: unknown): void;
    
    /**
     * Resets the inference system with current CAD points
     */
    resetInference(): void;
    
    /**
     * Checks if in center mode (deprecated, always returns true)
     */
    isCenterMode(): boolean;
    
    /**
     * Updates inference snap lines based on current path
     */
    updateInference(): void;
    
    /**
     * Builds SVG path string for current stroke
     * @returns SVG path data string
     */
    protected _buildCurrentStroke(): string;
    
    /**
     * Gets the current stroke segment being drawn
     * @returns Two-point stroke segment or undefined
     */
    getCurrentStroke(): [Point2D, Point2D] | undefined;
    
    /**
     * Checks if last path point is inside the floor polygon
     */
    isLastPointInSide(): boolean;
    
    /**
     * Checks if last point lies on any previous path segment
     */
    isLastPointOnPath(): boolean;
    
    /**
     * Finds the last line segment crossed by the path
     * @returns Crossed line segment or undefined
     */
    protected _findLastLineCrossed(): [Point2D, Point2D] | undefined;
    
    /**
     * Finds any path segment crossed by current stroke
     * @returns Crossed line segment or undefined
     */
    protected _findStrokeCrossed(): [Point2D, Point2D] | undefined;
    
    /**
     * Checks if current stroke crosses the path
     * @param stroke - Stroke segment to check
     */
    isCrossPath(stroke: [Point2D, Point2D]): boolean;
    
    /**
     * Validates if current stroke is geometrically valid
     * @returns True if stroke is valid
     */
    isStrokeValid(): boolean;
    
    /**
     * Sets the floor entity to divide
     * @param floor - Floor entity
     */
    setFloor(floor: HSCore.Model.Floor): void;
    
    /**
     * Cleanup method called when tool is deactivated
     */
    onCleanup(): void;
    
    /**
     * Draws background highlight
     */
    protected _drawBackground(): void;
    
    /**
     * Draws floor boundary highlight
     */
    protected _drawHightlightFloor(): void;
    
    /**
     * Main draw method - renders all visual elements
     */
    onDraw(): void;
    
    /**
     * Updates pick points (placeholder method)
     */
    updatePickPoints(): void;
    
    /**
     * Updates tracing path visualization
     */
    updateTracingPath(): void;
    
    /**
     * Updates main path element
     */
    updatePath(): void;
    
    /**
     * Updates current stroke element
     */
    updateStroke(): void;
    
    /**
     * Updates circle indicator at cursor position
     */
    updateCircleIndicator(): void;
    
    /**
     * Picks edge at given point
     * @param point - Point to check
     * @returns Array of edge references
     */
    protected _pickEdge(point: Point2D): EdgeReference[];
    
    /**
     * Initiates tracing mode if conditions are met
     * @param inferenceResult - Inference result data
     */
    protected _trace(inferenceResult: InferenceResult): void;
    
    /**
     * Clears tracing state
     */
    protected _clearTrace(): void;
    
    /**
     * Performs snapping on given position
     * @param position - Position to snap
     * @param options - Snapping options
     */
    doSnapping(position: Point2D, options?: { orthoDir?: Point2D }): void;
    
    /**
     * Handles mouse move events
     * @param event - Mouse event
     * @param screenX - Screen X coordinate
     * @param screenY - Screen Y coordinate
     */
    onMouseMove(event: MouseEvent, screenX: number, screenY: number): void;
    
    /**
     * Updates current cursor position with snapping
     * @param position - New position
     * @param enableSnapping - Whether to apply snapping
     */
    updateCurrentPos(position: Point2D, enableSnapping?: boolean): void;
    
    /**
     * Commits the current path and creates dividing walls
     */
    commitPath(): void;
    
    /**
     * Gets the valid dividing path (excluding segments on floor boundary)
     * @returns Valid path segments
     */
    getDividingPath(): Point2D[];
    
    /**
     * Commits current point to path
     */
    onCommitPoint(): void;
    
    /**
     * Checks if all path segments lie on floor boundary lines
     * @param path - Path to check
     * @param lines - Boundary lines
     * @returns True if all segments are on boundary
     */
    protected _isAllPathSegmentsOnLines(path: Point2D[], lines: THREE.Line3[]): boolean;
    
    /**
     * Handles mouse down events
     * @param event - Mouse event
     * @param screenX - Screen X coordinate
     * @param screenY - Screen Y coordinate
     */
    onMouseDown(event: MouseEvent, screenX: number, screenY: number): void;
    
    /**
     * Handles document keydown events (for Shift key ortho mode)
     * @param event - Keyboard event
     */
    onDocumentKeyDown(event: KeyboardEvent): void;
    
    /**
     * Handles ESC key press to cancel operation
     */
    onESC(): void;
    
    /**
     * Hides all alignment indication lines
     */
    hideAlignmentLines(): void;
    
    /**
     * Updates alignment lines display
     * @param lines - Array of line segments to display
     */
    updateAlignmentLines(lines: [Point2D, Point2D][]): void;
    
    /**
     * Updates length dimension gizmo position and value
     */
    updateLengthDimension(): void;
    
    /**
     * Handles length dimension value change events
     * @param event - Value change event
     */
    protected _onLengthValueChanged(event: { data: { value: number } }): void;
    
    /**
     * Handles length dimension value changing events
     * @param event - Value changing event
     */
    protected _onLengthValueChanging(event: unknown): void;
    
    /**
     * Handles length dimension value commit events
     * @param event - Value commit event
     */
    protected _onLengthValueChangeCommit(event: { 
      data: { commitType: string } 
    }): void;
    
    /**
     * Disables undo/redo hotkeys during dimension editing
     */
    disableUndoRedo(): void;
    
    /**
     * Re-enables undo/redo hotkeys
     */
    enableUndoRedo(): void;
  }
}

export { DivideSpace };