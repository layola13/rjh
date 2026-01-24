/**
 * CSS模块导出类型定义
 * 该模块导出卡片提示组件的样式表
 */

/**
 * Webpack模块导出函数类型
 * @param exports - 模块导出对象
 * @param module - 模块元数据对象
 * @param require - 模块加载函数
 */
declare module 'module_541287' {
  /**
   * 模块导出对象
   */
  interface ModuleExports {
    /**
     * 模块唯一标识符
     */
    id: string | number;

    /**
     * CSS内容数组
     * 格式: [模块ID, CSS字符串内容, 源映射标志]
     */
    exports: Array<[string | number, string, boolean?]>;
  }

  /**
   * Webpack require函数类型
   * @param moduleId - 要加载的模块ID
   * @returns CSS加载器实例
   */
  interface WebpackRequire {
    (moduleId: number): CSSLoader;
  }

  /**
   * CSS加载器接口
   * 用于处理CSS模块的加载和注入
   */
  interface CSSLoader {
    /**
     * 推送CSS内容到加载器
     * @param content - CSS内容数组 [模块ID, CSS字符串, 源映射标志]
     */
    push(content: [string | number, string, boolean?]): void;
  }

  /**
   * 模块工厂函数
   * @param module - 当前模块对象
   * @param exports - 模块导出对象
   * @param require - 模块加载函数
   */
  export default function (
    module: ModuleExports,
    exports: unknown,
    require: WebpackRequire
  ): void;
}

/**
 * 卡片提示组件CSS类名定义
 */
declare module 'module_541287/styles' {
  /**
   * 卡片提示组件的CSS类名映射
   */
  export interface CardTipsStyles {
    /** 卡片提示容器包装器 - 宽度310px，带内边距 */
    'card-tips-wrapper': string;

    /** 卡片顶部区域 - 包含标题、关闭按钮和不再提醒选项 */
    'card-tips-top': string;

    /** 卡片标题 - 使用阿里巴巴普惠体粗体，16px */
    'card-tips-title': string;

    /** 顶部关闭按钮 - 20x20px，绝对定位 */
    'top-close': string;

    /** 关闭按钮图标 - 12px字体大小 */
    'round-icon': string;

    /** 不再提醒选项 - 位于右上角 */
    'card-tips-not-remind': string;

    /** 卡片内容区域 - 带圆角和内边距 */
    'card-tips-word': string;

    /** 卡片文字介绍 - 12px，80px高度，支持换行 */
    'card-tips-word-introduction': string;

    /** 前往按钮包装器 - 位于右下角 */
    'goto-wrapper': string;

    /** 浅色主题样式 */
    'teaching-light': string;

    /** 深色主题样式 */
    'teaching-black': string;
  }

  /**
   * 主题变体类型
   */
  export type ThemeVariant = 'teaching-light' | 'teaching-black';

  /**
   * 浅色主题配色
   */
  export interface LightThemeColors {
    /** 内容背景色 */
    backgroundColor: '#f5f5f5';
    /** 文字介绍颜色 */
    textColor: '#60646f';
    /** 标题颜色 */
    titleColor: '#33353b';
  }

  /**
   * 深色主题配色
   */
  export interface DarkThemeColors {
    /** 内容背景色 */
    backgroundColor: '#434447';
    /** 文字介绍颜色 */
    textColor: '#cccccd';
    /** 标题颜色 */
    titleColor: '#fff';
  }
}