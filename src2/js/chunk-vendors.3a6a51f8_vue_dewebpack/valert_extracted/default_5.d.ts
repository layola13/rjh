/**
 * 合并 Vue 组件数据对象的工具函数集合
 * 用于在 Vue 2.x 中合并多个 VNode data 对象
 */

/**
 * Vue VNode 数据对象接口
 * 定义了 Vue 虚拟节点的数据结构
 */
export interface VNodeData {
  /** CSS 类名（动态绑定） */
  class?: string | string[] | Record<string, boolean>;
  /** 静态 CSS 类名 */
  staticClass?: string;
  /** 内联样式对象或字符串 */
  style?: string | CSSStyleDeclaration | Array<string | CSSStyleDeclaration>;
  /** 静态样式对象 */
  staticStyle?: Record<string, string | number>;
  /** HTML 属性 */
  attrs?: Record<string, any>;
  /** DOM 属性 */
  props?: Record<string, any>;
  /** DOM 属性（直接设置） */
  domProps?: Record<string, any>;
  /** 事件监听器 */
  on?: Record<string, Function | Function[]>;
  /** 原生事件监听器 */
  nativeOn?: Record<string, Function | Function[]>;
  /** 自定义指令 */
  directives?: Array<VNodeDirective>;
  /** 作用域插槽 */
  scopedSlots?: Record<string, Function>;
  /** 生命周期钩子 */
  hook?: Record<string, Function>;
  /** 过渡动画配置 */
  transition?: object;
  /** 其他任意属性 */
  [key: string]: any;
}

/**
 * Vue 自定义指令接口
 */
export interface VNodeDirective {
  /** 指令名称 */
  name: string;
  /** 绑定值 */
  value?: any;
  /** 旧值 */
  oldValue?: any;
  /** 表达式字符串 */
  expression?: string;
  /** 参数 */
  arg?: string;
  /** 修饰符 */
  modifiers?: Record<string, boolean>;
}

/**
 * 样式对象类型
 * 可以是字符串、CSSStyleDeclaration 对象或它们的数组
 */
export type StyleValue = 
  | string 
  | Partial<CSSStyleDeclaration> 
  | Array<string | Partial<CSSStyleDeclaration>>;

/**
 * 类名类型
 * 可以是字符串、字符串数组或对象映射
 */
export type ClassValue = 
  | string 
  | string[] 
  | Record<string, boolean>;

/**
 * 事件监听器类型
 * 可以是单个函数或函数数组
 */
export type ListenerValue = Function | Function[];

/**
 * 事件监听器映射对象
 */
export type Listeners = Record<string, ListenerValue>;

/**
 * 合并多个 Vue VNode data 对象
 * 按照特定规则合并类名、样式、事件监听器等属性
 * 
 * @param data - 任意数量的 VNode data 对象，后面的对象优先级更高
 * @returns 合并后的 VNode data 对象
 * 
 * @example
 *