/**
 * RoomEntity - 房间实体类
 * 继承自 AcceptEntity，用于表示建筑平面图中的房间实体
 */

import { AcceptEntity } from './AcceptEntity';
import { InstanceData, Parameter, DataType } from './InstanceData';
import { ModelClassName } from './ModelClassName';

/**
 * 房间边界信息接口
 */
interface RoomBound {
  /** 获取左上角坐标 */
  getTopLeft(): Point2D;
  /** 获取右下角坐标 */
  getBottomRight(): Point2D;
}

/**
 * 二维坐标点
 */
interface Point2D {
  x: number;
  y: number;
}

/**
 * 路径段接口
 */
interface PathSegment {
  /** 获取路径段长度 */
  getLength(): number;
}

/**
 * 二维路径数据
 */
interface RawPath2D {
  /** 外部路径段数组 */
  outer: PathSegment[];
}

/**
 * 房间主数据接口
 */
interface RoomMaster {
  /** 主数据ID */
  id: string;
}

/**
 * 图层接口
 */
interface Layer {
  /** 图层ID */
  id: string;
}

/**
 * 房间数据接口
 */
interface RoomData {
  /** 房间唯一标识 */
  id: string;
  /** 二维路径数据 */
  rawPath2d: RawPath2D;
  /** 房间边界 */
  bound: RoomBound;
  /** 父图层 */
  parent: Layer;
  /** 房间类型（如：bedroom, kitchen等） */
  roomType?: string;
  /** 自定义房间类型显示名称 */
  roomTypeDisplayName?: string;
  /** 获取房间主数据 */
  getMaster(): RoomMaster;
}

/**
 * 实体类型配置
 */
interface EntityTypeConfig {
  /** 类类型 */
  classType: ModelClassName;
}

/**
 * RoomEntity - 房间实体类
 * 用于在3D场景中表示和管理房间对象
 */
export declare class RoomEntity extends AcceptEntity {
  /** 实体前缀标识 */
  protected _prefix: string;

  /**
   * 构造函数
   * @param args - 构造参数
   */
  constructor(...args: any[]);

  /**
   * 构建子实体（当前为空实现）
   */
  buildChildren(): void;

  /**
   * 构建实体数据
   * @param roomData - 房间原始数据
   */
  buildEntityData(roomData: RoomData): void;

  /**
   * 从房间数据中提取并构建实例数据
   * @param roomData - 房间原始数据
   * @returns 实例数据对象，包含以下参数：
   *   - center: 房间中心点坐标 [x, y, z]
   *   - size: 房间尺寸 [width, height, depth]
   *   - area: 房间面积
   *   - parentId: 父实体ID
   *   - layerId: 所属图层ID
   *   - type: 房间类型
   *   - displayName: 显示名称
   *   - displayNameCustom: 自定义显示名称
   *   - roomId: 房间ID
   *   - spaceGirth: 房间周长
   */
  getInstanceData(roomData: RoomData): InstanceData;

  /**
   * 计算房间周长
   * @param roomData - 房间数据
   * @returns 房间外边界的总周长
   */
  private _getRoomGirth(roomData: RoomData): number;
}