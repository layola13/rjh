/**
 * CSS样式模块的TypeScript类型定义
 * 该模块导出UI气泡提示组件的样式表
 * @module BubbleTipsStyles
 */

/**
 * Webpack模块工厂函数类型
 * @param exports - 模块导出对象
 * @param require - 模块加载函数
 * @param module - 当前模块对象
 */
type WebpackModuleFactory = (
  exports: any,
  require: WebpackRequire,
  module: WebpackModule
) => void;

/**
 * Webpack require函数接口
 */
interface WebpackRequire {
  /**
   * 加载指定ID的模块
   * @param moduleId - 模块标识符
   * @returns 模块导出内容
   */
  (moduleId: number): any;
}

/**
 * Webpack模块对象接口
 */
interface WebpackModule {
  /** 模块唯一标识符 */
  id: string | number;
  /** 模块导出对象 */
  exports: any;
}

/**
 * CSS样式加载器返回类型
 * 包含push方法用于添加样式规则
 */
interface CSSModuleExports {
  /**
   * 向样式表添加CSS规则
   * @param rule - CSS规则数组，包含模块ID和CSS字符串
   */
  push(rule: [string | number, string]): void;
}

/**
 * 气泡提示组件的CSS类名定义
 */
interface BubbleTipsClassNames {
  /** 气泡提示容器根类名 */
  'ui-bubbletips': string;
  /** 显示状态类名 */
  show: string;
  /** 隐藏状态类名 */
  hide: string;
  /** 蓝色装饰线类名 */
  blue_line: string;
  /** 内容包装器类名 */
  'ui-bubbletips-wrapper': string;
  /** 彩色提示图标类名 */
  colorTipIcon: string;
  /** "已知晓"按钮类名 */
  knowed: string;
  /** 箭头图标类名 */
  iconArrow: string;
  /** 右侧定位类名 */
  right: string;
  /** 左侧定位类名 */
  left: string;
  /** 顶部定位类名 */
  top: string;
  /** 底部定位类名 */
  bottom: string;
  /** 内容区域类名 */
  content: string;
  /** 链接URL类名 */
  link_url: string;
}

/**
 * 模块导出的CSS样式内容
 * 包含.ui-bubbletips组件及其子元素的完整样式定义
 * 
 * 支持的布局方向：
 * - left: 左侧气泡（默认）
 * - right: 右侧气泡
 * - top: 顶部气泡
 * - bottom: 底部气泡
 * 
 * 主要特性：
 * - 绝对定位的气泡容器
 * - 带阴影效果的白色背景
 * - 可配置的蓝色装饰线
 * - 响应式箭头指示器
 * - "已知晓"交互按钮
 */
declare const bubbleTipsStyles: CSSModuleExports;

export default bubbleTipsStyles;
export type { BubbleTipsClassNames, CSSModuleExports, WebpackModule, WebpackRequire };