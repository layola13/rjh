/**
 * ID生成器类型枚举
 * 定义了系统中各种实体的ID类型
 */
export declare const IDGeneratorType: {
    /** 实体ID类型 */
    readonly Entity: "entity";
    /** 外部草图ID类型 */
    readonly ExSketch: "exsketch";
    /** 状态ID类型 */
    readonly State: "state";
    /** 约束ID类型 */
    readonly Constraint: "constraint";
    /** 关联ID类型 */
    readonly Association: "association";
    /** 材质ID类型 */
    readonly Material: "material";
    /** 铺装ID类型 */
    readonly Pave: "pave";
    /** 请求ID类型 */
    readonly Request: "request";
    /** 临时ID类型 */
    readonly Temp: "temp";
};

/**
 * ID生成器类型的联合类型
 */
export type IDGeneratorType = typeof IDGeneratorType[keyof typeof IDGeneratorType];

/**
 * ID生成器键类型
 */
export type GeneratorKey = object | symbol;

/**
 * ID生成器工厂函数类型
 */
export type GeneratorFactory = (initialId?: number) => IDGenerator;

/**
 * 错误信息接口
 */
interface ErrorInfo {
    /** 当前nextId值 */
    nextId: number;
    /** 之前的ID值 */
    prevId: number;
    /** 触发错误的函数名 */
    function: string;
}

/**
 * ID生成器类
 * 用于生成和管理唯一ID，支持自增ID和ID同步
 */
export declare class IDGenerator {
    /** 默认生成器键 */
    private static readonly _defaultKey: object;
    
    /** 生成器注册表，使用WeakMap存储不同类型的生成器工厂 */
    private static readonly _generators: WeakMap<GeneratorKey, GeneratorFactory>;
    
    /** 下一个可用的ID值 */
    private _nextId: number;

    /**
     * 构造函数
     * @param initialId - 初始ID值，默认为1
     */
    constructor(initialId?: number);

    /**
     * 记录ID超长警告
     * 当ID增长超过阈值(10,000,000)时记录错误日志
     * @param functionName - 触发检查的函数名
     * @param nextId - 新的ID值
     * @param prevId - 之前的ID值
     */
    private logOverlengthId(functionName: string, nextId: number, prevId: number): void;

    /**
     * 生成ID
     * 如果提供了existingId，则确保内部计数器大于该值；否则返回自增ID
     * @param existingId - 可选的已存在ID，用于同步ID序列
     * @returns 生成的ID字符串
     */
    generate(existingId?: string): string;

    /**
     * 获取下一个可用的ID值
     * @returns 下一个ID数值
     */
    getNextId(): number;

    /**
     * 同步ID序列
     * 如果提供的ID大于当前nextId，则更新nextId
     * @param id - 需要同步的ID字符串
     */
    syncId(id: string): void;

    /**
     * 重置ID序列
     * @param id - 新的起始ID字符串
     */
    resetId(id: string): void;

    /**
     * 注册ID生成器工厂
     * @param key - 生成器的键，如果未提供则使用默认键
     * @param factory - 生成器工厂函数
     */
    static register(key: GeneratorKey | undefined, factory: GeneratorFactory): void;

    /**
     * 获取ID生成器实例
     * @param initialId - 初始ID值
     * @param key - 生成器键，默认使用_defaultKey
     * @returns ID生成器实例
     */
    static getGenerator(initialId?: number, key?: GeneratorKey): IDGenerator;

    /**
     * 静态方法：生成ID
     * @param existingId - 可选的已存在ID
     * @param initialId - 初始ID值
     * @param key - 生成器键
     * @returns 生成的ID字符串
     * @throws 如果找不到对应的生成器则抛出断言错误
     */
    static generate(existingId?: string, initialId?: number, key?: GeneratorKey): string;
}