/**
 * 删除门框结构的事务请求
 * 处理门洞（Opening）或参数化门洞（ParametricOpening）的删除操作
 */
export default class RemoveOpeningStateRequest extends HSCore.Transaction.Common.StateRequest {
  /**
   * 要删除的内容对象（门洞或参数化门洞）
   */
  private _content: HSCore.Model.Opening | HSCore.Model.ParametricOpening | undefined;

  /**
   * 内容对象的宿主（Host）对象
   */
  private _contentHost: HSCore.Model.Layer | HSCore.Model.NCustomizedParametricRoof | undefined;

  /**
   * 是否自动构建孔洞
   */
  private _autoBuild: boolean;

  /**
   * 需要更新几何的楼层集合
   */
  private _dirtyFloors: Set<HSCore.Model.Floor>;

  /**
   * 构造函数
   * @param content - 要删除的门洞或参数化门洞对象
   * @param autoBuild - 是否自动构建孔洞，默认为 true
   */
  constructor(
    content: HSCore.Model.Opening | HSCore.Model.ParametricOpening,
    autoBuild?: boolean
  );

  /**
   * 验证删除操作的影响
   * 计算重叠对象、查找关联对象，并触发相关对象的有效性变更信号
   * @private
   */
  private _validate(): void;

  /**
   * 提交事务时执行
   * 执行删除操作，更新相关图层、孔洞构建器、面装饰适配等
   */
  onCommit(): void;

  /**
   * 撤销事务时执行
   * 恢复被删除的门洞对象，刷新受影响的楼层几何
   */
  onUndo(): void;

  /**
   * 重做事务时执行
   * 重新执行删除操作，刷新受影响的楼层几何
   */
  onRedo(): void;

  /**
   * 是否可以处理字段事务
   * @returns 始终返回 true
   */
  canTransactField(): boolean;

  /**
   * 获取事务描述
   * @returns 事务描述文本："删除门框结构"
   */
  getDescription(): string;

  /**
   * 获取事务分类
   * @returns 日志分组类型：内容操作（ContentOperation）
   */
  getCategory(): HSFPConstants.LogGroupTypes;

  /**
   * 更新孔洞影响的面
   * 针对楼板门洞，更新宿主对象上的天花板和地板的几何及混合涂料
   */
  updateHoleAffectedFace(): void;
}

/**
 * HSCore 命名空间的类型扩展
 */
declare namespace HSCore {
  namespace Model {
    /**
     * 门洞模型
     */
    interface Opening {
      id: string;
      signalValidityChanged: {
        dispatch(valid: boolean): void;
      };
      getHost(): Layer | NCustomizedParametricRoof | undefined;
      getRefreshFloors(dirtyFloors: Floor[]): Floor[];
    }

    /**
     * 参数化门洞模型
     */
    interface ParametricOpening {
      id: string;
      signalValidityChanged: {
        dispatch(valid: boolean): void;
      };
      getHost(): Layer | NCustomizedParametricRoof | undefined;
    }

    /**
     * 图层模型
     */
    interface Layer {
      next?: Layer;
      holeBuilder: {
        buildHole(openingId: string): void;
      };
      removeChild(content: Opening | ParametricOpening): void;
    }

    /**
     * 自定义参数化屋顶模型
     */
    interface NCustomizedParametricRoof {
      dirtyClipGeometry(): void;
      dirtyFaceMaterials(): void;
      forEachFace(callback: (face: Ceiling | Floor) => void): void;
    }

    /**
     * 楼层模型
     */
    interface Floor {
      dirtyGeometry(): void;
    }

    /**
     * 天花板模型
     */
    interface Ceiling {
      dirtyGeometry(): void;
    }
  }

  namespace Util {
    namespace Layer {
      /**
       * 计算重叠对象
       */
      function calcOverlapObject(
        content: Model.Opening | Model.ParametricOpening
      ): Map<string, Model.Opening | Model.ParametricOpening>;

      /**
       * 查找被移除的关联对象
       */
      function findRemovedLinkedObject(
        overlapMap: Map<string, Model.Opening | Model.ParametricOpening>,
        contentId: string
      ): Map<string, Model.Opening | Model.ParametricOpening>;

      /**
       * 修补重叠对象
       */
      function patchOverlapObejct(
        combinedMap: Map<string, Model.Opening | Model.ParametricOpening>
      ): {
        update: Array<Model.Opening | Model.ParametricOpening>;
        recover: Array<Model.Opening | Model.ParametricOpening>;
      };

      /**
       * 获取实体所在图层
       */
      function getEntityLayer(
        content: Model.Opening | Model.ParametricOpening
      ): Model.Layer;
    }

    namespace Opening {
      /**
       * 判断门洞是否部分在图层中
       */
      function isOpeningPartialInLayer(
        opening: Model.Opening | Model.ParametricOpening,
        layer: Model.Layer
      ): boolean;
    }

    namespace Content {
      /**
       * 判断是否为楼板门洞
       */
      function isSlabOpening(opening: Model.Opening): boolean;
    }

    namespace FaceMoldingFitHelper {
      /**
       * 获取面装饰适配助手单例
       */
      function getInstance(): {
        startListening(layers: Model.Layer[]): void;
        autoFit(): void;
      };
    }
  }

  namespace Paint {
    namespace PaintsUtil {
      /**
       * 更新面的混合涂料
       */
      function updateFaceMixpaint(face: Model.Ceiling | Model.Floor): void;
    }
  }

  namespace Transaction {
    namespace Common {
      /**
       * 状态请求基类
       */
      abstract class StateRequest {
        abstract onCommit(): void;
        abstract onUndo(): void;
        abstract onRedo(): void;
        abstract canTransactField(): boolean;
        abstract getDescription(): string;
        abstract getCategory(): HSFPConstants.LogGroupTypes;
      }
    }
  }
}

/**
 * HSApp 应用工具命名空间
 */
declare namespace HSApp {
  namespace Util {
    namespace Layer {
      function calcOverlapObject(
        content: HSCore.Model.Opening | HSCore.Model.ParametricOpening
      ): Map<string, HSCore.Model.Opening | HSCore.Model.ParametricOpening>;

      function findRemovedLinkedObject(
        overlapMap: Map<string, HSCore.Model.Opening | HSCore.Model.ParametricOpening>,
        contentId: string
      ): Map<string, HSCore.Model.Opening | HSCore.Model.ParametricOpening>;

      function patchOverlapObejct(
        combinedMap: Map<string, HSCore.Model.Opening | HSCore.Model.ParametricOpening>
      ): {
        update: Array<HSCore.Model.Opening | HSCore.Model.ParametricOpening>;
        recover: Array<HSCore.Model.Opening | HSCore.Model.ParametricOpening>;
      };
    }
  }
}

/**
 * 常量定义
 */
declare namespace HSFPConstants {
  enum LogGroupTypes {
    ContentOperation = 'ContentOperation'
  }
}