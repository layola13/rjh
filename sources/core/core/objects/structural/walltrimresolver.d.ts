/**
 * 墙体修剪解析器
 * 用于处理两个墙体之间的修剪操作，支持直线墙和弧形墙的各种组合
 */
export declare class WallTrimResolver {
    /** 源墙体对象 */
    private readonly sourceWall: any;
    
    /** 目标墙体对象 */
    private readonly targetWall: any;
    
    /** 源墙体修剪点 */
    private readonly sourcePoint: any;
    
    /** 目标墙体修剪点 */
    private readonly targetPoint: any;
    
    /** 源墙体原始几何数据 */
    private readonly sourceGeom: THREE.Vector3[];
    
    /** 目标墙体原始几何数据 */
    private readonly targetGeom: THREE.Vector3[];
    
    /** 源墙体修剪后的新几何数据 */
    sourceGeomNew: THREE.Vector3[];
    
    /** 目标墙体修剪后的新几何数据 */
    targetGeomNew: THREE.Vector3[];

    /**
     * 构造函数
     * @param sourceWall - 源墙体对象
     * @param sourcePoint - 源墙体上的修剪点
     * @param sourceGeom - 源墙体的几何顶点数组
     * @param targetWall - 目标墙体对象
     * @param targetPoint - 目标墙体上的修剪点
     * @param targetGeom - 目标墙体的几何顶点数组
     */
    constructor(
        sourceWall: any,
        sourcePoint: any,
        sourceGeom: THREE.Vector3[],
        targetWall: any,
        targetPoint: any,
        targetGeom: THREE.Vector3[]
    );

    /**
     * 执行墙体修剪操作
     * 根据墙体类型（直线墙/弧形墙）自动选择合适的修剪算法
     */
    execute(): void;

    /**
     * 直线墙修剪直线墙
     * 处理两个直线墙之间的修剪关系
     * @returns 修剪后的源墙体和目标墙体几何数据
     */
    private _lineWallTrimLineWall(): {
        sourceGeom: THREE.Vector3[];
        targetGeom: THREE.Vector3[];
    };

    /**
     * 使用角平分线方法计算直线墙修剪直线墙
     * 当两墙夹角接近180度时使用此方法
     * @returns 修剪后的源墙体和目标墙体几何数据
     */
    private _calcLineTrimLineWithBisector(): {
        sourceGeom: THREE.Vector3[] | undefined;
        targetGeom: THREE.Vector3[] | undefined;
    };

    /**
     * 直线墙修剪弧形墙
     * @returns 修剪后的源墙体和目标墙体几何数据
     */
    private _lineWallTrimArcWall(): {
        sourceGeom: THREE.Vector3[];
        targetGeom: THREE.Vector3[];
    };

    /**
     * 弧形墙修剪直线墙
     * @returns 修剪后的源墙体和目标墙体几何数据
     */
    private _arcWallTrimLineWall(): {
        sourceGeom: THREE.Vector3[];
        targetGeom: THREE.Vector3[];
    };

    /**
     * 弧形墙修剪弧形墙
     * @returns 修剪后的源墙体和目标墙体几何数据
     */
    private _arcWallTrimArcWall(): {
        sourceGeom: THREE.Vector3[];
        targetGeom: THREE.Vector3[];
    };
}