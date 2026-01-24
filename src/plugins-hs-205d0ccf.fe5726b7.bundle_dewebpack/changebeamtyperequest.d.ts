/**
 * 更改梁类型请求类
 * 用于处理梁构件主次梁类型变更的事务请求
 */
declare module 'ChangeBeamTypeRequest' {
  import { StateRequest } from 'HSCore.Transaction.Common';

  /**
   * 梁构件接口
   * 表示具有梁类型设置能力的构件对象
   */
  interface IBeam {
    /**
     * 设置梁的类型（主梁或次梁）
     * @param isPrimaryBeam - true表示主梁，false表示次梁
     */
    setBeamType(isPrimaryBeam: boolean): void;
  }

  /**
   * 更改梁类型请求类
   * 继承自状态请求基类，用于管理梁类型变更的事务操作
   * 
   * @extends StateRequest
   * 
   * @example
   *