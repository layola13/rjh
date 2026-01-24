/**
 * Active context types for content manipulation
 * Defines spatial directions and planes for content interaction
 */
export enum ActiveType {
  /** Top vertical direction */
  top = "top",
  /** Bottom vertical direction */
  bottom = "bottom",
  /** Near depth direction */
  near = "near",
  /** Far depth direction */
  far = "far",
  /** Left horizontal direction */
  left = "left",
  /** Right horizontal direction */
  right = "right",
  /** XY plane */
  xy = "xy",
  /** YZ plane */
  yz = "yz",
  /** XZ plane */
  xz = "xz"
}

/**
 * Context for managing active state of content manipulation gizmos
 * Provides signal-based notification of active state changes
 */
export declare class ActiveContext {
  /** Currently active manipulation type */
  active: ActiveType | undefined;
  
  /** Currently hovered manipulation type */
  hoverType: ActiveType | undefined;
  
  /** Signal dispatched when active state changes */
  signalChange: HSCore.Util.Signal<ActiveContext>;

  constructor();

  /**
   * Sets the active manipulation type
   * @param activeType - The type to set as active
   */
  setActive(activeType: ActiveType | undefined): void;

  /**
   * Sets the hovered manipulation type
   * @param hoverType - The type to set as hovered
   */
  setHover(hoverType: ActiveType | undefined): void;
}

/**
 * Visual indicator for vertical content lifting/lowering
 * Renders an interactive arrow gizmo that follows camera orientation
 */
export declare class ContentLift extends HSApp.View.T3d.Gizmo {
  /** Default color for inactive state (RGB: 0x327FFF) */
  defaultColor: number;
  
  /** Active/hover color (RGB: 0x5DFFFF) */
  activeColor: number;
  
  /** Content model being manipulated */
  content: HSCore.Model.ContentModel;
  
  /** Bounding length for scale calculations */
  contentBoundingLength: number;
  
  /** Active type this gizmo represents */
  activeType: ActiveType;
  
  /** Shared active context */
  activeContext: ActiveContext;
  
  /** Whether position updates are suspended */
  positionUpdateSuspended: boolean;
  
  /** Current rotation angle in radians */
  rotation: number;
  
  /** Horizontal scale factor */
  scaleX: number;
  
  /** Vertical scale factor */
  scaleY: number;
  
  /** Radius scale factor */
  scaleRadius: number;
  
  /** Display direction ("top" or "bottom") */
  direction: "top" | "bottom";
  
  /** Whether currently dragging */
  draging: boolean;
  
  /** Root node containing all visual meshes */
  node: T3D.Node;
  
  /** Arrow mesh node */
  moveBtn: T3D.Node;
  
  /** Arrow mesh reference */
  arrowMesh: T3D.Node;
  
  /** Signal hook for event subscriptions */
  signalHook1: HSCore.Util.SignalHook;

  /** Static mesh data cache */
  private static _meshData: { data: SVGResult } | null;

  /**
   * Creates a new ContentLift gizmo
   * @param entity - The content model entity
   * @param context - 3D view context
   * @param content - Content model to manipulate
   * @param controller - Optional custom controller
   * @param boundingLength - Optional custom bounding length
   * @param args - Additional constructor arguments
   */
  constructor(
    entity: HSCore.Model.ContentModel,
    context: HSApp.View.T3d.Context,
    content: HSCore.Model.ContentModel,
    controller?: ContentLiftController,
    boundingLength?: number,
    ...args: unknown[]
  );

  /**
   * Gets the content's current world position
   */
  get contentPosition(): THREE.Vector3;

  /**
   * Shows the gizmo
   */
  show(): void;

  /**
   * Hides the gizmo
   */
  hide(): void;

  /**
   * Updates the gizmo's visual state and position
   */
  updateMesh(): void;

  /**
   * Draws the gizmo, called each frame
   */
  draw(): void;

  /**
   * Handles drag start event
   * @param event - Drag event data
   */
  onDragStart(event: unknown): boolean;

  /**
   * Handles drag end event
   * @param event - Drag event data
   */
  onDragEnd(event: unknown): boolean;

  /**
   * Handles mouse move event
   * @param event - Mouse event data
   */
  onMouseMove(event: unknown): boolean;

  /**
   * Handles mouse out event
   * @param event - Mouse event data
   */
  onMouseOut(event: unknown): void;

  /**
   * Cleanup resources when gizmo is destroyed
   */
  onCleanup(): void;

  /**
   * Calculates rotation quaternion for current display direction
   */
  getContentRotation(): T3D.Quaternion | undefined;

  /**
   * Calculates angle around Y axis relative to camera
   * @param camera - Active camera
   */
  getAngleY(camera: HSCore.Model.CameraModel): number;

  /**
   * Calculates angle around X axis relative to camera
   * @param camera - Active camera
   */
  getAngleX(camera: HSCore.Model.CameraModel): number;

  /**
   * Hides or shows gizmo based on camera movement
   * @param hide - Whether to hide during camera changes
   */
  setHideFromCameraChanging(hide: boolean): void;

  /**
   * Builds mesh geometry from SVG path data
   * @param svgData - Parsed SVG data
   */
  private _buildMesh(svgData: SVGResult): { mesh: T3D.Node; strokeMesh: T3D.Node };

  /**
   * Initializes the arrow mesh
   */
  private _initMesh(): void;

  /**
   * Sets opacity for all materials in a node hierarchy
   * @param node - Root node
   * @param opacity - Opacity value (0-1)
   */
  private _setMeshOpacity(node: T3D.Node, opacity: number): void;

  /**
   * Sets color for all materials in a node hierarchy
   * @param node - Root node
   * @param color - Color as number
   */
  private _setMeshColor(node: T3D.Node, color: number): void;

  /**
   * Updates gizmo scale based on camera distance
   * @param camera - Active camera
   * @param content - Content model
   */
  private _updateGizmoScale(
    camera: HSCore.Model.CameraModel,
    content: HSCore.Model.ContentModel
  ): [T3D.Vector3, T3D.Vector3, T3D.Vector3];

  /**
   * Updates visibility and appearance based on active state
   */
  private _updateGizmoShow(): void;

  /**
   * Calculates world position for gizmo placement
   */
  private _getPosition(): T3D.Vector3;

  /**
   * Handles changes to active context
   */
  private _onActiveChange(event: unknown): void;

  /**
   * Handles content field changes
   */
  private _onContentFieldChange(): void;

  /**
   * Handles camera change start
   */
  private _onCameraChangeStart(): void;

  /**
   * Handles camera change end
   */
  private _onCameraChangeEnd(): void;
}

/**
 * Controller for vertical content lifting operations
 * Handles drag interactions for moving content along Z-axis
 */
export declare class ContentLiftController extends HSApp.View.Base.DisplayController {
  /** Default controller for standard operations */
  defaultController: HSApp.View.T3d.ContentController | HSApp.View.T3d.CustomizedPMInstanceModelController;
  
  /** Shared active context */
  activeContext: ActiveContext;
  
  /** Active type this controller handles */
  activeType: ActiveType;
  
  /** Original position when drag started */
  originPos: THREE.Vector3;

  /**
   * Creates a new ContentLiftController
   * @param entity - Content model entity
   * @param context - 3D view context
   * @param defaultController - Optional default controller
   * @param activeType - Type of active manipulation
   * @param activeContext - Shared active context
   */
  constructor(
    entity: HSCore.Model.ContentModel,
    context: HSApp.View.T3d.Context,
    defaultController?: HSApp.View.T3d.ContentController,
    activeType?: ActiveType,
    activeContext?: ActiveContext
  );

  /**
   * Gets the content's current position
   */
  get contentPosition(): THREE.Vector3;

  /**
   * Handles drag start event
   * @param event - Drag event parameters
   */
  ondragstart(event: DragEventParams): boolean;

  /**
   * Handles drag end event
   */
  ondragend(): boolean;

  /**
   * Handles mouse down event
   */
  onmousedown(): void;

  /**
   * Composes parameters for drag move operation
   * @param params - Drag parameters to modify
   */
  composedragmoveparam(params: DragMoveParams): DragMoveParams;

  /**
   * Composes parameters for drag end operation
   * @param params - Drag end parameters to modify
   */
  composedragendparam(params: DragEndParams): DragEndParams;
}

/**
 * Parameters for drag events
 */
interface DragEventParams {
  /** Whether movement is constrained to room bounds */
  constraintInRoom?: boolean;
  /** Source of the move operation */
  moveby?: string;
  /** Offset vector [x, y, z] */
  offset?: [number, number, number];
  /** Whether to use linear movement */
  linearMove?: boolean;
  /** Model space to screen space conversion factor */
  modelToScreen?: number;
  /** Ray vectors for intersection testing */
  vectors?: Array<{ start: THREE.Vector3; end: THREE.Vector3 }>;
}

/**
 * Parameters for drag move operations
 */
interface DragMoveParams extends DragEventParams {}

/**
 * Parameters for drag end operations
 */
interface DragEndParams {
  /** Whether to track mouse position */
  trackingMouse?: boolean;
}