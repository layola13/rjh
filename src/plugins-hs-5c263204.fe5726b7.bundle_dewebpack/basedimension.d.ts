/**
 * Base class for dimension gizmos in the SVG view.
 * Provides common functionality for displaying and editing dimensional measurements
 * with auxiliary lines, boundary boxes, and outline helpers.
 */
declare module BaseDimension {
  import { HSApp } from '518193';
  import { HSCore } from '635589';
  import { DimensionHandler } from '133171';

  /**
   * Configuration for dimension precision and unit display
   */
  interface DimensionRules {
    /** Whether to display only integer values */
    intOnly: boolean;
    /** Fixed unit type for dimension display */
    fixedUnitType?: string;
    /** Fixed number of decimal digits to display */
    fixedDisplayDigits?: number;
  }

  /**
   * Precision configuration from app settings
   */
  interface PrecisionConfig {
    /** Unit type for dimensions */
    dimUnitType?: string;
    /** Precision digits for dimensions */
    dimPrecisionDigits?: number;
    /** Whether dimensions should be integers only */
    isIntType: boolean;
  }

  /**
   * Object with getPrecisionConfig method
   */
  interface ConfigProvider {
    getPrecisionConfig(): PrecisionConfig;
  }

  /**
   * Style attributes for SVG elements
   */
  interface SVGElementStyle {
    stroke?: string;
    'stroke-width'?: number;
    'stroke-dasharray'?: string;
    'vector-effect'?: string;
    fill?: string;
    points?: string;
  }

  /**
   * Linear dimension data with start and end points
   */
  interface LinearDimensionData {
    /** Starting point of the dimension line */
    startPoint: { x: number; y: number };
    /** Ending point of the dimension line */
    endPoint: { x: number; y: number };
  }

  /**
   * View box change event data
   */
  interface ViewBoxChangedData {
    /** Whether the scale has changed */
    scaleChanged?: boolean;
  }

  /**
   * Setting change event data
   */
  interface SettingChangedData {
    /** Name of the changed field */
    fieldName: string;
    /** Previous value */
    oldValue: unknown;
    /** New value */
    value: unknown;
  }

  /**
   * Base dimension gizmo class for displaying and editing dimensional measurements.
   * Extends the SVG Gizmo base class and manages child dimension gizmos,
   * helper lines, boundary boxes, and outline visualizations.
   */
  export class BaseDimension extends HSApp.View.SVG.Gizmo {
    /** Default extension length for linear dimensions (in meters) */
    static readonly DEFULT_LINEAR_EXTENDS_LENGTHS: number;
    
    /** Maximum allowed dimension length (in meters) */
    static readonly MAX_DIMENSION_LENGTHS: number;
    
    /** Minimum allowed dimension length (in meters) */
    static readonly MIN_DIMENSION_LENGTHS: number;

    /** The entity being dimensioned */
    entity: unknown;
    
    /** Data for linear dimension child gizmos */
    linearDimensionGizmoDatas: LinearDimensionData[];
    
    /** Data for extended helper lines */
    extendsHelperLinearData: Array<{ start: HSCore.Util.Math.Vec2; end: HSCore.Util.Math.Vec2 }>;
    
    /** Data for boundary box helper lines */
    boxHelpLineData: unknown[];
    
    /** Data for outline helpers */
    outlineHelpData: unknown[];
    
    /** Command manager for undo/redo operations */
    cmdMgr: unknown;
    
    /** Default style for boundary box elements */
    private _defaultBoxElementStyle: SVGElementStyle;
    
    /** Default style for auxiliary linear elements */
    defaultAuxiliaryLinearStyle: SVGElementStyle;
    
    /** Index of the currently active dimension */
    activeDimIndex: number;
    
    /** SVG elements for outline visualization */
    outlineElements: unknown[];
    
    /** SVG elements for boundary box visualization */
    BoundaryboxElement: unknown[];
    
    /** SVG elements for auxiliary linear visualization */
    auxiliaryLinearElement: unknown[];
    
    /** Internal configuration storage */
    private _config: PrecisionConfig;
    
    /** Internal rules storage */
    private _rules: DimensionRules;
    
    /** Whether the dimension gizmo is enabled */
    isEnable?: boolean;

    /**
     * Creates a new BaseDimension instance
     * @param context - The view context
     * @param canvas - The canvas element
     * @param entity - The entity to dimension
     * @param controller - The controller for this gizmo
     */
    constructor(
      context: unknown,
      canvas: unknown,
      entity: unknown,
      controller: unknown
    );

    /**
     * Sets the configuration for dimension display
     * @param configProvider - Provider object with precision configuration, or undefined to use defaults
     */
    setConfig(configProvider?: ConfigProvider): void;

    /**
     * Initializes child dimension gizmos (4 linear dimensions)
     * @param context - The view context
     * @param canvas - The canvas element
     * @param entity - The entity to dimension
     */
    private _initChildenGizmo(
      context: unknown,
      canvas: unknown,
      entity: unknown
    ): void;

    /**
     * Initializes SVG elements for boundary box visualization (5 rectangles)
     */
    private _initBoundaryBoxElement(): void;

    /**
     * Initializes SVG elements for auxiliary linear visualization (5 paths)
     */
    private _initauxiliaryLinearElement(): void;

    /**
     * Initializes SVG elements for outline helper visualization (4 polygons)
     */
    initOutlineHelpData(): void;

    /**
     * Called when the gizmo is activated.
     * Sets up event listeners for view changes, entity updates, and user interactions.
     */
    onActivate(): void;

    /**
     * Handles view box change events
     * @param event - Event data containing scale change information
     */
    private _onViewBoxChanged(event: { data: ViewBoxChangedData }): void;

    /**
     * Called when the gizmo is deactivated.
     * Cleans up event listeners and resets state.
     */
    onDeactivate(): void;

    /**
     * Handles application setting change events
     * @param event - Event data containing field name and values
     */
    private _onSettingChanged(event: { data: SettingChangedData }): void;

    /**
     * Handles value change commit events from child gizmos
     * @param event - Value change event
     */
    private _onValueChangeCommit(event: unknown): void;

    /**
     * Handles input switching events (cycling through dimensions)
     */
    private _onInputSwitching(): void;

    /**
     * Sets the active dimension by updating focus state on all child gizmos
     */
    setActiveDimension(): void;

    /**
     * Cleans up all SVG elements and resets state
     */
    onCleanup(): void;

    /**
     * Marks the gizmo as dirty, triggering a redraw
     */
    update(): void;

    /**
     * Draws the dimension gizmo and all its child elements
     */
    draw(): void;

    /**
     * Hides all visual elements of the gizmo
     */
    hide(): void;

    /**
     * Resets all internal data arrays to empty state
     */
    reset(): void;

    /**
     * Checks if the content is in a hidden room (for ceiling environments)
     * @returns True if content is in a hidden room
     */
    private _isContentInHiddenRoom(): boolean;

    /**
     * Updates child gizmos based on computed dimension data.
     * Must be implemented by subclasses.
     */
    private _updateGizmos(): void;

    /**
     * Calculates the optimal text position for a dimension line,
     * ensuring it doesn't overlap with the entity outline.
     * @param startPoint - Start point of dimension line
     * @param endPoint - End point of dimension line
     * @returns Optimal text position
     */
    private _getTextPosition(
      startPoint: HSCore.Util.Math.Vec2,
      endPoint: HSCore.Util.Math.Vec2
    ): HSCore.Util.Math.Vec2;

    /**
     * Updates a child dimension gizmo with new data
     * @param data - Linear dimension data with start and end points
     * @param gizmo - The child gizmo to update
     */
    private _updateChildGizmo(
      data: LinearDimensionData,
      gizmo: HSApp.View.SVG.LinearDimension
    ): void;

    /**
     * Updates boundary box helper elements based on boxHelpLineData
     */
    private _updateHelperBoxs(): void;

    /**
     * Updates auxiliary linear helper elements based on extendsHelperLinearData
     */
    private _updateHelperLinears(): void;

    /**
     * Draws outline helper elements for the given entities
     * @param entities - Array of entities with outline data
     */
    drawOutlineHelpData(entities: Array<{ outline: Array<{ x: number; y: number }> }>): void;

    /**
     * Computes dimension information for all child gizmos.
     * Must be implemented by subclasses.
     */
    computeChildGizmoInfo(): void;
  }
}