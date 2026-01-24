/**
 * 差异比对工具类型定义
 * 用于比较两个户型图之间的差异，包括墙体、开口、结构等元素的变化
 */

import { FloorPlan, Layer, Entity, Room, Content } from './types/floorplan';
import { FloorplanInfo } from './FloorplanInfo';
import { Line2d, Line3d, Vector2 } from './geometry';

/**
 * 3D点坐标
 */
export interface Point3D {
  x: number;
  y: number;
  z: number;
}

/**
 * 2D点坐标
 */
export interface Point2D {
  x: number;
  y: number;
}

/**
 * 墙体轮廓数据
 */
export interface WallOutline {
  // 墙体轮廓的几何信息
  geometry: unknown;
  // 是否为新增或删除的部分
  isModified: boolean;
}

/**
 * 墙体数据
 */
export interface WallData {
  // 墙体的几何数据
  geometry: unknown;
  // 墙体属性
  properties: Record<string, unknown>;
}

/**
 * 开口信息（门窗等）
 */
export interface OpeningInfo {
  // 开口ID
  id: string;
  // 开口类型
  type: string;
  // 开口位置和尺寸
  geometry: unknown;
  // 是否为修改项
  isModified: boolean;
}

/**
 * 结构信息（柱、梁等）
 */
export interface StructureInfo {
  // 结构ID
  id: string;
  // 结构类型
  type: string;
  // 是否为新增或删除
  isRemoveAdd: boolean;
  // 几何信息
  geometry: unknown;
}

/**
 * 隐蔽工程路径类型
 */
export enum DiffCWNotTubeType {
  /** 燃气表 */
  GassMeter = 'GassMeter',
  /** 水表 */
  WaterMeter = 'WaterMeter',
  /** 洗手盆墙排 */
  BasinWallRow = 'BasinWallRow',
  /** 马桶墙排 */
  ToiletWallRow = 'ToiletWallRow',
  /** 地漏 */
  FloorDrain = 'FloorDrain',
  /** 马桶地排孔 */
  ToiletFloorHole = 'ToiletFloorHole',
  /** 台盆排水 */
  PlatformDrainage = 'PlatformDrainage'
}

/**
 * 隐蔽工程路径信息
 */
export interface CWRoute {
  /** 路径类型 */
  type: string;
  /** 路径唯一标识 */
  id?: string;
  /** 起点实体ID */
  srcId: string;
  /** 终点实体ID */
  destId: string;
  /** 路径几何（Line3d数组） */
  path: Line3d[];
  /** 路径长度 */
  length: number;
}

/**
 * 隐蔽工程差异项
 */
export interface CWDiffItem {
  /** 目标实体ID */
  destId: string;
  /** 路径信息 */
  route: CWRoute;
}

/**
 * 隐蔽工程差异数据
 */
export interface CWDiffData {
  /** 差异项列表 */
  diffItems: CWDiffItem[];
  /** 差异模型ID（创建后赋值） */
  id?: string;
}

/**
 * 隐蔽工程内容差异（管路类型）
 */
interface CWContentDiffTube {
  /** 类型（冷水/热水/强电/弱电） */
  type: string;
  /** 源实体 */
  src: Entity;
  /** 目标实体 */
  dest: Entity;
}

/**
 * 隐蔽工程内容差异（非管路类型）
 */
interface CWContentDiffNotTube {
  /** 类型（燃气表/水表/地漏等） */
  type: DiffCWNotTubeType;
  /** 源实体 */
  src: Entity;
  /** 目标实体 */
  dest: Entity;
}

/**
 * 隐蔽工程差异内容集合
 */
interface CWDiffContents {
  /** 管路类型差异 */
  diffTube: CWContentDiffTube[];
  /** 非管路类型差异 */
  diffNotTube: CWContentDiffNotTube[];
}

/**
 * 户型图差异比对工具
 * 
 * 用于比较原始户型图和当前户型图之间的差异，包括：
 * - 墙体的新增、删除和修改
 * - 门窗等开口的变化
 * - 结构元素（柱、梁等）的变化
 * - 隐蔽工程（水电管线等）的路径差异
 * 
 * @example
 *