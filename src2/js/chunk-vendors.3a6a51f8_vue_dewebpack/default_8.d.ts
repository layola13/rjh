/**
 * Vue 组件数据合并工具
 * 用于合并 Vue 组件的 data、props、listeners 等配置项
 */

/**
 * Vue 组件数据对象接口
 * 描述 Vue 组件的各种配置属性
 */
export interface VNodeData {
  /** CSS 类名（动态绑定） */
  class?: string | string[] | Record<string, boolean>;
  
  /** 静态 CSS 类名 */
  staticClass?: string;
  
  /** 内联样式（动态绑定） */
  style?: string | CSSStyleDeclaration | Array<string | CSSStyleDeclaration>;
  
  /** 静态内联样式 */
  staticStyle?: Record<string, string>;
  
  /** HTML 属性 */
  attrs?: Record<string, unknown>;
  
  /** DOM 属性 */
  domProps?: Record<string, unknown>;
  
  /** 组件 props */
  props?: Record<string, unknown>;
  
  /** 事件监听器 */
  on?: Record<string, Function | Function[]>;
  
  /** 原生事件监听器 */
  nativeOn?: Record<string, Function | Function[]>;
  
  /** 指令 */
  directives?: Array<{
    name: string;
    value?: unknown;
    expression?: string;
    arg?: string;
    modifiers?: Record<string, boolean>;
  }>;
  
  /** 作用域插槽 */
  scopedSlots?: Record<string, Function>;
  
  /** 生命周期钩子 */
  hook?: Record<string, Function>;
  
  /** 过渡效果 */
  transition?: object;
  
  /** 其他自定义属性 */
  [key: string]: unknown;
}

/**
 * CSS 样式对象类型
 * 键为驼峰式 CSS 属性名，值为样式值
 */
export type CSSStyleObject = Record<string, string | number | undefined>;

/**
 * 事件监听器映射类型
 * 键为事件名，值为单个或多个事件处理函数
 */
export type ListenersMap = Record<string, Function | Function[]>;

/**
 * 合并多个 Vue 组件数据对象
 * 
 * @param sources - 要合并的数据对象列表
 * @returns 合并后的数据对象
 * 
 * @remarks
 * 合并规则：
 * - class/directives: 使用 mergeClasses 合并
 * - style: 使用 mergeStyles 合并
 * - staticClass: 字符串拼接（空格分隔）
 * - on/nativeOn: 使用 mergeListeners 合并
 * - attrs/props/domProps/scopedSlots/staticStyle/hook/transition: 对象合并（后者覆盖前者）
 * - 其他属性: 后者覆盖前者
 * 
 * @example
 *