/**
 * 重新定位轮廓点的Gizmo控制器
 * 用于在SVG视图中交互式调整轮廓顶点位置
 */

import { Vec2, Coordinate } from './math-types';
import { Entity, Coedge, Point as CorePoint } from './core-types';
import { LinearDimension, LinearDimensionStateEnum } from './linear-dimension';
import { Gizmo } from './gizmo';
import { DisplayController } from './display-controller';
import { Canvas } from './canvas';
import { Context } from './context';
import { Signal, SignalHook } from './signal';
import { Command, CommandManager } from './command';

/** 默认墙体宽度常量 */
const DEFAULT_WALL_WIDTH = -1; // 从 HSConstants.Constants.DEFAULT_WALL_WIDTH 提取

/** 最小尺寸值 */
const MIN_DIMENSION_VALUE = 0.001;

/**
 * 线段数据结构
 */
interface LineSegment {
  /** 起点向量 */
  start: Vec2;
  /** 终点向量 */
  end: Vec2;
}

/**
 * 设置变更事件数据
 */
interface SettingChangedEventData {
  /** 字段名称 */
  fieldName: string;
  /** 新值 */
  value: unknown;
}

/**
 * 值变更事件数据
 */
interface ValueChangeEventData {
  /** 新值 */
  value: number;
  /** 旧值 */
  oldValue: number;
  /** 关联的Gizmo */
  gizmo?: LinearDimension;
}

/**
 * 尺寸输入切换事件数据
 */
interface InputSwitchingEventData {
  /** 事件源Gizmo */
  source: LinearDimension;
}

/**
 * 重新定位轮廓点的Gizmo
 * 提供左右两个可编辑的线性尺寸，用于精确调整轮廓顶点位置
 */
export class RepositionProfilePoint extends Gizmo {
  /** Gizmo类型标识 */
  readonly type = 'hsw.view.svg.gizmo.RepositionProfilePoint';

  /** 尺寸文本偏移量（屏幕单位） */
  private readonly kDimensionTextOffset = 0;

  /** 左侧尺寸标注 */
  private leftDim: LinearDimension;

  /** 右侧尺寸标注 */
  private rightDim: LinearDimension;

  /** 默认激活的尺寸标注 */
  private defaultActiveDim: LinearDimension;

  /** 当前激活的尺寸标注 */
  private activeDim?: LinearDimension;

  /** Gizmo是否需要更新 */
  private gizmoDirty: boolean = true;

  /** 尺寸标注类型 */
  private dimensionType: unknown;

  /**
   * 创建重新定位轮廓点的Gizmo
   * @param canvas - SVG画布实例
   * @param context - 视图上下文
   * @param entity - 关联的轮廓点实体
   */
  constructor(canvas: Canvas, context: Context, entity: CorePoint) {
    const controller = new RepositionProfilePointController(entity, canvas);
    super(canvas, context, entity, controller);

    // 初始化左右尺寸标注
    this.leftDim = new LinearDimension(canvas, context, entity);
    this.rightDim = new LinearDimension(canvas, context, entity);

    // 设置为可编辑状态
    this.leftDim.updateState(LinearDimensionStateEnum.editable, true);
    this.rightDim.updateState(LinearDimensionStateEnum.editable, true);

    // 添加为子Gizmo
    this.addChildGizmo(this.leftDim);
    this.addChildGizmo(this.rightDim);

    this.defaultActiveDim = this.leftDim;

    // 从应用设置中获取尺寸类型
    const appSettings = canvas.application.appSettings;
    this.defineField('dimensionType', appSettings.dimensionType);

    this.gizmoDirty = true;
  }

  /**
   * 激活时的回调
   * 注册事件监听器并初始化状态
   */
  onActivate(): void {
    this.update();

    // 监听实体变更信号
    this.signalHook.listen(this.entity.signalDirty, () => {
      this.update();
    });

    // 监听撤销/重做事件
    const updateHandler = () => {
      this.update();
    };

    const application = this.context.application;
    const transactionManager = application.transManager;
    const appSettings = application.appSettings;

    this.signalHook
      .listen(transactionManager.signalUndone, updateHandler)
      .listen(transactionManager.signalRedone, updateHandler)
      .listen(appSettings.signalValueChanged, this._onSettingChanged.bind(this));

    // 监听子Gizmo的事件
    this.childItems.forEach((childGizmo: LinearDimension) => {
      this.signalHook
        .listen(childGizmo.valueChangeCommit, this._onValueChangeCommit.bind(this))
        .listen(childGizmo.inputSwitching, this._onInputSwitching.bind(this));
    });

    // 监听视图激活事件
    this.signalHook.listen(application.signalViewActivated, () => {
      this.update();
    });

    this.setActiveDimension(this.defaultActiveDim);

    super.onActivate();
  }

  /**
   * 停用时的回调
   * 清理所有事件监听器
   */
  onDeactivate(): void {
    this.unlistenAllEvents();
    super.onDeactivate();
  }

  /**
   * 清理资源
   */
  onCleanup(): void {
    this.leftDim = undefined!;
    this.rightDim = undefined!;
    this.defaultActiveDim = undefined!;
    super.onCleanup();
  }

  /**
   * 获取可编辑的共边（Coedge）列表
   * @returns 包含两个共边的数组，如果不符合编辑条件则返回undefined
   */
  private _getEditableCoedges(): Coedge[] | undefined {
    const parentEdges = HSCore.Util.Point.getParentEdges(this.entity);
    const coedges: Coedge[] = [];

    // 收集所有共边及其伙伴边
    parentEdges.forEach((edge) => {
      if (edge.coedge) {
        coedges.push(edge.coedge);
        if (edge.coedge.partner) {
          coedges.push(edge.coedge.partner);
        }
      }
    });

    // 检查是否为同一直线上的两个共边
    if (
      coedges.length === 2 &&
      HSCore.Util.Math.isSameLine(
        coedges[0].from,
        coedges[0].to,
        coedges[1].from,
        coedges[1].to
      )
    ) {
      const result: Coedge[] = [];
      const firstCoedge = coedges[0];

      // 确定共边的顺序
      if (HSCore.Util.Math.isSamePoint(firstCoedge.to, this.entity)) {
        if (firstCoedge.next) {
          result.push(firstCoedge, firstCoedge.next);
        } else {
          result.push(firstCoedge, coedges[1]);
        }
      } else {
        if (firstCoedge.prev) {
          result.push(firstCoedge.prev, firstCoedge);
        } else {
          result.push(coedges[1], firstCoedge);
        }
      }

      return result;
    }

    return undefined;
  }

  /**
   * 更新Gizmo状态
   * 根据当前视图激活状态决定显示或隐藏
   */
  update(): void {
    if (
      this.context &&
      this.context.application.isActiveView(this.canvas)
    ) {
      this.show();
      this.gizmoDirty = true;
      this.dirty = true;
    } else {
      this.hide();
    }
  }

  /**
   * 绘制Gizmo
   * 如果标记为脏，则更新子Gizmo
   */
  draw(): void {
    if (this.gizmoDirty) {
      this._updateChildGizmo();
      this.gizmoDirty = false;
    }
    super.draw();
  }

  /**
   * 更新子Gizmo（左右尺寸标注）的位置和属性
   */
  private _updateChildGizmo(): void {
    const modelToScreenFactor = HSApp.View.SVG.Util.ModelToScreenFactor(this.context);
    const wallWidthOffset = DEFAULT_WALL_WIDTH;
    const textOffsetInModel = this.kDimensionTextOffset / modelToScreenFactor;

    const editableCoedges = this._getEditableCoedges();
    if (!editableCoedges) {
      return;
    }

    // 构建线段数据
    const segments: LineSegment[] = [];
    const allValid = editableCoedges.every((coedge) => {
      const start = HSCore.Util.Math.Vec2.fromCoordinate(coedge.from);
      const end = HSCore.Util.Math.Vec2.fromCoordinate(coedge.to);
      segments.push({ start, end });
      return true;
    });

    if (!allValid) {
      return;
    }

    // 计算法向量用于偏移
    const edgeDirection = HSCore.Util.Math.Vec2.difference(
      segments[0].end,
      segments[0].start
    );
    const normalVector = HSCore.Util.Math.Vec2.fromCoordinate({
      x: -edgeDirection.y,
      y: edgeDirection.x,
    }).normalize();

    const wallOffset = normalVector.clone().scale(wallWidthOffset);
    const textOffset = normalVector.clone().scale(textOffsetInModel);

    const rotation = editableCoedges[0].rotation;

    // 计算总长度作为最大值
    const totalLength = segments.reduce((sum, segment) => {
      return sum + HSCore.Util.Math.Vec2.distance(segment.end, segment.start);
    }, 0);

    // 更新左右尺寸标注
    const dimensions = [this.leftDim, this.rightDim];
    for (let i = 0; i < dimensions.length; i++) {
      const segment = segments[i];
      const dimension = dimensions[i];

      const startPoint = HSCore.Util.Math.Vec2.fromCoordinate(segment.start);
      const endPoint = HSCore.Util.Math.Vec2.fromCoordinate(segment.end);
      const midPoint = HSCore.Util.Math.Vec2.lerp(startPoint, endPoint, 0.5);

      // 应用偏移
      startPoint.add(wallOffset);
      endPoint.add(wallOffset);
      midPoint.add(wallOffset).add(textOffset);

      // 设置尺寸标注属性
      dimension.start = startPoint;
      dimension.end = endPoint;
      dimension.textPosition = midPoint;
      dimension.rotation = rotation;
      dimension.min = MIN_DIMENSION_VALUE;
      dimension.max = totalLength;

      // 确定是否需要反转显示
      const segmentVector = HSCore.Util.Math.Vec2.difference(endPoint, startPoint);
      const dotProduct = HSCore.Util.Math.Vec2.dot(edgeDirection, segmentVector);
      dimension.inverted = dotProduct < 0;
    }
  }

  /**
   * 设置当前激活的尺寸标注
   * @param dimension - 要激活的尺寸标注
   */
  setActiveDimension(dimension: LinearDimension): void {
    if (
      dimension.state !== LinearDimensionStateEnum.disabled &&
      dimension !== this.activeDim
    ) {
      this.activeDim = dimension;

      // 更新所有子Gizmo的焦点状态
      for (const childItem of this.childItems) {
        const isFocused = childItem === this.activeDim;
        (childItem as LinearDimension).updateState(
          LinearDimensionStateEnum.focus,
          isFocused
        );
      }
    }
  }

  /**
   * 应用设置变更事件处理器
   * @param event - 设置变更事件
   */
  private _onSettingChanged(event: { data: SettingChangedEventData }): void {
    if (event.data.fieldName === 'dimensionType') {
      this.dimensionType = event.data.value;
      this.update();
    }
  }

  /**
   * 值变更提交事件处理器
   * @param event - 值变更事件
   */
  private _onValueChangeCommit(event: { data: ValueChangeEventData }): void {
    // 忽略近似相等的值变更
    if (HSCore.Util.Math.nearlyEquals(event.data.value, event.data.oldValue)) {
      return;
    }

    this.controller.dispatch('valueChanged', this.entity, event);
    this.update();
  }

  /**
   * 输入切换事件处理器
   * 在左右尺寸标注之间切换焦点
   * @param event - 输入切换事件
   */
  private _onInputSwitching(event: { data: InputSwitchingEventData }): void {
    if (!this.activeDim) {
      return;
    }

    const dimensions = [this.leftDim, this.rightDim];
    const currentIndex = dimensions.indexOf(this.activeDim);

    if (currentIndex === -1) {
      return;
    }

    const nextIndex = (currentIndex + 1) % dimensions.length;
    this.setActiveDimension(dimensions[nextIndex]);
  }
}

/**
 * 重新定位轮廓点的控制器
 * 处理点移动操作的命令分发
 */
export class RepositionProfilePointController extends DisplayController {
  /** 命令管理器 */
  private _cmdMgr: CommandManager;

  /**
   * 创建控制器实例
   * @param entity - 关联的实体
   * @param canvas - SVG画布实例
   */
  constructor(entity: Entity, canvas: Canvas) {
    super(entity, canvas);
    this._cmdMgr = canvas.application.commandManager;
  }

  /**
   * 分发事件到处理器
   * @param eventType - 事件类型
   * @param entity - 目标实体
   * @param event - 事件对象
   */
  dispatch(
    eventType: string,
    entity: Entity,
    event: { data: ValueChangeEventData }
  ): void {
    if (event.data.gizmo) {
      this._movePointHandler(eventType, entity, event);
    }
  }

  /**
   * 处理点移动操作
   * @param eventType - 事件类型
   * @param entity - 目标实体
   * @param event - 事件对象
   */
  private _movePointHandler(
    eventType: string,
    entity: Entity,
    event: { data: ValueChangeEventData }
  ): void {
    if (eventType !== 'valueChanged') {
      return;
    }

    const gizmo = event.data.gizmo;
    if (!gizmo) {
      return;
    }

    const point = this.entity as CorePoint;

    // 计算移动方向
    const direction = HSCore.Util.Math.Vec2.difference(
      gizmo.end,
      gizmo.start
    ).normalize();

    if (gizmo.inverted) {
      direction.invert();
    }

    // 根据点到起点和终点的距离判断方向
    const distanceToStart = HSCore.Util.Math.Vec2.distance(point, gizmo.start);
    const distanceToEnd = HSCore.Util.Math.Vec2.distance(point, gizmo.end);
    if (distanceToStart < distanceToEnd) {
      direction.invert();
    }

    // 创建并执行移动命令
    const moveCommand = this._cmdMgr.createCommand(
      'hsw.cmd.layer.CmdMoveSlabProfileVertex',
      [entity]
    );
    moveCommand.showGizmo = false;
    this._cmdMgr.execute(moveCommand);

    // 计算偏移量
    const newValue = event.data.value;
    const currentValue = gizmo.getValue();
    const offset = direction.clone().scale(newValue - currentValue);

    // 模拟鼠标移动和释放
    this._cmdMgr.receive('gizmo.mousemove', { offset });
    this._cmdMgr.receive('gizmo.mouseup', { entity: undefined });
  }
}