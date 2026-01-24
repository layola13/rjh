import type { Component, ReactNode } from 'react';

/**
 * 产品分组信息接口
 */
export interface ProductGroupInfo {
  /** 分组ID */
  fid: string | number;
  /** 分类ID（可选） */
  categoryId?: string | number;
}

/**
 * 分组项接口
 */
export interface GroupItem {
  /** 分组ID */
  fid: string | number;
  /** 搜索ID（可选） */
  seekId?: string | number;
  [key: string]: unknown;
}

/**
 * 组件属性接口
 */
export interface GroupListProps {
  /** 分组项列表 */
  groupItems: GroupItem[];
  /** 是否为收藏产品页面 */
  isFavoriteProductPage?: boolean;
  /** 产品分组信息 */
  productGroupInfo: ProductGroupInfo;
  /** 设置当前收藏分组的回调函数 */
  setCurrentFavgroup?: (groupId: string | number) => void;
  /** 当前选中的ID */
  selectedId?: string | number;
}

/**
 * 组件状态接口
 */
export interface GroupListState {
  [key: string]: unknown;
}

/**
 * 信号钩子数据接口
 */
export interface SignalData {
  /** 分组ID */
  fid: string | number;
  /** 搜索ID */
  seekId?: string | number;
}

/**
 * 信号事件接口
 */
export interface SignalEvent {
  data: SignalData;
}

/**
 * 隐藏面板参数接口
 */
export interface HiddenPanelParams {
  /** 项ID */
  itemId: string | number;
  /** 搜索ID */
  seekId?: string | number;
  /** 分类ID（可选） */
  categoryId?: string | number;
}

/**
 * 分组列表组件
 * 
 * 用于展示和管理产品分组列表，支持选择、收藏等交互功能
 */
export default class GroupList extends Component<GroupListProps, GroupListState> {
  /** 信号钩子实例，用于组件间通信 */
  signalHook: HSCore.Util.SignalHook;
  
  /** 引用：滚动容器元素 */
  refs: {
    scrollContainer: HTMLElement;
    allGroup: HTMLUListElement;
  };

  /**
   * 构造函数
   * @param props - 组件属性
   */
  constructor(props: GroupListProps);

  /**
   * 组件挂载完成生命周期钩子
   * 监听添加分组的信号事件
   */
  componentDidMount(): void;

  /**
   * 组件更新完成生命周期钩子
   */
  componentDidUpdate(): void;

  /**
   * 组件卸载前生命周期钩子
   * 清理所有信号监听器
   */
  componentWillUnmount(): void;

  /**
   * 处理选中项的回调函数
   * @param itemId - 项ID
   * @param seekId - 搜索ID
   * @param targetElement - 目标DOM元素（可选）
   */
  private _onSelectedItem(
    itemId: string | number,
    seekId?: string | number,
    targetElement?: JQuery<HTMLElement>
  ): void;

  /**
   * 鼠标进入事件处理器
   */
  private _onMouseEnter(): void;

  /**
   * 鼠标离开事件处理器
   */
  private _onMouseLeave(): void;

  /**
   * 点击事件处理器
   */
  private _onClick(): void;

  /**
   * 渲染组件
   * @returns React元素
   */
  render(): ReactNode;
}