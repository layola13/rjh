/**
 * CurtainHandler - 窗帘处理器
 * 处理窗帘的创建、调整和管理
 */

import { Curtain } from './Curtain';
import { Vector3 } from 'three';

/**
 * 窗帘类型枚举
 */
export enum CurtainHandlerType {
    /** 标准窗帘 */
    Standard = 'Standard',
    /** 罗马帘 */
    Roman = 'Roman',
    /** 百叶窗 */
    Venetian = 'Venetian',
    /** 卷帘 */
    Roller = 'Roller'
}

/**
 * 窗帘处理器类
 * 管理窗帘的各种操作
 */
export class CurtainHandler {
    /**
     * 创建标准窗帘
     * @param width 宽度
     * @param height 高度
     * @param position 位置
     * @returns 窗帘对象
     */
    public static createStandardCurtain(
        width: number,
        height: number,
        position: Vector3
    ): Curtain {
        const curtain = new Curtain();
        (curtain as any).width = width;
        (curtain as any).height = height;
        (curtain as any).position = position.clone();
        (curtain as any).type = CurtainHandlerType.Standard;
        return curtain;
    }

    /**
     * 调整窗帘尺寸
     * @param curtain 窗帘对象
     * @param width 新宽度
     * @param height 新高度
     */
    public static resize(curtain: Curtain, width: number, height: number): void {
        (curtain as any).width = width;
        (curtain as any).height = height;
    }

    /**
     * 设置窗帘开合状态
     * @param curtain 窗帘对象
     * @param openRatio 开合比例 (0-1)
     */
    public static setOpenRatio(curtain: Curtain, openRatio: number): void {
        (curtain as any).openRatio = Math.max(0, Math.min(1, openRatio));
    }

    /**
     * 获取窗帘开合状态
     * @param curtain 窗帘对象
     * @returns 开合比例
     */
    public static getOpenRatio(curtain: Curtain): number {
        return (curtain as any).openRatio || 0;
    }
}