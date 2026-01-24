/**
 * 零件组装策略模块 - 用于处理橱柜零件的材质应用、吸取和撤销/重做操作
 * @module PAssemblyStrategy
 */

declare namespace HSCore {
  namespace Model {
    /** 内容对象基类 */
    class Content {
      contentType: HSCatalog.ContentType;
      metadata?: {
        contentType?: HSCatalog.ContentType;
        userFreeData?: {
          defaultValues?: Record<string, unknown>;
        };
      };
      forEachChild(callback: (child: unknown) => void): void;
    }

    /** 零件内容对象 */
    class PContent {
      localId: string;
      getContent(): Content;
    }

    /** 组装对象 */
    class PAssembly {
      parents: Record<string, unknown>;
      getMaterial(name: string): Material.Material | undefined;
      setMaterial(material: Material.Material): void;
      forEachChild(callback: (child: unknown) => void): void;
    }

    /** 挤压成型对象 */
    class PExtruding {
      getMaterial(name: string): Material.Material | undefined;
      setMaterial(material: Material.Material): void;
    }

    /** 盒子对象 */
    class PBox {
      getMaterial(name: string): Material.Material | undefined;
      setMaterial(material: Material.Material): void;
    }

    /** 装饰线条对象 */
    class PMolding {
      getMaterial(name: string): Material.Material | undefined;
      setMaterial(material: Material.Material): void;
    }
  }

  namespace Material {
    /** 材质对象 */
    class Material {
      /**
       * 克隆材质
       */
      clone(): Material;

      /**
       * 设置材质数据
       */
      set(data: MaterialData): void;

      /**
       * 获取材质数据
       */
      getMaterialData(): MaterialData;
    }
  }
}

declare namespace HSCatalog {
  /** 内容类型枚举 */
  enum ContentTypeEnum {
    CabinetDrawer = 'CabinetDrawer',
    CabinetFlipDoor = 'CabinetFlipDoor',
    CabinetDoor = 'CabinetDoor',
    DrawerDoor = 'DrawerDoor',
    DoorCore = 'DoorCore',
    CabinetComponent = 'CabinetComponent',
    CabinetDecoPanel = 'CabinetDecoPanel',
    CabinetZipBoardL = 'CabinetZipBoardL',
    CabinetZipBoardI = 'CabinetZipBoardI',
    Countertop = 'Countertop',
    CustomizedCabinet = 'CustomizedCabinet',
    CustomizedWardrobe = 'CustomizedWardrobe',
    CabinetLightBoard = 'CabinetLightBoard',
    CabinetDrawerBody = 'CabinetDrawerBody',
  }

  /** 内容类型 */
  class ContentType {
    /**
     * 检查是否是指定类型之一
     */
    isTypeOf(types: ContentTypeEnum | ContentTypeEnum[]): boolean;
  }
}

declare namespace HSApp {
  namespace Util {
    /** URL 工具类 */
    class Url {
      /**
       * 判断是否为 Data URL
       */
      static isDataUrl(url: string): boolean;
    }
  }

  /** 应用程序类 */
  class App {
    selectionManager: SelectionManager;

    /**
     * 获取应用实例
     */
    static getApp(): App;
  }

  /** 选择管理器 */
  class SelectionManager {
    /**
     * 获取当前过滤器
     */
    getCurrentFilter(): Filter | undefined;
  }

  /** 过滤器基类 */
  class Filter {}
}

/** 橱柜组件过滤器 */
declare class CabinetComponentFilter extends HSApp.Filter {}

/** 材质数据接口 */
interface MaterialData {
  textureURI?: string;
  paint?: {
    pattern?: {
      children?: Record<string, { material: MaterialData }>;
    };
  };
  materialData?: MaterialData;
  [key: string]: unknown;
}

/** 实体包装对象 */
interface EntityWrapper {
  /** 实体对象 */
  entity: ValidEntity;
}

/** 有效实体类型联合 */
type ValidEntity =
  | HSCore.Model.Content
  | HSCore.Model.PAssembly
  | HSCore.Model.PExtruding
  | HSCore.Model.PBox
  | HSCore.Model.PMolding;

/** 材质撤销/重做数据 */
interface UndoRedoData {
  /** 主体材质数据 */
  cbnt_body?: MaterialData;
}

/**
 * 零件组装策略类
 * 负责处理橱柜零件（抽屉、门板、装饰板等）的材质应用逻辑
 */
export default class PAssemblyStrategy {
  /** 策略类型标识 */
  readonly type: 'PAssemblyStrategy';

  /**
   * 通过路径获取对象属性值
   * @param path - 属性路径数组
   * @param obj - 目标对象
   * @returns 属性值，不存在则返回 null
   */
  private _getValueByPath<T = unknown>(
    path: string[],
    obj: Record<string, unknown>
  ): T | null;

  /**
   * 判断实体是否为有效的零件实体
   * @param entity - 待检查的实体
   * @returns 是否为有效实体（抽屉、门板、装饰板、挤压件、盒子、线条等）
   */
  isVailableEnt(entity: unknown): entity is ValidEntity;

  /**
   * 判断实体是否可吸取材质
   * @param wrapper - 实体包装对象
   * @returns 是否可吸取
   */
  isSuckable(wrapper: EntityWrapper): boolean;

  /**
   * 吸取实体的材质数据
   * @param wrapper - 实体包装对象
   * @returns 材质数据，若无则返回 undefined
   */
  suck(wrapper: EntityWrapper): MaterialData | undefined;

  /**
   * 判断材质是否可应用到实体
   * @param wrapper - 实体包装对象
   * @param materialData - 材质数据
   * @returns 是否可应用（排除 Data URL）
   */
  isAppliable(wrapper: EntityWrapper, materialData: MaterialData): boolean;

  /**
   * 将材质应用到实体
   * @param wrapper - 实体包装对象
   * @param materialData - 材质数据
   */
  apply(wrapper: EntityWrapper, materialData: MaterialData): void;

  /**
   * 获取撤销操作所需数据
   * @param wrapper - 实体包装对象
   * @returns 撤销数据（包含当前材质状态）
   */
  getUndoData(wrapper: EntityWrapper): UndoRedoData;

  /**
   * 获取重做操作所需数据
   * @param wrapper - 实体包装对象
   * @returns 重做数据（包含当前材质状态）
   */
  getRedoData(wrapper: EntityWrapper): UndoRedoData;

  /**
   * 获取撤销/重做数据的内部方法
   * @param entity - 实体对象
   * @returns 材质状态数据
   */
  private _getUndoRedoData(entity: ValidEntity): UndoRedoData;

  /**
   * 执行撤销操作
   * @param wrapper - 实体包装对象
   * @param data - 撤销数据
   */
  undo(wrapper: EntityWrapper, data: UndoRedoData): void;

  /**
   * 执行重做操作
   * @param wrapper - 实体包装对象
   * @param data - 重做数据
   */
  redo(wrapper: EntityWrapper, data: UndoRedoData): void;

  /**
   * 撤销/重做的内部实现
   * @param entity - 实体对象
   * @param data - 材质状态数据
   */
  private _undoRedo(entity: ValidEntity, data: UndoRedoData): void;

  /**
   * 查找所有假门内容对象
   * @param assembly - 组装对象
   * @returns 假门内容对象数组
   */
  private _findAllFakeDoorContents(
    assembly: HSCore.Model.PAssembly
  ): HSCore.Model.Content[];

  /**
   * 判断当前过滤器是否为组件过滤器
   * @returns 是否为组件过滤器
   */
  private _isComponentFilter(): boolean;

  /**
   * 为零件设置材质
   * @param entity - 实体对象
   * @param materialName - 材质名称（如 "cbnt_body"）
   * @param materialData - 材质数据，undefined 则清除材质
   */
  private _setComponentMaterial(
    entity: ValidEntity,
    materialName: string,
    materialData: MaterialData | undefined
  ): void;
}

/**
 * 判断是否为假门
 * @param localId - 本地 ID
 * @param defaultValues - 默认值配置
 * @returns 是否为假门
 */
export function isFakeDoor(
  localId: string,
  defaultValues: Record<string, unknown> | undefined
): boolean;