/**
 * 参数化屋顶模块类型定义
 * 提供参数化屋顶的数据结构、枚举和类定义
 */

import { EntityFlagEnum, Entity } from './Entity';
import { EN_PROPERTY_PANEL_ITEM_TYPE, IInputData, IPropertyPanelData, RoofSDK } from './RoofSDK';
import { Loader, Loop, Vector2, Vector3, Matrix4, MathAlg } from './Geometry';
import { NCustomizedParametricModel_IO, NCustomizedParametricModel } from './ParametricModel';
import { Logger } from './Logger';
import { RoofUtil } from './RoofUtil';
import { EntityField } from './Decorators';
import { SignalHook } from './SignalHook';
import { GraphicsCutter } from './GraphicsCutter';
import { NCPClipTaskManager } from './ClipTaskManager';
import { Layer } from './Layer';

// 重新导出依赖类型
export { EN_PROPERTY_PANEL_ITEM_TYPE, IInputData, IPropertyPanelData };

/**
 * 参数化屋顶生成类型枚举
 */
export enum ParametricRoofGeneratedTypeEnum {
  /** 自动生成 */
  AUTO = 0,
  /** 手动绘制 */
  DRAW = 1
}

/**
 * 屋顶参数接口
 */
export interface IRoofParameters {
  /** 唯一标识符 */
  uuid?: string;
  /** 房间轮廓环路 */
  roomLoop?: Loop;
  /** 房间高度（毫米） */
  roomHeight?: number;
  /** 关联墙体ID列表 */
  linkWallIds?: string[];
  /** 屋顶类型（如 "Pyramid" 金字塔屋顶） */
  roofType?: string;
  /** 属性树数据 */
  propertytree?: any;
  /** 模型数据 */
  modelData?: any;
}

/**
 * 屋顶初始化选项
 */
export interface IRoofInitOptions {
  /** 房间高度 */
  roomHeight?: number;
  /** 关联墙体ID */
  linkWallIds?: string[];
}

/**
 * 图形数据结构
 */
export interface IGraphicsData {
  /** 面数据映射表 */
  faces: Map<string, any>;
  /** 边数据映射表 */
  edges: Map<string, any>;
  /** 更新的面数据 */
  updatedFaces?: Map<string, any>;
  /** 更新的边数据 */
  updatedEdges?: Map<string, any>;
  /** 内容数据 */
  contents?: any;
  /** 已移除的组文档ID */
  removedGroupDocIds?: any;
}

/**
 * 屋顶面分类结果
 */
export interface IPartFaces {
  /** 顶面列表 */
  top: any[];
  /** 侧面列表 */
  side: any[];
  /** 底面列表 */
  bottom: any[];
}

/**
 * 屋顶面ID分类结果
 */
export interface IPartFaceIds {
  /** 顶面ID列表 */
  top: string[];
  /** 侧面ID列表 */
  side: string[];
  /** 底面ID列表 */
  bottom: string[];
}

/**
 * 参数化屋顶IO类
 * 负责参数化屋顶模型的序列化和反序列化
 */
export declare class NCustomizedParametricRoof_IO extends NCustomizedParametricModel_IO {
  /**
   * 将模型序列化为JSON数据
   * @param entity - 要序列化的实体对象
   * @param callback - 序列化过程回调函数
   * @param includeGeometry - 是否包含几何数据
   * @param options - 额外选项
   * @returns 序列化后的数据数组
   */
  dump(
    entity: NCustomizedParametricRoof,
    callback?: (result: any[], entity: NCustomizedParametricRoof) => void,
    includeGeometry?: boolean,
    options?: Record<string, any>
  ): any[];

  /**
   * 从JSON数据加载模型
   * @param entity - 目标实体对象
   * @param data - 序列化的数据
   * @param options - 加载选项
   */
  load(
    entity: NCustomizedParametricRoof,
    data: any,
    options?: Record<string, any>
  ): void;
}

/**
 * 参数化屋顶模型类
 * 提供参数化屋顶的完整功能实现
 */
export declare class NCustomizedParametricRoof extends NCustomizedParametricModel {
  /** 生成类型（私有字段） */
  private __generatedType: ParametricRoofGeneratedTypeEnum;
  
  /** 屋顶参数配置 */
  parameters: IRoofParameters;
  
  /** 裁剪脏标记（私有） */
  private _dirtyClip: boolean;
  
  /** 信号钩子（私有） */
  private _signalHook: SignalHook;
  
  /** 裁剪任务（私有） */
  private _clipTask?: any;

  /**
   * 构造函数
   * @param id - 实体ID
   * @param document - 关联文档对象
   */
  constructor(id?: string, document?: any);

  /**
   * 销毁实例，释放资源
   */
  destroy(): void;

  /**
   * 通过元数据初始化屋顶
   * @param metadata - 元数据对象
   * @param parent - 父级实体
   * @param shouldConstruct - 是否构建几何体
   * @param preserveId - 是否保留ID
   * @param options - 初始化选项
   */
  initByMeta(
    metadata: any,
    parent?: any,
    shouldConstruct?: boolean,
    preserveId?: boolean,
    options?: IRoofInitOptions
  ): void;

  /**
   * 生成属性面板数据
   * @param propertyMap - 属性映射表
   * @returns 属性面板数据
   */
  generatePropertyPanelDatas(propertyMap: Map<string, any>): IPropertyPanelData | undefined;

  /**
   * 获取模型数据
   * @param record - 属性记录对象
   * @returns 模型数据
   */
  getModelData(record: Record<string, any>): any;

  /**
   * 初始化屋顶
   * @param curves - 轮廓曲线数组
   * @param shouldConstruct - 是否构建几何体
   * @param options - 初始化选项
   */
  initRoof(
    curves?: any[],
    shouldConstruct?: boolean,
    options?: IRoofInitOptions
  ): void;

  /**
   * 判断是否启用裁剪（私有）
   * @returns 是否启用裁剪
   */
  private _enableClip(): boolean;

  /**
   * 对几何体执行裁剪（私有）
   * @param graphicsData - 图形数据
   * @returns 裁剪后的图形数据
   */
  private _clipGeom(graphicsData: IGraphicsData): IGraphicsData;

  /**
   * 标记几何体需要裁剪
   * @param emitSignal - 是否发射信号
   */
  dirtyClipGeometry(emitSignal?: boolean): void;

  /**
   * 获取未裁剪的图形数据
   * @param forceRefresh - 是否强制刷新
   * @returns 图形数据
   */
  getUnClippedGraphicsData(forceRefresh?: boolean): IGraphicsData;

  /**
   * 获取图形数据（同步）
   * @param forceRefresh - 是否强制刷新
   * @returns 图形数据
   */
  getGraphicsData(forceRefresh?: boolean): IGraphicsData;

  /**
   * 异步获取图形数据
   * @returns Promise包装的图形数据
   */
  getGraphicsDataAsync(): Promise<IGraphicsData>;

  /**
   * 过滤用于填充的面
   * @param graphicsData - 原始图形数据
   * @returns 过滤后的图形数据
   */
  filterFacesForFill(graphicsData: IGraphicsData): IGraphicsData;

  /**
   * 监听开口变化（私有）
   */
  private _listenToOpeningChanges(): void;

  /**
   * 判断是否为底面
   * @param face - 面对象
   * @returns 是否为底面
   */
  isBottomFace(face: any): boolean;

  /**
   * 获取所有底面
   * @returns 底面数组
   */
  getBottomFaces(): any[];

  /**
   * 获取分类后的面
   * @returns 分类面对象
   */
  getPartFaces(): IPartFaces;

  /**
   * 获取分类后的面ID
   * @returns 分类面ID对象
   */
  getPartFaceIds(): IPartFaceIds;

  /**
   * 设置参数到屋顶
   * @param modelData - 模型数据
   */
  setParamsToRoof(modelData: any): void;

  /**
   * 刷新面材质
   * @param faceId - 面ID（可选）
   * @param options - 刷新选项
   */
  refreshFaceMaterial(faceId?: string, options?: Record<string, any>): void;

  /**
   * 获取厚度
   * @param faceTag - 面标签
   * @returns 厚度值（毫米）
   */
  getThickness(faceTag?: string): number | undefined;

  /**
   * 更新开口（私有）
   */
  private _updateOpenings(): void;

  /**
   * 更新方向
   * @param curves - 曲线数组
   * @param directionIndex - 方向索引
   */
  updateDirection(curves: any[], directionIndex?: number): void;

  /**
   * 初始化屋顶文档
   * @param loop - 轮廓环路
   * @param shouldConstruct - 是否构建几何体
   * @param shouldRefreshMaterial - 是否刷新材质
   */
  initRoofDocument(
    loop: Loop,
    shouldConstruct?: boolean,
    shouldRefreshMaterial?: boolean
  ): void;

  /**
   * 标记为脏状态（私有）
   */
  private _dirty(): void;

  /**
   * 获取IO实例
   * @returns IO对象
   */
  getIO(): NCustomizedParametricRoof_IO;

  /**
   * 获取图形选项
   * @param option - 基础选项
   * @param includeEdges - 是否包含边
   * @param includeOpenings - 是否包含开口
   * @returns 图形选项对象
   */
  getGraphicsOption(
    option?: any,
    includeEdges?: boolean,
    includeOpenings?: boolean
  ): any;

  /**
   * 获取面投影平面
   * @param meshKey - 网格键
   * @param faceData - 面数据（可选）
   * @returns THREE.Plane对象（带xRay属性）
   */
  getFaceProjectionPlane(meshKey: string, faceData?: any): THREE.Plane & { xRay?: THREE.Vector3 } | undefined;

  /**
   * 获取世界坐标系下的轮廓环路
   * @returns 环路对象
   */
  getLoopInWorld(): Loop | undefined;

  /**
   * 获取所有开口
   */
  get openings(): any[];

  /**
   * 获取所有参数化开口
   */
  get parametricOpenings(): any[];

  /**
   * 获取局部到世界坐标系的变换矩阵
   * @returns 4x4矩阵
   */
  getNCPLocalToWorldMatrix(): Matrix4;

  /**
   * 判断是否为金字塔屋顶
   * @returns 是否为金字塔屋顶
   */
  isPyramidRoof(): boolean;

  /**
   * 获取补丁面的网格键
   * @param meshKey - 原始网格键
   * @returns 补丁面网格键数组
   */
  getPatchedFaceMeshKey(meshKey: string): string[];

  /**
   * 生成类型装饰器字段
   */
  @EntityField()
  generatedType: ParametricRoofGeneratedTypeEnum;
}