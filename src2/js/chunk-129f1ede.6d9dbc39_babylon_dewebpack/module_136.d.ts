/**
 * 防盗网生成器模块
 * 负责异步生成3D场景中的防盗网几何体
 */

import { Scene, TransformNode, Vector2, Vector3 } from '@babylonjs/core';

/**
 * 防盗网配置信息接口
 */
export interface AntiTheftConfig {
  /** 型材配置数据 */
  profiles: ProfilesData;
  /** 型材截面数据 */
  profileCrosss: ProfileCross[];
  /** 是否使用3D框架信息 */
  frame_3D_info?: boolean;
  /** 固定组节点集合 */
  fixedGroup: TransformNode[];
}

/**
 * 型材数据接口
 */
export interface ProfilesData {
  /** 型材列表 */
  data: Profile[];
}

/**
 * 型材定义接口
 */
export interface Profile {
  /** 型材类型 */
  profileType: number;
  /** Z轴中间位置 */
  poszm: number;
}

/**
 * 型材截面接口
 */
export interface ProfileCross {
  // 截面相关属性
}

/**
 * 防盗网对象接口
 */
export interface AntiTheft {
  /** 闭合对象，包含杆件信息 */
  closeObject: {
    /** 杆件数组 */
    bars: Bar[];
  };
  /** 防护栏数组 */
  securityBoxArray?: SecurityBox[] | null;
}

/**
 * 杆件接口
 */
export interface Bar {
  // 杆件相关属性
}

/**
 * 防护栏接口
 */
export interface SecurityBox {
  /** 起始点坐标 */
  startPt: { x: number; y: number };
  /** 结束点坐标 */
  endPt: { x: number; y: number };
  /** 是否居中标识 (1表示居中) */
  isCenter?: number | null;
}

/**
 * 生成结果类
 */
export declare class GenResult {
  /**
   * @param code - 结果码 (1表示成功, 0表示失败)
   * @param message - 结果消息
   */
  constructor(code: number, message?: string);
}

/**
 * 型材类型枚举
 */
export declare enum CCTypeEnum {
  /** 防盗网竖框 */
  antitheftMullion = 'antitheftMullion'
}

/**
 * DXF扩展工具类
 */
export declare class DXFExtension {
  /**
   * 读取并解析DXF文件
   * @param path - DXF文件路径
   * @param flag - 解析标志
   * @returns DXF解析结果
   */
  static ReadAnalysisDXF(path: string, flag: boolean): Promise<unknown>;
}

/**
 * 多边形生成器工具类
 */
export declare class PolygonGenerator {
  /**
   * 异步生成多边形模型
   * @param bar - 杆件数据
   * @param profiles - 型材配置
   * @param crosses - 型材截面
   * @param parent - 父节点
   * @param name - 模型名称
   * @param config - 配置信息
   */
  static AsyncGenPolygon(
    bar: Bar,
    profiles: ProfilesData,
    crosses: ProfileCross[],
    parent: TransformNode,
    name: string,
    config: AntiTheftConfig
  ): Promise<void>;

  /**
   * 获取DXF文件路径
   * @param profile - 型材数据
   * @returns DXF文件路径
   */
  static GetDxfPath(profile: Profile): string;

  /**
   * 生成通用模型
   * @param dxfData - DXF解析数据
   * @param startPoint - 起始点
   * @param endPoint - 结束点
   * @param options - 模型选项
   * @returns 生成的网格节点
   */
  static GeneralModelM(
    dxfData: unknown,
    startPoint: Vector3,
    endPoint: Vector3,
    options: {
      name: string;
      angle0: number;
      angle1: number;
      relative: Vector2;
    }
  ): TransformNode;
}

/**
 * 3D框架生成器工具类
 */
export declare class Frame3DGenerator {
  /**
   * 异步生成3D杆件
   * @param bar - 杆件数据
   * @param profiles - 型材配置
   * @param crosses - 型材截面
   * @param parent - 父节点
   * @param config - 配置信息
   */
  static AsyncGenBar(
    bar: Bar,
    profiles: ProfilesData,
    crosses: ProfileCross[],
    parent: TransformNode,
    config: AntiTheftConfig
  ): Promise<void>;

  /**
   * 异步生成防护栏
   * @param securityBox - 防护栏数据
   * @param profiles - 型材配置
   * @param crosses - 型材截面
   * @param parent - 父节点
   * @param config - 配置信息
   */
  static AsyncGenSecurityBox(
    securityBox: SecurityBox,
    profiles: ProfilesData,
    crosses: ProfileCross[],
    parent: TransformNode,
    config: AntiTheftConfig
  ): Promise<void>;
}

/**
 * 方向工具类
 */
export declare class OrientationUtil {
  /**
   * 重新计算防护栏的方向边界框
   * @param antiTheft - 防盗网对象
   */
  static RecalOrientationSecurityBox(antiTheft: AntiTheft): void;
}

/**
 * 防盗网生成器类
 * 负责初始化场景并异步生成防盗网3D模型
 */
export default class AntiTheftGenerator {
  /** Babylon.js 场景实例 */
  private static scene: Scene;

  /**
   * 初始化生成器
   * @param scene - Babylon.js场景对象
   */
  static Init(scene: Scene): void;

  /**
   * 异步生成多个防盗网模型
   * @param antiThefts - 防盗网对象数组
   * @param parentNode - 父节点，所有生成的模型将挂载到此节点下
   * @param config - 防盗网配置信息
   * @returns Promise，成功时resolve GenResult(1)，失败时reject GenResult(0, errorMessage)
   * @throws 当 antiThefts 为 null 时抛出错误
   */
  static AsyncGenAntiThefts(
    antiThefts: AntiTheft[],
    parentNode: TransformNode,
    config: AntiTheftConfig
  ): Promise<GenResult>;
}