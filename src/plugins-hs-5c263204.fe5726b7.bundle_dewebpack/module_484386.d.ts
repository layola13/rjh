import React from 'react';
import PropTypes from 'prop-types';

/**
 * 户型产品项接口
 */
interface FloorPlanProduct {
  /** 资产名称 */
  acs_asset_name: string;
  /** 设计ID */
  hs_design_id: string;
  /** 图片URL */
  imageUrl: string;
  /** 面积数值 */
  areaNum: number | string;
  /** 建筑面积数值 */
  grossAreaNum: number;
  /** 客厅数量 */
  livingroomNum: number;
  /** 卧室数量 */
  bedroomNum: number;
  /** 卫生间数量 */
  bathroomNum: number;
  /** 小区信息 */
  neighbor: string | { name: string };
  /** 省份名称 */
  provinceName: string;
  /** 城市名称 */
  cityName: string;
  /** 区县名称 */
  districtName: string;
}

/**
 * 组件状态接口
 */
interface FloorPlanCollectionListViewState {
  /** 户型产品列表 */
  products: FloorPlanProduct[];
  /** 总数 */
  total: number;
  /** 总数量显示（可能带"+"） */
  totalNumber: number | string;
  /** 偏移量 */
  offset: number;
  /** 是否正在加载 */
  isLoading: boolean;
}

/**
 * 组件属性接口
 */
interface FloorPlanCollectionListViewProps {
  /** 搜索文本 */
  searchText: string;
  /** 目标城市 */
  targetCity?: string;
  /** 目标城市名称 */
  targetCityName?: string;
  /** 卧室范围 */
  bedRoomRange?: string;
  /** 建筑面积范围 */
  grossAreaRange?: string;
  /** 每页限制数量 */
  limit?: number;
  /** 是否执行搜索 */
  doSearch?: boolean;
  /** 是否完全匹配 */
  isFullyMatching?: boolean;
  /** 关闭处理器 */
  onCloseHandler?: () => void;
}

/**
 * 分页项渲染类型
 */
type PaginationItemType = 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next';

/**
 * 户型集合列表视图组件
 * 用于展示和管理户型模板的搜索结果
 */
export default class FloorPlanCollectionListView extends React.Component<
  FloorPlanCollectionListViewProps,
  FloorPlanCollectionListViewState
> {
  /**
   * 属性类型定义
   */
  static propTypes: {
    searchText: PropTypes.Validator<string>;
    targetCity: PropTypes.Requireable<string>;
    targetCityName: PropTypes.Requireable<string>;
    bedRoomRange: PropTypes.Requireable<string>;
    grossAreaRange: PropTypes.Requireable<string>;
  };

  /**
   * 默认属性
   */
  static defaultProps: {
    searchText: string;
    limit: number;
    doSearch: boolean;
    bedRoomRange: string;
    grossAreaRange: string;
    isFullyMatching: boolean;
  };

  /**
   * 滚动容器引用
   */
  refs: {
    scrollContainer: {
      setScrollTop: (top: number) => void;
    };
  };

  /**
   * 获取当前页码
   * @returns 当前页码（从1开始）
   */
  getCurrentPageNum(): number;

  /**
   * 跳转到指定页码
   * @param pageNum - 目标页码
   */
  jumpToPage(pageNum: number): void;

  /**
   * 更新视图数据
   * @param searchText - 搜索文本
   * @param targetCity - 目标城市
   * @param offset - 偏移量，默认0
   * @param limit - 每页数量，默认16
   * @param bedRoomRange - 卧室范围，默认"to"
   * @param grossAreaRange - 建筑面积范围，默认"to"
   * @param isFullyMatching - 是否完全匹配
   */
  updateView(
    searchText: string,
    targetCity: string,
    offset?: number,
    limit?: number,
    bedRoomRange?: string,
    grossAreaRange?: string,
    isFullyMatching?: boolean
  ): void;

  /**
   * 显示搜索次数限制对话框
   */
  searchFPTimeLimitDialog(): void;

  /**
   * 重置组件状态
   */
  reset(): void;

  /**
   * 处理无搜索结果的情况
   * @param event - 事件对象
   */
  handleNoResult(event: React.MouseEvent): void;

  /**
   * 自定义分页项渲染
   * @param current - 当前页
   * @param type - 项类型
   * @param originalElement - 原始元素
   * @returns React元素
   */
  itemRender(
    current: number,
    type: PaginationItemType,
    originalElement: React.ReactNode
  ): React.ReactNode;
}