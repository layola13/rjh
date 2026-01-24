/**
 * 装饰条中式设置类
 * 继承自 DecorationBarSettings，提供中式装饰条的特定设置功能
 */
export declare class DecorationBarChineseSettings extends DecorationBarSettings {
    /**
     * 产品ID
     */
    protected pid: string | number;

    /**
     * 多重管理器实例
     */
    protected mulManager: unknown;

    /**
     * 视图实例
     */
    protected view: View;

    /**
     * 装饰条实例
     */
    protected decorationBar?: DecorationBar;

    /**
     * 装饰形状实例
     */
    protected decorationShape: DecorationShape;

    /**
     * 构造函数
     * @param pid - 产品ID
     * @param mulManager - 多重管理器
     * @param view - 视图实例
     */
    constructor(pid: string | number, mulManager: unknown, view: View);

    /**
     * 垂直中间条数量
     * 获取或设置装饰条的垂直条数量，设置后会触发组件重建和视图刷新
     */
    get verMiddleCount(): number;
    set verMiddleCount(value: number);

    /**
     * 水平中间条数量
     * 获取或设置装饰条的水平条数量，设置后会触发组件重建和视图刷新
     */
    get horMiddleCount(): number;
    set horMiddleCount(value: number);

    /**
     * 边缘间距
     * 获取或设置装饰条与边缘的间距，必须大于0，设置后会触发组件重建和视图刷新
     */
    get edgeSep(): number;
    set edgeSep(value: number);

    /**
     * 水平中间间距
     * 获取或设置水平装饰条之间的间距，必须大于0，设置后会触发组件重建和视图刷新
     */
    get horMiddleSep(): number;
    set horMiddleSep(value: number);

    /**
     * 垂直中间间距
     * 获取或设置垂直装饰条之间的间距，必须大于0，设置后会触发组件重建和视图刷新
     */
    get verMiddleSep(): number;
    set verMiddleSep(value: number);
}

/**
 * 装饰条基类
 * 从模块7导入
 */
declare class DecorationBarSettings {
    constructor(pid: string | number, mulManager: unknown, view: View);
}

/**
 * 装饰条数据模型
 */
interface DecorationBar {
    /** 垂直条数量 */
    verticalBarCount: number;
    /** 水平条数量 */
    horizontalBarCount: number;
    /** 边缘间距 */
    gap: number;
    /** 水平间距 */
    hSep: number;
    /** 垂直间距 */
    vSep: number;
    /** 重建组件 */
    recreateComponents(): void;
}

/**
 * 装饰形状
 */
interface DecorationShape {
    /** 更新多边形 */
    updatePoly(): void;
    /** 绘制到视图 */
    draw(view: View): void;
}

/**
 * 视图接口
 */
interface View {
    /** 刷新视图 */
    refresh(): void;
    /** 备忘录管理器 */
    mometoManager: MomentoManager;
}

/**
 * 备忘录管理器
 */
interface MomentoManager {
    /** 创建检查点 */
    checkPoint(): void;
}