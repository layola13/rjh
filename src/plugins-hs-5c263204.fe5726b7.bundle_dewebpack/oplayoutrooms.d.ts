/**
 * 户型布局操作模块
 * 提供智能布局和约束布局功能
 */

import { BaseOperation, OperationId } from './BaseOperation';
import { Floor } from './Floor';
import { StylerTemplate } from './StylerTemplate';

/**
 * 布局类型枚举
 */
export enum HomeGptLayoutType {
  /** 约束布局 */
  ConstraintLayout = 0,
  /** 智能布局 */
  SmartLayout = 1,
  /** 混合布局 */
  MixLayout = 2
}

/**
 * 房间信息接口
 */
export interface RoomInfo {
  /** 房间楼层对象 */
  floor: Floor;
  /** 房间配置选项 */
  options: Record<string, unknown>;
  /** 房间类型 */
  roomType?: string;
  /** 估算的房间类型 */
  estimatedRoomType?: string;
}

/**
 * 布局参数接口
 */
export interface LayoutParams {
  /** 子类型 */
  subType: string;
  /** 房间ID */
  roomId?: string;
  /** 房间类型 */
  roomType?: string;
  /** 布局类型 */
  layoutType?: string;
  /** 是否已选择 */
  isSelected?: boolean;
  /** 输入的房间ID */
  inputRoomId?: string;
  /** 风格 */
  style?: string;
}

/**
 * 消息对象接口
 */
export interface MessageObject {
  /** 参数 */
  params: LayoutParams;
  /** 是否为疑问语气 */
  isQuestionTone?: number;
  /** 功能是否完成 */
  isFuncDone?: boolean;
  /** 回复内容 */
  reply?: string;
  /** 推荐的操作类型 */
  recommendedOperationTypes?: string[];
  /** 操作结果 */
  result?: {
    actionType: 'apply' | 'cancel';
  };
}

/**
 * 模板与房间映射接口
 */
export interface TemplateRoomMapping {
  /** 房间对象 */
  room: Floor | null;
  /** 样式模板 */
  stylerTemplate: StylerTemplate;
}

/**
 * 自定义房间信息接口
 */
export interface CustomizedRoom {
  /** 卧室数量 */
  bedroomCount?: number;
  /** 卫生间数量 */
  bathroomCount?: number;
  /** 客厅数量 */
  livingroomCount?: number;
  /** 房间面积 */
  roomArea: number;
  /** 房间风格 */
  roomStyle?: string;
}

/**
 * 模板项接口
 */
export interface TemplateItem {
  /** 模板图片 */
  image: string;
  /** 自定义房间信息 */
  customizedRoom: CustomizedRoom;
}

/**
 * 查询模板结果接口
 */
export interface QueryTemplateResult {
  /** 模板项列表 */
  items: TemplateItem[];
}

/**
 * 选择配置接口
 */
export interface SelectionConfig {
  /** 配置类型 */
  type: 'blockOption' | 'radio';
  /** 选项列表 */
  options: Array<{
    label: string;
    value: string;
    room?: Floor;
  }>;
  /** 当前值 */
  value: string | null;
  /** OSS图片参数 */
  ossImageParam?: string;
  /** 是否隐藏水印 */
  isHiddenWatermark?: boolean;
  /** 点击事件回调 */
  onClick?: (value: string) => void;
  /** 变更事件回调 */
  onChange?: (value: string) => void;
}

/**
 * 户型布局操作类
 * 负责处理整屋布局和单房间布局功能
 */
export declare class OpLayoutRooms extends BaseOperation {
  /** 是否为全屋布局 */
  private _isWhole;
  
  /** 模板映射表 (搜索键 -> 模板列表) */
  private _templateMap: Map<string, TemplateItem[]>;
  
  /** 房间映射表 (房间 -> 搜索键) */
  private _roomMap: Map<Floor | null, string>;
  
  /** 当前应用的模板索引 */
  private _applyIndex: number;
  
  /** 布局类型 */
  private _layoutType: HomeGptLayoutType;
  
  /** 消息对象 */
  private _messageObj: MessageObject | null;

  constructor();

  /**
   * 获取处理器
   */
  get handler(): unknown;

  /**
   * 获取房间列表
   * @returns 房间信息数组
   */
  getRoomLists(): RoomInfo[];

  /**
   * 判断是否为全屋布局
   * @param layoutType - 布局类型
   * @returns 是否为全屋布局
   */
  isWholeHouseLayout(layoutType: string): boolean;

  /**
   * 执行操作
   * @param message - 消息对象
   */
  onExecute(message: MessageObject): void;

  /**
   * 执行布局
   * @param rooms - 房间列表
   * @param message - 消息对象
   */
  layout(rooms: RoomInfo[], message: MessageObject): Promise<void>;

  /**
   * 约束布局
   * @param rooms - 房间列表
   * @param message - 消息对象
   */
  constraintLayout(rooms: RoomInfo[], message: MessageObject): void;

  /**
   * 智能设计布局
   * @param rooms - 房间列表
   * @param message - 消息对象
   */
  smartDesignLayout(rooms: RoomInfo[], message: MessageObject): void;

  /**
   * 根据模板进行智能布局
   * @param message - 消息对象
   * @returns 是否成功
   */
  smartLayoutByTemplate(message: MessageObject): Promise<boolean>;

  /**
   * 恢复之前的布局
   */
  restore(): void;

  /**
   * 命令终止回调
   * @param event - 事件对象
   */
  onCommandTerminated(event: { data: { cmd: { type: string; existFailRooms?: boolean; failRooms?: unknown[] } } }): void;

  /**
   * 获取面积范围标识
   * @param area - 面积
   * @param isRoom - 是否为房间（false表示全屋）
   * @returns 面积范围标识
   */
  getAreaRange(area: number, isRoom: boolean): string;

  /**
   * 获取卧室数量
   * @returns 卧室数量
   */
  getBedRoomCount(): number;

  /**
   * 获取房间搜索类型
   * @param roomType - 房间类型
   * @returns 搜索类型
   */
  getRoomSearchType(roomType: string): string | undefined;

  /**
   * 显示选择UI
   * @param templates - 模板列表
   * @param message - 消息对象
   */
  showSelectionUI(templates: TemplateItem[], message: MessageObject): void;

  /**
   * 显示多房间类型选择
   * @param rooms - 房间列表
   * @param message - 消息对象
   */
  showMultipleRoomTypesSelect(rooms: RoomInfo[], message: MessageObject): void;

  /**
   * 生成模板搜索键
   * @param areaRange - 面积范围
   * @param roomType - 房间类型
   * @param bedroomCount - 卧室数量
   * @param style - 风格
   * @returns 搜索键
   */
  private _getTemplateSearchKey(
    areaRange: string,
    roomType: string | null,
    bedroomCount: number | null,
    style?: string
  ): string;

  /**
   * 根据相似度排序模板
   * @param templates - 模板列表
   * @param area - 面积
   * @param style - 风格
   * @returns 排序后的模板列表
   */
  sortTemplateBySimilar(templates: TemplateItem[], area: number, style?: string): TemplateItem[];

  /**
   * 清理资源
   */
  cleanup(): void;

  /**
   * 获取操作ID
   * @returns 操作ID
   */
  static getId(): OperationId;
}

/**
 * 全局声明：将布局类型添加到window对象
 */
declare global {
  interface Window {
    HomeGptLayoutType: typeof HomeGptLayoutType;
  }
}