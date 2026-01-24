/**
 * CSS模块导出类型定义
 * Module: module_775987
 * Original ID: 775987
 */

/**
 * CSS加载器导出接口
 * 表示通过Webpack CSS加载器处理后的模块导出
 */
interface CSSModuleExports {
  /** CSS内容字符串数组 */
  content: Array<[string, string, string]>;
  /** 模块ID */
  id: string;
  /** 
   * 添加CSS规则到导出列表
   * @param item - CSS规则项 [模块ID, CSS内容, 源映射]
   */
  push(item: [string, string, string]): void;
  /** 转换为字符串表示 */
  toString(): string;
}

/**
 * 操作提示相关的CSS样式类型定义
 * 包含操作提示容器和文本的样式规则
 */
declare module 'module_775987' {
  /**
   * 导出CSS模块
   * 包含以下样式规则：
   * - #operation-tip-container: 操作提示容器的绝对定位样式
   * - #operation-tip-container .operation-tip-text: 提示文本的样式（圆角、半透明背景等）
   */
  const styles: CSSModuleExports;
  export default styles;
}

/**
 * 操作提示容器样式规则
 * - position: absolute
 * - left: 340px
 * - top: 54px
 * - z-index: 1002
 */
export interface OperationTipContainerStyle {
  position: 'absolute';
  left: '340px';
  top: '54px';
  zIndex: 1002;
}

/**
 * 操作提示文本样式规则
 * - position: relative
 * - left: 10px
 * - height: 30px
 * - border-radius: 15px
 * - display: flex
 * - align-items: center
 * - padding: 0 16px
 * - background: rgba(255, 255, 255, 0.4)
 */
export interface OperationTipTextStyle {
  position: 'relative';
  left: '10px';
  height: '30px';
  borderRadius: '15px';
  backgroundColor: 'white';
  display: 'flex';
  alignItems: 'center';
  padding: '0 16px';
  background: 'rgba(255, 255, 255, 0.4)';
}