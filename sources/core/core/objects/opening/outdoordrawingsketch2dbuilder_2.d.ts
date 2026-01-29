import { Loop, Vector2, MathAlg, Polygon } from './math-types';
import { ExtraordinarySketch2dBuilder } from './extraordinary-sketch-2d-builder';
import { ExtraordinaryBackground } from './extraordinary-background';
import { ExtraordinaryGuideline } from './extraordinary-guideline';

/**
 * 户外绘图Sketch2D构建器
 * 用于处理户外图层的2D草图构建，包括面、指导线和背景的管理
 */
export declare class OutdoorDrawingSketch2dBuilder extends ExtraordinarySketch2dBuilder {
    /**
     * 面拓扑标签常量
     * 用于标识有效的面区域
     */
    static readonly FaceTopoTag: 'face';

    /**
     * 绘制面拓扑标签常量
     * 用于标识通过绘制操作创建的面区域
     */
    static readonly DrawFaceTopoTag: 'drawFace';

    /**
     * 关联的户外图层对象
     */
    private _layer: OutdoorLayer;

    /**
     * 构造函数
     * @param layer - 户外图层实例，包含楼板草图指导线和面数据
     */
    constructor(layer: OutdoorLayer);

    /**
     * 通过户外图层初始化Sketch2D
     * 1. 从图层提取指导线
     * 2. 创建超大背景
     * 3. 从地板面提取路径并添加为区域
     * 4. 过滤有效面并更新草图
     * @param layer - 户外图层实例
     */
    private _initByOuterDoorLayer(layer: OutdoorLayer): void;

    /**
     * 更新附加数据
     * 处理面的合并、过滤和楼板更新逻辑
     * @param options - 更新选项
     * @param options.removeFacesWithBkg - 是否移除与背景重叠的面
     * @param options.drawRegions - 绘制的区域数组，用于过滤不在这些区域内的面
     * @param options.faceTranslation - 面的平移向量，用于更新楼板位置
     */
    updateAppendix(options?: {
        removeFacesWithBkg?: boolean;
        drawRegions?: Array<BuilderRegion>;
        faceTranslation?: Vector2;
    }): void;

    /**
     * 获取预构建的面区域
     * @param includeHoles - 是否包含孔洞
     * @returns 符合拓扑标签要求的面区域数组
     */
    protected _getPreBuildFaceRegions(includeHoles: boolean): BuilderRegion[];

    /**
     * 过滤有效的面
     * 仅保留包含有效拓扑标签（FaceTopoTag 或 DrawFaceTopoTag）的面
     */
    private _filterValidFaces(): void;

    /**
     * 移除与背景完全重叠的面
     * 通过环形位置判断，移除与背景第一个区域完全相等的面
     */
    private _removeFacesWithBkg(): void;

    /**
     * 判断拓扑标签是否有效
     * @param topos - 拓扑字符串，包含面的标签信息
     * @returns 是否包含 FaceTopoTag 或 DrawFaceTopoTag
     */
    private _isToposValid(topos: string): boolean;

    /**
     * 判断是否为绘制面
     * @param topos - 拓扑字符串
     * @returns 是否包含 DrawFaceTopoTag
     */
    private _isToposDrawFace(topos: string): boolean;

    /**
     * 创建超大背景区域
     * 生成一个10000x10000的正方形背景，用于包含所有绘图元素
     * @returns 超大背景实例
     */
    private _createSuperLargeBackground(): ExtraordinaryBackground;
}

/**
 * 户外图层接口
 * 包含楼板草图指导线和面的集合
 */
interface OutdoorLayer {
    /** 楼板Sketch2D指导线数组 */
    slabSketch2dGuildLines: Array<{
        curve: Curve;
        fromAnchor: Anchor;
        endAnchor: Anchor;
        type: GuidelineType;
    }>;
    /** 面的集合，键为面ID */
    faces: Record<string, Face>;
}

/**
 * 面接口
 * 表示3D模型中的面元素
 */
interface Face {
    /** 获取世界坐标系下的2D原始路径 */
    readonly worldRawPath2d: RawPath2d;
}

/**
 * 2D原始路径
 * 包含外轮廓和孔洞的曲线集合
 */
interface RawPath2d {
    /** 外轮廓曲线数组 */
    outer: Curve[];
    /** 孔洞数组，每个孔洞包含多条曲线 */
    holes: Curve[][];
}

/**
 * 构建器区域
 * 用于表示待构建的面区域
 */
interface BuilderRegion {
    /** 外轮廓，包含曲线的包装对象数组 */
    outer: Array<{ curve: Curve }>;
    /** 孔洞数组，每个孔洞包含多个曲线包装对象 */
    holes: Array<Array<{ curve: Curve }>>;
    /** 拓扑标签字符串 */
    topo: string;
}

/**
 * 曲线类型（抽象）
 * 表示2D或3D空间中的曲线
 */
type Curve = unknown;

/**
 * 锚点类型
 * 表示曲线的端点或连接点
 */
type Anchor = unknown;

/**
 * 指导线类型枚举
 */
type GuidelineType = unknown;