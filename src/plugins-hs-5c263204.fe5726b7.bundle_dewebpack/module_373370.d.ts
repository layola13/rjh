/**
 * UI组件位置常量定义
 * 定义了应用中各个主要UI组件的标识符
 * @module ComponentPositions
 */

/**
 * UI组件位置枚举类型
 */
export interface ComponentPositions {
  /** 目录产品项组件 */
  CATELOG_PRODUCT_ITEM: "CATELOG_PRODUCT_ITEM";
  
  /** 右侧属性栏组件 */
  RIGHT_PROPERTY_BAR: "RIGHT_PROPERTY_BAR";
  
  /** 分组列表面板组件 */
  GROUP_LIST_PANEL: "GROUP_LIST_PANEL";
  
  /** 弹窗提示组件 */
  ALERT_POPUP: "ALERT_POPUP";
}

/**
 * UI组件位置常量对象
 */
declare const componentPositions: ComponentPositions;

export default componentPositions;

/**
 * 组件位置键类型
 * 可用于类型约束和类型检查
 */
export type ComponentPositionKey = keyof ComponentPositions;

/**
 * 组件位置值类型
 * 表示所有可能的组件位置字符串字面量
 */
export type ComponentPositionValue = ComponentPositions[ComponentPositionKey];