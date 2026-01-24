import { HSCore } from './path/to/HSCore';

/**
 * 参数化楼梯属性变更请求
 * 用于处理楼梯参数的修改、撤销和重做操作
 */
export declare class ChangeParametricStairPropertyRequest extends HSCore.Transaction.Request {
    /**
     * 楼梯内容对象
     * @private
     */
    private _content: unknown;

    /**
     * 属性名称
     * @private
     */
    private _propertyName: string;

    /**
     * 新属性值
     * @private
     */
    private _propertyValue: unknown;

    /**
     * 原始属性值（用于撤销操作）
     * @private
     */
    private _prePropertyValue: unknown;

    /**
     * 构造函数
     * @param content - 楼梯内容对象，包含属性映射和参数设置方法
     * @param propertyName - 要修改的属性名称
     * @param propertyValue - 新的属性值
     */
    constructor(content: unknown, propertyName: string, propertyValue: unknown);

    /**
     * 将参数应用到楼梯对象
     * @param value - 要设置的属性值
     * @private
     */
    private _setParamsToStairs(value: unknown): void;

    /**
     * 提交事务，应用新属性值
     * @returns 返回楼梯内容对象
     */
    onCommit(): unknown;

    /**
     * 撤销事务，恢复到原始属性值
     */
    onUndo(): void;

    /**
     * 重做事务，重新应用新属性值
     */
    onRedo(): void;

    /**
     * 判断是否可以进行事务字段操作
     * @returns 始终返回 true
     */
    canTransactField(): boolean;

    /**
     * 获取操作描述
     * @returns 返回 "设置楼梯参数"
     */
    getDescription(): string;
}