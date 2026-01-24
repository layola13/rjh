/**
 * 菜单数据管理器（单例模式）
 * 负责管理菜单数据、自定义目录管理器以及恢复状态
 */
export default class MenuDataManager {
    /**
     * 单例实例
     */
    private static instance?: MenuDataManager;

    /**
     * 菜单数据映射表
     * 键为菜单标识符，值为菜单数据
     */
    private menuDataMap: Map<string, unknown>;

    /**
     * 自定义目录管理器映射表
     * 键为目录标识符，值为对应的管理器实例
     */
    private CustomCatalogManagerMap: Map<string, unknown>;

    /**
     * 需要恢复的状态映射表
     * 键为状态标识符，值为是否需要恢复的标志
     */
    private needRecoverMap: Map<string, boolean>;

    /**
     * 私有构造函数，防止外部直接实例化
     */
    constructor() {
        this.menuDataMap = new Map();
        this.CustomCatalogManagerMap = new Map();
        this.needRecoverMap = new Map();
    }

    /**
     * 获取单例实例
     * @returns MenuDataManager实例
     */
    static getInstance(): MenuDataManager {
        if (!this.instance) {
            this.instance = new MenuDataManager();
        }
        return this.instance;
    }

    /**
     * 设置菜单数据
     * @param key - 菜单标识符
     * @param data - 菜单数据
     */
    setMenuData(key: string, data: unknown): void {
        this.menuDataMap.set(key, data);
    }

    /**
     * 获取菜单数据
     * @param key - 菜单标识符
     * @returns 对应的菜单数据，如果不存在则返回undefined
     */
    getMenuData(key: string): unknown | undefined {
        return this.menuDataMap.get(key);
    }

    /**
     * 设置自定义目录管理器
     * @param key - 目录标识符
     * @param manager - 自定义目录管理器实例
     */
    setCustomManager(key: string, manager: unknown): void {
        this.CustomCatalogManagerMap.set(key, manager);
    }

    /**
     * 获取自定义目录管理器
     * @param key - 目录标识符
     * @returns 对应的管理器实例，如果不存在则返回undefined
     */
    getCustomManager(key: string): unknown | undefined {
        return this.CustomCatalogManagerMap.get(key);
    }

    /**
     * 设置是否需要恢复状态
     * @param key - 状态标识符
     * @param needRecover - 是否需要恢复
     */
    needRecover(key: string, needRecover: boolean): void {
        this.needRecoverMap.set(key, needRecover);
    }

    /**
     * 获取是否需要恢复状态
     * @param key - 状态标识符
     * @returns 是否需要恢复，如果不存在则返回undefined
     */
    getNeedRecover(key: string): boolean | undefined {
        return this.needRecoverMap.get(key);
    }
}