/**
 * 删除楼板层开洞的事务请求
 * 用于清除指定楼板层的草图辅助线和开洞数据
 */

import { HSCore } from './HSCore';

/**
 * 楼板层接口
 * 包含草图2D辅助线和开洞信息
 */
interface ILayer {
  /**
   * 楼板草图2D辅助线集合
   */
  slabSketch2dGuildLines: unknown[];
  
  /**
   * 楼板草图2D开洞集合
   */
  slabSketch2dHoles: unknown[];
}

/**
 * 删除楼板层开洞的事务请求类
 * 继承自HSCore事务通用状态请求基类
 * 
 * @remarks
 * 该类用于执行删除楼板层中所有草图辅助线和开洞的操作
 * 作为事务操作，支持提交和字段事务处理
 * 
 * @example
 *