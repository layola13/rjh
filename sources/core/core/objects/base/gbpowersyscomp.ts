import { GBHouseHoldCableTypeEnum, GBTotalBreakerTypeEnum } from './path/to/enums';
import { ComponentTypeDump } from './path/to/component-type';
import { PowerSysComp, PowerSysCompEnum } from './path/to/power-sys-comp';

interface GBPowerSysCompDump {
  tp: ComponentTypeDump.GBPowerSys;
  hhc: GBHouseHoldCableTypeEnum;
  tbt: GBTotalBreakerTypeEnum;
}

/**
 * GB Power System Component
 * Manages household cable types and total breaker configurations
 */
export class GBPowerSysComp extends PowerSysComp {
  static readonly Type = PowerSysCompEnum.GBPowerSys;

  houseHoldCableType: GBHouseHoldCableTypeEnum = GBHouseHoldCableTypeEnum.BV750_2X10P_E10PVC25;
  totalBreakerType: GBTotalBreakerTypeEnum = GBTotalBreakerTypeEnum.C65N_40_2P;

  get type(): PowerSysCompEnum {
    return GBPowerSysComp.Type;
  }

  clone(): GBPowerSysComp {
    const cloned = new GBPowerSysComp();
    cloned.houseHoldCableType = this.houseHoldCableType;
    cloned.totalBreakerType = this.totalBreakerType;
    return cloned;
  }

  dump(): GBPowerSysCompDump {
    return {
      tp: ComponentTypeDump.GBPowerSys,
      hhc: this.houseHoldCableType,
      tbt: this.totalBreakerType
    };
  }

  static load(data: GBPowerSysCompDump, referObject: unknown): GBPowerSysComp {
    const instance = new GBPowerSysComp();
    instance._referObject = referObject;
    instance.houseHoldCableType = data.hhc;
    instance.totalBreakerType = data.tbt;
    return instance;
  }
}