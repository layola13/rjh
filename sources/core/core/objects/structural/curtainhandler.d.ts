/**
 * 窗帘处理器模块
 * 负责处理3D窗帘模型的变换、边界计算和组件布局
 */

import { CurtainComponentEnum } from './CurtainComponentEnum';
import * as THREE from 'three';

/**
 * 3D向量坐标
 */
interface Vector3Data {
  x: number;
  y: number;
  z: number;
}

/**
 * 位置和缩放信息
 */
interface PositionScaleData {
  position?: Vector3Data;
  scale?: Vector3Data;
}

/**
 * 边界框数据
 */
interface BoundingBoxData {
  /** 最大顶点坐标 */
  max_vertex: Vector3Data;
  /** 最小顶点坐标 */
  min_vertex: Vector3Data;
}

/**
 * 对象边界信息（包含对象名称）
 */
interface ObjectBoundingData extends BoundingBoxData {
  obj_name: string;
}

/**
 * 模型扩展信息
 */
interface ModelExtension {
  objInfo: {
    bounding: ObjectBoundingData[];
  };
}

/**
 * 模型元数据
 */
interface ModelMetadata {
  extension?: ModelExtension;
  components: string[];
}

/**
 * 用户自定义的窗帘数据模型
 */
interface CurtainDataModel {
  curtain_rail?: PositionScaleData[];
  curtain_rail_tip_L?: PositionScaleData[];
  curtain_rail_tip_R?: PositionScaleData[];
  curtain_screen_glass?: PositionScaleData[];
  curtain_side?: PositionScaleData[];
  curtain_loop?: PositionScaleData[];
}

/**
 * 变换信息（位置、旋转、缩放）
 */
interface TransformInfo {
  /** 位置向量 */
  pos: THREE.Vector3;
  /** 四元数旋转 */
  qut: THREE.Quaternion;
  /** 缩放向量 */
  scl: THREE.Vector3;
}

/**
 * 完整的变换信息（包含模型、局部、全局三个层级）
 */
interface FinalTransformInfo {
  /** 模型变换 */
  modelTrans: TransformInfo;
  /** 局部变换 */
  localTrans: TransformInfo;
  /** 全局变换 */
  globalTrans: TransformInfo;
}

/**
 * 窗帘组件变换数据
 */
interface CurtainTransformData extends FinalTransformInfo {
  /** 组件索引 */
  index: number;
  /** 边界区域面积（可选） */
  boundArea?: number;
  /** 偏移量（可选，用于导轨类组件） */
  offset?: [number, number, number];
}

/**
 * 缩放参数
 */
interface ScaleParams {
  /** 水平缩放比例 */
  horizonalScale: number;
  /** 垂直缩放比例 */
  verticalScale: number;
}

/**
 * 3D内容对象接口（简化的THREE.js对象）
 */
interface Content3D {
  metadata: ModelMetadata;
  XScale: number;
  ZScale: number;
  ZLength: number;
  userDefined?: {
    raas?: {
      dataModel?: CurtainDataModel;
    };
  };
  /**
   * 检查指定组件是否启用
   * @param component - 组件枚举值
   */
  isComponentEnabled(component: CurtainComponentEnum): boolean;
}

/**
 * 窗帘处理器类
 * 负责计算窗帘模型各组件的变换矩阵、布局和边界信息
 */
export declare class CurtainHandler {
  /** 3D内容对象 */
  private content: Content3D;

  /**
   * 构造函数
   * @param content - 3D内容对象
   */
  constructor(content: Content3D);

  /**
   * 初始化边界数据
   * 从模型元数据中提取边界信息，转换单位（cm->m），并计算中心偏移
   * @param content - 3D内容对象
   * @returns 对象名称到边界框的映射，如果没有边界信息则返回undefined
   * @private
   */
  private _boundDataInitial(content: Content3D): Map<string, BoundingBoxData> | undefined;

  /**
   * 从用户自定义数据设置变换信息
   * 处理导轨、导轨端点、纱帘、侧帘、挂环等组件的变换
   * @param dataModel - 用户定义的窗帘数据模型
   * @param transformMap - 存储变换数据的Map
   * @private
   */
  private _setTransformFromUserDefine(
    dataModel: CurtainDataModel,
    transformMap: Map<string, CurtainTransformData>
  ): void;

  /**
   * 获取窗帘变换数据
   * 主入口方法，计算所有窗帘组件的变换信息
   * @returns 组件名称到变换数据的映射
   */
  getCurtainTransData(): Map<string, CurtainTransformData>;

  /**
   * 获取挂环变换信息数组
   * 根据导轨长度均匀分布挂环，支持奇数和偶数个挂环
   * @param boundingBox - 挂环的边界框
   * @param railLength - 导轨总长度
   * @param railCenterY - 导轨中心Y坐标
   * @param scaleParams - 缩放参数
   * @returns 挂环变换信息数组
   * @private
   */
  private _getLoopTrans(
    boundingBox: BoundingBoxData,
    railLength: number,
    railCenterY: number,
    scaleParams: ScaleParams
  ): FinalTransformInfo[];

  /**
   * 构造最终变换信息
   * 计算局部变换和全局变换矩阵，分解为位置、旋转、缩放
   * @param position - 局部位置
   * @param scale - 局部缩放
   * @returns 包含模型、局部、全局变换的完整信息
   * @private
   */
  private _constructFinalTransInfo(
    position: THREE.Vector3,
    scale: THREE.Vector3
  ): FinalTransformInfo;

  /**
   * 获取导轨端点变换信息
   * 计算左右端点的位置和缩放
   * @param tipBoundingBox - 端点的边界框
   * @param railBoundingBox - 导轨的边界框
   * @param scaleParams - 缩放参数
   * @param railCenterY - 导轨中心Y坐标
   * @param isLeft - 是否为左端点
   * @returns 端点的变换信息
   * @private
   */
  private _getRailTipTrans(
    tipBoundingBox: BoundingBoxData,
    railBoundingBox: BoundingBoxData,
    scaleParams: ScaleParams,
    railCenterY: number,
    isLeft: boolean
  ): FinalTransformInfo;

  /**
   * 获取导轨变换信息
   * @param scaleParams - 缩放参数
   * @param railCenterY - 导轨中心Y坐标
   * @returns 导轨的变换信息
   * @private
   */
  private _getRailTrans(
    scaleParams: ScaleParams,
    railCenterY: number
  ): FinalTransformInfo;

  /**
   * 获取镜像部件变换信息
   * 用于左右对称的组件（如侧帘、纱帘）
   * @param boundingBox - 部件的边界框
   * @param halfWidth - 半宽度
   * @param scaleParams - 缩放参数
   * @param isLeft - 是否为左侧部件
   * @returns 镜像部件的变换信息
   * @private
   */
  private _getMirrorPartTrans(
    boundingBox: BoundingBoxData,
    halfWidth: number,
    scaleParams: ScaleParams,
    isLeft: boolean
  ): FinalTransformInfo;
}