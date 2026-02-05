// @ts-nocheck
import { Node, Vector3, Quaternion } from './367441';
import { FuzzyGizmo, GizmoBaseAgent, SvgShapeGizmo, FuzzyDirection } from './918038';
import { HSApp } from './518193';
import { Matrix4 } from './815362';
import { style } from './151452';
import { WFABase } from './122206';
import { ResizeBoxColor } from './44182';

interface DragEventParam {
  linearMove?: boolean;
  offset?: [number, number, number];
  trackingMouse?: boolean;
}

interface Box {
  size: Vector3;
}

export class WFACompsResize extends WFABase {
  private _rotation?: Quaternion;
  private _showBoxGizmo: boolean;
  public fuzzyGizmo!: FuzzyGizmo;
  public node!: Node;

  constructor(
    arg1: unknown,
    arg2: unknown,
    arg3: unknown,
    arg4: unknown,
    arg5: unknown,
    showBoxGizmo: boolean = true,
    arg7?: unknown
  ) {
    super(arg1, arg2, arg3, '', arg4, arg5, arg7);
    this._showBoxGizmo = showBoxGizmo;
    this.init();
  }

  private init(): void {
    this.node = new Node();
    this.fuzzyGizmo = new FuzzyGizmo();
    this.fuzzyGizmo.initialize();
    this.node.addChild(this.fuzzyGizmo.getGraphicsNode());
    this.layer.addChild(this);

    this.fuzzyGizmo.forEachChild((child) => {
      child.initialize();
      const agent = new GizmoBaseAgent(this.context, child, this.layer);
      this.addChildGizmo(agent);
    });

    this.fuzzyGizmo.boxGizmo.color = ResizeBoxColor.NormalColor;
    this.fuzzyGizmo.boxGizmo.opacity = 1;

    this.fuzzyGizmo.svgGizmos.forEach((gizmo) => {
      this._updateArrowStyler(gizmo, 'normal');
      gizmo.mousemove = this.onGizmoMouseMove.bind(this);
      gizmo.mouseout = this.onGizmoMouseOut.bind(this);
      gizmo.ondragstart = this.ondragstart.bind(this);
      gizmo.ondragend = this.ondragend.bind(this);
      gizmo.composedragmoveparam = this.composeDragMoveParam.bind(this);
      gizmo.composedragendparam = this.composedragendparam.bind(this);
    });

    this.fuzzyGizmo.faceGizmos.forEach((gizmo) => gizmo.hide());

    this.fuzzyGizmo.camera = HSApp.App.getApp().floorplan.active_camera;
    this._updateNodeTransform();
  }

  private _updateNodeTransform(): void {
    const size = this._getSize();
    const bottomCenterPos = this.getBottomCenterPos();
    const rotation = this._getGizmoRotation();

    this._rotation = rotation;
    this.fuzzyGizmo.position = new Vector3(bottomCenterPos.x, bottomCenterPos.z, -bottomCenterPos.y);
    this.fuzzyGizmo.width = size.x;
    this.fuzzyGizmo.depth = size.y;
    this.fuzzyGizmo.height = size.z;
    this.fuzzyGizmo.rotation = new Quaternion(rotation.x, rotation.z, -rotation.y, rotation.w);

    if (this._isShowEnable()) {
      this.fuzzyGizmo.show();
      this.fuzzyGizmo.svgGizmos.forEach((gizmo) => gizmo.show());
      
      if (this._showBoxGizmo) {
        this.fuzzyGizmo.boxGizmo.show();
      } else {
        this.fuzzyGizmo.boxGizmo.hide();
      }
    } else {
      this.fuzzyGizmo.hide();
    }

    this._checkRangeAndCollision(this.fuzzyGizmo.boxGizmo);
    this.dirty = true;
  }

  public onCleanup(): void {
    this.fuzzyGizmo.onCleanup();
    this.fuzzyGizmo = undefined as unknown as FuzzyGizmo;
    super.onCleanup();
  }

  private onGizmoMouseMove(event: unknown, gizmo: unknown): void {
    if (gizmo instanceof SvgShapeGizmo) {
      this._updateArrowStyler(gizmo, 'hover');
      this._updateBoxFaceStyler(gizmo.parent, gizmo.name);
    }
  }

  private onGizmoMouseOut(event: unknown, gizmo: unknown): void {
    if (gizmo instanceof SvgShapeGizmo) {
      this._updateArrowStyler(gizmo, 'normal');
      this._updateBoxFaceStyler(gizmo.parent);
    }
  }

  private ondragstart(event: unknown, gizmo: SvgShapeGizmo): boolean {
    const cmdManager = HSApp.App.getApp().cmdManager;
    const direction = this._getDirection(gizmo.name);
    const bottomCenterPos = this.getBottomCenterPos();
    
    bottomCenterPos.z -= this._getLayerAltitudeHeight();

    const command = cmdManager.createCommand(
      HSFPConstants.CommandType.ResizeInHardDecoration,
      [this.contents, direction.clone(), this._getBox().size, bottomCenterPos]
    );

    if (command) {
      cmdManager.execute(command);
    }

    return true;
  }

  private ondragend(event: unknown, gizmo: unknown): boolean {
    return true;
  }

  private composeDragMoveParam(param: DragEventParam, gizmo: SvgShapeGizmo): DragEventParam {
    param.linearMove = true;

    if (param.offset && this._rotation) {
      const direction = this._getDirection(gizmo.name);
      const rotationMatrix = Matrix4.makeRotateFromQuaternion(this._rotation);
      direction.transform(rotationMatrix);

      const offsetVector = new Vector3(param.offset[0], -param.offset[2], param.offset[1]);
      const projectedOffset = direction.multiplied(offsetVector.dot(direction));
      projectedOffset.transform(rotationMatrix.inversed());

      param.offset[0] = projectedOffset.x;
      param.offset[1] = projectedOffset.y;
      param.offset[2] = projectedOffset.z;
    }

    return param;
  }

  private composedragendparam(param: DragEventParam, gizmo: unknown): DragEventParam {
    param.trackingMouse = true;
    return param;
  }

  private _getDirection(directionName: string): Vector3 {
    switch (directionName) {
      case FuzzyDirection.LEFT:
        return Vector3.X(-1);
      case FuzzyDirection.RIGHT:
        return Vector3.X(1);
      case FuzzyDirection.BOTTOM:
        return Vector3.Z(-1);
      case FuzzyDirection.TOP:
        return Vector3.Z(1);
      case FuzzyDirection.FRONT:
        return Vector3.Y(-1);
      case FuzzyDirection.BACK:
        return Vector3.Y(1);
      default:
        return Vector3.X(1);
    }
  }

  private _getGizmoRotation(): Quaternion {
    return this._getRotation();
  }

  private _updateArrowStyler(gizmo: SvgShapeGizmo, state: 'normal' | 'hover'): void {
    gizmo.opacity = style.arrow.opacity[state][gizmo.name];
    gizmo.fillColor = style.arrow.color[state][gizmo.name];
    gizmo.strokeColor = style.arrow.color[state][gizmo.name];
  }

  private _updateBoxFaceStyler(parent: { faceGizmoMap: Map<unknown, any> }, activeFaceName?: string): void {
    parent.faceGizmoMap.forEach((faceGizmo) => {
      if (faceGizmo.name === activeFaceName) {
        faceGizmo.show();
        faceGizmo.opacity = style.face.opacity.hover[activeFaceName];
        faceGizmo.color = style.face.color.hover[activeFaceName];
      } else {
        faceGizmo.hide();
      }
    });
  }
}