/**
 * CeilingUtil - 天花板工具类
 * 提供天花板操作和计算的核心功能
 */

import { Ceiling } from './Ceiling';
import { Vector2, Vector3 } from 'three';

/**
 * 天花板工具类
 * 包含天花板的各种操作和计算方法
 */
export class CeilingUtil {
    /**
     * 创建矩形天花板
     * @param width 宽度
     * @param length 长度
     * @param height 高度
     * @returns 天花板对象
     */
    public static createRectangularCeiling(
        width: number,
        length: number,
        height: number = 2800
    ): Ceiling {
        const ceiling = new Ceiling();
        (ceiling as any).width = width;
        (ceiling as any).length = length;
        (ceiling as any).height = height;
        return ceiling;
    }

    /**
     * 计算天花板面积
     * @param ceiling 天花板对象
     * @returns 面积
     */
    public static calculateArea(ceiling: Ceiling): number {
        const contour = (ceiling as any).contour as Vector2[];
        if (!contour || contour.length < 3) {
            const width = (ceiling as any).width || 0;
            const length = (ceiling as any).length || 0;
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
     * 获取天花板高度
     * @param ceiling 天花板对象
     * @returns 高度
     */
    public static getCeilingHeight(ceiling: Ceiling): number {
        return (ceiling as any).height || 2800;
    }

    /**
     * 设置天花板高度
     * @param ceiling 天花板对象
     * @param height 高度
     */
    public static setCeilingHeight(ceiling: Ceiling, height: number): void {
        (ceiling as any).height = height;
    }

    /**
     * 判断是否为吊顶
     * @param ceiling 天花板对象
     * @returns 是否为吊顶
     */
    public static isSuspendedCeiling(ceiling: Ceiling): boolean {
        return (ceiling as any).suspended === true;
    }
}