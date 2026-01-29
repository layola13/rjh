interface Point3D {
  x: number;
  y: number;
  z: number;
}

type Plane = 'xy' | 'yz' | 'xz';

type RotationTuple = [number, number, number];

interface RotateEventData {
  delta?: number;
  value?: number;
  event?: MouseEvent | KeyboardEvent;
  title?: string;
}

interface SnapAngleConfig {
  angle: number;
  offset: number;
  mark: number;
}

interface MiniImagePreviewOptions {
  title?: string;
  event?: MouseEvent;
}

interface MiniImagePreviewCtrl {
  title: string;
  init(): void;
  render(position: Point3D): void;
  destroy(): void;
}

declare const MiniImagePreviewCtrl: {
  new (options: MiniImagePreviewOptions): MiniImagePreviewCtrl;
};

declare const HSApp: any;
declare const HSConstants: any;
declare const HSFPConstants: any;
declare const HSCatalog: any;
declare const ResourceManager: any;
declare const THREE: any;

export class CmdRotateContent extends HSApp.Cmd.Command {
  private content: any;
  private basePoint: Point3D;
  private lastTargetingAngle: number;
  private originalAngle: RotationTuple;
  private snapEnabled: boolean;
  private plane: Plane;
  private _rotation: RotationTuple;
  private miniImagePreviewCtrl: MiniImagePreviewCtrl | null;

  constructor(content?: any, plane?: Plane, snapEnabled: boolean = true) {
    super();

    const selectedItem = HSApp.Selection.Manager.selected()[0];
    this.content = content || selectedItem;
    this.basePoint = { x: 0, y: 0, z: 0 };
    this.lastTargetingAngle = 0;
    this.snapEnabled = snapEnabled;
    this.plane = plane!;
    this._rotation = [0, 0, 0];
    this.originalAngle = [0, 0, 0];
    this.miniImagePreviewCtrl = null;
  }

  onExecute(event?: any): void {
    const transManager = this.context.transManager;
    const content = this.content;

    if (content && !content.instanceOf(HSConstants.ModelClass.NgOpening) || this.mgr.cancel(this)) {
      if (this.content.isSimulated) {
        const restoreRequest = transManager.createRequest(
          HSFPConstants.RequestType.RestoreSoftCloth,
          [this.content]
        );
        transManager.commit(restoreRequest);
      }

      this.basePoint.x = content.x;
      this.basePoint.y = content.y;
      this.basePoint.z = content.z;
      this.originalAngle = [content.XRotation, content.YRotation, content.ZRotation];

      if (this.plane === 'xy') {
        this.lastTargetingAngle = content.ZRotation;
      } else if (this.plane === 'yz') {
        this.lastTargetingAngle = content.YRotation;
      } else if (this.plane === 'xz') {
        this.lastTargetingAngle = content.XRotation;
      }

      if (event) {
        this.onReceive('dragmove', event);
      }
    }
  }

  onCleanup(): void {
    if (this.isSupportImagePreview(this.content)) {
      this.destroyMiniImagePreview();
    }
  }

  async onReceive(eventType: string, eventData: RotateEventData): Promise<boolean> {
    let shouldContinue = true;

    const customModelClasses = [
      HSConstants.ModelClass.DAssembly,
      HSConstants.ModelClass.DExtruding,
      HSConstants.ModelClass.DContent,
      HSConstants.ModelClass.DMolding
    ];

    let isCustomModel = customModelClasses.includes(this.content.Class);

    if (!isCustomModel && this.content.Class === HSConstants.ModelClass.NgGroup) {
      const flatMembers = this.content.toFlatMemberList();
      const hasCustomModel = flatMembers.find((member: any) =>
        customModelClasses.includes(member.Class)
      );
      isCustomModel = Boolean(hasCustomModel);
    }

    switch (eventType) {
      case 'sliderdragend':
      case 'hotkeyend':
        await this.dealRotateRequest(isCustomModel);
        break;

      case 'dragmove':
      case 'hotkey':
        const delta = eventData.delta;
        if (isNaN(delta!)) {
          break;
        }

        let targetAngle = (this.lastTargetingAngle + delta!) % 360;
        this.lastTargetingAngle = targetAngle;

        const snapConfig: SnapAngleConfig = {
          angle: targetAngle,
          offset: 10,
          mark: 45
        };

        const isCtrlKeyPressed = eventData.event?.ctrlKey ?? false;

        if (this.snapEnabled && !isCtrlKeyPressed) {
          const snappedAngle = HSApp.View.T3d.Util.snapToAngle(snapConfig);
          targetAngle = snappedAngle !== undefined ? snappedAngle : targetAngle;
        }

        this.content.XRotation = this.originalAngle[0];
        this.content.YRotation = this.originalAngle[1];
        this.content.ZRotation = this.originalAngle[2];

        if (this.plane === 'xy') {
          this.rotateAroundWorldAxis(
            new THREE.Vector3(0, 0, 1),
            targetAngle - this.originalAngle[2]
          );
        } else if (this.plane === 'xz') {
          this.rotateAroundWorldAxis(
            new THREE.Vector3(1, 0, 0),
            targetAngle - this.originalAngle[0]
          );
        } else if (this.plane === 'yz') {
          this.rotateAroundWorldAxis(
            new THREE.Vector3(0, 1, 0),
            targetAngle - this.originalAngle[1]
          );
        }

        const currentRotation: RotationTuple = [
          this.content.XRotation,
          this.content.YRotation,
          this.content.ZRotation
        ];
        this._rotation = currentRotation;

        if (this.isSupportImagePreview(this.content)) {
          let resourceKey = '';

          if (this.content.contentType.isTypeOf(HSCatalog.ContentTypeEnum.ext_SoftCloth)) {
            resourceKey = this.content.contentType.isTypeOf(HSCatalog.ContentTypeEnum.SoftClothCurtain)
              ? 'plugin_place_soft_cloth_curtain'
              : 'plugin_place_soft_cloth';
          }

          if (this.content.contentType.isTypeOf(HSCatalog.ContentTypeEnum.AdjustableArchWallOpening)) {
            resourceKey = 'plugin_adjustable_arch_wall_opening';
          }

          eventData.title = ResourceManager.getString(resourceKey);
          this.renderMiniImagePreview(eventData);
        }
        break;

      case 'sliderdragmove':
        const sliderValue = eventData.value;
        if (isNaN(sliderValue!)) {
          break;
        }

        if (this.plane === 'xy') {
          this.content.ZRotation = sliderValue;
        } else if (this.plane === 'xz') {
          this.content.XRotation = sliderValue;
        } else if (this.plane === 'yz') {
          this.content.YRotation = sliderValue;
        }

        this._rotation = [
          this.content.XRotation,
          this.content.YRotation,
          this.content.ZRotation
        ];
        break;

      case 'dragend':
        await this.dealRotateRequest(isCustomModel);
        break;

      case 'reset':
        this._rotation = [0, 0, 0];
        await this.dealRotateRequest();
        break;

      default:
        shouldContinue = super.onReceive(eventType, eventData);
        break;
    }

    return shouldContinue;
  }

  private async dealRotateRequest(isCustomModel?: boolean): Promise<void> {
    const transManager = this.context.transManager;
    const requestType = isCustomModel
      ? HSFPConstants.RequestType.RotateCustomizedModel
      : HSFPConstants.RequestType.RotateContent;

    const request = transManager.createRequest(requestType, [
      this.content,
      this.originalAngle,
      this._rotation
    ]);

    await transManager.commitAsync(request);

    this.mgr.complete(this);

    if (this.isSupportImagePreview(this.content)) {
      this.destroyMiniImagePreview();
    }
  }

  private destroyMiniImagePreview(): void {
    if (this.miniImagePreviewCtrl) {
      this.miniImagePreviewCtrl.destroy();
      this.miniImagePreviewCtrl = null;
    }
  }

  private isSupportImagePreview(content: any): boolean {
    return Boolean(
      content?.contentType &&
      (content.contentType.isTypeOf(HSCatalog.ContentTypeEnum.ext_SoftCloth) ||
       content.contentType.isTypeOf(HSCatalog.ContentTypeEnum.AdjustableArchWallOpening))
    );
  }

  private renderMiniImagePreview(options: RotateEventData): boolean {
    if (!this.miniImagePreviewCtrl) {
      this.miniImagePreviewCtrl = new MiniImagePreviewCtrl(options);
      this.miniImagePreviewCtrl.init();
    }

    if (this.miniImagePreviewCtrl && options?.event) {
      this.miniImagePreviewCtrl.title = options.title ?? '';

      const mouseEvent = options.event as MouseEvent;
      const position: Point3D = {
        x: mouseEvent.clientX,
        y: mouseEvent.clientY,
        z: 0
      };

      this.miniImagePreviewCtrl.render(position);
      return true;
    }

    return false;
  }

  canUndoRedo(): boolean {
    return false;
  }

  private rotateAroundWorldAxis(axis: any, angle: number): void {
    HSCore.Util.Content.rotateAroundWorldAxis(this.content, axis, angle);
  }

  getDescription(): string {
    return '旋转模型';
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.ContentOperation;
  }
}