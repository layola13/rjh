/**
 * 墙体控制和场景管理工具模块
 * 提供场景管理、相机控制、房间检测等功能
 */

/**
 * 点坐标接口
 */
export interface Point2D {
  x: number;
  y: number;
}

/**
 * 3D点坐标接口
 */
export interface Point3D extends Point2D {
  z: number;
}

/**
 * 图片裁剪区域配置
 */
export interface ClipRect {
  /** 左边距（像素） */
  left: number;
  /** 上边距（像素） */
  top: number;
  /** 宽度（像素） */
  width: number;
  /** 高度（像素） */
  height: number;
}

/**
 * 房间信息配置选项
 */
export interface RoomInfoOptions {
  /** 是否需要宿主类型信息 */
  isNeedHostType?: boolean;
  /** 是否需要地面铺装和天花板信息 */
  needPavingCeilingInfo?: boolean;
  /** 是否需要墙面信息 */
  needWallInfo?: boolean;
}

/**
 * 应用实例类型（来自 HSApp）
 */
export type AppInstance = any; // 实际类型取决于 HSApp.App.getApp() 的返回值

/**
 * 相机实例类型
 */
export type CameraInstance = any;

/**
 * 房间实例类型
 */
export type RoomInstance = any;

/**
 * 刷新信号类型
 */
export type RefreshSignal = any;

/**
 * 倾斜校正信号类型
 */
export type TiltCorrectionSignal = any;

/**
 * 控制墙体的冻结和选择状态
 * @param app - 应用实例
 * @param freeze - true 为冻结并不可选择，false 为解冻并可选择
 */
export function controlWalls(app: AppInstance, freeze: boolean): void;

/**
 * 获取应用实例
 * @returns 当前应用实例
 */
export function getApp(): AppInstance;

/**
 * 获取相机当前指向的点坐标
 * @returns 相机焦点的3D坐标
 */
export function getCameraPoint(): Point3D;

/**
 * 获取天花板图层高度（单位：毫米）
 * @returns 天花板高度，如果没有天花板图层则返回全局墙体高度
 */
export function getCeilingLayerHeight(): number;

/**
 * 获取当前激活的相机实例
 * @returns 当前相机对象，如果未找到则返回 undefined
 */
export function getCurrentCamera(): CameraInstance | undefined;

/**
 * 获取当前第一人称视角相机
 * @returns 第一人称相机对象，如果不存在则返回 null
 */
export function getCurrentFirstViewCamera(): CameraInstance | null;

/**
 * 获取刷新信号
 * @returns 刷新信号对象，如果插件不存在则返回 undefined
 */
export function getRefreshSignal(): RefreshSignal | undefined;

/**
 * 获取相机当前所在的房间
 * @returns 相机所在的房间实例，如果不在任何房间内则返回 undefined
 */
export function getRoomCameraIn(): RoomInstance | undefined;

/**
 * 获取房间详细信息
 * @param room - 房间实例
 * @returns 房间的详细数据（用于自动样式器）
 */
export function getRoomInfo(room: RoomInstance): any;

/**
 * 获取国际化字符串
 * @param key - 字符串资源键
 * @returns 翻译后的字符串，如果未找到则返回原键值
 */
export function getString(key: string): string;

/**
 * 获取倾斜校正信号
 * @returns 倾斜校正信号对象，如果插件不存在则返回 undefined
 */
export function getTiltCorrectionSignal(): TiltCorrectionSignal | undefined;

/**
 * 裁剪并获取当前3D视图的图片
 * @param clipRect - 可选的裁剪区域，如果不提供则返回完整图片
 * @returns Promise，解析为 JPEG 格式的 Data URL
 */
export function getclipImg(clipRect?: ClipRect): Promise<string>;

/**
 * 设置倾斜校正参数
 * @param correction - 校正参数值
 */
export function setTiltCorrection(correction: any): void;

/**
 * 单例模式装饰器
 * 确保类只能创建一个实例，且构造参数必须保持一致
 * @param constructor - 要应用单例模式的类构造函数
 * @returns 代理后的构造函数，会拦截 new 操作
 * @throws 如果尝试用不同参数创建第二个实例则抛出错误
 * @example
 *