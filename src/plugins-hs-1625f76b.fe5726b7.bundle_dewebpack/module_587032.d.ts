/**
 * CSS模块类型声明
 * Module: module_587032
 * Original ID: 587032
 * 
 * 该模块导出商家页面容器相关的CSS样式定义
 */

/**
 * Webpack CSS模块导出函数类型
 * @param useSourceMap - 是否使用source map
 * @returns CSS模块加载器实例
 */
type CSSModuleLoader = (useSourceMap: boolean) => {
  push: (entry: CSSModuleEntry) => void;
};

/**
 * CSS模块条目
 * @property 0 - 模块ID
 * @property 1 - CSS样式字符串
 */
type CSSModuleEntry = [moduleId: string, cssContent: string];

/**
 * Webpack模块参数
 * @param exports - 模块导出对象
 * @param module - 当前模块对象
 * @param require - Webpack require函数
 */
interface WebpackModuleParams {
  /** 模块导出对象 */
  exports: unknown;
  /** 当前模块实例 */
  module: {
    id: string;
    exports: unknown;
  };
  /** Webpack模块加载函数 */
  require: (moduleId: number) => CSSModuleLoader;
}

/**
 * 商家页面容器CSS模块
 * 
 * 该模块包含以下样式：
 * - .hsc-merchant-page-container: 主容器样式（280px宽度）
 * - .hsc-back-header: 返回头部区域
 * - .loading: 加载动画样式
 * - .merchant-search-icon: 搜索图标定位
 * - .high-commision: 高佣金商家展示区域
 * - .merchant-category-card: 商家分类卡片
 * - .shop-list: 商铺列表容器
 * - .hsc-search-box: 搜索框容器
 * 
 * @param e - 模块导出对象
 * @param t - 当前模块
 * @param n - Webpack require函数
 */
declare function module_587032(
  e: WebpackModuleParams['exports'],
  t: WebpackModuleParams['module'],
  n: WebpackModuleParams['require']
): void;

export default module_587032;

/**
 * CSS样式类名命名空间
 */
export interface MerchantPageStyles {
  /** 商家页面主容器 */
  'hsc-merchant-page-container': string;
  /** 返回头部 */
  'hsc-back-header': string;
  /** 返回提示文本 */
  'back-tip': string;
  /** 加载状态 */
  'loading': string;
  /** 商家搜索图标 */
  'merchant-search-icon': string;
  /** 高佣金区域 */
  'high-commision': string;
  /** 头部区域 */
  'header': string;
  /** 文本样式 */
  'text': string;
  /** 日期样式 */
  'date': string;
  /** 商家分类卡片 */
  'merchant-category-card': string;
  /** 商家分类名称 */
  'merchant-category-card-name': string;
  /** 查看更多 */
  'merchant-category-more': string;
  /** 商家图片容器 */
  'merchant-img-container': string;
  /** 商家图片 */
  'merchant-img': string;
  /** 商铺列表 */
  'shop-list': string;
  /** 搜索框 */
  'hsc-search-box': string;
  /** 头部区域 */
  'header-area': string;
}