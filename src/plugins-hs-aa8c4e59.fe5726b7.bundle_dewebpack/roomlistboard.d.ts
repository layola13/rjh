/**
 * RoomListBoard 模块
 * 房间列表面板组件，用于管理和展示多个房间项
 */

import * as React from 'react';
import { RoomItem } from './RoomItem';
import { Scroll, Switch } from './UIComponents';

/**
 * 房间图片信息
 */
export interface RoomPicInfo {
  /** 图片URL */
  url?: string;
  /** 图片ID */
  id?: string;
  /** 其他图片相关属性 */
  [key: string]: unknown;
}

/**
 * 房间区域信息
 */
export interface RoomAreaInfo {
  /** 面积值 */
  area?: number;
  /** 面积单位 */
  unit?: string;
  /** 其他区域相关属性 */
  [key: string]: unknown;
}

/**
 * 房间数据结构
 */
export interface RoomData {
  /** 是否选中 */
  checked: boolean;
  /** 房间名称 */
  name: string;
  /** 区域信息 */
  areaInfo?: RoomAreaInfo;
  /** 房间类型ID */
  roomTypeId: string | number;
  /** 图片信息 */
  picInfo?: RoomPicInfo;
  /** 是否为全屋 */
  wholehouse?: boolean;
}

/**
 * 房间类型定义
 */
export interface RoomType {
  /** 类型ID */
  id: string | number;
  /** 类型名称 */
  name: string;
  /** 其他类型相关属性 */
  [key: string]: unknown;
}

/**
 * 房间风格定义
 */
export interface RoomStyle {
  /** 风格ID */
  id: string | number;
  /** 风格名称 */
  name: string;
  /** 其他风格相关属性 */
  [key: string]: unknown;
}

/**
 * RoomListBoard 组件属性
 */
export interface RoomListBoardProps {
  /** 原始房间列表数据 */
  originalRoomListData: RoomData[];
  /** 房间类型列表 */
  roomTypeList: RoomType[];
  /** 默认风格ID */
  defaultStyleId: string | number;
  /** 房间风格列表 */
  roomStyleList: RoomStyle[];
  /** 图片红线提示数组 */
  pictureRedLineArr: string[];
  /** 房间选中状态变化回调 */
  onCheckedChange: (checked: boolean, roomIndex: number) => void;
  /** 房间类型变化回调 */
  onRoomTypeChange: (typeId: string | number, roomIndex: number) => void;
  /** 房间风格变化回调 */
  onRoomStyleChange: (styleId: string | number, roomIndex: number) => void;
  /** 房间名称变化回调 */
  onRoomNameChange: (name: string, roomIndex: number) => void;
  /** 请求更换图片回调 */
  onRequestChangePicture: (roomIndex: number) => void;
}

/**
 * RoomListBoard 组件状态
 */
export interface RoomListBoardState {
  /** 是否全选 */
  allChecked: boolean;
  /** 原始房间列表数据 */
  originalRoomListData: RoomData[];
  /** 是否选择单个房间模式 */
  selectSingleRoom: boolean;
}

/**
 * 房间列表面板组件
 * 用于展示和管理多个房间，支持全屋和单个房间的切换选择
 */
export declare class RoomListBoard extends React.Component<RoomListBoardProps, RoomListBoardState> {
  /** 房间项实例数组，用于访问子组件方法 */
  private _roomItemInstanceArr: Array<RoomItem | null>;
  
  /** 渲染的房间项元素数组 */
  private _items: React.ReactElement[];

  /**
   * 构造函数
   * @param props - 组件属性
   */
  constructor(props: RoomListBoardProps);

  /**
   * 组件即将挂载（已废弃的生命周期）
   * @deprecated 使用 componentDidMount 替代
   */
  UNSAFE_componentWillMount(): void;

  /**
   * 组件卸载时清理资源
   */
  componentWillUnmount(): void;

  /**
   * 初始化房间项列表
   * @private
   */
  private _initItems(): void;

  /**
   * 销毁房间项列表
   * @private
   */
  private _destroyItems(): void;

  /**
   * Ref 回调函数，用于收集房间项实例
   * @private
   * @param instance - 房间项实例
   */
  private _onRefFunc(instance: RoomItem | null): void;

  /**
   * 房间项选中状态变化处理
   * @private
   * @param checked - 是否选中
   * @param userData - 用户数据，包含房间索引
   */
  private _onItemCheckedChange(checked: boolean, userData: { itemIdx: number }): void;

  /**
   * 全选状态变化处理
   * @private
   * @param checked - 是否全选
   */
  private _onAllCheckedChange(checked: boolean): void;

  /**
   * 房间类型变化处理
   * @private
   * @param typeId - 类型ID
   * @param userData - 用户数据，包含房间索引
   */
  private _onItemRoomTypeChange(typeId: string | number, userData: { itemIdx: number }): void;

  /**
   * 房间风格变化处理
   * @private
   * @param styleId - 风格ID
   * @param userData - 用户数据，包含房间索引
   */
  private _onItemRoomStyleChange(styleId: string | number, userData: { itemIdx: number }): void;

  /**
   * 房间名称变化处理
   * @private
   * @param name - 房间名称
   * @param userData - 用户数据，包含房间索引
   */
  private _onItemRoomNameChange(name: string, userData: { itemIdx: number }): void;

  /**
   * 请求更换图片处理
   * @private
   * @param userData - 用户数据，包含房间索引
   */
  private _onRequestChangePicture(userData: { itemIdx: number }): void;

  /**
   * 获取指定房间的当前名称
   * @param roomIndex - 房间索引
   * @returns 房间名称
   */
  getRoomCurrentName_(roomIndex: number): string | undefined;

  /**
   * 获取指定房间的图片信息
   * @param roomIndex - 房间索引
   * @returns 图片信息
   */
  getRoomPicInfo_(roomIndex: number): RoomPicInfo | undefined;

  /**
   * 更换指定房间的图片
   * @param roomIndex - 房间索引
   * @param picInfo - 新的图片信息
   * @param additionalParam - 额外参数
   */
  changePicture_(roomIndex: number, picInfo: RoomPicInfo, additionalParam?: unknown): void;

  /**
   * 更改指定房间的图片蒙层状态
   * @param roomIndex - 房间索引
   * @param maskVisible - 是否显示蒙层
   */
  changePictureMask_(roomIndex: number, maskVisible: boolean): void;

  /**
   * 渲染组件
   */
  render(): React.ReactElement;
}