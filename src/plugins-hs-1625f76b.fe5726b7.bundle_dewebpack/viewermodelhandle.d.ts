/**
 * 查看器模型处理器
 * 负责管理文档查看模式下的协作编辑状态和权限控制
 */

import { ModelHandle } from './ModelHandle';
import { SignalHook } from './SignalHook';

/**
 * 初始化配置参数
 */
export interface ViewerModelInitConfig {
  /** 设计文档唯一标识符 */
  designId: string;
}

/**
 * 锁定状态响应
 */
export interface LockStateResponse {
  /** 管理员名称或管理员列表 */
  management?: string;
}

/**
 * 模态对话框配置
 */
export interface ModelChangeConfig {
  /** 对话框标题 */
  title: string;
  /** 对话框内容 */
  content: string;
  /** 确认按钮文本 */
  okButtonContent: string;
}

/**
 * 提示状态枚举
 */
export enum LiveHintStatus {
  /** 可操作状态 */
  canops = 'canops'
}

/**
 * 实时提示选项
 */
export interface LiveHintOptions {
  /** 提示状态 */
  status: LiveHintStatus;
  /** 是否可关闭 */
  canclose: boolean;
}

/**
 * 查看器模型处理类
 * 继承自 ModelHandle，专门处理查看模式下的文档协作逻辑
 * 
 * @remarks
 * 该类负责：
 * - 监听文档打开事件
 * - 处理用户角色变更（从编辑者变为查看者）
 * - 管理文档锁定状态
 * - 展示权限相关提示信息
 */
export declare class ViewerModelHandle extends ModelHandle {
  /**
   * 信号钩子，用于管理事件监听器的生命周期
   */
  signalHook: SignalHook;

  /**
   * 当前文档的设计ID
   */
  designId: string | undefined;

  /**
   * 心跳忽略标志
   * @internal
   */
  isHeartbeat: boolean;

  /**
   * 内部标志，用于暂时忽略心跳检测
   * @private
   */
  private ignoreHeartbeat: boolean | undefined;

  /**
   * 构造函数
   * 初始化信号钩子并绑定事件处理器
   */
  constructor();

  /**
   * 初始化查看器模型
   * 
   * @param config - 初始化配置对象
   * @returns 初始化结果，包含取消标志
   * 
   * @remarks
   * 执行以下操作：
   * 1. 保存设计文档ID
   * 2. 清除所有现有监听器
   * 3. 注册文档打开事件监听器
   * 4. 在文档打开后延迟500ms显示角色转换提示
   */
  init(config: ViewerModelInitConfig): { cancel: boolean };

  /**
   * 用户变更事件处理器
   * 当用户从编辑权限变为查看权限时触发
   * 
   * @param event - 包含设计ID的事件对象
   * 
   * @remarks
   * 处理流程：
   * 1. 设置忽略心跳标志
   * 2. 调用 API 解除文档锁定
   * 3. 获取管理员信息并显示错误提示
   * 4. 重置忽略心跳标志
   */
  onUserChange(event: ViewerModelInitConfig): void;
}

/**
 * 锁定状态管理函数
 * 
 * @param params - 锁定参数
 * @param params.designId - 设计文档ID
 * @param params.lock - 是否锁定（false为解锁）
 * @returns Promise，解析为锁定状态响应
 */
export declare function lockState(params: {
  designId: string;
  lock: boolean;
}): Promise<LockStateResponse>;

/**
 * 调用模态对话框
 * 
 * @param config - 对话框配置
 * @returns Promise，在用户确认后解析
 */
export declare function callModelChange(config: ModelChangeConfig): Promise<void>;

/**
 * 资源管理器
 * 用于获取国际化字符串资源
 */
export declare const ResourceManager: {
  /**
   * 获取本地化字符串
   * 
   * @param key - 字符串资源键
   * @returns 本地化后的字符串
   */
  getString(key: string): string;
};

/**
 * 实时提示工具
 * 用于显示非阻塞式提示信息
 */
export declare const LiveHint: {
  /** 状态枚举 */
  statusEnum: typeof LiveHintStatus;
  
  /**
   * 显示实时提示
   * 
   * @param message - 提示消息
   * @param param2 - 保留参数（未使用）
   * @param param3 - 保留参数（未使用）
   * @param options - 提示选项
   */
  show(
    message: string,
    param2: undefined,
    param3: undefined,
    options: LiveHintOptions
  ): void;
};