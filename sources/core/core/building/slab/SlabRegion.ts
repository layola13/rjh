/**
 * SlabRegion - 楼板区域
 * 管理楼板的区域划分和材质分配
 */

import { Vector2, Vector3 } from 'three';

/**
 * 楼板区域类型枚举
 */
export enum SlabRegionType {
    /** 完整区域 */
    Full = 'Full',
    /** 主区域 */
    Main = 'Main',
    /** 阳台区域 */
    Balcony = 'Balcony',
    /** 卫生间区域 */
    Bathroom = 'Bathroom',
    /** 厨房区域 */
    Kitchen = 'Kitchen',
    /** 过道区域 */
    Corridor = 'Corridor',
    /** 自定义区域 */
    Custom = 'Custom'
}

/**
 * 楼板区域接口
 */
export interface ISlabRegion {
    /** 区域ID */
    id: string;
    /** 区域类型 */
    type: SlabRegionType;
    /** 区域轮廓 */
    contour: Vector2[];
    /** 材质ID */
    materialId?: string;
    /** 区域名称 */
    name?: string;
}

/**
 * 楼板区域类
 * 用于楼板的功能分区和材质管理
 */
export class SlabRegion implements ISlabRegion {
    /** 区域ID */
    public id: string;
    
    /** 区域类型 */
    public type: SlabRegionType;
    
    /** 区域轮廓（2D） */
    public contour: Vector2[] = [];
    
    /** 材质ID */
    public materialId?: string;
    
    /** 区域名称 */
    public name?: string;
    
    /** 区域面积 */
    public area: number = 0;
    
    /** 区域周长 */
    public perimeter: number = 0;
    
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
    constructor(id: string, type: SlabRegionType = SlabRegionType.Full, contour: Vector2[] = []) {
        this.id = id;
        this.type = type;
        this.contour = contour.map(p => p.clone());
        this.updateMetrics();
    }

    /**
     * 更新区域指标
     */
    public updateMetrics(): void {
        this.area = this.calculateArea();
        this.perimeter = this.calculatePerimeter();
    }

    /**
     * 计算区域面积
     * @returns 面积
     */
    private calculateArea(): number {
        if (this.contour.length < 3) {
            return 0;
        }

        // 使用鞋带公式
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
     * 计算区域周长
     * @returns 周长
     */
    private calculatePerimeter(): number {
        if (this.contour.length < 2) {
            return 0;
        }

        let perimeter = 0;
        const n = this.contour.length;

        for (let i = 0; i < n; i++) {
            const j = (i + 1) % n;
            perimeter += this.contour[i].distanceTo(this.contour[j]);
        }

        return perimeter;
    }

    /**
     * 设置轮廓
     * @param contour 新的轮廓点
     */
    public setContour(contour: Vector2[]): void {
        this.contour = contour.map(p => p.clone());
        this.updateMetrics();
    }

    /**
     * 设置材质
     * @param materialId 材质ID
     */
    public setMaterial(materialId: string): void {
        this.materialId = materialId;
    }

    /**
     * 获取区域面积
     * @returns 面积
     */
    public getArea(): number {
        return this.area;
    }

    /**
     * 获取区域周长
     * @returns 周长
     */
    public getPerimeter(): number {
        return this.perimeter;
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

        // 使用射线法
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
    public intersects(other: SlabRegion): boolean {
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
     * 获取边界框
     * @returns 边界框 {min, max}
     */
    public getBounds(): { min: Vector2; max: Vector2 } {
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
        this.updateMetrics();
    }

    /**
     * 缩放区域
     * @param scale 缩放比例
     * @param center 缩放中心（默认为区域中心）
     */
    public scale(scale: number, center?: Vector2): void {
        const scaleCenter = center || this.getCenter();
        
        this.contour = this.contour.map(p => {
            const offset = p.clone().sub(scaleCenter);
            return scaleCenter.clone().add(offset.multiplyScalar(scale));
        });

        this.updateMetrics();
    }

    /**
     * 旋转区域
     * @param angle 旋转角度（弧度）
     * @param center 旋转中心（默认为区域中心）
     */
    public rotate(angle: number, center?: Vector2): void {
        const rotateCenter = center || this.getCenter();
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);

        this.contour = this.contour.map(p => {
            const dx = p.x - rotateCenter.x;
            const dy = p.y - rotateCenter.y;
            return new Vector2(
                rotateCenter.x + dx * cos - dy * sin,
                rotateCenter.y + dx * sin + dy * cos
            );
        });

        this.updateMetrics();
    }

    /**
     * 简化区域轮廓
     * @param tolerance 容差
     */
    public simplify(tolerance: number = 0.01): void {
        if (this.contour.length < 4) {
            return;
        }

        const simplified: Vector2[] = [this.contour[0]];

        for (let i = 1; i < this.contour.length - 1; i++) {
            const prev = this.contour[i - 1];
            const curr = this.contour[i];
            const next = this.contour[i + 1];

            const dist = this.pointToSegmentDistance(curr, prev, next);

            if (dist > tolerance) {
                simplified.push(curr);
            }
        }

        simplified.push(this.contour[this.contour.length - 1]);

        this.contour = simplified;
        this.updateMetrics();
    }

    /**
     * 计算点到线段的距离
     * @private
     */
    private pointToSegmentDistance(point: Vector2, lineStart: Vector2, lineEnd: Vector2): number {
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
     * 转换为3D轮廓
     * @param baseZ Z坐标
     * @returns 3D轮廓点
     */
    public toContour3D(baseZ: number = 0): Vector3[] {
        return this.contour.map(p => new Vector3(p.x, p.y, baseZ));
    }

    /**
     * 克隆区域
     * @returns 新的区域对象
     */
    public clone(): SlabRegion {
        const newRegion = new SlabRegion(this.id, this.type, this.contour);
        newRegion.materialId = this.materialId;
        newRegion.name = this.name;
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
            name: this.name,
            area: this.area,
            perimeter: this.perimeter,
            visible: this.visible,
            userData: this.userData
        };
    }

    /**
     * 从JSON反序列化
     * @param json JSON对象
     * @returns 楼板区域对象
     */
    public static fromJSON(json: any): SlabRegion {
        const contour = json.contour.map((p: any) => new Vector2(p.x, p.y));
        const region = new SlabRegion(json.id, json.type, contour);
        region.materialId = json.materialId;
        region.name = json.name;
        region.visible = json.visible !== undefined ? json.visible : true;
        region.userData = json.userData || {};
        return region;
    }

    /**
     * 验证区域是否有效
     * @returns 是否有效
     */
    public isValid(): boolean {
        return this.contour.length >= 3 && this.area > 0;
    }

    /**
     * 获取区域宽度
     * @returns 宽度
     */
    public getWidth(): number {
        const bounds = this.getBounds();
        return bounds.max.x - bounds.min.x;
    }

    /**
     * 获取区域高度
     * @returns 高度
     */
    public getHeight(): number {
        const bounds = this.getBounds();
        return bounds.max.y - bounds.min.y;
    }
}

/**
 * 楼板区域集合类
 * 管理楼板的所有区域
 */
export class SlabRegionCollection {
    /** 区域映射表 */
    private regions: Map<string, SlabRegion> = new Map();

    /**
     * 添加区域
     * @param region 区域对象
     */
    public addRegion(region: SlabRegion): void {
        this.regions.set(region.id, region);
    }

    /**
     * 移除区域
     * @param regionId 区域ID
     */
    public removeRegion(regionId: string): void {
        this.regions.delete(regionId);
    }

    /**
     * 获取区域
     * @param regionId 区域ID
     * @returns 区域对象或undefined
     */
    public getRegion(regionId: string): SlabRegion | undefined {
        return this.regions.get(regionId);
    }

    /**
     * 获取所有区域
     * @returns 区域数组
     */
    public getAllRegions(): SlabRegion[] {
        return Array.from(this.regions.values());
    }

    /**
     * 根据类型获取区域
     * @param type 区域类型
     * @returns 区域数组
     */
    public getRegionsByType(type: SlabRegionType): SlabRegion[] {
        return this.getAllRegions().filter(region => region.type === type);
    }

    /**
     * 计算总面积
     * @returns 总面积
     */
    public getTotalArea(): number {
        return this.getAllRegions().reduce((sum, region) => sum + region.area, 0);
    }

    /**
     * 清空所有区域
     */
    public clear(): void {
        this.regions.clear();
    }

    /**
     * 获取区域数量
     * @returns 区域数量
     */
    public getCount(): number {
        return this.regions.size;
    }

    /**
     * 检查区域冲突
     * @returns 冲突的区域对数组
     */
    public checkConflicts(): [SlabRegion, SlabRegion][] {
        const conflicts: [SlabRegion, SlabRegion][] = [];
        const regions = this.getAllRegions();

        for (let i = 0; i < regions.length - 1; i++) {
            for (let j = i + 1; j < regions.length; j++) {
                if (regions[i].intersects(regions[j])) {
                    conflicts.push([regions[i], regions[j]]);
                }
            }
        }

        return conflicts;
    }

    /**
     * 序列化为JSON
     * @returns JSON对象
     */
    public toJSON(): any {
        const regionsArray: any[] = [];
        this.regions.forEach(region => {
            regionsArray.push(region.toJSON());
        });
        return { regions: regionsArray };
    }

    /**
     * 从JSON反序列化
     * @param json JSON对象
     * @returns 楼板区域集合对象
     */
    public static fromJSON(json: any): SlabRegionCollection {
        const collection = new SlabRegionCollection();
        if (json.regions) {
            json.regions.forEach((regionJson: any) => {
                collection.addRegion(SlabRegion.fromJSON(regionJson));
            });
        }
        return collection;
    }
}