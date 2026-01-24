/**
 * GB Power System Component Module
 * Defines the GB (National Standard) power system component with household cable and breaker configurations
 */

import { GBHouseHoldCableTypeEnum, GBTotalBreakerTypeEnum } from './gb-enums';
import { ComponentTypeDump } from './component-types';
import { PowerSysComp, PowerSysCompEnum } from './power-sys-comp';

/**
 * Serialized dump structure for GBPowerSysComp
 */
export interface GBPowerSysCompDump {
  /** Component type identifier */
  tp: ComponentTypeDump.GBPowerSys;
  /** Household cable type */
  hhc: GBHouseHoldCableTypeEnum;
  /** Total breaker type */
  tbt: GBTotalBreakerTypeEnum;
}

/**
 * GB Power System Component
 * Represents a national standard (GB) power system configuration with household cable and breaker types
 */
export class GBPowerSysComp extends PowerSysComp {
  /** Static type identifier for GBPowerSysComp */
  static readonly Type: PowerSysCompEnum.GBPowerSys = PowerSysCompEnum.GBPowerSys;

  /** Household cable type configuration (default: BV750 2x10+E10 PVC25) */
  houseHoldCableType: GBHouseHoldCableTypeEnum;

  /** Total breaker type configuration (default: C65N-40 2P) */
  totalBreakerType: GBTotalBreakerTypeEnum;

  constructor() {
    super();
    this.houseHoldCableType = GBHouseHoldCableTypeEnum.BV750_2X10P_E10PVC25;
    this.totalBreakerType = GBTotalBreakerTypeEnum.C65N_40_2P;
  }

  /**
   * Gets the component type identifier
   */
  get type(): PowerSysCompEnum.GBPowerSys {
    return GBPowerSysComp.Type;
  }

  /**
   * Creates a deep copy of this component
   * @returns A new GBPowerSysComp instance with identical configuration
   */
  clone(): GBPowerSysComp {
    const cloned = new GBPowerSysComp();
    cloned.houseHoldCableType = this.houseHoldCableType;
    cloned.totalBreakerType = this.totalBreakerType;
    return cloned;
  }

  /**
   * Serializes the component to a plain object for persistence
   * @returns Serialized component data
   */
  dump(): GBPowerSysCompDump {
    return {
      tp: ComponentTypeDump.GBPowerSys,
      hhc: this.houseHoldCableType,
      tbt: this.totalBreakerType
    };
  }

  /**
   * Deserializes a component from dump data
   * @param dumpData - Serialized component data
   * @param referObject - Reference object for internal linking
   * @returns Restored GBPowerSysComp instance
   */
  static load(dumpData: GBPowerSysCompDump, referObject: unknown): GBPowerSysComp {
    const instance = new GBPowerSysComp();
    (instance as any)._referObject = referObject;
    instance.houseHoldCableType = dumpData.hhc;
    instance.totalBreakerType = dumpData.tbt;
    return instance;
  }
}