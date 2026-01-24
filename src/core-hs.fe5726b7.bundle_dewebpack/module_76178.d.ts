/**
 * 几何工具模块 - 线段、直线计算与路径偏移
 * @module GeometryUtils
 */

/**
 * 表示二维线段的类
 */
export declare class LineSeg {
    /**
     * 线段起点
     */
    start: THREE.Vector2;

    /**
     * 线段终点
     */
    end: THREE.Vector2;

    /**
     * 创建一个新的线段实例，默认起点和终点都在原点
     */
    constructor();

    /**
     * 判断当前线段与另一条线段是否相交（单向检测）
     * @param segment - 待检测的线段
     * @returns 如果线段相交返回 true，否则返回 false
     * @remarks 此方法仅检测单向相交，完整相交判断需配合 checkForCross 使用
     */
    isCrosses(segment: LineSeg): boolean;
}

/**
 * 表示二维直线的类（一般式：Ax + By + C = 0）
 * @internal
 */
declare class Line {
    /**
     * 直线方程系数 A（归一化后）
     */
    A: number;

    /**
     * 直线方程系数 B（归一化后）
     */
    B: number;

    /**
     * 直线方程系数 C（归一化后）
     */
    C: number;

    /**
     * 构造函数
     * @param point1 - 直线上的第一个点（可选）
     * @param point2 - 直线上的第二个点（可选）
     * @remarks 如果参数为 null，则创建默认直线 x = 0
     */
    constructor(point1?: THREE.Vector2 | null, point2?: THREE.Vector2 | null);

    /**
     * 通过两点重新计算直线方程
     * @param point1 - 直线上的第一个点
     * @param point2 - 直线上的第二个点
     */
    Make(point1?: THREE.Vector2 | null, point2?: THREE.Vector2 | null): void;

    /**
     * 计算当前直线与另一条直线的交点
     * @param line - 另一条直线
     * @returns 两直线的交点坐标
     */
    Cross(line: Line): THREE.Vector2;

    /**
     * 计算当前直线与线段的交点
     * @param segment - 线段
     * @returns 直线与线段的交点坐标
     */
    CrossLineSeg(segment: LineSeg): THREE.Vector2;

    /**
     * 将直线沿法向量方向偏移指定距离
     * @param distance - 偏移距离
     */
    Offset(distance: number): void;

    /**
     * 判断当前直线是否与另一条直线平行
     * @param line - 另一条直线
     * @returns 如果平行返回 true，否则返回 false
     */
    parallel(line: Line): boolean;

    /**
     * 计算点到直线的有向距离
     * @param point - 待计算的点
     * @returns 点代入直线方程的计算结果
     */
    Calc(point: THREE.Vector2): number;
}

/**
 * 检测三点构成的转角是否为凸角
 * @param prev - 前一个点
 * @param current - 当前点
 * @param next - 下一个点
 * @returns 如果构成凸角（逆时针转向或共线）返回 true，否则返回 false
 * @remarks 使用叉积判断，阈值为 -1e-6
 */
export declare function checkForConvex(
    prev: THREE.Vector2,
    current: THREE.Vector2,
    next: THREE.Vector2
): boolean;

/**
 * 检测两条线段是否相交（双向检测）
 * @param segment1 - 第一条线段
 * @param segment2 - 第二条线段
 * @returns 如果两线段相交返回 true，否则返回 false
 * @remarks 需要双向调用 isCrosses 确保完整相交判断
 */
export declare function checkForCross(segment1: LineSeg, segment2: LineSeg): boolean;

/**
 * 将路径按凹凸性分割为内外两条偏移路径
 * @param originalPath - 原始路径顶点数组
 * @param offsetPath - 偏移后的路径顶点数组
 * @param innerSegments - 输出内侧线段数组（凸角处使用原始路径）
 * @param outerSegments - 输出外侧线段数组（凸角处使用偏移路径）
 * @remarks 
 * - 根据每个顶点的凹凸性动态选择原始或偏移路径的点
 * - 输出数组会被清空后填充
 * - 凸角：使用原始路径作为内侧，偏移路径作为外侧
 * - 凹角：使用偏移路径作为内侧，原始路径作为外侧
 */
export declare function offsetPathSplit(
    originalPath: THREE.Vector2[],
    offsetPath: THREE.Vector2[],
    innerSegments: LineSeg[],
    outerSegments: LineSeg[]
): void;

/**
 * 几何计算精度阈值
 * @internal
 */
declare const EPSILON: 1e-6;