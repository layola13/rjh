/**
 * 工具类集合，提供位置文本转换、属性合并、单位换算等实用功能
 */
export declare class Utils {
    /**
     * 将位置代码转换为中文文本
     * @param position - 位置代码（"left" | "right" | "up" | "down"）
     * @returns 对应的中文描述，如果位置代码无效则返回 undefined
     */
    static positionText(position: string): string | undefined;

    /**
     * 合并属性到目标对象
     * @param target - 目标对象，将被修改
     * @param source - 源对象，包含要合并的属性
     */
    static mergeAttrs(
        target: MergeableAttributes,
        source: SourceAttributes
    ): void;

    /**
     * 将变量数组推送到目标对象
     * @param target - 具有 pushTmpKey 方法的目标对象
     * @param variables - 要推送的键值对数组
     */
    static pushVariables(
        target: VariableContainer,
        variables: Array<{ key: string; val: unknown }>
    ): void;

    /**
     * 获取长度单位的转换系数（转换为米）
     * @param unit - 长度单位枚举值
     * @returns 转换系数，默认为 0.001（毫米）
     */
    static lengthConvertion(unit: Unit): number;

    /**
     * 获取面积单位的转换系数（转换为平方米）
     * @param unit - 长度单位枚举值
     * @returns 转换系数，默认为 1e-6（平方毫米）
     */
    static areaConvertion(unit: Unit): number;

    /**
     * 计算型材重量
     * @param bar - 型材对象
     * @param unit - 长度单位
     * @returns 型材总重量
     */
    static barWeight(bar: BarObject, unit: Unit): number;

    /**
     * 计算玻璃重量
     * @param glass - 玻璃对象
     * @param unit - 长度单位
     * @returns 玻璃总重量
     */
    static glassWeight(glass: GlassObject, unit: Unit): number;

    /**
     * 计算脚本权重值（用于排序或优先级判断）
     * @param script - 脚本对象
     * @returns 权重分数
     */
    static weightOfScript(script: ScriptObject): number;

    /**
     * 根据字符串获取安装位置枚举值
     * @param position - 安装位置字符串（不区分大小写）
     * @returns 对应的安装位置枚举值，如果无效则返回 undefined
     */
    static getInstallPosition(position?: string): InstallPosition | undefined;

    /**
     * 根据开启方式代码获取开启方向
     * @param code - 开启方式代码（如 "IL", "OR" 等）
     * @returns 对应的开启方向枚举值，如果无效则返回 undefined
     */
    static getOpenToward(code?: string): OpenToward | undefined;

    /**
     * 根据开启方式代码获取开启方法
     * @param code - 开启方式代码（如 "IL", "OR" 等）
     * @returns 对应的开启方法枚举值，如果无效则返回 undefined
     */
    static getOpenMethod(code?: string): OpenMethod | undefined;
}

/**
 * 开启方向枚举
 */
export declare enum OpenToward {
    /** 内开 */
    Inward = "内开",
    /** 外开 */
    Outward = "外开",
    /** 无 */
    None = "无"
}

/**
 * 开启方法枚举
 */
export declare enum OpenMethod {
    /** 内左开 */
    InwardLeft = "内左开",
    /** 内右开 */
    InwardRight = "内右开",
    /** 内倒 */
    InwardDown = "内倒",
    /** 内开内倒左 */
    InwardDownLeft = "内开内倒左",
    /** 内开内倒右 */
    InwardDownRight = "内开内倒右",
    /** 内悬 */
    InwardUp = "内悬",
    /** 内开内悬左 */
    InwardUpLeft = "内开内悬左",
    /** 内开内悬右 */
    InwardUpRight = "内开内悬右",
    /** 外左开 */
    OutwardLeft = "外左开",
    /** 外右开 */
    OutwardRight = "外右开",
    /** 外悬 */
    OutwardUp = "外悬",
    /** 外开外悬左 */
    OutwardUpLeft = "外开外悬左",
    /** 外开外悬右 */
    OutwardUpRight = "外开外悬右",
    /** 外倒 */
    OutwardDown = "外倒",
    /** 外开外倒左 */
    OutwardDownLeft = "外开外倒左",
    /** 外开外倒右 */
    OutwardDownRight = "外开外倒右",
    /** 内平推 */
    InwardFloat = "内平推",
    /** 外平推 */
    OutwardFloat = "外平推",
    /** 无 */
    None = "无"
}

/**
 * 安装位置枚举
 */
export declare enum InstallPosition {
    /** 边封 */
    SideTrack = "边封",
    /** 玻扇 */
    Sash = "玻扇",
    /** 纱扇 */
    Screen = "纱扇",
    /** 边框 */
    Frame = "边框",
    /** 中梃 */
    Mullion = "中梃",
    /** 玻扇中梃 */
    SashMullion = "玻扇中梃",
    /** 纱扇中梃 */
    ScreenMullion = "纱扇中梃",
    /** 固下滑 */
    FixedDownTrack = "固下滑",
    /** 固上滑 */
    FixedUpTrack = "固上滑",
    /** 上下滑 */
    UpDownTrack = "上下滑"
}

/**
 * 长度单位枚举
 */
export declare enum Unit {
    /** 毫米 */
    Millimeters = "Millimeters",
    /** 厘米 */
    Centimeters = "Centimeters",
    /** 英寸 */
    Inches = "Inches"
}

/**
 * 可合并的属性对象接口
 */
export interface MergeableAttributes {
    name?: string;
    bom_code?: string;
    code?: string;
    bom_id?: string | number;
    bar_type?: string;
    [key: string]: unknown;
}

/**
 * 源属性对象接口
 */
export interface SourceAttributes {
    name?: string;
    code?: string;
    id?: string | number;
    bar_type?: string;
    customAttrs?: Record<string, unknown>;
}

/**
 * 变量容器接口
 */
export interface VariableContainer {
    pushTmpKey(key: string, value: unknown): void;
}

/**
 * 型材对象接口
 */
export interface BarObject {
    /** 长度 */
    length: number;
    /** 米重（单位长度重量） */
    meter_weight: number;
    /** 数量 */
    count: number;
}

/**
 * 玻璃对象接口
 */
export interface GlassObject {
    /** 宽度 */
    width: number;
    /** 高度 */
    height: number;
    /** 平方米重量 */
    meter_weight: number;
    /** 数量 */
    count: number;
}

/**
 * 脚本对象接口
 */
export interface ScriptObject {
    /** 位置类型 */
    pos_type?: string;
    /** 扇分配方式 */
    sash_assign_way?: string;
    /** 扇数量 */
    sash_num?: string;
    /** 尺寸类型 */
    size_type?: string;
    /** 忽略位置类型用于尺寸计算 */
    ignorePosTypeForSize?: boolean;
    /** 忽略扇分配方式用于尺寸计算 */
    ignoreSashAssignWayForSize?: boolean;
    /** 忽略扇数量用于尺寸计算 */
    ignoreSashNumForSize?: boolean;
    /** 忽略尺寸类型用于尺寸计算 */
    ignoreSizeTypeForSize?: boolean;
}