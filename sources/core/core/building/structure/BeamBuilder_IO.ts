/**
 * BeamBuilder_IO - 梁构建器IO序列化
 * 处理梁构建器的序列化和反序列化
 */

import { Vector3 } from 'three';

/**
 * 梁构建器数据接口
 */
export interface IBeamBuilderData {
    /** 起点 */
    startPoint: { x: number; y: number; z: number };
    /** 终点 */
    endPoint: { x: number; y: number; z: number };
    /** 宽度 */
    width: number;
    /** 高度 */
    height: number;
    /** 标高 */
    elevation: number;
    /** 截面类型 */
    sectionType?: string;
    /** 材质ID */
    materialId?: string;
    /** 自定义数据 */
    userData?: any;
}

/**
 * 梁构建器IO类
 * 负责梁数据的序列化和反序列化
 */
export class BeamBuilder_IO {
    private static _instance: BeamBuilder_IO;

    /**
     * 获取单例实例
     */
    public static instance(): BeamBuilder_IO {
        if (!BeamBuilder_IO._instance) {
            BeamBuilder_IO._instance = new BeamBuilder_IO();
        }
        return BeamBuilder_IO._instance;
    }

    /**
     * 序列化梁数据
     * @param beam 梁对象
     * @returns 序列化后的数据
     */
    public serialize(beam: any): IBeamBuilderData {
        const data: IBeamBuilderData = {
            startPoint: {
                x: beam.startPoint?.x || 0,
                y: beam.startPoint?.y || 0,
                z: beam.startPoint?.z || 0
            },
            endPoint: {
                x: beam.endPoint?.x || 0,
                y: beam.endPoint?.y || 0,
                z: beam.endPoint?.z || 0
            },
            width: beam.width || 0,
            height: beam.height || 0,
            elevation: beam.elevation || 0
        };

        if (beam.sectionType) {
            data.sectionType = beam.sectionType;
        }

        if (beam.materialId) {
            data.materialId = beam.materialId;
        }

        if (beam.userData) {
            data.userData = { ...beam.userData };
        }

        return data;
    }

    /**
     * 反序列化梁数据
     * @param data 序列化数据
     * @returns 梁对象
     */
    public deserialize(data: IBeamBuilderData): any {
        return {
            startPoint: new Vector3(
                data.startPoint.x,
                data.startPoint.y,
                data.startPoint.z
            ),
            endPoint: new Vector3(
                data.endPoint.x,
                data.endPoint.y,
                data.endPoint.z
            ),
            width: data.width,
            height: data.height,
            elevation: data.elevation,
            sectionType: data.sectionType,
            materialId: data.materialId,
            userData: data.userData ? { ...data.userData } : {}
        };
    }

    /**
     * 导出为JSON字符串
     * @param beam 梁对象
     * @returns JSON字符串
     */
    public toJSON(beam: any): string {
        const data = this.serialize(beam);
        return JSON.stringify(data, null, 2);
    }

    /**
     * 从JSON字符串导入
     * @param json JSON字符串
     * @returns 梁对象
     */
    public fromJSON(json: string): any {
        const data = JSON.parse(json) as IBeamBuilderData;
        return this.deserialize(data);
    }

    /**
     * 验证数据有效性
     * @param data 数据对象
     * @returns 是否有效
     */
    public validate(data: IBeamBuilderData): boolean {
        if (!data) return false;
        
        // 检查必需字段
        if (!data.startPoint || !data.endPoint) return false;
        if (typeof data.width !== 'number' || data.width <= 0) return false;
        if (typeof data.height !== 'number' || data.height <= 0) return false;
        if (typeof data.elevation !== 'number') return false;

        // 检查起点和终点是否相同
        const sp = data.startPoint;
        const ep = data.endPoint;
        if (sp.x === ep.x && sp.y === ep.y && sp.z === ep.z) {
            return false;
        }

        return true;
    }

    /**
     * 克隆数据
     * @param data 源数据
     * @returns 克隆后的数据
     */
    public clone(data: IBeamBuilderData): IBeamBuilderData {
        return {
            startPoint: { ...data.startPoint },
            endPoint: { ...data.endPoint },
            width: data.width,
            height: data.height,
            elevation: data.elevation,
            sectionType: data.sectionType,
            materialId: data.materialId,
            userData: data.userData ? { ...data.userData } : undefined
        };
    }

    /**
     * 合并数据
     * @param target 目标数据
     * @param source 源数据
     * @returns 合并后的数据
     */
    public merge(target: IBeamBuilderData, source: Partial<IBeamBuilderData>): IBeamBuilderData {
        return {
            startPoint: source.startPoint || target.startPoint,
            endPoint: source.endPoint || target.endPoint,
            width: source.width !== undefined ? source.width : target.width,
            height: source.height !== undefined ? source.height : target.height,
            elevation: source.elevation !== undefined ? source.elevation : target.elevation,
            sectionType: source.sectionType || target.sectionType,
            materialId: source.materialId || target.materialId,
            userData: { ...target.userData, ...source.userData }
        };
    }

    /**
     * 比较两个数据是否相等
     * @param data1 数据1
     * @param data2 数据2
     * @returns 是否相等
     */
    public equals(data1: IBeamBuilderData, data2: IBeamBuilderData): boolean {
        if (!data1 || !data2) return false;

        // 比较基本属性
        if (data1.width !== data2.width) return false;
        if (data1.height !== data2.height) return false;
        if (data1.elevation !== data2.elevation) return false;
        if (data1.sectionType !== data2.sectionType) return false;
        if (data1.materialId !== data2.materialId) return false;

        // 比较点坐标
        const sp1 = data1.startPoint;
        const sp2 = data2.startPoint;
        const ep1 = data1.endPoint;
        const ep2 = data2.endPoint;

        if (sp1.x !== sp2.x || sp1.y !== sp2.y || sp1.z !== sp2.z) return false;
        if (ep1.x !== ep2.x || ep1.y !== ep2.y || ep1.z !== ep2.z) return false;

        return true;
    }

    /**
     * 计算数据哈希值
     * @param data 数据对象
     * @returns 哈希值
     */
    public hash(data: IBeamBuilderData): string {
        const str = JSON.stringify({
            sp: data.startPoint,
            ep: data.endPoint,
            w: data.width,
            h: data.height,
            e: data.elevation
        });
        
        // 简单哈希算法
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash.toString(36);
    }
}

/**
 * 梁构建器批量IO类
 * 处理多个梁的批量序列化和反序列化
 */
export class BeamBuilderBatchIO {
    private io: BeamBuilder_IO;

    constructor() {
        this.io = BeamBuilder_IO.instance();
    }

    /**
     * 批量序列化
     * @param beams 梁对象数组
     * @returns 序列化数据数组
     */
    public serializeBatch(beams: any[]): IBeamBuilderData[] {
        return beams.map(beam => this.io.serialize(beam));
    }

    /**
     * 批量反序列化
     * @param dataArray 序列化数据数组
     * @returns 梁对象数组
     */
    public deserializeBatch(dataArray: IBeamBuilderData[]): any[] {
        return dataArray.map(data => this.io.deserialize(data));
    }

    /**
     * 批量导出为JSON
     * @param beams 梁对象数组
     * @returns JSON字符串
     */
    public toJSON(beams: any[]): string {
        const dataArray = this.serializeBatch(beams);
        return JSON.stringify(dataArray, null, 2);
    }

    /**
     * 从JSON批量导入
     * @param json JSON字符串
     * @returns 梁对象数组
     */
    public fromJSON(json: string): any[] {
        const dataArray = JSON.parse(json) as IBeamBuilderData[];
        return this.deserializeBatch(dataArray);
    }

    /**
     * 批量验证
     * @param dataArray 数据数组
     * @returns 验证结果数组
     */
    public validateBatch(dataArray: IBeamBuilderData[]): boolean[] {
        return dataArray.map(data => this.io.validate(data));
    }
}