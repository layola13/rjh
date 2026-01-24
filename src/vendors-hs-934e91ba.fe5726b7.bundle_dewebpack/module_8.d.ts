/**
 * 根据输入值返回对应的数字等级或类型
 * 
 * @param value - 输入值，用于判断返回哪个等级
 * @returns 返回 0-3 之间的数字：
 *          - 0: 当输入为 1 时
 *          - 1: 当输入为 2 时
 *          - 2: 当输入不为 8 且不为 11 时
 *          - 3: 当输入为 8 或 11 时
 */
export declare function getValueLevel(value: number): 0 | 1 | 2 | 3;