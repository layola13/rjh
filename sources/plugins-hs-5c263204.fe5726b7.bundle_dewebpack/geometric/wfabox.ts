// @ts-nocheck
import { Node, Vector3, Quaternion } from './367441';
import { BoxGizmo } from './918038';
import { WFABase } from './122206';

export class WFABox extends WFABase {
  private _boxGizmo: BoxGizmo | undefined;

  constructor(
    param1: unknown,
    param2: unknown,
    param3: unknown,
    param4: unknown,
    param5: unknown
  ) {
    super(param1, param2, param3, "", param4, param5);
    this._boxGizmo = new BoxGizmo();
    this.init();
  }

  init(): void {
    this._boxGizmo!.initialize();
    this._boxGizmo!.color = this._boxGizmo!.cssColorToNumber("rgb(50, 125, 255)");
    this._boxGizmo!.opacity = 1;

    const graphicsNode = this._boxGizmo!.getGraphicsNode();
    this.node = new Node();
    this.node.addChild(graphicsNode);
    this.layer.addChild(this);
  }

  onCleanup(): void {
    this._boxGizmo?.onCleanup();
    this._boxGizmo = undefined;
    super.onCleanup();
  }

  protected _updateNodeTransform(): void {
    const gizmoScale = this._getGizmoScale();
    const bottomCenterPos = this.getBottomCenterPos();
    const gizmoRotation = this._getGizmoRotation();

    this.node.setTranslation(new Vector3(bottomCenterPos.x, bottomCenterPos.z, -bottomCenterPos.y));
    this.node.setScale(new Vector3(gizmoScale.x, gizmoScale.z, gizmoScale.y));
    this.node.setRotation(new Quaternion(gizmoRotation.x, gizmoRotation.z, -gizmoRotation.y, gizmoRotation.w));

    this._checkRangeAndCollision(this._boxGizmo!);
  }

  protected _getGizmoScale(): Vector3 {
    return this._getSize();
  }

  protected _getGizmoRotation(): Quaternion {
    return this._getRotation();
  }
}