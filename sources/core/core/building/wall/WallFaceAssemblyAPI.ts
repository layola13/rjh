/**
 * WallFaceAssemblyAPI - 墙面装配API
 * 提供墙面组件装配的核心API接口
 */

import { Vector2, Vector3 } from 'three';

/**
 * 墙面类型枚举
 */
export enum WallFaceType {
    /** 内墙面 */
    Inner = 'Inner',
    /** 外墙面 */
    Outer = 'Outer',
    /** 侧面 */
    Side = 'Side',
    /** 顶面 */
    Top = 'Top',
    /** 底面 */
    Bottom = 'Bottom'
}

/**
 * 装配组件类型枚举
 */
export enum AssemblyComponentType {
    /** 踢脚线 */
    BaseBoard = 'BaseBoard',
    /** 腰线 */
    WaistLine = 'WaistLine',
    /** 顶角线 */
    CornerLine = 'CornerLine',
    /** 护墙板 */
    WallPanel = 'WallPanel',
    /** 装饰条 */
    DecorativeStrip = 'DecorativeStrip',
    /** 门套 */
    DoorCasing = 'DoorCasing',
    /** 窗套 */
    WindowCasing = 'WindowCasing'
}

/**
 * 装配组件接口
 */
export interface IAssemblyComponent {
    /** 组件ID */
    id: string;
    /** 组件类型 */
    type: AssemblyComponentType;
    /** 材质ID */
    materialId?: string;
    /** 位置参数 */
    position: {
        /** 起点 */
        start: Vector3;
        /** 终点 */
        end: Vector3;
        /** 偏移 */
        offset?: number;
    };
    /** 尺寸参数 */
    dimensions: {
        /** 宽度 */
        width?: number;
        /** 高度 */
        height?: number;
        /** 深度 */
        depth?: number;
    };
    /** 是否启用 */
    enabled: boolean;
    /** 自定义数据 */
    userData?: any;
}

/**
 * 墙面装配配置接口
 */
export interface IWallFaceAssemblyConfig {
    /** 墙面ID */
    wallFaceId: string;
    /** 墙面类型 */
    faceType: WallFaceType;
    /** 装配组件列表 */
    components: IAssemblyComponent[];
    /** 是否自动装配 */
    autoAssembly?: boolean;
    /** 装配顺序 */
    assemblyOrder?: AssemblyComponentType[];
}

/**
 * 装配结果接口
 */
export interface IAssemblyResult {
    /** 是否成功 */
    success: boolean;
    /** 装配的组件 */
    components: IAssemblyComponent[];
    /** 错误信息 */
    errors?: string[];
    /** 警告信息 */
    warnings?: string[];
}

/**
 * 墙面装配API类
 * 提供墙面装配的核心功能
 */
export class WallFaceAssemblyAPI {
    private static _instance: WallFaceAssemblyAPI;

    /** 装配配置映射表 */
    private assemblyConfigs: Map<string, IWallFaceAssemblyConfig> = new Map();

    /** 组件库 */
    private componentLibrary: Map<string, IAssemblyComponent> = new Map();

    /**
     * 获取单例实例
     */
    public static instance(): WallFaceAssemblyAPI {
        if (!WallFaceAssemblyAPI._instance) {
            WallFaceAssemblyAPI._instance = new WallFaceAssemblyAPI();
        }
        return WallFaceAssemblyAPI._instance;
    }

    /**
     * 创建装配配置
     * @param wallFaceId 墙面ID
     * @param faceType 墙面类型
     * @returns 装配配置
     */
    public createAssemblyConfig(
        wallFaceId: string,
        faceType: WallFaceType
    ): IWallFaceAssemblyConfig {
        const config: IWallFaceAssemblyConfig = {
            wallFaceId,
            faceType,
            components: [],
            autoAssembly: true,
            assemblyOrder: [
                AssemblyComponentType.BaseBoard,
                AssemblyComponentType.WallPanel,
                AssemblyComponentType.WaistLine,
                AssemblyComponentType.CornerLine
            ]
        };

        this.assemblyConfigs.set(wallFaceId, config);
        return config;
    }

    /**
     * 获取装配配置
     * @param wallFaceId 墙面ID
     * @returns 装配配置或undefined
     */
    public getAssemblyConfig(wallFaceId: string): IWallFaceAssemblyConfig | undefined {
        return this.assemblyConfigs.get(wallFaceId);
    }

    /**
     * 添加组件到装配配置
     * @param wallFaceId 墙面ID
     * @param component 组件
     * @returns 是否成功
     */
    public addComponent(
        wallFaceId: string,
        component: IAssemblyComponent
    ): boolean {
        const config = this.assemblyConfigs.get(wallFaceId);
        if (!config) return false;

        // 验证组件
        if (!this.validateComponent(component)) {
            return false;
        }

        config.components.push(component);
        return true;
    }

    /**
     * 移除组件
     * @param wallFaceId 墙面ID
     * @param componentId 组件ID
     * @returns 是否成功
     */
    public removeComponent(wallFaceId: string, componentId: string): boolean {
        const config = this.assemblyConfigs.get(wallFaceId);
        if (!config) return false;

        const index = config.components.findIndex(c => c.id === componentId);
        if (index === -1) return false;

        config.components.splice(index, 1);
        return true;
    }

    /**
     * 更新组件
     * @param wallFaceId 墙面ID
     * @param componentId 组件ID
     * @param updates 更新数据
     * @returns 是否成功
     */
    public updateComponent(
        wallFaceId: string,
        componentId: string,
        updates: Partial<IAssemblyComponent>
    ): boolean {
        const config = this.assemblyConfigs.get(wallFaceId);
        if (!config) return false;

        const component = config.components.find(c => c.id === componentId);
        if (!component) return false;

        Object.assign(component, updates);
        return true;
    }

    /**
     * 执行装配
     * @param wallFaceId 墙面ID
     * @returns 装配结果
     */
    public assemble(wallFaceId: string): IAssemblyResult {
        const config = this.assemblyConfigs.get(wallFaceId);
        if (!config) {
            return {
                success: false,
                components: [],
                errors: [`Wall face ${wallFaceId} not found`]
            };
        }

        const result: IAssemblyResult = {
            success: true,
            components: [],
            errors: [],
            warnings: []
        };

        // 按装配顺序处理组件
        const order = config.assemblyOrder || [];
        for (const componentType of order) {
            const components = config.components.filter(
                c => c.type === componentType && c.enabled
            );

            for (const component of components) {
                try {
                    const assembled = this.assembleComponent(config, component);
                    if (assembled) {
                        result.components.push(assembled);
                    }
                } catch (error) {
                    result.errors!.push(
                        `Failed to assemble component ${component.id}: ${error}`
                    );
                    result.success = false;
                }
            }
        }

        return result;
    }

    /**
     * 装配单个组件
     * @param config 装配配置
     * @param component 组件
     * @returns 装配后的组件或undefined
     */
    private assembleComponent(
        config: IWallFaceAssemblyConfig,
        component: IAssemblyComponent
    ): IAssemblyComponent | undefined {
        // 验证组件位置
        if (!this.validateComponentPosition(component)) {
            return undefined;
        }

        // 应用墙面类型相关的调整
        this.applyFaceTypeAdjustments(config.faceType, component);

        // 返回装配后的组件
        return { ...component };
    }

    /**
     * 应用墙面类型调整
     * @param faceType 墙面类型
     * @param component 组件
     */
    private applyFaceTypeAdjustments(
        faceType: WallFaceType,
        component: IAssemblyComponent
    ): void {
        // 根据墙面类型调整组件参数
        switch (faceType) {
            case WallFaceType.Inner:
                // 内墙面调整
                break;
            case WallFaceType.Outer:
                // 外墙面调整
                break;
            default:
                break;
        }
    }

    /**
     * 验证组件
     * @param component 组件
     * @returns 是否有效
     */
    private validateComponent(component: IAssemblyComponent): boolean {
        if (!component.id) return false;
        if (!component.type) return false;
        if (!component.position) return false;
        if (!component.dimensions) return false;
        return true;
    }

    /**
     * 验证组件位置
     * @param component 组件
     * @returns 是否有效
     */
    private validateComponentPosition(component: IAssemblyComponent): boolean {
        const pos = component.position;
        if (!pos.start || !pos.end) return false;

        // 检查起点和终点是否相同
        const distance = pos.start.distanceTo(pos.end);
        if (distance < 0.001) return false;

        return true;
    }

    /**
     * 获取组件列表
     * @param wallFaceId 墙面ID
     * @param componentType 组件类型（可选）
     * @returns 组件数组
     */
    public getComponents(
        wallFaceId: string,
        componentType?: AssemblyComponentType
    ): IAssemblyComponent[] {
        const config = this.assemblyConfigs.get(wallFaceId);
        if (!config) return [];

        if (componentType) {
            return config.components.filter(c => c.type === componentType);
        }

        return [...config.components];
    }

    /**
     * 启用/禁用组件
     * @param wallFaceId 墙面ID
     * @param componentId 组件ID
     * @param enabled 是否启用
     * @returns 是否成功
     */
    public setComponentEnabled(
        wallFaceId: string,
        componentId: string,
        enabled: boolean
    ): boolean {
        return this.updateComponent(wallFaceId, componentId, { enabled });
    }

    /**
     * 批量启用/禁用组件
     * @param wallFaceId 墙面ID
     * @param componentType 组件类型
     * @param enabled 是否启用
     * @returns 成功数量
     */
    public setComponentsEnabledByType(
        wallFaceId: string,
        componentType: AssemblyComponentType,
        enabled: boolean
    ): number {
        const config = this.assemblyConfigs.get(wallFaceId);
        if (!config) return 0;

        let count = 0;
        for (const component of config.components) {
            if (component.type === componentType) {
                component.enabled = enabled;
                count++;
            }
        }

        return count;
    }

    /**
     * 清空装配配置
     * @param wallFaceId 墙面ID
     * @returns 是否成功
     */
    public clearAssembly(wallFaceId: string): boolean {
        const config = this.assemblyConfigs.get(wallFaceId);
        if (!config) return false;

        config.components = [];
        return true;
    }

    /**
     * 删除装配配置
     * @param wallFaceId 墙面ID
     * @returns 是否成功
     */
    public deleteAssembly(wallFaceId: string): boolean {
        return this.assemblyConfigs.delete(wallFaceId);
    }

    /**
     * 克隆装配配置
     * @param sourceWallFaceId 源墙面ID
     * @param targetWallFaceId 目标墙面ID
     * @returns 克隆的配置或undefined
     */
    public cloneAssembly(
        sourceWallFaceId: string,
        targetWallFaceId: string
    ): IWallFaceAssemblyConfig | undefined {
        const sourceConfig = this.assemblyConfigs.get(sourceWallFaceId);
        if (!sourceConfig) return undefined;

        const targetConfig: IWallFaceAssemblyConfig = {
            wallFaceId: targetWallFaceId,
            faceType: sourceConfig.faceType,
            components: sourceConfig.components.map(c => ({ ...c, id: this.generateComponentId() })),
            autoAssembly: sourceConfig.autoAssembly,
            assemblyOrder: sourceConfig.assemblyOrder ? [...sourceConfig.assemblyOrder] : undefined
        };

        this.assemblyConfigs.set(targetWallFaceId, targetConfig);
        return targetConfig;
    }

    /**
     * 生成组件ID
     * @returns 唯一ID
     */
    private generateComponentId(): string {
        return `component_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    /**
     * 序列化装配配置
     * @param wallFaceId 墙面ID
     * @returns JSON字符串或undefined
     */
    public serialize(wallFaceId: string): string | undefined {
        const config = this.assemblyConfigs.get(wallFaceId);
        if (!config) return undefined;

        return JSON.stringify({
            ...config,
            components: config.components.map(c => ({
                ...c,
                position: {
                    start: { x: c.position.start.x, y: c.position.start.y, z: c.position.start.z },
                    end: { x: c.position.end.x, y: c.position.end.y, z: c.position.end.z },
                    offset: c.position.offset
                }
            }))
        }, null, 2);
    }

    /**
     * 反序列化装配配置
     * @param json JSON字符串
     * @returns 是否成功
     */
    public deserialize(json: string): boolean {
        try {
            const data = JSON.parse(json);
            const config: IWallFaceAssemblyConfig = {
                ...data,
                components: data.components.map((c: any) => ({
                    ...c,
                    position: {
                        start: new Vector3(c.position.start.x, c.position.start.y, c.position.start.z),
                        end: new Vector3(c.position.end.x, c.position.end.y, c.position.end.z),
                        offset: c.position.offset
                    }
                }))
            };

            this.assemblyConfigs.set(config.wallFaceId, config);
            return true;
        } catch (error) {
            console.error('Failed to deserialize assembly config:', error);
            return false;
        }
    }

    /**
     * 获取装配统计信息
     * @param wallFaceId 墙面ID
     * @returns 统计信息
     */
    public getAssemblyStats(wallFaceId: string): {
        totalComponents: number;
        enabledComponents: number;
        componentsByType: Map<AssemblyComponentType, number>;
    } | undefined {
        const config = this.assemblyConfigs.get(wallFaceId);
        if (!config) return undefined;

        const stats = {
            totalComponents: config.components.length,
            enabledComponents: config.components.filter(c => c.enabled).length,
            componentsByType: new Map<AssemblyComponentType, number>()
        };

        for (const component of config.components) {
            const count = stats.componentsByType.get(component.type) || 0;
            stats.componentsByType.set(component.type, count + 1);
        }

        return stats;
    }
}