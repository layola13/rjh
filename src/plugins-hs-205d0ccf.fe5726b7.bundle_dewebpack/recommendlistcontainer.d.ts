import React from 'react';

/**
 * 后端类目信息
 */
interface BackendCategoryInfo {
  /** 类目ID */
  categoryId: string;
  /** 类目名称 */
  categoryName?: string;
}

/**
 * 推荐项数据结构
 */
interface RecommendItem {
  /** 后端类目信息 */
  backendCategoryInfo: BackendCategoryInfo;
  /** 其他推荐项属性 */
  [key: string]: unknown;
}

/**
 * 类目筛选器数据项
 */
interface CatalogFilterItem {
  /** 类目ID */
  categoryId: string;
  /** 类目名称 */
  categoryName: string;
  /** 其他筛选器属性 */
  [key: string]: unknown;
}

/**
 * 模型数据结构
 */
interface ModelData {
  /** 推荐项列表 */
  items: RecommendItem[];
  /** 筛选器配置 */
  filters: CatalogFilterItem[];
}

/**
 * RecommendListContainer 组件属性
 */
interface RecommendListContainerProps {
  /** 实体ID */
  entityId: string;
  /** 模型数据 */
  modelData?: ModelData;
}

/**
 * RecommendListContainer 组件状态
 */
interface RecommendListContainerState {
  /** 实体ID */
  entityId: string;
  /** 当前选中的类目ID，"all"表示全部 */
  currentCategoryId: string;
  /** 当前推荐列表 */
  currentRecommendList: RecommendItem[];
}

/**
 * 用户行为追踪参数
 */
interface UserTrackParams {
  /** 活动区块 */
  activeSection: string;
  /** 活动区块名称 */
  activeSectionName: string;
  /** 描述信息 */
  description: string;
  /** 点击比率信息 */
  clicksRatio: {
    /** 点击行为ID */
    id: string;
    /** 点击行为名称 */
    name: string;
  };
}

/**
 * HSApp全局对象声明
 */
declare global {
  interface Window {
    HSApp?: {
      App: {
        getApp(): {
          userTrackLogger: {
            push(eventName: string, params: UserTrackParams, extra: Record<string, unknown>): void;
          };
        };
      };
    };
  }
}

/**
 * 推荐列表容器组件
 * 用于展示智能推荐的商品列表，支持按类目筛选
 * 
 * @module RecommendListContainer
 * @originalId 628145
 */
export declare class RecommendListContainer extends React.Component<
  RecommendListContainerProps,
  RecommendListContainerState
> {
  /**
   * 构造函数
   * @param props - 组件属性
   */
  constructor(props: RecommendListContainerProps);

  /**
   * 类目点击事件处理函数
   * 根据选中的类目ID过滤推荐列表
   * 
   * @param categoryId - 类目ID，"all"表示全部类目
   */
  onCategoryClick: (categoryId: string) => void;

  /**
   * 组件属性更新生命周期钩子
   * 当实体ID或模型数据变化时更新状态
   * 
   * @param nextProps - 新的组件属性
   */
  componentWillReceiveProps(nextProps: RecommendListContainerProps): void;

  /**
   * 渲染组件
   * @returns React元素
   */
  render(): React.ReactElement;
}