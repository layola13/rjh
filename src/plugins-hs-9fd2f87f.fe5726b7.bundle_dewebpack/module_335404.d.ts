/**
 * 3D Diff Content Gizmo Module
 * Provides visual gizmos for displaying 3D bounding boxes with stroke and fill around entities
 */

import { Node, Vector3, BoundingBox, MeshLambertMaterial, LineMeshMaterial, Quaternion, MeshComponent, BoxGeometry, Matrix4, Euler, Math as T3DMath } from '367441';
import { HSCore } from '635589';

/**
 * Configuration for gizmo appearance
 */
interface GizmoColorConfig {
  /** Stroke color in hex format (e.g., "0xffa023") */
  strokeColor: string;
  /** Fill color in hex format (e.g., "0xffe823") */
  fillColor: string;
  /** Line width for stroke */
  strokeWidth: number;
  /** Fill opacity (0-1) */
  fillOpacity?: number;
}

/**
 * Entity transform data structure
 */
interface EntityTransform {
  /** X position */
  x: number;
  /** Y position */
  y: number;
  /** Z position */
  z: number;
  /** X rotation in degrees */
  XRotation: number;
  /** Y rotation in degrees */
  YRotation: number;
  /** Z rotation in degrees */
  ZRotation: number;
  /** X dimension size */
  XSize?: number;
  /** Y dimension size */
  YSize?: number;
  /** Z dimension size */
  ZSize?: number;
  /** X scale factor */
  XScale?: number;
  /** Y scale factor */
  YScale?: number;
  /** Z scale factor */
  ZScale?: number;
}

/**
 * Application context interface
 */
interface AppContext {
  /** Reference to the application instance */
  application: HSApplication;
  /** Flag indicating if rendering is needed */
  needsRendering: boolean;
  /** Check if context is active */
  isActive: boolean;
}

/**
 * HSApplication interface
 */
interface HSApplication {
  /** Selection manager for handling entity selection */
  selectionManager: SelectionManager;
}

/**
 * Selection manager interface
 */
interface SelectionManager {
  /** Deselect all selected entities */
  unselectAll(): void;
  /** Select a specific entity */
  select(entity: unknown): void;
}

/**
 * Base Gizmo class from HSApp framework
 */
declare class BaseGizmo {
  constructor(context: AppContext, node: Node, entity: unknown, controller: unknown);
  /** Parent layer containing this gizmo */
  layer?: {
    removeChild(gizmo: BaseGizmo): void;
    addChild(gizmo: BaseGizmo): void;
  };
}

/**
 * Base DisplayController class from HSApp framework
 */
declare class BaseDisplayController {
  constructor(entity: unknown, context: AppContext);
  context: AppContext;
}

/**
 * 3D Diff Content Gizmo
 * Renders a 3D bounding box around an entity with configurable stroke and fill
 */
export class DiffContentGizmo extends BaseGizmo {
  /** Application instance */
  app: HSApplication;
  /** Root node for gizmo visualization */
  node: Node | null;
  /** Array of visual elements (mesh nodes) */
  elements: Node[];
  /** Color configuration for stroke and fill */
  color: GizmoColorConfig;
  /** The entity this gizmo is attached to */
  entity: unknown;
  /** Application context */
  context: AppContext;

  /**
   * Creates a new DiffContentGizmo
   * @param context - Application context
   * @param node - Parent node
   * @param entity - Entity to attach gizmo to
   * @param colorConfig - Optional color configuration
   * @param disableClick - Whether to disable click interactions
   */
  constructor(
    context: AppContext,
    node: Node,
    entity: unknown,
    colorConfig?: Partial<GizmoColorConfig>,
    disableClick?: boolean
  ) {
    const controller = new DiffContentDisplayController(entity, context, disableClick);
    super(context, node, entity, controller);

    const defaultColors: GizmoColorConfig = {
      strokeColor: "0xffa023",
      fillColor: "0xffe823",
      strokeWidth: 2
    };

    this.context = context;
    this.entity = entity;
    this.app = context.application;
    this.elements = [];
    this.node = null;
    this.color = colorConfig ? { ...defaultColors, ...colorConfig } : defaultColors;
  }

  /**
   * Show the gizmo
   */
  show = (): void => {
    if (!this.node) {
      this._createNode();
    }
    this.node!.setVisible(true);
    this.context.needsRendering = true;
  };

  /**
   * Hide the gizmo
   */
  hide = (): void => {
    if (this.node) {
      this.node.setVisible(false);
      this.context.needsRendering = true;
    }
  };

  /**
   * Deactivate the gizmo
   */
  deactivate(): void {
    this._clearNode();
  }

  /**
   * Cleanup when gizmo is destroyed
   */
  onCleanup(): void {
    this._clearNode();
  }

  /**
   * Draw the gizmo
   */
  draw(): void {
    if (!this.node) {
      this._createNode();
      this.node!.setVisible(true);
      this.context.needsRendering = true;
    }
  }

  /**
   * Remove all child nodes and clean up
   * @private
   */
  private _clearNode(): void {
    if (this.layer && this.elements.length > 0) {
      this.layer.removeChild(this);
      this.elements.forEach((element) => {
        this.node!.removeChild(element);
      });
      this.elements = [];
      this.context.needsRendering = true;
    }
  }

  /**
   * Create the visual node with mesh and wireframe
   * @private
   */
  private _createNode(): void {
    this.node = new Node("3DDiffContentGizmo");

    const rotation = new Quaternion();
    const position = new Vector3();
    const scale = new Vector3(1, 1, 1);

    // Get entity transform and decompose matrix
    const transform = HSApp.Util.Entity.getEntityTransform([this.entity]);
    const matrix = transform && this.getMatrix4FromTransform(transform);
    matrix?.decompose(position, rotation, scale);

    const baseHeight = HSCore.Util.Layer.getEntityBaseHeight(this.entity);
    const sizeX = transform?.XSize || 0;
    const sizeY = transform?.YSize || 0;
    const sizeZ = transform?.ZSize || 0;

    // Create filled box mesh
    const boxGeometry = new BoxGeometry(sizeX, sizeZ, sizeY);
    const streamingMesh = T3Dx.Three2T3d.convertGeometryToStreamingMesh(boxGeometry);
    const fillMaterial = new MeshLambertMaterial({
      color: this.color.fillColor,
      transparent: true,
      opacity: this.color.fillOpacity || 0.7
    });
    const fillMeshNode = T3Dx.Three2T3d.createMeshNode(streamingMesh, fillMaterial);

    // Create bounding box for wireframe
    const minCorner = new Vector3(-0.5, -0.5, -0.5);
    const maxCorner = new Vector3(0.5, 0.5, 0.5);
    const boundingBox = new BoundingBox(minCorner, maxCorner);

    // Create wireframe material
    const wireframeMaterial = new LineMeshMaterial({
      color: this.color.strokeColor,
      lineWidth: this.color.strokeWidth,
      opacity: 1,
      transparent: true
    });

    // Build wireframe edges (12 edges of the box)
    const edgePositions = this._createBoxEdgePositions(minCorner, maxCorner);
    const wireframeMesh = T3Dx.Line2Mesh.setFromPositions(edgePositions, [], "boxgizmoseg");
    const wireframeNode = T3Dx.Three2T3d.createMeshNode(wireframeMesh, wireframeMaterial);
    wireframeNode.getComponent(MeshComponent).getMesh().setBoundingBox(boundingBox.clone());

    // Position and rotate nodes
    const finalZ = position.z + baseHeight + sizeZ / 2;
    const finalPosition = new Vector3(position.x, finalZ, -position.y);
    const finalRotation = new Quaternion(rotation.x, rotation.z, -rotation.y, rotation.w);

    fillMeshNode.setTranslation(finalPosition);
    fillMeshNode.setRotation(finalRotation);

    wireframeNode.setTranslation(finalPosition);
    wireframeNode.setRotation(finalRotation);
    wireframeNode.setScale(new Vector3(sizeX, sizeZ, sizeY));

    // Add to scene
    this.elements.push(fillMeshNode);
    this.elements.push(wireframeNode);
    this.node.addChild(fillMeshNode);
    this.node.addChild(wireframeNode);
    this.layer!.addChild(this);

    if (this.context) {
      this.context.needsRendering = true;
    }
  }

  /**
   * Create vertex positions for box wireframe edges
   * @private
   */
  private _createBoxEdgePositions(min: Vector3, max: Vector3): number[] {
    const positions: number[] = [];
    const edges = [
      // Top face
      [max.x, max.y, max.z], [min.x, max.y, max.z],
      [min.x, max.y, max.z], [min.x, min.y, max.z],
      [min.x, min.y, max.z], [max.x, min.y, max.z],
      [max.x, min.y, max.z], [max.x, max.y, max.z],
      // Bottom face
      [max.x, max.y, min.z], [min.x, max.y, min.z],
      [min.x, max.y, min.z], [min.x, min.y, min.z],
      [min.x, min.y, min.z], [max.x, min.y, min.z],
      [max.x, min.y, min.z], [max.x, max.y, min.z],
      // Vertical edges
      [max.x, max.y, max.z], [max.x, max.y, min.z],
      [min.x, max.y, max.z], [min.x, max.y, min.z],
      [min.x, min.y, max.z], [min.x, min.y, min.z],
      [max.x, min.y, max.z], [max.x, min.y, min.z]
    ];

    edges.forEach(vertex => positions.push(...vertex));
    return positions;
  }

  /**
   * Convert entity transform to Matrix4
   * @param transform - Entity transform data
   * @returns 4x4 transformation matrix
   */
  getMatrix4FromTransform(transform: EntityTransform): Matrix4 {
    const position = new Vector3(transform.x, transform.y, transform.z);
    const rotation = new Quaternion().setFromEuler(
      new Euler(
        -transform.XRotation * T3DMath.DEG2RAD,
        -transform.YRotation * T3DMath.DEG2RAD,
        -transform.ZRotation * T3DMath.DEG2RAD
      )
    );
    const scale = new Vector3(
      transform.XScale ?? 1,
      transform.YScale ?? 1,
      transform.ZScale ?? 1
    );

    const matrix = new Matrix4();
    matrix.compose(position, rotation, scale);
    return matrix;
  }
}

/**
 * Display controller for handling click interactions with the gizmo
 */
export class DiffContentDisplayController extends BaseDisplayController {
  /** Application instance */
  app: HSApplication;
  /** Whether click interactions are disabled */
  disableClick?: boolean;
  /** The entity this controller is attached to */
  entity: unknown;

  /**
   * Creates a new DiffContentDisplayController
   * @param entity - Entity to control
   * @param context - Application context
   * @param disableClick - Whether to disable click interactions
   */
  constructor(entity: unknown, context: AppContext, disableClick?: boolean) {
    super(entity, context);
    this.entity = entity;
    this.disableClick = disableClick;
    this.app = context.application;
  }

  /**
   * Handle click event on the gizmo
   * @returns Whether the context should remain active
   */
  onclick(): boolean {
    if (!this.disableClick) {
      this.app.selectionManager.unselectAll();
      this.app.selectionManager.select(this.entity);
    }
    return !this.context.isActive;
  }
}

export default DiffContentGizmo;