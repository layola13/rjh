import { Vector3 } from './Vector3';

/**
 * 轴助手相机位置枚举
 * 定义了27个预设的相机观察位置，对应3D空间中的9个方位
 */
export enum AxisHelperCameraPos {
  /** 左上前 */
  LeftTopFront = "LeftTopFront",
  /** 左上中 */
  LeftTopCenter = "LeftTopCenter",
  /** 左上后 */
  LeftTopBack = "LeftTopBack",
  /** 左中前 */
  LeftCenterFront = "LeftCenterFront",
  /** 左中中 */
  LeftCenterCenter = "LeftCenterCenter",
  /** 左中后 */
  LeftCenterBack = "LeftCenterBack",
  /** 左下前 */
  LeftBottomFront = "LeftBottomFront",
  /** 左下中 */
  LeftBottomCenter = "LeftBottomCenter",
  /** 左下后 */
  LeftBottomBack = "LeftBottomBack",
  /** 中上前 */
  CenterTopFront = "CenterTopFront",
  /** 中上中 */
  CenterTopCenter = "CenterTopCenter",
  /** 中上后 */
  CenterTopBack = "CenterTopBack",
  /** 中中前 */
  CenterCenterFront = "CenterCenterFront",
  /** 中中中（中心位置） */
  CenterCenterCenter = "CenterCenterCenter",
  /** 中中后 */
  CenterCenterBack = "CenterCenterBack",
  /** 中下前 */
  CenterBottomFront = "CenterBottomFront",
  /** 中下中 */
  CenterBottomCenter = "CenterBottomCenter",
  /** 中下后 */
  CenterBottomBack = "CenterBottomBack",
  /** 右上前 */
  RightTopFront = "RightTopFront",
  /** 右上中 */
  RightTopCenter = "RightTopCenter",
  /** 右上后 */
  RightTopBack = "RightTopBack",
  /** 右中前 */
  RightCenterFront = "RightCenterFront",
  /** 右中中 */
  RightCenterCenter = "RightCenterCenter",
  /** 右中后 */
  RightCenterBack = "RightCenterBack",
  /** 右下前 */
  RightBottomFront = "RightBottomFront",
  /** 右下中 */
  RightBottomCenter = "RightBottomCenter",
  /** 右下后 */
  RightBottomBack = "RightBottomBack"
}

/**
 * 轴面项配置接口
 */
export interface AxisFaceItemConfig {
  /** 面的名称 */
  name?: string;
  /** Alpha角度（水平旋转角） */
  alpha?: number;
  /** Beta角度（垂直旋转角） */
  beta?: number;
  /** 纹理URL */
  url?: string;
  /** 尺寸（统一大小） */
  size?: number;
  /** 宽度 */
  width?: number;
  /** 高度 */
  height?: number;
  /** 深度 */
  depth?: number;
  /** 3D位置坐标 */
  pos?: Vector3;
  /** 是否可点击 */
  clickable?: boolean;
  /** 轴中心点 */
  axis_center?: Vector3;
  /** 轴旋转 */
  axis_rot?: Vector3;
}

/**
 * 轴面项类
 * 表示坐标轴辅助工具中的一个可交互面
 */
export declare class AxisFaceItem {
  /** 面的名称 */
  name: string;
  /** Alpha角度（水平旋转角，默认为0） */
  alpha: number;
  /** Beta角度（垂直旋转角，默认为0） */
  beta: number;
  /** 纹理URL */
  url?: string;
  /** 尺寸（统一大小） */
  size?: number;
  /** 宽度 */
  width?: number;
  /** 高度 */
  height?: number;
  /** 深度 */
  depth?: number;
  /** 3D位置坐标 */
  pos: Vector3;
  /** 是否可点击 */
  clickable: boolean;
  /** 轴中心点 */
  axis_center?: Vector3;
  /** 轴旋转 */
  axis_rot?: Vector3;

  /**
   * 构造函数
   * @param config - 轴面项配置对象
   */
  constructor(config?: AxisFaceItemConfig);
}

/**
 * 轴面集合类
 * 用于管理和组织多个轴面项
 */
export declare class AxisFaces {
}