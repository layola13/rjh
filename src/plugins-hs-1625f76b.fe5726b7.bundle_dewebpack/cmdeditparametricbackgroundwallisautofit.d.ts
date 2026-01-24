/**
 * 参数化背景墙自动适配编辑命令
 * 用于控制参数化背景墙是否启用自动适配功能
 */

/**
 * 目标面信息接口
 */
interface TargetFaceInfo {
  /** 外部面标识 */
  outer?: boolean;
  // 其他面信息属性...
}

/**
 * 参数化背景墙参数接口
 */
interface ParametricBackgroundWallParameters {
  /** 目标面信息 */
  targetFaceInfo?: TargetFaceInfo;
  // 其他参数...
}

/**
 * 参数化背景墙内容接口
 */
interface ParametricBackgroundWallContent {
  /** 背景墙参数配置 */
  parameters: ParametricBackgroundWallParameters;
  
  /**
   * 检查尺寸是否在目标面信息范围内
   * @param faceInfo - 目标面信息
   * @returns 是否在范围内
   */
  isSizeInRangeByTargetFaceInfo(faceInfo: TargetFaceInfo): boolean;
}

/**
 * 事务请求接口
 */
interface TransactionRequest {
  // 请求相关属性...
}

/**
 * 事务管理器接口
 */
interface TransactionManager {
  /**
   * 创建请求
   * @param requestType - 请求类型
   * @param args - 请求参数
   * @returns 事务请求对象
   */
  createRequest(requestType: string, args: unknown[]): TransactionRequest;
  
  /**
   * 提交请求
   * @param request - 事务请求
   */
  commit(request: TransactionRequest): void;
}

/**
 * 命令上下文接口
 */
interface CommandContext {
  /** 事务管理器 */
  transManager: TransactionManager;
}

/**
 * 设计元数据接口
 */
interface DesignMetadata {
  /**
   * 获取元数据值
   * @param key - 元数据键名
   * @returns 元数据值
   */
  get(key: string): unknown;
}

/**
 * 应用实例接口
 */
interface AppInstance {
  /** 设计元数据 */
  designMetadata: DesignMetadata;
}

/**
 * 命令基类
 */
declare abstract class Command {
  /** 命令执行上下文 */
  protected context: CommandContext;
  
  /**
   * 执行完成回调
   */
  abstract onComplete(): void;
  
  /**
   * 执行命令
   */
  abstract onExecute(): void;
  
  /**
   * 获取命令描述
   */
  abstract getDescription(): string;
  
  /**
   * 获取命令分类
   */
  abstract getCategory(): string;
}

/**
 * 参数化背景墙自动适配编辑命令类
 * 
 * 用于控制参数化背景墙的自动适配状态，当启用自动适配时，
 * 会根据目标面信息自动调整背景墙尺寸，并在超出限制时显示提示
 */
export declare class CmdEditParametricBackgroundWallIsAutoFit extends Command {
  /** 背景墙内容对象 */
  private _content: ParametricBackgroundWallContent;
  
  /** 事务请求对象 */
  private _request: TransactionRequest | undefined;
  
  /** 是否启用自动适配 */
  private _isAutoFit: boolean;
  
  /**
   * 构造函数
   * @param content - 参数化背景墙内容
   * @param isAutoFit - 是否启用自动适配
   */
  constructor(content: ParametricBackgroundWallContent, isAutoFit: boolean);
  
  /**
   * 提交事务请求
   * 如果存在待提交的请求，则通过事务管理器提交
   * @private
   */
  private _commitRequest(): void;
  
  /**
   * 命令执行完成时的回调
   * 提交请求并调用父类完成逻辑
   */
  onComplete(): void;
  
  /**
   * 执行命令
   * 创建编辑参数化背景墙自动适配状态的请求
   * 如果启用自动适配，则检查目标面信息并显示限制提示
   */
  onExecute(): void;
  
  /**
   * 显示尺寸限制提示
   * 当尺寸超出目标面范围且未解锁尺寸限制时，显示警告提示
   * @param faceInfo - 目标面信息
   * @private
   */
  private _showLimitTip(faceInfo: TargetFaceInfo): void;
  
  /**
   * 获取命令描述
   * @returns 命令描述文本
   */
  getDescription(): string;
  
  /**
   * 获取命令分类
   * @returns 命令所属分类（参数化背景墙）
   */
  getCategory(): string;
}