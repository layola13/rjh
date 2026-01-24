/**
 * CSS-in-JS 动态样式注入工具模块
 * 提供运行时CSS样式的注入、更新和移除功能
 */

/**
 * CSS注入选项配置
 */
export interface CSSOptions {
  /**
   * 内容安全策略配置
   */
  csp?: {
    /**
     * CSP nonce值，用于内联样式的安全验证
     */
    nonce?: string;
  };

  /**
   * 是否在容器开头插入样式
   * - true: 插入到开头
   * - false: 插入到末尾
   * - "queue": 使用优先级队列插入
   */
  prepend?: boolean | 'queue';

  /**
   * 样式插入优先级（仅在prepend为"queue"时有效）
   * @default 0
   */
  priority?: number;

  /**
   * 自定义样式标记属性名
   * 用于标识和查找特定样式元素
   */
  mark?: string;

  /**
   * 样式容器挂载点
   * @default document.head 或 document.body
   */
  attachTo?: HTMLElement;

  /**
   * 预缓存的样式元素列表（内部使用）
   */
  styles?: HTMLStyleElement[];
}

/**
 * 样式插入位置类型
 */
type InsertPosition = 'append' | 'prepend' | 'prependQueue';

/**
 * 注入CSS样式到文档中
 * 
 * @param cssText - CSS样式文本内容
 * @param options - 注入选项配置
 * @returns 创建的style元素，服务端渲染时返回null
 * 
 * @example
 *