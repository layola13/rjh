/**
 * 开口装饰器模块
 * 用于处理门、窗、墙洞等开口实体的序列化、反序列化和属性管理
 */

import type { Entity } from './Entity';
import type { Face } from './Face';
import type { Window } from './Window';
import type { Pocket } from './Pocket';
import type { Material } from './Material';
import type { MixPave } from './MixPave';
import type { ContentType } from '../types/ContentType';

/**
 * 三维缩放比例
 */
export interface Scale3D {
  x: number;
  y: number;
  z: number;
}

/**
 * 门槛石配置
 */
export interface DoorStoneConfig {
  /** 是否启用门槛石 */
  enable: boolean;
  /** 材质资源ID */
  materialSeekId?: string;
  /** 混合铺贴配置 */
  mixPave?: ReturnType<MixPave['dump']>;
}

/**
 * 门套/窗套配置
 */
export interface PocketConfig {
  /** 资源ID */
  seekId: string;
  /** 材质资源ID */
  materialSeekId?: string;
  /** 材质旋转角度 */
  materialRotataion?: number;
  /** 安装侧面 */
  side: number;
  /** 厚度 */
  thickness: number;
  /** 外侧厚度 */
  outerThickness: number;
  /** 高度 */
  height: number;
  /** 外侧高度 */
  outerHeight: number;
}

/**
 * 窗台配置
 */
export interface WindowSillConfig {
  /** 材质资源ID */
  materialSeekId?: string;
  /** 延伸值 */
  extendValue: number;
  /** 第二延伸值 */
  secondExtendValue: number;
  /** 安装侧面 */
  side: number;
}

/**
 * 开口实体序列化数据
 */
export interface OpeningDumpData {
  /** 资源ID */
  seekId: string;
  /** 三维缩放比例 */
  scale: Scale3D;
  /** 是否开启状态 */
  isOpened: boolean;
  /** 开合方向 */
  swing: number;
  /** 是否默认对齐 */
  isDefaultAlign: boolean;
  /** 缩进值 */
  indent: number;
  /** 开口类型常量 */
  openingType: unknown;
  /** 门槛石配置（可选） */
  doorStone?: DoorStoneConfig;
  /** 门套/窗套配置（可选） */
  pocket?: PocketConfig;
  /** 窗台配置（可选，仅窗户） */
  windowSill?: WindowSillConfig;
}

/**
 * 开口装饰器类
 * 负责开口实体（门/窗/墙洞）的数据导出、导入和属性管理
 */
export declare class OpeningDecorator {
  /** 关联的开口实体 */
  private readonly _entity: Entity;

  /**
   * 构造函数
   * @param entity - 需要装饰的开口实体
   */
  constructor(entity: Entity);

  /**
   * 导出实体数据为可序列化对象
   * @returns 包含所有开口属性的数据对象
   */
  dump(): OpeningDumpData;

  /**
   * 从元数据和面创建开口实体
   * @param metadata - 内容类型元数据
   * @param face - 目标面对象
   * @returns 创建的开口实体，创建失败返回 undefined
   */
  static create(metadata: ContentType, face: Face): Entity | undefined;

  /**
   * 加载其他属性（不包括材质）
   * @param data - 序列化的开口数据
   * @param skipScale - 是否跳过缩放和开合方向加载，默认 false
   */
  loadOther(data: OpeningDumpData, skipScale?: boolean): void;

  /**
   * 加载门槛石配置
   * @param doorStone - 门槛石配置数据
   */
  loadDoorStone(doorStone?: DoorStoneConfig): void;

  /**
   * 添加门套/窗套
   * @param pocketConfig - 门套/窗套配置数据
   */
  addPocket(pocketConfig: PocketConfig): void;

  /**
   * 更改门套/窗套材质
   * @param materialSeekId - 新材质的资源ID
   */
  changePocketMaterial(materialSeekId: string): void;

  /**
   * 获取门套/窗套的默认材质元数据
   * @returns 材质元数据对象，无默认材质返回 null
   */
  getPocketMaterialMeta(): {
    tileSize_x: number;
    tileSize_y: number;
    textureUrl: string;
  } | null;

  /**
   * 从序列化数据中提取所有资源ID
   * @param data - 序列化的开口数据
   * @returns 所有相关资源ID的数组
   */
  static getAllSeekIds(data: OpeningDumpData): string[];
}