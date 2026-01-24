/**
 * 设计方案加载与文档生命周期监听器配置
 * @module DesignLoadingListeners
 */

import { createLogData, LogData } from './log-utils';

/**
 * 设计方案来源类型
 */
type DesignSourceType = 'floorplan' | 'personal' | 'historyVersion';

/**
 * 设计方案来源类型的中文描述映射
 */
interface DesignTypeNameMap {
  /** 户型库打开 */
  floorplan: string;
  /** 个人设计 */
  personal: string;
  /** 历史版本 */
  historyVersion: string;
}

/**
 * 设计加载数据结构
 */
interface DesignLoadData {
  /** 设计方案来源类型 */
  type: DesignSourceType;
  /** 操作描述 */
  description: string;
}

/**
 * 插件管理器接口
 */
interface PluginManager {
  getPlugin(pluginType: string): PersistencePlugin;
}

/**
 * 持久化插件接口
 */
interface PersistencePlugin {
  /** 开始加载设计方案的信号 */
  signalStartLoadingDesign: Signal<DesignLoadData>;
}

/**
 * 加载任务管理器接口
 */
interface LoadingTaskManager {
  /** 首次刷新完成的信号 */
  signalFlushEnd: Signal<FlushEndData>;
}

/**
 * 刷新结束数据
 */
interface FlushEndData {
  /** 是否为首次刷新 */
  firstFlush: boolean;
}

/**
 * 应用上下文接口
 */
interface AppContext {
  /** 插件管理器 */
  pluginManager: PluginManager;
  /** 方案关闭信号 */
  signalDocumentClosed: Signal<unknown>;
  /** 方案打开完成信号 */
  signalDocumentOpened: Signal<unknown>;
}

/**
 * 信号接口（泛型）
 */
interface Signal<T> {
  add(callback: (data: T) => void): void;
  remove(callback: (data: T) => void): void;
}

/**
 * 事件数据包装
 */
interface EventData<T> {
  data: T;
}

/**
 * 跟踪参数存储接口
 */
interface UTrackArgs {
  get(key: string): DesignTrackData | undefined;
  set(key: string, value: Partial<DesignTrackData>): void;
}

/**
 * 设计跟踪数据
 */
interface DesignTrackData {
  description?: string;
  type?: DesignSourceType;
  typeName?: string;
}

/**
 * 跟踪上下文
 */
interface TrackContext {
  /** 用户跟踪参数存储 */
  utrackArgs: UTrackArgs;
}

/**
 * 监听器配置接口
 */
interface ListenerConfig<T = any> {
  /**
   * 获取需要监听的信号
   * @param context - 应用上下文
   * @returns 信号对象
   */
  getListenSignal(context: AppContext): Signal<T>;

  /**
   * 信号触发时的处理函数
   * @param event - 事件数据
   * @param trackContext - 跟踪上下文
   * @returns 日志数据数组
   */
  listen(event: EventData<T>, trackContext: TrackContext): LogData[];
}

/**
 * 设计方案来源类型名称映射表
 */
const DESIGN_TYPE_NAMES: DesignTypeNameMap = {
  floorplan: '户型库打开',
  personal: '个人设计',
  historyVersion: '历史版本'
};

/**
 * 设计加载与文档生命周期监听器配置列表
 */
const designLoadingListeners: ListenerConfig[] = [
  // 监听设计方案开始加载
  {
    getListenSignal(context: AppContext): Signal<DesignLoadData> {
      return context.pluginManager
        .getPlugin(HSFPConstants.PluginType.Persistence)
        .signalStartLoadingDesign;
    },

    listen(
      event: EventData<DesignLoadData>,
      trackContext: TrackContext
    ): LogData[] {
      const { type, description } = event.data;
      const startDescription = `${description}开始`;

      trackContext.utrackArgs.set('open.Design', {
        description,
        type,
        typeName: DESIGN_TYPE_NAMES[type]
      });

      return [
        createLogData(
          'open.Design',
          {
            description: startDescription,
            type,
            typeName: DESIGN_TYPE_NAMES[type],
            group: HSFPConstants.LogGroupTypes.OpenDesign
          },
          false,
          'start'
        )
      ];
    }
  },

  // 监听首次渲染刷新完成
  {
    getListenSignal(context: AppContext): Signal<FlushEndData> {
      return HSApp.View.Base.LoadingTaskManager.instance().signalFlushEnd;
    },

    listen(
      event: EventData<FlushEndData>,
      trackContext: TrackContext
    ): LogData[] {
      if (!event.data?.firstFlush) {
        return [];
      }

      const designTrackData = trackContext.utrackArgs.get('open.Design');
      const endDescription = designTrackData?.description
        ? `${designTrackData.description}结束`
        : '';
      const type = designTrackData?.type ?? '';

      trackContext.utrackArgs.set('open.Design', {});

      return [
        createLogData(
          'open.Design',
          {
            description: endDescription,
            type,
            typeName: DESIGN_TYPE_NAMES[type as DesignSourceType],
            group: HSFPConstants.LogGroupTypes.OpenDesign
          },
          true,
          'end'
        )
      ];
    }
  },

  // 监听方案关闭
  {
    getListenSignal(context: AppContext): Signal<unknown> {
      return context.signalDocumentClosed;
    },

    listen(): LogData[] {
      return [
        {
          name: 'document.Closed',
          params: {
            description: '关闭方案'
          },
          sendNow: false
        }
      ];
    }
  },

  // 监听方案打开完成
  {
    getListenSignal(context: AppContext): Signal<unknown> {
      return context.signalDocumentOpened;
    },

    listen(): LogData[] {
      return [
        {
          name: 'document.Opened',
          params: {
            description: '方案打开完成'
          },
          sendNow: false
        }
      ];
    }
  }
];

export default designLoadingListeners;