/**
 * CSS模块加载器类型定义
 * Module: module_499713
 * Original ID: 499713
 */

/**
 * Webpack CSS模块导出函数类型
 * @param moduleExports - 当前模块的导出对象
 * @param require - Webpack的require函数
 * @param moduleId - 当前模块的ID
 */
declare module 'module_499713' {
  /**
   * CSS样式字符串内容
   * 包含 .renewal-button 样式类的定义
   */
  interface CSSModuleContent {
    /** CSS选择器标识符 */
    readonly id: string | number;
    
    /** 
     * CSS样式规则数组
     * [moduleId, cssContent, sourceMap?]
     */
    readonly content: readonly [string | number, string, unknown?];
  }

  /**
   * CSS加载器推送方法
   * @param cssRule - CSS规则数组 [moduleId, cssContent]
   */
  interface CSSLoader {
    (isSourceMap: boolean): {
      push(cssRule: readonly [string | number, string]): void;
    };
  }

  /**
   * 续费按钮样式类
   * 
   * 样式特性：
   * - 文字颜色: #1C1C1C (深灰黑色)
   * - 字体大小: 12px
   * - 字体家族: PingFangSC-Semibold (苹方半粗体)
   * - 内边距: 3px 8px
   * - 边框圆角: 左侧圆角 20px，右侧直角
   * - 背景: 从 #E3FFB4 (淡绿色) 到 #FFBD5A (橙黄色) 的线性渐变
   */
  const renewalButtonStyles: string;

  export default renewalButtonStyles;
}

/**
 * CSS内容常量
 * 包含 .renewal-button 类的完整样式定义
 */
declare const CSS_CONTENT: ".renewal-button {\n color: #1C1C1C;\n font-size: 12px;\n line-height: 1;\n font-family: PingFangSC-Semibold;\n padding: 3px 8px;\n border-radius: 20px 0 0 20px;\n background: linear-gradient(to right, #E3FFB4, #FFBD5A);\n}\n";