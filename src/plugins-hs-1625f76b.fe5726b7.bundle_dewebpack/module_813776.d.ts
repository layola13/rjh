/**
 * 3D模型尺寸调整命令模块
 * @module ResizeCommand
 */

import type { HSCore } from './HSCore';
import type { HSApp } from './HSApp';
import type { HSFPConstants } from './HSFPConstants';

/**
 * 三维坐标尺寸接口
 */
interface Size3D {
  /** X轴尺寸（长度） */
  x: number;
  /** Y轴尺寸（宽度） */
  y: number;
  /** Z轴尺寸（高度） */
  z: number;
}

/**
 * 完整的模型位置和尺寸信息
 */
interface ModelSizeInfo extends Size3D {
  /** X轴位置坐标 */
  xposition: number;
  /** Y轴位置坐标 */
  yposition: number;
  /** Z轴位置坐标 */
  zposition: number;
}

/**
 * 尺寸调整类型
 */
type ResizeType = 'x' | 'y' | 'z';

/**
 * 拖拽事件数据
 */
interface SliderDragData {
  /** 调整的目标值 */
  value: number;
  /** 调整的维度类型 */
  type: ResizeType;
}

/**
 * 事务会话接口
 */
interface TransactionSession {
  /** 提交会话中的所有更改 */
  commit(): void;
  /** 中止会话，回滚所有更改 */
  abort(): void;
}

/**
 * 事务管理器接口
 */
interface TransactionManager {
  /**
   * 启动新的事务会话
   * @param options - 会话选项
   * @returns 会话实例
   */
  startSession(options: { undoRedo: boolean }): TransactionSession;
  
  /**
   * 创建请求对象
   * @param requestType - 请求类型
   * @param params - 请求参数数组
   * @returns 请求对象
   */
  createRequest(requestType: string, params: unknown[]): unknown;
  
  /**
   * 提交请求
   * @param request - 请求对象
   * @param mergePrevious - 是否与前一个请求合并
   */
  commit(request: unknown, mergePrevious?: boolean): void;
}

/**
 * 命令执行上下文
 */
interface CommandContext {
  /** 事务管理器 */
  transManager: TransactionManager;
}

/**
 * 命令管理器接口
 */
interface CommandManager {
  /**
   * 完成命令执行
   * @param command - 要完成的命令
   */
  complete(command: ResizeCommand): void;
}

/**
 * 内容模型联合类型
 */
type ContentModel = 
  | HSCore.Model.Content
  | HSCore.Model.CustomizedModel
  | HSCore.Model.SoftCloth
  | HSCore.Model.CustomizedPMInstanceModel
  | HSCore.Model.Opening
  | HSCore.Model.NCustomizedStructure
  | HSCore.Model.NCustomizedBeam
  | HSCore.Model.NCustomizedParametricModel
  | HSCore.Model.NCustomizedParametricStairs
  | HSCore.Model.NCPBackgroundWallBase;

/**
 * 请求创建器函数类型
 */
type RequestCreator = (model: ContentModel) => unknown;

/**
 * 剪切任务集成单例
 */
interface ClipTaskIntegration {
  /** 监听剪切任务信号 */
  listenClipTaskSignal(): void;
  
  /**
   * 延迟运行剪切任务
   * @param task - 要执行的任务函数
   * @param showUI - 是否显示UI
   */
  runClipTaskDefer(task: () => void, showUI: boolean): void;
  
  /**
   * 判断是否需要显示UI
   * @param model - 模型实例
   * @returns 是否需要显示UI
   */
  isNeedShowUI(model: ContentModel): boolean;
  
  /** 获取单例实例 */
  getInstance(): ClipTaskIntegration;
}

/**
 * 3D模型尺寸调整命令类
 * 
 * 负责处理3D模型的尺寸调整操作，支持实时预览和撤销/重做功能。
 * 可以调整模型的长度(x)、宽度(y)、高度(z)三个维度。
 * 
 * @extends HSApp.Cmd.Command
 */
export default class ResizeCommand extends HSApp.Cmd.Command {
  /**
   * 要调整尺寸的内容模型数组
   * @private
   */
  private _contents?: ContentModel[];
  
  /**
   * 目标尺寸（可能只包含部分维度）
   * @private
   */
  private _targetSize?: Partial<Size3D>;
  
  /**
   * 请求创建器函数
   * @private
   */
  private _requestCreator?: RequestCreator;
  
  /**
   * 命令输出结果
   */
  output: ContentModel[] | undefined;
  
  /**
   * 是否与前一个操作合并
   */
  isMergePervious: boolean;
  
  /**
   * 当前调整的尺寸类型
   * @private
   */
  private _resizeType: ResizeType | null;
  
  /**
   * 记录初始尺寸的映射表
   * @private
   */
  private beginSizes?: Map<string, ModelSizeInfo>;
  
  /**
   * 当前事务会话
   * @private
   */
  private _session?: TransactionSession;
  
  /**
   * 构造函数
   * 
   * @param contents - 要调整尺寸的模型数组
   * @param targetSize - 目标尺寸（可选）
   * @param requestCreator - 请求创建器函数
   * @param mergePrevious - 是否与前一个操作合并，默认为true
   */
  constructor(
    contents: ContentModel[],
    targetSize: Partial<Size3D> | null,
    requestCreator: RequestCreator,
    mergePrevious?: boolean
  );
  
  /**
   * 获取并保存所有模型的初始尺寸
   * 
   * @param contents - 内容模型数组
   * @private
   */
  private _getBeginSize(contents: ContentModel[]): void;
  
  /**
   * 执行尺寸调整操作
   * 
   * 遍历所有模型，计算新的尺寸和偏移量，并提交调整请求。
   * 对于特定类型的模型会执行额外的处理逻辑。
   * 
   * @param transManager - 事务管理器
   * @private
   */
  private _doResize(transManager: TransactionManager): void;
  
  /**
   * 命令执行入口
   * 
   * 启动事务会话，根据是否有目标尺寸决定执行调整或恢复操作。
   */
  onExecute(): void;
  
  /**
   * 是否支持撤销/重做
   * 
   * @returns 始终返回false，此命令不支持撤销重做
   */
  canUndoRedo(): boolean;
  
  /**
   * 清理命令资源
   * 
   * 中止未完成的会话并清空所有引用。
   */
  onCleanup(): void;
  
  /**
   * 命令完成时的回调
   * 
   * 提交会话并重建需要更新的模型结构。
   */
  onComplete(): void;
  
  /**
   * 接收外部事件的处理器
   * 
   * @param eventType - 事件类型（"sliderdragmove" | "sliderdragend"）
   * @param data - 事件数据
   */
  onReceive(eventType: 'sliderdragmove' | 'sliderdragend', data?: SliderDragData): void;
  
  /**
   * 获取命令的描述文本
   * 
   * 根据当前调整的维度类型返回相应的中文描述。
   * 
   * @returns 命令描述字符串（例如："编辑模型长度"）
   */
  getDescription(): string;
  
  /**
   * 调整参数化模型的尺寸
   * 
   * 对于参数化模型，需要特殊处理以保持其参数约束。
   * 背景墙类型的模型会触发剪切任务集成。
   * 
   * @param data - 拖拽事件数据
   * @private
   */
  private resizeParametricModel(data?: SliderDragData): void;
  
  /**
   * 获取命令所属的日志分类
   * 
   * @returns 日志分组类型
   */
  getCategory(): string;
}

/**
 * 工具函数：计算目标尺寸
 * 
 * @param model - 模型实例
 * @param targetSize - 目标尺寸
 * @returns 完整的三维尺寸对象
 */
export function getTargetSize(model: ContentModel, targetSize: Partial<Size3D>): Size3D;

/**
 * 工具函数：计算偏移量以保持吸附关系
 * 
 * 在调整尺寸时，计算需要的位置偏移量以保持模型与其他对象的吸附关系。
 * 
 * @param model - 模型实例
 * @param targetSize - 目标尺寸
 * @returns 三维偏移量
 */
export function calculateOffsetToKeepSnap(model: ContentModel, targetSize: Size3D): Size3D;