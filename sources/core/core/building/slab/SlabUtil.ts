/**
 * SlabUtil - 楼板工具类
 * 提供楼板操作、计算和管理的核心功能
 */

import { Slab } from './Slab';
import { Vector3, Vector2 } from 'three';

/**
 * 楼板工具类
 * 包含楼板的各种操作和计算方法
 */
export class SlabUtil {
    /**
     * 创建矩形楼板
     * @param width 宽度
     * @param length 长度
     * @param thickness 厚度
     * @param position 位置
     * @returns 楼板对象
     */
    public static createRectangularSlab(
        width: number,
        length: number,
        thickness: number,
        position: Vector3 = new Vector3(0, 0, 0)
    ): Slab {
        const slab = new Slab();
        (slab as any).width = width;
        (slab as any).length = length;
        (slab as any).thickness = thickness;
        (slab as any).position = position.clone();
        return slab;
    }

    /**
     * 创建多边形楼板
     * @param contour 轮廓点
     * @param thickness 厚度
     * @param baseZ Z坐标
     * @returns 楼板对象
     */
    public static createPolygonSlab(
        contour: Vector2[],
        thickness: number,
        baseZ: number = 0
    ): Slab {
        const slab = new Slab();
        (slab as any).contour = contour.map(p => p.clone());
        (slab as any).thickness = thickness;
        (slab as any).baseZ = baseZ;
        return slab;
    }

    /**
     * 计算楼板面积
     * @param slab 楼板对象
     * @returns 面积
     */
    public static calculateArea(slab: Slab): number {
        const contour = (slab as any).contour as Vector2[];
        if (!contour || contour.length < 3) {
            return 0;
        }

        // 使用鞋带公式计算多边形面积
        let area = 0;
        const n = contour.length;

        for (let i = 0; i < n; i++) {
            const j = (i + 1) % n;
            area += contour[i].x * contour[j].y;
            area -= contour[j].x * contour[i].y;
        }

        return Math.abs(area) / 2;
    }

    /**
     * 计算楼板体积
     * @param slab 楼板对象
     * @returns 体积
     */
    public static calculateVolume(slab: Slab): number {
        const area = this.calculateArea(slab);
        const thickness = (slab as any).thickness || 0;
        return area * thickness;
    }

    /**
     * 计算楼板周长
     * @param slab 楼板对象
     * @returns 周长
     */
    public static calculatePerimeter(slab: Slab): number {
        const contour = (slab as any).contour as Vector2[];
        if (!contour || contour.length < 2) {
            return 0;
        }

        let perimeter = 0;
        const n = contour.length;

        for (let i = 0; i < n; i++) {
            const j = (i + 1) % n;
            perimeter += contour[i].distanceTo(contour[j]);
        }

        return perimeter;
    }

    /**
     * 获取楼板边界框
     * @param slab 楼板对象
     * @returns 边界框 {min, max}
     */
    public static getBoundingBox(slab: Slab): { min: Vector3; max: Vector3 } {
        const contour = (slab as any).contour as Vector2[];
        const baseZ = (slab as any).baseZ || 0;
        const thickness = (slab as any).thickness || 0;

        if (!contour || contour.length === 0) {
            return {
                min: new Vector3(0, 0, 0),
                max: new Vector3(0, 0, 0)
            };
        }

        const minX = Math.min(...contour.map(p => p.x));
        const maxX = Math.max(...contour.map(p => p.x));
        const minY = Math.min(...contour.map(p => p.y));
        const maxY = Math.max(...contour.map(p => p.y));

        return {
            min: new Vector3(minX, minY, baseZ),
            max: new Vector3(maxX, maxY, baseZ + thickness)
        };
    }

    /**
     * 判断点是否在楼板内
     * @param slab 楼板对象
     * @param point 点坐标
     * @param ignoreZ 是否忽略Z坐标
     * @returns 是否在楼板内
     */
    public static containsPoint(slab: Slab, point: Vector3, ignoreZ: boolean = false): boolean {
        const contour = (slab as any).contour as Vector2[];
        if (!contour || contour.length < 3) {
            return false;
        }

        const point2D = new Vector2(point.x, point.y);

        // 检查Z坐标
        if (!ignoreZ) {
            const baseZ = (slab as any).baseZ || 0;
            const thickness = (slab as any).thickness || 0;
            if (point.z < baseZ || point.z > baseZ + thickness) {
                return false;
            }
        }

        // 使用射线法判断点是否在多边形内
        let inside = false;
        const n = contour.length;

        for (let i = 0, j = n - 1; i < n; j = i++) {
            const xi = contour[i].x;
            const yi = contour[i].y;
            const xj = contour[j].x;
            const yj = contour[j].y;

            const intersect = ((yi > point2D.y) !== (yj > point2D.y)) &&
                (point2D.x < (xj - xi) * (point2D.y - yi) / (yj - yi) + xi);

            if (intersect) {
                inside = !inside;
            }
        }

        return inside;
    }

    /**
     * 分割楼板
     * @param slab 楼板对象
     * @param splitLine 分割线
     * @returns 分割后的楼板数组
     */
    public static splitSlab(slab: Slab, splitLine: [Vector2, Vector2]): Slab[] {
        // 简化实现：实际需要复杂的多边形分割算法
        return [slab];
    }

    /**
     * 合并楼板
     * @param slabs 楼板数组
     * @returns 合并后的楼板，如果无法合并则返回null
     */
    public static mergeSlabs(slabs: Slab[]): Slab | null {
        if (slabs.length === 0) return null;
        if (slabs.length === 1) return slabs[0];

        // 简化实现：实际需要复杂的多边形合并算法
        return null;
    }

    /**
     * 偏移楼板轮廓
     * @param slab 楼板对象
     * @param offset 偏移量
     * @returns 偏移后的楼板
     */
    public static offsetContour(slab: Slab, offset: number): Slab {
        const newSlab = (slab as any).clone() as Slab;
        // 简化实现：实际需要多边形偏移算法
        return newSlab;
    }

    /**
     * 简化楼板轮廓
     * @param slab 楼板对象
     * @param tolerance 容差
     */
    public static simplifyContour(slab: Slab, tolerance: number = 0.01): void {
        const contour = (slab as any).contour as Vector2[];
        if (!contour || contour.length < 4) {
            return;
        }

        const simplified: Vector2[] = [contour[0]];

        for (let i = 1; i < contour.length - 1; i++) {
            const prev = contour[i - 1];
            const curr = contour[i];
            const next = contour[i + 1];

            const dist = this.pointToSegmentDistance(curr, prev, next);

            if (dist > tolerance) {
                simplified.push(curr);
            }
        }

        simplified.push(contour[contour.length - 1]);

        (slab as any).contour = simplified;
    }

    /**
     * 计算点到线段的距离
     * @private
     */
    private static pointToSegmentDistance(point: Vector2, lineStart: Vector2, lineEnd: Vector2): number {
        const dx = lineEnd.x - lineStart.x;
        const dy = lineEnd.y - lineStart.y;
        const lengthSquared = dx * dx + dy * dy;

        if (lengthSquared === 0) {
            return point.distanceTo(lineStart);
        }

        let t = ((point.x - lineStart.x) * dx + (point.y - lineStart.y) * dy) / lengthSquared;
        t = Math.max(0, Math.min(1, t));

        const projection = new Vector2(
            lineStart.x + t * dx,
            lineStart.y + t * dy
        );

        return point.distanceTo(projection);
    }

    /**
     * 判断两个楼板是否相交
     * @param slab1 楼板1
     * @param slab2 楼板2
     * @returns 是否相交
     */
    public static intersects(slab1: Slab, slab2: Slab): boolean {
        // 首先检查边界框
        const box1 = this.getBoundingBox(slab1);
        const box2 = this.getBoundingBox(slab2);

        if (!this.boxesIntersect(box1, box2)) {
            return false;
        }

        // 检查轮廓是否相交
        const contour1 = (slab1 as any).contour as Vector2[];
        const contour2 = (slab2 as any).contour as Vector2[];

        if (!contour1 || !contour2) {
            return false;
        }

        // 检查是否有任何点在对方内部
        for (const point of contour1) {
            if (this.containsPoint(slab2, new Vector3(point.x, point.y, 0), true)) {
                return true;
            }
        }

        for (const point of contour2) {
            if (this.containsPoint(slab1, new Vector3(point.x, point.y, 0), true)) {
                return true;
            }
        }

        return false;
    }

    /**
     * 判断边界框是否相交
     * @private
     */
    private static boxesIntersect(
        box1: { min: Vector3; max: Vector3 },
        box2: { min: Vector3; max: Vector3 }
    ): boolean {
        return !(
            box1.max.x < box2.min.x || box1.min.x > box2.max.x ||
            box1.max.y < box2.min.y || box1.min.y > box2.max.y ||
            box1.max.z < box2.min.z || box1.min.z > box2.max.z
        );
    }

    /**
     * 获取楼板中心点
     * @param slab 楼板对象
     * @returns 中心点坐标
     */
    public static getCenter(slab: Slab): Vector3 {
        const contour = (slab as any).contour as Vector2[];
        const baseZ = (slab as any).baseZ || 0;
        const thickness = (slab as any).thickness || 0;

        if (!contour || contour.length === 0) {
            return new Vector3(0, 0, baseZ + thickness / 2);
        }

        const sum = contour.reduce(
            (acc, p) => new Vector2(acc.x + p.x, acc.y + p.y),
            new Vector2(0, 0)
        );

        const center2D = new Vector2(
            sum.x / contour.length,
            sum.y / contour.length
        );

        return new Vector3(center2D.x, center2D.y, baseZ + thickness / 2);
    }

    /**
     * 复制楼板
     * @param slab 源楼板
     * @returns 新楼板
     */
    public static cloneSlab(slab: Slab): Slab {
        return (slab as any).clone() as Slab;
    }

    /**
     * 验证楼板是否有效
     * @param slab 楼板对象
     * @returns 是否有效
     */
    public static isValid(slab: Slab): boolean {
        const contour = (slab as any).contour as Vector2[];
        const thickness = (slab as any).thickness;

        if (!contour || contour.length < 3) {
            return false;
        }

        if (thickness === undefined || thickness <= 0) {
            return false;
        }

        return true;
    }

    /**
     * 获取楼板的顶面Z坐标
     * @param slab 楼板对象
     * @returns 顶面Z坐标
     */
    public static getTopZ(slab: Slab): number {
        const baseZ = (slab as any).baseZ || 0;
        const thickness = (slab as any).thickness || 0;
        return baseZ + thickness;
    }

    /**
     * 获取楼板的底面Z坐标
     * @param slab 楼板对象
     * @returns 底面Z坐标
     */
    public static getBottomZ(slab: Slab): number {
        return (slab as any).baseZ || 0;
    }
}