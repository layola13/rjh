import { HSCore } from './path/to/HSCore';

/**
 * 编辑自定义模型灯带请求类
 * 用于处理灯带的翻转、宽度调整和尺寸重置等操作
 */
export declare class EditNCustomizedModelLightBandRequest extends HSCore.Transaction.Common.StateRequest {
    /**
     * 内容对象，包含灯带的子元素集合
     * @private
     */
    private _content: ContentEntity;

    /**
     * 灯带的唯一标识符
     * @private
     */
    private _lightBandId: string | number;

    /**
     * 构造函数
     * @param content - 包含灯带实体的内容对象
     * @param lightBandId - 要编辑的灯带ID
     */
    constructor(content: ContentEntity, lightBandId: string | number);

    /**
     * 接收并处理灯带参数更新请求
     * @param action - 操作类型：'flip'(翻转) | 'profileWidth'(轮廓宽度) | 'sizeReset'(重置尺寸)
     * @param params - 操作参数对象
     * @returns 处理后的参数数组
     */
    onReceive(action: LightBandAction, params: LightBandParams): [LightBandAction, LightBandParams];

    /**
     * 更新灯带的参数并标记几何体为脏数据
     * @param entity - 要更新的灯带实体
     * @param parameters - 新的参数对象
     * @private
     */
    private _updateLightBand(entity: MoldingEntity, parameters: LightBandParameters): void;

    /**
     * 判断字段是否可以参与事务处理
     * @returns 始终返回 true
     */
    canTransactField(): boolean;

    /**
     * 根据ID从内容对象中查找灯带实体
     * @param content - 包含子元素的内容对象
     * @param lightBandId - 灯带ID
     * @returns 匹配的灯带实体，如果未找到则返回 undefined
     */
    getMoldingEntityById(content: ContentEntity, lightBandId: string | number): MoldingEntity | undefined;

    /**
     * 获取操作的描述文本
     * @returns 操作描述字符串
     */
    getDescription(): string;
}

/**
 * 灯带操作类型
 */
type LightBandAction = 'flip' | 'profileWidth' | 'sizeReset';

/**
 * 灯带操作参数
 */
interface LightBandParams {
    /** 翻转状态（用于 flip 操作）*/
    flip?: boolean;
    /** 轮廓宽度（用于 profileWidth 操作）*/
    profileWidth?: number;
}

/**
 * 灯带参数配置
 */
interface LightBandParameters {
    /** 翻转状态 */
    flip: boolean;
    /** 轮廓宽度 */
    profileWidth: number;
    /** 其他可能的参数 */
    [key: string]: unknown;
}

/**
 * 成型实体（灯带实体）
 */
interface MoldingEntity {
    /** 灯带唯一标识 */
    lightBandId: string | number;
    /** 灯带参数配置 */
    parameters: LightBandParameters;
    /** 标记几何体需要重新计算 */
    dirtyGeometry(): void;
    /** 重置尺寸到默认值 */
    resetSize(): void;
}

/**
 * 内容实体，包含子元素集合
 */
interface ContentEntity {
    /** 子元素映射表，键为ID，值为灯带实体 */
    children: Record<string | number, MoldingEntity>;
}