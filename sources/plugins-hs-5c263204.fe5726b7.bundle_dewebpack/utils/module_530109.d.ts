/**
 * 收藏夹分组面板组件
 * 用于管理和显示收藏夹分组列表，支持添加分组、选择分组等操作
 */

import { Component } from 'react';
import { connect, ConnectProps } from 'react-redux';
import { Dispatch } from 'redux';

/**
 * 分组项数据结构
 */
export interface GroupItem {
  /** 分组唯一标识符 */
  fid: string;
  /** 分组名称 */
  name: string;
  /** 其他分组属性 */
  [key: string]: unknown;
}

/**
 * 产品分组信息
 */
export interface ProductGroupInfo {
  /** 查找ID */
  seekId: string;
  /** 分类ID */
  catagoryId: string;
  /** 其他产品信息 */
  [key: string]: unknown;
}

/**
 * 组件引用位置枚举
 */
export enum CitePosition {
  /** 目录产品项 */
  CATELOG_PRODUCT_ITEM = 'CATELOG_PRODUCT_ITEM',
  /** 右侧属性栏 */
  RIGHT_PROPERTY_BAR = 'RIGHT_PROPERTY_BAR',
  /** 弹窗 */
  ALERT_POPUP = 'ALERT_POPUP',
  /** 分组列表面板 */
  GROUP_LIST_PANEL = 'GROUP_LIST_PANEL'
}

/**
 * Redux State 类型
 */
export interface RootState {
  /** 分组项列表 */
  groupItems: GroupItem[];
  /** 其他状态 */
  [key: string]: unknown;
}

/**
 * 组件 Props 类型
 */
export interface FavGroupPanelProps {
  /** 组件引用位置 */
  citePosition?: CitePosition;
  /** 分组项列表 */
  groupItems: GroupItem[];
  /** 产品分组信息 */
  productGroupInfo?: ProductGroupInfo;
  /** Redux dispatch 函数 */
  dispatch: Dispatch;
  /** 自定义样式类名 */
  className?: string;
}

/**
 * 组件 State 类型
 */
export interface FavGroupPanelState {
  /** 是否显示分组列表 */
  isShow: boolean;
  /** 当前选中的分组名称 */
  selectedVal?: string;
  /** 当前选中的分组ID */
  selectedId?: string;
}

/**
 * 收藏夹分组面板组件
 * 提供收藏夹分组的展示、添加、选择等功能
 */
declare class FavGroupPanel extends Component<FavGroupPanelProps, FavGroupPanelState> {
  /**
   * 构造函数
   * @param props - 组件属性
   */
  constructor(props: FavGroupPanelProps);

  /**
   * 组件挂载后的生命周期钩子
   * 初始化当前选中的分组信息
   */
  componentDidMount(): void;

  /**
   * 添加新分组
   * @param groupName - 分组名称
   */
  addGroup(groupName: string): void;

  /**
   * 关闭面板
   * 如果产品未收藏，则先添加到默认收藏夹，然后关闭面板
   */
  closePanel(): void;

  /**
   * 设置当前选中的收藏夹分组
   * @param groupName - 分组名称
   * @param groupId - 分组ID
   */
  setCurrentFavgroup(groupName: string, groupId: string): void;

  /**
   * 切换分组列表面板的显示/隐藏状态
   */
  showGroupListPanel(): void;

  /**
   * 渲染组件
   */
  render(): JSX.Element;
}

/**
 * Redux mapStateToProps 函数类型
 */
type MapStateToProps = (state: RootState, ownProps: Partial<FavGroupPanelProps>) => {
  groupItems: GroupItem[];
};

/**
 * 连接 Redux 的收藏夹分组面板组件
 */
declare const ConnectedFavGroupPanel: ConnectProps<typeof FavGroupPanel>;

export default ConnectedFavGroupPanel;