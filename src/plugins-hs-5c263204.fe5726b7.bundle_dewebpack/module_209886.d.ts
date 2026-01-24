import { ActiveContext, ActiveType, ContentLift } from './active-context';
import { ContentRotation } from './content-rotation';
import { ContentMovement } from './content-movement';
import { CoordinateAxis } from './coordinate-axis';
import { ResizeContent } from './resize-content';
import { ContentBox } from './content-box';
import { CWContentDimension } from './cw-content-dimension';
import { isCustomDoor } from './custom-door-utils';
import { HSCore, HSConstants } from './hs-core';
import { HSApp } from './hs-app';
import { HSCatalog } from './hs-catalog';

/**
 * 内容编辑 Gizmo 类
 * 负责在 3D 视图中为选中内容提供缩放、旋转、移动等交互操作
 */
export default class ContentEditGizmo extends HSApp.View.Base.Gizmo {
  private app: HSApp.App.Application;
  private activeEnvironmentId: string;

  /**
   * 构造函数
   * @param context - 3D 视图上下文
   * @param transform - 变换对象
   * @param content - 内容模型对象
   */
  constructor(
    context: HSApp.View.Context3D,
    transform: HSApp.Model.Transform,
    content: HSCore.Model.Content | HSCore.Model.Group
  ) {
    super(context, transform, content);

    this.app = HSApp.App.getApp();

    // 如果是编辑灯光模式或正在执行批量添加产品命令，则提前返回
    if (
      (content instanceof HSCore.Model.Content &&
        content.isFlagOn(HSCore.Model.ContentFlagEnum.EditLight)) ||
      this.app.cmdManager.current?.type === HSFPConstants.CommandType.AddMultiProducts
    ) {
      return;
    }

    // 注册快捷键：Alt+R 切换选择类型
    this.app.hotkey.registerHotkey('alt+r', this.changeSelectionType);
    this.activeEnvironmentId = this.app.activeEnvironmentId;

    const gizmoSelectionType = context.hscanvas.gizmoManager.getSelectionType() || 0;
    const SelectionType = HSApp.View.GizmoSelectionType;

    // 不支持缩放的模型类型
    const nonScalableClasses = [
      HSConstants.ModelClass.DAssembly,
      HSConstants.ModelClass.DContent,
      HSConstants.ModelClass.DExtruding,
      HSConstants.ModelClass.DMolding,
      HSConstants.ModelClass.DHole,
    ];

    const hasSelectionType = (type: number): boolean => {
      return (gizmoSelectionType & type) !== 0;
    };

    const activeContext = new ActiveContext();

    // 添加缩放 Gizmo（仅当模型支持缩放时）
    if (
      hasSelectionType(SelectionType.Scale) &&
      !hasSelectionType(SelectionType.Reset) &&
      content &&
      !nonScalableClasses.includes(content.Class) &&
      content.Class !== HSConstants.ModelClass.DOpening
    ) {
      this._addScaleGizmo(context, transform, content);
    }

    // 添加旋转 Gizmo
    if (hasSelectionType(SelectionType.Rotate | SelectionType.Reset)) {
      this._addRotateGizmo(context, transform, content, activeContext);
      this._registerHotkey();
    }

    // 添加移动 Gizmo
    if (hasSelectionType(SelectionType.Move | SelectionType.Reset)) {
      this._addMoveGizmo(context, transform, content, activeContext);
    }

    // 添加坐标轴 Gizmo
    if (
      hasSelectionType(SelectionType.Rotate | SelectionType.Reset) ||
      hasSelectionType(SelectionType.Move | SelectionType.Reset)
    ) {
      this._addCoordinateAxisGizmo(context, transform, content, activeContext);
    }

    // 添加包围盒
    if (
      !HSApp.Util.Content.isDiyModel(content) &&
      (!hasSelectionType(SelectionType.Rotate | SelectionType.Reset | SelectionType.Move) ||
        hasSelectionType(SelectionType.Select)) &&
      !nonScalableClasses.includes(content.Class)
    ) {
      this._addBoundingBox(context, transform, content);
    }

    // 添加尺寸标注
    this._addDimension(context, transform, content);
  }

  /**
   * 切换选择类型（在缩放和旋转移动之间切换）
   */
  private changeSelectionType = (): void => {
    const selectedItem = this.app.selectionManager.selected()[0];
    if (!selectedItem?.isScalable) {
      return;
    }

    const gizmoManager = this.app.getMain3DView().gizmoManager;
    const currentSelectionType = gizmoManager.getSelectionType();
    const SelectionType = HSApp.View.GizmoSelectionType;

    // 如果当前是缩放模式，切换到旋转移动模式
    if ((currentSelectionType & SelectionType.Scale) !== 0) {
      this.app.getActive3DView().gizmoManager.setSelectionType(SelectionType.RotateAndMove);
      return;
    }

    // 如果当前是旋转移动或重置模式，切换到缩放模式
    if (
      (currentSelectionType & SelectionType.RotateAndMove) !== 0 ||
      (currentSelectionType & SelectionType.Reset) !== 0
    ) {
      this.app.getActive3DView().gizmoManager.setSelectionType(SelectionType.Scale);
    }
  };

  /**
   * 清理资源
   */
  onCleanup(): void {
    this._unregisterHotkey();
  }

  /**
   * 添加包围盒 Gizmo
   */
  private _addBoundingBox(
    context: HSApp.View.Context3D,
    transform: HSApp.Model.Transform,
    content: HSCore.Model.Content | HSCore.Model.Group
  ): void {
    this.addChildGizmo(new ContentBox(context, transform, content));
  }

  /**
   * 添加缩放 Gizmo
   */
  private _addScaleGizmo(
    context: HSApp.View.Context3D,
    transform: HSApp.Model.Transform,
    content: HSCore.Model.Content | HSCore.Model.Group
  ): void {
    this.addChildGizmo(new ResizeContent(context, transform, content));
  }

  /**
   * 添加旋转 Gizmo（XY、XZ、YZ 三个平面）
   */
  private _addRotateGizmo(
    context: HSApp.View.Context3D,
    transform: HSApp.Model.Transform,
    content: HSCore.Model.Content | HSCore.Model.Group,
    activeContext?: ActiveContext
  ): void {
    activeContext = activeContext || new ActiveContext();

    const maxSize = Math.max(content.XSize, content.YSize, content.ZSize);
    const scale = Math.min(Math.max(1, maxSize), 1);

    const rotationPlanes = [ActiveType.xy, ActiveType.xz, ActiveType.yz];
    rotationPlanes.forEach((planeType) => {
      this.addChildGizmo(
        new ContentRotation(context, transform, content, scale, undefined, planeType, activeContext)
      );
    });
  }

  /**
   * 添加移动 Gizmo（上下移动和四个方向移动）
   */
  private _addMoveGizmo(
    context: HSApp.View.Context3D,
    transform: HSApp.Model.Transform,
    content: HSCore.Model.Content | HSCore.Model.Group,
    activeContext?: ActiveContext
  ): void {
    activeContext = activeContext || new ActiveContext();

    const maxSize = Math.max(content.XSize, content.YSize, content.ZSize);
    const scale = Math.min(Math.max(1, maxSize), 1);

    // 添加垂直方向（Z轴）移动控件
    this.addChildGizmo(
      new ContentLift(context, transform, content, content.ZLength, scale, undefined, ActiveType.top, activeContext)
    );

    // 添加四个水平方向的移动控件
    const angles = [0, Math.PI * 0.5, Math.PI, -Math.PI * 0.5];
    const directions = [ActiveType.near, ActiveType.far, ActiveType.left, ActiveType.right];

    angles.forEach((angle, index) => {
      this.addChildGizmo(
        new ContentMovement(this.context, transform, angle, content, scale, undefined, directions[index], activeContext)
      );
    });
  }

  /**
   * 添加坐标轴 Gizmo
   */
  private _addCoordinateAxisGizmo(
    context: HSApp.View.Context3D,
    transform: HSApp.Model.Transform,
    content: HSCore.Model.Content | HSCore.Model.Group,
    activeContext?: ActiveContext
  ): void {
    activeContext = activeContext || new ActiveContext();
    this.addChildGizmo(new CoordinateAxis(this.context, transform, content, activeContext));
  }

  /**
   * 添加尺寸标注 Gizmo
   */
  private _addDimension(
    context: HSApp.View.Context3D,
    transform: HSApp.Model.Transform,
    content: HSCore.Model.Content | HSCore.Model.Group
  ): void {
    const isWardrobeMetals = content.contentType?.isTypeOf(HSCatalog.ContentTypeEnum.ext_wardrobeMetals);

    // 定制衣柜内容的尺寸标注
    if (
      HSCore.Util.Content.isCWUniqueContent(content) &&
      context.application.appSettings.getViewItem('contentPrecisionLocation3d')
    ) {
      this.addChildGizmo(new CWContentDimension(context, transform, content));
      return;
    }

    // 衣柜金属件的尺寸标注
    if (isWardrobeMetals) {
      this.addChildGizmo(new CWContentDimension(context, transform, content));
      return;
    }

    // 组件和内容的尺寸标注
    if (content instanceof HSCore.Model.DAssembly || content instanceof HSCore.Model.DContent) {
      if (!isCustomDoor(content)) {
        const proxyObject = content.getProxyObject();
        const door = proxyObject?.getDoor(content);
        this.addChildGizmo(new CWContentDimension(context, transform, content, undefined, door));
      }
      return;
    }

    // 分组的尺寸标注
    if (content instanceof HSCore.Model.Group) {
      const assemblyClasses = [HSConstants.ModelClass.DAssembly, HSConstants.ModelClass.DContent];
      const hasAssemblyMember = content.members?.find((member) => assemblyClasses.includes(member.Class));
      if (hasAssemblyMember) {
        this.addChildGizmo(new CWContentDimension(context, transform, content));
      }
      return;
    }

    // 其他类型内容的尺寸标注
    const showPrecisionLocation = context.application.appSettings.getViewItem('contentPrecisionLocation3d');
    const isSpecialContent =
      content instanceof HSCore.Model.NCustomizedParametricBackgroundWall ||
      content instanceof HSCore.Model.NCPBackgroundWallUnit ||
      content.instanceOf(HSConstants.ModelClass.MeshContent);

    if ((!HSApp.Util.Content.isDiyModel(content) && showPrecisionLocation) || isSpecialContent) {
      this.addChildGizmo(new CWContentDimension(context, transform, content));
    }
  }

  /**
   * 注册空格键快捷键（旋转45度）
   */
  private _registerHotkey(): void {
    HSApp.App.getApp().hotkey.registerHotkey('space', this.onRotate45Deg, {
      description: '旋转模型',
      group: HSFPConstants.LogGroupTypes.ContentOperation,
    });
  }

  /**
   * 注销快捷键
   */
  private _unregisterHotkey(): void {
    this.app.hotkey.unregisterHotkey('space', this.onRotate45Deg, undefined, this.activeEnvironmentId);
    this.app.hotkey.unregisterHotkey('alt+r', this.changeSelectionType, undefined, this.activeEnvironmentId);
  }

  /**
   * 旋转45度（空格键触发）
   */
  private onRotate45Deg(): void {
    const commandManager = this.app.cmdManager;
    const rotateCommand = commandManager.createCommand(HSFPConstants.CommandType.RotateContent, [
      this.content,
      'xy',
      false,
    ]);

    commandManager.execute(rotateCommand);
    commandManager.receive('hotkey', { delta: 45 });
    commandManager.receive('hotkeyend');
    commandManager.complete();
  }
}