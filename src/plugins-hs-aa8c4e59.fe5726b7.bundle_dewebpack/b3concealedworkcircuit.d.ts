import { B3Entity } from './B3Entity';
import { B3ConcealedWorkTubeTree } from './B3ConcealedWorkTubeTree';
import { B3ConcealedWorkTube } from './B3ConcealedWorkTube';

/**
 * 暗装工程回路实体接口
 */
export interface IB3ConcealedWorkCircuitData {
  /** 实体对象 */
  entity: any;
  /** 显示名称 */
  displayName: string;
  /** 回路类型 */
  circuitType: string;
  /** 回路类型编号 */
  circuitTypeNumber: string;
  /** 断路器类型 */
  breakerType: string;
  /** 管材类型 */
  tubeType: string;
  /** 线缆类型 */
  wireType: string;
  /** 房间范围 */
  roomRange: string;
  /** 路由列表 */
  routes: IB3ConcealedWorkTubeTreeData[];
  /** 灯光控制配置（可选） */
  lightControl?: ILightControl;
}

/**
 * 灯光控制配置接口
 */
export interface ILightControl {
  /** 逻辑规则列表 */
  logics: ILightLogic[];
  /** 其他关联关系列表 */
  otherRelations: ILightRelation[];
}

/**
 * 灯光逻辑规则接口
 */
export interface ILightLogic {
  /** 关联关系列表 */
  relations: ILightRelation[];
}

/**
 * 灯光关联关系接口
 */
export interface ILightRelation {
  /** 管道列表 */
  tubes: IB3ConcealedWorkTubeData[];
}

/**
 * 管道树数据接口（占位符，实际类型由B3ConcealedWorkTubeTree定义）
 */
export interface IB3ConcealedWorkTubeTreeData {
  [key: string]: any;
}

/**
 * 管道数据接口（占位符，实际类型由B3ConcealedWorkTube定义）
 */
export interface IB3ConcealedWorkTubeData {
  [key: string]: any;
}

/**
 * 实体接口（用于参数类型约束）
 */
export interface IEntity {
  /** 获取参数值 */
  getParameterValue(paramName: string): any;
  /** 获取实例ID */
  getInstanceId(): string;
  /** 子实体列表 */
  children: IEntity[];
}

/**
 * 上下文接口
 */
export interface IContext {
  [key: string]: any;
}

/**
 * 暗装工程回路类
 * 用于管理和构建暗装工程回路的BOM数据
 * 
 * @extends B3Entity
 */
export declare class B3ConcealedWorkCircuit extends B3Entity {
  /**
   * 构造函数
   * @param context - 上下文对象
   */
  constructor(context: IContext);

  /**
   * 构建BOM3数据
   * 从实体对象中提取并转换为BOM3格式的数据
   * 
   * @param entity - 实体对象
   * @returns BOM3数据对象
   */
  buildBom3Data(entity: IEntity): IB3ConcealedWorkCircuitData;

  /**
   * 构建路由数据（私有方法）
   * 根据实例ID查找子实体并构建其管道树数据
   * 
   * @param entity - 父实体对象
   * @param instanceId - 子实体实例ID
   * @returns 管道树数据，未找到时返回undefined
   */
  private _buildRoute(entity: IEntity, instanceId: string): IB3ConcealedWorkTubeTreeData | undefined;

  /**
   * 构建管道数据（私有方法）
   * 根据实例ID查找子实体并构建其管道数据
   * 
   * @param entity - 父实体对象
   * @param instanceId - 子实体实例ID
   * @returns 管道数据，未找到时返回undefined
   */
  private _buildTube(entity: IEntity, instanceId: string): IB3ConcealedWorkTubeData | undefined;
}