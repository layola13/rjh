/**
 * 产品添加命令 - 负责在场景中添加、删除和恢复产品
 * 支持产品层次结构和软布料特殊处理
 */

import type { HSCatalog } from '635589';

/**
 * 三维位置坐标
 */
export interface Position3D {
  x: number;
  y: number;
  z: number;
}

/**
 * 三维旋转角度（欧拉角）
 */
export interface Rotation3D {
  x: number;
  y: number;
  z: number;
}

/**
 * 三维缩放比例
 */
export interface Scale3D {
  XScale: number;
  YScale: number;
  ZScale: number;
}

/**
 * 算法数据 - 描述产品放置的位置、旋转和缩放
 */
export interface AlgorithmData {
  /** 产品ID */
  id: string;
  /** 位置坐标 [x, y, z] */
  position: [number, number, number];
  /** 旋转角度 [x, y, z] */
  rotation: [number, number, number];
  /** 缩放比例 [x, y, z] */
  scale: [number, number, number];
  /** 子产品列表 */
  sub_list?: AlgorithmData[];
  /** 软布料数据（仅用于软布料类型） */
  softClothData?: SoftClothData;
}

/**
 * 软布料特定数据
 */
export interface SoftClothData {
  /** 元数据 */
  meta?: unknown;
  /** 宿主对象 */
  host?: unknown;
}

/**
 * 产品数据映射表
 * @key 产品ID
 * @value 产品实例
 */
export type ProductDataMap = Record<string, unknown>;

/**
 * 事务管理器接口
 */
export interface TransactionManager {
  /**
   * 创建事务请求
   * @param requestType 请求类型
   * @param params 请求参数
   */
  createRequest(requestType: string, params: unknown[]): TransactionRequest;
  
  /**
   * 提交事务请求
   * @param request 请求对象
   * @param merge 是否合并到前一个请求
   */
  commit(request: TransactionRequest, merge?: boolean): void;
  
  /**
   * 开始事务会话
   */
  startSession(): TransactionSession;
}

/**
 * 事务请求接口
 */
export interface TransactionRequest {
  /** 请求结果 */
  result: ProductContent;
}

/**
 * 事务会话接口
 */
export interface TransactionSession {
  /**
   * 提交会话
   */
  commit(): void;
}

/**
 * 产品内容对象
 */
export interface ProductContent {
  /** 内容类型 */
  contentType: {
    /**
     * 检查是否为指定类型
     * @param type 类型枚举值
     */
    isTypeOf(type: unknown): boolean;
  };
}

/**
 * 命令执行上下文
 */
export interface CommandContext {
  /** 事务管理器 */
  transManager: TransactionManager;
}

/**
 * 命令管理器接口
 */
export interface CommandManager {
  /**
   * 标记命令完成
   * @param command 命令实例
   */
  complete(command: unknown): void;
}

/**
 * 命令基类
 */
export declare class Command {
  /** 命令执行上下文 */
  protected context: CommandContext;
  
  /** 命令管理器 */
  protected mgr: CommandManager;
  
  /** 命令输出结果 */
  protected output?: ProductContent[];
  
  /**
   * 执行命令
   */
  onExecute(): ProductContent[];
}

/**
 * 产品添加命令类
 * 
 * 职责：
 * - 根据算法数据批量添加产品到场景
 * - 删除指定的旧产品（清理）
 * - 支持产品层次结构（父子关系）
 * - 处理软布料类型的特殊逻辑
 * - 支持恢复模式（仅删除，不添加）
 * 
 * @example
 *