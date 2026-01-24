/**
 * 图片列表容器组件
 * 用于展示和管理可选择的图片列表
 */

import React, { Component, ReactElement } from 'react';

/**
 * 图片信息接口
 */
export interface PicInfo {
  /** 图片ID */
  id?: string | number;
  /** 图片URL */
  url?: string;
  /** 图片标题 */
  title?: string;
  /** 缩略图URL */
  thumbnailUrl?: string;
  /** 其他自定义属性 */
  [key: string]: unknown;
}

/**
 * 图片列表项组件的属性接口
 */
export interface PictureListItemProps {
  /** 图片信息 */
  picInfo: PicInfo;
  /** 初始选中状态 */
  initialSelected: boolean;
  /** 点击通知回调 */
  clickNotify: (userData: { itemIdx: number }) => void;
  /** 用户数据 */
  userData: {
    itemIdx: number;
  };
}

/**
 * 图片列表项组件实例接口
 */
export interface PictureListItemInstance {
  /** 设置选中状态 */
  setSelectState_(selected: boolean): void;
  /** 组件属性 */
  props: PictureListItemProps;
}

/**
 * 图片列表容器组件的属性接口
 */
export interface PictureListContainerProps {
  /** 图片信息列表 */
  picInfoList: PicInfo[];
  /** 选择变化通知回调 */
  selectChangeNotify?: (selectedPicInfo: PicInfo) => void;
}

/**
 * 图片列表容器组件的状态接口
 */
export interface PictureListContainerState {
  // 当前组件无需状态管理
}

/**
 * 图片列表容器组件
 * 提供可滚动的图片列表，支持单选功能
 */
export default class PictureListContainer extends Component<
  PictureListContainerProps,
  PictureListContainerState
> {
  /**
   * 当前选中的索引，-1表示未选中任何项
   */
  private _selectIdx: number;

  /**
   * React元素数组，用于渲染列表项
   */
  private _items: ReactElement[] | null;

  /**
   * 列表项组件实例数组
   */
  private _itemInstanceArr: (PictureListItemInstance | null)[] | null;

  /**
   * 列表容器的DOM引用
   */
  refs: {
    listContainer: HTMLDivElement;
  };

  constructor(props: PictureListContainerProps);

  /**
   * 组件挂载前的生命周期钩子
   * @deprecated 使用 constructor 或 componentDidMount 替代
   */
  UNSAFE_componentWillMount(): void;

  /**
   * 组件挂载后的生命周期钩子
   * 初始化 perfectScrollbar 滚动条插件
   */
  componentDidMount(): void;

  /**
   * 组件更新后的生命周期钩子
   * 更新 perfectScrollbar 滚动条
   * @param prevProps - 上一个属性对象
   * @param prevState - 上一个状态对象
   */
  componentDidUpdate(
    prevProps: PictureListContainerProps,
    prevState: PictureListContainerState
  ): void;

  /**
   * 组件卸载前的生命周期钩子
   * 销毁 perfectScrollbar 并清理资源
   */
  componentWillUnmount(): void;

  /**
   * 渲染组件
   * @returns 渲染的 React 元素
   */
  render(): ReactElement;

  /**
   * 初始化列表项
   * @private
   */
  private _initItems(): void;

  /**
   * 销毁列表项，清理引用
   * @private
   */
  private _destroyItems(): void;

  /**
   * 列表项的 ref 回调函数
   * @param instance - 列表项组件实例
   * @private
   */
  private _onRefFunc(instance: PictureListItemInstance | null): void;

  /**
   * 列表项点击事件处理函数
   * @param userData - 包含项索引的用户数据
   * @private
   */
  private _onItemClick(userData: { itemIdx: number }): void;
}