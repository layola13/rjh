/**
 * 楼板厚度修改请求
 * 用于处理楼板图层厚度变更的事务请求
 */
declare module 'ChangeLayerThicknessRequest' {
  import { HSCore } from 'HSCore';

  /**
   * 楼板厚度修改请求类
   * 继承自状态请求基类，实现楼板厚度的事务性修改
   */
  export class ChangeLayerThicknessRequest extends HSCore.Transaction.Common.StateRequest {
    /**
     * 目标图层对象
     * @private
     */
    private _layer: Layer;

    /**
     * 新的厚度值
     * @private
     */
    private _thickness: number;

    /**
     * 构造函数
     * @param layer - 要修改厚度的楼板图层
     * @param thickness - 新的厚度值（单位：毫米）
     */
    constructor(layer: Layer, thickness: number);

    /**
     * 提交事务时执行的操作
     * 更新图层的楼板厚度并刷新相关的楼板面
     * @override
     */
    onCommit(): void;

    /**
     * 判断该字段是否可以进行事务处理
     * @returns 始终返回 true，表示支持事务
     * @override
     */
    canTransactField(): boolean;

    /**
     * 获取操作描述
     * @returns 返回操作的中文描述
     * @override
     */
    getDescription(): string;

    /**
     * 获取操作分类
     * @returns 返回日志分组类型（墙体操作）
     * @override
     */
    getCategory(): HSFPConstants.LogGroupTypes;
  }

  /**
   * 楼板图层接口
   * 定义楼板图层的基本属性
   */
  interface Layer {
    /**
     * 楼板厚度属性
     */
    slabThickness: number;
  }
}