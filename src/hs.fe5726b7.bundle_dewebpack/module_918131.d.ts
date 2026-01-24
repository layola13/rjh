/**
 * 应用设置管理器
 * 负责管理应用的本地存储设置，包括显示单位、网格可见性、墙体属性等配置项
 */
declare module AppSettingsManager {
  /**
   * 设置字段名称类型
   */
  type SettingKey =
    | 'defaultDisplayLengthUnit'
    | 'defaultDisplayLengthDigits'
    | 'defaultDisplayAreaUnit'
    | 'defaultDisplayAreaDigits'
    | 'gridVisible'
    | 'dimensionVisiable'
    | 'dimensionType'
    | 'roomAreaVisible'
    | 'roomTypeVisible'
    | 'showHalfWall'
    | 'contentPrecisionLocation'
    | 'contentPrecisionLocation3d'
    | 'lightingPrecisionLocation'
    | 'orthoModeOn'
    | 'wallWidth'
    | 'wallMode'
    | 'wallIsBearing'
    | 'wallArcHeight'
    | 'autoSaveInterval'
    | 'renderSpeedLevel'
    | 'svgColorModel'
    | 'showProductInfo'
    | 'enableLightTarget'
    | 'primaryViewCameraVisible2D'
    | 'auxiliaryLineVisible';

  /**
   * 设置值变更事件数据
   */
  interface SettingChangeData {
    /** 字段名称 */
    fieldName: SettingKey;
    /** 新值 */
    value: unknown;
    /** 是否为临时变更（临时变更不保存到本地存储） */
    temp: boolean;
  }

  /**
   * 设置变更事件参数
   */
  interface SettingChangeEvent {
    data: SettingChangeData;
  }

  /**
   * 应用设置接口
   */
  interface AppSettings {
    /** 默认显示长度单位 */
    defaultDisplayLengthUnit?: HSCore.Util.Unit.LengthUnitTypeEnum;
    /** 默认显示长度精度位数 */
    defaultDisplayLengthDigits?: number;
    /** 默认显示面积单位 */
    defaultDisplayAreaUnit?: HSCore.Util.Unit.AreaUnitTypeEnum;
    /** 默认显示面积精度位数 */
    defaultDisplayAreaDigits?: number;
    /** 网格是否可见 */
    gridVisible?: boolean;
    /** 尺寸标注是否可见 */
    dimensionVisiable?: boolean;
    /** 尺寸标注类型 */
    dimensionType?: unknown;
    /** 房间面积是否可见 */
    roomAreaVisible?: boolean;
    /** 房间类型是否可见 */
    roomTypeVisible?: boolean;
    /** 是否显示半墙 */
    showHalfWall?: boolean;
    /** 内容精确定位（2D） */
    contentPrecisionLocation?: boolean;
    /** 内容精确定位（3D） */
    contentPrecisionLocation3d?: boolean;
    /** 灯光精确定位 */
    lightingPrecisionLocation?: boolean;
    /** 是否启用正交模式 */
    orthoModeOn?: boolean;
    /** 墙体宽度 */
    wallWidth?: number;
    /** 墙体模式 */
    wallMode?: unknown;
    /** 墙体是否承重 */
    wallIsBearing?: boolean;
    /** 墙体弧形高度 */
    wallArcHeight?: boolean;
    /** 自动保存间隔（秒） */
    autoSaveInterval?: number;
    /** 渲染速度等级 */
    renderSpeedLevel?: number;
    /** SVG颜色模型 */
    svgColorModel?: number;
    /** 是否显示产品信息 */
    showProductInfo?: boolean;
    /** 是否启用灯光目标 */
    enableLightTarget?: boolean;
    /** 主视图相机在2D中是否可见 */
    primaryViewCameraVisible2D?: boolean;
    /** 辅助线是否可见 */
    auxiliaryLineVisible?: boolean;

    /** 设置值变更信号 */
    signalValueChanged: HSCore.Util.Signal<SettingChangeEvent>;

    /**
     * 判断是否为全局设置
     * @param key - 设置键名
     * @returns 是否为全局设置
     */
    isGlobalSetting(key: SettingKey): boolean;

    /**
     * 获取视图级别的设置项
     * @param key - 设置键名
     * @returns 设置值
     */
    getViewItem(key: SettingKey): unknown;

    /**
     * 设置视图级别的设置项
     * @param key - 设置键名
     * @param value - 设置值
     */
    setViewItem(key: SettingKey, value: unknown): void;
  }

  /**
   * 应用设置管理器类
   */
  interface Manager {
    /** 应用设置实例 */
    appSettings: AppSettings | null;

    /** 管理的设置键名列表 */
    keys: ReadonlyArray<SettingKey>;

    /** 信号钩子（用于监听设置变更） */
    _signalHook?: HSCore.Util.SignalHook;

    /**
     * 初始化设置管理器
     * 获取应用设置实例，加载本地存储的设置，绑定变更信号
     */
    init(): void;

    /**
     * 绑定设置变更信号
     * 监听 appSettings.signalValueChanged 信号
     */
    bindSignal(): void;

    /**
     * 根据应用设置更新本地值
     * @param event - 设置变更事件
     */
    updateByAppSetting(event: SettingChangeEvent): void;

    /**
     * 保存设置到本地存储
     * @param key - 可选，指定要保存的设置键名，不传则保存所有
     */
    save(key?: SettingKey): void;

    /**
     * 从本地存储加载设置
     * 解析不同类型的设置值，处理租户特定逻辑
     */
    load(): void;

    // 动态设置属性（运行时会添加所有 SettingKey 对应的属性）
    [key: string]: unknown;
  }
}

/**
 * 导出的应用设置管理器实例
 */
declare const appSettingsManager: AppSettingsManager.Manager;

export = appSettingsManager;