/**
 * ContentBox Module
 * Provides 3D bounding box visualization for content objects in the scene
 */

import { Vector3, Quaternion, Matrix4, BoundingBox } from './Vector3DTypes';
import { Node, MeshComponent, LineDashedMaterial, LineMeshMaterial } from './SceneGraphTypes';
import { BoxGizmo, GizmoBaseAgent } from './GizmoTypes';
import { HSCore } from './HSCoreTypes';
import { CommandType } from './CommandTypes';

/**
 * Represents a 3D transform with position, rotation, and scale
 */
interface Transform {
  /** Width of the object */
  XSize?: number;
  /** Depth of the object */
  YSize?: number;
  /** Height of the object */
  ZSize?: number;
  /** Additional transform properties */
  [key: string]: unknown;
}

/**
 * Material configuration options for gizmo rendering
 */
interface GizmoMaterialOptions {
  /** RGB color value */
  color: number;
  /** Line width in pixels */
  lineWidth: number;
  /** Polygon offset for depth sorting */
  polygonOffsetFactor: number;
  /** Dash segment size (for dashed lines) */
  dashSize?: number;
  /** Gap size between dashes (for dashed lines) */
  gapSize?: number;
}

/**
 * Context object providing access to application state
 */
interface GizmoContext {
  /** Reference to the main application instance */
  application: {
    /** Command manager for tracking user actions */
    cmdManager: {
      /** Currently executing command */
      current?: {
        /** Type identifier of the command */
        type: string;
      };
      /** Signal emitted when command completes */
      signalCommandTerminated: unknown;
    };
    /** Signal emitted when camera movement starts */
    signalCameraChangeStart: unknown;
    /** Signal emitted when camera movement ends */
    signalCameraChangeEnd: unknown;
    /** Floor plan and scene data */
    floorplan: {
      scene: {
        /** Get altitude/height of a layer */
        getLayerAltitude(parent: unknown): number;
      };
    };
    /** Design configuration metadata */
    designMetadata: {
      /** Get metadata value by key */
      get(key: string): unknown;
    };
    /** Get the active 3D viewport */
    getActive3DView(): {
      /** Map of entity IDs to display nodes */
      displayList?: Record<string, { node?: { getVisible(): boolean } }>;
    };
  };
  /** Signal emitted when camera position/orientation changes */
  signalCameraChanged: unknown;
  /** Hook for subscribing to signals */
  signalHook?: unknown;
}

/**
 * Content entity that can be displayed in the scene
 */
interface ContentEntity {
  /** Unique identifier */
  id: string;
  /** Signal emitted when properties change */
  signalFieldChanged: unknown;
  /** Signal emitted when object needs redraw */
  signalDirty: unknown;
  /** Get the parent container */
  getUniqueParent(): unknown;
}

/**
 * Enhanced box gizmo with dashed line support
 */
declare class DashedBoxGizmo extends BoxGizmo {
  /**
   * Build the 3D mesh representation of the box
   * Creates either dashed or solid lines based on _isDashLine flag
   */
  buildMesh(): void;

  /**
   * Create mesh nodes for pickable faces
   * @param min - Minimum corner of bounding box
   * @param max - Maximum corner of bounding box
   * @returns Face mesh node
   */
  protected _buildFaceMesh(min: Vector3, max: Vector3): Node;

  /**
   * Create material for gizmo rendering
   * @param materialClass - Material class constructor
   * @param options - Material configuration
   * @returns Configured material instance
   */
  protected createGizmoMaterial(
    materialClass: typeof LineDashedMaterial | typeof LineMeshMaterial,
    options: GizmoMaterialOptions
  ): LineDashedMaterial | LineMeshMaterial;

  /** Origin point of the box */
  protected _origin: Vector3;
  /** Whether the box is pickable/selectable */
  protected _pickable: boolean;
  /** Whether to render dashed lines */
  protected _isDashLine: boolean;
  /** Line color */
  protected _color: number;
  /** Line width */
  protected _lineWidth: number;
  /** Polygon offset factor */
  protected _polygonOffsetFactor: number;
  /** Root scene node */
  protected _node: Node;
}

/**
 * Agent for managing content bounding box visualization
 * Displays a 3D box around selected content objects and updates on changes
 */
export declare class ContentBox extends GizmoBaseAgent {
  /**
   * Create a new content box agent
   * @param context - Application context with signals and state
   * @param boxGizmo - Gizmo instance for rendering the box
   * @param contents - Content entity or array of entities to visualize
   */
  constructor(
    context: GizmoContext,
    boxGizmo: BoxGizmo | DashedBoxGizmo,
    contents: ContentEntity | ContentEntity[]
  );

  /** The gizmo responsible for rendering the box */
  boxGizmo: BoxGizmo | DashedBoxGizmo;

  /** Current transform (position, rotation, scale) of the content */
  transform?: Transform;

  /** Array of content entities being visualized */
  contents: ContentEntity[];

  /** Whether to hide the box during camera movement for performance */
  hideFromCameraChanging: boolean;

  /**
   * Subscribe to relevant signals and events
   * Listens to camera changes, command completion, and content updates
   */
  hookEvents(): void;

  /**
   * Handler for content property changes
   * Marks the gizmo as dirty to trigger redraw
   */
  onContentFieldChange(): void;

  /**
   * Handler for camera movement start
   * Hides the box if configured to do so
   */
  onCameraChangeStart(): void;

  /**
   * Handler for camera movement end
   * Shows the box again after camera settles
   */
  onCameraChangeEnd(): void;

  /**
   * Toggle visibility during camera changes
   * @param shouldHide - Whether to hide the box
   */
  setHideFromCameraChanging(shouldHide: boolean): void;

  /**
   * Initialize the content box
   * Sets default color, opacity, and marks as dirty
   */
  init(): void;

  /**
   * Render the content box
   * Shows or hides based on visibility rules, rebuilds geometry if needed
   */
  draw(): void;

  /**
   * Rebuild box geometry from content data
   * Calculates bounding box, transform, and updates gizmo properties
   */
  buildContentData(): void;

  /**
   * Determine if the box should be visible
   * Checks content visibility, active commands, and camera state
   * @returns True if box should be shown
   */
  couldShow(): boolean;

  /**
   * Cleanup when agent is destroyed
   * Unsubscribes from all signals
   */
  onCleanup(): void;

  /** Application context */
  protected context: GizmoContext;

  /** Whether the gizmo needs redraw */
  protected dirty: boolean;

  /** Signal subscription manager */
  protected signalHook?: unknown;
}