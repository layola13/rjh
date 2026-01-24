/**
 * Camera movement indicator gizmo for 3D view navigation
 * Provides visual directional controls for camera movement with hover effects
 */

import { Vector3, Quaternion, Node, MeshComponent, MeshBasicMaterial, LineBasicMaterial } from 'T3DEngine';
import { Gizmo, DisplayController } from 'HSApp.View.Base';

/** Material definitions for camera indicator rendering */
interface CameraIndicatorMeshData {
  /** Material variants for normal and highlight states */
  material: {
    /** Default appearance material */
    normal: MeshBasicMaterial;
    /** Highlighted appearance when hovered */
    highlight: MeshBasicMaterial;
  };
  /** Geometry defining the triangular indicator shape */
  geometry: THREE.Geometry;
}

/** Configuration for directional indicator positioning */
interface DirectionConfig {
  x: number;
  y: number;
  z: number;
}

/**
 * Camera movement indicator gizmo
 * Displays a triangular directional indicator that responds to user interaction
 * to control camera movement in the 3D scene
 */
export default class CameraMovementIndicator extends Gizmo {
  /** Shared mesh data across all instances for performance */
  private static _meshData: CameraIndicatorMeshData | null = null;

  /** Current rotation angle of the indicator */
  private rotation: number;
  
  /** Direction vector the indicator points towards */
  private frontDirectionVector: DirectionConfig;
  
  /** Cached direction vector after rotation applied */
  private direction?: Vector3;
  
  /** Main mesh node for the indicator body */
  private _mesh?: Node;
  
  /** Outline mesh for the indicator border */
  private outlineMesh?: Node;
  
  /** Root node containing all visual components */
  public node: Node;
  
  /** Pick layer identifier for interaction handling */
  public pickLayerId: number;
  
  /** Reference to mesh data containing materials and geometry */
  public meshData: CameraIndicatorMeshData;

  /**
   * Creates a camera movement indicator
   * @param context - Rendering context
   * @param layer - Layer to attach the indicator to
   * @param rotationAngle - Rotation angle in radians for indicator orientation
   * @param controller - Display controller handling user interactions
   */
  constructor(
    context: HSApp.View.T3d.Context,
    layer: HSApp.View.Base.Layer,
    rotationAngle: number,
    controller: CameraMovementController
  ) {
    const frontDirection: DirectionConfig = { x: 0, y: 1, z: 0 };
    
    // Calculate rotated direction vector
    const rotatedDirection = Quaternion.EulerToQuaternion(
      new Vector3(-0.5 * Math.PI, rotationAngle, 0)
    ).transformVector(new Vector3().copyFrom(frontDirection));

    super(context, layer, undefined, controller);

    this.rotation = rotationAngle;
    this.frontDirectionVector = frontDirection;
    this.node = new Node();
    this.pickLayerId = this.context.hscanvas.EPickLayer.cameraControl;

    // Initialize shared mesh data if not already created
    if (!CameraMovementIndicator._meshData) {
      const meshData: CameraIndicatorMeshData = {
        material: {
          normal: this.createIndicatorMaterial(
            HSApp.View.T3d.Constants.CAMERA_MOVEMENT_INDICATOR_COLOR,
            HSApp.View.T3d.Constants.CAMERA_MOVEMENT_INDICATOR_OPACITY
          ),
          highlight: this.createIndicatorMaterial(
            HSApp.View.T3d.Constants.CAMERA_MOVEMENT_INDICATOR_HIGHLIGHT_COLOR,
            HSApp.View.T3d.Constants.CAMERA_MOVEMENT_INDICATOR_HIGHLIGHT_OPACITY
          )
        },
        geometry: this.createTriangleGeometry()
      };
      CameraMovementIndicator._meshData = meshData;
    }

    this.meshData = CameraMovementIndicator._meshData;
  }

  /**
   * Creates material for the indicator mesh
   */
  private createIndicatorMaterial(color: number, opacity: number): MeshBasicMaterial {
    return HSApp.View.T3d.Util.createGizmoMaterial(MeshBasicMaterial, {
      color,
      opacity,
      transparent: true
    });
  }

  /**
   * Creates triangular geometry for the indicator
   */
  private createTriangleGeometry(): THREE.Geometry {
    const size = HSApp.View.T3d.Constants.CAMERA_MOVEMENT_INDICATOR_SIZE;
    return HSApp.View.T3d.Util.createConvexPolygonGeometry([
      { x: size, y: 0, z: 0 },
      { x: 0, y: size, z: 0 },
      { x: -size, y: 0, z: 0 }
    ]);
  }

  /**
   * Cleanup resources when indicator is destroyed
   */
  public onCleanup(): void {
    this.hide();
    super.onCleanup();
  }

  /**
   * Show the indicator in the scene
   */
  public show(): void {
    this.updateMesh();
    this.layer.addChild(this);
    if (this.context) {
      this.context.needsRendering = true;
    }
  }

  /**
   * Hide the indicator from the scene
   */
  public hide(): void {
    this.layer.removeChild(this);
    if (this.context) {
      this.context.needsRendering = true;
    }
  }

  /**
   * Update or create mesh geometry and materials
   */
  public updateMesh(): void {
    // Create outline mesh if not exists
    if (!this.outlineMesh) {
      const vertices = this.meshData.geometry.vertices;
      const lineVertices: number[] = [];
      
      for (let i = 0; i < vertices.length; i++) {
        const current = vertices[i];
        const next = vertices[(i + 1) % vertices.length];
        lineVertices.push(current.x, current.y, current.z);
        lineVertices.push(next.x, next.y, next.z);
      }

      const lineMesh = T3Dx.Three2T3d.convertPositionsToStreamingLineMesh(
        'cameraGizmoLine',
        lineVertices
      );
      const lineMaterial = HSApp.View.T3d.Util.createGizmoMaterial(LineBasicMaterial, {
        color: HSApp.View.T3d.Constants.CAMERA_MOVEMENT_INDICATOR_BORDER_COLOR
      });
      this.outlineMesh = T3Dx.Three2T3d.createMeshNode(lineMesh, lineMaterial);
    }

    // Create main mesh if not exists
    if (!this._mesh) {
      const streamingMesh = T3Dx.Three2T3d.convertGeometryToStreamingMesh(
        this.meshData.geometry
      );
      const meshNode = T3Dx.Three2T3d.createMeshNode(
        streamingMesh,
        this.meshData.material.normal
      );

      const position = this._getPosition();
      const rotation = this._getRotation();

      meshNode.setTranslation(position);
      meshNode.setRotation(rotation);
      this.outlineMesh.setTranslation(position);
      this.outlineMesh.setRotation(rotation);

      this.node.addChild(meshNode);
      this.node.addChild(this.outlineMesh);
      this._mesh = meshNode;
      this.context.needsRendering = true;
    }
  }

  /**
   * Get the world-space direction vector the indicator points towards
   */
  public getDirection(): Vector3 {
    if (!this.direction) {
      const rotation = this._getRotation();
      this.direction = rotation.transformVector(
        new Vector3().copyFrom(this.frontDirectionVector)
      );
    }
    return this.direction;
  }

  /**
   * Calculate indicator position in 3D space
   */
  private _getPosition(): Vector3 {
    const direction = this.getDirection();
    const offset = direction.scale(
      HSApp.View.T3d.Constants.CAMERA_MOVEMENT_INDICATOR_DIRECTIONAL_OFFSET
    );
    
    return new Vector3(
      offset.x,
      offset.y + HSApp.View.T3d.Constants.CAMERA_MOVEMENT_INDICATOR_HEIGHT,
      offset.z + HSApp.View.T3d.Constants.CAMERA_MOVEMENT_INDICATOR_DISTANCE
    );
  }

  /**
   * Calculate indicator rotation quaternion
   */
  private _getRotation(): Quaternion {
    return Quaternion.EulerToQuaternion(
      new Vector3(-0.5 * Math.PI, this.rotation, 0)
    );
  }

  /**
   * Handle mouse hover event - highlight the indicator
   */
  public onMouseOver(): void {
    if (!this.context) return;

    this.context.cursorStatus.setCurrentStatus(HSApp.View.CursorEnum.pointer);
    const meshComponent = this.node.getComponent(MeshComponent);
    if (meshComponent) {
      meshComponent.setMaterial(this.meshData.material.highlight);
    }
    this.context.needsRendering = true;
  }

  /**
   * Handle mouse leave event - restore normal appearance
   */
  public onMouseOut(): void {
    if (!this.context) return;

    this.context.cursorStatus.setCurrentStatus(HSApp.View.CursorEnum.default);
    const meshComponent = this.node.getComponent(MeshComponent);
    if (meshComponent) {
      meshComponent.setMaterial(this.meshData.material.normal);
    }
    this.context.needsRendering = true;
  }
}

/**
 * Controller handling user interactions with the camera movement indicator
 * Translates direction vectors into keyboard-like movement commands
 */
class CameraMovementController extends DisplayController {
  /** Keyboard code corresponding to movement direction */
  private keyCode: number;

  /**
   * Creates a movement controller
   * @param context - Rendering context
   * @param direction - Direction vector for movement
   */
  constructor(context: HSApp.View.T3d.Context, direction: Vector3) {
    super(null, context);
    this.keyCode = this.keyCodeFromDirection(direction);
  }

  /**
   * Convert direction vector to arrow key code
   * @param direction - Normalized direction vector
   * @returns Arrow key code (37=left, 38=up, 39=right, 40=down)
   */
  private keyCodeFromDirection(direction: Vector3): number {
    const rounded = {
      x: Math.round(direction.x),
      y: Math.round(direction.y),
      z: Math.round(direction.z)
    };

    if (rounded.z < 0) return 40; // Down arrow
    if (rounded.z > 0) return 38; // Up arrow
    if (rounded.x < 0) return 39; // Right arrow
    return 37; // Left arrow
  }

  /**
   * Handle mouse down - start camera movement
   */
  public onmousedown(event: { event: MouseEvent }): boolean {
    if (event.event.buttons === 1) {
      return this.context.viewControl.onkeydown({ keyCode: this.keyCode });
    }
    return false;
  }

  /**
   * Handle drag end - stop camera movement
   */
  public composedragendparam(event: unknown): void {
    this.context.viewControl.onkeyup({ keyCode: this.keyCode });
  }

  /**
   * Handle mouse up - stop camera movement and track analytics
   */
  public onmouseup(event: unknown): void {
    this.context.viewControl.onkeyup({ keyCode: this.keyCode });

    // Track render environment interactions
    const app = HSApp.App.getApp();
    if (app.environmentManager.activeEnvironmentId === HSFPConstants.Environment.Render) {
      const environment = app.environmentManager.activeEnvironment;
      if (environment.getRenderType) {
        const renderType = environment.getRenderType();
        const renderTypes = ['普通图', '全景图', '鸟瞰图', '俯视图', '视频'];
        HSApp.Util.EventTrack.instance().track(
          HSApp.Util.EventGroupEnum.Render,
          'plugin_render_camera_move_ui_click',
          { sTabName: renderTypes[renderType] }
        );
      }
    }
  }

  /**
   * Handle click event
   */
  public onclick(): boolean {
    return true;
  }
}