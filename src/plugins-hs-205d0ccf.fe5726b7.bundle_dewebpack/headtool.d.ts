/**
 * Module: HeadTool
 * 提供头部工具栏组件，支持选择框、复选框等交互控件
 */

import React from 'react';
import { Select, Option, CheckBox } from './components';

/**
 * 选择框配置项
 */
interface SelectItem {
  /** 选项值 */
  value: string | number;
  /** 选项显示名称 */
  name: string;
}

/**
 * 选择框配置
 */
interface SelectConfig {
  /** 默认选中值 */
  defaultValue?: string | number;
  /** 选项列表 */
  list: SelectItem[];
  /** 值变化回调 */
  onChange: (value: string | number) => void;
  /** 是否可编辑 */
  editable?: boolean;
}

/**
 * 复选框配置
 */
interface CheckBoxConfig {
  /** 复选框唯一标识 */
  name: string;
  /** 初始选中状态 */
  checked?: boolean;
  /** 状态变化回调 */
  onChange: (checked: boolean) => void;
}

/**
 * 工具栏项配置
 */
interface HeadToolItem {
  /** 标签文本 */
  label: string;
  /** 尺寸规格 */
  size?: 'small' | 'medium' | 'large';
  /** 选择框配置（与checkBox互斥） */
  select?: SelectConfig;
  /** 复选框配置（与select互斥） */
  checkBox?: CheckBoxConfig;
}

/**
 * HeadTool 组件属性
 */
interface HeadToolProps {
  /** 工具栏项列表 */
  items: HeadToolItem[];
}

/**
 * HeadTool 组件状态
 */
interface HeadToolState {
  /** 复选框选中状态映射表 */
  checkMap: Map<string, boolean>;
}

/**
 * 画布上下文接口
 */
interface CanvasContext {
  /** 画布DOM元素 */
  canvas: HTMLCanvasElement;
}

/**
 * 头部工具栏 React 组件
 * 支持动态渲染选择框和复选框
 */
export declare class HeadTool extends React.Component<HeadToolProps, HeadToolState> {
  /**
   * 构造函数
   * @param props - 组件属性
   */
  constructor(props: HeadToolProps);

  /**
   * 复选框状态变化处理器
   * @param checked - 新的选中状态
   * @param name - 复选框名称
   * @param callback - 原始回调函数
   */
  private _onCheckBoxChange(
    checked: boolean,
    name: string,
    callback: (checked: boolean) => void
  ): void;

  /**
   * 渲染组件
   */
  render(): React.ReactElement;
}

/**
 * HeadToolComp 构造函数参数
 */
interface HeadToolCompOptions extends Omit<HeadToolProps, 'ref'> {
  /** 其他自定义属性 */
  [key: string]: unknown;
}

/**
 * 头部工具栏包装组件
 * 负责创建DOM容器并挂载React组件到画布父节点
 */
export declare class HeadToolComp {
  /** 画布上下文 */
  private _context: CanvasContext;
  
  /** React组件挂载的DOM容器 */
  domContainer: HTMLDivElement;
  
  /** HeadTool React 组件实例引用 */
  private _headTool?: HeadTool;

  /**
   * 构造函数
   * @param context - 画布上下文对象
   * @param options - 工具栏配置选项
   */
  constructor(context: CanvasContext, options: HeadToolCompOptions);

  /**
   * 销毁组件
   * 卸载React组件并从DOM中移除容器
   */
  dispose(): void;
}