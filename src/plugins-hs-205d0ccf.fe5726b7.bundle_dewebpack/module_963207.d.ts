/**
 * 工具按钮组件类型定义
 * @module ToolButtonComponent
 */

/**
 * 工具按钮组件的数据配置接口
 */
interface ToolButtonData {
  /** 按钮显示的标签文本 */
  label: string;
  /** 按钮的图标标识 */
  icon: string;
  /** 鼠标悬停时显示的提示文本 */
  tooltip: string;
  /** 按钮点击时的回调函数 */
  onclick: () => void;
  /** 按钮是否处于按下状态 */
  isPressed: boolean;
}

/**
 * 组件构造函数的配置参数
 */
interface ToolButtonConfig extends Partial<ToolButtonData> {
  /** 组件名称 */
  name: string;
}

/**
 * HSCore 工具对象命名空间
 */
declare namespace HSCore {
  namespace Util {
    namespace Object {
      /** 空函数占位符 */
      const nullFunction: () => void;
    }
  }
}

/**
 * 按钮类型枚举
 */
declare enum ButtonType {
  /** 图片类型按钮 */
  image = "image"
}

/**
 * 基础组件抽象类
 */
declare abstract class BaseComponent {
  /** 组件数据 */
  data: Record<string, unknown>;
  
  /**
   * 构造函数
   * @param name - 组件名称
   * @param context - 组件上下文
   */
  constructor(name: string, context: unknown);
  
  /**
   * 设置组件数据
   * @param data - 要合并的数据对象
   */
  setData(data: Partial<Record<string, unknown>>): void;
}

/**
 * 工具按钮组件类
 * 继承自基础组件,提供可点击的工具栏按钮功能
 */
declare class ToolButtonComponent extends BaseComponent {
  /** 组件数据,包含按钮特定配置 */
  data: ToolButtonData;

  /**
   * 创建工具按钮组件实例
   * @param config - 按钮配置对象
   * @param context - 组件渲染上下文
   * @example
   *