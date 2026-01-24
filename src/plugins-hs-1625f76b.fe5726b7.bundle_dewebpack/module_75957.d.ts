/**
 * CSS模块加载器函数的类型定义
 * 用于处理Webpack环境下的CSS模块导出
 * 
 * @module CSSModuleLoader
 */

/**
 * CSS模块加载器函数
 * 
 * @param exports - Webpack模块导出对象，用于挂载CSS内容
 * @param require - Webpack require函数，用于加载依赖模块
 * @param moduleLoader - CSS加载器工具函数，用于处理CSS字符串
 */
declare function cssModuleLoader(
  exports: WebpackModuleExports,
  require: WebpackRequire,
  moduleLoader: CSSLoaderFactory
): void;

/**
 * Webpack模块导出对象接口
 */
interface WebpackModuleExports {
  /** 模块唯一标识符 */
  id: string | number;
  /** 模块导出内容 */
  exports: CSSModuleContent;
}

/**
 * Webpack require函数类型
 * 
 * @param moduleId - 要加载的模块ID
 * @returns 模块导出内容
 */
type WebpackRequire = (moduleId: number) => unknown;

/**
 * CSS加载器工厂函数类型
 * 
 * @param sourceMap - 是否生成source map
 * @returns CSS加载器实例
 */
type CSSLoaderFactory = (sourceMap: boolean) => CSSLoader;

/**
 * CSS加载器接口
 */
interface CSSLoader {
  /**
   * 添加CSS规则到模块
   * 
   * @param cssRule - CSS规则数组 [moduleId, cssContent, sourceMap?]
   */
  push(cssRule: [string | number, string, string?]): void;
}

/**
 * CSS模块内容接口
 */
interface CSSModuleContent {
  /** CSS文本内容 */
  toString(): string;
  /** CSS规则数组 */
  [index: number]: unknown;
}

/**
 * 资源路径解析函数类型
 * 用于解析CSS中引用的静态资源路径
 * 
 * @param moduleId - 资源模块ID
 * @returns 解析后的资源URL
 */
type AssetResolver = (moduleId: number) => string;

/**
 * CSS类名常量
 */
declare namespace CatalogSidebarStyles {
  /** 切换目录侧边栏的主容器类名 */
  const TOGGLE_CATALOG_SIDEBAR: '.toggle-catalog-sidebar';
  
  /** 隐藏状态的容器类名 */
  const TOGGLE_CATALOG_SIDEBAR_CONTAINER_HIDE: '.toggle-catalog-sidebar-container-hide';
  
  /** 目录库容器类名 */
  const CATALOG_LIB_CONTAINER: '.catalogLibContainer';
  
  /** HSC菜单容器类名 */
  const HSC_MENU_CONTAINER: '.hsc-menu-container';
  
  /** 页头容器类名 */
  const HEADER: '#header';
  
  /** 默认环境下的页头类名 */
  const IN_DEFAULT_ENV: 'header.in-default-env';
  
  /** 折叠内容按钮类名 */
  const BTN_CONTENT_FOLDED: '.btn-content-folded';
}

/**
 * CSS样式规则配置
 */
interface CatalogSidebarStyleConfig {
  /** 侧边栏基础样式 */
  toggleCatalogSidebar: {
    position: 'absolute';
    pointerEvents: 'none';
    height: string;
    width: string;
    background: string;
    zIndex: number;
  };
  
  /** 隐藏状态样式 */
  toggleCatalogSidebarHide: {
    width: string;
    background: string;
  };
  
  /** 菜单容器样式重置 */
  hscMenuContainer: {
    background: 'unset';
    backdropFilter: 'unset';
  };
  
  /** 页头样式重置 */
  headerInDefaultEnv: {
    background: string;
  };
  
  /** 折叠按钮样式 */
  btnContentFolded: {
    transition: string;
    height: string;
    backgroundImage: string;
  };
}

/**
 * 静态资源模块ID常量
 */
declare const enum AssetModuleId {
  /** 资源模块ID 1 (可能是背景图片) */
  ASSET_202479 = 202479,
  
  /** 资源模块ID 2 (可能是背景图片) */
  ASSET_88166 = 88166,
  
  /** CSS加载器模块ID */
  CSS_LOADER = 986380,
  
  /** 资源解析器模块ID */
  ASSET_RESOLVER = 992716
}

export {
  cssModuleLoader,
  WebpackModuleExports,
  WebpackRequire,
  CSSLoaderFactory,
  CSSLoader,
  CSSModuleContent,
  AssetResolver,
  CatalogSidebarStyles,
  CatalogSidebarStyleConfig,
  AssetModuleId
};