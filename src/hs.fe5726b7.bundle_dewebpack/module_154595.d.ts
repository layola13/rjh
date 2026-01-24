/**
 * CSS模块导出函数
 * 该模块导出一个CSS样式表，用于ToggleButton组件的样式定义
 */

/**
 * 模块导出函数签名
 * @param exports - 模块导出对象
 * @param cssLoader - CSS加载器函数，用于处理CSS内容
 * @param moduleId - 当前模块的唯一标识符
 */
export interface CSSModuleExports {
  /**
   * 模块ID
   */
  id: string | number;
  
  /**
   * CSS内容数组
   * 格式: [moduleId, cssContent, sourceMap?]
   */
  push(content: [string | number, string, string?]): void;
}

/**
 * CSS加载器函数类型
 * @param sourceMap - 是否生成source map
 * @returns CSS模块导出对象
 */
export type CSSLoaderFunction = (sourceMap: boolean) => CSSModuleExports;

/**
 * ToggleButton组件样式模块
 * 
 * 样式说明：
 * - .ToggleButton: 按钮组容器基础样式
 * - .ToggleButton span: 按钮组内文本样式
 * - .ToggleButton li: 单个按钮项样式
 * - .ToggleButton li#triggerOn: 开启按钮样式
 * - .ToggleButton li#triggerOff: 关闭按钮样式
 * - .ToggleButton li:hover: 按钮悬停状态样式
 * - .ToggleButton li.active: 按钮激活状态样式
 */
declare const styles: string;

export default styles;

/**
 * CSS样式内容定义
 */
export interface ToggleButtonStyles {
  /**
   * 按钮组容器样式
   * - margin: 0px
   * - padding: 0px
   */
  ToggleButton: string;
  
  /**
   * 按钮组内文本样式
   * - font-size: 13px
   * - cursor: default
   * - margin: 0 10px
   */
  ToggleButtonSpan: string;
  
  /**
   * 单个按钮项样式
   * - padding: 18px (left & right)
   * - font-size: 14px
   * - line-height: 20px
   * - background-color: #fff
   * - border: 1px solid #dcdcdc
   * - cursor: pointer
   */
  ToggleButtonItem: string;
  
  /**
   * 开启按钮特殊样式
   * - border-right-width: 0px (与关闭按钮相连)
   */
  triggerOn: string;
  
  /**
   * 关闭按钮样式
   */
  triggerOff: string;
  
  /**
   * 按钮悬停状态
   * - background-color: #f3f3f3
   */
  hover: string;
  
  /**
   * 按钮激活状态
   * - background-color: #237ab9
   * - color: white
   */
  active: string;
}