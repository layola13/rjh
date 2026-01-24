/**
 * 柱子线条设置请求类
 * 用于处理障碍物（如柱子）上踢脚线或顶角线的添加、修改和移除操作
 */
declare class ObstacleMoldingRequest extends HSCore.Transaction.Request {
    /**
     * 产品元数据，可以是完整的墙面线条对象或线条配置信息
     * @private
     */
    private _productMetas: HSCore.Model.WallMolding | MoldingMetadata | null;

    /**
     * 目标障碍物对象（如柱子）
     * @private
     */
    private _obstacle: ObstacleObject;

    /**
     * 线条类型：顶角线或踢脚线
     * @private
     */
    private _moldingType: HSCore.Model.MoldingTypeEnum.Cornice | HSCore.Model.MoldingTypeEnum.Baseboard;

    /**
     * 原始线条对象（用于撤销操作）
     * @private
     */
    private _originalMolding?: HSCore.Model.Molding;

    /**
     * 新线条对象（用于重做操作）
     * @private
     */
    private _newMolding?: HSCore.Model.Molding;

    /**
     * 构造函数
     * @param productMetas - 产品元数据，传入null表示移除线条
     * @param obstacle - 要设置线条的障碍物对象
     * @param moldingType - 线条类型（顶角线或踢脚线）
     * @throws 当线条类型无效或与元数据类型不匹配时抛出断言错误
     */
    constructor(
        productMetas: HSCore.Model.WallMolding | MoldingMetadata | null,
        obstacle: ObstacleObject,
        moldingType: HSCore.Model.MoldingTypeEnum.Cornice | HSCore.Model.MoldingTypeEnum.Baseboard
    );

    /**
     * 提交操作：应用线条设置
     * 根据产品元数据创建新线条并设置到障碍物上
     */
    onCommit(): void;

    /**
     * 撤销操作：恢复原始线条状态
     */
    onUndo(): void;

    /**
     * 重做操作：重新应用新线条
     */
    onRedo(): void;

    /**
     * 获取操作描述文本（用于历史记录显示）
     * @returns 描述字符串，如"柱子线条关闭"、"柱子线条高度"等
     */
    getDescription(): string;

    /**
     * 获取操作类别
     * @returns 日志分组类型（内容操作）
     */
    getCategory(): HSFPConstants.LogGroupTypes.ContentOperation;
}

/**
 * 线条元数据配置接口
 */
interface MoldingMetadata {
    /**
     * 线条轮廓数据
     */
    profile?: ProfileData;

    /**
     * 材质配置
     */
    material?: MaterialConfig;

    /**
     * 元数据对象（线条形状定义）
     */
    metadata?: MoldingShapeMetadata;

    /**
     * 线条厚度（宽度）单位：毫米
     */
    thickness?: number;

    /**
     * 线条高度，单位：毫米
     */
    height?: number;
}

/**
 * 障碍物对象接口
 */
interface ObstacleObject {
    /**
     * 获取指定类型的线条
     * @param moldingType - 线条类型
     * @returns 线条对象或undefined
     */
    getMolding(moldingType: HSCore.Model.MoldingTypeEnum): HSCore.Model.Molding | undefined;

    /**
     * 设置指定类型的线条
     * @param molding - 线条对象，传入undefined表示移除
     * @param moldingType - 线条类型
     */
    setMolding(molding: HSCore.Model.Molding | undefined, moldingType: HSCore.Model.MoldingTypeEnum): void;
}

/**
 * 线条形状元数据（具体结构由HSCore定义）
 */
type MoldingShapeMetadata = unknown;

/**
 * 轮廓数据（具体结构由HSCore定义）
 */
type ProfileData = unknown;

/**
 * 材质配置（具体结构由HSCore定义）
 */
type MaterialConfig = unknown;

export default ObstacleMoldingRequest;