/**
 * 页面类型模块
 * 
 * 提供专题页面的类型定义和主组件声明
 * 原始模块 ID: 885483
 */

/**
 * 资源池枚举
 * 
 * 定义不同类型的商品资源池
 */
export enum PoolEnum {
  /** 高质量资源池 */
  HighQualityPool = "high_quality_pool",
  /** 高佣金资源池 */
  HighCommissionPool = "high_commission_pool"
}

/**
 * 页面类型枚举
 * 
 * 定义组件支持的页面类型
 */
export enum PageType {
  /** 落地页 */
  LandingPage = "landingPage",
  /** 商品页 */
  ProductPage = "ProductPage",
  /** 模型库页面 */
  ModelPage = "ModelPage"
}

/**
 * 目录数据接口
 * 
 * 描述目录的数据结构
 */
export interface CatalogData {
  /** 目录分类列表 */
  categories: Category[];
  [key: string]: unknown;
}

/**
 * 分类接口
 * 
 * 描述单个分类的数据结构
 */
export interface Category {
  /** 分类 ID */
  id: string | number;
  /** 自定义属性标识 */
  custAttr?: number;
  /** 分类数据 */
  data?: unknown;
  [key: string]: unknown;
}

/**
 * 搜索商品参数接口
 * 
 * 用于搜索商品的配置参数
 */
export interface SearchProductsParams {
  /** 分类 ID 列表（逗号分隔） */
  categoriesIds?: string;
  /** 搜索文本 */
  text?: string;
}

/**
 * 头部返回数据接口
 * 
 * 配置头部返回按钮的行为和标题
 */
export interface HeaderBackData {
  /** 返回按钮点击回调 */
  onHeaderBack?: () => void;
  /** 返回按钮标题 */
  backTitle: string;
}

/**
 * 商品页配置接口
 * 
 * 配置商品页面的显示和行为
 */
export interface ProductPageConfig {
  /** 偏移量 */
  offset: number;
  /** 每页数量限制 */
  limit: number;
  /** 树形结构 ID */
  treeId: string | number;
  /** 搜索文本 */
  text: string;
  /** 分类 ID 列表 */
  categoriesIds: string;
}

/**
 * 专题页面组件属性接口
 * 
 * 定义专题页面主组件接收的所有属性
 */
export interface SpecialTopicPageProps {
  /**
   * 页面类型
   * @default PageType.LandingPage
   */
  pageType?: PageType;

  /**
   * 刷新次数
   * 用于触发页面数据刷新
   */
  refreshNum?: number;

  /**
   * 目录数据
   * 传入的初始目录数据
   */
  catalogData?: CatalogData;

  /**
   * 是否来自"我的已购"
   * 标识页面的来源渠道
   */
  fromMyPaid?: boolean;

  /**
   * 入口文本
   * 显示在页面入口处的文本内容
   */
  entryText?: string;

  /**
   * 头部返回按钮回调
   * 点击头部返回按钮时触发
   */
  onHeaderBack?: () => void;

  /**
   * 页面标题
   * 显示在页面顶部的标题文本
   */
  title?: string;

  /** 其他扩展属性 */
  [key: string]: unknown;
}

/**
 * 专题页面主组件
 * 
 * 管理落地页、商品页和模型库页面的切换和状态
 * 
 * @param props - 组件属性
 * @returns React 组件元素
 * 
 * @example
 *