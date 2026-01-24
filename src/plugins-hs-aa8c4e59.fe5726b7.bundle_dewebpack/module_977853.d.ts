/**
 * 样板间创建命令模块
 * 负责处理样板间的创建、提交和图片选择流程
 */

import type { App } from './app-types';
import type { Floorplan } from './floorplan-types';
import type { CatalogPlugin } from './catalog-plugin-types';
import type { Command } from './command-types';

/**
 * 房间基础信息接口
 */
interface RoomInfo {
  /** 房间ID */
  id: string | number;
  /** 是否选中 */
  checked: boolean | 'wholeHouse';
  /** 房间名称 */
  name: string;
  /** 面积信息 */
  areaInfo: {
    /** 面积数值 */
    area: number;
    /** 显示单位 */
    displayUnit: string;
    /** 精度位数 */
    precisionDigits: number;
  };
  /** 房间类型ID */
  roomTypeId: string | number;
  /** 图片信息 */
  picInfo: {
    /** 图片ID */
    id?: string;
    /** 图片URL */
    url: string;
  };
  /** 是否为全屋 */
  wholehouse?: boolean;
  /** 面积 */
  area?: number;
  /** 房间风格ID */
  roomStyleId?: string;
}

/**
 * 已下载的封面图片信息
 */
interface DownloadedCoverPicInfo {
  /** 图片ID */
  id: string;
  /** 原始URL */
  originUrl: string;
  /** 渲染类型 */
  renderingType: string;
  /** 设计版本 */
  designVersion: string;
  /** 房间ID */
  roomId?: string | number;
}

/**
 * 房间风格属性
 */
interface RoomStyleAttribute {
  [key: string]: unknown;
}

/**
 * 发送到服务器的数据结构
 */
interface SendingData {
  /** 设计URL */
  designUrl: string;
  /** 数据数组 */
  dataArr: RoomInfo[];
}

/**
 * 样板间模板数据
 */
interface StylerTemplateData {
  /** 设计ID */
  id: string;
  /** 房间ID */
  roomId?: string | number;
  /** 模板名称 */
  templateName: string;
  /** 面积 */
  area: number;
  /** 房间类型 */
  roomType: string | number;
  /** 房间风格 */
  roomStyle: string;
  /** 设计ID */
  designId: string;
  /** 设计URL */
  designUrl: string;
  /** 缩略图 */
  thumb: string;
  /** 是否使用后处理 */
  usePostProcess: boolean;
  /** 模板数据 */
  templateData?: unknown;
}

/**
 * 全屋模板数据
 */
interface WholehouseTemplateData {
  /** 设计ID */
  designId: string;
  /** 名称 */
  name: string;
  /** 缩略图 */
  thumb: string;
  /** 风格 */
  style: string;
  /** 总面积 */
  wholeArea: string;
  /** 卧室数量 */
  bedroomNum: number;
  /** 客厅数量 */
  livingroomNum: number;
  /** 卫生间数量 */
  bathroomNum: number;
  /** 房间数量 */
  roomCount?: number;
}

/**
 * 单个房间数据
 */
interface SingleRoomData {
  /** 房间ID */
  roomId: string | number;
  /** 名称 */
  name: string;
  /** 风格 */
  style: string;
  /** 房间类型 */
  roomType: string | number;
  /** 面积 */
  area: string;
  /** 缩略图 */
  thumb: string;
}

/**
 * 创建产品参数
 */
interface CreateProductParams {
  /** 名称 */
  name: string;
  /** 房间类别（1:全屋 2:单间） */
  roomCategory: 1 | 2;
  /** 房间类型 */
  roomType: string;
  /** 房间风格 */
  roomStyle: string;
  /** 卧室数量 */
  bedroomNum?: number;
  /** 卫生间数量 */
  bathroomNum?: number;
  /** 客厅数量 */
  livingroomNum?: number;
  /** 面积 */
  area: number;
  /** ISO URL */
  isoUrl: string;
  /** 原始设计ID */
  originDesignId: string;
  /** 原始设计版本 */
  originDesignVersion: number;
  /** 封面URL */
  coverUrl: string;
  /** 单间房间ID */
  singleRoomId?: string | number;
  /** 房间ID */
  roomId?: string | number;
}

/**
 * 追踪日志数据
 */
interface TrackLogData {
  /** 触发类型 */
  triggerType?: 'start' | 'end';
  /** 原始数据 */
  originData?: unknown[];
  /** 查询结果 */
  queryResult?: unknown[];
  /** 状态 */
  status?: 'success' | 'fail' | 'cancel';
}

/**
 * 命令构造参数
 */
interface CommandConstructorParams {
  /** 应用实例 */
  app: App;
  /** 创建面板DOM节点 */
  creatingPanelDomNode: HTMLElement;
  /** 选择图片面板DOM节点 */
  pickImagePanelDomNode: HTMLElement;
  /** 目录插件 */
  catalogPlugin: CatalogPlugin;
  /** 发送样板间模板信号 */
  signalSendingStylerTemplate: unknown;
  /** 模板房间类型 */
  templateRoomType: string;
  /** 回调函数 */
  callback: () => void;
  /** 模板设计日志信号 */
  signalTemplateDesignToLog: {
    dispatch: (data: { logType: string; data: TrackLogData }) => void;
  };
}

/**
 * 服务器响应结果
 */
interface ServerResponse {
  /** 返回结果数组 */
  ret?: string[][];
}

/**
 * 样板间创建命令类
 * 继承自 HSApp.Cmd.Command
 */
declare class TemplateDesignCreateCommand extends Command {
  /** 应用实例 */
  private readonly _app: App;
  
  /** 创建面板DOM节点 */
  private readonly _creatingPanelDomNode: HTMLElement;
  
  /** 选择图片面板DOM节点 */
  private readonly _pickImagePanelDomNode: HTMLElement;
  
  /** 目录插件 */
  private readonly _catalogPlugin: CatalogPlugin;
  
  /** 已下载的封面图片列表 */
  private _downloadedCoverPicInfoList?: DownloadedCoverPicInfo[];
  
  /** 发送样板间模板信号 */
  private readonly _signalSendingStylerTemplate: unknown;
  
  /** 模板房间类型 */
  private readonly _templateRoomType: string;
  
  /** 回调函数 */
  private readonly _callback: () => void;
  
  /** 模板设计日志信号 */
  private readonly _signalTemplateDesignToLog: {
    dispatch: (data: { logType: string; data: TrackLogData }) => void;
  };
  
  /** 当前选中的房间 */
  private currentRoom?: RoomInfo;

  /**
   * 构造函数
   * @param params - 命令参数
   */
  constructor(params: CommandConstructorParams);

  /**
   * 执行命令
   * 渲染创建面板并启动追踪日志
   */
  onExecute(): void;

  /**
   * 接收命令
   * @returns 始终返回 true
   */
  onReceive(): boolean;

  /**
   * 是否可以撤销/重做
   * @returns 始终返回 false
   */
  canUndoRedo(): boolean;

  /**
   * 创建面板提交回调
   * @param roomList - 房间列表数据
   */
  private _onCreatingPanelSubmit(roomList: RoomInfo[]): void;

  /**
   * 显示消息提示
   * @param messageKey - 消息资源键
   * @param sendData - 发送数据
   */
  private _showMsgTips(messageKey: string, sendData: SendingData): void;

  /**
   * 发送数据到服务器
   * @param sendData - 发送数据
   * @returns Promise
   */
  private _send(sendData: SendingData): Promise<void>;

  /**
   * 执行发送到服务器操作
   * @param roomList - 房间列表
   */
  private _executeSendingToServer(roomList: RoomInfo[]): void;

  /**
   * 创建面板取消回调
   */
  private _onCreatingPanelCancel(): void;

  /**
   * 请求图片回调
   * @param dataUpdater - 数据更新器
   * @param beforeSendCallback - 发送前回调
   * @param afterSendCallback - 发送后回调
   * @param room - 房间信息
   */
  private _onRequestPicture(
    dataUpdater: {
      addData: (key: string, value: unknown) => void;
      commit: () => void;
    },
    beforeSendCallback: () => void,
    afterSendCallback: () => void,
    room: RoomInfo
  ): void;

  /**
   * 过滤图片信息列表
   * @returns 过滤后的图片列表
   */
  filterPicInfoList(): DownloadedCoverPicInfo[] | undefined;

  /**
   * 选择图片面板即将挂载回调
   * @param panel - 面板实例
   */
  private _onPickImagePanelWillMount(panel: {
    setPictureList_: (list: DownloadedCoverPicInfo[]) => void;
  }): void;

  /**
   * 获取房间列表数据
   * @returns 房间列表
   */
  private _getRoomsListData(): RoomInfo[];

  /**
   * 获取全屋信息
   * @param totalArea - 总面积
   * @returns 全屋信息对象
   */
  private _getWholehouseInfo(totalArea: number): RoomInfo;

  /**
   * 发送数据到服务器
   * @param designUrl - 设计URL
   * @param roomList - 房间列表
   * @returns Promise<服务器响应数组>
   */
  private _sendToServer(
    designUrl: string,
    roomList: RoomInfo[]
  ): Promise<ServerResponse[]>;

  /**
   * 获取用户会话ID
   * @returns Promise<会话ID>
   */
  private _getUserSessionId(): Promise<string>;

  /**
   * 添加自定义产品
   * @param dataList - 数据列表
   * @returns Promise<服务器响应数组>
   */
  private _addCustomizedProducts(dataList: unknown[]): Promise<unknown[]>;

  /**
   * 处理创建模板设计追踪日志
   * @param logData - 日志数据
   */
  private _handleCreateTemplateDesignTrackLog(logData: TrackLogData): void;

  /**
   * 处理单间数据
   * @param designUrl - 设计URL
   * @param room - 房间信息
   * @returns 样板间模板数据
   */
  handleSinglehouse(designUrl: string, room: RoomInfo): StylerTemplateData;

  /**
   * 处理全屋数据
   * @param roomList - 房间列表
   * @returns 全屋模板数据
   */
  handleWholehouse(roomList: RoomInfo[]): WholehouseTemplateData;

  /**
   * 保存数据到本地
   * @param data - 要保存的数据
   */
  saveTolocal(data: unknown): void;

  /**
   * 获取命令描述
   * @returns 命令描述字符串
   */
  getDescription(): string;

  /**
   * 获取命令类别
   * @returns 命令类别
   */
  getCategory(): string;

  /**
   * 是否为交互式命令
   * @returns 始终返回 true
   */
  isInteractive(): boolean;
}

export default TemplateDesignCreateCommand;