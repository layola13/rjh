/**
 * 窗帘编辑插件
 * 提供窗帘组件的编辑、材质替换、显示/隐藏等功能
 */
declare module 'module_413811' {
  import { SignalHook } from 'HSCore.Util';
  import { Curtain, CurtainComponentEnum } from 'HSCore.Model';
  import { CommandManager, TransactionManager } from 'HSApp';
  import { PluginType, CommandType, RequestType, Environment, PropertyBarType } from 'HSFPConstants';

  /**
   * 属性栏控件类型枚举
   */
  enum PropertyBarControlTypeEnum {
    /** 分割线 */
    divider = 'divider',
    /** 子分割线 */
    subdivider = 'subdivider',
    /** 链接按钮 */
    linkButton = 'linkButton',
    /** 复选框 */
    checkbox = 'checkbox',
    /** 图片 */
    image = 'image',
    /** 图片按钮 */
    imageButton = 'imageButton',
    /** 按钮 */
    button = 'button'
  }

  /**
   * 复选框状态枚举
   */
  namespace CCheckBox {
    enum StatusEnum {
      /** 选中 */
      checked = 'checked',
      /** 未选中 */
      unchecked = 'unchecked'
    }
  }

  /**
   * 插件集合接口
   */
  interface PluginCollection {
    [PluginType.Toolbar]: ToolbarPlugin;
    [PluginType.ResizeWidgetV2]: ResizeWidgetPlugin;
    [PluginType.Catalog]: CatalogPlugin;
    [PluginType.ContextualTools]: ContextualToolsPlugin;
    [PluginType.PropertyBar]: PropertyBarPlugin;
  }

  /**
   * 工具栏插件接口
   */
  interface ToolbarPlugin {
    hide(animated: boolean): void;
    show(animated: boolean): void;
  }

  /**
   * 调整大小组件插件接口
   */
  interface ResizeWidgetPlugin {
    animateHide(): void;
    animateShow(): void;
  }

  /**
   * 目录插件接口
   */
  interface CatalogPlugin {
    toggleCatalog(visible: boolean): void;
    openIndependentPanel(options: CatalogPanelOptions): void;
    signalIndependentHidden: {
      listen(handler: Function, context: unknown): void;
      unlisten(handler: Function, context: unknown): void;
    };
  }

  /**
   * 目录面板选项
   */
  interface CatalogPanelOptions {
    /** 类别类型 */
    types: string;
    /** 可选过滤器 */
    optionFilters?: FilterOption[];
    /** 场景类型 */
    sceneType: string;
    /** 自定义数据 */
    mydata?: {
      modelSearchFilter?: {
        sceneType: string;
      };
    };
    /** 查询参数 */
    query?: {
      seekId?: string;
      categoryId?: string;
    };
  }

  /**
   * 过滤器选项
   */
  interface FilterOption {
    categoryType: string;
    filters: Record<string, unknown>;
  }

  /**
   * 上下文工具插件接口
   */
  interface ContextualToolsPlugin {
    signalPopulateCommandStatusBar: unknown;
    signalRetiringStatusBar: unknown;
    getStatusBarControlById(id: string): StatusBarControl | undefined;
  }

  /**
   * 状态栏控件接口
   */
  interface StatusBarControl {
    update(options: { asyncParam?: Promise<{ imgSrc: string }>; hidden?: boolean; status?: CCheckBox.StatusEnum }): void;
  }

  /**
   * 属性栏插件接口
   */
  interface PropertyBarPlugin {
    signalPopulatePropertyBar: unknown;
    update(): void;
  }

  /**
   * 应用程序接口
   */
  interface App {
    cmdManager: CommandManager;
    transManager: TransactionManager;
    selectionManager: SelectionManager;
    catalogManager: CatalogManager;
    activeEnvironmentId: string;
    getActive3DView(): View3D;
  }

  /**
   * 选择管理器接口
   */
  interface SelectionManager {
    selected(includeChildren: boolean): SelectedEntity[];
    unselectAll(): void;
    select(entity: Curtain): void;
  }

  /**
   * 选中实体接口
   */
  interface SelectedEntity {
    entity: unknown;
  }

  /**
   * 目录管理器接口
   */
  interface CatalogManager {
    getProductBySeekId(seekId: string): Promise<Product>;
  }

  /**
   * 产品信息接口
   */
  interface Product {
    thumbnail: string;
    categories?: string[];
  }

  /**
   * 3D视图接口
   */
  interface View3D {
    setOptions(options: { hideCameraMovementIndicators: boolean }): void;
  }

  /**
   * 材质元数据接口
   */
  interface MaterialMetadata {
    seekId: string;
    [key: string]: unknown;
  }

  /**
   * 材质接口
   */
  interface Material {
    seekId: string;
    metadata: MaterialMetadata;
  }

  /**
   * 属性栏项配置
   */
  interface PropertyBarItem {
    id: string;
    parentId?: string;
    label?: string;
    type: PropertyBarType;
    items?: PropertyBarItem[];
    order?: number;
    className?: string;
    status?: CCheckBox.StatusEnum;
    onStatusChange?: (enabled: boolean) => void;
    disableClose?: boolean;
    data?: PropertyBarItemData;
  }

  /**
   * 属性栏项数据
   */
  interface PropertyBarItemData {
    meta?: MaterialMetadata | null;
    asyncParam?: Promise<{ imgSrc: string }>;
    onClick?: () => void;
  }

  /**
   * 状态栏菜单项配置
   */
  interface StatusBarMenuItem {
    id?: string;
    type: PropertyBarControlTypeEnum;
    data?: StatusBarMenuItemData;
  }

  /**
   * 状态栏菜单项数据
   */
  interface StatusBarMenuItemData {
    text?: string;
    onclick?: (event: Event) => void;
    status?: CCheckBox.StatusEnum;
    disabled?: boolean;
    tooltip?: string;
    src?: string;
    asyncParam?: Promise<{ imgSrc: string }>;
    hidden?: boolean;
    primary?: string;
  }

  /**
   * 填充命令状态栏事件数据
   */
  interface PopulateCommandStatusBarEventData {
    cmd: unknown;
    menuItems: {
      xInsertCollection(index: number, items: StatusBarMenuItem[]): void;
    };
  }

  /**
   * 填充属性栏事件数据
   */
  interface PopulatePropertyBarEventData {
    data: {
      xInsertCollection(index: number, items: PropertyBarItem[]): void;
    };
  }

  /**
   * 信号事件接口
   */
  interface SignalEvent<T = unknown> {
    data: T;
    target?: unknown;
  }

  /**
   * 图片URI映射
   */
  interface ImageURIMap {
    editCurtain: string;
    curtain_screen: string;
    curtain_loop: string;
    curtain_side: string;
    curtain_rail: string;
  }

  /**
   * 窗帘编辑插件类
   */
  export default class CurtainEditorPlugin {
    /** 应用程序实例 */
    private _app: App;
    
    /** 命令管理器 */
    private _cmdMgr: CommandManager;
    
    /** 事务管理器 */
    private _transMgr: TransactionManager;
    
    /** 信号钩子 */
    private _signalHook: SignalHook;
    
    /** 窗帘信号钩子 */
    private _curtainSignalHook: SignalHook;
    
    /** 工具栏插件 */
    private _toolbarPlugin: ToolbarPlugin;
    
    /** 调整大小组件插件 */
    private _resizeWidgetPlugin: ResizeWidgetPlugin;
    
    /** 目录插件 */
    private _catalogPlugin: CatalogPlugin;
    
    /** 上下文工具插件 */
    private _contextualToolsPlugin: ContextualToolsPlugin;
    
    /** 属性栏插件V2 */
    propertyBarPluginV2: PropertyBarPlugin;
    
    /** 材质无图片URL */
    private _materialNoneImgUrl: string;
    
    /** 图片URI映射 */
    private _imageURI: ImageURIMap;
    
    /** 当前编辑的窗帘实体 */
    entity?: Curtain;

    /**
     * 初始化插件
     * @param app - 应用程序实例
     * @param plugins - 插件集合
     */
    init(app: App, plugins: PluginCollection): void;

    /**
     * 卸载插件，清理所有监听器
     */
    uninit(): void;

    /**
     * 刷新属性栏
     */
    private _refreshPopulatePropertyBar(): void;

    /**
     * 填充属性栏V2回调
     * @param event - 事件对象
     */
    private _onPopulatePropertyBarV2(event: SignalEvent<PopulatePropertyBarEventData>): void;

    /**
     * 构建属性栏V2项
     * @param curtain - 窗帘实体
     * @returns 属性栏项数组
     */
    private _populatePropertyBarV2Items(curtain: Curtain): PropertyBarItem[];

    /**
     * 命令开始显示回调（用于Gizmo显示）
     * @param event - 命令事件
     */
    private _beginShowCommandDisplay(event: SignalEvent<{ cmd: unknown }>): void;

    /**
     * 命令结束显示回调（用于Gizmo隐藏）
     * @param event - 命令事件
     */
    private _endShowCommandDisplay(event: SignalEvent<{ cmd: unknown }>): void;

    /**
     * 属性栏命令开始显示回调
     * @param event - 命令事件
     */
    private _beginShowCommandDisplayForPropertyBar(event: SignalEvent<{ cmd: unknown }>): void;

    /**
     * 属性栏命令结束显示回调
     * @param event - 命令事件
     */
    private _endShowCommandDisplayForPropertyBar(event: SignalEvent<{ cmd: unknown }>): void;

    /**
     * 状态栏退出回调
     */
    private _onRetiringStatusBar(): void;

    /**
     * 填充命令状态栏回调
     * @param event - 事件对象
     */
    private _onPopulateCommandStatusBar(event: SignalEvent<PopulateCommandStatusBarEventData>): void;

    /**
     * 构建命令状态栏项
     * @param curtain - 窗帘实体
     * @returns 状态栏菜单项数组
     */
    private _populateCommandStatusBarItems(curtain: Curtain): StatusBarMenuItem[];

    /**
     * 获取组件标签文本
     * @param component - 窗帘组件枚举
     * @returns 本地化标签文本
     */
    private _getComponentLabelText(component: CurtainComponentEnum): string;

    /**
     * 获取组件材质元数据
     * @param curtain - 窗帘实体
     * @param component - 窗帘组件枚举
     * @returns 材质元数据或null
     */
    private _getComponentMaterialMeta(curtain: Curtain, component: CurtainComponentEnum): MaterialMetadata | null;

    /**
     * 获取组件材质缩略图
     * @param curtain - 窗帘实体
     * @param component - 窗帘组件枚举
     * @returns 包含图片源的Promise
     */
    private _getComponentMaterialThumbnail(curtain: Curtain, component: CurtainComponentEnum): Promise<{ imgSrc: string }>;

    /**
     * 编辑材质点击回调（命令状态栏）
     * @param component - 窗帘组件枚举
     */
    private _onEditMaterialClilcked(component: CurtainComponentEnum): void;

    /**
     * 编辑材质点击回调（属性栏）
     * @param component - 窗帘组件枚举
     */
    private _onEditMaterialClilckedForPropertyBar(component: CurtainComponentEnum): void;

    /**
     * 独立面板隐藏回调
     * @param event - 事件对象
     */
    private _onIndependentHidden(event: SignalEvent<{ keepOpening?: boolean }>): void;

    /**
     * 窗帘材质变更回调
     * @param event - 事件对象
     */
    private _onCurtainMaterialChanged(event: SignalEvent<{ component: CurtainComponentEnum }>): void;

    /**
     * 刷新状态栏回调
     * @param event - 事件对象
     */
    private _onRefreshBar(event: SignalEvent): void;

    /**
     * 组件禁用回调
     * @param event - 事件对象
     */
    private _onComponentDisabled(event: SignalEvent<{ component: CurtainComponentEnum }>): void;

    /**
     * 组件启用回调
     * @param event - 事件对象
     */
    private _onComponentEnabled(event: SignalEvent<{ component: CurtainComponentEnum }>): void;
  }
}