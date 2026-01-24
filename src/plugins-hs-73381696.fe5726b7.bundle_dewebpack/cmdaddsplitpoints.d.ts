/**
 * 楼板编辑添加打断点命令
 * 用于在草图编辑模式下添加分割点
 */
declare module 'CmdAddSplitPoints' {
  import { HSApp } from 'HSApp';

  /**
   * 添加分割点命令类
   * 继承自草图2D命令基类，用于在楼板编辑时添加打断点
   */
  export class CmdAddSplitPoints extends HSApp.ExtraordinarySketch2d.Cmd.CmdAddSplitPoints {
    /**
     * 上下文对象，包含事务管理器
     */
    protected context: {
      transManager: TransactionManager;
    };

    /**
     * 草图2D构建器实例
     */
    protected sketch2dBuilder: unknown;

    /**
     * 构造函数
     */
    constructor();

    /**
     * 创建添加分割点的请求
     * @param splitPointData - 分割点数据
     * @returns 返回创建的请求对象
     */
    protected _createRequest(splitPointData: unknown): unknown;

    /**
     * 获取命令描述
     * @returns 返回命令的中文描述
     */
    getDescription(): string;

    /**
     * 获取命令所属类别
     * @returns 返回日志分组类型（楼板编辑）
     */
    getCategory(): HSFPConstants.LogGroupTypes;
  }

  /**
   * 事务管理器接口
   */
  interface TransactionManager {
    /**
     * 创建请求
     * @param requestType - 请求类型
     * @param args - 请求参数数组
     * @returns 创建的请求对象
     */
    createRequest(requestType: HSFPConstants.RequestType, args: unknown[]): unknown;
  }

  /**
   * HSFP常量命名空间
   */
  namespace HSFPConstants {
    /**
     * 请求类型枚举
     */
    enum RequestType {
      SlabEdit = 'SlabEdit'
    }

    /**
     * 楼板编辑相关请求类型
     */
    namespace SlabEdit {
      /**
       * 添加分割点请求类型
       */
      const AddSplitPoint: RequestType;
    }

    /**
     * 日志分组类型枚举
     */
    enum LogGroupTypes {
      /**
       * 楼板编辑分组
       */
      SlabEdit = 'SlabEdit'
    }
  }
}