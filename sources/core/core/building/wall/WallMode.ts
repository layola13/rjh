/**
 * WallMode - 墙体模式
 * 定义墙体的编辑和显示模式
 */

/**
 * 墙体模式枚举
 */
export enum WallModeEnum {
    /** 正常模式 */
    Normal = 'Normal',
    /** 编辑模式 */
    Edit = 'Edit',
    /** 预览模式 */
    Preview = 'Preview',
    /** 测量模式 */
    Measure = 'Measure',
    /** 选择模式 */
    Select = 'Select'
}

/**
 * 墙体显示模式枚举
 */
export enum WallDisplayMode {
    /** 实体显示 */
    Solid = 'Solid',
    /** 线框显示 */
    Wireframe = 'Wireframe',
    /** 半透明显示 */
    Transparent = 'Transparent',
    /** 隐藏 */
    Hidden = 'Hidden'
}

/**
 * 墙体捕捉模式枚举
 */
export enum WallSnapMode {
    /** 无捕捉 */
    None = 'None',
    /** 端点捕捉 */
    Endpoint = 'Endpoint',
    /** 中点捕捉 */
    Midpoint = 'Midpoint',
    /** 最近点捕捉 */
    Nearest = 'Nearest',
    /** 垂直捕捉 */
    Perpendicular = 'Perpendicular',
    /** 切线捕捉 */
    Tangent = 'Tangent'
}

/**
 * 墙体模式配置接口
 */
export interface WallModeConfig {
    /** 当前模式 */
    mode: WallModeEnum;
    /** 显示模式 */
    displayMode: WallDisplayMode;
    /** 捕捉模式 */
    snapMode: WallSnapMode;
    /** 是否显示尺寸 */
    showDimensions: boolean;
    /** 是否显示辅助线 */
    showGuides: boolean;
    /** 是否启用网格 */
    enableGrid: boolean;
    /** 网格大小 */
    gridSize?: number;
}

/**
 * 墙体模式类
 * 管理墙体的编辑和显示状态
 */
export class WallMode {
    /** 当前配置 */
    private config: WallModeConfig;

    /**
     * 构造函数
     * @param config 初始配置
     */
    constructor(config?: Partial<WallModeConfig>) {
        this.config = {
            mode: WallModeEnum.Normal,
            displayMode: WallDisplayMode.Solid,
            snapMode: WallSnapMode.Endpoint,
            showDimensions: true,
            showGuides: true,
            enableGrid: false,
            gridSize: 100,
            ...config
        };
    }

    /**
     * 设置墙体模式
     * @param mode 新模式
     */
    public setMode(mode: WallModeEnum): void {
        this.config.mode = mode;
    }

    /**
     * 获取当前模式
     * @returns 当前模式
     */
    public getMode(): WallModeEnum {
        return this.config.mode;
    }

    /**
     * 设置显示模式
     * @param displayMode 显示模式
     */
    public setDisplayMode(displayMode: WallDisplayMode): void {
        this.config.displayMode = displayMode;
    }

    /**
     * 获取显示模式
     * @returns 显示模式
     */
    public getDisplayMode(): WallDisplayMode {
        return this.config.displayMode;
    }

    /**
     * 设置捕捉模式
     * @param snapMode 捕捉模式
     */
    public setSnapMode(snapMode: WallSnapMode): void {
        this.config.snapMode = snapMode;
    }

    /**
     * 获取捕捉模式
     * @returns 捕捉模式
     */
    public getSnapMode(): WallSnapMode {
        return this.config.snapMode;
    }

    /**
     * 切换尺寸显示
     * @param show 是否显示
     */
    public setShowDimensions(show: boolean): void {
        this.config.showDimensions = show;
    }

    /**
     * 是否显示尺寸
     * @returns 是否显示
     */
    public isShowDimensions(): boolean {
        return this.config.showDimensions;
    }

    /**
     * 切换辅助线显示
     * @param show 是否显示
     */
    public setShowGuides(show: boolean): void {
        this.config.showGuides = show;
    }

    /**
     * 是否显示辅助线
     * @returns 是否显示
     */
    public isShowGuides(): boolean {
        return this.config.showGuides;
    }

    /**
     * 启用/禁用网格
     * @param enable 是否启用
     */
    public setEnableGrid(enable: boolean): void {
        this.config.enableGrid = enable;
    }

    /**
     * 是否启用网格
     * @returns 是否启用
     */
    public isEnableGrid(): boolean {
        return this.config.enableGrid;
    }

    /**
     * 设置网格大小
     * @param size 网格大小
     */
    public setGridSize(size: number): void {
        this.config.gridSize = size;
    }

    /**
     * 获取网格大小
     * @returns 网格大小
     */
    public getGridSize(): number {
        return this.config.gridSize || 100;
    }

    /**
     * 判断是否为编辑模式
     * @returns 是否为编辑模式
     */
    public isEditMode(): boolean {
        return this.config.mode === WallModeEnum.Edit;
    }

    /**
     * 判断是否为预览模式
     * @returns 是否为预览模式
     */
    public isPreviewMode(): boolean {
        return this.config.mode === WallModeEnum.Preview;
    }

    /**
     * 判断是否为测量模式
     * @returns 是否为测量模式
     */
    public isMeasureMode(): boolean {
        return this.config.mode === WallModeEnum.Measure;
    }

    /**
     * 获取完整配置
     * @returns 配置对象
     */
    public getConfig(): WallModeConfig {
        return { ...this.config };
    }

    /**
     * 更新配置
     * @param config 新配置（部分）
     */
    public updateConfig(config: Partial<WallModeConfig>): void {
        this.config = { ...this.config, ...config };
    }

    /**
     * 重置为默认配置
     */
    public reset(): void {
        this.config = {
            mode: WallModeEnum.Normal,
            displayMode: WallDisplayMode.Solid,
            snapMode: WallSnapMode.Endpoint,
            showDimensions: true,
            showGuides: true,
            enableGrid: false,
            gridSize: 100
        };
    }

    /**
     * 克隆模式对象
     * @returns 新的模式对象
     */
    public clone(): WallMode {
        return new WallMode(this.config);
    }

    /**
     * 序列化为JSON
     * @returns JSON对象
     */
    public toJSON(): any {
        return { ...this.config };
    }

    /**
     * 从JSON反序列化
     * @param json JSON对象
     * @returns 墙体模式对象
     */
    public static fromJSON(json: any): WallMode {
        return new WallMode(json);
    }
}