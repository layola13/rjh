/**
 * 文本省略处理模块
 * 用于计算并截断文本内容以适应指定的行数限制
 */

/**
 * 省略配置选项
 */
export interface EllipsisOptions {
  /** 最大显示行数 */
  rows: number;
  /** 省略后缀，通常为 "..." */
  suffix?: string;
}

/**
 * 省略处理结果
 */
export interface EllipsisResult {
  /** 处理后的React节点内容 */
  content: React.ReactNode | React.ReactNode[];
  /** 处理后的HTML文本 */
  text: string;
  /** 是否发生了省略 */
  ellipsis: boolean;
}

/**
 * 计算文本省略
 * 
 * @param element - 目标DOM元素，用于获取样式信息
 * @param options - 省略配置选项
 * @param content - 原始内容（React节点）
 * @param ellipsisNode - 省略符号节点
 * @param ellipsisStr - 省略符号字符串（用于测量）
 * @returns 省略处理结果，包含处理后的内容、HTML文本和是否发生省略的标志
 * 
 * @example
 *