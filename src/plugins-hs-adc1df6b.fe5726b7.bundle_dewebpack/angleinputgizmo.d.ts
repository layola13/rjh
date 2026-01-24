/**
 * 角度输入交互控件模块
 * 用于在屋顶编辑场景中提供角度参数的可视化输入界面
 */

import type { HSCanvas } from './HSCanvas';
import type { SignalHook } from './SignalHook';
import type { Vector2 } from './Vector2';
import type { Roof } from './Roof';
import type { RoofParamNode } from './RoofParamNode';
import type { Context } from './Context';
import type { CommandManager } from './CommandManager';
import type { Command } from './Command';

/**
 * 视图盒变化事件数据
 */
export interface ViewBoxChangedEventData {
  /** 缩放是否变化 */
  scaleChanged?: boolean;
  /** 位置是否变化 */
  positionChanged?: boolean;
}

/**
 * 视图盒变化事件
 */
export interface ViewBoxChangedEvent {
  data: ViewBoxChangedEventData;
}

/**
 * 输入框配置选项
 */
export interface InputBoxConfig {
  /** 最小值 */
  min: number;
  /** 最大值 */
  max: number;
  /** 单位 */
  unit: string;
}

/**
 * 输入框数据更新参数
 */
export interface InputBoxUpdateData {
  /** 位置坐标 */
  position?: Vector2;
  /** 当前值 */
  value?: number;
  /** 是否聚焦 */
  focus?: boolean;
  /** 配置选项 */
  config?: InputBoxConfig;
}

/**
 * 输入框组件类型枚举
 */
export enum InputBoxType {
  Angle = 'Angle',
  Distance = 'Distance',
  Number = 'Number'
}

/**
 * 输入框组件选项
 */
export interface InputBoxCompOptions {
  /** 输入框类型 */
  type: InputBoxType;
  /** 回车键回调 */
  onEnter: (value: number) => void;
  /** Tab键回调 */
  onTab: (component: InputBoxComp) => void;
}

/**
 * 输入框组件
 * 提供参数输入和编辑功能
 */
export declare class InputBoxComp {
  constructor(context: Context, options: InputBoxCompOptions);
  
  /**
   * 更新输入框数据
   * @param data - 更新的数据对象
   */
  updateData(data: InputBoxUpdateData): void;
  
  /**
   * 销毁组件，释放资源
   */
  dispose(): void;
}

/**
 * 实体基类接口
 */
export interface Entity {
  /** 关联的屋顶对象 */
  roof: Roof;
}

/**
 * Gizmo基类
 * 提供交互式编辑控件的基础功能
 */
export declare class Gizmo {
  /** 关联的实体对象 */
  protected entity: Entity;
  /** 上下文对象 */
  protected context: Context;
  /** 信号钩子管理器 */
  protected signalHook: SignalHook;
  
  constructor(entity: Entity, context: Context, signalHook: SignalHook);
  
  /**
   * 绘制回调，子类可重写
   * @param args - 绘制参数
   */
  protected onDraw(args?: unknown[]): void;
  
  /**
   * 清理回调，子类可重写
   * @param args - 清理参数
   */
  protected onCleanup(args?: unknown[]): void;
}

/**
 * 参数变更记录
 */
export interface ParamChangeRecord {
  /** 参数名称 */
  name: string;
  /** 新值 */
  value: number;
  /** 旧值 */
  oldValue: number;
}

/**
 * 角度输入Gizmo
 * 为屋顶对象提供角度参数的可视化输入和编辑功能
 * 支持angleA和angleB两个角度参数的交互式修改
 */
export declare class AngleInputGizmo extends Gizmo {
  /** 输入框组件映射表，键为参数名称 */
  private inputElements?: Record<string, InputBoxComp>;
  
  /** 旧值缓存，用于撤销操作 */
  private oldValue: Record<string, number>;
  
  constructor(entity: Entity, context: Context, signalHook: SignalHook);
  
  /**
   * 获取关联的屋顶对象
   */
  get roof(): Roof;
  
  /**
   * 获取候选参数名称列表
   * @returns 返回["angleA", "angleB"]
   */
  get candidateNames(): readonly string[];
  
  /**
   * 视图盒变化事件处理器
   * 当视图缩放或平移时，更新输入框位置
   * @param event - 视图盒变化事件，可能为undefined
   */
  protected onViewBoxChanged(event?: ViewBoxChangedEvent): void;
  
  /**
   * 绘制回调
   * 初始化并创建所有输入框组件
   */
  protected onDraw(): void;
  
  /**
   * 输入框回车事件处理器
   * 创建并执行参数修改命令
   * @param paramName - 参数名称
   * @param newValue - 新的角度值
   */
  private onInputEnter(paramName: string, newValue: number): void;
  
  /**
   * Tab键切换焦点处理器
   * 在多个输入框之间循环切换焦点
   * @param currentComponent - 当前聚焦的输入框组件
   */
  private onTab(currentComponent: InputBoxComp): void;
  
  /**
   * 清理回调
   * 销毁所有输入框组件并清空缓存
   */
  protected onCleanup(): void;
  
  /**
   * 根据参数名称获取对应的线段索引
   * @param paramName - 参数名称（angleA或angleB）
   * @returns angleA返回3，angleB返回1，其他返回undefined
   */
  private getLineIndex(paramName: string): number | undefined;
  
  /**
   * 计算输入框的显示位置
   * 根据屋顶轮廓线和偏移量计算输入框应显示的二维坐标
   * @param paramName - 参数名称
   * @returns 输入框的位置向量
   */
  private getPosition(paramName: string): Vector2;
}