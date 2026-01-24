/**
 * Module: WFACompsRotation
 * Provides rotation gizmo functionality for content manipulation in 3D space
 */

import { Vector3, Quaternion, Node, MeshComponent, Matrix, MeshBasicMaterial } from '@t3d/core';
import { WFABase, WFABaseController } from './WFABase';
import { ActiveType } from './ActiveType';
import { SignalHook } from '@hscore/util';

/**
 * Rotation color configuration constants
 */
export declare namespace RotationColor {
  export const normalArcColor: number;
  export const normalArcColor_xy: number;
  export const normalOpacity: number;
  export const normalOpacity_xy: number;
  export const hoverArcColor: number;
  export const hoverOpacity: number;
}

/**
 * Rotation scale factors for different camera types
 */
export declare namespace RotationScaleFactor {
  export const FPScale: number;
  export const OrbitScale: number;
  export const OrthScale: number;
}

/**
 * Direction information for rotation calculations
 */
export interface DirectionInfo {
  /** Zero direction vector */
  zeroDir: Vector3;
  /** Normal vector */
  normal: Vector3;
  /** Basic normal vector */
  basicNormal: Vector3;
}

/**
 * Mesh data structure for rotation gizmo
 */
export interface RotationMeshData {
  /** Ring mesh SVG path data */
  ringMeshData: {
    data: {
      paths: Array<{
        userData: {
          node: SVGElement;
          style: {
            fill?: string;
            fillOpacity?: number;
            stroke?: string;
            strokeOpacity?: number;
            strokeWidth?: number;
          };
        };
        toShapes(isCCW: boolean): THREE.Shape[];
        subPaths: Array<{ getPoints(): THREE.Vector2[] }>;
      }>;
    };
  };
  /** Rotate indicator mesh SVG path data */
  rotateMeshData: {
    data: {
      paths: Array<{
        userData: {
          node: SVGElement;
          style: {
            fill?: string;
            fillOpacity?: number;
            stroke?: string;
            strokeOpacity?: number;
            strokeWidth?: number;
          };
        };
        toShapes(isCCW: boolean): THREE.Shape[];
        subPaths: Array<{ getPoints(): THREE.Vector2[] }>;
      }>;
    };
  };
}

/**
 * Built mesh structure containing nodes
 */
export interface BuiltMesh {
  /** Root node containing all mesh components */
  node: Node;
  /** Node containing stroke meshes */
  strokeMesh: Node;
}

/**
 * Drag event data for rotation operations
 */
export interface DragEventData {
  /** Model space position */
  modelPos?: Vector3;
  /** Ground plane position */
  groundPos?: Vector3;
  /** Original DOM event */
  event?: MouseEvent;
  /** Rotation delta (set during drag move) */
  delta?: number;
}

/**
 * WFACompsRotation - Main rotation gizmo component
 * Handles visual representation and interaction for rotating content in 3D space
 */
export declare class WFACompsRotation extends WFABase {
  /** Ring visual indicator node */
  ringNode: Node;
  
  /** Rotation mesh (arc indicator) */
  rotationMesh: Node;
  
  /** Starting rotation value in radians */
  private _startRotation: number;
  
  /** Current rotation value in radians */
  private _curRotation: number;

  /**
   * Creates a new rotation gizmo instance
   * @param param1 - First constructor parameter (context/parent)
   * @param param2 - Second constructor parameter (configuration)
   * @param param3 - Third constructor parameter (active type)
   * @param param4 - Fourth constructor parameter (coordinate system)
   * @param param5 - Fifth constructor parameter (layer)
   * @param param6 - Sixth constructor parameter (active context)
   * @param controller - Optional controller instance, defaults to new WFACompsRotationController
   */
  constructor(
    param1: unknown,
    param2: unknown,
    param3: ActiveType,
    param4: unknown,
    param5: unknown,
    param6: unknown,
    controller?: WFACompsRotationController
  );

  /**
   * Gets the mesh data for rotation gizmo
   */
  get meshData(): RotationMeshData;

  /**
   * Checks if this is the main XY rotation gizmo
   * @returns True if active type is XY
   */
  private _isMainRotate(): boolean;

  /**
   * Handles active state changes (hover/active)
   */
  private _onActiveChange(): void;

  /**
   * Handles drag start event
   * @returns False to allow event propagation
   */
  onDragStart(): boolean;

  /**
   * Handles drag end event
   * @returns False to allow event propagation
   */
  onDragEnd(): boolean;

  /**
   * Handles mouse move event
   * @returns False to allow event propagation
   */
  onMouseMove(): boolean;

  /**
   * Calculates rotation with snapping
   * @param eventData - Drag event data
   * @param rotationDelta - Raw rotation delta in radians
   * @returns Snapped rotation value in radians
   */
  onRotate(eventData: DragEventData, rotationDelta: number): number;

  /**
   * Initializes start rotation from current content rotation
   */
  private _initStartRotation(): void;

  /**
   * Updates node transform based on gizmo position, scale and rotation
   */
  private _updateNodeTransform(): void;

  /**
   * Calculates gizmo scale based on camera distance and type
   * @returns Scale vector
   */
  private _getGizmoScale(): Vector3;

  /**
   * Gets gizmo position (bottom center of content with offset)
   * @returns Position vector
   */
  private _getGizmoPosition(): Vector3;

  /**
   * Calculates gizmo rotation to face camera
   * @returns Rotation quaternion
   */
  private _getGizmoRotation(): Quaternion;

  /**
   * Gets directional vectors for current active rotation plane
   * @returns Direction information object
   */
  private _getDirection(): DirectionInfo;

  /**
   * Applies normal (non-hover) visual style
   */
  private _setNormalStyler(): void;

  /**
   * Applies hover visual style
   */
  private _setHoverStyler(): void;

  /**
   * Builds mesh nodes from SVG path data
   * @param meshData - SVG path data structure
   * @returns Built mesh structure
   */
  private _buildMesh(meshData: RotationMeshData['ringMeshData']['data']): BuiltMesh;

  /**
   * Initializes all mesh components (ring and rotation indicator)
   */
  private _initMesh(): void;
}

/**
 * WFACompsRotationController - Controller for rotation gizmo interactions
 * Manages drag operations and command execution for content rotation
 */
declare class WFACompsRotationController extends WFABaseController {
  /** Current view rotation in radians */
  view_rotation: number;
  
  /** Signal hook for event management */
  signalHook: SignalHook;
  
  /** Base point for rotation calculation */
  private _basePoint: Vector3;
  
  /** Current rotation command */
  private _cmd: unknown;
  
  /** Reference to the parent rotation component */
  private _listener: WFACompsRotation | null;

  /**
   * Creates a new rotation controller
   * @param activeType - Type of rotation (XY, YZ, or XZ)
   * @param parent - Parent rotation component
   */
  constructor(activeType: ActiveType, parent: WFACompsRotation);

  /**
   * Handles drag start - creates and executes rotation command
   * @param eventData - Drag event data
   * @returns True if drag was started successfully
   */
  ondragstart(eventData: DragEventData): boolean;

  /**
   * Gets the normal vector for the current rotation plane
   * @returns Normal vector
   */
  private _getRingFaceNormal(): Vector3;

  /**
   * Projects 2D screen position to 3D position on rotation plane
   * @param screenPos - Screen space position
   * @param planeCenter - Center point of rotation plane
   * @returns 3D position on rotation plane
   */
  get3DPos(screenPos: Vector3, planeCenter: Vector3): Vector3;

  /**
   * Calculates rotation delta from mouse movement
   * @param eventData - Drag event data
   * @returns Rotation delta in degrees
   */
  private _calculateRotateDelta(eventData: DragEventData): number;

  /**
   * Composes drag move parameters with rotation delta
   * @param eventData - Drag event data
   * @returns Modified event data with delta
   */
  composedragmoveparam(eventData: DragEventData): DragEventData;

  /**
   * Handles command termination event
   * @param event - Command terminated event
   */
  private _onCommandTerminate(event: { data: { cmd: unknown } }): void;

  /**
   * Cleanup method - removes listeners and disposes resources
   */
  destroy(): void;
}

export { WFACompsRotationController };