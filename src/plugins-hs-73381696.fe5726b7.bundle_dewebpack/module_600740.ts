interface ViewModeChangeData {
  newViewMode: string;
  oldViewMode: string;
}

interface ListenEventParams {
  data: ViewModeChangeData;
}

interface SignalProvider {
  signalPrimaryViewModeChanged: unknown;
}

interface LogData {
  type: string;
  viewMode: string;
  activeSection: string;
  activeSectionName: string;
  clicksRatio: {
    id: string;
    name: string;
  };
  argInfo: {
    param: string;
  };
  viewModeName: string;
  description: string;
  group: string;
}

interface LogListener {
  getListenSignal: (provider: SignalProvider) => unknown;
  listen: (event: ListenEventParams) => LogData[];
}

import { createLogData } from './log-utils';

declare const HSFPConstants: {
  viewNames: Record<string, string>;
  LogGroupTypes: {
    ViewOperation: string;
  };
};

const viewModeChangeListener: LogListener = {
  getListenSignal(provider: SignalProvider): unknown {
    return provider.signalPrimaryViewModeChanged;
  },

  listen(event: ListenEventParams): LogData[] {
    const { newViewMode, oldViewMode } = event.data;
    const oldViewName = HSFPConstants.viewNames[oldViewMode];
    const newViewName = HSFPConstants.viewNames[newViewMode];

    return [
      createLogData(
        'switch.View',
        {
          type: 'mainView',
          viewMode: newViewMode,
          activeSection: 'switchView',
          activeSectionName: '视图切换',
          clicksRatio: {
            id: `${oldViewName}-to-${newViewName}`,
            name: `${oldViewName}视图切换到${newViewName}视图`,
          },
          argInfo: {
            param: `${newViewName}视图`,
          },
          viewModeName: newViewName,
          description: `主视图操作: ${oldViewName}视图切换到${newViewName}视图`,
          group: HSFPConstants.LogGroupTypes.ViewOperation,
        },
        false
      ),
    ];
  },
};

export default [viewModeChangeListener];