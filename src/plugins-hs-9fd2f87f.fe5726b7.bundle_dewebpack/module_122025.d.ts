/**
 * CSS 模块导出声明
 * 模块ID: 122025
 * 用途: 手动光照面板样式定义
 */

/**
 * Webpack 模块工厂函数类型
 * @param e - 模块导出对象 (module.exports)
 * @param t - 模块本身 (module)
 * @param n - require 函数，用于导入其他模块
 */
declare function moduleFactory(
  e: { 
    /** 模块导出对象 */
    exports: any; 
    /** 模块唯一标识符 */
    id: string | number; 
  },
  t: any,
  n: (moduleId: number) => CSSModuleLoader
): void;

/**
 * CSS 模块加载器接口
 */
interface CSSModuleLoader {
  /**
   * 将 CSS 内容推送到样式表
   * @param pushFalse - 配置标志（通常为 false 表示非 HMR 模式）
   * @returns CSS 加载器实例，提供 push 方法
   */
  (pushFalse: boolean): {
    /**
     * 添加 CSS 规则到样式表
     * @param entry - [模块ID, CSS内容字符串] 元组
     */
    push(entry: [string | number, string]): void;
  };
}

/**
 * 手动光照面板 CSS 样式内容
 * 包含以下组件的样式定义：
 * - 点光源 (pointlight)
 * - 侧光 (sidelight) 
 * - 聚光灯 (spotlight)
 * - 物理光源 (phyLight)
 * - 滑块输入控件 (slider-input)
 * - 长度输入控件 (length-input)
 * - 位置面板 (positionPanel)
 * - 双滑块输入控件 (double-slider-input)
 * 
 * 主要样式特性：
 * - 深色主题配色 (#424247 背景, #FFFFFF 文字)
 * - 蓝色高亮交互 (#327DFF)
 * - 自适应宽度布局
 * - 自定义箭头控件样式
 */
declare const cssContent: string;

export default moduleFactory;
export { cssContent, CSSModuleLoader };