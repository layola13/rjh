/**
 * AI设计辅助工具模块
 * 提供房间管理、相机控制、用户交互等功能
 */

/**
 * 操作参数接口
 */
export interface OperationParams {
  /** 操作类型 */
  operationType: string;
  /** 回复内容 */
  reply: string;
  /** 额外参数 */
  params: {
    type: string;
    [key: string]: unknown;
  };
}

/**
 * 设计信息接口
 */
export interface DesignInfo {
  /** 平面图信息 */
  floorPlanInfo: Record<string, unknown>;
  /** 房间信息列表 */
  roomInfo: Room[];
}

/**
 * 房间实体接口
 */
export interface Room {
  /** 房间唯一标识 */
  id: string;
  /** 房间类型 */
  roomType?: string;
  /** 获取房间外轮廓多边形 */
  getOuterLoopPolygon(): Point[];
}

/**
 * 二维坐标点
 */
export type Point = [number, number];

/**
 * 选中信息接口
 */
export interface SelectedInfo {
  /** 选中对象ID */
  selectedId: string;
  /** 输入房间ID */
  inputRoomId: string;
  /** 输入房间类型 */
  inputRoomType: string;
  /** 输入房间描述 */
  inputRoomDescription: string;
}

/**
 * 相机视图尺寸
 */
export interface ViewBoxSize {
  /** 视图宽度 */
  width: number;
  /** 视图高度 */
  height: number;
}

/**
 * 教学对话框参数
 */
export interface TeachingDialogOptions {
  /** 页面显示配置 */
  showPage: {
    /** 页面名称 */
    name: string;
    /** 页面数据 */
    data: {
      /** 教程链接 */
      url: string;
      /** 教程标题 */
      title: string;
    };
  };
}

/**
 * 长度单位枚举
 */
export enum LengthUnitType {
  /** 厘米 */
  centimeter = 'centimeter',
  /** 毫米 */
  millimeter = 'millimeter',
  /** 英尺 */
  foot = 'foot',
  /** 英寸 */
  inch = 'inch',
  /** 米 */
  meter = 'meter'
}

/**
 * 用户追踪日志参数
 */
export interface TrackLogArgs {
  /** 日志描述 */
  description?: string;
  /** 活动区域 */
  activeSection?: string;
  /** 活动区域名称 */
  activeSectionName?: string;
  /** 参数信息 */
  argInfo?: Record<string, unknown>;
}

/**
 * 解析大语言模型参数
 * @param paramsJson - JSON格式的参数字符串
 * @returns 解析后的操作参数对象
 */
export function parseParams(paramsJson: string): OperationParams;

/**
 * 获取设计信息
 * @returns Promise，包含序列化的设计信息JSON字符串
 */
export function getDesignInfo(): Promise<string>;

/**
 * 获取相机所在房间
 * @returns 相机当前所在的房间对象，如果不在任何房间则返回null
 */
export function getCameraRoom(): Room | null;

/**
 * 获取当前选中的信息
 * @returns 选中对象的详细信息
 */
export function getSelectedInfo(): SelectedInfo;

/**
 * 获取语言类型
 * @returns 当前应用的显示语言名称
 */
export function getLangType(): string;

/**
 * 将相机移动到指定房间
 * @param roomId - 目标房间ID
 */
export function cameraMoveToRoom(roomId: string): void;

/**
 * 获取所有房间列表
 * @returns 平面图中所有房间的数组
 */
export function getRoomLists(): Room[];

/**
 * 根据ID或类型获取房间列表
 * @param roomIds - 房间ID字符串，多个ID用逗号分隔
 * @param roomTypes - 房间类型字符串，多个类型用逗号分隔
 * @returns 匹配的房间数组
 */
export function getRoomsByIdOrType(roomIds: string, roomTypes: string): Room[];

/**
 * 记录用户行为追踪日志
 * @param eventName - 事件名称
 * @param description - 事件描述
 * @param args - 附加参数信息
 */
export function trackLog(
  eventName: string,
  description: string,
  args?: Record<string, unknown>
): void;

/**
 * 判断两个房间类型是否相同（包含子类型匹配）
 * @param type1 - 第一个房间类型
 * @param type2 - 第二个房间类型
 * @returns 如果类型匹配返回true
 */
export function isSameRoomType(type1: string, type2: string): boolean;

/**
 * 获取房间的通用类型
 * @param roomType - 具体房间类型
 * @returns 房间的通用分类，如果无法分类则返回undefined
 */
export function getRoomGeneralType(roomType: string): string | undefined;

/**
 * 选中目标房间并聚焦
 * @param room - 要选中的房间对象
 */
export function selectedTargetRoom(room: Room): void;

/**
 * 显示会员等级弹窗
 * @param source - 弹窗来源标识
 * @param grade - 会员等级类型（可选）
 */
export function bugGradePopup(source: string, grade?: string): void;

/**
 * 显示AI建模器升级弹窗
 */
export function bugAIModelerPopup(): void;

/**
 * 将面积转换为指定单位
 * @param area - 面积值（平方米）
 * @param unit - 目标长度单位
 * @returns 转换后的面积值
 */
export function convertAreaToSettingUnit(area: number, unit: LengthUnitType): number;

/**
 * 将面积映射为带单位的平方单位字符串
 * @param area - 面积值（平方米）
 * @param unit - 长度单位类型
 * @returns 格式化的面积字符串，例如 "10.5m²"
 */
export function unitMapToSquareUnit(area: number, unit: LengthUnitType): string;

/**
 * 创建可取消的Promise
 * @param promise - 原始Promise
 * @returns 可被查询终止监听器取消的Promise
 */
export function createCancellablePromise<T>(promise: Promise<T>): Promise<T>;

/**
 * 显示反馈弹窗
 */
export function popupFeedback(): void;

/**
 * 判断是否为AI模式
 * @returns 如果URL参数AIMode为"demo"则返回true
 */
export function isAIMode(): boolean;

/**
 * 判断是否显示AI入口
 * @returns 如果URL参数AIMode为"true"则返回true
 */
export function isShowAIEntry(): boolean;

/**
 * 向画布添加物品
 * @param productSeekId - 产品查找ID
 * @param switchTo3D - 是否切换到3D视图
 */
export function addItemToCanvas(productSeekId: string, switchTo3D: boolean): void;

/**
 * 显示教学对话框
 * @param url - 教程链接地址
 * @param title - 教程标题
 * @param userQuery - 用户查询内容（可选，用于日志）
 * @param content - 内容描述（可选，用于日志）
 */
export function showTeachingDialog(
  url: string,
  title: string,
  userQuery?: string,
  content?: string
): void;

/**
 * 判断当前用户是否为付费会员
 * @returns 如果用户是Pro、Master会员或企业有效会员返回true
 */
export function isMemberGradeFunc(): boolean;

/**
 * 随机打乱数组元素顺序（原地修改）
 * @param array - 要打乱的数组
 * @returns 打乱后的数组（同一个引用）
 */
export function shuffleArray<T>(array: T[]): T[];

/**
 * 如果文本超出指定长度则截断并添加省略号
 * @param text - 原始文本
 * @param maxLength - 最大长度（默认150）
 * @returns 截断后的文本
 */
export function truncateTextIfNeeded(text: string, maxLength?: number): string;