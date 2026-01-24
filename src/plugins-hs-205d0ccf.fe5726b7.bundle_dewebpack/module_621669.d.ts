/**
 * Ant Design 圆角输入框样式模块
 * @module RoundInputStyles
 * @description 为 Ant Design 输入框组件提供圆角样式主题，支持亮色和暗色两种教学模式
 */

/**
 * CSS 模块导出接口
 * @description 定义 webpack css-loader 导出的标准结构
 */
interface CSSModuleExport {
  /**
   * 模块标识符
   */
  id: string;
  
  /**
   * CSS 内容字符串
   */
  content: string;
  
  /**
   * 是否为源映射
   */
  sourceMap: boolean;
}

/**
 * CSS Loader 函数类型
 * @param useSourceMap - 是否启用源映射
 * @returns 返回包含 push 方法的对象，用于注册 CSS 模块
 */
type CSSLoaderFunction = (useSourceMap: boolean) => {
  /**
   * 注册 CSS 模块到样式系统
   * @param module - CSS 模块数据 [moduleId, cssContent]
   */
  push(module: [string, string]): void;
};

/**
 * 圆角输入框样式定义
 * @description 包含以下特性：
 * - 基础圆角样式（20px 边框半径）
 * - 悬停和聚焦状态的交互效果
 * - 清除图标按钮样式
 * - 亮色模式 (teaching-light)：浅色背景 + 深色文字
 * - 暗色模式 (teaching-black)：浅色背景 + 白色文字
 * 
 * @remarks
 * 样式类名：
 * - `.ant-input-affix-wrapper.round-input` - 基础样式
 * - `.round-input.teaching-light` - 亮色主题
 * - `.round-input.teaching-black` - 暗色主题
 * - `.clear-icon-wrapper` - 清除按钮容器
 */
declare const roundInputStyles: string;

/**
 * 模块导出声明
 * @description 该模块通过 webpack css-loader 处理，将 CSS 内容注入到页面中
 */
export = roundInputStyles;

/**
 * CSS 样式内容常量
 * @internal
 */
declare const CSS_CONTENT: `
.ant-input-affix-wrapper.round-input {
  outline: none !important;
  box-shadow: none !important;
  border-radius: 20px !important;
  background: rgba(27, 68, 180, 0.08);
  border: 0.5px solid #b8bed4;
  height: 36px;
}

.ant-input-affix-wrapper.round-input:hover {
  background: rgba(57, 110, 254, 0.1);
  border: 1px solid #396efe;
}

.ant-input-affix-wrapper.round-input.ant-input-affix-wrapper-focused {
  background: rgba(57, 110, 254, 0.1);
  border: 1px solid #396efe;
}

.ant-input-affix-wrapper.round-input input {
  background: transparent;
  border: none;
  font-size: 12px;
}

.ant-input-affix-wrapper.round-input .clear-icon-wrapper {
  width: 18px;
  height: 18px;
  border-radius: 9px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e1e1e6;
  margin-right: 6px;
}

.ant-input-affix-wrapper.round-input .clear-icon-wrapper:hover {
  background-color: #396efe;
}

.ant-input-affix-wrapper.round-input .clear-icon-wrapper:hover .clear-icon {
  color: #fff;
}

.ant-input-affix-wrapper.round-input .clear-icon-wrapper .clear-icon {
  font-size: 12px;
  color: #1c1c1c;
}

.ant-input-affix-wrapper.round-input.teaching-light {
  background: rgba(27, 68, 180, 0.08);
  border: 0.5px solid #b8bed4;
}

.ant-input-affix-wrapper.round-input.teaching-light .ant-input {
  color: #33353b;
}

.ant-input-affix-wrapper.round-input.teaching-light:hover {
  background: rgba(57, 110, 254, 0.1);
  border: 1px solid #396efe;
}

.ant-input-affix-wrapper.round-input.teaching-light.ant-input-affix-wrapper-focused {
  background: rgba(57, 110, 254, 0.1);
  border: 1px solid #396efe;
}

.ant-input-affix-wrapper.round-input.teaching-black {
  background: rgba(27, 68, 180, 0.08);
  border: 0.5px solid #b8bed4;
}

.ant-input-affix-wrapper.round-input.teaching-black .ant-input {
  color: #fff;
}

.ant-input-affix-wrapper.round-input.teaching-black:hover {
  background: rgba(57, 110, 254, 0.2);
  border: 1px solid #396efe;
}

.ant-input-affix-wrapper.round-input.teaching-black.ant-input-affix-wrapper-focused {
  background: rgba(57, 110, 254, 0.2);
  border: 1px solid #396efe;
}
`;