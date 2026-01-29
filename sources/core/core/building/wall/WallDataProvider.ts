/**
 * WallDataProvider - 墙体数据提供者
 * 提供墙体相关数据的访问和管理接口
 */

import { Wall } from '../Wall';

/**
 * 墙体数据接口
 */
export interface WallData {
    /** 墙体ID */
    id: string;
    /** 墙体类型 */
    type: string;
    /** 墙体属性 */
    properties: any;
    /** 墙体几何数据 */
    geometry?: any;
    /** 墙体材质数据 */
    materials?: any[];
}

/**
 * 墙体数据提供者类
 * 管理和提供墙体数据访问
 */
export class WallDataProvider {
    /** 墙体数据缓存 */
    private dataCache: Map<string, WallData> = new Map();
    
    /** 数据监听器 */
    private listeners: Array<(wall: Wall, data: WallData) => void> = [];

    /**
     * 获取墙体数据
     * @param wall 墙体对象
     * @returns 墙体数据
     */
    public getData(wall: Wall): WallData | undefined {
        return this.dataCache.get(wall.id);
    }

    /**
     * 设置墙体数据
     * @param wall 墙体对象
     * @param data 墙体数据
     */
    public setData(wall: Wall, data: WallData): void {
        this.dataCache.set(wall.id, data);
        this.notifyListeners(wall, data);
    }

    /**
     * 移除墙体数据
     * @param wallId 墙体ID
     */
    public removeData(wallId: string): void {
        this.dataCache.delete(wallId);
    }

    /**
     * 清空所有数据
     */
    public clearAll(): void {
        this.dataCache.clear();
    }

    /**
     * 添加数据监听器
     * @param listener 监听器函数
     */
    public addListener(listener: (wall: Wall, data: WallData) => void): void {
        this.listeners.push(listener);
    }

    /**
     * 移除数据监听器
     * @param listener 监听器函数
     */
    public removeListener(listener: (wall: Wall, data: WallData) => void): void {
        const index = this.listeners.indexOf(listener);
        if (index !== -1) {
            this.listeners.splice(index, 1);
        }
    }

    /**
     * 通知所有监听器
     * @private
     */
    private notifyListeners(wall: Wall, data: WallData): void {
        this.listeners.forEach(listener => listener(wall, data));
    }

    /**
     * 获取所有墙体数据
     * @returns 墙体数据数组
     */
    public getAllData(): WallData[] {
        return Array.from(this.dataCache.values());
    }

    /**
     * 判断是否有墙体数据
     * @param wallId 墙体ID
     * @returns 是否存在
     */
    public hasData(wallId: string): boolean {
        return this.dataCache.has(wallId);
    }
}