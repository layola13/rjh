/**
 * 样板间日志追踪模块
 * 用于记录样板间应用和创建操作的日志数据
 */

import { createLogData } from './module_858122';
import { HSCatalog } from './module_635589';

/**
 * 触发类型
 */
type TriggerType = 'start' | 'end' | 'restore';

/**
 * 操作状态
 */
type OperationStatus = 'success' | 'fail' | 'cancel';

/**
 * 应用内容类型
 */
type ApplyContentType = 'restore' | string;

/**
 * 创建模式
 */
type CreateMode = 'both' | 'onlyWhole' | 'onlySingle';

/**
 * 样板间应用参数
 */
interface TemplateApplyParams {
  /** 触发类型，默认为 "start" */
  triggerType?: TriggerType;
  /** 样板间设计ID，默认为空字符串 */
  templateDesignId?: string;
  /** 是否为帮我设计功能 */
  isHelpDesign?: boolean;
  /** 应用内容类型 */
  applyContentType?: ApplyContentType;
  /** 是否全屋设计，默认为 true */
  isWholeHouse?: boolean;
  /** 目标房间类型，默认为空字符串 */
  targetRoomType?: string;
  /** 目标房间ID，默认为空字符串 */
  targetRoomId?: string;
  /** 样板间房间类型，默认为空字符串 */
  templateRoomType?: string;
  /** 样板间房间ID，默认为空字符串 */
  templateRoomId?: string;
  /** 操作状态 */
  status?: OperationStatus;
  /** 是否使用约束布局 */
  useConstraintLayout?: boolean;
}

/**
 * 样板间创建触发参数
 */
interface TemplateCreateTriggerParams {
  /** 触发类型 */
  triggerType: TriggerType;
  /** 操作状态 */
  status?: OperationStatus;
  /** 查询结果 */
  queryResult?: Array<{
    ret?: string[];
    data?: {
      result?: string;
    };
  }>;
  /** 原始数据 */
  originData?: Array<{
    roomCount?: number;
  }>;
}

/**
 * 样板间创建日志参数
 */
interface TemplateCreateLogParams {
  /** 触发类型 */
  triggerType: TriggerType;
  /** 创建模式 */
  createMode?: CreateMode;
  /** 全屋设计ID */
  wholeDesignId?: string;
  /** 单个房间设计ID列表 */
  singleRoomDesignIds?: string[];
  /** 操作状态 */
  status?: OperationStatus;
}

/**
 * 日志数据参数信息
 */
interface LogArgInfo {
  /** 入口类型：帮我设计 或 目录 */
  entryType?: string;
  /** 是否全屋设计 */
  isWholeHouse?: boolean;
  /** 目标房间类型 */
  targetRoomType?: string;
  /** 目标房间ID */
  targetRoomId?: string;
  /** 样板间房间ID */
  templateRoomId?: string;
  /** 样板间房间类型 */
  templateRoomType?: string;
  /** 是否使用约束布局 */
  useConstraintLayout?: boolean;
  /** 全屋设计ID */
  wholeDesignId?: string;
  /** 单个房间设计ID列表 */
  singleRoomDesignIds?: string[];
}

/**
 * 日志数据结构
 */
interface LogData {
  /** 日志描述 */
  description: string;
  /** 参数信息 */
  argInfo?: LogArgInfo;
  /** 日志分组类型 */
  group: string;
  /** 内容类型 */
  type?: string;
  /** 样板间设计ID */
  templateDesignId?: string;
  /** 是否为有效操作 */
  validOperation?: boolean;
}

/**
 * 还原操作数据
 */
interface RestoreOperationData {
  /** 追踪日志相关数据 */
  trackLoggerRelativeData: {
    /** 样板间设计数据 */
    templateDesignData: {
      /** 设计ID */
      id: string;
      /** 自定义房间 */
      customizedRoom?: {
        roomId: string;
        roomType: string;
      };
      /** 内容类型 */
      contentType: {
        isTypeOf(type: unknown): boolean;
      };
    };
    /** 是否为帮我设计 */
    isHelpDesign: boolean;
  };
  /** 目标房间 */
  targetRoom?: {
    id: string;
    roomType: string;
  };
  /** 额外数据 */
  extraData?: {
    useConstraintLayout?: boolean;
  };
}

/**
 * 应用操作数据
 */
interface ApplyOperationData {
  /** 触发类型 */
  triggerType: TriggerType;
  /** 样板间模板 */
  stylerTemplate: {
    id: string;
    apply: string;
    customizedRoom?: {
      roomId: string;
      roomType: string;
    };
  };
  /** 目标房间 */
  targetRoom?: {
    id: string;
    roomType: string;
  };
  /** 是否为帮我设计 */
  isHelpDesign: boolean;
  /** 是否全屋设计 */
  isWholeHouse: boolean;
  /** 操作状态 */
  status: OperationStatus;
}

/**
 * 日志事件数据
 */
interface LogEventData {
  /** 日志类型 */
  logType: 'apply' | 'create';
  /** 具体数据 */
  data: RestoreOperationData | ApplyOperationData | TemplateCreateTriggerParams;
}

/**
 * 监听器配置
 */
interface ListenerConfig {
  /**
   * 获取监听信号
   * @returns 样板间日志信号对象
   */
  getListenSignal(): unknown;
  
  /**
   * 监听日志事件
   * @param event - 包含日志数据的事件对象
   * @returns 创建的日志数据数组
   */
  listen(event: { data: LogEventData }): ReturnType<typeof createLogData>[] | undefined;
}

/**
 * 创建样板间应用日志数据
 * @param params - 应用参数
 * @returns 日志数据数组
 */
declare function createTemplateApplyLog(params: TemplateApplyParams): ReturnType<typeof createLogData>[];

/**
 * 创建样板间创建日志数据
 * @param params - 创建参数
 * @returns 日志数据数组
 */
declare function createTemplateCreateLog(params: TemplateCreateTriggerParams): ReturnType<typeof createLogData>[];

/**
 * 样板间日志监听器配置数组
 * 导出默认配置，用于监听和记录样板间相关操作
 */
declare const templateDesignLogListeners: ListenerConfig[];

export default templateDesignLogListeners;