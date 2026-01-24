/**
 * 屋顶障碍物处理器类
 * 负责管理屋顶障碍物的属性栏和右键菜单功能
 */
declare class RoofObstacleHandler {
  /**
   * 处理器实例
   * @private
   */
  private _handler: any;

  /**
   * 目录插件实例
   * @private
   */
  private _catalogPlugin: any;

  /**
   * 目录管理器实例
   * @private
   */
  private _catalogManager: any;

  /**
   * 上下文工具插件实例
   * @private
   */
  private _contextualToolPlugin: any;

  /**
   * 构造函数
   * @param handler - 处理器实例
   * @param catalogManager - 目录管理器
   * @param catalogPlugin - 目录插件
   * @param contextualToolPlugin - 上下文工具插件
   */
  constructor(
    handler: any,
    catalogManager: any,
    catalogPlugin: any,
    contextualToolPlugin: any
  );

  /**
   * 初始化属性栏项目 V2 版本
   * @param element - 元素对象，包含材质数据和墙体对齐类型
   * @param viewContext - 视图上下文，用于判断当前视图类型
   * @returns 属性栏项目配置数组
   */
  initPropertyBarItemsV2(
    element: {
      getMaterialData(): Map<any, HSCore.Material.Material>;
      alignToWallType: keyof typeof HSCore.Model.AlignToWallTypeEnum;
    },
    viewContext: {
      is3DView(): boolean;
    }
  ): PropertyBarItem[];

  /**
   * 初始化右键菜单项
   * @param element - 元素对象，需要检查是否为屋顶障碍物
   * @returns 右键菜单项配置数组
   */
  initRightMenuItems(element: any): RightMenuItem[];
}

/**
 * 属性栏项目配置接口
 */
interface PropertyBarItem {
  /** 项目唯一标识 */
  id: string;
  /** 父级项目ID */
  parentId: string;
  /** 项目类型 */
  type: HSFPConstants.PropertyBarType;
  /** 显示标签 */
  label: string;
  /** 排序顺序 */
  order: number;
  /** 子项目列表 */
  items: PropertyBarSubItem[];
}

/**
 * 属性栏子项目配置接口
 */
interface PropertyBarSubItem {
  /** 子项目唯一标识 */
  id: string;
  /** 排序顺序 */
  order: number;
  /** 子项目类型 */
  type: HSFPConstants.PropertyBarType;
  /** 子项目数据 */
  data: ImageButtonData | DropdownListData;
}

/**
 * 图片按钮数据接口
 */
interface ImageButtonData {
  /** 图片来源URL */
  src: string;
  /** 颜色值 */
  color?: string;
  /** 查找ID */
  seekId?: string;
  /** 点击事件回调 */
  onClick: (event: any) => void;
}

/**
 * 下拉列表数据接口
 */
interface DropdownListData {
  /** 提示文本 */
  prompt: string;
  /** 选项列表 */
  options: DropdownOption[];
  /** 默认选中的键 */
  defaultKey: string;
  /** CSS类名 */
  className: string;
  /** 标题文本 */
  title: string;
  /** 值改变事件回调 */
  onchange: (value: string) => void;
}

/**
 * 下拉选项接口
 */
interface DropdownOption {
  /** 选项唯一标识 */
  id: string;
  /** 显示标签 */
  label: string;
  /** 图标 */
  icon: any;
}

/**
 * 右键菜单项配置接口
 */
interface RightMenuItem {
  /** 菜单项唯一标识 */
  id: string;
  /** 菜单项类型 */
  type: PropertyBarControlTypeEnum;
  /** 排序顺序 */
  order: number;
  /** 图标来源 */
  src: string;
  /** 显示标签 */
  label: string;
  /** 点击事件回调 */
  onClick: (event: any) => void;
}

/**
 * HSCore 命名空间
 */
declare namespace HSCore {
  namespace Material {
    /**
     * 材质类
     */
    class Material {
      /** 小图标URI */
      iconSmallURI?: string;
      /** 颜色值 */
      color?: string;
    }
  }

  namespace Model {
    /**
     * 墙体对齐类型枚举
     */
    enum AlignToWallTypeEnum {
      edge = "edge",
      center = "center"
    }

    /**
     * 自定义结构类
     */
    class NCustomizedStructure {}

    /**
     * 自定义梁类
     */
    class NCustomizedBeam {}
  }

  namespace Util {
    namespace Content {
      /**
       * 检查元素是否为屋顶障碍物
       * @param element - 要检查的元素
       * @returns 是否为屋顶障碍物
       */
      function isRoofObstacle(element: any): boolean;
    }
  }
}

/**
 * HSFPConstants 命名空间
 */
declare namespace HSFPConstants {
  /**
   * 属性栏类型枚举
   */
  enum PropertyBarType {
    ThirdLevelNode = "ThirdLevelNode",
    ImageButton = "ImageButton",
    DropdownList = "DropdownList"
  }
}

/**
 * 属性栏控件类型枚举
 */
declare enum PropertyBarControlTypeEnum {
  imageButton = "imageButton"
}

export default RoofObstacleHandler;