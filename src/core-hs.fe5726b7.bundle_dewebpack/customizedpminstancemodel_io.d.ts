/**
 * CustomizedPMInstanceModel 模块
 * 用于处理自定义参数化模型实例的数据模型和IO操作
 */

import * as THREE from 'three';
import type { Entity, Entity_IO } from './Entity';
import type { CustomizedPMModel } from './CustomizedPMModel';
import type { Floor, Ceiling, Room, Layer } from './SceneModels';

/**
 * 3D位置坐标接口
 */
interface Position3D {
  x: number;
  y: number;
  z: number;
}

/**
 * 序列化数据接口
 */
interface SerializedInstanceData {
  instanceId: string;
  originPos: Position3D;
  x: number;
  y: number;
  z: number;
  xRotation?: number;
  yRotation?: number;
  zRotation?: number;
  xScale?: number;
  yScale?: number;
  zScale?: number;
  xLength: number;
  yLength: number;
  zLength: number;
  contentType?: HSCatalog.ContentType;
  contentTypeStr?: string;
}

/**
 * 投影数据接口
 */
interface ProjectionData {
  unioned: Array<Array<Position3D>>;
}

/**
 * 边界盒接口
 */
interface BoundingBox {
  min: DiySdk.math.Vector3;
  max: DiySdk.math.Vector3;
}

/**
 * 元数据接口
 */
interface InstanceMetadata {
  contentType: HSCatalog.ContentType;
}

/**
 * CustomizedPMInstanceModel 的 IO 处理类
 * 负责自定义参数化模型实例的序列化和反序列化操作
 */
export declare class CustomizedPMInstanceModel_IO extends Entity_IO {
  /**
   * 将模型实例序列化为数据对象
   * @param entity - 要序列化的实体对象
   * @param callback - 序列化后的回调函数
   * @param includeMetadata - 是否包含元数据
   * @param options - 附加选项
   * @returns 序列化后的数据数组
   */
  dump(
    entity: CustomizedPMInstanceModel,
    callback?: (data: any[], entity: CustomizedPMInstanceModel) => void,
    includeMetadata?: boolean,
    options?: Record<string, any>
  ): any[];

  /**
   * 从序列化数据加载到模型实例
   * @param entity - 目标实体对象
   * @param data - 序列化数据
   * @param context - 加载上下文
   */
  load(
    entity: CustomizedPMInstanceModel,
    data: SerializedInstanceData,
    context: { duringRestore?: boolean }
  ): void;

  /**
   * 获取 IO 处理类的单例
   */
  static instance(): CustomizedPMInstanceModel_IO;
}

/**
 * 自定义参数化模型实例类
 * 表示场景中的一个自定义参数化模型实例，包含位置、旋转、缩放等属性
 */
export declare class CustomizedPMInstanceModel extends Entity {
  /**
   * 实例的轮廓线（2D投影）
   */
  outline: THREE.Vector2[];

  /**
   * 顶部投影是否需要更新
   */
  private _topProjectionNeedUpdate: boolean;

  /**
   * 底部投影是否需要更新
   */
  private _bottomProjectionNeedUpdate: boolean;

  /**
   * 缓存的顶部投影数据
   */
  private _topProjection?: ProjectionData;

  /**
   * 缓存的底部投影数据
   */
  private _bottomProjection?: ProjectionData;

  /**
   * 缓存的光带底部投影数据
   */
  private _lightBandBottomProjection?: ProjectionData;

  // ==================== 位置属性 ====================

  /**
   * X轴坐标
   */
  x: number;

  /**
   * Y轴坐标
   */
  y: number;

  /**
   * Z轴坐标（高度）
   */
  z: number;

  // ==================== 旋转属性 ====================

  /**
   * 绕X轴旋转角度（度）
   */
  XRotation: number;

  /**
   * 绕Y轴旋转角度（度）
   */
  YRotation: number;

  /**
   * 绕Z轴旋转角度（度）
   */
  ZRotation: number;

  /**
   * 旋转角度（ZRotation的别名）
   */
  rotation: number;

  // ==================== 缩放属性 ====================

  /**
   * 是否可缩放
   */
  isScalable: boolean;

  /**
   * X轴缩放比例
   */
  XScale: number;

  /**
   * Y轴缩放比例
   */
  YScale: number;

  /**
   * Z轴缩放比例
   */
  ZScale: number;

  // ==================== 尺寸属性 ====================

  /**
   * X轴原始长度
   */
  XLength: number;

  /**
   * Y轴原始长度
   */
  YLength: number;

  /**
   * Z轴原始长度
   */
  ZLength: number;

  /**
   * X轴实际尺寸（长度 × 缩放）
   */
  readonly XSize: number;

  /**
   * Y轴实际尺寸（长度 × 缩放）
   */
  readonly YSize: number;

  /**
   * Z轴实际尺寸（长度 × 缩放）
   */
  readonly ZSize: number;

  // ==================== 其他属性 ====================

  /**
   * 实例ID
   */
  instanceId: string;

  /**
   * 原点位置
   */
  originPos: THREE.Vector3;

  /**
   * 内容类型
   */
  contentType: HSCatalog.ContentType;

  /**
   * 元数据
   */
  readonly metadata: InstanceMetadata;

  /**
   * 建模文档ID
   */
  readonly modelingDocId: string | undefined;

  /**
   * 创建者
   */
  readonly creator: string | undefined;

  /**
   * 构造函数
   * @param doc - 文档对象
   */
  constructor(doc: any);

  /**
   * 检查DIY文档是否已打开
   * @returns 是否已打开
   */
  isDiyDocOpened(): boolean;

  /**
   * 清除所有投影缓存
   */
  clearProjections(): void;

  /**
   * 使用序列化数据初始化实例
   * @param data - 序列化数据
   */
  initByData(data: SerializedInstanceData): void;

  /**
   * 使用序列化数据更新实例
   * @param data - 序列化数据
   */
  updateByData(data: SerializedInstanceData): void;

  /**
   * 获取IO处理器
   * @returns IO处理器实例
   */
  getIO(): CustomizedPMInstanceModel_IO;

  /**
   * 字段变更回调
   * @param fieldName - 字段名
   * @param oldValue - 旧值
   * @param newValue - 新值
   */
  onFieldChanged(fieldName: string, oldValue: any, newValue: any): void;

  /**
   * 获取默认材质数据
   * @returns 材质数据
   */
  getDefaultMaterialData(): any;

  /**
   * 调整实例尺寸
   * @param width - 宽度
   * @param height - 高度
   * @param depth - 深度
   */
  resize(width: number, height: number, depth: number): void;

  /**
   * 获取变换矩阵（包含位移、旋转、缩放）
   * @returns 4x4变换矩阵
   */
  getTransformMatrix(): THREE.Matrix4;

  /**
   * 刷新内部边界
   */
  refreshBoundInternal(): void;

  /**
   * 获取光带底部投影
   * @returns 投影数据
   */
  getLightBandBottomProjection(): ProjectionData | undefined;

  /**
   * 获取B-rep（边界表示）数据
   * @param tolerance - 容差值
   * @returns B-rep数据
   */
  getBreps(tolerance?: number): any;

  /**
   * 获取带铺装的B-rep数据
   * @returns B-rep数据
   */
  getBrepsWithPave(): any;

  /**
   * 获取顶部投影
   * @returns 投影数据
   */
  getTopProjection(): ProjectionData | undefined;

  /**
   * 获取底部投影
   * @returns 投影数据
   */
  getBottomProjection(): ProjectionData | undefined;

  /**
   * 获取与指定面共面的路径
   * @param face - 面对象（Floor或Ceiling）
   * @returns 路径数组
   */
  getPathsCoplanarWithFace(face: Floor | Ceiling): any[];

  /**
   * 检查内容是否在指定房间内
   * @param room - 房间对象
   * @returns 是否在房间内
   */
  isContentInRoom(room: Room): boolean;

  /**
   * 获取宿主对象（所在的房间）
   * @returns 房间对象
   */
  getHost(): Room | undefined;

  /**
   * 获取所有宿主房间
   * @returns 房间数组
   */
  getHostRoom(): Room[];

  /**
   * 获取所在图层
   * @returns 图层数组
   */
  getHostLayer(): Layer[];

  /**
   * 检查实例是否在指定图层内
   * @param layer - 图层对象
   * @returns 是否在图层内
   */
  isInstanceInLayer(layer: Layer): boolean;

  /**
   * 检查是否可编辑
   * @returns 是否可编辑
   */
  canEdit(): boolean;

  /**
   * 获取用于宿主判定的变换矩阵和边界盒
   * @returns 变换矩阵和边界盒数据
   */
  private _getMatrixAndBoxForHost(): 
    | { contextMatrix: DiySdk.math.Matrix4; thisBoxes: BoundingBox[] }
    | false;

  /**
   * 计算用于宿主判定的2D轮廓
   * @param matrix - 变换矩阵
   * @returns 2D点数组
   */
  private _calcProfile2dForHost(matrix: DiySdk.math.Matrix4): 
    DiySdk.math.Vector2[] | false;

  /**
   * 获取顶部投影平面
   * @returns Three.js平面对象
   */
  private _getTopProjectionPlane(): THREE.Plane;

  /**
   * 获取底部投影平面
   * @returns Three.js平面对象
   */
  private _getBottomProjectionPlane(): THREE.Plane;

  /**
   * 创建新元数据（内部方法）
   */
  private _createNewMetadata(): void;
}