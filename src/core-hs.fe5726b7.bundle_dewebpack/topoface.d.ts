/**
 * TopoFace模块 - 拓扑面相关类型定义
 * 提供建筑模型中各类拓扑面的类型声明，包括房间、楼板、墙体和洞口面
 */

/**
 * 面路径信息
 */
export interface FacePath {
    /** 外轮廓路径 */
    outer: unknown;
    /** 内孔洞路径数组 */
    holes: unknown[];
}

/**
 * 拓扑名称标识信息
 */
export interface TopoName {
    /** 唯一标识符 */
    id: string;
    /** 源对象ID */
    sourceId: string;
    /** 拓扑类型 */
    type: string;
    /** 索引 */
    index: number;
    /** 源对象索引（用于墙体） */
    sourceIndex?: number;
    /** 是否同向（用于共边） */
    isSameDirection?: boolean;
    
    /** 克隆方法 */
    clone(): TopoName;
}

/**
 * Brep面对象接口
 */
export interface BrepFace {
    /** 克隆当前Brep面 */
    clone(): BrepFace;
}

/**
 * 共边信息接口（用于墙体拓扑面）
 */
export interface CoEdge {
    /** 拓扑名称 */
    topoName: TopoName;
}

/**
 * 拓扑面基类
 * 表示建筑模型中的一个拓扑面，包含几何信息和拓扑命名
 */
export declare class TopoFace {
    /** Brep几何面 */
    readonly brepFace: BrepFace;
    /** 拓扑命名信息 */
    readonly topoName: TopoName;

    /**
     * 构造拓扑面
     * @param brepFace - Brep几何面对象
     * @param topoName - 拓扑命名对象
     */
    constructor(brepFace: BrepFace, topoName: TopoName);

    /**
     * 获取拓扑面ID
     */
    get id(): string;

    /**
     * 获取面的路径信息（外轮廓和内孔洞）
     */
    get path(): FacePath;

    /**
     * 克隆当前拓扑面
     * @returns 新的拓扑面实例
     */
    clone(): TopoFace;
}

/**
 * 房间拓扑面
 * 表示房间的顶面或底面，包含与相邻墙体的关联关系
 */
export declare class RoomTopoFace extends TopoFace {
    /** 关联的墙体ID列表 */
    linkWallIds: string[];

    /**
     * 构造房间拓扑面
     * @param brepFace - Brep几何面对象
     * @param topoName - 拓扑命名对象
     * @param linkWallIds - 关联的墙体ID数组
     */
    constructor(brepFace: BrepFace, topoName: TopoName, linkWallIds: string[]);

    /**
     * 获取拓扑键值
     * 格式: {sourceId}_{type}_{index}
     */
    get topoKey(): string;

    /**
     * 克隆当前房间拓扑面
     * @returns 新的房间拓扑面实例
     */
    clone(): RoomTopoFace;
}

/**
 * 楼板拓扑面
 * 表示楼板的面，包含与相邻墙体的关联关系
 */
export declare class SlabTopoFace extends TopoFace {
    /** 关联的墙体ID列表 */
    linkWallIds: string[];

    /**
     * 构造楼板拓扑面
     * @param brepFace - Brep几何面对象
     * @param topoName - 拓扑命名对象
     * @param linkWallIds - 关联的墙体ID数组
     */
    constructor(brepFace: BrepFace, topoName: TopoName, linkWallIds: string[]);

    /**
     * 获取拓扑键值
     * 格式: {sourceId}_{type}_{index}
     */
    get topoKey(): string;
}

/**
 * 墙体拓扑面
 * 表示墙体的面，包含分组、辅助标记和共边信息
 */
export declare class WallTopoFace extends TopoFace {
    /** 是否为辅助面 */
    isAux: boolean;
    /** 关联的墙体ID列表 */
    linkWallIds: string[];
    /** 共边信息（可选） */
    coEdge?: CoEdge;

    private _groupIndex?: number;

    /**
     * 构造墙体拓扑面
     * @param brepFace - Brep几何面对象
     * @param topoName - 拓扑命名对象
     * @param linkWallIds - 关联的墙体ID数组
     */
    constructor(brepFace: BrepFace, topoName: TopoName, linkWallIds: string[]);

    /**
     * 获取分组索引
     * @throws 当分组索引未定义时记录错误
     */
    get groupIndex(): number;

    /**
     * 设置分组索引
     * @param value - 分组索引值
     */
    set groupIndex(value: number);

    /**
     * 获取拓扑键值
     * 格式: {sourceId}_{type}_{groupIndex}_{sourceIndex}_{isAux}[_{isSameDirection}]
     * 注：辅助面且存在共边时，追加isSameDirection后缀
     */
    get topoKey(): string;
}

/**
 * 洞口拓扑面
 * 表示洞口（门、窗等）的面，区分底面和必需面
 */
export declare class HoleTopoFace extends TopoFace {
    /** 特殊源索引阈值常量（>= 此值为特殊洞口） */
    static readonly StrangeSourceIndex: number;

    /** 是否为底面 */
    readonly isBottom: boolean;
    /** 是否必须存在 */
    readonly mustExist: boolean;

    /**
     * 构造洞口拓扑面
     * @param brepFace - Brep几何面对象
     * @param topoName - 拓扑命名对象
     * @param isBottom - 是否为底面
     * @param mustExist - 是否必须存在
     */
    constructor(
        brepFace: BrepFace,
        topoName: TopoName,
        isBottom: boolean,
        mustExist: boolean
    );

    /**
     * 判断是否为特殊洞口
     * @returns 当sourceIndex >= StrangeSourceIndex时返回true
     */
    isStrange(): boolean;

    /**
     * 获取洞口ID（从sourceId中提取第一部分）
     */
    get holeId(): string;
}