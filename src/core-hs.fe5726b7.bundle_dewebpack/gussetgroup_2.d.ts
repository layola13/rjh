/**
 * GussetGroup 模块
 * 管理装饰面（Gusset）的分组和表面处理
 */

import { Entity } from './Entity';
import { GussetSurface } from './GussetSurface';
import { MixPaintDecorator } from './MixPaintDecorator';

/**
 * 装饰面表面参数接口
 */
interface GussetSurfaceParams {
  /** 面实体 */
  faceEntity: HSCore.Model.Face | HSCore.Model.Entity;
  /** 面ID（可选） */
  faceId?: number;
}

/**
 * 实体添加/移除事件数据接口
 */
interface EntityEventData {
  entity: HSCore.Model.Entity;
  parent?: HSCore.Model.CustomizedPMInstanceModel;
}

/**
 * 信号事件接口
 */
interface SignalEvent {
  data?: EntityEventData;
}

/**
 * 装饰面分组类
 * 负责管理和协调多个装饰面表面的生命周期
 */
export class GussetGroup extends Entity {
  private _signalHook: HSCore.Util.SignalHook;

  /**
   * 构造函数
   * @param doc - 文档实例
   */
  constructor(doc: HSCore.Doc.Document);

  /**
   * 销毁实例，清理所有资源
   */
  destroy(): void;

  /**
   * 是否需要序列化
   * @returns 始终返回 false
   */
  needDump(): boolean;

  /**
   * 是否可以进行事务操作
   * @returns 始终返回 false
   */
  canTransact(): boolean;

  /**
   * 子实体变脏时的回调
   * @param child - 子实体
   * @param options - 脏标记选项
   */
  onChildDirty(child: Entity, options?: any): void;

  /**
   * 监听图层的实体添加事件
   * @param layer - 图层实例
   */
  listenLayer(layer: HSCore.Model.Layer): void;

  /**
   * 监听参数化模型的实体添加/移除事件
   * @param pmModel - 参数化模型实例
   */
  listenPMModel(pmModel: HSCore.Model.CustomizedPMModel): void;

  /**
   * 监听面实体的移除事件
   * @param faceEntity - 面实体
   * @private
   */
  private _listenFaceEntity(faceEntity: HSCore.Model.Entity): void;

  /**
   * 取消监听面实体
   * @param faceEntity - 面实体
   * @private
   */
  private _unlistenFaceEntity(faceEntity: HSCore.Model.Entity): void;

  /**
   * 面实体添加时的回调
   * @param event - 信号事件
   * @private
   */
  private _onFaceEntityAdded(event: SignalEvent): void;

  /**
   * 面实体移除时的回调
   * @param event - 信号事件
   * @private
   */
  private _onFaceEntityRemoved(event: SignalEvent): void;

  /**
   * 添加装饰面表面
   * @param faceEntity - 面实体
   * @param faceId - 面ID（可选）
   * @returns 创建的装饰面表面实例
   */
  addSurface(faceEntity: HSCore.Model.Entity, faceId?: number): GussetSurface;

  /**
   * 移除装饰面表面
   * @param faceEntity - 面实体
   * @param faceId - 面ID（可选）
   * @returns 被移除的装饰面表面实例，如果不存在则返回 undefined
   */
  removeSurface(faceEntity: HSCore.Model.Entity, faceId?: number): GussetSurface | undefined;

  /**
   * 查找装饰面表面
   * @param faceEntity - 面实体
   * @param faceId - 面ID（可选）
   * @returns 找到的装饰面表面实例，如果不存在则返回 undefined
   */
  findSurface(faceEntity: HSCore.Model.Entity, faceId?: number): GussetSurface | undefined;

  /**
   * 标记装饰面表面为脏（需要更新）
   * @param mixpaint - 混合涂料对象
   * @param options - 脏标记选项
   */
  dirtySurface(mixpaint: HSCore.Model.MixPaint, options?: any): void;

  /**
   * 获取装饰面表面参数列表
   * @param doc - 文档实例
   * @param mixpaint - 混合涂料对象
   * @returns 表面参数数组
   * @static
   */
  static getGussetSurfaceParams(
    doc: HSCore.Doc.Document,
    mixpaint: HSCore.Model.MixPaint
  ): GussetSurfaceParams[];

  /**
   * 获取或创建装饰面分组实例
   * @param entity - 实体对象（可以是面、墙体、楼板等）
   * @returns 装饰面分组实例，如果无法获取则返回 undefined
   * @static
   */
  static getGussetGroup(entity: HSCore.Model.Entity): GussetGroup | undefined;

  /**
   * 移除装饰面表面
   * @param mixpaint - 混合涂料对象
   * @static
   */
  static removeGussetSurface(mixpaint: HSCore.Model.MixPaint): void;

  /**
   * 标记装饰面表面为脏（静态方法）
   * @param mixpaint - 混合涂料对象
   * @param options - 脏标记选项
   * @static
   */
  static dirtyGussetSurface(mixpaint: HSCore.Model.MixPaint | undefined, options?: any): void;
}