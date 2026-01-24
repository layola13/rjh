/**
 * CSS样式模块定义文件
 * 
 * 该模块导出一个用于autostyler组件的CSS样式表，包含按钮、模态框、图片选择面板等UI组件的样式定义。
 * 原始模块ID: 968870
 */

/**
 * Webpack模块加载器函数签名
 * @param exports - 模块导出对象
 * @param module - 当前模块对象
 * @param require - Webpack require函数，用于加载其他模块
 */
type WebpackModuleLoader = (
  exports: ModuleExports,
  module: Module,
  require: WebpackRequire
) => void;

/**
 * 模块导出对象接口
 */
interface ModuleExports {
  /** CSS样式推送方法 */
  push: (entry: [string, string]) => void;
  /** 模块ID */
  id: string;
}

/**
 * Webpack模块对象接口
 */
interface Module {
  /** 模块唯一标识符 */
  id: string;
  /** 模块导出内容 */
  exports: ModuleExports;
}

/**
 * Webpack require函数类型
 * @param moduleId - 要加载的模块ID
 * @returns 模块导出内容
 */
type WebpackRequire = (moduleId: number) => unknown;

/**
 * CSS加载器工厂函数类型
 * @param sourceMap - 是否生成source map
 * @returns CSS样式推送函数
 */
type CSSLoaderFactory = (sourceMap: boolean) => (entry: [string, string]) => void;

/**
 * 资源URL解析函数类型
 * @param resourcePath - 资源文件路径
 * @returns 解析后的资源URL
 */
type ResourceResolver = (resourcePath: string) => string;

/**
 * Autostyler CSS样式模块
 * 
 * 包含以下主要样式类：
 * - `.autostyler .btn` - 通用按钮样式
 * - `.autostyler .btn-primary` - 主要按钮样式
 * - `.autostyler .btn-default` - 默认按钮样式
 * - `.autostyler .modalCover` - 模态框遮罩层
 * - `.autostyler .autostylerWarningShow` - 警告状态显示
 * - `.autostyler .model-input` - 模型输入框样式
 * - `.autostyler .model-select` - 模型选择器样式
 * - `.autostyler .pickImagePanel` - 图片选择面板容器
 * - `.autostyler .pickImagePanel-footer` - 面板底部操作区域
 * - `.autostyler .mainPanel` - 主面板容器
 * - `.autostyler .emptyShow` - 空状态显示
 * - `.autostyler .upload-picture` - 图片上传按钮
 * 
 * @remarks
 * 该模块依赖以下外部模块：
 * - 992716: 资源URL解析器
 * - 986380: CSS加载器工厂
 * - 636695: 上传图标资源
 */
declare const autostylerCSSModule: WebpackModuleLoader;

export default autostylerCSSModule;

/**
 * CSS样式内容类型定义
 * 包含完整的autostyler组件样式规则
 */
export type AutostylerStyles = {
  /** 按钮基础样式：圆角2px，内边距4px 7px，外边距0 5px */
  btn: string;
  /** 主要按钮样式：背景色#4d9bd6 */
  'btn-primary': string;
  /** 默认按钮样式：白色背景，灰色边框 */
  'btn-default': string;
  /** 模态框遮罩层：固定定位，半透明黑色背景 */
  modalCover: string;
  /** 警告状态：红色边框 */
  autostylerWarningShow: string;
  /** 模型输入框：高度36px，字体14px */
  'model-input': string;
  /** 模型选择器：宽度340px，高度36px */
  'model-select': string;
  /** 图片选择面板：固定定位，z-index 900 */
  pickImagePanel: string;
  /** 面板底部：高度100px，渐变背景 */
  'pickImagePanel-footer': string;
  /** 上传区域：宽度600px */
  'pickImagePanel-footer-upload': string;
  /** 按钮组：宽度220px，flex布局 */
  'pickImagePanel-footer-buttons': string;
  /** 主面板：900x600px，居中显示，圆角阴影 */
  mainPanel: string;
  /** 头部区域：高度50px，白色背景 */
  headerwrap: string;
  /** 标题样式：16px粗体，左边距20px */
  title: string;
  /** 关闭按钮：16x16px，右上角定位 */
  'btn-close': string;
  /** 加载动画：40x40px，旋转动画 */
  waiting: string;
  /** 空状态显示：414px高度，垂直居中 */
  emptyShow: string;
  /** 空状态图标：120x120px */
  emptyIcon: string;
  /** 空状态文本：12px，灰色 */
  emptyText: string;
  /** 高亮文本：蓝色下划线，可点击 */
  emptyHighlight: string;
  /** 上传图片按钮：左边距40px */
  'upload-picture': string;
  /** 上传图标：20x20px背景图 */
  'upload-icon': string;
  /** 上传按钮文字：粗体，黑色，12px */
  'upload-name': string;
};