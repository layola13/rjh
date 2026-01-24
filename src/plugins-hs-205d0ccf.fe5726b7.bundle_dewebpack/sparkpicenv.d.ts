/**
 * SparkPic 环境模块
 * 提供沉浸式图片查看模式的环境配置和生命周期管理
 */

import { SparkPicFilter } from './SparkPicFilter';
import { controlWalls } from './WallControl';
import { SPARK_PIC_RESIZE_WIDGET_CLASS_NAME, SPARK_PIC_RESIZE_WIDGET_EXTRA } from './Constants';

/**
 * 插件依赖项接口
 */
interface IPluginDependencies {
  [HSFPConstants.PluginType.LeftMenu]: ILeftMenuPlugin;
  [HSFPConstants.PluginType.Catalog]: ICatalogPlugin;
  [HSFPConstants.PluginType.PropertyBar]: IPropertyBarPlugin;
  [HSFPConstants.PluginType.PageHeader]: IPageHeaderPlugin;
  [HSFPConstants.PluginType.ContextualTools]: IContextualToolsPlugin;
  [HSFPConstants.PluginType.Toolbar]: IToolbarPlugin;
  [HSFPConstants.PluginType.Compass]: ICompassPlugin;
}

/**
 * SparkPicEnv 初始化配置
 */
interface ISparkPicEnvConfig {
  /** 应用实例 */
  app: HSApp.App;
  /** 插件依赖项 */
  dependencies: IPluginDependencies;
}

/**
 * 左侧菜单插件接口
 */
interface ILeftMenuPlugin {
  disableLeftMenu(): void;
  enableLeftMenu(): void;
}

/**
 * 目录插件接口
 */
interface ICatalogPlugin {
  toggleCatalog(visible: boolean): void;
}

/**
 * 属性栏插件接口
 */
interface IPropertyBarPlugin {
  hide(): void;
  show(): void;
}

/**
 * 页面头部插件接口
 */
interface IPageHeaderPlugin {
  hide(): void;
  show(): void;
}

/**
 * 上下文工具插件接口
 */
interface IContextualToolsPlugin {
  hideStatusBar(): void;
  showStatusBar(): void;
}

/**
 * 工具栏插件接口
 */
interface IToolbarPlugin {
  addLinkedToolbar(name: string, mode: string, config: IToolbarConfig): void;
  activateToolbar(name: string): void;
  hide(): void;
  show(): void;
}

/**
 * 工具栏配置接口
 */
interface IToolbarConfig {
  addItems: unknown[];
  includeItems: unknown[];
}

/**
 * 指南针插件接口
 */
interface ICompassPlugin {
  hide(): void;
  show(): void;
  setAutoShowHide(enabled: boolean): void;
}

/**
 * 引导插件接口
 */
interface IGuidePlugin {
  showGuide(): boolean;
}

/**
 * 选择过滤器接口
 */
interface ISelectionFilter {
  // 过滤器具体实现
}

/**
 * 选择管理器接口
 */
interface ISelectionManager {
  unselectAll(): void;
  getCurrentFilter(): ISelectionFilter | undefined;
  activateFilter(filter: ISelectionFilter): void;
}

/**
 * SparkPic 环境类
 * 继承自通用环境，提供沉浸式图片查看的专用环境
 */
export class SparkPicEnv extends HSApp.Environment.CommonEnvironment {
  /** 目录插件实例 */
  private _catalogPlugin: ICatalogPlugin;
  
  /** 左侧菜单插件实例 */
  private _menuPlugin: ILeftMenuPlugin;
  
  /** 页面头部插件实例 */
  private _pageHeaderPlugin: IPageHeaderPlugin;
  
  /** 上下文工具插件实例 */
  private _contextualToolsPlugin?: IContextualToolsPlugin;
  
  /** 属性栏插件实例 */
  private _propertyBarPlugin?: IPropertyBarPlugin;
  
  /** 工具栏插件实例 */
  private _toolbarPlugin: IToolbarPlugin;
  
  /** 调整大小控件 DOM 元素 */
  private _resizeWidget?: HTMLElement | null;
  
  /** 指南针插件实例 */
  private _compassPlugin: ICompassPlugin;
  
  /** 激活时的选择过滤器 */
  private _activateFilter?: ISelectionFilter;
  
  /** 视图模型缓存 */
  private _viewModel?: HSFPConstants.ViewModeEnum;

  /**
   * 构造 SparkPic 环境实例
   * @param config - 环境配置对象
   */
  constructor(config: ISparkPicEnvConfig) {
    super(config.app);
    
    this._menuPlugin = config.dependencies[HSFPConstants.PluginType.LeftMenu];
    this._catalogPlugin = config.dependencies[HSFPConstants.PluginType.Catalog];
    this._propertyBarPlugin = config.dependencies[HSFPConstants.PluginType.PropertyBar];
    this._pageHeaderPlugin = config.dependencies[HSFPConstants.PluginType.PageHeader];
    this._contextualToolsPlugin = config.dependencies[HSFPConstants.PluginType.ContextualTools];
    this._toolbarPlugin = config.dependencies[HSFPConstants.PluginType.Toolbar];
    this._compassPlugin = config.dependencies[HSFPConstants.PluginType.Compass];
    this._resizeWidget = document.querySelector<HTMLElement>('.resizewidgetcontainer');
  }

  /**
   * 环境激活时的回调
   * 切换到第一人称视角，隐藏UI组件，设置专用过滤器
   * @param args - 激活参数
   */
  onActivate(...args: unknown[]): void {
    // 保存当前视图模式并切换到第一人称
    this._viewModel = this._app.primaryViewMode;
    this._app.switchPrimaryViewMode(HSFPConstants.ViewModeEnum.FirstPerson);

    // 配置选择管理器
    const selectionManager = this._app.selectionManager;
    if (selectionManager && !this._activateFilter) {
      selectionManager.unselectAll();
      this._activateFilter = selectionManager.getCurrentFilter();
      selectionManager.activateFilter(new SparkPicFilter());
    }

    // 控制墙体显示
    controlWalls(this._app, true);

    // 隐藏各类UI组件
    this._catalogPlugin.toggleCatalog(false);
    this._menuPlugin.disableLeftMenu();
    this._contextualToolsPlugin?.hideStatusBar();
    this._propertyBarPlugin?.hide();

    // 处理引导或页面头部
    const guidePlugin = HSApp.App.getApp().pluginManager.getPlugin<IGuidePlugin>(
      HSFPConstants.PluginType.Guide
    );
    if (!guidePlugin?.showGuide()) {
      this._pageHeaderPlugin.hide();
    }

    // 隐藏指南针
    this._compassPlugin.hide();
    this._compassPlugin.setAutoShowHide(false);

    // 激活专用工具栏
    this._activateToolbar();

    // 添加调整大小控件样式
    this._resizeWidget?.classList?.add(SPARK_PIC_RESIZE_WIDGET_CLASS_NAME);
  }

  /**
   * 3D 视图模式变更时的回调
   * 调用父类方法并调整第一人称相机，更新设计元数据
   */
  onViewMode3DChanged(): void {
    super.onViewMode3DChanged();
    
    this._adjustFirstPersonCamera();

    const cameraType = HSApp.Environment.CommonEnvironment.viewMode2CameraType(
      this.viewMode3D
    );
    this._app.designMetadata.set('cameraMode3d', cameraType);
  }

  /**
   * 环境停用时的回调
   * 恢复原视图模式，恢复UI组件显示，清理过滤器
   */
  onDeactivate(): void {
    // 恢复原视图模式
    if (this._viewModel !== undefined) {
      this._app.switchPrimaryViewMode(this._viewModel);
    }

    // 恢复选择过滤器
    const selectionManager = this._app.selectionManager;
    if (selectionManager && this._activateFilter) {
      selectionManager.activateFilter(this._activateFilter);
      this._activateFilter = undefined;
    }

    // 恢复墙体控制
    controlWalls(this._app, false);

    // 恢复UI组件
    this._catalogPlugin.toggleCatalog(true);
    this._menuPlugin.enableLeftMenu();

    if (this._contextualToolsPlugin) {
      this._contextualToolsPlugin.showStatusBar();
      this._app.signalContextualtoolRefresh.dispatch();
    }

    this._propertyBarPlugin?.show();
    this._pageHeaderPlugin.show();
    this._toolbarPlugin.show();

    this._compassPlugin.show();
    this._compassPlugin.setAutoShowHide(true);

    // 移除调整大小控件样式
    this._resizeWidget?.classList?.remove(SPARK_PIC_RESIZE_WIDGET_CLASS_NAME);
    this._resizeWidget?.classList?.remove(SPARK_PIC_RESIZE_WIDGET_EXTRA);
  }

  /**
   * 激活 SparkPic 专用工具栏
   * @private
   */
  private _activateToolbar(): void {
    this._toolbarPlugin.addLinkedToolbar('sparkPicEnv', 'default', {
      addItems: [],
      includeItems: []
    });
    this._toolbarPlugin.activateToolbar('sparkPicEnv');
    this._toolbarPlugin.hide();
  }
}