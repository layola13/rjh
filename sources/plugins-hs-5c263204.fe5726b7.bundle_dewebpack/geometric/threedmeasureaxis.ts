// @ts-nocheck
import { Node, Vector3, Quaternion, LineDashedMaterial, MeshBasicMaterial, RasterizerCullMode } from './ThreeEngine';

interface Position {
  x: number;
  y: number;
  z: number;
}

interface AxisLine {
  start: Position;
  end: Position;
  type: 'x' | 'y' | 'z';
}

interface Camera {
  x: number;
  y: number;
  z: number;
  type: 'firstperson' | 'orbitview';
}

interface Entity {
  id: string;
  x: number;
  y: number;
  z: number;
}

interface Context {
  signalCameraChanged: any;
  needsRendering: boolean;
}

interface Layer {
  addChild(node: Node): void;
  removeChild(node: Node): void;
}

const COLOR_AXIS_X = 16206924;
const COLOR_AXIS_Y = 3309055;
const COLOR_AXIS_Z = 5293848;
const COLOR_DASH_BOX = 6315871;
const ARROW_WIDTH = 0.1;
const ARROW_HEIGHT = 0.1;
const POLYGON_OFFSET_FACTOR = -2;
const LINE_WIDTH = 2;
const GIZMO_SCALE_FIRSTPERSON_DIVISOR = 5;
const GIZMO_SCALE_ORBITVIEW_DIVISOR = 10;

export class ThreedmeasureAxis extends HSApp.View.T3d.Gizmo {
  public positionMap: Map<string, AxisLine>;
  public lines: Node[];
  public arrowMeshs: Map<string, Node>;
  public node?: Node;
  public layer: Layer;
  public entity: Entity;
  public context: Context;
  public signalHook: any;
  public dirty: boolean = false;

  constructor(entity: Entity, layer: Layer, context: Context) {
    super(entity, layer, context);
    this.positionMap = new Map();
    this.lines = [];
    this.arrowMeshs = new Map();
    this.signalHook.listen(this.context.signalCameraChanged, this._onContentFieldChange);
  }

  public hide(): void {
    super.hide();
    this.layer.removeChild(this);

    for (let i = 0; i < this.lines.length; ++i) {
      this.node?.removeChild(this.lines[i]);
    }
    this.lines.length = 0;

    for (const [, arrowMesh] of this.arrowMeshs) {
      this.node?.removeChild(arrowMesh);
    }

    this.node = undefined;
    this.arrowMeshs.clear();

    if (this.context) {
      this.context.needsRendering = true;
    }
  }

  private _drawMesh(): void {
    this._createLines();
    this._createDashBox();
    this._buildArrowMeshs();

    this.lines.forEach(line => this.node!.addChild(line));

    for (const [, arrowMesh] of this.arrowMeshs) {
      this.node!.addChild(arrowMesh);
    }
  }

  public updateMesh(): void {
    if (!this.node) {
      this.node = new Node();
      this._drawMesh();
      this.layer.addChild(this.node);
    }

    if (this.context) {
      this.context.needsRendering = true;
    }
  }

  public canShow(): boolean {
    const app = HSApp.App.getApp();
    const displayItem = app.getActive3DView().displayList[this.entity.id];
    let isVisible = displayItem?.node?.getVisible() ?? false;
    const isNotSmartReplaceCommand = app.cmdManager.current?.type !== HSFPConstants.CommandType.SmartReplaceContent;

    if (this.entity instanceof HSCore.Model.Group) {
      HSCore.Util.Entity.traverseApplyFuncForEntity(this.entity, (childEntity: Entity) => {
        const childDisplayItem = app.getActive3DView().displayList[childEntity.id];
        isVisible = isVisible || (childDisplayItem?.node?.getVisible() ?? false);
      });
    }

    return isVisible && !isNotSmartReplaceCommand;
  }

  public checkLine(line: AxisLine): boolean {
    if (!line.start || !line.end) {
      return false;
    }
    return HSCore.Util.Math.isValidPoint(line.start) && HSCore.Util.Math.isValidPoint(line.end);
  }

  private _createLines(): void {
    if (this.positionMap.size === 0) {
      return;
    }

    for (const [, lineData] of this.positionMap) {
      if (!lineData || !this.checkLine(lineData)) {
        continue;
      }

      let color = COLOR_AXIS_X;
      if (lineData.type === 'y') {
        color = COLOR_AXIS_Y;
      } else if (lineData.type === 'z') {
        color = COLOR_AXIS_Z;
      }

      const start: Position = {
        x: lineData.start.x,
        y: lineData.start.y,
        z: lineData.start.z
      };

      const end: Position = {
        x: lineData.end.x,
        y: lineData.end.y,
        z: lineData.end.z
      };

      const material = this._createGizmoLineMaterial(color, LINE_WIDTH, {
        polygonOffsetFactor: POLYGON_OFFSET_FACTOR
      });

      this.lines.push(this._createLine(start, end, material));
    }
  }

  private _createLine(start: Position, end: Position, material: any): Node {
    const startViewSpace = HSApp.View.T3d.Util.ModelSpaceToViewSpace(start);
    const endViewSpace = HSApp.View.T3d.Util.ModelSpaceToViewSpace(end);

    const positions: number[] = [];
    [startViewSpace, endViewSpace].forEach(pos => {
      positions.push(...Object.values(pos));
    });

    return T3Dx.Three2T3d.createMeshNode(
      T3Dx.Line2Mesh.setFromPositions(positions, [], 'CoordinateAxis'),
      material
    );
  }

  private _createDashBox(): void {
    const lineSegments: THREE.Vector3[][] = [];

    for (const [, lineData] of this.positionMap) {
      if (!lineData || !this.checkLine(lineData)) {
        continue;
      }

      const segment = [
        new THREE.Vector3(lineData.start.x, lineData.start.y, lineData.start.z),
        new THREE.Vector3(lineData.end.x, lineData.end.y, lineData.end.z)
      ];
      lineSegments.push(segment);
    }

    if (lineSegments.length === 0 || lineSegments.length === 1) {
      return;
    }

    const boxMesh = this._createBoxMesh(lineSegments);
    const material = this._createGizmoMaterial(LineDashedMaterial, {
      color: COLOR_DASH_BOX,
      dashSize: HSApp.View.T3d.Constants.CONTENT_SELECTION_BOUNDING_DASHSIZE,
      gapSize: HSApp.View.T3d.Constants.CONTENT_SELECTION_BOUNDING_GAPSIZE,
      linewidth: LINE_WIDTH
    });

    const dashBoxNode = T3Dx.Three2T3d.createMeshNode(boxMesh, material);
    this.lines.push(dashBoxNode);
  }

  private _buildArrowMeshs(): void {
    if (this.positionMap.size === 0) {
      return;
    }

    for (const [key, lineData] of this.positionMap) {
      if (!lineData || !this.checkLine(lineData)) {
        continue;
      }

      let color = COLOR_AXIS_X;
      if (lineData.type === 'y') {
        color = COLOR_AXIS_Y;
      } else if (lineData.type === 'z') {
        color = COLOR_AXIS_Z;
      }

      const endPosition: Position = {
        x: lineData.end.x,
        y: lineData.end.y,
        z: lineData.end.z
      };

      if (!this.arrowMeshs.get(key)) {
        this.arrowMeshs.set(key, this._buildArrowMesh(color, endPosition, ARROW_WIDTH, ARROW_HEIGHT));
      }
    }
  }

  private _buildArrowMesh(color: number, position: Position, width: number, height: number): Node {
    const viewSpacePos = HSApp.View.T3d.Util.ModelSpaceToViewSpace(position);

    const material = this._createGizmoMaterial(MeshBasicMaterial, {
      color,
      opacity: 1,
      cullMode: RasterizerCullMode.CM_None,
      transparent: true
    });

    const shapePath = new THREE.ShapePath();
    shapePath.moveTo(0, 0);
    shapePath.lineTo(-height, width / 2);
    shapePath.lineTo(-height, -width / 2);

    const arrowNode = new Node();
    const shapes = shapePath.toShapes(true);

    for (const shape of shapes) {
      const geometry = new THREE.ShapeBufferGeometry(shape);
      const meshNode = T3Dx.Three2T3d.createMeshNode(
        T3Dx.Three2T3d.convertBufferGeometryToStreamingMesh(geometry),
        material
      );
      arrowNode.addChild(meshNode);
    }

    arrowNode.setTranslation(new Vector3(viewSpacePos.x, viewSpacePos.y, viewSpacePos.z));
    return arrowNode;
  }

  private _getArrowRotation(cameraPos: Position, direction: Vector3, endPos: Position): Quaternion {
    direction.normalize();

    const toCamera = new Vector3(
      cameraPos.x - endPos.x,
      cameraPos.y - endPos.y,
      cameraPos.z - endPos.z
    );
    toCamera.normalize();

    const right = Vector3.Cross(toCamera, direction).normalize();
    const up = Vector3.Cross(direction, right).normalize();

    const rotationMatrix = new THREE.Matrix4();
    rotationMatrix.set(
      direction.x, direction.z, -direction.y, 0,
      right.x, right.z, -right.y, 0,
      up.x, up.z, -up.y, 0,
      0, 0, 0, 1
    );
    rotationMatrix.transpose();

    const quaternion = new THREE.Quaternion().setFromRotationMatrix(rotationMatrix);
    return new Quaternion(quaternion.x, quaternion.y, quaternion.z, quaternion.w);
  }

  private _onContentFieldChange = (): void => {
    this.dirty = true;
  };

  public draw(): void {
    const camera = HSApp.App.getApp().floorplan.active_camera;
    this.updateMesh();

    const scale = this._getGizmoScale(camera);

    if (this.arrowMeshs.size === 0) {
      return;
    }

    for (const [key, arrowMesh] of this.arrowMeshs) {
      arrowMesh.setScale(scale);

      const lineData = this.positionMap.get(key);
      if (!lineData) {
        continue;
      }

      const direction = new Vector3(
        lineData.end.x - lineData.start.x,
        lineData.end.y - lineData.start.y,
        lineData.end.z - lineData.start.z
      );

      const rotation = this._getArrowRotation(camera, direction, lineData.end);
      arrowMesh.setRotation(rotation);
    }
  }

  public updateAxisGizmo(positionMap: Map<string, AxisLine>): void {
    this.hide();
    this.positionMap = positionMap;
  }

  private _getGizmoScale(camera: Camera): Vector3 {
    const contentPos = this.contentPosition;
    const distance = new Vector3(contentPos.x, contentPos.y, contentPos.z).distance(
      new Vector3(camera.x, camera.y, camera.z)
    );

    let scale = new Vector3(1, 1, 1);

    if (camera.type === 'firstperson') {
      scale = new Vector3(1, 1, 1).scaleInPlace(
        distance * HSApp.View.T3d.Constants.CONTENT_ROTATION_INDICATOR_SIZE / GIZMO_SCALE_FIRSTPERSON_DIVISOR
      );
    } else if (camera.type === 'orbitview') {
      scale = new Vector3(1, 1, 1).scaleInPlace(
        distance * HSApp.View.T3d.Constants.CONTENT_ROTATION_INDICATOR_SIZE / GIZMO_SCALE_ORBITVIEW_DIVISOR
      );
    }

    return scale;
  }

  public onCleanup(): void {
    this.hide();
    this.positionMap.clear();
    this.layer.removeChild(this);
    this.signalHook.dispose();
    this.signalHook = undefined;

    if (this.node) {
      HSApp.View.T3d.Util.cleanupMeshGeometry(this.node);
      this.node = null;
    }

    super.onCleanup();
  }

  public get contentPosition(): Position {
    return new THREE.Vector3(this.entity.x, this.entity.y, this.entity.z);
  }

  private _createGizmoLineMaterial(color: number, lineWidth: number, options: any): any {
    return HSApp.View.T3d.Util.createGizmoLineMaterial(color, lineWidth, options);
  }

  private _createGizmoMaterial(materialType: any, options: any): any {
    return HSApp.View.T3d.Util.createGizmoMaterial(materialType, options);
  }

  private _createBoxMesh(segments: THREE.Vector3[][]): any {
    return HSApp.View.T3d.Util.createBoxMesh(segments);
  }
}