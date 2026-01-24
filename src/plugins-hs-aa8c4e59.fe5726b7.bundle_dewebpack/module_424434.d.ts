/**
 * CSS模块导出类型定义
 * @module CSSModuleExports
 * @description 为Webpack CSS模块加载器提供类型定义，该模块包含自动样式器(autostyler)组件的样式规则
 */

/**
 * CSS模块加载器函数类型
 * @param sourceMap - 是否生成source map，false表示不生成
 * @returns CSS模块API对象，包含push方法用于注册样式
 */
type CSSLoaderFunction = (sourceMap: boolean) => CSSModuleAPI;

/**
 * CSS模块API接口
 * @description 定义CSS模块的基本操作接口
 */
interface CSSModuleAPI {
  /**
   * 注册CSS样式规则
   * @param entry - 包含模块ID和CSS内容的元组
   */
  push(entry: [moduleId: string | number, cssContent: string]): void;
}

/**
 * Webpack模块导出函数签名
 * @param exports - 模块导出对象
 * @param module - 当前模块对象
 * @param require - 模块加载函数
 * @description 该模块导出autostyler组件的完整CSS样式定义，包括：
 * - 按钮样式（.btn, .btn-primary, .btn-default）
 * - 模态框覆盖层样式（.modalCover）
 * - 表单输入控件样式（.model-input, .model-select）
 * - 模板面板样式（.createStylerTemplatePanel）
 */
declare function module_424434(
  exports: { id: string | number },
  module: unknown,
  require: (moduleId: number) => CSSLoaderFunction
): void;

/**
 * CSS类名常量定义
 * @description 该模块中定义的所有CSS类名
 */
declare namespace AutostylerClasses {
  /** 按钮基础样式类 */
  const btn: string;
  
  /** 主要按钮样式类 */
  const btnPrimary: string;
  
  /** 默认按钮样式类 */
  const btnDefault: string;
  
  /** 模态框遮罩层样式类 */
  const modalCover: string;
  
  /** 警告状态显示样式类 */
  const autostylerWarningShow: string;
  
  /** 模型输入框样式类 */
  const modelInput: string;
  
  /** 模型选择器样式类 */
  const modelSelect: string;
  
  /** 创建样式模板面板容器类 */
  const createStylerTemplatePanel: string;
  
  /** 主面板样式类 */
  const mainPanel: string;
  
  /** 头部包装器样式类 */
  const headerwrap: string;
  
  /** 标题样式类 */
  const title: string;
  
  /** 关闭按钮样式类 */
  const btnClose: string;
  
  /** 模板房间面板按钮容器类 */
  const templateRoomPanelButtons: string;
  
  /** 模板房间面板单个按钮类 */
  const templateRoomPanelButton: string;
}

export default module_424434;
export { AutostylerClasses };