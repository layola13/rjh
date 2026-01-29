/**
 * FloorMixPaintUtil - 地板混合涂料工具
 * 处理地板多材质混合、拼花、过渡等效果
 */

import { Vector2, Vector3 } from 'three';

/**
 * 混合涂料类型枚举
 */
export enum MixPaintType {
    /** 单一材质 */
    Single = 'Single',
    /** 拼接 */
    Tiling = 'Tiling',
    /** 渐变 */
    Gradient = 'Gradient',
    /** 混合 */
    Blend = 'Blend',
    /** 分区 */
    Zoned = 'Zoned'
}

/**
 * 混合模式枚举
 */
export enum BlendMode {
    /** 正常 */
    Normal = 'Normal',
    /** 叠加 */
    Overlay = 'Overlay',
    /** 正片叠底 */
    Multiply = 'Multiply',
    /** 滤色 */
    Screen = 'Screen',
    /** 柔光 */
    SoftLight = 'SoftLight'
}

/**
 * 材质区域接口
 */
export interface IMaterialZone {
    /** 区域ID */
    id: string;
    /** 区域轮廓 */
    contour: Vector2[];
    /** 材质ID */
    materialId: string;
    /** 混合模式 */
    blendMode?: BlendMode;
    /** 不透明度 */
    opacity?: number;
    /** UV缩放 */
    uvScale?: { u: number; v: number };
    /** UV旋转（弧度） */
    uvRotation?: number;
    /** UV偏移 */
    uvOffset?: { u: number; v: number };
}

/**
 * 渐变配置接口
 */
export interface IGradientConfig {
    /** 起点 */
    startPoint: Vector2;
    /** 终点 */
    endPoint: Vector2;
    /** 起始材质ID */
    startMaterialId: string;
    /** 结束材质ID */
    endMaterialId: string;
    /** 渐变类型 */
    type: 'linear' | 'radial';
    /** 渐变停止点 */
    stops?: Array<{ position: number; materialId: string }>;
}

/**
 * 拼花配置接口
 */
export interface ITilingConfig {
    /** 拼花模式 */
    pattern: 'grid' | 'herringbone' | 'diagonal' | 'hexagon' | 'custom';
    /** 主材质ID */
    primaryMaterialId: string;
    /** 次材质ID */
    secondaryMaterialId?: string;
    /** 单元尺寸 */
    unitSize: { width: number; height: number };
    /** 缝隙宽度 */
    gapWidth?: number;
    /** 缝隙材质ID */
    gapMaterialId?: string;
    /** 旋转角度 */
    rotation?: number;
}

/**
 * 地板混合涂料工具类
 */
export class FloorMixPaintUtil {
    private static _instance: FloorMixPaintUtil;

    /**
     * 获取单例实例
     */
    public static instance(): FloorMixPaintUtil {
        if (!FloorMixPaintUtil._instance) {
            FloorMixPaintUtil._instance = new FloorMixPaintUtil();
        }
        return FloorMixPaintUtil._instance;
    }

    /**
     * 创建混合涂料配置
     * @param type 混合类型
     * @param zones 材质区域
     * @returns 混合配置
     */
    public createMixPaint(
        type: MixPaintType,
        zones: IMaterialZone[]
    ): any {
        return {
            type,
            zones: zones.map(zone => this.validateZone(zone)),
            timestamp: Date.now()
        };
    }

    /**
     * 验证材质区域
     * @param zone 材质区域
     * @returns 验证后的区域
     */
    private validateZone(zone: IMaterialZone): IMaterialZone {
        return {
            id: zone.id || this.generateZoneId(),
            contour: zone.contour,
            materialId: zone.materialId,
            blendMode: zone.blendMode || BlendMode.Normal,
            opacity: zone.opacity !== undefined ? zone.opacity : 1.0,
            uvScale: zone.uvScale || { u: 1, v: 1 },
            uvRotation: zone.uvRotation || 0,
            uvOffset: zone.uvOffset || { u: 0, v: 0 }
        };
    }

    /**
     * 生成区域ID
     * @returns 唯一ID
     */
    private generateZoneId(): string {
        return `zone_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    /**
     * 应用渐变效果
     * @param floorContour 地板轮廓
     * @param gradientConfig 渐变配置
     * @returns 材质区域数组
     */
    public applyGradient(
        floorContour: Vector2[],
        gradientConfig: IGradientConfig
    ): IMaterialZone[] {
        const zones: IMaterialZone[] = [];
        const segments = gradientConfig.stops ? gradientConfig.stops.length + 1 : 10;

        if (gradientConfig.type === 'linear') {
            // 线性渐变
            for (let i = 0; i < segments; i++) {
                const t1 = i / segments;
                const t2 = (i + 1) / segments;

                const zone = this.createGradientZone(
                    floorContour,
                    gradientConfig,
                    t1,
                    t2,
                    i
                );
                zones.push(zone);
            }
        } else {
            // 径向渐变
            zones.push(...this.createRadialGradientZones(floorContour, gradientConfig));
        }

        return zones;
    }

    /**
     * 创建渐变区域
     * @param contour 轮廓
     * @param config 渐变配置
     * @param t1 起始参数
     * @param t2 结束参数
     * @param index 索引
     * @returns 材质区域
     */
    private createGradientZone(
        contour: Vector2[],
        config: IGradientConfig,
        t1: number,
        t2: number,
        index: number
    ): IMaterialZone {
        // 简化实现：使用整个轮廓，实际应该根据t1和t2裁剪
        const materialId = this.interpolateMaterialId(
            config.startMaterialId,
            config.endMaterialId,
            (t1 + t2) / 2
        );

        return {
            id: `gradient_zone_${index}`,
            contour: contour.map(p => p.clone()),
            materialId,
            blendMode: BlendMode.Normal,
            opacity: 1.0
        };
    }

    /**
     * 创建径向渐变区域
     * @param contour 轮廓
     * @param config 渐变配置
     * @returns 材质区域数组
     */
    private createRadialGradientZones(
        contour: Vector2[],
        config: IGradientConfig
    ): IMaterialZone[] {
        // 简化实现：返回单个区域
        return [{
            id: 'radial_gradient_zone',
            contour: contour.map(p => p.clone()),
            materialId: config.startMaterialId,
            blendMode: BlendMode.Normal,
            opacity: 1.0
        }];
    }

    /**
     * 插值材质ID
     * @param startId 起始材质
     * @param endId 结束材质
     * @param t 插值参数
     * @returns 材质ID
     */
    private interpolateMaterialId(
        startId: string,
        endId: string,
        t: number
    ): string {
        // 简化实现：根据t选择材质
        return t < 0.5 ? startId : endId;
    }

    /**
     * 应用拼花效果
     * @param floorContour 地板轮廓
     * @param tilingConfig 拼花配置
     * @returns 材质区域数组
     */
    public applyTiling(
        floorContour: Vector2[],
        tilingConfig: ITilingConfig
    ): IMaterialZone[] {
        switch (tilingConfig.pattern) {
            case 'grid':
                return this.createGridPattern(floorContour, tilingConfig);
            case 'herringbone':
                return this.createHerringbonePattern(floorContour, tilingConfig);
            case 'diagonal':
                return this.createDiagonalPattern(floorContour, tilingConfig);
            case 'hexagon':
                return this.createHexagonPattern(floorContour, tilingConfig);
            default:
                return this.createGridPattern(floorContour, tilingConfig);
        }
    }

    /**
     * 创建网格拼花
     * @param contour 轮廓
     * @param config 配置
     * @returns 材质区域数组
     */
    private createGridPattern(
        contour: Vector2[],
        config: ITilingConfig
    ): IMaterialZone[] {
        const zones: IMaterialZone[] = [];
        const bbox = this.calculateBoundingBox(contour);
        
        const cols = Math.ceil((bbox.max.x - bbox.min.x) / config.unitSize.width);
        const rows = Math.ceil((bbox.max.y - bbox.min.y) / config.unitSize.height);

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                const x = bbox.min.x + j * config.unitSize.width;
                const y = bbox.min.y + i * config.unitSize.height;

                const tileContour = [
                    new Vector2(x, y),
                    new Vector2(x + config.unitSize.width, y),
                    new Vector2(x + config.unitSize.width, y + config.unitSize.height),
                    new Vector2(x, y + config.unitSize.height)
                ];

                // 交替使用主次材质
                const materialId = ((i + j) % 2 === 0) 
                    ? config.primaryMaterialId 
                    : (config.secondaryMaterialId || config.primaryMaterialId);

                zones.push({
                    id: `tile_${i}_${j}`,
                    contour: tileContour,
                    materialId,
                    blendMode: BlendMode.Normal,
                    opacity: 1.0
                });
            }
        }

        return zones;
    }

    /**
     * 创建人字形拼花
     * @param contour 轮廓
     * @param config 配置
     * @returns 材质区域数组
     */
    private createHerringbonePattern(
        contour: Vector2[],
        config: ITilingConfig
    ): IMaterialZone[] {
        // 简化实现：返回网格模式
        return this.createGridPattern(contour, config);
    }

    /**
     * 创建对角线拼花
     * @param contour 轮廓
     * @param config 配置
     * @returns 材质区域数组
     */
    private createDiagonalPattern(
        contour: Vector2[],
        config: ITilingConfig
    ): IMaterialZone[] {
        // 简化实现：返回网格模式
        return this.createGridPattern(contour, config);
    }

    /**
     * 创建六边形拼花
     * @param contour 轮廓
     * @param config 配置
     * @returns 材质区域数组
     */
    private createHexagonPattern(
        contour: Vector2[],
        config: ITilingConfig
    ): IMaterialZone[] {
        // 简化实现：返回网格模式
        return this.createGridPattern(contour, config);
    }

    /**
     * 计算包围盒
     * @param contour 轮廓
     * @returns 包围盒
     */
    private calculateBoundingBox(contour: Vector2[]): { min: Vector2; max: Vector2 } {
        if (contour.length === 0) {
            return { min: new Vector2(0, 0), max: new Vector2(0, 0) };
        }

        const min = new Vector2(
            Math.min(...contour.map(p => p.x)),
            Math.min(...contour.map(p => p.y))
        );

        const max = new Vector2(
            Math.max(...contour.map(p => p.x)),
            Math.max(...contour.map(p => p.y))
        );

        return { min, max };
    }

    /**
     * 合并材质区域
     * @param zones 区域数组
     * @returns 合并后的区域
     */
    public mergeZones(zones: IMaterialZone[]): IMaterialZone[] {
        // 按材质ID分组
        const groupedByMaterial = new Map<string, IMaterialZone[]>();
        
        for (const zone of zones) {
            if (!groupedByMaterial.has(zone.materialId)) {
                groupedByMaterial.set(zone.materialId, []);
            }
            groupedByMaterial.get(zone.materialId)!.push(zone);
        }

        // 合并相同材质的区域
        const mergedZones: IMaterialZone[] = [];
        for (const [materialId, materialZones] of groupedByMaterial) {
            if (materialZones.length === 1) {
                mergedZones.push(materialZones[0]);
            } else {
                // 简化实现：保留所有区域
                mergedZones.push(...materialZones);
            }
        }

        return mergedZones;
    }

    /**
     * 优化材质区域
     * @param zones 区域数组
     * @returns 优化后的区域
     */
    public optimizeZones(zones: IMaterialZone[]): IMaterialZone[] {
        // 移除空区域
        const nonEmptyZones = zones.filter(zone => 
            zone.contour && zone.contour.length >= 3
        );

        // 合并相邻的相同材质区域
        return this.mergeZones(nonEmptyZones);
    }

    /**
     * 计算区域面积
     * @param zone 材质区域
     * @returns 面积
     */
    public calculateZoneArea(zone: IMaterialZone): number {
        if (zone.contour.length < 3) return 0;

        let area = 0;
        for (let i = 0; i < zone.contour.length; i++) {
            const j = (i + 1) % zone.contour.length;
            area += zone.contour[i].x * zone.contour[j].y;
            area -= zone.contour[j].x * zone.contour[i].y;
        }

        return Math.abs(area) / 2;
    }

    /**
     * 判断点是否在区域内
     * @param point 点
     * @param zone 区域
     * @returns 是否在区域内
     */
    public isPointInZone(point: Vector2, zone: IMaterialZone): boolean {
        const contour = zone.contour;
        if (contour.length < 3) return false;

        let inside = false;
        for (let i = 0, j = contour.length - 1; i < contour.length; j = i++) {
            const xi = contour[i].x, yi = contour[i].y;
            const xj = contour[j].x, yj = contour[j].y;

            const intersect = ((yi > point.y) !== (yj > point.y)) &&
                (point.x < (xj - xi) * (point.y - yi) / (yj - yi) + xi);
            
            if (intersect) inside = !inside;
        }

        return inside;
    }

    /**
     * 获取点所在的材质区域
     * @param point 点
     * @param zones 区域数组
     * @returns 材质区域或undefined
     */
    public getZoneAtPoint(point: Vector2, zones: IMaterialZone[]): IMaterialZone | undefined {
        for (const zone of zones) {
            if (this.isPointInZone(point, zone)) {
                return zone;
            }
        }
        return undefined;
    }

    /**
     * 克隆区域
     * @param zone 源区域
     * @returns 克隆的区域
     */
    public cloneZone(zone: IMaterialZone): IMaterialZone {
        return {
            id: zone.id,
            contour: zone.contour.map(p => p.clone()),
            materialId: zone.materialId,
            blendMode: zone.blendMode,
            opacity: zone.opacity,
            uvScale: zone.uvScale ? { ...zone.uvScale } : undefined,
            uvRotation: zone.uvRotation,
            uvOffset: zone.uvOffset ? { ...zone.uvOffset } : undefined
        };
    }

    /**
     * 序列化混合涂料数据
     * @param zones 区域数组
     * @returns JSON字符串
     */
    public serialize(zones: IMaterialZone[]): string {
        return JSON.stringify(zones.map(zone => ({
            ...zone,
            contour: zone.contour.map(p => ({ x: p.x, y: p.y }))
        })), null, 2);
    }

    /**
     * 反序列化混合涂料数据
     * @param json JSON字符串
     * @returns 区域数组
     */
    public deserialize(json: string): IMaterialZone[] {
        const data = JSON.parse(json);
        return data.map((zone: any) => ({
            ...zone,
            contour: zone.contour.map((p: any) => new Vector2(p.x, p.y))
        }));
    }
}