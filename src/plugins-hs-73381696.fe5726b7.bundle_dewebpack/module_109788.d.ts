/**
 * 命令监听器配置模块
 * 提供命令创建和终止的监听处理逻辑
 */

import { createLogData } from './module_858122';
import { 
  dumpSelectionInfo, 
  operationClassify, 
  validOperation, 
  isSingleRoomModeEnd 
} from './module_508165';
import { commandName } from './module_953541';

/**
 * 命令参数信息
 */
interface CommandArgInfo {
  /** 选择信息 */
  selectionInfo: unknown;
  /** 活动区域ID */
  activeSection?: string;
  /** 活动区域名称 */
  activeSectionName?: string;
  /** 点击率统计 */
  clicksRatio?: Record<string, unknown>;
  /** 其他动态参数 */
  [key: string]: unknown;
}

/**
 * 日志数据结构
 */
interface LogData {
  /** 操作描述 */
  description: string;
  /** 参数信息 */
  argInfo: CommandArgInfo;
  /** 操作分组/类别 */
  group: string;
  /** 实体类型 */
  type?: string;
  /** 操作有效性标识 */
  validOperation?: boolean;
}

/**
 * 命令对象接口
 */
interface Command {
  /** 命令类型 */
  type: string;
  /** 判断是否为交互式命令 */
  isInteractive(): boolean;
  /** 获取命令描述 */
  getDescription(): string | undefined;
  /** 获取命令类别 */
  getCategory(): string | undefined;
  /** 获取当前参数 */
  getCurrentParams(): Record<string, unknown> | undefined;
}

/**
 * 命令管理器接口
 */
interface CommandManager {
  /** 命令创建信号 */
  signalCommandCreated: unknown;
  /** 命令终止信号 */
  signalCommandTerminated: unknown;
}

/**
 * 监听事件数据
 */
interface ListenerEventData {
  data: {
    /** 命令实例 */
    cmd: Command;
  };
}

/**
 * 监听器上下文
 */
interface ListenerContext {
  /** 命令管理器 */
  cmdManager: CommandManager;
}

/**
 * 命令监听器配置
 */
interface CommandListener {
  /**
   * 获取监听信号
   * @param context - 监听器上下文
   * @returns 监听的信号对象
   */
  getListenSignal(context: ListenerContext): unknown;
  
  /**
   * 监听处理函数
   * @param event - 事件数据
   * @returns 日志数据数组（可选）
   */
  listen(event: ListenerEventData): ReturnType<typeof createLogData>[] | undefined;
}

/**
 * 全局应用对象（运行时环境）
 */
declare const HSApp: {
  Util: {
    LoggerUtil: {
      /**
       * 获取选中实体类型
       * @returns 实体类型字符串
       */
      getSelectedEntitiesType(): string | undefined;
    };
  };
};

/**
 * 命令监听器配置列表
 * 
 * 包含两个监听器：
 * 1. 命令创建监听器 - 记录交互式命令或持续性命令的开始
 * 2. 命令终止监听器 - 记录命令执行结束并收集最终参数
 */
declare const commandListeners: [
  CommandListener, // 命令创建监听器
  CommandListener  // 命令终止监听器
];

export default commandListeners;