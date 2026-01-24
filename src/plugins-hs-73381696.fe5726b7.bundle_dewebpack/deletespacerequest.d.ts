/**
 * 删除空间请求事务
 * 用于处理楼层空间区域的删除操作
 */

import { HSCore } from './HSCore';
import { HSApp } from './HSApp';
import { HSFPConstants } from './HSFPConstants';

/**
 * 删除空间请求类
 * 继承自 HSCore.Transaction.Common.StateRequest
 * 负责删除指定楼板上的楼层空间区域
 */
export declare class DeleteSpaceRequest extends HSCore.Transaction.Common.StateRequest {
  /**
   * 楼板对象引用
   * @private
   */
  private readonly _slab: HSCore.Model.Geom.Slab;

  /**
   * 要删除的楼层对象引用
   * @private
   */
  private readonly _floor: HSCore.Model.Geom.Floor;

  /**
   * 构造函数
   * @param slab - 楼板对象，表示空间所在的楼板
   * @param floor - 楼层对象，表示要删除的楼层区域
   */
  constructor(slab: HSCore.Model.Geom.Slab, floor: HSCore.Model.Geom.Floor);

  /**
   * 提交事务时执行的操作
   * 1. 取消所有选中项
   * 2. 根据楼板所在图层类型执行相应的删除操作：
   *    - 室外图层：调用 deleteOutdoorRegion 删除室外区域
   *    - 其他图层：使用 SplitHelper 删除普通区域
   * 3. 调用父类的 onCommit 方法完成事务提交
   * @override
   */
  onCommit(): void;

  /**
   * 判断该事务是否可以被记录到事务字段中
   * @returns 始终返回 true，表示该事务可以被记录
   * @override
   */
  canTransactField(): boolean;

  /**
   * 获取事务的描述信息
   * @returns 返回 "删除空间数据"
   * @override
   */
  getDescription(): string;

  /**
   * 获取事务的分类类型
   * @returns 返回空间操作类型 (SpaceOperation)
   * @override
   */
  getCategory(): HSFPConstants.LogGroupTypes;
}