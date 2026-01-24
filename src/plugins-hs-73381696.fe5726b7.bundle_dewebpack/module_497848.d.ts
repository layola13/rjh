import { HSApp } from './518193';
import BaseClass from './891833';
import DefaultImport from './7793';

/**
 * 用户行为日志跟踪参数接口
 */
interface LogEntry {
  /** 日志事件名称 */
  name: string;
  /** 日志事件参数 */
  params: Record<string, any>;
  /** 是否立即发送 */
  sendNow?: boolean;
  /** 触发类型 */
  triggerType?: string;
  /** 是否启用备注 */
  enableNotes?: boolean;
  /** 结束参数回调函数 */
  endParamsCallback?: () => void;
  /** 当前时间戳 */
  currentTime?: number;
  /** 性能监控当前时间 */
  performanceCurrentTime?: number;
}

/**
 * 日志推送类
 * 负责将用户行为日志推送到跟踪系统
 * @extends BaseClass
 */
export default class LogPusher extends BaseClass {
  /**
   * 构造函数
   * @param config - 配置参数
   */
  constructor(config: unknown) {
    super(config, DefaultImport);
  }

  /**
   * 批量推送日志到用户跟踪系统
   * @param logs - 日志条目数组
   */
  pushLog(logs?: LogEntry[]): void {
    logs?.forEach((entry: LogEntry) => {
      HSApp.Logger.userTrackLogger.push(entry.name, entry.params, {
        sendNow: entry.sendNow,
        triggerType: entry.triggerType,
        enableNotes: entry.enableNotes,
        endParamsCallback: entry.endParamsCallback,
        currentTime: entry.currentTime,
        performanceCurrentTime: entry.performanceCurrentTime
      });
    });
  }
}