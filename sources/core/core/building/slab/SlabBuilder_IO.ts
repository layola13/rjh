/**
 * SlabBuilder_IO - 楼板构建器IO序列化
 * 处理楼板构建器的序列化和反序列化
 */

import { Vector3, Vector2 } from 'three';

/**
 * 楼板构建器数据接口
 */
export interface ISlabBuilderData {
    /** 楼板轮廓点 */
    contour: Array<{ x: number; y: number }>;
    /** 标高 */
    elevation: number;
    /** 厚度 */
    thickness: number;
    /** 开洞数据 */
    openings?: Array<{
        contour: Array<{ x: number; y: number }>;
        offset?: { x: number; y: number };
    }>;
    /** 顶面材质ID */
    topMaterialId?: string;
    /** 底面材质ID */
    bottomMaterialId?: string;
    /** 侧面材质ID */
    sideMaterialId?: string;
    /** 楼板类型 */
    slabType?: string;
    /** 自定义数据 */
    userData?: any;
}

/**
 * 楼板构建器IO类
 * 负责楼板数据的序列化和反序列化
 */
export class SlabBuilder_IO {
    private static _instance: SlabBuilder_IO;

    /**
     * 获取单例实例
     */
    public static instance(): SlabBuilder_IO {
        if (!SlabBuilder_IO._instance) {
            SlabBuilder_IO._instance = new SlabBuilder_IO();
        }
        return SlabBuilder_IO._instance;
    }

    /**
     * 序列化楼板数据
     * @param slab 楼板对象
     * @returns 序列化后的数据
     */
    public serialize(slab: any): ISlabBuilderData {
        const data: ISlabBuilderData = {
            contour: this.serializeContour(slab.contour || []),
            elevation: slab.elevation || 0,
            thickness: slab.thickness || 0
        };

        // 序列化开洞
        if (slab.openings && slab.openings.length > 0) {
            data.openings = slab.openings.map((opening: any) => ({
                contour: this.serializeContour(opening.contour || []),
                offset: opening.offset ? { x: opening.offset.x, y: opening.offset.y } : undefined
            }));
        }

        // 序列化材质
        if (slab.topMaterialId) data.topMaterialId = slab.topMaterialId;
        if (slab.bottomMaterialId) data.bottomMaterialId = slab.bottomMaterialId;
        if (slab.sideMaterialId) data.sideMaterialId = slab.sideMaterialId;

        // 序列化类型
        if (slab.slabType) data.slabType = slab.slabType;

        // 序列化自定义数据
        if (slab.userData) {
            data.userData = { ...slab.userData };
        }

        return data;
    }

    /**
     * 反序列化楼板数据
     * @param data 序列化数据
     * @returns 楼板对象
     */
    public deserialize(data: ISlabBuilderData): any {
        const slab: any = {
            contour: this.deserializeContour(data.contour),
            elevation: data.elevation,
            thickness: data.thickness
        };

        // 反序列化开洞
        if (data.openings) {
            slab.openings = data.openings.map(opening => ({
                contour: this.deserializeContour(opening.contour),
                offset: opening.offset ? new Vector2(opening.offset.x, opening.offset.y) : undefined
            }));
        }

        // 反序列化材质
        if (data.topMaterialId) slab.topMaterialId = data.topMaterialId;
        if (data.bottomMaterialId) slab.bottomMaterialId = data.bottomMaterialId;
        if (data.sideMaterialId) slab.sideMaterialId = data.sideMaterialId;

        // 反序列化类型
        if (data.slabType) slab.slabType = data.slabType;

        // 反序列化自定义数据
        if (data.userData) {
            slab.userData = { ...data.userData };
        }

        return slab;
    }

    /**
     * 序列化轮廓
     * @param contour 轮廓点数组
     * @returns 序列化后的轮廓
     */
    private serializeContour(contour: any[]): Array<{ x: number; y: number }> {
        return contour.map(point => {
            if (point instanceof Vector2) {
                return { x: point.x, y: point.y };
            } else if (point instanceof Vector3) {
                return { x: point.x, y: point.y };
            } else {
                return { x: point.x || 0, y: point.y || 0 };
            }
        });
    }

    /**
     * 反序列化轮廓
     * @param contour 序列化的轮廓
     * @returns 轮廓点数组
     */
    private deserializeContour(contour: Array<{ x: number; y: number }>): Vector2[] {
        return contour.map(point => new Vector2(point.x, point.y));
    }

    /**
     * 导出为JSON字符串
     * @param slab 楼板对象
     * @returns JSON字符串
     */
    public toJSON(slab: any): string {
        const data = this.serialize(slab);
        return JSON.stringify(data, null, 2);
    }

    /**
     * 从JSON字符串导入
     * @param json JSON字符串
     * @returns 楼板对象
     */
    public fromJSON(json: string): any {
        const data = JSON.parse(json) as ISlabBuilderData;
        return this.deserialize(data);
    }

    /**
     * 验证数据有效性
     * @param data 数据对象
     * @returns 是否有效
     */
    public validate(data: ISlabBuilderData): boolean {
        if (!data) return false;
        
        // 检查必需字段
        if (!data.contour || data.contour.length < 3) return false;
        if (typeof data.thickness !== 'number' || data.thickness <= 0) return false;
        if (typeof data.elevation !== 'number') return false;

        // 检查轮廓点的有效性
        for (const point of data.contour) {
            if (typeof point.x !== 'number' || typeof point.y !== 'number') {
                return false;
            }
            if (!isFinite(point.x) || !isFinite(point.y)) {
                return false;
            }
        }

        // 检查开洞的有效性
        if (data.openings) {
            for (const opening of data.openings) {
                if (!opening.contour || opening.contour.length < 3) {
                    return false;
                }
                for (const point of opening.contour) {
                    if (typeof point.x !== 'number' || typeof point.y !== 'number') {
                        return false;
                    }
                }
            }
        }

        return true;
    }

    /**
     * 克隆数据
     * @param data 源数据
     * @returns 克隆后的数据
     */
    public clone(data: ISlabBuilderData): ISlabBuilderData {
        const cloned: ISlabBuilderData = {
            contour: data.contour.map(p => ({ ...p })),
            elevation: data.elevation,
            thickness: data.thickness
        };

        if (data.openings) {
            cloned.openings = data.openings.map(opening => ({
                contour: opening.contour.map(p => ({ ...p })),
                offset: opening.offset ? { ...opening.offset } : undefined
            }));
        }

        if (data.topMaterialId) cloned.topMaterialId = data.topMaterialId;
        if (data.bottomMaterialId) cloned.bottomMaterialId = data.bottomMaterialId;
        if (data.sideMaterialId) cloned.sideMaterialId = data.sideMaterialId;
        if (data.slabType) cloned.slabType = data.slabType;
        if (data.userData) cloned.userData = { ...data.userData };

        return cloned;
    }

    /**
     * 合并数据
     * @param target 目标数据
     * @param source 源数据
     * @returns 合并后的数据
     */
    public merge(target: ISlabBuilderData, source: Partial<ISlabBuilderData>): ISlabBuilderData {
        return {
            contour: source.contour || target.contour,
            elevation: source.elevation !== undefined ? source.elevation : target.elevation,
            thickness: source.thickness !== undefined ? source.thickness : target.thickness,
            openings: source.openings || target.openings,
            topMaterialId: source.topMaterialId || target.topMaterialId,
            bottomMaterialId: source.bottomMaterialId || target.bottomMaterialId,
            sideMaterialId: source.sideMaterialId || target.sideMaterialId,
            slabType: source.slabType || target.slabType,
            userData: { ...target.userData, ...source.userData }
        };
    }

    /**
     * 比较两个数据是否相等
     * @param data1 数据1
     * @param data2 数据2
     * @returns 是否相等
     */
    public equals(data1: ISlabBuilderData, data2: ISlabBuilderData): boolean {
        if (!data1 || !data2) return false;

        // 比较基本属性
        if (data1.elevation !== data2.elevation) return false;
        if (data1.thickness !== data2.thickness) return false;
        if (data1.slabType !== data2.slabType) return false;

        // 比较轮廓
        if (data1.contour.length !== data2.contour.length) return false;
        for (let i = 0; i < data1.contour.length; i++) {
            if (data1.contour[i].x !== data2.contour[i].x ||
                data1.contour[i].y !== data2.contour[i].y) {
                return false;
            }
        }

        // 比较开洞
        if ((data1.openings?.length || 0) !== (data2.openings?.length || 0)) {
            return false;
        }

        return true;
    }

    /**
     * 计算数据哈希值
     * @param data 数据对象
     * @returns 哈希值
     */
    public hash(data: ISlabBuilderData): string {
        const str = JSON.stringify({
            c: data.contour,
            e: data.elevation,
            t: data.thickness,
            o: data.openings?.length || 0
        });
        
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return hash.toString(36);
    }

    /**
     * 计算楼板面积
     * @param data 楼板数据
     * @returns 面积
     */
    public calculateArea(data: ISlabBuilderData): number {
        let area = this.calculateContourArea(data.contour);
        
        // 减去开洞面积
        if (data.openings) {
            for (const opening of data.openings) {
                area -= this.calculateContourArea(opening.contour);
            }
        }
        
        return Math.max(0, area);
    }

    /**
     * 计算轮廓面积（使用鞋带公式）
     * @param contour 轮廓点
     * @returns 面积
     */
    private calculateContourArea(contour: Array<{ x: number; y: number }>): number {
        if (contour.length < 3) return 0;
        
        let area = 0;
        for (let i = 0; i < contour.length; i++) {
            const j = (i + 1) % contour.length;
            area += contour[i].x * contour[j].y;
            area -= contour[j].x * contour[i].y;
        }
        
        return Math.abs(area) / 2;
    }

    /**
     * 计算楼板体积
     * @param data 楼板数据
     * @returns 体积
     */
    public calculateVolume(data: ISlabBuilderData): number {
        return this.calculateArea(data) * data.thickness;
    }
}

/**
 * 楼板构建器批量IO类
 * 处理多个楼板的批量序列化和反序列化
 */
export class SlabBuilderBatchIO {
    private io: SlabBuilder_IO;

    constructor() {
        this.io = SlabBuilder_IO.instance();
    }

    /**
     * 批量序列化
     * @param slabs 楼板对象数组
     * @returns 序列化数据数组
     */
    public serializeBatch(slabs: any[]): ISlabBuilderData[] {
        return slabs.map(slab => this.io.serialize(slab));
    }

    /**
     * 批量反序列化
     * @param dataArray 序列化数据数组
     * @returns 楼板对象数组
     */
    public deserializeBatch(dataArray: ISlabBuilderData[]): any[] {
        return dataArray.map(data => this.io.deserialize(data));
    }

    /**
     * 批量导出为JSON
     * @param slabs 楼板对象数组
     * @returns JSON字符串
     */
    public toJSON(slabs: any[]): string {
        const dataArray = this.serializeBatch(slabs);
        return JSON.stringify(dataArray, null, 2);
    }

    /**
     * 从JSON批量导入
     * @param json JSON字符串
     * @returns 楼板对象数组
     */
    public fromJSON(json: string): any[] {
        const dataArray = JSON.parse(json) as ISlabBuilderData[];
        return this.deserializeBatch(dataArray);
    }

    /**
     * 批量验证
     * @param dataArray 数据数组
     * @returns 验证结果数组
     */
    public validateBatch(dataArray: ISlabBuilderData[]): boolean[] {
        return dataArray.map(data => this.io.validate(data));
    }

    /**
     * 计算总面积
     * @param dataArray 数据数组
     * @returns 总面积
     */
    public calculateTotalArea(dataArray: ISlabBuilderData[]): number {
        return dataArray.reduce((sum, data) => sum + this.io.calculateArea(data), 0);
    }

    /**
     * 计算总体积
     * @param dataArray 数据数组
     * @returns 总体积
     */
    public calculateTotalVolume(dataArray: ISlabBuilderData[]): number {
        return dataArray.reduce((sum, data) => sum + this.io.calculateVolume(data), 0);
    }
}