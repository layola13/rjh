/**
 * 自动调整容器尺寸以适配地板内容的模块
 * @module FloorContentAutoResize
 */

/**
 * 间隙配置接口
 * 定义内容与容器边缘的间距
 */
interface GapConfiguration {
  /** 顶部间隙（米） */
  top?: number;
  /** 左侧间隙（米） */
  left?: number;
  /** 右侧间隙（米） */
  right?: number;
  /** 后侧间隙（米） */
  back?: number;
}

/**
 * 状态对象接口
 * 表示可读写的参数状态
 */
interface State<T = number> {
  /** 状态值 */
  value: T;
}

/**
 * 内容类型枚举
 */
declare const enum ContentTypeEnum {
  ext_FloorBasedContent = "ext_FloorBasedContent"
}

/**
 * 内容类型接口
 */
interface ContentType {
  /**
   * 检查是否为指定类型
   * @param type - 要检查的内容类型
   */
  isTypeOf(type: ContentTypeEnum): boolean;
}

/**
 * 内容对象接口
 * 表示场景中的一个内容实体
 */
interface Content {
  /** 内容类型 */
  contentType: ContentType;
  /** X轴位置（米） */
  x: number;
  /** Y轴位置（米） */
  y: number;
  /** Z轴位置（米） */
  z: number;
  /** X方向长度（米） */
  XLength: number;
  /** Y方向长度（米） */
  YLength: number;
  /** Z方向长度（米） */
  ZLength: number;
  /** Z轴旋转角度（度） */
  ZRotation: number;
}

/**
 * 容器对象接口
 * 表示包含其他内容的容器实体
 */
interface Container {
  /** 容器内的内容映射 */
  contents: Record<string, Content>;
  /** X轴位置（米） */
  x: number;
  /** Y轴位置（米） */
  y: number;
  /** Y方向长度（米） */
  YLength: number;
  
  /**
   * 根据ID获取状态对象
   * @param id - 状态标识符
   * @returns 状态对象，不存在时返回undefined
   */
  getStateById(id: string): State | undefined;
  
  /**
   * 调整容器尺寸
   * @param xLength - X方向新长度（米）
   * @param yLength - Y方向新长度（米）
   * @param zLength - Z方向新长度（米）
   */
  resize(xLength: number, yLength: number, zLength: number): void;
}

/**
 * 自动调整容器尺寸以适配单个地板内容
 * 
 * 功能说明：
 * 1. 检查容器是否恰好包含一个地板类型内容
 * 2. 根据间隙配置和板材厚度计算容器尺寸
 * 3. 自动调整内容位置以居中放置
 * 
 * @param container - 要调整的容器对象
 * @param gapConfig - 可选的间隙配置，未提供则使用容器现有状态值
 * @returns 无返回值，容器不符合条件时静默返回
 */
export default function autoResizeFloorContent(
  container: Container,
  gapConfig?: GapConfiguration
): void;