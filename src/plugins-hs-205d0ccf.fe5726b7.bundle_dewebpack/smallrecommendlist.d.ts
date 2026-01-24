/**
 * 智能推荐小列表组件
 * 用于展示智能推荐的模型列表，支持分页轮播展示
 */

import React from 'react';
import { Carousel } from 'antd';

/**
 * 用户追踪日志接口
 */
interface UserTrackLogger {
  push(event: string, data: TrackingData, options?: Record<string, unknown>): void;
}

/**
 * 追踪数据结构
 */
interface TrackingData {
  activeSection: string;
  activeSectionName: string;
  description: string;
  clicksRatio: {
    id: string;
    name: string;
    seekId?: string;
  };
}

/**
 * 推荐商品项数据结构
 */
interface RecommendItem {
  id: string;
  [key: string]: unknown;
}

/**
 * 会员信息接口
 */
interface MemberInfo {
  stylerMember?: boolean;
}

/**
 * 用户信息接口
 */
interface AdskUser {
  memberInfo?: MemberInfo;
}

/**
 * 应用实例接口
 */
interface HSAppInstance {
  userTrackLogger: UserTrackLogger;
}

/**
 * 事件管理器接口
 */
interface EventsManager {
  handleItemClick(event: React.MouseEvent, item: RecommendItem): void;
}

/**
 * 基础API管理器接口
 */
interface BaseApiManager {
  eventsManager: EventsManager;
  getInstance(): BaseApiManager;
}

/**
 * 全局HSApp命名空间
 */
declare global {
  const HSApp: {
    App: {
      getApp(): HSAppInstance;
    };
    Catalog: {
      BaseApiManager: BaseApiManager;
    };
  };
  const adskUser: AdskUser | undefined;
}

/**
 * 图标视图组件属性
 */
interface IconfontViewProps {
  customClass?: string;
  customStyle?: React.CSSProperties;
  hoverBgColor?: string;
  showType: string;
}

/**
 * 商品项容器组件属性
 */
interface ProductItemContainerProps {
  className?: string;
  item: RecommendItem;
  onItemClick: (event: React.MouseEvent, item: RecommendItem) => void;
  stylerMember?: boolean;
}

/**
 * SmallRecommendList组件属性
 */
export interface SmallRecommendListProps {
  /** 推荐列表数据 */
  recommendList: RecommendItem[];
}

/**
 * SmallRecommendList组件状态
 */
export interface SmallRecommendListState {}

/**
 * 智能推荐小列表组件
 * 用于展示智能推荐的模型列表，每页显示6个项目，支持轮播切换
 */
export declare class SmallRecommendList extends React.Component<
  SmallRecommendListProps,
  SmallRecommendListState
> {
  /** 每页显示的项目数量 */
  private static readonly ITEMS_PER_PAGE: 6;
  
  /** 最大页数限制 */
  private static readonly MAX_PAGES: 6;

  /** 商品项点击事件处理器 */
  private _onItemClick: (event: React.MouseEvent, item: RecommendItem) => void;

  /**
   * 构造函数
   * @param props - 组件属性
   */
  constructor(props: SmallRecommendListProps);

  /**
   * 处理商品项点击事件
   * 触发目录管理器的点击处理和用户行为追踪
   * @param event - 鼠标点击事件
   * @param item - 被点击的推荐项数据
   */
  onItemClick(event: React.MouseEvent, item: RecommendItem): void;

  /**
   * 轮播图切换后的回调
   * 用于记录用户翻页行为
   * @param currentSlide - 当前幻灯片索引
   */
  afterChange(currentSlide: number): void;

  /**
   * 渲染组件
   * @returns React元素
   */
  render(): React.ReactElement;
}

/**
 * 图标视图组件
 */
export declare const IconfontView: React.FC<IconfontViewProps>;

/**
 * 商品项容器组件
 */
export declare namespace ProductItemContainer {
  const ProductItemContainer: React.FC<ProductItemContainerProps>;
}