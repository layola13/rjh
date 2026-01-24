/**
 * 布尔运算工具类
 * 用于处理几何边缘的点修正和拓扑优化
 */

import { Vector2, Line2d, Arc2d } from './geometry-types';
import { Logger } from './logger-types';

/**
 * 点在边缘上的位置类型
 */
declare enum PointPositionType {
    /** 曲线起点 */
    start = "start",
    /** 曲线终点 */
    end = "end"
}

/**
 * 曲线类型
 */
declare enum CurveType {
    /** 直线 */
    line = "line",
    /** 圆弧 */
    arc = "arc"
}

/**
 * 几何边缘接口
 */
interface GeometryEdge {
    /** 曲线对象（Line2d 或 Arc2d） */
    curve: Line2d | Arc2d;
}

/**
 * 点信息接口
 * 用于排序和关联曲线端点
 */
interface PointInfo {
    /** 曲线类型 */
    ctype: CurveType;
    /** 点位置类型（起点或终点） */
    ptype: PointPositionType;
    /** 点坐标 */
    pt: Vector2;
    /** 关联的边缘索引 */
    index: number;
}

/**
 * 扩展布尔运算工具类
 * 提供几何边缘的点修正功能，用于处理浮点数精度问题
 */
export declare class ExboolUtil {
    /**
     * 修正边缘集合中的点位置
     * 解决由于浮点数精度导致的近似重合点问题
     * 
     * @param edges - 几何边缘数组
     * 
     * @remarks
     * 该方法执行以下操作：
     * 1. 提取所有边缘的起点和终点
     * 2. 按 X 坐标排序，合并 X 坐标近似相等的点
     * 3. 按 Y 坐标排序，合并 Y 坐标近似相等的点
     * 4. 检测并修正几乎落在直线上的点
     * 5. 更新相关曲线的几何信息
     * 
     * @example
     *