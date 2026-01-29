/**
 * MoldingUtil - 线条工具类
 * 提供线条操作、计算和管理的核心功能
 */

import { Molding } from './Molding';
import { Vector3, Curve, CurvePath } from 'three';

/**
 * 线条工具类
 * 包含线条的各种操作和计算方法
 */
export class MoldingUtil {
    /**
     * 创建直线线条
     * @param start 起点
     * @param end 终点
     * @param profile 截面轮廓
     * @returns 线条对象
     */
    public static createStraightMolding(
        start: Vector3,
        end: Vector3,
        profile: any
    ): Molding {
        const molding = new Molding();
        (molding as any).start = start.clone();
        (molding as any).end = end.clone();
        (molding as any).profile = profile;
        return molding;
    }

    /**
     * 创建弧形线条
     * @param center 圆心
     * @param radius 半径
     * @param startAngle 起始角度
     * @param endAngle 结束角度
     * @param profile 截面轮廓
     * @returns 线条对象
     */
    public static createArcMolding(
        center: Vector3,
        radius: number,
        startAngle: number,
        endAngle: number,
        profile: any
    ): Molding {
        const molding = new Molding();
        (molding as any).center = center.clone();
        (molding as any).radius = radius;
        (molding as any).startAngle = startAngle;
        (molding as any).endAngle = endAngle;
        (molding as any).profile = profile;
        (molding as any).isArc = true;
        return molding;
    }

    /**
     * 计算线条长度
     * @param molding 线条对象
     * @returns 长度
     */
    public static calculateLength(molding: Molding): number {
        const moldingData = molding as any;

        if (moldingData.isArc) {
            // 弧形线条
            const radius = moldingData.radius || 0;
            const startAngle = moldingData.startAngle || 0;
            const endAngle = moldingData.endAngle || 0;
            const angleRange = Math.abs(endAngle - startAngle);
            return radius * angleRange;
        } else {
            // 直线线条
            const start = moldingData.start as Vector3;
            const end = moldingData.end as Vector3;
            return start ? start.distanceTo(end) : 0;
        }
    }

    /**
     * 获取线条上的点
     * @param molding 线条对象
     * @param t 参数（0-1）
     * @returns 点坐标
     */
    public static getPointAt(molding: Molding, t: number): Vector3 {
        t = Math.max(0, Math.min(1, t));
        const moldingData = molding as any;

        if (moldingData.isArc) {
            // 弧形线条
            const center = moldingData.center as Vector3;
            const radius = moldingData.radius || 0;
            const startAngle = moldingData.startAngle || 0;
            const endAngle = moldingData.endAngle || 0;
            const angle = startAngle + (endAngle - startAngle) * t;

            return new Vector3(
                center.x + radius * Math.cos(angle),
                center.y + radius * Math.sin(angle),
                center.z
            );
        } else {
            // 直线线条
            const start = moldingData.start as Vector3;
            const end = moldingData.end as Vector3;
            return new Vector3().lerpVectors(start, end, t);
        }
    }

    /**
     * 获取线条上的切向量
     * @param molding 线条对象
     * @param t 参数（0-1）
     * @returns 切向量
     */
    public static getTangentAt(molding: Molding, t: number): Vector3 {
        t = Math.max(0, Math.min(1, t));
        const moldingData = molding as any;

        if (moldingData.isArc) {
            // 弧形线条
            const startAngle = moldingData.startAngle || 0;
            const endAngle = moldingData.endAngle || 0;
            const angle = startAngle + (endAngle - startAngle) * t;

            return new Vector3(
                -Math.sin(angle),
                Math.cos(angle),
                0
            ).normalize();
        } else {
            // 直线线条
            const start = moldingData.start as Vector3;
            const end = moldingData.end as Vector3;
            return new Vector3().subVectors(end, start).normalize();
        }
    }

    /**
     * 分割线条
     * @param molding 线条对象
     * @param t 分割参数（0-1）
     * @returns 分割后的两个线条
     */
    public static splitMolding(molding: Molding, t: number): [Molding, Molding] {
        t = Math.max(0, Math.min(1, t));
        const splitPoint = this.getPointAt(molding, t);
        const moldingData = molding as any;

        const molding1 = (molding as any).clone() as Molding;
        const molding2 = (molding as any).clone() as Molding;

        if (moldingData.isArc) {
            // 弧形线条
            const startAngle = moldingData.startAngle || 0;
            const endAngle = moldingData.endAngle || 0;
            const midAngle = startAngle + (endAngle - startAngle) * t;

            (molding1 as any).endAngle = midAngle;
            (molding2 as any).startAngle = midAngle;
        } else {
            // 直线线条
            (molding1 as any).end = splitPoint.clone();
            (molding2 as any).start = splitPoint.clone();
        }

        return [molding1, molding2];
    }

    /**
     * 合并线条
     * @param moldings 线条数组
     * @returns 合并后的线条，如果无法合并则返回null
     */
    public static mergeMoldings(moldings: Molding[]): Molding | null {
        if (moldings.length === 0) return null;
        if (moldings.length === 1) return moldings[0];

        // 简化实现：只合并连续的直线线条
        const first = moldings[0];
        const last = moldings[moldings.length - 1];

        const firstData = first as any;
        const lastData = last as any;

        if (firstData.isArc || lastData.isArc) {
            return null; // 不支持合并弧形线条
        }

        const merged = (first as any).clone() as Molding;
        (merged as any).end = (lastData.end as Vector3).clone();

        return merged;
    }

    /**
     * 偏移线条
     * @param molding 线条对象
     * @param offset 偏移距离
     * @param direction 偏移方向（可选，默认法向）
     * @returns 偏移后的线条
     */
    public static offsetMolding(
        molding: Molding,
        offset: number,
        direction?: Vector3
    ): Molding {
        const newMolding = (molding as any).clone() as Molding;
        const moldingData = newMolding as any;

        if (!direction) {
            // 默认使用法向方向
            direction = this.getNormalAt(molding, 0.5);
        }

        const offsetVec = direction.clone().multiplyScalar(offset);

        if (moldingData.isArc) {
            // 弧形线条：调整半径
            moldingData.radius += offset;
            moldingData.center.add(offsetVec);
        } else {
            // 直线线条：移动起点和终点
            moldingData.start.add(offsetVec);
            moldingData.end.add(offsetVec);
        }

        return newMolding;
    }

    /**
     * 获取线条上的法向量
     * @param molding 线条对象
     * @param t 参数（0-1）
     * @returns 法向量
     */
    public static getNormalAt(molding: Molding, t: number): Vector3 {
        const tangent = this.getTangentAt(molding, t);
        // 假设线条在XY平面上，法向为Z轴方向的旋转
        return new Vector3(-tangent.y, tangent.x, 0).normalize();
    }

    /**
     * 计算线条边界框
     * @param molding 线条对象
     * @returns 边界框 {min, max}
     */
    public static getBoundingBox(molding: Molding): { min: Vector3; max: Vector3 } {
        const moldingData = molding as any;
        const samples = 20; // 采样点数量
        const points: Vector3[] = [];

        for (let i = 0; i <= samples; i++) {
            const t = i / samples;
            points.push(this.getPointAt(molding, t));
        }

        const min = new Vector3(
            Math.min(...points.map(p => p.x)),
            Math.min(...points.map(p => p.y)),
            Math.min(...points.map(p => p.z))
        );

        const max = new Vector3(
            Math.max(...points.map(p => p.x)),
            Math.max(...points.map(p => p.y)),
            Math.max(...points.map(p => p.z))
        );

        return { min, max };
    }

    /**
     * 判断点是否在线条上
     * @param molding 线条对象
     * @param point 点坐标
     * @param tolerance 容差
     * @returns 是否在线条上
     */
    public static isPointOnMolding(
        molding: Molding,
        point: Vector3,
        tolerance: number = 0.01
    ): boolean {
        const samples = 50;
        
        for (let i = 0; i <= samples; i++) {
            const t = i / samples;
            const samplePoint = this.getPointAt(molding, t);
            
            if (point.distanceTo(samplePoint) < tolerance) {
                return true;
            }
        }

        return false;
    }

    /**
     * 获取线条的起点
     * @param molding 线条对象
     * @returns 起点坐标
     */
    public static getStartPoint(molding: Molding): Vector3 {
        return this.getPointAt(molding, 0);
    }

    /**
     * 获取线条的终点
     * @param molding 线条对象
     * @returns 终点坐标
     */
    public static getEndPoint(molding: Molding): Vector3 {
        return this.getPointAt(molding, 1);
    }

    /**
     * 反转线条方向
     * @param molding 线条对象
     */
    public static reverseMolding(molding: Molding): void {
        const moldingData = molding as any;

        if (moldingData.isArc) {
            // 弧形线条：交换起始和结束角度
            const temp = moldingData.startAngle;
            moldingData.startAngle = moldingData.endAngle;
            moldingData.endAngle = temp;
        } else {
            // 直线线条：交换起点和终点
            const temp = moldingData.start;
            moldingData.start = moldingData.end;
            moldingData.end = temp;
        }
    }

    /**
     * 判断两个线条是否连接
     * @param molding1 线条1
     * @param molding2 线条2
     * @param tolerance 容差
     * @returns 是否连接
     */
    public static areMoldingsConnected(
        molding1: Molding,
        molding2: Molding,
        tolerance: number = 0.01
    ): boolean {
        const end1 = this.getEndPoint(molding1);
        const start2 = this.getStartPoint(molding2);

        return end1.distanceTo(start2) < tolerance;
    }

    /**
     * 创建线条路径
     * @param moldings 线条数组
     * @returns 路径对象
     */
    public static createPath(moldings: Molding[]): CurvePath<Vector3> {
        const path = new CurvePath<Vector3>();
        
        // 简化实现：实际需要根据线条类型创建对应的曲线
        return path;
    }

    /**
     * 简化线条（移除冗余点）
     * @param molding 线条对象
     * @param tolerance 容差
     */
    public static simplifyMolding(molding: Molding, tolerance: number = 0.01): void {
        // 简化实现：对于直线线条无需简化，对于复杂路径需要实现简化算法
    }

    /**
     * 验证线条是否有效
     * @param molding 线条对象
     * @returns 是否有效
     */
    public static isValid(molding: Molding): boolean {
        const moldingData = molding as any;

        if (moldingData.isArc) {
            // 弧形线条
            if (!moldingData.center || !moldingData.radius) {
                return false;
            }
            if (moldingData.radius <= 0) {
                return false;
            }
        } else {
            // 直线线条
            if (!moldingData.start || !moldingData.end) {
                return false;
            }
            if (moldingData.start.distanceTo(moldingData.end) < 0.001) {
                return false;
            }
        }

        return true;
    }

    /**
     * 克隆线条
     * @param molding 源线条
     * @returns 新线条
     */
    public static cloneMolding(molding: Molding): Molding {
        return (molding as any).clone() as Molding;
    }

    /**
     * 计算线条表面积（带截面）
     * @param molding 线条对象
     * @returns 表面积
     */
    public static calculateSurfaceArea(molding: Molding): number {
        const length = this.calculateLength(molding);
        const profile = (molding as any).profile;
        
        if (!profile || !profile.perimeter) {
            return 0;
        }

        return length * profile.perimeter;
    }

    /**
     * 计算线条体积（带截面）
     * @param molding 线条对象
     * @returns 体积
     */
    public static calculateVolume(molding: Molding): number {
        const length = this.calculateLength(molding);
        const profile = (molding as any).profile;
        
        if (!profile || !profile.area) {
            return 0;
        }

        return length * profile.area;
    }
}