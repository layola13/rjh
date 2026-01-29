/**
 * 用于重新定位点的 Gizmo 视图控制器
 * 提供左右两个可编辑的线性尺寸标注，用于精确调整墙体端点位置
 */

import type { Entity } from 'HSCore';
import type { Canvas } from 'HSApp.View';
import type { Command } from 'HSApp.Command';

/**
 * 线性尺寸标注状态枚举
 */
declare enum LinearDimensionStateEnum {
  /** 可编辑状态 */
  editable = 'editable',
  /** 禁用状态 */
  disabled = 'disabled',
  /** 聚焦状态 */
  focus = 'focus'
}

/**
 * 尺寸类型枚举
 */
declare enum DimensionTypeEnum {
  /** 内部尺寸 */
  inner = 'inner',
  /** 中心线尺寸 */
  center = 'center',
  /** 外部尺寸 */
  outer = 'outer'
}

/**
 * 墙体对象接口
 */
interface Wall {
  /** 起点坐标 */
  from: Point;
  /** 终点坐标 */
  to: Point;
  /** 墙体宽度 */
  width: number;
  /** 旋转角度 */
  rotation: number;
  /** 下一段墙体 */
  next?: Wall;
  /** 上一段墙体 */
  prev?: Wall;
}

/**
 * 二维坐标点接口
 */
interface Point {
  x: number;
  y: number;
}

/**
 * 线段定义接口
 */
interface LineSegment {
  /** 起点向量 */
  start: Vec2;
  /** 终点向量 */
  end: Vec2;
}

/**
 * 二维向量类型
 */
interface Vec2 {
  x: number;
  y: number;
  clone(): Vec2;
  scale(factor: number): Vec2;
  add(other: Vec2): Vec2;
  invert(): Vec2;
  normalize(): Vec2;
}

/**
 * 值变化事件数据接口
 */
interface ValueChangeEventData {
  /** 新值 */
  value: number;
  /** 旧值 */
  oldValue: number;
  /** 触发事件的 Gizmo */
  gizmo: LinearDimension;
}

/**
 * 设置变化事件数据接口
 */
interface SettingChangeEventData {
  /** 字段名称 */
  fieldName: string;
  /** 新值 */
  value: unknown;
}

/**
 * 事件对象接口
 */
interface Event<T = unknown> {
  data: T;
}

/**
 * 线性尺寸标注 Gizmo 接口
 */
interface LinearDimension {
  /** 起点位置 */
  start: Vec2;
  /** 终点位置 */
  end: Vec2;
  /** 文本标注位置 */
  textPosition: Vec2;
  /** 旋转角度 */
  rotation: number;
  /** 最小值限制 */
  min: number;
  /** 最大值限制 */
  max: number;
  /** 是否反向显示 */
  inverted: boolean;
  /** 当前状态 */
  state: LinearDimensionStateEnum;
  /** 值变化提交信号 */
  valueChangeCommit: Signal<ValueChangeEventData>;
  /** 输入切换信号 */
  inputSwitching: Signal<void>;
  
  /**
   * 更新状态
   * @param state - 目标状态
   * @param value - 状态值
   */
  updateState(state: LinearDimensionStateEnum, value: boolean): void;
  
  /**
   * 获取当前值
   * @returns 当前尺寸值
   */
  getValue(): number;
}

/**
 * 信号接口（观察者模式）
 */
interface Signal<T = void> {
  listen(callback: (event: Event<T>) => void): void;
}

/**
 * 应用上下文接口
 */
interface AppContext {
  application: {
    /** 应用设置 */
    appSettings: AppSettings;
    /** 事务管理器 */
    transManager: TransactionManager;
    /** 视图激活信号 */
    signalViewActivated: Signal<void>;
    /**
     * 检查视图是否激活
     * @param canvas - 画布对象
     * @returns 是否激活
     */
    isActiveView(canvas: Canvas): boolean;
  };
}

/**
 * 应用设置接口
 */
interface AppSettings {
  /** 尺寸标注类型 */
  dimensionType: DimensionTypeEnum;
  /** 设置值变化信号 */
  signalValueChanged: Signal<SettingChangeEventData>;
}

/**
 * 事务管理器接口
 */
interface TransactionManager {
  /** 撤销操作信号 */
  signalUndone: Signal<void>;
  /** 重做操作信号 */
  signalRedone: Signal<void>;
}

/**
 * 信号钩子管理器接口
 */
interface SignalHook {
  /**
   * 监听信号
   * @param signal - 信号对象
   * @param callback - 回调函数
   * @returns 链式调用的 SignalHook
   */
  listen<T>(signal: Signal<T>, callback: (event: Event<T>) => void): SignalHook;
}

/**
 * 移动点参数接口
 */
interface MovePointParams {
  /** 目标实体 */
  entity: Entity;
  /** 目标位置 */
  position: Vec2;
}

/**
 * 鼠标移动事件数据接口
 */
interface MouseMoveEventData {
  /** 偏移向量 */
  offset: Vec2;
}

/**
 * 鼠标抬起事件数据接口
 */
interface MouseUpEventData {
  /** 关联实体 */
  entity?: Entity;
}

/**
 * 命令管理器接口
 */
interface CommandManager {
  /**
   * 创建命令
   * @param commandType - 命令类型
   * @param params - 命令参数
   * @returns 创建的命令对象
   */
  createCommand(commandType: string, params: unknown[]): Command;
  
  /**
   * 执行命令
   * @param command - 要执行的命令
   */
  execute(command: Command): void;
  
  /**
   * 接收事件
   * @param eventName - 事件名称
   * @param data - 事件数据
   */
  receive(eventName: string, data: unknown): void;
  
  /**
   * 完成命令执行
   */
  complete(): void;
}

/**
 * 重新定位点 Gizmo 类
 * 用于墙体端点的精确定位和尺寸调整
 */
export default class RepositionPointGizmo extends HSApp.View.SVG.Gizmo {
  /** Gizmo 类型标识 */
  readonly type: string = 'hsw.view.svg.gizmo.RepositionPoint';
  
  /** 尺寸标注文本偏移量（屏幕像素） */
  private readonly kDimensionTextOffset: number = 0;
  
  /** 左侧尺寸标注 */
  private leftDim: LinearDimension;
  
  /** 右侧尺寸标注 */
  private rightDim: LinearDimension;
  
  /** 默认激活的尺寸标注 */
  private defaultActiveDim: LinearDimension;
  
  /** 当前激活的尺寸标注 */
  private activeDim?: LinearDimension;
  
  /** Gizmo 脏标记，标识需要重绘 */
  private gizmoDirty: boolean;
  
  /** 尺寸标注类型 */
  private dimensionType: DimensionTypeEnum;
  
  /**
   * 构造函数
   * @param entity - 关联的实体对象
   * @param canvas - 画布对象
   * @param context - 应用上下文
   */
  constructor(entity: Entity, canvas: Canvas, context: AppContext);
  
  /**
   * 激活时的回调
   * 初始化事件监听和子 Gizmo
   */
  protected onActivate(): void;
  
  /**
   * 停用时的回调
   * 清理所有事件监听
   */
  protected onDeactivate(): void;
  
  /**
   * 清理时的回调
   * 释放所有引用
   */
  protected onCleanup(): void;
  
  /**
   * 获取可编辑的墙体段
   * @returns 包含两段共线墙体的数组，如果不符合条件则返回 undefined
   */
  private _getEditableWalls(): [Wall, Wall] | undefined;
  
  /**
   * 更新 Gizmo 状态
   * 根据视图激活状态显示或隐藏
   */
  update(): void;
  
  /**
   * 绘制 Gizmo
   * 如果脏标记为 true，则更新子 Gizmo
   */
  draw(): void;
  
  /**
   * 更新子 Gizmo 的位置和状态
   * 计算左右尺寸标注的起止点、文本位置等属性
   */
  private _updateChildGizmo(): void;
  
  /**
   * 设置激活的尺寸标注
   * @param dimension - 要激活的尺寸标注
   */
  setActiveDimension(dimension: LinearDimension): void;
  
  /**
   * 设置变化事件处理器
   * @param event - 设置变化事件
   */
  private _onSettingChanged(event: Event<SettingChangeEventData>): void;
  
  /**
   * 值变化提交事件处理器
   * @param event - 值变化事件
   */
  private _onValueChangeCommit(event: Event<ValueChangeEventData>): void;
  
  /**
   * 输入切换事件处理器
   * 在左右尺寸标注之间切换焦点
   * @param event - 输入切换事件
   */
  private _onInputSwitching(event: Event<void>): void;
}

/**
 * 重新定位点显示控制器
 * 负责处理用户交互并执行墙体端点移动命令
 */
declare class RepositionPointDisplayController extends HSApp.View.Base.DisplayController {
  /** 命令管理器 */
  private _cmdMgr: CommandManager;
  
  /**
   * 构造函数
   * @param entity - 关联的实体对象
   * @param canvas - 画布对象
   */
  constructor(entity: Entity, canvas: Canvas);
  
  /**
   * 分发事件
   * @param eventName - 事件名称
   * @param entity - 关联实体
   * @param event - 事件对象
   */
  dispatch(eventName: string, entity: Entity, event: Event<ValueChangeEventData>): void;
  
  /**
   * 移动点事件处理器
   * 执行墙体端点的移动命令
   * @param eventName - 事件名称
   * @param entity - 关联实体
   * @param event - 事件对象
   */
  private _movePointHandler(eventName: string, entity: Entity, event: Event<ValueChangeEventData>): void;
}

export { RepositionPointDisplayController };