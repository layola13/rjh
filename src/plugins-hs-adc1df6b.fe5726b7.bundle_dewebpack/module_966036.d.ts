/**
 * 屋顶和材质工具类
 * 提供屋顶参数配置、材质查询等实用方法
 */
declare class RoofMaterialUtils {
  /**
   * 生成厚度选项列表
   * @param scale - 缩放系数，用于计算实际厚度值
   * @returns 厚度选项数组，每个选项包含id和显示标题
   * @example
   * // 当scale为1时，返回 [{id: "0.08", title: "0.08"}, {id: "0.12", title: "0.12"}, ...]
   */
  static getThicknessOptions(scale: number): Array<{
    id: string;
    title: string;
  }>;

  /**
   * 获取当前激活的屋顶对象
   * @returns 屋顶实例，可能为undefined（如果未找到）
   * @description
   * - 如果当前环境是添加屋顶环境，则从环境状态获取
   * - 否则从选择管理器的选中对象中查找自定义参数化屋顶
   */
  static getRoof(): HSCore.Model.NCustomizedParametricRoof | undefined;

  /**
   * 根据节点获取属性显示名称
   * @param node - 包含name和friendlyName属性的节点对象
   * @returns 本地化的属性显示名称
   * @description
   * - "thickness" -> 厚度
   * - "offset" -> 偏移
   * - "height" -> 高度
   * - 其他 -> 使用节点的friendlyName
   */
  static getShowNameByNode(node: {
    name: string;
    friendlyName: string;
  }): string;

  /**
   * 获取实体面的材质
   * @param entity - 实体对象
   * @param faceIndex - 面索引
   * @returns 材质对象
   * @description
   * 优先使用实体材质工具获取，失败则从面材质数据创建新材质
   */
  static getEntityFaceMaterial(
    entity: unknown,
    faceIndex: number
  ): HSCore.Material.Material;

  /**
   * 从材质对象提取目录查询参数
   * @param material - 材质对象，可能包含categoryId、seekId等属性
   * @returns 包含seekId和categoryId的查询对象
   * @description
   * 处理多种材质类型：
   * - 混合涂料材质：提取背景材质的分类信息
   * - 参数化涂料：从图案元数据中提取分类信息
   */
  static getCatalogQuery(material?: {
    categoryId?: string;
    seekId?: string;
    patterns?: Record<string, { metadata?: { categories: string[]; seekId: string } }>;
    [key: string]: unknown;
  }): {
    seekId: string;
    categoryId: string;
  };
}

/**
 * HSCore命名空间 - 核心模型和材质类型
 */
declare namespace HSCore {
  namespace Model {
    /**
     * 自定义参数化屋顶类
     */
    class NCustomizedParametricRoof {
      /**
       * 获取面的材质数据
       * @param faceIndex - 面索引
       */
      getFaceMaterialData(faceIndex: number): unknown;
    }
  }

  namespace Material {
    /**
     * 材质类
     */
    class Material {
      /**
       * 创建材质实例
       * @param data - 材质数据
       */
      static create(data: unknown): Material;
    }

    namespace Util {
      /**
       * 获取实体材质
       * @param entity - 实体对象
       * @param faceIndex - 面索引
       */
      function getEntityMaterial(entity: unknown, faceIndex: number): Material | null;
    }
  }

  namespace Util {
    namespace PaintMaterial {
      /**
       * 判断是否为混合涂料材质
       */
      function isMixPaintMaterial(material: unknown): boolean;

      /**
       * 从混合涂料实体获取涂料数据
       */
      function getPaintDataFromMixPaintEntity(entity: unknown): {
        data?: {
          backgroundMaterial: {
            parent?: unknown;
            categoryId: string;
            seekId: string;
          };
          paints: Array<{ pattern: string }>;
        };
      } | null;
    }
  }
}

/**
 * HSApp命名空间 - 应用程序和工具类型
 */
declare namespace HSApp {
  namespace App {
    /**
     * 获取应用实例
     */
    function getApp(): {
      activeEnvironmentId: string;
      activeEnvironment: {
        status: {
          getRoof(): HSCore.Model.NCustomizedParametricRoof;
        };
      };
      selectionManager: {
        selected(includeInactive: boolean): unknown[];
      };
    };
  }

  namespace Util {
    namespace Material {
      /**
       * 判断是否为参数化涂料
       */
      function isParamPaint(material: unknown): boolean;
    }
  }
}

/**
 * 环境常量
 */
declare namespace HSFPConstants {
  enum Environment {
    AddRoofEnv = "AddRoofEnv"
  }
}

/**
 * 资源管理器 - 国际化字符串获取
 */
declare namespace ResourceManager {
  /**
   * 获取本地化字符串
   * @param key - 资源键
   */
  function getString(key: string): string;
}

export default RoofMaterialUtils;