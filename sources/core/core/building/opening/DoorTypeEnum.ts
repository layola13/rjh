/**
 * DoorTypeEnum - 门类型枚举
 * 定义系统支持的所有门类型
 */

/**
 * 门类型枚举
 */
export enum DoorTypeEnum {
    /** 平开门 */
    Swing = 'Swing',
    /** 推拉门 */
    Sliding = 'Sliding',
    /** 折叠门 */
    Folding = 'Folding',
    /** 旋转门 */
    Revolving = 'Revolving',
    /** 卷帘门 */
    Rolling = 'Rolling',
    /** 自动门 */
    Automatic = 'Automatic',
    /** 双开门 */
    Double = 'Double',
    /** 单开门 */
    Single = 'Single',
    /** 子母门 */
    MotherSon = 'MotherSon',
    /** 谷仓门 */
    Barn = 'Barn',
    /** 玻璃门 */
    Glass = 'Glass',
    /** 防火门 */
    Fire = 'Fire',
    /** 防盗门 */
    Security = 'Security',
    /** 隐形门 */
    Hidden = 'Hidden',
    /** 自定义门 */
    Custom = 'Custom'
}

/**
 * 门开启方向枚举
 */
export enum DoorOpenDirection {
    /** 左开 */
    Left = 'Left',
    /** 右开 */
    Right = 'Right',
    /** 内开 */
    Inward = 'Inward',
    /** 外开 */
    Outward = 'Outward',
    /** 左内开 */
    LeftInward = 'LeftInward',
    /** 左外开 */
    LeftOutward = 'LeftOutward',
    /** 右内开 */
    RightInward = 'RightInward',
    /** 右外开 */
    RightOutward = 'RightOutward'
}

/**
 * 门框类型枚举
 */
export enum DoorFrameType {
    /** 标准门框 */
    Standard = 'Standard',
    /** 无框 */
    Frameless = 'Frameless',
    /** 隐藏框 */
    Hidden = 'Hidden',
    /** 加厚框 */
    Thick = 'Thick',
    /** 装饰框 */
    Decorative = 'Decorative'
}

/**
 * 门材质类型枚举
 */
export enum DoorMaterialType {
    /** 木门 */
    Wood = 'Wood',
    /** 金属门 */
    Metal = 'Metal',
    /** 玻璃门 */
    Glass = 'Glass',
    /** 塑料门 */
    Plastic = 'Plastic',
    /** 复合材料门 */
    Composite = 'Composite',
    /** 铝合金门 */
    Aluminum = 'Aluminum',
    /** 钢门 */
    Steel = 'Steel',
    /** 铜门 */
    Copper = 'Copper'
}

/**
 * 门五金类型枚举
 */
export enum DoorHardwareType {
    /** 普通合页 */
    StandardHinge = 'StandardHinge',
    /** 隐藏合页 */
    HiddenHinge = 'HiddenHinge',
    /** 液压合页 */
    HydraulicHinge = 'HydraulicHinge',
    /** 滑轨 */
    SlidingTrack = 'SlidingTrack',
    /** 地弹簧 */
    FloorSpring = 'FloorSpring',
    /** 闭门器 */
    DoorCloser = 'DoorCloser'
}

/**
 * 门锁类型枚举
 */
export enum DoorLockType {
    /** 球形锁 */
    Spherical = 'Spherical',
    /** 执手锁 */
    Lever = 'Lever',
    /** 插芯锁 */
    Mortise = 'Mortise',
    /** 智能锁 */
    Smart = 'Smart',
    /** 指纹锁 */
    Fingerprint = 'Fingerprint',
    /** 密码锁 */
    Password = 'Password',
    /** 无锁 */
    None = 'None'
}

/**
 * 门样式枚举
 */
export enum DoorStyleEnum {
    /** 现代简约 */
    Modern = 'Modern',
    /** 古典 */
    Classical = 'Classical',
    /** 中式 */
    Chinese = 'Chinese',
    /** 欧式 */
    European = 'European',
    /** 美式 */
    American = 'American',
    /** 日式 */
    Japanese = 'Japanese',
    /** 工业风 */
    Industrial = 'Industrial',
    /** 田园风 */
    Rustic = 'Rustic'
}

/**
 * 门配置接口
 */
export interface DoorConfig {
    /** 门类型 */
    type: DoorTypeEnum;
    /** 开启方向 */
    openDirection: DoorOpenDirection;
    /** 门框类型 */
    frameType: DoorFrameType;
    /** 材质类型 */
    materialType: DoorMaterialType;
    /** 五金类型 */
    hardwareType: DoorHardwareType;
    /** 锁具类型 */
    lockType: DoorLockType;
    /** 样式 */
    style: DoorStyleEnum;
    /** 宽度 */
    width: number;
    /** 高度 */
    height: number;
    /** 厚度 */
    thickness: number;
}

/**
 * 门类型工具类
 */
export class DoorTypeUtil {
    /**
     * 判断是否为平开门
     * @param type 门类型
     * @returns 是否为平开门
     */
    public static isSwingDoor(type: DoorTypeEnum): boolean {
        return type === DoorTypeEnum.Swing || 
               type === DoorTypeEnum.Single || 
               type === DoorTypeEnum.Double ||
               type === DoorTypeEnum.MotherSon;
    }

    /**
     * 判断是否为推拉门
     * @param type 门类型
     * @returns 是否为推拉门
     */
    public static isSlidingDoor(type: DoorTypeEnum): boolean {
        return type === DoorTypeEnum.Sliding || 
               type === DoorTypeEnum.Barn;
    }

    /**
     * 判断是否为折叠门
     * @param type 门类型
     * @returns 是否为折叠门
     */
    public static isFoldingDoor(type: DoorTypeEnum): boolean {
        return type === DoorTypeEnum.Folding;
    }

    /**
     * 判断是否需要门框
     * @param frameType 门框类型
     * @returns 是否需要门框
     */
    public static needsFrame(frameType: DoorFrameType): boolean {
        return frameType !== DoorFrameType.Frameless;
    }

    /**
     * 获取门类型的默认配置
     * @param type 门类型
     * @returns 默认配置
     */
    public static getDefaultConfig(type: DoorTypeEnum): Partial<DoorConfig> {
        const configs: { [key in DoorTypeEnum]?: Partial<DoorConfig> } = {
            [DoorTypeEnum.Swing]: {
                width: 900,
                height: 2100,
                thickness: 40,
                frameType: DoorFrameType.Standard,
                openDirection: DoorOpenDirection.LeftInward
            },
            [DoorTypeEnum.Sliding]: {
                width: 1200,
                height: 2100,
                thickness: 40,
                frameType: DoorFrameType.Frameless,
                openDirection: DoorOpenDirection.Left
            },
            [DoorTypeEnum.Folding]: {
                width: 800,
                height: 2100,
                thickness: 35,
                frameType: DoorFrameType.Standard,
                openDirection: DoorOpenDirection.Left
            }
        };

        return configs[type] || {
            width: 900,
            height: 2100,
            thickness: 40
        };
    }

    /**
     * 验证门配置是否有效
     * @param config 门配置
     * @returns 是否有效
     */
    public static isValidConfig(config: Partial<DoorConfig>): boolean {
        if (!config.type) return false;
        if (config.width && config.width <= 0) return false;
        if (config.height && config.height <= 0) return false;
        if (config.thickness && config.thickness <= 0) return false;
        return true;
    }
}