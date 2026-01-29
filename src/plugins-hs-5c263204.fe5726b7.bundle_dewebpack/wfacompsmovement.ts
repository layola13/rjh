import { Vector3, Quaternion, Matrix } from './math';
import { Node, MeshBasicMaterial, RasterizerCullMode, Matrix as T3DMatrix } from './t3d';
import { HSApp } from './app';
import { HSCore } from './core';
import { WFABase, WFABaseController } from './wfa-base';
import { GizmoUtils } from './gizmo-utils';
import { ActiveType } from './active-type';
import { ContentMovement } from './content-movement';
import { MoveArrowColor, MoveArrowScaleFactor } from './constants';

interface GizmoScale {
  scale: Vector3;
  scaleRadius: number;
}

interface MeshData {
  data: {
    paths: Array<{
      userData: {
        style: {
          fill?: string;
          fillOpacity?: number;
          stroke?: string;
          strokeOpacity?: number;
        };
      };
      toShapes(clockWise: boolean): any[];
      subPaths: Array<{
        getPoints(): any[];
      }>;
    }>;
  };
}

interface MeshBuildResult {
  node: Node;
  strokeMesh: Node;
}

interface DragEvent {
  constraintInRoom?: boolean;
  moveby?: string;
  moveDir?: Vector3;
  hostFace?: any;
  linearMove?: boolean;
  offset?: [number, number, number];
}

export class WFACompsMovement extends WFABase {
  private node!: Node;

  constructor(
    param1: any,
    param2: any,
    contents: any[],
    param4: any,
    param5: any,
    param6: any,
    listener?: WFACompsMovementController
  ) {
    super(
      param1,
      param2,
      contents,
      param4,
      param5,
      param6,
      listener || new WFACompsMovementController(contents, param1)
    );
    this._initMesh();
    this._setNormalStyler();
  }

  protected _isShowEnable(): boolean {
    let enabled = super._isShowEnable();
    if (enabled && !this._isTowardsCamra()) {
      enabled = false;
    }
    return enabled;
  }

  protected _onActiveChange(): void {
    if (this._activeContext.active !== this._activeType) {
      const opacity = this._activeContext.active
        ? 0
        : MoveArrowColor.normalOpacity;
      this._setMeshColor(this.node, undefined, opacity);
    }
  }

  public onMouseMove(): boolean {
    if (super.onMouseMove()) {
      this.context.cursorStatus.setCurrentStatus(
        HSApp.View.CursorEnum.pointer
      );
    }
    return false;
  }

  private _isTowardsCamra(): boolean {
    const angle = this._getAngleToCamera();
    return Math.cos(angle) >= 0;
  }

  private _getAngleToCamera(): number {
    const camera = HSApp.App.getApp().floorplan.active_camera;
    const bottomCenter = this.getBottomCenterPos();
    return new Vector3(camera)
      .subtract(bottomCenter)
      .angle(this._getDirection());
  }

  private _getGizmoScale(): GizmoScale {
    const bottomCenter = this.getBottomCenterPos();
    const camera = HSApp.App.getApp().floorplan.active_camera;
    const distance = new Vector3(bottomCenter.x, bottomCenter.y, bottomCenter.z)
      .distanceTo(new Vector3(camera));

    let scaleX: number;
    let scaleY: number;
    let scaleRadius: number;

    switch (camera.type) {
      case HSCore.Model.CameraTypeEnum.OrbitView:
        scaleX = distance * MoveArrowScaleFactor.OrbitScaleX;
        scaleY = distance * MoveArrowScaleFactor.OrbitScaleY;
        scaleRadius = distance * MoveArrowScaleFactor.OrbitScaleRadius;
        break;
      case HSCore.Model.CameraTypeEnum.OrthView:
        scaleX = distance * MoveArrowScaleFactor.OrthScaleX;
        scaleY = distance * MoveArrowScaleFactor.OrthScaleY;
        scaleRadius = distance * MoveArrowScaleFactor.OrthScaleRadius;
        break;
      case HSCore.Model.CameraTypeEnum.FirstPerson:
      default:
        scaleX = distance * MoveArrowScaleFactor.FPScaleX;
        scaleY = distance * MoveArrowScaleFactor.FPScaleY;
        scaleRadius = distance * MoveArrowScaleFactor.FPScaleRadius;
    }

    return {
      scale: new Vector3(scaleX, 1, scaleY),
      scaleRadius
    };
  }

  protected _updateNodeTransform(): void {
    const { scale, scaleRadius } = this._getGizmoScale();
    const position = this._getGizmoPosition(scaleRadius);
    const rotation = this._getGizmoRotation();

    this.node.setScale(new Vector3(scale.x, scale.z, scale.y));
    this.node.setTranslation(new Vector3(position.x, position.z, -position.y));
    this.node.setRotation(new Quaternion(rotation.x, rotation.z, -rotation.y, rotation.w));
  }

  private _getGizmoRotation(): Quaternion {
    const baseRotation = this._getBaseRotation();
    const upVector = new Vector3(0, -1, 0);
    upVector.transform(Matrix.makeRotateFromQuaternion(baseRotation));

    const camera = HSApp.App.getApp().floorplan.active_camera;
    const targetPos =
      camera.view_type === HSCore.Model.CameraViewTypeEnum.Orthographic
        ? new Vector3(camera.target_x, camera.target_y, camera.target_z)
        : this.getBottomCenterPos();

    const cameraDirection = new Vector3(camera)
      .subtracted(targetPos)
      .normalize();
    const moveDirection = this._getDirection();
    const angle = this._getAngle(upVector, cameraDirection, moveDirection);

    return new Quaternion()
      .setFromAxisAngle(moveDirection, angle)
      .multiply(baseRotation);
  }

  private _getDirection(): Vector3 {
    switch (this._activeType) {
      case ActiveType.left:
        return this._coord.getDx().multiply(-1);
      case ActiveType.right:
        return this._coord.getDx();
      case ActiveType.bottom:
        return this._coord.getDz().multiply(-1);
      case ActiveType.top:
        return this._coord.getDz();
      case ActiveType.near:
        return this._coord.getDy().multiply(-1);
      case ActiveType.far:
        return this._coord.getDy();
      default:
        return this._coord.getDx();
    }
  }

  public getMoveDir(): Vector3 {
    return this._getDirection();
  }

  private _getBaseRotation(): Quaternion {
    const createRotation = (
      rotX?: number,
      rotY?: number,
      rotZ?: number
    ): Quaternion => {
      const quat = new Quaternion();
      if (rotZ) {
        quat.multiply(new Quaternion().setFromAxisAngle(Vector3.readonlyZ(), rotZ));
      }
      if (rotY) {
        quat.multiply(new Quaternion().setFromAxisAngle(Vector3.readonlyY(), rotY));
      }
      if (rotX) {
        quat.multiply(new Quaternion().setFromAxisAngle(Vector3.readonlyX(), rotX));
      }
      return this._getCoordRotation().multiply(quat);
    };

    const halfPi = Math.PI / 2;

    switch (this._activeType) {
      case ActiveType.left:
        return createRotation(-halfPi, 0, halfPi);
      case ActiveType.right:
        return createRotation(-halfPi, 0, -halfPi);
      case ActiveType.near:
        return createRotation(-halfPi, 0, Math.PI);
      case ActiveType.far:
        return createRotation(-halfPi, 0, 0);
      case ActiveType.bottom:
        return createRotation(-Math.PI, 0, 0);
      case ActiveType.top:
      default:
        return createRotation();
    }
  }

  private _getGizmoPosition(radius: number): Vector3 {
    const offsetDistance = 1.1 * radius;
    const offset = this._getDirection().multiplied(offsetDistance);
    const bottomCenter = this.getBottomCenterPos();
    bottomCenter.z += HSApp.View.T3d.Constants.CONTENT_MOVEMENT_INDICATOR_HEIGHT_OFFSET;
    return bottomCenter.add(offset);
  }

  private _setNormalStyler(): void {
    let color: number;
    switch (this._activeType) {
      case ActiveType.near:
      case ActiveType.far:
        color = MoveArrowColor.normalGreen;
        break;
      case ActiveType.left:
      case ActiveType.right:
        color = MoveArrowColor.normalRed;
        break;
      case ActiveType.top:
      case ActiveType.bottom:
        color = MoveArrowColor.normalBlue;
        break;
      default:
        color = MoveArrowColor.normalRed;
    }
    this._setMeshColor(this.node, color, MoveArrowColor.normalOpacity);
  }

  protected _setHoverStyler(): void {
    let color: number;
    switch (this._activeType) {
      case ActiveType.near:
      case ActiveType.far:
        color = MoveArrowColor.hoverGreen;
        break;
      case ActiveType.left:
      case ActiveType.right:
        color = MoveArrowColor.hoverRed;
        break;
      case ActiveType.top:
      case ActiveType.bottom:
        color = MoveArrowColor.hoverBlue;
        break;
      default:
        color = MoveArrowColor.hoverRed;
    }
    this._setMeshColor(this.node, color, MoveArrowColor.hoverOpacity);
  }

  private _initMesh(): void {
    const meshData = ContentMovement._meshData;
    const mesh = this._buildMesh(meshData.data);
    if (!this.node) {
      this.node = new Node();
      this.node.addChild(mesh.node);
      this.layer.addChild(this);
      this.dirty = true;
    }
  }

  private _buildMesh(data: MeshData['data']): MeshBuildResult {
    const rootNode = new Node();
    const containerNode = new Node();
    const fillNode = new Node();
    const strokeNode = new Node();

    containerNode.addChild(fillNode);
    containerNode.addChild(strokeNode);
    rootNode.addChild(containerNode);

    const result: MeshBuildResult = {
      node: rootNode,
      strokeMesh: strokeNode
    };

    const paths = data.paths;

    for (let i = 0; i < paths.length; i++) {
      const path = paths[i];
      const fillColor = path.userData.style.fill;

      if (fillColor !== undefined && fillColor !== 'none') {
        const fillMaterial = GizmoUtils.createGizmoMaterial(MeshBasicMaterial, {
          color: HSApp.View.T3d.Util.cssColorToNumber(fillColor),
          opacity: path.userData.style.fillOpacity,
          cullMode: RasterizerCullMode.CM_None,
          transparent: true
        });

        const shapes = path.toShapes(true);
        for (let j = 0; j < shapes.length; j++) {
          const shape = shapes[j];
          const geometry = new THREE.ShapeBufferGeometry(shape);
          const meshNode = T3Dx.Three2T3d.createMeshNode(
            T3Dx.Three2T3d.convertBufferGeometryToStreamingMesh(geometry),
            fillMaterial
          );
          fillNode.addChild(meshNode);
        }
      }

      const strokeColor = path.userData.style.stroke;
      if (strokeColor !== undefined && strokeColor !== 'none') {
        const strokeMaterial = GizmoUtils.createGizmoMaterial(MeshBasicMaterial, {
          color: HSApp.View.T3d.Util.cssColorToNumber(strokeColor),
          opacity: path.userData.style.strokeOpacity,
          cullMode: RasterizerCullMode.CM_None,
          transparent: true
        });

        const subPaths = path.subPaths;
        for (let k = 0; k < subPaths.length; k++) {
          const subPath = subPaths[k];
          const strokeGeometry = THREE.SVGLoader.pointsToStroke(
            subPath.getPoints(),
            path.userData.style
          );
          if (strokeGeometry) {
            const strokeMeshNode = T3Dx.Three2T3d.createMeshNode(
              T3Dx.Three2T3d.convertBufferGeometryToStreamingMesh(strokeGeometry),
              strokeMaterial
            );
            strokeNode.addChild(strokeMeshNode);
          }
        }
      }
    }

    // Transform calculations
    const transformMatrix = new T3DMatrix();
    let localMatrix = containerNode.getLocalTransform().getMatrix();
    const boundingBox = containerNode.getWorldBoundingBox();
    const center = boundingBox.getCenter();

    T3DMatrix.TranslationToRef(-center.x, -center.y, center.z, transformMatrix);
    localMatrix = localMatrix.multiply(transformMatrix);

    const size = boundingBox.getSize();
    const maxSize = Math.max(size.x, size.y, size.z);
    const scale = 0.7 / maxSize;

    T3DMatrix.ScalingToRef(scale, scale, 1, transformMatrix);
    localMatrix = localMatrix.multiply(transformMatrix);

    T3DMatrix.RotationXToRef(Math.PI, transformMatrix);
    localMatrix = localMatrix.multiply(transformMatrix);

    T3DMatrix.TranslationToRef(0, 0, 0, transformMatrix);
    localMatrix = localMatrix.multiply(transformMatrix);

    containerNode.setLocalMatrix(localMatrix);

    return result;
  }
}

class WFACompsMovementController extends WFABaseController {
  private _listener!: WFACompsMovement;
  private _contents: any[];

  constructor(contents: any[], param2: any) {
    super(contents, param2);
    this._contents = contents;
  }

  public get direction(): Vector3 {
    return this._listener.getMoveDir();
  }

  public ondragstart(event: DragEvent): boolean {
    if (this._cmdMgr.current !== undefined) {
      return false;
    }

    const camera = this.context.document.active_camera;
    if (camera.type === HSCore.Model.CameraTypeEnum.FirstPerson) {
      event.constraintInRoom = true;
    } else {
      event.constraintInRoom = false;
    }

    this.activeContext.setActive(this.activeType);
    event.moveby = 'contentmovement';
    event.moveDir = this.direction;
    event.hostFace = HSCore.Util.Content.getHostedFace(this._contents[0]);

    const isNCPBackgroundWall = this._contents.every(
      (content) => content instanceof HSCore.Model.NCPBackgroundWallBase
    );

    const command = isNCPBackgroundWall
      ? this._cmdMgr.createCommand(HSFPConstants.CommandType.MoveNCPBgWallInWFA, [
          this._contents,
          event
        ])
      : this._cmdMgr.createCommand(HSFPConstants.CommandType.MoveInHardDecoration, [
          this._contents,
          event
        ]);

    if (!command) {
      return false;
    }

    this._cmdMgr.execute(command);
    this._cmdMgr.receive('dragstart', event);
    return true;
  }

  public ondragend(): void {
    this.activeContext.setActive(undefined);
  }

  public composedragmoveparam(event: DragEvent): DragEvent {
    const moveDirection = this.direction;
    event.linearMove = true;

    if (event.offset) {
      const offsetVector = new Vector3(
        event.offset[0],
        -event.offset[2],
        event.offset[1]
      );
      const projectedOffset = moveDirection.multiplied(
        moveDirection.dot(offsetVector)
      );
      event.offset[0] = projectedOffset.x;
      event.offset[1] = projectedOffset.y;
      event.offset[2] = projectedOffset.z;
      event.moveDir = moveDirection;
    }

    event.moveby = 'contentmovement';
    return event;
  }
}