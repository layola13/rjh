// @ts-nocheck
import { IPlugin } from 'HSApp/Plugin';
import { PluginType } from 'HSFPConstants';

interface PluginActivationContext {
  app: any;
  [key: string]: any;
}

interface FavoriteData {
  [key: string]: any;
}

interface TopicData {
  [key: string]: any;
}

interface GroupPanelOptions {
  [key: string]: any;
}

interface FavoriteItem {
  id: string;
  [key: string]: any;
}

interface TopicMoveData {
  [key: string]: any;
}

interface MerchantFavData {
  [key: string]: any;
}

class FavoriteHandler {
  favContainer: any;
  favTopicContainer: any;
  favGroupContainer: any;
  favoritesData: FavoriteData;
  favoritesTopicData: TopicData;
  customFavData: any;
  allMerchantFavIds: Set<string> | string[];

  init(config: { app: any; dependencies: any[] }): void {}
  cleanup(): void {}
  showPopupGroupPanel(arg1: any, arg2: any, arg3: any, arg4: any): any {}
  getFavoritesByUser(): any {}
  getFavoriteIds(): string[] {}
  getFavoriteTopicIds(): string[] {}
  getStore(): any {}
  addFavorite(id: string, arg2: any, arg3: any, arg4: any): Promise<any> {}
  removeFavorite(id: string): Promise<any> {}
  updateFavorite(item: FavoriteItem): Promise<any> {}
  topicFavBatchMove(data: TopicMoveData): Promise<any> {}
  addFavoritesTopic(topic: any): Promise<any> {}
  deleteFavoritesTopic(topicId: string): Promise<any> {}
  getGroupPanel(): any {}
  getGroupListPanel(): any {}
  changeTemplateFavoriteStatus(templateId: string): any {}
  getTemplateFavoriteId(templateId: string): string | null {}
  initMerchantFavIds(): Promise<any> {}
  handleMerchantFav(merchantId: string, action: any, data: any): Promise<any> {}
  setCustomFavData(data: any): void {}
  requestAllGroupItems(groupId: string): any {}
  uploaderModelWithMaterial(data: any): void {}
}

class FavoriteSignals {
  static signalHiddenGroupPanel: any;
  static requestAllGroupItems(groupId: string): any {}
}

class FavoritePlugin extends IPlugin {
  private _handler: FavoriteHandler;

  constructor() {
    super({
      name: 'Favorite plugin',
      description: 'provide favorite component for floorplan',
      dependencies: ['hsw.plugin.signin.Plugin']
    });
    this._handler = new FavoriteHandler();
  }

  onActive(context: PluginActivationContext, dependencies: any[]): void {
    super.onActive?.(context);
    this._handler.init({
      app: context.app,
      dependencies
    });
  }

  onDeactive(): void {
    this._handler.cleanup();
  }

  showPopupGroupPanel(arg1: any, arg2: any, arg3: any, arg4: any): any {
    return this._handler.showPopupGroupPanel(arg1, arg2, arg3, arg4);
  }

  getUserFavorites(): any {
    return this._handler.getFavoritesByUser();
  }

  getFavoritesData(): FavoriteData {
    return this._handler.favoritesData;
  }

  getFavoritesTopicData(): TopicData {
    return this._handler.favoritesTopicData;
  }

  getFavoriteIds(): string[] {
    return this._handler.getFavoriteIds();
  }

  getFavoriteTopicIds(): string[] {
    return this._handler.getFavoriteTopicIds();
  }

  getStore(): any {
    return this._handler.getStore();
  }

  addFavorite(id: string, arg2: any, arg3: any, arg4: any): Promise<any> {
    return this._handler.addFavorite(id, arg2, arg3, arg4);
  }

  removeFavorite(id: string): Promise<any> {
    return this._handler.removeFavorite(id);
  }

  updateFavorite(item: FavoriteItem): Promise<any> {
    return this._handler.updateFavorite(item);
  }

  topicFavBatchMove(data: TopicMoveData): Promise<any> {
    return this._handler.topicFavBatchMove(data);
  }

  addFavoritesTopic(topic: any): Promise<any> {
    return this._handler.addFavoritesTopic(topic);
  }

  deleteFavoritesTopic(topicId: string): Promise<any> {
    return this._handler.deleteFavoritesTopic(topicId);
  }

  hiddenGroupPanelSinal(): any {
    return FavoriteSignals.signalHiddenGroupPanel;
  }

  getCurrentSelectedItem(groupId: string): any {
    return FavoriteSignals.requestAllGroupItems(groupId);
  }

  getGroupPanel(): any {
    return this._handler.getGroupPanel();
  }

  get favContainer(): any {
    return this._handler.favContainer;
  }

  get favTopicContainer(): any {
    return this._handler.favTopicContainer;
  }

  get favGroupContainer(): any {
    return this._handler.favGroupContainer;
  }

  getGroupListPanel(): any {
    return this._handler.getGroupListPanel();
  }

  changeTemplateFavoriteStatus(templateId: string): any {
    return this._handler.changeTemplateFavoriteStatus(templateId);
  }

  getTemplateFavoriteId(templateId: string): string | null {
    return this._handler.getTemplateFavoriteId(templateId);
  }

  initMerchantFavIds(): Promise<any> {
    return this._handler.initMerchantFavIds();
  }

  handleMerchantFav(merchantId: string, action: any, data: any): Promise<any> {
    return this._handler.handleMerchantFav(merchantId, action, data);
  }

  getAllMerchantFavIds(): Set<string> | string[] {
    return this._handler.allMerchantFavIds;
  }

  setCustomFavData(data: any): void {
    this._handler.setCustomFavData(data);
  }

  getCustomFavData(): any {
    return this._handler.customFavData;
  }

  requestAllGroupItems(groupId: string): any {
    return this._handler.requestAllGroupItems(groupId);
  }

  uploaderModelWithMaterial(data: any): void {
    this._handler.uploaderModelWithMaterial(data);
  }
}

HSApp.Plugin.registerPlugin(PluginType.Favorite, FavoritePlugin);