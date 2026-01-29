interface LogData {
  description: string;
  activeSection: string;
  activeSectionName: string;
  clicksRatio: {
    id: string;
    name: string;
  };
}

interface PluginManager {
  getPlugin(pluginType: string): AutoRecommendPlugin;
}

interface AutoRecommendPlugin {
  signalRecommendModelToLog: Signal;
}

interface Signal {
  // Define signal properties based on your signal implementation
}

interface ListenEventData {
  data: {
    type: RecommendActionType;
  };
}

interface PluginContext {
  pluginManager: PluginManager;
}

type RecommendActionType = 'autoRecommend' | 'reset' | 'changeScheme';

interface RecommendModelListener {
  getListenSignal(context: PluginContext): Signal;
  listen(event: ListenEventData): LogData[];
}

const RECOMMEND_ACTION_NAMES: Record<RecommendActionType, string> = {
  autoRecommend: '智能搭配',
  reset: '一键还原',
  changeScheme: '换一套'
};

const PLUGIN_TYPE_AUTO_RECOMMEND = 'AutoRecommend';
const LOG_EVENT_RECOMMEND_MODEL = 'click.recommendmodel';
const SECTION_RECOMMEND_MODEL = 'recommendmodel';
const SECTION_NAME_RECOMMEND_MODEL = '智能搭配';

function createLogData(eventType: string, data: Omit<LogData, 'description' | 'activeSection' | 'activeSectionName'> & Partial<Pick<LogData, 'description' | 'activeSection' | 'activeSectionName'>>): LogData {
  return {
    description: data.description ?? '',
    activeSection: data.activeSection ?? '',
    activeSectionName: data.activeSectionName ?? '',
    clicksRatio: data.clicksRatio
  };
}

const recommendModelListeners: RecommendModelListener[] = [
  {
    getListenSignal(context: PluginContext): Signal {
      return context.pluginManager
        .getPlugin(PLUGIN_TYPE_AUTO_RECOMMEND)
        .signalRecommendModelToLog;
    },

    listen(event: ListenEventData): LogData[] {
      const actionType = event.data.type;
      
      return [
        createLogData(LOG_EVENT_RECOMMEND_MODEL, {
          description: SECTION_NAME_RECOMMEND_MODEL,
          activeSection: SECTION_RECOMMEND_MODEL,
          activeSectionName: SECTION_NAME_RECOMMEND_MODEL,
          clicksRatio: {
            id: actionType,
            name: RECOMMEND_ACTION_NAMES[actionType]
          }
        })
      ];
    }
  }
];

export default recommendModelListeners;