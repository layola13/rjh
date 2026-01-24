/**
 * CSS Module Definition
 * 登录面板样式模块类型定义
 * 
 * @module LoginPanelStyles
 * @description 定义登录面板、弹窗及相关UI组件的CSS样式类型
 */

/**
 * CSS模块导出函数类型
 * @param useSourceMap - 是否使用source map进行调试
 * @returns CSS模块加载器实例
 */
type CSSModuleLoader = (useSourceMap: boolean) => CSSModule;

/**
 * CSS模块接口
 * 表示一个可以添加CSS内容的模块
 */
interface CSSModule {
  /**
   * 添加CSS规则到模块
   * @param cssRule - CSS规则数组，包含模块ID和CSS内容
   */
  push(cssRule: [string, string]): void;
}

/**
 * 登录面板样式选择器
 * 包含所有可用的CSS类名和ID选择器
 */
interface LoginPanelStyleSelectors {
  /** 登录面板容器 - 980x594px的主容器 */
  '#login-panel-container': CSSProperties;
  
  /** 登录面板主体 - 绝对定位的全屏覆盖层 */
  '#login-panel-container .login-panel': CSSProperties;
  
  /** 登录遮罩层 - 30%透明度的背景遮罩 */
  '#login-panel-container .login-panel .login-overlay': CSSProperties;
  
  /** 登录主体内容 - 858px宽的白色卡片容器 */
  '#login-panel-container .login-panel .login-body': CSSProperties;
  
  /** 左侧图片区域 - 394px宽的图片展示区 */
  '#login-panel-container .login-panel .login-body .left': CSSProperties;
  
  /** 左侧背景图片 */
  '#login-panel-container .login-panel .login-body .left img': CSSProperties;
  
  /** "了解更多"链接容器 */
  '#login-panel-container .login-panel .login-body .left .get-more-a': CSSProperties;
  
  /** "了解更多"文本样式 */
  '#login-panel-container .login-panel .login-body .left .get-more-a .get-more-span': CSSProperties;
  
  /** "了解更多"图标样式 */
  '#login-panel-container .login-panel .login-body .left .get-more-a .get-more-img': CSSProperties;
  
  /** 右侧表单区域 - 360px宽的登录表单容器 */
  '#login-panel-container .login-panel .login-body .right': CSSProperties;
  
  /** 登录iframe容器 */
  '#login-panel-container .login-panel .login-body .login-iframe': CSSProperties;
  
  /** 全局弹窗主体 */
  '#login-panel-container .login-panel .global-body': CSSProperties;
  
  /** 全局弹窗中的iframe - 360x630px */
  '#login-panel-container .login-panel .global-body .login-iframe': CSSProperties;
  
  /** 登录中弹窗容器 - 390x589px */
  '#logining-popup': CSSProperties;
  
  /** 登录中弹窗主体 */
  '#logining-popup #main': CSSProperties;
  
  /** 登录中弹窗左侧区域 */
  '#logining-popup #main .left': CSSProperties;
  
  /** 登录中弹窗左侧背景图 */
  '#logining-popup #main .left .left-bg': CSSProperties;
  
  /** 登录中弹窗"了解更多"链接 */
  '#logining-popup #main .left .get-more-a': CSSProperties;
  
  /** 登录中弹窗"了解更多"文本 */
  '#logining-popup #main .left .get-more-a .get-more-span': CSSProperties;
  
  /** 登录中弹窗"了解更多"图标 */
  '#logining-popup #main .left .get-more-a .get-more-img': CSSProperties;
  
  /** 登录中弹窗右侧表单区 */
  '#logining-popup #main .right': CSSProperties;
  
  /** 登录中弹窗标题 - 默认隐藏 */
  '#logining-popup #main .right .title': CSSProperties;
  
  /** 淘宝登录按钮 - 橙色边框白底按钮 */
  '#logining-popup #main .right .taobao-loginBtn': CSSProperties;
  
  /** 淘宝登录按钮悬停状态 - 橙色背景白字 */
  '#logining-popup #main .right .taobao-loginBtn:hover': CSSProperties;
  
  /** 淘宝登录内容区域 */
  '#logining-popup #main .right .taobao-login-content': CSSProperties;
  
  /** 登录提示弹窗 - 500px宽的提示框 */
  '#logining-popup-tip': CSSProperties;
  
  /** 登录提示弹窗主体 */
  '#logining-popup-tip #main': CSSProperties;
  
  /** 登录提示弹窗图标 */
  '#logining-popup-tip #main .img': CSSProperties;
  
  /** 登录提示弹窗文本内容 */
  '#logining-popup-tip #main .content': CSSProperties;
  
  /** EZHome透明背景类 */
  '.ezhomebackground': CSSProperties;
  
  /** EZHome图片透明背景类 */
  '.ezhomebackgroundimge': CSSProperties;
  
  /** EZHome模态框定位 - 居中980x594px */
  '.ezhome-modal': CSSProperties;
  
  /** EZHome淘宝模态框定位 - 居中438x623px */
  '.ezhome-taobao-modal': CSSProperties;
  
  /** 属性栏背景色 */
  '.propertybar': CSSProperties;
}

/**
 * CSS属性类型定义
 * 包含常用的CSS样式属性
 */
interface CSSProperties {
  width?: string;
  height?: string;
  padding?: string;
  margin?: string;
  position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  display?: string;
  float?: string;
  'z-index'?: number;
  opacity?: number;
  overflow?: string;
  'border-radius'?: string;
  'background-color'?: string;
  'box-shadow'?: string;
  'font-size'?: string;
  color?: string;
  'line-height'?: string;
  'justify-content'?: string;
  'min-height'?: string;
  'max-width'?: string;
  'min-width'?: string;
  transform?: string;
  'text-align'?: string;
  'border-style'?: string;
  border?: string;
  outline?: string;
  transition?: string;
  background?: string;
  cursor?: string;
  'box-sizing'?: string;
  'font-weight'?: number | string;
  visibility?: string;
  'margin-bottom'?: string;
  'margin-left'?: string;
  'padding-top'?: string;
}

/**
 * 模块导出类型
 * 表示此CSS模块的完整导出
 */
export type LoginPanelStylesModule = CSSModule;

/**
 * 样式选择器映射
 * 用于类型检查和IDE自动完成
 */
export type StyleSelectors = LoginPanelStyleSelectors;

declare const styles: LoginPanelStylesModule;
export default styles;