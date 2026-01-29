import { MeshBasicMaterial, RasterizerCullMode } from './367441';
import { DiffCWRouteController } from './82794';

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface PathSegment {
  getStartPt(): Point3D;
  getEndPt(): Point3D;
}

interface Point3DExtended extends Point3D {
  subtracted(other: Point3D): Point3DExtended;
  translated(offset: Point3DExtended): Point3D;
  translate(offset: Point3DExtended): void;
  normalize(): Point3DExtended;
  multiply(scalar: number): Point3DExtended;
  reversed(): Point3DExtended;
  reverse(): void;
}

interface DiffCWRouteEntity {
  diameter: number;
  path: PathSegment[];
  isFlagOn(flag: number): boolean;
}

interface MaterialColors {
  normal: number;
  hover: number;
  selected: number;
}

interface Context3D {
  needsRendering: boolean;
  hscanvas: {
    selector: {
      picker: {
        addTrackingNodeByNode(layer: number, display: unknown, node: unknown): void;
        removeTrackingNodeByNode(layer: number, node: unknown): void;
      };
    };
    EPickLayer: {
      concealedwork: number;
    };
  };
}

interface Object3DNode {
  addChild(child: unknown): void;
  removeChild(child: unknown): void;
  setVisible(visible: boolean): void;
  clear(): void;
}

declare const HSApp: {
  View: {
    T3d: {
      Util: {
        createObject3D(): Object3DNode;
        mergeMeshes(meshes: unknown[]): unknown;
      };
      Base: {
        Display3D: new (...args: unknown[]) => Display3DBase;
      };
    };
  };
};

declare const HSCore: {
  Util: {
    Math: {
      nearlyEquals(a: number, b: number): boolean;
    };
  };
  Model: {
    EntityFlagEnum: {
      selected: number;
    };
    WallFlagEnum: {
      hoverOn: number;
    };
  };
};

declare const THREE: {
  Vector3: new (x: number, y: number, z: number) => {
    x: number;
    y: number;
    z: number;
    clone(): THREE.Vector3;
    sub(v: THREE.Vector3): THREE.Vector3;
    normalize(): THREE.Vector3;
    angleTo(v: THREE.Vector3): number;
    crossVectors(a: THREE.Vector3, b: THREE.Vector3): THREE.Vector3;
  };
  Quaternion: new () => {
    setFromAxisAngle(axis: THREE.Vector3, angle: number): THREE.Quaternion;
  };
  Matrix4: new () => {
    compose(position: THREE.Vector3, quaternion: THREE.Quaternion, scale: THREE.Vector3): void;
  };
  ConeBufferGeometry: new (radius: number, height: number, segments: number) => {
    applyMatrix(matrix: THREE.Matrix4): THREE.ConeBufferGeometry;
  };
  CatmullRomCurve3: new (points: THREE.Vector3[]) => THREE.Curve3;
  TubeBufferGeometry: new (
    curve: THREE.Curve3,
    tubularSegments: number,
    radius: number,
    radialSegments: number,
    closed: boolean
  ) => THREE.BufferGeometry;
  LineCurve3: new (start: THREE.Vector3, end: THREE.Vector3) => THREE.Curve3;
};

declare const T3Dx: {
  Three2T3d: {
    convertBufferGeometryToStreamingMesh(geometry: THREE.BufferGeometry): unknown;
    createMeshNode(mesh: unknown, material: MeshBasicMaterial): unknown;
  };
};

abstract class Display3DBase {
  protected entity: DiffCWRouteEntity;
  protected group: Object3DNode;
  protected context: Context3D;
  protected geometryDirty: boolean;
  protected materialDirty: boolean;
  protected node: Object3DNode;

  constructor(
    entity: DiffCWRouteEntity,
    group: Object3DNode,
    context: Context3D,
    geometryDirty: boolean,
    controller?: unknown
  ) {}

  protected init(args: unknown[]): void {}
  protected onCleanup(args: unknown[]): void {}
  protected onFlagChanged(args: unknown[], flag: number): void {}
}

export class DiffCWRouteDisplay3D extends Display3DBase {
  public diameter: number;
  private _mtlColor: MaterialColors;
  private _material: MeshBasicMaterial;
  private _outlineMtl: MeshBasicMaterial;
  private _meshNode: unknown[];
  private _outlineMeshNode: unknown[];

  constructor(
    entity: DiffCWRouteEntity,
    group: Object3DNode,
    context: Context3D,
    geometryDirty: boolean,
    controller?: DiffCWRouteController
  ) {
    const finalController = controller ?? new DiffCWRouteController(geometryDirty, entity);
    super(entity, group, context, geometryDirty, finalController);

    this.diameter = geometryDirty.diameter;
    this._mtlColor = {
      normal: 0xFF9DA3,
      hover: 0x00F5FF,
      selected: 0x096E7F,
    };

    this._material = new MeshBasicMaterial({
      color: this._mtlColor.normal,
      cullMode: RasterizerCullMode.CM_None,
    });

    this._outlineMtl = new MeshBasicMaterial({
      color: 0xFFFFFF,
      cullMode: RasterizerCullMode.CM_None,
      transparent: true,
      opacity: 0.4,
    });

    this._meshNode = [];
    this._outlineMeshNode = [];
  }

  public init(): void {
    this.node = HSApp.View.T3d.Util.createObject3D();
    this.group.addChild(this.node);
    super.init([]);
  }

  public onDraw(): void {
    if (this.geometryDirty || this.materialDirty) {
      this._draw();
      this.context.needsRendering = true;
    }
  }

  public onCleanup(): void {
    this._clearMesh();
    super.onCleanup([]);
  }

  public onFlagChanged(flag: number): void {
    super.onFlagChanged([flag], flag);
    this._updateStyle();
  }

  public updateVisibleStatus(visible: boolean): void {
    this.node.setVisible(visible);
    this.context.needsRendering = true;
  }

  private _clearMesh(): void {
    if (this._meshNode.length > 0) {
      if (this.node) {
        this._meshNode.forEach((mesh) => this.node.removeChild(mesh));
      }
      this._meshNode.length = 0;
    }

    if (this._outlineMeshNode.length > 0) {
      if (this.node) {
        this._outlineMeshNode.forEach((mesh) => this.node.removeChild(mesh));
      }
      this._outlineMeshNode.length = 0;
    }

    if (this.node) {
      this.context.hscanvas.selector.picker.removeTrackingNodeByNode(
        this.context.hscanvas.EPickLayer.concealedwork,
        this.node
      );
      this.node.clear();
    }

    this.group.removeChild(this.node);
  }

  private _draw(): void {
    if (this.geometryDirty || this.materialDirty) {
      this._clearMesh();
      this._createTubeMesh();
      this._createArrowMesh();

      this._meshNode.forEach((mesh) => this.node.addChild(mesh));
      this._outlineMeshNode.forEach((mesh) => this.node.addChild(mesh));

      this.context.hscanvas.selector.picker.addTrackingNodeByNode(
        this.context.hscanvas.EPickLayer.concealedwork,
        this,
        this.node
      );

      this.group.addChild(this.node);
      this.updateVisibleStatus(true);
    }
  }

  private _createArrowMesh(): void {
    const entity = this.entity;
    const radius = entity.diameter / 2;
    const pathLength = entity.path.length;
    const lastSegment = entity.path[pathLength - 1];
    const endPoint = lastSegment.getEndPt();
    const startPoint = lastSegment.getStartPt();

    const startVec = new THREE.Vector3(startPoint.x, startPoint.z, -startPoint.y);
    const endVec = new THREE.Vector3(endPoint.x, endPoint.z, -endPoint.y);
    const direction = endVec.clone().sub(startVec).normalize();

    const upVector = new THREE.Vector3(0, 1, 0);
    const angle = upVector.angleTo(direction);
    const rotationAxis = new THREE.Vector3().crossVectors(upVector, direction);

    if (HSCore.Util.Math.nearlyEquals(angle, Math.PI)) {
      rotationAxis.x = 0;
      rotationAxis.y = 0;
      rotationAxis.z = 1;
    }

    const quaternion = new THREE.Quaternion().setFromAxisAngle(rotationAxis, angle);
    const transformMatrix = new THREE.Matrix4();
    transformMatrix.compose(endVec, quaternion, new THREE.Vector3(1, 1, 1));

    const coneAngleTangent = Math.tan(Math.PI / 3);
    const coneHeight = 4 * coneAngleTangent * radius;
    const coneGeometry = new THREE.ConeBufferGeometry(4 * radius, coneHeight, 16).applyMatrix(transformMatrix);

    const outlineConeHeight = 4.5 * coneAngleTangent * radius;
    const outlineConeGeometry = new THREE.ConeBufferGeometry(4.5 * radius, outlineConeHeight, 16).applyMatrix(
      transformMatrix
    );

    const coneMesh = T3Dx.Three2T3d.convertBufferGeometryToStreamingMesh(coneGeometry);
    const outlineConeMesh = T3Dx.Three2T3d.convertBufferGeometryToStreamingMesh(outlineConeGeometry);

    const coneNode = T3Dx.Three2T3d.createMeshNode(coneMesh, this._material);
    const outlineConeNode = T3Dx.Three2T3d.createMeshNode(outlineConeMesh, this._outlineMtl);

    this._meshNode.push(coneNode);
    this._outlineMeshNode.push(outlineConeNode);
  }

  private _createTubeMesh(): void {
    const entity = this.entity;
    const radius = entity.diameter / 2;
    const tubeMeshes: unknown[] = [];
    const outlineMeshes: unknown[] = [];
    const pathLength = entity.path.length;

    for (let i = 0; i < pathLength; i++) {
      const segment = entity.path[i];
      let startPt = segment.getStartPt();
      let endPt = segment.getEndPt();

      const direction = (endPt as Point3DExtended).subtracted(startPt).normalize().multiply(radius);
      endPt.translate(direction.reversed());

      if (i > 0) {
        startPt = (startPt as Point3DExtended).translated(direction);

        const prevSegment = entity.path[i - 1];
        const prevStartPt = prevSegment.getStartPt();
        let prevEndPt = prevSegment.getEndPt();

        const prevDirection = (prevEndPt as Point3DExtended).subtracted(prevStartPt).normalize().multiply(radius);
        prevEndPt.translate(prevDirection.reverse());

        const prevEndVec = new THREE.Vector3(prevEndPt.x, prevEndPt.z, -prevEndPt.y);
        const currentStartVec = new THREE.Vector3(startPt.x, startPt.z, -startPt.y);
        const originalStartPt = segment.getStartPt();
        const midPointVec = new THREE.Vector3(originalStartPt.x, originalStartPt.z, -originalStartPt.y);

        const curvePath = new THREE.CatmullRomCurve3([prevEndVec, midPointVec, currentStartVec]);
        const curveGeometry = new THREE.TubeBufferGeometry(curvePath, 8, radius, 16, false);
        tubeMeshes.push(T3Dx.Three2T3d.convertBufferGeometryToStreamingMesh(curveGeometry));

        const outlineCurveGeometry = new THREE.TubeBufferGeometry(curvePath, 8, 2 * radius, 16, false);
        outlineMeshes.push(T3Dx.Three2T3d.convertBufferGeometryToStreamingMesh(outlineCurveGeometry));
      }

      const startVec = new THREE.Vector3(startPt.x, startPt.z, -startPt.y);
      const endVec = new THREE.Vector3(endPt.x, endPt.z, -endPt.y);
      const lineCurve = new THREE.LineCurve3(startVec, endVec);

      const tubeGeometry = new THREE.TubeBufferGeometry(lineCurve, 1, radius, 16, false);
      tubeMeshes.push(T3Dx.Three2T3d.convertBufferGeometryToStreamingMesh(tubeGeometry));

      const outlineTubeGeometry = new THREE.TubeBufferGeometry(lineCurve, 1, 1.5 * radius, 16, false);
      outlineMeshes.push(T3Dx.Three2T3d.convertBufferGeometryToStreamingMesh(outlineTubeGeometry));
    }

    const meshNodes = tubeMeshes.map((mesh) => T3Dx.Three2T3d.createMeshNode(mesh, this._material));
    this._meshNode.push(HSApp.View.T3d.Util.mergeMeshes(meshNodes));

    const outlineNodes = outlineMeshes.map((mesh) => T3Dx.Three2T3d.createMeshNode(mesh, this._outlineMtl));
    this._outlineMeshNode.push(HSApp.View.T3d.Util.mergeMeshes(outlineNodes));
  }

  private _updateStyle(): void {
    const entity = this.entity;

    if (entity.isFlagOn(HSCore.Model.EntityFlagEnum.selected)) {
      this._material.setColor(this._mtlColor.selected);
    } else if (entity.isFlagOn(HSCore.Model.WallFlagEnum.hoverOn)) {
      this._material.setColor(this._mtlColor.hover);
    } else {
      this._material.setColor(this._mtlColor.normal);
    }

    this.materialDirty = true;
    this.context.needsRendering = true;
  }
}