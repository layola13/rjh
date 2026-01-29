/**
 * CabinetBase - 柜体基类
 * 所有柜体类型的基础类，提供通用的柜体功能
 */

import { Cabinet } from './Cabinet';
import { Vector3 } from 'three';

/**
 * 柜体类型枚举
 */
export enum CabinetBaseType {
    /** 地柜 */
    Base = 'Base',
    /** 吊柜 */
    Wall = 'Wall',
    /** 高柜 */
    Tall = 'Tall',
    /** 转角柜 */
    Corner = 'Corner',
    /** 岛台柜 */
    Island = 'Island',
    /** 自定义柜 */
    Custom = 'Custom'
}

/**
 * 柜门类型枚举
 */
export enum CabinetDoorType {
    /** 平开门 */
    Swing = 'Swing',
    /** 推拉门 */
    Sliding = 'Sliding',
    /** 上翻门 */
    LiftUp = 'LiftUp',
    /** 下翻门 */
    LiftDown = 'LiftDown',
    /** 折叠门 */
    Folding = 'Folding',
    /** 无门 */
    None = 'None'
}

/**
 * 柜体抽屉类型枚举
 */
export enum CabinetDrawerType {
    /** 标准抽屉 */
    Standard = 'Standard',
    /** 深抽屉 */
    Deep = 'Deep',
    /** 浅抽屉 */
    Shallow = 'Shallow',
    /** 隐藏抽屉 */
    Hidden = 'Hidden',
    /** 无抽屉 */
    None = 'None'
}

/**
 * 柜体配置接口
 */
export interface CabinetBaseConfig {
    /** 柜体类型 */
    type: CabinetBaseType;
    /** 宽度 */
    width: number;
    /** 高度 */
    height: number;
    /** 深度 */
    depth: number;
    /** 门类型 */
    doorType: CabinetDoorType;
    /** 抽屉类型 */
    drawerType: CabinetDrawerType;
    /** 抽屉数量 */
    drawerCount: number;
    /** 隔板数量 */
    shelfCount: number;
    /** 是否有背板 */
    hasBackPanel: boolean;
    /** 是否有踢脚线 */
    hasKickPlate: boolean;
}

/**
 * 柜体组件接口
 */
export interface CabinetComponent {
    /** 组件ID */
    id: string;
    /** 组件类型 */
    type: string;
    /** 组件位置 */
    position: Vector3;
    /** 组件尺寸 */
    size: Vector3;
    /** 组件材质ID */
    materialId?: string;
}

/**
 * 柜体基类
 * 提供所有柜体的基础功能
 */
export class CabinetBase extends Cabinet {
    /** 柜体基础类型 */
    public baseType: CabinetBaseType;
    
    /** 门类型 */
    public doorType: CabinetDoorType;
    
    /** 抽屉类型 */
    public drawerType: CabinetDrawerType;
    
    /** 抽屉数量 */
    public drawerCount: number = 0;
    
    /** 隔板数量 */
    public shelfCount: number = 0;
    
    /** 是否有背板 */
    public hasBackPanel: boolean = true;
    
    /** 是否有踢脚线 */
    public hasKickPlate: boolean = true;
    
    /** 柜体组件列表 */
    public components: CabinetComponent[] = [];
    
    /** 柜体宽度 */
    private cabinetWidth: number = 600;
    
    /** 柜体高度 */
    private cabinetHeight: number = 800;
    
    /** 柜体深度 */
    private cabinetDepth: number = 550;

    /**
     * 构造函数
     * @param id 实体ID
     * @param config 柜体配置
     */
    constructor(id: string = '', config?: Partial<CabinetBaseConfig>) {
        super(id);
        
        this.baseType = config?.type || CabinetBaseType.Base;
        this.doorType = config?.doorType || CabinetDoorType.Swing;
        this.drawerType = config?.drawerType || CabinetDrawerType.None;
        this.drawerCount = config?.drawerCount || 0;
        this.shelfCount = config?.shelfCount || 0;
        this.hasBackPanel = config?.hasBackPanel !== undefined ? config.hasBackPanel : true;
        this.hasKickPlate = config?.hasKickPlate !== undefined ? config.hasKickPlate : true;

        if (config) {
            this.applyConfig(config);
        }
    }

    /**
     * 应用配置
     * @param config 柜体配置
     */
    public applyConfig(config: Partial<CabinetBaseConfig>): void {
        if (config.type) this.baseType = config.type;
        if (config.doorType) this.doorType = config.doorType;
        if (config.drawerType) this.drawerType = config.drawerType;
        if (config.drawerCount !== undefined) this.drawerCount = config.drawerCount;
        if (config.shelfCount !== undefined) this.shelfCount = config.shelfCount;
        if (config.hasBackPanel !== undefined) this.hasBackPanel = config.hasBackPanel;
        if (config.hasKickPlate !== undefined) this.hasKickPlate = config.hasKickPlate;

        if (config.width || config.height || config.depth) {
            this.updateDimensions(
                config.width || (this as any).width,
                config.height || (this as any).height,
                config.depth || (this as any).depth
            );
        }
    }

    /**
     * 更新尺寸
     * @param width 宽度
     * @param height 高度
     * @param depth 深度
     */
    public updateDimensions(width: number, height: number, depth: number): void {
        this.cabinetWidth = width;
        this.cabinetHeight = height;
        this.cabinetDepth = depth;
        this.regenerateComponents();
    }
    
    /**
     * 获取宽度
     */
    public get width(): number {
        return this.cabinetWidth;
    }
    
    /**
     * 获取高度
     */
    public get height(): number {
        return this.cabinetHeight;
    }
    
    /**
     * 获取深度
     */
    public get depth(): number {
        return this.cabinetDepth;
    }

    /**
     * 重新生成组件
     */
    public regenerateComponents(): void {
        this.components = [];
        
        // 生成基础柜体结构
        this.generateCabinetBox();
        
        // 生成门
        if (this.doorType !== CabinetDoorType.None) {
            this.generateDoors();
        }
        
        // 生成抽屉
        if (this.drawerCount > 0) {
            this.generateDrawers();
        }
        
        // 生成隔板
        if (this.shelfCount > 0) {
            this.generateShelves();
        }
        
        // 生成背板
        if (this.hasBackPanel) {
            this.generateBackPanel();
        }
        
        // 生成踢脚线
        if (this.hasKickPlate) {
            this.generateKickPlate();
        }
    }

    /**
     * 生成柜体箱体
     * @private
     */
    private generateCabinetBox(): void {
        const width = this.cabinetWidth;
        const height = this.cabinetHeight;
        const depth = this.cabinetDepth;
        const thickness = 18; // 板材厚度

        // 左侧板
        this.components.push({
            id: `${this.id}_left`,
            type: 'side_panel',
            position: new Vector3(0, 0, 0),
            size: new Vector3(thickness, depth, height)
        });

        // 右侧板
        this.components.push({
            id: `${this.id}_right`,
            type: 'side_panel',
            position: new Vector3(width - thickness, 0, 0),
            size: new Vector3(thickness, depth, height)
        });

        // 顶板
        this.components.push({
            id: `${this.id}_top`,
            type: 'top_panel',
            position: new Vector3(0, 0, height - thickness),
            size: new Vector3(width, depth, thickness)
        });

        // 底板
        this.components.push({
            id: `${this.id}_bottom`,
            type: 'bottom_panel',
            position: new Vector3(0, 0, 0),
            size: new Vector3(width, depth, thickness)
        });
    }

    /**
     * 生成柜门
     * @private
     */
    private generateDoors(): void {
        const width = this.cabinetWidth;
        const height = this.cabinetHeight;
        const depth = this.cabinetDepth;

        // 简化实现：生成单个门
        this.components.push({
            id: `${this.id}_door`,
            type: 'door',
            position: new Vector3(0, depth, 0),
            size: new Vector3(width, 20, height)
        });
    }

    /**
     * 生成抽屉
     * @private
     */
    private generateDrawers(): void {
        const width = this.cabinetWidth;
        const height = this.cabinetHeight;
        const depth = this.cabinetDepth;
        const drawerHeight = height / (this.drawerCount + 1);

        for (let i = 0; i < this.drawerCount; i++) {
            this.components.push({
                id: `${this.id}_drawer_${i}`,
                type: 'drawer',
                position: new Vector3(0, 0, i * drawerHeight),
                size: new Vector3(width, depth, drawerHeight)
            });
        }
    }

    /**
     * 生成隔板
     * @private
     */
    private generateShelves(): void {
        const width = this.cabinetWidth;
        const height = this.cabinetHeight;
        const depth = this.cabinetDepth;
        const thickness = 18;
        const shelfSpacing = height / (this.shelfCount + 1);

        for (let i = 0; i < this.shelfCount; i++) {
            this.components.push({
                id: `${this.id}_shelf_${i}`,
                type: 'shelf',
                position: new Vector3(0, 0, (i + 1) * shelfSpacing),
                size: new Vector3(width, depth, thickness)
            });
        }
    }

    /**
     * 生成背板
     * @private
     */
    private generateBackPanel(): void {
        const width = this.cabinetWidth;
        const height = this.cabinetHeight;
        const thickness = 5;

        this.components.push({
            id: `${this.id}_back`,
            type: 'back_panel',
            position: new Vector3(0, 0, 0),
            size: new Vector3(width, thickness, height)
        });
    }

    /**
     * 生成踢脚线
     * @private
     */
    private generateKickPlate(): void {
        const width = this.cabinetWidth;
        const height = 100;
        const depth = this.cabinetDepth;

        this.components.push({
            id: `${this.id}_kick`,
            type: 'kick_plate',
            position: new Vector3(0, depth, 0),
            size: new Vector3(width, 18, height)
        });
    }

    /**
     * 添加组件
     * @param component 组件对象
     */
    public addComponent(component: CabinetComponent): void {
        this.components.push(component);
    }

    /**
     * 移除组件
     * @param componentId 组件ID
     */
    public removeComponent(componentId: string): void {
        const index = this.components.findIndex(c => c.id === componentId);
        if (index !== -1) {
            this.components.splice(index, 1);
        }
    }

    /**
     * 获取组件
     * @param componentId 组件ID
     * @returns 组件对象或undefined
     */
    public getComponent(componentId: string): CabinetComponent | undefined {
        return this.components.find(c => c.id === componentId);
    }

    /**
     * 获取所有组件
     * @returns 组件数组
     */
    public getAllComponents(): CabinetComponent[] {
        return [...this.components];
    }

    /**
     * 计算柜体总体积
     * @returns 体积
     */
    public calculateVolume(): number {
        const width = this.cabinetWidth;
        const height = this.cabinetHeight;
        const depth = this.cabinetDepth;
        return width * height * depth;
    }

    /**
     * 计算柜体材料用量
     * @returns 材料用量对象
     */
    public calculateMaterialUsage(): any {
        const usage: any = {
            panels: 0,
            hardware: 0,
            doors: 0,
            drawers: 0
        };

        this.components.forEach(component => {
            const volume = component.size.x * component.size.y * component.size.z;
            
            switch (component.type) {
                case 'side_panel':
                case 'top_panel':
                case 'bottom_panel':
                case 'shelf':
                case 'back_panel':
                    usage.panels += volume;
                    break;
                case 'door':
                    usage.doors += volume;
                    break;
                case 'drawer':
                    usage.drawers += volume;
                    break;
            }
        });

        return usage;
    }

    /**
     * 克隆柜体
     * @returns 新的柜体对象
     */
    public cloneBase(): CabinetBase {
        const newCabinet = new CabinetBase(this.id, {
            type: this.baseType,
            doorType: this.doorType,
            drawerType: this.drawerType,
            drawerCount: this.drawerCount,
            shelfCount: this.shelfCount,
            hasBackPanel: this.hasBackPanel,
            hasKickPlate: this.hasKickPlate,
            width: this.cabinetWidth,
            height: this.cabinetHeight,
            depth: this.cabinetDepth
        });

        newCabinet.components = this.components.map(c => ({ ...c }));
        return newCabinet;
    }

    /**
     * 序列化为JSON
     * @returns JSON对象
     */
    public toJSON(): any {
        return {
            id: this.id,
            baseType: this.baseType,
            doorType: this.doorType,
            drawerType: this.drawerType,
            drawerCount: this.drawerCount,
            shelfCount: this.shelfCount,
            hasBackPanel: this.hasBackPanel,
            hasKickPlate: this.hasKickPlate,
            components: this.components
        };
    }

    /**
     * 从JSON反序列化
     * @param json JSON对象
     * @returns 柜体对象
     */
    public static fromJSON(json: any): CabinetBase {
        const cabinet = new CabinetBase(json.id, {
            type: json.baseType || json.cabinetType,
            doorType: json.doorType,
            drawerType: json.drawerType,
            drawerCount: json.drawerCount,
            shelfCount: json.shelfCount,
            hasBackPanel: json.hasBackPanel,
            hasKickPlate: json.hasKickPlate
        });

        if (json.components) {
            cabinet.components = json.components;
        }

        return cabinet;
    }
}