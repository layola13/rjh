import { Vector3 } from './Vector3';
import { HSCore } from './HSCore';
import { HSApp } from './HSApp';
import { OptionTypeEnum } from './OptionTypeEnum';

interface Content {
  XScale: number;
  YScale: number;
  ZScale: number;
  XRotation: number;
  YRotation: number;
  ZRotation: number;
}

interface SavedContentData {
  content: Content;
  position: Vector3;
  scale: Vector3;
  rotation: Vector3;
  transform: THREE.Matrix4;
}

interface AxisDirection {
  x: number;
  y: number;
  z: number;
}

interface DragMoveParams {
  delta: number;
  title?: string;
  event?: MouseEvent;
}

interface SliderDragMoveParams {
  value: number;
}

interface TransformRequest {
  onReceive(optionType: OptionTypeEnum, data: { trans: TransformData[] }): void;
}

interface TransformData {
  content: Content;
  rotation: Vector3;
}

interface RenderPreviewParams {
  title?: string;
  event?: MouseEvent;
}

interface MiniImagePreviewPosition {
  x: number;
  y: number;
}

declare class MiniImagePreviewCtrl {
  constructor(params: RenderPreviewParams);
  title: string;
  init(): void;
  render(position: MiniImagePreviewPosition): void;
  destroy(): void;
}

declare namespace HSFPConstants {
  enum RequestType {
    TransformInHardDecoration = 'TransformInHardDecoration'
  }
  enum LogGroupTypes {
    ContentOperation = 'ContentOperation'
  }
}

declare class ResourceManager {
  static getString(key: string): string;
}

export class CmdRotateInHardDecoration extends HSApp.Cmd.Command {
  private _contents: Content[];
  private _saved: SavedContentData[];
  private _rotateRequest?: TransformRequest;
  private _lastTargetingAngle: number;
  private _axisDir: AxisDirection;
  private _snapEnabled: boolean;
  private _miniImagePreviewCtrl: MiniImagePreviewCtrl | null;

  constructor(contents: Content | Content[], axisDir: AxisDirection, snapEnabled: boolean = true) {
    super();
    this._contents = Array.isArray(contents) ? contents : [contents];
    this._lastTargetingAngle = 0;
    this._snapEnabled = snapEnabled;
    this._axisDir = axisDir;
    this._saved = [];
    this._miniImagePreviewCtrl = null;
    this._saveOriginalData();
  }

  private _saveOriginalData(): void {
    this._contents.forEach((content) => {
      this._saved.push({
        content,
        position: new Vector3(content),
        scale: new Vector3(content.XScale, content.YScale, content.ZScale),
        rotation: new Vector3(content.XRotation, content.YRotation, content.ZRotation),
        transform: HSCore.Util.Matrix3DHandler.getMatrix4(content)
      });
    });
  }

  onExecute(params?: DragMoveParams): void {
    this._lastTargetingAngle = 0;
    this._createMoveRequest();
    if (params) {
      this.onReceive('dragmove', params);
    }
  }

  onCleanup(): void {
    this._destroyMiniImagePreview();
  }

  private _createMoveRequest(): void {
    this._rotateRequest = this.context.transManager.createRequest(
      HSFPConstants.RequestType.TransformInHardDecoration,
      [this._saved]
    );
  }

  private _checkParamValid(params: DragMoveParams | SliderDragMoveParams): boolean {
    return !isNaN((params as DragMoveParams).delta ?? (params as SliderDragMoveParams).value);
  }

  private _rotateEnd(): void {
    this._destroyMiniImagePreview();
  }

  private _rotate(deltaAngle: number): void {
    let targetAngle = (this._lastTargetingAngle + deltaAngle) % 360;
    this._lastTargetingAngle = targetAngle;

    if (this._snapEnabled) {
      const snapConfig = {
        angle: targetAngle,
        offset: 10
      };
      const snappedAngle = HSApp.View.T3d.Util.snapToAngle(snapConfig);
      targetAngle = snappedAngle !== undefined ? snappedAngle : targetAngle;
    }

    this._rotateByAxisAndAngle(targetAngle);
  }

  private _postRotate(params: RenderPreviewParams): void {
    if (this._isSupportImagePreview()) {
      params.title = ResourceManager.getString('');
      this._renderMiniImagePreview(params);
    }
  }

  onReceive(eventType: string, params: DragMoveParams | SliderDragMoveParams): boolean {
    let handled = true;

    switch (eventType) {
      case 'sliderdragend':
      case 'hotkeyend':
        this._dealRotateRequest();
        this._rotateEnd();
        break;

      case 'dragmove':
      case 'hotkey':
        if (!this._checkParamValid(params as DragMoveParams)) break;
        this._rotate((params as DragMoveParams).delta);
        this._postRotate(params as RenderPreviewParams);
        break;

      case 'sliderdragmove':
        if (!this._checkParamValid(params as SliderDragMoveParams)) break;
        this._rotateByAxisAndAngle((params as SliderDragMoveParams).value);
        break;

      case 'dragend':
        this._dealRotateRequest();
        break;

      case 'reset':
        this._rotateByAxisAndAngle(0);
        this._dealRotateRequest();
        break;

      default:
        handled = super.onReceive?.(eventType, params) ?? false;
    }

    return handled;
  }

  private _dealRotateRequest(): void {
    const transManager = this.context.transManager;
    if (this._rotateRequest) {
      transManager.commit(this._rotateRequest);
    }
    this.mgr.complete(this);
  }

  private _isSupportImagePreview(): boolean {
    return false;
  }

  private _renderMiniImagePreview(params: RenderPreviewParams): boolean {
    if (!this._miniImagePreviewCtrl) {
      this._miniImagePreviewCtrl = new MiniImagePreviewCtrl(params);
      this._miniImagePreviewCtrl.init();
    }

    if (this._miniImagePreviewCtrl && params?.event) {
      this._miniImagePreviewCtrl.title = params.title ?? '';
      const position: MiniImagePreviewPosition = {
        x: params.event.clientX,
        y: params.event.clientY
      };
      this._miniImagePreviewCtrl.render(position);
      return true;
    }

    return false;
  }

  private _destroyMiniImagePreview(): void {
    if (this._miniImagePreviewCtrl) {
      this._miniImagePreviewCtrl.destroy();
      this._miniImagePreviewCtrl = null;
    }
  }

  private _rotateByAxisAndAngle(angle: number): void {
    this._lastTargetingAngle = angle;

    const axis = new THREE.Vector3(this._axisDir.x, this._axisDir.y, this._axisDir.z);
    const transformData = this._contents.map((content) => ({
      content,
      rotation: this._rotateAroundWorldAxis(content, axis, angle)
    }));

    if (this._rotateRequest) {
      this._rotateRequest.onReceive(OptionTypeEnum.TransformAlone, {
        trans: transformData
      });
    }
  }

  private _getRotateDelta(axisType: string, content: Content, angle: number): number {
    const savedData = this._saved.find((item) => item.content === content);
    if (!savedData) return 0;

    let delta: number;
    switch (axisType) {
      case 'yz':
        delta = angle - savedData.rotation.x + content.XRotation;
        break;
      case 'xz':
        delta = angle - savedData.rotation.y + content.YRotation;
        break;
      default:
        delta = angle - savedData.rotation.z + content.ZRotation;
    }

    return delta;
  }

  private _rotateAroundWorldAxis(content: Content, axis: THREE.Vector3, angle: number): Vector3 {
    const savedData = this._saved.find((item) => item.content === content);
    if (!savedData) return new Vector3(0, 0, 0);

    const position = new THREE.Vector3();
    const quaternion = new THREE.Quaternion();
    const scale = new THREE.Vector3();
    savedData.transform.decompose(position, quaternion, scale);

    const rotationQuaternion = new THREE.Quaternion().setFromAxisAngle(
      axis,
      THREE.Math.degToRad(angle)
    );
    rotationQuaternion.multiply(quaternion);

    const euler = new THREE.Euler().setFromQuaternion(rotationQuaternion, 'XYZ');

    return new Vector3(
      THREE.Math.radToDeg(-euler.x),
      THREE.Math.radToDeg(-euler.y),
      THREE.Math.radToDeg(-euler.z)
    );
  }

  getDescription(): string {
    return '旋转硬装模型';
  }

  getCategory(): HSFPConstants.LogGroupTypes {
    return HSFPConstants.LogGroupTypes.ContentOperation;
  }
}