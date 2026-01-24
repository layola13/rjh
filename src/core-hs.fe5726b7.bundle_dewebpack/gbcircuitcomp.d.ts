/**
 * GB Circuit Component - 国标电路组件
 * 用于表示符合国标的电路配置，包括回路类型、断路器、线管、电线等信息
 * @module GBCircuitComp
 */

import { GBCircuitTypeEnum, GBBreakerTypeEnum, GBTubeTypeEnum, GBWireTypeEnum } from './enums';
import { ComponentTypeDump } from './component-types';
import { CircuitComp, CircuitCompEnum } from './circuit-comp';

/**
 * GB电路组件序列化数据结构
 */
export interface GBCircuitCompDumpData {
  /** 组件类型标识 */
  tp: ComponentTypeDump.GBCircuit;
  /** 回路类型 */
  ct: GBCircuitTypeEnum;
  /** 回路类型编号 */
  ctn: number;
  /** 断路器类型 */
  bt: GBBreakerTypeEnum;
  /** 线管类型 */
  tt: GBTubeTypeEnum;
  /** 电线类型 */
  wt: GBWireTypeEnum;
  /** 房间范围 */
  rr: number[];
}

/**
 * 国标电路组件类
 * 继承自CircuitComp，实现GB标准的电路配置管理
 */
export class GBCircuitComp extends CircuitComp {
  /** 组件类型常量 */
  public static readonly Type: CircuitCompEnum.GBCircuit = CircuitCompEnum.GBCircuit;

  /** 回路类型（如WL照明回路） */
  public circuitType: GBCircuitTypeEnum = GBCircuitTypeEnum.WL;

  /** 回路类型编号 */
  public circuitTypeNumber: number = 0;

  /** 断路器类型（如DPN 20A 1P） */
  public breakerType: GBBreakerTypeEnum = GBBreakerTypeEnum.DPN_20_1P;

  /** 线管类型（如PVC20） */
  public tubeType: GBTubeTypeEnum = GBTubeTypeEnum.PVC20;

  /** 电线类型（如BVR 2×2.5） */
  public wireType: GBWireTypeEnum = GBWireTypeEnum.BVR_2X2D5;

  /** 房间范围ID列表 */
  public roomRange: number[] = [];

  /**
   * 获取组件类型
   * @returns 组件类型枚举值
   */
  public get type(): CircuitCompEnum.GBCircuit {
    return GBCircuitComp.Type;
  }

  /**
   * 克隆当前组件
   * @returns 新的GBCircuitComp实例
   */
  public clone(): GBCircuitComp {
    const cloned = new GBCircuitComp();
    cloned.circuitType = this.circuitType;
    cloned.circuitTypeNumber = this.circuitTypeNumber;
    cloned.breakerType = this.breakerType;
    cloned.tubeType = this.tubeType;
    cloned.wireType = this.wireType;
    cloned.roomRange = this.roomRange.slice();
    return cloned;
  }

  /**
   * 序列化组件数据
   * @returns 序列化后的数据对象
   */
  public dump(): GBCircuitCompDumpData {
    return {
      tp: ComponentTypeDump.GBCircuit,
      ct: this.circuitType,
      ctn: this.circuitTypeNumber,
      bt: this.breakerType,
      tt: this.tubeType,
      wt: this.wireType,
      rr: this.roomRange
    };
  }

  /**
   * 从序列化数据加载组件
   * @param data - 序列化的数据对象
   * @param referObject - 引用对象（用于关联其他组件）
   * @returns 加载后的GBCircuitComp实例
   */
  public static load(data: GBCircuitCompDumpData, referObject: unknown): GBCircuitComp {
    const instance = new GBCircuitComp();
    (instance as any)._referObject = referObject;
    instance.circuitType = data.ct;
    instance.circuitTypeNumber = data.ctn;
    instance.breakerType = data.bt;
    instance.tubeType = data.tt;
    instance.wireType = data.wt;
    instance.roomRange = data.rr;
    return instance;
  }
}