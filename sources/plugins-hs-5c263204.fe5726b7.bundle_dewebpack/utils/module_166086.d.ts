/**
 * 普通窗户标注控制器
 * 用于处理窗户的尺寸标注、编辑和交互逻辑
 */

import { HSApp } from './app';
import { HSCore } from './core';
import { HSFPConstants } from './constants';

/**
 * 二维向量接口
 */
interface Vec2 {
  x: number;
  y: number;
  magnitude(): number;
  normalize(): Vec2;
  clone(): Vec2;
  scale(factor: number): Vec2;
  add(other: Vec2): Vec2;
}

/**
 * 标注尺寸数据接口
 */
interface DimensionData {
  /** 标注起点 */
  start: Vec2;
  /** 标注终点 */
  end: Vec2;
  /** 文本显示位置 */
  textPosition: Vec2;
  /** 最小值限制 */
  min: number;
  /** 最大值限制 */
  max: number;
  /** 是否无效 */
  invalid: boolean;
  /** 是否反转显示 */
  inverted: boolean;
}

/**
 * 计算出的所有标注数据
 */
interface ComputedDimensionData {
  /** 左侧标注 */
  left: DimensionData;
  /** 右侧标注 */
  right: DimensionData;
  /** 角B标注 */
  corenerBDim: DimensionData;
}

/**
 * 墙体尺寸信息
 */
interface WallDimension {
  from: Vec2;
  to: Vec2;
  walls: Array<HSCore.Model.Wall>;
}

/**
 * 侧边范围数据
 */
interface SideRangeData {
  sideBRange: {
    min: number;
    max: number;
  };
}

/**
 * 相邻点信息
 */
interface AdjacentPointInfo {
  start: Vec2;
  end: Vec2;
  insideOthersOverlap: boolean;
}

/**
 * 值变更事件数据
 */
interface ValueChangeEventData {
  /** 变更的标注控件 */
  gizmo: HSApp.View.SVG.LinearDimension;
  /** 新值 */
  value: number;
  /** 旧值 */
  oldValue: number;
}

/**
 * 设置变更事件数据
 */
interface SettingChangeEventData {
  fieldName: string;
  value: unknown;
}

/**
 * 普通窗户尺寸标注控件
 * 管理窗户的左侧、右侧和角B三个方向的尺寸标注
 */
declare class POrdinaryWindowDimension extends HSApp.View.SVG.Gizmo {
  /** 控件类型标识 */
  readonly type: 'hsw.view.svg.gizmo.POrdinaryWindowDimension';
  
  /** 标注偏移距离（像素） */
  private readonly kDimensionOffset: 24;
  
  /** 标注文本偏移距离（像素） */
  private readonly kDimensionTextOffset: 0;
  
  /** 控制器实例 */
  controller: POrdinaryWindowDimensionController;
  
  /** 左侧标注 */
  leftDim: HSApp.View.SVG.LinearDimension;
  
  /** 右侧标注 */
  rightDim: HSApp.View.SVG.LinearDimension;
  
  /** 角B标注 */
  corenerBDim: HSApp.View.SVG.LinearDimension;
  
  /** 当前激活的标注 */
  activeDim?: HSApp.View.SVG.LinearDimension;
  
  /** 标注是否需要更新 */
  gizmoDirty: boolean;
  
  /** 标注类型（内侧/中心/外侧） */
  dimensionType: HSApp.App.DimensionTypeEnum;
  
  /**
   * 构造函数
   * @param context - 应用上下文
   * @param signalHub - 信号中心
   * @param entity - 关联的窗户实体
   */
  constructor(
    context: HSApp.Context,
    signalHub: HSApp.SignalHub,
    entity: HSCore.Model.Window
  );
  
  /**
   * 控件激活时的回调
   * 设置事件监听和初始化状态
   */
  onActivate(): void;
  
  /**
   * 控件停用时的回调
   * 清理所有事件监听
   */
  onDeactivate(): void;
  
  /**
   * 控件清理时的回调
   * 释放子控件引用
   */
  onCleanup(): void;
  
  /**
   * 更新控件状态
   * 根据实体状态决定显示或隐藏
   */
  update(): void;
  
  /**
   * 绘制控件
   * 当gizmoDirty为true时更新子控件
   */
  draw(): void;
  
  /**
   * 设置当前激活的标注
   * @param dimension - 要激活的标注控件
   */
  setActiveDimension(dimension: HSApp.View.SVG.LinearDimension): void;
  
  /**
   * 查找参考墙体
   * @returns 窗户所在的墙体，如果不存在则返回undefined
   */
  findReferenceWall(): HSCore.Model.Wall | undefined;
  
  /**
   * 处理应用设置变更
   * @param event - 设置变更事件
   */
  private _onSettingChanged(event: { data: SettingChangeEventData }): void;
  
  /**
   * 处理标注值变更提交
   * @param event - 值变更事件
   */
  private _onValueChangeCommit(event: { data: ValueChangeEventData }): void;
  
  /**
   * 处理标注输入切换（Tab键切换）
   */
  private _onInputSwitching(): void;
  
  /**
   * 更新子标注控件的位置和状态
   */
  private _updateChildGizmo(): void;
  
  /**
   * 计算标注数据
   * @param wall - 参考墙体
   * @returns 计算出的标注数据，如果计算失败返回undefined
   */
  private _computeDimensionData(wall: HSCore.Model.Wall): ComputedDimensionData | undefined;
}

/**
 * 普通窗户标注控制器
 * 处理标注控件的交互命令
 */
declare class POrdinaryWindowDimensionController extends HSApp.View.Base.DisplayController {
  /** 关联的标注控件 */
  gizmo: POrdinaryWindowDimension;
  
  /** 当前编辑命令 */
  private _editCmd?: HSApp.Command;
  
  /** 当前移动命令 */
  private _moveCmd?: HSApp.Command;
  
  /**
   * 构造函数
   * @param context - 应用上下文
   * @param signalHub - 信号中心
   * @param gizmo - 关联的标注控件
   */
  constructor(
    context: HSApp.Context,
    signalHub: HSApp.SignalHub,
    gizmo: POrdinaryWindowDimension
  );
  
  /**
   * 分发命令
   * @param action - 命令类型（'editpordinaryWindow' | 'editLocationDimension'）
   * @param entity - 窗户实体
   * @param event - 事件数据
   */
  dispatch(
    action: string,
    entity: HSCore.Model.Window,
    event: { data: ValueChangeEventData }
  ): void;
}

export default POrdinaryWindowDimension;
export { POrdinaryWindowDimensionController };