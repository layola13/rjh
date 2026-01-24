/**
 * B3Layer模块 - 建筑楼层图层管理
 * 
 * 该模块负责管理建筑设计中的楼层图层数据，包括房间、墙壁、开口、
 * 暗装工程等元素的数据转换和关系管理。
 * 
 * @module B3Layer
 * @original-id 250190
 */

import type { B3Entity } from './B3Entity';
import type { B3Room } from './B3Room';
import type { B3Wall } from './B3Wall';
import type { B3Opening } from './B3Opening';
import type { B3ConcealedWork } from './B3ConcealedWork';
import type { B3Region } from './B3Region';
import type { HSApp } from './HSApp';

/**
 * 实体参数值类型
 */
type EntityParameterValue = string | number | boolean | unknown;

/**
 * 实体实例接口
 */
interface EntityInstance {
  /** 实体唯一标识符 */
  id: string;
  
  /**
   * 获取实体ID
   */
  getId(): string;
  
  /**
   * 获取参数值
   * @param parameterName - 参数名称
   */
  getParameterValue(parameterName: string): EntityParameterValue;
  
  /**
   * 设置参数值
   * @param parameterName - 参数名称
   * @param value - 参数值
   */
  setParameterValue(parameterName: string, value: EntityParameterValue): void;
  
  /**
   * 获取子实体列表
   */
  getChildren(): EntityInstance[];
  
  /**
   * 设置子实体列表
   * @param children - 子实体数组
   */
  setChildren(children: EntityInstance[]): void;
}

/**
 * 转换后的BOM3实体数据
 */
interface Bom3EntityData {
  /** 实体实例 */
  instance: EntityInstance;
  [key: string]: unknown;
}

/**
 * 房间角点数据
 */
interface ExposedCorner {
  /** 所属房间ID */
  roomId: string;
  /** 角点坐标等其他属性 */
  [key: string]: unknown;
}

/**
 * 房间BOM3数据
 */
interface RoomBom3Data {
  /** 实体数据 */
  entity: Bom3EntityData;
  /** 关系数据 */
  relations?: {
    /** 暴露的角点列表 */
    exposedCorners: ExposedCorner[];
  };
  [key: string]: unknown;
}

/**
 * 内容项数据
 */
interface ContentItem {
  /** 内容实例 */
  instance: EntityInstance;
  [key: string]: unknown;
}

/**
 * 其他数据类型（从内容项转换而来）
 */
type OtherData = unknown[];

/**
 * 定制化PM模型实体
 */
interface CustomizedPMModelEntity extends EntityInstance {
  /** 模型特定的附加属性 */
  [key: string]: unknown;
}

/**
 * 完整的楼层BOM3数据结构
 */
interface LayerBom3Data {
  /** 楼层实体数据 */
  entity: Bom3EntityData;
  
  /** 楼板ID列表 */
  floorSlabIds?: string[];
  
  /** 天花板ID列表 */
  ceilingSlabIds?: string[];
  
  /** 墙体高度 */
  wallHeight?: number;
  
  /** 墙体厚度 */
  wallThickness?: number;
  
  /** 楼板厚度 */
  slabThickness?: number;
  
  /** 图层类型 */
  layerType?: string;
  
  /** 房间列表 */
  rooms: RoomBom3Data[];
  
  /** 墙壁列表 */
  walls: Bom3EntityData[];
  
  /** 墙体开口（门窗等）列表 */
  wallOpenings: Bom3EntityData[];
  
  /** 暗装工程数据 */
  concealedWork?: Bom3EntityData;
  
  /** 其他内容数据 */
  other: OtherData;
  
  /** 内部面积 */
  innerArea?: number;
  
  /** 设计面积 */
  designArea?: number;
  
  /** 定制化PM模型列表 */
  customizedPMModels?: unknown[];
}

/**
 * 楼层上下文接口
 */
interface LayerContext {
  /** 图层-房间映射 */
  layerRooms: Map<string, EntityInstance[]>;
  
  /** 图层-墙壁映射 */
  layerWalls: Map<string, EntityInstance[]>;
  
  /** 图层-开口映射 */
  layerOpenings: Map<string, EntityInstance[]>;
  
  /** 暗装工程映射 */
  concealWork: Map<string, EntityInstance[]>;
  
  /** 图层-内容映射 */
  layerContents: Map<string, ContentItem[]>;
  
  /** 图层-定制化PM模型映射 */
  layerCustomizedPMModels: Map<string, CustomizedPMModelEntity[]>;
}

/**
 * 楼层图层类
 * 
 * 负责将建筑实体数据转换为BOM3（Bill of Materials 3.0）格式，
 * 用于工程量计算、材料清单生成等业务场景。
 * 
 * @extends B3Entity
 * 
 * @example
 *