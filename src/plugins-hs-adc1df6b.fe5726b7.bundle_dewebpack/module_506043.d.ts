/**
 * Searchbox组件类型定义
 * @module Searchbox
 */

/**
 * Searchbox数据接口
 * 定义搜索框组件的数据结构
 */
export interface SearchboxData {
  /** 搜索框标签文本 */
  label?: string;
  /** 是否处于按下状态 */
  isPressed?: boolean;
  /** 其他扩展属性 */
  [key: string]: unknown;
}

/**
 * Searchbox构造函数参数接口
 */
export interface SearchboxProps extends SearchboxData {
  /** 组件名称 */
  name: string;
}

/**
 * 组件类型枚举
 */
export enum ComponentType {
  /** 搜索框类型 */
  searchbox = "searchbox"
}

/**
 * Searchbox组件类
 * 继承自基础组件类，提供搜索框功能
 * @extends BaseComponent
 */
export default class Searchbox {
  /**
   * 创建Searchbox实例
   * @param props - 组件属性，包含name和其他数据
   * @param context - 组件上下文（可选）
   */
  constructor(props: SearchboxProps, context?: unknown);

  /**
   * 组件类型标识
   * @readonly
   * @returns 返回固定值 "searchbox"
   */
  get type(): ComponentType.searchbox;

  /**
   * 设置按下状态
   * @param isPressed - 是否按下
   */
  setPressed(isPressed: boolean): void;

  /**
   * 设置标签文本
   * @param label - 标签文本内容
   */
  setLabel(label: string): void;

  /**
   * 设置组件数据
   * @param data - 要更新的数据对象
   * @protected
   */
  protected setData(data: Partial<SearchboxData>): void;
}