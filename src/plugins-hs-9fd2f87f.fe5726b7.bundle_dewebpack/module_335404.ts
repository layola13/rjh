import { Quaternion, Vector3, BoxGeometry, Euler, Matrix4 } from 'three';

interface Transform {
  x: number;
  y: number;
  z: number;
  XRotation: number;
  YRotation: number;
  ZRotation: number;
  XScale?: number;
  YScale?: number;
  ZScale?: number;
  XSize?: number;
  YSize?: number;
  ZSize?: number;
}

interface GizmoColorConfig {
  strokeColor: string;
  fillColor: string;
  strokeWidth: number;
  fillOpacity?: number;
}

interface ApplicationContext {
  application: Application;
  needsRendering: boolean;
  isActive: boolean;
}

interface Application {
  selectionManager: SelectionManager;
}

interface SelectionManager {
  unselectAll(): void;
  select(entity: Entity): void;
}

interface Entity {
  [key: string]: unknown;
}

interface Node {
  setVisible(visible: boolean): void;
  addChild(child: Node): void;
  removeChild(child: Node): void;
  setTranslation(position: Vector3): void;
  setRotation(rotation: Quaternion): void;
  setScale(scale: Vector3): void;
  getComponent(component: unknown): MeshComponentInstance;
}

interface MeshComponentInstance {
  getMesh(): Mesh;
}

interface Mesh {
  setBoundingBox(box: BoundingBox): void;
}

interface BoundingBox {
  min: Vector3;
  max: Vector3;
  clone(): BoundingBox;
}

interface Layer {
  addChild(child: unknown): void;
  removeChild(child: unknown): void;
}

declare const HSApp: {
  View: {
    Base: {
      Gizmo: new (...args: unknown[]) => unknown;
      DisplayController: new (...args: unknown[]) => unknown;
    };
  };
  Util: {
    Entity: {
      getEntityTransform(entities: Entity[]): Transform | null;
    };
  };
};

declare const T3Dx: {
  Three2T3d: {
    convertGeometryToStreamingMesh(geometry: BoxGeometry): unknown;
    createMeshNode(mesh: unknown, material: unknown): Node;
  };
  Line2Mesh: {
    setFromPositions(positions: number[], normals: number[], name: string): unknown;
  };
};

declare const f: {
  Node: new (name: string) => Node;
  Vector3: typeof Vector3;
  BoundingBox: new (min: Vector3, max: Vector3) => BoundingBox;
  MeshLambertMaterial: new (params: MaterialParams) => unknown;
  LineMeshMaterial: new (params: LineMaterialParams) => unknown;
  Quaternion: typeof Quaternion;
  MeshComponent: unknown;
  Math: {
    DEG2RAD: number;
  };
};

interface MaterialParams {
  color: string;
  transparent: boolean;
  opacity: number;
}

interface LineMaterialParams {
  color: string;
  lineWidth: number;
  opacity: number;
  transparent: boolean;
}

const { Node, Vector3: T3DVector3, BoundingBox, MeshLambertMaterial, LineMeshMaterial, Quaternion: T3DQuaternion, MeshComponent } = f;

class DiffContentGizmo extends (HSApp.View.Base.Gizmo as any) {
  context: ApplicationContext;
  entity: Entity;
  app: Application;
  elements: Node[];
  node: Node | null;
  color: GizmoColorConfig;
  layer?: Layer;

  constructor(context: ApplicationContext, param2: unknown, entity: Entity, displayController: DiffDisplayController, param5: unknown) {
    super(context, param2, entity, displayController);
    
    const defaultColors: GizmoColorConfig = {
      strokeColor: '0xffa023',
      fillColor: '0xffe823',
      strokeWidth: 2
    };

    this.context = context;
    this.entity = entity;
    this.app = context.application;
    this.elements = [];
    this.node = null;
    this.color = param5 ? { ...defaultColors, ...(param5 as Partial<GizmoColorConfig>) } : defaultColors;
  }

  show = (): void => {
    if (!this.node) {
      this._createNode();
    }
    this.node?.setVisible(true);
    this.context.needsRendering = true;
  };

  hide = (): void => {
    if (this.node) {
      this.node.setVisible(false);
      this.context.needsRendering = true;
    }
  };

  deactivate(): void {
    this._clearNode();
  }

  onCleanup(): void {
    this._clearNode();
  }

  draw(): void {
    if (!this.node) {
      this._createNode();
      this.node?.setVisible(true);
      this.context.needsRendering = true;
    }
  }

  private _clearNode(): void {
    if (this.layer && this.elements.length > 0) {
      this.layer.removeChild(this);
      this.elements.forEach((element) => {
        this.node?.removeChild(element);
      });
      this.elements = [];
      this.context.needsRendering = true;
    }
  }

  private _createNode(): void {
    this.node = new Node('3DDiffContentGizmo');

    const quaternion = new Quaternion();
    const position = new Vector3();
    const scale = new Vector3(1, 1, 1);

    const transform = HSApp.Util.Entity.getEntityTransform([this.entity]);
    const matrix = transform ? this.getMatrix4FromTransform(transform) : null;
    matrix?.decompose(position, quaternion, scale);

    const baseHeight = (HSApp as any).Core?.Util?.Layer?.getEntityBaseHeight(this.entity) ?? 0;
    const width = transform?.XSize ?? 0;
    const depth = transform?.YSize ?? 0;
    const height = transform?.ZSize ?? 0;

    const boxGeometry = new BoxGeometry(width, height, depth);
    const streamingMesh = T3Dx.Three2T3d.convertGeometryToStreamingMesh(boxGeometry);

    const fillMaterial = new MeshLambertMaterial({
      color: this.color.fillColor,
      transparent: true,
      opacity: this.color.fillOpacity ?? 0.7
    });

    const meshNode = T3Dx.Three2T3d.createMeshNode(streamingMesh, fillMaterial);

    const minBound = new T3DVector3(-0.5, -0.5, -0.5);
    const maxBound = new T3DVector3(0.5, 0.5, 0.5);
    const boundingBox = new BoundingBox(minBound, maxBound);

    const lineMaterial = new LineMeshMaterial({
      color: this.color.strokeColor,
      lineWidth: this.color.strokeWidth,
      opacity: 1,
      transparent: true
    });

    const linePositions = this._createBoxLinePositions(minBound, maxBound);
    const lineMesh = T3Dx.Line2Mesh.setFromPositions(linePositions, [], 'boxgizmoseg');
    const lineNode = T3Dx.Three2T3d.createMeshNode(lineMesh, lineMaterial);

    lineNode.getComponent(MeshComponent).getMesh().setBoundingBox(boundingBox.clone());

    const centerY = position.z + baseHeight + height / 2;
    const centerPosition = new T3DVector3(position.x, centerY, -position.y);
    const rotation = new T3DQuaternion(quaternion.x, quaternion.z, -quaternion.y, quaternion.w);

    meshNode.setTranslation(centerPosition);
    meshNode.setRotation(rotation);

    lineNode.setTranslation(centerPosition);
    lineNode.setRotation(rotation);
    lineNode.setScale(new T3DVector3(width, height, depth));

    this.elements.push(meshNode);
    this.elements.push(lineNode);

    this.node.addChild(meshNode);
    this.node.addChild(lineNode);

    this.layer?.addChild(this);

    if (this.context) {
      this.context.needsRendering = true;
    }
  }

  private _createBoxLinePositions(min: Vector3, max: Vector3): number[] {
    const positions: number[] = [];
    const edges = [
      [max.x, max.y, max.z, min.x, max.y, max.z],
      [min.x, max.y, max.z, min.x, min.y, max.z],
      [min.x, min.y, max.z, max.x, min.y, max.z],
      [max.x, min.y, max.z, max.x, max.y, max.z],
      [max.x, max.y, min.z, min.x, max.y, min.z],
      [min.x, max.y, min.z, min.x, min.y, min.z],
      [min.x, min.y, min.z, max.x, min.y, min.z],
      [max.x, min.y, min.z, max.x, max.y, min.z],
      [max.x, max.y, max.z, max.x, max.y, min.z],
      [min.x, max.y, max.z, min.x, max.y, min.z],
      [min.x, min.y, max.z, min.x, min.y, min.z],
      [max.x, min.y, max.z, max.x, min.y, min.z]
    ];

    edges.forEach(edge => positions.push(...edge));
    return positions;
  }

  getMatrix4FromTransform(transform: Transform): Matrix4 {
    const position = new Vector3(transform.x, transform.y, transform.z);
    const euler = new Euler(
      -transform.XRotation * f.Math.DEG2RAD,
      -transform.YRotation * f.Math.DEG2RAD,
      -transform.ZRotation * f.Math.DEG2RAD
    );
    const quaternion = new Quaternion().setFromEuler(euler);
    const scale = new Vector3(
      transform.XScale ?? 1,
      transform.YScale ?? 1,
      transform.ZScale ?? 1
    );

    const matrix = new Matrix4();
    matrix.compose(position, quaternion, scale);
    return matrix;
  }
}

class DiffDisplayController extends (HSApp.View.Base.DisplayController as any) {
  entity: Entity;
  app: Application;
  disableClick: boolean;
  context: ApplicationContext;

  constructor(entity: Entity, context: ApplicationContext, disableClick: boolean) {
    super(entity, context);
    this.entity = entity;
    this.disableClick = disableClick;
    this.app = context.application;
  }

  onclick(): boolean {
    if (!this.disableClick) {
      this.app.selectionManager.unselectAll();
      this.app.selectionManager.select(this.entity);
    }
    return !this.context.isActive;
  }
}

export default DiffContentGizmo;
export { DiffDisplayController };