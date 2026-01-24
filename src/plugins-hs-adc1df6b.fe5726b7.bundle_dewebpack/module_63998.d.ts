/**
 * 第一级节点属性栏配置类
 * 用于定义属性栏的类型、默认选中项和浮动项
 */

/**
 * 浮动项配置接口
 */
export interface FloatItem {
  // 根据实际使用情况定义具体属性
  [key: string]: unknown;
}

/**
 * 第一级节点属性栏配置选项
 */
export interface FirstLevelNodePropertyBarOptions {
  /**
   * 默认选中的项
   */
  defaultSelect?: unknown;
  
  /**
   * 浮动项配置列表
   */
  floatItems?: FloatItem[];
}

/**
 * HSFPConstants 命名空间声明
 */
declare namespace HSFPConstants {
  /**
   * 属性栏类型枚举
   */
  enum PropertyBarType {
    FirstLevelNode = 'FirstLevelNode'
  }
}

/**
 * 第一级节点属性栏配置类
 * 继承自基础属性栏类,用于配置第一级节点的属性显示
 */
export default class FirstLevelNodePropertyBar {
  /**
   * 默认选中项
   */
  defaultSelect: unknown;
  
  /**
   * 浮动项列表
   */
  floatItems: FloatItem[];
  
  /**
   * 属性栏类型标识
   * 固定为 FirstLevelNode 类型
   */
  readonly type: HSFPConstants.PropertyBarType.FirstLevelNode;
  
  /**
   * 构造函数
   * @param options - 配置选项
   * @param options.defaultSelect - 默认选中的项
   * @param options.floatItems - 浮动项配置列表,默认为空数组
   */
  constructor(options: FirstLevelNodePropertyBarOptions);
  
  /**
   * 设置浮动项列表
   * @param items - 新的浮动项配置列表
   */
  setFloatItems(items: FloatItem[]): void;
}

/**
 * 导出HSFPConstants命名空间供外部使用
 */
export { HSFPConstants };