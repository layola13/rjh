/**
 * 模型处理器基类
 * 用于处理模型状态变更和用户交互
 * @module ModelHandle
 */

/**
 * 状态变更请求接口
 */
export interface ChangeToRequest {
  /** 目标状态标识 */
  to: string;
  /** 其他变更参数 */
  [key: string]: unknown;
}

/**
 * 状态变更响应接口
 */
export interface ChangeToResponse {
  /** 变更后的状态：keep保持当前状态，或其他自定义状态 */
  state: 'keep' | string;
  /** 其他响应数据 */
  [key: string]: unknown;
}

/**
 * 状态变更处理函数类型
 */
export type ChangeToHandler = (request: ChangeToRequest) => Promise<ChangeToResponse>;

/**
 * 状态变更映射表类型
 */
export type ChangeToMap = Record<string, ChangeToHandler>;

/**
 * 初始化结果接口
 */
export interface InitResult {
  /** 是否取消初始化 */
  cancel: boolean;
  /** 其他初始化结果数据 */
  [key: string]: unknown;
}

/**
 * 用户变更事件接口
 */
export interface UserChangeEvent {
  /** 事件类型或其他用户变更数据 */
  [key: string]: unknown;
}

/**
 * 模型处理器类
 * 负责管理模型状态、心跳检测和状态变更逻辑
 */
export declare class ModelHandle {
  /**
   * 心跳状态标识
   * 指示当前是否处于心跳检测状态
   */
  isHeartbeat: boolean;

  /**
   * 锁定状态标识
   * 用于防止并发操作冲突
   */
  lock: boolean;

  /**
   * 状态变更映射表
   * 存储不同目标状态对应的处理函数
   */
  map: ChangeToMap;

  /**
   * 是否忽略心跳检测
   */
  ignoreHeartbeat: boolean;

  /**
   * 构造函数
   * 初始化模型处理器实例
   */
  constructor();

  /**
   * 初始化状态变更映射表
   * 子类应重写此方法以定义具体的状态变更逻辑
   * @returns 状态变更映射表
   */
  initChangeToMap(): ChangeToMap;

  /**
   * 执行状态变更
   * 根据请求中的目标状态查找对应处理函数并执行
   * @param request - 状态变更请求
   * @returns Promise，解析为状态变更响应
   */
  changeTo(request: ChangeToRequest): Promise<ChangeToResponse>;

  /**
   * 处理用户变更事件
   * 子类可重写此方法以实现自定义逻辑
   * @param event - 用户变更事件
   */
  onUserChange(event: UserChangeEvent): void;

  /**
   * 初始化模型处理器
   * @param param1 - 第一个初始化参数
   * @param param2 - 第二个初始化参数
   * @returns 初始化结果
   */
  init(param1: unknown, param2: unknown): InitResult;
}