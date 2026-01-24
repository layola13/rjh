/**
 * 挺料(Mullion)生成扩展模块
 * 用于处理门窗系统中的挺料(竖向分隔构件)的3D模型生成
 */

import { Scene, TransformNode, Mesh, Vector2, Vector3, Quaternion, Material } from '@babylonjs/core';

/**
 * 挺料配置选项
 */
interface MullionOptions {
  /** 相对位置偏移 (0=左/下, 0.5=中心, 1=右/上) */
  relative?: Vector2;
  /** 用于布尔运算的子网格 */
  subMesh?: Mesh;
  /** 网格名称 */
  name?: string;
  /** 起始外侧点 */
  startOutPt?: Vector2;
  /** 起始内侧点 */
  startInPt?: Vector2;
  /** 结束外侧点 */
  endOutPt?: Vector2;
  /** 结束内侧点 */
  endInPt?: Vector2;
}

/**
 * 挺料数据结构
 */
interface MullionData {
  /** 型材ID */
  profileId: string;
  /** 内部基准点 */
  internalBasePt: Vector2;
  /** 内部左下点 */
  internalLeftDownPt: Vector2;
  /** 内部左上点 */
  internalLeftTopPt: Vector2;
  /** 起始点 */
  startPt?: Vector2;
  /** 结束点 */
  endPt?: Vector2;
  /** 弧形高度 */
  arcHeight?: number;
  /** 起始角度 */
  startAngle?: number;
  /** 弧形中心点 */
  arcCenter?: Vector2;
  /** 弧形半径 */
  arcRadius?: number;
  /** 优化点集合 */
  opts: Array<{ x: number; y: number }>;
}

/**
 * 型材数据
 */
interface ProfileData {
  /** 型材类型标识 */
  profileType: string;
  /** Z轴位置偏移(米) */
  poszm?: number;
  /** 宽度(米) */
  widthm: number;
}

/**
 * 配置数据结构
 */
interface ConfigData {
  /** 型材列表 */
  profiles: {
    data: ProfileData[];
  };
  /** 型材截面数据 */
  profileCrosss: unknown;
  /** 固定组件集合 */
  fixedGroup: Mesh[];
  /** 3D框架信息 */
  frame_3D_info?: unknown;
  /** 系列ID */
  serieid: string;
}

/**
 * DXF解析后的数据结构
 */
interface DXFAnalysisData {
  /** 接头(Joint)轮廓 */
  jts: PolygonData[];
  /** 扣框轮廓 */
  kks: PolygonData[];
  /** 铝型材内侧轮廓 */
  lxc_ins: PolygonData[];
  /** 铝型材内侧轮廓1(带孔) */
  lxc_in1as: PolygonData[];
  lxc_in1hs: unknown[];
  /** 铝型材内侧轮廓2(带孔) */
  lxc_in2as: PolygonData[];
  lxc_in2hs: unknown[];
  /** 铝型材轮廓 */
  lxcs: PolygonData[];
  /** 铝型材轮廓(带孔) */
  lxc_as: PolygonData[];
  lxc_hs: unknown[];
  /** 铝型材外侧轮廓 */
  lxc_outs: PolygonData[];
  /** 铝型材外侧轮廓1(带孔) */
  lxc_out1as: PolygonData[];
  lxc_out1hs: unknown[];
  /** 铝型材外侧轮廓2(带孔) */
  lxc_out2as: PolygonData[];
  lxc_out2hs: unknown[];
  /** X轴最大值(毫米) */
  maxX_mm: number;
  /** X轴最小值(毫米) */
  minX_mm: number;
  /** Y轴最大值(毫米) */
  maxY_mm: number;
  /** Y轴最小值(毫米) */
  minY_mm: number;
}

/**
 * 多边形数据(支持圆弧)
 */
interface PolygonData {
  /** 顶点坐标 */
  pts: Array<{ x: number; y: number }>;
  /** 凸度值(控制圆弧,0为直线) */
  bulges: number[];
}

/**
 * 生成结果
 */
interface GenResult {
  /** 状态码 (1=成功, 0=失败) */
  code: number;
  /** 错误消息 */
  message?: string;
}

/**
 * 型材类型枚举
 */
declare enum ProfileTypesEnum {
  /** 铝型材外侧 */
  LXCOUT = 'LXCOUT',
  /** 铝型材内侧 */
  LXCIN = 'LXCIN',
  /** 铝型材 */
  LXC = 'LXC',
  /** 接头 */
  JT = 'JT',
  /** 扣框 */
  KK = 'KK'
}

/**
 * 挺料生成扩展类
 * 负责生成门窗系统中的竖向分隔构件(挺料)的3D模型
 */
export default class MullionExtension {
  /** Babylon.js场景实例 */
  private static scene: Scene;

  /**
   * 初始化场景
   * @param scene - Babylon.js场景对象
   */
  static Init(scene: Scene): void;

  /**
   * 校验型材配置是否有效
   * @param mullions - 挺料数据数组
   * @param config - 配置数据
   * @returns 校验是否通过
   */
  static CheckProfile(
    mullions: MullionData[] | null,
    config: ConfigData | null
  ): boolean;

  /**
   * 异步生成挺料3D模型
   * @param mullions - 挺料数据数组
   * @param parentNode - 父级变换节点
   * @param config - 配置数据
   * @param reserved - 保留参数(默认0)
   * @param zOffset - Z轴偏移量
   * @returns Promise包装的生成结果
   */
  static AsyncGenMullions(
    mullions: MullionData[],
    parentNode: TransformNode,
    config: ConfigData,
    reserved?: number,
    zOffset?: number
  ): Promise<GenResult>;

  /**
   * 生成普通挺料模型
   * @param dxfData - DXF解析数据
   * @param startPoint - 起始点(已缩放10倍)
   * @param endPoint - 结束点(已缩放10倍)
   * @param options - 配置选项
   * @returns 生成的变换节点
   */
  static GeneralModelMullionM(
    dxfData: DXFAnalysisData,
    startPoint: Vector3,
    endPoint: Vector3,
    options: MullionOptions
  ): TransformNode | null;

  /**
   * 加载DXF数据并生成挺料网格(方法1)
   * @param dxfData - DXF解析数据
   * @param position - 位置向量
   * @param rotation - 旋转四元数
   * @param length - 挺料长度
   * @param options - 配置选项
   * @returns 生成的变换节点
   */
  static LoadDXF_Mullion(
    dxfData: DXFAnalysisData,
    position: Vector3,
    rotation: Quaternion,
    length: number,
    options: MullionOptions
  ): TransformNode;

  /**
   * 生成普通挺料模型(中国标准)
   * @param dxfData - DXF解析数据
   * @param startPoint - 起始点(已缩放10倍)
   * @param endPoint - 结束点(已缩放10倍)
   * @param options - 配置选项
   * @returns 生成的变换节点
   */
  static GeneralModelMullionM1(
    dxfData: DXFAnalysisData,
    startPoint: Vector3,
    endPoint: Vector3,
    options: MullionOptions
  ): TransformNode | null;

  /**
   * 加载DXF数据并生成挺料网格(方法2 - 支持圆弧)
   * @param dxfData - DXF解析数据
   * @param position - 位置向量
   * @param rotation - 旋转四元数
   * @param length - 挺料长度
   * @param options - 配置选项
   * @returns 生成的变换节点
   */
  static LoadDXF_Mullion1(
    dxfData: DXFAnalysisData,
    position: Vector3,
    rotation: Quaternion,
    length: number,
    options: MullionOptions
  ): TransformNode;

  /**
   * 生成交叉截面网格
   * @param points - 截面轮廓点集
   * @param depth - 挤出深度(米)
   * @param material - 材质
   * @returns 生成的网格
   */
  static GeneralIntersectionM(
    points: Vector3[],
    depth: number,
    material: Material
  ): Mesh;

  /**
   * 生成Y轴方向交叉截面网格
   * @param points - 截面轮廓点集
   * @param depth - 挤出深度(米)
   * @param material - 材质
   * @param offset - 偏移量(米,可选)
   * @returns 生成的网格
   */
  static GeneralIntersectionYM(
    points: Vector3[],
    depth: number,
    material: Material,
    offset?: number
  ): Mesh;
}