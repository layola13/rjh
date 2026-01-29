/**
 * CSS模块类型定义
 * 该模块导出CSS样式表内容，用于收藏夹分组相关的UI组件样式
 */

/**
 * Webpack CSS加载器模块导出函数类型
 * @param isDevelopment - 是否为开发模式
 * @returns CSS模块加载器实例
 */
type CSSLoaderFactory = (isDevelopment: boolean) => CSSModuleLoader;

/**
 * CSS模块加载器接口
 * 用于处理和注入CSS样式到页面中
 */
interface CSSModuleLoader {
  /**
   * 添加CSS内容到加载器
   * @param moduleData - CSS模块数据元组 [模块ID, CSS内容字符串, 源映射?]
   */
  push(moduleData: [string | number, string, string?]): void;
}

/**
 * Webpack模块导出对象
 */
interface WebpackModuleExports {
  /** 模块ID */
  id: string | number;
  /** 模块导出内容 */
  exports: CSSModuleLoader;
}

/**
 * Webpack require函数类型
 * @param moduleId - 要加载的模块ID
 * @returns 模块导出的内容
 */
type WebpackRequire = (moduleId: number) => CSSLoaderFactory;

/**
 * 收藏夹分组样式模块
 * 
 * 该模块定义了以下组件的样式：
 * - `.all-group`: 收藏夹分组容器
 *   - `.header`: 分组头部，包含图标和标题
 *   - `.item-group`: 分组项容器
 *   - `.fav-item`: 单个收藏项，支持hover效果和编辑模式
 * - `.favorites-group`: 收藏夹分组管理区域
 *   - `.favorites-group-title`: 分组标题区域
 *   - `.favorites-group-title-create-btn`: 创建新分组按钮
 * - `.create-group-input`: 创建分组输入弹窗
 * 
 * @param moduleExports - Webpack模块导出对象
 * @param _unusedExports - 未使用的导出参数（兼容性保留）
 * @param webpackRequire - Webpack模块加载函数
 */
declare module "module_245822" {
  export default function (
    moduleExports: WebpackModuleExports,
    _unusedExports: unknown,
    webpackRequire: WebpackRequire
  ): void;
}

/**
 * CSS样式类名映射
 * 当作为CSS Module使用时的类型定义
 */
export interface FavoritesGroupStyles {
  /** 收藏夹分组容器样式类 */
  "all-group": string;
  /** 分组头部样式类 */
  header: string;
  /** 头部图标样式类 */
  icon: string;
  /** 分组项容器样式类 */
  "item-group": string;
  /** 分组项内容样式类 */
  "item-content": string;
  /** 单选框样式类 */
  radio: string;
  /** 收藏项样式类 */
  "fav-item": string;
  /** 显示输入框状态样式类 */
  "show-input": string;
  /** 图标视图样式类 */
  "hsc-iconfont-view": string;
  /** 错误提示样式类 */
  "error-tips": string;
  /** 正常状态样式类 */
  "normal-status": string;
  /** 文本样式类 */
  text: string;
  /** 图标组样式类 */
  icons: string;
  /** 编辑图标样式类 */
  edit: string;
  /** 删除图标样式类 */
  delete: string;
  /** 收藏夹分组样式类 */
  "favorites-group": string;
  /** 分组标题样式类 */
  "favorites-group-title": string;
  /** 分组标题文本样式类 */
  "favorites-group-title-label": string;
  /** 创建按钮样式类 */
  "favorites-group-title-create-btn": string;
  /** 创建分组输入框样式类 */
  "create-group-input": string;
  /** UI组件基础样式类 */
  "homestyler-ui-components": string;
  /** 弹出框项样式类 */
  "homestyler-popover-item": string;
  /** 弹出框内容样式类 */
  "homestyler-popover-content": string;
  /** 图标视图样式类（hs前缀） */
  "hs-iconfont-view": string;
}

declare const styles: FavoritesGroupStyles;
export default styles;