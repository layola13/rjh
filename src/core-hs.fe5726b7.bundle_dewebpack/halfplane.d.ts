/**
 * 半平面类，用于表示二维空间中的半平面
 * 半平面由法向量w和常数b定义，满足不等式 w·p + b >= 0 的点p在半平面内
 */
export declare class HalfPlane {
    /**
     * 法向量的x分量
     */
    private w: {
        x: number;
        y: number;
    };

    /**
     * 半平面方程的常数项
     * 半平面表示为: w.x * x + w.y * y + b >= 0
     */
    private b: number;

    /**
     * 通过二维线段创建半平面
     * @param line 二维线段对象
     * @returns 新创建的半平面实例
     */
    static createByLine2d(line: Line2d): HalfPlane;

    /**
     * 构造半平面
     * @param point1 起点或法向量
     * @param point2OrConstant 终点或常数b
     * - 如果是点对象(含x,y属性)，则通过两点定义半平面
     * - 如果是数值，则直接使用point1作为法向量，此参数作为常数b
     */
    constructor(
        point1: { x: number; y: number },
        point2OrConstant: { x: number; y: number } | number
    );

    /**
     * 获取半平面的单位法向量
     * @returns 单位法向量Vector2对象
     */
    get normal(): Vector2;

    /**
     * 计算点到半平面的有向距离
     * @param point 待计算的点
     * @returns 有向距离，正值表示点在半平面内侧，负值表示在外侧
     */
    distance(point: { x: number; y: number }): number;

    /**
     * 克隆当前半平面
     * @returns 新的半平面实例
     */
    clone(): HalfPlane;

    /**
     * 将半平面转换为二维线段
     * 返回位于半平面边界上的一条线段
     * @returns 二维线段对象
     */
    toLine2d(): Line2d;

    /**
     * 沿法向量方向偏移半平面
     * @param distance 偏移距离，正值向法向量方向偏移
     * @returns 当前半平面实例(支持链式调用)
     */
    offset(distance: number): this;

    /**
     * 计算两个半平面边界线的交点
     * @param other 另一个半平面
     * @returns 交点坐标
     */
    intersect(other: HalfPlane): { x: number; y: number };

    /**
     * 判断两个半平面是否平行
     * @param other 另一个半平面
     * @param tolerance 容差值，默认1e-6
     * @returns 是否平行
     */
    parallel(other: HalfPlane, tolerance?: number): boolean;

    /**
     * 使用半平面数组裁剪网格数组
     * @param meshes 待裁剪的网格数组
     * @param halfPlanes 用于裁剪的半平面数组，默认为空数组
     * @returns 裁剪后的网格数组
     */
    static cut<T>(meshes: T[], halfPlanes?: HalfPlane[]): T[];

    /**
     * 序列化半平面为普通对象
     * @returns 包含半平面数据的普通对象
     */
    dump(): {
        w: { x: number; y: number };
        b: number;
    };

    /**
     * 从序列化数据加载半平面
     * @param data 序列化的半平面数据
     * @returns 新的半平面实例
     */
    static load(data: {
        w: { x: number; y: number };
        b: number;
    }): HalfPlane;
}

/**
 * 二维向量类型(来自依赖模块)
 */
interface Vector2 {
    x: number;
    y: number;
}

/**
 * 二维线段类型(来自依赖模块)
 */
interface Line2d {
    getDirection(): { x: number; y: number };
    getStartPt(): { x: number; y: number };
}