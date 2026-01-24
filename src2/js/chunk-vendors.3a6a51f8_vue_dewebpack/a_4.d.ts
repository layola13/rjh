/**
 * DXF 图形处理库类型声明
 * 基于逆向工程和代码分析
 */

// ==================== 核心几何类型 ====================

/** 2D 点 */
export interface Point {
    x: number;
    y: number;
    z?: number;
}

/** 向量 */
export interface Vector {
    x: number;
    y: number;
}

/** 边界框 */
export interface Box {
    xmin: number;
    ymin: number;
    xmax: number;
    ymax: number;
}

// ==================== DXF 实体类型 ====================

/** 线段实体 */
export interface LineEntity {
    type: 'LINE';
    vertices: Point[];
    layer?: string;
    color?: number;
}

/** 圆弧实体 */
export interface ArcEntity {
    type: 'ARC';
    center: Point;
    radius: number;
    startAngle: number; // 弧度
    endAngle: number;   // 弧度
    layer?: string;
}

/** 圆形实体 */
export interface CircleEntity {
    type: 'CIRCLE';
    center: Point;
    radius: number;
    layer?: string;
}

/** 多段线实体 */
export interface PolylineEntity {
    type: 'POLYLINE' | 'LWPOLYLINE';
    vertices: Array<Point & { bulge?: number }>;
    closed?: boolean;
    layer?: string;
}

/** 样条曲线实体 */
export interface SplineEntity {
    type: 'SPLINE';
    controlPoints: Point[];
    fitPoints?: Point[];
    degree?: number;
    closed?: boolean;
}

/** DXF 实体联合类型 */
export type DxfEntity = 
    | LineEntity 
    | ArcEntity 
    | CircleEntity 
    | PolylineEntity 
    | SplineEntity;

// ==================== DXF 文档结构 ====================

/** DXF 图层 */
export interface Layer {
    name: string;
    color: number;
    lineType?: string;
    frozen?: boolean;
    visible?: boolean;
}

/** DXF 图块 */
export interface Block {
    name: string;
    handle?: string;
    position?: Point;
    entities: DxfEntity[];
}

/** DXF 解析结果 */
export interface DxfData {
    /** 文件头信息 */
    header?: Record<string, any>;
    
    /** 图层表 */
    tables?: {
        layers?: Record<string, Layer>;
        lineTypes?: Record<string, any>;
    };
    
    /** 实体列表 */
    entities?: DxfEntity[];
    
    /** 图块定义 */
    blocks?: Record<string, Block>;
}

// ==================== 输出配置 ====================

/** DXF 输出配置 */
export interface DxfWriteConfig {
    /** 横向布局 */
    horizontal?: boolean;
    
    /** 缩放比例 */
    scale?: number;
    
    /** 镜像 */
    mirror?: boolean;
}

/** 型材信息 */
export interface ProfileInfo {
    profile: string;
    dxf_path?: string;
    depthm?: number;
}

/** 插入交叉信息 */
export interface InsertionInfo {
    profile_from: string;
    profile_to: string;
    cross_value: number;
    offset_value?: number;
}

// ==================== 主要类定义 ====================

/** DXF 解析器 */
export class DxfParser {
    /**
     * 解析 DXF 字符串
     * @param dxfString DXF 文件内容
     * @returns 解析后的数据结构
     */
    parse(dxfString: string): DxfData | null;
    
    /**
     * 同步解析(别名)
     */
    parseSync(dxfString: string): DxfData | null;
}

/** DXF 绘图器 */
export class DxfWriter {
    /**
     * 添加图层
     */
    addLayer(name: string, color: number, lineType?: string): this;
    
    /**
     * 设置当前图层
     */
    setActiveLayer(name: string): this;
    
    /**
     * 绘制线段
     */
    drawLine(x1: number, y1: number, x2: number, y2: number): this;
    
    /**
     * 绘制圆弧
     */
    drawArc(
        cx: number, 
        cy: number, 
        radius: number, 
        startAngle: number, 
        endAngle: number
    ): this;
    
    /**
     * 绘制圆形
     */
    drawCircle(cx: number, cy: number, radius: number): this;
    
    /**
     * 绘制多段线
     */
    drawPolyline(
        points: Array<[number, number] | [number, number, number]>,
        closed?: boolean
    ): this;
    
    /**
     * 导出为 DXF 字符串
     */
    toDxfString(): string;
}

// ==================== 操作类 ====================

/** CAD 多边形数据 */
export interface CadPolygonData {
    minX_mm: number;
    minY_mm: number;
    maxX_mm: number;
    maxY_mm: number;
    cad_Polygon: Array<{
        type: string;
        start_point: Point;
        end_point: Point;
        center: Point;
        bulges?: number;
        startAngle?: number;
        endAngle?: number;
        radius?: number;
    }>;
}

/** DXF 操作类 */
export class DxfOperator {
    /**
     * 按水平方向写入文件
     */
    writeFileByHorizontal(
        insertions: InsertionInfo[],
        distances: any[],
        promiseArr: any[],
        isHorizontal?: boolean
    ): Promise<{
        dxf_blob: Blob;
        dxf_svg: string[];
    }>;
    
    /**
     * 坐标移动
     */
    dxfCoordinateMove(
        data: CadPolygonData,
        offsetX: number,
        offsetY: number
    ): CadPolygonData;
    
    /**
     * 镜像变换
     */
    dxfMirror(
        data: CadPolygonData,
        point: Point,
        isVertical?: boolean
    ): CadPolygonData;
    
    /**
     * 旋转变换
     */
    dxfRoate(
        data: CadPolygonData,
        angle: number,
        center: Point
    ): CadPolygonData;
    
    /**
     * 缩放变换
     */
    dxfScale(data: CadPolygonData, scale: number): CadPolygonData;
}

// ==================== 导出 ====================

/**
 * 默认导出的主类
 */
export default class DxfProcessor {
    constructor(
        layoutsInfo: any[],
        profiles: ProfileInfo[],
        insertions: InsertionInfo[],
        glassInfo?: ProfileInfo[]
    );
    
    /**
     * 输出处理结果
     */
    output(): Promise<{
        dxf_blob: Blob;
        dxf_svg: string[];
    }>;
}