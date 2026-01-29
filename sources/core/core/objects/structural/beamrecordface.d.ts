/**
 * 记录面类型枚举
 * 定义了建筑构件的不同记录面类型
 */
export enum RecordType {
    /** 结构类型 */
    Structure = 0,
    /** 孔洞类型 */
    Hole = 1,
    /** 板类型 */
    Slab = 2,
    /** 梁类型 */
    Beam = 3
}

/**
 * 链接结构信息接口
 * 描述关联的结构元素信息
 */
export interface LinkStructureInfo {
    /** 结构元素ID */
    id: string | number;
    /** 结构元素类型 */
    type: string | number;
}

/**
 * 记录面构造参数接口
 */
export interface RecordFaceOptions {
    /** 主实体ID */
    masterId: string | number;
    /** 原始键名 */
    originKey?: string;
    /** 额外键名 */
    extraKey?: string;
    /** 是否为辅助面 */
    isAux?: boolean;
}

/**
 * 序列化后的记录面数据接口
 */
export interface SerializedRecordFace {
    /** 主实体ID */
    mId: string | number;
    /** 记录类型 */
    rT: RecordType;
    /** 原始键名 */
    oK?: string;
    /** 额外键名 */
    eK?: string;
    /** 是否为辅助面 */
    isA?: boolean;
}

/**
 * 序列化后的结构记录面数据接口
 */
export interface SerializedStructureRecordFace extends SerializedRecordFace {
    /** 链接的结构信息列表 */
    sInfos?: LinkStructureInfo[];
}

/**
 * 序列化后的孔洞记录面数据接口
 */
export interface SerializedHoleRecordFace extends SerializedRecordFace {
    /** 是否为底面 */
    isB?: boolean;
    /** 孔洞面类型 */
    type: number;
    /** 观察的共边拓扑名称ID列表 */
    oCTopoIds?: Array<string | number>;
}

/**
 * 序列化后的板记录面数据接口
 */
export interface SerializedSlabRecordFace extends SerializedRecordFace {
    /** 板面类型 */
    type: number;
}

/**
 * 序列化后的梁记录面数据接口
 */
export type SerializedBeamRecordFace = SerializedRecordFace;

/**
 * 获取记录面的最终键名
 * @param originKey - 原始键名
 * @param extraKey - 额外键名
 * @returns 组合后的最终键名
 */
export declare function getRecordFaceFinalKey(originKey: string, extraKey?: string): string;

/**
 * 从序列化数据加载记录面实例
 * @param data - 序列化的记录面数据
 * @returns 对应类型的记录面实例
 */
export declare function loadRecordFace(
    data: SerializedRecordFace | SerializedStructureRecordFace | SerializedHoleRecordFace | SerializedSlabRecordFace
): RecordFace | StructureRecordFace | HoleRecordFace | SlabRecordFace | BeamRecordFace;

/**
 * 记录面基类
 * 表示建筑构件的一个记录面，包含基本的标识和序列化功能
 */
export declare abstract class RecordFace {
    /** 主实体ID */
    masterId: string | number;
    /** 原始键名 */
    originKey: string;
    /** 是否为辅助面 */
    isAux?: boolean;
    /** 额外键名（私有） */
    protected _extraKey?: string;

    /**
     * 构造函数
     * @param options - 记录面配置参数
     */
    constructor(options: RecordFaceOptions);

    /**
     * 获取排序顺序
     * @returns 排序值，默认为0
     */
    get order(): number;

    /**
     * 判断是否为结构类型
     * @returns true表示为结构类型
     */
    isStructure(): boolean;

    /**
     * 判断是否为孔洞类型
     * @returns true表示为孔洞类型
     */
    isHole(): boolean;

    /**
     * 判断是否为梁类型
     * @returns true表示为梁类型
     */
    isBeam(): boolean;

    /**
     * 判断是否为板类型
     * @returns true表示为板类型
     */
    isSlab(): boolean;

    /**
     * 从另一个记录面复制属性
     * @param source - 源记录面
     */
    copyFrom(source: RecordFace): void;

    /**
     * 设置额外键名
     */
    set extraKey(value: string | undefined);

    /**
     * 获取最终键名（原始键名+额外键名组合）
     * @returns 最终键名
     */
    get finalKey(): string;

    /**
     * 获取记录类型
     * @returns 记录类型枚举值
     */
    abstract getRecordType(): RecordType;

    /**
     * 序列化为普通对象
     * @returns 序列化后的数据
     */
    dump(): SerializedRecordFace;
}

/**
 * 结构记录面类
 * 表示结构构件的记录面，支持链接到其他结构信息
 */
export declare class StructureRecordFace extends RecordFace {
    /** 链接的结构信息列表 */
    linkStructureInfos: LinkStructureInfo[];

    /**
     * 获取记录类型
     * @returns 结构类型
     */
    getRecordType(): RecordType.Structure;

    /**
     * 获取排序顺序（从extraKey解析）
     * @returns 排序值
     */
    get order(): number;

    /**
     * 克隆当前实例
     * @returns 新的结构记录面实例
     */
    clone(): StructureRecordFace;

    /**
     * 序列化为普通对象
     * @returns 序列化后的数据
     */
    dump(): SerializedStructureRecordFace;

    /**
     * 从序列化数据加载实例
     * @param data - 序列化的数据
     * @returns 结构记录面实例
     */
    static load(data: SerializedStructureRecordFace): StructureRecordFace;
}

/**
 * 孔洞记录面类
 * 表示孔洞的记录面，包含孔洞特定的属性
 */
export declare class HoleRecordFace extends RecordFace {
    /** 孔洞面类型 */
    type: number;
    /** 是否为底面 */
    isBottom?: boolean;
    /** 观察的共边拓扑名称ID列表 */
    observeCoEdgeTopoNameIds: Array<string | number>;

    /**
     * 获取记录类型
     * @returns 孔洞类型
     */
    getRecordType(): RecordType.Hole;

    /**
     * 序列化为普通对象
     * @returns 序列化后的数据
     */
    dump(): SerializedHoleRecordFace;

    /**
     * 从序列化数据加载实例
     * @param data - 序列化的数据
     * @returns 孔洞记录面实例
     */
    static load(data: SerializedHoleRecordFace): HoleRecordFace;
}

/**
 * 板记录面类
 * 表示板构件的记录面
 */
export declare class SlabRecordFace extends RecordFace {
    /** 板面类型 */
    type: number;

    /**
     * 获取记录类型
     * @returns 板类型
     */
    getRecordType(): RecordType.Slab;

    /**
     * 克隆当前实例
     * @returns 新的板记录面实例
     */
    clone(): SlabRecordFace;

    /**
     * 序列化为普通对象
     * @returns 序列化后的数据
     */
    dump(): SerializedSlabRecordFace;

    /**
     * 从序列化数据加载实例
     * @param data - 序列化的数据
     * @returns 板记录面实例
     */
    static load(data: SerializedSlabRecordFace): SlabRecordFace;
}

/**
 * 梁记录面类
 * 表示梁构件的记录面
 */
export declare class BeamRecordFace extends RecordFace {
    /**
     * 获取记录类型
     * @returns 梁类型
     */
    getRecordType(): RecordType.Beam;

    /**
     * 获取排序顺序（从extraKey解析）
     * @returns 排序值
     */
    get order(): number;

    /**
     * 从序列化数据加载实例
     * @param data - 序列化的数据
     * @returns 梁记录面实例
     */
    static load(data: SerializedBeamRecordFace): BeamRecordFace;

    /**
     * 克隆当前实例
     * @returns 新的梁记录面实例
     */
    clone(): BeamRecordFace;
}