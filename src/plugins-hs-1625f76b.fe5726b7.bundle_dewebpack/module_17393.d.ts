/**
 * 产品搭配页面组件模块
 * @module ModelCollocationProductPage
 */

/**
 * 分类过滤项接口
 */
export interface CategoryFilterItem {
  /** 分类名称 */
  name: string;
  /** 分类唯一标识符 */
  id: string;
  /** 该分类下的产品项数组 */
  items: ProductModel[];
}

/**
 * 产品模型接口
 */
export interface ProductModel {
  /** 产品唯一标识符 */
  uuid: string;
  /** 产品分类数组 */
  categories: string[];
  /** 产品其他属性 */
  [key: string]: unknown;
}

/**
 * 组件数据属性接口
 */
export interface ComponentData {
  /** 页面标题 */
  name: string;
  /** 房间类型名称(可选) */
  roomTypeName?: string;
  /** 封面图片URL */
  image: string;
  /** 产品模型数组 */
  models: ProductModel[];
}

/**
 * 组件属性接口
 */
export interface ModelCollocationProductPageProps {
  /** 组件数据 */
  data: ComponentData;
  /** 页面切换回调函数 */
  onSwitchPage: () => void;
}

/**
 * 数据加载配置接口
 */
export interface LoadDataConfig {
  /** 数据偏移量,用于分页 */
  offset: number;
  /** 分类ID过滤 */
  id: string;
}

/**
 * 数据加载结果接口
 */
export interface LoadDataResult {
  /** 返回的产品项数组 */
  items: ProductModel[];
  /** 总数据量 */
  total: number;
}

/**
 * 组件内部状态接口
 */
export interface ComponentState {
  /** 当前显示的产品项数组 */
  items: ProductModel[];
  /** 总产品数量 */
  total: number;
  /** 过滤后的分类数据 */
  filterData: CategoryFilterItem[];
  /** 数据加载状态标识 */
  isLoading: boolean;
}

/**
 * HSApp全局对象接口(外部依赖)
 */
declare global {
  const HSApp: {
    Catalog: {
      Manager: {
        /** 获取目录库实例 */
        getHSCatalogLib(): CatalogLibrary;
      };
    };
    App: {
      /** 获取应用实例 */
      getApp(): Application;
    };
    Config: {
      /** 默认分类树ID */
      DEFAULT_CATEGORY_TREE_ID: string;
    };
  };

  const HSFPConstants: {
    PluginType: {
      /** 目录插件类型 */
      Catalog: string;
    };
  };
}

/**
 * 目录库接口
 */
export interface CatalogLibrary {
  /** 返回页头组件 */
  BackHeader: React.ComponentType<BackHeaderProps>;
  /** 目录过滤器组件 */
  CatalogFilter: React.ComponentType<CatalogFilterProps>;
  /** 无限加载容器组件 */
  InfiniteLoaderContainer: React.ComponentType<InfiniteLoaderProps>;
  /** 产品项容器组件 */
  ProductItemContainer: React.ComponentType<ProductItemProps>;
}

/**
 * 返回页头组件属性
 */
export interface BackHeaderProps {
  /** 页头标题 */
  title: string;
  /** 返回按钮点击回调 */
  onBack: () => void;
}

/**
 * 目录过滤器组件属性
 */
export interface CatalogFilterProps {
  /** 过滤数据 */
  data: CategoryFilterItem[];
  /** 分类点击回调 */
  onCatalogClick: (categoryId: string) => void;
  /** 高度变化回调 */
  changeHeight: () => void;
}

/**
 * 无限加载容器组件属性
 */
export interface InfiniteLoaderProps {
  /** 是否正在加载 */
  isLoading: boolean;
  /** 每次请求的数据限制 */
  requestLimit: number;
  /** 当前数据项数组 */
  items: ProductModel[];
  /** 获取数据的函数 */
  getData: (page?: number) => Promise<ProductModel[]>;
  /** 高度变化回调 */
  changeHeight: () => void;
  /** 容器高度 */
  containerHeight: number;
  /** 总数据量 */
  total: number;
  /** 子元素渲染函数 */
  children: (items: ProductModel[]) => React.ReactNode;
}

/**
 * 产品项组件属性
 */
export interface ProductItemProps {
  /** 产品键值(React key) */
  key: string;
  /** 产品项数据 */
  item: ProductModel;
  /** 当前配置 */
  currentConfig: LoadDataConfig;
}

/**
 * 应用实例接口
 */
export interface Application {
  pluginManager: {
    /** 根据类型获取插件 */
    getPlugin(type: string): Plugin;
  };
}

/**
 * 插件接口
 */
export interface Plugin {
  /** 基础API管理器 */
  BaseApiManager: BaseApiManager;
}

/**
 * 基础API管理器接口
 */
export interface BaseApiManager {
  /** 获取过滤后的分类树 */
  getFilteredCatalogTrees(): CategoryTree[];
  /** 获取反向分类映射 */
  getReversedCategoryMapping(treeId: string): Map<string, string> | undefined;
}

/**
 * 分类树接口
 */
export interface CategoryTree {
  /** 分类名称 */
  name: string;
  /** 分类ID */
  id: string;
  /** 子分类 */
  children?: CategoryTree[];
}

/**
 * 工具类接口
 */
export interface Utils {
  /** 计算高度 */
  calcHeight(
    type: string,
    containers: React.RefObject<HTMLElement>[],
    elements: React.RefObject<HTMLElement>[]
  ): number;
  
  /** 根据ID获取条目分类 */
  getEntryCategoryById(
    categoryId: string,
    trees: CategoryTree[],
    result: CategoryTree[]
  ): void;
}

/**
 * 产品搭配页面组件
 * 
 * 显示特定场景/房间的产品搭配方案,支持按分类过滤和无限滚动加载
 * 
 * @param props - 组件属性
 * @returns React函数组件
 */
declare const ModelCollocationProductPage: React.FC<ModelCollocationProductPageProps>;

export default ModelCollocationProductPage;