/**
 * CSS模块类型定义
 * 此模块导出样式表内容，用于目录弹窗面板集合的UI组件
 */

/**
 * CSS加载器推送的数组项结构
 * @interface CSSLoaderItem
 */
interface CSSLoaderItem {
  /** 模块ID */
  id: string;
  /** CSS内容字符串 */
  content: string;
  /** 是否为源映射 */
  sourceMap?: boolean;
}

/**
 * CSS加载器模块接口
 * @interface CSSLoaderModule
 */
interface CSSLoaderModule {
  /**
   * 推送CSS内容到加载器
   * @param item - CSS加载项，包含模块ID和样式内容
   */
  push(item: [string, string]): void;
}

/**
 * Webpack模块导出函数类型
 * @param shouldUseSourceMap - 是否启用源映射
 * @returns CSS加载器模块实例
 */
type CSSLoaderFactory = (shouldUseSourceMap: boolean) => CSSLoaderModule;

/**
 * Webpack模块参数接口
 */
interface WebpackModule {
  /** 模块ID */
  id: string;
  /** 模块导出对象 */
  exports: CSSLoaderModule;
}

/**
 * 样式模块导出声明
 * 
 * 此模块包含以下样式组件：
 * - 通用遮罩层 (.common_mask)
 * - 目录弹窗面板 (.catalog_popup_panel_collection_body)
 * - 模型申请表单 (#model_apply_mask)
 * - 图片上传组件 (.picture_upload_wrapper)
 * - 表单输入字段（姓名、描述、联系方式等）
 * 
 * @remarks
 * 样式包含以下主要功能：
 * - 居中弹窗布局（788x566px）
 * - 响应式表单输入
 * - 图片上传与预览（支持多图）
 * - 加载动画效果
 * - 国际化支持（全局英文版布局调整）
 */
declare module "module_577671" {
  /**
   * CSS模块导出
   * 通过webpack的css-loader处理的样式表内容
   */
  const styles: CSSLoaderModule;
  export = styles;
}

/**
 * CSS类名命名空间
 * @namespace CatalogPopupStyles
 */
declare namespace CatalogPopupStyles {
  /** 通用遮罩层类名 */
  export const COMMON_MASK = "common_mask";
  
  /** 目录弹窗面板主体类名 */
  export const PANEL_BODY = "catalog_popup_panel_collection_body";
  
  /** 模型申请遮罩ID */
  export const MODEL_APPLY_MASK = "model_apply_mask";
  
  /** 图片上传包装器类名 */
  export const PICTURE_UPLOAD_WRAPPER = "picture_upload_wrapper";
  
  /** 缩略图项类名 */
  export const THUMBNAIL_ITEM = "thumbnail-item";
  
  /** 加载动画类名 */
  export const LOADING = "loading";
  
  /** 隐藏上传按钮类名 */
  export const HIDE_UPLOAD = "hideUpload";
  
  /** 错误提示类名 */
  export const ERROR_TIPS = "error_tips";
}

/**
 * 样式表内容常量
 * 包含完整的CSS规则定义
 */
declare const CSS_CONTENT: string;

export { CSSLoaderModule, CSSLoaderFactory, WebpackModule, CatalogPopupStyles, CSS_CONTENT };