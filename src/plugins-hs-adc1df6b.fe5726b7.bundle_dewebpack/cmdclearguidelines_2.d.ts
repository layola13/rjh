/**
 * 外部区域绘制-清空辅助线命令
 * 用于清空绘图区域中的所有辅助线
 */

import { HSApp } from './types/HSApp';
import { HSFPConstants } from './types/HSFPConstants';

/**
 * 清空辅助线命令类
 * 继承自基础的清空额外辅助线命令
 */
export declare class CmdClearGuideLines extends HSApp.ExtraordinarySketch2d.Cmd.CmdClearExGuideLines {
  /**
   * 上下文对象，包含事务管理器
   */
  protected context: {
    transManager: {
      /**
       * 创建请求
       * @param requestType 请求类型
       * @param params 请求参数数组
       * @returns 创建的请求对象
       */
      createRequest<T = unknown>(requestType: string, params: unknown[]): T;
    };
  };

  /**
   * 2D草图构建器实例
   */
  protected sketch2dBuilder: unknown;

  /**
   * 构造函数
   */
  constructor();

  /**
   * 创建删除辅助线请求
   * @param data 辅助线数据或标识符
   * @returns 创建的请求对象
   */
  protected _createRequest(data: unknown): unknown;

  /**
   * 获取命令描述
   * @returns 命令的中文描述
   */
  getDescription(): string;

  /**
   * 获取命令所属类别
   * @returns 日志分组类型：外部区域绘制
   */
  getCategory(): string;
}