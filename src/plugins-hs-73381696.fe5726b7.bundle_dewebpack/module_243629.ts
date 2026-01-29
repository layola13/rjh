import { createLogData } from './utils/log';

interface GuideOption {
  stepAccurateNum: number;
}

interface GuideEventData {
  type: 'start' | 'action' | 'end' | 'skip' | 'learnMore';
  guideOption?: GuideOption;
  guideType: 'tip' | 'modal';
}

interface ListenerEvent {
  data: GuideEventData;
}

interface PluginManager {
  getPlugin(type: string): GuidePlugin;
}

interface GuidePlugin {
  signalGuideToLog: unknown;
}

interface LogContext {
  pluginManager: PluginManager;
}

interface ClickRatio {
  id: string;
  name: string;
}

interface LogDataOptions {
  description: string;
  activeSection: string;
  activeSectionName: string;
  activeStepNumber?: number;
  clicksRatio: ClickRatio;
}

interface GuideListener {
  getListenSignal(context: LogContext): unknown;
  listen(event: ListenerEvent): ReturnType<typeof createLogData>[];
}

const GUIDE_STEP_LABELS: Record<string, string> = {
  start: '开始',
  action: '步骤',
  end: '结束',
  skip: '跳过'
};

const guideListeners: GuideListener[] = [
  {
    getListenSignal(context: LogContext): unknown {
      return context.pluginManager.getPlugin(HSFPConstants.PluginType.Guide).signalGuideToLog;
    },

    listen(event: ListenerEvent): ReturnType<typeof createLogData>[] {
      const { type, guideOption, guideType } = event.data;

      if (guideType === 'tip') {
        let description = '';
        let clickName = '';
        let clickId = `userguide-${type}`;

        if (type === 'start') {
          clickName = '开始新手引导';
          description = `新手引导：${GUIDE_STEP_LABELS[type]}`;
        } else if (type === 'action') {
          clickId = `userguide-action-${guideOption!.stepAccurateNum + 1}`;
          clickName = `第 ${guideOption!.stepAccurateNum + 1} 步`;
          description = `新手引导：${guideOption!.stepAccurateNum + 1}`;
        } else if (type === 'end') {
          clickName = '结束新手引导';
          description = '新手引导：结束';
        } else if (type === 'skip') {
          clickName = '跳过全部';
          description = '新手引导：跳过全部';
        } else if (type === 'learnMore') {
          clickName = '查看更多';
          description = '新手引导：查看更多';
        }

        return [
          createLogData(`click.userguide-${guideType}`, {
            description,
            activeSection: 'userguide',
            activeSectionName: '新手引导-气泡',
            activeStepNumber: guideOption?.stepAccurateNum,
            clicksRatio: {
              id: clickId,
              name: clickName
            }
          })
        ];
      }

      let description = '';
      let clickName = '';
      let clickId = `userguide-${type}`;

      if (type === 'start') {
        clickName = '开始新手引导';
        description = `新手引导：${GUIDE_STEP_LABELS[type]}`;
      } else if (type === 'action') {
        clickId = `userguide-action-${guideOption!.stepAccurateNum - 1}`;
        clickName = `第 ${guideOption!.stepAccurateNum - 1} 步`;
        description = `新手引导：${guideOption!.stepAccurateNum - 1}`;
      } else if (type === 'end') {
        clickName = '结束新手引导';
        description = '新手引导：结束';
      } else if (type === 'skip') {
        clickName = '跳过全部';
        description = '新手引导：跳过全部';
      }

      return [
        createLogData('click.userguide', {
          description,
          activeSection: 'userguide',
          activeSectionName: '新手引导',
          clicksRatio: {
            id: clickId,
            name: clickName
          }
        })
      ];
    }
  }
];

export default guideListeners;