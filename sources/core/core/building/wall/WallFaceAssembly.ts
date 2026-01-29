/**
 * WallFaceAssembly - 墙面装配
 * 用于管理墙面的分割、区域和材质装配
 */

import { Signal } from '../../utils/Signal';

/**
 * 墙面信息接口
 */
export interface WallFaceInfo {
    /** 墙面ID */
    faceId: string;
    /** 墙面索引 */
    faceIndex: number;
    /** 墙面类型 */
    faceType: string;
    /** 墙面几何 */
    geometry?: any;
    /** 墙面材质 */
    material?: any;
}

/**
 * 墙面分割信息接口
 */
export interface WallDivideInfo {
    /** 分割类型 */
    divideType: string;
    /** 分割线 */
    divideLine?: any[];
    /** 分割区域 */
    regions?: WallFaceRegion[];
}

/**
 * 墙面区域接口
 */
export interface WallFaceRegion {
    /** 区域ID */
    id: string;
    /** 区域轮廓 */
    contour: any[];
    /** 区域材质 */
    material?: any;
    /** 区域类型 */
    type?: string;
}

/**
 * 墙面装配类
 * 管理墙面的分割、材质和装饰
 */
export class WallFaceAssembly {
    /** 墙面信息 */
    public faceInfo: WallFaceInfo;
    
    /** 分割信息 */
    public divideInfo?: WallDivideInfo;
    
    /** 是否启用装配 */
    public enabled: boolean = true;
    
    /** 墙面区域列表 */
    public regions: WallFaceRegion[] = [];
    
    /** 装配变化信号 */
    public signalAssemblyChanged: Signal<WallFaceAssembly>;
    
    /** 区域添加信号 */
    public signalRegionAdded: Signal<WallFaceRegion>;
    
    /** 区域移除信号 */
    public signalRegionRemoved: Signal<WallFaceRegion>;

    /**
     * 构造函数
     * @param faceInfo 墙面信息
     */
    constructor(faceInfo: WallFaceInfo) {
        this.faceInfo = faceInfo;
        this.signalAssemblyChanged = new Signal(this);
        this.signalRegionAdded = new Signal(this);
        this.signalRegionRemoved = new Signal(this);
    }

    /**
     * 添加墙面区域
     * @param region 要添加的区域
     */
    public addRegion(region: WallFaceRegion): void {
        if (!this.regions.includes(region)) {
            this.regions.push(region);
            this.signalRegionAdded.dispatch(region);
            this.signalAssemblyChanged.dispatch(this);
        }
    }

    /**
     * 移除墙面区域
     * @param region 要移除的区域
     */
    public removeRegion(region: WallFaceRegion): void {
        const index = this.regions.indexOf(region);
        if (index !== -1) {
            this.regions.splice(index, 1);
            this.signalRegionRemoved.dispatch(region);
            this.signalAssemblyChanged.dispatch(this);
        }
    }

    /**
     * 清空所有区域
     */
    public clearRegions(): void {
        const regionsToRemove = [...this.regions];
        regionsToRemove.forEach(region => this.removeRegion(region));
    }

    /**
     * 根据ID获取区域
     * @param id 区域ID
     * @returns 区域对象或undefined
     */
    public getRegionById(id: string): WallFaceRegion | undefined {
        return this.regions.find(region => region.id === id);
    }

    /**
     * 设置分割信息
     * @param divideInfo 分割信息
     */
    public setDivideInfo(divideInfo: WallDivideInfo): void {
        this.divideInfo = divideInfo;
        this.signalAssemblyChanged.dispatch(this);
    }

    /**
     * 获取分割信息
     * @returns 分割信息
     */
    public getDivideInfo(): WallDivideInfo | undefined {
        return this.divideInfo;
    }

    /**
     * 更新墙面装配
     */
    public update(): void {
        this.signalAssemblyChanged.dispatch(this);
    }

    /**
     * 克隆墙面装配
     * @returns 新的墙面装配对象
     */
    public clone(): WallFaceAssembly {
        const newAssembly = new WallFaceAssembly({...this.faceInfo});
        newAssembly.enabled = this.enabled;
        newAssembly.divideInfo = this.divideInfo ? {...this.divideInfo} : undefined;
        newAssembly.regions = this.regions.map(region => ({...region}));
        return newAssembly;
    }

    /**
     * 序列化为JSON
     * @returns JSON对象
     */
    public toJSON(): any {
        return {
            faceInfo: this.faceInfo,
            divideInfo: this.divideInfo,
            enabled: this.enabled,
            regions: this.regions
        };
    }

    /**
     * 从JSON反序列化
     * @param json JSON对象
     * @returns 墙面装配对象
     */
    public static fromJSON(json: any): WallFaceAssembly {
        const assembly = new WallFaceAssembly(json.faceInfo);
        assembly.divideInfo = json.divideInfo;
        assembly.enabled = json.enabled !== undefined ? json.enabled : true;
        assembly.regions = json.regions || [];
        return assembly;
    }

    /**
     * 验证装配是否有效
     * @returns 是否有效
     */
    public isValid(): boolean {
        return !!(this.faceInfo && this.faceInfo.faceId);
    }

    /**
     * 获取区域数量
     * @returns 区域数量
     */
    public getRegionCount(): number {
        return this.regions.length;
    }

    /**
     * 判断是否有分割
     * @returns 是否有分割
     */
    public hasDivide(): boolean {
        return !!(this.divideInfo && this.divideInfo.divideLine);
    }

    /**
     * 应用材质到所有区域
     * @param material 材质对象
     */
    public applyMaterialToAllRegions(material: any): void {
        this.regions.forEach(region => {
            region.material = material;
        });
        this.signalAssemblyChanged.dispatch(this);
    }

    /**
     * 应用材质到指定区域
     * @param regionId 区域ID
     * @param material 材质对象
     */
    public applyMaterialToRegion(regionId: string, material: any): void {
        const region = this.getRegionById(regionId);
        if (region) {
            region.material = material;
            this.signalAssemblyChanged.dispatch(this);
        }
    }

    /**
     * 销毁装配
     */
    public dispose(): void {
        this.clearRegions();
        this.signalAssemblyChanged.dispose();
        this.signalRegionAdded.dispose();
        this.signalRegionRemoved.dispose();
    }
}