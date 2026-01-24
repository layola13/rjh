/**
 * 空间划分命令模块
 * 用于在楼层平面图中通过绘制路径来划分区域
 */

import { DivideSpace } from './gizmo/DivideSpace';
import { Arc2d, Arc3d, Line2d, Vector2, MathAlg } from './math';
import { HSCore } from './core';

/**
 * 空间划分命令
 * 允许用户通过交互式绘制路径来分割现有空间区域
 */
export class CmdDivideSpace extends HSApp.Cmd.Command {
  /** 应用实例 */
  private readonly app: HSApp.Application;
  
  /** 当前操作的楼层对象 */
  private readonly floor: HSApp.Model.Floor;
  
  /** 划分空间的交互式Gizmo控件 */
  private gizmo?: DivideSpace;
  
  /** 提示信息是否正在显示 */
  private _isToastShow: boolean = false;

  /**
   * 创建空间划分命令实例
   * @param app - 应用程序实例
   * @param floor - 要操作的楼层对象
   */
  constructor(app: HSApp.Application, floor: HSApp.Model.Floor) {
    super();
    this.app = app;
    this.floor = floor;
  }

  /**
   * 命令执行时的回调
   * 检查楼层状态、自定义模型，并创建划分空间的Gizmo
   */
  onExecute(): void {
    // 确保楼层有主空间
    if (!this.floor.getMaster()) {
      return;
    }

    const storage = new HSApp.Util.Storage('hsw.plugin.roomproperty');
    
    // 如果已经显示过自定义模型提示，直接创建Gizmo
    if (storage.get('has_customized_model')) {
      this._showToast();
      this._createGizmo();
      return;
    }

    // 检查是否存在自定义模型或草图
    const hasCustomizedModel = this.floor.spaceInfos.some(spaceInfo =>
      spaceInfo.allFaces.some(face =>
        Object.values(face.contents).some(content =>
          content instanceof HSCore.Model.CustomizedFeatureModel ||
          content instanceof HSCore.Model.NCustomizedSketchModel
        )
      )
    );

    // 如果存在自定义模型，显示警告提示
    if (hasCustomizedModel) {
      LiveHint.show(
        ResourceManager.getString('floor_contextmenu_dividespace_lint_live'),
        8000,
        () => {
          LiveHint.hide();
          storage.set('has_customized_model', true);
        },
        {
          append: ResourceManager.getString('floor_contextmenu_dividespace_lint_live_append'),
          canclose: true,
          onClose: () => {
            this._showToast();
          }
        }
      );
    }

    this._createGizmo();
  }

  /**
   * 命令清理时的回调
   * 销毁Gizmo并隐藏提示信息
   */
  onCleanup(): void {
    this._destroyGizmo();
    this._hideToast();
    super.onCleanup();
  }

  /**
   * 指示此命令是否可以撤销/重做
   * @returns false - 此命令不支持撤销/重做
   */
  canUndoRedo(): boolean {
    return false;
  }

  /**
   * 命令完成时的内部处理
   */
  private _onComplete(): void {
    this.mgr.complete();
  }

  /**
   * 命令取消时的内部处理
   */
  private _onCancel(): void {
    this.mgr.cancel();
  }

  /**
   * 验证是否可以划分空间
   * @param path - 用户绘制的路径点数组
   * @param firstEdges - 起始边缘数组
   * @param lastEdges - 结束边缘数组
   * @returns 是否可以执行划分操作
   */
  private _canDivideSpace(
    path: Vector2[],
    firstEdges: HSApp.Model.Edge[],
    lastEdges: HSApp.Model.Edge[]
  ): boolean {
    // 验证边缘和路径的基本要求
    if (firstEdges.length < 1 || lastEdges.length < 1) {
      return false;
    }

    if (path.length < 2) {
      return false;
    }

    // 如果路径只有两个点，检查是否与现有边缘共线
    if (path.length < 3) {
      const overlappingEdge = firstEdges.find(edge => lastEdges.includes(edge));
      if (overlappingEdge) {
        const isSameLine = HSCore.Util.Math.isSameLine(
          path[0],
          path[1],
          overlappingEdge.from,
          overlappingEdge.to
        );
        if (isSameLine) {
          return false;
        }
      }
    }

    return true;
  }

  /**
   * 接收来自Gizmo或其他组件的消息
   * @param eventType - 事件类型
   * @param data - 事件数据
   * @returns 是否处理了该消息
   */
  onReceive(eventType: string, data: DivideSpaceEventData): boolean {
    if (eventType === 'gizmo.dividespace') {
      const { path, firstEdges, lastEdges } = data;

      // 验证路径有效性
      if (!path || path.length < 2) {
        this._onCancel();
        return true;
      }

      // 检查是否可以划分空间
      if (!this._canDivideSpace(path, firstEdges, lastEdges)) {
        this._onCancel();
        return true;
      }

      // 复制路径并调整弧线端点
      const adjustedPath = [...path];
      const firstCurve = firstEdges[0].curve;
      const lastCurve = lastEdges[0].curve;

      // 处理起始点位于弧线上的情况
      if (firstCurve instanceof Arc3d) {
        const arc2d = Arc2d.makeArcByThreePoints(
          firstCurve.getStartPt(),
          firstCurve.getMidPt(),
          firstCurve.getEndPt()
        );
        const closestPoint = Vector2.O();
        MathAlg.CalculateDistance.pointToCurve2d(adjustedPath[0], arc2d, closestPoint);
        adjustedPath[0] = closestPoint;
      }

      // 处理结束点位于弧线上的情况
      if (lastCurve instanceof Arc3d) {
        const arc2d = Arc2d.makeArcByThreePoints(
          lastCurve.getStartPt(),
          lastCurve.getMidPt(),
          lastCurve.getEndPt()
        );
        const closestPoint = Vector2.O();
        MathAlg.CalculateDistance.pointToCurve2d(
          adjustedPath[adjustedPath.length - 1],
          arc2d,
          closestPoint
        );
        adjustedPath[adjustedPath.length - 1] = closestPoint;
      }

      // 将路径转换为线段数组
      const lines: Line2d[] = [];
      for (let i = 1; i < adjustedPath.length; i++) {
        lines.push(new Line2d(new Vector2(adjustedPath[i - 1]), new Vector2(adjustedPath[i])));
      }

      // 创建并提交空间分割请求
      const parentSpace = this.floor.getUniqueParent();
      const request = HSApp.App.getApp().transManager.createRequest(
        HSFPConstants.RequestType.SplitSpace,
        [parentSpace, lines, this.floor]
      );
      HSApp.App.getApp().transManager.commit(request);

      this._onComplete();
      return true;
    }

    return super.onReceive(eventType, data);
  }

  /**
   * 创建用于划分空间的交互式Gizmo控件
   */
  private _createGizmo(): void {
    const view2D = this.context.app.getActive2DView();
    const gizmoManager = view2D.gizmoManager;

    this.gizmo = new DivideSpace(view2D.context, view2D.displayLayers.temp, this);
    gizmoManager.addGizmo(this.gizmo);
    this.gizmo.setFloor(this.floor);
  }

  /**
   * 销毁Gizmo控件并清理资源
   */
  private _destroyGizmo(): void {
    if (!this.gizmo) {
      return;
    }

    this.context.app.getActive2DView().gizmoManager.removeGizmo(this.gizmo);
    this.gizmo.onCleanup();
    this.gizmo = undefined;
  }

  /**
   * 显示正交模式提示信息
   */
  private _showToast(): void {
    const storage = new HSApp.Util.Storage('hsw.plugin.roomproperty');

    // 如果已显示过该提示，则跳过
    if (storage.get('has_dividespace_orth_tip')) {
      return;
    }

    this._isToastShow = true;
    LiveHint.show(
      ResourceManager.getString('floor_dividespace_orth_tip'),
      0, // 0表示不自动关闭
      () => {
        LiveHint.hide();
        storage.set('has_dividespace_orth_tip', true);
      },
      {
        append: ResourceManager.getString('floor_contextmenu_dividespace_lint_live_append'),
        canclose: true,
        onClose: () => {
          this._isToastShow = false;
        }
      }
    );
  }

  /**
   * 隐藏当前显示的提示信息
   */
  private _hideToast(): void {
    if (this._isToastShow) {
      LiveHint.hide();
      this._isToastShow = false;
    }
  }

  /**
   * 指示命令是否可以被挂起
   * @returns false - 此命令不支持挂起
   */
  canSuspend(): boolean {
    return false;
  }

  /**
   * 指示命令是否为交互式命令
   * @returns true - 此命令需要用户交互
   */
  isInteractive(): boolean {
    return true;
  }

  /**
   * 获取命令的描述文本
   * @returns 命令描述
   */
  getDescription(): string {
    return '划分区域';
  }
}

/**
 * 划分空间事件数据接口
 */
interface DivideSpaceEventData {
  /** 用户绘制的路径点数组 */
  path: Vector2[];
  /** 路径起始处的边缘数组 */
  firstEdges: HSApp.Model.Edge[];
  /** 路径结束处的边缘数组 */
  lastEdges: HSApp.Model.Edge[];
}