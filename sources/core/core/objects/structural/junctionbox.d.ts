/**
 * 接线盒(JunctionBox)模块类型定义
 * 
 * 该模块负责处理电气系统中的接线盒实体，包括位置计算、图形数据生成、
 * 以及与宿主面（天花板、地板、墙面）的空间关系处理。
 */

import { BaseObject } from './BaseObject';
import { Box3, Vector3, MathUtil } from './GeometryUtils';
import { TubeMeshCreator, JunctionBoxParam } from './MeshCreator';
import { Model, Util } from './CoreModel';
import { TransUtil } from './TransformUtils';

/**
 * 图形对象类型枚举
 */
declare namespace HSConstants {
  enum GraphicsObjectType {
    Mesh = 'Mesh'
  }
}

/**
 * 网格定义接口
 */
interface MeshDefinition {
  /** 网格唯一标识键 */
  meshKey: string;
  /** 顶点位置数组 */
  vertexPositions?: Float32Array;
  /** 其他网格属性 */
  [key: string]: unknown;
}

/**
 * 图形对象接口
 */
interface GraphicsObject {
  /** 关联的实体ID */
  entityId: string;
  /** 图形路径标识 */
  graphicsPath: string;
  /** 图形对象类型 */
  type: HSConstants.GraphicsObjectType;
  /** 包围盒数据(minX, minY, minZ, maxX, maxY, maxZ) */
  bounding: Float32Array;
  /** 材质信息 */
  material: MaterialData;
  /** 关联组件 */
  component: unknown;
  /** 父级查找ID */
  parentSeekId: string;
  /** 网格标识 */
  mesh: string;
  /** 查找ID */
  seekId: string;
  /** 是否启用实例化数组 */
  instancedArraysEnabled: boolean;
  /** 自定义属性 */
  customAttrs: Record<string, unknown>;
}

/**
 * 材质数据接口
 */
interface MaterialData {
  /** RGB颜色值(十进制) */
  color: number;
}

/**
 * 图形数据返回接口
 */
interface GraphicsData {
  /** 图形对象数组 */
  objects: GraphicsObject[];
  /** 网格定义数组 */
  meshDefs: MeshDefinition[];
}

/**
 * 子实体添加事件数据
 */
interface ChildAddedEventData {
  data: {
    /** 添加的实体对象 */
    entity?: Entity;
  };
}

/**
 * 实体基础接口
 */
interface Entity {
  /** 实体唯一ID */
  ID: string;
  /** 父级查找ID */
  parentSeekId: string;
  /** X坐标 */
  x: number;
  /** Y坐标 */
  y: number;
  /** Z坐标 */
  z: number;
  /** Z方向尺寸 */
  ZSize: number;
  /** 旋转角度(度) */
  rotation: number;
  
  /**
   * 获取实体组件
   * @param componentType 组件类型标识
   */
  getComponent(componentType: string): Component | undefined;
  
  /**
   * 获取唯一父级实体
   */
  getUniqueParent(): Entity | undefined;
}

/**
 * 组件基础接口
 */
interface Component {
  /** 组件内容数据 */
  content?: ContentData;
}

/**
 * 内容数据接口
 */
interface ContentData {
  x: number;
  y: number;
  z: number;
  rotation: number;
  ZSize: number;
  
  getUniqueParent(): Entity | undefined;
}

/**
 * 接线盒视图模型类
 * 
 * 负责处理接线盒的3D图形表示，包括：
 * - 位置矩阵计算与更新
 * - 图形网格数据生成
 * - 与宿主面(天花板/地板/墙面)的空间关系处理
 */
export declare class JunctionBox extends BaseObject {
  /** 局部变换矩阵 */
  private _matrixLocal: THREE.Matrix4;
  
  /** 关联的实体对象 */
  protected entity: Entity;
  
  /**
   * 子实体添加事件回调
   * @param event 事件数据，包含新添加的实体
   */
  onChildAdded(event: ChildAddedEventData): void;
  
  /**
   * 位置更新事件回调
   * 触发矩阵重新计算
   */
  onUpdatePosition(): void;
  
  /**
   * 通用更新事件回调
   * 触发矩阵重新计算
   */
  onUpdate(): void;
  
  /**
   * 同步生成图形数据
   * @param forceUpdate 是否强制更新(当前未使用)
   * @returns 包含网格对象和定义的图形数据
   */
  toGraphicsData(forceUpdate?: boolean): GraphicsData;
  
  /**
   * 异步生成图形数据
   * @param options 生成选项(当前未使用)
   * @returns Promise，解析为图形数据
   */
  toGraphicsDataAsync(options?: unknown): Promise<GraphicsData>;
  
  /**
   * 内部方法：生成图形数据
   * 
   * 创建接线盒的网格对象和材质定义
   * @returns 完整的图形数据结构
   */
  private _genGraphicData(): GraphicsData;
  
  /**
   * 计算网格包围盒
   * 
   * 将顶点坐标应用局部变换矩阵后，计算AABB包围盒
   * @param mesh 网格定义，包含顶点位置数组
   * @returns 包围盒数组 [minX, minY, minZ, maxX, maxY, maxZ]
   */
  private _getBounding(mesh: MeshDefinition): number[];
  
  /**
   * 更新局部变换矩阵
   * 
   * 根据接线盒所在的宿主面类型(天花板/地板/墙面)计算正确的位置和旋转：
   * - 天花板：向下偏移半个厚度
   * - 地板：向上偏移半个厚度  
   * - 墙面：应用旋转并调整Z轴位置
   */
  private _updateMatrix(): void;
  
  /**
   * 获取材质数据
   * @returns 材质定义，默认灰白色(0x6449FF)
   */
  private _getMaterial(): MaterialData;
  
  /**
   * 获取内容的全局位置
   * 
   * 将相对于父实体的局部坐标转换为全局坐标，
   * 考虑图层基础高度
   * @param content 内容数据对象
   * @returns 全局坐标向量
   */
  private _getGlobalPosition(content: ContentData): Vector3;
  
  /**
   * 计算内容到宿主面的正交距离向量
   * 
   * 根据宿主面类型计算从内容位置到面的垂直距离：
   * - 天花板/地板：计算Z轴距离
   * - 墙面：计算到墙面轮廓的投影距离
   * @param content 内容数据对象
   * @param hostFace 宿主面实体
   * @returns 正交距离向量
   */
  private _getContentOrthDisToHostFace(
    content: ContentData,
    hostFace: Entity
  ): Vector3;
  
  /**
   * 创建视图模型
   * @param entity 实体对象
   */
  protected createViewModel(entity: Entity): void;
}