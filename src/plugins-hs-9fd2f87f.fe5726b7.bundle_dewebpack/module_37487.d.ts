/**
 * 自定义模型灯带编辑命令
 * 用于处理3D模型中灯带组件的参数编辑操作
 */

/**
 * 灯带参数接口
 */
export interface LightBandParameters {
  /** 是否翻转 */
  flip: boolean;
  /** X轴偏移量 */
  offsetX: number;
  /** Y轴偏移量 */
  offsetY: number;
  /** 宽度 */
  width: number;
  /** 高度 */
  height: number;
}

/**
 * 灯带元数据接口
 */
export interface LightBandMetadata {
  /** 参数数据 */
  parameters: LightBandParameters;
  /** 路径数据 */
  path: unknown;
  /** 错误码,正常为-1 */
  error: number;
}

/**
 * 灯带实体接口
 */
export interface LightBandEntity {
  /** 获取灯带参数 */
  getParameters(): LightBandMetadata;
  
  /** 更新元数据 */
  updateMetadata(metadata: unknown, shouldUpdate: boolean): void;
  
  /** 获取唯一父对象 */
  getUniqueParent(): WebCADParent | null;
  
  /** 灯带选项 */
  options: unknown;
}

/**
 * WebCAD文档接口
 */
export interface WebCADDocument {
  /** 是否处于快速计算中 */
  isDuringFastComputation: boolean;
}

/**
 * WebCAD父对象接口
 */
export interface WebCADParent {
  /** 关联的WebCAD文档 */
  webCADDocument: WebCADDocument;
}

/**
 * 内容管理器接口
 */
export interface ContentManager {
  /** 根据ID获取灯带实体 */
  getLightBandEntityById(lightBandId: string): LightBandEntity;
}

/**
 * 事务请求接口
 */
export interface TransactionRequest {
  /** 请求类型 */
  type: string;
  /** 请求参数 */
  args: unknown[];
}

/**
 * 事务管理器接口
 */
export interface TransactionManager {
  /** 创建请求 */
  createRequest(requestType: string, args: unknown[]): TransactionRequest;
  
  /** 提交请求 */
  commit(request: TransactionRequest): void;
}

/**
 * 命令上下文接口
 */
export interface CommandContext {
  /** 事务管理器 */
  transManager: TransactionManager;
}

/**
 * 基础命令抽象类
 */
export declare abstract class Command {
  /** 命令上下文 */
  protected context: CommandContext;
  
  /** 执行命令 */
  abstract onExecute(): void;
  
  /** 接收消息 */
  abstract onReceive(event: string, data: unknown): boolean;
}

/**
 * 参数变更数据接口
 */
export interface ParameterChangeData {
  /** 是否翻转 */
  flip?: boolean;
  /** X轴偏移量 */
  offsetX?: number;
  /** Y轴偏移量 */
  offsetY?: number;
  /** 宽度 */
  width?: number;
  /** 高度 */
  height?: number;
}

/**
 * 参数变更事件类型
 */
export type ParameterChangeEvent = 
  | 'flip'
  | 'parameterchangebegin'
  | 'parameterchanging'
  | 'parameterchangeend';

/**
 * 编辑自定义模型灯带命令类
 * 继承自基础命令类,实现灯带参数的实时编辑和事务管理
 */
export default class EditCustomizedModelLightBandCommand extends Command {
  /** 内容管理器实例 */
  private readonly _content: ContentManager;
  
  /** 灯带唯一标识符 */
  private readonly _lightBandId: string;
  
  /** 请求类型常量 */
  private readonly _requestType: string;
  
  /** 当前事务请求 */
  private _request: TransactionRequest | undefined;
  
  /**
   * 构造函数
   * @param content - 内容管理器实例
   * @param lightBandId - 灯带唯一标识符
   */
  constructor(content: ContentManager, lightBandId: string);
  
  /**
   * 提交当前事务请求
   * 将待处理的编辑操作提交到事务管理器
   */
  private _commitRequest(): void;
  
  /**
   * 执行命令
   * 命令的主要执行逻辑(当前为空实现)
   */
  onExecute(): void;
  
  /**
   * 修改灯带参数
   * @param changeData - 要修改的参数数据
   * @param changeType - 变更类型('flip' | 'parameterchangebegin' | 'parameterchanging' | 'parameterchangeend')
   * @description
   * - 支持flip翻转、offsetX/offsetY偏移、width/height尺寸等参数修改
   * - 根据changeType决定是否触发模型重新计算
   * - 使用阈值判断避免频繁更新(宽度阈值1.4,高度阈值0.8)
   */
  changeParameters(
    changeData: ParameterChangeData,
    changeType: ParameterChangeEvent
  ): void;
  
  /**
   * 接收并处理参数变更事件
   * @param event - 事件类型
   * @param data - 事件数据
   * @returns 是否成功处理事件
   * 
   * @description
   * 事件处理流程:
   * - 'flip': 立即创建并提交翻转请求
   * - 'parameterchangebegin': 创建事务请求但不提交
   * - 'parameterchanging': 实时修改参数(快速计算模式)
   * - 'parameterchangeend': 修改参数并提交事务
   */
  onReceive(event: ParameterChangeEvent, data: ParameterChangeData): boolean;
}

/**
 * HSFPConstants 命名空间
 */
declare namespace HSFPConstants {
  enum RequestType {
    /** 编辑自定义模型灯带请求类型 */
    EditCustomizedModelLightBand = 'EditCustomizedModelLightBand'
  }
}

/**
 * HSCore.Model.CustomizedModelLightBand 命名空间
 */
declare namespace HSCore.Model.CustomizedModelLightBand {
  /**
   * 构造灯带元数据
   * @param path - 路径数据
   * @param parameters - 参数对象
   * @param options - 选项配置
   * @returns 构造的元数据对象
   */
  function constructMetaData(
    path: unknown,
    parameters: LightBandParameters,
    options: unknown
  ): unknown;
}

/**
 * GeLib.MathUtils 数学工具类
 */
declare namespace GeLib.MathUtils {
  /**
   * 比较两个数值是否大于等于(带容差)
   * @param value - 待比较的值
   * @param threshold - 阈值
   * @param tolerance - 容差值
   * @returns 是否大于等于阈值
   */
  function largerOrEqual(
    value: number,
    threshold: number,
    tolerance: number
  ): boolean;
}