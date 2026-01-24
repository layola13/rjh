/**
 * CSS样式模块类型定义
 * 用于Webpack css-loader导出的样式模块
 */

/**
 * CSS导出函数类型
 * @param sourceMap - 是否生成source map
 * @returns CSS模块API对象
 */
type CSSLoaderAPI = (sourceMap: boolean) => {
  /**
   * 添加CSS规则到模块
   * @param module - 包含模块ID和CSS内容的数组 [moduleId, cssContent, mediaQuery?, sourceMap?]
   */
  push(module: [string | number, string, string?, any?]): void;
};

/**
 * Webpack模块导出函数
 * @param exports - 模块导出对象
 * @param module - Webpack模块对象，包含id等元数据
 * @param require - Webpack的require函数，用于加载依赖模块
 */
declare function autostylerCSSModule(
  exports: any,
  module: { id: string | number; exports: any },
  require: (moduleId: number) => CSSLoaderAPI
): void;

/**
 * AutoStyler组件样式定义
 * 包含以下UI元素的样式：
 * - .btn: 按钮基础样式（圆角、内边距、外边距）
 * - .btn-primary: 主要按钮（蓝色背景 #4d9bd6）
 * - .btn-default: 默认按钮（白色背景，带边框）
 * - .modalCover: 模态框遮罩层（半透明黑色背景）
 * - .autostylerWarningShow: 警告状态样式（红色边框）
 * - .model-input: 输入框样式（高度36px，字号14px）
 * - .model-select: 下拉选择器样式（高度36px，宽度340px）
 * - .createStylerTemplatePanel: 样式模板创建面板
 * - .add-picture-button-container: 图片上传按钮容器
 *   - 默认状态：灰色背景 #F2F2F2
 *   - 悬停状态：蓝色边框和半透明蓝色背景
 *   - 错误状态：红色边框和按钮
 * - .pictureView: 图片预览视图
 * - .add-picture-button: 添加图片按钮（圆形，带十字图标）
 */
interface AutoStylerCSSModule {
  /** 按钮容器类名 */
  readonly btn: string;
  /** 主要按钮类名 */
  readonly 'btn-primary': string;
  /** 默认按钮类名 */
  readonly 'btn-default': string;
  /** 模态框遮罩层类名 */
  readonly modalCover: string;
  /** 警告显示状态类名 */
  readonly autostylerWarningShow: string;
  /** 模型输入框类名 */
  readonly 'model-input': string;
  /** 模型选择器类名 */
  readonly 'model-select': string;
  /** 样式模板创建面板类名 */
  readonly createStylerTemplatePanel: string;
  /** 添加图片按钮容器类名 */
  readonly 'add-picture-button-container': string;
  /** 添加图片按钮容器悬停状态类名 */
  readonly 'add-picture-button-container-hover': string;
  /** 图片红色边框警告状态类名 */
  readonly pictureRedLine: string;
  /** 图片预览视图类名 */
  readonly pictureView: string;
  /** 添加图片按钮内容类名 */
  readonly 'add-picture-button-content': string;
  /** 添加图片按钮类名 */
  readonly 'add-picture-button': string;
  /** 添加图片按钮标签类名 */
  readonly 'add-picture-button-label': string;
  /** 添加图片按钮内容隐藏状态类名 */
  readonly 'add-picture-button-content-hide': string;
}

export = autostylerCSSModule;