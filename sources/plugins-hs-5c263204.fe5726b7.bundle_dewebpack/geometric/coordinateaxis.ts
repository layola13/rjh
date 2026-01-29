import { Node, Vector3 } from './Vector3Module';
import { Gizmo } from './GizmoModule';
import { SignalHook } from './SignalHookModule';
import { Entity, Group, CameraTypeEnum } from './CoreModels';
import { ActiveContext } from './ActiveContext';

interface Position {
  x: number;
  y: number;
  z: number;
}

interface Rotation {
  x: number;
  y: number;
  z: number;
}

interface Camera {
  x: number;
  y: number;
  z: number;
  type: CameraTypeEnum;
}

interface DisplayListItem {
  node?: Node;
  id: string;
}

interface Context {
  needsRendering: boolean;
}

interface Layer {
  addChild(child: CoordinateAxis): void;
  removeChild(child: CoordinateAxis): void;
}

const GIZMO_LINE_COLOR_X = 16206924;
const GIZMO_LINE_COLOR_Y = 3309055;
const GIZMO_LINE_COLOR_Z = 5293848;
const GIZMO_LINE_WIDTH = 2;
const POLYGON_OFFSET_FACTOR = -2;
const AXIS_LENGTH = 0.5;

export class CoordinateAxis extends Gizmo {
  public node!: Node;
  public activeContext: ActiveContext;
  public signalHook: SignalHook = new SignalHook();
  public entity!: Entity;
  public context!: Context;
  public layer!: Layer;
  public visible: boolean = true;

  private lineX!: Node;
  private lineY!: Node;
  private lineZ!: Node;
  private _hideFromCameraChanging: boolean = false;

  constructor(
    entity: Entity,
    context: Context,
    layer: Layer,
    activeContext: ActiveContext
  ) {
    super(entity, context, layer);
    this.init();
    this.activeContext = activeContext;

    this.signalHook.listen(this.entity.signalFieldChanged, this.hide.bind(this));
    this.signalHook.listen(this.entity.signalDirty, this.hide.bind(this));
    this.signalHook.listen(
      HSApp.App.getApp().cmdManager.signalCommandTerminated,
      this.show.bind(this)
    );
    this.signalHook.listen(
      this.activeContext.signalChange,
      this._onActiveChange.bind(this)
    );
    this.signalHook.listen(
      HSApp.App.getApp().signalCameraChangeStart,
      this._onCameraChangeStart.bind(this)
    );
    this.signalHook.listen(
      HSApp.App.getApp().signalCameraChangeEnd,
      this._onCameraChangeEnd.bind(this)
    );
  }

  private _onCameraChangeStart(): void {
    this.setHideFromCameraChanging(true);
  }

  private _onCameraChangeEnd(): void {
    this.setHideFromCameraChanging(false);
  }

  private setHideFromCameraChanging(hide: boolean): void {
    if (this._hideFromCameraChanging !== hide) {
      this.node.setVisible(!hide);
      this.context.needsRendering = true;
    }
  }

  public show(): void {
    if (this.canShow()) {
      super.show();
    } else {
      this.hide();
    }
  }

  public canShow(): boolean {
    const app = HSApp.App.getApp();
    const displayItem = app.getActive3DView().displayList[this.entity.id];
    let isVisible = displayItem?.node?.getVisible() ?? false;
    const isNotSmartReplaceCommand =
      app.cmdManager.current?.type !== HSFPConstants.CommandType.SmartReplaceContent;

    if (this.entity instanceof Group) {
      HSCore.Util.Entity.traverseApplyFuncForEntity(this.entity, (childEntity: Entity) => {
        const childDisplayItem = app.getActive3DView().displayList[childEntity.id];
        isVisible = isVisible || (childDisplayItem?.node?.getVisible() ?? false);
      });
    }

    return isVisible && !isNotSmartReplaceCommand;
  }

  private _onActiveChange(event: unknown): void {
    if (this.activeContext.active) {
      this.node.setVisible(false);
      this.context.needsRendering = true;
    } else {
      this.node.setVisible(true);
      this.context.needsRendering = true;
    }
  }

  public init(options?: unknown): void {
    this.node = new Node();

    const origin: Position = { x: 0, y: 0, z: 0 };

    const materialX = this._createGizmoLineMaterial(GIZMO_LINE_COLOR_X);
    this.lineX = this._createLine(origin, { x: AXIS_LENGTH, y: 0, z: 0 }, materialX);
    this.node.addChild(this.lineX);

    const materialY = this._createGizmoLineMaterial(GIZMO_LINE_COLOR_Y);
    this.lineY = this._createLine(origin, { x: 0, y: AXIS_LENGTH, z: 0 }, materialY);
    this.node.addChild(this.lineY);

    const materialZ = this._createGizmoLineMaterial(GIZMO_LINE_COLOR_Z);
    this.lineZ = this._createLine(origin, { x: 0, y: 0, z: AXIS_LENGTH }, materialZ);
    this.node.addChild(this.lineZ);

    this.layer.addChild(this);
  }

  private _createGizmoLineMaterial(color: number): unknown {
    return T3Dx.GizmoUtil.createGizmoLineMaterial(color, GIZMO_LINE_WIDTH, {
      polygonOffsetFactor: POLYGON_OFFSET_FACTOR
    });
  }

  private _createLine(start: Position, end: Position, material: unknown): Node {
    const positions: number[] = [];
    [start, end].forEach((point: Position) => {
      positions.push(...Object.values(point));
    });

    return T3Dx.Three2T3d.createMeshNode(
      T3Dx.Line2Mesh.setFromPositions(positions, [], 'CoordinateAxis'),
      material
    );
  }

  public draw(): void {
    if (!this.canShow()) {
      this.node.setVisible(false);
      return;
    }

    this.node.setVisible(this.visible);

    const camera = HSApp.App.getApp().floorplan.active_camera;
    const rotation = this.getGizmoRotation(camera);

    this.lineX.setRotation(
      T3Dx.Three2T3d.convertThreeEulerToQuaternion(new THREE.Euler(0, 0, rotation.x))
    );
    this.lineY.setRotation(
      T3Dx.Three2T3d.convertThreeEulerToQuaternion(new THREE.Euler(0, 0, rotation.y))
    );
    this.lineZ.setRotation(
      T3Dx.Three2T3d.convertThreeEulerToQuaternion(new THREE.Euler(rotation.z, 0, 0))
    );

    const position = this.contentPosition;
    let altitude = position.z;
    const uniqueParent = this.entity.getUniqueParent();
    altitude += HSApp.App.getApp().floorplan.scene.getLayerAltitude(uniqueParent);

    this.node.setTranslation(new Vector3(position.x, altitude, -position.y));

    const scale = this._getGizmoScale(camera, this.entity);
    this.node.setScale(scale);
  }

  public getGizmoRotation(camera: Camera): Rotation {
    const position = this.contentPosition;

    const upVector = new THREE.Vector3(0, 1, 0);
    const horizontalVector = new THREE.Vector3(
      position.x - camera.x,
      position.y - camera.y,
      0
    );
    const angleX = GeLib.VectorUtils.angleToIn2PI(
      upVector,
      horizontalVector,
      new THREE.Vector3(0, 0, -1)
    );

    const forwardVector = new THREE.Vector3(0, 0, 1);
    const verticalVectorY = new THREE.Vector3(0, position.y - camera.y, position.z - camera.z);
    const angleY = GeLib.VectorUtils.angleToIn2PI(
      forwardVector,
      verticalVectorY,
      new THREE.Vector3(1, 0, 0)
    );

    const rightVector = new THREE.Vector3(1, 0, 0);
    const verticalVectorZ = new THREE.Vector3(position.x - camera.x, 0, position.z - camera.z);
    const angleZ = GeLib.VectorUtils.angleToIn2PI(
      rightVector,
      verticalVectorZ,
      new THREE.Vector3(0, -1, 0)
    );

    const TWO_PI = 2 * Math.PI;

    return {
      x: Math.abs(angleX % TWO_PI) > Math.PI ? 0 : Math.PI,
      y: Math.abs(angleZ % TWO_PI) > Math.PI ? 0 : Math.PI,
      z: Math.abs(angleY % TWO_PI) > Math.PI ? 0 : Math.PI
    };
  }

  private _getGizmoScale(camera: Camera, entity: Entity): Vector3 {
    const position = this.contentPosition;
    const distance = new Vector3(position.x, position.y, position.z).distance(
      new Vector3(camera.x, camera.y, camera.z)
    );

    let scale: Vector3;

    if (camera.type === CameraTypeEnum.FirstPerson) {
      scale = new Vector3(1, 1, 1).scaleInPlace(
        distance * (HSApp.View.T3d.Constants.CONTENT_ROTATION_INDICATOR_SIZE / 5)
      );
    } else if (camera.type === CameraTypeEnum.OrbitView) {
      scale = new Vector3(1, 1, 1).scaleInPlace(
        distance * (HSApp.View.T3d.Constants.CONTENT_ROTATION_INDICATOR_SIZE / 10)
      );
    } else if (camera.type === CameraTypeEnum.OrthView) {
      scale = new Vector3(1, 1, 1).scaleInPlace(
        HSApp.View.T3d.Constants.CONTENT_ROTATION_INDICATOR_SIZE
      );
    } else {
      scale = new Vector3(1, 1, 1);
    }

    return scale;
  }

  public onCleanup(): void {
    this.hide();
    this.layer.removeChild(this);
    this.signalHook.dispose();
    HSApp.View.T3d.Util.cleanupMeshGeometry(this.node);
    super.onCleanup();
  }

  public get contentPosition(): THREE.Vector3 {
    return new THREE.Vector3(this.entity.x, this.entity.y, this.entity.z);
  }
}