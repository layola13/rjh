/**
 * 关联管理器
 * 负责管理实体之间的关联关系，支持添加、删除、查询、更新关联
 */

import { Association } from './Association';
import { Entity } from './Entity';
import { Logger } from './Logger';

/**
 * 关联数据序列化格式
 */
interface AssociationData {
  /** 关联ID */
  id: string;
  /** 关联类型（短名称） */
  l?: string;
  /** 关联类型（完整类名） */
  Class?: string;
  /** 源实体ID */
  entity: string;
  /** 目标实体ID列表 */
  targets?: string[];
  [key: string]: unknown;
}

/**
 * 加载上下文数据结构
 */
interface LoadContext {
  /** 实体ID到实体对象的映射 */
  entities: Record<string, Entity>;
  [key: string]: unknown;
}

/**
 * 关联集合类型（按类型分组的目标实体）
 */
type AssociationCollection = Record<string, Entity[]>;

/**
 * 关联管理器类
 * 维护实体与目标对象之间的双向映射关系
 */
export declare class AssociationManager {
  /**
   * 实体ID -> 关联对象列表的映射
   * @private
   */
  private _associations: Map<string, Association[]>;

  /**
   * 目标对象ID -> 源实体的反向映射
   * @private
   */
  private _target2entity: Map<string, Entity>;

  /**
   * 构造函数
   * 初始化内部映射表
   */
  constructor();

  /**
   * 添加实体关联
   * @param entity - 源实体对象
   * @param target - 目标对象
   * @param associationType - 关联类型名称
   * @param associationId - 可选的关联ID
   */
  addAssociation(
    entity: Entity,
    target: Entity,
    associationType: string,
    associationId?: string
  ): void;

  /**
   * 内部方法：将关联对象添加到映射表
   * @param association - 关联对象实例
   * @private
   */
  private _addAssociation(association: Association): void;

  /**
   * 检查关联是否已存在
   * @param entity - 源实体
   * @param target - 目标对象
   * @returns 如果关联已存在返回true
   * @private
   */
  private _associationExists(entity: Entity, target: Entity): boolean;

  /**
   * 移除指定的关联
   * @param entityId - 源实体ID
   * @param target - 目标对象
   */
  removeAssociation(entityId: string, target: Entity): void;

  /**
   * 内部方法：从映射表中移除关联对象
   * @param association - 关联对象实例
   * @private
   */
  private _removeAssociation(association: Association): void;

  /**
   * 获取实体的所有关联
   * @param entityId - 实体ID
   * @returns 关联对象数组，如果不存在返回undefined
   */
  getAssociation(entityId: string): Association[] | undefined;

  /**
   * 根据目标对象获取源实体
   * @param target - 目标对象
   * @param recursive - 是否递归查找顶层实体（默认true）
   * @returns 源实体对象，如果未找到返回undefined
   */
  getEntityByTarget(target?: Entity, recursive?: boolean): Entity | undefined;

  /**
   * 根据目标对象ID获取源实体
   * @param targetId - 目标对象ID
   * @param recursive - 是否递归查找顶层实体（默认true）
   * @returns 源实体对象，如果未找到返回undefined
   */
  getEntityByTargetId(targetId: string, recursive?: boolean): Entity | undefined;

  /**
   * 获取实体关联的所有目标对象
   * @param entityId - 实体ID
   * @returns 目标对象数组
   */
  getAssociationEntities(entityId: string): Entity[];

  /**
   * @deprecated 使用 getAssociationEntities 代替
   * 获取实体关联的所有目标对象（拼写错误的旧方法）
   */
  getAssociationEntitis(entityId: string): Entity[];

  /**
   * 更新关联计算
   * @param entity - 实体或目标对象
   * @param recursive - 是否递归更新（默认true）
   * @param forceCompute - 是否强制重新计算（默认true）
   */
  updateAssociation(
    entity: Entity,
    recursive?: boolean,
    forceCompute?: boolean
  ): void;

  /**
   * 替换实体的所有关联
   * @param entity - 源实体
   * @param associations - 新的关联集合（按类型分组）
   */
  replaceAssociation(
    entity: Entity,
    associations?: AssociationCollection | null
  ): void;

  /**
   * 清空所有关联
   */
  clear(): void;

  /**
   * 导出所有关联数据
   * @returns 关联数据对象数组
   */
  dump(): AssociationData[];

  /**
   * 从数据创建关联对象
   * @param data - 关联数据
   * @param context - 加载上下文
   * @param crossDocument - 是否跨文档加载
   * @returns 关联对象实例
   * @private
   */
  private _createFromData(
    data: AssociationData,
    context: LoadContext,
    crossDocument: boolean
  ): Association | undefined;

  /**
   * 从数据加载关联
   * @param dataArray - 关联数据数组
   * @param context - 加载上下文
   * @param crossDocument - 是否跨文档加载（默认false）
   */
  load(
    dataArray: AssociationData[],
    context: LoadContext,
    crossDocument?: boolean
  ): void;

  /**
   * 遍历所有关联对象
   * @param callback - 回调函数
   * @param thisArg - 回调函数的this上下文
   */
  forEachAssociation(
    callback: (association: Association) => void,
    thisArg?: unknown
  ): void;

  /**
   * 保存关联数据到对象
   * @param target - 目标对象（可选）
   * @returns 关联ID到关联对象的映射
   */
  saveToData(target?: Record<string, Association>): Record<string, Association>;

  /**
   * 从数据恢复关联状态
   * @param data - 关联ID到关联对象的映射
   */
  restoreFromData(data: Record<string, Association>): void;
}