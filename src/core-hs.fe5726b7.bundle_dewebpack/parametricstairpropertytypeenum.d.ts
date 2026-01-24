/**
 * 参数化楼梯模块
 * @module NCustomizedParametricStairs
 */

import { NCustomizedParametricModel, NCustomizedParametricModel_IO } from './NCustomizedParametricModel';
import { Vector3, Box3, Matrix4, Plane } from './geometry';
import { Material } from './material';
import { Loop, Curve2d, Curve3d } from './curves';
import { Shell, Face } from './brep';

/**
 * 楼梯属性面板类型枚举
 * 定义楼梯各种属性的标识符
 */
export enum ParametricStairPropertyTypeEnum {
    /** 楼梯高度 */
    HEIGHT = 'HEIGHT',
    /** 踏步数量 */
    STEP_NUMBER = 'STEP_NUMBER',
    /** 踏步高度 */
    STEP_HEIGHT = 'STEP_HEIGHT',
    /** 扶手厚度 */
    HANDRAIL_THICKNESS = 'HANDRAIL_THICKNESS'
}

/**
 * 楼梯材质部件类型枚举
 * 区分楼梯不同构件部分
 */
export enum ParametricStairMaterialPartTypeEnum {
    /** 主体结构 */
    MAIN = 'MAIN',
    /** 踏板 */
    TREAD = 'TREAD',
    /** 踢脚板 */
    KICK = 'KICK',
    /** 扶手 */
    HANDRAIL = 'HANDRAIL'
}

/**
 * 楼梯类型枚举
 */
export enum ParametricStairTypeEnum {
    /** 直梯 */
    STRAIGHT = 'STRAIGHT',
    /** L型梯 */
    L_SHAPE = 'L_SHAPE',
    /** U型梯 */
    U_SHAPE = 'U_SHAPE',
    /** 旋转梯 */
    SPIRAL = 'SPIRAL'
}

/**
 * 扶手侧面枚举
 */
export enum ParametricStairHandrailSideEnum {
    /** 左侧 */
    LEFT = 'LEFT',
    /** 右侧 */
    RIGHT = 'RIGHT',
    /** 双侧 */
    BOTH = 'BOTH',
    /** 无扶手 */
    NONE = 'NONE'
}

/**
 * 旋转方向枚举
 */
export enum ParametricStairRotationDirectionEnum {
    /** 顺时针 */
    CLOCKWISE = 'CLOCKWISE',
    /** 逆时针 */
    COUNTERCLOCKWISE = 'COUNTERCLOCKWISE'
}

/**
 * 楼梯参数接口
 */
interface StairParameters {
    /** 唯一标识符 */
    uuid: string;
    /** 属性映射表 */
    propertymp?: Record<string, any>;
    /** 房间轮廓 */
    roomLoop?: string;
    /** 房间高度 */
    roomHeight?: number;
    /** 楼梯类型 */
    stairsType: ParametricStairTypeEnum;
    /** 属性树数据 */
    propertytree?: any;
    /** 模型数据 */
    modelData?: StairModelData;
}

/**
 * 楼梯模型数据接口
 */
interface StairModelData {
    /** 数据模型 */
    dataModel: {
        /** 各部件ID映射 */
        parts: Record<string, number[]>;
        /** BREP壳体数组 */
        brepShells: BrepShell[];
        /** 灯带数据 */
        lightBands?: LightBandData[];
    };
    /** 默认变量值 */
    defaultVariables: Map<string, any>;
    /** 扶手扫掠路径 */
    handrailSweepPaths?: Curve3d[][][];
}

/**
 * BREP壳体接口
 */
interface BrepShell {
    /** 元素ID */
    eId: string | number;
    /** 壳体数组 */
    shells: Shell[];
}

/**
 * 灯带数据接口
 */
interface LightBandData {
    /** 壳体数组 */
    shells: Shell[];
}

/**
 * 属性记录类型
 */
type PropertyRecord = Record<string, any>;

/**
 * 面部更新信息接口
 */
interface FaceUpdateInfo {
    /** 面ID数组 */
    faceIds: string[];
    /** 材质 */
    material: Material;
}

/**
 * 投影路径接口
 */
interface ProjectionPath {
    /** 起始点 */
    startPoint: Vector3;
    /** 终止点 */
    endPoint: Vector3;
}

/**
 * 投影结果接口
 */
interface ProjectionResult {
    /** 2D路径 */
    paths: ProjectionPath[];
    /** 实际路径曲线 */
    realPaths: Curve2d[];
    /** 距离 */
    distance: number;
    /** 周长 */
    perimeter: number;
    /** 轮廓点集 */
    contours?: Array<Array<{ x: number; y: number }>>;
    /** 默认强度 */
    defaultIntensity?: number;
}

/**
 * 灯带图形数据接口
 */
interface LightBandGraphicsData {
    /** 面数据映射 */
    faces: Map<string, any>;
    /** 边数据映射 */
    edges: Map<string, any>;
}

/**
 * 参数化楼梯IO类
 * 负责楼梯模型的序列化和反序列化
 */
export class NCustomizedParametricStairs_IO extends NCustomizedParametricModel_IO {
    /**
     * 获取单例实例
     */
    static instance(): NCustomizedParametricStairs_IO;

    /**
     * 导出楼梯数据
     * @param entity - 楼梯实体
     * @param callback - 回调函数
     * @param includeGeometry - 是否包含几何数据
     * @param options - 额外选项
     * @returns 导出的数据数组
     */
    dump(
        entity: NCustomizedParametricStairs,
        callback?: (data: any[], entity: NCustomizedParametricStairs) => void,
        includeGeometry?: boolean,
        options?: Record<string, any>
    ): any[];

    /**
     * 加载楼梯数据
     * @param entity - 楼梯实体
     * @param data - 数据对象
     * @param options - 加载选项
     */
    load(
        entity: NCustomizedParametricStairs,
        data: any,
        options?: Record<string, any>
    ): void;
}

/**
 * 参数化楼梯模型类
 * 表示可定制的参数化楼梯实体
 */
export class NCustomizedParametricStairs extends NCustomizedParametricModel {
    /** 楼梯参数 */
    parameters: StairParameters;

    /** 内部灯带图形数据缓存 */
    private _innerLightBandGraphicsData?: LightBandGraphicsData;

    /**
     * 构造函数
     */
    constructor();

    /**
     * 通过元数据初始化楼梯
     * @param meta - 元数据对象
     * @param transform - 变换矩阵
     * @param initStairs - 是否初始化楼梯
     */
    initByMeta(meta: any, transform?: Matrix4, initStairs?: boolean): void;

    /**
     * 生成属性面板数据
     * @param propertyMap - 属性映射表
     * @returns 属性面板数据
     */
    generatePropertyPanelDatas(propertyMap: Record<string, any>): any;

    /**
     * 获取属性映射表
     * @returns 属性映射Map
     */
    getPropertyMap(): Map<ParametricStairPropertyTypeEnum, { name: string; value: any }>;

    /**
     * 根据部件类型获取面ID列表
     * @param partType - 部件类型
     * @returns 面ID数组
     */
    getFaceIdsByPartType(partType: ParametricStairMaterialPartTypeEnum): string[];

    /**
     * 获取部件材质映射
     * @returns 部件类型到材质的映射
     */
    getPartMaterialMap(): Map<string, Material>;

    /**
     * 获取需要更新的面信息
     * @returns 面更新信息数组
     */
    getNeedUpdateFaceInfos(): FaceUpdateInfo[] | undefined;

    /**
     * 获取模型数据
     * @param propertyRecord - 属性记录
     * @param useCache - 是否使用缓存
     * @returns 楼梯模型数据
     */
    getModelData(propertyRecord: PropertyRecord, useCache?: boolean): StairModelData | undefined;

    /**
     * 初始化楼梯
     * @param initialize - 是否初始化
     */
    initStairs(initialize: boolean): void;

    /**
     * 判断是否为底面
     * @param face - 面对象
     * @returns 是否为底面
     */
    isBottomFace(face: Face): boolean;

    /**
     * 获取底部面集合
     * @returns 底部面数组
     */
    getBottomFaces(): Face[];

    /**
     * 获取属性记录对象
     * @param propertyMap - 属性映射表
     * @returns 属性记录对象
     */
    getPropertyRecord(propertyMap?: Record<string, any>): PropertyRecord;

    /**
     * 获取默认属性值映射
     * @returns 属性类型到默认值的映射
     */
    getDefaultPropertyValueMap(): Map<ParametricStairPropertyTypeEnum, any>;

    /**
     * 更新默认材质
     * @param material - 材质对象
     */
    updateDefaultMaterial(material: Material): void;

    /**
     * 设置参数到楼梯
     * @param params - 参数对象
     */
    setParamsToStairs(params: Record<ParametricStairPropertyTypeEnum, any>): void;

    /**
     * 通过面标签获取网格键
     * @param faceTag - 面标签
     * @returns 网格键字符串
     */
    getMeshKeyByFaceTag(faceTag: string): string;

    /**
     * 初始化楼梯文档
     * @param initialize - 是否初始化
     * @param skipConstruct - 是否跳过构建
     */
    initStairsDocument(initialize: boolean, skipConstruct?: boolean): void;

    /**
     * 获取IO处理器
     * @returns IO实例
     */
    getIO(): NCustomizedParametricStairs_IO;

    /**
     * 获取图形选项
     * @param option - 基础选项
     * @param includeEdges - 是否包含边
     * @param highResolution - 是否高分辨率
     * @returns 图形选项对象
     */
    getGraphicsOption(option: any, includeEdges?: boolean, highResolution?: boolean): any;

    /**
     * 获取面的投影平面
     * @param meshKey - 网格键
     * @param faceData - 面数据
     * @returns 投影平面
     */
    getFaceProjectionPlane(meshKey: string, faceData?: any): Plane | undefined;

    /**
     * 获取用于顶部投影的BREP数组
     * @returns 壳体数组
     */
    getBrepsForTopProjection(): Shell[];

    /**
     * 获取主体包围盒
     * @returns 包围盒对象
     */
    getMainBox(): Box3;

    /**
     * 从元数据更新位置
     */
    updatePositionFromMeta(): void;

    /**
     * 生成子对象
     */
    generateChildren(): void;

    /**
     * 刷新内部边界
     */
    refreshBoundInternal(): void;

    /**
     * 字段变更回调
     * @param fieldName - 字段名
     * @param newValue - 新值
     * @param oldValue - 旧值
     */
    onFieldChanged(fieldName: string, newValue: any, oldValue: any): void;

    /**
     * 设置壳体默认材质
     * @param brepShell - BREP壳体
     */
    setShellDefaultMaterial(brepShell: BrepShell): void;

    /**
     * 构建BREP
     * @param params - 参数对象
     * @param initialize - 是否初始化
     * @param skipUpdate - 是否跳过更新
     */
    constructBrep(params?: PropertyRecord, initialize?: boolean, skipUpdate?: boolean): void;

    /**
     * 获取灯带数据
     * @returns 灯带数据数组
     */
    getLightBandData(): any[];

    /**
     * 获取内部灯带图形数据
     * @returns 灯带图形数据
     */
    getInnerLightBandGraphicsData(): LightBandGraphicsData | undefined;

    /**
     * 判断是否在房屋内
     * @returns 是否在房屋内
     */
    isInHouse(): boolean;

    /**
     * 获取灯带底部投影
     * @returns 投影结果数组
     */
    getLightBandBottomProjection(): ProjectionResult[];

    /**
     * 获取顶部投影选项
     * @returns 投影选项对象
     */
    getTopProjectOption(): { entityTag: string; excludeFaceTags: string[] };

    /**
     * 获取楼梯扶手2D路径
     * @returns 2D曲线数组
     */
    getStairsHandrail2DPaths(): Curve2d[][];

    /**
     * 根据楼层高度自动调整楼梯高度
     * @returns 是否进行了调整
     */
    autoHeightByLayerHeight(): boolean;

    /**
     * 内部方法：计算2D投影
     * @param curves - 3D曲线数组
     * @param plane - 投影平面
     * @returns 投影结果
     */
    private _calc2DProjection(curves: Curve3d[], plane: Plane): ProjectionResult;

    /**
     * 内部方法：清理不存在的材质
     */
    private _clearNonexistentMaterial(): void;

    /**
     * 内部方法：标记为脏数据
     */
    private _dirty(): void;
}