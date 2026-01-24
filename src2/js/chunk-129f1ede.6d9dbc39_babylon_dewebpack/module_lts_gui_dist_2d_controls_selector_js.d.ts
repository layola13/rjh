/**
 * GUI 2D选择器控件模块
 * 提供复选框组、单选按钮组、滑块组和选择面板等UI组件
 */

import { TextBlock } from './textBlock';
import { Control } from './control';
import { StackPanel } from './stackPanel';
import { Rectangle } from './rectangle';
import { Checkbox } from './checkbox';
import { RadioButton } from './radioButton';
import { Slider } from './sliders/slider';
import { Container } from './container';
import { Observable } from '@babylonjs/core';

/**
 * 选择器组基类
 * 管理一组相关的选择器控件（复选框、单选按钮或滑块）
 */
export declare class SelectorGroup {
  /** 组名称 */
  name: string;

  /** 获取组面板容器 */
  get groupPanel(): StackPanel;

  /** 获取所有选择器控件数组 */
  get selectors(): Control[];

  /** 获取或设置组标题文本 */
  get header(): string;
  set header(value: string);

  /**
   * 构造函数
   * @param name - 选择器组名称
   */
  constructor(name: string);

  /**
   * 添加组标题
   * @param text - 标题文本
   * @returns 创建的文本块控件
   */
  protected _addGroupHeader(text: string): TextBlock;

  /**
   * 获取指定索引的选择器
   * @param index - 选择器索引
   * @returns 选择器控件，如果索引无效则返回 undefined
   */
  protected _getSelector(index: number): Control | undefined;

  /**
   * 移除指定索引的选择器
   * @param index - 要移除的选择器索引
   */
  removeSelector(index: number): void;

  /**
   * 设置选择器标签文本（由子类实现）
   * @param index - 选择器索引
   * @param label - 新标签文本
   */
  protected _setSelectorLabel(index: number, label: string): void;

  /**
   * 设置选择器标签颜色（由子类实现）
   * @param index - 选择器索引
   * @param color - 颜色值
   */
  protected _setSelectorLabelColor(index: number, color: string): void;

  /**
   * 设置选择器按钮颜色（由子类实现）
   * @param index - 选择器索引
   * @param color - 颜色值
   */
  protected _setSelectorButtonColor(index: number, color: string): void;

  /**
   * 设置选择器按钮背景色（由子类实现）
   * @param index - 选择器索引
   * @param background - 背景颜色值
   */
  protected _setSelectorButtonBackground(index: number, background: string): void;
}

/**
 * 复选框组
 * 管理一组复选框控件
 */
export declare class CheckboxGroup extends SelectorGroup {
  /**
   * 添加复选框到组
   * @param label - 复选框标签文本
   * @param callback - 复选框状态改变时的回调函数，默认为空函数
   * @param isChecked - 初始选中状态，默认为 false
   */
  addCheckbox(
    label: string,
    callback?: (isChecked: boolean) => void,
    isChecked?: boolean
  ): void;

  /**
   * 设置选择器标签文本
   * @param index - 选择器索引
   * @param label - 新标签文本
   */
  protected _setSelectorLabel(index: number, label: string): void;

  /**
   * 设置选择器标签颜色
   * @param index - 选择器索引
   * @param color - 颜色值
   */
  protected _setSelectorLabelColor(index: number, color: string): void;

  /**
   * 设置选择器按钮颜色
   * @param index - 选择器索引
   * @param color - 颜色值
   */
  protected _setSelectorButtonColor(index: number, color: string): void;

  /**
   * 设置选择器按钮背景色
   * @param index - 选择器索引
   * @param background - 背景颜色值
   */
  protected _setSelectorButtonBackground(index: number, background: string): void;
}

/**
 * 单选按钮组
 * 管理一组互斥的单选按钮控件
 */
export declare class RadioGroup extends SelectorGroup {
  /**
   * 添加单选按钮到组
   * @param label - 单选按钮标签文本
   * @param callback - 单选按钮选中时的回调函数，参数为按钮索引，默认为空函数
   * @param isChecked - 初始选中状态，默认为 false
   */
  addRadio(
    label: string,
    callback?: (index: number) => void,
    isChecked?: boolean
  ): void;

  /**
   * 设置选择器标签文本
   * @param index - 选择器索引
   * @param label - 新标签文本
   */
  protected _setSelectorLabel(index: number, label: string): void;

  /**
   * 设置选择器标签颜色
   * @param index - 选择器索引
   * @param color - 颜色值
   */
  protected _setSelectorLabelColor(index: number, color: string): void;

  /**
   * 设置选择器按钮颜色
   * @param index - 选择器索引
   * @param color - 颜色值
   */
  protected _setSelectorButtonColor(index: number, color: string): void;

  /**
   * 设置选择器按钮背景色
   * @param index - 选择器索引
   * @param background - 背景颜色值
   */
  protected _setSelectorButtonBackground(index: number, background: string): void;
}

/**
 * 滑块组
 * 管理一组滑块控件
 */
export declare class SliderGroup extends SelectorGroup {
  /**
   * 添加滑块到组
   * @param label - 滑块标签文本
   * @param callback - 滑块值改变时的回调函数，默认为空函数
   * @param unit - 单位文本，默认为 "Units"
   * @param minimum - 最小值，默认为 0
   * @param maximum - 最大值，默认为 0
   * @param value - 初始值，默认为 0
   * @param displayValueFormatter - 值显示格式化函数，默认为取整函数
   */
  addSlider(
    label: string,
    callback?: (value: number) => void,
    unit?: string,
    minimum?: number,
    maximum?: number,
    value?: number,
    displayValueFormatter?: (value: number) => number | string
  ): void;

  /**
   * 设置选择器标签文本
   * @param index - 选择器索引
   * @param label - 新标签文本
   */
  protected _setSelectorLabel(index: number, label: string): void;

  /**
   * 设置选择器标签颜色
   * @param index - 选择器索引
   * @param color - 颜色值
   */
  protected _setSelectorLabelColor(index: number, color: string): void;

  /**
   * 设置选择器按钮（滑块）颜色
   * @param index - 选择器索引
   * @param color - 颜色值
   */
  protected _setSelectorButtonColor(index: number, color: string): void;

  /**
   * 设置选择器按钮（滑块）背景色
   * @param index - 选择器索引
   * @param background - 背景颜色值
   */
  protected _setSelectorButtonBackground(index: number, background: string): void;
}

/**
 * 选择面板
 * 容纳多个选择器组的面板容器，支持自定义样式
 */
export declare class SelectionPanel extends Rectangle {
  /** 组名称 */
  name: string;

  /** 选择器组数组 */
  groups: SelectorGroup[];

  /** 获取内部堆栈面板 */
  get panel(): StackPanel;

  /** 获取或设置标题颜色 */
  get headerColor(): string;
  set headerColor(value: string);

  /** 获取或设置按钮颜色 */
  get buttonColor(): string;
  set buttonColor(value: string);

  /** 获取或设置标签文本颜色 */
  get labelColor(): string;
  set labelColor(value: string);

  /** 获取或设置按钮背景色 */
  get buttonBackground(): string;
  set buttonBackground(value: string);

  /** 获取或设置分隔条颜色 */
  get barColor(): string;
  set barColor(value: string);

  /** 获取或设置分隔条高度 */
  get barHeight(): string;
  set barHeight(value: string);

  /** 获取或设置分隔条间距高度 */
  get spacerHeight(): string;
  set spacerHeight(value: string);

  /**
   * 构造函数
   * @param name - 面板名称
   * @param groups - 初始选择器组数组，默认为空数组
   */
  constructor(name: string, groups?: SelectorGroup[]);

  /**
   * 获取类型名称
   * @returns "SelectionPanel"
   */
  protected _getTypeName(): string;

  /** 应用标题颜色到所有组 */
  protected _setHeaderColor(): void;

  /** 应用按钮颜色到所有选择器 */
  protected _setbuttonColor(): void;

  /** 应用标签颜色到所有选择器 */
  protected _setLabelColor(): void;

  /** 应用按钮背景色到所有选择器 */
  protected _setButtonBackground(): void;

  /** 应用分隔条颜色到所有分隔条 */
  protected _setBarColor(): void;

  /** 应用分隔条高度到所有分隔条 */
  protected _setBarHeight(): void;

  /** 应用分隔条间距到所有分隔条 */
  protected _setSpacerHeight(): void;

  /** 添加分隔条到面板 */
  protected _addSpacer(): void;

  /**
   * 添加选择器组到面板
   * @param group - 要添加的选择器组
   */
  addGroup(group: SelectorGroup): void;

  /**
   * 移除指定索引的选择器组
   * @param index - 组索引
   */
  removeGroup(index: number): void;

  /**
   * 设置指定组的标题名称
   * @param name - 新标题名称
   * @param groupIndex - 组索引
   */
  setHeaderName(name: string, groupIndex: number): void;

  /**
   * 重新标记指定组内的选择器
   * @param label - 新标签文本
   * @param groupIndex - 组索引
   * @param selectorIndex - 选择器索引
   */
  relabel(label: string, groupIndex: number, selectorIndex: number): void;

  /**
   * 从组中移除指定选择器
   * @param groupIndex - 组索引
   * @param selectorIndex - 选择器索引
   */
  removeFromGroupSelector(groupIndex: number, selectorIndex: number): void;

  /**
   * 向指定组添加复选框
   * @param groupIndex - 组索引
   * @param label - 复选框标签
   * @param callback - 状态改变回调，默认为空函数
   * @param isChecked - 初始选中状态，默认为 false
   */
  addToGroupCheckbox(
    groupIndex: number,
    label: string,
    callback?: (isChecked: boolean) => void,
    isChecked?: boolean
  ): void;

  /**
   * 向指定组添加单选按钮
   * @param groupIndex - 组索引
   * @param label - 单选按钮标签
   * @param callback - 选中回调，默认为空函数
   * @param isChecked - 初始选中状态，默认为 false
   */
  addToGroupRadio(
    groupIndex: number,
    label: string,
    callback?: (index: number) => void,
    isChecked?: boolean
  ): void;

  /**
   * 向指定组添加滑块
   * @param groupIndex - 组索引
   * @param label - 滑块标签
   * @param callback - 值改变回调，默认为空函数
   * @param unit - 单位文本，默认为 "Units"
   * @param minimum - 最小值，默认为 0
   * @param maximum - 最大值，默认为 0
   * @param value - 初始值，默认为 0
   * @param displayValueFormatter - 值格式化函数，默认为取整函数
   */
  addToGroupSlider(
    groupIndex: number,
    label: string,
    callback?: (value: number) => void,
    unit?: string,
    minimum?: number,
    maximum?: number,
    value?: number,
    displayValueFormatter?: (value: number) => number | string
  ): void;
}