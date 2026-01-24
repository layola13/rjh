/**
 * 图片处理模块
 * 提供图片URL转换、调整大小和格式处理功能
 */

/**
 * 图片调整大小参数
 */
export interface ImageResizeParams {
  [key: string]: string | number | boolean;
}

/**
 * URL模式映射配置
 */
export interface PatternMap {
  /** 匹配的正则表达式模式 */
  pattern: RegExp;
  /** 替换目标字符串 */
  target: string;
}

/**
 * 图片处理选项
 */
export interface ImageOptions {
  /** 是否启用WebP格式 */
  enableWebP?: boolean;
  /** 质量级别: "H" (高) | "M" (中) | "L" (低) */
  qualityLevel?: "H" | "M" | "L";
}

/**
 * 处理URL配置
 */
export interface ProcessUrlConfig {
  /** 处理操作数组，如 ["format,webp", "resize,p_50"] */
  actions?: string[];
  /** 质量级别: "auto" | "H" | "M" | "L" */
  qLevel?: "auto" | "H" | "M" | "L";
}

/**
 * 图片URL处理模块接口
 */
export interface ImageProcessingModule {
  /**
   * 获取调整大小后的图片URL
   * @param url - 原始图片URL
   * @param params - 调整参数（宽度、高度等）
   * @returns 处理后的图片URL
   */
  getImageResized(url: string, params: ImageResizeParams): string;

  /**
   * 设置全局图片处理选项
   * @param options - 配置选项
   */
  setOptions(options: ImageOptions): void;

  /**
   * 获取经过处理的图片URL（支持格式转换、质量调整等）
   * @param url - 原始图片URL
   * @param config - 处理配置（可选）
   * @returns 添加了OSS处理参数的URL
   */
  getProcessedUrl(url: string, config?: ProcessUrlConfig): string;
}

declare const imageProcessingModule: ImageProcessingModule;

export default imageProcessingModule;