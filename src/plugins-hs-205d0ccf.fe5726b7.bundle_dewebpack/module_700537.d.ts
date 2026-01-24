/**
 * 智能相机生成模块
 * 提供自动生成室内场景渲染相机位置和参数的功能
 */

/**
 * 相机参数接口
 */
interface CameraParams {
  /** 相机位置 X 坐标 */
  x: number;
  /** 相机位置 Y 坐标 */
  y: number;
  /** 相机位置 Z 坐标 */
  z: number;
  /** 目标点 X 坐标 */
  target_x: number;
  /** 目标点 Y 坐标 */
  target_y: number;
  /** 目标点 Z 坐标 */
  target_z: number;
  /** 水平视场角（度） */
  horizontal_fov: number;
  /** 是否启用近裁剪面 */
  clip: boolean;
  /** 位置数组 [x, y, z] */
  pos: [number, number, number];
  /** 目标点数组 [x, y, z] */
  target: [number, number, number];
  /** 上方向向量 [x, y, z] */
  up: [number, number, number];
  /** 视场角 */
  fov: number;
  /** 近裁剪面距离 */
  near: number;
  /** 远裁剪面距离 */
  far: number;
  /** 俯仰角（度） */
  pitch?: number;
}

/**
 * 相机数据接口
 */
interface CameraData {
  /** 相机参数 */
  camera: CameraParams;
  /** 房间类型显示名称 */
  roomTypeDisplayName?: string;
  /** 缩略图 Base64 数据 */
  thumbnail?: string;
}

/**
 * 房间漫游数据
 */
interface RoomWanderData {
  /** 单张图片相机配置 */
  camera_single: CameraData[];
  /** 全景相机配置 */
  camera_sphere: CameraData[];
}

/**
 * 布局漫游数据
 */
interface LayoutWanderData {
  /** 房间漫游配置映射 */
  room_wander: Record<string, RoomWanderData>;
}

/**
 * 智能生成响应数据
 */
interface IntelligenceGenerateResult {
  /** 布局漫游数据 */
  layout_wander: LayoutWanderData;
  /** 房间排序列表 */
  room_sort: string[];
}

/**
 * 任务信息接口
 */
interface TaskInfo {
  /** 设计 ID */
  designId: string;
  /** 任务 ID */
  taskId: string;
}

/**
 * 相机结果接口
 */
interface CameraResult {
  /** 图片相机列表 */
  imageCamera: CameraData[];
  /** 全景相机列表 */
  panoCamera: CameraData[];
}

/**
 * 上传数据到指定 URL
 * @param url - 目标 URL
 * @param data - 要上传的数据
 * @returns Promise
 */
declare function uploadData(url: string, data: unknown): Promise<void>;

/**
 * 智能相机生成任务管理器
 */
declare const intelligenceTask: {
  /** 内部停止标志 */
  _stop: boolean;
  /** 轮询定时器 ID */
  _interval: number | null;

  /**
   * 启动智能相机生成任务
   * @returns 返回生成结果的 Promise
   */
  start(): Promise<IntelligenceGenerateResult | undefined>;

  /**
   * 结束任务并清理资源
   */
  end(): void;
};

/**
 * 处理相机数据
 * @param cameraType - 相机类型（"image" 或 "pano"）
 * @param roomDataList - 房间数据列表
 * @returns 处理后的相机数据数组
 */
declare function processCameras(
  cameraType: 'image' | 'pano',
  roomDataList: Array<Record<string, RoomWanderData>>
): CameraData[];

/**
 * 获取智能生成的相机配置
 * @returns 返回包含图片相机和全景相机的 Promise
 */
export declare function getIntelligenceCameras(): Promise<CameraResult | undefined>;