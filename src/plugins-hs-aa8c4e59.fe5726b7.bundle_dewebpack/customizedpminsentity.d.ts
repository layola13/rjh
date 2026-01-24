/**
 * 定制化参数化模型实例实体类型声明
 * @module CustomizedPMInsEntity
 */

import { AcceptEntity } from './AcceptEntity';
import { Parameter, DataType } from './Parameter';
import { CustomizedPMInsFaceEntity } from './CustomizedPMInsFaceEntity';
import { CustomizedPMInsEdgeEntity } from './CustomizedPMInsEdgeEntity';
import { CustomizedPMInsMoldingEntity } from './CustomizedPMInsMoldingEntity';
import { Matrix4 } from './Matrix4';
import { HSCatalog, HSCore } from './HSCore';
import * as THREE from 'three';

/**
 * BOM数据源项类型
 */
interface SourceDataItem {
  /** 数据类型：face(面) | edge(边) | lightband(灯带) | lightslot(灯槽) | molding(线条) */
  type: 'face' | 'edge' | 'lightband' | 'lightslot' | 'molding';
  /** 数据路径标识 */
  path: string;
  /** 面的有效面积（仅face类型） */
  validArea?: number;
  /** 面平面信息（仅face类型） */
  facePlane?: {
    /** 法向量 */
    n: THREE.Vector3;
    /** 原点 */
    o: THREE.Vector3;
  };
  /** 重叠信息（与房间结构的交集） */
  overlap?: RoomPlaneInfo;
}

/**
 * 房间平面信息
 */
interface RoomPlaneInfo {
  /** 平面对象 */
  plane: THREE.Plane;
  /** 宿主实体（墙体、地板、天花板等） */
  host: HSCore.Model.Wall | HSCore.Model.Floor | HSCore.Model.Ceiling;
}

/**
 * 内容实体接口
 */
interface ContentEntity {
  /** 内容类型 */
  contentType: {
    isTypeOf(type: string): boolean;
  };
  /** 建模文档ID */
  modelingDocId: string;
  /** 实例ID */
  instanceId: string;
  /** 实体ID */
  id: string;
  /**
   * 获取变换矩阵
   */
  getTransformMatrix(): {
    toArray(): number[];
  };
  /**
   * 获取所在房间列表
   */
  getHostRoom(): Array<{
    id: string;
    roomInfos: RoomInfo[];
  }>;
  /**
   * 检查实例是否在指定图层中
   */
  isInstanceInLayer(layer: Layer): boolean;
}

/**
 * 房间信息
 */
interface RoomInfo {
  /** 房间结构（墙体等） */
  structures: HSCore.Model.Wall[];
  /** 房间面 */
  faces: Face[];
}

/**
 * 面实体
 */
interface Face {
  /**
   * 检查是否有指定父级
   */
  hasParent(parent: unknown): boolean;
  /**
   * 获取外轮廓多边形
   */
  getOuterLoopPolygon(): Array<{ x: number; y: number; z: number }> | undefined;
}

/**
 * 图层对象
 */
interface Layer {
  /** 图层ID */
  id: string;
  /** 图层高度 */
  height: number;
}

/**
 * 定制化参数化模型实例实体
 * 用于表示墙面、天花板、平台等定制化实例的几何和数据结构
 */
export declare class CustomizedPMInsEntity extends AcceptEntity {
  /**
   * BOM数据源列表
   * @private
   */
  private _sourceDatas: SourceDataItem[];

  constructor();

  /**
   * 构建实体数据
   * @param content - 内容实体对象
   */
  buildEntityData(content: ContentEntity): void;

  /**
   * 构建子实体
   * 根据数据源类型创建面、边、线条等子实体
   */
  buildChildren(): void;

  /**
   * 获取实例数据
   * @param content - 内容实体对象
   * @returns 包含房间ID、宿主面、表面积、图层ID等参数的实例数据
   */
  getInstanceData(content: ContentEntity): InstanceData;

  /**
   * 更新数据源
   * 从DiySDK获取BOM数据并应用变换矩阵
   * @param content - 内容实体对象
   */
  updateSourceDatas(content: ContentEntity): void;

  /**
   * 更新房间重叠信息
   * 计算面数据与房间平面的交集
   * @param room - 房间对象
   */
  updateRoomOverlapInfo(room: { id: string; roomInfos: RoomInfo[] }): void;

  /**
   * 获取宿主面
   * 根据内容类型优先选择对应的宿主实体（墙体、天花板、地板）
   * @param content - 内容实体对象
   * @returns 宿主面实体，若无重叠则返回undefined
   */
  getHostFace(
    content: ContentEntity
  ): HSCore.Model.Wall | HSCore.Model.Floor | HSCore.Model.Ceiling | undefined;

  /**
   * 判断平面是否重叠
   * @param roomPlaneInfo - 房间平面信息
   * @param normal - 检测平面的法向量
   * @param point - 检测平面上的点
   * @returns 是否重叠（法向量平行且距离在阈值内）
   */
  isPlaneOverlap(
    roomPlaneInfo: RoomPlaneInfo,
    normal: THREE.Vector3,
    point: THREE.Vector3
  ): boolean;

  /**
   * 获取面平面
   * 从面的外轮廓多边形计算三维平面
   * @param face - 面实体
   * @param zOffset - Z轴偏移量
   * @returns THREE.js平面对象，若多边形无效则返回undefined
   */
  getFacePlane(face: Face, zOffset: number): THREE.Plane | undefined;

  /**
   * 获取房间平面信息列表
   * 提取房间的墙体、地板、天花板平面信息
   * @param room - 房间对象
   * @returns 房间所有结构的平面信息数组
   */
  getRoomPlaneInfos(room: {
    id: string;
    roomInfos: RoomInfo[];
  }): RoomPlaneInfo[];
}

/**
 * 实例数据接口
 */
interface InstanceData {
  /**
   * 添加参数
   */
  addParameter(param: Parameter): void;
}