/**
 * CSS模块类型定义
 * @module CatalogImageButtonStyles
 * @description 目录图片按钮组件的样式模块类型定义
 */

/**
 * Webpack模块导出函数类型
 * @param exports - 模块导出对象
 * @param module - 当前模块对象
 * @param require - 模块加载函数
 */
declare module 'module_546132' {
  /**
   * 模块导出对象
   */
  interface ModuleExports {
    /**
     * 模块ID
     */
    id: number;
    
    /**
     * CSS内容数组
     * 格式: [moduleId, cssContent, sourceMap?]
     */
    push(entry: [number, string, boolean?]): void;
  }

  /**
   * CSS加载器函数类型
   * @param sourceMap - 是否包含source map
   * @returns CSS模块导出对象
   */
  type CssLoaderFunction = (sourceMap: boolean) => ModuleExports;

  /**
   * Webpack require函数类型
   * @param moduleId - 模块ID
   * @returns CSS加载器函数
   */
  type WebpackRequire = (moduleId: number) => CssLoaderFunction;

  /**
   * 模块工厂函数
   * @param exports - 导出对象
   * @param module - 模块对象
   * @param require - require函数
   */
  export default function (
    exports: Record<string, unknown>,
    module: { exports: ModuleExports; id: number },
    require: WebpackRequire
  ): void;
}

/**
 * 目录图片按钮CSS类名
 */
declare module 'CatalogImageButtonStyles' {
  /**
   * CSS类名映射接口
   */
  export interface CatalogImageButtonClasses {
    /**
     * 主容器类名
     * @description 目录图片按钮的主要容器样式
     */
    'catalog-image-button': string;

    /**
     * 禁用状态类名
     * @description 按钮禁用时的样式，包含40%透明度和禁止点击事件
     */
    'catalog-image-button-disable': string;

    /**
     * 文本描述类名
     * @description 按钮下方的文本描述区域样式
     */
    'text-description': string;

    /**
     * 快捷键描述类名
     * @description 显示快捷键提示的文本样式
     */
    'text-description-shortcut': string;

    /**
     * 悬停状态类名
     * @description 鼠标悬停时的高亮样式
     */
    'hover': string;

    /**
     * Beta标识图标类名
     * @description Beta版本标识的定位样式
     */
    'catalog-image-button-beta-icon': string;

    /**
     * 新功能标识图标类名
     * @description 新功能标识的定位样式
     */
    'catalog-image-new-icon': string;
  }

  /**
   * 导出CSS类名对象
   */
  const classes: CatalogImageButtonClasses;
  export default classes;
}

/**
 * 动画关键帧定义
 */
declare namespace CatalogImageButtonAnimations {
  /**
   * 悬停动画配置
   * @description 按钮悬停时的缩放和阴影动画效果
   */
  interface HoverAnimationKeyframes {
    /**
     * 动画结束状态 (100%)
     */
    end: {
      /** 缩放比例 1.01 倍 */
      transform: 'scale(1.01)';
      /** 移除底部边框 */
      borderBottom: 'none';
      /** 添加阴影效果 */
      boxShadow: '0px 4px 16px 0px rgba(25, 25, 50, 0.24)';
    };
  }

  /**
   * 动画名称
   */
  export const animationName: 'hoverAnimation';
}