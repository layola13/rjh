import { GBCircuitTypeEnum, GBBreakerTypeEnum, GBTubeTypeEnum, GBWireTypeEnum } from './path-to-enums';
import { ComponentTypeDump } from './path-to-component-types';
import { CircuitComp, CircuitCompEnum } from './path-to-circuit-comp';

interface GBCircuitCompDump {
  tp: ComponentTypeDump.GBCircuit;
  ct: GBCircuitTypeEnum;
  ctn: number;
  bt: GBBreakerTypeEnum;
  tt: GBTubeTypeEnum;
  wt: GBWireTypeEnum;
  rr: number[];
}

/**
 * GB Circuit Component
 * Manages circuit configuration including type, breaker, tube, and wire specifications
 */
export class GBCircuitComp extends CircuitComp {
  static readonly Type = CircuitCompEnum.GBCircuit;

  circuitType: GBCircuitTypeEnum = GBCircuitTypeEnum.WL;
  circuitTypeNumber: number = 0;
  breakerType: GBBreakerTypeEnum = GBBreakerTypeEnum.DPN_20_1P;
  tubeType: GBTubeTypeEnum = GBTubeTypeEnum.PVC20;
  wireType: GBWireTypeEnum = GBWireTypeEnum.BVR_2X2D5;
  roomRange: number[] = [];

  get type(): CircuitCompEnum {
    return GBCircuitComp.Type;
  }

  /**
   * Creates a deep copy of this circuit component
   */
  clone(): GBCircuitComp {
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
   * Serializes the component to a plain object for storage
   */
  dump(): GBCircuitCompDump {
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
   * Deserializes a circuit component from dumped data
   */
  static load(data: GBCircuitCompDump, referObject: unknown): GBCircuitComp {
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