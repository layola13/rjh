/**
 * 创建属性描述符对象
 * 
 * 根据位掩码标志位生成符合ES规范的属性描述符。
 * 用于Object.defineProperty等API中定义对象属性的特性。
 * 
 * @param flags - 属性标志位掩码
 *   - bit 0 (1): enumerable - 设置时属性不可枚举
 *   - bit 1 (2): configurable - 设置时属性不可配置
 *   - bit 2 (4): writable - 设置时属性不可写
 * @param value - 属性的值
 * @returns 标准的PropertyDescriptor对象
 * 
 * @example
 *