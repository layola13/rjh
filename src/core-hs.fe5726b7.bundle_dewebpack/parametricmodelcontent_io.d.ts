/**
 * Module: ParametricModelContent_IO
 * 参数化模型内容及其IO处理模块
 */

import { Content, Content_IO } from './Content';
import { Entity } from './Entity';
import { Matrix4 } from './Matrix4';
import { Manager } from './Manager';
import { Material } from './Material';
import { NCustomizedFeatureModelUtil } from './NCustomizedFeatureModelUtil';
import { Signal } from './Signal';
import { EntityEventType } from './EntityEventType';
import * as THREE from 'three';

/**
 * 材质配置信息
 */
interface MaterialConfig {
  /** 材质查找ID */
  seekId?: string;
}

/**
 * 三维向量
 */
interface Vector3D {
  x: number;
  y: number;
  z: number;
}

/**
 * 内容信息配置
 */
interface ContentInfo {
  /** 实体ID */
  eId: string;
  /** 唯一ID */
  uId?: string;
  /** 源ID */
  srcId?: string;
  /** 是否为源模型 */
  isSourceModel?: boolean;
  /** 位置 */
  position: Vector3D;
  /** 旋转角度 */
  rotation: Vector3D;
  /** XYZ轴长度 */
  xyzLength: Vector3D;
  /** 是否可见 */
  visible?: boolean;
  /** 材质列表 */
  materials?: MaterialConfig[];
}

/**
 * 序列化选项
 */
interface SerializeOptions {
  [key: string]: unknown;
}

/**
 * 实体事件数据
 */
interface EntityEvent {
  /** 事件类型 */
  type: EntityEventType;
}

/**
 * 参数化模型内容的IO处理类
 * 负责参数化模型的序列化和反序列化
 */
export declare class ParametricModelContent_IO extends Content_IO {
  /**
   * 将参数化模型内容序列化为JSON对象
   * @param entity - 要序列化的实体
   * @param target - 目标对象（未使用）
   * @param includeChildren - 是否包含子对象
   * @param options - 序列化选项
   * @returns 序列化后的数据数组
   */
  dump(
    entity: ParametricModelContent,
    target?: unknown,
    includeChildren?: boolean,
    options?: SerializeOptions
  ): unknown[];

  /**
   * 从JSON对象反序列化为参数化模型内容
   * @param entity - 目标实体
   * @param data - 序列化的数据
   * @param options - 反序列化选项
   */
  load(
    entity: ParametricModelContent,
    data: ContentInfo,
    options?: SerializeOptions
  ): void;

  /**
   * 获取IO处理类的单例实例
   */
  static instance(): ParametricModelContent_IO;
}

/**
 * 参数化模型内容类
 * 表示可参数化调整的三维模型对象
 */
export declare class ParametricModelContent extends Content {
  /** 实体ID */
  eId: string;
  /** 唯一ID */
  uId: string;
  /** 源ID */
  srcId?: string;
  /** 是否为源模型 */
  isSourceModel?: boolean;
  /** X轴位置 */
  x: number;
  /** Y轴位置 */
  y: number;
  /** Z轴位置 */
  z: number;
  /** X轴旋转角度（度） */
  XRotation: number;
  /** Y轴旋转角度（度） */
  YRotation: number;
  /** Z轴旋转角度（度） */
  ZRotation: number;
  /** X轴长度 */
  XLength: number;
  /** Y轴长度 */
  YLength: number;
  /** Z轴长度 */
  ZLength: number;
  /** X轴缩放比例 */
  XScale: number;
  /** Y轴缩放比例 */
  YScale: number;
  /** Z轴缩放比例 */
  ZScale: number;
  /** 是否可见 */
  visible: boolean;
  /** 材质映射表 */
  materialsMap: Map<number, Material>;
  /** 内容配置信息 */
  contentInfo: ContentInfo;
  /** 分割平面数组 */
  splitPlanes: unknown[];
  /** 裁剪脏数据信号 */
  signalClipDirty: Signal<EntityEvent>;

  /**
   * 构造函数
   * @param name - 实体名称
   * @param parent - 父实体
   */
  constructor(name?: string, parent?: Entity);

  /**
   * 销毁实体，释放资源
   */
  destroy(): void;

  /**
   * 标记裁剪几何体为脏数据
   * @param propagate - 是否向上传播
   */
  dirtyClipGeometry(propagate?: boolean): void;

  /**
   * 初始化内容配置
   * @param info - 内容配置信息
   */
  initContent(info: ContentInfo): void;

  /**
   * 判断内容是否在指定房间内
   * @param room - 房间对象
   * @returns 是否在房间内
   */
  isContentInRoom(room: unknown): boolean;

  /**
   * 初始化材质
   * @param materials - 材质配置数组
   */
  initMaterial(materials?: MaterialConfig[]): void;

  /**
   * 从另一个实体复制属性
   * @param source - 源实体
   */
  copyFrom(source: ParametricModelContent): void;

  /**
   * 更新位置
   * @param position - 新位置
   */
  updatePosition(position: Vector3D): void;

  /**
   * 转换旋转角度
   * @param info - 内容配置信息
   * @private
   */
  private _transformRotation(info: ContentInfo): void;

  /**
   * 获取IO处理器实例
   * @returns IO处理器
   */
  getIO(): ParametricModelContent_IO;

  /**
   * 设置指定索引的材质
   * @param index - 材质索引
   * @param material - 材质对象
   */
  setMaterial(index: number, material: Material): void;

  /**
   * 标记为脏数据
   * @param event - 事件数据
   * @param propagate - 是否向上传播
   */
  dirty(event: EntityEvent, propagate?: boolean): void;
}