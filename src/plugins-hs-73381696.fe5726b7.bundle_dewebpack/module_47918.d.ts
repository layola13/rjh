/**
 * 命令监听器配置模块
 * 提供命令创建和终止的监听器定义
 */

import { LogTriggerType } from './375717';
import { CommandTypes } from './579007';
import { HSApp } from './518193';

/**
 * 命令数据结构
 */
interface CommandData {
  /** 命令对象 */
  cmd?: {
    /** 命令类型 */
    type: string;
    /** 获取命令描述 */
    getDescription?: () => string;
  };
}

/**
 * 监听事件数据
 */
interface ListenEventData {
  /** 命令相关数据 */
  data: CommandData;
}

/**
 * 命令参数获取结果
 */
interface CommandParams {
  /** 操作类型 */
  actionType?: string;
  /** 操作描述 */
  description?: string;
  /** 是否不记录（无用操作） */
  notUseful?: boolean;
}

/**
 * 日志记录选项
 */
interface LogOptions {
  /** 触发类型 */
  triggerType: LogTriggerType;
  /** 是否不发送 */
  notSend?: boolean;
  /** 是否启用备注 */
  enableNotes?: boolean;
}

/**
 * 日志参数
 */
interface LogParams {
  /** 操作描述 */
  description: string;
  /** 分组标识 */
  group: string;
  /** 分组名称 */
  groupName: string;
  /** 命令执行状态（仅终止时） */
  status?: string;
}

/**
 * 日志记录项
 */
interface LogItem {
  /** 操作类型 */
  actionType: string;
  /** 日志选项 */
  options: LogOptions;
  /** 日志参数 */
  params: LogParams;
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
 * 监听上下文
 */
interface ListenerContext {
  /** 命令管理器 */
  cmdManager: CommandManager;
}

/**
 * 命令类型定义
 */
interface CommandTypeDefinition {
  /**
   * 获取命令参数
   * @param app - 应用实例
   * @param data - 命令数据
   * @returns 命令参数
   */
  getParams?: (app: unknown, data: CommandData) => CommandParams;
}

/**
 * 命令监听器配置
 */
interface CommandListener {
  /**
   * 获取监听信号
   * @param context - 监听上下文
   * @returns 信号对象
   */
  getListenSignal: (context: ListenerContext) => unknown;

  /**
   * 监听处理函数
   * @param event - 事件数据
   * @returns 日志记录项数组
   */
  listen: (event: ListenEventData) => LogItem[] | undefined;
}

/**
 * 命令监听器列表
 * 包含命令创建和终止的监听器
 */
const commandListeners: CommandListener[] = [
  /**
   * 命令创建监听器
   * 在命令创建时记录起始日志
   */
  {
    getListenSignal: (context: ListenerContext) => {
      return context.cmdManager.signalCommandCreated;
    },

    listen: (event: ListenEventData): LogItem[] | undefined => {
      const data = event.data;
      const app = HSApp.App.getApp();
      const commandType = data?.cmd?.type;

      if (!CommandTypes[commandType]) {
        return [];
      }

      let actionType = '';
      let description = '';

      const commandTypeDef = CommandTypes[commandType] as CommandTypeDefinition;

      if (commandTypeDef instanceof Object && commandTypeDef?.getParams) {
        const params = commandTypeDef.getParams(app, data);
        const { actionType: paramActionType, description: paramDescription, notUseful } = params;

        if (notUseful) {
          return undefined;
        }

        actionType = paramActionType || '';
        description = paramDescription || '';
      }

      actionType = actionType || commandType;
      description = description || data.cmd?.getDescription?.() || actionType;

      return [
        {
          actionType,
          options: {
            triggerType: LogTriggerType.START,
            notSend: true,
            enableNotes: false,
          },
          params: {
            description,
            group: actionType,
            groupName: description,
          },
        },
      ];
    },
  },

  /**
   * 命令终止监听器
   * 在命令终止时记录结束日志
   */
  {
    getListenSignal: (context: ListenerContext) => {
      return context.cmdManager.signalCommandTerminated;
    },

    listen: (event: ListenEventData): LogItem[] | undefined => {
      const data = event.data;
      const app = HSApp.App.getApp();
      const commandType = data?.cmd?.type;

      if (!CommandTypes[commandType]) {
        return undefined;
      }

      let actionType = '';
      let description = '';

      const commandTypeDef = CommandTypes[commandType] as CommandTypeDefinition;

      if (commandTypeDef instanceof Object && commandTypeDef?.getParams) {
        const params = commandTypeDef.getParams(app, data);
        const { actionType: paramActionType, description: paramDescription, notUseful } = params;

        if (notUseful) {
          return undefined;
        }

        actionType = paramActionType || '';
        description = paramDescription || '';
      }

      actionType = actionType || commandType;
      description = description || data.cmd?.getDescription?.() || actionType;

      return [
        {
          actionType,
          options: {
            triggerType: LogTriggerType.END,
          },
          params: {
            description,
            status: (data as any).status,
            group: actionType,
            groupName: description,
          },
        },
      ];
    },
  },
];

export default commandListeners;