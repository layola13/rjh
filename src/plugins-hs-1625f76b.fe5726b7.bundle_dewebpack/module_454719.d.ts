/**
 * 状态栏插件基类
 * 负责管理状态栏的各种控制项，包括视图模式、单位设置、渲染模式等
 */
declare module 'module_454719' {
  import type { SignalHook } from 'HSCore.Util';
  import type { Application, Environment } from 'HSApp.App';
  import type { Canvas2D } from 'HSApp.Canvas';

  /**
   * 属性栏控制类型枚举
   */
  export enum PropertyBarControlTypeEnum {
    /** 下拉列表 */
    dropDownList = 'dropDownList',
    /** 图片按钮 */
    imageButton = 'imageButton',
    /** 图标按钮 */
    imgbtn = 'imgbtn',
    /** 分割线 */
    divider = 'divider',
    /** 空白占位 */
    space = 'space'
  }

  /**
   * 状态栏项类型枚举
   */
  export enum StatusBarItemTypeEnum {
    /** 材质下拉列表 */
    MaterialDropdownList = 'MaterialDropdownList',
    /** 垂直分割线 */
    Vdivider = 'Vdivider',
    /** 底图设置 */
    UnderlayimgSetting = 'UnderlayimgSetting',
    /** 缩放视图 */
    ZoomView = 'ZoomView',
    /** 图片按钮 */
    ImageButton = 'ImageButton'
  }

  /**
   * 长度单位类型
   */
  export enum LengthUnitTypeEnum {
    meter = 'meter',
    centimeter = 'centimeter',
    millimeter = 'millimeter',
    inch = 'inch'
  }

  /**
   * 渲染模式枚举
   */
  export enum RenderingMode {
    /** 材质模式 */
    Shading = 'Shading',
    /** 材质+线框模式 */
    ShadingWithEdges = 'ShadingWithEdges',
    /** 仅线框模式 */
    EdgesOnly = 'EdgesOnly',
    /** 线框+透明模式 */
    Wireframe = 'Wireframe'
  }

  /**
   * 下拉列表选项
   */
  export interface DropdownOption {
    /** 选项ID */
    id: string | number;
    /** 显示标签 */
    label: string;
    /** 快捷键（可选） */
    hotKey?: string;
    /** 图标类型（可选） */
    iconType?: string;
    /** 快捷键选项（可选） */
    hotkeyOptions?: {
      description: string;
    };
  }

  /**
   * 单位配置
   */
  export interface UnitConfig {
    /** 小数位数 */
    digits: number;
    /** 是否显示单位字符串 */
    showUnitStr: boolean;
  }

  /**
   * 状态栏项数据
   */
  export interface StatusBarItemData {
    /** 左侧项列表 */
    leftItems: StatusBarItem[];
    /** 右侧项列表 */
    rightItems: StatusBarItem[];
    /** 右侧属性项列表 */
    rightPropertyItems: PropertyBarItem[];
    /** 当前视图 */
    view: any;
    /** 可选配置 */
    option?: {
      refreshStatusBar?: boolean;
    };
  }

  /**
   * 状态栏项
   */
  export interface StatusBarItem {
    /** 项ID */
    id: string;
    /** 项类型 */
    type: StatusBarItemTypeEnum;
    /** 排序顺序 */
    order: number;
    /** 是否禁用（可选） */
    disable?: boolean;
    /** 项数据 */
    data?: Record<string, any>;
  }

  /**
   * 属性栏项
   */
  export interface PropertyBarItem {
    /** 项ID */
    id: string;
    /** 标签 */
    label: string;
    /** 子项列表 */
    items: PropertyBarControl[];
  }

  /**
   * 属性栏控制
   */
  export interface PropertyBarControl {
    /** 控件ID */
    id: string;
    /** 控件类型 */
    type: PropertyBarControlTypeEnum;
    /** 排序顺序 */
    order: number;
    /** 控件数据 */
    data: Record<string, any>;
  }

  /**
   * 信号事件对象
   */
  export interface SignalEvent<T = any> {
    /** 事件携带的数据 */
    data: T;
  }

  /**
   * 信号API对象接口
   */
  export interface SignalAPIObject {
    /** 填充状态栏信号 */
    signalPopulateStatusBar: any;
    /** 画布变化信号 */
    signalCanvasChanging: any;
    
    /**
     * 更新状态栏项
     * @param items 要更新的项
     */
    update(items: StatusBarItem[]): void;
    
    /**
     * 刷新状态栏
     */
    refresh(): void;
    
    /**
     * 判断是否显示Web端状态栏项
     */
    willShowStatusBarItemsForWeb(): boolean;
  }

  /**
   * 视口盒子
   */
  export interface ViewBox {
    /** 视口宽度 */
    width: number;
    /** 视口高度 */
    height: number;
    /** X坐标 */
    x: number;
    /** Y坐标 */
    y: number;
  }

  /**
   * 状态栏插件默认导出类
   */
  export default class StatusBarPlugin {
    /** 应用实例 */
    private _app: Application;
    
    /** 信号API对象 */
    private _signalAPIObject: SignalAPIObject;
    
    /** 背景设置图片是否激活 */
    private _bgSettingImgIsActive: boolean;
    
    /** 信号钩子 */
    private _signalHook: SignalHook;
    
    /** 旧的渲染模式 */
    private _oldRenderMode?: RenderingMode;
    
    /** 是否记录旧渲染模式 */
    private _recordOldRender: boolean;

    /**
     * 初始化插件
     * @param app 应用实例
     * @param signalAPIObject 信号API对象
     */
    init_(app: Application, signalAPIObject: SignalAPIObject): void;

    /**
     * 反初始化插件，清理资源
     */
    uninit_(): void;

    /**
     * 获取2D画布对象
     * @returns 2D画布实例
     */
    getCanvas2d(): Canvas2D;

    /**
     * 生成单位下拉列表项
     * @returns 单位控制项数组
     */
    generateUnitDropDownItm_(): PropertyBarControl[];

    /**
     * 生成视图模式下拉列表项
     * @returns 视图模式控制项数组
     */
    private _generateViewModeDropDownItm(): PropertyBarControl[];

    /**
     * 记录当前渲染模式
     */
    recordRenderMode(): void;

    /**
     * 移除渲染模式快捷键
     */
    removeRenderModeHotKey(): void;

    /**
     * 生成渲染模式下拉列表项
     * @returns 渲染模式状态栏项数组
     */
    generateRenderModeDropDownItm(): StatusBarItem[];

    /**
     * 生成正交模式控制按钮
     * @returns 正交模式控制项数组
     */
    private _generateOrthoModeControlBtns(): PropertyBarControl[];

    /**
     * 为属性栏生成正交模式控制按钮
     * @returns 正交模式属性栏控制项数组
     */
    private _generateOrthoModeControlBtnsForPropertyBar(): PropertyBarControl[];

    /**
     * 生成背景设置按钮
     * @returns 背景设置状态栏项数组
     */
    private _generateBackgroundSettingBtns(): StatusBarItem[];

    /**
     * 生成SVG视图控制按钮
     * @returns SVG视图控制项数组
     */
    private _generateSVGViewControlBtns(): Array<PropertyBarControl | StatusBarItem>;

    /**
     * 获取相机可见性控制项
     * @returns 相机可见性状态栏项
     */
    private _getCameraVisibleItem(): StatusBarItem;

    /**
     * 根据视图获取左侧项
     * @param view 当前视图
     * @returns 左侧状态栏项数组
     */
    private _getLeftItemsBasedOnView(view: any): StatusBarItem[];

    /**
     * 根据视图获取属性栏项
     * @param view 当前视图
     * @returns 属性栏项
     */
    private _getPropertyBarItemsBasedOnView(view: any): PropertyBarItem;

    /**
     * 根据视图获取右侧项
     * @param view 当前视图
     * @returns 右侧状态栏项数组
     */
    private _getRightItemsBasedOnView(view: any): StatusBarItem[];

    /**
     * 背景设置弹窗逻辑
     */
    private _bgSettingPopup(): void;

    /**
     * 填充状态栏事件处理
     * @param event 信号事件
     */
    private _onPopulateStatusBar(event: SignalEvent<StatusBarItemData>): void;

    /**
     * 设计元数据变化事件处理
     * @param event 信号事件
     */
    private _onDesignMetaChanged(event: SignalEvent<{ viewMode?: any }>): void;

    /**
     * 文档打开事件处理
     * @param event 信号事件
     */
    private _onDocumentOpened(event: SignalEvent): void;

    /**
     * 生成单位下拉列表项（内部方法）
     * @returns 单位控制项数组
     */
    private _generateUnitDropDownItm(): PropertyBarControl[];
  }
}