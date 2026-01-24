/**
 * 保存流程插件 - 处理设计稿保存过程中的各种状态和错误提示
 * @module SaveProcessPlugin
 */

import { SaveProcessPlugin } from './SaveProcessPlugin';
import { SaveErrorType } from './SaveErrorType';

/**
 * 保存参数配置接口
 */
interface SaveParams {
  /** 是否显示实时提示 */
  showLiveHint: boolean;
  [key: string]: unknown;
}

/**
 * 保存返回数据接口
 */
interface SaveReturnData {
  /** 错误类型 */
  errorType?: SaveErrorType;
  [key: string]: unknown;
}

/**
 * 保存事件数据接口
 */
interface SaveEventData {
  /** 保存参数 */
  saveParams: SaveParams;
  /** 保存返回数据 */
  saveReturnData?: SaveReturnData;
}

/**
 * 保存事件接口
 */
interface SaveEvent {
  /** 事件携带的数据 */
  data?: SaveEventData;
}

/**
 * 保存处理器接口
 */
interface SaveHandler {
  /** 保存开始信号 */
  signalSaveStart: Signal<SaveEvent>;
  /** 保存成功信号 */
  signalSaveSucceeded: Signal<SaveEvent>;
  /** 保存失败信号 */
  signalSaveFailed: Signal<SaveEvent>;
  /** 调用保存方法 */
  callSave(params: SaveParams): void;
}

/**
 * 信号接口（观察者模式）
 */
interface Signal<T> {
  /** 监听信号 */
  listen(callback: (event: T) => void, context: unknown): void;
}

/**
 * 实时提示状态枚举
 */
declare enum LiveHintStatus {
  LOADING = 'LOADING',
  COMPLETE = 'COMPLETE',
  WARNING = 'WARNING'
}

/**
 * 模态框配置接口
 */
interface ModalConfig {
  /** 标题 */
  title: string;
  /** 内容 */
  content: string;
  /** 确定按钮文本 */
  okButtonContent: string;
  /** 是否隐藏取消按钮 */
  hideCancelButton: boolean;
  /** 是否启用复选框 */
  enableCheckbox: boolean;
  /** 确定回调 */
  onOk?: () => void;
}

/**
 * 错误类型处理函数映射
 */
type ErrorTypeExecuteMap = {
  [K in SaveErrorType]?: () => void;
};

/**
 * 插件配置接口
 */
interface PluginConfig {
  /** 保存处理器实例 */
  saveHandler: SaveHandler;
}

/**
 * 默认导出的保存流程插件类
 * 继承自 SaveProcessPlugin，处理保存过程中的各种状态和错误提示
 */
export default class DefaultSaveProcessPlugin extends SaveProcessPlugin {
  /**
   * 错误类型与处理函数的映射表
   * 定义了不同错误类型对应的处理逻辑
   */
  private errorTypeExecute: ErrorTypeExecuteMap;

  /**
   * 保存处理器实例
   * 用于执行实际的保存操作
   */
  private saveHandler: SaveHandler;

  /**
   * 构造函数
   * @param config - 插件配置对象
   */
  constructor(config: PluginConfig);

  /**
   * 保存开始信号处理函数
   * 当保存操作开始时触发，显示加载提示
   * @param event - 保存事件对象
   */
  signalSaveStart(event: SaveEvent): void;

  /**
   * 保存成功信号处理函数
   * 当保存操作成功时触发，显示完成提示
   * @param event - 保存事件对象
   */
  signalSaveSucceeded(event: SaveEvent): void;

  /**
   * 保存失败信号处理函数
   * 当保存操作失败时触发，根据错误类型显示相应提示或执行特定处理
   * @param event - 保存事件对象
   */
  signalSaveFailed(event: SaveEvent): void;
}

/**
 * 全局资源管理器（外部依赖）
 */
declare const ResourceManager: {
  getString(key: string): string;
};

/**
 * 全局实时提示工具（外部依赖）
 */
declare const LiveHint: {
  show(
    message: string,
    duration?: number,
    callback?: () => void,
    options?: { status: string; canclose: boolean }
  ): void;
  hide(): void;
  statusEnum: {
    warning: string;
  };
};

/**
 * 全局应用实例（外部依赖）
 */
declare const HSApp: {
  App: {
    getApp(): {
      pluginManager?: {
        getPlugin?(name: string): {
          showAliXiaomi?(): void;
        };
      };
    } | null;
  };
};