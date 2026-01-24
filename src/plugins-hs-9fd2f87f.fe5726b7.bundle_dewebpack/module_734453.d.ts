/**
 * CSS样式模块声明文件
 * 定义了自定义建模文本预览面板的样式导出
 * @module CustomizedModelingTextPreviewPanelStyles
 */

/**
 * CSS模块加载器函数类型
 * @param sourceMap - 是否启用源映射
 * @returns CSS模块实例，包含push方法用于添加样式规则
 */
declare function cssLoader(sourceMap: boolean): CSSModule;

/**
 * CSS模块实例接口
 * 提供向样式系统推送CSS规则的能力
 */
interface CSSModule {
  /**
   * 向CSS系统推送样式规则
   * @param rule - 包含模块ID、CSS内容和可选源映射的元组
   */
  push(rule: [string, string, string?]): void;
}

/**
 * 样式规则元组类型
 * [0] - 模块标识符
 * [1] - CSS样式字符串
 * [2] - 可选的源映射信息
 */
type StyleRule = [moduleId: string, cssContent: string, sourceMap?: string];

/**
 * 自定义建模文本预览面板的CSS样式
 * 
 * 包含的主要样式类：
 * - `.customized-modeling-text-preview-panel` - 面板容器
 * - `.customized-modeling-panel-wrap` - 面板包装器（白色背景，圆角，固定定位）
 * - `.customized-modeling-panel-title` - 面板标题（14px加粗）
 * - `.customized-modeling-panel-text-set-default` - 默认设置按钮（右上角）
 * - `.react-radio` - 单选按钮组
 * - `.customized-modeling-panel-body` - 面板主体区域（220x200px）
 * - `.customized-modeling-panel-text-input` - 文本输入框
 * - `.customized-modeling-panel-text-font` - 字体选择器容器
 * - `.customized-modeling-panel-text-height` - 字高设置
 * - `.customized-modeling-text-font-dropdownlist` - 字体下拉列表（135px宽）
 * - `.customized-modeling-panel-text-fontweight` - 字重选择器容器
 * - `.customized-modeling-text-fontweight-dropdownlist` - 字重下拉列表（70px宽）
 * 
 * @remarks
 * 此模块通过Webpack的css-loader处理并注入到DOM中
 * 面板定位于视口左下角（bottom: 57px, left: 10px）
 * z-index为101确保浮层显示优先级
 */
declare const styles: string;

export default styles;

/**
 * 模块导出接口
 * Webpack模块系统使用此接口管理CSS模块
 */
declare module '*.css' {
  const content: string;
  export default content;
}

/**
 * CSS类名常量枚举
 * 提供类型安全的样式类名引用
 */
export enum CSSClassNames {
  /** 面板根容器类名 */
  PREVIEW_PANEL = 'customized-modeling-text-preview-panel',
  
  /** 面板包装器类名 */
  PANEL_WRAP = 'customized-modeling-panel-wrap',
  
  /** 面板标题类名 */
  PANEL_TITLE = 'customized-modeling-panel-title',
  
  /** 设置默认按钮类名 */
  SET_DEFAULT_BUTTON = 'customized-modeling-panel-text-set-default',
  
  /** 单选按钮类名 */
  RADIO_BUTTON = 'react-radio',
  
  /** 面板主体类名 */
  PANEL_BODY = 'customized-modeling-panel-body',
  
  /** 文本输入框类名 */
  TEXT_INPUT = 'customized-modeling-panel-text-input',
  
  /** 字体选择器类名 */
  TEXT_FONT = 'customized-modeling-panel-text-font',
  
  /** 字高设置类名 */
  TEXT_HEIGHT = 'customized-modeling-panel-text-height',
  
  /** 字体下拉列表类名 */
  FONT_DROPDOWN = 'customized-modeling-text-font-dropdownlist',
  
  /** 字重选择器类名 */
  FONT_WEIGHT = 'customized-modeling-panel-text-fontweight',
  
  /** 字重下拉列表类名 */
  FONT_WEIGHT_DROPDOWN = 'customized-modeling-text-fontweight-dropdownlist'
}