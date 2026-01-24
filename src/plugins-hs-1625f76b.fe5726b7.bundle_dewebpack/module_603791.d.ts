/**
 * CSS模块导出类型定义
 * 该模块导出团队品牌页面的样式表内容
 * @module TeamBrandPageStyles
 */

/**
 * Webpack CSS加载器模块函数签名
 * @param exports - 模块导出对象
 * @param cssLoaderApi - CSS加载器API工具函数
 * @param hotUpdateApi - 热更新API（可选）
 */
export default function (
  exports: CSSModuleExports,
  cssLoaderApi: CSSLoaderAPI,
  hotUpdateApi?: HotModuleReplacementAPI
): void;

/**
 * CSS模块导出对象接口
 * 包含样式内容和相关元数据
 */
interface CSSModuleExports {
  /** 模块唯一标识符 */
  id: string | number;
  
  /** 
   * 添加CSS内容到导出队列
   * @param entry - CSS条目数组 [模块ID, CSS内容字符串, 源映射信息]
   */
  push(entry: [string | number, string, string?]): void;
}

/**
 * CSS加载器API接口
 * 用于处理CSS模块的加载和转换
 */
interface CSSLoaderAPI {
  /**
   * 创建CSS模块实例
   * @param sourceMap - 是否生成源映射
   * @returns CSS模块导出对象
   */
  (sourceMap: boolean): CSSModuleExports;
}

/**
 * 热模块替换API接口（HMR）
 * 用于开发环境下的样式热更新
 */
interface HotModuleReplacementAPI {
  /** 接受当前模块的更新 */
  accept(): void;
  
  /** 
   * 处理模块更新
   * @param callback - 更新回调函数
   */
  dispose(callback: (data: unknown) => void): void;
}

/**
 * 团队品牌页面CSS类名映射
 * 所有可用的CSS类名常量
 */
export declare const CSS_CLASSES: {
  /** 主容器类名 */
  readonly CONTAINER: 'hsc-team-brand-page-container';
  
  /** 返回头部类名 */
  readonly BACK_HEADER: 'hsc-back-header';
  
  /** 返回提示文本类名 */
  readonly BACK_TIP: 'back-tip';
  
  /** 加载状态类名 */
  readonly LOADING: 'loading';
  
  /** 商家搜索图标类名 */
  readonly MERCHANT_SEARCH_ICON: 'merchant-search-icon';
  
  /** 高佣金区域类名 */
  readonly HIGH_COMMISSION: 'high-commision';
  
  /** 头部区域类名 */
  readonly HEADER: 'header';
  
  /** 文本类名 */
  readonly TEXT: 'text';
  
  /** 日期类名 */
  readonly DATE: 'date';
  
  /** 商家分类卡片类名 */
  readonly MERCHANT_CATEGORY_CARD: 'merchant-category-card';
  
  /** 商家分类卡片名称类名 */
  readonly MERCHANT_CATEGORY_CARD_NAME: 'merchant-category-card-name';
  
  /** 商家分类更多按钮类名 */
  readonly MERCHANT_CATEGORY_MORE: 'merchant-category-more';
  
  /** 商家图片容器类名 */
  readonly MERCHANT_IMG_CONTAINER: 'merchant-img-container';
  
  /** 商家图片类名 */
  readonly MERCHANT_IMG: 'merchant-img';
  
  /** 店铺列表类名 */
  readonly SHOP_LIST: 'shop-list';
  
  /** 搜索框类名 */
  readonly SEARCH_BOX: 'hsc-search-box';
  
  /** 头部区域类名 */
  readonly HEADER_AREA: 'header-area';
};

/**
 * 样式内容字符串
 * 包含完整的CSS规则定义
 */
export declare const STYLE_CONTENT: string;