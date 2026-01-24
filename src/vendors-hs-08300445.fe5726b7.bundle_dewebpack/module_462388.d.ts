/**
 * 文本域自动高度计算模块
 * 提供根据内容自动调整 textarea 高度的功能
 */

/**
 * 节点样式计算结果
 */
export interface NodeStyling {
  /** 包含所有相关CSS属性的样式字符串 */
  sizingStyle: string;
  /** 上下内边距总和（padding-top + padding-bottom） */
  paddingSize: number;
  /** 上下边框宽度总和（border-top-width + border-bottom-width） */
  borderSize: number;
  /** 盒模型类型：'border-box' | 'content-box' */
  boxSizing: string;
}

/**
 * 高度计算结果
 */
export interface HeightCalculationResult {
  /** 计算后的高度值（像素） */
  height: number;
  /** 最小高度限制（像素） */
  minHeight: number;
  /** 最大高度限制（像素） */
  maxHeight: number;
  /** Y轴溢出控制：'hidden' | undefined */
  overflowY: string | undefined;
  /** 禁用用户调整大小 */
  resize: 'none';
}

/**
 * 计算指定节点的样式信息
 * 
 * @param element - 目标HTML元素（通常是 textarea）
 * @param useCache - 是否使用缓存优化性能，默认 false
 * @returns 包含盒模型、内边距、边框等样式信息的对象
 */
export function calculateNodeStyling(
  element: HTMLElement,
  useCache?: boolean
): NodeStyling;

/**
 * 根据 textarea 内容自动计算合适的高度
 * 
 * @param element - 目标 textarea 元素
 * @param useCache - 是否缓存样式计算结果以提升性能
 * @param minRows - 最小行数限制，null 表示无限制
 * @param maxRows - 最大行数限制，null 表示无限制
 * @returns 包含高度、溢出等样式属性的对象
 * 
 * @example
 *