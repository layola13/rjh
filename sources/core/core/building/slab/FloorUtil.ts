/**
 * FloorUtil - 地板工具类
 * 提供地板操作和计算的核心功能
 */

import { Floor } from './Floor';
import { Vector2, Vector3 } from 'three';

/**
 * 地板工具类
 * 包含地板的各种操作和计算方法
 */
export class FloorUtil {
    /**
     * 创建矩形地板
     * @param width 宽度
     * @param length 长度
     * @param thickness 厚度
     * @returns 地板对象
     */
    public static createRectangularFloor(
        width: number,
        length: number,
        thickness: number = 100
    ): Floor {
        const floor = new Floor();
        (floor as any).width = width;
        (floor as any).length = length;
        (floor as any).thickness = thickness;
        return floor;
    }

    /**
     * 计算地板面积
     * @param floor 地板对象
     * @returns 面积
     */
    public static calculateArea(floor: Floor): number {
        const contour = (floor as any).contour as Vector2[];
        if (!contour || contour.length < 3) {
            const width = (floor as any).width || 0;
            const length = (floor as any).length || 0;
            return width * length;
        }

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
     * 获取地板高度
     * @param floor 地板对象
     * @returns 高度
     */
    public static getFloorLevel(floor: Floor): number {
        return (floor as any).level || 0;
    }

    /**
     * 设置地板高度
     * @param floor 地板对象
     * @param level 高度
     */
    public static setFloorLevel(floor: Floor, level: number): void {
        (floor as any).level = level;
    }
}