/**
 * 护栏横梁生成模块
 * Module: Guard Sash Generator
 * Original ID: 144
 */

/**
 * 护栏横梁数据接口
 */
export interface GuardSashData {
  /** 移动X坐标偏移量 */
  movex: number;
  /** 关闭对象配置 */
  closeObject: {
    /** 横梁数组 */
    bars: BarData[];
  };
  /** 玻璃配置（单个或数组） */
  glass: GlassData | GlassData[];
}

/**
 * 横梁数据接口
 */
export interface BarData {
  /** 型材ID */
  profileId: string;
  /** 弧形高度 */
  arcHeight: number;
}

/**
 * 玻璃数据接口
 */
export interface GlassData {
  // 玻璃具体属性根据实际使用定义
  [key: string]: unknown;
}

/**
 * 生成配置接口
 */
export interface GenerationConfig {
  /** 型材配置集合 */
  profiles: {
    data: ProfileData[];
  };
  /** 型材交叉配置 */
  profileCrosss: unknown;
  /** 框架配置 */
  frame: {
    /** 系列ID */
    seriesId: number;
  };
  /** 固定组节点数组 */
  fixedGroup: unknown[];
}

/**
 * 型材数据接口
 */
export interface ProfileData {
  /** 型材类型 */
  profileType: string;
  /** Z轴正向偏移量 */
  poszm?: number;
}

/**
 * 生成结果接口
 */
export interface GenResult {
  /** 状态码：1成功，0失败 */
  code: number;
  /** 错误消息（可选） */
  message?: string;
}

/**
 * 场景接口（Babylon.js Scene类型）
 */
export interface Scene {
  // Babylon.js Scene的基本属性
  [key: string]: unknown;
}

/**
 * 变换节点接口（Babylon.js TransformNode类型）
 */
export interface TransformNode {
  /** 设置父节点 */
  setParent(parent: TransformNode | null): void;
  [key: string]: unknown;
}

/**
 * 导出模式枚举
 */
export enum ExportModeEnum {
  /** OBJ格式导出 */
  OBJ = 'OBJ',
  // 其他导出模式...
}

/**
 * 护栏横梁生成器类
 */
export default class GuardSashGenerator {
  /** 当前场景实例 */
  private static scene: Scene;

  /**
   * 初始化生成器
   * @param scene - Babylon.js场景对象
   */
  static Init(scene: Scene): void;

  /**
   * 异步生成护栏横梁
   * @param guardSashes - 护栏横梁数据数组
   * @param parentNode - 父级变换节点
   * @param config - 生成配置对象
   * @returns Promise，解析为生成结果
   * @throws 当guardSashes为空或生成过程出错时抛出错误
   */
  static AsyncGenGuardSash(
    guardSashes: GuardSashData[],
    parentNode: TransformNode,
    config: GenerationConfig
  ): Promise<GenResult>;
}