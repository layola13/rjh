/**
 * 曲线移动命令模块
 * 用于屋顶绘图中的曲线移动操作
 * @module CmdMoveCurve
 * @originalId 469759
 */

import { HSApp } from './HSApp';
import { HSFPConstants } from './HSFPConstants';
import { ResourceManager } from './ResourceManager';

/**
 * 事务请求接口
 */
interface TransactionRequest {
  type: string;
  data: unknown;
}

/**
 * 事务管理器接口
 */
interface TransactionManager {
  /**
   * 创建事务请求
   * @param type - 请求类型
   * @param data - 请求数据
   * @returns 事务请求对象
   */
  createRequest(type: string, data: unknown): TransactionRequest;
}

/**
 * 命令上下文接口
 */
interface CommandContext {
  /** 事务管理器 */
  transManager: TransactionManager;
}

/**
 * 基础曲线移动命令类型
 */
type BaseCmdMoveCurve = typeof HSApp.ExtraordinarySketch2d.Cmd.CmdMoveCurve;

/**
 * 屋顶绘图曲线移动命令类
 * 继承自二维草图的曲线移动命令，专门用于屋顶编辑场景
 * @extends HSApp.ExtraordinarySketch2d.Cmd.CmdMoveCurve
 */
export declare class CmdMoveCurve extends HSApp.ExtraordinarySketch2d.Cmd.CmdMoveCurve {
  /** 命令执行上下文 */
  protected context: CommandContext;

  /**
   * 创建屋顶绘图的曲线移动请求
   * @param data - 请求数据
   * @returns 事务请求对象
   * @protected
   */
  protected _createRequest(data: unknown): TransactionRequest;

  /**
   * 获取拓扑无效时的提示信息
   * @returns 本地化的提示文本
   * @protected
   */
  protected _getToposInvalidTip(): string;

  /**
   * 获取命令描述
   * @returns 命令的可读描述："屋顶编辑移动边"
   */
  getDescription(): string;

  /**
   * 获取命令所属的日志分类
   * @returns 日志分组类型：屋顶绘图
   */
  getCategory(): string;
}