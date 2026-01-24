/**
 * CSS模块加载器类型定义
 * 用于Webpack css-loader的模块导出类型
 */

/**
 * CSS样式导出模块
 * 通过css-loader处理后导出的CSS内容数组
 */
declare module 'module_572114' {
  /**
   * CSS模块ID
   */
  export const id: string | number;

  /**
   * CSS模块导出函数
   * @param sourceMap - 是否启用source map
   * @returns CSS加载器实例，提供push方法用于注入样式
   */
  interface CSSLoader {
    /**
     * 推送CSS内容到样式系统
     * @param content - CSS内容数组，包含模块ID和CSS字符串
     */
    push(content: [string | number, string]): void;
  }

  /**
   * CSS加载器工厂函数类型
   * @param sourceMap - 是否生成source map
   * @returns CSS加载器实例
   */
  type CSSLoaderFactory = (sourceMap: boolean) => CSSLoader;

  /**
   * 模块导出的CSS内容
   * 包含以下样式类：
   * - .round-icon: 圆角图标容器基础样式
   * - .round-icon .icon: 图标元素样式
   * - .round-icon .text: 文本标签样式
   * - .round-icon.teaching-light: 浅色主题样式
   * - .round-icon.teaching-black: 深色主题样式
   */
  const content: CSSLoader;

  export default content;
}

/**
 * CSS样式类名映射接口
 */
interface RoundIconStyles {
  /** 圆角图标容器 - 包含flex布局、过渡动画、圆角边框 */
  'round-icon': string;
  
  /** 图标元素 - 设置为可见溢出 */
  icon: string;
  
  /** 文本标签 - 使用阿里巴巴普惠体粗体字体 */
  text: string;
  
  /** 浅色教学主题 - 黑色图标，悬停时浅蓝背景 */
  'teaching-light': string;
  
  /** 深色教学主题 - 白色图标，悬停时半透明白色背景 */
  'teaching-black': string;
}

/**
 * 样式模块默认导出
 */
declare const styles: RoundIconStyles;
export default styles;