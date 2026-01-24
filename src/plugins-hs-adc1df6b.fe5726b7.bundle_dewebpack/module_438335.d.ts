/**
 * 分隔符组件的类型定义
 * Module: module_438335
 * Original ID: 438335
 */

import ComponentBase from './ComponentBase';
import ComponentType from './ComponentType';

/**
 * 分隔符组件的数据接口
 */
export interface DividerComponentData {
  /** 分隔符名称 */
  name: string;
  /** 其他组件数据属性 */
  [key: string]: unknown;
}

/**
 * 分隔符组件构造函数参数接口
 */
export interface DividerComponentProps extends DividerComponentData {
  /** 组件名称 */
  name: string;
}

/**
 * 分隔符组件类
 * 用于在界面中渲染分隔线元素
 */
export default class DividerComponent extends ComponentBase {
  /**
   * 构造函数
   * @param props - 组件属性对象
   * @param context - 组件上下文
   */
  constructor(props: DividerComponentProps, context?: unknown);

  /**
   * 获取组件类型
   * @returns 返回分隔符类型标识
   */
  get type(): ComponentType.divider;

  /**
   * 设置组件数据
   * @param data - 组件数据对象（不包含name属性）
   */
  protected setData(data: Omit<DividerComponentProps, 'name'>): void;
}