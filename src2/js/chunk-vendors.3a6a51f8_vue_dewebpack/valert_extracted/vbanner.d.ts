/**
 * VBanner组件模块
 * 提供横幅/Banner组件的导出
 * @module VBanner
 */

/**
 * VBanner组件类型定义
 * 横幅/Banner组件，用于在页面顶部或指定位置展示重要信息
 */
export declare class VBanner {
  /**
   * 创建VBanner实例
   * @param options - 组件配置选项
   */
  constructor(options?: VBannerOptions);
}

/**
 * VBanner组件配置选项接口
 */
export interface VBannerOptions {
  /**
   * Banner显示的文本内容
   */
  text?: string;
  
  /**
   * Banner的类型/样式
   */
  type?: 'info' | 'success' | 'warning' | 'error';
  
  /**
   * 是否可关闭
   * @default false
   */
  closable?: boolean;
  
  /**
   * 自动关闭的延迟时间（毫秒）
   * @default 0 - 0表示不自动关闭
   */
  duration?: number;
}

/**
 * VBanner组件默认导出
 */
export default VBanner;