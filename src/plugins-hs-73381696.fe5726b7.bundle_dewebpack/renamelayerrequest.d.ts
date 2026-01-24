import { HSCore } from './HSCore';

/**
 * 重命名楼层请求
 * 
 * 用于处理楼层重命名操作的事务请求类。
 * 继承自 HSCore.Transaction.Common.StateRequest，提供楼层名称修改的事务性操作。
 */
export class RenameLayerRequest extends HSCore.Transaction.Common.StateRequest {
    /**
     * 要重命名的楼层对象
     */
    private readonly _layer: Layer;
    
    /**
     * 新的楼层名称
     */
    private readonly _name: string;

    /**
     * 创建一个重命名楼层请求实例
     * 
     * @param layer - 要重命名的楼层对象
     * @param name - 新的楼层名称
     */
    constructor(layer: Layer, name: string) {
        super();
        this._layer = layer;
        this._name = name;
    }

    /**
     * 提交事务时执行的操作
     * 
     * 将楼层的显示名称更新为新名称，并调用父类的 onCommit 方法。
     * 
     * @override
     */
    onCommit(): void {
        if (this._name) {
            this._layer.displayName = this._name;
        }
        super.onCommit([]);
    }

    /**
     * 判断该请求是否可以执行字段事务
     * 
     * @returns 始终返回 true，表示支持字段事务
     * @override
     */
    canTransactField(): boolean {
        return true;
    }

    /**
     * 获取操作描述
     * 
     * @returns 操作的中文描述
     * @override
     */
    getDescription(): string {
        return "重命名楼层";
    }

    /**
     * 获取操作分类
     * 
     * @returns 日志分组类型，标识为楼层操作
     * @override
     */
    getCategory(): HSFPConstants.LogGroupTypes {
        return HSFPConstants.LogGroupTypes.LayerOperation;
    }
}

/**
 * 楼层接口定义
 */
interface Layer {
    /**
     * 楼层的显示名称
     */
    displayName: string;
}

/**
 * HSFPConstants 常量命名空间
 */
declare namespace HSFPConstants {
    /**
     * 日志分组类型枚举
     */
    enum LogGroupTypes {
        /**
         * 楼层操作类型
         */
        LayerOperation
    }
}