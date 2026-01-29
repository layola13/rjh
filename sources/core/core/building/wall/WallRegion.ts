/**
 * WallRegion - 墙体区域
 * 管理墙面的区域划分、材质分配和装饰
 */

import { Vector3, Vector2 } from 'three';

/**
 * 区域类型枚举
 */
export enum WallRegionType {
    /** 完整墙面 */
    Full = 'Full',
    /** 上部区域 */
    Upper = 'Upper',
    /** 中部区域 */
    Middle = 'Middle',
    /** 下部区域 */
    Lower = 'Lower',
    /** 自定义区域 */
    Custom = 'Custom'
}

/**
 * 墙体区域边界接口
 */
export interface WallRegionBounds {
    /** 最小点 */
    min: Vector2;
    /** 最大点 */
    max: Vector2;
}

/**
 * 墙体区域类
 * 用于墙面的分区和材质管理
 */
export class WallRegion {
    /** 区域ID */
    public id: string;
    
    /** 区域类型 */
    public type: WallRegionType;
    
    /** 区域轮廓点（2D） */
    public contour: Vector2[] = [];
    
    /** 区域边界 */
    public bounds: WallRegionBounds;
    
    /** 区域材质ID */
    public materialId?: string;
    
    /** 区域高度范围 */
    public heightRange?: { min: number; max: number };
    
    /** 是否可见 */
    public visible: boolean = true;
    
    /** 自定义数据 */
    public userData: any = {};

    /**
     * 构造函数
     * @param id 区域ID
     * @param type 区域类型
     * @param contour 轮廓点
     */
    constructor(id: string, type: WallRegionType = WallRegionType.Full, contour: Vector2[] = []) {
        this.id = id;
        this.type = type;
        this.contour = contour.map(p => p.clone());
        this.bounds = this.calculateBounds();
    }

    /**
     * 计算区域边界
     * @returns 区域边界
     */
    private calculateBounds(): WallRegionBounds {
        if (this.contour.length === 0) {
            return {
                min: new Vector2(0, 0),
                max: new Vector2(0, 0)
            };
        }

        const min = new Vector2(
            Math.min(...this.contour.map(p => p.x)),
            Math.min(...this.contour.map(p => p.y))
        );

        const max = new Vector2(
            Math.max(...this.contour.map(p => p.x)),
            Math.max(...this.contour.map(p => p.y))
        );

        return { min, max };
    }

    /**
     * 更新轮廓
     * @param contour 新的轮廓点
     */
    public updateContour(contour: Vector2[]): void {
        this.contour = contour.map(p => p.clone());
        this.bounds = this.calculateBounds();
    }

    /**
     * 设置材质
     * @param materialId 材质ID
     */
    public setMaterial(materialId: string): void {
        this.materialId = materialId;
    }

    /**
     * 设置高度范围
     * @param min 最小高度
     * @param max 最大高度
     */
    public setHeightRange(min: number, max: number): void {
        this.heightRange = { min, max };
    }

    /**
     * 获取区域面积
     * @returns 区域面积
     */
    public getArea(): number {
        if (this.contour.length < 3) {
            return 0;
        }

        // 使用鞋带公式计算多边形面积
        let area = 0;
        const n = this.contour.length;

        for (let i = 0; i < n; i++) {
            const j = (i + 1) % n;
            area += this.contour[i].x * this.contour[j].y;
            area -= this.contour[j].x * this.contour[i].y;
        }

        return Math.abs(area) / 2;
    }

    /**
     * 获取区域宽度
     * @returns 宽度
     */
    public getWidth(): number {
        return this.bounds.max.x - this.bounds.min.x;
    }

    /**
     * 获取区域高度
     * @returns 高度
     */
    public getHeight(): number {
        return this.bounds.max.y - this.bounds.min.y;
    }

    /**
     * 判断点是否在区域内
     * @param point 点坐标
     * @returns 是否在区域内
     */
    public containsPoint(point: Vector2): boolean {
        if (this.contour.length < 3) {
            return false;
        }

        // 使用射线法判断点是否在多边形内
        let inside = false;
        const n = this.contour.length;

        for (let i = 0, j = n - 1; i < n; j = i++) {
            const xi = this.contour[i].x;
            const yi = this.contour[i].y;
            const xj = this.contour[j].x;
            const yj = this.contour[j].y;

            const intersect = ((yi > point.y) !== (yj > point.y)) &&
                (point.x < (xj - xi) * (point.y - yi) / (yj - yi) + xi);

            if (intersect) {
                inside = !inside;
            }
        }

        return inside;
    }

    /**
     * 判断区域是否与另一个区域相交
     * @param other 另一个区域
     * @returns 是否相交
     */
    public intersects(other: WallRegion): boolean {
        // 首先检查边界框是否相交
        if (!this.boundsIntersect(other.bounds)) {
            return false;
        }

        // 检查是否有任何点在对方区域内
        for (const point of this.contour) {
            if (other.containsPoint(point)) {
                return true;
            }
        }

        for (const point of other.contour) {
            if (this.containsPoint(point)) {
                return true;
            }
        }

        return false;
    }

    /**
     * 判断边界框是否相交
     * @param bounds 边界框
     * @returns 是否相交
     */
    private boundsIntersect(bounds: WallRegionBounds): boolean {
        return !(
            this.bounds.max.x < bounds.min.x ||
            this.bounds.min.x > bounds.max.x ||
            this.bounds.max.y < bounds.min.y ||
            this.bounds.min.y > bounds.max.y
        );
    }

    /**
     * 克隆区域
     * @returns 新的区域对象
     */
    public clone(): WallRegion {
        const newRegion = new WallRegion(this.id, this.type, this.contour);
        newRegion.materialId = this.materialId;
        newRegion.heightRange = this.heightRange ? { ...this.heightRange } : undefined;
        newRegion.visible = this.visible;
        newRegion.userData = { ...this.userData };
        return newRegion;
    }

    /**
     * 序列化为JSON
     * @returns JSON对象
     */
    public toJSON(): any {
        return {
            id: this.id,
            type: this.type,
            contour: this.contour.map(p => ({ x: p.x, y: p.y })),
            materialId: this.materialId,
            heightRange: this.heightRange,
            visible: this.visible,
            userData: this.userData
        };
    }

    /**
     * 从JSON反序列化
     * @param json JSON对象
     * @returns 墙体区域对象
     */
    public static fromJSON(json: any): WallRegion {
        const contour = json.contour.map((p: any) => new Vector2(p.x, p.y));
        const region = new WallRegion(json.id, json.type, contour);
        region.materialId = json.materialId;
        region.heightRange = json.heightRange;
        region.visible = json.visible !== undefined ? json.visible : true;
        region.userData = json.userData || {};
        return region;
    }

    /**
     * 转换为3D轮廓
     * @param baseZ 基准Z坐标
     * @returns 3D轮廓点
     */
    public toContour3D(baseZ: number = 0): Vector3[] {
        return this.contour.map(p => new Vector3(p.x, p.y, baseZ));
    }

    /**
     * 分割区域
     * @param splitLine 分割线（两个点）
     * @returns 分割后的两个区域，如果无法分割则返回null
     */
    public split(splitLine: [Vector2, Vector2]): [WallRegion, WallRegion] | null {
        // 简化实现：返回null表示不支持分割
        // 实际实现需要复杂的多边形分割算法
        return null;
    }

    /**
     * 合并区域
     * @param other 要合并的区域
     * @returns 合并后的区域，如果无法合并则返回null
     */
    public merge(other: WallRegion): WallRegion | null {
        // 简化实现：返回null表示不支持合并
        // 实际实现需要复杂的多边形合并算法
        return null;
    }

    /**
     * 获取区域中心点
     * @returns 中心点坐标
     */
    public getCenter(): Vector2 {
        if (this.contour.length === 0) {
            return new Vector2(0, 0);
        }

        const sum = this.contour.reduce(
            (acc, p) => acc.add(p),
            new Vector2(0, 0)
        );

        return sum.divideScalar(this.contour.length);
    }

    /**
     * 偏移区域轮廓
     * @param offset 偏移量
     */
    public offset(offset: Vector2): void {
        this.contour = this.contour.map(p => p.clone().add(offset));
        this.bounds = this.calculateBounds();
    }

    /**
     * 缩放区域
     * @param scale 缩放比例
     * @param center 缩放中心点（默认为区域中心）
     */
    public scale(scale: number, center?: Vector2): void {
        const scaleCenter = center || this.getCenter();
        
        this.contour = this.contour.map(p => {
            const offset = p.clone().sub(scaleCenter);
            return scaleCenter.clone().add(offset.multiplyScalar(scale));
        });

        this.bounds = this.calculateBounds();
    }
}