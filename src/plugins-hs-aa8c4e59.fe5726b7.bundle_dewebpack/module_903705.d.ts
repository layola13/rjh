/**
 * 全屋风格创建面板组件类型定义
 * @module CreateStylerTemplatePanel
 */

import { Component, ReactNode } from 'react';

/**
 * 房间图片信息
 */
export interface RoomPictureInfo {
  /** 图片ID */
  id: string;
  /** 图片URL */
  url: string;
}

/**
 * 房间区域信息
 */
export interface RoomAreaInfo {
  /** 房间面积 */
  area: number;
}

/**
 * 原始房间列表数据项
 */
export interface OriginalRoomData {
  /** 房间ID */
  id: string;
  /** 是否选中 */
  checked: boolean;
  /** 房间名称 */
  name?: string;
  /** 房间类型ID */
  roomTypeId: string;
  /** 房间区域信息 */
  areaInfo: RoomAreaInfo;
}

/**
 * 房间类型选项
 */
export interface RoomTypeOption {
  /** 类型ID */
  id: string;
  /** 类型名称 */
  name: string;
}

/**
 * 房间风格选项
 */
export interface RoomStyleOption {
  /** 风格ID */
  id: string;
  /** 风格名称 */
  name: string;
}

/**
 * 房间风格属性配置
 */
export interface RoomStyleAttribute {
  /** 风格选项列表 */
  values: RoomStyleOption[];
}

/**
 * 提交的房间数据
 */
export interface SubmittedRoomData {
  /** 房间ID */
  id: string;
  /** 是否选中 */
  checked: boolean;
  /** 房间名称 */
  name: string;
  /** 房间面积 */
  area: number;
  /** 房间类型ID */
  roomTypeId: string;
  /** 房间风格ID */
  roomStyleId: string;
  /** 图片信息 */
  picInfo: RoomPictureInfo;
  /** 是否为全屋 */
  wholehouse: boolean;
}

/**
 * 数据提交器接口
 */
export interface DataCommitter {
  /** 添加数据 */
  addData(key: string, value: unknown): void;
  /** 获取数据 */
  getData(key: string): unknown;
  /** 销毁 */
  destroy(): void;
}

/**
 * 校验结果
 */
interface ValidationResult {
  /** 是否有效 */
  isValid: boolean;
  /** 已选中数量 */
  checkedCount: number;
  /** 是否为全屋 */
  wholehouse: boolean;
  /** 全屋无效数量 */
  wholehouseInValidCount: number;
}

/**
 * 组件属性
 */
export interface CreateStylerTemplatePanelProps {
  /** 原始房间列表数据 */
  originalRoomListData: OriginalRoomData[];
  /** 房间类型列表 */
  roomTypeList: RoomTypeOption[];
  /** 房间风格属性配置 */
  roomStylerAttribute: RoomStyleAttribute;
  /** 默认风格ID */
  defaultStyle?: string;
  /** 无效的房间类型集合 */
  invalidRoomTypeSet: Set<string>;
  /** 提交通知回调 */
  submitNotify: (roomDataList: SubmittedRoomData[], component: CreateStylerTemplatePanel) => void;
  /** 取消通知回调 */
  cancelNotify: (component: CreateStylerTemplatePanel) => void;
  /** 请求图片通知回调 */
  requestPictureNotify: (
    committer: DataCommitter,
    onStart: () => void,
    component: CreateStylerTemplatePanel,
    roomData: OriginalRoomData
  ) => void;
}

/**
 * 组件状态
 */
export interface CreateStylerTemplatePanelState {
  /** 修改后的选中状态列表 */
  changedCheckList: boolean[];
  /** 修改后的房间类型列表 */
  changedRoomTypeList: string[];
  /** 修改后的房间风格列表 */
  changedRoomStyleList: string[];
  /** 鼠标悬停状态 */
  hover: boolean;
}

/**
 * 全屋风格创建面板组件
 * 用于配置和生成全屋风格方案
 */
export default class CreateStylerTemplatePanel extends Component<
  CreateStylerTemplatePanelProps,
  CreateStylerTemplatePanelState
> {
  /** 图片红线提示数组 */
  pictureRedLineArr: string[];
  
  /** 图片URL数组 */
  pictureUrlArr: string[];
  
  /** 校验结果缓存 */
  private _checkValidResult: ValidationResult;
  
  /** 标题文本 */
  private _HEAD_TITLE: string;
  
  /** 关闭按钮图片URL */
  private _CLOSE_BTN_IMG_URL: string;
  
  /** 组件状态 */
  private _status: string;
  
  /** 生成按钮文本 */
  private _GENERATE_BTN_CAPTION: string;
  
  /** 取消按钮文本 */
  private _CANCEL_BTN_CAPTION: string;
  
  /** 加载中的项目索引集合 */
  private _loadingItemIndexSet: Set<number>;
  
  /** 请求图片数据提交器数组 */
  private _requestPicDataCommitterArr: (DataCommitter | undefined)[];
  
  /** 组件引用 */
  refs: {
    roomListBoard: any;
    closeBtn: HTMLElement;
  };

  constructor(props: CreateStylerTemplatePanelProps);

  /**
   * 组件即将挂载（已废弃的生命周期）
   */
  UNSAFE_componentWillMount(): void;

  /**
   * 组件已挂载
   */
  componentDidMount(): void;

  /**
   * 组件即将更新（已废弃的生命周期）
   */
  UNSAFE_componentWillUpdate(nextProps: CreateStylerTemplatePanelProps, nextState: CreateStylerTemplatePanelState): void;

  /**
   * 组件即将卸载
   */
  componentWillUnmount(): void;

  /**
   * 添加到加载项索引集合
   * @param index - 项目索引
   */
  private _addToLoadingItemIndexSet(index: number): void;

  /**
   * 从加载项索引集合中删除
   * @param index - 项目索引
   */
  private _deleteFromLoadingItemIndexSet(index: number): void;

  /**
   * 初始化请求图片数据提交器数组
   */
  private _initRequestPicDataCommitterArr(): void;

  /**
   * 项目选中状态改变事件
   * @param checked - 是否选中
   * @param index - 项目索引
   */
  private _onItemCheckedChange(checked: boolean, index: number): void;

  /**
   * 项目房间类型改变事件
   * @param roomTypeId - 房间类型ID
   * @param index - 项目索引
   */
  private _onItemRoomTypeChange(roomTypeId: string, index: number): void;

  /**
   * 项目房间风格改变事件
   * @param roomStyleId - 房间风格ID
   * @param index - 项目索引
   */
  private _onItemRoomStyleChange(roomStyleId: string, index: number): void;

  /**
   * 确定按钮点击事件
   */
  private _onBtnOKClick(): void;

  /**
   * 取消按钮点击事件
   */
  private _onBtnCancelClick(): void;

  /**
   * 校验配置有效性
   * @param checkList - 选中状态列表
   * @param roomTypeList - 房间类型列表
   * @param invalidSet - 无效房间类型集合
   * @returns 校验结果
   */
  private _checkValid(
    checkList: boolean[],
    roomTypeList: string[],
    invalidSet: Set<string>
  ): ValidationResult;

  /**
   * 获取已选中数量
   * @returns 选中数量
   */
  private _getCheckedCount(): number;

  /**
   * 请求更换图片
   * @param index - 项目索引
   */
  private _onRequestChangePicture(index: number): void;

  /**
   * 获取图片信息数据回调
   * @param committer - 数据提交器
   */
  private _onGetPicInfoData(committer: DataCommitter): void;

  /**
   * 鼠标悬停事件
   */
  private _onMouseover(): void;

  /**
   * 鼠标移出事件
   */
  private _onMouseOut(): void;

  /**
   * 渲染组件
   */
  render(): ReactNode;
}