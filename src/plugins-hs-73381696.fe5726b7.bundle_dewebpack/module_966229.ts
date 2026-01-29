export interface LogData {
  description: string;
  activeSection: string;
  activeSectionName: string;
  clicksRatio: {
    id: string;
    name: string;
  };
}

export interface PluginManager {
  getPlugin(pluginType: string): RecommendAccessoriesPlugin;
}

export interface RecommendAccessoriesPlugin {
  signalRecommendAccessoriesToLog: unknown;
}

export interface ListenEventData {
  data: {
    type: RecommendAccessoriesType;
  };
  pluginManager: PluginManager;
}

export type RecommendAccessoriesType = 'recommendAccessories' | 'reset' | 'changeScheme';

export interface RecommendAccessoriesListener {
  getListenSignal(event: ListenEventData): unknown;
  listen(event: ListenEventData): LogData[];
}

import { createLogData } from './module_858122';

const ACCESSORY_TYPE_NAMES: Record<RecommendAccessoriesType, string> = {
  recommendAccessories: '一键摆饰',
  reset: '一键还原',
  changeScheme: '换一套'
};

const recommendAccessoriesListeners: RecommendAccessoriesListener[] = [
  {
    getListenSignal(event: ListenEventData): unknown {
      return event.pluginManager
        .getPlugin(HSFPConstants.PluginType.RecommendAccessories)
        .signalRecommendAccessoriesToLog;
    },

    listen(event: ListenEventData): LogData[] {
      const { type } = event.data;

      return [
        createLogData('click.recommendaccessories', {
          description: '一键摆饰',
          activeSection: 'recommendaccessories',
          activeSectionName: '一键摆饰',
          clicksRatio: {
            id: type,
            name: ACCESSORY_TYPE_NAMES[type]
          }
        })
      ];
    }
  }
];

export default recommendAccessoriesListeners;