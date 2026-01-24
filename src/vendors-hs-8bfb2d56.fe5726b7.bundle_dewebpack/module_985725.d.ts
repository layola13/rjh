/**
 * CSS 模块导出类型定义
 * 用于 AI 素材内容列的样式模块
 * 模块 ID: 985725
 */

/**
 * Webpack CSS 模块加载器函数类型
 * @param sourceMap - 是否生成 source map
 * @returns CSS 模块加载器实例
 */
type CSSModuleLoader = (sourceMap: boolean) => CSSModuleLoaderInstance;

/**
 * CSS 模块加载器实例接口
 * 提供 push 方法用于注入 CSS 内容
 */
interface CSSModuleLoaderInstance {
  /**
   * 将 CSS 内容推送到模块系统
   * @param entry - CSS 模块条目 [模块ID, CSS内容字符串]
   */
  push(entry: [string, string]): void;
}

/**
 * Webpack 模块对象接口
 * 包含模块标识符和导出内容
 */
interface WebpackModule {
  /** 模块唯一标识符 */
  id: string;
  /** 模块导出对象 */
  exports: unknown;
}

/**
 * Webpack require 函数类型
 * 用于动态加载模块
 * @param moduleId - 要加载的模块 ID
 * @returns 模块的导出内容
 */
type WebpackRequire = (moduleId: number) => unknown;

/**
 * AI 素材内容列样式模块
 * 
 * 该模块导出 AI 素材生成页面的主要样式规则，包括：
 * - 响应式布局样式（桌面端和移动端）
 * - 表单组件样式（输入框、选择器、上传区域）
 * - 尺寸配置表单样式
 * - 生成按钮和页脚样式
 * - 图片上传预览和裁剪功能样式
 * - 动画效果（旋转加载动画）
 * - 错误状态提示样式
 * 
 * @param module - Webpack 模块对象
 * @param exports - 模块导出对象（未使用）
 * @param require - Webpack require 函数，用于加载 CSS 加载器（模块 986380）
 */
declare function aiMaterialContentColStyleModule(
  module: WebpackModule,
  exports: unknown,
  require: WebpackRequire
): void;

export default aiMaterialContentColStyleModule;

/**
 * CSS 类名导出（如果使用 CSS Modules）
 */
export interface AIMaterialContentColStyles {
  /** 主容器类名 */
  'ai-material-content-col': string;
  /** 隐藏元素 */
  hidden: string;
  /** 移动端样式 */
  mobile: string;
  /** 内容盒子 */
  'content-box': string;
  /** 垂直居中布局 */
  'flex-c-c': string;
  /** 步骤标签 */
  step: string;
  /** 滚动区域高度 */
  'scroll-height': string;
  /** 表单块 */
  'form-block': string;
  /** 表单标签 */
  'form-label': string;
  /** 表单输入框 */
  'form-input': string;
  /** 表单输入框错误状态 */
  'form-input-error': string;
  /** 表单选择器 */
  'form-select': string;
  /** 表单单位 */
  'form-unit': string;
  /** 尺寸表单 */
  'dimension-form': string;
  /** 尺寸行 */
  'dimension-row': string;
  /** 尺寸标签 */
  'dimension-label': string;
  /** 尺寸输入包装器 */
  'dimension-input-wrapper': string;
  /** 尺寸输入框 */
  'dimension-input': string;
  /** 输入错误状态 */
  'input-error': string;
  /** 尺寸单位 */
  'dimension-unit': string;
  /** 尺寸错误提示 */
  'dimension-error': string;
  /** 表单块错误 */
  'form-block-error': string;
  /** 表单错误右对齐 */
  'form-error-right': string;
  /** 购买更多按钮 */
  'buy-more': string;
  /** Logo 图标 */
  logo: string;
  /** 生成页脚 */
  'generate-footer': string;
  /** 生成费用提示 */
  'generate-cost-tips': string;
  /** 生成按钮 */
  'generate-button': string;
  /** 免费试用徽章 */
  'free-trial-badge': string;
  /** 免费试用次数 */
  'free-trial-count': string;
  /** 禁用状态 */
  'is-disabled': string;
  /** 文本居中 */
  'text-center': string;
  /** 上传图片 */
  'upload-img': string;
  /** 尺寸标题 */
  'dimension-title': string;
  /** 上传标题 */
  'upload-title': string;
  /** 上传包装器 */
  'upload-wrap': string;
  /** 上传卡片 */
  'upload-card': string;
  /** 上传图标 */
  'upload-icon': string;
  /** 图片预览包装器 */
  'image-preview-wrapper': string;
  /** 图片元素 */
  img: string;
  /** 关闭按钮包装器 */
  'close-wrapper': string;
  /** 关闭图标 */
  'close-icon': string;
  /** 手动裁剪按钮包装器 */
  'manual-crop-button-wrapper': string;
  /** 手动裁剪按钮 */
  'manual-crop-button': string;
  /** 手动裁剪图标 */
  'manual-crop-icon': string;
  /** 上传 iPad 图片 */
  'upload-ipad-img': string;
  /** 上传图片删除 */
  'upload-img-del': string;
  /** 相册为空状态 */
  'album-empty': string;
}