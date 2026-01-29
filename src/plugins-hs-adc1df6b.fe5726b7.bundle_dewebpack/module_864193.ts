import { Node, Vector3, Quaternion, MeshBasicMaterial, LineMeshMaterial } from './367441';
import { HSCore } from './635589';
import { Euler, Math as ThreeMath, Quaternion as ThreeQuaternion, Shape, ShapeBufferGeometry, Vector2 } from './336612';
import { MathUtil } from './815362';

const DEFAULT_FACE_COLOR = 4063218;
const HOVER_FACE_COLOR = 3763966;
const DEFAULT_OPACITY = 0.2;
const HOVER_OPACITY = 0.6;

interface LoopCurve {
  discrete(): Array<{ x: number; y: number }>;
}

interface Loop {
  getAllCurves(): LoopCurve[];
}

interface LoopInfo {
  level: number;
  loop: {
    loop: Loop;
    linkWallIds: string[];
  };
}

interface Layer {
  addChild(child: unknown): void;
  removeChild(child: unknown): void;
  height: number;
}

interface Canvas {
  context?: {
    cursorStatus: {
      setCurrentStatus(status: string): void;
    };
  };
}

interface Context {
  needsRendering: boolean;
}

export default class RoofLoopGizmo extends HSApp.View.Base.Gizmo {
  private _info: LoopInfo;
  private _levelLayer?: Layer;
  private node?: Node;
  private elements: Node[] = [];
  private _faceMaterial: MeshBasicMaterial;
  private _edgeMaterial: LineMeshMaterial;
  
  protected layer?: Layer;
  protected canvas?: Canvas;
  protected context!: Context;

  constructor(element: unknown, name: string, loopInfo: LoopInfo) {
    super(element, name, undefined);
    
    this._faceMaterial = new MeshBasicMaterial({
      color: DEFAULT_FACE_COLOR,
      transparent: true,
      opacity: DEFAULT_OPACITY,
      renderGroupId: HSApp.View.T3d.Constants.HS_RPG_GIZMO
    });
    
    this._edgeMaterial = new LineMeshMaterial({
      color: DEFAULT_FACE_COLOR,
      lineWidth: 1,
      renderGroupId: HSApp.View.T3d.Constants.HS_RPG_GIZMO
    });
    
    this._info = loopInfo;
    this._levelLayer = HSCore.Util.Roof.getOvergroundLayerByIndex(this._info.level);
  }

  private _getHeight(): number {
    const app = HSApp.App.getApp();
    const targetLayer = this._levelLayer || app.floorplan.scene.activeLayer;
    return HSCore.Util.Layer.getAltitude(targetLayer) + this.getRelativeHeight() + 0.001;
  }

  private _transformNode(node: Node): Node {
    node.setTranslation(new Vector3(0, this._getHeight(), 0));
    
    const euler = new Euler();
    euler.set(ThreeMath.degToRad(-90), 0, 0);
    
    const quaternion = new ThreeQuaternion();
    quaternion.setFromEuler(euler);
    
    node.setRotation(new Quaternion(quaternion.x, quaternion.z, -quaternion.y, quaternion.w));
    return node;
  }

  private _createFaceNode(points: Vector2[]): Node {
    const uniquePoints: Vector2[] = [];
    
    for (let i = 0; i < points.length - 1; i++) {
      const currentPoint = points[i];
      const lastPoint = uniquePoints[uniquePoints.length - 1];
      
      if (!lastPoint || !MathUtil.isNearlyEqual(lastPoint.x, currentPoint.x) || !MathUtil.isNearlyEqual(lastPoint.y, currentPoint.y)) {
        uniquePoints.push(currentPoint);
      }
    }
    
    if (uniquePoints[0]) {
      uniquePoints.push(uniquePoints[0].clone());
    }
    
    const shape = new Shape(uniquePoints);
    const geometry = new ShapeBufferGeometry(shape);
    const faceNode = T3Dx.Three2T3d.createMeshNode(
      T3Dx.Three2T3d.convertBufferGeometryToStreamingMesh(geometry),
      this._faceMaterial
    );
    
    faceNode.setName('3DRoofLoopGizmoFace');
    return this._transformNode(faceNode);
  }

  private _createEdgeNode(points: Vector2[]): Node {
    const positions: number[] = [];
    
    for (let i = 0; i < points.length; i++) {
      const currentPoint = points[i];
      const nextPoint = points[i + 1] || points[0];
      positions.push(currentPoint.x, currentPoint.y, 0, nextPoint.x, nextPoint.y, 0);
    }
    
    const lineMesh = T3Dx.Line2Mesh.setFromPositions(positions, [], '3DRoofLoopGizmoEdge');
    const edgeNode = T3Dx.Three2T3d.createMeshNode(lineMesh, this._edgeMaterial);
    
    return this._transformNode(edgeNode);
  }

  private _createNode(): void {
    this.node = new Node('3DRoofLoopGizmo');
    
    const loop = this._info.loop.loop;
    const allPoints: Vector2[] = [];
    
    loop.getAllCurves().forEach((curve) => {
      const discretePoints = curve.discrete().map((point) => new Vector2(point.x, point.y));
      allPoints.push(...discretePoints);
    });
    
    const faceNode = this._createFaceNode(allPoints);
    this.elements.push(faceNode);
    this.node.addChild(faceNode);
    
    const evenIndexPoints = allPoints.filter((_, index) => index % 2 === 0);
    const edgeNode = this._createEdgeNode(evenIndexPoints);
    this.elements.push(edgeNode);
    this.node.addChild(edgeNode);
    
    this.layer?.addChild(this);
    
    if (this.context) {
      this.context.needsRendering = true;
    }
  }

  public draw(): void {
    if (!this.node) {
      this._createNode();
      this.node!.setVisible(true);
      this.context.needsRendering = true;
    }
  }

  public show(): void {
    if (!this.node) {
      this._createNode();
    }
    this.node!.setVisible(true);
    this.context.needsRendering = true;
  }

  public hide(): void {
    if (this.node) {
      this.node.setVisible(false);
      this.context.needsRendering = true;
    }
  }

  public onDeactivate(): void {
    this._clearNode();
    super.onDeactivate?.();
  }

  public onCleanup(): void {
    this._clearNode();
    super.onCleanup?.();
  }

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

  public onMouseOver(event: unknown): void {
    this.canvas?.context?.cursorStatus.setCurrentStatus(HSApp.View.CursorEnum.pointer);
    
    if (this._faceMaterial.getColor() !== HOVER_FACE_COLOR) {
      this._faceMaterial.setColor(HOVER_FACE_COLOR);
      this._faceMaterial.setOpacity(HOVER_OPACITY);
      this._edgeMaterial.setColor(HOVER_FACE_COLOR);
      this.context.needsRendering = true;
    }
  }

  public onMouseOut(event: unknown): void {
    this.canvas?.context?.cursorStatus.setCurrentStatus(HSApp.View.CursorEnum.default);
    
    if (this._faceMaterial.getColor() !== DEFAULT_FACE_COLOR) {
      this._faceMaterial.setColor(DEFAULT_FACE_COLOR);
      this._faceMaterial.setOpacity(DEFAULT_OPACITY);
      this._edgeMaterial.setColor(DEFAULT_FACE_COLOR);
      this.context.needsRendering = true;
    }
  }

  public getLoopInfo(): LoopInfo {
    return this._info;
  }

  public getLevelLayer(): Layer | undefined {
    return this._levelLayer;
  }

  public getRelativeHeight(): number {
    const app = HSApp.App.getApp();
    const walls = this._info.loop.linkWallIds
      .map((wallId) => app.activeDocument.getEntityById(wallId))
      .filter((entity): entity is HSCore.Model.Wall => entity instanceof HSCore.Model.Wall);
    
    const targetLayer = this._levelLayer || app.floorplan.scene.activeLayer;
    
    if (walls.length > 0) {
      return Math.max(...walls.map((wall) => wall.height3d));
    }
    
    return targetLayer.height;
  }
}