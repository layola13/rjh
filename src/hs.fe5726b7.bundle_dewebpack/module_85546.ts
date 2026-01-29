/**
 * Menu data and custom catalog manager singleton
 */
export class MenuDataManager {
  private static instance: MenuDataManager | undefined = undefined;
  
  private menuDataMap: Map<string, unknown>;
  private CustomCatalogManagerMap: Map<string, unknown>;
  private needRecoverMap: Map<string, boolean>;

  private constructor() {
    this.menuDataMap = new Map();
    this.CustomCatalogManagerMap = new Map();
    this.needRecoverMap = new Map();
  }

  /**
   * Get singleton instance
   */
  static getInstance(): MenuDataManager {
    if (!this.instance) {
      this.instance = new MenuDataManager();
    }
    return this.instance;
  }

  /**
   * Set menu data for a specific key
   */
  setMenuData(key: string, data: unknown): void {
    this.menuDataMap.set(key, data);
  }

  /**
   * Get menu data by key
   */
  getMenuData(key: string): unknown {
    return this.menuDataMap.get(key);
  }

  /**
   * Set custom catalog manager for a specific key
   */
  setCustomManager(key: string, manager: unknown): void {
    this.CustomCatalogManagerMap.set(key, manager);
  }

  /**
   * Get custom catalog manager by key
   */
  getCustomManager(key: string): unknown {
    return this.CustomCatalogManagerMap.get(key);
  }

  /**
   * Mark if recovery is needed for a specific key
   */
  needRecover(key: string, value: boolean): void {
    this.needRecoverMap.set(key, value);
  }

  /**
   * Check if recovery is needed for a specific key
   */
  getNeedRecover(key: string): boolean | undefined {
    return this.needRecoverMap.get(key);
  }
}

export default MenuDataManager;