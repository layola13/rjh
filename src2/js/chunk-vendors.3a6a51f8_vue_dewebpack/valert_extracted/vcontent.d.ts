/**
 * VContent组件模块
 * 提供内容展示相关的组件功能
 * @module VContent
 */

/**
 * VContent组件类
 * 用于渲染和管理内容区域
 */
export declare class VContent {
  /**
   * 构造函数
   * @param options - 组件配置选项
   */
  constructor(options?: VContentOptions);
}

/**
 * VContent组件配置选项接口
 */
export interface VContentOptions {
  /** 内容容器的CSS类名 */
  className?: string;
  /** 内容数据 */
  content?: string | HTMLElement;
  /** 是否启用自动滚动 */
  autoScroll?: boolean;
  /** 其他自定义属性 */
  [key: string]: unknown;
}

/**
 * 默认导出VContent组件
 */
export default VContent;