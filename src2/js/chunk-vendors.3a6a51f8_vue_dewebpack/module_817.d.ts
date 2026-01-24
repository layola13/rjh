/**
 * 选择并复制DOM元素中的文本内容
 * 
 * 该模块提供了一个通用函数，用于选择不同类型HTML元素中的文本内容。
 * 支持 SELECT、INPUT、TEXTAREA 以及可编辑元素（contenteditable）。
 * 
 * @module TextSelectionUtility
 */

/**
 * 表示可以被选择文本的HTML元素类型
 */
type SelectableElement = HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement | HTMLElement;

/**
 * 选择指定元素中的文本内容
 * 
 * 根据元素类型采用不同的选择策略：
 * - SELECT元素：聚焦并返回其value值
 * - INPUT/TEXTAREA元素：临时设置只读属性，选中所有文本后恢复状态
 * - 可编辑元素：使用Selection API选择所有内容
 * 
 * @param element - 要选择文本的HTML元素
 * @returns 被选中的文本内容字符串
 * 
 * @example
 *