import React, { Component, RefObject } from 'react';
import { Input, Select, Button } from 'antd';

/**
 * 图片信息接口
 */
interface PictureInfo {
  /** 图片ID */
  id: string;
  /** 图片URL */
  url: string;
}

/**
 * 房间类型接口
 */
interface RoomType {
  /** 房间类型ID */
  id: string;
  /** 房间类型名称（资源键） */
  name: string;
}

/**
 * 自定义UI组件接口
 */
interface CustomizedUIWithValue {
  /** 显示UI到指定DOM节点 */
  show(container: HTMLElement): void;
  /** 隐藏并清理UI */
  hide(): void;
}

/**
 * 保存回调参数接口
 */
interface SaveCallbackData {
  /** 模板名称 */
  name: string;
  /** 选中的房间类型ID */
  roomTypeId: string;
  /** 图片信息 */
  picInfo: PictureInfo;
}

/**
 * 图片数据提交器接口
 */
interface PictureDataCommitter {
  /** 获取数据 */
  getData(key: 'hasError' | 'picId' | 'picUrl'): boolean | string;
  /** 销毁实例 */
  destroy(): void;
}

/**
 * 图片按钮组件引用接口
 */
interface PictureButtonRef {
  /** 获取当前图片信息 */
  getCurrentPicInfo_(): PictureInfo;
  /** 改变图片遮罩状态 */
  changePictureMask_(mask: PictureMaskType): void;
  /** 改变图片 */
  changePicture_(picInfo: PictureInfo, onComplete: () => void): void;
}

/**
 * 文本输入框引用接口
 */
interface TextInputRef {
  /** 当前输入值的状态 */
  state: {
    value: string;
  };
  /** 选中输入框内容 */
  select(): void;
}

/**
 * 图片遮罩类型枚举
 */
enum PictureMaskType {
  None = 0,
  Loading = 1,
  Error = 2
}

/**
 * 组件状态枚举
 */
enum ComponentStatus {
  WillMountStatus = 0,
  MountedStatus = 1,
  UnMountedStatus = 2
}

/**
 * 校验结果接口
 */
interface ValidationResult {
  /** 是否有效 */
  isValid: boolean;
  /** 无效原因列表 */
  reasons?: string[];
}

/**
 * 编辑样式模板面板组件属性接口
 */
export interface EditStylerTemplatePanelProps {
  /** 初始模板名称 */
  initialName: string;
  /** 初始房间类型ID */
  initialRoomTypeId: string;
  /** 初始图片信息 */
  initialPicInfo: PictureInfo;
  /** 房间类型列表 */
  roomTypeList: RoomType[];
  /** 无效的房间类型ID集合 */
  invalidRoomTypeIdSet: Set<string>;
  /** 是否为全屋标识 */
  wholehouseFlag?: boolean;
  /** 自定义UI组件列表 */
  customizedUIWithValueList?: CustomizedUIWithValue[];
  /**
   * 保存回调通知
   * @param data 保存的数据
   * @param instance 组件实例
   */
  saveNotify?: (data: SaveCallbackData, instance: EditStylerTemplatePanel) => void;
  /**
   * 取消回调通知
   * @param instance 组件实例
   */
  cancelNotify?: (instance: EditStylerTemplatePanel) => void;
  /**
   * 请求图片回调通知
   * @param committer 数据提交器
   * @param onStart 开始回调
   * @param instance 组件实例
   */
  requestPictureNotify?: (
    committer: PictureDataCommitter,
    onStart: () => void,
    instance: EditStylerTemplatePanel
  ) => void;
}

/**
 * 编辑样式模板面板组件状态接口
 */
interface EditStylerTemplatePanelState {
  /** 当前选中的房间类型ID */
  changedRoomTypeId: string;
}

/**
 * 编辑样式模板面板组件
 * 用于编辑AI自动设计模板的名称、类型、风格和图片
 */
export default class EditStylerTemplatePanel extends Component<
  EditStylerTemplatePanelProps,
  EditStylerTemplatePanelState
> {
  /** 组件挂载状态 */
  private _status?: ComponentStatus;
  /** 关闭按钮图标URL */
  private _closeBtnImageUrl?: string;
  /** 面板标题 */
  private _HEAD_TITLE?: string;
  /** 上传图片描述文本 */
  private _UPLOAD_IMG_DESC?: string;
  /** 保存按钮文本 */
  private _SAVE_BTN_CAPTION?: string;
  /** 取消按钮文本 */
  private _CANCEL_BTN?: string;
  /** 图片数据请求提交器 */
  private _requestPicDataCommitter?: PictureDataCommitter;
  /** 自定义UI容器DOM节点 */
  private _customizedDomNode?: HTMLElement;
  /** 图片是否正在加载 */
  private _isPictureLoading?: boolean;
  /** 房间类型选择器选项列表 */
  private _roomTypeSelectOptions?: React.ReactElement[];

  /** Refs类型声明 */
  refs: {
    nameTextInput: TextInputRef;
    picBtn: PictureButtonRef;
    closeBtn: HTMLSpanElement;
    customizedUIRoot: HTMLDivElement;
  };

  constructor(props: EditStylerTemplatePanelProps);

  UNSAFE_componentWillMount(): void;
  componentDidMount(): void;
  componentWillUnmount(): void;
  render(): React.ReactElement;

  /**
   * 更新图片加载状态
   * @param isLoading 是否正在加载
   */
  private _updatePictureLoading(isLoading: boolean): void;

  /**
   * 初始化房间类型选择器选项
   */
  private _initRoomTypeSelectOptions(): void;

  /**
   * 保存按钮点击处理
   */
  private _onBtnSaveClick(): void;

  /**
   * 取消按钮点击处理
   */
  private _onBtnCancelClick(): void;

  /**
   * 名称输入框获得焦点处理
   */
  private _onNameTextInputFocus(): void;

  /**
   * 房间类型变更处理
   * @param roomTypeId 新的房间类型ID
   */
  private _onRoomTypeChange(roomTypeId: string): void;

  /**
   * 校验当前表单数据有效性
   * @returns 校验结果
   */
  private _checkValid(): ValidationResult;

  /**
   * 请求更换图片处理
   */
  private _onRequestChangePicture(): void;

  /**
   * 获取图片信息数据回调
   * @param committer 数据提交器
   */
  private _onGetPicInfoData(committer: PictureDataCommitter): void;

  /**
   * 渲染内容区域
   * @param isRoomTypeInvalid 房间类型是否无效
   */
  private _RenderContent(isRoomTypeInvalid: boolean): React.ReactElement;

  /**
   * 显示自定义UI组件
   */
  private _showCustomizedUI(): void;

  /**
   * 关闭并清理所有自定义UI组件
   */
  private _closeCustomizedUIArr(): void;
}