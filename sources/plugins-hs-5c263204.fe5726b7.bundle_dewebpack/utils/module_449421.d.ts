/**
 * CSS样式模块类型定义
 * 该模块导出Webpack处理后的CSS内容
 * @module module_449421
 */

/**
 * Webpack模块导出函数类型
 * @param e - 模块导出对象
 * @param t - 模块依赖项
 * @param n - Webpack的require函数
 */
type WebpackModuleExport = (
  e: WebpackModule,
  t: Record<string, unknown>,
  n: WebpackRequire
) => void;

/**
 * Webpack模块对象接口
 */
interface WebpackModule {
  /** 模块唯一标识符 */
  id: string | number;
  /** 模块导出内容 */
  exports: CSSModuleExports;
}

/**
 * CSS模块导出接口
 */
interface CSSModuleExports {
  /**
   * 添加CSS内容到导出数组
   * @param content - CSS内容数组，包含模块ID和CSS字符串
   */
  push(content: [string | number, string]): void;
}

/**
 * Webpack require函数类型
 * 用于加载其他模块
 */
interface WebpackRequire {
  /**
   * 加载指定模块
   * @param moduleId - 模块ID
   * @returns CSS加载器函数
   */
  (moduleId: number): CSSLoaderFunction;
}

/**
 * CSS加载器函数类型
 * @param useSourceMap - 是否使用source map
 * @returns CSS模块导出对象
 */
type CSSLoaderFunction = (useSourceMap: boolean) => CSSModuleExports;

/**
 * 收藏夹分组面板样式类名定义
 */
interface FavGroupPanelStyles {
  /** 主面板容器 */
  'hsc-fav-group-panel': string;
  /** 面板头部 */
  header: string;
  /** 可编辑名称区域 */
  'edit-name': string;
  /** 正常状态样式 */
  'normal-status': string;
  /** 图标样式 */
  icon: string;
  /** 标题样式 */
  title: string;
  /** 关闭按钮区域 */
  'close-area': string;
  /** 关闭图标 */
  'close-icon': string;
  /** 信息弹窗样式 */
  'info-popup': string;
  /** 项目组容器 */
  'item-group': string;
  /** 项目内容 */
  'item-content': string;
  /** 单选按钮容器 */
  'radio-container': string;
  /** 单选按钮 */
  radio: string;
  /** 反馈弹窗内容 */
  'feed-back-pop-content': string;
  /** 底部区域 */
  footer: string;
  /** 收藏弹窗容器 */
  'fav-popup-container': string;
  /** 目录收藏面板 */
  'catalog-fav-panel': string;
}

declare const styles: FavGroupPanelStyles;
export default styles;