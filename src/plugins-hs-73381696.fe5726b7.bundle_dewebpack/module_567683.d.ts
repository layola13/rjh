/**
 * 性能评价弹窗日志监听器模块
 * 用于监听和记录用户与性能评价弹窗的交互行为
 */

import { createLogData, LogData } from './log-utils';

/**
 * 弹窗操作类型
 */
type MarkingActionType = 'close' | 'submit' | 'open';

/**
 * 弹窗操作描述映射表
 */
interface MarkingActionDescriptions {
  /** 关闭弹窗操作 */
  close: string;
  /** 提交评价操作 */
  submit: string;
  /** 打开弹窗操作 */
  open: string;
}

/**
 * 弹窗操作事件数据
 */
interface MarkingEventData {
  /** 操作类型 */
  type: MarkingActionType;
}

/**
 * 监听器事件参数
 */
interface ListenerEvent {
  /** 事件携带的数据 */
  data: MarkingEventData;
}

/**
 * 性能评价插件接口
 */
interface MarkingSystemPlugin {
  /** 用于记录日志的信号 */
  signalMarkingToLog: unknown;
}

/**
 * 插件管理器接口
 */
interface PluginManager {
  /**
   * 获取指定类型的插件实例
   * @param pluginType - 插件类型标识
   */
  getPlugin(pluginType: string): MarkingSystemPlugin;
}

/**
 * 信号获取器参数
 */
interface SignalGetterContext {
  /** 插件管理器实例 */
  pluginManager: PluginManager;
}

/**
 * 日志监听器配置
 */
interface LogListener {
  /**
   * 获取监听信号
   * @param context - 包含插件管理器的上下文
   * @returns 性能评价插件的日志信号
   */
  getListenSignal(context: SignalGetterContext): unknown;

  /**
   * 处理监听到的事件
   * @param event - 触发的事件对象
   * @returns 日志数据数组
   */
  listen(event: ListenerEvent): LogData[];
}

/**
 * 操作描述文案配置
 */
const ACTION_DESCRIPTIONS: MarkingActionDescriptions = {
  close: '关闭弹窗',
  submit: '提交评价',
  open: '打开弹窗'
};

/**
 * 性能评价弹窗日志监听器列表
 */
const markingSystemListeners: LogListener[] = [
  {
    /**
     * 获取性能评价系统的日志监听信号
     */
    getListenSignal(context: SignalGetterContext): unknown {
      return context.pluginManager
        .getPlugin(HSFPConstants.PluginType.MarkingSystem)
        .signalMarkingToLog;
    },

    /**
     * 监听性能评价弹窗操作事件并生成日志
     */
    listen(event: ListenerEvent): LogData[] {
      const actionType = event.data.type;
      const clickId = `marking-${actionType}`;
      const clickName = ACTION_DESCRIPTIONS[actionType];
      const description = `性能评价弹窗： ${ACTION_DESCRIPTIONS[actionType]}`;

      return [
        createLogData('click.markingsystem', {
          description,
          activeSection: 'markingsystem',
          activeSectionName: '定制性能评价弹窗',
          clicksRatio: {
            id: clickId,
            name: clickName
          }
        })
      ];
    }
  }
];

export default markingSystemListeners;