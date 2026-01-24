/**
 * 2D选择辅助控件工厂
 * 负责根据选中的实体创建相应的交互控件（Gizmo）
 */
declare module HSApp.View.SVG {
  /**
   * 2D选择辅助控件工厂类
   * 继承自基础控件工厂，专门用于在2D视图中创建选择、旋转等交互控件
   */
  export default class Gizmo2DFactory extends HSApp.View.Base.GizmoFactory {
    /**
     * 关联的应用程序实例
     * @private
     */
    private _app: HSApp.Application;

    /**
     * 构造函数
     * @param element - 宿主元素
     * @param app - 应用程序实例
     */
    constructor(element: HTMLElement, app: HSApp.Application);

    /**
     * 根据选中的实体创建相应的选择辅助控件
     * @param selections - 选中的实体数组
     * @returns 返回创建的控件数组，可能包含：
     *   - SingleSelectionGizmo: 单个实体的选择控件
     *   - Rotate2DGizmo: 2D旋转控件
     *   - MultiSelectionGizmo: 多实体选择控件
     * @description
     * 根据选中实体的数量和类型创建不同的交互控件：
     * - 单个实体：创建单选控件，对特定类型实体创建旋转控件
     * - 多个实体：如果都是内容或虚拟灯光类型，创建多选控件
     */
    createSelectionGizmo(
      selections: Array<{ entity: HSCore.Model.Entity }>
    ): Array<
      | HSApp.View.SVG.SingleSelectionGizmo
      | HSApp.View.SVG.Rotate2DGizmo
      | HSApp.View.SVG.MultiSelectionGizmo
    >;

    /**
     * 判断是否应该为实体创建单选控件
     * @param entity - 要判断的实体
     * @returns 如果应该创建单选控件返回true，否则返回false
     * @description
     * 根据以下条件判断：
     * - 实体是否被冻结（BOM环境除外）
     * - 实体类型是否为内容或角窗
     * - 是否为自定义特征模型
     * - 视图模式和环境的兼容性
     * - 特殊类型（如天花板、柜体、参数化屋顶等）的限制
     */
    shouldCreateSingleSelectGizmo(entity: HSCore.Model.Entity): boolean;

    /**
     * 判断是否应该为实体创建旋转控件
     * @param entity - 要判断的实体
     * @returns 如果应该创建旋转控件返回true，否则返回false
     * @description
     * 排除以下情况：
     * - 被冻结的实体
     * - 踢脚线类型
     * - 特定视图模式下的天花板
     * - 特定视图模式下不符合条件的家具/开口/窗户等
     * - 衣柜框架单元
     * - 合金门窗
     * - 非根实体的装配体/内容
     * - 特定环境下的天花板
     * - 造型环境
     */
    shouldCreateRotationGizmo(entity: HSCore.Model.Entity): boolean;
  }

  /**
   * 单个实体选择控件
   * 用于显示和操作单个选中实体的边界框和控制点
   */
  export class SingleSelectionGizmo {
    constructor(
      context: HSApp.View.RenderContext,
      layer: HSApp.View.DisplayLayer,
      entity: HSCore.Model.Entity
    );
  }

  /**
   * 2D旋转控件
   * 提供实体在2D视图中的旋转交互功能
   */
  export class Rotate2DGizmo {
    constructor(
      context: HSApp.View.RenderContext,
      layer: HSApp.View.DisplayLayer,
      entity: HSCore.Model.Entity,
      rotationHelper: HSApp.View.SVG.RotationHelper
    );
  }

  /**
   * 多实体选择控件
   * 用于同时选中和操作多个实体
   */
  export class MultiSelectionGizmo {
    constructor(
      context: HSApp.View.RenderContext,
      layer: HSApp.View.DisplayLayer,
      entities: HSCore.Model.Entity[]
    );
  }

  /**
   * 旋转辅助类
   * 提供实体旋转相关的计算和辅助功能
   */
  export class RotationHelper {
    constructor(
      entity: HSCore.Model.Entity,
      context: HSApp.View.RenderContext
    );
  }
}

/**
 * 基础控件工厂抽象类
 */
declare namespace HSApp.View.Base {
  export abstract class GizmoFactory {
    /**
     * 创建选择控件的抽象方法
     * @param selections - 选中的实体数组
     */
    abstract createSelectionGizmo(
      selections: Array<{ entity: HSCore.Model.Entity }>
    ): unknown[];
  }
}

/**
 * 应用程序主类
 */
declare namespace HSApp {
  export interface Application {
    /** 获取当前激活的2D视图 */
    getActive2DView(): HSApp.View.View2D;
    
    /** 当前激活的环境ID */
    activeEnvironmentId: string;
    
    /** 当前激活的环境 */
    activeEnvironment: HSApp.Environment;
    
    /** 当前2D视图模式 */
    viewMode2D: HSApp.View.ViewModeEnum;
    
    /** 判断3D视图是否激活 */
    is3DViewActive(): boolean;
    
    /** 判断2D视图是否激活 */
    is2DViewActive(): boolean;
  }

  /** 环境配置 */
  export interface Environment {
    /** 关联的面信息 */
    face: {
      roomInfo: {
        /** 楼层列表 */
        floors: Array<{ id: string }>;
      };
    };
  }
}

/**
 * 2D视图接口
 */
declare namespace HSApp.View {
  export interface View2D {
    /** 渲染上下文 */
    context: RenderContext;
    
    /** 显示图层集合 */
    displayLayers: {
      /** 临时图层 */
      temp: DisplayLayer;
    };
  }

  /** 渲染上下文 */
  export interface RenderContext {}

  /** 显示图层 */
  export interface DisplayLayer {}

  /**
   * 视图模式枚举
   */
  export enum ViewModeEnum {
    /** 平面视图 */
    Plane = 'Plane',
    /** 天花板反射平面图 */
    RCP = 'RCP'
  }
}

/**
 * 选择工具类
 */
declare namespace HSApp.Util.Selection {
  /**
   * 获取实体的选择类型
   * @param entity - 实体对象
   */
  export function getSelectionType(
    entity: HSCore.Model.Entity
  ): SelectionTypeEnum;

  /**
   * 选择类型枚举
   */
  export enum SelectionTypeEnum {
    /** 内容类型 */
    CONTENT = 'CONTENT',
    /** 虚拟灯光类型 */
    VIRTUALLIGHT = 'VIRTUALLIGHT'
  }
}

/**
 * 实体工具类
 */
declare namespace HSApp.Util.Entity {
  /**
   * 判断是否为根实体
   * @param entity - 实体对象
   */
  export function isRootEntity(entity: HSCore.Model.Entity): boolean;
}

/**
 * 核心模型实体类
 */
declare namespace HSCore.Model {
  /** 基础实体类 */
  export class Entity {
    /** 实体类型 */
    Class: string;
    
    /** 内容类型 */
    contentType: HSCatalog.ContentType;
    
    /** 实体ID */
    id: string;
    
    /** 是否为台面 */
    isCountertop: boolean;

    /**
     * 判断实体是否为指定类型的实例
     * @param className - 类名
     */
    instanceOf(className: string): boolean;

    /**
     * 判断实体是否设置了指定标志
     * @param flag - 标志枚举值
     */
    isFlagOn(flag: EntityFlagEnum): boolean;

    /**
     * 获取实体的宿主对象
     */
    getHost?(): Entity | null;
  }

  /** 自定义特征模型 */
  export class CustomizedFeatureModel extends Entity {}

  /** 自定义草图模型 */
  export class NCustomizedSketchModel extends Entity {}

  /** 自定义模型 */
  export class CustomizedModel extends Entity {}

  /** 参数化装配体 */
  export class PAssembly extends Entity {}

  /** 参数化屋顶 */
  export class NCustomizedParametricRoof extends Entity {}

  /** 装配体 */
  export class DAssembly extends Entity {}

  /** 内容实体 */
  export class DContent extends Entity {}

  /**
   * 实体标志枚举
   */
  export enum EntityFlagEnum {
    /** 冻结标志 */
    freezed = 'freezed'
  }
}

/**
 * 模型类型常量
 */
declare namespace HSConstants {
  export const ModelClass: {
    NgContent: string;
    NgSoftCloth: string;
    NgPAssembly: string;
    NgGroup: string;
    NgCurtain: string;
    NgCustomizedModel: string;
    NgFlue: string;
    NgBeam: string;
    NgColumn: string;
    NgSewerPipe: string;
    DAssembly: string;
    DContent: string;
    NCustomizedSquareColumn: string;
    NCustomizedCircleColumn: string;
    NCustomizedFlue: string;
    NCustomizedRiser: string;
    NCustomizedOutlet: string;
    NCustomizedBeam: string;
    ParametricCurtain: string;
    ParametricBathroomCabinet: string;
    NCustomizedParametricStairs: string;
    NgHole: string;
    CustomizedPMInstanceModel: string;
    NgDoor: string;
    NgWindow: string;
    NgCornerWindow: string;
  };
}

/**
 * 环境常量
 */
declare namespace HSFPConstants {
  export const Environment: {
    /** BOM环境 */
    Bom: string;
    /** 自定义天花板模型环境 */
    NCustomizedCeilingModel: string;
    /** 天花板模型环境 */
    CustomizedCeilingModel: string;
    /** 自定义平台环境 */
    NCustomizedPlatform: string;
    /** 平台环境 */
    CustomizedPlatform: string;
    /** 自定义背景墙环境 */
    CustomizedBackgroundWall: string;
    /** 造型环境 */
    MoldingEnv: string;
  };
}

/**
 * 内容类型
 */
declare namespace HSCatalog {
  export interface ContentType {
    /**
     * 判断是否为指定类型
     * @param typeEnum - 类型枚举值
     */
    isTypeOf(typeEnum: ContentTypeEnum): boolean;
  }

  /**
   * 内容类型枚举
   */
  export enum ContentTypeEnum {
    SmartCustomizedPMCeiling = 'SmartCustomizedPMCeiling',
    SmartCustomizedCeiling = 'SmartCustomizedCeiling',
    CabinetZipBoardI = 'CabinetZipBoardI',
    CabinetZipBoardL = 'CabinetZipBoardL',
    CabinetLightBoard = 'CabinetLightBoard',
    ext_Wainscot = 'ext_Wainscot',
    CustomizedProductsAlloyDoorWindow = 'CustomizedProductsAlloyDoorWindow'
  }
}

/**
 * 内容工具类
 */
declare namespace HSCore.Util.Content {
  /** 判断是否为楼板开口 */
  export function isSlabOpening(entity: HSCore.Model.Entity): boolean;
  
  /** 判断是否为天花板 */
  export function isCeiling(entity: HSCore.Model.Entity): boolean;
  
  /** 判断是否为家具 */
  export function isFurniture(entity: HSCore.Model.Entity): boolean;
  
  /** 判断是否为开口 */
  export function isOpening(entity: HSCore.Model.Entity): boolean;
  
  /** 判断是否为窗户 */
  export function isWindow(entity: HSCore.Model.Entity): boolean;
  
  /** 判断是否为隐蔽工程内容 */
  export function isConcealedWorkContent(entity: HSCore.Model.Entity): boolean;
  
  /** 判断是否为屋顶障碍物 */
  export function isRoofObstacle(entity: HSCore.Model.Entity): boolean;
  
  /** 判断是否为天花板灯具 */
  export function isCeilingLight(entity: HSCore.Model.Entity): boolean;
}

/**
 * 房间工具类
 */
declare namespace HSCore.Util.Room {
  /**
   * 获取实体所在的房间内容
   * @param entity - 实体对象
   */
  export function getRoomContentIn(
    entity: HSCore.Model.Entity
  ): { id: string } | null;
}

/**
 * 装配体工具类
 */
declare namespace HSCore.Util.PAssembly {
  /**
   * 判断是否为框架内的单元衣柜
   * @param entity - 实体对象
   */
  export function isUnitWardrobeInFrame(entity: HSCore.Model.Entity): boolean;
}

/**
 * 自定义门判断函数
 * @param entity - 实体对象
 */
declare function isCustomDoor(entity: HSCore.Model.Entity): boolean;