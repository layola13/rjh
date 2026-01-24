/**
 * 渲染操作模块
 * 提供智能渲染、视角选择、相机配置等功能
 */

import { OperationId, BaseOperation } from './BaseOperation';
import type { HSApp, HSCore, NWTK, ResourceManager } from './GlobalTypes';

/**
 * 房间类型接口
 */
interface Room {
  ID: string;
  id: string;
  roomType: string;
  roomTypeDisplayName?: string;
}

/**
 * 相机参数接口
 */
interface CameraParams {
  x: number;
  y: number;
  z: number;
  target_x: number;
  target_y: number;
  target_z: number;
  horizontal_fov?: number;
  clip?: boolean;
}

/**
 * 标准化后的相机参数
 */
interface NormalizedCameraParams extends CameraParams {
  target_x: number;
  target_y: number;
  target_z: number;
}

/**
 * 相机数据结构
 */
interface CameraData {
  pos: [number, number, number];
  target: [number, number, number];
  fov: number;
  near: number;
}

/**
 * 智能相机项
 */
interface IntelligenceCameraItem {
  camera: CameraData;
  roomTypeDisplayName?: string;
}

/**
 * 房间漫游数据
 */
interface RoomWanderData {
  camera_single: IntelligenceCameraItem[];
  camera_sphere: IntelligenceCameraItem[];
}

/**
 * 布局漫游配置
 */
interface LayoutWanderConfig {
  room_wander: Record<string, RoomWanderData>;
}

/**
 * 智能相机数据响应
 */
interface IntelligenceCameraResponse {
  layout_wander?: LayoutWanderConfig;
  room_sort?: string[];
}

/**
 * 智能相机列表结果
 */
interface IntelligenceCamerasResult {
  intelligenceImageCameraList: IntelligenceCameraItem[];
  intelligencePanoCameraList: IntelligenceCameraItem[];
  isPrepared: boolean;
}

/**
 * 渲染质量和比例默认配置
 */
interface RenderQualityConfig {
  quality: string;
  ratio?: string;
}

/**
 * 渲染配置映射
 */
interface RenderConfigMap {
  image: RenderQualityConfig;
  panorama: RenderQualityConfig;
  aerial: RenderQualityConfig;
  topview: RenderQualityConfig;
}

/**
 * 渲染参数接口
 */
interface RenderParams {
  subType: string;
  selectedId?: string;
  roomId?: string;
  inputRoomId?: string;
  roomType?: string;
  quality: string;
  ratio: string;
}

/**
 * 消息对象接口
 */
interface MessageObject {
  params: RenderParams;
  reply?: string;
  isFuncDone?: boolean;
  result?: {
    actionType: 'apply' | 'reapply' | 'cancel';
  };
  recommendedOperationTypes?: unknown[];
}

/**
 * 选择项接口
 */
interface SelectionOption {
  index: number;
  label: string;
}

/**
 * 房间选择项
 */
interface RoomSelectionOption {
  label: string;
  value: string;
  room: Room;
}

/**
 * 单选框配置
 */
interface RadioConfig {
  type: 'radio';
  options: RoomSelectionOption[];
  value: string;
  onChange: (value: string) => void;
}

/**
 * 渲染配置项
 */
interface RenderConfigItem {
  id?: number;
  label?: string;
  displayName: string;
  subRenderType: string;
  ratios?: Array<{ w: number; h: number }>;
}

/**
 * 多房间渲染参数
 */
interface MultipleRoomRenderParams {
  payloads: Room[];
  renderPlugin: RenderPlugin;
  cfg: RenderConfigItem[];
  formatType: string;
  params: RenderParams;
  messageObj: MessageObject;
}

/**
 * 渲染插件接口
 */
interface RenderPlugin {
  submit: () => Promise<boolean | undefined> | undefined;
  setCameraForRender: (config: { type: string; camera: CameraData }, formatType: string) => void;
  getIntelligentCams: () => IntelligenceCamerasResult;
  getSubRenderConfig: () => Record<string, RenderConfigItem[]>;
  setCameraQualityAndRatio: (qualityIndex: number, ratioIndex: number) => void;
  getHandler: () => { start: (type: string, ...args: unknown[]) => void };
}

/**
 * 视频智能生成URL响应
 */
interface VideoSmartGenerateUrlResponse {
  data?: {
    result?: {
      id: string;
      houseDataUrl: string;
    };
  };
}

/**
 * 智能相机任务结果
 */
interface SmartCameraTaskResult {
  designId?: string;
  taskId?: string;
}

/**
 * 智能相机数据响应
 */
interface SmartCameraDataResponse {
  data?: {
    result?: {
      code: number;
      data: string;
    };
  };
}

/**
 * 渲染操作类
 * 负责处理各类渲染任务的执行、视角选择、相机配置等
 */
export declare class OpRender extends BaseOperation {
  /**
   * 备选相机列表
   */
  alterCams: CameraData[];

  /**
   * 当前选中的相机索引
   */
  alterIndex: number;

  constructor();

  /**
   * 获取操作ID
   * @returns 渲染提交操作的唯一标识符
   */
  static getId(): typeof OperationId.RenderSubmit;

  /**
   * 获取推荐的操作类型
   * @param operationId - 操作ID
   * @returns 推荐操作类型列表
   */
  static getRecommendedOperationTypes(operationId: string): unknown[];

  /**
   * 标准化相机目标点
   * 将相机的目标点归一化到单位长度
   * @param camera - 相机参数
   * @returns 标准化后的相机参数
   */
  normalTarget(camera: CameraParams): NormalizedCameraParams;

  /**
   * 排序自动相机
   * @param cameraData - 相机数据映射
   * @param sortOrder - 排序顺序数组
   * @returns 排序后的相机配置数组
   */
  sortAutoCamera(
    cameraData: Record<string, RoomWanderData>,
    sortOrder: string[]
  ): Array<Record<string, RoomWanderData>>;

  /**
   * 格式化智能相机数据
   * @param cameraType - 相机类型（'image' 或 'pano'）
   * @param roomData - 房间数据数组
   * @returns 格式化后的智能相机列表
   */
  formatIntelligenceCamera(
    cameraType: 'image' | 'pano',
    roomData: Array<Record<string, RoomWanderData>>
  ): IntelligenceCameraItem[];

  /**
   * 根据ID获取房间
   * @param roomId - 房间ID
   * @returns 房间对象或null
   */
  getRoomByID(roomId: string): Room | null;

  /**
   * 获取房间类型显示名称
   * @param room - 房间对象
   * @returns 房间类型的本地化显示名称
   */
  getRoomTypeDisplayName(room: Room | null): string;

  /**
   * 获取智能相机数据（内部方法）
   * @returns 智能相机列表结果的Promise
   */
  private _getIntelligenceCameras(): Promise<IntelligenceCamerasResult>;

  /**
   * 获取智能相机数据
   * @param renderPlugin - 渲染插件实例
   * @returns 智能相机数据的Promise
   */
  private _getIntelligentCamData(renderPlugin: RenderPlugin): Promise<IntelligenceCamerasResult>;

  /**
   * 提交渲染任务
   * @param messageObj - 消息对象
   */
  private _submitRender(messageObj: MessageObject): void;

  /**
   * 查询视角选择
   * 显示视角选择界面并处理用户交互
   * @param messageObj - 消息对象
   * @param formatType - 格式类型（如 'image', 'panorama'）
   */
  private _queryForViewpointSelection(messageObj: MessageObject, formatType: string): void;

  /**
   * 获取相机所在的房间
   * @param position - 相机位置（二维坐标）
   * @param roomType - 可选的房间类型过滤
   * @returns 房间对象或undefined
   */
  private _getCameraRoom(position: { x: number; y: number }, roomType?: string): Room | undefined;

  /**
   * 确保退出相册模式
   * @returns Promise，在退出完成后resolve
   */
  private _ensureAlbumQuit(): Promise<void>;

  /**
   * 检查子渲染类型是否支持
   * @param subRenderType - 子渲染类型（如 '8K', 'TopView8K'）
   * @returns 是否支持该渲染类型
   */
  private _isSubRenderTypeSupport(subRenderType: string): boolean;

  /**
   * 执行操作
   * @param messageObj - 消息对象，包含渲染参数和配置
   */
  onExecute(messageObj: MessageObject): void;

  /**
   * 执行渲染动作
   * @param renderPlugin - 渲染插件实例
   * @param configItems - 渲染配置项数组
   * @param formatType - 格式类型
   * @param params - 渲染参数
   * @param messageObj - 消息对象
   */
  renderAction(
    renderPlugin: RenderPlugin,
    configItems: RenderConfigItem[],
    formatType: string,
    params: RenderParams,
    messageObj: MessageObject
  ): void;

  /**
   * 检查渲染参数有效性
   * @param formatType - 格式类型
   * @param params - 渲染参数
   * @param configItems - 配置项数组
   * @param messageObj - 消息对象
   * @returns 参数是否有效
   */
  checkParams(
    formatType: string,
    params: RenderParams,
    configItems: RenderConfigItem[],
    messageObj: MessageObject
  ): boolean;

  /**
   * 显示多房间类型选择界面
   * @param params - 多房间渲染参数
   */
  showMultipleRoomTypesSelect(params: MultipleRoomRenderParams): void;

  /**
   * 操作开始回调
   * @param message - 提示消息
   */
  protected onStart(message: string): void;

  /**
   * 操作处理中回调
   * @param message - 处理消息
   */
  protected onProcess(message: string): void;

  /**
   * 操作完成回调
   * @param status - 完成状态（'success' | 'fail' | 'cancel'）
   * @param message - 完成消息或消息对象
   * @param messageObj - 原始消息对象
   */
  protected onFinish(
    status: 'success' | 'fail' | 'cancel',
    message: string | { type: string; data: unknown },
    messageObj: MessageObject
  ): void;

  /**
   * 查询选择回调
   * @param prompt - 提示文本
   * @param options - 选项数组
   * @param callback - 选择回调函数
   * @param config - 可选的单选框配置
   */
  protected onQuerySelection(
    prompt: string,
    options: SelectionOption[],
    callback: (selectedIndex: number) => void,
    config?: RadioConfig
  ): void;
}

/**
 * 默认渲染质量和比例配置
 */
export declare const DEFAULT_RENDER_CONFIG: Readonly<RenderConfigMap>;

/**
 * 操作ID枚举
 */
export declare const ID: typeof OperationId.RenderSubmit;