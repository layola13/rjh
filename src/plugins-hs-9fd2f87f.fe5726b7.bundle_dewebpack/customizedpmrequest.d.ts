/**
 * 定制化PM请求模块
 * 用于处理DIY（Do It Yourself）定制化建模请求的事务类
 */

import { HSCore } from './path/to/HSCore';
import { MessageHandler } from './path/to/MessageHandler';
import { DIYUtils } from './path/to/DIYUtils';

/**
 * DIY建模参数接口
 */
interface CustomizedPMParams {
  /** 根模型对象 */
  rootModel: unknown;
  /** 建模主机配置 */
  modelingHost: unknown;
  /** 建模数据 */
  modelingData: ModelingData;
}

/**
 * 建模数据接口
 */
interface ModelingData {
  /** 操作日志 */
  logs: unknown[];
  /** WebCAD文档数据 */
  webCADDocument?: unknown;
  /** 实例元数据集合 */
  instanceMetas?: unknown[];
}

/**
 * DIY测试结果接口
 */
interface DIYTestResult {
  /** 测试是否成功 */
  success: boolean;
  /** 新生成的文件内容（JSON字符串） */
  newFile?: string;
}

/**
 * 测试完成信号数据接口
 */
interface TestFinishSignalData {
  /** 测试结果数据 */
  data: DIYTestResult;
}

/**
 * DIY结果数据接口
 */
interface DIYResultData {
  /** WebCAD文档 */
  webCADDocument: unknown;
  /** 实例元数据 */
  instanceMetas: unknown[];
  /** Pave ID生成器同步ID */
  paveId: number;
}

/**
 * 定制化PM请求类
 * 继承自HSCore的状态请求基类，用于处理定制化建模的预创建和后创建流程
 */
export declare class CustomizedPMRequest extends HSCore.Transaction.Common.StateRequest {
  /** DIY操作成功时的Promise resolve函数 */
  private static _diyResolve?: (value: string) => void;
  
  /** DIY操作失败时的Promise reject函数 */
  private static _diyReject?: (reason: string) => void;

  /**
   * 构造函数
   */
  constructor();

  /**
   * 预创建钩子方法
   * 在状态创建前执行DIY建模测试流程
   * 
   * @param t - 事务上下文参数
   * @param n - 建模配置参数
   * @returns Promise，在DIY测试完成后resolve
   */
  static preCreate(t: unknown, n: unknown): Promise<void>;

  /**
   * 后创建钩子方法
   * 在状态创建后清理DIY环境和事件监听
   * 
   * @returns Promise，在清理完成后resolve
   */
  static postCreate(): Promise<void>;

  /**
   * 获取DIY测试结果的内部回调方法
   * 由MessageHandler的signalTestFinish信号触发
   * 
   * @param signalData - 测试完成信号携带的数据
   * @returns Promise，处理测试结果
   * @private
   */
  private static _getDIYResult(signalData: TestFinishSignalData): Promise<void>;
}