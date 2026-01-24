/**
 * Hash清空函数模块
 * 
 * 该模块导出一个构造函数，用于清空哈希表的内部数据存储。
 * 当调用时会将 __data__ 属性重置为空对象或null原型对象，
 * 并将 size 属性设置为 0。
 * 
 * @module HashClear
 */

/**
 * 创建对象的函数类型，通常用于创建无原型的纯对象
 * 
 * @param proto - 原型对象，传入 null 可创建无原型对象
 * @returns 返回一个新对象
 */
type CreateObjectFunction = (proto: null) => Record<string, unknown>;

/**
 * Hash清空构造函数
 * 
 * 该函数用于初始化或重置哈希表的内部状态：
 * - 将内部数据存储重置为空对象（优先使用无原型对象）
 * - 将大小计数器重置为 0
 * 
 * @remarks
 * 此函数应作为类的方法使用，通常绑定到 Hash 类的实例上。
 * 如果环境支持 Object.create(null)，会创建无原型的纯对象以避免原型污染。
 * 
 * @example
 *