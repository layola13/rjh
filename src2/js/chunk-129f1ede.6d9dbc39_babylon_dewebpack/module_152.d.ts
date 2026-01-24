import { Vector3, Vector2, Mesh, TransformNode, Quaternion, Angle, Vector4, Material, Scene } from '@babylonjs/core';

/**
 * DXF 分析结果数据结构
 */
export interface DXFAnalysisResult {
  /** 接头路径集合 */
  jts: Vector2[][];
  /** 轨道路径集合 */
  gds: Vector2[][];
  /** 框架路径集合 */
  kks: Vector2[][];
  /** 连续体路径集合 */
  lxcs: Vector2[][];
  /** 连续体A型路径集合 */
  lxc_as: Vector2[][];
  /** 连续体孔洞路径集合 */
  lxc_hs: Vector2[][];
  /** 连续体内侧路径集合 */
  lxc_ins: Vector2[][];
  /** 连续体内侧1A型路径集合 */
  lxc_in1as: Vector2[][];
  /** 连续体内侧1孔洞路径集合 */
  lxc_in1hs: Vector2[][];
  /** 连续体内侧2A型路径集合 */
  lxc_in2as: Vector2[][];
  /** 连续体内侧2孔洞路径集合 */
  lxc_in2hs: Vector2[][];
  /** 连续体外侧路径集合 */
  lxc_outs: Vector2[][];
  /** 连续体外侧1A型路径集合 */
  lxc_out1as: Vector2[][];
  /** 连续体外侧1孔洞路径集合 */
  lxc_out1hs: Vector2[][];
  /** 连续体外侧2A型路径集合 */
  lxc_out2as: Vector2[][];
  /** 连续体外侧2孔洞路径集合 */
  lxc_out2hs: Vector2[][];
  /** X轴最大值（毫米） */
  maxX_mm: number;
  /** X轴最小值（毫米） */
  minX_mm: number;
  /** Y轴最大值（毫米） */
  maxY_mm: number;
  /** Y轴最小值（毫米） */
  minY_mm: number;
}

/**
 * 轮廓类型枚举
 */
export enum ProfileTypesEnum {
  /** 连续体外侧 */
  LXCOUT = 'LXCOUT',
  /** 连续体内侧 */
  LXCIN = 'LXCIN',
  /** 连续体 */
  LXC = 'LXC',
  /** 接头 */
  JT = 'JT',
  /** 框架 */
  KK = 'KK',
  /** 轨道 */
  GD = 'GD',
  /** 布尔运算 */
  Boolean = 'Boolean'
}

/**
 * 模型生成选项
 */
export interface ModelGenerationOptions {
  /** 模型名称 */
  name?: string;
  /** 起始角度（度数，默认90） */
  angle0?: number;
  /** 终止角度（度数，默认90） */
  angle1?: number;
  /** 相对位置偏移（0, 0.5, 1） */
  relative?: Vector2;
  /** 是否包含孔洞标记 */
  holeFlag?: boolean;
}

/**
 * 异步生成轮廓参数
 */
export interface AsyncGenProfileParams {
  /** DXF文件URL */
  dxf_url: string;
  /** 父节点 */
  parent?: TransformNode;
}

/**
 * 3D模型扩展工具类
 * 用于从DXF文件生成三维轮廓模型
 */
export default class ModelExtension {
  /**
   * 当前场景实例
   */
  private static scene: Scene;

  /**
   * 初始化模型扩展
   * @param scene - Babylon.js场景实例
   */
  static Init(scene: Scene): void;

  /**
   * 异步生成轮廓模型
   * @param params - 生成参数，包含DXF文件URL和可选的父节点
   * @returns Promise，解析为生成的TransformNode或undefined
   */
  static AsyncGenProfile(params: AsyncGenProfileParams): Promise<TransformNode | undefined>;

  /**
   * 生成通用3D模型
   * @param dxfData - DXF分析结果数据
   * @param startPoint - 起始点坐标
   * @param endPoint - 终止点坐标
   * @param options - 模型生成选项
   * @returns 生成的TransformNode或undefined（失败时）
   */
  static GeneralModel(
    dxfData: DXFAnalysisResult,
    startPoint: Vector3,
    endPoint: Vector3,
    options: ModelGenerationOptions
  ): TransformNode | undefined;

  /**
   * 从DXF数据加载并构建3D模型
   * @param dxfData - DXF分析结果数据
   * @param length - 拉伸长度
   * @param options - 模型生成选项
   * @returns 生成的TransformNode或undefined（失败时）
   */
  static LoadDXF(
    dxfData: DXFAnalysisResult,
    length: number,
    options: ModelGenerationOptions
  ): TransformNode | undefined;
}

/**
 * DXF扩展工具类
 */
export declare class DXFExtension {
  /**
   * 读取并分析DXF文件
   * @param url - DXF文件URL
   * @returns Promise，解析为DXF分析结果
   */
  static ReadAnalysisDXF(url: string): Promise<DXFAnalysisResult>;
}

/**
 * 四元数工具类
 */
export declare class QuaternionHelper {
  /**
   * 从拉伸方向向量获取四元数
   * @param axisVectors - 三个轴向量数组 [x轴, y轴, z轴]
   * @returns 对应的四元数
   */
  static GetQuaternionFromExtrude(axisVectors: Vector3[]): Quaternion;
}

/**
 * 轮廓类型工具类
 */
export declare class ProfileTypeHelper {
  /**
   * 根据枚举获取轮廓类型对应的材质
   * @param profileType - 轮廓类型枚举
   * @returns 对应的Babylon.js材质
   */
  static GetProfileType(profileType: ProfileTypesEnum): Material;
}

/**
 * 路径工具类
 */
export declare class PathHelper {
  /**
   * 设置路径是否闭合
   * @param path - 二维点数组
   * @param closed - 是否闭合
   */
  static SetClosed(path: Vector2[], closed: boolean): void;

  /**
   * 标准化路径顺时针状态
   * @param path - 二维点数组
   * @param clockwise - 是否顺时针
   */
  static NormalCWStatus(path: Vector2[], clockwise: boolean): void;
}

/**
 * 布尔运算工具类
 */
export declare class BooleanOperations {
  /**
   * 执行布尔减法操作
   * @param mainMesh - 主网格
   * @param subtractMesh - 要减去的网格
   * @param scene - 场景实例
   * @param material - 结果材质
   * @returns 布尔运算后的网格
   */
  static BooleanOpSubtract(
    mainMesh: Mesh,
    subtractMesh: Mesh | undefined,
    scene: Scene,
    material: Material
  ): Mesh;
}

/**
 * GUID生成工具类
 */
export declare class Guid {
  /**
   * 生成新的GUID字符串
   * @returns GUID字符串
   */
  static newGuid(): string;
}

/**
 * 调试配置
 */
export declare class DebugConfig {
  /**
   * 是否显示CSG调试信息（0=不显示，1=显示）
   */
  static DebugShowCSG: number;
}