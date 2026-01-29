/**
 * 自定义墙体附着模型尺寸标注 Gizmo
 * 用于在 SVG 视图中显示和编辑附着在墙体上的模型的左右尺寸标注
 */

import type { Entity } from './Entity';
import type { Context } from './Context';
import type { Container } from './Container';
import type { Signal } from './Signal';
import type { Command } from './Command';
import type { AppSettings } from './AppSettings';
import type { Application } from './Application';
import type { Wall } from './Wall';

/**
 * 线性尺寸标注 Gizmo 类型
 */
declare class LinearDimension extends HSApp.View.SVG.Gizmo {
  start: Vec2;
  end: Vec2;
  textPosition: Vec2;
  rotation: number;
  min: number;
  max: number;
  inverted: boolean;
  state: LinearDimensionState;
  
  valueChangeCommit: Signal<DimensionValueChangeEvent>;
  inputSwitching: Signal<void>;
  
  constructor(entity: Entity, context: Context, container: Container);
  
  updateState(state: LinearDimensionState, value: boolean): void;
  getValue(): number;
}

/**
 * 线性尺寸标注状态枚举
 */
declare enum LinearDimensionState {
  /** 可编辑状态 */
  editable = 'editable',
  /** 禁用状态 */
  disabled = 'disabled',
  /** 聚焦状态 */
  focus = 'focus',
  /** 无效状态 */
  invalid = 'invalid'
}

/**
 * 尺寸值变化事件数据
 */
interface DimensionValueChangeEvent {
  data: {
    /** 当前值 */
    value: number;
    /** 旧值 */
    oldValue: number;
    /** 关联的 Gizmo */
    gizmo: LinearDimension;
  };
}

/**
 * 设置变化事件数据
 */
interface SettingChangedEvent {
  data: {
    /** 字段名 */
    fieldName: string;
    /** 新值 */
    value: unknown;
  };
}

/**
 * 命令事件数据
 */
interface CommandEvent {
  data: {
    cmd: Command;
  };
}

/**
 * 二维向量
 */
interface Vec2 {
  x: number;
  y: number;
  
  clone(): Vec2;
  add(other: Vec2): Vec2;
  scale(scalar: number): Vec2;
  normalize(): Vec2;
  magnitude(): number;
}

/**
 * 坐标点
 */
interface Coordinate {
  x: number;
  y: number;
}

/**
 * 墙体尺寸数据
 */
interface WallDimension {
  from: Coordinate;
  to: Coordinate;
}

/**
 * 尺寸标注数据
 */
interface DimensionData {
  /** 起点 */
  start: Coordinate;
  /** 终点 */
  end: Coordinate;
  /** 最小值 */
  min: number;
  /** 最大值 */
  max: number;
  /** 是否无效 */
  invalid?: boolean;
}

/**
 * 尺寸计算结果
 */
interface ComputedDimensionData {
  /** 左侧尺寸数据 */
  left: DimensionData;
  /** 右侧尺寸数据 */
  right: DimensionData;
}

/**
 * 移动参数选项
 */
interface MoveOptions {
  /** 是否启用墙体吸附 */
  wallSnapEnable: boolean;
  /** 是否启用天花板吸附 */
  ceilingSnapEnable: boolean;
  /** 是否启用自动适配方向 */
  autoFitDirectionEnable: boolean;
}

/**
 * 自定义墙体附着模型尺寸标注 Gizmo
 * 提供左右两个可编辑的尺寸标注，用于调整模型在墙体上的位置
 */
declare class CustomizedWallAttachedModelDimension extends HSApp.View.SVG.Gizmo {
  readonly type: 'hsw.view.svg.gizmo.CustomizedWallAttachedModelDimension';
  
  /** 左侧尺寸标注 */
  leftDim: LinearDimension;
  
  /** 右侧尺寸标注 */
  rightDim: LinearDimension;
  
  /** 当前激活的尺寸标注 */
  activeDim: LinearDimension | null;
  
  /** 默认激活的尺寸标注 */
  defaultActiveDim: LinearDimension | null;
  
  /** 尺寸标注类型 */
  dimensionType: string;
  
  /** Gizmo 是否需要更新 */
  gizmoDirty: boolean;
  
  /** 控制器 */
  controller: CustomizedWallAttachedModelDimensionController;
  
  /**
   * 构造函数
   * @param entity - 关联的实体对象
   * @param context - 上下文对象
   * @param container - 容器对象
   */
  constructor(entity: Entity, context: Context, container: Container);
  
  /**
   * 激活时调用
   * 初始化事件监听和子 Gizmo
   */
  onActivate(): void;
  
  /**
   * 停用时调用
   * 清理所有事件监听
   */
  onDeactivate(): void;
  
  /**
   * 清理时调用
   * 释放资源
   */
  onCleanup(): void;
  
  /**
   * 更新 Gizmo 状态
   * 标记为脏数据，触发重绘
   */
  update(): void;
  
  /**
   * 绘制 Gizmo
   * 如果有脏数据则更新子 Gizmo
   */
  draw(): void;
  
  /**
   * 设置当前激活的尺寸标注
   * @param dimension - 要激活的尺寸标注
   */
  setActiveDimension(dimension: LinearDimension | null): void;
  
  /**
   * 应用设置变化事件处理
   * @param event - 设置变化事件
   */
  private _onSettingChanged(event: SettingChangedEvent): void;
  
  /**
   * 尺寸值变化提交事件处理
   * @param event - 尺寸值变化事件
   */
  private _onValueChangeCommit(event: DimensionValueChangeEvent): void;
  
  /**
   * 输入切换事件处理
   * 在左右尺寸标注之间切换焦点
   */
  private _onInputSwitching(): void;
  
  /**
   * 更新子 Gizmo 的位置和状态
   * 根据墙体和实体位置计算尺寸标注的显示位置
   */
  private _updateChildGizmo(): void;
  
  /**
   * 计算尺寸标注数据
   * @param wallStart - 墙体起点向量
   * @param wallEnd - 墙体终点向量
   * @returns 左右尺寸标注的计算数据，如果计算失败返回 undefined
   */
  private _computeDimensionData(
    wallStart: Vec2,
    wallEnd: Vec2
  ): ComputedDimensionData | undefined;
  
  /**
   * 计算特征墙体几何形状
   * @param entity - 实体对象
   * @returns 墙体轮廓的四个顶点坐标数组
   */
  private _computeFeatureWallGeometry(entity: Entity): Coordinate[];
}

/**
 * 自定义墙体附着模型尺寸标注控制器
 * 处理尺寸变化并执行相应的移动命令
 */
declare class CustomizedWallAttachedModelDimensionController extends HSApp.View.Base.DisplayController {
  /** 关联的 Gizmo */
  gizmo: CustomizedWallAttachedModelDimension;
  
  /**
   * 构造函数
   * @param entity - 关联的实体对象
   * @param context - 上下文对象
   * @param gizmo - 关联的 Gizmo 对象
   */
  constructor(entity: Entity, context: Context, gizmo: CustomizedWallAttachedModelDimension);
  
  /**
   * 分发尺寸变化事件
   * 根据尺寸变化计算位移并执行移动命令
   * @param event - 尺寸值变化事件
   */
  dispatch(event: DimensionValueChangeEvent): void;
}

export default CustomizedWallAttachedModelDimension;