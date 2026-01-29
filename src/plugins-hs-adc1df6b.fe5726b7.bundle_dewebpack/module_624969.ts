import { Node, Vector3, Quaternion, MeshBasicMaterial, LineMeshBasicMaterial } from 'three';
import { Arc2d, DiscreteParameter, MathUtil } from './geometry-utils';
import { HSCore } from './hs-core';

interface ColorScheme {
  line: number;
  circle: number;
  triangle: number;
}

interface LineSegment {
  s: Vector2;
  e: Vector2;
  sa: number;
  ea: number;
}

interface Vector2 {
  x: number;
  y: number;
}

interface Line2D {
  getDirection(): Vector2;
  getMidPt(): Vector2;
  clone(): Line2D;
  scale(factor: number): Line2D;
}

interface RoofModel {
  getUniqueParent(): unknown;
  parameters: {
    roomLoop?: unknown;
  };
}

interface CursorStatus {
  setCurrentStatus(status: string): void;
}

interface CanvasContext {
  cursorStatus: CursorStatus;
  needsRendering: boolean;
}

interface Canvas {
  context: CanvasContext;
}

interface MouseEvent {
  event: {
    clientX: number;
    clientY: number;
    button: number;
  };
}

const DEFAULT_COLOR_SCHEME: ColorScheme = {
  line: 0x3963e,
  circle: 0x3963e,
  triangle: 0xffffff,
};

const HOVER_COLOR_SCHEME: ColorScheme = {
  line: 0x7e7e7e,
  circle: 0xf2f2f2,
  triangle: 0x000000,
};

const SELECTED_COLOR_SCHEME: ColorScheme = {
  line: 0x7e7e7e,
  circle: 0xf2f2f2,
  triangle: 0x3963e,
};

const CIRCLE_OPACITY_FULL = 1;
const CIRCLE_OPACITY_HOVER = 0.7;
const CIRCLE_OPACITY_DEFAULT = 0.7;

const LINE_WIDTH = 0.5;
const TRIANGLE_SIZE_SCALE = 0.2;
const TRIANGLE_OFFSET_SCALE = 0.29;
const CIRCLE_RADIUS_SCALE = 0.11;
const CIRCLE_OFFSET_SCALE = 0.3;
const EDGE_TANGENT_OFFSET = 0.03;
const NODE_VERTICAL_OFFSET = -0.002;
const CAMERA_DISTANCE_DIVISOR = 10;
const SCALE_FACTOR = 1000;

export default class RoofInitEdgeTriangleGizmo extends HSApp.View.Base.Gizmo {
  private _line: Line2D;
  private _roof: RoofModel;
  private _height: number;
  private _offset: number;
  private _scale: number = 1;
  private _isSelected: boolean;
  private _lineMaterial: LineMeshBasicMaterial;
  private _circleMaterial: MeshBasicMaterial;
  private _triangleMaterial: MeshBasicMaterial;
  
  public node?: Node;
  public elements: Node[] = [];
  public canvas?: Canvas;
  public context?: CanvasContext;
  public layer?: unknown;

  constructor(
    viewContext: unknown,
    layerContext: unknown,
    line: Line2D,
    roof: RoofModel,
    height: number,
    offset: number,
    isSelected: boolean
  ) {
    super(viewContext, layerContext, undefined);

    this._line = line;
    this._roof = roof;
    this._height = height;
    this._offset = offset;
    this._isSelected = isSelected;

    this._lineMaterial = new LineMeshBasicMaterial({
      color: HOVER_COLOR_SCHEME.line,
      lineWidth: LINE_WIDTH,
      renderGroupId: HSApp.View.T3d.Constants.HS_RPG_GIZMO,
    });

    this._circleMaterial = new MeshBasicMaterial({
      color: HOVER_COLOR_SCHEME.circle,
      transparent: true,
      opacity: CIRCLE_OPACITY_DEFAULT,
      renderGroupId: HSApp.View.T3d.Constants.HS_RPG_GIZMO,
    });

    this._triangleMaterial = new MeshBasicMaterial({
      color: HOVER_COLOR_SCHEME.triangle,
      transparent: false,
      renderGroupId: HSApp.View.T3d.Constants.HS_RPG_GIZMO,
    });
  }

  private _transformNode(node: Node, verticalOffset: number = 0): Node {
    node.setTranslation(new Vector3(0, this._height + verticalOffset, 0));
    
    const euler = new THREE.Euler();
    euler.set(THREE.MathUtils.degToRad(-90), 0, 0);
    
    const quaternion = new THREE.Quaternion();
    quaternion.setFromEuler(euler);
    
    node.setRotation(new Quaternion(quaternion.x, quaternion.z, -quaternion.y, quaternion.w));
    
    return node;
  }

  private _createTriNode(segments: Vector2[][]): Node {
    const shape = new THREE.Shape();
    
    segments.forEach((segment, index) => {
      const startPoint = segment[0];
      const endPoint = segment[1];
      
      if (index === 0) {
        shape.moveTo(startPoint.x, startPoint.y);
      }
      
      shape.lineTo(endPoint.x, endPoint.y);
      
      const nextSegment = segments[index === segments.length - 1 ? 0 : index + 1];
      if (nextSegment) {
        const controlPoint = segment[3];
        shape.quadraticCurveTo(controlPoint.x, controlPoint.y, nextSegment[0].x, nextSegment[0].y);
      }
    });

    const geometry = new THREE.ShapeBufferGeometry(shape);
    
    if (this._isSelected) {
      this._triangleMaterial.setColor(DEFAULT_COLOR_SCHEME.triangle);
    }
    
    const meshNode = T3Dx.Three2T3d.createMeshNode(
      T3Dx.Three2T3d.convertBufferGeometryToStreamingMesh(geometry),
      this._triangleMaterial
    );
    
    meshNode.setName('3DRoofInitEdgeTriangleFace');
    
    return this._transformNode(meshNode);
  }

  private _createCirNode(points: Vector2[]): Node {
    const filteredPoints: Vector2[] = [];
    
    points.forEach((point) => {
      const lastPoint = filteredPoints[filteredPoints.length - 1];
      if (!lastPoint || !MathUtil.isNearlyEqual(lastPoint.x, point.x) || !MathUtil.isNearlyEqual(lastPoint.y, point.y)) {
        filteredPoints.push(point);
      }
    });

    const shape = new THREE.Shape(filteredPoints);
    const geometry = new THREE.ShapeBufferGeometry(shape);
    
    if (this._isSelected) {
      this._circleMaterial.setColor(DEFAULT_COLOR_SCHEME.circle);
      this._circleMaterial.setOpacity(CIRCLE_OPACITY_FULL);
    }
    
    const meshNode = T3Dx.Three2T3d.createMeshNode(
      T3Dx.Three2T3d.convertBufferGeometryToStreamingMesh(geometry),
      this._circleMaterial
    );
    
    meshNode.setName('3DRoofInitEdgeCircleFace');
    
    const offsetScale = this._scale < 1 ? 1 : this._scale;
    return this._transformNode(meshNode, NODE_VERTICAL_OFFSET * offsetScale);
  }

  private _createEdgeNode(points: Vector2[]): Node {
    const positions: number[] = [];
    
    points.forEach((point) => {
      positions.push(point.x, point.y, 0);
    });

    const lineMesh = T3Dx.Line2Mesh.setFromPositions(positions, [], '3DRoofInitEdgeTriangleEdge');
    
    if (this._isSelected) {
      this._lineMaterial.setColor(DEFAULT_COLOR_SCHEME.line);
    }
    
    const meshNode = T3Dx.Three2T3d.createMeshNode(lineMesh, this._lineMaterial);
    
    return this._transformNode(meshNode);
  }

  private _createNode(): void {
    this.node = new Node('3DRoofInitEdgeTriangle');

    const direction = this._line.getDirection();
    const midPoint = this._line.getMidPt();
    const triangleSize = TRIANGLE_SIZE_SCALE * this._scale;
    
    const leftPoint = direction.vecRotated(135 * -Math.PI / 180).multiply(triangleSize).add(midPoint);
    const rightPoint = direction.vecRotated(45 * -Math.PI / 180).multiply(triangleSize).add(midPoint);
    const offsetVector = direction.vecRotated(90 * -Math.PI / 180).multiply(TRIANGLE_OFFSET_SCALE * this._scale + this._offset);

    const segments: LineSegment[] = [
      { s: midPoint, e: leftPoint, sa: 45, ea: 22.5 },
      { s: leftPoint, e: rightPoint, sa: 22.5, ea: 22.5 },
      { s: rightPoint, e: midPoint, sa: 22.5, ea: 45 },
    ];

    const trianglePoints = segments.map((segment) => {
      const segmentVector = segment.e.subtracted(segment.s);
      
      return [
        segment.s.added(segmentVector.clone().multiply(EDGE_TANGENT_OFFSET / Math.tan(segment.sa / 180))),
        segment.e.subtracted(segmentVector.clone().multiply(EDGE_TANGENT_OFFSET / Math.tan(segment.ea / 180))),
        segment.s,
        segment.e,
      ].map((point) => ({
        x: point.x + offsetVector.x,
        y: point.y + offsetVector.y,
      }));
    });

    const triangleNode = this._createTriNode(trianglePoints);
    this.elements.push(triangleNode);
    this.node.addChild(triangleNode);

    const circleCenter = direction
      .vecRotated(90 * -Math.PI / 180)
      .multiply(Math.cos(45 * Math.PI / 180) * (CIRCLE_RADIUS_SCALE * this._scale))
      .add(midPoint);
    
    const arc = Arc2d.makeArcByStartEndAngles(circleCenter, triangleSize, 0, 2 * Math.PI, false);
    const circleOffsetVector = direction.vecRotated(90 * -Math.PI / 180).multiply(CIRCLE_OFFSET_SCALE * this._scale + this._offset);
    
    const circlePoints = arc.discrete(DiscreteParameter.HIGH).map((point) => ({
      x: point.x + circleOffsetVector.x,
      y: point.y + circleOffsetVector.y,
    }));

    const circleNode = this._createCirNode(circlePoints);
    this.elements.push(circleNode);
    this.node.addChild(circleNode);

    const edgePoints: Vector2[] = [];
    const pointCount = circlePoints.length;
    
    circlePoints.forEach((point, index) => {
      if (index < pointCount - 1) {
        edgePoints.push(point, circlePoints[index + 1]);
      }
    });

    const edgeNode = this._createEdgeNode(edgePoints);
    this.elements.push(edgeNode);
    this.node.addChild(edgeNode);

    this.layer?.addChild?.(this);

    if (this.context) {
      this.context.needsRendering = true;
    }
  }

  private _updateScale(): void {
    let scale = 1;

    if (this._roof.getUniqueParent() instanceof HSCore.Model.Layer) {
      const activeCamera = HSApp.App.getApp().floorplan.active_camera;
      
      if (
        activeCamera.type === HSCore.Model.CameraTypeEnum.FirstPerson ||
        activeCamera.type === HSCore.Model.CameraTypeEnum.OrbitView
      ) {
        const midPoint = this._line.getMidPt();
        const distance = new Vector3(midPoint.x, midPoint.y, this._height).distance(
          new Vector3(activeCamera.x, activeCamera.y, activeCamera.z)
        ) / CAMERA_DISTANCE_DIVISOR;
        
        scale = distance < 1 ? 1 : distance;
      }
    }

    this._scale = scale;
  }

  private _clearNode(): void {
    if (this.layer && this.elements.length > 0) {
      this.layer.removeChild?.(this);
      
      this.elements.forEach((element) => {
        this.node?.removeChild(element);
      });
      
      this.node = undefined;
      this.elements = [];
      
      if (this.context) {
        this.context.needsRendering = true;
      }
    }
  }

  public draw(): void {
    if (!this.node) {
      this._updateScale();
      this._createNode();
      this.node?.setVisible(true);
      
      if (this.context) {
        this.context.needsRendering = true;
      }
    }
  }

  public show(): void {
    if (!this.node) {
      this._createNode();
    }
    
    this.node?.setVisible(true);
    
    if (this.context) {
      this.context.needsRendering = true;
    }
  }

  public hide(): void {
    if (this.node) {
      this.node.setVisible(false);
      
      if (this.context) {
        this.context.needsRendering = true;
      }
    }
  }

  public onDeactivate(): void {
    this._clearNode();
    super.onDeactivate?.([]);
  }

  public onCleanup(): void {
    this._clearNode();
    super.onCleanup?.([]);
  }

  public onMouseOver(event: MouseEvent): void {
    this.canvas?.context?.cursorStatus.setCurrentStatus(HSApp.View.CursorEnum.pointer);
    
    updateMouseTips(ResourceManager.getString('roof_change_start_position'), {
      x: event.event.clientX,
      y: event.event.clientY,
    });

    if (!this._isSelected && this._triangleMaterial.getColor() !== SELECTED_COLOR_SCHEME.triangle) {
      this._triangleMaterial.setColor(SELECTED_COLOR_SCHEME.triangle);
      this._circleMaterial.setColor(SELECTED_COLOR_SCHEME.circle);
      this._circleMaterial.setOpacity(CIRCLE_OPACITY_HOVER);
      this._lineMaterial.setColor(SELECTED_COLOR_SCHEME.line);
      
      if (this.context) {
        this.context.needsRendering = true;
      }
    }
  }

  public onMouseOut(event: MouseEvent): void {
    this.canvas?.context?.cursorStatus.setCurrentStatus(HSApp.View.CursorEnum.default);
    
    updateMouseTips('', {
      x: event.event.clientX,
      y: event.event.clientY,
    });

    if (!this._isSelected && this._triangleMaterial.getColor() !== HOVER_COLOR_SCHEME.triangle) {
      this._triangleMaterial.setColor(HOVER_COLOR_SCHEME.triangle);
      this._circleMaterial.setColor(HOVER_COLOR_SCHEME.circle);
      this._circleMaterial.setOpacity(CIRCLE_OPACITY_DEFAULT);
      this._lineMaterial.setColor(HOVER_COLOR_SCHEME.line);
      
      if (this.context) {
        this.context.needsRendering = true;
      }
    }
  }

  public onMouseDown(event: MouseEvent): void {
    if (!this._isSelected && event?.event && event.event.button === 0 && this._roof.parameters.roomLoop) {
      updateMouseTips('', {
        x: event.event.clientX,
        y: event.event.clientY,
      });

      const commandManager = HSApp.App.getApp().cmdManager;
      const command = commandManager.createCommand(
        HSFPConstants.CommandType.UpdateRoofDirection,
        [this._roof, this._line.clone().scale(SCALE_FACTOR)]
      );
      
      commandManager.execute(command);
    }
  }

  public isSelected(): boolean {
    return this._isSelected;
  }

  public updateScale(): void {
    this._clearNode();
    this.node = undefined;
    this.draw();
  }
}