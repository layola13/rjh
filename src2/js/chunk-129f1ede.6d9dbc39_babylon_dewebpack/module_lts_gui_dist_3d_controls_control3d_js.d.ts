import { Observable } from "core/Misc/observable";
import { Vector3 } from "core/Maths/math.vector";
import { AbstractMesh } from "core/Meshes/abstractMesh";
import { TransformNode } from "core/Meshes/transformNode";
import { Scene } from "core/scene";
import { PointerEventTypes, PointerInfo } from "core/Events/pointerEvents";
import { Vector3WithInfo } from "../../../lts/gui/dist/3D/vector3WithInfo";

/**
 * Reserved data store for GUI3D controls
 */
interface GUI3DReservedDataStore {
  control?: Control3D;
}

/**
 * Reserved data store structure for nodes
 */
interface NodeReservedDataStore {
  GUI3D?: GUI3DReservedDataStore;
}

/**
 * Interface for nodes with reserved data store
 */
interface NodeWithReservedData {
  reservedDataStore?: NodeReservedDataStore;
}

/**
 * Behavior interface for 3D controls
 */
interface Behavior3D {
  /** Name of the behavior */
  name: string;
  
  /** Initialize the behavior */
  init(): void;
  
  /** Attach the behavior to a control */
  attach(control: Control3D): void;
  
  /** Detach the behavior from its control */
  detach(): void;
}

/**
 * Interface for touch button 3D controls
 */
interface TouchButton3D extends Control3D {
  _generatePointerEventType(
    control: Control3D,
    pointerInfo: PointerInfo,
    downCount: number
  ): number;
}

/**
 * Host manager interface for 3D controls
 */
interface GUI3DManager {
  /** The scene containing the controls */
  scene: Scene;
  
  /** Map of last control pressed down by pointer ID */
  _lastControlDown: Record<number, Control3D>;
  
  /** Map of last control hovered over by pointer ID */
  _lastControlOver: Record<number, Control3D>;
  
  /** Last picked control */
  _lastPickedControl?: Control3D;
}

/**
 * Base class for 3D GUI controls
 * Provides common functionality for interactive 3D UI elements
 */
export declare class Control3D {
  /** Name of the control */
  name: string;
  
  /** @internal */
  _host: GUI3DManager;
  
  /** @internal */
  _node: TransformNode | null;
  
  /** @internal */
  _downCount: number;
  
  /** @internal */
  _enterCount: number;
  
  /** @internal */
  _downPointerIds: Record<number, number>;
  
  /** @internal */
  _isVisible: boolean;
  
  /** @internal */
  _isScaledByManager: boolean;
  
  /** @internal */
  _behaviors: Behavior3D[];
  
  /**
   * Observable raised when pointer moves over the control
   */
  onPointerMoveObservable: Observable<Vector3WithInfo>;
  
  /**
   * Observable raised when pointer leaves the control
   */
  onPointerOutObservable: Observable<Control3D>;
  
  /**
   * Observable raised when pointer is pressed down on the control
   */
  onPointerDownObservable: Observable<Vector3WithInfo>;
  
  /**
   * Observable raised when pointer is released on the control
   */
  onPointerUpObservable: Observable<Vector3WithInfo>;
  
  /**
   * Observable raised when control is clicked
   */
  onPointerClickObservable: Observable<Vector3WithInfo>;
  
  /**
   * Observable raised when pointer enters the control
   */
  onPointerEnterObservable: Observable<Control3D>;
  
  /**
   * Animation to play when pointer enters
   */
  pointerEnterAnimation?: () => void;
  
  /**
   * Animation to play when pointer leaves
   */
  pointerOutAnimation?: () => void;
  
  /**
   * Animation to play when pointer is pressed down
   */
  pointerDownAnimation?: () => void;
  
  /**
   * Animation to play when pointer is released
   */
  pointerUpAnimation?: () => void;
  
  /**
   * Creates a new Control3D
   * @param name - Name of the control
   */
  constructor(name?: string);
  
  /**
   * Gets or sets the position of the control
   */
  get position(): Vector3;
  set position(value: Vector3);
  
  /**
   * Gets or sets the scaling of the control
   */
  get scaling(): Vector3;
  set scaling(value: Vector3);
  
  /**
   * Gets the list of attached behaviors
   */
  get behaviors(): ReadonlyArray<Behavior3D>;
  
  /**
   * Gets or sets the visibility of the control
   */
  get isVisible(): boolean;
  set isVisible(value: boolean);
  
  /**
   * Gets the type name of the control
   */
  get typeName(): string;
  
  /**
   * Gets the transform node associated with this control
   */
  get node(): TransformNode | null;
  
  /**
   * Gets the mesh associated with this control (if node is a mesh)
   */
  get mesh(): AbstractMesh | null;
  
  /**
   * Gets the class name of the control
   * @returns The class name
   */
  getClassName(): string;
  
  /**
   * @internal
   * Gets the type name of the control
   */
  _getTypeName(): string;
  
  /**
   * Attaches a behavior to the control
   * @param behavior - The behavior to attach
   * @returns This control for chaining
   */
  addBehavior(behavior: Behavior3D): this;
  
  /**
   * Removes a behavior from the control
   * @param behavior - The behavior to remove
   * @returns This control for chaining
   */
  removeBehavior(behavior: Behavior3D): this;
  
  /**
   * Gets a behavior by name
   * @param name - The name of the behavior
   * @returns The behavior or null if not found
   */
  getBehaviorByName(name: string): Behavior3D | null;
  
  /**
   * Links this control to a transform node (makes it a child)
   * @param transformNode - The parent transform node
   * @returns This control for chaining
   */
  linkToTransformNode(transformNode: TransformNode | null): this;
  
  /**
   * @internal
   * Prepares the node for the control
   */
  _prepareNode(scene: Scene): void;
  
  /**
   * @internal
   * Injects GUI3D reserved data store into a node
   */
  _injectGUI3DReservedDataStore(
    node: TransformNode & NodeWithReservedData
  ): GUI3DReservedDataStore;
  
  /**
   * @internal
   * Creates the node for this control
   */
  _createNode(scene: Scene): TransformNode | null;
  
  /**
   * @internal
   * Applies material to the mesh
   */
  _affectMaterial(mesh: AbstractMesh): void;
  
  /**
   * @internal
   * Checks if control is a touch button
   */
  _isTouchButton3D(control: Control3D): control is TouchButton3D;
  
  /**
   * @internal
   * Handles pointer move events
   */
  _onPointerMove(control: Control3D, coordinates: Vector3WithInfo): void;
  
  /**
   * @internal
   * Handles pointer enter events
   */
  _onPointerEnter(control: Control3D): boolean;
  
  /**
   * @internal
   * Handles pointer out events
   */
  _onPointerOut(control: Control3D): void;
  
  /**
   * @internal
   * Handles pointer down events
   */
  _onPointerDown(
    control: Control3D,
    coordinates: Vector3,
    pointerId: number,
    buttonIndex: number
  ): boolean;
  
  /**
   * @internal
   * Handles pointer up events
   */
  _onPointerUp(
    control: Control3D,
    coordinates: Vector3,
    pointerId: number,
    buttonIndex: number,
    notifyClick: boolean
  ): void;
  
  /**
   * Forces a pointer up event for the specified pointer or all pointers
   * @param pointerId - Optional pointer ID, if null all pointers are released
   */
  forcePointerUp(pointerId?: number | null): void;
  
  /**
   * @internal
   * Processes pointer observables
   */
  _processObservables(
    eventType: number,
    coordinates: Vector3,
    pointerInfo: PointerInfo | null,
    pointerId: number,
    buttonIndex: number
  ): boolean;
  
  /**
   * @internal
   * Disposes the node
   */
  _disposeNode(): void;
  
  /**
   * Disposes the control and releases all resources
   */
  dispose(): void;
}