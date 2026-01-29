interface MenuDataItem {
  disable?: boolean;
  [key: string]: unknown;
}

interface CustomManager {
  eventsManager?: unknown;
  dataManager?: unknown;
}

interface CatalogStatusState {
  isShow: boolean;
  toggleStatus: boolean;
}

interface PositionConfig {
  x: number;
  y: number;
}

interface LayoutPosition {
  isShow: boolean;
  left?: number;
  top?: number;
  width?: number;
  height?: number;
}

interface CategoryConfig {
  categoryId: string;
  menuId: string;
  custAttr?: string;
  refreshNum?: number;
  [key: string]: unknown;
}

interface ToggleInstance {
  expandSideBar(show: boolean): void;
  removeSideBar(): void;
  recoverSideBar(): void;
  changeTop(top: number): void;
}

interface DataHandler {
  setMenuData(env: string, data: MenuDataItem[]): void;
  getMenuData(env: string): MenuDataItem[] | undefined;
  setCustomManager(env: string, managers: unknown[]): void;
  getCustomManager(env: string): unknown[] | undefined;
  needRecover(env: string, flag: boolean): void;
  getNeedRecover(env: string): boolean;
}

interface BaseApiManager {
  eventsManager: unknown;
  dataManager: unknown;
  getGoodsConfig(): unknown;
  setCustomEventsManager(manager: unknown): void;
  setCustomDataManager(manager: unknown): void;
  getLayoutMgrClass(): string;
  setIndependentPanelInitialPos(pos: PositionConfig): void;
  isIndependentMode(mode: boolean): void;
  closeIndependentPanel(): void;
  setSubmenuItemsLimit(limit: number): void;
  registerComOnListPageHeader(key: string, component: unknown): void;
  unregisterComOnListPageHeader(key: string): void;
  setSearchMode(mode: string): void;
  getSearchMode(): string;
}

interface EventTrackManager {
  signalCatalogToUserTrackLogger?(data: {
    activeSection: string;
    activeSectionName: string;
    description: string;
    clicksRatio: { id: string; name: string };
    actionType: string;
  }): void;
}

interface CatalogSignalManager {
  signalShowCatalog: { listen(callback: (data: { data: Partial<CatalogStatusState> }) => void): void };
  signalExpandCatalog: { dispatch(data: { position: LayoutPosition }): void };
  signalPageNumChange: unknown;
}

interface CatalogLibManager {
  Manager: {
    init(baseApi: BaseApiManager, eventTrack: EventTrackManager): void;
    setAppConfig(config: unknown, user: unknown, locale: string): void;
    registerPageMap(env: string, pageMap: unknown): void;
    registerInternalPageMap(env: string, pageMap: unknown): void;
    registerCategoryConfig(key: string, config: unknown): void;
    getDefaultProductPage(category: string): unknown;
    getDefaultPage(env: string, category: string): unknown;
    registerProductItem(env: string, item: unknown): void;
    showCatalog(menu: MenuDataItem[], container: HTMLElement, env: string, options?: unknown): void;
    hideCatalog(container: HTMLElement): void;
    needRecover(flag: boolean): void;
    showIndependentPanel(menu: MenuDataItem[], container: HTMLElement, extra: unknown[], option1?: unknown, option2?: unknown): void;
    showEnginePMPanel(param1: unknown, param2: unknown, param3: unknown): void;
    closeIndependentPanel(container: HTMLElement | null): void;
    signalToCatalog(signal: string, data: unknown): void;
    showPageByCategoryId(config: CategoryConfig): void;
    getMenuData(): MenuDataItem[];
    setEditModel(model: string): void;
    enableExpandModel(enable: boolean, immediate?: boolean): void;
    curExpandModel?: boolean;
  };
  PageType: unknown;
}

export class Manager {
  private static dataHandler: DataHandler;
  private static envList: string[] = [];
  private static currentEnv: string = (globalThis as any).HSFPConstants?.Environment?.Default ?? 'default';
  private static baseApiManager: BaseApiManager;
  private static eventTrackManager: EventTrackManager;
  private static rootContainer?: HTMLElement;
  private static toggleIns?: ToggleInstance;
  private static signalHook: any;
  private static catalogPageContainer?: HTMLElement;
  private static resizeObserver?: ResizeObserver;
  private static catalogStatus: CatalogStatusState = {
    isShow: true,
    toggleStatus: true
  };
  private static refreshNum: number = 0;
  private static catalogSignalManager: CatalogSignalManager;

  static init(): void {
    const HSApp = (globalThis as any).HSApp;
    const HSCore = (globalThis as any).HSCore;
    const DataHandlerInstance = (globalThis as any).DataHandlerInstance;
    const CatalogLib = (globalThis as any).CatalogLib;

    this.dataHandler = DataHandlerInstance.getInstance();
    this.baseApiManager = HSApp.Catalog.BaseApiManager.getInstance();
    this.eventTrackManager = HSApp.Catalog.EventTrackManager.getInstance();
    this.catalogSignalManager = HSApp.Catalog.CatalogSignalManager.getInstance();
    this.getGoodsConfig();
    this.signalHook = new HSCore.Util.SignalHook(this);
    CatalogLib.Manager.init(this.baseApiManager, this.eventTrackManager);
  }

  static getGoodsConfig(): unknown {
    return this.baseApiManager.getGoodsConfig();
  }

  static setAppConfig(): void {
    const HSApp = (globalThis as any).HSApp;
    const adskUser = (globalThis as any).adskUser;
    const CatalogLib = (globalThis as any).CatalogLib;
    const locale = HSApp.App.getApp().appParams.locale;
    CatalogLib.Manager.setAppConfig(HSApp.Config, adskUser, locale);
  }

  static registerEnv(env: string): boolean {
    if (this.currentEnv !== env) {
      this.setIndependentPanelInitialPos();
    }
    this.currentEnv = env;
    if (this.envList.includes(env)) {
      return true;
    }
    this.envList.push(env);
    return false;
  }

  static setMenuData(menuData: MenuDataItem[]): void {
    const filteredData = menuData.filter(item => !item.disable);
    this.dataHandler.setMenuData(this.currentEnv, filteredData);
  }

  static getMenuData(env: string): void {
    this.dataHandler.getMenuData(env);
  }

  static setCustomManager(
    eventsManager: unknown = this.baseApiManager.eventsManager,
    dataManager: unknown = this.baseApiManager.dataManager
  ): void {
    if (!this.dataHandler.getCustomManager(this.currentEnv)) {
      this.dataHandler.setCustomManager(this.currentEnv, [eventsManager, dataManager]);
    }
    this.baseApiManager.setCustomEventsManager(eventsManager);
    this.baseApiManager.setCustomDataManager(dataManager);
  }

  static needRecover(flag: boolean): void {
    this.dataHandler.needRecover(this.currentEnv, flag);
  }

  static registerPageMap(pageMap: unknown): void {
    const CatalogLib = (globalThis as any).CatalogLib;
    CatalogLib.Manager.registerPageMap(this.currentEnv, pageMap);
  }

  static registerInternalPageMap(pageMap: unknown): void {
    const CatalogLib = (globalThis as any).CatalogLib;
    CatalogLib.Manager.registerInternalPageMap(this.currentEnv, pageMap);
  }

  static registerCategoryConfig(key: string, config: unknown): void {
    const CatalogLib = (globalThis as any).CatalogLib;
    CatalogLib.Manager.registerCategoryConfig(key, config);
  }

  static getDefaultProductPage(category: string): unknown {
    const CatalogLib = (globalThis as any).CatalogLib;
    return CatalogLib.Manager.getDefaultProductPage(category);
  }

  static getDefaultPage(env: string, category: string): unknown {
    const CatalogLib = (globalThis as any).CatalogLib;
    return CatalogLib.Manager.getDefaultPage(env, category);
  }

  static registerProductItem(item: unknown): void {
    const CatalogLib = (globalThis as any).CatalogLib;
    CatalogLib.Manager.registerProductItem(this.currentEnv, item);
  }

  static showCatalog(container: HTMLElement, options?: unknown): void {
    if (!container) {
      console.warn('show catalog need root dom');
      return;
    }

    this.hideCatalog();
    const currentEnv = this.currentEnv;
    this.rootContainer = container;

    const lodash = (globalThis as any).lodash;
    const CatalogLib = (globalThis as any).CatalogLib;
    const menuData = lodash.cloneDeep(this.dataHandler.getMenuData(currentEnv)) || [];
    const customManagers = this.dataHandler.getCustomManager(currentEnv) || [];

    this.setCustomManager(customManagers[0], customManagers[1]);

    const needRecoverFlag = this.dataHandler.getNeedRecover(currentEnv);
    CatalogLib.Manager.needRecover(needRecoverFlag);
    CatalogLib.Manager.showCatalog(menuData, container, currentEnv, options);

    this.addLayoutManager();
    this.setCatalogPageShow(true);
    this.updateCatalogOnExpend(true);
  }

  private static addLayoutManager(): void {
    const HSApp = (globalThis as any).HSApp;
    const layoutMgrClass = this.baseApiManager.getLayoutMgrClass();
    this.catalogPageContainer = document.querySelector(`.${layoutMgrClass}`) as HTMLElement;

    if (!this.catalogPageContainer) return;

    HSApp.App.getApp().layoutMgr.register('CatalogLib', this.catalogPageContainer, false);

    this.resizeObserver = new ResizeObserver(() => {
      globalThis.requestAnimationFrame(() => {
        this.updateCatalogOnExpend(this.catalogStatus.isShow);
        this.userTrackLogger();
      });
    });

    this.resizeObserver.observe(this.catalogPageContainer);

    this.signalHook.listen(this.catalogSignalManager.signalShowCatalog, (signalData: { data: Partial<CatalogStatusState> }) => {
      Object.assign(this.catalogStatus, signalData.data);
      if (this.catalogStatus.toggleStatus) {
        this.toggleIns?.expandSideBar(this.catalogStatus.isShow);
        this.updateCatalogOnExpend(this.catalogStatus.isShow);
      }
    });
  }

  private static updateCatalogOnExpend(isShow: boolean): void {
    const HSApp = (globalThis as any).HSApp;
    const layoutMgr = HSApp.App.getApp().layoutMgr;

    if (!this.catalogPageContainer) return;

    const rect = this.catalogPageContainer.getBoundingClientRect();
    const menuContainer = document.querySelector('.hsc-menu-container') as HTMLElement;
    let leftOffset = menuContainer?.clientWidth || 60;

    if (!isShow) {
      leftOffset += 16 - rect.width;
    }

    const position: LayoutPosition = { isShow };
    this.catalogStatus.isShow = isShow;

    Object.assign(position, {
      left: leftOffset,
      top: rect.top,
      width: rect.width - 16,
      height: rect.height
    });

    layoutMgr.update('CatalogLib', position);
    this.catalogSignalManager.signalExpandCatalog.dispatch({ position });
  }

  static hideCatalog(): void {
    if (!this.rootContainer) return;

    const CatalogLib = (globalThis as any).CatalogLib;
    CatalogLib.Manager.hideCatalog(this.rootContainer);
    this.toggleIns?.removeSideBar();

    this.signalHook.unlisten(this.catalogSignalManager.signalExpandCatalog);
    this.signalHook.unlisten(this.catalogSignalManager.signalPageNumChange);
    this.signalHook.unlisten(this.catalogSignalManager.signalShowCatalog);

    if (this.catalogPageContainer) {
      this.updateCatalogOnExpend(false);
      this.resizeObserver?.unobserve(this.catalogPageContainer);
    }
  }

  static toggleCatalog(show: boolean): void {
    this.catalogStatus.toggleStatus = show;
    if (this.rootContainer) {
      this.rootContainer.style.display = show ? 'block' : 'none';
    }
    if (show) {
      this.toggleIns?.recoverSideBar();
    } else {
      this.toggleIns?.removeSideBar();
    }
  }

  static setIndependentPanelInitialPos(position: PositionConfig = { x: 8, y: 52 }): void {
    this.baseApiManager.setIndependentPanelInitialPos(position);
  }

  static showIndependentPanel(
    menuData: MenuDataItem[],
    container: HTMLElement,
    extraParams: unknown[] = [],
    option1?: unknown,
    option2?: unknown
  ): void {
    this.baseApiManager.isIndependentMode(true);
    const filteredData = menuData.filter(item => !item.disable);
    const CatalogLib = (globalThis as any).CatalogLib;
    CatalogLib.Manager.showIndependentPanel(filteredData, container, extraParams, option1, option2);
  }

  static showEnginePMPanel(param1: unknown, param2: unknown, param3: unknown): void {
    const CatalogLib = (globalThis as any).CatalogLib;
    CatalogLib.Manager.showEnginePMPanel(param1, param2, param3);
  }

  static closeIndependentPanel(): void {
    const container = document.querySelector('.catalogIndependentContainer') as HTMLElement;
    const CatalogLib = (globalThis as any).CatalogLib;
    CatalogLib.Manager.closeIndependentPanel(container);
    this.baseApiManager.closeIndependentPanel();
  }

  static signalToCatalog(signal: string, data: unknown): void {
    const CatalogLib = (globalThis as any).CatalogLib;
    CatalogLib.Manager.signalToCatalog(signal, data);
  }

  static showPageByCategoryId(config: CategoryConfig): void {
    const CatalogLib = (globalThis as any).CatalogLib;
    CatalogLib.Manager.showPageByCategoryId(config);
  }

  static showSpecialTopic(extraConfig: Partial<CategoryConfig>): void {
    const HSApp = (globalThis as any).HSApp;
    const fullConfig: CategoryConfig = {
      categoryId: '',
      menuId: HSApp.Catalog.DataConfig.MenuIdEnum.modelLibrary,
      custAttr: 'specialTopic',
      ...extraConfig,
      refreshNum: this.refreshNum++
    };
    this.showPageByCategoryId(fullConfig);
  }

  static getPageType(): unknown {
    const CatalogLib = (globalThis as any).CatalogLib;
    return CatalogLib.PageType;
  }

  static getCurrentMenuData(): MenuDataItem[] {
    const CatalogLib = (globalThis as any).CatalogLib;
    return CatalogLib.Manager.getMenuData();
  }

  static setSubmenuItemsLimit(limit: number = 10): void {
    this.baseApiManager.setSubmenuItemsLimit(limit);
  }

  static setCatalogPageShow(isShow: boolean): void {
    this.catalogStatus.isShow = isShow;
    this.toggleIns?.expandSideBar(this.catalogStatus.isShow);
  }

  static changeCatalogSidebarTop(top: number): void {
    this.toggleIns?.changeTop(top);
  }

  static setToggleSideBar(instance: ToggleInstance): void {
    this.toggleIns = instance;
  }

  static registerComOnListPageHeader(key: string, component: unknown): void {
    this.baseApiManager.registerComOnListPageHeader(key, component);
  }

  static unregisterComOnListPageHeader(key: string): void {
    this.baseApiManager.unregisterComOnListPageHeader(key);
  }

  static getHSCatalogLib(): CatalogLibManager {
    return (globalThis as any).CatalogLib;
  }

  static setEditModel(editModel: string): void {
    const HSApp = (globalThis as any).HSApp;
    const CatalogLib = (globalThis as any).CatalogLib;
    
    if (editModel === HSApp.EditStatus.ENUM_EDIT_MODEL.EDIT && !CatalogLib.Manager.curExpandModel) {
      this.enableExpandModel(true);
    }
    CatalogLib.Manager.setEditModel(editModel);
  }

  static enableExpandModel(enable: boolean, immediate: boolean = true): void {
    const CatalogLib = (globalThis as any).CatalogLib;
    CatalogLib.Manager.enableExpandModel(enable, immediate);
  }

  static setSearchMode(mode: string): void {
    const HSApp = (globalThis as any).HSApp;
    const queryParams = HSApp.Util.Url.getQueryStrings();
    if (queryParams.fcdbg === 'true') {
      this.baseApiManager.setSearchMode(mode);
    }
  }

  static getSearchMode(): string {
    return this.baseApiManager.getSearchMode();
  }

  static getCurrentEnv(): string {
    return this.currentEnv;
  }

  private static userTrackLogger(): void {
    this.eventTrackManager.signalCatalogToUserTrackLogger?.({
      activeSection: 'catalogProductList',
      activeSectionName: '目录列表',
      description: '目录-列表扩展',
      clicksRatio: {
        id: 'catalog-infiniteLoader',
        name: 'catalog-infiniteLoader'
      },
      actionType: 'resize.observer'
    });
  }
}