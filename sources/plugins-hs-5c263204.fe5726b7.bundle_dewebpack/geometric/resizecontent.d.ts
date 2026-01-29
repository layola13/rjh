/**
 * ResizeContent Gizmo Module
 * Provides 3D resize gizmo functionality for content manipulation in the scene
 */

import type { Vector3, Matrix4, Quaternion, Euler } from 'three';
import type { HSCore } from '../core';
import type { HSApp } from '../app';
import type { FuzzyGizmo, FuzzyDirection, SvgShapeGizmo, GizmoBaseAgent } from './gizmo-types';
import type { LinearDimension } from './linear-dimension';
import type { SignalHook } from '../signals';
import type { BoundingBox } from '../geometry';

/** Dimension type for linear measurements */
type DimensionType = 'width' | 'depth' | 'height';

/** Direction names for gizmo faces */
type DirectionName = 
  | 'left' 
  | 'right' 
  | 'bottom' 
  | 'top' 
  | 'front' 
  | 'back'
  | 'leftback'
  | 'leftfront'
  | 'rightback'
  | 'rightfront';

/** State types for gizmo styling */
type GizmoState = 'normal' | 'hover';

/** Color configuration map for each direction */
type ColorMap = Record<DirectionName, number>;

/** Opacity configuration map for each direction */
type OpacityMap = Record<DirectionName, number>;

/** Style configuration for arrow gizmos */
interface ArrowStyle {
  /** Color values (hex) for each direction and state */
  color: Record<GizmoState, ColorMap>;
  /** Opacity values for each direction and state */
  opacity: Record<GizmoState, OpacityMap>;
}

/** Style configuration for face gizmos */
interface FaceStyle {
  /** Color values (hex) for main faces */
  color: Record<GizmoState, Omit<ColorMap, 'leftback' | 'leftfront' | 'rightback' | 'rightfront'>>;
  /** Opacity values for main faces */
  opacity: Record<GizmoState, Omit<OpacityMap, 'leftback' | 'leftfront' | 'rightback' | 'rightfront'>>;
}

/** Complete gizmo style configuration */
export interface GizmoStyle {
  /** Arrow handle styles */
  arrow: ArrowStyle;
  /** Face plane styles */
  face: FaceStyle;
}

/** Transform parameters for 3D objects */
export interface TransformParams {
  /** X position */
  x: number;
  /** Y position */
  y: number;
  /** Z position */
  z: number;
  /** Rotation around X axis (degrees) */
  XRotation: number;
  /** Rotation around Y axis (degrees) */
  YRotation: number;
  /** Rotation around Z axis (degrees) */
  ZRotation: number;
  /** Scale factor on X axis */
  XScale?: number;
  /** Scale factor on Y axis */
  YScale?: number;
  /** Scale factor on Z axis */
  ZScale?: number;
  /** Size on X axis */
  XSize?: number;
  /** Size on Y axis */
  YSize?: number;
  /** Size on Z axis */
  ZSize?: number;
}

/** Linear dimension data for rendering measurement lines */
export interface LinearDimensionData {
  /** Start point of dimension line */
  start: Vector3;
  /** End point of dimension line */
  end: Vector3;
}

/** Drag event parameters */
interface DragEventParams {
  /** Linear movement constraint flag */
  linearMove?: boolean;
  /** Movement offset [x, y, z] */
  offset?: [number, number, number];
  /** Mouse tracking flag */
  trackingMouse?: boolean;
  /** Constraint movement within room */
  constraintInRoom?: boolean;
}

/** Content entity that can be resized */
type ResizableContent = HSCore.Model.Content | HSCore.Model.Group | HSCore.Model.NCPBackgroundWallBase;

/**
 * Default style configuration for resize gizmo
 * Defines colors and opacities for arrows and faces in normal and hover states
 */
export const style: GizmoStyle = {
  arrow: {
    color: {
      normal: {
        left: 0xF1EADD,      // Light beige
        right: 0xF1EADD,
        bottom: 0x367CF3,    // Blue
        top: 0x367CF3,
        front: 0x63C0AA,     // Teal
        back: 0x63C0AA,
        leftback: 0x63C0AA,
        leftfront: 0x63C0AA,
        rightback: 0x63C0AA,
        rightfront: 0x63C0AA
      },
      hover: {
        left: 0xF1EADD,
        right: 0xF1EADD,
        bottom: 0x367CF3,
        top: 0x367CF3,
        front: 0x63C0AA,
        back: 0x63C0AA,
        leftback: 0x63C0AA,
        leftfront: 0x63C0AA,
        rightback: 0x63C0AA,
        rightfront: 0x63C0AA
      }
    },
    opacity: {
      normal: {
        left: 0.65,
        right: 0.65,
        bottom: 0.65,
        top: 0.65,
        front: 0.65,
        back: 0.65,
        leftback: 0.65,
        leftfront: 0.65,
        rightback: 0.65,
        rightfront: 0.65
      },
      hover: {
        left: 1.0,
        right: 1.0,
        bottom: 1.0,
        top: 1.0,
        front: 1.0,
        back: 1.0,
        leftback: 1.0,
        leftfront: 1.0,
        rightback: 1.0,
        rightfront: 1.0
      }
    }
  },
  face: {
    color: {
      normal: {
        left: 0x327CFF,
        right: 0x327CFF,
        bottom: 0x327CFF,
        top: 0x327CFF,
        front: 0x327CFF,
        back: 0x327CFF
      },
      hover: {
        left: 0x005DFF,
        right: 0x005DFF,
        bottom: 0x005DFF,
        top: 0x005DFF,
        front: 0x005DFF,
        back: 0x005DFF
      }
    },
    opacity: {
      normal: {
        left: 0.0,
        right: 0.0,
        bottom: 0.0,
        top: 0.0,
        front: 0.0,
        back: 0.0
      },
      hover: {
        left: 0.3,
        right: 0.3,
        bottom: 0.3,
        top: 0.3,
        front: 0.3,
        back: 0.3
      }
    }
  }
};

/**
 * Converts transform parameters to a 4x4 transformation matrix
 * @param params - Transform parameters including position, rotation, and scale
 * @returns Composed transformation matrix
 */
export function getMatrix4FromTransform(params: TransformParams): Matrix4;

/**
 * Calculates the world-space axis-aligned bounding box for a node
 * @param entity - The content entity to get bounds for
 * @returns Cloned bounding box or undefined if not available
 */
export function getNodeBoundingBox(entity: ResizableContent): BoundingBox | undefined;

/**
 * ResizeContent Gizmo Agent
 * Manages interactive 3D resize handles, dimension lines, and visual feedback
 * for resizing content objects in the scene
 */
export class ResizeContent extends GizmoBaseAgent {
  /**
   * Current transform state of the content being resized
   */
  transform?: TransformParams;

  /**
   * Array of content entities controlled by this gizmo
   */
  readonly contents: ResizableContent[];

  /**
   * Flag to hide gizmo during camera transitions
   */
  hideFromCameraChanging: boolean;

  /**
   * Reference to the global gizmo plugin manager
   */
  readonly gizmoPlugin: unknown;

  /**
   * Map of dimension lines (width, depth, height) for visual measurement
   */
  lineDimensions?: Map<DimensionType, LinearDimension>;

  /**
   * Currently active scaling direction
   * @private
   */
  private _scaleDirection: string;

  /**
   * Whether to show the bounding box gizmo
   * @private
   */
  private readonly _showBoxGizmo: boolean;

  /**
   * Signal hook manager for event subscriptions
   */
  signalHook?: SignalHook;

  /**
   * Creates a new ResizeContent gizmo
   * @param context - Application context
   * @param scene - 3D scene reference
   * @param content - Single content or array of contents to resize
   * @param showBoxGizmo - Whether to display the bounding box outline (default: true)
   */
  constructor(
    context: unknown,
    scene: unknown,
    content: ResizableContent | ResizableContent[],
    showBoxGizmo?: boolean
  );

  /**
   * Gets the FuzzyGizmo core instance
   */
  get fuzzyGizmo(): FuzzyGizmo;

  /**
   * Subscribes to content and camera change events
   * @protected
   */
  protected hookEvents(): void;

  /**
   * Handles content field changes by refreshing the gizmo
   * @protected
   */
  protected onContentFieldChange(): void;

  /**
   * Hides gizmo when camera movement starts
   * @protected
   */
  protected onCameraChangeStart(): void;

  /**
   * Shows gizmo when camera movement ends
   * @protected
   */
  protected onCameraChangeEnd(): void;

  /**
   * Sets visibility state during camera changes
   * @param hide - Whether to hide the gizmo
   * @protected
   */
  protected setHideFromCameraChanging(hide: boolean): void;

  /**
   * Determines if the gizmo should be visible based on current command state
   * @returns True if gizmo can be displayed
   * @protected
   */
  protected couldShow(): boolean;

  /**
   * Initializes linear dimension line gizmos for width, depth, and height
   * @param context - Application context
   * @param scene - 3D scene reference
   * @param content - Content to measure
   * @protected
   */
  protected initLineDimensions(
    context: unknown,
    scene: unknown,
    content: ResizableContent | ResizableContent[]
  ): void;

  /**
   * Updates all dimension line data based on current transform
   * @protected
   */
  protected updateDimensionData(): void;

  /**
   * Calculates dimension line endpoints for a specific measurement type
   * @param type - The dimension type (width, depth, or height)
   * @returns Start and end points in world space, or null if invalid
   * @protected
   */
  protected getLinearDimensionDataByType(type: DimensionType): LinearDimensionData | null;

  /**
   * Initializes gizmo appearance and event handlers
   * @protected
   */
  protected init(): void;

  /**
   * Updates gizmo position, size, and visibility based on content state
   * @protected
   */
  protected refreshCore(): void;

  /**
   * Converts scale direction to dimension type
   * @param direction - Fuzzy direction enum value
   * @returns Corresponding dimension type
   * @private
   */
  private _getScaleType(direction: string): DimensionType | '';

  /**
   * Determines if dimension lines should be visible
   * @returns True if resize command is active
   * @protected
   */
  protected couldShowDimension(): boolean;

  /**
   * Cleans up resources and unsubscribes from events
   * @protected
   */
  protected onCleanup(): void;

  /**
   * Handles mouse move over gizmo handle - shows hover state
   * @param event - Mouse event
   * @param gizmo - The SVG gizmo being hovered
   * @protected
   */
  protected onGizmoMouseMove(event: MouseEvent, gizmo: SvgShapeGizmo): void;

  /**
   * Handles mouse out from gizmo handle - restores normal state
   * @param event - Mouse event
   * @param gizmo - The SVG gizmo being left
   * @protected
   */
  protected onGizmoMouseOut(event: MouseEvent, gizmo: SvgShapeGizmo): void;

  /**
   * Handles drag start - initiates resize command
   * @param params - Drag event parameters
   * @param gizmo - The gizmo being dragged
   * @returns True if drag initiated successfully
   * @protected
   */
  protected ondragstart(params: DragEventParams, gizmo: SvgShapeGizmo): boolean;

  /**
   * Handles drag end - completes resize operation
   * @param params - Drag event parameters
   * @param gizmo - The gizmo being released
   * @returns True if drag ended successfully
   * @protected
   */
  protected ondragend(params: DragEventParams, gizmo: SvgShapeGizmo): boolean;

  /**
   * Composes drag move parameters with directional constraints
   * Projects movement onto the appropriate axis based on handle direction
   * @param params - Drag parameters to modify
   * @param gizmo - The active gizmo
   * @returns Modified drag parameters
   * @protected
   */
  protected composedragmoveparam(params: DragEventParams, gizmo: SvgShapeGizmo): DragEventParams;

  /**
   * Composes drag end parameters
   * @param params - Drag parameters to modify
   * @param gizmo - The active gizmo
   * @returns Modified drag parameters
   * @protected
   */
  protected composedragendparam(params: DragEventParams, gizmo: SvgShapeGizmo): DragEventParams;

  /**
   * Gets the world-space direction vector for a named gizmo handle
   * @param directionName - The handle direction name
   * @returns Normalized direction vector
   * @private
   */
  private _getDirection(directionName: string): Vector3;
}