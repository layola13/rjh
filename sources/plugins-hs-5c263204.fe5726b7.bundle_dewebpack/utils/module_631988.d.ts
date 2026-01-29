/**
 * 模块：角窗尺寸标注小工具
 * 用于在SVG视图中显示和编辑角窗(CornerFlatWindow)的尺寸标注
 */

import { View } from 'HSApp';
import { SignalHook } from 'HSApp/Signal';
import { Entity } from 'HSApp/Model';
import { Context } from 'HSApp/View';

/**
 * 尺寸标注状态枚举
 */
declare enum LinearDimensionStateEnum {
  editable = 'editable',
  focus = 'focus',
  disabled = 'disabled',
  invalid = 'invalid'
}

/**
 * 尺寸标注数据接口
 */
interface DimensionData {
  /** 起点坐标 */
  start: THREE.Vector2;
  /** 终点坐标 */
  end: THREE.Vector2;
  /** 旋转角度(弧度) */
  rotation: number;
  /** 文本位置 */
  textPosition: THREE.Vector2;
  /** 最小值限制 */
  min: number;
  /** 最大值限制 */
  max: number;
  /** 是否无效 */
  invalid: boolean;
  /** 是否反转 */
  inverted: boolean;
}

/**
 * 计算结果包含两个边的尺寸数据
 */
interface ComputedDimensionData {
  /** B边尺寸数据 */
  corenerBDim: DimensionData;
  /** C边尺寸数据 */
  corenerCDim: DimensionData;
}

/**
 * 值变更事件数据
 */
interface ValueChangeEventData {
  /** 触发事件的尺寸标注小工具 */
  gizmo: View.SVG.LinearDimension;
  /** 新值 */
  value: number;
  /** 旧值 */
  oldValue: number;
}

/**
 * 设置变更事件数据
 */
interface SettingChangedEventData {
  /** 字段名 */
  fieldName: string;
  /** 新值 */
  value: unknown;
}

/**
 * 命令事件数据
 */
interface CommandEventData {
  /** 命令对象 */
  cmd?: unknown;
}

/**
 * 角窗尺寸标注小工具
 * 继承自 HSApp.View.SVG.Gizmo，用于在SVG视图中显示和编辑角窗的B边和C边尺寸
 */
export default class CornerFlatWindowDimensionGizmo extends HSApp.View.SVG.Gizmo {
  /** 小工具类型标识 */
  type: string;
  
  /** 尺寸标注偏移距离(像素) */
  readonly kDimensionOffset: number;
  
  /** 尺寸文本偏移距离(像素) */
  readonly kDimensionTextOffset: number;
  
  /** 控制器实例 */
  controller: CornerFlatWindowDimensionController;
  
  /** B边尺寸标注 */
  corenerBDim: HSApp.View.SVG.LinearDimension;
  
  /** C边尺寸标注 */
  corenerCDim: HSApp.View.SVG.LinearDimension;
  
  /** 当前激活的尺寸标注 */
  activeDim?: HSApp.View.SVG.LinearDimension;
  
  /** 小工具是否需要重绘 */
  gizmoDirty: boolean;
  
  /** 尺寸标注类型 */
  dimensionType: string;
  
  /** 信号钩子管理器 */
  signalHook: SignalHook;
  
  /** 子项列表 */
  childItems: HSApp.View.SVG.LinearDimension[];
  
  /** 关联的实体对象 */
  entity: Entity;

  /**
   * 构造函数
   * @param context - 视图上下文
   * @param parent - 父视图对象
   * @param entity - 关联的实体对象
   */
  constructor(
    context: Context,
    parent: View.Base.View,
    entity: Entity
  );

  /**
   * 激活时调用
   * 设置事件监听器，包括实体变更、设置变更、值变更提交等
   */
  onActivate(): void;

  /**
   * 停用时调用
   * 移除所有事件监听器
   */
  onDeactivate(): void;

  /**
   * 清理时调用
   * 释放子尺寸标注引用
   */
  onCleanup(): void;

  /**
   * 更新小工具状态
   * 根据实体的宿主状态决定显示或隐藏
   */
  update(): void;

  /**
   * 绘制小工具
   * 当gizmoDirty为true时更新子小工具
   */
  draw(): void;

  /**
   * 设置当前激活的尺寸标注
   * @param dimension - 要激活的尺寸标注
   */
  setActiveDimension(dimension: HSApp.View.SVG.LinearDimension): void;

  /**
   * 查找参考墙体
   * @returns 返回宿主墙体对象，如果不是墙体则返回undefined
   */
  findReferenceWall(): HSApp.Model.NgWall | undefined;

  /**
   * 设置变更事件处理
   * @param event - 设置变更事件
   */
  private _onSettingChanged(event: { data: SettingChangedEventData }): void;

  /**
   * 值变更提交事件处理
   * @param event - 值变更事件
   */
  private _onValueChangeCommit(event: { data: ValueChangeEventData }): void;

  /**
   * 输入切换事件处理
   * 在左、中、右尺寸标注之间循环切换焦点
   */
  private _onInputSwitching(): void;

  /**
   * 更新子小工具的位置和状态
   * 根据实体和参考墙体计算尺寸标注的位置、旋转等属性
   */
  private _updateChildGizmo(): void;

  /**
   * 计算尺寸标注数据
   * @param wall - 参考墙体
   * @returns 返回B边和C边的尺寸数据，计算失败返回undefined
   */
  private _computeDimensionData(wall: HSApp.Model.NgWall): ComputedDimensionData | undefined;
}

/**
 * 角窗尺寸标注控制器
 * 继承自 HSApp.View.Base.DisplayController，处理尺寸标注的交互逻辑和命令执行
 */
declare class CornerFlatWindowDimensionController extends HSApp.View.Base.DisplayController {
  /** 关联的小工具实例 */
  gizmo: CornerFlatWindowDimensionGizmo;
  
  /** 当前编辑命令 */
  private _editCmd?: HSApp.Command.Command;
  
  /** 命令管理器 */
  private _cmdMgr: HSApp.Command.CommandManager;

  /**
   * 构造函数
   * @param context - 视图上下文
   * @param parent - 父视图对象
   * @param gizmo - 关联的小工具
   */
  constructor(
    context: Context,
    parent: View.Base.View,
    gizmo: CornerFlatWindowDimensionGizmo
  );

  /**
   * 分发事件到相应的处理逻辑
   * @param eventType - 事件类型
   * @param entity - 关联实体
   * @param event - 事件对象
   */
  dispatch(
    eventType: 'valueChangeStart' | 'valueChangeEnd' | 'valueChanged' | 'openingLengthChanged',
    entity: Entity,
    event: { data: ValueChangeEventData }
  ): void;

  /**
   * 启动编辑命令
   * @param commandType - 命令类型
   * @param controller - 控制器实例
   * @param eventData - 事件数据
   * @param options - 可选参数
   * @returns 返回创建的命令对象
   */
  private _launchCmd(
    commandType: string,
    controller: CornerFlatWindowDimensionController,
    eventData: ValueChangeEventData,
    options?: unknown
  ): HSApp.Command.Command;
}