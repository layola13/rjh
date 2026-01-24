/**
 * CSS样式模块定义文件
 * 用于渲染缩放按钮容器和图片详情缩放组件的样式
 * @module CSSModuleExports
 */

/**
 * Webpack CSS模块导出函数类型
 * @param sourceMap - 是否包含源映射
 * @returns CSS加载器实例
 */
type CSSLoaderFactory = (sourceMap: boolean) => CSSLoader;

/**
 * CSS加载器接口
 * 负责处理CSS内容并推送到模块系统
 */
interface CSSLoader {
  /**
   * 推送CSS模块数据
   * @param data - 包含模块ID和CSS内容的元组
   */
  push(data: [string | number, string]): void;
}

/**
 * Webpack模块导出对象
 */
interface ModuleExports {
  /** 模块ID标识符 */
  id: string | number;
  /** 导出的内容 */
  exports: unknown;
}

/**
 * 模块工厂函数类型
 * @param moduleExports - 当前模块的导出对象
 * @param moduleExportsObject - 模块导出内容（通常为空对象）
 * @param require - Webpack的require函数，用于加载其他模块
 */
type ModuleFactory = (
  moduleExports: ModuleExports,
  moduleExportsObject: Record<string, unknown>,
  require: (moduleId: number) => CSSLoaderFactory
) => void;

/**
 * 渲染缩放按钮容器样式类名
 */
export interface RenderZoomBtnStyles {
  /** 主容器类名 */
  'render-zoom-btn-container': string;
  /** 滑块组件类名 */
  'zoom-slider': string;
  /** 缩放按钮类名 */
  'zoom-btn': string;
}

/**
 * 图片详情缩放组件样式类名
 */
export interface ImageDetailZoomStyles {
  /** 主容器类名 */
  'image-detail-zoom': string;
  /** 放大控制区域类名 */
  'enlarge': string;
  /** 放大控制按钮类名 */
  'enlarge-control': string;
  /** 原始尺寸按钮类名 */
  'enlarge-origin': string;
  /** 减少按钮禁用状态类名 */
  'enlarge-jian-disable': string;
  /** 增加按钮禁用状态类名 */
  'enlarge-jia-disable': string;
  /** 缩放比例文本类名 */
  'enlarge-text': string;
}

/**
 * 导出的CSS模块样式类名集合
 */
export type CSSModuleStyles = RenderZoomBtnStyles & ImageDetailZoomStyles;

declare const styles: CSSModuleStyles;
export default styles;