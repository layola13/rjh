/**
 * 相机配置常量模块
 * 包含Spark图片编辑器的核心配置项和相机参数约束
 */

/**
 * Spark图片编辑器的根容器DOM ID
 */
export declare const rootDivId: string;

/**
 * 工具栏新功能红点标识符
 */
export declare const TOOL_BAR_NEW_RED_ICON: string;

/**
 * 用户行为追踪标识
 */
export declare const userTrackId: string;

/**
 * 房间类型关系数据URL（海外版）
 */
export declare const roomTypeRelationFPUrl: string;

/**
 * 房间类型关系数据URL（国内版）
 */
export declare const roomTypeRelationUrl: string;

/**
 * Spark图片调整组件的额外样式类名
 */
export declare const SPARK_PIC_RESIZE_WIDGET_EXTRA: string;

/**
 * Spark图片调整组件的基础样式类名
 */
export declare const SPARK_PIC_RESIZE_WIDGET_CLASS_NAME: string;

/**
 * 房间信息检查标识符
 */
export declare const CHECK_ROOMS_INFO: string;

/**
 * 相机参数配置接口
 * 定义3D场景相机的各项约束参数
 */
export interface CameraConfig {
  /**
   * 最小仰角（度）
   * @default 0
   */
  MIN_ELEVATION: number;

  /**
   * 最大视场角（度）
   * @default 120
   */
  MAX_FOV: number;

  /**
   * 最小视场角（度）
   * @default 10
   */
  MIN_FOV: number;

  /**
   * 最大俯仰角（度）
   * @default 90
   */
  MAX_ANGLE: number;

  /**
   * 最小俯仰角（度）
   * @default -90
   */
  MIN_ANGLE: number;

  /**
   * 最大裁剪距离
   * @default 500
   */
  MAX_CLIP_VALUE: number;

  /**
   * 最小裁剪距离
   * @default 1
   */
  MIN_CLIP_VALUE: number;

  /**
   * 最大水平旋转角度（度）
   * @default 359
   */
  MAX_HORZ_ANGLE: number;

  /**
   * 最小水平旋转角度（度）
   * @default 0
   */
  MIN_HORZ_ANGLE: number;
}

/**
 * 相机配置常量对象
 * 包含相机控制的所有边界值约束
 */
export declare const CAMERA: Readonly<CameraConfig>;