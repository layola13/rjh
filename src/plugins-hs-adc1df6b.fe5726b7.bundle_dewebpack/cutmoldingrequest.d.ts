/**
 * 切割线条请求模块
 * 用于处理线条（Molding）的切割操作，将一个线条在指定位置分割成多个新线条
 */

import { HSCore } from './HSCore';

/**
 * 线条对象接口
 * 表示可以被切割的线条实体
 */
export interface Molding {
  /** 父容器对象 */
  parent: MoldingParent;
  
  /**
   * 在指定位置分割线条
   * @param position - 分割位置
   * @returns 分割后的新线条数组
   */
  split(position: number): Molding[];
}

/**
 * 线条父容器接口
 * 管理多个线条的容器对象
 */
export interface MoldingParent {
  /**
   * 从容器中移除指定线条
   * @param molding - 要移除的线条对象
   */
  removeMolding(molding: Molding): void;
  
  /**
   * 向容器中添加线条
   * @param molding - 要添加的线条对象
   */
  addMolding(molding: Molding): void;
}

/**
 * 切割线条请求类
 * 继承自状态请求基类，实现线条的切割操作和事务管理
 * 
 * @example
 *