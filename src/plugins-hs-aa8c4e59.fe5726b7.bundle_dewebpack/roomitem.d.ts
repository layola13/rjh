/**
 * 房间项组件
 * 用于显示和编辑房间信息，包括名称、面积、类型、风格等
 */

import { Component, ReactElement, ChangeEvent } from 'react';
import { CheckBox, Input, Select, Option } from './UIComponents';
import { AddPictureButton, PictureInfo } from './AddPictureButton';

/**
 * 房间类型定义
 */
export interface RoomType {
  /** 房间类型ID */
  id: string | number;
  /** 房间类型名称（资源键） */
  name: string;
}

/**
 * 房间风格定义
 */
export interface RoomStyle {
  /** 风格ID */
  id: string | number;
  /** 风格显示值 */
  value: string;
}

/**
 * 面积信息
 */
export interface AreaInfo {
  /** 面积数值 */
  area: number;
  /** 显示单位 */
  displayUnit: string;
  /** 精度位数 */
  precisionDigits: number;
}

/**
 * 用户数据（传递给回调的上下文数据）
 */
export type UserData = unknown;

/**
 * 房间项组件属性
 */
export interface RoomItemProps {
  /** 初始名称 */
  initialName: string;
  /** 初始房间类型ID */
  initialRoomTypeId: string | number;
  /** 默认风格ID */
  defaultStyleId: string | number;
  /** 初始选中状态 */
  initialChecked: boolean;
  /** 面积信息 */
  areaInfo: AreaInfo;
  /** 是否为全屋设计 */
  wholehouse?: boolean;
  /** 图片红线标记 */
  pictureRedLine?: unknown;
  /** 初始图片信息 */
  initialPicInfo?: PictureInfo;
  /** 房间类型列表 */
  roomTypeList: RoomType[];
  /** 房间风格列表 */
  roomStyleList: RoomStyle[];
  /** 用户自定义数据 */
  userData?: UserData;
  
  /** 选中状态变化回调 */
  onCheckedChange: (checked: boolean, userData?: UserData) => void;
  /** 房间类型变化回调 */
  onRoomTypeChange: (typeId: string | number, userData?: UserData) => void;
  /** 房间风格变化回调 */
  onRoomStyleChange: (styleId: string | number, userData?: UserData) => void;
  /** 请求更换图片回调 */
  onRequestChangePicture?: (userData?: UserData) => void;
}

/**
 * 房间项组件状态
 */
export interface RoomItemState {
  /** 当前名称 */
  name: string;
  /** 当前房间类型ID */
  roomTypeId: string | number;
  /** 当前房间风格ID */
  roomStyleId: string | number;
}

/**
 * 房间项组件
 * 展示单个房间的详细信息并支持编辑
 */
export declare class RoomItem extends Component<RoomItemProps, RoomItemState> {
  /** 房间风格选择器CSS类名 */
  private _roomStyleSelectClassName: string;
  
  /** 房间类型选择项 */
  private _roomTypeSelectOptions: ReactElement[];
  
  /** 房间风格选择项 */
  private _roomStyleSelectOptions: ReactElement[];
  
  /** 图片按钮引用 */
  private refs: {
    picBtn: AddPictureButton;
    nameTextInput: Input;
    roomStyleSelect: Select;
  };

  constructor(props: RoomItemProps);

  /**
   * 组件挂载前初始化
   * @deprecated 使用 componentDidMount 替代
   */
  UNSAFE_componentWillMount(): void;

  /**
   * 切换选中状态
   * @private
   */
  private _changeCheck(): void;

  /**
   * 选中状态变化处理
   * @private
   */
  private _onCheckedChange(event: ChangeEvent<HTMLInputElement>): void;

  /**
   * 名称输入变化处理
   * @private
   */
  private _onNameChange(event: ChangeEvent<HTMLInputElement>): void;

  /**
   * 房间类型变化处理
   * @private
   */
  private _onRoomTypeChange(typeId: string | number): void;

  /**
   * 房间风格变化处理
   * @private
   */
  private _onRoomStyleChange(styleId: string | number): void;

  /**
   * 初始化房间类型选择项
   * @private
   */
  private _initRoomTypeSelectOptions(): void;

  /**
   * 初始化房间风格选择项
   * @private
   */
  private _initRoomStyleSelectOptions(): void;

  /**
   * 图片点击处理
   * @private
   */
  private _onPictureClick(): void;

  /**
   * 图片图标点击处理
   * @private
   */
  private _onPictureIconClick(): void;

  /**
   * 名称输入框获得焦点处理
   * @private
   */
  private _onNameTextInputFocus(): void;

  /**
   * 格式化数字为固定小数位字符串
   * @private
   * @param value - 要格式化的数字
   * @returns 保留1位小数的字符串
   */
  private _toFixedNumberStr(value: number): string;

  /**
   * 获取当前图片信息
   * @returns 当前图片信息
   */
  getCurrentPicInfo_(): PictureInfo | undefined;

  /**
   * 获取当前名称
   * @returns 当前名称
   */
  getCurrentName_(): string;

  /**
   * 更换图片
   * @param pictureInfo - 新图片信息
   * @param mask - 图片遮罩
   */
  changePicture_(pictureInfo: PictureInfo, mask?: unknown): void;

  /**
   * 更改图片遮罩
   * @param mask - 遮罩数据
   */
  changePictureMask_(mask: unknown): void;

  /**
   * 渲染组件
   */
  render(): ReactElement;
}