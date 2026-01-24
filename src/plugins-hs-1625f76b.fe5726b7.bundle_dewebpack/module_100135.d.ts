/**
 * 模型专题列表组件类型定义
 * Module: module_100135
 * Original ID: 100135
 */

import React from 'react';

/**
 * 专题类型枚举
 */
export enum TopicType {
  /** 全部 */
  all = '',
  /** 设计专题 */
  designType = '1',
  /** 城市专题 */
  cityType = '2',
}

/**
 * 价格类型枚举
 */
export enum PriceType {
  /** 全部 */
  all = '',
}

/**
 * 标签类型枚举
 */
export enum TagType {
  /** 全部 */
  all = '',
}

/**
 * 选项卡配置项
 */
export interface TabConfig {
  /** 选项卡值 */
  value: string;
  /** 选项卡显示标签 */
  label: string;
}

/**
 * 筛选器配置
 */
export interface FilterConfig {
  /** 所有筛选项 */
  allFilters: FilterAttribute[];
  /** 外层筛选项 */
  outerFilters: FilterAttribute[];
  /** 剩余筛选项 */
  restFilters: FilterAttribute[];
}

/**
 * 筛选属性
 */
export interface FilterAttribute {
  /** 属性ID */
  id: string;
  /** 属性名称 */
  name: string;
  /** 属性值列表 */
  values: FilterValue[];
}

/**
 * 筛选值
 */
export interface FilterValue {
  /** 值ID */
  id: string;
  /** 显示名称 */
  name: string;
}

/**
 * 模型/专题数据项
 */
export interface ModelDataItem {
  /** 项目ID */
  id: string;
  /** 项目名称 */
  name: string;
  /** 封面图URL */
  coverUrl?: string;
  /** 描述 */
  description?: string;
  /** 价格 */
  price?: number;
  /** 是否已购买 */
  isPurchased?: boolean;
  /** 标签列表 */
  tags?: string[];
  [key: string]: unknown;
}

/**
 * 推荐项数据
 */
export interface RecItem extends ModelDataItem {
  /** 推荐原因 */
  reason?: string;
}

/**
 * 组件属性
 */
export interface SpecialTopicListProps {
  /** 是否来自我的已购页面 */
  fromMyPaid?: boolean;
  /** 搜索关键词 */
  searchText?: string;
  /** 是否隐藏城市专题选项卡 */
  hideCityTopic?: boolean;
  /** 当前选中的选项卡值 */
  tabsValue?: string;
  /** 专题模型点击回调 */
  specialTopicModelClick?: (item: ModelDataItem) => void;
  /** 缓存选项卡值回调 */
  cacheTabsValue?: (value: string | FilterChangeEvent) => void;
  /** 数据更新回调（返回是否为造型师会员） */
  dataUpdata?: (stylerMember: boolean) => void;
}

/**
 * 组件状态
 */
export interface SpecialTopicListState {
  /** 加载状态 */
  loading: boolean;
  /** 模型数据列表 */
  modelData: ModelDataItem[];
  /** 推荐项列表 */
  recItems: RecItem[];
  /** 当前专题类型 */
  topicType: string;
  /** 当前价格类型 */
  priceType: string;
  /** 当前标签类型 */
  tagType: string;
  /** 选项卡配置列表 */
  tabs: TabConfig[];
  /** 筛选器配置 */
  filters: FilterConfig;
  /** 是否为造型师会员 */
  stylerMember: boolean;
}

/**
 * 筛选变更事件
 */
export interface FilterChangeEvent {
  /** 追踪筛选器（JSON字符串） */
  trackFilters: string;
  [key: string]: unknown;
}

/**
 * 搜索专题列表请求参数
 */
export interface SearchTopicListParams {
  /** 专题池类型 */
  poolType?: string;
  /** 销售类型 */
  sellType?: string;
  /** 搜索关键词 */
  keyword?: string;
  /** 专题标签 */
  poolTag?: string;
  /** 页码 */
  pageNum?: number;
  /** 每页数量 */
  pageSize?: number;
}

/**
 * 搜索专题列表响应
 */
export interface SearchTopicListResponse {
  /** 数据列表（旧版） */
  data?: ModelDataItem[];
  /** 数据项列表（新版） */
  items?: ModelDataItem[];
  /** 是否为造型师会员 */
  stylerMember?: boolean;
  /** 推荐项列表 */
  recItems?: RecItem[];
  /** 筛选属性列表 */
  attributes?: FilterAttribute[];
}

/**
 * 已购包列表请求参数
 */
export interface PaidPackageListParams {
  /** 页码 */
  pageNum: number;
  /** 每页数量 */
  pageSize: number;
}

/**
 * 已购包列表响应
 */
export interface PaidPackageListResponse {
  /** 已购包列表 */
  items?: ModelDataItem[];
}

/**
 * 模型专题列表组件
 * 
 * 功能：
 * - 展示设计专题和城市专题列表
 * - 支持按类型、价格、标签筛选
 * - 支持搜索功能
 * - 支持查看已购买的专题包
 */
export default class SpecialTopicList extends React.Component<
  SpecialTopicListProps,
  SpecialTopicListState
> {
  /** 所有模型专题URL */
  readonly allModelSpecialTopUrl: string;
  
  /** 筛选器映射表 */
  readonly filterMap: Map<string, unknown>;

  /**
   * 构造函数
   * @param props 组件属性
   */
  constructor(props: SpecialTopicListProps);

  /**
   * 组件挂载后的生命周期
   */
  componentDidMount(): void;

  /**
   * 组件更新后的生命周期
   * @param prevProps 前一次的属性
   */
  componentDidUpdate(prevProps: SpecialTopicListProps): void;

  /**
   * 检查属性是否变化
   * @param prevProps 前一次的属性
   * @param propName 属性名称
   * @returns 是否变化
   */
  isPropChanged(prevProps: SpecialTopicListProps, propName: keyof SpecialTopicListProps): boolean;

  /**
   * 获取已购包列表
   */
  getPaidPackageList(): void;

  /**
   * 根据类型获取FP专题列表
   * @param topicType 专题类型
   * @param priceType 价格类型
   * @param tagType 标签类型
   */
  getFpTopicListByType(topicType: string, priceType: string, tagType: string): void;

  /**
   * 根据类型获取专题列表
   * @param topicType 专题类型
   */
  getTopicListByType(topicType: string): void;

  /**
   * 选项卡切换处理
   * @param event 事件对象
   * @param value 新选中的值
   */
  handleTabChange(event: unknown, value: string): void;

  /**
   * 筛选器变更处理
   * @param filterEvent 筛选变更事件
   */
  handleFilterChange(filterEvent: FilterChangeEvent): void;

  /**
   * 显示无数据视图
   * @returns React元素
   */
  showNoDataView(): React.ReactElement | null;

  /**
   * 显示模型申请面板
   */
  showModelApplyPanel(): void;

  /**
   * 渲染组件
   * @returns React元素
   */
  render(): React.ReactElement;
}