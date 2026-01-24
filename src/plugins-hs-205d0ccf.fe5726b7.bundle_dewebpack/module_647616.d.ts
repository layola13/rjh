/**
 * CSS样式模块声明
 * 用于Webpack CSS加载器处理的样式表模块
 * @module SelectImageNumContentStyles
 */

/**
 * CSS加载器导出的样式内容数组
 * 格式: [moduleId, cssContent, sourceMap?]
 */
type CSSLoaderExport = [string, string, string?];

/**
 * Webpack模块导出函数签名
 * @param exports - 模块导出对象
 * @param module - 当前模块对象
 * @param require - Webpack require函数
 */
declare function moduleExport(
  exports: { id: string; exports: unknown },
  module: unknown,
  require: (moduleId: number) => (toString: boolean) => { push: (content: CSSLoaderExport) => void }
): void;

/**
 * 选择图片数量组件的样式定义
 * 包含按钮容器、按钮样式、激活状态和徽章图标等样式
 */
declare module "*.css" {
  /**
   * 样式类名映射
   */
  interface SelectImageNumContentStyles {
    /** 按钮容器样式 - flex布局，顶部边距20px */
    "btns": string;
    
    /** Ant Design按钮基础样式 - 最小宽度80px，右边距8px，圆角4px */
    "homestyler-ui-components": string;
    
    /** 默认按钮样式 - 白色文字，半透明背景 */
    "ant-btn-default": string;
    
    /** 激活状态按钮样式 - 蓝色边框3px，行高30px */
    "select-image-count-active": string;
    
    /** 图片数量选择器容器 - 相对定位 */
    "select-image-count": string;
    
    /** 徽章图标 - 绝对定位于右上角，尺寸20x12px */
    "benefit_img": string;
  }

  const styles: SelectImageNumContentStyles;
  export default styles;
}

/**
 * CSS内容字符串
 * 定义选择图片数量组件的完整样式规则
 */
declare const cssContent: string;

export { cssContent, CSSLoaderExport, SelectImageNumContentStyles };