/**
 * 面（Face）相关的属性栏配置模块
 * 提供面对象在属性栏中的操作项配置
 */

/**
 * 属性栏控件类型枚举
 */
declare enum PropertyBarControlTypeEnum {
  imageButton = "imageButton"
}

/**
 * 视图模式枚举
 */
declare enum ViewModeEnum {
  Plane = "Plane",
  Elevation = "Elevation"
}

/**
 * 属性栏按钮项配置
 */
interface PropertyBarItem {
  /** 按钮唯一标识 */
  id: string;
  /** 控件类型 */
  type: PropertyBarControlTypeEnum;
  /** 排序顺序 */
  order: number;
  /** 图标资源路径 */
  src: string;
  /** 是否禁用 */
  disable?: boolean;
  /** 按钮显示文本 */
  label: string;
  /** 点击事件处理函数 */
  onClick: (event?: Event) => void;
}

/**
 * 获取属性栏项的参数
 */
interface GetItemsParams {
  /** 选中的实体列表 */
  entities: HSCore.Model.Entity[];
  /** 是否为3D视图 */
  is3D: boolean;
  /** 应用实例 */
  app: HSApp.App;
}

/**
 * 判断应用条件的参数
 */
interface IsAppliedParams {
  /** 实体列表 */
  entities: HSCore.Model.Entity[];
}

/**
 * 面（Face）配置接口
 */
interface FaceConfig {
  /** 配置名称 */
  name: string;

  /**
   * 判断该配置是否应用于给定的实体列表
   * @param entities - 待检查的实体数组
   * @returns 如果实体中包含Face类型则返回true
   */
  isApplied(entities: HSCore.Model.Entity[]): boolean;

  /**
   * 获取属性栏控件项列表
   * @param params - 包含实体、视图状态和应用实例的参数对象
   * @returns 属性栏控件项数组
   */
  getItems(params: GetItemsParams): PropertyBarItem[];
}

/**
 * HSCore 命名空间 - 核心模型类型
 */
declare namespace HSCore.Model {
  /** 实体基类 */
  class Entity {}

  /** 面实体 */
  class Face extends Entity {
    /**
     * 获取面的主对象（墙体、柱子等）
     */
    getMaster(): Entity | null;

    /**
     * 获取唯一父级对象
     */
    getUniqueParent(): Entity | null;

    /** 扩展选项 */
    extOption?: string;

    /** 父级对象 */
    parent?: Entity;
  }

  /** 楼层实体 */
  class Floor extends Face {}

  /** 天花板实体 */
  class Ceiling extends Face {}

  /** 墙体实体 */
  class Wall extends Entity {
    /**
     * 判断是否为弧形墙
     */
    isArcWall(): boolean;
  }

  /** 图层实体 */
  class Layer extends Entity {
    /** 下一个图层 */
    next?: Layer;
  }

  /** 自定义方形柱子 */
  class NCustomizedSquareColumn extends Entity {}

  /** 自定义烟道 */
  class NCustomizedFlue extends Entity {}

  /** 自定义立管 */
  class NCustomizedRiser extends Entity {}

  /** 相机类型枚举 */
  enum CameraTypeEnum {
    OrthView = "OrthView"
  }

  /** 相机对象 */
  interface Camera {
    type: CameraTypeEnum;
  }
}

/**
 * HSCore 材质管理命名空间
 */
declare namespace HSCore.Material {
  /**
   * 材质元数据
   */
  interface MetaData {
    /** 是否为用户自定义产品 */
    isUserProduct: boolean;
  }

  /**
   * 材质管理器（单例）
   */
  class Manager {
    /**
     * 获取材质管理器单例
     */
    static instance(): Manager;

    /**
     * 根据seekId获取材质元数据
     * @param seekId - 材质查找ID
     */
    getMetaData(seekId?: string): MetaData | null;
  }
}

/**
 * HSApp 应用命名空间
 */
declare namespace HSApp {
  /**
   * 应用主类
   */
  class App {
    /** 命令管理器 */
    cmdManager: CmdManager;
    /** 选择管理器 */
    selectionManager: SelectionManager;
    /** 插件管理器 */
    pluginManager: PluginManager;
    /** 环境管理器 */
    environmentManager: EnvironmentManager;
    /** 平面图对象 */
    floorplan: Floorplan;
    /** 应用设置 */
    appSettings: AppSettings;
    /** 2D视图模式 */
    viewMode2D: ViewModeEnum;

    /**
     * 获取应用单例
     */
    static getApp(): App;

    /**
     * 判断是否在3D视图激活状态
     */
    is3DViewActive(): boolean;

    /**
     * 判断是否处于默认环境
     */
    isUnderDefaultEnvironment(): boolean;

    /**
     * 切换主视图模式
     * @param mode - 视图模式
     * @param options - 切换选项
     */
    switchPrimaryViewMode(mode: ViewModeEnum, options: Record<string, unknown>): void;
  }

  /**
   * 应用设置
   */
  interface AppSettings {
    /** SVG颜色模型 */
    svgColorModel: number;
  }

  /**
   * 平面图对象
   */
  interface Floorplan {
    /** 当前激活的相机 */
    active_camera: HSCore.Model.Camera | null;
    /** 场景对象 */
    scene: Scene;
  }

  /**
   * 场景对象
   */
  interface Scene {
    /** 室外图层 */
    outdoorLayer: HSCore.Model.Layer;
  }

  /**
   * 命令对象
   */
  interface Command {
    /** 命令类型 */
    type: string;
  }

  /**
   * 命令管理器
   */
  interface CmdManager {
    /** 当前命令 */
    current: Command | null;

    /**
     * 创建命令
     * @param type - 命令类型
     * @param params - 命令参数
     */
    createCommand(type: string, params: unknown[]): Command;

    /**
     * 执行命令
     * @param command - 待执行的命令
     */
    execute(command: Command): void;

    /**
     * 完成命令
     * @param command - 待完成的命令
     */
    complete(command: Command): void;
  }

  /**
   * 选择管理器
   */
  interface SelectionManager {
    /**
     * 获取选中的对象
     * @param includeChildren - 是否包含子对象
     */
    selected(includeChildren: boolean): HSCore.Model.Entity[];

    /**
     * 取消所有选择
     */
    unselectAll(): void;
  }

  /**
   * 插件接口
   */
  interface Plugin {
    /** 插件处理器 */
    handler?: unknown;
    
    /**
     * 从网格中吸取材质
     */
    suckMaterialFromMesh?(mesh: HSCore.Model.Entity): MaterialResult;

    /**
     * 判断是否可以删除室外面
     */
    couldDeleteOutdoorFace?(face: HSCore.Model.Floor): boolean;

    /**
     * 进入室外绘制模式
     */
    enterOutdoorDrawing?(): void;
  }

  /**
   * 材质结果
   */
  interface MaterialResult {
    materialData?: MaterialData;
  }

  /**
   * 材质数据
   */
  interface MaterialData {
    /** 材质查找ID */
    seekId?: string;
    /** 分类ID */
    categoryId?: string;
  }

  /**
   * 插件管理器
   */
  interface PluginManager {
    /**
     * 获取插件实例
     * @param pluginType - 插件类型
     */
    getPlugin(pluginType: string): Plugin;
  }

  /**
   * 环境管理器
   */
  interface EnvironmentManager {
    /** 当前激活的环境ID */
    activeEnvironmentId: string;
  }

  /**
   * 工具类命名空间
   */
  namespace Util {
    /**
     * 面工具类
     */
    namespace Face {
      /**
       * 判断实体列表是否属于同一面组
       */
      function isSameFaceGroup(entities: HSCore.Model.Entity[]): boolean;

      /**
       * 获取有效选中的墙面
       */
      function getValidSelectedWallFace(): HSCore.Model.Face | null;

      /**
       * 判断面是否为面组
       */
      function isFaceGroup(face: HSCore.Model.Face): boolean;
    }

    /**
     * 事件追踪枚举
     */
    enum EventGroupEnum {
      Rightmenu = "Rightmenu",
      Outdoor = "Outdoor"
    }

    /**
     * 事件追踪类（单例）
     */
    class EventTrack {
      /**
       * 获取事件追踪单例
       */
      static instance(): EventTrack;

      /**
       * 追踪事件
       * @param group - 事件组
       * @param eventName - 事件名称
       * @param params - 事件参数
       */
      track(group: EventGroupEnum, eventName: string, params: Record<string, unknown>): void;
    }
  }

  /**
   * 视图命名空间
   */
  namespace View {
    /** 视图模式枚举 */
    type ViewModeEnum = ViewModeEnum;
  }
}

/**
 * 常量定义命名空间
 */
declare namespace HSFPConstants {
  /**
   * 命令类型
   */
  namespace CommandType {
    namespace MixPaint {
      const CmdSelectFacesToConnect: string;
      const CmdConnectFaces: string;
      const CmdDisConnectFaces: string;
    }
  }

  /**
   * 插件类型
   */
  enum PluginType {
    WallDecoration = "WallDecoration",
    MaterialBrush = "MaterialBrush",
    OutdoorDrawing = "OutdoorDrawing"
  }

  /**
   * 环境类型
   */
  enum Environment {
    Default = "Default"
  }
}

/**
 * SVG图标映射
 */
declare const SvgMap: {
  facegroup: string;
  wallDecorationAdvanced: string;
  limian: string;
  clearmaterial: string;
};

/**
 * 资源管理器
 */
declare namespace ResourceManager {
  /**
   * 根据键获取本地化字符串
   * @param key - 资源键
   */
  function getString(key: string): string;
}

/**
 * 获取隐藏项配置
 */
declare function getHideItem(params: GetItemsParams): PropertyBarItem;

/**
 * 获取删除项配置
 */
declare function getDeleteItem(params: GetItemsParams): PropertyBarItem;

/**
 * 获取收藏项配置
 */
declare function getFavoriteItem(params: { seekId?: string }): PropertyBarItem;

/**
 * 导出的面配置对象
 */
export declare const face: FaceConfig;