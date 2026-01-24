/**
 * 连接线条请求类
 * 用于处理墙面装饰线条（踢脚线/顶角线）的连接操作
 */

import { HSCore } from './HSCore';
import { HSFPConstants } from './HSFPConstants';

/**
 * 线条类型枚举
 */
declare enum MoldingTypeEnum {
  /** 踢脚线 */
  Baseboard = 'Baseboard',
  /** 顶角线 */
  Cornice = 'Cornice'
}

/**
 * 线条基础接口
 */
interface IMolding {
  /** 线条类型 */
  type: MoldingTypeEnum;
  /** 父级容器 */
  parent: IMoldingParent;
  /** 宿主对象 */
  host?: IMoldingParent;
}

/**
 * 线条容器接口
 */
interface IMoldingParent {
  /**
   * 移除线条
   * @param molding - 要移除的线条对象
   */
  removeMolding(molding: IMolding): void;
  
  /**
   * 添加线条
   * @param molding - 要添加的线条对象
   */
  addMolding(molding: IMolding): void;
}

/**
 * 连接线条请求类
 * 继承自状态请求基类，用于合并多个线条为一个新线条
 */
export declare class ConnectMoldingRequest extends HSCore.Transaction.Common.StateRequest {
  /**
   * 待连接的线条数组
   */
  private moldings: IMolding[];
  
  /**
   * 合并后生成的新线条
   */
  private newMolding?: IMolding;

  /**
   * 构造函数
   * @param moldings - 需要连接的线条数组（通常为2个）
   */
  constructor(moldings: IMolding[]);

  /**
   * 执行线条连接操作
   * 1. 合并线条生成新线条
   * 2. 从父容器移除原线条
   * 3. 将新线条添加到父容器
   */
  private connectMolding(): void;

  /**
   * 合并线条
   * 根据线条类型调用对应的合并方法
   * @param moldings - 待合并的线条数组
   * @returns 合并后的新线条，失败返回undefined
   */
  private mergeMoldings(moldings: IMolding[]): IMolding | undefined;

  /**
   * 提交事务
   * 执行连接操作并调用父类的提交逻辑
   */
  onCommit(): void;

  /**
   * 获取新生成的线条
   * @returns 合并后的新线条对象
   */
  getNewMolding(): IMolding | undefined;

  /**
   * 是否可以处理字段事务
   * @returns 始终返回true
   */
  canTransactField(): boolean;

  /**
   * 获取操作描述
   * @returns 操作描述文本："连接分线"
   */
  getDescription(): string;

  /**
   * 获取操作分类
   * @returns 日志分组类型：面操作
   */
  getCategory(): HSFPConstants.LogGroupTypes;
}

/**
 * HSCore命名空间扩展
 */
declare namespace HSCore {
  namespace Model {
    export { MoldingTypeEnum };
  }

  namespace Util {
    namespace Molding {
      /**
       * 合并踢脚线
       * @param molding1 - 第一个踢脚线
       * @param molding2 - 第二个踢脚线
       * @returns 合并后的踢脚线
       */
      export function mergeBaseboard(molding1: IMolding, molding2: IMolding): IMolding | undefined;

      /**
       * 合并顶角线
       * @param molding1 - 第一个顶角线
       * @param molding2 - 第二个顶角线
       * @returns 合并后的顶角线
       */
      export function mergeCornice(molding1: IMolding, molding2: IMolding): IMolding | undefined;
    }
  }

  namespace Transaction {
    namespace Common {
      /**
       * 状态请求基类
       */
      export class StateRequest {
        /**
         * 提交事务的基础方法
         * @param args - 提交参数
         */
        protected onCommit(args: unknown[]): void;
      }
    }
  }
}

/**
 * HSFPConstants命名空间
 */
declare namespace HSFPConstants {
  /**
   * 日志分组类型枚举
   */
  enum LogGroupTypes {
    /** 面操作 */
    FaceOperation = 'FaceOperation'
  }
}