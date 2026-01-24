import { B3Entity } from './B3Entity';
import { turnEntityToBom3Entity } from './EntityUtils';
import { B3ConcealedWorkPowerSystem } from './B3ConcealedWorkPowerSystem';
import { B3ConcealedWorkTubeTree } from './B3ConcealedWorkTubeTree';

/**
 * 强电系统配置
 */
interface StrongElecConfig {
  /** 电力系统列表 */
  powerSystems: Array<string | ReturnType<B3ConcealedWorkPowerSystem['buildBom3Data']>>;
}

/**
 * 弱电终端配置
 */
interface WeakElecTerminal {
  /** 路由列表 */
  routes: Array<string | ReturnType<B3ConcealedWorkTubeTree['buildBom3Data']>>;
}

/**
 * 弱电系统配置
 */
interface WeakElecConfig {
  /** 终端列表 */
  terminals: WeakElecTerminal[];
}

/**
 * 水路配置
 */
interface WaterRouteConfig {
  /** 路由列表 */
  routes: Array<string | ReturnType<B3ConcealedWorkTubeTree['buildBom3Data']>>;
}

/**
 * BOM3数据结构
 */
interface Bom3Data {
  /** 实体数据 */
  entity: unknown;
  /** 强电配置 */
  strongElec?: StrongElecConfig;
  /** 弱电配置 */
  weakElec: WeakElecConfig;
  /** 冷水管路配置 */
  coldWater: WaterRouteConfig;
  /** 热水管路配置 */
  hotWater: WaterRouteConfig;
}

/**
 * 实体接口
 */
interface Entity {
  /** 获取实例ID */
  getInstanceId(): string;
  /** 获取参数值 */
  getParameterValue<T = unknown>(paramName: string): T;
  /** 子实体列表 */
  children: Entity[];
}

/**
 * 上下文接口
 */
interface Context {
  // 根据实际需求定义上下文属性
}

/**
 * B3隐蔽工程实体类
 * 用于处理建筑隐蔽工程（强电、弱电、冷热水管路）的BOM数据构建
 */
export declare class B3ConcealedWork extends B3Entity {
  /** 上下文对象 */
  context: Context;

  /**
   * 构建BOM3格式数据
   * @param entity - 源实体对象
   * @returns BOM3数据对象，包含实体信息及各系统配置
   */
  buildBom3Data(entity: Entity): Bom3Data;

  /**
   * 构建单条路由数据
   * @param entity - 父实体对象
   * @param routeId - 路由ID（实例ID）
   * @returns 管路树BOM3数据，若未找到对应子实体则返回undefined
   * @private
   */
  private _buildRoute(
    entity: Entity,
    routeId: string
  ): ReturnType<B3ConcealedWorkTubeTree['buildBom3Data']> | undefined;
}