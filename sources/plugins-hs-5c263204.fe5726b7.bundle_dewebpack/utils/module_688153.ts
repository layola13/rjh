// @ts-nocheck
import { Vector3, Quaternion, Node, MeshComponent, MeshBasicMaterial, LineBasicMaterial } from './path-to-your-3d-library';

interface MeshData {
  material: {
    normal: MeshBasicMaterial;
    highlight: MeshBasicMaterial;
  };
  geometry: THREE.Geometry;
}

interface Point3D {
  x: number;
  y: number;
  z: number;
}

/**
 * Camera movement indicator gizmo for 3D viewport navigation
 */
class CameraMovementIndicator extends HSApp.View.Base.Gizmo {
  private static _meshData: MeshData | null = null;
  
  private rotation: number;
  private frontDirectionVector: Point3D;
  private outline: unknown;
  private meshData: MeshData;
  private node: Node;
  private pickLayerId: number;
  private outlineMesh?: Node;
  private _mesh?: Node;
  private direction?: Vector3;

  constructor(
    context: unknown,
    layer: unknown,
    rotation: number,
    controller: CameraMovementController
  ) {
    const initialDirection: Point3D = { x: 0, y: 1, z: 0 };
    
    const eulerAngles = new Vector3(-0.5 * Math.PI, rotation, 0);
    const quaternion = Quaternion.EulerToQuaternion(eulerAngles);
    const transformedDirection = quaternion.transformVector(
      new Vector3().copyFrom(initialDirection)
    );

    super(context, layer, undefined, controller);

    this.rotation = rotation;
    this.frontDirectionVector = initialDirection;
    this.outline = undefined;

    let meshData = CameraMovementIndicator._meshData;
    if (!meshData) {
      meshData = this.createMeshData();
      CameraMovementIndicator._meshData = meshData;
    }

    this.meshData = meshData;
    this.node = new Node();
    this.pickLayerId = this.context.hscanvas.EPickLayer.cameraControl;
  }

  private createMeshData(): MeshData {
    const meshData = {} as MeshData;
    
    meshData.material = {
      normal: this.createGizmoMaterial(MeshBasicMaterial, {
        color: HSApp.View.T3d.Constants.CAMERA_MOVEMENT_INDICATOR_COLOR,
        opacity: HSApp.View.T3d.Constants.CAMERA_MOVEMENT_INDICATOR_OPACITY,
        transparent: true
      }),
      highlight: this.createGizmoMaterial(MeshBasicMaterial, {
        color: HSApp.View.T3d.Constants.CAMERA_MOVEMENT_INDICATOR_HIGHLIGHT_COLOR,
        opacity: HSApp.View.T3d.Constants.CAMERA_MOVEMENT_INDICATOR_HIGHLIGHT_OPACITY,
        transparent: true
      })
    };

    const size = HSApp.View.T3d.Constants.CAMERA_MOVEMENT_INDICATOR_SIZE;
    meshData.geometry = HSApp.View.T3d.Util.createConvexPolygonGeometry([
      { x: size, y: 0, z: 0 },
      { x: 0, y: size, z: 0 },
      { x: -size, y: 0, z: 0 }
    ]);

    return meshData;
  }

  private createGizmoMaterial(
    materialClass: typeof MeshBasicMaterial,
    options: Record<string, unknown>
  ): MeshBasicMaterial {
    return (window as any).default.createGizmoMaterial(materialClass, options);
  }

  onCleanup(): void {
    this.hide();
    super.onCleanup();
  }

  show(): void {
    this.updateMesh();
    this.layer.addChild(this);
    
    if (this.context) {
      this.context.needsRendering = true;
    }
  }

  hide(): void {
    this.layer.removeChild(this);
    
    if (this.context) {
      this.context.needsRendering = true;
    }
  }

  updateMesh(): void {
    if (!this.outlineMesh) {
      this.outlineMesh = this.createOutlineMesh();
    }

    if (!this._mesh) {
      const mesh = T3Dx.Three2T3d.createMeshNode(
        T3Dx.Three2T3d.convertGeometryToStreamingMesh(this.meshData.geometry),
        this.meshData.material.normal
      );

      const position = this._getPosition();
      const rotation = this._getRotation();

      mesh.setTranslation(position);
      mesh.setRotation(rotation);

      this.outlineMesh.setTranslation(mesh.getTranslation());
      this.outlineMesh.setRotation(mesh.getRotation());

      this.node.addChild(mesh);
      this.node.addChild(this.outlineMesh);

      this._mesh = mesh;
      this.context.needsRendering = true;
    }
  }

  private createOutlineMesh(): Node {
    const vertices = (new THREE.Geometry()).vertices;
    
    this.meshData.geometry.vertices.forEach((vertex: Point3D) => {
      vertices.push(vertex);
    });
    vertices.push(this.meshData.geometry.vertices[0]);

    const positions: number[] = [];
    for (let i = 0; i < vertices.length - 1; i++) {
      positions.push(
        vertices[i].x, vertices[i].y, vertices[i].z,
        vertices[i + 1].x, vertices[i + 1].y, vertices[i + 1].z
      );
    }

    const lineMesh = T3Dx.Three2T3d.convertPositionsToStreamingLineMesh(
      'cameraGizmoLine',
      positions
    );

    const lineMaterial = this.createGizmoMaterial(LineBasicMaterial, {
      color: HSApp.View.T3d.Constants.CAMERA_MOVEMENT_INDICATOR_BORDER_COLOR
    });

    return T3Dx.Three2T3d.createMeshNode(lineMesh, lineMaterial);
  }

  getDirection(): Vector3 {
    if (!this.direction) {
      const rotation = this._getRotation();
      this.direction = rotation.transformVector(
        new Vector3().copyFrom(this.frontDirectionVector)
      );
    }
    return this.direction;
  }

  private _getPosition(): Vector3 {
    const directionOffset = this.getDirection().scale(
      HSApp.View.T3d.Constants.CAMERA_MOVEMENT_INDICATOR_DIRECTIONAL_OFFSET
    );

    return new Vector3(
      directionOffset.x,
      directionOffset.y + HSApp.View.T3d.Constants.CAMERA_MOVEMENT_INDICATOR_HEIGHT,
      directionOffset.z + HSApp.View.T3d.Constants.CAMERA_MOVEMENT_INDICATOR_DISTANCE
    );
  }

  private _getRotation(): Quaternion {
    return Quaternion.EulerToQuaternion(
      new Vector3(-0.5 * Math.PI, this.rotation, 0)
    );
  }

  onMouseOver(): void {
    if (!this.context) return;

    this.context.cursorStatus.setCurrentStatus(HSApp.View.CursorEnum.pointer);

    const meshComponent = this.node.getComponent(MeshComponent);
    if (meshComponent) {
      meshComponent.setMaterial(this.meshData.material.highlight);
    }

    this.context.needsRendering = true;
  }

  onMouseOut(): void {
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
 * Controller for camera movement interactions
 */
class CameraMovementController extends HSApp.View.Base.DisplayController {
  private keyCode: number;

  constructor(context: unknown, direction: Vector3) {
    super(null, context);
    this.keyCode = this.keyCodeFromDirection(direction);
  }

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

  onmousedown(event: { event: MouseEvent }): boolean {
    if (event.event.buttons === 1) {
      return this.context.viewControl.onkeydown({ keyCode: this.keyCode });
    }
    return false;
  }

  composedragendparam(event: unknown): void {
    this.context.viewControl.onkeyup({ keyCode: this.keyCode });
  }

  onmouseup(event: unknown): void {
    this.context.viewControl.onkeyup({ keyCode: this.keyCode });

    const app = HSApp.App.getApp();
    if (app.environmentManager.activeEnvironmentId === HSFPConstants.Environment.Render) {
      const activeEnvironment = app.environmentManager.activeEnvironment;
      
      if (activeEnvironment.getRenderType) {
        const renderType = activeEnvironment.getRenderType();
        const renderTypeNames = ['普通图', '全景图', '鸟瞰图', '俯视图', '视频'];
        
        HSApp.Util.EventTrack.instance().track(
          HSApp.Util.EventGroupEnum.Render,
          'plugin_render_camera_move_ui_click',
          { sTabName: renderTypeNames[renderType] }
        );
      }
    }
  }

  onclick(): boolean {
    return true;
  }
}

export default CameraMovementIndicator;