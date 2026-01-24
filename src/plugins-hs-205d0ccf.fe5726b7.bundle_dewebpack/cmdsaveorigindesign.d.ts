/**
 * 保存原始户型设计命令模块
 * 提供将当前设计保存为原始户型的功能
 */

/**
 * 命令名称常量
 */
export const CmdSaveOriginDesignName = "hsw.plugin.spacerebuild.cmdsavedesign";

/**
 * 设计数据保存选项
 */
interface DesignSaveOptions {
  /** 是否忽略混合绘制纹理URI */
  ignoreMixPaintTextureURI: boolean;
  /** 是否忽略底图 */
  ignoreUnderlay: boolean;
  /** 是否加密 */
  encrypt: boolean;
}

/**
 * 错误日志信息
 */
interface ErrorLogInfo {
  /** 错误信息 */
  info: unknown;
  /** 错误路径信息 */
  path: {
    /** 文件路径 */
    file: string;
    /** 函数名称 */
    functionName: string;
  };
}

/**
 * 错误日志参数
 */
interface ErrorLogParams {
  /** 错误堆栈 */
  errorStack: Error;
  /** 错误描述 */
  description: string;
  /** 详细错误信息 */
  errorInfo: ErrorLogInfo;
}

/**
 * 业务错误信息
 */
interface BusinessError {
  error?: {
    error?: string;
  };
}

/**
 * 提示状态枚举
 */
declare enum LiveHintStatus {
  loading = "loading",
  completed = "completed",
  warning = "warning"
}

/**
 * 提示选项
 */
interface LiveHintOptions {
  /** 提示状态 */
  status: LiveHintStatus | string;
}

/**
 * 事件追踪参数
 */
interface EventTrackParams {
  /** 设计ID */
  designId: string;
}

/**
 * 保存原始户型设计命令
 * 继承自HSApp命令基类，用于保存当前设计为原始户型布局
 */
export declare class CmdSaveOriginDesign extends HSApp.Cmd.Command {
  /** 应用实例引用 */
  private _app: HSApp.App;

  /**
   * 构造函数
   * 初始化命令并获取应用实例
   */
  constructor();

  /**
   * 导出当前设计数据
   * 将当前户型设计序列化为JSON格式
   * @returns 设计数据的JSON字符串，出错时返回undefined
   * @private
   */
  private _dumpCurrentDesign(): string | undefined;

  /**
   * 执行命令
   * 异步保存原始户型设计，包含错误处理和事件追踪
   * @returns Promise，命令执行完成后resolve
   */
  onExecute(): Promise<void>;

  /**
   * 显示实时提示信息
   * 根据不同状态显示相应的提示消息
   * @param status - 提示状态（加载中/完成/警告/权限拒绝）
   * @private
   */
  private _showLiveHint(status: LiveHintStatus | "FAIL_BIZ_PERMISSION_DENIED"): void;

  /**
   * 获取命令描述
   * @returns 命令的中文描述
   */
  getDescription(): string;
}

/**
 * 全局声明扩展
 */
declare global {
  namespace HSApp {
    /** 应用程序命名空间 */
    namespace App {
      /** 获取应用实例 */
      function getApp(): App;
    }

    /** 应用实例接口 */
    interface App {
      /** 户型平面图管理器 */
      floorplan: {
        /** 设计元数据 */
        designMetadata: {
          /** 获取元数据值 */
          get(key: "originalAccessoryAssetId" | "designId"): string;
        };
        /**
         * 保存设计为JSON
         * @param options - 保存选项
         */
        saveToJSON(options: DesignSaveOptions): string;
      };
      /** 错误日志记录器 */
      errorLogger: {
        /**
         * 推送错误日志
         * @param message - 错误消息
         * @param params - 错误参数
         */
        push(message: string, params: ErrorLogParams): void;
      };
    }

    /** 命令命名空间 */
    namespace Cmd {
      /** 命令基类 */
      class Command {
        /** 命令管理器 */
        protected mgr: {
          /** 完成命令执行 */
          complete(cmd: Command): void;
        };
      }
    }

    /** 工具命名空间 */
    namespace Util {
      /** 事件分组枚举 */
      enum EventGroupEnum {
        Toolbar = "Toolbar"
      }

      /** 事件追踪类 */
      class EventTrack {
        /** 获取单例实例 */
        static instance(): EventTrack;
        /**
         * 追踪事件
         * @param group - 事件分组
         * @param action - 事件动作
         * @param params - 事件参数
         */
        track(group: EventGroupEnum, action: string, params: EventTrackParams): void;
      }
    }
  }

  /** 资源管理器 */
  namespace ResourceManager {
    /**
     * 获取本地化字符串
     * @param key - 资源键名
     */
    function getString(key: string): string;
  }

  /** 实时提示 */
  namespace LiveHint {
    /** 状态枚举 */
    const statusEnum: {
      loading: LiveHintStatus.loading;
      completed: LiveHintStatus.completed;
      warning: LiveHintStatus.warning;
    };

    /**
     * 显示提示
     * @param message - 提示消息
     * @param duration - 显示时长（毫秒），undefined表示持续显示
     * @param callback - 回调函数
     * @param options - 提示选项
     */
    function show(
      message: string,
      duration?: number,
      callback?: (() => void) | undefined,
      options?: LiveHintOptions
    ): void;
  }
}