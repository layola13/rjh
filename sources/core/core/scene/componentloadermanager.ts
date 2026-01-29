import { ComponentTypeDump } from './ComponentTypeDump';
import { DeviceComp } from './DeviceComp';
import { JointComp } from './JointComp';
import { StrongElecComp } from './StrongElecComp';
import { WeakElecComp } from './WeakElecComp';
import { HotWaterComp } from './HotWaterComp';
import { ColdWaterComp } from './ColdWaterComp';
import { GBCircuitComp } from './GBCircuitComp';
import { GBPowerSysComp } from './GBPowerSysComp';

interface ComponentDumpData {
  tp: ComponentTypeDump;
  [key: string]: unknown;
}

interface LoadedComponent {
  [key: string]: unknown;
}

/**
 * Component Loader Manager
 * Singleton manager responsible for loading different types of components based on dump data
 */
export class ComponentLoaderManager {
  private static _instance: ComponentLoaderManager | null = null;

  private constructor() {}

  /**
   * Get singleton instance of ComponentLoaderManager
   */
  static get ins(): ComponentLoaderManager {
    if (!ComponentLoaderManager._instance) {
      ComponentLoaderManager._instance = new ComponentLoaderManager();
    }
    return ComponentLoaderManager._instance;
  }

  /**
   * Load component based on dump data and additional parameters
   * @param dumpData - Component dump data containing type information
   * @param params - Additional loading parameters
   * @returns Loaded component instance or undefined
   */
  load(dumpData: ComponentDumpData, params: unknown): LoadedComponent | undefined {
    let loadedComponent: LoadedComponent | undefined;

    switch (dumpData.tp) {
      case ComponentTypeDump.Device:
        loadedComponent = DeviceComp.load(dumpData, params);
        break;
      case ComponentTypeDump.Joint:
        loadedComponent = JointComp.load(dumpData, params);
        break;
      case ComponentTypeDump.StrongElec:
        loadedComponent = StrongElecComp.load(dumpData, params);
        break;
      case ComponentTypeDump.WeakElec:
        loadedComponent = WeakElecComp.load(dumpData, params);
        break;
      case ComponentTypeDump.HotWater:
        loadedComponent = HotWaterComp.load(dumpData, params);
        break;
      case ComponentTypeDump.ColdWater:
        loadedComponent = ColdWaterComp.load(dumpData, params);
        break;
      case ComponentTypeDump.GBCircuit:
        loadedComponent = GBCircuitComp.load(dumpData, params);
        break;
      case ComponentTypeDump.GBPowerSys:
        loadedComponent = GBPowerSysComp.load(dumpData, params);
        break;
    }

    return loadedComponent;
  }
}